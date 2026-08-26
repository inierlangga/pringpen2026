/**
 * PRINGPEN 2026 - Live Countdown Module
 * Target: Sabtu, 12 Desember 2026 (Acara Puncak PRINGPEN 2026)
 */

export function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');
  const statusEl = document.getElementById('countdown-status');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Target Date: Sabtu, 12 Desember 2026 08:00:00 WIB (UTC+7)
  const targetDate = new Date('2026-12-12T08:00:00+07:00').getTime();

  function pad(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      
      if (statusEl) {
        statusEl.textContent = '🎉 Acara Puncak PRINGPEN 2026 Sedang Berlangsung!';
        statusEl.style.display = 'block';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

  return timer;
}
