# 💌 Confession Website — "Will You Be Mine?"

Website satu halaman yang personal dan interaktif untuk menyatakan perasaan.

---

## 🚀 Cara Pakai

### 1. Edit Konfigurasi

Buka [`js/config.js`](js/config.js) dan sesuaikan **semua isian** di sana:

| Isian | Contoh |
|---|---|
| `recipientName` | `"Rina"` |
| `senderName` | `"Aldi"` |
| `story[]` | 3–5 kartu cerita |
| `reasons[]` | 3–5 alasan spesial |
| `photos[]` | Path foto di `assets/images/` |
| `question` | Pertanyaan utama |
| `answers.*` | Teks respons untuk tiap pilihan |
| `senderWhatsApp` | Nomor WA (tanpa `+`, mis. `6281234567890`) |

### 2. Tambah Foto (Opsional)

1. Letakkan foto di folder `assets/images/` (format `.webp` direkomendasikan)
2. Isi array `photos` di `config.js`:
   ```js
   photos: [
     { src: "assets/images/foto1.webp", caption: "Caption di sini" },
   ]
   ```

### 3. Tambah Musik Latar (YouTube / MP3)

Website mendukung **Link YouTube langsung** (tanpa perlu download file) atau file MP3 lokal:

1. **Pakai YouTube (Rekomendasi - Praktis):**
   Cukup masukkan URL video YouTube di `js/config.js`:
   ```js
   music: {
     enabled: true,
     src: "https://www.youtube.com/watch?v=LqUe_dswV_w", // Contoh: Laufey - Valentine
     label: "Laufey - Valentine 🎵",
     volume: 50,
     autoPlayOnStart: false, // Set true jika ingin otomatis putar saat klik "Mulai ✦"
   }
   ```
2. **Pakai file MP3 lokal:**
   Letakkan file audio di `assets/audio/` dan isi:
   ```js
   music: {
     enabled: true,
     src: "assets/audio/lagu.mp3",
   }
   ```
> 💡 Tombol musik terapung di pojok kanan bawah dengan efek animasi berdenyut saat lagu berputar. Anda bisa putar / jeda kapan saja.

### 4. Aktifkan Notifikasi (Opsional)

Gunakan [EmailJS](https://emailjs.com) (gratis):
1. Daftar, buat service + template
2. Isi `emailjs` di `config.js`:
   ```js
   emailjs: {
     enabled: true,
     serviceId: "service_xxx",
     templateId: "template_xxx",
     publicKey: "your_public_key",
   }
   ```
3. Variabel di template EmailJS: `{{event}}`, `{{answer}}`, `{{recipient}}`, `{{time}}`, `{{duration}}`

### 5. Buka & Uji

Karena menggunakan ES Modules, buka dengan **live server** (bukan langsung buka file):

```bash
# Dengan VS Code: klik kanan index.html → "Open with Live Server"
# Atau pakai npx:
npx serve .
```

### 6. Deploy

| Platform | Cara |
|---|---|
| **Netlify** | Drag & drop folder ke [netlify.com/drop](https://app.netlify.com/drop) |
| **GitHub Pages** | Push ke repo, aktifkan Pages dari branch `main` |
| **Vercel** | `vercel --prod` atau import repo di dashboard |

> 💡 Setelah deploy, gunakan link dengan **slug acak** (bisa set custom domain atau pakai URL random Netlify).

---

## 📁 Struktur Proyek

```
confession-site/
├── index.html           ← Struktur halaman
├── css/
│   └── style.css        ← Semua styling
├── js/
│   ├── config.js        ← ✏️ EDIT INI — semua konten personal
│   └── main.js          ← Logika aplikasi
├── assets/
│   ├── images/          ← Foto kenangan (letakkan di sini)
│   └── audio/           ← File musik (letakkan di sini)
└── README.md
```

---

## ✅ Checklist Sebelum Kirim

- [ ] Semua teks sudah dibaca ulang, tidak ada typo
- [ ] Nama penerima benar dan konsisten
- [ ] Semua 3 tombol jawaban berfungsi
- [ ] Notifikasi sudah diuji (jika diaktifkan)
- [ ] Diuji di Android & iOS, minimal 2 browser
- [ ] Foto sudah dioptimalkan (< 300 KB per foto, format WebP)
- [ ] Musik tidak autoplay
- [ ] Link menggunakan HTTPS dan slug yang tidak mudah ditebak
- [ ] Pengirim sudah siap menerima segala jawaban 💛

---

## 🌸 Prinsip Desain (Anti Dark Pattern)

1. Semua tombol jawaban berukuran sama — tidak ada yang dikecilkan/disembunyikan
2. Tidak ada teks yang menekan atau menyudutkan
3. Layar "Butuh waktu" dan "Belum bisa" hangat dan menghargai
4. Tidak ada auto-redirect setelah menjawab
5. Jawaban hanya dikirim ke pengirim, tidak dipublikasikan

---

*Semoga berhasil, dan terima jawaban apa pun dengan lapang dada 💛*
