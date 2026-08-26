/**
 * PRINGPEN 2026 - Preloader Module
 * Split curtain animation + Bouncing logo + Overflow lock
 */

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Lock body scroll during preloader
  document.body.classList.add('preloader-active');

  const removePreloader = () => {
    // Trigger opening split-curtain animation
    preloader.classList.add('loaded');

    // Unlock body scroll
    document.body.classList.remove('preloader-active');

    // Remove from layout after animation completes (~800ms)
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 850);
  };

  // Wait for window load or fallback after 1.5s max
  if (document.readyState === 'complete') {
    setTimeout(removePreloader, 400);
  } else {
    window.addEventListener('load', () => {
      setTimeout(removePreloader, 400);
    });

    // Fallback safety timer
    setTimeout(() => {
      if (preloader.style.display !== 'none') {
        removePreloader();
      }
    }, 2000);
  }
}
