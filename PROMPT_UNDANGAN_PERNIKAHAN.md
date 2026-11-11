# Prompt & Panduan Pembuatan Web Undangan Pernikahan (Next.js + Supabase Backend)

> **Tentang Dokumen Ini:**  
> Prompt ini disusun secara detail berdasarkan analisis video referensi (desain modern, elegan, kombinasi warna *Dark Charcoal* & *Clean Cream*, tata letak mobile-first, dan interaktivitas lengkap).  
> **Teknologi Utama:** **Next.js (App Router)** menggunakan **JavaScript murni (JSX)**, **Tailwind CSS**, dan **Supabase** sebagai Database Real-time untuk sistem RSVP & Buku Tamu/Ucapan.

---

## 1. Peran & Tujuan (Role & Goal)
Kamu adalah **Senior Fullstack Web Developer & UI/UX Specialist** yang berfokus pada pembuatan website undangan pernikahan digital interaktif mobile-first.  
Tugasmu adalah membuat website undangan pernikahan berbasis **Next.js (JavaScript)** dengan estetika dan alur yang **persis seperti di video referensi**, didukung oleh **backend Supabase** untuk penyimpanan RSVP dan ucapan/doa secara *real-time*.

---

## 2. Karakteristik Visual & Tema Warna (Aesthetic & Style)
- **Tema Warna Dual-Tone Elegan:**
  - *Dark Charcoal / Deep Slate:* `#1e2022` atau `#181a1b` (memberikan kesan eksklusif & mewah pada section tertentu).
  - *Clean Cream / Soft White:* `#fbfbfb` atau `#ffffff` (latar bersih untuk keterbacaan teks).
  - *Aksen Emas / Warm Neutral:* `#c5a880` / `#b38e5d` untuk garis pemisah, ornamen cincin, dan ikon.
- **Tipografi:**
  - *Judul Utama & Nama Mempelai:* High-end Serif (misal: `Playfair Display`, `Cormorant Garamond`, atau `Cinzel`).
  - *Aksen Romantis:* Script font kaligrafi (misal: `Great Vibes` atau `Alex Brush` untuk tulisan *"The Wedding of"*, *"Our Story"*, *"Counting down to the big day"*).
  - *Teks & Deskripsi:* Clean modern Sans-serif (`Plus Jakarta Sans` atau `Inter`).
- **Layout:**
  - Mobile-first (optimal di layar smartphone 360px - 430px, terpusat elegan dengan max-width di layar desktop).

---

## 3. Komponen & Fitur Lengkap Sesuai Video Acuan

### 1. Cover / Splash Screen (Gerbang Undangan)
- Menampilkan foto prewedding mempelai (dengan efek overlay lembut).
- Teks: *"Kepada Yth. Bapak/Ibu/Saudara/i"*.
- **Personalisasi Tamu:** Membaca parameter URL otomatis (`?to=Nama+Tamu`).
- Tombol aksi: **"Buka Undangan"** (ikon amplop).
- Catatan kaki: *"Mohon maaf apabila ada kesalahan penulisan nama/gelar"*.
- *Interaksi:* Scroll halaman terkunci sebelum tombol ditekan. Saat diklik, cover menghilang mulus (slide-up/fade), musik otomatis berputar, dan halaman utama terbuka.

### 2. Floating Controller & Bottom Navigation Dock
- **Floating Music Player:** Tombol bulat di pojok kanan layar dengan ikon musik berputar saat lagu aktif (dapat di-pause/play kapan saja).
- **Sticky Bottom Navigation Pill:** Menu melayang di bagian bawah dengan 6 ikon:
  1. 🏠 **Home** (Cover / Hero)
  2. 💍 **Couple** (Profil Mempelai)
  3. 📅 **Event** (Save The Date & Kalender)
  4. 🎁 **Gift** (Amplop Digital & Kado)
  5. 🖼️ **Gallery** (Galeri Foto)
  6. 💬 **Wishes** (RSVP & Buku Tamu)

### 3. Hero Section
- Tulisan kaligrafi *"The Wedding of"*.
- Nama Pengantin: *"Yunita & Riyan"*.
- Tanggal Acara: *"31 DESEMBER 2026"*.
- Indikator panah scroll ke bawah.

### 4. Pembuka & Profil Mempelai (The Couple)
- Basmalah bahasa Arab & terjemahan:  
  *"Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami."*
- **Kartu Mempelai Wanita (Bride):**
  - Foto anggun berbingkai sudut melengkung halus.
  - Nama panggilan kaligrafi (*"Yunita"*).
  - Nama lengkap & gelar: *"Yunita Safitri, S.Pd."*.
  - Keterangan: *"Putri Pertama dari Bapak Adi Nugroho & Ibu Gani"*.
  - Tombol: `[Instagram icon] @mempelai`.
- **Kartu Mempelai Pria (Groom):**
  - Foto mempelai pria dengan setelan jas.
  - Nama panggilan kaligrafi (*"Riyan"*).
  - Nama lengkap & gelar: *"Riyan Kuswoyo, S.T."*.
  - Keterangan: *"Putra Kedua dari Bapak Sufian Jamal & Ibu Elmira"*.
  - Tombol: `[Instagram icon] @mempelai`.

### 5. Ayat Suci & Love Story
- **Kutipan QS. Ar-Rum: 21:** Ditampilkan di atas latar *dark charcoal* dengan foto romantis pasangan.
- **Section "Our Story":**
  - Kartu cerita cinta dengan garis border elegan:
    1. *PERKENALAN - 15 Februari 2020*
    2. *LAMARAN - 13 September 2025*
    3. *PERNIKAHAN - 31 Desember 2026*

### 6. Countdown Timer & Add to Calendar
- Header script: *"Counting down to the big day"*.
- 4 Kotak hitung mundur interaktif: **Days**, **Hours**, **Minutes**, **Seconds**.
- Tombol: **`[Calendar icon] ADD TO CALENDAR`** (membuka Google Calendar otomatis).

### 7. Save The Date (Rangkaian Acara)
- Ornamen ilustrasi cincin pernikahan.
- **Akad Nikah:**
  - Hari & Tanggal: *"KAMIS, 31 DESEMBER 2026"*, Jam: *"08.00 WIB"*.
  - Lokasi: *"AUDITORIUM MASJID"*, Alamat lengkap.
  - Tombol: **`[Map Pin] Google Maps`**.
- **Resepsi:**
  - Jam: *"09.00 WIB - Selesai"*, Lokasi & Tombol Google Maps.
- **Ngunduh Mantu:**
  - Jam: *"17.00 WIB - Selesai"*, Lokasi: *"KEDIAMAN MEMPELAI PRIA"*, Alamat & Tombol Google Maps.

### 8. Dress Code
- **Dress Code:** Rekomendasi warna busana tamu (lingkaran warna swatch: Lavender, Putih, Gold Ochre, Cokelat Muda, Warm Terracotta).

### 9. Galeri Foto (Our Gallery)
- Quote romantis banner foto:  
  *"Happy marriages begin when we marry the one we love, and they blossom when we love the ones we marry"*.
- Tata letak **Masonry Grid**: Foto portrait & landscape yang tertata rapi.

### 10. Wedding Gift (Amplop Digital & Kirim Kado)
- Ikon Gift Box & teks pengantar santun.
- Tombol toggle: **`[Grid icon] KLIK DI SINI`** / **`SEMBUNYIKAN`**.
- Saat dibuka menampilkan:
  - Kartu Rekening 1: Nama Bank, Nomor Rekening, Atas Nama, tombol **`Copy`** (dengan feedback instan "Tersalin!").
  - Kartu Rekening 2.
  - Wishlist / Gift Registry (tombol View List).
  - Alamat Kirim Kado Fisik + tombol salin alamat + konfirmasi via WhatsApp.

### 11. Doa Pengantin & Turut Mengundang
- Doa tulisan Arab:  
  *بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ*
- Tulisan Latin & arti bahasa Indonesia.
- **Turut Mengundang:** Daftar nama keluarga besar yang turut berbahagia.

### 12. RSVP & Buku Tamu (Wishes) - Didukung Backend Supabase
- Foto banner pengantin dengan judul *"RSVP & Wishes"*.
- **Counter Real-time:** Menampilkan total ucapan yang masuk (contoh: *"24 Ucapan"*).
- **Form Input RSVP:**
  - Nama Lengkap (auto-fill jika nama tamu tertera di URL `?to=...`).
  - Pilihan Kehadiran interaktif: `[✓ Hadir]` | `[? Masih Ragu]` | `[✕ Tidak Hadir]`.
  - Pilihan Jumlah Tamu: 1 Orang, 2 Orang, dst.
  - Textarea ucapan doa terbaik.
  - Tombol **Kirim** (dengan status loading dan animasi sukses).
- **Daftar Ucapan & Doa (Real-time Feed):**
  - Kartu ucapan menampilkan: Nama Tamu, Badge status kehadiran (Hadir warna hijau, Tidak Hadir warna merah, Ragu warna abu-abu), isi pesan doa, waktu kirim (*relative time* seperti "2 jam yang lalu"), dan tombol Like / Love yang bisa diklik oleh tamu lain.

### 13. Footer & Now Playing
- Penutup ucapan terima kasih dari kedua mempelai.
- Logo branding / watermark.
- Tombol share WhatsApp & salin link undangan.
- Info pemutar musik mini di footer: *"One Only - Pamungkas"*.

---

## 4. Arsitektur Backend Supabase

### A. Skema Tabel Database (`rsvps`)
Jalankan query SQL berikut di **Supabase SQL Editor**:

```sql
-- 1. Buat Tabel RSVP
CREATE TABLE public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'ragu', 'tidak_hadir')),
    guest_count INT DEFAULT 1,
    message TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan RLS (Public Access untuk Undangan)
-- Siapapun dapat membaca daftar ucapan
CREATE POLICY "Allow public read" 
ON public.rsvps FOR SELECT 
TO anon, authenticated 
USING (true);

-- Siapapun dapat mengirim ucapan baru
CREATE POLICY "Allow public insert" 
ON public.rsvps FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Siapapun dapat menambah like pada ucapan
CREATE POLICY "Allow public update likes" 
ON public.rsvps FOR UPDATE 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- 4. Aktifkan Fitur Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.rsvps;
```

### B. Variabel Lingkungan (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh......
```

### C. Client Supabase (`lib/supabase.js`)
File helper inisialisasi client Supabase dengan kemampuan **Graceful Fallback** (jika environment belum diset, aplikasi tidak akan error/crash dan otomatis menggunakan LocalStorage untuk mode preview):

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
```

### D. Real-time Subscription di Komponen Frontend
Komponen `RsvpSection.jsx` menggunakan hook `useEffect` untuk subscribe perubahan tabel secara instan:

```javascript
useEffect(() => {
  if (!supabase) return;

  // Dengarkan penambahan komentar baru secara Real-time
  const channel = supabase
    .channel('realtime_rsvps')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'rsvps' },
      (payload) => {
        setWishes((prev) => [payload.new, ...prev]);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

## 5. Struktur Direktori Project Next.js (JavaScript)

```text
├── app/
│   ├── api/
│   │   └── rsvp/
│   │       ├── route.js            # GET (ambil ucapan & rekap) & POST (tambah ucapan)
│   │       └── [id]/
│   │           └── like/
│   │               └── route.js    # PATCH (tambah jumlah like)
│   ├── layout.js                   # Root layout, Google Fonts (Playfair & Inter)
│   ├── page.js                     # Halaman utama (merangkai seluruh section)
│   └── globals.css                 # Styling Tailwind & animasi custom
├── components/
│   ├── CoverScreen.jsx             # Splash screen pembuka + kunci scroll
│   ├── FloatingControls.jsx        # Floating music disc & bottom dock navbar
│   ├── HeroSection.jsx             # Nama pengantin & tanggal utama
│   ├── CoupleSection.jsx           # Basmalah & profil pengantin pria/wanita
│   ├── StorySection.jsx            # QS Ar-Rum & linimasa cerita cinta
│   ├── CountdownSection.jsx        # Timer hitung mundur & Add to Calendar
│   ├── EventsSection.jsx           # Akad, Resepsi, Ngunduh Mantu + Maps
│   ├── DressCodeSection.jsx        # Swatch warna baju & live streaming
│   ├── GallerySection.jsx          # Masonry grid galeri foto
│   ├── GiftSection.jsx             # Amplop digital accordion + copy rekening
│   ├── PrayerSection.jsx           # Doa pengantin Arab/Latin & turut mengundang
│   ├── RsvpSection.jsx             # Form RSVP + feed komentar real-time Supabase
│   └── FooterSection.jsx           # Penutup & watermark
├── data/
│   └── weddingData.js              # SATU SUMBER DATA untuk seluruh nama, tanggal, rekening, dll.
├── lib/
│   └── supabase.js                 # Inisialisasi Supabase client & fallback
├── public/
│   ├── audio/                      # File musik latar (One Only / instrumental)
│   └── images/                     # Foto prewedding, avatar, ornamen
├── .env.example                    # Template variabel Supabase
├── package.json
└── tailwind.config.js
```

---

## 6. Konfigurasi Data Terpusat (`data/weddingData.js`)
Seluruh data mempelai, tanggal acara, nomor rekening, alamat kado fisik, link maps, dan daftar keluarga yang turut mengundang **WAJIB** berada di dalam file `weddingData.js` agar pengguna dapat memodifikasi seluruh isi undangan dengan cepat tanpa mengubah komponen tampilan.
