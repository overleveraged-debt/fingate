// Header Component
function createHeader(activePage = '') {
    // Apply sticky styles by default - frozen header with larger size
    const headerClass = 'fixed top-0 left-0 w-full z-[1000] bg-black/70 backdrop-blur-sm shadow-md sticky'; // Updated z-index and background

    const logoHeight = 'h-36 md:h-48'; // Logo back in header - 144px mobile / 192px desktop (bigger than all text)
    const textColor = 'text-white'; // Changed to white for dark background
    const buttonColor = 'text-white'; // Changed to white for dark background
    const mobileMenuBg = 'bg-black/95 backdrop-blur-sm border-t border-gray-700'; // Dark background for mobile menu
    const mobileLinkColor = 'text-white'; // White text for better visibility
    const mobileBorderColor = 'border-gray-700'; // Darker border for dark background

    function getNavLinkClass(page) {
        const baseClass = `font-semibold hover:text-orange-500 transition-colors nav-link-hover`;
        if (activePage === page) {
            return `text-orange-600 ${baseClass}`;
        }
        return `${textColor} ${baseClass}`;
    }

    function getMobileLinkClass(page) {
        const baseClass = `block py-3 hover:text-orange-500 border-b ${mobileBorderColor}`;
        if (activePage === page) {
            return `text-orange-600 ${baseClass} font-semibold`;
        }
        return `${mobileLinkColor} ${baseClass}`;
    }

    return `
    <header id="main-header" class="${headerClass}">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
            <!-- Logo back in header - sized to be bigger than all text but not massive -->
            <a href="./index.html" class="flex-shrink-0 logo-shine">
                <img src="./public/assets/images/fin-gate-logo.webp" alt="FIN GATE Logo" class="${logoHeight} transition-all duration-300" id="logo-img">
            </a>
            <div class="hidden md:flex flex-grow justify-center space-x-8 items-center">
                <a href="./index.html#about" class="${getNavLinkClass('about')}">About Us</a>

                <!-- Services Dropdown -->
                <div class="relative group">
                    <button class="${getNavLinkClass('services')} flex items-center space-x-1 cursor-pointer">
                        <span>Services</span>
                        <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <!-- Dropdown Menu -->
                    <div class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div class="py-2">
                            <a href="./services.html#personal-loans" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Personal Loans</a>
                            <a href="./services.html#business-loans" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Business Loans</a>
                            <a href="./services.html#home-loans" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Home Loans</a>
                            <a href="./services.html#car-loans" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Car Loans</a>
                            <a href="./services.html#lap-loans" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Loan Against Property</a>
                            <a href="./services.html#project-loans" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Project Loans</a>
                            <a href="./services.html#unsecured-business-loans" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Unsecured Business Loans</a>
                            <a href="./services.html#bill-discounting" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Bill Discounting</a>
                            <a href="./services.html#medical-equipment-loans" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Medical Equipment Loans</a>
                            <a href="./services.html#machinery-loans" class="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">Machinery Loans</a>
                        </div>
                    </div>
                </div>

                <a href="./index.html#documents" class="${getNavLinkClass('documents')}">Documents</a>
                <a href="./index.html#testimonials" class="${getNavLinkClass('testimonials')}">Testimonials</a>
                <button onclick="openEMICalculator()" class="${getNavLinkClass('emi')} cursor-pointer">EMI Calculator</button>
                <a href="./certificates.html" class="${getNavLinkClass('certificates')}">Certificates</a>
            </div>
            <div class="hidden md:flex items-center flex-shrink-0">
                <a href="./index.html#contact" class="bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-orange-700 cta-button">Contact Us</a>
            </div>
            <div class="md:hidden">
                <button id="mobile-menu-button" class="${buttonColor} focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
        </nav>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden px-6 pb-4 ${mobileMenuBg} max-h-screen overflow-y-auto">
            <a href="/index.html#about" class="${getMobileLinkClass('about')}">About Us</a>

            <!-- Mobile Services Dropdown -->
            <div class="border-b ${mobileBorderColor}">
                <button id="mobile-services-toggle" class="${getMobileLinkClass('services')} cursor-pointer text-left w-full flex items-center justify-between">
                    <span>Services</span>
                    <svg class="w-4 h-4 transition-transform" id="mobile-services-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="mobile-services-dropdown" class="hidden pl-4 pb-2">
                    <a href="./services.html#personal-loans" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Personal Loans</a>
                    <a href="./services.html#business-loans" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Business Loans</a>
                    <a href="./services.html#home-loans" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Home Loans</a>
                    <a href="./services.html#car-loans" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Car Loans</a>
                    <a href="./services.html#lap-loans" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Loan Against Property</a>
                    <a href="./services.html#project-loans" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Project Loans</a>
                    <a href="./services.html#unsecured-business-loans" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Unsecured Business Loans</a>
                    <a href="./services.html#bill-discounting" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Bill Discounting</a>
                    <a href="./services.html#medical-equipment-loans" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Medical Equipment Loans</a>
                    <a href="./services.html#machinery-loans" class="block py-2 text-gray-300 hover:text-orange-500 text-sm">Machinery Loans</a>
                </div>
            </div>

            <a href="/index.html#documents" class="${getMobileLinkClass('documents')}">Documents</a>
            <a href="/index.html#testimonials" class="${getMobileLinkClass('testimonials')}">Testimonials</a>
            <button onclick="openEMICalculator()" class="${getMobileLinkClass('emi')} cursor-pointer text-left w-full">EMI Calculator</button>
            <a href="/certificates.html" class="${getMobileLinkClass('certificates')}">Certificates</a>
            <a href="/index.html#contact" class="block mt-4 bg-orange-600 text-white px-4 py-3 rounded-lg text-center hover:bg-orange-700 font-semibold">Contact Us</a>
        </div>
    </header>`;
}

// Initialize header
function initHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        const pageType = document.body.getAttribute('data-page-type') || 'home';
        const activePage = document.body.getAttribute('data-active-page') || '';
        headerContainer.innerHTML = createHeader(pageType, activePage);

        // Initialize mobile menu functionality
        initMobileMenu();

        // Initialize scroll behavior for auto-hide header
        initHeaderScrollBehavior();
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');

            // Prevent body scrolling when mobile menu is open
            if (isHidden) {
                // Menu is being opened
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.top = `-${window.scrollY}px`;
            } else {
                // Menu is being closed
                const scrollY = document.body.style.top;
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        });

        // Mobile services dropdown functionality
        const servicesToggle = document.getElementById('mobile-services-toggle');
        const servicesDropdown = document.getElementById('mobile-services-dropdown');
        const servicesArrow = document.getElementById('mobile-services-arrow');

        if (servicesToggle && servicesDropdown && servicesArrow) {
            servicesToggle.addEventListener('click', (e) => {
                e.preventDefault();
                servicesDropdown.classList.toggle('hidden');
                servicesArrow.classList.toggle('rotate-180');
            });
        }

        // Close mobile menu when a link inside it is clicked (but not the services toggle)
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                // Restore body scrolling
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
            });
        });

        // Close mobile menu when EMI calculator button is clicked
        const emiButton = mobileMenu.querySelector('button[onclick="openEMICalculator()"]');
        if (emiButton) {
            emiButton.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                // Restore body scrolling
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
            });
        }
    }
}

// Header scroll behavior - auto-hide on scroll down, show on scroll up
function initHeaderScrollBehavior() {
    const header = document.getElementById('main-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let isScrolling = false;
    let scrollTimeout;

    function updateHeaderVisibility() {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);

        // Only trigger if scroll difference is significant (prevents micro-scrolls)
        if (scrollDifference < 5) return;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down and past 100px - hide header
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease-in-out';
        } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
            // Scrolling up or at top - show header
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease-in-out';
        }

        lastScrollY = currentScrollY;
    }

    function handleScroll() {
        if (!isScrolling) {
            // Start of scroll
            isScrolling = true;
        }

        // Clear existing timeout
        clearTimeout(scrollTimeout);

        // Update header visibility immediately for responsive feel
        updateHeaderVisibility();

        // Set timeout to detect end of scrolling
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            // Show header when scrolling stops
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease-in-out';
        }, 150); // Show header 150ms after scrolling stops
    }

    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Show header on mouse movement near top
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 100) {
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease-in-out';
        }
    });

    // Ensure header is visible when page loads
    header.style.transform = 'translateY(0)';
    header.style.transition = 'transform 0.3s ease-in-out';
}
