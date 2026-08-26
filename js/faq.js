/**
 * PRINGPEN 2026 - FAQ Accordion Animation Module
 * Diadaptasi dari animasi accordion halus Canon Cup 2026
 * Menggunakan dynamic scrollHeight maxHeight transition & 45deg icon rotation
 */

export function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      // Inisialisasi item yang memiliki class 'active' saat pertama kali dimuat
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }

      question.addEventListener('click', () => {
        // Tutup item lain (Exclusive Accordion Mode)
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) {
              otherAnswer.style.maxHeight = null;
            }
          }
        });

        // Toggle item yang sedang diklik
        const isActive = item.classList.toggle('active');
        if (isActive) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = null;
        }
      });
    }
  });

  // Re-calculate height on window resize to prevent text clipping
  window.addEventListener('resize', () => {
    faqItems.forEach((item) => {
      if (item.classList.contains('active')) {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });
}
