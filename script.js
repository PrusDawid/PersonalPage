// ===================================
// Language Switching Functionality
// ===================================
let currentLang = 'pl';

function toggleLanguage() {
    currentLang = currentLang === 'pl' ? 'en' : 'pl';
    localStorage.setItem('preferredLanguage', currentLang);
    updateLanguage();
}

function updateLanguage() {
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update all elements with language data
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        if (currentLang === 'en') {
            element.innerHTML = element.getAttribute('data-en');
        } else {
            // Reset to original Polish content
            const originalContent = element.getAttribute('data-pl');
            if (originalContent) {
                element.innerHTML = originalContent;
            }
        }
    });
    
    // Update language switch button
    document.querySelectorAll('.lang-option').forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Store original Polish content on page load and initialize language
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        // Store the original Polish content
        element.setAttribute('data-pl', element.innerHTML);
    });
    
    // Check if user has a language preference in localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang;
        updateLanguage();
    }
});

// ===================================
// Mobile Menu Toggle
// ===================================
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav a');
    const nav = document.getElementById('mainNav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !toggle.contains(e.target)) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
});

// ===================================
// Phone Number Protection
// ===================================
// Obfuscated phone number - split and encoded to prevent scraping
// Replace this with your actual phone number split into parts
const phonePartA = '+48';  // Country code
const phonePartB = '530';  // First part
const phonePartC = '864';  // Second part
const phonePartD = '451';  // Third part

function revealPhone(event) {
    event.preventDefault();
    
    // Construct the full phone number
    const fullPhone = phonePartA + ' ' + phonePartB + ' ' + phonePartC + ' ' + phonePartD;
    
    // Update both phone number displays
    const phoneElement = document.getElementById('phoneNumber');
    const footerPhoneElement = document.getElementById('footerPhone');
    
    if (phoneElement) {
        phoneElement.innerHTML = fullPhone;
        phoneElement.href = 'tel:' + phonePartA + phonePartB + phonePartC + phonePartD;
    }
    
    if (footerPhoneElement) {
        footerPhoneElement.innerHTML = fullPhone;
        footerPhoneElement.href = 'tel:' + phonePartA + phonePartB + phonePartC + phonePartD;
    }
}

// ===================================
// Contact Form - Mailto Functionality
// ===================================
function sendEmail(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create email body
    const emailBody = `
Imię: ${name}

Wiadomość:
${message}
    `.trim();
    
    // Encode the subject and body for URL
    const mailtoSubject = encodeURIComponent(subject);
    const mailtoBody = encodeURIComponent(emailBody);
    
    // Create mailto link
    const mailtoLink = `mailto:contact@dawidprus.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Open user's email client
    window.location.href = mailtoLink;
    
    // Optional: Show a message to the user
    // You can uncomment this if you want to show a confirmation
    // alert('Opening your email client...');
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for # links that don't have targets
            if (href === '#' && !this.id.includes('phone')) {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const nav = document.getElementById('mainNav');
                const toggle = document.querySelector('.mobile-menu-toggle');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    toggle.classList.remove('active');
                }
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===================================
// Add fade-in animation on scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Add animation to service cards, case cards, and process steps
    const animatedElements = document.querySelectorAll('.service-card, .case-card, .process-step, .tech-category');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
