
/* =========================================
   HAMMAD KHALID — PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close menu after selecting a navigation link
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.textContent = "☰";
            });
        });

        // Close menu when clicking outside it
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.textContent = "☰";
            }
        });
    }


    // 2. AUTOMATIC FOOTER YEAR
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 3. WHATSAPP CONTACT FORM
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const message = document.getElementById("message")?.value.trim();

            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }

            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            const whatsappNumber = "923301216575";

            const whatsappMessage = [
                "Hello Hammad!",
                "",
                "I would like to discuss a project.",
                "",
                "Name: " + name,
                "Email: " + email,
                "Project Details: " + message
            ].join("\n");

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(whatsappMessage);

            // Open WhatsApp with the prepared message.
            // The visitor must press Send in WhatsApp.
            window.open(whatsappURL, "_blank", "noopener,noreferrer");
        });
    }


    // 4. SCROLL PROGRESS BAR
    const progressBar = document.createElement("div");

    progressBar.id = "scrollProgress";

    Object.assign(progressBar.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "0%",
        height: "3px",
        background: "#c7f36b",
        zIndex: "2000",
        pointerEvents: "none"
    });

    document.body.appendChild(progressBar);

    let scrollTicking = false;

    function updateScrollProgress() {
        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        progressBar.style.width = `${Math.min(progress, 100)}%`;

        scrollTicking = false;
    }

    window.addEventListener("scroll", () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(updateScrollProgress);
            scrollTicking = true;
        }
    }, { passive: true });

    updateScrollProgress();


    // 5. REVEAL SECTIONS WHEN SCROLLING
    const revealElements = document.querySelectorAll(
        ".about-grid, .service-card, .project-card, " +
        ".skills-card, .contact-form, .contact-content"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const revealStyle = document.createElement("style");

        revealStyle.textContent = `
            .js-reveal {
                opacity: 0;
                transform: translateY(24px);
                transition:
                    opacity 650ms ease,
                    transform 650ms ease;
            }

            .js-reveal.is-visible {
                opacity: 1;
                transform: translateY(0);
            }

            @media (prefers-reduced-motion: reduce) {
                .js-reveal {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;

        document.head.appendChild(revealStyle);

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("js-reveal");
            revealObserver.observe(element);
        });
    }


    // 6. ACTIVE NAVIGATION WHILE SCROLLING
    const pageSections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    navItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${sectionId}`;

                        if (isActive) {
                            link.classList.add("active");
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.classList.remove("active");
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            {
                rootMargin: "-30% 0px -55% 0px",
                threshold: 0
            }
        );

        pageSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    // 7. SUBTLE 3D TILT ON PROJECT CARDS
    const projectCards = document.querySelectorAll(".project-card");

    const canUseTilt =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !prefersReducedMotion;

    if (canUseTilt) {
        projectCards.forEach((card) => {

            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((x - centerX) / centerX) * 3;
                const rotateX = ((centerY - y) / centerY) * 3;

                card.style.transform =
                    `perspective(1000px) ` +
                    `rotateX(${rotateX}deg) ` +
                    `rotateY(${rotateY}deg) ` +
                    `translateY(-4px)`;
            });

            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
            });
        });
    }


    // 8. HERO PARALLAX EFFECT
    const heroVisual = document.querySelector(".hero-visual");

    if (
        heroVisual &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !prefersReducedMotion
    ) {
        heroVisual.addEventListener("pointermove", (event) => {
            const rect = heroVisual.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            const cube = heroVisual.querySelector(".cube");

            if (cube) {
                cube.style.translate =
                    `${x * 10}px ${y * 10}px`;
            }
        });

        heroVisual.addEventListener("pointerleave", () => {
            const cube = heroVisual.querySelector(".cube");

            if (cube) {
                cube.style.translate = "";
            }
        });
    }


    // 9. CONSOLE MESSAGE
    console.log(
        "%c Hammad Khalid | WordPress Developer ",
        "background:#1d4938;color:#c7f36b;padding:10px;font-size:14px;font-weight:bold;"
    );

});

