// data/weddingData.js
// SATU SUMBER DATA UNTUK SELURUH WEBSITE UNDANGAN
// Ubah data di sini untuk mengganti nama, tanggal, rekening, cerita, dll.

export const weddingData = {
  // Informasi Mempelai
  bride: {
    fullName: " Apt. Safiana, S.Farm",
    nickname: "Yana",
    parents: "Anak ke-4 dari 4 bersaudara dari Bapak Biyzi & Ibu Sarlia",
    instagram: "https://www.instagram.com/safiana.27",
    photo: "/images/Yana.webp",
  },
  groom: {
    fullName: "Ld. Ahmad Yuzlan Sarifudin",
    nickname: "Yuzlan",
    parents: "Anak pertama dari 2 bersaudara dari Bapak La Ode Sarifudin & Ibu Wa Ode Darnia",
    instagram: "https://www.instagram.com/odealan99",
    photo: "/images/Yuzlan.webp",
  },

  // Foto Utama & Cover
  coverPhoto: "/images/cover.webp",
  heroPhoto: "/images/hero.webp",
  storyPhoto: "/images/story.webp",
  quotePhoto: "/images/quote.webp",
  rsvpPhoto: "/images/rsvp.webp",

  // Tanggal Pernikahan Utama (Untuk Countdown & Header)
  weddingDate: "2026-12-08T08:00:00+08:00",
  weddingDateDisplay: "08 DESEMBER 2026",

  // Ayat Suci & Kutipan Pembuka
  basmalah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  openingGreeting:
    "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:",
  holyVerse: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    surah: "QS. Ar-Rum : 21",
    translation:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
  },

  // Linimasa Cerita Cinta (Our Story)
  story: [
    {
      title: "PERKENALAN",
      date: "-",
      description:
        "Kami bertemu tanpa terencana. Awal pertemuan yang menjadi dasar semuanya. ada rasa yang timbul dari pertemuan tersebut. Tak lama berselang, kami memutuskan menjalin hubungan spesial.",
    },
    {
      title: "PACARAN",
      date: "-",
      description:
        "Setelah menjalin hubungan pacaran kurang lebih 1.5 tahun, kami harus menjalaninya dengan jarak yang cukup jauh. Yana dengan studinya di Semarang, dan Yuzlan dengan pekerjaannya di lautan.",
    },
    {
      title: "LAMARAN",
      date: "14 JUNI 2026",
      description:
        "14 juni, Yuzlan memutuskan untuk mengikat secara resmi Yana, dengan penuh keyakinan dan kesiapan diri untuk melangkah ke jenjang pernikahan. Yuzlan meminta restu kedua orang tua Yana untuk mempersunting putri tercintanya.",
    },
    {
      title: "PERNIKAHAN",
      date: "08 DESEMBER 2026",
      description: "Pada tanggal 08 Desember 2026, saya dan Yana insya Allah resmi menjadi sepasang suami istri. Dengan semua doa restu dari keluarga dan teman-teman, kami siap untuk menempuh hidup bersama dan menjalankan ibadah paling indah ini.",
    },
  ],

  // Rangkaian Acara (Save The Date)
  events: [
    {
      id: "akad",
      name: "Akad Nikah",
      date: "SELASA, 08 DESEMBER 2026",
      time: "08.00 WITA",
      venue: "KEDIAMAN MEMPELAI WANITA",
      address: " jln LAODE MANARFAH, kel. Baadia, kec. Murhum (sebelum SDN 2 Baadia) Kediaman mempelai wanita.",
      mapsUrl: "https://maps.app.goo.gl/nZVttTGg5WyDFvTBA",
    },
    {
      id: "resepsi",
      name: "Resepsi",
      date: "SELASA, 08 DESEMBER 2026",
      time: "12.00 - Selesai",
      venue: "GEDUNG ARASALANA",
      address: " Lamangga, Murhum, Kota Bau-Bau, Sulawesi Tenggara",
      mapsUrl: "https://maps.app.goo.gl/bTdxjRjJai5DW1J37",
    },
  ],

  // Dress Code
  dressCode: {
    description:
      "Dengan hormat, kami mengundang Anda untuk mengenakan warna pilihan ini di hari pernikahan kami.",
    colors: [
      { name: "Soft Lavender", hex: "#E9E5F2" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Golden Ochre", hex: "#C79D4C" },
      { name: "Warm Tan", hex: "#C69866" },
      { name: "Deep Mocha", hex: "#7E5437" },
    ],
  },

  // Galeri Foto
  galleryQuote:
    "Happy marriages begin when we marry the one we love, and they blossom when we love the ones we marry",
  gallery: [
    {
      id: 1,
      src: "/images/gallery/gallery-1.webp",
      caption: "Our Hand in Hand Moment",
      span: "col-span-2",
    },
    {
      id: 2,
      src: "/images/gallery/gallery-2.webp",
      caption: "Pure Joy",
      span: "col-span-1",
    },
    {
      id: 3,
      src: "/images/gallery/gallery-3.webp",
      caption: "Eternal Promise",
      span: "col-span-1",
    },
    {
      id: 4,
      src: "/images/gallery/gallery-4.webp",
      caption: "Warm Embrace",
      span: "col-span-1",
    },
    {
      id: 5,
      src: "/images/gallery/gallery-5.webp",
      caption: "Laughing Together",
      span: "col-span-1",
    },
    {
      id: 6,
      src: "/images/gallery/gallery-6.webp",
      caption: "Walking the Path",
      span: "col-span-2",
    },
    {
      id: 7,
      src: "/images/gallery/gallery-7.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 8,
      src: "/images/gallery/gallery-8.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 9,
      src: "/images/gallery/gallery-9.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 10,
      src: "/images/gallery/gallery-10.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 11,
      src: "/images/gallery/gallery-12.webp",
      caption: "Walking the Path",
      span: "col-span-2",
    },
    {
      id: 11,
      src: "/images/gallery/gallery-13.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 11,
      src: "/images/gallery/gallery-14.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 11,
      src: "/images/gallery/gallery-15.webp",
      caption: "Walking the Path",
      span: "col-span-2",
    },
    {
      id: 11,
      src: "/images/gallery/gallery-16.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 11,
      src: "/images/gallery/gallery-17.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 11,
      src: "/images/gallery/gallery-18.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 11,
      src: "/images/gallery/gallery-19.webp",
      caption: "Walking the Path",
      span: "col-span-1",
    },
    {
      id: 11,
      src: "/images/gallery/gallery-20.webp",
      caption: "Walking the Path",
      span: "col-span-2",
    },
  ],

  // Amplop Digital & Hadiah
  gifts: {
    description:
      "Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih untuk kami, dapat melalui:",
    bankAccounts: [
      {
        bank: "MANDIRI",
        accountHolder: "Safiana",
        accountNumber: "1350-0219-60-966",
      },
      {
        bank: "BRI",
        accountHolder: "Ld. Ahmad Yuzlan Sarifudin",
        accountNumber: "1560-0101-4336-509",
      },
    ],
    giftRegistry: {
      title: "GIFT REGISTRY",
      description:
        "Kami menyiapkan wishlist/gift registry sebagai bentuk kemudahan bagi yang ingin memberi hadiah. Terima kasih telah menjadi bagian dari hari bahagia kami.",
      link: "#",
    },
    physicalGift: {
      recipient: "Anita Safitri",
      address:
        "jln LAODE MANARFAH, kel. Baadia, kec. Murhum (sebelum SDN 2 Baadia).",
      phone: "+6282349191946",
    },
  },

  // Doa Untuk Pengantin
  prayer: {
    arabic: "بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    latin: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir",
    translation:
      "Mudah-mudahan Allah memberkahi engkau dalam segala hal (yang baik) dan mempersatukan kamu berdua dalam kebaikan",
  },

  // Turut Mengundang
  invitedBy: [
    "Ibu Sri Wahyuni Anindita",
    "Bapak Abdul Karim Syahputra, S.H.",
    "Keluarga Besar Ibu Lina Marlina Putri",
    "Bapak Bambang Santoso Prabowo, M.T.",
    "Ibu Nurhayati Kusumawardani",
    "Bapak Andi Pratama Nugroho",
    "Ibu Nuraeni Fitriani, S.Pd.I.",
    "Keluarga Besar Bapak Hasan Basri Syamsuddin",
    "Bapak Mulyono Widjaja, M.M.",
    "Ibu Aminah Zulkarnaini, S.Ag.",
    "Keluarga Besar Ibu Maryam Azzahra",
  ],

  // Musik Latar
  music: {
    title: "Kamulah Takdirku",
    artist: "Raffi Ahmad & Nagita Slavina",
    // Link audio royalty-free / gentle romantic instrumental
    src: "/audio/music.mp3",
  },
};

