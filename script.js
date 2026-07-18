document.addEventListener("DOMContentLoaded", function () {
    // Select the elements we want to watch
    const aboutCard = document.querySelector('.about-card');

    // Setup the Scroll Watcher (Intersection Observer)
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the text box enters 15% of the viewport screen...
            if (entry.isIntersecting) {
                aboutCard.classList.add('reveal'); // Trigger the CSS animation
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the text block is visible
    });

    // Start watching the about card
    if (aboutCard) {
        scrollObserver.observe(aboutCard);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Select both sections we want to animate
    const aboutCard = document.querySelector('.about-card');
    const productsContainer = document.querySelector('.products-container');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Slaps the 'reveal' class onto whichever section enters the viewport
                entry.target.classList.add('reveal'); 
            }
        });
    }, {
        threshold: 0.15 
    });

    // Start watching elements if they exist on the page
    if (aboutCard) scrollObserver.observe(aboutCard);
    if (productsContainer) scrollObserver.observe(productsContainer);
});

document.addEventListener("DOMContentLoaded", function () {
    const aboutCard = document.querySelector('.about-card');
    const productsContainer = document.querySelector('.products-container');
    const contactContainer = document.querySelector('.contact-container'); // NEW

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal'); 
            }
        });
    }, {
        threshold: 0.15 
    });

    if (aboutCard) scrollObserver.observe(aboutCard);
    if (productsContainer) scrollObserver.observe(productsContainer);
    if (contactContainer) scrollObserver.observe(contactContainer); // NEW
});