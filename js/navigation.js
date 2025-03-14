document.addEventListener('DOMContentLoaded', function () {
    const nodes = document.querySelectorAll('.bamboo-node');
    const panda = document.querySelector('.panda');
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
    
    // Export functions for external use
    window.navigationUtils = {
        closeMobileMenu,
        distributeNodes,
        updateNodeLabels,
        setPandaPosition
    };
    
    // Initialize nodes distribution
    distributeNodes();
    
    // Handle window resize
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
    
    // Set up panda click behavior
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
});