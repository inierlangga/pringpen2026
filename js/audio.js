/**
 * PRINGPEN 2026 - Background Audio Controller (Mobile & Desktop Optimized)
 * Robust Web Audio API unlocker + HTML5 Audio playback for iOS Safari & Android Chrome.
 */

let globalAudio = null;
let globalControlWrap = null;
let globalToggleBtn = null;
let hasUserManuallyPaused = false;
let audioContext = null;
let lastToggleTime = 0;

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

export function playAudioDirectly(delayMs = 0) {
  if (hasUserManuallyPaused) return;
  const audio = getAudioElement();
  if (!audio) return;

  unlockAudioContext();

  const executePlay = () => {
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
          // If play failed due to browser restriction, keep paused state
          updateUI(false);
        });
    }
  };

  if (delayMs > 0) {
    // Prime audio on mobile by attempting to play and immediately pause synchronously,
    // which unlocks the audio element for the delayed execution.
    const primePromise = audio.play();
    if (primePromise !== undefined) {
      primePromise.then(() => {
        audio.pause();
        setTimeout(executePlay, delayMs);
      }).catch(() => {
        setTimeout(executePlay, delayMs);
      });
    } else {
      audio.pause();
      setTimeout(executePlay, delayMs);
    }
  } else {
    executePlay();
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
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const now = Date.now();
  // Prevent double triggers on mobile touch (e.g. touchend followed by synthesized click)
  if (now - lastToggleTime < 350) {
    return;
  }
  lastToggleTime = now;

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
    toggleBtn.addEventListener('touchend', toggleAudio, { passive: false });
  }

  // Note: We no longer auto-play audio here on page load.
  // The preloader (js/preloader.js) is strictly responsible for starting the background music
  // when the user explicitly clicks the "MASUK" button.
}
