# PRD: Website "Will You Be Mine?" — Pernyataan Perasaan Interaktif

| | |
|---|---|
| **Nama Proyek** | Confession Website (nama kerja: *Untukmu, [Nama Dia]*) |
| **Versi** | 1.0 |
| **Status** | Draft |
| **Pemilik Produk** | [Nama Kamu] |
| **Tanggal** | 12 Oktober 2026 |

---

## 1. Ringkasan

Website satu halaman (single-page) yang bersifat personal dan interaktif, dibuat untuk menyatakan perasaan kepada seseorang yang ingin dijadikan pacar. Alih-alih mengirim pesan teks biasa, pengirim menyampaikan perasaannya lewat pengalaman digital yang dirancang khusus: cerita singkat, alasan-alasan spesial, kenangan bersama, lalu pertanyaan utama di akhir.

Website ini adalah **sarana menyampaikan perasaan secara tulus dan kreatif**, bukan alat untuk menekan atau memanipulasi. Penerima harus selalu merasa bebas memberi jawaban apa pun.

## 2. Latar Belakang & Masalah

- Menyatakan perasaan secara langsung atau lewat chat sering terasa canggung, kurang berkesan, dan sulit mengungkapkan semuanya dengan runtut.
- Pengirim ingin menunjukkan usaha, ketulusan, dan perhatian yang personal.
- Penerima perlu ruang untuk merespons dengan nyaman, tanpa tekanan di depan orang lain.

## 3. Tujuan

### Tujuan Utama
1. Menyampaikan perasaan pengirim dengan cara yang berkesan, hangat, dan personal.
2. Memberi penerima pengalaman yang menyenangkan dan nyaman dari awal sampai akhir.
3. Memberi penerima cara yang mudah dan aman untuk menjawab, apa pun jawabannya.

### Bukan Tujuan (Non-Goals)
- Bukan platform multi-user atau produk komersial.
- Tidak ada sistem login atau akun.
- Tidak memaksa atau menjebak penerima agar menjawab "Ya".
- Tidak mengumpulkan data pribadi penerima selain jawaban yang ia berikan.

## 4. Pengguna

| Peran | Deskripsi | Kebutuhan |
|---|---|---|
| **Pengirim** (pemilik produk) | Orang yang membuat dan membagikan website | Mudah dikustomisasi, bisa tahu jawaban penerima, terlihat tulus dan rapi |
| **Penerima** | Wanita yang dituju | Pengalaman nyaman, tidak terasa menekan, bisa dibuka di HP, jawaban terasa dihargai |

**Perangkat utama penerima:** smartphone (mayoritas akan dibuka lewat link di WhatsApp/Instagram), sehingga desain **mobile-first**.

## 5. User Stories

**Penerima**
- Sebagai penerima, saya ingin membuka link dan langsung melihat tampilan yang menarik agar tertarik membaca sampai akhir.
- Sebagai penerima, saya ingin membaca pesan dari pengirim dengan tempo yang nyaman (bisa lanjut/kembali sendiri).
- Sebagai penerima, saya ingin melihat kenangan atau foto bersama agar terasa personal.
- Sebagai penerima, saya ingin menjawab dengan bebas, termasuk "Aku butuh waktu" atau "Maaf, belum bisa", tanpa merasa bersalah.

**Pengirim**
- Sebagai pengirim, saya ingin mengganti teks, foto, dan nama dengan mudah lewat satu file konfigurasi.
- Sebagai pengirim, saya ingin mendapat notifikasi saat penerima membuka website dan saat ia menjawab.
- Sebagai pengirim, saya ingin link yang tidak mudah ditebak agar privasi terjaga.

## 6. Alur Pengguna (User Flow)

```
Buka link
   │
   ▼
[1] Layar Pembuka  ──►  "Ada sesuatu yang ingin aku sampaikan..." (tombol: Mulai)
   │
   ▼
[2] Cerita / Timeline  ──►  Momen-momen bersama (scroll atau next)
   │
   ▼
[3] Alasan Spesial  ──►  3–5 hal yang pengirim kagumi darinya
   │
   ▼
[4] Galeri Kenangan  ──►  Foto / momen (opsional)
   │
   ▼
[5] Pertanyaan Utama  ──►  "Maukah kamu jadi pacarku?"
   │
   ├── [Mau 💗]               ──► Layar Perayaan
   ├── [Aku butuh waktu]      ──► Layar Pengertian
   └── [Maaf, belum bisa]     ──► Layar Penghargaan (graceful exit)
```

## 7. Kebutuhan Fungsional

### 7.1 Fitur Wajib (MVP)

| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| F-01 | Layar pembuka | Judul personal dengan nama penerima, animasi halus, tombol "Mulai" | P0 |
| F-02 | Bagian cerita | Pesan singkat berurutan (per kartu/slide) tentang perasaan pengirim | P0 |
| F-03 | Alasan spesial | Daftar 3–5 alasan dengan animasi muncul saat di-scroll | P0 |
| F-04 | Pertanyaan utama | Pertanyaan inti dengan tiga pilihan jawaban yang setara dan jelas | P0 |
| F-05 | Layar respons | Tampilan berbeda untuk tiap jawaban (perayaan / pengertian / penghargaan) | P0 |
| F-06 | Notifikasi jawaban | Pengirim menerima jawaban lewat email/Telegram/WhatsApp | P0 |
| F-07 | Konfigurasi konten | Semua teks, nama, dan aset diatur lewat satu file (`config.js` / `config.json`) | P0 |
| F-08 | Responsif | Tampil baik di layar 360px hingga desktop | P0 |

### 7.2 Fitur Tambahan (Nice to Have)

| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| F-09 | Galeri foto | Carousel atau grid foto kenangan | P1 |
| F-10 | Musik latar | Lagu pilihan, **tidak autoplay**, ada tombol play/pause | P1 |
| F-11 | Efek perayaan | Confetti / hati melayang saat menjawab "Mau" | P1 |
| F-12 | Timeline kenangan | Garis waktu perjalanan kenal sampai sekarang | P1 |
| F-13 | Tombol balas via WhatsApp | Deep link `wa.me` agar penerima bisa lanjut ngobrol langsung | P1 |
| F-14 | Surat penutup | Pesan panjang yang bisa dibuka lewat tombol "Baca suratku" | P2 |
| F-15 | Countdown / jadwal buka | Website baru bisa dibuka di tanggal/jam tertentu | P2 |
| F-16 | Mode gelap otomatis | Mengikuti pengaturan perangkat | P2 |

### 7.3 Aturan Penting Interaksi Jawaban

Ini adalah prinsip desain inti produk:

1. **Semua pilihan jawaban harus mudah diklik.** Dilarang membuat tombol "Tidak" yang kabur, mengecil, atau tidak bisa ditekan.
2. **Tidak ada dark pattern**: tanpa rasa bersalah, ancaman, atau teks yang menyudutkan.
3. **Jawaban bersifat final per sesi tetapi tidak dipublikasikan.** Hanya pengirim yang menerima hasilnya.
4. **Layar "Belum bisa" harus hangat dan menghargai**, misalnya: *"Terima kasih sudah jujur dan sudah membaca sampai akhir. Aku menghargai itu."*
5. Tidak ada auto-redirect atau pop-up yang mengganggu setelah menjawab.

## 8. Konten & Nada Bahasa

**Nada:** tulus, hangat, sedikit lucu, tidak berlebihan, tidak menggombal klise.

**Struktur konten yang perlu disiapkan pengirim:**

| Elemen | Contoh / Panduan |
|---|---|
| Nama panggilan penerima | "Rina" |
| Kalimat pembuka | "Hai Rina, ada yang ingin aku ceritakan..." |
| Cerita singkat (3–5 kartu) | Kapan pertama kenal, momen yang paling diingat, perubahan perasaan |
| Alasan spesial (3–5 poin) | Spesifik dan personal, bukan generik ("Caramu tertawa waktu...") |
| Foto (opsional, 3–8) | Foto yang ia nyaman untuk dilihat; hindari foto yang bisa membuatnya risih |
| Pertanyaan utama | "Rina, maukah kamu jadi pacarku?" |
| Teks respons (3 versi) | Perayaan, pengertian, penghargaan |

> **Tips:** Semakin spesifik detailnya, semakin terasa tulus. Hindari kata-kata yang menekan seperti "kamu harus" atau "jangan buat aku kecewa".

## 9. Desain & UX

### 9.1 Arah Visual
- **Mood:** romantis, lembut, modern, tidak norak.
- **Palet warna (saran):** rose/pink lembut (`#F4A6B7`), krem (`#FFF6F0`), merah marun aksen (`#8C2F39`), teks gelap hangat (`#3A2A2E`). Sesuaikan dengan selera dan kesukaan penerima.
- **Tipografi:** judul serif elegan (mis. *Playfair Display* atau *Cormorant Garamond*), isi sans-serif bersih (mis. *Poppins* atau *Inter*).
- **Animasi:** transisi halus (fade/slide), tidak berlebihan, tidak membuat loading berat.

### 9.2 Prinsip UX
- Mobile-first, tombol minimal 44×44 px.
- Satu ide per layar agar fokus dan tidak melelahkan.
- Indikator progres kecil (titik atau bar) agar penerima tahu masih ada kelanjutan.
- Tombol "Kembali" tersedia di setiap langkah.
- Hormati `prefers-reduced-motion`.
- Kontras teks memenuhi WCAG AA.

### 9.3 Struktur Halaman (Wireframe Teks)

```
┌──────────────────────────┐
│        ♡  (animasi)      │
│   Untukmu, [Nama]        │
│  "Ada yang ingin aku     │
│   sampaikan..."          │
│      [  Mulai  ]         │
└──────────────────────────┘

┌──────────────────────────┐
│  Pertanyaan Utama        │
│  "[Nama], maukah kamu    │
│   jadi pacarku?"         │
│  [ Mau 💗 ]              │
│  [ Aku butuh waktu ]     │
│  [ Maaf, belum bisa ]    │
└──────────────────────────┘
```

## 10. Kebutuhan Teknis

### 10.1 Rekomendasi Tech Stack

| Lapisan | Pilihan Sederhana | Pilihan Lanjutan |
|---|---|---|
| Frontend | HTML + CSS + Vanilla JS | React/Vite atau Astro |
| Animasi | CSS animations, `canvas-confetti` | GSAP / Framer Motion |
| Hosting | GitHub Pages / Netlify / Vercel (gratis) | Vercel dengan custom domain |
| Notifikasi jawaban | Formspree / EmailJS / Telegram Bot API | Serverless function (Vercel/Netlify Functions) |
| Analitik (opsional) | Tidak ada | Plausible / Umami (tanpa cookie) |

### 10.2 Struktur Proyek (Saran)

```
confession-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js          # logika alur & interaksi
│   └── config.js        # semua teks & pengaturan personal
├── assets/
│   ├── images/
│   └── audio/
└── README.md
```

### 10.3 Contoh Struktur Konfigurasi

```js
export const CONFIG = {
  recipientName: "Rina",
  senderName: "Aldi",
  intro: "Ada yang ingin aku sampaikan...",
  story: [
    "Pertama kali kita ngobrol, aku sadar kamu beda.",
    "Sejak itu hari-hariku jadi lebih berwarna.",
  ],
  reasons: [
    "Caramu mendengarkan tanpa menghakimi",
    "Tawamu yang menular",
    "Kebaikanmu pada orang sekitar",
  ],
  question: "Rina, maukah kamu jadi pacarku?",
  answers: {
    yes: { label: "Mau 💗", message: "Terima kasih, kamu bikin aku bahagia banget." },
    wait: { label: "Aku butuh waktu", message: "Tentu. Ambil waktu sebanyak yang kamu perlu." },
    no: { label: "Maaf, belum bisa", message: "Terima kasih sudah jujur. Aku menghargainya." },
  },
  notify: { method: "telegram", endpoint: "..." },
};
```

## 11. Kebutuhan Non-Fungsional

| Kategori | Target |
|---|---|
| **Performa** | Halaman termuat < 3 detik di jaringan 4G; total aset < 3 MB (kompres foto, format WebP) |
| **Kompatibilitas** | Chrome, Safari (iOS), Firefox, Samsung Internet; 2 versi terbaru |
| **Aksesibilitas** | Kontras WCAG AA, navigasi keyboard, `alt` pada gambar, dukungan reduced-motion |
| **Privasi** | Link tidak mudah ditebak (slug acak), tidak di-index mesin pencari (`noindex`), tidak ada pelacak pihak ketiga |
| **Keamanan** | HTTPS wajib; token notifikasi tidak ditaruh di kode klien (gunakan serverless function) |
| **Keandalan** | Jika notifikasi gagal, jawaban tetap tampil ke penerima dan ada pencatatan cadangan |

## 12. Notifikasi & Pencatatan Jawaban

- **Saat dibuka:** pengirim menerima notifikasi singkat ("Rina baru membuka websitenya").
- **Saat menjawab:** pengirim menerima jawaban + waktu.
- **Rekomendasi:** gunakan Telegram Bot atau email via serverless function agar token rahasia aman.
- **Mode siap-siap:** pengirim sebaiknya siap secara emosional untuk semua kemungkinan jawaban sebelum mengirim link.

## 13. Metrik Keberhasilan

Karena ini proyek personal, metrik bersifat kualitatif:

| Metrik | Indikator Berhasil |
|---|---|
| Penerima membaca sampai akhir | Mencapai layar pertanyaan utama |
| Pengalaman nyaman | Penerima tidak merasa tertekan dan merespons dengan jujur |
| Teknis | Tidak ada error, tampil baik di HP penerima |
| Hasil yang sehat | Apa pun jawabannya, hubungan tetap saling menghargai |

## 14. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Penerima merasa tertekan atau canggung | Tinggi | Semua pilihan jawaban setara, nada tulus, tidak ada paksaan |
| Link bocor atau dilihat orang lain | Sedang | Slug acak, `noindex`, jangan dibagikan di grup |
| Penerima belum siap atau tidak punya perasaan yang sama | Tinggi | Layar "butuh waktu" & "belum bisa" yang hangat; pengirim menerima dengan lapang dada |
| Foto atau konten membuat penerima tidak nyaman | Sedang | Gunakan hanya foto yang pantas dan yang ia pasti nyaman |
| Website error atau lambat di HP | Sedang | Uji di beberapa perangkat sebelum dikirim, kompres aset |
| Musik autoplay mengganggu | Rendah | Tidak autoplay; kontrol manual |

## 15. Pertimbangan Etika

- Pernyataan perasaan sebaiknya **tidak dilakukan di depan umum** atau dengan melibatkan orang lain yang menekan.
- Pertimbangkan apakah waktunya tepat dan apakah hubungan kalian sudah cukup dekat.
- Terima jawaban apa pun dengan baik. Website ini adalah bentuk ketulusan, bukan hak untuk mendapat "Ya".
- Jangan mengirim ulang link atau menanyakan hal yang sama berulang kali setelah ia menjawab.

## 16. Rencana Pengerjaan

| Fase | Aktivitas | Estimasi |
|---|---|---|
| 1. Persiapan konten | Tulis cerita, alasan, kumpulkan foto, pilih lagu | 1–2 hari |
| 2. Desain | Tentukan palet, tipografi, wireframe layar | 1 hari |
| 3. Pengembangan | Bangun layar, animasi, logika jawaban | 2–3 hari |
| 4. Integrasi notifikasi | Siapkan bot/email & uji coba | 0,5–1 hari |
| 5. Pengujian | Uji di HP (Android & iOS), cek performa & teks | 1 hari |
| 6. Peluncuran | Deploy, buat link rahasia, kirim di waktu yang tepat | 0,5 hari |

**Total estimasi:** ± 5–8 hari kerja (paruh waktu).

## 17. Checklist Sebelum Rilis

- [ ] Semua teks sudah dibaca ulang (tidak ada typo, nada tulus)
- [ ] Nama penerima benar dan konsisten
- [ ] Ketiga pilihan jawaban berfungsi dan mudah diklik
- [ ] Notifikasi ke pengirim sudah diuji
- [ ] Diuji di minimal 2 perangkat (Android + iOS) dan 2 browser
- [ ] Ukuran aset sudah dioptimalkan
- [ ] Link memakai HTTPS dan slug acak, `noindex` aktif
- [ ] Musik tidak autoplay
- [ ] Pengirim sudah siap menerima segala jawaban

## 18. Pertanyaan Terbuka

1. Apakah penerima lebih nyaman dengan gaya lucu, romantis, atau sederhana?
2. Lewat apa link akan dikirim (WhatsApp, Instagram, langsung)?
3. Apakah ingin ada lagu spesifik? Jika ya, bagaimana cara menyematkannya (file lokal atau embed)?
4. Apakah perlu bahasa campuran atau murni Bahasa Indonesia?
5. Kapan waktu terbaik untuk mengirim link (hari, jam, momen khusus)?

---

*Dokumen ini adalah panduan awal dan dapat disesuaikan dengan kepribadian pengirim serta karakter penerima.*
