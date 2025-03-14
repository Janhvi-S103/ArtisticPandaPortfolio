// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');

// Create container for particles
const particleContainer = document.createElement('div');
particleContainer.className = 'particle-container';
document.body.appendChild(particleContainer);

// Set initial particles based on theme
updateParticles();

// Toggle theme functionality
themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    
    // Clear existing particles
    particleContainer.innerHTML = '';
    
    // Create new particles after a short delay to allow theme to change
    setTimeout(updateParticles, 100);
});

function updateParticles() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const isMobile = window.innerWidth <= 768;
    
    // Reduce particle count on mobile
    const particleCount = isMobile ? {
        leaves: 10,
        fireflies: 8
    } : {
        leaves: 20,
        fireflies: 15
    };
    
    if (isDarkMode) {
        createFireflies(particleCount.fireflies);
    } else {
        createLeaves(particleCount.leaves);
    }
}

function createLeaves(count) {
    for (let i = 0; i < count; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        // Random leaf properties
        const size = Math.random() * 10 + 10; // 10-20px
        const randomColor = getRandomGreenShade();
        const delay = Math.random() * 10; // 0-10s delay
        const duration = Math.random() * 10 + 15; // 15-25s duration
        const leftPos = Math.random() * 100; // 0-100% from left
        const rotateAngle = Math.random() * 360; // Random rotation
        
        // Set leaf styles
        leaf.style.cssText = `
            left: ${leftPos}%;
            width: ${size}px;
            height: ${size}px;
            filter: hue-rotate(${randomColor}deg);
            animation: falling ${duration}s linear ${delay}s infinite;
            transform: rotate(${rotateAngle}deg);
        `;
        
        particleContainer.appendChild(leaf);
    }
}

function createFireflies(count) {
    for (let i = 0; i < count; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        // Random firefly properties
        const size = Math.random() * 3 + 2; // 2-5px
        const floatDuration = Math.random() * 10 + 10; // 10-20s duration
        const glowDuration = Math.random() * 3 + 2; // 2-5s glow cycle
        const delay = Math.random() * 2; // 0-2s delay
        const leftPos = Math.random() * 100; // 0-100% from left
        const topPos = Math.random() * 100; // 0-100% from top
        
        // Set firefly styles
        firefly.style.cssText = `
            left: ${leftPos}%;
            top: ${topPos}%;
            width: ${size}px;
            height: ${size}px;
            animation: 
                glow ${glowDuration}s ease-in-out ${delay}s infinite,
                float ${floatDuration}s ease-in-out ${delay}s infinite;
        `;
        
        particleContainer.appendChild(firefly);
    }
}

function getRandomGreenShade() {
    // Return a random value to shift the hue towards different green shades
    return Math.floor(Math.random() * 40) - 20; // -20 to +20 degree shift
}

// Update particles on window resize
window.addEventListener('resize', function() {
    // Clear existing particles
    particleContainer.innerHTML = '';
    
    // Create new particles with adjusted count
    updateParticles();
});

