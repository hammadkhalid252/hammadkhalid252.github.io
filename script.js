
/* =========================================
   HAMMAD KHALID - PORTFOLIO JAVASCRIPT
   Three.js + GSAP + ScrollTrigger
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. PRELOADER
    ===================================== */

    const preloader = document.querySelector(".preloader");

    window.addEventListener("load", () => {
        if (preloader) {
            if (window.gsap) {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.7,
                    delay: 0.3,
                    onComplete: () => {
                        preloader.style.display = "none";
                    }
                });
            } else {
                preloader.style.display = "none";
            }
        }
    });


    /* =====================================
       2. CURRENT YEAR
    ===================================== */

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================
       3. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");

            const isOpen = navbar.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });

        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");
            });
        });

        document.addEventListener("click", event => {
            if (
                !navbar.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navbar.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* =====================================
       4. GSAP SETUP
    ===================================== */

    const hasGSAP = typeof window.gsap !== "undefined";

    if (hasGSAP) {

        if (window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        /* HERO ANIMATION */

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
            .from(".hero-subtitle", {
                opacity: 0,
                y: 20,
                duration: 0.6
            }, "-=0.4")
            .from(".hero-content h1", {
                opacity: 0,
                y: 50,
                duration: 1
            }, "-=0.3")
            .from(".hero-description", {
                opacity: 0,
                y: 25,
                duration: 0.7
            }, "-=0.5")
            .from(".hero-buttons a", {
                opacity: 0,
                y: 20,
                stagger: 0.15,
                duration: 0.6
            }, "-=0.4")
            .from(".hero-information > div", {
                opacity: 0,
                y: 20,
                stagger: 0.15,
                duration: 0.6
            }, "-=0.3");


        /* SCROLL REVEAL */

        const revealElements = document.querySelectorAll(
            ".section-label, .about-grid, .section-top, " +
            ".service-card, .project-card, .why-card, .final-cta"
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
                    once: true
                }
            });

        });


        /* STAGGER SERVICES */

        if (document.querySelector(".service-card")) {
            gsap.from(".service-card", {
                opacity: 0,
                y: 60,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 80%",
                    once: true
                }
            });
        }


        /* STAGGER PROJECTS */

        if (document.querySelector(".project-card")) {
            gsap.from(".project-card", {
                opacity: 0,
                y: 70,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".featured-projects",
                    start: "top 80%",
                    once: true
                }
            });
        }


        /* PARALLAX HERO VISUAL */

        if (window.ScrollTrigger && document.querySelector(".hero-visual")) {

            gsap.to(".hero-visual", {
                y: 100,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

        }

    } else {

        document.querySelectorAll(
            ".section-label, .about-grid, .section-top, " +
            ".service-card, .project-card, .why-card, .final-cta"
        ).forEach(element => {
            element.style.opacity = "1";
            element.style.transform = "none";
        });

    }


    /* =====================================
       5. THREE.JS 3D HERO SCENE
    ===================================== */

    const heroScene = document.getElementById("hero3D");

    if (heroScene && typeof window.THREE !== "undefined") {

        try {

            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(
                45,
                heroScene.clientWidth / heroScene.clientHeight,
                0.1,
                100
            );

            camera.position.z = 7;

            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });

            renderer.setPixelRatio(
                Math.min(window.devicePixelRatio, 1.5)
            );

            renderer.setSize(
                heroScene.clientWidth,
                heroScene.clientHeight
            );

            renderer.domElement.className = "three-canvas";

            renderer.domElement.style.position = "absolute";
            renderer.domElement.style.inset = "0";
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";
            renderer.domElement.style.pointerEvents = "none";
            renderer.domElement.style.zIndex = "0";

            heroScene.appendChild(renderer.domElement);


            /* ORANGE 3D TORUS */

            const torusGeometry = new THREE.TorusGeometry(
                2.1,
                0.012,
                12,
                120
            );

            const torusMaterial = new THREE.MeshBasicMaterial({
                color: 0xFF6B2C,
                transparent: true,
                opacity: 0.8
            });

            const torus = new THREE.Mesh(
                torusGeometry,
                torusMaterial
            );

            torus.rotation.x = 1.1;
            torus.rotation.y = 0.4;

            scene.add(torus);


            /* SECOND ORBIT */

            const secondGeometry = new THREE.TorusGeometry(
                2.5,
                0.008,
                10,
                100
            );

            const secondMaterial = new THREE.MeshBasicMaterial({
                color: 0xFF6B2C,
                transparent: true,
                opacity: 0.4
            });

            const secondTorus = new THREE.Mesh(
                secondGeometry,
                secondMaterial
            );

            secondTorus.rotation.x = 0.5;
            secondTorus.rotation.y = 1.2;

            scene.add(secondTorus);


            /* FLOATING PARTICLES */

            const particleCount = 180;

            const particleGeometry = new THREE.BufferGeometry();

            const positions = new Float32Array(
                particleCount * 3
            );

            for (let i = 0; i < particleCount; i++) {

                positions[i * 3] =
                    (Math.random() - 0.5) * 9;

                positions[i * 3 + 1] =
                    (Math.random() - 0.5) * 9;

                positions[i * 3 + 2] =
                    (Math.random() - 0.5) * 5;

            }

            particleGeometry.setAttribute(
                "position",
                new THREE.BufferAttribute(positions, 3)
            );

            const particleMaterial = new THREE.PointsMaterial({
                color: 0xFF6B2C,
                size: 0.025,
                transparent: true,
                opacity: 0.7
            });

            const particles = new THREE.Points(
                particleGeometry,
                particleMaterial
            );

            scene.add(particles);


            /* MOUSE MOVEMENT */

            let mouseX = 0;
            let mouseY = 0;

            heroScene.addEventListener("mousemove", event => {

                const rect = heroScene.getBoundingClientRect();

                mouseX =
                    ((event.clientX - rect.left) / rect.width - 0.5);

                mouseY =
                    ((event.clientY - rect.top) / rect.height - 0.5);

            });

            heroScene.addEventListener("mouseleave", () => {
                mouseX = 0;
                mouseY = 0;
            });


            /* ANIMATION LOOP */

            let animationId;
            let isVisible = true;

            const observer = new IntersectionObserver(entries => {
                isVisible = entries[0].isIntersecting;

                if (isVisible) {
                    animate();
                } else {
                    cancelAnimationFrame(animationId);
                }
            });

            observer.observe(heroScene);

            function animate() {

                if (!isVisible) return;

                animationId = requestAnimationFrame(animate);

                torus.rotation.z += 0.0015;
                secondTorus.rotation.z -= 0.001;

                particles.rotation.y += 0.0005;

                torus.rotation.y +=
                    (mouseX * 0.25 - torus.rotation.y) * 0.02;

                torus.rotation.x +=
                    (mouseY * 0.25 + 1.1 - torus.rotation.x) * 0.02;

                renderer.render(scene, camera);

            }

            animate();


            /* RESPONSIVE RESIZE */

            const resizeObserver = new ResizeObserver(() => {

                const width = heroScene.clientWidth;
                const height = heroScene.clientHeight;

                if (!width || !height) return;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.setSize(width, height);

            });

            resizeObserver.observe(heroScene);

        } catch (error) {
            console.error("3D Scene Error:", error);
        }

    }


    /* =====================================
       6. CARD TILT EFFECT
    ===================================== */

    const tiltCards = document.querySelectorAll(
        ".service-card, .project-card"
    );

    const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches;

    if (!isTouchDevice) {

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (centerY - y) / 25;
                const rotateY = (x - centerX) / 25;

                card.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });

        });

    }


    /* =====================================
       7. BUTTON HOVER EFFECT
    ===================================== */

    document.querySelectorAll(
        ".primary-button, .secondary-button"
    ).forEach(button => {

        button.addEventListener("mouseenter", () => {
            button.style.transition = "all 0.3s ease";
        });

    });


    /* =====================================
       8. ACTIVE NAVIGATION LINK
    ===================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    document.querySelectorAll(".navbar a").forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    /* =====================================
       9. ACCESSIBILITY
    ===================================== */

    document.querySelectorAll(".menu-toggle").forEach(button => {
        button.setAttribute("aria-expanded", "false");
    });


    console.log("Hammad Khalid Portfolio Loaded Successfully.");

});
