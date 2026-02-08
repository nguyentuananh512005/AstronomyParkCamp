console.log('Astro Camp Website Loaded');

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(11, 13, 23, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
        header.style.background = 'rgba(11, 13, 23, 0.8)';
        header.style.boxShadow = 'none';
    }
});

// Generate Stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    const count = 200;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        // Random size
        const size = Math.random() * 2 + 1;
        // Random duration
        const duration = Math.random() * 3 + 1;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);

        starsContainer.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', createStars);
