/**
 * PRINGPEN 2026 - Interactive Calendar & Agenda Module
 * Features:
 * - Milestone High-Contrast Date Badges & Tags (Saran 2)
 * - Dynamic Active Period Banner (clean monthly context)
 * - Clean non-milestone date cells (no repetitive confusing dots)
 * - Two-Way Highlighting & Synchronization (Saran 3)
 *   * Month change highlights active agendas in right panel
 *   * Clicking agenda on right navigates to its month & pulses target date cell on left
 *   * Clicking date on left highlights corresponding agenda in right list
 * - Multi-Event & Single-Event Popup Modal
 */

import { calendarEvents, milestoneDates } from './calendar-data.js';

export function initCalendar() {
  const monthTitleEl = document.getElementById('calendar-month-title');
  const daysGridEl = document.getElementById('calendar-days-grid');
  const periodStatusEl = document.getElementById('calendar-period-status');
  const prevBtn = document.getElementById('cal-prev-btn');
  const nextBtn = document.getElementById('cal-next-btn');
  const agendaListEl = document.getElementById('agenda-list-container');
  const modal = document.getElementById('event-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!daysGridEl || !monthTitleEl) return;

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const shortMonthNames = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agt", "Sep", "Okt", "Nov", "Des"
  ];

  // Default focus on September 2026
  let currentYear = 2026;
  let currentMonth = 8; // September (0-indexed)

  const realToday = new Date();

  function formatDateStr(year, month, day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const day = parseInt(parts[2], 10);
    const monthIdx = parseInt(parts[1], 10) - 1;
    const year = parts[0];
    return `${day} ${monthNames[monthIdx]} ${year}`;
  }

  function formatShortDate(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const day = parseInt(parts[2], 10);
    const monthIdx = parseInt(parts[1], 10) - 1;
    return `${day} ${shortMonthNames[monthIdx]}`;
  }

  function getEventsForDate(dateStr) {
    return calendarEvents.filter((event) => {
      if (event.date) {
        return event.date === dateStr;
      }
      if (event.startDate && event.endDate) {
        return dateStr >= event.startDate && dateStr <= event.endDate;
      }
      return false;
    });
  }

  function updatePeriodStatus(year, month) {
    if (!periodStatusEl) return;
    const m = month + 1;
    if (year === 2026) {
      if (m === 9) {
        periodStatusEl.innerHTML = `<span>📌</span> <span><strong>September:</strong> Buka Pendaftaran & Submit Karya (2 Sep) • TM 1 (12 / 19 Sep)</span>`;
      } else if (m === 10) {
        periodStatusEl.innerHTML = `<span>📌</span> <span><strong>Oktober:</strong> Technical Meeting 2 (17 Okt) • Pendaftaran & Submisi Berjalan</span>`;
      } else if (m === 11) {
        periodStatusEl.innerHTML = `<span>📌</span> <span><strong>November:</strong> Periode Pendaftaran & Pengumpulan Karya Berjalan</span>`;
      } else if (m === 12) {
        periodStatusEl.innerHTML = `<span>📌</span> <span><strong>Desember:</strong> Batas Akhir Submit (1 Des) & Acara Puncak (13 Des)</span>`;
      } else {
        periodStatusEl.innerHTML = `<span>📌</span> <span>PRINGPEN 2026 — Sabdanusa ✕ Teater Alir PKN STAN</span>`;
      }
    }
  }

  // 1. Render Monthly Calendar Grid (Milestone-focused, Saran 2)
  function renderCalendar(year, month) {
    monthTitleEl.textContent = `${monthNames[month]} ${year}`;
    daysGridEl.innerHTML = '';

    updatePeriodStatus(year, month);

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Leading padding cells
    for (let i = firstDayIndex; i > 0; i--) {
      const prevDay = prevMonthDays - i + 1;
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell other-month';
      cell.textContent = prevDay;
      daysGridEl.appendChild(cell);
    }

    // Days of current month
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = formatDateStr(year, month, day);
      const milestone = milestoneDates[dateStr];
      const matchingEvents = getEventsForDate(dateStr);

      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell';
      cell.setAttribute('data-date', dateStr);
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('role', 'button');

      // Real-world TODAY
      const isToday = (
        realToday.getFullYear() === year &&
        realToday.getMonth() === month &&
        realToday.getDate() === day
      );

      if (isToday) {
        cell.classList.add('is-today');
        cell.title = "Hari Ini";
      }

      // Day Number
      const dayNum = document.createElement('span');
      dayNum.className = 'day-number';
      dayNum.textContent = day;
      cell.appendChild(dayNum);

      // Milestone Tag rendering (Saran 2)
      if (milestone) {
        cell.classList.add('is-milestone');
        cell.style.borderColor = milestone.color;
        cell.style.backgroundColor = milestone.bg;

        const badge = document.createElement('span');
        badge.className = 'milestone-badge';
        badge.style.backgroundColor = milestone.color;
        badge.style.color = (milestone.color === '#FACC15' || milestone.color === '#00D2D3') ? '#07131F' : '#FFFFFF';
        badge.textContent = milestone.tag;
        cell.appendChild(badge);

        cell.setAttribute('aria-label', `Tanggal ${day} ${monthNames[month]} ${year}: ${milestone.label}`);
        cell.title = `${milestone.label} (${milestone.tag})`;
      } else if (matchingEvents.length > 0) {
        cell.classList.add('in-range-cell');
        cell.setAttribute('aria-label', `Tanggal ${day} ${monthNames[month]} ${year}`);
      } else {
        cell.setAttribute('aria-label', `Tanggal ${day} ${monthNames[month]} ${year}`);
      }

      // Thin Range Event Stripe Lines (Canon Cup Style, Subtle & Sleek)
      const rangeEvents = matchingEvents.filter(e => e.startDate && e.endDate);
      if (rangeEvents.length > 0) {
        const stripesWrap = document.createElement('div');
        stripesWrap.className = 'event-stripes-wrap';
        rangeEvents.forEach((ev) => {
          const line = document.createElement('div');
          line.className = 'event-stripe-line';
          line.style.backgroundColor = ev.color;
          line.title = ev.title;
          stripesWrap.appendChild(line);
        });
        cell.appendChild(stripesWrap);
      }

      // Click Interaction (Two-way sync: Saran 3)
      cell.addEventListener('click', () => {
        if (matchingEvents.length > 0) {
          highlightAgendaCard(matchingEvents[0].id);
          openDateEventsModal(matchingEvents, dateStr);
        }
      });

      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (matchingEvents.length > 0) {
            highlightAgendaCard(matchingEvents[0].id);
            openDateEventsModal(matchingEvents, dateStr);
          }
        }
      });

      daysGridEl.appendChild(cell);
    }

    // Trailing padding cells
    const totalRendered = firstDayIndex + totalDays;
    const trailingCells = (7 - (totalRendered % 7)) % 7;
    for (let j = 1; j <= trailingCells; j++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell other-month';
      cell.textContent = j;
      daysGridEl.appendChild(cell);
    }

    // Synchronize Right Agenda Panel state (Saran 3)
    updateAgendaMonthlyHighlight(year, month);
  }

  // 2. Render Agenda List (Right Panel)
  function renderAgendaList() {
    if (!agendaListEl) return;
    agendaListEl.innerHTML = '';

    const sortedEvents = [...calendarEvents].sort((a, b) => {
      const dateA = a.startDate || a.date;
      const dateB = b.startDate || b.date;
      return dateA.localeCompare(dateB);
    });

    sortedEvents.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'agenda-compact-card';
      card.setAttribute('data-event-id', item.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Lihat detail agenda: ${item.title}`);

      const eventColor = item.color || 'var(--color-accent)';

      let dateString = "";
      if (item.startDate && item.endDate) {
        dateString = `${formatShortDate(item.startDate)} – ${formatShortDate(item.endDate)}`;
      } else if (item.date) {
        dateString = formatShortDate(item.date);
      }

      card.innerHTML = `
        <div class="agenda-left-bar" style="background-color: ${eventColor};"></div>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <span class="agenda-date-text">${dateString}</span>
        </div>
        <div class="agenda-title-wrap">
          <div style="display: flex; align-items: center; gap: 0.35rem; justify-content: flex-end;">
            <span class="agenda-title-text">${item.title}</span>
          </div>
          <div class="agenda-title-underline" style="background-color: ${eventColor};"></div>
        </div>
      `;

      // Click on right agenda card -> Synchronizes with left calendar (Saran 3)
      card.addEventListener('click', () => {
        focusEventOnCalendar(item);
        openSingleEventModal(item);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          focusEventOnCalendar(item);
          openSingleEventModal(item);
        }
      });

      agendaListEl.appendChild(card);
    });

    updateAgendaMonthlyHighlight(currentYear, currentMonth);
  }

  // Two-Way Sync Functionality (Saran 3)
  function updateAgendaMonthlyHighlight(year, month) {
    if (!agendaListEl) return;
    const cards = agendaListEl.querySelectorAll('.agenda-compact-card');
    const monthStart = formatDateStr(year, month, 1);
    const monthEnd = formatDateStr(year, month, 31);

    cards.forEach((card) => {
      const eventId = card.getAttribute('data-event-id');
      const event = calendarEvents.find(e => e.id === eventId);
      if (!event) return;

      let isActiveInMonth = false;
      if (event.date) {
        const evDate = new Date(event.date);
        isActiveInMonth = (evDate.getFullYear() === year && evDate.getMonth() === month);
      } else if (event.startDate && event.endDate) {
        isActiveInMonth = !(event.endDate < monthStart || event.startDate > monthEnd);
      }

      if (isActiveInMonth) {
        card.classList.add('active-in-month');
      } else {
        card.classList.remove('active-in-month');
      }
    });
  }

  function highlightAgendaCard(eventId) {
    if (!agendaListEl) return;
    const cards = agendaListEl.querySelectorAll('.agenda-compact-card');
    cards.forEach(c => c.classList.remove('card-focused'));

    const targetCard = agendaListEl.querySelector(`[data-event-id="${eventId}"]`);
    if (targetCard) {
      targetCard.classList.add('card-focused');
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => {
        targetCard.classList.remove('card-focused');
      }, 2500);
    }
  }

  function focusEventOnCalendar(item) {
    const targetDateStr = item.date || item.startDate;
    if (!targetDateStr) return;

    const parts = targetDateStr.split('-');
    const evYear = parseInt(parts[0], 10);
    const evMonth = parseInt(parts[1], 10) - 1;

    // Switch month if needed
    if (evYear !== currentYear || evMonth !== currentMonth) {
      currentYear = evYear;
      currentMonth = evMonth;
      renderCalendar(currentYear, currentMonth);
    }

    // Pulse highlight on the target date cell
    setTimeout(() => {
      const targetCell = daysGridEl.querySelector(`[data-date="${targetDateStr}"]`);
      if (targetCell) {
        targetCell.classList.add('focused-pulse');
        setTimeout(() => targetCell.classList.remove('focused-pulse'), 2500);
      }
    }, 100);
  }

  // 3. Popup Modal Handlers
  function openDateEventsModal(events, dateStr) {
    if (!modal || !events || events.length === 0) return;

    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date-text');
    const modalDesc = document.getElementById('modal-desc-text');
    const modalDetailsList = document.getElementById('modal-details-list');

    if (events.length === 1) {
      openSingleEventModal(events[0], dateStr);
      return;
    }

    if (modalBadge) modalBadge.textContent = `${events.length} Agenda`;
    if (modalTitle) modalTitle.textContent = `Agenda Kegiatan (${formatDisplayDate(dateStr)})`;
    if (modalDate) modalDate.textContent = formatDisplayDate(dateStr);
    if (modalDesc) modalDesc.textContent = `Rangkaian agenda pada tanggal ini:`;

    if (modalDetailsList) {
      modalDetailsList.innerHTML = '';
      events.forEach((ev) => {
        const itemContainer = document.createElement('li');
        itemContainer.style.marginBottom = '1rem';
        itemContainer.innerHTML = `
          <strong style="color: ${ev.color || 'var(--color-accent)'}; display: block; font-size: 0.95rem;">
            [${ev.category}] ${ev.title}
          </strong>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">${ev.description}</span>
        `;
        modalDetailsList.appendChild(itemContainer);
      });
    }

    showModal();
  }

  function openSingleEventModal(item) {
    if (!modal || !item) return;

    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date-text');
    const modalDesc = document.getElementById('modal-desc-text');
    const modalDetailsList = document.getElementById('modal-details-list');

    if (modalBadge) modalBadge.textContent = item.category;
    if (modalTitle) modalTitle.textContent = item.title;

    let dateRangeText = "";
    if (item.startDate && item.endDate) {
      dateRangeText = `${formatDisplayDate(item.startDate)} – ${formatDisplayDate(item.endDate)}`;
    } else if (item.date) {
      dateRangeText = formatDisplayDate(item.date);
    }
    if (modalDate) modalDate.textContent = dateRangeText;
    if (modalDesc) modalDesc.textContent = item.description;

    if (modalDetailsList) {
      modalDetailsList.innerHTML = '';
      if (Array.isArray(item.details)) {
        item.details.forEach((det) => {
          const li = document.createElement('li');
          li.textContent = det;
          modalDetailsList.appendChild(li);
        });
      }
    }

    showModal();
  }

  function showModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Navigation Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentYear, currentMonth);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentYear, currentMonth);
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Initial Renders
  renderCalendar(currentYear, currentMonth);
  renderAgendaList();
}
