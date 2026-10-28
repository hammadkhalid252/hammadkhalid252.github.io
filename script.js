
:root {
  --bg: #090b0a;
  --panel: #101311;
  --panel-light: #151a16;
  --line: rgba(255,255,255,.10);
  --text: #f4f5f0;
  --muted: #969d96;
  --green: #c5ff64;
  --green-dark: #86c833;
  --font: "Manrope", sans-serif;
  --mono: "DM Mono", monospace;
  --container: 1160px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 95px; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  line-height: 1.65;
  overflow-x: hidden;
}
body.menu-open { overflow: hidden; }
a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 4px;
}
::selection { background: var(--green); color: #090b0a; }

.container { width: min(var(--container), calc(100% - 48px)); margin-inline: auto; }
.section { padding: 120px 0; position: relative; }
.page-noise {
  position: fixed; inset: 0; z-index: 20; pointer-events: none; opacity: .035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
}
.scroll-progress {
  position: fixed; top: 0; left: 0; height: 2px; width: 0;
  background: var(--green); z-index: 1000; box-shadow: 0 0 12px var(--green);
}
.site-header {
  position: sticky; top: 0; z-index: 100; background: rgba(9,11,10,.78);
  backdrop-filter: blur(18px); border-bottom: 1px solid transparent;
  transition: border-color .3s, background .3s;
}
.site-header.scrolled { border-color: var(--line); background: rgba(9,11,10,.94); }
.navbar { min-height: 82px; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.logo { display: inline-flex; align-items: center; gap: 11px; }
.logo-mark {
  width: 36px; height: 36px; display: grid; place-items: center; border: 1px solid #4a5c39;
  color: var(--green); font-weight: 800; font-size: 13px; letter-spacing: -2px;
}
.logo-mark span { color: var(--text); }
.logo-name { font-weight: 800; letter-spacing: 2px; font-size: 14px; }
.logo-name > span { color: var(--green); }
.nav-links { display: flex; align-items: center; gap: 34px; }
.nav-links > a { color: #b5bbb4; font-size: 12px; transition: color .25s; }
.nav-links > a:hover, .nav-links > a[aria-current="location"] { color: var(--green); }
.nav-links .nav-contact { color: var(--text); border: 1px solid var(--line); padding: 11px 16px; }
.nav-contact span { color: var(--green); margin-left: 10px; }
.menu-toggle { display: none; }

.hero { min-height: 700px; padding: 90px 0 80px; overflow: hidden; }
.hero-grid { display: grid; grid-template-columns: 1.08fr .92fr; align-items: center; gap: 50px; }
.hero-content { position: relative; z-index: 2; }
.availability {
  display: inline-flex; align-items: center; gap: 10px; border: 1px solid var(--line);
  border-radius: 100px; padding: 8px 13px; color: #c4cbc3; font: 10px var(--mono);
  letter-spacing: .8px; margin-bottom: 32px;
}
.availability-dot, .status-dot {
  width: 7px; height: 7px; display: inline-block; border-radius: 50%;
  background: var(--green); box-shadow: 0 0 12px rgba(197,255,100,.65);
  animation: pulse 2.1s infinite;
}
.eyebrow, .section-kicker, .project-type {
  font: 10px var(--mono); letter-spacing: 1.5px; color: var(--green);
}
.eyebrow span { color: #5e685b; padding-inline: 5px; }
.hero h1 {
  margin: 19px 0 24px; font-size: clamp(45px, 5.2vw, 73px);
  line-height: 1.07; letter-spacing: -4px; font-weight: 700;
}
.outline-text {
  color: transparent; -webkit-text-stroke: 1px var(--green);
  text-shadow: 0 0 34px rgba(197,255,100,.06);
}
.hero-description { max-width: 485px; color: var(--muted); font-size: 14px; line-height: 1.95; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 13px; margin-top: 31px; }
.btn {
  min-height: 49px; padding: 0 20px; display: inline-flex; align-items: center;
  justify-content: center; gap: 22px; border: 1px solid transparent;
  font-size: 12px; font-weight: 700; cursor: pointer; transition: transform .25s, background .25s, border-color .25s;
}
.btn:hover { transform: translateY(-3px); }
.btn-primary { background: var(--green); color: #11160b; }
.btn-primary:hover { background: #d8ff9b; box-shadow: 0 7px 30px rgba(197,255,100,.12); }
.btn-primary span, .btn-ghost span, .btn-light span { font-size: 17px; }
.btn-ghost { border-color: var(--line); color: var(--text); }
.btn-ghost:hover { border-color: rgba(197,255,100,.55); }
.hero-bottom { margin-top: 65px; display: flex; align-items: center; justify-content: space-between; gap: 15px; }
.hero-location, .scroll-cue { color: var(--muted); font: 10px var(--mono); }
.location-icon { color: var(--green); font-size: 16px; margin-right: 6px; }
.scroll-cue { letter-spacing: .8px; }
.scroll-cue span { color: var(--green); margin-left: 8px; }

.hero-art { min-height: 480px; position: relative; display: grid; place-items: center; }
.hero-orb { position: absolute; width: 400px; height: 400px; border-radius: 50%; filter: blur(90px); pointer-events: none; }
.orb-one { background: rgba(95,151,47,.11); right: -150px; top: 10%; }
.orb-two { background: rgba(37,101,74,.08); left: -10%; bottom: -10%; }
.art-label { position: absolute; font: 9px var(--mono); color: #a2aaa0; letter-spacing: 1.5px; display: flex; align-items: center; gap: 10px; }
.label-top { top: 35px; left: 20px; }
.label-bottom { bottom: 25px; right: 10px; }
.tiny-square { width: 6px; height: 6px; background: var(--green); }
.art-stage { width: min(100%, 450px); aspect-ratio: 1; position: relative; display: grid; place-items: center; perspective: 900px; }
.art-ring { position: absolute; border: 1px solid rgba(197,255,100,.18); border-radius: 50%; }
.ring-one { inset: 7%; animation: ringRotate 25s linear infinite; border-style: dashed; }
.ring-two { inset: 17%; border-color: rgba(255,255,255,.11); animation: ringRotate 32s linear infinite reverse; }
.ring-three { inset: 27%; border-color: rgba(197,255,100,.22); }
.art-core {
  width: 45%; aspect-ratio: 1; position: relative; transform-style: preserve-3d;
  animation: coreFloat 6s ease-in-out infinite;
}
.core-face {
  position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
  border: 1px solid rgba(197,255,100,.45); background: linear-gradient(145deg, #19221a, #0b100c 70%);
  box-shadow: inset 0 0 45px rgba(197,255,100,.06), 0 20px 70px rgba(0,0,0,.45);
  backface-visibility: hidden;
}
.core-front { transform: translateZ(35px); }
.core-back { transform: rotateY(180deg) translateZ(35px); background: linear-gradient(135deg, #1b2914, #101410); }
.core-small, .core-bottom { color: #8e9a88; font: 8px var(--mono); letter-spacing: 1.4px; }
.core-symbol { margin: 14px 0; font-size: clamp(48px, 6vw, 78px); font-weight: 800; letter-spacing: -7px; }
.core-symbol span { color: var(--green); }
.core-bottom { font-size: 7px; }
.orbit-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--green); position: absolute; box-shadow: 0 0 20px rgba(197,255,100,.65); }
.orbit-dot-one { top: 18%; left: 30%; }
.orbit-dot-two { right: 13%; top: 50%; width: 6px; height: 6px; }
.orbit-dot-three { bottom: 18%; left: 25%; width: 5px; height: 5px; }
.floating-note {
  position: absolute; display: flex; align-items: center; gap: 12px; padding: 13px 15px;
  border: 1px solid var(--line); background: rgba(15,19,16,.85); backdrop-filter: blur(12px);
  box-shadow: 0 12px 40px rgba(0,0,0,.25); animation: noteFloat 5s ease-in-out infinite;
}
.note-one { top: 22%; right: -5px; }
.note-two { bottom: 18%; left: -5px; animation-delay: -2.5s; }
.note-icon { color: var(--green); font-size: 21px; }
.floating-note strong, .floating-note small { display: block; }
.floating-note strong { font-size: 11px; }
.floating-note small { font: 9px var(--mono); color: var(--muted); margin-top: 3px; }

.tech-strip { border-block: 1px solid var(--line); background: #0c0f0d; }
.tech-strip-inner { min-height: 84px; display: flex; align-items: center; justify-content: space-between; gap: 22px; flex-wrap: wrap; }
.tech-strip-inner > span { color: #727a71; font: 9px var(--mono); letter-spacing: 1.3px; }
.tech-strip-inner > div { color: #aab1a8; font-size: 10px; font-weight: 800; letter-spacing: 1px; }
.tech-strip-inner i { color: var(--green); font-style: normal; }

.about-section { background: #0c0f0d; }
.about-grid { display: grid; grid-template-columns: .7fr 1.6fr .7fr; align-items: start; gap: 55px; }
.section-kicker { display: flex; align-items: center; gap: 13px; white-space: nowrap; }
.kicker-line { width: 35px; height: 1px; background: rgba(197,255,100,.45); }
.about-main h2, .section-heading h2, .contact-copy h2, .final-cta h2 {
  margin: 0; font-size: clamp(34px, 4vw, 52px); line-height: 1.2; letter-spacing: -2px;
}
.about-main h2 span, .section-heading h2 span, .contact-copy h2 span, .final-cta h2 span { color: var(--green); }
.about-copy { margin-top: 30px; color: #e2e7df; font-size: 17px; line-height: 1.9; }
.muted-copy { color: var(--muted); font-size: 13px; line-height: 2; }
.text-link { display: inline-flex; gap: 20px; align-items: center; margin-top: 23px; padding-bottom: 9px; border-bottom: 1px solid #4b5b3d; font-size: 12px; }
.text-link span { color: var(--green); font-size: 16px; }
.about-stat { position: relative; padding: 25px 0 0 25px; border-left: 1px solid var(--line); min-height: 180px; overflow: hidden; }
.stat-number { display: block; font-size: 72px; line-height: 1; font-weight: 700; letter-spacing: -5px; }
.stat-number span { color: var(--green); }
.stat-caption { display: block; margin-top: 20px; font: 9px/1.9 var(--mono); letter-spacing: 1px; color: var(--muted); }
.stat-decoration { position: absolute; right: 0; bottom: -30px; color: rgba(197,255,100,.1); font-size: 90px; }

.services-section { background: var(--bg); }
.section-heading { margin-bottom: 48px; }
.section-heading h2 { margin-top: 27px; }
.section-heading > p, .projects-heading > p { color: var(--muted); max-width: 400px; font-size: 13px; }
.services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.service-card {
  position: relative; padding: 28px 22px 24px; min-height: 300px; border: 1px solid var(--line);
  background: linear-gradient(145deg, #111512, #0b0e0c); overflow: hidden;
  transition: transform .3s, border-color .3s, background .3s;
}
.service-card::after { content: ""; position: absolute; width: 150px; height: 150px; right: -80px; bottom: -90px; border-radius: 50%; background: var(--green); filter: blur(70px); opacity: 0; transition: opacity .4s; }
.service-card:hover { transform: translateY(-7px); border-color: rgba(197,255,100,.4); }
.service-card:hover::after { opacity: .12; }
.service-index { position: absolute; top: 25px; right: 23px; font: 10px var(--mono); color: #626b60; }
.service-symbol { width: 43px; height: 43px; display: grid; place-items: center; border: 1px solid #3a4932; color: var(--green); font-size: 24px; }
.service-card h3 { margin: 31px 0 12px; font-size: 16px; }
.service-card p { min-height: 78px; color: var(--muted); font-size: 11px; line-height: 1.9; }
.service-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px; }
.service-tags span { padding: 5px 7px; border: 1px solid var(--line); color: #aab2a8; font: 8px var(--mono); }

.projects-section { background: #0c0f0d; }
.projects-heading { display: flex; align-items: end; justify-content: space-between; gap: 35px; }
.projects-heading > p { max-width: 290px; }
.projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px 18px; }
.project-card { min-width: 0; }
.project-large { grid-column: 1 / -1; }
.project-visual { position: relative; min-height: 300px; overflow: hidden; display: grid; place-items: center; border: 1px solid var(--line); }
.project-large .project-visual { min-height: 400px; }
.visual-shield { background: radial-gradient(ellipse at 70% 40%, #283c25, #101811 50%, #0b0e0c); }
.mock-browser { width: 79%; border: 1px solid rgba(255,255,255,.2); background: #0e150f; box-shadow: 0 30px 80px rgba(0,0,0,.5); transform: perspective(1000px) rotateY(-7deg) rotateX(2deg); transition: transform .5s; }
.project-card:hover .mock-browser { transform: perspective(1000px) rotateY(0) rotateX(0) translateY(-5px); }
.browser-top { height: 31px; display: flex; align-items: center; gap: 5px; padding: 0 11px; border-bottom: 1px solid var(--line); }
.browser-top > span { width: 5px; height: 5px; background: #687466; border-radius: 50%; }
.browser-top i { margin-left: auto; color: #879084; font: 8px var(--mono); font-style: normal; }
.mock-shield { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 35px; min-height: 245px; }
.mock-shield-copy small { color: var(--green); font: 8px var(--mono); letter-spacing: 1px; }
.mock-shield-copy strong { display: block; font-size: clamp(25px, 4vw, 46px); line-height: 1.1; letter-spacing: -2px; margin: 15px 0 20px; }
.mock-button { display: inline-block; padding: 9px 12px; background: var(--green); color: #10150c; font: 8px var(--mono); }
.shield-graphic { width: 130px; aspect-ratio: .8; flex-shrink: 0; display: grid; place-items: center; border: 1px solid rgba(197,255,100,.5); clip-path: polygon(50% 0, 100% 17%, 90% 73%, 50% 100%, 10% 73%, 0 17%); background: linear-gradient(150deg, rgba(197,255,100,.18), transparent); }
.shield-graphic span { font-size: 70px; color: var(--green); font-weight: 800; }
.visual-pet { background: radial-gradient(circle at 50% 35%, #624c34, #211b15 55%, #100e0c); }
.pet-window { position: relative; width: 70%; min-height: 240px; padding: 25px; background: #e8dcc7; color: #35291d; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; }
.pet-label { font: 8px var(--mono); letter-spacing: 2px; }
.pet-circle { position: absolute; right: 17px; top: 28px; width: 70px; aspect-ratio: 1; display: grid; place-items: center; border: 1px solid #89795d; border-radius: 50%; font-size: 20px; }
.pet-window strong { font-size: clamp(22px, 3vw, 35px); line-height: 1.1; letter-spacing: -1.5px; margin-top: 38px; }
.pet-line { width: 50px; height: 2px; margin-top: 18px; background: #8a704a; }
.visual-consult { background: radial-gradient(circle at 70% 30%, #34382f, #141713 60%, #0c0f0d); }
.consult-window { width: 75%; min-height: 220px; padding: 25px; border: 1px solid rgba(255,255,255,.15); background: rgba(11,14,11,.55); }
.consult-kicker { font: 8px var(--mono); color: var(--green); letter-spacing: 1px; }
.consult-window strong { display: block; margin-top: 25px; font-size: clamp(24px, 3vw, 37px); line-height: 1.1; letter-spacing: -1.5px; }
.consult-bars { display: flex; gap: 5px; align-items: end; height: 38px; margin-top: 18px; }
.consult-bars i { display: block; width: 8px; background: var(--green); opacity: .7; }
.consult-bars i:nth-child(1) { height: 25%; }
.consult-bars i:nth-child(2) { height: 48%; }
.consult-bars i:nth-child(3) { height: 65%; }
.consult-bars i:nth-child(4) { height: 83%; }
.consult-bars i:nth-child(5) { height: 100%; }
.project-info { display: flex; align-items: center; justify-content: space-between; padding: 19px 2px; }
.project-type { font-size: 8px; letter-spacing: 1.2px; color: #9ca694; }
.project-info h3 { margin: 5px 0 0; font-size: 17px; }
.project-arrow { width: 36px; height: 36px; display: grid; place-items: center; border: 1px solid var(--line); color: var(--green); transition: background .25s, color .25s; }
.project-card:hover .project-arrow { background: var(--green); color: #10150c; }
.projects-note { margin-top: 16px; color: #788075; font-size: 10px; }

.contact-section { background: var(--bg); }
.contact-grid { display: grid; grid-template-columns: 1fr .85fr; gap: 90px; margin-top: 50px; }
.contact-copy h2 { font-size: clamp(48px, 6vw, 75px); }
.contact-copy > p { max-width: 390px; color: var(--muted); font-size: 13px; line-height: 2; margin: 25px 0; }
.contact-email { display: inline-flex; align-items: center; gap: 16px; padding-bottom: 8px; border-bottom: 1px solid #47583a; font-size: 13px; }
.contact-email span { color: var(--green); }
.contact-location { display: flex; align-items: center; gap: 10px; margin-top: 34px; color: var(--muted); font: 10px var(--mono); }
.contact-form { padding: 30px; border: 1px solid var(--line); background: linear-gradient(145deg, #111512, #0b0e0c); }
.contact-form label { display: block; margin: 0 0 10px; color: #aab3a6; font: 9px var(--mono); letter-spacing: 1px; }
.contact-form input, .contact-form textarea {
  width: 100%; margin-bottom: 23px; padding: 13px 14px; border: 1px solid var(--line);
  border-radius: 0; background: #0b0e0c; color: var(--text); outline: none; font-size: 12px;
  transition: border-color .25s;
}
.contact-form input:focus, .contact-form textarea:focus { border-color: rgba(197,255,100,.65); }
.contact-form input::placeholder, .contact-form textarea::placeholder { color: #687166; }
.contact-form textarea { resize: vertical; min-height: 105px; }
.form-submit { width: 100%; border: 0; }
.form-note, .form-status { color: #858e81; font-size: 10px; }
.form-status { color: var(--green); min-height: 16px; }

.final-cta { padding: 75px 0; background: var(--green); color: #10150c; }
.final-cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.final-cta .eyebrow { color: #384a27; }
.final-cta h2 { margin-top: 17px; font-size: clamp(33px, 4.5vw, 55px); }
.final-cta h2 span { color: #4c672e; }
.btn-light { background: #10150c; color: var(--text); flex-shrink: 0; }
.btn-light:hover { background: #202a1a; }
.site-footer { border-top: 1px solid var(--line); }
.footer-inner { min-height: 100px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.footer-inner > p, .copyright, .back-to-top { color: #8d968b; font-size: 10px; }
.back-to-top { font-family: var(--mono); letter-spacing: .6px; }
.back-to-top:hover { color: var(--green); }

/* Animation states */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .75s ease, transform .75s cubic-bezier(.2,.7,.2,1); }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
.services-grid .reveal:nth-child(2), .projects-grid .reveal:nth-child(2) { transition-delay: .08s; }
.services-grid .reveal:nth-child(3), .projects-grid .reveal:nth-child(3) { transition-delay: .16s; }
.services-grid .reveal:nth-child(4) { transition-delay: .24s; }

@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
@keyframes ringRotate { to { transform: rotate(360deg); } }
@keyframes coreFloat { 0%,100% { transform: translateY(0) rotateY(-8deg) rotateX(5deg); } 50% { transform: translateY(-13px) rotateY(8deg) rotateX(-3deg); } }
@keyframes noteFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }

@media (max-width: 1000px) {
  .hero-grid { gap: 15px; grid-template-columns: 1fr 1fr; }
  .hero h1 { font-size: clamp(43px, 6vw, 62px); letter-spacing: -3px; }
  .hero-art { min-height: 400px; }
  .about-grid { grid-template-columns: 1fr 2fr; gap: 35px; }
  .about-stat { grid-column: 2; }
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .contact-grid { gap: 45px; }
  .tech-strip-inner { justify-content: center; padding-block: 22px; }
  .tech-strip-inner > span { width: 100%; text-align: center; }
}
@media (max-width: 720px) {
  .container { width: min(100% - 36px, var(--container)); }
  .section { padding: 82px 0; }
  .navbar { min-height: 70px; }
  .menu-toggle {
    display: flex; flex-direction: column; gap: 6px; justify-content: center;
    align-items: center; width: 43px; height: 43px; border: 1px solid var(--line);
    background: transparent; cursor: pointer;
  }
  .menu-toggle span { width: 18px; height: 1px; background: var(--text); transition: transform .25s; }
  .menu-toggle[aria-expanded="true"] span:first-child { transform: translateY(3.5px) rotate(45deg); }
  .menu-toggle[aria-expanded="true"] span:last-child { transform: translateY(-3.5px) rotate(-45deg); }
  .nav-links {
    position: absolute; top: 69px; left: 0; right: 0; display: flex; flex-direction: column;
    align-items: stretch; gap: 0; padding: 12px 22px 22px; background: #0b0e0c;
    border-bottom: 1px solid var(--line); opacity: 0; visibility: hidden;
    transform: translateY(-8px); transition: opacity .25s, transform .25s, visibility .25s;
  }
  .nav-links.open { opacity: 1; visibility: visible; transform: translateY(0); }
  .nav-links > a { padding: 14px 3px; border-bottom: 1px solid var(--line); }
  .nav-links .nav-contact { margin-top: 12px; padding: 13px; border: 1px solid var(--line); }
  .hero { padding: 70px 0 45px; }
  .hero-grid { grid-template-columns: 1fr; }
  .hero h1 { font-size: clamp(44px, 11vw, 65px); letter-spacing: -3px; }
  .hero-description { font-size: 13px; }
  .hero-bottom { margin-top: 38px; }
  .hero-art { min-height: 360px; margin-top: 15px; }
  .art-stage { max-width: 360px; }
  .label-top { left: 0; top: 5px; }
  .label-bottom { right: 0; bottom: 3px; }
  .note-one { right: 0; top: 22%; }
  .note-two { left: 0; bottom: 18%; }
  .tech-strip-inner { gap: 18px 23px; }
  .tech-strip-inner > div { font-size: 9px; }
  .about-grid { grid-template-columns: 1fr; gap: 35px; }
  .about-stat { grid-column: auto; }
  .about-main h2, .section-heading h2 { font-size: clamp(33px, 9vw, 47px); }
  .about-copy { font-size: 15px; }
  .section-heading { margin-bottom: 33px; }
  .services-grid { gap: 11px; }
  .service-card { padding: 23px 16px; min-height: 300px; }
  .service-card h3 { font-size: 14px; }
  .service-card p { font-size: 11px; }
  .projects-heading { display: block; }
  .projects-heading > p { margin-top: 18px; }
  .projects-grid { grid-template-columns: 1fr; gap: 15px; }
  .project-large { grid-column: auto; }
  .project-large .project-visual { min-height: 320px; }
  .project-visual { min-height: 280px; }
  .mock-browser { width: 90%; }
  .mock-shield { padding: 22px 16px; min-height: 210px; }
  .shield-graphic { width: 80px; }
  .shield-graphic span { font-size: 45px; }
  .contact-grid { grid-template-columns: 1fr; gap: 35px; margin-top: 35px; }
  .contact-copy h2 { font-size: 55px; }
  .contact-form { padding: 22px 18px; }
  .final-cta { padding: 60px 0; }
  .final-cta-inner { align-items: flex-start; flex-direction: column; }
  .final-cta h2 { font-size: 37px; }
  .footer-inner { justify-content: space-between; padding-block: 24px; }
  .footer-inner > p { order: 3; width: 100%; margin: 0; }
}
@media (max-width: 390px) {
  .container { width: calc(100% - 28px); }
  .hero h1 { font-size: 42px; }
  .hero-actions { align-items: stretch; flex-direction: column; }
  .hero-actions .btn { justify-content: space-between; }
  .hero-bottom { align-items: flex-start; flex-direction: column; }
  .hero-art { min-height: 315px; }
  .floating-note { padding: 9px 10px; }
  .floating-note strong { font-size: 10px; }
  .floating-note small { font-size: 8px; }
  .services-grid { grid-template-columns: 1fr; }
  .service-card { min-height: 260px; }
  .service-card p { min-height: auto; }
  .project-large .project-visual { min-height: 280px; }
  .mock-shield { padding: 18px 12px; }
  .mock-shield-copy strong { font-size: 27px; }
  .shield-graphic { width: 65px; }
  .shield-graphic span { font-size: 36px; }
  .contact-email { font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}
