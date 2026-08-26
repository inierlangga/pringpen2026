/**
 * PRINGPEN 2026 - Background Audio Controller
 * Handles background music playback (gangsingan.mp3), loop, browser autoplay policy handling,
 * and spinning CD disc interaction.
 */

let globalAudio = null;
let globalControlWrap = null;
let globalToggleBtn = null;
let hasUserManuallyPaused = false;

export function playAudioDirectly() {
  if (hasUserManuallyPaused) return;
  const audio = globalAudio || document.getElementById('bg-audio');
  const controlWrap = globalControlWrap || document.getElementById('audio-control');
  const toggleBtn = globalToggleBtn || document.getElementById('audio-toggle-btn');

  if (!audio) return;
  audio.volume = 0.4;

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        if (controlWrap) {
          controlWrap.classList.add('playing');
          controlWrap.classList.remove('paused');
        }
        if (toggleBtn) {
          toggleBtn.setAttribute('aria-label', 'Jeda Musik Latar');
          toggleBtn.setAttribute('title', 'Jeda Musik Latar');
        }
      })
      .catch(() => {
        // Autoplay policy prevented immediate playback
        if (controlWrap) {
          controlWrap.classList.remove('playing');
          controlWrap.classList.add('paused');
        }
      });
  }
}

export function initBacksound() {
  const audio = document.getElementById('bg-audio');
  const controlWrap = document.getElementById('audio-control');
  const toggleBtn = document.getElementById('audio-toggle-btn');

  if (!audio || !controlWrap || !toggleBtn) return;

  globalAudio = audio;
  globalControlWrap = controlWrap;
  globalToggleBtn = toggleBtn;

  audio.volume = 0.4;

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

  function pauseAudio() {
    audio.pause();
    updateUI(false);
  }

  function toggleAudio(e) {
    if (e) e.stopPropagation();
    if (audio.paused) {
      hasUserManuallyPaused = false;
      playAudioDirectly();
    } else {
      hasUserManuallyPaused = true;
      pauseAudio();
    }
  }

  toggleBtn.addEventListener('click', toggleAudio);

  // 1. Attempt immediate playback on page load
  playAudioDirectly();

  // 2. Comprehensive capture listeners: As soon as user clicks, taps, scrolls, or presses any key,
  // immediately unlock audio playback seamlessly.
  const unlockEvents = ['pointerdown', 'touchstart', 'click', 'keydown', 'wheel', 'scroll'];

  const unlockAudioOnGesture = () => {
    if (!hasUserManuallyPaused && audio.paused) {
      playAudioDirectly();
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
