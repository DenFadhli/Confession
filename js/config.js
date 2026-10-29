// ============================================================
//  CONFIG.JS — Sesuaikan semua isian di bawah ini
// ============================================================

export const CONFIG = {
  // ── Nama ──────────────────────────────────────────────────
  recipientName: "Lily",
  senderName: "Fadhli",

  // ── Layar Pembuka ─────────────────────────────────────────
  openingTitle: "For You, Lily",
  openingSubtitle: "Ada sesuatu yang ingin aku sampaikan...",
  startButtonLabel: "Mulai ✦",

  // ── Cerita (3–5 kartu) ────────────────────────────────────
  story: [
    {
      emoji: "🌱",
      title: "The first time we talked",
      text: "Aku ingat betul waktu itu. Kamu bicara dengan antusias dan aku langsung sadar kalau kamu beda dari yang lain.",
    },
    {
      emoji: "☀️",
      title: "My days have become more colorful",
      text: "Sejak saat itu, ada sesuatu yang berubah. Setiap hari terasa lebih ringan kalau ada kabar dari kamu.",
    },
    {
      emoji: "🌙",
      title: "Every little moment with you",
      text: "Dari obrolan sederhana sampai cerita random yang kita bagi, hal-hal kecil itu selalu berhasil bikin aku tersenyum dan merasa nyaman.",
    },
    {
      emoji: "💫",
      title: "This feeling is becoming increasingly real",
      text: "Makin aku kenal kamu, makin aku yakin. Bukan cuma senang, tapi benar-benar kagum sama kamu.",
    },
    {
      emoji: "💌",
      title: "And finally...",
      text: "Aku memutuskan untuk jujur. Karena kamu pantas tau, dan bukannya aku tidak peka ataupun bingung tapi memang sedang menunggu momen yang tepat yaitu hari ini.",
    },
  ],

  // ── Alasan Spesial (3–5 poin) ────────────────────────────
  reasons: [
    {
      icon: "👂",
      text: "Caramu mendengarkan dengan respon yang aku suka",
    },
    {
      icon: "😄",
      text: "Tawamu yang selalu berhasil menularkan rasa bahagia",
    },
    {
      icon: "🌿",
      text: "Parasmu yang selalu membuatku terus ingin menatapmu",
    },
    {
      icon: "✨",
      text: "Antusiasme dan semangatmu saat bercerita tentang hal yang kamu suka",
    },
    {
      icon: "🤝",
      text: "Cara kamu selalu ada, meski hanya lewat pesan singkat",
    },
  ],

  // ── Galeri Foto (kosongkan array jika tidak ada foto) ─────
  // Letakkan foto di folder assets/images/ lalu isi path-nya
  photos: [
    // { src: "assets/images/foto1.webp", caption: "Caption di sini" },
    // { src: "assets/images/foto2.webp", caption: "Caption di sini" },
  ],

  // ── Pertanyaan Utama ──────────────────────────────────────
  question: "Lily, may I be your boyfriend?",

  // ── Jawaban ───────────────────────────────────────────────
  answers: {
    yes: {
      label: "IYA, MAUU! 💗",
      title: "I am Very Happy! 🎉",
      message:
        "Terima kasih, Lily. Kamu baru saja membuat hari ini jadi hari terbaik yang pernah aku rasakan.",
      whatsappText:
        "Haii, aku baru buka link-nya... dan jawabanku MAU! 💗",
    },
    wait: {
      label: "Aku butuh waktu 🤍",
      title: "Sure, Take Your Time",
      message:
        "Tidak apa-apa sama sekali. Aku menghargai kejujuranmu. Ambil waktu sebanyak yang kamu butuhkan, tidak ada yang perlu terburu-buru.",
      whatsappText:
        "Haii, aku baru buka link-nya. Boleh ngobrol lagi nanti?",
    },
    no: {
      label: "Maaf, belum bisa... 🙏",
      title: "Thank You for Being Honest",
      message:
        "Terima kasih sudah membaca sampai akhir dan sudah jujur. Aku menghargainya sepenuh hati, semoga kita tetap baik-baik saja.",
      whatsappText: "Haii, aku sudah buka link-nya. Terima kasih ya atas waktunya selama ini.",
    },
  },

  // ── WhatsApp Sender (nomor pengirim tanpa + dan spasi) ────
  // Contoh: "6281234567890"  (kode negara 62 = Indonesia)
  senderWhatsApp: "6281288925785",

  // ── Musik Latar (opsional) ────────────────────────────────
  // Mendukung LINK YOUTUBE langsung atau file audio MP3 lokal (assets/audio/...)!
  // Catatan YouTube: Gunakan versi cover, instrumental, atau piano agar tidak dibatasi hak cipta embed oleh label musik.
  //
  // Rekomendasi Link YouTube Romantis (Embed-Friendly):
  // - "https://www.youtube.com/watch?v=y5JUV825IVA" (A Thousand Years - Christina Perri Piano)
  // - "https://www.youtube.com/watch?v=j_1l0xGbKls" (Canon in D - Romantic Relaxing Piano)
  //
  // Atau gunakan file lokal: "assets/audio/lagu.mp3"
  music: {
    enabled: true, // Ubah ke true untuk mengaktifkan tombol musik
    src: "assets/audio/song.mp3", // Stephen Sanchez - Until I Found You
    label: "Song for You 🎵",
    volume: 50, // Volume: 0 sampai 100
    autoPlayOnStart: true, // Jika true, otomatis putar saat tombol "Mulai ✦" diklik
  },

  // ── Notifikasi (EmailJS) ──────────────────────────────────
  // Daftar gratis di https://www.emailjs.com/
  // Isi setelah setup akun EmailJS
  emailjs: {
    enabled: false,
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    publicKey: "YOUR_PUBLIC_KEY",
  },
};
