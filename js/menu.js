// Mobile Menu and FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initMobileMenu();

    // FAQ dropdown functionality
    initFAQDropdowns();
});

// Mobile menu toggle
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

// FAQ Dropdowns with inline style manipulation
function initFAQDropdowns() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const title = item.querySelector('.faq-item-title, button[aria-expanded]');
        const content = item.querySelector('.faq-item-content, p');

        if (title && content) {
            // Set initial closed state with inline styles
            if (!item.classList.contains('active')) {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                content.style.transform = 'translateY(-10px)';
            }

            title.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector('.faq-item-content, p');
                        otherItem.classList.remove('active');
                        if (otherContent) {
                            otherContent.style.maxHeight = '0px';
                            otherContent.style.opacity = '0';
                            otherContent.style.transform = 'translateY(-10px)';
                        }

                        // Update aria-expanded if it's a button
                        const otherTitle = otherItem.querySelector('button[aria-expanded]');
                        if (otherTitle) {
                            otherTitle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    // Calculate the actual content height
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0px)';

                    // Update aria-expanded if it's a button
                    if (title.hasAttribute('aria-expanded')) {
                        title.setAttribute('aria-expanded', 'true');
                    }
                } else {
                    item.classList.remove('active');
                    content.style.maxHeight = '0px';
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(-10px)';

                    // Update aria-expanded if it's a button
                    if (title.hasAttribute('aria-expanded')) {
                        title.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        }
    });
}
