document.addEventListener('DOMContentLoaded', function() {
    const nodes = document.querySelectorAll('.bamboo-node');
    const pageContent = document.getElementById('page-content');
    const contentCache = {}; // Cache for loaded content

    // Function to load page content
    async function loadContent(pageName) {
        try {
            if (contentCache[pageName]) {
                pageContent.innerHTML = contentCache[pageName];
                executePageScripts(pageName);
                return;
            }

            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) throw new Error(`Failed to load ${pageName} content`);

            const content = await response.text();
            contentCache[pageName] = content;
            pageContent.innerHTML = content;
            executePageScripts(pageName);
        } catch (error) {
            console.error('Error loading content:', error);
            pageContent.innerHTML = `<section class="section visible">
                <h2>Error Loading Content</h2>
                <p>Sorry, there was a problem loading the requested page.</p>
                <p>Error details: ${error.message}</p>
            </section>`;
        }
    }

    // Function to execute page-specific scripts
    function executePageScripts(pageName) {
        if (pageName === 'home' && typeof window.initializeHomePage === 'function') {
            window.initializeHomePage();
        }
    }

    // Navigation handling
    function navigateTo(sectionId) {
        const { setPandaPosition, closeMobileMenu } = window.navigationUtils;
        const targetNode = document.querySelector(`.bamboo-node[data-section="${sectionId}"]`);

        if (targetNode) {
            setPandaPosition(targetNode, () => {
                loadContent(sectionId);
                closeMobileMenu();
                history.pushState({ section: sectionId }, '', `#${sectionId}`);
            });
        }
    }

    // Setup click handlers for navigation
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            navigateTo(this.getAttribute('data-section'));
        });
    });

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.section) {
            navigateTo(event.state.section);
        } else {
            navigateTo('home');
        }
    });

    function initializePage() {
        const hash = window.location.hash.substring(1);
        if (hash && document.querySelector(`.bamboo-node[data-section="${hash}"]`)) {
            navigateTo(hash);
        } else {
            navigateTo('home');
        }
    }

    initializePage();
});
