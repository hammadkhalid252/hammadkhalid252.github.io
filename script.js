
/* =========================================
   HAMMAD KHALID — PORTFOLIO JAVASCRIPT
   Three.js + GSAP + ScrollTrigger
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------
       1. FOOTER CURRENT YEAR
    ------------------------------------- */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* -------------------------------------
       2. MOBILE NAVIGATION
    ------------------------------------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }

        });

        navItems.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }

            });

        });

        document.addEventListener("click", event => {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navLinks.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            }

        });

    }


    /* -------------------------------------
       3. ACTIVE NAVIGATION ON SCROLL
    ------------------------------------- */

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation, {
        passive: true
    });

    updateActiveNavigation();


    /* -------------------------------------
       4. SMOOTH SCROLL
    ------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId = anchor.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* -------------------------------------
       5. GSAP ANIMATIONS
    ------------------------------------- */

    if (window.gsap) {

        if (window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero entrance animation
        const heroTimeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        heroTimeline
            .from(".availability", {
                opacity: 0,
                y: 20,
                duration: 0.7
            })
            .from(".hero-intro", {
                opacity: 0,
                y: 20,
                duration: 0.6
            }, "-=0.4")
            .from(".hero h1", {
                opacity: 0,
                y: 40,
                duration: 0.9
            }, "-=0.3")
            .from(".hero-description", {
                opacity: 0,
                y: 20,
                duration: 0.7
            }, "-=0.5")
            .from(".hero-buttons .btn", {
                opacity: 0,
                y: 20,
                stagger: 0.15,
                duration: 0.6
            }, "-=0.4")
            .from(".hero-socials a", {
                opacity: 0,
                scale: 0.5,
                stagger: 0.1,
                duration: 0.5
            }, "-=0.3")
            .from(".hero-visual", {
                opacity: 0,
                scale: 0.8,
                x: 50,
                duration: 1
            }, "-=1");


        // Scroll reveal animations
        if (window.ScrollTrigger) {

            const revealElements = document.querySelectorAll(
                ".section-heading, .about-image, .about-content, " +
                ".service-card, .project-card, .skill-item, " +
                ".process-item, .contact-content, .contact-action"
            );

            revealElements.forEach(element => {

                gsap.from(element, {
                    opacity: 0,
                    y: 45,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        toggleActions: "play none none reverse"
                    }
                });

            });

            // Project cards stagger
            gsap.from(".project-card", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 85%"
                }
            });

            // Skills stagger
            gsap.from(".skill-item", {
                opacity: 0,
                scale: 0.85,
                stagger: 0.1,
                duration: 0.6,
                scrollTrigger: {
                    trigger: ".skills-grid",
                    start: "top 85%"
                }
            });

        }

    } else {

        console.warn("GSAP could not be loaded.");

    }


    /* -------------------------------------
       6. 3D HERO CARD INTERACTION
    ------------------------------------- */

    const heroVisual = document.querySelector(".hero-visual");
    const visualCard = document.querySelector(".visual-card");

    if (
        heroVisual &&
        visualCard &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        heroVisual.addEventListener("mousemove", event => {

            const rect = heroVisual.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 12;
            const rotateX = ((centerY - y) / centerY) * 12;

            visualCard.style.animation = "none";

            visualCard.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        heroVisual.addEventListener("mouseleave", () => {

            visualCard.style.animation = "";
            visualCard.style.transform = "";

        });

    }


    /* -------------------------------------
       7. THREE.JS 3D BACKGROUND
    ------------------------------------- */

    const hero3D = document.getElementById("hero3D");

    if (hero3D && window.THREE) {

        let scene;
        let camera;
        let renderer;
        let particles;
        let animationFrame;

        try {

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(
                60,
                hero3D.clientWidth / hero3D.clientHeight,
                0.1,
                1000
            );

            camera.position.z = 5;

            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });

            renderer.setPixelRatio(
                Math.min(window.devicePixelRatio, 2)
            );

            renderer.setSize(
                hero3D.clientWidth,
                hero3D.clientHeight
            );

            renderer.domElement.style.position = "absolute";
            renderer.domElement.style.inset = "0";
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";
            renderer.domElement.style.pointerEvents = "none";
            renderer.domElement.style.zIndex = "1";

            hero3D.appendChild(renderer.domElement);

            // Particle geometry
            const particleCount = 900;

            const positions = new Float32Array(
                particleCount * 3
            );

            for (let i = 0; i < particleCount; i++) {

                const i3 = i * 3;

                positions[i3] = (Math.random() - 0.5) * 9;
                positions[i3 + 1] = (Math.random() - 0.5) * 9;
                positions[i3 + 2] = (Math.random() - 0.5) * 5;

            }

            const geometry = new THREE.BufferGeometry();

            geometry.setAttribute(
                "position",
                new THREE.BufferAttribute(positions, 3)
            );

            const material = new THREE.PointsMaterial({
                color: 0xff6b2c,
                size: 0.018,
                transparent: true,
                opacity: 0.65,
                sizeAttenuation: true
            });

            particles = new THREE.Points(
                geometry,
                material
            );

            scene.add(particles);

            // Animation loop
            const clock = new THREE.Clock();

            function animate() {

                animationFrame = requestAnimationFrame(animate);

                const elapsed = clock.getElapsedTime();

                particles.rotation.y = elapsed * 0.035;
                particles.rotation.x = Math.sin(elapsed * 0.2) * 0.08;

                renderer.render(scene, camera);

            }

            animate();

            // Responsive resize
            const resizeObserver = new ResizeObserver(() => {

                const width = hero3D.clientWidth;
                const height = hero3D.clientHeight;

                if (!width || !height) return;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.setSize(width, height);

            });

            resizeObserver.observe(hero3D);

            // Cleanup if page is unloaded
            window.addEventListener("beforeunload", () => {

                cancelAnimationFrame(animationFrame);

                resizeObserver.disconnect();

                geometry.dispose();
                material.dispose();
                renderer.dispose();

            });

        } catch (error) {

            console.error("Three.js initialization failed:", error);

        }

    } else {

        console.warn("Three.js could not be loaded.");

    }


    /* -------------------------------------
       8. SERVICE CARD HOVER EFFECT
    ------------------------------------- */

    document.querySelectorAll(".service-card").forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.background =
                `radial-gradient(circle at ${x}px ${y}px, rgba(255,107,44,0.09), #14151c 65%)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "";

        });

    });


    /* -------------------------------------
       9. PROJECT CARD TILT EFFECT
    ------------------------------------- */

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mousemove", event => {

            if (!window.matchMedia("(pointer: fine)").matches) return;

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 8;
            const rotateX = (0.5 - (y / rect.height)) * 8;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* -------------------------------------
       10. PAGE LOADED
    ------------------------------------- */

    document.body.classList.add("page-loaded");

    console.log(
        "%cHammad Khalid Portfolio",
        "color:#ff6b2c;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cWordPress Developer | 3+ Years Experience",
        "color:#999;font-size:12px;"
    );

});
