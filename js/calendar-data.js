/**
 * PRINGPEN 2026 - Data Kalender & Agenda
 * Tema: "Lentera Nusa" (Sabdanusa x Teater Alir PKN STAN)
 * 
 * Warna Agenda Kontras & Mencolok:
 * - Pendaftaran: Cyan / Turquoise (#00D2D3)
 * - Pengumpulan & Penilaian: Bright Gold Yellow (#FACC15)
 * - Technical Meeting 1: Vibrant Crimson Red (#EF4444)
 * - Technical Meeting 2: Electric Purple (#A855F7)
 * - Acara Puncak Lentera Nusa: Fiery Amber Orange (#FF6B00)
 */

export const calendarEvents = [
  {
    id: "pendaftaran-lomba",
    title: "Pendaftaran Peserta Lomba",
    startDate: "2026-08-17",
    endDate: "2026-11-30",
    category: "Pendaftaran",
    color: "#00D2D3",
    badgeColor: "rgba(0, 210, 211, 0.15)",
    description: "Pendaftaran resmi seluruh cabang perlombaan seni & budaya PRINGPEN 2026 dibuka secara daring.",
    details: [
      "Terbuka untuk mahasiswa PKN STAN dan umum sesuai ketentuan kategori lomba.",
      "Akses formulir pendaftaran dan unduh Panduan (Handbook) di section Kategori Lomba.",
      "Pastikan melengkapi data identitas dan persyaratan sebelum batas akhir penutupan (30 November 2026)."
    ]
  },
  {
    id: "pengumpulan-karya",
    title: "Pengumpulan & Penilaian Karya",
    startDate: "2026-08-17",
    endDate: "2026-12-10",
    category: "Kompetisi & Kurasi",
    color: "#FACC15",
    badgeColor: "rgba(250, 204, 21, 0.15)",
    description: "Periode submit karya digital/rekaman lomba dan proses kurasi bertahap oleh dewan juri ahli.",
    details: [
      "Pengumpulan berkas karya video/naskah melalui portal submission yang disediakan panitia.",
      "Penilaian independen dan objektif oleh praktisi seni profesional serta akademisi budaya.",
      "Pengumuman finalis dan karya terbaik menjelang malam penganugerahan."
    ]
  },
  {
    id: "tm-1",
    title: "Technical Meeting (TM) 1",
    date: "2026-09-12",
    category: "Briefing Teknis",
    color: "#EF4444",
    badgeColor: "rgba(239, 68, 68, 0.15)",
    tag: "TM 1",
    description: "Sesi pengarahan teknis, sosialisasi tata tertib lomba, dan sesi tanya jawab langsung bersama panitia.",
    details: [
      "Pelaksanaan: Sabtu, 12 September 2026 (09.00 WIB - Selesai).",
      "Format: Hybrid (Daring via Zoom Meeting & Luring di Kampus PKN STAN).",
      "Wajib dihadiri oleh minimal 1 perwakilan resmi dari tiap tim peserta lomba."
    ]
  },
  {
    id: "tm-2",
    title: "Technical Meeting (TM) 2",
    date: "2026-10-17",
    category: "Briefing Teknis",
    color: "#A855F7",
    badgeColor: "rgba(168, 85, 247, 0.15)",
    tag: "TM 2",
    description: "Pengarahan teknis lanjutan bagi peserta pendaftaran gelombang kedua dan update teknis submission.",
    details: [
      "Pelaksanaan: Sabtu, 17 Oktober 2026 (09.00 WIB - Selesai).",
      "Membahas detail teknis pengunggahan karya dan konfirmasi final data peserta.",
      "Sesi simulasi singkat penilaian dan tata cara banding teknis."
    ]
  },
  {
    id: "acara-puncak",
    title: "Acara Puncak: Lentera Nusa",
    date: "2026-12-12",
    category: "Pentas Akbar",
    color: "#FF6B00",
    badgeColor: "rgba(255, 107, 0, 0.2)",
    tag: "PUNCAK",
    description: "Malam puncak penganugerahan pemenang lomba serta pagelaran megah kolaborasi Sabdanusa & Teater Alir bertema Lentera Nusa.",
    details: [
      "Pementasan teater kolosal kolaborasi Teater Alir & tarian tradisi Sabdanusa.",
      "Awarding piala & apresiasi juara lomba seni tingkat nasional.",
      "Lokasi: Gedung Auditorium Utama PKN STAN, Bintaro Jaya (Sabtu, 12 Desember 2026)."
    ]
  }
];

export const milestoneDates = {
  "2026-08-17": {
    eventId: "pendaftaran-lomba",
    tag: "BUKA",
    label: "Buka Pendaftaran",
    color: "#00D2D3",
    bg: "rgba(0, 210, 211, 0.18)"
  },
  "2026-09-12": {
    eventId: "tm-1",
    tag: "TM 1",
    label: "Technical Meeting 1",
    color: "#EF4444",
    bg: "rgba(239, 68, 68, 0.22)"
  },
  "2026-10-17": {
    eventId: "tm-2",
    tag: "TM 2",
    label: "Technical Meeting 2",
    color: "#A855F7",
    bg: "rgba(168, 85, 247, 0.22)"
  },
  "2026-11-30": {
    eventId: "pendaftaran-lomba",
    tag: "TUTUP",
    label: "Tutup Pendaftaran",
    color: "#EF4444",
    bg: "rgba(239, 68, 68, 0.22)"
  },
  "2026-12-10": {
    eventId: "pengumpulan-karya",
    tag: "SUBMIT",
    label: "Batas Pengumpulan",
    color: "#FACC15",
    bg: "rgba(250, 204, 21, 0.22)"
  },
  "2026-12-12": {
    eventId: "acara-puncak",
    tag: "PUNCAK",
    label: "Malam Puncak",
    color: "#FF6B00",
    bg: "rgba(255, 107, 0, 0.25)"
  }
};
