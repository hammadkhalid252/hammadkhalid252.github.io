
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==============================
  // 1. Mobile Navigation
  // ==============================
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // ==============================
  // 2. Current Year
  // ==============================
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ==============================
  // 3. Smooth Scrolling
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start"
        });
      }
    });
  });

  // ==============================
  // 4. Scroll Reveal Animations
  // ==============================
  const revealElements = document.querySelectorAll(
    ".about-heading, .about-content, .expertise-card, " +
    ".service-card, .project-card, .contact-content, " +
    ".contact-form, .final-cta-inner"
  );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    revealElements.forEach((element) => {
      element.classList.add("js-reveal");
    });

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
      revealObserver.observe(element);
    });
  }

  // ==============================
  // 5. Header Scroll Effect
  // ==============================
  const siteHeader = document.querySelector(".site-header");

  const updateHeader = () => {
    if (siteHeader) {
      siteHeader.classList.toggle("scrolled", window.scrollY > 30);
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // ==============================
  // 6. Active Navigation Link
  // ==============================
  const sections = document.querySelectorAll(
    "main section[id], section[id]"
  );

  const sectionObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const sectionId = entry.target.id;

            navLinks?.querySelectorAll("a[href^='#']").forEach((link) => {
              const isActive = link.getAttribute("href") === `#${sectionId}`;

              if (isActive) {
                link.setAttribute("aria-current", "location");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          });
        },
        {
          rootMargin: "-35% 0px -55% 0px"
        }
      )
    : null;

  if (sectionObserver) {
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ==============================
  // 7. Contact Form -> WhatsApp
  // ==============================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const messageField = document.getElementById("message");

      const name = nameField?.value.trim() || "";
      const email = emailField?.value.trim() || "";
      const message = messageField?.value.trim() || "";

      if (!name || !email || !message) {
        contactForm.reportValidity();
        return;
      }

      if (emailField && !emailField.checkValidity()) {
        emailField.reportValidity();
        return;
      }

      const whatsappMessage = [
        "Hello Hammad!",
        "",
        "I contacted you through your portfolio website.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Project Details:",
        message
      ].join("\n");

      const whatsappURL =
        "https://wa.me/923301216575?text=" +
        encodeURIComponent(whatsappMessage);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // ==============================
  // 8. Back To Top
  // ==============================
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  }

  // ==============================
  // 9. Project Card Interaction
  // ==============================
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        card.blur();
      }
    });
  });

});
