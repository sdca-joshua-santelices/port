// Cursor.js - Cyberpunk Smokey Trail Cursor Effect
// Para sa maangas na cursor animation na nagfe-fade like smoke
// Joshua Santelices - Cyberpunk Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // ----- CURSOR ELEMENTS AND VARIABLES -----
    
    // Main cursor elements - eto yung normal cursor at outer glow
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check kung touch device - kung phone or tablet, wag na i-show cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cursorDot && cursorOutline) {
        // ----- SMOKE TRAIL EFFECT SETUP -----
        
        // Create smoke trail elements - eto yung mga dots na nagfe-fade like smoke
        const maxTrails = 15; // Ilang trails - mas marami, mas makapal yung smoke effect
        const trails = [];
        
        // Create color array for rainbow cycling - astig mga colors pre!
        const trailColors = [
            'rgba(20, 239, 255, 0.5)',    // Neon Blue
            'rgba(162, 57, 255, 0.5)',    // Neon Purple
            'rgba(255, 41, 117, 0.5)',    // Neon Pink
            'rgba(0, 255, 200, 0.5)',     // Cyan
        ];
        
        // Current color index for rainbow effect
        let colorIndex = 0;
        
        // Create each trail element - gagawa tayo ng multiple divs for smoke effect
        for (let i = 0; i < maxTrails; i++) {
            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            trail.style.width = `${5 + Math.random() * 10}px`;  // Random size para mas natural
            trail.style.height = trail.style.width;
            trail.style.opacity = '0';
            trail.style.backgroundColor = trailColors[colorIndex];
            trail.style.zIndex = '9998';
            trail.style.borderRadius = '50%';
            trail.style.position = 'fixed';
            trail.style.pointerEvents = 'none';
            trail.style.filter = 'blur(5px)';
            trail.style.transition = 'transform 0.15s ease-out, opacity 0.8s ease-out';
            
            document.body.appendChild(trail);
            trails.push({
                element: trail,
                x: 0,
                y: 0,
                scale: 0.5 + Math.random() * 0.5,
                active: false,
                createdAt: 0
            });
        }
        
        // ----- MOUSE MOVEMENT TRACKING -----
        
        // Variables to track mouse position and movement
        let mouseX = 0;
        let mouseY = 0;
        let prevMouseX = 0;
        let prevMouseY = 0;
        let mouseSpeed = 0;
        
        // Trail spawning variables
        let lastTrailSpawn = 0;
        const trailSpawnDelay = 40; // Ms between each trail - mas mababa, mas maraming trails
        
        // ----- CURSOR POSITIONING AND MOVEMENT -----
        
        // Update cursor position on mouse move - main cursor movement handler
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Calculate mouse speed for dynamic effects
            const dx = mouseX - prevMouseX;
            const dy = mouseY - prevMouseY;
            mouseSpeed = Math.sqrt(dx * dx + dy * dy);
            
            // Move main cursor dot and outline
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            
            // Slightly delayed outline for smooth effect
            animateCursorOutline();
            
            // Spawn new trail based on speed and time
            const now = Date.now();
            if (now - lastTrailSpawn > trailSpawnDelay) {
                spawnTrail();
                lastTrailSpawn = now;
                
                // Update color for rainbow effect - para colorful yung trails
                colorIndex = (colorIndex + 1) % trailColors.length;
            }
            
            // Update previous position for next speed calculation
            prevMouseX = mouseX;
            prevMouseY = mouseY;
        });
        
        // ----- CURSOR STATE MANAGEMENT -----
        
        // Hide system cursor - kasi meron na tayong custom cursor
        document.body.style.cursor = 'none';
        
        // Make cursor visible when mouse enters window
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
            
            // Also hide all trails
            trails.forEach(trail => {
                trail.element.style.opacity = '0';
            });
        });
        
        // Animate cursor dot on click - para may feedback pag click
        document.addEventListener('mousedown', () => {
            cursorDot.style.transform = 'scale(0.8)';
            cursorOutline.style.transform = 'scale(1.5)';
            
            // Add more trails on click - para may burst effect
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    spawnTrail(1.2); // Larger trails on click
                }, i * 50);
            }
        });
        
        // Reset cursor dot size on mouse up
        document.addEventListener('mouseup', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
        
        // ----- CURSOR HOVER STATES -----
        
        // Change cursor appearance when hovering over links and buttons
        const allLinks = document.querySelectorAll('a, button, .nav-link, .cyber-btn, .mode-toggle');
        
        allLinks.forEach(link => {
            link.addEventListener('mouseover', () => {
                cursorDot.style.transform = 'scale(0.5)';
                cursorOutline.style.transform = 'scale(1.5)';
                cursorOutline.style.borderColor = 'var(--accent-color)';
                
                // Set cursor to pointer to ensure accessibility
                link.style.cursor = 'none';
            });
            
            link.addEventListener('mouseout', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
                cursorOutline.style.borderColor = 'var(--primary-color)';
            });
        });
        
        // ----- HELPER FUNCTIONS -----
        
        // Animate the cursor outline with slight lag for smooth effect
        function animateCursorOutline() {
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                // Add slight lag to outline for smooth effect
                const outlineX = mouseX;
                const outlineY = mouseY;
                cursorOutline.style.left = `${outlineX}px`;
                cursorOutline.style.top = `${outlineY}px`;
            });
        }
        
        // Create a new trail element at current mouse position
        function spawnTrail(sizeMultiplier = 1) {
            // Find an inactive trail to reuse
            const inactiveTrail = trails.find(t => !t.active);
            if (!inactiveTrail) return;
            
            // Activate trail and set position
            inactiveTrail.active = true;
            inactiveTrail.x = mouseX;
            inactiveTrail.y = mouseY;
            inactiveTrail.createdAt = Date.now();
            
            // Apply slight randomness to size and position for natural look
            const size = (5 + Math.random() * 10) * sizeMultiplier;
            const offset = (mouseSpeed * 0.5) * (Math.random() - 0.5);
            
            // Position and style the trail element
            inactiveTrail.element.style.width = `${size}px`;
            inactiveTrail.element.style.height = `${size}px`;
            inactiveTrail.element.style.left = `${mouseX + offset}px`;
            inactiveTrail.element.style.top = `${mouseY + offset}px`;
            inactiveTrail.element.style.backgroundColor = trailColors[colorIndex];
            inactiveTrail.element.style.opacity = '0.7';
            
            // Start fading out
            setTimeout(() => {
                inactiveTrail.element.style.transform = `scale(${1.5 + Math.random()})`;
                inactiveTrail.element.style.opacity = '0';
                
                // Reset after animation completes
                setTimeout(() => {
                    inactiveTrail.active = false;
                }, 800);
            }, 10);
        }
    } else {
        // ----- TOUCH DEVICE HANDLING -----
        
        // Remove cursor elements on touch devices for better performance
        if (cursorDot) cursorDot.remove();
        if (cursorOutline) cursorOutline.remove();
        
        // Add touch-device class to body for CSS adjustments
        document.body.classList.add('touch-device');
    }
});