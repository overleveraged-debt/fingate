/**
 * Conditional Swiper Loader
 * Only loads Swiper CSS and JS when Swiper elements are present on the page
 * Prevents duplicate loading and initialization
 */

(function() {
    'use strict';
    
    // Prevent multiple executions
    if (window.swiperLoaderInitialized) return;
    window.swiperLoaderInitialized = true;
    
    // Configuration
    const SWIPER_CSS_URL = 'https://unpkg.com/swiper/swiper-bundle.min.css';
    const SWIPER_JS_URL = 'https://unpkg.com/swiper/swiper-bundle.min.js';
    const SWIPER_SELECTORS = ['.swiper', '.testimonial-swiper'];
    
    // State tracking
    let swiperJSLoaded = false;
    let swiperCSSLoaded = false;
    let initializationAttempted = false;
    
    /**
     * Check if page contains Swiper elements
     */
    function hasSwiperElements() {
        return SWIPER_SELECTORS.some(selector => 
            document.querySelectorAll(selector).length > 0
        );
    }
    
    /**
     * Check if Swiper CSS is already loaded
     */
    function isSwiperCSSLoaded() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        return Array.from(links).some(link => 
            link.href.includes('swiper') || link.href.includes('swiper-bundle')
        );
    }
    
    /**
     * Check if Swiper JS is already loaded
     */
    function isSwiperJSLoaded() {
        return typeof window.Swiper !== 'undefined';
    }
    
    /**
     * Load Swiper CSS dynamically
     */
    function loadSwiperCSS() {
        return new Promise((resolve, reject) => {
            if (isSwiperCSSLoaded()) {
                swiperCSSLoaded = true;
                resolve();
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = SWIPER_CSS_URL;
            link.onload = () => {
                swiperCSSLoaded = true;
                resolve();
            };
            link.onerror = () => {
                console.error('Failed to load Swiper CSS');
                reject(new Error('Failed to load Swiper CSS'));
            };
            
            document.head.appendChild(link);
        });
    }
    
    /**
     * Load Swiper JS dynamically
     */
    function loadSwiperJS() {
        return new Promise((resolve, reject) => {
            if (isSwiperJSLoaded()) {
                swiperJSLoaded = true;
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = SWIPER_JS_URL;
            script.onload = () => {
                swiperJSLoaded = true;
                resolve();
            };
            script.onerror = () => {
                console.error('Failed to load Swiper JS');
                reject(new Error('Failed to load Swiper JS'));
            };
            
            document.body.appendChild(script);
        });
    }
    
    /**
     * Initialize Swiper instances
     */
    function initializeSwipers() {
        if (initializationAttempted) return;
        initializationAttempted = true;
        
        // Wait a bit for DOM to be fully ready
        setTimeout(() => {
            // Call the global initialization function if available
            if (typeof window.initTestimonialSwiper === 'function') {
                window.initTestimonialSwiper();
            }
            
            // For future extensibility - initialize other Swiper types
            // if (typeof window.initOtherSwiper === 'function') {
            //     window.initOtherSwiper();
            // }
        }, 100);
    }
    
    /**
     * Main loader function
     */
    async function loadSwiper() {
        try {
            // Load CSS and JS in parallel
            await Promise.all([
                loadSwiperCSS(),
                loadSwiperJS()
            ]);
            
            // Initialize Swipers once both are loaded
            initializeSwipers();
            
        } catch (error) {
            console.error('Error loading Swiper:', error);
        }
    }
    
    /**
     * Initialize the loader
     */
    function init() {
        // Check if page needs Swiper
        if (!hasSwiperElements()) {
            return;
        }
        
        // Load Swiper resources
        loadSwiper();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // For SPA support - expose function to re-run on route changes
    window.reinitializeSwiperLoader = function() {
        initializationAttempted = false;
        init();
    };
    
})();
