// Initialize Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Update scroll progress indicator
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalScroll) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Initialize color chips and FAQ
document.addEventListener('DOMContentLoaded', () => {
    // Initialize color chips
    const colorChips = document.querySelectorAll('.color-chip');
    colorChips.forEach(chip => {
        const color = chip.getAttribute('data-color');
        chip.style.backgroundColor = color;
    });

    // Initialize FAQ dropdowns with enhanced animation
    const faqToggles = document.querySelectorAll('.faq-item-title.dark');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns with animation
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    const otherContent = otherToggle.nextElementSibling;
                    otherContent.style.maxHeight = '0';
                    otherContent.style.opacity = '0';
                }
            });
            
            // Toggle current dropdown with animation
            const content = this.nextElementSibling;
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            } else {
                this.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                content.style.transform = 'translateY(-10px)';
            }
        });
    });
});
