/*
document.addEventListener('DOMContentLoaded', function () {
    const nodes = document.querySelectorAll('.bamboo-node');
    const panda = document.querySelector('.panda');
    const sections = document.querySelectorAll('.section');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const bambooNav = document.getElementById('bamboo-nav');

    // Mobile menu toggle functionality
    mobileMenuToggle.addEventListener('click', function() {
        bambooNav.classList.toggle('active');
        this.innerHTML = bambooNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when a node is clicked
    function closeMobileMenu() {
        if (window.innerWidth <= 768) {
            bambooNav.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

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
        });
    }

    // Function to update node labels visibility
    function updateNodeLabels() {
        nodes.forEach(node => {
            const nodeLabel = node.querySelector('span');
            
            if (node.classList.contains('active')) {
                // Make the label appear inside the active node
                nodeLabel.style.position = 'relative';
                nodeLabel.style.left = '0';
            } else {
                // Reset label position for inactive nodes
                nodeLabel.style.position = 'absolute';
                nodeLabel.style.left = '-120px';
                
                // Adjust for responsive design
                if (window.innerWidth <= 768) {
                    nodeLabel.style.left = '-100px';
                }
                if (window.innerWidth <= 480) {
                    nodeLabel.style.left = '-80px';
                }
            }
        });
    }

    function setPandaPosition(node, callback) {
        panda.style.top = `${node.offsetTop}px`;

        setTimeout(() => {
            nodes.forEach(n => {
                n.classList.remove('active');
                n.style.width = "25px";
                n.style.height = "25px";
            });

            node.classList.add('active');
            
            // Adjust node size for mobile
            if (window.innerWidth <= 480) {
                node.style.width = "100px";
            } else {
                node.style.width = "130px";
            }
            
            node.style.height = "45px";
            
            // Update labels visibility
            updateNodeLabels();

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
                closeMobileMenu();
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
    window.addEventListener('resize', function() {
        distributeNodes();
        
        // Reapply active node styles on resize
        const activeNode = document.querySelector('.bamboo-node.active');
        if (activeNode) {
            activeNode.style.width = window.innerWidth <= 480 ? "100px" : "130px";
        }
        
        // Also update node labels
        updateNodeLabels();
    });
    
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
        const isMobile = window.innerWidth <= 768;
        
        // Reduce particle count on mobile
        const particleCount = isMobile ? {
            leaves: 10,
            fireflies: 15
        } : {
            leaves: 20,
            fireflies: 30
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
});
*/