// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all animate elements
document.querySelectorAll('.animate').forEach(element => {
    observer.observe(element);
});

// Scroll Animation Observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Hero section animations
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.classList.add('animate', 'slide-up', `delay-${index + 1}`);
        animationObserver.observe(el);
    });

    // Metrics animations
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach((el, index) => {
        el.classList.add('animate', 'fade-in', `delay-${index + 1}`);
        animationObserver.observe(el);
    });

    // Tool stack animations
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach((el) => {
        el.classList.add('animate', 'fade-in');
        animationObserver.observe(el);
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((el, index) => {
        el.classList.add('animate', 'slide-up', `delay-${index + 1}`);
        animationObserver.observe(el);
    });

    // Case study card animations
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    caseStudyCards.forEach((el, index) => {
        el.classList.add('animate', 'slide-up', `delay-${index + 1}`);
        animationObserver.observe(el);
    });

    // Process step animations
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((el, index) => {
        el.classList.add('animate', index % 2 === 0 ? 'slide-left' : 'slide-right', `delay-${index + 1}`);
        animationObserver.observe(el);
    });

    // FAQ animations
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((el, index) => {
        el.classList.add('animate', 'slide-up', `delay-${index + 1}`);
        animationObserver.observe(el);
    });

    // Pricing card animations
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((el, index) => {
        el.classList.add('animate', 'slide-up', `delay-${index + 1}`);
        animationObserver.observe(el);
    });

    // Section title animations
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((el) => {
        el.classList.add('animate', 'fade-in');
        animationObserver.observe(el);
    });
});

// FAQ Toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Scroll-Up Button Functionality
const scrollUpBtn = document.getElementById('scroll-up');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add('visible');
    } else {
        scrollUpBtn.classList.remove('visible');
    }
});

scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
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
});

// Cal.com Widget Configuration
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cal.com UI
    Cal.ns["intro-call-45"]("ui", {
        "hideEventTypeDetails": false,
        "layout": "month_view"
    });

    // Add click handler to all CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            Cal.ns["intro-call-45"]("showModal");
        });
    });
});
