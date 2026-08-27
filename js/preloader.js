/**
 * PRINGPEN 2026 - Preloader Module (Mobile & Desktop Optimized)
 * Staged Lifecycle:
 * 1. Loading Phase: Show branding & animated loading dots. Enter button is hidden.
 * 2. Ready Phase: Triggered on window 'load' (or complete readyState) -> reveal enter button smoothly.
 * 3. Entrance Phase: User taps/clicks the enter button -> triggers audio & opens curtain.
 */

import { playAudioDirectly } from './audio.js';

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  const enterBtn = document.getElementById('preloader-enter-btn');
  if (!preloader) return;

  // Lock body scroll during preloader
  document.body.classList.add('preloader-active');

  let isReady = false;
  let isDismissed = false;

  // Reveal enter button when assets/DOM are fully loaded
  function makeReadyToEnter() {
    if (isReady || isDismissed) return;
    isReady = true;
    preloader.classList.add('ready-to-enter');
  }

  // Detect when page is completely loaded
  if (document.readyState === 'complete') {
    setTimeout(makeReadyToEnter, 400);
  } else {
    window.addEventListener('load', () => {
      setTimeout(makeReadyToEnter, 300);
    });
    setTimeout(makeReadyToEnter, 2500);
  }

  const handleEnterAction = (e) => {
    if (!isReady || isDismissed) return;
    if (e) {
      e.stopPropagation();
    }
    isDismissed = true;

    // Direct synchronous audio playback (delayed by 2000ms so curtain SFX finishes first)
    playAudioDirectly(1200);

    // Play curtain opening sound effect
    try {
      const curtainSfx = new Audio('assets/backsound/tirai.mp3?v=2');
      curtainSfx.volume = 0.7; // Adjust volume as needed
      curtainSfx.play().catch(e => console.warn('Could not play curtain sfx:', e));
    } catch (err) {
      console.warn('Audio API error:', err);
    }

    // Trigger opening split-curtain animation
    preloader.classList.add('loaded');

    // Unlock body scroll
    document.body.classList.remove('preloader-active');

    // Remove from layout after animation completes
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1200);
  };

  if (enterBtn) {
    enterBtn.addEventListener('click', handleEnterAction);
    enterBtn.addEventListener('touchend', handleEnterAction);
  }

  // Once ready, tapping anywhere on the preloader screen will also trigger entrance
  preloader.addEventListener('click', (e) => {
    if (isReady && !isDismissed) {
      handleEnterAction(e);
    }
  });

  preloader.addEventListener('touchend', (e) => {
    if (isReady && !isDismissed) {
      handleEnterAction(e);
    }
  });
}
