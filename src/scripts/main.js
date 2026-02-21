/* =====================================================
   ASTRO PARK CAMP – Main JavaScript
   ===================================================== */

/* ===== 1. INTERACTIVE ANIME.JS SOLAR SYSTEM ===== */
(function initInteractiveSolarSystem() {
    const container = document.querySelector('.solar-system');
    if (!container) return;

    const planetData = [
        { name: 'mercury', dist: 120, size: 10, speed: 3000, color: '#8c8c8c' },
        { name: 'venus', dist: 180, size: 18, speed: 7000, color: '#e3bb76' },
        { name: 'earth', dist: 260, size: 20, speed: 12000, color: '#2271b3', glow: 'rgba(34,113,179,0.5)' },
        { name: 'mars', dist: 340, size: 14, speed: 20000, color: '#e27b58' },
        { name: 'jupiter', dist: 500, size: 48, speed: 40000, color: '#d39c7e' },
        { name: 'saturn', dist: 680, size: 40, speed: 70000, color: '#c5ab6e', hasRings: true },
        { name: 'uranus', dist: 820, size: 28, speed: 100000, color: '#bbe1e4' },
        { name: 'neptune', dist: 940, size: 28, speed: 150000, color: '#6081ff' }
    ];

    // Inject Planets and Orbits
    planetData.forEach(p => {
        const orbit = document.createElement('div');
        orbit.className = `orbit ${p.name}-orbit`;
        orbit.style.width = `${p.dist * 2}px`;
        orbit.style.height = `${p.dist * 2}px`;

        const pContainer = document.createElement('div');
        pContainer.className = 'planet-container';

        const planet = document.createElement('div');
        planet.className = `planet ${p.name}`;
        planet.style.width = `${p.size}px`;
        planet.style.height = `${p.size}px`;
        planet.style.backgroundColor = p.color;
        if (p.glow) planet.style.boxShadow = `0 0 20px ${p.glow}, inset -4px -4px 10px rgba(0,0,0,0.8)`;

        if (p.hasRings) {
            const rings = document.createElement('div');
            rings.className = 'saturn-rings';
            planet.appendChild(rings);
        }

        pContainer.appendChild(planet);
        orbit.appendChild(pContainer);
        container.appendChild(orbit);

        // Individual Rotation
        anime({
            targets: orbit,
            rotateZ: 360,
            duration: p.speed,
            easing: 'linear',
            loop: true
        });
    });

    // Navigation and Camera Logic
    const navButtons = document.querySelectorAll('.planet-nav button');

    function focusOn(targetName) {
        navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.planet === targetName));

        const isSun = targetName === 'sun';
        const pInfo = isSun ? null : planetData.find(p => p.name === targetName);

        anime({
            targets: '.solar-system',
            rotateX: isSun ? 75 : 80,
            translateY: isSun ? 0 : pInfo.dist * 1.2,
            scale: isSun ? 1 : 2.5,
            duration: 1500,
            easing: 'easeInOutQuart'
        });
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => focusOn(btn.dataset.planet));
    });

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
