
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // Reveal elements as they enter the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
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
        rootMargin: "0px 0px -30px 0px"
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

  // Scroll progress bar
  const progress = document.querySelector(".scroll-progress");
  let scrollScheduled = false;

  function updateProgress() {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percent = scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

    progress.style.width = `${percent}%`;
    scrollScheduled = false;
  }

  window.addEventListener("scroll", () => {
    if (!scrollScheduled) {
      window.requestAnimationFrame(updateProgress);
      scrollScheduled = true;
    }
  }, { passive: true });

  updateProgress();

  // Interactive 3D tilt on pointer devices
  const tiltCards = document.querySelectorAll(".tilt-card");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (finePointer && !reduceMotion) {
    tiltCards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 9;
        const rotateX = (0.5 - y) * 9;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

        card.style.boxShadow =
          "0 22px 50px rgba(0, 0, 0, 0.25)";
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        card.style.boxShadow = "";
      });
    });
  }

  // Highlight the navigation item for the visible section
  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = document.querySelectorAll(".nav-links a[href^='#']");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navigationLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 3D cube demo controls
  const cubeButton = document.getElementById("cubeButton");
  const cube = document.querySelector(".demo-cube");

  cubeButton.addEventListener("click", () => {
    const paused = cube.classList.toggle("paused");
    cubeButton.textContent = paused ? "Resume Rotation" : "Pause Rotation";
  });

  // Glow demo controls
  const glowButton = document.getElementById("glowButton");
  const particlesScene = document.getElementById("particlesScene");
  let alternateGlow = false;

  glowButton.addEventListener("click", () => {
    alternateGlow = !alternateGlow;

    if (alternateGlow) {
      particlesScene.style.background =
        "radial-gradient(circle, rgba(0, 213, 255, 0.25), rgba(155, 108, 255, 0.08), transparent)";
      particlesScene.querySelectorAll(".particle").forEach((particle) => {
        particle.style.borderColor = "#b99aff";
        particle.style.boxShadow = "0 0 30px rgba(155, 108, 255, 0.4)";
      });
      glowButton.textContent = "Restore Glow";
    } else {
      particlesScene.style.background = "";
      particlesScene.querySelectorAll(".particle").forEach((particle) => {
        particle.style.borderColor = "";
        particle.style.boxShadow = "";
      });
      glowButton.textContent = "Change Glow";
    }
  });

  // Pointer-responsive glow
  if (finePointer && !reduceMotion) {
    particlesScene.addEventListener("pointermove", (event) => {
      const rect = particlesScene.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      particlesScene.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(0, 213, 255, 0.24), rgba(155, 108, 255, 0.08), transparent 70%)`;
    });

    particlesScene.addEventListener("pointerleave", () => {
      if (!alternateGlow) {
        particlesScene.style.background = "";
      }
    });
  }
});
