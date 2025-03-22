// Footer slide-up functionality
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.slide-up-footer');
    const handle = document.querySelector('.footer-handle');
    
    // Toggle on handle click
    handle.addEventListener('click', function() {
      footer.classList.toggle('active');
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!footer.contains(e.target) && footer.classList.contains('active')) {
        footer.classList.remove('active');
      }
    });
    
    // Show footer when scrolling to bottom of page
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        footer.classList.add('active');
      } else if (footer.classList.contains('active') && !footer.matches(':hover')) {
        footer.classList.remove('active');
      }
    });
  });

document.addEventListener("DOMContentLoaded", function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Text scramble effect for welcome section
    const element = document.getElementById("scramble-text");
    if (element) {
        const finalText = element.textContent;

        // Set up variables for the scramble effect
        let currentText = "";
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
        const duration = 2; // seconds
        const fps = 30;
        const totalFrames = duration * fps;
        let frame = 0;

        // Function to get a random character
        function getRandomChar() {
            return chars[Math.floor(Math.random() * chars.length)];
        }

        // Create a random string of the same length as the final text
        function getRandomText(length) {
            return Array(length).fill().map(getRandomChar).join("");
        }

        // Animation interval
        const interval = setInterval(() => {
            frame++;

            // Calculate how much of the final text to reveal
            const progress = frame / totalFrames;
            const revealLength = Math.floor(finalText.length * progress);

            // Build the current text - revealed portion + scrambled portion
            currentText = finalText.substring(0, revealLength) +
                getRandomText(finalText.length - revealLength);

            // Update the element
            element.textContent = currentText;

            // Stop when animation is complete
            if (frame >= totalFrames) {
                element.textContent = finalText;
                clearInterval(interval);
            }
        }, 1500 / fps);
    }

// Set up section scrolling
function setupSectionScrolling() {
    const sections = document.querySelectorAll('section, footer');
    const navItems = document.querySelectorAll('.section-nav li');
    let isScrolling = false; // Flag to prevent snap interference
    
    // Create ScrollTrigger for each section
    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 40%', 
            end: 'bottom 40%',
            onEnter: () => updateActiveNav(index),
            onEnterBack: () => updateActiveNav(index)
        });
    });
    
    // Update active navigation item
    function updateActiveNav(index) {
        navItems.forEach(item => item.classList.remove('active'));
        if (navItems[index]) {
            navItems[index].classList.add('active');
        }
    }
    
    // Set up click handlers for navigation
    navItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Set flag to prevent snap interference
            isScrolling = true;
            
            // Get exact top position of target section
            const targetPosition = sections[index].offsetTop;
            
            // Scroll to exact section position
            gsap.to(window, {
                duration: 0.8,
                scrollTo: {
                    y: targetPosition,
                    autoKill: true
                },
                ease: 'power2.out',
                onComplete: () => {
                    // Reset flag after animation completes
                    setTimeout(() => {
                        isScrolling = false;
                    }, 100);
                }
            });
        });
    });
    
    // Setup gentler scroll snapping between sections
    // Only activate when not manually navigating
    let snapScrollTrigger = ScrollTrigger.create({
        snap: {
            snapTo: (value, self) => {
                // Skip snapping if we're in the middle of a click navigation
                if (isScrolling) return value;
                
                // Find the closest section
                const snapPoints = sections.map(section => 
                    ScrollTrigger.create({trigger: section}).start / 
                    (document.documentElement.scrollHeight - window.innerHeight)
                );
                
                return snapPoints.reduce((prev, curr) => 
                    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
                );
            },
            duration: 0.3,
            delay: 0.1,
            ease: 'power2.out'
        }
    });
    
    // Disable snap during manual scrolling
    window.addEventListener('wheel', () => {
        isScrolling = true;
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    });
    
    // Disable snap during touch scrolling on mobile
    window.addEventListener('touchmove', () => {
        isScrolling = true;
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    });
}

// Call the function to initialize
setupSectionScrolling();

    // 3D text effect for project section title
    const title3d = document.querySelector('.title-3d');

    if (title3d) {
        const cyanLayer = title3d.querySelector('.cyan-layer');
        const redLayer = title3d.querySelector('.red-layer');

        // Basic mouse movement effect
        document.addEventListener('mousemove', function (e) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            if (cyanLayer && redLayer) {
                gsap.to(cyanLayer, {
                    duration: 0.5,
                    x: mouseX * 10,
                    y: mouseY * 10
                });

                gsap.to(redLayer, {
                    duration: 0.5,
                    x: mouseX * -10,
                    y: mouseY * -10
                });
            }
        });

        // Add scroll effect
        window.addEventListener('scroll', function () {
            const scrollPos = window.scrollY;
            const projectsSection = document.getElementById('projects');

            if (projectsSection) {
                const distance = scrollPos - projectsSection.offsetTop + 400;
                const factor = Math.min(Math.max(distance / 500, -0.5), 0.5);

                if (cyanLayer && redLayer) {
                    gsap.to(cyanLayer, {
                        duration: 0.5,
                        x: factor * 15
                    });

                    gsap.to(redLayer, {
                        duration: 0.5,
                        x: factor * -15
                    });
                }
            }
        });
    }



    // Welcome section
    gsap.from("#welcome .intro", {
        scrollTrigger: {
            trigger: "#welcome",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1
    });

    gsap.from("#welcome .myImageContainer", {
        scrollTrigger: {
            trigger: "#welcome",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3
    });

    // About Me section animations
    gsap.from("#about-me h2", {
        scrollTrigger: {
            trigger: "#about-me",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });

    gsap.from("#about-me .info p", {
        scrollTrigger: {
            trigger: "#about-me .info",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6
    });

    // Skills section animations
    gsap.from("#skills h2", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });

    gsap.from("#skills > p", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6
    });

    gsap.from(".skill-card", {
        scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
    });

    // Projects section animations
    gsap.from(".projects > p", {
        scrollTrigger: {
            trigger: ".projects > p",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8
    });

    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".projects-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
    });

    // Smooth scroll navigation
    const navLinks = document.querySelectorAll(".navbar a, .footer-links a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Create ScrollTrigger for each navigation link
                ScrollTrigger.create({
                    trigger: targetElement,
                    start: "top center",
                    end: "bottom center",
                    onToggle: self => self.isActive && setActiveLink(link)
                });

                link.addEventListener("click", e => {
                    e.preventDefault();
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 50
                        },
                        ease: "power2.inOut"
                    });
                });
            }
        }
    });

    function setActiveLink(activeLink) {
        navLinks.forEach(link => {
            if (link.getAttribute("href") === activeLink.getAttribute("href")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Add line animations for visual interest
    const sections = document.querySelectorAll("section");

    sections.forEach((section, index) => {
        // Create a line element for each section
        const line = document.createElement("div");
        line.className = `line line-${index + 1}`;
        section.prepend(line);

        // Animate the line as the section enters viewport
        gsap.from(line, {
            scrollTrigger: {
                trigger: section,
                scrub: true,
                start: "top bottom",
                end: "top 30%"
            },
            scaleX: 0,
            transformOrigin: "left center",
            ease: "none"
        });
    });
});