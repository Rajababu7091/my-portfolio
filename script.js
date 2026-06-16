/* ============================================
   RAJA BABU PORTFOLIO — JavaScript v2.0
   Premium interactions, animations & 3D effects
   ============================================ */

'use strict';

/* ============================================
   1. LOADER
   ============================================ */
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        // Trigger hero animations after load
        document.querySelectorAll('.hero [data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 150);
        });
    }, 1800);
});

/* ============================================
   2. DARK / LIGHT MODE TOGGLE
   ============================================ */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Load saved preference
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('light-mode');
    if (isLight) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('portfolio-theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('portfolio-theme', 'light');
    }
});

/* ============================================
   3. NAVBAR
   ============================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    // Active nav link
    updateActiveNavLink();
});

// Hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Active nav link based on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   4. BACK TO TOP
   ============================================ */
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   5. TYPING ANIMATION
   ============================================ */
const typedTextEl = document.getElementById('typed-text');
const strings = [
    'Software Engineer',
    'Java Developer',
    'Data Analyst',
    'Problem Solver',
    'MCA Student',
    'Full Stack Dev'
];
let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 120;
let deletingDelay = 60;
let pauseDelay = 2000;

function typeEffect() {
    const currentString = strings[stringIndex];
    if (isDeleting) {
        typedTextEl.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = deletingDelay;
    } else {
        typedTextEl.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 120;
    }
    if (!isDeleting && charIndex === currentString.length) {
        isDeleting = true;
        typingDelay = pauseDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        typingDelay = 400;
    }
    setTimeout(typeEffect, typingDelay);
}
// Start typing after loader
setTimeout(typeEffect, 2200);

/* ============================================
   6. SCROLL REVEAL ANIMATION
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, entry.target.dataset.revealDelay || 0);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

// Observe all elements with data-reveal
function initReveal() {
    document.querySelectorAll('[data-reveal]').forEach((el, i) => {
        // Skip hero elements (handled separately)
        if (!el.closest('.hero')) {
            revealObserver.observe(el);
        }
    });
}
initReveal();

/* ============================================
   7. ANIMATED STATS COUNTER
   ============================================ */
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + (el.dataset.suffix || '+');
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + (el.dataset.suffix || '+');
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

/* ============================================
   8. SKILL BAR ANIMATION
   ============================================ */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const percent = fill.style.getPropertyValue('--fill');
            setTimeout(() => {
                fill.style.width = percent;
            }, 200);
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.2 });

skillFills.forEach(fill => {
    fill.style.width = '0%';
    skillObserver.observe(fill);
});

/* ============================================
   9. CONTACT FORM
   ============================================ */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const sendBtn = document.getElementById('send-message-btn');
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.textContent = '';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
                formStatus.style.color = 'var(--primary)';
                contactForm.reset();
            } else {
                formStatus.textContent = '❌ Something went wrong. Please try emailing me directly.';
                formStatus.style.color = 'var(--accent)';
            }
        } catch (error) {
            formStatus.textContent = '❌ Network error. Please email me at rajababu7091@gmail.com';
            formStatus.style.color = 'var(--accent)';
        } finally {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    });
}

/* ============================================
   10. THREE.JS PARTICLE BACKGROUND
   ============================================ */
(function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    camera.position.z = 30;

    // Particle colors
    const colorCyan = new THREE.Color('#00f2fe');
    const colorPurple = new THREE.Color('#9b51e0');
    const colorPink = new THREE.Color('#ff007f');

    // ---- MAIN PARTICLE GALAXY ----
    const particleCount = window.innerWidth < 768 ? 600 : 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 150;
        positions[i + 1] = (Math.random() - 0.5) * 150;
        positions[i + 2] = (Math.random() - 0.5) * 80;

        const r = Math.random();
        const c = r < 0.4 ? colorCyan : r < 0.75 ? colorPurple : colorPink;
        colors[i] = c.r;
        colors[i + 1] = c.g;
        colors[i + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // ---- FLOATING GEOMETRIC SHAPES ----
    const shapes = [];
    const shapeCount = window.innerWidth < 768 ? 6 : 14;

    for (let i = 0; i < shapeCount; i++) {
        const geoTypes = [
            new THREE.OctahedronGeometry(1.5),
            new THREE.TetrahedronGeometry(1.8),
            new THREE.IcosahedronGeometry(1.2),
            new THREE.BoxGeometry(2, 2, 2)
        ];
        const geo = geoTypes[i % geoTypes.length];
        const color = [0x00f2fe, 0x9b51e0, 0xff007f][i % 3];
        const mat = new THREE.MeshBasicMaterial({
            color,
            wireframe: true,
            transparent: true,
            opacity: 0.12
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40
        );
        mesh.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.008,
            y: (Math.random() - 0.5) * 0.012
        };
        mesh.floatOffset = Math.random() * Math.PI * 2;
        scene.add(mesh);
        shapes.push(mesh);
    }

    // ---- MOUSE PARALLAX ----
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ---- ANIMATION LOOP ----
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        // Rotate particles
        particleMesh.rotation.y = elapsed * 0.03 + targetX * 0.3;
        particleMesh.rotation.x = targetY * 0.1;
        particleMesh.rotation.z = elapsed * 0.01;

        // Animate shapes
        shapes.forEach((shape, i) => {
            shape.rotation.x += shape.rotationSpeed.x;
            shape.rotation.y += shape.rotationSpeed.y;
            shape.position.y += Math.sin(elapsed * 0.5 + shape.floatOffset) * 0.01;
        });

        // Camera gentle movement
        camera.position.x += (targetX * 3 - camera.position.x) * 0.03;
        camera.position.y += (-targetY * 2 - camera.position.y) * 0.03;

        renderer.render(scene, camera);
    }
    animate();

    // ---- RESIZE HANDLER ----
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

/* ============================================
   11. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ============================================
   12. CARD TILT EFFECT (Mouse Over)
   ============================================ */
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.project-card, .cert-card, .stat-card, .achievement-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            card.style.transition = 'transform 0.1s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}
// Initialize after page loads
window.addEventListener('load', initTiltEffect);

/* ============================================
   13. CURSOR GLOW EFFECT
   ============================================ */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,242,254,0.5) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, opacity 0.3s;
    mix-blend-mode: screen;
    display: none;
`;
document.body.appendChild(cursorGlow);

let cursorX = 0, cursorY = 0;
let glowX = 0, glowY = 0;

// Only show on non-touch devices
if (window.matchMedia('(pointer: fine)').matches) {
    cursorGlow.style.display = 'block';
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    // Larger glow on interactive elements
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '60px';
            cursorGlow.style.height = '60px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(0,242,254,0.3) 0%, transparent 70%)';
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '20px';
            cursorGlow.style.height = '20px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(0,242,254,0.5) 0%, transparent 70%)';
        });
    });

    function animateCursor() {
        glowX += (cursorX - glowX) * 0.12;
        glowY += (cursorY - glowY) * 0.12;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

/* ============================================
   14. SECTION PROGRESS INDICATOR
   ============================================ */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00f2fe, #9b51e0);
    z-index: 10001;
    transition: width 0.1s ease;
    border-radius: 0 3px 3px 0;
    box-shadow: 0 0 10px rgba(0,242,254,0.5);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = Math.min(progress, 100) + '%';
});

/* ============================================
   15. MOBILE MENU OVERLAY
   ============================================ */
const menuOverlay = document.createElement('div');
menuOverlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(4px);
`;
document.body.appendChild(menuOverlay);

hamburger.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
        menuOverlay.style.opacity = '1';
        menuOverlay.style.pointerEvents = 'auto';
    } else {
        menuOverlay.style.opacity = '0';
        menuOverlay.style.pointerEvents = 'none';
    }
});

menuOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    menuOverlay.style.opacity = '0';
    menuOverlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';
});

/* ============================================
   16. REVEAL HERO ON LOAD
   ============================================ */
// Stagger reveal for hero section elements  
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero [data-reveal]');
    heroElements.forEach((el, i) => {
        el.style.transitionDelay = `${1.8 + i * 0.15}s`;
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        setTimeout(() => el.classList.add('revealed'), 1800 + i * 150);
    });
});
