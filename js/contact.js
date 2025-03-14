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
        
        // Animate social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-20px)';
            link.style.transition = `opacity 0.4s ease ${index * 0.1 + 0.3}s, transform 0.4s ease ${index * 0.1 + 0.3}s`;
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, 600 + (index * 100));
        });
        
        // Animate contact cards
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
            
            setTimeout(() => {
                card.style.opacity = '0.85';
                card.style.transform = 'translateY(0)';
            }, 200 + (index * 200));
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
});