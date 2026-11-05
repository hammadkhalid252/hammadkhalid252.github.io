
/* =========================================
   HAMMAD KHALID — PORTFOLIO V5
   Vanilla JavaScript
========================================= */


/* =========================================
   1. EMAILJS CONFIGURATION
========================================= */

const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";


/* =========================================
   2. DOM ELEMENTS
========================================= */

const html = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const desktopNav = document.querySelector(".desktop-nav");

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const yearElement = document.getElementById("year");


/* =========================================
   3. DYNAMIC FOOTER YEAR
========================================= */

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   4. DARK / LIGHT THEME
========================================= */

function setTheme(theme) {
    html.setAttribute("data-theme", theme);

    localStorage.setItem("portfolio-theme", theme);

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }
}

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light" || savedTheme === "dark") {
    setTheme(savedTheme);
} else {
    setTheme("dark");
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        setTheme(newTheme);
    });
}


/* =========================================
   5. MOBILE NAVIGATION
========================================= */

if (menuToggle && desktopNav) {

    menuToggle.addEventListener("click", () => {
        const isOpen = desktopNav.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    // Close menu after clicking a navigation link

    desktopNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            desktopNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
        });

    });

    // Close menu when clicking outside

    document.addEventListener("click", event => {

        const clickedInsideMenu = desktopNav.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            desktopNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

}


/* =========================================
   6. SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

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

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* =========================================
   7. CONTACT FORM
========================================= */

if (contactForm) {

    contactForm.addEventListener("submit", async event => {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const formData = new FormData(contactForm);

        const name = formData.get("from_name")?.trim();
        const email = formData.get("reply_to")?.trim();
        const subject = formData.get("subject")?.trim();
        const message = formData.get("message")?.trim();

        // Basic validation

        if (!name || !email || !subject || !message) {
            showFormStatus(
                "Please fill in all fields.",
                "error"
            );

            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showFormStatus(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {

            const emailConfigured =
                EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
                EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
                EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID";

            if (
                emailConfigured &&
                typeof emailjs !== "undefined"
            ) {

                await emailjs.sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    contactForm,
                    {
                        publicKey: EMAILJS_PUBLIC_KEY
                    }
                );

                showFormStatus(
                    "Message sent successfully. Thank you!",
                    "success"
                );

                contactForm.reset();

            } else {

                // Email fallback if EmailJS is not configured

                const mailtoLink =
                    "mailto:hammadkhalidm90@gmail.com" +
                    "?subject=" + encodeURIComponent(subject) +
                    "&body=" + encodeURIComponent(
                        "Name: " + name +
                        "\nEmail: " + email +
                        "\n\nMessage:\n" + message
                    );

                showFormStatus(
                    "Opening your email application...",
                    "success"
                );

                window.location.href = mailtoLink;

            }

        } catch (error) {

            console.error("Email sending error:", error);

            showFormStatus(
                "Message could not be sent. Please try emailing me directly.",
                "error"
            );

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }

        }

    });

}


/* =========================================
   8. FORM STATUS MESSAGE
========================================= */

function showFormStatus(message, type) {

    if (!formStatus) return;

    formStatus.textContent = message;

    formStatus.className = "form-status " + type;

}


/* =========================================
   9. AMBIENT VIDEO OPTIMIZATION
========================================= */

const ambientVideo = document.querySelector(".ambient-video");

if (ambientVideo) {

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            ambientVideo.pause();
        } else {
            ambientVideo.play().catch(() => {});
        }

    });

}


/* =========================================
   10. SMOOTH SCROLL
========================================= */

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


/* =========================================
   11. ACTIVE NAVIGATION ON SCROLL
========================================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && sections.length) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    document.querySelectorAll(
                        ".desktop-nav a"
                    ).forEach(link => {

                        const isActive =
                            link.getAttribute("href") === "#" + currentId;

                        link.classList.toggle("active", isActive);

                    });

                }

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* =========================================
   12. CONSOLE BRANDING
========================================= */

console.log(
    "%c HAMMAD KHALID ",
    "background:#8b5cf6;color:#fff;padding:10px 15px;border-radius:5px;font-weight:bold;"
);

console.log(
    "%c WordPress Developer | Custom Coder ",
    "color:#8b5cf6;font-size:13px;font-weight:bold;"
);
