
/* =========================================
   HAMMAD KHALID - INTERACTIVE PORTFOLIO
   VANILLA JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 01. PRELOADER

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader?.classList.add("hidden");
        }, 700);
    });

    // Fallback in case the load event has already fired
    if (document.readyState === "complete") {
        setTimeout(() => {
            preloader?.classList.add("hidden");
        }, 700);
    }


    // 02. MOBILE NAVIGATION

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navMenu?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    }

    menuToggle?.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });

    document.addEventListener("click", (event) => {

        if (
            navMenu &&
            menuToggle &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }

    });


    // 03. NAVBAR SCROLL EFFECT

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // 04. SCROLL REVEAL ANIMATION

    const revealElements = document.querySelectorAll("[data-reveal]");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // 05. 3D PROFILE CARD

    const profileCard = document.getElementById("profileCard");

    const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (profileCard && canHover && !reducedMotion) {

        profileCard.addEventListener("mousemove", (event) => {

            const rect = profileCard.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            profileCard.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;

        });

        profileCard.addEventListener("mouseleave", () => {

            profileCard.style.transform = `
                perspective(1000px)
                rotateX(5deg)
                rotateY(-10deg)
                scale3d(1, 1, 1)
            `;

        });

    }


    // 06. ANIMATED SKILL BARS

    const skillBars = document.querySelectorAll(
        ".skill-bar span[data-width]"
    );

    const skillObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const bar = entry.target;
                    const width = bar.dataset.width;

                    bar.style.width = width;

                    observer.unobserve(bar);

                }

            });

        },
        {
            threshold: 0.5
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });


    // 07. ANIMATED STATISTICS

    const counters = document.querySelectorAll("[data-count]");

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.count);

                const duration = 1500;
                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const easedProgress =
                        1 - Math.pow(1 - progress, 4);

                    const currentValue = Math.floor(
                        easedProgress * target
                    );

                    counter.textContent = currentValue;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }

                }

                requestAnimationFrame(updateCounter);

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.6
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    // 08. ACTIVE NAVIGATION LINK

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const sectionId = entry.target.id;

                navLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${sectionId}`
                    );

                });

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // 09. 3D SKILLS ORB MOUSE INTERACTION

    const skillsOrb = document.getElementById("skillsOrb");

    if (skillsOrb && canHover && !reducedMotion) {

        skillsOrb.addEventListener("mousemove", (event) => {

            const rect = skillsOrb.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 12;
            const rotateX = ((centerY - y) / centerY) * 12;

            skillsOrb.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
            `;

        });

        skillsOrb.addEventListener("mouseleave", () => {

            skillsOrb.style.transform = "";

        });

    }


    // 10. CURRENT YEAR

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 11. SMOOTH ANCHOR SCROLL

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "start"
                });

            }

        });

    });


    // 12. CONSOLE MESSAGE

    console.log(
        "%c HAMMAD KHALID ",
        "background:#ff6b35;color:white;padding:10px;font-weight:bold;"
    );

    console.log(
        "Portfolio successfully initialized."
    );

});
