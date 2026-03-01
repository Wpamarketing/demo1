document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       CUSTOM CURSOR LOGIC
       ========================================== */
    const cursor = document.getElementById('custom-cursor');
    const trailContainer = document.getElementById('cursor-trail-container');
    
    // Only run custom cursor logic if it's a non-touch device (desktop)
    if (window.matchMedia("(pointer: fine)").matches) {
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        // Colors for the trail based on the brand colors
        const trailColors = ['#c05a39', '#f5b120', '#eabfb0', '#fbe096'];
        
        let lastTrailTime = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instantly move the main cursor border
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

            // Create trail dots at an interval feeling smooth but performant
            const now = Date.now();
            if (now - lastTrailTime > 40) { // Every 40ms spawn a dot
                createTrailDot(mouseX, mouseY);
                lastTrailTime = now;
            }
        });

        // Hover effect for links and buttons
        const hoverElements = document.querySelectorAll('a, button');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });

        function createTrailDot(x, y) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            
            // Randomly select a color from the brand palette
            const randomColor = trailColors[Math.floor(Math.random() * trailColors.length)];
            dot.style.backgroundColor = randomColor;
            
            // Center the dot
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            
            trailContainer.appendChild(dot);
            
            // Remove the dot from the DOM after the animation completes (800ms)
            setTimeout(() => {
                dot.remove();
            }, 800);
        }
    }


    /* ==========================================
       SCROLL ANIMATIONS (Fade-In)
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });


    /* ==========================================
       NAVBAR SCROLL EFFECT
       ========================================== */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

});
