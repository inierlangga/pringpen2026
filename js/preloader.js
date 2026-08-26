/**
 * PRINGPEN 2026 - Preloader Module (Fast & Snappy)
 * Split curtain animation + Logo reveal + Fast unlock
 */

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Lock body scroll during preloader
  document.body.classList.add('preloader-active');

  const removePreloader = () => {
    if (preloader.classList.contains('loaded')) return;
    
    // Trigger opening split-curtain animation
    preloader.classList.add('loaded');

    // Unlock body scroll
    document.body.classList.remove('preloader-active');

    // Remove from layout after animation completes
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 550);
  };

  // Trigger quick opening after a brief 300ms branded entrance
  // (Avoids blocking on heavy background assets like Google Maps iframe)
  setTimeout(removePreloader, 300);
}
