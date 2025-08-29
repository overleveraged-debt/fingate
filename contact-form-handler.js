/**
 * Modern Contact Form Handler for FIN GATE
 * Handles form submission to Google Apps Script with proper error handling and user feedback
 * 
 * SETUP: Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL' with your actual Google Apps Script web app URL
 */

// Configuration - REPLACE WITH YOUR ACTUAL GOOGLE APPS SCRIPT URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

/**
 * Initialize the contact form handler when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

/**
 * Main function to set up the contact form
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.log('ℹ️ Contact form not found on this page');
        return;
    }
    
    console.log('✅ Contact form found, initializing handler');
    
    // Add form submission event listener
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation
    addFormValidation(contactForm);
    
    console.log('🚀 Contact form handler initialized successfully');
}

/**
 * Handle form submission with modern async/await
 */
async function handleFormSubmission(event) {
    event.preventDefault();
    
    console.log('📝 Form submission started');
    
    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const submitText = submitBtn.querySelector('.submit-text');
    const loadingText = submitBtn.querySelector('.loading-text');
    const formMessage = document.getElementById('formMessage');
    
    // Prevent multiple submissions
    if (submitBtn.disabled) {
        console.log('⏳ Form already being submitted, ignoring...');
        return;
    }
    
    // Validate Google Apps Script URL is configured
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        showMessage(formMessage, 'Configuration error: Google Apps Script URL not set. Please contact the administrator.', 'error');
        return;
    }
    
    // Show loading state
    setLoadingState(submitBtn, submitText, loadingText, true);
    clearMessage(formMessage);
    
    try {
        // Validate form data
        const formData = new FormData(form);
        const validationResult = validateFormData(formData);
        
        if (!validationResult.isValid) {
            throw new Error(validationResult.message);
        }
        
        console.log('✅ Form validation passed');
        console.log('🚀 Submitting to Google Apps Script...');
        
        // Submit to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData
        });
        
        console.log('📡 Response received:', response.status);
        
        // Handle response
        let result;
        try {
            result = await response.json();
        } catch (parseError) {
            console.error('❌ Failed to parse response as JSON:', parseError);
            throw new Error('Server returned invalid response. Please try again.');
        }
        
        console.log('📋 Response data:', result);
        
        if (result.success) {
            // Success
            showMessage(formMessage, result.message || 'Thank you for your message! We will get back to you soon.', 'success');
            form.reset();
            console.log('✅ Form submitted successfully!');
            
            // Track successful submission (if Google Analytics is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: formData.get('service') || 'General'
                });
            }
        } else {
            // Server returned error
            throw new Error(result.message || 'Form submission failed. Please try again.');
        }
        
    } catch (error) {
        console.error('❌ Form submission error:', error);
        
        let errorMessage = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
        
        // Handle specific error types
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('validation')) {
            errorMessage = error.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showMessage(formMessage, errorMessage, 'error');
        
    } finally {
        // Reset button state
        setLoadingState(submitBtn, submitText, loadingText, false);
        
        // Auto-clear message after 10 seconds
        setTimeout(() => {
            clearMessage(formMessage);
        }, 10000);
    }
}

/**
 * Validate form data before submission
 */
function validateFormData(formData) {
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();
    const service = formData.get('service')?.trim();
    
    // Check required fields
    if (!name) {
        return { isValid: false, message: 'Please enter your name.' };
    }
    
    if (!email) {
        return { isValid: false, message: 'Please enter your email address.' };
    }
    
    if (!phone) {
        return { isValid: false, message: 'Please enter your phone number.' };
    }
    
    if (!service) {
        return { isValid: false, message: 'Please select a service.' };
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address.' };
    }
    
    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        return { isValid: false, message: 'Please enter a valid phone number.' };
    }
    
    return { isValid: true };
}

/**
 * Add real-time form validation
 */
function addFormValidation(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

/**
 * Show field-specific error
 */
function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('border-red-500', 'focus:ring-red-500');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

/**
 * Clear field-specific error
 */
function clearFieldError(field) {
    field.classList.remove('border-red-500', 'focus:ring-red-500');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Set loading state for submit button
 */
function setLoadingState(submitBtn, submitText, loadingText, isLoading) {
    submitBtn.disabled = isLoading;
    
    if (isLoading) {
        submitText?.classList.add('hidden');
        loadingText?.classList.remove('hidden');
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
        submitText?.classList.remove('hidden');
        loadingText?.classList.add('hidden');
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
}

/**
 * Show form message (success or error)
 */
function showMessage(messageElement, text, type) {
    if (!messageElement) return;
    
    messageElement.textContent = text;
    
    // Clear existing classes
    messageElement.className = 'mt-4 text-center p-3 rounded-lg font-semibold';
    
    // Add type-specific classes
    if (type === 'success') {
        messageElement.classList.add('text-green-700', 'bg-green-50', 'border', 'border-green-200');
    } else if (type === 'error') {
        messageElement.classList.add('text-red-700', 'bg-red-50', 'border', 'border-red-200');
    }
}

/**
 * Clear form message
 */
function clearMessage(messageElement) {
    if (!messageElement) return;
    
    messageElement.textContent = '';
    messageElement.className = 'mt-4 text-center';
}

/**
 * Utility function to log form data for debugging
 */
function logFormData(formData) {
    console.log('📋 Form Data:');
    for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
    }
}
