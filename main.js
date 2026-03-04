/* ============================================================
   SATVIK SHARMA — DATA ANALYST PORTFOLIO
   main.js — All interactivity: cursor, scroll reveal
   ============================================================ */

/* ── CUSTOM CURSOR ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;   // actual mouse position
let ringX  = 0, ringY  = 0;   // lagging ring position

// Track mouse position and move dot cursor instantly
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Animate the ring with smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale cursor up on interactive elements
const interactiveEls = document.querySelectorAll(
  'a, button, .project-card, .skill-tag, .cp-card'
);

interactiveEls.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width      = '20px';
    cursor.style.height     = '20px';
    cursorRing.style.width  = '55px';
    cursorRing.style.height = '55px';
    cursorRing.style.opacity = '0.8';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.width      = '12px';
    cursor.style.height     = '12px';
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.opacity = '0.5';
  });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity      = '0';
  cursorRing.style.opacity  = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity      = '1';
  cursorRing.style.opacity  = '0.5';
});


/* ── SCROLL REVEAL ── */
// Observe every .reveal element and add .visible when in viewport
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger each item slightly for a cascade effect
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/* ── ACTIVE NAV LINK HIGHLIGHT ── */
// Highlight the nav link matching the current section in view
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => sectionObserver.observe(section));


/* ── SMOOTH SCROLL for nav links ── */
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});


/* ── HIGHLIGHTER ANIMATION ── */
const hlWords = Array.from(document.querySelectorAll('.hw'));
let hlIndex = 0;

function runHighlight() {
  hlWords.forEach(w => w.classList.remove('active'));
  hlWords[hlIndex].classList.add('active');
  hlIndex = (hlIndex + 1) % hlWords.length;
  setTimeout(runHighlight, 700);
}

// Start after page settles
setTimeout(runHighlight, 1200);
