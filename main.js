document.addEventListener('DOMContentLoaded', () => {
    // Helper function to safely access localStorage
    function getStorageItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            // localStorage might be blocked in incognito mode or file:// protocol
            return null;
        }
    }

    function setStorageItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // Silently fail if localStorage is blocked
            console.warn('localStorage is not available');
        }
    }

    // Language Detection and Redirect
    const userLang = navigator.language || navigator.userLanguage;
    const isPortuguese = userLang.startsWith('pt');
    const isPtPage = window.location.pathname.includes('index-pt.html');

    // Check if user has a saved preference
    const savedLang = getStorageItem('preferredLanguage');

    // Prevent infinite redirect loops by checking if we've already redirected
    const hasRedirected = sessionStorage.getItem('hasRedirected');

    // Check if this is a manual language switch (user clicked the switcher)
    const isManualSwitch = sessionStorage.getItem('manualSwitch');

    // Handle automatic redirect based on preference or browser language
    // Skip auto-redirect if user manually switched languages
    if (!hasRedirected && !isManualSwitch) {
        if (savedLang) {
            // User has a saved preference - respect it
            if (savedLang === 'pt' && !isPtPage) {
                sessionStorage.setItem('hasRedirected', 'true');
                window.location.href = 'index-pt.html';
                return;
            } else if (savedLang === 'en' && isPtPage) {
                sessionStorage.setItem('hasRedirected', 'true');
                window.location.href = 'index.html';
                return;
            }
        } else {
            // No saved preference - use browser language for first visit only
            if (!isPtPage && isPortuguese) {
                sessionStorage.setItem('hasRedirected', 'true');
                window.location.href = 'index-pt.html';
                return;
            }
        }
    }

    // Clear the flags after successful load
    sessionStorage.removeItem('hasRedirected');
    sessionStorage.removeItem('manualSwitch');

    // Handle Language Switcher Clicks
    const langSwitch = document.querySelector('.lang-switch');
    if (langSwitch) {
        langSwitch.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Get the target URL from the href attribute
            const targetUrl = langSwitch.getAttribute('href');

            // Save preference based on the target URL (where we're going)
            if (targetUrl.includes('index-pt.html')) {
                setStorageItem('preferredLanguage', 'pt');
            } else {
                setStorageItem('preferredLanguage', 'en');
            }

            // Set flags BEFORE navigation to prevent auto-redirect logic from running
            // This is critical for Firefox compatibility
            sessionStorage.setItem('hasRedirected', 'true');
            sessionStorage.setItem('manualSwitch', 'true');

            // Navigate to the target page
            window.location.href = targetUrl;
        });
    }

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('nav-active');

            // Hamburger Animation
            hamburger.classList.toggle('toggle');
        });
    }

    // Close mobile menu when clicking on a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Debounce function for performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Navbar background on scroll with debouncing and passive listener
    const navbar = document.querySelector('.navbar');
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', debounce(handleNavbarScroll, 10), { passive: true });
});
