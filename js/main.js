/**
 * PRINGPEN 2026 - Main Master Script
 * Orchestrates all interactive modules and smooth interactions
 */

import { initPreloader } from './preloader.js';
import { initNavbar } from './navbar.js';
import { initCountdown } from './countdown.js';
import { initCarousel } from './carousel.js';
import { initFaqAccordion } from './faq.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initBacksound } from './audio.js';
import { initEmbers } from './embers.js';

// Structured Category Data for Competition Section
export const categoriesData = [
  {
    id: "monolog",
    title: "Monolog",
    subName: "Laku Lakon",
    badge: "Seni Peran",
    target: "Individu / Mahasiswa (D3/D4/S1) & Umum Nasional",
    targetShort: "Mahasiswa & Umum",
    icon: "assets/icons/lomba-monolog.png",
    description: "Panggung seni peran tunggal lakon bertema Lentera Nusa yang menggugah emosi, penjiwaan karakter mendalam, dan pesan moral luhur.",
    regLink: "https://staner.id/DaftarLakuLakonPringPen",
    guidebookLink: "https://drive.google.com/drive/folders/1Ek2RPYQnwwZVt7Rfxapz4yZd7gB_iGmZ?usp=sharing",
    chips: ["Durasi: 7 – 10 mnt", "Single Take", "Min. 720p HD"],
    subthemes: [
      "Cerita Rakyat & Legenda Nusantara",
      "Jejak Leluhur, Nilai yang Abadi",
      "Suara Kecil dari Tanah Sendiri"
    ],
    techRules: [
      "Durasi penampilan: 7 – 10 menit (di luar intro dan outro).",
      "Format video: MP4 Landscape, resolusi minimal 720p HD, ukuran maksimal 500 MB.",
      "Single Take (1 kali rekaman utuh tanpa pemotongan / jump-cut)."
    ],
    contactPersons: [
      { name: "Andini", phone: "0896-6815-0367", waNumber: "6289668150367" },
      { name: "Angga", phone: "0853-7964-0960", waNumber: "6285379640960" }
    ]
  },
  {
    id: "voice-over",
    title: "Voice Over",
    subName: "Laras Suara",
    badge: "Seni Suara",
    target: "Individu / Pelajar (SMA/SMK/sederajat), Mahasiswa & Umum Nasional",
    targetShort: "Pelajar, Mahasiswa & Umum",
    icon: "assets/icons/lomba-voiceover.png",
    description: "Kompetisi seni olah vokal, intonasi, dan ekspresi narasi suara bernuansa Nusantara yang komunikatif, hidup, dan memikat pendengar.",
    regLink: "https://staner.id/DaftarLarasSuaraPringPen",
    guidebookLink: "https://drive.google.com/drive/folders/1nZd2cgigKeWug6SL9DL5yjgUzpgMYEH4?usp=sharing",
    chips: ["Durasi: 2 – 4 mnt", "Free Creation", "Min. 720p HD"],
    subthemes: [
      "Ketika Nusantara Bercerita",
      "Tapak Pusaka Nusantara",
      "Swara Tanah Pusaka"
    ],
    techRules: [
      "Durasi rekaman: 2 – 4 menit.",
      "Konsep: Free Creation (peserta bebas menentukan ide naskah & visual pendukung).",
      "Format video: MP4 Landscape, minimal 720p HD, maksimal 500 MB."
    ],
    contactPersons: [
      { name: "Tyas", phone: "0812-7535-3130", waNumber: "6281275353130" },
      { name: "Bionka", phone: "0852-6754-6135", waNumber: "6285267546135" }
    ]
  },
  {
    id: "infografis",
    title: "Infografis",
    subName: "Rupa Aksara",
    badge: "Desain Visual",
    target: "Individu / Pelajar (SMA/SMK/sederajat) Nasional",
    targetShort: "Khusus Pelajar SMA/SMK",
    icon: "assets/icons/lomba-infografis.png",
    description: "Karya desain visual informatif dan kreatif yang mengemas pesan, kekayaan nilai budaya, serta wawasan Nusantara secara estetis.",
    regLink: "https://staner.id/DaftarRupaAksaraPringPen",
    guidebookLink: "https://drive.google.com/drive/folders/1M_kgSUdcwcw9NYdmjsks8SR6qlBbT-xm?usp=sharing",
    chips: ["Rasio 3:4 Portrait", "1080 × 1350 px", "+ PDF Orisinalitas"],
    subthemes: [
      "Pelestarian Budaya di Era Digital",
      "Budaya Lokal sebagai Identitas Bangsa",
      "Ancaman dan Tantangan Pelestarian Budaya Nusantara"
    ],
    techRules: [
      "Rasio desain: 3:4 Portrait, resolusi 1080 × 1350 px.",
      "Format berkas: File gambar (JPEG/JPG/PNG maksimal 100 MB).",
      "Dokumen pendukung: Surat Pernyataan Orisinalitas dalam format PDF."
    ],
    contactPersons: [
      { name: "Zahira", phone: "0821-8466-8221", waNumber: "6282184668221" },
      { name: "Devy", phone: "0822-8212-2828", waNumber: "6282282122828" }
    ]
  },
  {
    id: "tari-tradisional",
    title: "Tari Tradisional",
    subName: "Karsa Tari",
    badge: "Seni Tari",
    target: "Kelompok / Beregu (3 – 7 orang), Mahasiswa (D3/D4/sederajat) Nasional",
    targetShort: "Beregu (3–7 Org) Mahasiswa",
    icon: "assets/icons/lomba-tari.png",
    description: "Kompetisi seni gerak tari tradisional maupun kreasi daerah yang mengekspresikan keanggunan dan kekayaan budaya Nusantara.",
    regLink: "https://staner.id/DaftarKarsaTariPringPen",
    guidebookLink: "https://drive.google.com/drive/folders/1sSlqdMsbAL390qxcGs9r5H7MBUWdya2G?usp=sharing",
    chips: ["Beregu 3 – 7 Orang", "Single Take", "Trophy + Uang Pembinaan"],
    subthemes: [
      "Pendar Renjana, Nyala di Batas Cakrawala",
      "Tari Tradisional Ragam Pakem Nusantara",
      "Tari Kreasi Baru Bernuansa Nusantara"
    ],
    techRules: [
      "Materi: Tari tradisional ragam pakem atau tari kreasi baru Nusantara (Pendar Renjana, Nyala di Batas Cakrawala).",
      "Durasi penampilan: Menyesuaikan durasi musik pengiring tari orisinal.",
      "Format: Video MP4 Landscape, min. 720p HD, maks. 500 MB, Single Take (memperlihatkan seluruh penari & pola lantai secara utuh).",
    ],
    contactPersons: [
      { name: "Ilma", phone: "0821-4411-2193", waNumber: "6282144112193" },
      { name: "Naomi", phone: "0813-7396-1916", waNumber: "6281373961916" }
    ]
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
      <div class="category-header-wrap">
        <h3 class="category-name">${cat.title}</h3>
        <span class="category-subname">${cat.subName}</span>
      </div>
      <p class="category-desc">${cat.description}</p>
      <div class="category-actions">
        <a href="${cat.regLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" aria-label="Daftar Lomba ${cat.title}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7.5" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          Daftar
        </a>
        <button type="button" class="btn btn-outline btn-sm open-comp-modal-btn" data-cat-id="${cat.id}" aria-label="Lihat Ketentuan Teknis Lomba ${cat.title}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Ketentuan Teknis
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function initCompModal() {
  const modal = document.getElementById('comp-detail-modal');
  const closeBtn = document.getElementById('comp-modal-close-btn');
  if (!modal) return;

  const modalTitle = document.getElementById('comp-modal-title');
  const modalTarget = document.getElementById('comp-modal-target');
  const subthemesList = document.getElementById('comp-modal-subthemes');
  const rulesList = document.getElementById('comp-modal-rules');
  const contactsContainer = document.getElementById('comp-modal-contacts');
  const regBtn = document.getElementById('comp-modal-reg-btn');
  const guideBtn = document.getElementById('comp-modal-guide-btn');

  function openCategoryModal(catId) {
    const cat = categoriesData.find(c => c.id === catId);
    if (!cat) return;

    if (modalTitle) modalTitle.textContent = `${cat.title} (${cat.subName})`;
    if (modalTarget) {
      modalTarget.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <span><strong>Kategori Peserta:</strong> ${cat.target}</span>
      `;
    }

    if (subthemesList) {
      subthemesList.innerHTML = '';
      cat.subthemes.forEach(sub => {
        const li = document.createElement('li');
        li.textContent = sub;
        subthemesList.appendChild(li);
      });
    }

    if (rulesList) {
      rulesList.innerHTML = '';
      cat.techRules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
      });
    }

    if (contactsContainer) {
      contactsContainer.innerHTML = '';
      cat.contactPersons.forEach(cp => {
        const cpCard = document.createElement('div');
        cpCard.className = 'comp-cp-card';
        const waMsg = encodeURIComponent(`Halo Kak ${cp.name}, saya ingin bertanya mengenai Lomba ${cat.title} (${cat.subName}) PRINGPEN 2026`);
        cpCard.innerHTML = `
          <div class="comp-cp-info">
            <span class="comp-cp-name">${cp.name}</span>
            <span class="comp-cp-phone">${cp.phone}</span>
          </div>
          <a href="https://wa.me/${cp.waNumber}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="comp-cp-wa-btn" aria-label="Chat WhatsApp Kak ${cp.name}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            Chat WA
          </a>
        `;
        contactsContainer.appendChild(cpCard);
      });
    }

    if (regBtn) regBtn.href = cat.regLink;
    if (guideBtn) guideBtn.href = cat.guidebookLink;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-comp-modal-btn');
    if (btn) {
      const catId = btn.getAttribute('data-cat-id');
      openCategoryModal(catId);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initCountdown();
  initCategoryCards();
  initCompModal();
  initCarousel();
  initFaqAccordion();
  initSmoothScroll();
  initScrollAnimations();
  initBacksound();
  init3DTilt();
  initFooterCpModal();
  initCustomCursor();
});

function init3DTilt() {
  // 3D tilt hover dinonaktifkan sesuai permintaan pengguna untuk card yang lebih stabil & clean
  return;
}

function initFooterCpModal() {
  const openBtn = document.getElementById('open-footer-cp-modal-btn');
  const modal = document.getElementById('footer-cp-modal');
  const closeBtn = document.getElementById('footer-cp-modal-close-btn');
  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function initCustomCursor() {
  // Temporarily disabled / hidden by user request (code preserved)
  return;

  const cursor = document.querySelector('.custom-cursor');
  const trail = document.querySelector('.custom-cursor-trail');
  const svgMotif = document.querySelector('.ethnic-cursor-svg');
  if (!cursor || !trail || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -100;
  let mouseY = -100;
  let trailX = -100;
  let trailY = -100;
  let isVisible = false;

  let currentRotation = 0;
  let currentRotationSpeed = 0.4;
  let targetRotationSpeed = 0.4;
  let fastSpinTimeout;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
      trail.style.opacity = '1';
      trailX = mouseX;
      trailY = mouseY;
    }

    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    cursor.style.opacity = '0';
    trail.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    cursor.style.opacity = '1';
    trail.style.opacity = '1';
  });

  let isMouseDown = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Only left click
    isMouseDown = true;
    cursor.classList.add('active');
    trail.classList.add('active');
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button !== 0) return; // Only left click
    isMouseDown = false;
    cursor.classList.remove('active');
    trail.classList.remove('active');
    // Restore speed based on hover state
    targetRotationSpeed = trail.classList.contains('hover') ? 0.8 : 0.4;
  });

  function renderTrail() {
    trailX += (mouseX - trailX) * 0.16;
    trailY += (mouseY - trailY) * 0.16;
    trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;

    // Accelerate spin speed while mouse is held down
    if (isMouseDown) {
      targetRotationSpeed = Math.min(targetRotationSpeed + 0.8, 50); // accelerate up to max 50 deg/frame
    }

    // Smoothly interpolate rotation speed
    currentRotationSpeed += (targetRotationSpeed - currentRotationSpeed) * 0.05;
    currentRotation += currentRotationSpeed;
    if (svgMotif) {
      svgMotif.style.transform = `rotate(${currentRotation}deg)`;
    }

    requestAnimationFrame(renderTrail);
  }
  requestAnimationFrame(renderTrail);

  const interactiveSelectors = 'a, button, .btn, .category-card, .countdown-wrapper, .faq-question, .carousel-btn, .carousel-dot, .calendar-day, .audio-cd-btn, .nav-brand, input, select, textarea, [role="button"]';

  function bindHoverEffects() {
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = 'true';

      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        trail.classList.add('hover');
        
        // Spin fast for a brief moment, then slow down (only if not holding click)
        if (!isMouseDown) {
          targetRotationSpeed = 15;
          clearTimeout(fastSpinTimeout);
          fastSpinTimeout = setTimeout(() => {
            if (!isMouseDown) targetRotationSpeed = 0.8;
          }, 350);
        }
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        trail.classList.remove('hover');
        
        clearTimeout(fastSpinTimeout);
        if (!isMouseDown) {
          targetRotationSpeed = 0.4;
        }
      });
    });
  }

  bindHoverEffects();

  const observer = new MutationObserver(() => {
    bindHoverEffects();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
