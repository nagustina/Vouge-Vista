// VogueVista JavaScript - Main Script File
// Handles all interactive functionality across the website

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // ==========================================
    // HERO SLIDESHOW
    // ==========================================
    
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('fade'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('fade');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Initialize slideshow if elements exist
    if (slides.length > 0) {
        showSlide(0);
        startSlideshow();
        
        // Navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopSlideshow();
                startSlideshow(); // Restart auto-play
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopSlideshow();
                startSlideshow(); // Restart auto-play
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlideshow();
                startSlideshow(); // Restart auto-play
            });
        });
        
        // Pause slideshow on hover
        const slideshow = document.querySelector('.slideshow-container');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', stopSlideshow);
            slideshow.addEventListener('mouseleave', startSlideshow);
        }
    }
    
    // Manual slideshow controls (for onclick attributes in HTML)
    window.plusSlides = function(n) {
        if (n > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        stopSlideshow();
        startSlideshow();
    };
    
    window.currentSlide = function(n) {
        showSlide(n - 1);
        stopSlideshow();
        startSlideshow();
    };
    
    // ==========================================
    // TIPS TAB FUNCTIONALITY
    // ==========================================
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==========================================
    // NEWSLETTER FORM
    // ==========================================
    
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate form submission
                alert('Thank you for subscribing to our newsletter!');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
    
    // ==========================================
    // CONTACT FORM
    // ==========================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (name && email && subject && message) {
                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ==========================================
    // NAVBAR BACKGROUND ON SCROLL
    // ==========================================
    
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'var(--light-color)';
                navbar.style.backdropFilter = 'none';
            }
        });
    }
    
    // ==========================================
    // ANIMATE ELEMENTS ON SCROLL
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.category-card, .tip-box, .gallery-item, .team-member, .mission-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==========================================
    // HANDLE URL FILTER PARAMETERS
    // ==========================================
    
    // Check if there are filter parameters in the URL (for trends page)
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam && window.location.pathname.includes('trends.html')) {
        // Find and activate the corresponding filter button
        const filterButton = document.querySelector(`[data-filter="${filterParam}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ==========================================
// LAZY LOADING FOR IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// ERROR HANDLING FOR IMAGES
// ==========================================

document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

console.log('VogueVista website loaded successfully!');