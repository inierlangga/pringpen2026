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
    id: "pendaftaran-pengumpulan",
    title: "Pendaftaran & Pengumpulan Karya",
    startDate: "2026-09-02",
    endDate: "2026-12-01",
    category: "Pendaftaran & Submisi",
    color: "#00D2D3",
    badgeColor: "rgba(0, 210, 211, 0.15)",
    description: "Pendaftaran resmi seluruh cabang perlombaan seni & budaya PRINGPEN 2026 serta submisi pengumpulan karya dibuka secara daring.",
    details: [
      "Terbuka untuk pelajar, mahasiswa, dan umum nasional sesuai ketentuan masing-masing cabang lomba.",
      "Akses formulir pendaftaran dan unduh Panduan (Handbook) di section Kategori Lomba.",
      "Periode submit karya berlangsung bersamaan hingga batas akhir 1 Desember 2026."
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
    description: "Sesi pengarahan teknis, sosialisasi tata tertib lomba, dan sesi tanya jawab langsung bersama panitia (12 / 19 September 2026).",
    details: [
      "Pelaksanaan: 12 / 19 September 2026 (09.00 WIB - Selesai).",
      "Format: Daring (Zoom Meeting) / Hybrid di Kampus PKN STAN.",
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
    description: "Pengarahan teknis lanjutan bagi peserta pendaftaran gelombang kedua dan pemantapan teknis submission.",
    details: [
      "Pelaksanaan: Sabtu, 17 Oktober 2026 (09.00 WIB - Selesai).",
      "Membahas detail teknis pengunggahan karya dan konfirmasi final data peserta.",
      "Sesi simulasi singkat penilaian dan tata cara banding teknis."
    ]
  },
  {
    id: "acara-puncak",
    title: "Pengumuman Pemenang & Acara Puncak",
    date: "2026-12-13",
    category: "Pentas Akbar",
    color: "#FF6B00",
    badgeColor: "rgba(255, 107, 0, 0.2)",
    tag: "PUNCAK",
    description: "Malam puncak penganugerahan pemenang lomba serta pagelaran megah kolaborasi Sabdanusa & Teater Alir bertema Lentera Nusa.",
    details: [
      "Pementasan teater kolosal kolaborasi Teater Alir & tarian tradisi Sabdanusa.",
      "Awarding piala, trophy, apresiasi juara lomba seni tingkat nasional.",
      "Lokasi: Gedung G (Gedung Serbaguna) PKN STAN, Bintaro Jaya (Minggu, 13 Desember 2026)."
    ]
  }
];

export const milestoneDates = {
  "2026-09-02": {
    eventId: "pendaftaran-pengumpulan",
    tag: "BUKA",
    label: "Buka Pendaftaran & Submit Karya",
    color: "#00D2D3",
    bg: "rgba(0, 210, 211, 0.18)"
  },
  "2026-09-12": {
    eventId: "tm-1",
    tag: "TM 1",
    label: "Technical Meeting 1 (Opsi 1)",
    color: "#EF4444",
    bg: "rgba(239, 68, 68, 0.22)"
  },
  "2026-09-19": {
    eventId: "tm-1",
    tag: "TM 1",
    label: "Technical Meeting 1 (Opsi 2)",
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
  "2026-12-01": {
    eventId: "pendaftaran-pengumpulan",
    tag: "TUTUP",
    label: "Batas Akhir Pendaftaran & Submit",
    color: "#FACC15",
    bg: "rgba(250, 204, 21, 0.22)"
  },
  "2026-12-13": {
    eventId: "acara-puncak",
    tag: "PUNCAK",
    label: "Pengumuman & Acara Puncak",
    color: "#FF6B00",
    bg: "rgba(255, 107, 0, 0.25)"
  }
};
