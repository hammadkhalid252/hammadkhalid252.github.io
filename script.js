
/* =========================================
   HAMMAD KHALID - PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE NAVIGATION
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });
  }


  // 2. SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // 3. NAVBAR SCROLL EFFECT
  const header = document.querySelector("header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 50);
  }

  window.addEventListener("scroll", updateHeader);
  updateHeader();


  // 4. SCROLL REVEAL ANIMATION
  const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .service-card, " +
    ".project-card, .skill-item, .experience-item, " +
    ".testimonial-card, .contact-content"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }


  // 5. MOUSE RESPONSIVE LAPTOP EFFECT
  const laptopScene = document.getElementById("laptopScene");

  if (laptopScene && window.matchMedia("(pointer: fine)").matches) {
    laptopScene.addEventListener("mousemove", (e) => {
      const rect = laptopScene.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      laptopScene.style.transform =
        `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    });

    laptopScene.addEventListener("mouseleave", () => {
      laptopScene.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    });
  }


  // 6. PARTICLE BACKGROUND
  const canvas = document.getElementById("particles");
  const ctx = canvas ? canvas.getContext("2d") : null;

  if (canvas && ctx) {
    let particles = [];
    let animationFrame;
    let width = 0;
    let height = 0;

    const particleCount = window.innerWidth < 768 ? 35 : 75;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.15;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 105, 45, ${this.opacity})`;
        ctx.fill();
      }
    }

    function createParticles() {
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.beginPath();
            ctx.strokeStyle =
              `rgba(255, 105, 45, ${0.12 * (1 - distance / 110)})`;

            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();

      animationFrame = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener("resize", () => {
      cancelAnimationFrame(animationFrame);
      resizeCanvas();
      createParticles();
      animateParticles();
    });
  }


  // 7. ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll("section[id]");
  const navigationLinks = document.querySelectorAll("#navLinks a");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navigationLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    }, {
      threshold: 0.35
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }


  // 8. CURRENT YEAR
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 9. REDUCE MOTION SUPPORT
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = "auto";
  }

});
