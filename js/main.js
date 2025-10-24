// Main JavaScript for Wizerflow website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js for typing effect
    initTypingEffect();
    
    // Initialize intersection observer for animations
    initAnimationObserver();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize Cal.com widget
    initCalWidget();
    
    // Initialize scroll behavior
    initScrollBehavior();
    
    // Initialize FAQ dropdowns
    initFAQ();
});

// Typing effect initialization
function initTypingEffect() {
    // Check if Typed.js is loaded
    if (typeof Typed === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12';
        script.onload = setupTyped;
        document.head.appendChild(script);
    } else {
        setupTyped();
    }
    
    function setupTyped() {
        const typingElement = document.getElementById('typing-text');
        if (typingElement) {
            new Typed('#typing-text', {
                strings: [
                    ' smart',
                    ' to scale',
                    ' personalized',
                    ' for growth',
                    ' for connection'
                ],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                startDelay: 500,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }
}

// Animation observer for scroll-triggered animations
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Apply animation classes to elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.classList.add('animate', 'slide-up', `delay-${index + 1}`);
        observer.observe(el);
    });

    // Metrics animations
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach((el, index) => {
        el.classList.add('animate', 'fade-in', `delay-${index + 1}`);
        observer.observe(el);
    });

    // Tool stack animations
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach((el) => {
        el.classList.add('animate', 'fade-in');
        observer.observe(el);
    });
}

// Mobile menu toggle functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mainNav.contains(event.target)) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
}

// Cal.com widget initialization
function initCalWidget() {
    if (typeof Cal !== 'undefined') {
        // Initialize Cal.com UI
        Cal.ns["25min"]("ui", {
            "hideEventTypeDetails": false,
            "layout": "month_view"
        });

        // Add click handler to all CTA buttons
        const ctaButtons = document.querySelectorAll('[data-cal-link]');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                Cal.ns["25min"]("showModal");
            });
        });
    }
}

// Scroll behavior
function initScrollBehavior() {
    // Header background change on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#' && !this.hasAttribute('data-cal-link')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll reveal functionality
function handleReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleReveal);
// Initial check for elements in view
document.addEventListener('DOMContentLoaded', handleReveal);

// FAQ Dropdowns
function initFAQ() {
    const faqToggles = document.querySelectorAll('.faq-item-title.dark');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current dropdown
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });
}
