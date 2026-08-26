/**
 * PRINGPEN 2026 - Preloader Module (Interactive + Audio Unlocker)
 * Split curtain animation + Logo reveal + Fast unlock on tap / timeout
 */

import { playAudioDirectly } from './audio.js';

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Lock body scroll during preloader
  document.body.classList.add('preloader-active');

  let isDismissed = false;

  const removePreloader = () => {
    if (isDismissed) return;
    isDismissed = true;

    // Trigger audio directly within user gesture stack
    playAudioDirectly();

    // Trigger opening split-curtain animation
    preloader.classList.add('loaded');

    // Unlock body scroll
    document.body.classList.remove('preloader-active');

    // Remove from layout after animation completes
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 550);
  };

  // 1. Tapping / clicking anywhere on preloader unlocks audio instantly and opens curtain
  preloader.addEventListener('click', removePreloader);
  preloader.addEventListener('touchstart', removePreloader, { passive: true });

  // 2. Fallback auto open after 1.2s
  setTimeout(removePreloader, 1200);
}
