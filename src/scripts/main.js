/* =====================================================
   ASTRO PARK CAMP – Main JavaScript
   ===================================================== */

/* ===== 1. SOLAR SYSTEM BACKGROUND ===== */
(function initSolarSystem() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    const planets = [
        { name: 'Mercury', dist: 70, size: 3, speed: 0.04, color: '#A5A5A5', angle: Math.random() * Math.PI * 2 },
        { name: 'Venus', dist: 110, size: 7, speed: 0.015, color: '#E3BB76', angle: Math.random() * Math.PI * 2 },
        { name: 'Earth', dist: 160, size: 8, speed: 0.01, color: '#2271B3', angle: Math.random() * Math.PI * 2 },
        { name: 'Mars', dist: 210, size: 6, speed: 0.008, color: '#E27B58', angle: Math.random() * Math.PI * 2 },
        { name: 'Jupiter', dist: 320, size: 18, speed: 0.004, color: '#D39C7E', angle: Math.random() * Math.PI * 2 },
        { name: 'Saturn', dist: 420, size: 15, speed: 0.002, color: '#C5AB6E', angle: Math.random() * Math.PI * 2, hasRings: true },
        { name: 'Uranus', dist: 500, size: 10, speed: 0.0015, color: '#BBE1E4', angle: Math.random() * Math.PI * 2 },
        { name: 'Neptune', dist: 570, size: 10, speed: 0.001, color: '#6081FF', angle: Math.random() * Math.PI * 2 }
    ];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function drawSun(cx, cy) {
        // Core Sun glow
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
        grad.addColorStop(0, '#FFF5E1');
        grad.addColorStop(0.2, '#FFD200');
        grad.addColorStop(0.5, '#F7941E');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, 60, 0, Math.PI * 2);
        ctx.fill();

        // Inner core
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#F7941E';
        ctx.beginPath();
        ctx.arc(cx, cy, 35, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD200';
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    function drawOrbit(cx, cy, dist) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, dist * 1.5, dist * 0.8, Math.PI / 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    function drawPlanet(cx, cy, p) {
        const x = Math.cos(p.angle) * p.dist * 1.5;
        const y = Math.sin(p.angle) * p.dist * 0.8;

        // Tilt rotation (matching orbit)
        const rot = Math.PI / 10;
        const finalX = cx + x * Math.cos(rot) - y * Math.sin(rot);
        const finalY = cy + x * Math.sin(rot) + y * Math.cos(rot);

        // Saturn Rings
        if (p.hasRings) {
            ctx.beginPath();
            ctx.ellipse(finalX, finalY, p.size * 2.2, p.size * 0.8, p.angle + Math.PI / 4, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(197, 171, 110, 0.4)';
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        // Planet Body
        const planetGrad = ctx.createRadialGradient(finalX - p.size * 0.3, finalY - p.size * 0.3, 0, finalX, finalY, p.size);
        planetGrad.addColorStop(0, p.color);
        planetGrad.addColorStop(1, '#000');

        ctx.beginPath();
        ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = planetGrad;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.angle += p.speed;
    }

    function draw() {
        ctx.fillStyle = '#07080f';
        ctx.fillRect(0, 0, W, H);

        const cx = W / 2;
        const cy = H / 2;

        drawSun(cx, cy);

        planets.forEach(p => {
            drawOrbit(cx, cy, p.dist);
            drawPlanet(cx, cy, p);
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
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
