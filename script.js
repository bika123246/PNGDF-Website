// ===== PNGDF Website - Main JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Search Functionality =====
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    function performSearch(query) {
        if (query && query.trim() !== '') {
            alert('Search functionality: You searched for "' + query.trim() + '". In a production environment, this would redirect to search results.');
            // In production: window.location.href = '/search?q=' + encodeURIComponent(query.trim());
        }
    }
    
    // ===== Mobile Navigation Toggle =====
    // Create mobile menu button for smaller screens
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (nav && navMenu && window.innerWidth <= 768) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-nav-toggle';
        toggleBtn.innerHTML = '☰ Menu';
        toggleBtn.style.cssText = `
            display: block;
            width: 100%;
            padding: 12px;
            background: #1a1a1a;
            color: #fff;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;
        
        nav.insertBefore(toggleBtn, navMenu);
        navMenu.style.display = 'none';
        
        toggleBtn.addEventListener('click', function() {
            if (navMenu.style.display === 'none') {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                toggleBtn.innerHTML = '✕ Close';
            } else {
                navMenu.style.display = 'none';
                toggleBtn.innerHTML = '☰ Menu';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'row';
                toggleBtn.style.display = 'none';
            } else {
                navMenu.style.display = 'none';
                toggleBtn.style.display = 'block';
            }
        });
    }
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
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
    
    // ===== Contact Form Handling =====
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Basic validation
            let valid = true;
            const required = [name, email, subject, message];
            
            required.forEach(field => {
                if (field && !field.value.trim()) {
                    field.style.borderColor = '#CE1126';
                    valid = false;
                } else if (field) {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!valid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                email.style.borderColor = '#CE1126';
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message (simulated)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('Thank you for your message. The PNGDF will respond to your inquiry as soon as possible.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ===== Animate on Scroll (Simple Implementation) =====
    const animateElements = document.querySelectorAll('.ql-item, .value-item, .news-card, .career-card, .benefit-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===== Active Link Highlighting on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ===== Print Current Year in Footer Dynamically =====
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
    
    // ===== External Links: Open in New Tab =====
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    console.log('PNGDF Website initialized successfully.');
    console.log('Papua New Guinea Defence Force — Protecting Our Nation');
});