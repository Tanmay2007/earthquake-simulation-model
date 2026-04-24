// SeismoSim — Dashboard interactions

/* ── ACTIVE NAV SCROLL SPY (Intersection Observer) ───────────────────────── */
const sections = document.querySelectorAll('main .section');
const navItems = document.querySelectorAll('.nav-item');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35, rootMargin: "-10% 0px -40% 0px" });

sections.forEach(sec => navObserver.observe(sec));

/* ── SMOOTH ANCHOR NAVIGATION ────────────────────────────────────────────── */
navItems.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── SCROLL REVEAL ───────────────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.card, .vs-column');

const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal-up', 'in-view');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
  observer.observe(el);
});

/* ── INTENSITY BARS ANIMATION ────────────────────────────────────────────── */
const barRed = document.getElementById('bar-red');
if (barRed) {
  let time = 0;
  function animateBars() {
    time += 0.05;
    // Red bar pulses high (65% - 95%)
    const redWidth = 80 + Math.sin(time * 2.5) * 15;
    barRed.style.width = redWidth + '%';
    requestAnimationFrame(animateBars);
  }
  // Start the animation
  requestAnimationFrame(animateBars);
}
