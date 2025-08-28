/**
 * Google Analytics 4 Helper Functions for FIN GATE
 * Provides easy-to-use functions for tracking page views and custom events
 * 
 * Usage:
 * import { pageview, event } from './src/lib/analytics.js';
 * 
 * pageview('/services');
 * event({ action: 'form_submit', category: 'Contact', label: 'Personal Loan' });
 */

/**
 * Check if Google Analytics is available and we're in production
 * @returns {boolean} True if GA is available and should track
 */
function isGAAvailable() {
    // Check if gtag function exists
    if (typeof gtag === 'undefined') {
        console.log('📊 GA4: gtag not available');
        return false;
    }
    
    // Check if we're in development (localhost or 127.0.0.1)
    const isDevelopment = location.hostname === 'localhost' || 
                         location.hostname === '127.0.0.1' ||
                         location.hostname === '';
    
    if (isDevelopment) {
        console.log('📊 GA4: Tracking disabled in development environment');
        return false;
    }
    
    return true;
}

/**
 * Track a page view
 * @param {string} url - The page URL to track (e.g., '/services', '/certificates')
 * @param {string} title - Optional page title
 */
export function pageview(url, title = null) {
    if (!isGAAvailable()) return;
    
    try {
        const config = {
            page_location: window.location.origin + url,
            page_path: url
        };
        
        if (title) {
            config.page_title = title;
        }
        
        gtag('config', 'G-22DZ8R6VLX', config);
        
        console.log('📊 GA4: Page view tracked:', url);
    } catch (error) {
        console.error('📊 GA4: Error tracking page view:', error);
    }
}

/**
 * Track a custom event
 * @param {Object} eventData - Event data object
 * @param {string} eventData.action - The action being tracked (e.g., 'form_submit', 'click', 'download')
 * @param {string} eventData.category - Event category (e.g., 'Contact', 'Navigation', 'Engagement')
 * @param {string} eventData.label - Optional event label for additional context
 * @param {number} eventData.value - Optional numeric value associated with the event
 * @param {Object} eventData.custom_parameters - Optional custom parameters object
 */
export function event({ action, category, label = null, value = null, custom_parameters = {} }) {
    if (!isGAAvailable()) return;
    
    if (!action) {
        console.error('📊 GA4: Event action is required');
        return;
    }
    
    try {
        const eventParams = {
            event_category: category || 'General',
            ...custom_parameters
        };
        
        if (label) {
            eventParams.event_label = label;
        }
        
        if (value !== null && typeof value === 'number') {
            eventParams.value = value;
        }
        
        gtag('event', action, eventParams);
        
        console.log('📊 GA4: Event tracked:', { action, category, label, value });
    } catch (error) {
        console.error('📊 GA4: Error tracking event:', error);
    }
}

/**
 * Track form submissions
 * @param {string} formName - Name of the form (e.g., 'contact_form', 'newsletter')
 * @param {string} formLocation - Where the form is located (e.g., 'homepage', 'contact_page')
 * @param {Object} additionalData - Additional form data to track
 */
export function trackFormSubmission(formName, formLocation = 'unknown', additionalData = {}) {
    event({
        action: 'form_submit',
        category: 'Form',
        label: `${formName}_${formLocation}`,
        custom_parameters: {
            form_name: formName,
            form_location: formLocation,
            ...additionalData
        }
    });
}

/**
 * Track button clicks
 * @param {string} buttonName - Name/text of the button
 * @param {string} buttonLocation - Where the button is located
 * @param {string} buttonType - Type of button (e.g., 'cta', 'navigation', 'social')
 */
export function trackButtonClick(buttonName, buttonLocation = 'unknown', buttonType = 'button') {
    event({
        action: 'click',
        category: 'Button',
        label: buttonName,
        custom_parameters: {
            button_name: buttonName,
            button_location: buttonLocation,
            button_type: buttonType
        }
    });
}

/**
 * Track EMI calculator usage
 * @param {string} calculatorAction - Action taken (e.g., 'calculate', 'reset', 'apply')
 * @param {Object} calculatorData - Calculator data (loan amount, interest rate, tenure)
 */
export function trackEMICalculator(calculatorAction, calculatorData = {}) {
    event({
        action: 'emi_calculator',
        category: 'Tool',
        label: calculatorAction,
        custom_parameters: {
            calculator_action: calculatorAction,
            ...calculatorData
        }
    });
}

/**
 * Track service interest
 * @param {string} serviceName - Name of the service
 * @param {string} source - Where the interest was shown (e.g., 'homepage', 'services_page')
 */
export function trackServiceInterest(serviceName, source = 'unknown') {
    event({
        action: 'service_interest',
        category: 'Service',
        label: serviceName,
        custom_parameters: {
            service_name: serviceName,
            interest_source: source
        }
    });
}

/**
 * Track certificate views
 * @param {string} certificateName - Name/ID of the certificate viewed
 */
export function trackCertificateView(certificateName) {
    event({
        action: 'certificate_view',
        category: 'Certificate',
        label: certificateName,
        custom_parameters: {
            certificate_name: certificateName
        }
    });
}

/**
 * Track phone number clicks (call tracking)
 * @param {string} phoneNumber - The phone number clicked
 * @param {string} location - Where the phone number was clicked
 */
export function trackPhoneClick(phoneNumber, location = 'unknown') {
    event({
        action: 'phone_click',
        category: 'Contact',
        label: phoneNumber,
        custom_parameters: {
            phone_number: phoneNumber,
            click_location: location
        }
    });
}

/**
 * Track email clicks
 * @param {string} emailAddress - The email address clicked
 * @param {string} location - Where the email was clicked
 */
export function trackEmailClick(emailAddress, location = 'unknown') {
    event({
        action: 'email_click',
        category: 'Contact',
        label: emailAddress,
        custom_parameters: {
            email_address: emailAddress,
            click_location: location
        }
    });
}

/**
 * Track WhatsApp clicks
 * @param {string} location - Where the WhatsApp button was clicked
 */
export function trackWhatsAppClick(location = 'unknown') {
    event({
        action: 'whatsapp_click',
        category: 'Contact',
        label: 'WhatsApp',
        custom_parameters: {
            click_location: location
        }
    });
}

// Auto-track page views on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const currentPath = window.location.pathname;
    const currentTitle = document.title;
    
    // Track initial page view
    pageview(currentPath, currentTitle);
});

// Export all functions for easy importing
export default {
    pageview,
    event,
    trackFormSubmission,
    trackButtonClick,
    trackEMICalculator,
    trackServiceInterest,
    trackCertificateView,
    trackPhoneClick,
    trackEmailClick,
    trackWhatsAppClick,
    isGAAvailable
};
