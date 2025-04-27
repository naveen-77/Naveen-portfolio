document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 0);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate progress circles
    const circleProgressItems = document.querySelectorAll('.circle-progress');
    
    function animateCircles() {
        circleProgressItems.forEach(item => {
            const percent = item.getAttribute('data-percent');
            const circle = item.querySelector('circle:nth-child(2)');
            
            if (isElementInViewport(item)) {
                const circumference = 2 * Math.PI * 70;
                const offset = circumference - (percent / 100) * circumference;
                
                circle.style.strokeDashoffset = offset;
                item.style.setProperty('--percent', percent);
            }
        });
    }
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate on scroll
    window.addEventListener('scroll', animateCircles);
    animateCircles(); // Run once on page load
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});
// Project gallery image switching
document.querySelectorAll('.gallery-thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const mainImage = this.closest('.project-gallery').querySelector('img:first-child');
        const tempSrc = mainImage.src;
        mainImage.src = this.src;
        this.src = tempSrc;
    });
});