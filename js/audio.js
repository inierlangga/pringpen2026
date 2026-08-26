/**
 * PRINGPEN 2026 - Background Audio Controller
 * Handles background music playback (gangsingan.mp3), loop, autoplay policies,
 * and user toggle interaction with animated equalizer waves.
 */

export function initBacksound() {
  const audio = document.getElementById('bg-audio');
  const controlWrap = document.getElementById('audio-control');
  const toggleBtn = document.getElementById('audio-toggle-btn');

  if (!audio || !controlWrap || !toggleBtn) return;

  // Set comfortable ambient volume
  audio.volume = 0.4;

  let isPlaying = false;
  let hasUserInteracted = false;

  function updateUI(playing) {
    isPlaying = playing;
    if (playing) {
      controlWrap.classList.add('playing');
      controlWrap.classList.remove('paused');
      toggleBtn.setAttribute('aria-label', 'Jeda Musik Latar');
      toggleBtn.setAttribute('title', 'Jeda Musik Latar (Gangsingan)');
    } else {
      controlWrap.classList.remove('playing');
      controlWrap.classList.add('paused');
      toggleBtn.setAttribute('aria-label', 'Putar Musik Latar');
      toggleBtn.setAttribute('title', 'Putar Musik Latar (Gangsingan)');
    }
  }

  function playAudio() {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updateUI(true);
        })
        .catch(() => {
          // Autoplay policy prevented immediate playback
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
    hasUserInteracted = true;
    if (audio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  toggleBtn.addEventListener('click', toggleAudio);

  // Attempt initial playback
  playAudio();

  // One-time listener: Start music on user's first interaction anywhere on page if blocked
  const onFirstInteraction = () => {
    if (!hasUserInteracted && audio.paused) {
      playAudio();
    }
    window.removeEventListener('click', onFirstInteraction);
    window.removeEventListener('touchstart', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);
  };

  window.addEventListener('click', onFirstInteraction, { passive: true });
  window.addEventListener('touchstart', onFirstInteraction, { passive: true });
  window.addEventListener('keydown', onFirstInteraction, { passive: true });
}
