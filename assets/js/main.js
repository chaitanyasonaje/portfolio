/**
 * Next-Gen 3D Interactive Logic Engine & Motion Graphics Controller
 * Chaitanya Sandip Sonaje - AI Full Stack Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initThemeEngine();
    initNavbar();
    initTypingEffect();
    init3DTiltCards();
    initCounterStats();
    loadProjects();
    loadSkills();
    initModal();
    initContactForm();
});

/* 1. Preloader Handler */
function initPreloader() {
    const loader = document.getElementById('loader-container');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 700);
    }
}

/* 2. Custom 3D Magnetic Glowing Cursor Follower */
function initCustomCursor() {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function renderCursorRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
        requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    // Hover state over interactive elements
    const interactiveElements = 'a, button, .project-card, .service-card, .skill-card, input, textarea, .tab-btn';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursorRing.classList.add('active');
            cursorDot.classList.add('active');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursorRing.classList.remove('active');
            cursorDot.classList.remove('active');
        }
    });
}

/* 3. Theme Engine (Light / Dark Mode Switcher) */
function initThemeEngine() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeBtn.querySelector('i').className = 'fas fa-sun';
        themeBtn.querySelector('span').textContent = 'Light Mode';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');

        if (isLight) {
            themeBtn.querySelector('i').className = 'fas fa-sun';
            themeBtn.querySelector('span').textContent = 'Light Mode';
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            themeBtn.querySelector('i').className = 'fas fa-moon';
            themeBtn.querySelector('span').textContent = 'Dark Mode';
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });
}

function playTone(freq, type, duration, vol) {
    if (!audioCtx || !soundEnabled) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

/* 4. Navbar & Scroll Animations */
function initNavbar() {
    const header = document.querySelector('header');
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('fa-times');
                navbar.classList.remove('active');
            });
        });
    }
}

/* 5. Dynamic Typing Engine */
function initTypingEffect() {
    const targetEl = document.getElementById('typing-text');
    if (!targetEl) return;

    const roles = [
        'AI Full Stack Engineer',
        'Machine Learning Specialist',
        'MERN & Next.js Architect',
        'LLM & OpenAI Developer',
        'Cybersecurity Researcher'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const backSpeed = 45;
    const delayBetween = 2200;

    function type() {
        const currentRole = roles[roleIdx];

        if (isDeleting) {
            targetEl.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            targetEl.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        let nextSpeed = isDeleting ? backSpeed : typeSpeed;

        if (!isDeleting && charIdx === currentRole.length) {
            nextSpeed = delayBetween;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            nextSpeed = 400;
        }

        setTimeout(type, nextSpeed);
    }

    type();
}

/* 6. 3D Card Interactive Tilt & Specular Lighting */
function init3DTiltCards() {
    const cards = document.querySelectorAll('.service-card, .about-glass-card, .contact-info-card, .contact-form-card, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.08), rgba(15, 23, 42, 0.65) 80%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            card.style.background = `var(--bg-card)`;
        });
    });
}

/* 7. Live Interactive Counter Statistics Animation */
function initCounterStats() {
    const counters = document.querySelectorAll('.counter-val');
    if (!counters.length) return;

    let animated = false;
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.hero-stats-row');
        if (!statsSection || animated) return;

        const top = statsSection.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) {
            animated = true;
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                const suffix = counter.getAttribute('data-suffix') || '';
                let current = 0;
                const increment = target / 40;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = (isDecimal ? current.toFixed(2) : Math.floor(current)) + suffix;
                }, 40);
            });
        }
    });
}

/* 8. Projects Showcase Renderer & Filter */
let allProjectsData = [];

async function loadProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    try {
        const res = await fetch('./projects/projects.json');
        allProjectsData = await res.json();
        renderProjects(allProjectsData);
        initProjectFilters();
    } catch (err) {
        console.error('Error loading projects:', err);
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const getCategoryIcon = (cat) => {
        switch(cat) {
            case 'ml': return 'fas fa-brain';
            case 'web': return 'fas fa-globe';
            case 'mobile': return 'fas fa-mobile-alt';
            case 'blockchain': return 'fas fa-cubes';
            default: return 'fas fa-code';
        }
    };

    projects.forEach((proj) => {
        const card = document.createElement('div');
        card.className = 'project-card 3d-tilt-card';

        const tagsHtml = (proj.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join('');
        const demoLink = proj.links.view ? `<a href="${proj.links.view}" target="_blank" class="link-btn"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : '';
        const codeLink = proj.links.code ? `<a href="${proj.links.code}" target="_blank" class="link-btn"><i class="fab fa-github"></i> Code Repo</a>` : '';

        card.innerHTML = `
            <div class="project-content">
                <div class="project-header-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <div class="project-icon-box" style="width: 44px; height: 44px; border-radius: var(--radius-md); background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.2); display: flex; align-items: center; justify-content: center; color: var(--primary-cyan); font-size: 1.25rem;">
                        <i class="${getCategoryIcon(proj.category)}"></i>
                    </div>
                    <span class="project-category-badge">${proj.category}</span>
                </div>
                <h3 class="project-title">${proj.name}</h3>
                <p class="project-desc">${proj.desc}</p>
                <div class="project-tags">${tagsHtml}</div>
                <div class="project-footer-links">
                    ${codeLink}
                    ${demoLink}
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    // Re-apply 3D Tilt listener
    setTimeout(init3DTiltCards, 100);
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-tabs .tab-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter');
            if (filterVal === 'all') {
                renderProjects(allProjectsData);
            } else {
                const filtered = allProjectsData.filter(p => p.category === filterVal);
                renderProjects(filtered);
            }
        });
    });
}

/* 9. Skills Renderer & Filter */
let allSkillsData = [];

async function loadSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    try {
        const res = await fetch('./skills.json');
        allSkillsData = await res.json();
        renderSkills(allSkillsData);
        initSkillFilters();
    } catch (err) {
        console.error('Error loading skills:', err);
    }
}

function renderSkills(skills) {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    grid.innerHTML = '';

    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="skill-icon">
                <img src="${skill.icon}" alt="${skill.name}" loading="lazy">
            </div>
            <span class="skill-name">${skill.name}</span>
        `;
        grid.appendChild(card);
    });
}

function initSkillFilters() {
    const skillBtns = document.querySelectorAll('.skills-tabs .tab-btn');
    skillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-skill-filter');
            if (filterVal === 'all') {
                renderSkills(allSkillsData);
            } else {
                const filtered = allSkillsData.filter(s => s.category === filterVal);
                renderSkills(filtered);
            }
        });
    });
}

/* 10. Quote Inquiry Modal Logic */
function initModal() {
    const modal = document.getElementById('quote-modal');
    const triggers = document.querySelectorAll('[data-open-modal]');
    const closeBtns = document.querySelectorAll('.modal-close-btn');

    triggers.forEach(t => {
        t.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = t.getAttribute('data-service-name');
            if (serviceName && document.getElementById('modal-service-input')) {
                document.getElementById('modal-service-input').value = serviceName;
            }
            if (modal) modal.classList.add('active');
        });
    });

    closeBtns.forEach(c => {
        c.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
        });
    });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

/* 11. Contact Form Handler */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contact-name')?.value || 'Friend';
        const email = document.getElementById('contact-email')?.value || '';

        alert(`Thank you ${name}! Your inquiry has been dispatched. Chaitanya will reply to ${email} within 24 hours.`);
        form.reset();

        const modal = document.getElementById('quote-modal');
        if (modal) modal.classList.remove('active');
    });
}