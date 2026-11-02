
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==========================================
  // ELEMENT SELECTORS
  // ==========================================

  const select = (selector, parent = document) =>
    parent.querySelector(selector);

  const selectAll = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  // ==========================================
  // PRELOADER
  // ==========================================

  const preloader = select(".preloader");

  const hidePreloader = () => {
    if (!preloader) return;

    preloader.classList.add("loaded");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 700);
  };

  window.addEventListener("load", hidePreloader);

  // Fallback in case load event has already fired
  if (document.readyState === "complete") {
    hidePreloader();
  }

  // ==========================================
  // CUSTOM CURSOR
  // ==========================================

  const cursor = select(".cursor");
  const cursorFollower = select(".cursor-follower");

  if (cursor && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(animateFollower);
    };

    animateFollower();

    selectAll("a, button, input, textarea, .project-card").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
        cursorFollower.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
        cursorFollower.classList.remove("cursor-hover");
      });
    });
  }

  // ==========================================
  // SCROLL PROGRESS
  // ==========================================

  const scrollProgress = select(".scroll-progress");

  const updateScrollProgress = () => {
    if (!scrollProgress) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;
  };

  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================

  const header = select(".main-header");

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 50);
  };

  // ==========================================
  // MOBILE MENU
  // ==========================================

  const menuToggle = select(".menu-toggle");
  const mobileMenu = select(".mobile-menu");

  const closeMobileMenu = () => {
    if (!mobileMenu) return;

    mobileMenu.classList.remove("active");
    menuToggle?.classList.remove("active");

    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));

      document.body.classList.toggle("menu-open", isOpen);
    });

    selectAll("a", mobileMenu).forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMobileMenu();
    });
  }

  // ==========================================
  // DARK / LIGHT THEME TOGGLE
  // ==========================================

  const themeToggle = select(".theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );

      themeToggle.innerHTML =
        theme === "dark"
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
    }
  };

  const initialTheme =
    savedTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  applyTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";

    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================

  const revealElements = selectAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
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

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ==========================================
  // ACTIVE NAVIGATION LINK
  // ==========================================

  const navLinks = selectAll(
    '.desktop-nav a[href^="#"], .mobile-menu a[href^="#"]'
  );

  const sections = selectAll("section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;

          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================

  const backToTop = select(".floating-top");

  const updateBackToTop = () => {
    if (!backToTop) return;

    backToTop.classList.toggle("show", window.scrollY > 500);
  };

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================

  selectAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = select(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      closeMobileMenu();
    });
  });

  // ==========================================
  // PROJECT CARD TILT EFFECT
  // ==========================================

  const projectCards = selectAll(".project-card");

  if (window.matchMedia("(pointer: fine)").matches) {
    projectCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      });
    });
  }

  // ==========================================
  // CONTACT FORM VALIDATION
  // ==========================================

  const contactForm = select(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      const name = select('[name="name"]', contactForm);
      const email = select('[name="email"]', contactForm);
      const message = select('[name="message"]', contactForm);

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name?.value.trim()) {
        event.preventDefault();
        alert("Please enter your name.");
        name?.focus();
        return;
      }

      if (!emailPattern.test(email?.value.trim() || "")) {
        event.preventDefault();
        alert("Please enter a valid email address.");
        email?.focus();
        return;
      }

      if (!message?.value.trim()) {
        event.preventDefault();
        alert("Please enter your message.");
        message?.focus();
        return;
      }

      // Form will submit to its configured backend.
    });
  }

  // ==========================================
  // CURRENT YEAR
  // ==========================================

  const yearElement = select("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================
  // COMBINED SCROLL HANDLER
  // ==========================================

  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      updateScrollProgress();
      updateHeader();
      updateBackToTop();

      ticking = false;
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  updateScrollProgress();
  updateHeader();
  updateBackToTop();

});
