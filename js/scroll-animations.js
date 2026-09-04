/**
 * PRINGPEN 2026 – Scroll Animations
 * Fade-in & slide-up reveal (IntersectionObserver) with group-based staggered delays
 */

export function initScrollAnimations() {
  // Stagger helper for groups of 4 cards/columns (0ms, 100ms, 200ms, 300ms)
  const staggerGroups = [
    { selector: '.category-card', baseDelay: 100 },
    { selector: '.faq-item', baseDelay: 100 },
    { selector: '.footer-col', baseDelay: 100 }
  ];

  staggerGroups.forEach(group => {
    const items = document.querySelectorAll(group.selector);
    items.forEach((item, idx) => {
      item.classList.add('reveal-on-scroll');
      const delay = (idx % 4) * group.baseDelay;
      if (delay > 0) item.classList.add(`delay-${delay}`);
    });
  });

  // Single elements & container panels
  const singleElements = document.querySelectorAll(`
    .section-header,
    .timeline-layout,
    .gallery-carousel-container,
    .ba-hero-card,
    .sponsor-cta-banner
  `);

  singleElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    if (el.classList.contains('agenda-panel')) {
      el.classList.add('delay-200');
    }
  });

  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
        setTimeout(() => {
          entry.target.classList.remove('delay-100', 'delay-200', 'delay-300', 'delay-400');
        }, 900);
      }
    });
  }, { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}
