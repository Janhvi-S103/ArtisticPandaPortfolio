document.addEventListener('DOMContentLoaded', function () {
    const nodes = document.querySelectorAll('.bamboo-node');
    const panda = document.querySelector('.panda');
    const sections = document.querySelectorAll('.section');
    const themeToggle = document.getElementById('theme-toggle');

    // Distribute nodes evenly along the bamboo stalk
    function distributeNodes() {
        const bambooStem = document.querySelector('.bamboo-stem');
        const stemHeight = bambooStem.clientHeight;
        const nodeSpacing = stemHeight / (nodes.length + 1);

        nodes.forEach((node, index) => {
            node.style.top = `${(index + 1) * nodeSpacing}px`;
            node.style.width = "25px";
            node.style.height = "25px";
            node.style.transform = "scale(1)";
            node.style.fontSize = "0px";
        });
    }

    function setPandaPosition(node, callback) {
        panda.style.top = `${node.offsetTop}px`;

        setTimeout(() => {
            nodes.forEach(n => {
                n.classList.remove('active');
                n.style.width = "25px";
                n.style.height = "25px";
                n.style.fontSize = "0px";
            });

            node.classList.add('active');
            node.style.width = "130px";
            node.style.height = "45px";
            node.style.fontSize = "18px";

            if (callback) callback();
        }, 500);
    }

    function showSection(sectionId) {
        sections.forEach(section => section.classList.remove('visible'));
        document.getElementById(sectionId).classList.add('visible');
    }

    nodes.forEach(node => {
        node.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');
            setPandaPosition(this, () => {
                showSection(sectionId);
            });
        });
    });

    panda.addEventListener('click', function () {
        const activeNode = document.querySelector('.bamboo-node.active');
        const nodeArray = Array.from(nodes);
        const currentIndex = nodeArray.indexOf(activeNode);

        if (currentIndex === nodeArray.length - 1) {
            nodeArray[0].click();
        } else {
            nodeArray[currentIndex + 1].click();
        }
    });

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // Ensure nodes are evenly spaced when the page loads or resizes
    window.addEventListener('resize', distributeNodes);
    distributeNodes();
    nodes[0].click();
});
document.addEventListener('DOMContentLoaded', function() {
    // Create container for particles
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);
    
    // Set initial particles based on theme
    updateParticles();
    
    // Update particles when theme changes
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        // Clear existing particles
        particleContainer.innerHTML = '';
        
        // Create new particles after a short delay to allow theme to change
        setTimeout(updateParticles, 100);
    });
    
    function updateParticles() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            createFireflies(30);
        } else {
            createLeaves(20);
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
});