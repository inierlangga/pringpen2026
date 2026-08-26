# PROMPT UNTUK ANTIGRAVITY — Website "Pringgandana x PENTUNGAN (PRINGPEN) 2026"

Gunakan seluruh isi di bawah ini sebagai satu prompt saat memulai sesi Antigravity (misalnya ditempel sebagai instruksi awal / `ag.md`).

---

## 1. KONTEKS PROYEK

Kamu akan membangun website resmi untuk **Pringgandana x Pentas Tunggal Gabungan (PENTUNGAN) 2026** — program kerja kolaborasi antara **Sabdanusa** dan **Teater Alir** di PKN STAN. Website ini merayakan seni dan budaya, menjadi wadah pendaftaran lomba, informasi jadwal, dokumentasi, dan sponsor untuk acara puncak.

- **Tema acara**: "Lentera Nusa"
- **Target pengguna**: mahasiswa PKN STAN dan masyarakat umum (peserta lomba, penonton, sponsor)
- **Nada visual**: elegan, budaya Nusantara modern, hangat (lentera), malam yang syahdu

## 2. TECH STACK (WAJIB DIIKUTI)

- **Stack Modern Vanilla**: HTML5 + CSS3 (custom properties/variables) + Vanilla JavaScript (ES6+, modular)
- **Tanpa framework** (tidak pakai React/Vue/Tailwind compiler dsb.) kecuali diminta lain
- Struktur file yang direkomendasikan:
```
/
├── index.html
├── /assets
│   ├── /icons        (sudah disiapkan, gunakan yang ada — jangan generate ulang)
│   ├── /images
│   └── /fonts (jika self-hosted; boleh juga via Google Fonts)
├── /css
│   ├── variables.css   (design tokens)
│   ├── base.css
│   ├── components.css
│   └── sections.css
└── /js
    ├── main.js
    ├── preloader.js
    ├── navbar.js
    ├── countdown.js
    ├── calendar.js
    ├── carousel.js
    └── sponsor-tilt.js
```
- Kode harus semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), accessible (ARIA label pada elemen interaktif, alt text pada gambar), dan responsif mobile-first.
- Optimalkan performa: lazy-load gambar/carousel, hindari layout shift, animasi pakai CSS transform/opacity (bukan properti yang trigger reflow berat).

## 3. DESIGN SYSTEM

**Font (via Google Fonts, jangan self-host):**
| Peran | Font |
|---|---|
| Display / Judul | Cinzel Decorative |
| Body / UI | Open Sans |

Tambahkan di `<head>` pada `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
```
Lalu daftarkan sebagai CSS variable agar konsisten di semua file CSS:
```css
:root {
  --font-display: 'Cinzel Decorative', serif;
  --font-body: 'Open Sans', sans-serif;
}
```

**Palet Warna (jadikan CSS variables):**
```css
:root {
  --color-primary: #102A43;   /* Biru Malam - utama, background gelap/navbar/footer */
  --color-accent: #F9A826;    /* Kuning Lentera - CTA, highlight, aksen */
  --color-secondary: #8B4513; /* Cokelat Nusantara - aksen sekunder, border, ornamen */
}
```
Gunakan Biru Malam sebagai dasar suasana "malam", Kuning Lentera untuk elemen yang harus menyala/menarik perhatian (CTA, badge, countdown), dan Cokelat Nusantara untuk elemen dekoratif bernuansa budaya (garis, ornamen, ikon).

**Ikon**: gunakan file dari folder `/assets/icons` yang sudah disediakan — jangan membuat ikon baru dari nol kecuali folder tersebut belum berisi ikon yang relevan.

## 4. SITEMAP / STRUKTUR HALAMAN

```
0. Preloader (Split Curtain + Bouncing Logo)
1. Sticky Navbar (Glassmorphism)
2. Hero Section (Countdown + CTA)
3. Kategori / Fitur Lomba (Grid 4 Kolom)
4. Kalender Interaktif + Agenda
5. Galeri Dokumentasi (Carousel)
6. Sponsor Showcase (Tiered Grid + 3D Tilt)
7. Mega Footer (4 Kolom)
```

Bangun section demi section sesuai urutan di atas. Setelah selesai satu section, review sebelum lanjut ke section berikutnya.

---

## 5. RINCIAN TIAP KOMPONEN

### 0️⃣ Preloader (`#preloader`)
- Panel tirai kiri (`.left-panel`) dan kanan (`.right-panel`) bergerak membuka ke luar (efek *split curtain*) saat halaman selesai dimuat.
- Logo brand di tengah dengan animasi memantul (*bounce*) + teks berdenyut (*pulse*).
- Durasi total ±0.8 detik, lalu elemen di-`display: none` (jangan hanya `opacity: 0` agar tidak mengganggu interaksi setelahnya).
- Cegah *layout shift*: body harus `overflow: hidden` selama preloader aktif.

### 1️⃣ Sticky Navbar (`#navbar`)
- Efek glassmorphism: `backdrop-filter: blur()` + background semi-transparan, aktif terutama saat halaman di-scroll (tambahkan class `.scrolled` via JS scroll listener, gunakan `IntersectionObserver` atau debounce scroll event untuk performa).
- Kiri: logo + nama brand.
- Menu: `Beranda`, `Kalender`, `FAQ`, `Ticketing Acara Puncak`.
- CTA pill ter-highlight (warna Kuning Lentera): teks **"Kategori Lomba"**, mengarah ke anchor `#kategori-lomba`.
- Hamburger menu untuk mobile: overlay full-screen dengan transisi smooth (slide/fade), tutup otomatis saat salah satu link diklik.

### 2️⃣ Hero Section (`#hero`)
- Headline besar (font Cinzel Decorative).
- Tagline & deskripsi singkat (2–3 kalimat) tentang tema "Lentera Nusa".
- **Live countdown** 4 kotak (Hari : Jam : Menit : Detik) — target waktu **Sabtu, 12 Desember 2026** (Acara Puncak). Update tiap detik dengan `setInterval`, dan kunci otomatis (tampilkan status "Acara telah dimulai" atau serupa) saat waktu habis.
- Tombol CTA utama (pill oranye): **"Daftar Lomba"** → anchor `#kategori-lomba`.
- Tombol CTA kedua: **"Ticketing Acara Puncak"** → beri anchor/link placeholder (misalnya `#` atau `ticketing.html`) karena halaman ini akan dibuat menyusul; beri komentar TODO di kode.

### 3️⃣ Kategori Lomba (`#kategori-lomba`)
- Grid 4 kolom responsif (menyesuaikan ke 2 kolom di tablet, 1 kolom di mobile).
- Tiap kartu berisi: ikon SVG (dari `/assets/icons`), judul kategori, deskripsi singkat, dan action bar dengan 2 tombol: **"Daftar"** (link placeholder) dan link eksternal **"Handbook/Guidebook"** (link placeholder, buka di tab baru `target="_blank"`).
- Beri efek hover interaktif (elevasi/scale halus) pada kartu.
- Karena kategori lomba spesifik belum diberikan, buat struktur data kartu dalam bentuk array/objek JS agar mudah diisi kontennya nanti (contoh 4 placeholder kategori).

### 4️⃣ Kalender Interaktif & Agenda (`#jadwal`)
- **Panel kiri**: kalender bulanan dengan navigasi `<` `>` untuk ganti bulan, tanggal kegiatan ditandai warna (Kuning Lentera).
- **Panel kanan**: daftar agenda kronologis.
- Klik tanggal bertanda → buka modal (`#event-modal`) berisi detail acara pada tanggal tersebut.

**Data jadwal (masukkan sebagai data terstruktur di JS, tandai tanggal-tanggal berikut di kalender):**
```js
const agenda = [
  {
    title: "Pendaftaran Peserta Lomba",
    start: "2026-08-17",
    end: "2026-11-30"
  },
  {
    title: "Pengumpulan Karya Peserta Lomba & Penilaian Karya oleh Juri",
    start: "2026-08-17",
    end: "2026-12-10"
  },
  {
    title: "Technical Meeting",
    dates: ["2026-09-12", "2026-10-17"]
  },
  {
    title: "Acara Puncak (Awarding Pemenang Lomba, Pementasan Sabdanusa & Teater Alir)",
    date: "2026-12-12"
  }
];
```
- Kalender default terbuka di bulan Agustus 2026 (atau bulan saat ini bila lebih relevan), dengan navigasi bisa maju/mundur ke bulan-bulan yang relevan (Agustus–Desember 2026).
- Untuk rentang tanggal (pendaftaran & pengumpulan karya), beri penanda visual berbeda (misal garis/bar) dibanding event satu-hari (technical meeting, acara puncak).

### 5️⃣ Galeri Dokumentasi (`#dokumentasi`)
- Bangun **wadah/struktur carousel saja** — foto akan diisi menyusul, jadi gunakan placeholder image (`<img src="assets/images/placeholder.jpg">` atau div abu-abu dengan ikon gambar) yang mudah diganti nanti.
- Infinite sliding track dengan tombol Prev/Next dan dot indicators.
- Auto-play dengan jeda wajar (misal 4–5 detik), pause saat hover/interaksi.
- Dukung touch-swipe di mobile.

### 6️⃣ Sponsor Showcase (`#sponsor`)
- Bangun **wadah/struktur saja** — logo sponsor akan diisi menyusul, gunakan placeholder (kotak dengan label "Logo Sponsor").
- **Tier Utama**: logo besar dengan efek 3D tilt (mengikuti pergerakan mouse, pakai `mousemove` + `transform: perspective() rotateX() rotateY()`) dan efek glow di border/background saat hover.
- **Tier Pendukung**: logo lebih kecil, ditata grid rapi.
- Pastikan struktur data sponsor mudah di-extend (array of objects: `{ name, logoUrl, tier }`).

### 7️⃣ Mega Footer (`footer.footer`)
- **Kolom 1**: logo + tagline acara.
- **Kolom 2**: kontak WhatsApp click-to-chat (`https://wa.me/62xxxxxxxxxx` — beri placeholder nomor).
- **Kolom 3**: link sosial media (Instagram, TikTok, YouTube) — placeholder link, gunakan ikon dari `/assets/icons`.
- **Kolom 4**: embed Google Maps interaktif (iframe) — placeholder lokasi PKN STAN (boleh isi embed default, beri komentar agar mudah diganti).
- **Bottom bar**: copyright text, contoh: `© 2026 Pringgandana x PENTUNGAN — Sabdanusa & Teater Alir`.

---

## 6. CHECKLIST KUALITAS SEBELUM SELESAI

- [ ] Semua warna & font memakai CSS variables sesuai design system di atas, konsisten di semua section.
- [ ] Website fully responsive: uji breakpoint mobile (≤480px), tablet (≤768px), desktop.
- [ ] Semua anchor link (`#kategori-lomba`, `#jadwal`, `#dokumentasi`, `#sponsor`) berfungsi dengan smooth scroll.
- [ ] Tidak ada console error di browser.
- [ ] Elemen interaktif (tombol, kartu, modal, hamburger) accessible via keyboard dan punya `aria-label` yang sesuai.
- [ ] Placeholder untuk foto dokumentasi, logo sponsor, dan link "Ticketing Acara Puncak" diberi komentar `<!-- TODO -->` agar mudah ditemukan dan diisi nanti.
- [ ] Countdown berjalan akurat dan berhenti dengan baik saat waktu target terlewati.
- [ ] Kode terorganisir per file sesuai struktur folder di atas, bukan satu file raksasa.

---

**Instruksi tambahan untuk Antigravity**: bangun section demi section sesuai urutan sitemap di atas, tampilkan progres setelah tiap section selesai, dan tanyakan konfirmasi sebelum melakukan perubahan besar pada struktur yang sudah dibangun.
