/**
 * PRINGPEN 2026 - Main Master Script
 * Orchestrates all interactive modules and smooth interactions
 */

import { initPreloader } from './preloader.js';
import { initNavbar } from './navbar.js';
import { initCountdown } from './countdown.js';
import { initCalendar } from './calendar.js';
import { initCarousel } from './carousel.js';
import { initFaqAccordion } from './faq.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initBacksound } from './audio.js';

// Structured Category Data for Competition Section
export const categoriesData = [
  {
    id: "tari-tradisional",
    title: "Tari Tradisional & Kreasi",
    icon: "assets/icons/11.png",
    description: "Kompetisi seni tari tradisional maupun kreasi daerah yang mengekspresikan kekayaan dan keanggunan budaya Nusantara.",
    regLink: "#",
    guidebookLink: "#",
    badge: "Seni Pertunjukan"
  },
  {
    id: "teater-monolog",
    title: "Teater & Monolog",
    icon: "assets/icons/12.png",
    description: "Panggung olah peran dan seni peran lakon bertema Lentera Nusa yang menggugah emosi, karakter, dan pesan moral luhur.",
    regLink: "#",
    guidebookLink: "#",
    badge: "Seni Peran"
  },
  {
    id: "cipta-baca-puisi",
    title: "Cipta & Baca Puisi",
    icon: "assets/icons/13.png",
    description: "Gubahan bait-bait puitis dan penghayatan deklamasi sastra nusantara yang menyuarakan semangat dan kecintaan pada tanah air.",
    regLink: "#",
    guidebookLink: "#",
    badge: "Sastra Nusantara"
  },
  {
    id: "musik-tradisi",
    title: "Musik Tradisi & Akustik",
    icon: "assets/icons/14.png",
    description: "Harmonisasi instrumen etnik dan aransemen akustik bernuansa nusantara yang syahdu dan sarat harmoni nada nusantara.",
    regLink: "#",
    guidebookLink: "#",
    badge: "Seni Musik"
  }
];

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initCategoryCards() {
  const container = document.getElementById('categories-grid-container');
  if (!container) return;

  container.innerHTML = '';
  categoriesData.forEach((cat, idx) => {
    const card = document.createElement('article');
    card.className = `category-card reveal-on-scroll${idx > 0 ? ` delay-${idx * 100}` : ''}`;
    card.setAttribute('data-category-id', cat.id);

    card.innerHTML = `
      <div class="category-icon-frame">
        <img src="${cat.icon}" alt="Ikon ${cat.title}" loading="lazy">
      </div>
      <h3 class="category-name">${cat.title}</h3>
      <p class="category-desc">${cat.description}</p>
      <div class="category-actions">
        <!-- Tombol Daftar -->
        <a href="${cat.regLink}" class="btn btn-primary btn-sm" aria-label="Daftar Lomba ${cat.title}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7.5" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          Daftar
        </a>
        <!-- Tombol Handbook/Guidebook -->
        <a href="${cat.guidebookLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" aria-label="Buka Guidebook ${cat.title}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          Handbook
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initCountdown();
  initCategoryCards();
  initCalendar();
  initCarousel();
  initFaqAccordion();
  initSmoothScroll();
  initScrollAnimations();
  initBacksound();
});
