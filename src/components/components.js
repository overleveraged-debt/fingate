// Main Components Loader
// This file loads and initializes all components

// Load all component files
function loadComponents() {
    // Initialize header
    if (typeof initHeader === 'function') {
        initHeader();
    }
    
    // Initialize footer
    if (typeof initFooter === 'function') {
        initFooter();
    }
    
    // Initialize other common functionality
    initCommonFunctionality();
}

// Common functionality across all pages
function initCommonFunctionality() {
    // Scroll animations
    initScrollAnimations();

    // Smooth scrolling for anchor links
    initSmoothScrolling();

    // Initialize Swiper for testimonials
    initTestimonialSwiper();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize testimonial swiper
function initTestimonialSwiper() {
    // Prevent double initialization
    if (window.testimonialSwiperInitialized) return;

    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        const testimonialSwiper = document.querySelector('.testimonial-swiper');
        if (testimonialSwiper && typeof Swiper !== 'undefined') {
            // Mark as initialized to prevent duplicates
            window.testimonialSwiperInitialized = true;

            new Swiper('.testimonial-swiper', {
                // Basic settings
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                centeredSlides: false,
                grabCursor: true,

                // Autoplay settings
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },

                // Speed and effects
                speed: 600,
                effect: 'slide',

                // Pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 3,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // Keyboard control
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },

                // Touch settings
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: true,

                // Responsive breakpoints
                breakpoints: {
                    // Mobile devices
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
                    // Small tablets
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    // Tablets
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    // Small desktops
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    // Large desktops
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 35,
                    },
                    // Extra large screens
                    1536: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    }
                },

                // Event callbacks
                on: {
                    init: function () {
                        console.log('Testimonial swiper initialized');
                    },
                    slideChange: function () {
                        // Optional: Add any custom behavior on slide change
                    },
                    reachEnd: function () {
                        // Optional: Add behavior when reaching the end
                    }
                }
            });
        } else {
            console.warn('Swiper not found or not loaded');
        }
    }, 200);
}

// Make function globally available for conditional loader
window.initTestimonialSwiper = initTestimonialSwiper;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadComponents);

// Also initialize if DOM is already loaded (in case script loads after DOM)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
