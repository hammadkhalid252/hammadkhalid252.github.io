
/* =====================================
   HAMMAD KHALID - PORTFOLIO JAVASCRIPT
   Vanilla JavaScript
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. CURRENT YEAR
  ===================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =====================================
     2. MOBILE NAVIGATION
  ===================================== */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =====================================
     3. SCROLL REVEAL ANIMATIONS
  ===================================== */

  const revealElements = document.querySelectorAll(
    ".section-label, .about-grid, .stats-row, " +
    ".section-heading, .service-card, " +
    ".showcase-card, .process-grid, .contact-content"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );

  revealElements.forEach(element => {
    observer.observe(element);
  });


  /* =====================================
     4. 3D TILT EFFECT
  ===================================== */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;

  if (!reduceMotion && finePointer) {

    const tiltElements = document.querySelectorAll(
      "[data-tilt]"
    );

    tiltElements.forEach(card => {

      card.addEventListener("pointermove", event => {

        const rect = card.getBoundingClientRect();

        const x = (
          event.clientX - rect.left
        ) / rect.width - 0.5;

        const y = (
          event.clientY - rect.top
        ) / rect.height - 0.5;

        const rotateY = x * 9;
        const rotateX = -y * 8;

        card.style.transform =
          `perspective(900px)
           rotateY(${rotateY}deg)
           rotateX(${rotateX}deg)
           translateY(-3px)`;

      });

      card.addEventListener("pointerleave", () => {

        card.style.transform = "";

      });

    });

  }


  /* =====================================
     5. CUSTOM CURSOR GLOW
  ===================================== */

  if (!reduceMotion && finePointer) {

    const glow = document.querySelector(".cursor-glow");

    if (glow) {

      window.addEventListener("pointermove", event => {

        glow.style.left = event.clientX + "px";
        glow.style.top = event.clientY + "px";

      });

    }

  }


  /* =====================================
     6. SMOOTH ANCHOR NAVIGATION
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start"
        });

      }

    });

  });


  /* =====================================
     7. SERVICE CARD HOVER EFFECT
  ===================================== */

  if (!reduceMotion && finePointer) {

    document.querySelectorAll(".service-card").forEach(card => {

      card.addEventListener("mouseenter", () => {

        card.style.transition =
          "border-color .3s ease, transform .3s ease";

      });

    });

  }


  /* =====================================
     8. BUTTON INTERACTION
  ===================================== */

  document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

      button.style.transition =
        "transform .3s ease, box-shadow .3s ease";

    });

  });


  /* =====================================
     9. PAGE LOADED
  ===================================== */

  document.body.classList.add("page-loaded");

  console.log(
    "Hammad Khalid Portfolio Initialized Successfully."
  );

});
