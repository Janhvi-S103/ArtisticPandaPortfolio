document.addEventListener('DOMContentLoaded', function() {
    const nodes = document.querySelectorAll('.bamboo-node');
    const pageContent = document.getElementById('page-content');
    const contentCache = {}; // Cache for loaded content
    
    // Function to load page content
    async function loadContent(pageName) {
        try {
            // Check if content is already in cache
            if (contentCache[pageName]) {
                pageContent.innerHTML = contentCache[pageName];
                return;
            }
            
            // Load content via fetch
            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load ${pageName} content`);
            }
            
            const content = await response.text();
            
            // Cache the content
            contentCache[pageName] = content;
            
            // Set the content
            pageContent.innerHTML = content;
            
        } catch (error) {
            console.error('Error loading content:', error);
            pageContent.innerHTML = `<section class="section visible">
                <h2>Error Loading Content</h2>
                <p>Sorry, there was a problem loading the requested page.</p>
            </section>`;
        }
    }
    
    // Function to handle navigation
    function navigateTo(sectionId) {
        const { setPandaPosition, closeMobileMenu } = window.navigationUtils;
        
        // Find the node for this section
        const targetNode = document.querySelector(`.bamboo-node[data-section="${sectionId}"]`);
        
        if (targetNode) {
            // Set panda position and activate the node
            setPandaPosition(targetNode, () => {
                // Load the content
                loadContent(sectionId);
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Update URL without page reload
                history.pushState({ section: sectionId }, '', `#${sectionId}`);
            });
        }
    }
    
    // Set up click handlers for navigation nodes
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            navigateTo(sectionId);
        });
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.section) {
            navigateTo(event.state.section);
        } else {
            // Default to home if no state
            navigateTo('home');
        }
    });
    
    // Initialize the first page
    function initializePage() {
        // Check if URL has a hash
        const hash = window.location.hash.substring(1);
        if (hash && document.querySelector(`.bamboo-node[data-section="${hash}"]`)) {
            navigateTo(hash);
        } else {
            // Default to home
            navigateTo('home');
        }
    }
    
    // Initialize the page
    initializePage();
});