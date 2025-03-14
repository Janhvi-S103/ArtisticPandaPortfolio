document.addEventListener('DOMContentLoaded', function() {
    // Make the contact section visible when loaded
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        setTimeout(() => {
            contactSection.classList.add('visible');
        }, 100);
    }
    
    // Add subtle animations to contact items when they come into view
    const animateItems = () => {
        // Animate contact items
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 300 + (index * 100));
        });
    };
    
    // Run animations when contact section is visible
    if (contactSection && contactSection.classList.contains('visible')) {
        animateItems();
    } else if (contactSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateItems();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(contactSection);
    }
    
    // Add email click handler
    const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Gmail redirect can be configured here
            // Currently using the default mailto: behavior
            // If you want to specifically redirect to Gmail compose:
            // e.preventDefault();
            // window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${this.href.replace('mailto:', '')}`);
        });
    }
});