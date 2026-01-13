document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Split Image Zoom Animation
    const splitImage = document.querySelector('.split-image');
    if (splitImage) {
        const imageObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        imageObserver.observe(splitImage);
    }

    // Philosophy Text Staggered Animation
    const philosophyTextLines = document.querySelectorAll('.philosophy-text-line');
    if (philosophyTextLines.length > 0) {
        const textObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        philosophyTextLines.forEach(line => {
            textObserver.observe(line);
        });
    }

    // Navbar Background on Scroll
    // Dynamic Menu Color
    const menuToggle = document.getElementById('mobile-menu');
    const lightSections = document.querySelectorAll('.split-section, .footer');

    if (menuToggle && lightSections.length > 0) {
        window.addEventListener('scroll', () => {
            let isOverLightSection = false;
            // Define the check point (top right area where menu is)
            const menuTop = 32; // approx 2rem
            const menuBottom = 80;

            lightSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // Check if any part of the light section is behind the menu area
                if (rect.top <= menuBottom && rect.bottom >= menuTop) {
                    isOverLightSection = true;
                }
            });

            if (isOverLightSection) {
                menuToggle.classList.add('dark-mode');
            } else {
                menuToggle.classList.remove('dark-mode');
            }
        });
    }

    // Floating Image Effect (Grid)
    // We target the section containing the grid
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        servicesSection.addEventListener('mousemove', (e) => {
            const images = servicesSection.querySelectorAll('.floating-grid-img');

            images.forEach(img => {
                const container = img.parentElement;
                const rect = container.getBoundingClientRect();

                // Mouse relative to container
                const x = (e.clientX - rect.left) - rect.width / 2;
                const y = (e.clientY - rect.top) - rect.height / 2;

                const speed = parseFloat(img.getAttribute('data-speed')) || 1;

                // transform scaling
                const xOffset = (x * 0.03) * speed;
                const yOffset = (y * 0.03) * speed;

                img.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;
            });
        });

        // Reset
        servicesSection.addEventListener('mouseleave', () => {
            const images = servicesSection.querySelectorAll('.floating-grid-img');
            images.forEach(img => {
                img.style.transform = `translate(-50%, -50%)`;
            });
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        setInterval(() => {
            // Remove active class from current
            slides[currentSlide].classList.remove('active');

            // Move to next
            currentSlide = (currentSlide + 1) % totalSlides;

            // Add active class to next
            slides[currentSlide].classList.add('active');
        }, 5000); // 5 seconds
    }
});
