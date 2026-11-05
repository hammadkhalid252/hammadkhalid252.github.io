/* =====================================================
HAMMAD KHALID — PORTFOLIO JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
"use strict";

// ==========================================
// SELECTORS
// ==========================================

const select = (selector, parent = document) =>
parent.querySelector(selector);

const selectAll = (selector, parent = document) =>
[...parent.querySelectorAll(selector)];


// ==========================================
// PRELOADER
// ==========================================

const preloader = select(".preloader");

function hidePreloader() {
if (!preloader) return;

preloader.classList.add("loaded");

setTimeout(() => {
preloader.style.display = "none";
}, 700);
}

window.addEventListener("load", hidePreloader);

if (document.readyState === "complete") {
hidePreloader();
}


// ==========================================
// CUSTOM CURSOR
// ==========================================

const cursor = select(".cursor");
const cursorFollower = select(".cursor-follower");

if (
cursor &&
cursorFollower &&
window.matchMedia("(pointer: fine)").matches
) {
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

function animateCursor() {
followerX += (mouseX - followerX) * 0.15;
followerY += (mouseY - followerY) * 0.15;

cursorFollower.style.left = `${followerX}px`;
cursorFollower.style.top = `${followerY}px`;

requestAnimationFrame(animateCursor);
}

animateCursor();

selectAll("a, button, input, textarea, select").forEach((element) => {
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
// DARK / LIGHT MODE
// ==========================================

const themeToggle = select(".theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");

const systemTheme = window.matchMedia(
"(prefers-color-scheme: dark)"
).matches
? "dark"
: "light";

function applyTheme(theme) {
document.documentElement.setAttribute("data-theme", theme);

localStorage.setItem("portfolio-theme", theme);

if (themeToggle) {
themeToggle.innerHTML =
theme === "dark"
? '<i class="fas fa-sun"></i>'
: '<i class="fas fa-moon"></i>';

themeToggle.setAttribute(
"aria-label",
theme === "dark"
? "Switch to light mode"
: "Switch to dark mode"
);
}
}

applyTheme(savedTheme || systemTheme);

themeToggle?.addEventListener("click", () => {
const currentTheme =
document.documentElement.getAttribute("data-theme");

applyTheme(currentTheme === "dark" ? "light" : "dark");
});


// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = select(".menu-toggle");
const mobileMenu = select(".mobile-menu");

function closeMobileMenu() {
if (!mobileMenu || !menuToggle) return;

mobileMenu.classList.remove("active");
menuToggle.classList.remove("active");

menuToggle.setAttribute("aria-expanded", "false");

document.body.classList.remove("menu-open");
}

if (menuToggle && mobileMenu) {
menuToggle.setAttribute("aria-expanded", "false");

menuToggle.addEventListener("click", () => {
const isOpen = mobileMenu.classList.toggle("active");

menuToggle.classList.toggle("active", isOpen);

menuToggle.setAttribute(
"aria-expanded",
String(isOpen)
);

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
if (event.key === "Escape") {
closeMobileMenu();
}
});
}


// ==========================================
// SMOOTH SCROLL
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
// SCROLL PROGRESS
// ==========================================

const scrollProgress = select(".scroll-progress");

function updateScrollProgress() {
if (!scrollProgress) return;

const scrollHeight =
document.documentElement.scrollHeight - window.innerHeight;

const progress =
scrollHeight > 0
? (window.scrollY / scrollHeight) * 100
: 0;

scrollProgress.style.width = `${progress}%`;
}


// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

const header = select(".main-header");

function updateHeader() {
if (!header) return;

header.classList.toggle(
"scrolled",
window.scrollY > 50
);
}


// ==========================================
// BACK TO TOP
// ==========================================

const backToTop = select(".floating-top");

function updateBackToTop() {
if (!backToTop) return;

backToTop.classList.toggle(
"show",
window.scrollY > 500
);
}

backToTop?.addEventListener("click", () => {
window.scrollTo({
top: 0,
behavior: "smooth"
});
});


// ==========================================
// SCROLL REVEAL ANIMATION
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
// ACTIVE NAVIGATION
// ==========================================

const navLinks = selectAll(
'.desktop-nav a[href^="#"], .mobile-menu a[href^="#"]'
);

const sections = selectAll("main section[id]");

if ("IntersectionObserver" in window && sections.length) {
const sectionObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (!entry.isIntersecting) return;

const sectionId = entry.target.id;

navLinks.forEach((link) => {
const active =
link.getAttribute("href") === `#${sectionId}`;

link.classList.toggle("active", active);
});
});
},
{
rootMargin: "-35% 0px -55% 0px"
}
);

sections.forEach((section) => {
sectionObserver.observe(section);
});
}


// ==========================================
// PROJECT CARD TILT
// ==========================================

const projectCards = selectAll(".project-card");

if (window.matchMedia("(pointer: fine)").matches) {
projectCards.forEach((card) => {
card.addEventListener("mousemove", (event) => {
const rect = card.getBoundingClientRect();

const x = event.clientX - rect.left;
const y = event.clientY - rect.top;

const rotateX =
((y / rect.height) - 0.5) * -5;

const rotateY =
((x / rect.width) - 0.5) * 5;

card.style.transform =
`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
});

card.addEventListener("mouseleave", () => {
card.style.transform = "";
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
const subject = select('[name="subject"]', contactForm);
const message = select('[name="message"]', contactForm);

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

if (!subject?.value.trim()) {
event.preventDefault();

alert("Please enter your project subject.");

subject?.focus();

return;
}

if (!message?.value.trim()) {
event.preventDefault();

alert("Please describe your project.");

message?.focus();

return;
}

// Form submits to Formspree endpoint.
// Replace YOUR_FORM_ID in index.html first.
});
}


// ==========================================
// SKILL BAR ANIMATION
// ==========================================

const skillBars = selectAll(".skill-fill");

if ("IntersectionObserver" in window && skillBars.length) {
const skillObserver = new IntersectionObserver(
(entries, observer) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.style.animationPlayState = "running";

observer.unobserve(entry.target);
}
});
},
{
threshold: 0.3
}
);

skillBars.forEach((bar) => {
bar.style.animationPlayState = "paused";

skillObserver.observe(bar);
});
}


// ==========================================
// AUTOMATIC FOOTER YEAR
// ==========================================

const yearElement = select("#current-year");

if (yearElement) {
yearElement.textContent = new Date().getFullYear();
}


// ==========================================
// COMBINED SCROLL HANDLER
// ==========================================

let ticking = false;

function handleScroll() {
if (ticking) return;

ticking = true;

requestAnimationFrame(() => {
updateScrollProgress();
updateHeader();
updateBackToTop();

ticking = false;
});
}

window.addEventListener("scroll", handleScroll, {
passive: true
});

// Initial state
updateScrollProgress();
updateHeader();
updateBackToTop();


// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(
"%cHAMMAD KHALID",
"color:#ff6b00;font-size:25px;font-weight:bold;"
);

console.log(
"%cPortfolio loaded successfully.",
"color:#888;font-size:12px;"
);

});
