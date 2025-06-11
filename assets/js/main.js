// Loading Animation Handler
function handleLoadingAnimation() {
    const loaderContainer = document.querySelector('.loader-container');
    
    // Hide loader when all resources are loaded
    window.addEventListener('load', () => {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
            loaderContainer.classList.add('fade-out');
            // Remove loader from DOM after animation
            setTimeout(() => {
                loaderContainer.remove();
            }, 500);
        }, 500);
    });
}

// Initialize loading animation
handleLoadingAnimation();

// Mobile menu functionality
const menuBtn = document.querySelector('#menu');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navbar.contains(e.target)) {
        menuBtn.classList.remove('active');
        navbar.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            menuBtn.classList.remove('active');
            navbar.classList.remove('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.skill-category, .project-item, .education .box, .competitive-card, .about .row .content').forEach(el => {
    el.classList.add('fade-out');
    observer.observe(el);
});

// Scroll to top button
const scrollTopBtn = document.querySelector('#scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Function to initialize particles
function initializeParticles() {
    const particlesConfig = {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#64ffda'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#64ffda',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };

    // Initialize particles for all sections with error handling
    ['particles-js', 'particles-js-about', 'particles-js-skills', 'particles-js-education', 'particles-js-work', 'particles-js-contact'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            try {
                particlesJS(id, particlesConfig);
            } catch (error) {
                console.warn(`Failed to initialize particles for ${id}:`, error);
                element.style.display = 'none';
            }
        }
    });
}

// Ensure particles.js is loaded before initialization
function loadParticlesJS() {
    return new Promise((resolve, reject) => {
        if (window.particlesJS) {
            resolve();
        } else {
            const script = document.createElement('script');
            script.src = './assets/js/particles.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadParticlesJS();
        initializeParticles();
    } catch (error) {
        console.warn('Failed to load particles.js:', error);
    }
}); 