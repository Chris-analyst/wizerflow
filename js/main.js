/* ================================
   WizerFlow - Main JavaScript
   ================================ */

document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initMobileMenu();
    initScrollBehavior();
    initFAQ();
    initScrollProgress();
});

// Scroll reveal with IntersectionObserver
function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
        observer.observe(el);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    var mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    var mainNav = document.querySelector('.main-nav');

    if (!mobileMenuToggle || !mainNav) return;

    mobileMenuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        mainNav.classList.toggle('active');
        this.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
        if (!mobileMenuToggle.contains(event.target) && !mainNav.contains(event.target)) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Scroll behavior: header state + smooth scroll
function initScrollBehavior() {
    var header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#' && !this.hasAttribute('data-cal-link')) {
                e.preventDefault();
                var targetId = this.getAttribute('href');
                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// FAQ Dropdowns
function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item.dark');

    faqItems.forEach(function (item) {
        var title = item.querySelector('.faq-item-title');
        var content = item.querySelector('.faq-item-content');

        if (!title || !content) return;

        title.addEventListener('click', function () {
            var isActive = item.classList.contains('active');

            // Close all others
            faqItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    var otherTitle = otherItem.querySelector('.faq-item-title');
                    if (otherTitle) otherTitle.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                title.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                title.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Scroll progress bar
function initScrollProgress() {
    var progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
}
