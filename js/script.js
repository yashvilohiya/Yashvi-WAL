/* ========================================
   Mental Health Awareness Website
   JavaScript Functionality
   ======================================== */

// ========================================
// Navigation Functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger && hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Set active navigation link based on current page
    setActiveNavLink();

    // Navbar scroll effect
    handleNavbarScroll();

    // Image card click handlers
    handleImageCardClicks();

    // Form validations
    handleContactForm();
    handleFeedbackForm();

    // Scroll animations
    initScrollAnimations();
});

// ========================================
// Set Active Navigation Link
// ========================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Handle exact match or index.html for home
        if (currentPage === '' || currentPage === 'index.html') {
            if (href === 'index.html' || href === './' || href === '/') {
                link.classList.add('active');
            }
        } else if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================

function handleNavbarScroll() {
    // This is now handled in initScrollAnimations for better performance
}

// ========================================
// Image Card Click Handlers
// ========================================

function handleImageCardClicks() {
    const imageCards = document.querySelectorAll('.image-card');

    imageCards.forEach(card => {
        card.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            // Smooth scroll to relevant section on home page
            if (section === 'self-care') {
                // Scroll to about page or show self-care content
                window.location.href = 'about.html#self-care';
            } else if (section === 'community') {
                window.location.href = 'about.html#community';
            } else if (section === 'education') {
                window.location.href = 'about.html#education';
            }
        });

        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Learn more about ${card.getAttribute('data-section')}`);

        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ========================================
// Contact Form Validation & Submission (Web3Forms)
// ========================================

function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('form-success');

    // Real-time validation
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateName(this.value, nameError);
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this.value, emailError);
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            validateMessage(this.value, messageError);
        });
    }

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // Validate all fields
        let isValid = true;

        if (nameInput && !validateName(name, nameError)) {
            isValid = false;
        }

        if (emailInput && !validateEmail(email, emailError)) {
            isValid = false;
        }

        if (messageInput && !validateMessage(message, messageError)) {
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            // Scroll to first error
            const firstError = contactForm.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // If valid, show success message after form submission
        // Web3Forms will handle the actual submission
        // We'll show success message optimistically
        const formGroups = contactForm.querySelectorAll('.form-group');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        // Show success message after a short delay (optimistic UI)
        setTimeout(function() {
            formGroups.forEach(group => {
                group.style.opacity = '0.5';
            });

            if (successMessage) {
                successMessage.classList.add('active');
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Reset form after showing success
            setTimeout(function() {
                contactForm.reset();
                formGroups.forEach(group => {
                    group.style.opacity = '1';
                });
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
            }, 5000);
        }, 1000);
    });
}

// ========================================
// Feedback Form Validation & Submission (Web3Forms)
// ========================================

function handleFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    
    if (!feedbackForm) return;

    const nameInput = document.getElementById('feedback-name');
    const emailInput = document.getElementById('feedback-email');
    const feedbackInput = document.getElementById('feedback-text');
    const nameError = document.getElementById('feedback-name-error');
    const emailError = document.getElementById('feedback-email-error');
    const feedbackError = document.getElementById('feedback-text-error');
    const successMessage = document.getElementById('feedback-success');

    // Real-time validation for feedback text
    if (feedbackInput) {
        feedbackInput.addEventListener('blur', function() {
            validateFeedback(this.value, feedbackError);
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this.value, emailError);
        });
    }

    // Form submission
    feedbackForm.addEventListener('submit', function(e) {
        const email = emailInput ? emailInput.value.trim() : '';
        const feedback = feedbackInput ? feedbackInput.value.trim() : '';

        // Validate required fields
        let isValid = true;

        if (emailInput && !validateEmail(email, emailError)) {
            isValid = false;
        }

        if (feedbackInput && !validateFeedback(feedback, feedbackError)) {
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            // Scroll to error
            if (feedbackError && feedbackError.textContent) {
                feedbackError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (emailError && emailError.textContent) {
                emailError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // If valid, show success message after form submission
        const formGroups = feedbackForm.querySelectorAll('.form-group');
        const submitButton = feedbackForm.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
        }

        // Show success message after a short delay (optimistic UI)
        setTimeout(function() {
            formGroups.forEach(group => {
                group.style.opacity = '0.5';
            });

            if (successMessage) {
                successMessage.classList.add('active');
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Reset form after showing success
            setTimeout(function() {
                feedbackForm.reset();
                formGroups.forEach(group => {
                    group.style.opacity = '1';
                });
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit Form';
                }
            }, 5000);
        }, 1000);
    });
}

// ========================================
// Validation Functions
// ========================================

function validateName(name, errorElement) {
    if (!name || name.trim().length === 0) {
        if (errorElement) {
            errorElement.textContent = 'Name is required';
        }
        return false;
    } else if (name.trim().length < 2) {
        if (errorElement) {
            errorElement.textContent = 'Name must be at least 2 characters';
        }
        return false;
    } else if (name.trim().length > 100) {
        if (errorElement) {
            errorElement.textContent = 'Name must be less than 100 characters';
        }
        return false;
    } else {
        if (errorElement) {
            errorElement.textContent = '';
        }
        return true;
    }
}

function validateEmail(email, errorElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || email.trim().length === 0) {
        if (errorElement) {
            errorElement.textContent = 'Email is required';
        }
        return false;
    } else if (!emailRegex.test(email)) {
        if (errorElement) {
            errorElement.textContent = 'Please enter a valid email address';
        }
        return false;
    } else {
        if (errorElement) {
            errorElement.textContent = '';
        }
        return true;
    }
}

function validateMessage(message, errorElement) {
    if (!message || message.trim().length === 0) {
        if (errorElement) {
            errorElement.textContent = 'Message is required';
        }
        return false;
    } else if (message.trim().length < 10) {
        if (errorElement) {
            errorElement.textContent = 'Message must be at least 10 characters';
        }
        return false;
    } else if (message.trim().length > 1000) {
        if (errorElement) {
            errorElement.textContent = 'Message must be less than 1000 characters';
        }
        return false;
    } else {
        if (errorElement) {
            errorElement.textContent = '';
        }
        return true;
    }
}

function validateFeedback(feedback, errorElement) {
    if (!feedback || feedback.trim().length === 0) {
        if (errorElement) {
            errorElement.textContent = 'Feedback is required';
        }
        return false;
    } else if (feedback.trim().length < 10) {
        if (errorElement) {
            errorElement.textContent = 'Feedback must be at least 10 characters';
        }
        return false;
    } else if (feedback.trim().length > 1000) {
        if (errorElement) {
            errorElement.textContent = 'Feedback must be less than 1000 characters';
        }
        return false;
    } else {
        if (errorElement) {
            errorElement.textContent = '';
        }
        return true;
    }
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ========================================
// Scroll Animations
// ========================================

function initScrollAnimations() {
    // Observe elements for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Enhanced navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

