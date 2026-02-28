/* =====================================================
   ASTRO PARK CAMP – Main JavaScript
   ===================================================== */

/* ===== 1. CSS 3D SOLAR SYSTEM CONTROLLER ===== */
(function initSolarSystemControls() {
    const solarSystem = document.getElementById('solar-system');
    const galaxy = document.getElementById('galaxy');
    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');
    const planetItems = document.querySelectorAll('.planet-item');
    const planets = document.querySelectorAll('.planet');
    const allOrbits = document.querySelectorAll('.orbit');

    if (!solarSystem) return;

    // Base durations (seconds)
    const baseDurations = {
        'mercury-orbit': 3.4, 'venus-orbit': 8.5, 'earth-orbit': 14,
        'moon-orbit': 1.5, 'mars-orbit': 26, 'jupiter-orbit': 83,
        'saturn-orbit': 206, 'uranus-orbit': 588, 'neptune-orbit': 1150
    };

    let currentSpeed = 1;

    function updateSpeeds() {
        allOrbits.forEach(orbit => {
            const base = baseDurations[orbit.id];
            if (base) orbit.style.animationDuration = (base / currentSpeed) + 's';
        });
    }

    if (speedSlider) {
        speedSlider.addEventListener('input', () => {
            currentSpeed = parseFloat(speedSlider.value);
            speedValue.textContent = currentSpeed.toFixed(1) + 'x';
            updateSpeeds();
        });
    }

    // Focus/Zoom targets (translateY moves along the tilted axis)
    const focusTargets = {
        sun: { scale: 1, translateY: 0 },
        mercury: { scale: 12, translateY: -90 },
        venus: { scale: 8, translateY: -137 },
        earth: { scale: 6, translateY: -195 },
        mars: { scale: 5, translateY: -265 },
        jupiter: { scale: 3, translateY: -390 },
        saturn: { scale: 2.3, translateY: -500 },
        uranus: { scale: 2, translateY: -590 },
        neptune: { scale: 1.8, translateY: -665 }
    };

    function focusPlanet(name) {
        planetItems.forEach(item => item.classList.toggle('active', item.dataset.planet === name));
        planets.forEach(p => p.classList.remove('selected'));
        if (name !== 'sun') {
            const el = document.getElementById(name);
            if (el) el.classList.add('selected');
        }
        const t = focusTargets[name] || focusTargets.sun;
        if (galaxy) {
            galaxy.style.transition = 'transform 1.2s cubic-bezier(0.45,0.05,0.55,0.95)';
            galaxy.style.transform = `translate(calc(-50% + 0px), calc(-50% + ${t.translateY}px)) scale(${t.scale})`;
        }
    }

    planetItems.forEach(item => item.addEventListener('click', () => focusPlanet(item.dataset.planet)));
    planets.forEach(planet => planet.addEventListener('click', e => { e.stopPropagation(); focusPlanet(planet.id); }));
    document.getElementById('universe')?.addEventListener('click', () => focusPlanet('sun'));
})();



/* ===== 2. ORBIT CANVAS (Testimonial background) ===== */
(function initOrbit() {
    const canvas = document.getElementById('orbit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
        W = canvas.width = canvas.parentElement.offsetWidth;
        H = canvas.height = canvas.parentElement.offsetHeight;
    }

    let t = 0;
    function draw() {
        ctx.clearRect(0, 0, W, H);
        const cx = W / 2, cy = H / 2;
        const orbits = [
            { r: Math.min(W, H) * 0.38, lineW: 0.5, color: 'rgba(124,58,237,0.4)' },
            { r: Math.min(W, H) * 0.52, lineW: 0.4, color: 'rgba(34,211,238,0.3)' },
            { r: Math.min(W, H) * 0.65, lineW: 0.3, color: 'rgba(124,58,237,0.2)' },
        ];
        orbits.forEach((o, i) => {
            ctx.beginPath();
            ctx.ellipse(cx, cy, o.r * 1.6, o.r * 0.55, Math.PI / 6 + i * 0.2, 0, Math.PI * 2);
            ctx.strokeStyle = o.color;
            ctx.lineWidth = o.lineW;
            ctx.stroke();

            // Moving dot on orbit
            const angle = t * (0.3 + i * 0.15) + i * 2;
            const a = o.r * 1.6, b = o.r * 0.55;
            const dx = a * Math.cos(angle);
            const dy = b * Math.sin(angle);
            const rot = Math.PI / 6 + i * 0.2;
            const px = cx + dx * Math.cos(rot) - dy * Math.sin(rot);
            const py = cy + dx * Math.sin(rot) + dy * Math.cos(rot);
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = i === 1 ? '#4cc9f0' : '#a78bfa';
            ctx.shadowBlur = 8;
            ctx.shadowColor = i === 1 ? '#4cc9f0' : '#a78bfa';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        t += 0.005;
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
})();

/* ===== 3. HEADER SCROLL EFFECT ===== */
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

/* ===== 4. MOBILE MENU ===== */
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const bookNow = document.getElementById('btn-book-now');

menuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close when clicking a link
navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== 5. SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* ===== 6. SCROLL REVEAL ANIMATIONS ===== */
const revealEls = document.querySelectorAll(
    '.animate-fade-up, .animate-fade-right, .animate-fade-left'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

// Hero elements visible immediately
document.querySelectorAll('#hero .animate-fade-up, #hero .animate-fade-left').forEach(el => {
    el.classList.add('visible');
});

revealEls.forEach(el => {
    if (!el.closest('#hero')) observer.observe(el);
});

/* ===== 7. TESTIMONIAL CAROUSEL ===== */
(function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let autoplay;

    function goTo(idx) {
        cards[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = idx;
        cards[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function next() {
        goTo((current + 1) % cards.length);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(autoplay);
            goTo(i);
            startAutoplay();
        });
    });

    function startAutoplay() {
        autoplay = setInterval(next, 5000);
    }

    startAutoplay();
})();

/* ===== 7.1 INSTRUCTOR CAROUSEL ===== */
(function initInstructors() {
    const cards = document.querySelectorAll('.instructor-card');
    const dots = document.querySelectorAll('.ins-dot');
    let current = 0;
    let autoplay;

    if (!cards.length) return;

    function goTo(idx) {
        cards[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = idx;
        cards[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function next() {
        goTo((current + 1) % cards.length);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(autoplay);
            goTo(i);
            startAutoplay();
        });
    });

    function startAutoplay() {
        autoplay = setInterval(next, 6000);
    }

    startAutoplay();
})();

/* ===== 8. FORM SUBMIT FEEDBACK ===== */
const form = document.getElementById('booking-form');
const btnSubmit = document.getElementById('btn-submit');
form?.addEventListener('submit', function (e) {
    // Let Netlify handle it, but give user feedback
    btnSubmit.innerHTML = '<span>Đang Gửi...</span>';
    btnSubmit.style.opacity = '0.7';
    btnSubmit.style.pointerEvents = 'none';
});

/* ===== 9. INTERACTIVE HOVER EFFECTS ===== */
(function initInteractiveHovers() {
    const cards = document.querySelectorAll('.exp-card, .feature-item, .accom-card, .testimonial-card, .contact-form-wrapper');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Optional tilt effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

console.log('%c✦ ASTRO PARK CAMP %c– Loaded Successfully',
    'color:#a78bfa; font-family:monospace; font-weight:bold;',
    'color:#4cc9f0; font-family:monospace;'
);
