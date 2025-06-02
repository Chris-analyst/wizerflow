// Booking System JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Cal.com integration
    initCalWidget();
    
    // Add pulse animation to primary CTAs
    addPulseAnimation();
    
    // Initialize floating booking button
    initFloatingBookingButton();
    
    // Track CTA interactions
    trackCTAInteractions();
});

// Cal.com widget initialization
function initCalWidget() {
    if (typeof Cal !== 'undefined') {
        // Initialize Cal.com UI with custom styling
        Cal.ns["intro-call-45"]("ui", {
            "hideEventTypeDetails": false,
            "layout": "month_view",
            "styles": {
                "branding": {
                    "brandColor": "#8a2be2"
                }
            }
        });

        // Add click handler to all CTA buttons
        const ctaButtons = document.querySelectorAll('[data-cal-link]');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Track button click for analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'booking_click', {
                        'event_category': 'engagement',
                        'event_label': button.innerText || 'Book Meeting'
                    });
                }
                
                // Show Cal.com modal
                Cal.ns["intro-call-45"]("showModal", {
                    // Optional custom configuration for specific buttons
                    calLink: "wizerflow/intro-call-45",
                    config: {
                        "layout": "month_view"
                    }
                });
            });
        });
        
        // Listen for Cal.com events
        window.addEventListener('message', function(e) {
            if (e.data && e.data.type === 'CAL:EVENT_SCHEDULED') {
                // Show success message
                showBookingConfirmation();
            }
        });
    } else {
        console.warn('Cal.com widget not loaded');
    }
}

// Add pulse animation to primary CTAs
function addPulseAnimation() {
    const primaryCTAs = document.querySelectorAll('.btn-primary.btn-large');
    primaryCTAs.forEach(cta => {
        cta.classList.add('pulse');
        
        // Stop pulsing on hover to avoid distracting the user
        cta.addEventListener('mouseenter', () => {
            cta.classList.remove('pulse');
        });
        
        cta.addEventListener('mouseleave', () => {
            setTimeout(() => {
                cta.classList.add('pulse');
            }, 2000);
        });
    });
}

// Initialize floating booking button
function initFloatingBookingButton() {
    // Create floating booking button if it doesn't exist
    if (!document.querySelector('.floating-booking-btn')) {
        const floatingBtn = document.createElement('button');
        floatingBtn.className = 'floating-booking-btn';
        floatingBtn.setAttribute('aria-label', 'Book a meeting');
        floatingBtn.innerHTML = '<span>Book a Call</span>';
        
        // Add Cal.com attributes
        floatingBtn.setAttribute('data-cal-link', 'wizerflow/intro-call-45');
        floatingBtn.setAttribute('data-cal-namespace', 'intro-call-45');
        floatingBtn.setAttribute('data-cal-config', '{"layout":"month_view"}');
        
        document.body.appendChild(floatingBtn);
        
        // Add event listener
        floatingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Cal.ns["intro-call-45"]("showModal");
            
            // Track floating button click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'floating_booking_click', {
                    'event_category': 'engagement',
                    'event_label': 'Floating Button'
                });
            }
        });
        
        // Show button after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                floatingBtn.classList.add('visible');
            } else {
                floatingBtn.classList.remove('visible');
            }
        });
    }
}

// Track CTA interactions
function trackCTAInteractions() {
    // Track visibility of CTAs
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.viewed) {
                entry.target.dataset.viewed = 'true';
                
                // Track CTA view
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'cta_view', {
                        'event_category': 'engagement',
                        'event_label': entry.target.innerText || 'CTA Button'
                    });
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe all CTA buttons
    document.querySelectorAll('[data-cal-link]').forEach(cta => {
        observer.observe(cta);
    });
}

// Show booking confirmation message
function showBookingConfirmation() {
    // Create confirmation element
    const confirmation = document.createElement('div');
    confirmation.className = 'booking-confirmation';
    confirmation.innerHTML = `
        <div class="booking-confirmation-content">
            <h3>Meeting Scheduled!</h3>
            <p>Thank you for booking a call with us. You'll receive a confirmation email shortly.</p>
            <button class="close-confirmation">Close</button>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    // Add animation
    setTimeout(() => {
        confirmation.classList.add('visible');
    }, 100);
    
    // Add close button functionality
    confirmation.querySelector('.close-confirmation').addEventListener('click', () => {
        confirmation.classList.remove('visible');
        setTimeout(() => {
            confirmation.remove();
        }, 500);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(confirmation)) {
            confirmation.classList.remove('visible');
            setTimeout(() => {
                if (document.body.contains(confirmation)) {
                    confirmation.remove();
                }
            }, 500);
        }
    }, 5000);
}
