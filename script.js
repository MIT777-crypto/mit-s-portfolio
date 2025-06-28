document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Typing Effect for Hero Section
    const typingElement = document.querySelector('.typing-effect');
    const words = ["Student", "Artist", "Video Editor" ,"YouTuber"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // milliseconds per character
    const deletingSpeed = 60; // milliseconds per character
    const delayBetweenWords = 1500; // milliseconds

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, delayBetweenWords);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, currentSpeed);
    }

    type(); // Start the typing effect

    // Intersection Observer for Section Animations (fade-in-on-scroll)
    const sections = document.querySelectorAll('.section-padding');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Trigger skill bar animation when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                    animateSkillCircles();
                }

                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Skill Bar Animation Logic
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(skillLevel => {
            const width = skillLevel.style.width; // Get the inline width
            skillLevel.style.width = '0%'; // Reset for animation
            setTimeout(() => {
                skillLevel.style.width = width; // Animate to original width
            }, 100); // Small delay to ensure reset takes effect
        });
    }

    // Skill Circle Animation Logic (Conic Gradient)
    function animateSkillCircles() {
        const skillCircles = document.querySelectorAll('.skill-circle');
        skillCircles.forEach(circle => {
            const percentage = parseInt(circle.dataset.percentage);
            const textContent = circle.textContent.trim(); // Get original text
            
            // Clear existing content and add the text back
            circle.innerHTML = textContent; // This removes any previous percentage spans
            
            const percentageSpan = document.createElement('span');
            percentageSpan.classList.add('percentage');
            percentageSpan.textContent = percentage + '%';
            circle.appendChild(percentageSpan);

            // Set the custom property for conic gradient animation
            setTimeout(() => {
                circle.style.setProperty('--p', percentage + '%');
            }, 100);
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});