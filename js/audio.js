/**
 * PRINGPEN 2026 - Background Audio Controller
 * Handles background music playback (gangsingan.mp3), loop, browser autoplay policy handling,
 * and spinning CD disc interaction.
 */

export function initBacksound() {
  const audio = document.getElementById('bg-audio');
  const controlWrap = document.getElementById('audio-control');
  const toggleBtn = document.getElementById('audio-toggle-btn');

  if (!audio || !controlWrap || !toggleBtn) return;

  // Set comfortable ambient volume
  audio.volume = 0.4;

  let hasUserManuallyPaused = false;

  function updateUI(playing) {
    if (playing) {
      controlWrap.classList.add('playing');
      controlWrap.classList.remove('paused');
      toggleBtn.setAttribute('aria-label', 'Jeda Musik Latar');
      toggleBtn.setAttribute('title', 'Jeda Musik Latar');
    } else {
      controlWrap.classList.remove('playing');
      controlWrap.classList.add('paused');
      toggleBtn.setAttribute('aria-label', 'Putar Musik Latar');
      toggleBtn.setAttribute('title', 'Putar Musik Latar');
    }
  }

  function playAudio() {
    if (hasUserManuallyPaused) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updateUI(true);
        })
        .catch(() => {
          // Browser Autoplay Policy blocked direct audio without user gesture
          updateUI(false);
        });
    }
  }

  function pauseAudio() {
    audio.pause();
    updateUI(false);
  }

  function toggleAudio(e) {
    if (e) e.stopPropagation();
    if (audio.paused) {
      hasUserManuallyPaused = false;
      playAudio();
    } else {
      hasUserManuallyPaused = true;
      pauseAudio();
    }
  }

  toggleBtn.addEventListener('click', toggleAudio);

  // 1. Attempt immediate playback on page load
  playAudio();

  // 2. Comprehensive capture listeners: As soon as user clicks, taps, scrolls, or presses any key,
  // immediately unlock audio playback seamlessly.
  const unlockEvents = ['pointerdown', 'touchstart', 'click', 'keydown', 'wheel', 'scroll'];

  const unlockAudioOnGesture = () => {
    if (!hasUserManuallyPaused && audio.paused) {
      playAudio();
    }
    unlockEvents.forEach(evt => {
      window.removeEventListener(evt, unlockAudioOnGesture, true);
      document.removeEventListener(evt, unlockAudioOnGesture, true);
    });
  };

  unlockEvents.forEach(evt => {
    window.addEventListener(evt, unlockAudioOnGesture, { capture: true, passive: true });
    document.addEventListener(evt, unlockAudioOnGesture, { capture: true, passive: true });
  });
}
