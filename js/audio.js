/**
 * PRINGPEN 2026 - Background Audio Controller (Mobile & Desktop Optimized)
 * Robust Web Audio API unlocker + HTML5 Audio playback for iOS Safari & Android Chrome.
 */

let globalAudio = null;
let globalControlWrap = null;
let globalToggleBtn = null;
let hasUserManuallyPaused = false;
let audioContext = null;

function getAudioElement() {
  if (!globalAudio) {
    globalAudio = document.getElementById('bg-audio');
  }
  return globalAudio;
}

function getUIElements() {
  if (!globalControlWrap) {
    globalControlWrap = document.getElementById('audio-control');
  }
  if (!globalToggleBtn) {
    globalToggleBtn = document.getElementById('audio-toggle-btn');
  }
  return { controlWrap: globalControlWrap, toggleBtn: globalToggleBtn };
}

function updateUI(playing) {
  const { controlWrap, toggleBtn } = getUIElements();
  if (playing) {
    if (controlWrap) {
      controlWrap.classList.add('playing');
      controlWrap.classList.remove('paused');
    }
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', 'Jeda Musik Latar');
      toggleBtn.setAttribute('title', 'Jeda Musik Latar');
    }
  } else {
    if (controlWrap) {
      controlWrap.classList.remove('playing');
      controlWrap.classList.add('paused');
    }
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', 'Putar Musik Latar');
      toggleBtn.setAttribute('title', 'Putar Musik Latar');
    }
  }
}

// Unlock Web Audio Context for iOS / Android mobile browsers
function unlockAudioContext() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      if (!audioContext) {
        audioContext = new AudioCtx();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    }
  } catch (err) {
    // Ignore audio context errors on unsupported environments
  }
}

export function playAudioDirectly() {
  if (hasUserManuallyPaused) return;
  const audio = getAudioElement();
  if (!audio) return;

  unlockAudioContext();

  try {
    audio.muted = false;
    audio.volume = 0.4;
  } catch (err) {
    // iOS Safari does not allow volume mutation via JS
  }

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        updateUI(true);
      })
      .catch(() => {
        // If play failed due to browser restriction, keep paused state for next touch
        updateUI(false);
      });
  }
}

export function pauseAudio() {
  const audio = getAudioElement();
  if (audio) {
    audio.pause();
  }
  updateUI(false);
}

export function toggleAudio(e) {
  if (e) e.stopPropagation();
  const audio = getAudioElement();
  if (!audio) return;

  if (audio.paused) {
    hasUserManuallyPaused = false;
    playAudioDirectly();
  } else {
    hasUserManuallyPaused = true;
    pauseAudio();
  }
}

export function initBacksound() {
  const audio = getAudioElement();
  const { toggleBtn } = getUIElements();

  if (!audio) return;

  try {
    audio.volume = 0.4;
  } catch (e) {}

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleAudio);
    toggleBtn.addEventListener('touchend', toggleAudio);
  }

  // Attempt initial playback on desktop if already permitted
  playAudioDirectly();

  // Mobile & Global gesture listeners:
  // Any tap / touch anywhere on the page guarantees audio starts immediately
  const gestureEvents = ['touchend', 'click', 'pointerup', 'keydown'];

  const handleGlobalGesture = () => {
    if (!hasUserManuallyPaused && audio.paused) {
      playAudioDirectly();
    }
    gestureEvents.forEach(evt => {
      window.removeEventListener(evt, handleGlobalGesture, true);
      document.removeEventListener(evt, handleGlobalGesture, true);
    });
  };

  gestureEvents.forEach(evt => {
    window.addEventListener(evt, handleGlobalGesture, { capture: true, passive: true });
    document.addEventListener(evt, handleGlobalGesture, { capture: true, passive: true });
  });
}
