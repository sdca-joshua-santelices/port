// Main script.js - dito lahat ng functions para sa buong portfolio site
// Joshua Santelices 
// Last updated: May 2025

document.addEventListener('DOMContentLoaded', function() {
    // ----- SETUP & INITIALIZATION -----
    
    // Init AOS library para sa mga smooth scroll animations - G na 'to pre!
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // ----- DARK/LIGHT MODE TOGGLE -----
    
    // Dark/Light mode toggle setup - dito nag-iiba yung theme colors
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    const modeIcon = modeToggle.querySelector('i');
    
    // Check if user has preferred mode in localStorage
    if(localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
    
    // Event listener para sa mode toggle button
    modeToggle.addEventListener('click', function() {
        // Toggle class sa body
        body.classList.toggle('light-mode');
        
        // Change icon from moon to sun or vice versa - para alam mo kung anong mode ka
        if (body.classList.contains('light-mode')) {
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
            
            // Animate icon with rotation - para may astig na effect
            modeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                modeIcon.style.transform = 'rotate(0)';
            }, 600);
        } else {
            modeIcon.classList.remove('fa-sun');
            modeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
            
            // Animate icon with rotation - para may astig na effect
            modeIcon.style.transform = 'rotate(-360deg)';
            setTimeout(() => {
                modeIcon.style.transform = 'rotate(0)';
            }, 600);
        }
    });
    
    // ----- TYPEWRITER EFFECT -----
    
    // Typewriter effect para sa homepage subtitle - parang terminal effect pre
    const typewriterText = document.querySelector('.typewriter');
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        let i = 0;
        
        // Function to type one character at a time
        function typeWriter() {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Speed ng typing - pwede mo i-adjust 'to
            } else {
                typewriterText.classList.add('typing-done');
                
                // Start blinking caret animation after typing
                setTimeout(() => {
                    typewriterText.style.borderRight = '3px solid transparent';
                    setInterval(() => {
                        typewriterText.style.borderRight = 
                            typewriterText.style.borderRight === '3px solid transparent' 
                                ? '3px solid var(--primary-color)' 
                                : '3px solid transparent';
                    }, 500);
                }, 500);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // ----- SMOOTH SCROLLING -----
    
    // Smooth scrolling para sa lahat ng anchor links - para di biglang jump yung page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ----- PROFILE PIC ANIMATION -----
    
    // Enhanced profile pic animation - para mas eye-catching yung pics mo
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        // Add subtle hover animation
        profilePic.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 30px var(--primary-color)';
        });
        
        profilePic.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px rgba(var(--primary-color-rgb), 0.6)';
        });
        
        // Add subtle pulse animation - para parang may heartbeat effect
        setInterval(() => {
            profilePic.classList.add('pulse');
            setTimeout(() => {
                profilePic.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }
    
    // ----- TECH STACK ICONS -----
    
    // Tech stack icon hover enhancements - para mas interactive yung page na 'to
    const techIcons = document.querySelectorAll('.tech-icon');
    if (techIcons.length > 0) {
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotate(5deg)';
                this.querySelector('svg path, svg rect, svg circle, svg polygon').style.fill = 'var(--primary-color)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotate(0)';
                this.querySelector('svg path, svg rect, svg circle, svg polygon').style.fill = '';
            });
        });
    }
    
    // ----- CERTIFICATE MODALS -----
    
    // Certificate image preview modals - para ma-view mo yung certificates ng maayos
    const certPreviews = document.querySelectorAll('.certificate-img-preview');
    if (certPreviews.length > 0) {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'certificate-modal-container';
        modalContainer.innerHTML = `
            <div class="certificate-modal glass-panel">
                <div class="certificate-modal-content">
                    <img src="" alt="Certificate Preview" class="modal-certificate-img">
                </div>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
        `;
        document.body.appendChild(modalContainer);
        
        const modal = document.querySelector('.certificate-modal-container');
        const modalImg = document.querySelector('.modal-certificate-img');
        const closeBtn = document.querySelector('.close-modal');
        
        // Open modal when clicking on certificate
        certPreviews.forEach(preview => {
            preview.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-cert');
                modalImg.src = imgSrc;
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
        });
        
        // Close modal when clicking close button or outside the modal
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        function closeModal() {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // ----- CONTACT FORM -----
    
    // Contact form validation and processing
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        // Find status message area
        const statusMsg = contactForm.querySelector('.message-status');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.querySelector('#name');
            const emailInput = document.querySelector('#email');
            const messageInput = document.querySelector('#message');
            
            // Simple validation
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If valid, submit to Firebase
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Update status message
                statusMsg.className = 'message-status connecting';
                statusMsg.innerHTML = '<span class="status-spinner"></span> Connecting to database...';
                
                // Check if Firebase is available
                if (typeof firebase !== 'undefined' && typeof saveMessageToDatabase === 'function') {
                    // First show connecting
                    setTimeout(() => {
                        statusMsg.innerHTML = '<span class="status-spinner"></span> Sending message...';
                        
                        // Save to Firebase
                        saveMessageToDatabase(
                            nameInput.value.trim(),
                            emailInput.value.trim(),
                            messageInput.value.trim()
                        )
                        .then(result => {
                            if (result.success) {
                                // Show success in status message
                                statusMsg.className = 'message-status success';
                                statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
                                
                                // Wait 1.5 seconds then show success message
                                setTimeout(() => {
                                    showSuccessMessage(contactForm);
                                }, 1500);
                            } else {
                                // Show error in status message
                                statusMsg.className = 'message-status error';
                                statusMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to send message. Please try again.';
                                
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalBtnText;
                                console.error('Firebase error:', result.error);
                            }
                        })
                        .catch(error => {
                            // Show error in status message
                            statusMsg.className = 'message-status error';
                            statusMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Connection error. Please try again.';
                            
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnText;
                            console.error('Error:', error);
                        });
                    }, 1000);
                } else {
                    // Firebase not available - show message in status
                    statusMsg.innerHTML = '<span class="status-spinner"></span> Database not available, simulating send...';
                    
                    // Simulate sending after delay
                    setTimeout(() => {
                        console.warn('Firebase not available. Contact form will not save data.');
                        statusMsg.className = 'message-status success';
                        statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
                        
                        // Wait 1.5 seconds then show success message
                        setTimeout(() => {
                            showSuccessMessage(contactForm);
                        }, 1500);
                    }, 2000);
                }
            }
        });
        
        // Function to show success message
        function showSuccessMessage(form) {
            const formContainer = form.closest('.form-container');
            formContainer.innerHTML = `
                <div class="success-message glass-panel" data-aos="fade-up">
                    <h3 class="neon-text">Message Sent!</h3>
                    <p>Thanks for reaching out, I'll get back to you soon.</p>
                    <div class="emoji-container">
                        <span class="emoji" style="animation: emojiFloat 2s ease-in-out infinite">👾</span>
                        <span class="emoji" style="animation: emojiFloat 2.5s ease-in-out infinite 0.2s">🚀</span>
                        <span class="emoji" style="animation: emojiFloat 1.8s ease-in-out infinite 0.4s">💻</span>
                    </div>
                </div>
            `;
        }
        
        // Helper functions for form validation
        function showError(input, message) {
            const formControl = input.parentElement;
            const errorDiv = formControl.querySelector('.error-message') || document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerText = message;
            if (!formControl.querySelector('.error-message')) {
                formControl.appendChild(errorDiv);
            }
            input.classList.add('input-error');
        }
        
        function removeError(input) {
            const formControl = input.parentElement;
            const errorDiv = formControl.querySelector('.error-message');
            if (errorDiv) {
                formControl.removeChild(errorDiv);
            }
            input.classList.remove('input-error');
        }
        
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
    
    // ----- EMOJI ANIMATIONS -----
    
    // Emoji animation for the contact form success - para may cute factor naman
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes emojiFloat {
            0%, 100% { transform: translateY(0) rotate(0); }
            25% { transform: translateY(-10px) rotate(-5deg); }
            75% { transform: translateY(-5px) rotate(5deg); }
            50% { transform: translateY(-15px) rotate(0); }
        }
        .emoji {
            font-size: 2rem;
            display: inline-block;
            margin: 0 8px;
            text-shadow: 0 0 10px rgba(var(--primary-color-rgb), 0.5);
        }
        .emoji-container {
            margin-top: 20px;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
    
    // ----- PAGE TRANSITION EFFECTS -----
    
    // Add page transition effects - para smooth yung pag-navigate between pages
    window.addEventListener('beforeunload', function() {
        document.body.classList.add('page-transition-out');
    });
    
    // Add loading animation when page is loading
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        
        // Animate elements on page load
        const elementsToAnimate = document.querySelectorAll('.section-title, .profile-pic, .typewriter-container');
        elementsToAnimate.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, 300 * index);
        });
    });
    
    // ----- PARALLAX BACKGROUND EFFECT -----
    
    // Add enhanced parallax effect to 3D background layers
    const bgLayer1 = document.querySelector('.bg-layer-1');
    const bgLayer2 = document.querySelector('.bg-layer-2');
    const bgLayer3 = document.querySelector('.bg-layer-3');
    
    if (bgLayer1 && bgLayer2 && bgLayer3) {
        // Parallax effect on mouse movement
        window.addEventListener('mousemove', function(e) {
            // Calculate mouse position as percentage of window size
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Apply different movement amounts to each layer for 3D effect
            // Layer 1 (base) moves the least, layer 3 (top) moves the most
            bgLayer2.style.transform = `translate3d(${x * 15}px, ${y * 15}px, 0)`;
            bgLayer3.style.transform = `translate3d(${x * 25}px, ${y * 25}px, 0)`;
            
            // Subtle light effect follows cursor
            const lightEffect = `radial-gradient(circle at ${x * 100}% ${y * 100}%, 
                               rgba(var(--primary-color-rgb), 0.03) 0%, 
                               rgba(var(--primary-color-rgb), 0.01) 20%, 
                               rgba(0,0,0,0) 60%)`;
            
            bgLayer1.style.backgroundImage = `${lightEffect}, radial-gradient(circle at center, #121824 0%, #080810 100%)`;
            
            // In light mode, adjust the gradient colors
            if (document.body.classList.contains('light-mode')) {
                bgLayer1.style.backgroundImage = `${lightEffect}, radial-gradient(circle at center, #f0f4ff 0%, #e0e5eb 100%)`;
            }
        });
        
        // Parallax effect on scroll
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Calculate scroll percentage
            const scrollPercent = scrollPos / windowHeight;
            
            // Apply subtle parallax on scroll
            bgLayer2.style.transform += ` translateY(${scrollPercent * -10}px)`;
            bgLayer3.style.transform += ` translateY(${scrollPercent * -20}px)`;
        });
    }
    
    // Add floating particles to the background for extra depth
    function createParticles() {
        // Only create particles if we have the background layers
        if (!bgLayer3) return;
        
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -999;
            pointer-events: none;
        `;
        document.body.appendChild(particleContainer);
        
        // Create particles
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Randomize particle properties
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Randomize between primary and secondary color
            const useSecondary = Math.random() > 0.7;
            const color = useSecondary ? 'var(--secondary-color)' : 'var(--primary-color)';
            
            // Style the particle
            particle.className = 'bg-particle';
            particle.style.cssText = `
                position: absolute;
                top: ${y}%;
                left: ${x}%;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: 50%;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            particleContainer.appendChild(particle);
        }
        
        // Add floating animation style
        const particleStyle = document.createElement('style');
        particleStyle.innerHTML = `
            @keyframes floatParticle {
                0% { transform: translate(0, 0); }
                25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
                50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
                75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
                100% { transform: translate(0, 0); }
            }
        `;
        document.head.appendChild(particleStyle);
    }
    
    // Initialize particles
    createParticles();
    
    // ----- RESPONSIVE ADJUSTMENTS -----
    
    // Check if device is touch-enabled - para iba handling sa mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Disable hover effects that don't work well on touch devices
        document.body.classList.add('touch-device');
    }
    
    // ----- PRELOADER ANIMATION -----
    
    // Create and inject preloader - para may cool loading animation
    function createPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="cyber-spinner"></div>
                <div class="loading-text">LOADING<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>
            </div>
        `;
        document.body.prepend(preloader);
        
        // Hide preloader after everything is loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('preloader-hidden');
                setTimeout(function() {
                    preloader.remove();
                }, 500);
            }, 500);
        });
    }
    
    createPreloader();
    
    // ----- CONSOLE EASTER EGG -----
    
    // Add console easter egg - para may surprise sa mga dev na curious
    console.log('%c👾 Welcome to my Cyberpunk Portfolio! 👾', 'color: #14efff; font-size: 20px; font-weight: bold;');
    console.log('%cFeel free to explore the code - Joshua Santelices', 'color: #a239ff; font-size: 14px;');
});