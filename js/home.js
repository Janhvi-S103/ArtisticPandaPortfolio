document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('dynamic-quote')) {
        initializeHomePage();
    }
});

window.initializeHomePage = function() {
    const quotes = [
        { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
        { text: "The details are not the details. They make the design.", author: "Charles Eames" },
        { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
        { text: "Good design is obvious. Great design is transparent.", author: "Joe Sparano" },
        { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
        { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" }
    ];

    const quoteElement = document.getElementById('dynamic-quote');
    const authorElement = document.getElementById('quote-author');

    if (quoteElement && authorElement) {
        function updateQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomIndex];

            quoteElement.classList.add('quote-fade');
            authorElement.classList.add('quote-fade');

            setTimeout(() => {
                quoteElement.textContent = `"${quote.text}"`;
                authorElement.textContent = `- ${quote.author}`;
                quoteElement.classList.remove('quote-fade');
                authorElement.classList.remove('quote-fade');
            }, 500);
        }

        setInterval(updateQuote, 7000);
    }

    const workBtn = document.querySelector('.work-btn');
    const resumeBtn = document.querySelector('.resume-btn');
    const contactBtn = document.querySelector('.contact-btn');

    function navigateToSection(section) {
        const node = document.querySelector(`.bamboo-node[data-section="${section}"]`);
        if (node) node.click();
    }

    if (workBtn) workBtn.addEventListener('click', () => navigateToSection('projects'));
    if (resumeBtn) resumeBtn.addEventListener('click', () => navigateToSection('resume'));
    if (contactBtn) contactBtn.addEventListener('click', () => navigateToSection('contact'));
};
document.addEventListener('DOMContentLoaded', function() {
    initializeHomePage();
    observeFeaturedProjects();
});

function observeFeaturedProjects() {
    const projectSection = document.querySelector('.featured-projects');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectSection.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(projectSection);
}
