// Validation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Only run validation in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        initValidation();
    } else {
        document.body.classList.add('production');
    }
});

function initValidation() {
    // Create validation button
    const validationBtn = document.createElement('button');
    validationBtn.className = 'validation-btn';
    validationBtn.style.position = 'fixed';
    validationBtn.style.top = '10px';
    validationBtn.style.right = '10px';
    validationBtn.style.zIndex = '9999';
    validationBtn.style.padding = '5px 10px';
    validationBtn.style.background = '#8a2be2';
    validationBtn.style.color = 'white';
    validationBtn.style.border = 'none';
    validationBtn.style.borderRadius = '4px';
    validationBtn.style.cursor = 'pointer';
    validationBtn.textContent = 'Validate';
    
    document.body.appendChild(validationBtn);
    
    // Create validation overlay
    const validationOverlay = document.createElement('div');
    validationOverlay.className = 'validation-overlay';
    validationOverlay.innerHTML = `
        <div class="validation-content">
            <h2>Design and Functionality Validation</h2>
            
            <div class="validation-grid">
                <div class="validation-card">
                    <h3>Accessibility</h3>
                    <ul>
                        <li>Color contrast meets WCAG standards</li>
                        <li>All images have alt text</li>
                        <li>Keyboard navigation works</li>
                        <li>ARIA attributes are used appropriately</li>
                        <li>Reduced motion preference respected</li>
                    </ul>
                </div>
                
                <div class="validation-card">
                    <h3>Responsiveness</h3>
                    <ul>
                        <li>Desktop layout (1200px+)</li>
                        <li>Tablet layout (768px - 1199px)</li>
                        <li>Mobile layout (320px - 767px)</li>
                        <li>Touch targets are appropriate size</li>
                        <li>No horizontal scrolling</li>
                    </ul>
                </div>
                
                <div class="validation-card">
                    <h3>Performance</h3>
                    <ul>
                        <li>Images are optimized</li>
                        <li>CSS and JS are minified</li>
                        <li>Animations are smooth</li>
                        <li>No layout shifts</li>
                        <li>Lazy loading implemented</li>
                    </ul>
                </div>
                
                <div class="validation-card">
                    <h3>Functionality</h3>
                    <ul>
                        <li>Hero animation works</li>
                        <li>Typing effect works</li>
                        <li>Booking system works</li>
                        <li>Navigation works</li>
                        <li>FAQ toggles work</li>
                    </ul>
                </div>
            </div>
            
            <div class="validation-actions">
                <button class="validation-btn" id="run-validation">Run Validation</button>
                <button class="validation-btn" id="close-validation">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(validationOverlay);
    
    // Add event listeners
    validationBtn.addEventListener('click', () => {
        validationOverlay.classList.add('visible');
    });
    
    document.getElementById('close-validation').addEventListener('click', () => {
        validationOverlay.classList.remove('visible');
    });
    
    document.getElementById('run-validation').addEventListener('click', () => {
        runValidation();
    });
}

function runValidation() {
    // Check accessibility
    validateAccessibility();
    
    // Check responsiveness
    validateResponsiveness();
    
    // Check performance
    validatePerformance();
    
    // Check functionality
    validateFunctionality();
}

function validateAccessibility() {
    // Check color contrast
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;
        
        // Simple contrast check (not comprehensive)
        if (color === 'rgb(255, 255, 255)' && bgColor === 'rgba(0, 0, 0, 0)') {
            el.classList.add('a11y-warning');
        }
    });
    
    // Check alt text
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('alt')) {
            img.classList.add('a11y-warning');
        }
    });
    
    // Update validation card
    updateValidationCard('Accessibility');
}

function validateResponsiveness() {
    // Check viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        document.querySelector('head').classList.add('responsive-warning');
    }
    
    // Check fixed width elements
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.width && style.width.includes('px') && parseInt(style.width) > 500) {
            el.classList.add('responsive-warning');
        }
    });
    
    // Update validation card
    updateValidationCard('Responsiveness');
}

function validatePerformance() {
    // Check image sizes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            if (img.naturalWidth > 1000 || img.naturalHeight > 1000) {
                img.classList.add('performance-warning');
            }
        }
    });
    
    // Check for inline styles
    const elementsWithInlineStyle = document.querySelectorAll('[style]');
    elementsWithInlineStyle.forEach(el => {
        el.classList.add('performance-warning');
    });
    
    // Update validation card
    updateValidationCard('Performance');
}

function validateFunctionality() {
    // Check hero animation
    const heroCanvas = document.getElementById('liquid-animation');
    if (!heroCanvas || !heroCanvas.getContext) {
        document.querySelector('.hero-background').classList.add('a11y-warning');
    }
    
    // Check typing effect
    const typingText = document.getElementById('typing-text');
    if (!typingText || !typingText.textContent) {
        document.querySelector('.headline').classList.add('a11y-warning');
    }
    
    // Check booking system
    const ctaButtons = document.querySelectorAll('[data-cal-link]');
    if (ctaButtons.length === 0) {
        document.querySelector('.hero-content').classList.add('a11y-warning');
    }
    
    // Update validation card
    updateValidationCard('Functionality');
}

function updateValidationCard(cardTitle) {
    const card = document.querySelector(`.validation-card h3:contains('${cardTitle}')`).parentNode;
    const list = card.querySelector('ul');
    const items = list.querySelectorAll('li');
    
    // Update items based on validation results
    // This is a simplified example - in a real implementation, you would update based on actual validation results
    items.forEach(item => {
        // Randomly mark some items as issues or warnings for demonstration
        const random = Math.random();
        if (random < 0.1) {
            item.classList.add('issue');
        } else if (random < 0.2) {
            item.classList.add('warning');
        }
    });
}
