/* =====================================================
   ASTRO PARK CAMP – Main JavaScript
   ===================================================== */

/* ===== 1. STARFIELD CANVAS ===== */
(function initStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [], meteors = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        buildStars();
    }

    function buildStars() {
        stars = [];
        const count = Math.floor((W * H) / 4500);
        for (let i = 0; i < count; i++) {
            const size = Math.random() * 2 + 0.3;
            stars.push({
                x: Math.random() * W,
                y: Math.random() * H,
                size,
                opacity: Math.random() * 0.7 + 0.2,
                speed: Math.random() * 0.004 + 0.002,
                phase: Math.random() * Math.PI * 2,
                color: Math.random() > 0.85 ? '#a78bfa' : (Math.random() > 0.7 ? '#4cc9f0' : '#ffffff'),
            });
        }
    }

    function createMeteor() {
        const x = Math.random() * W;
        const y = Math.random() * (H / 2);
        const length = Math.random() * 100 + 50;
        const angle = Math.PI / 4; // 45 degrees
        meteors.push({
            x, y,
            targetX: x + length * Math.cos(angle + Math.PI),
            targetY: y + length * Math.sin(angle + Math.PI),
            life: 1.0,
            speed: Math.random() * 5 + 5
        });
    }

    function updateMeteors() {
        if (Math.random() < 0.005) { // Chance per frame to spawn meteor
            createMeteor();
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            m.life -= 0.015;
            m.x += m.speed;
            m.y += m.speed;
            if (m.life <= 0) {
                meteors.splice(i, 1);
            }
        }
    }

    function drawMeteors() {
        meteors.forEach(m => {
            ctx.beginPath();
            const grad = ctx.createLinearGradient(m.x, m.y, m.x - 40, m.y - 40);
            grad.addColorStop(0, `rgba(255, 255, 255, ${m.life})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - 40, m.y - 40);
            ctx.stroke();

            // Glow head
            ctx.beginPath();
            ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${m.life})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    let raf;
    let t = 0;
    function draw() {
        ctx.clearRect(0, 0, W, H);
        t += 0.01;

        // Stars
        stars.forEach(s => {
            const flicker = s.opacity + Math.sin(t * s.speed * 100 + s.phase) * 0.25;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = Math.max(0, Math.min(1, flicker));
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Meteors
        updateMeteors();
        drawMeteors();

        raf = requestAnimationFrame(draw);
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
