# Website Undangan Pernikahan Digital (Next.js + Supabase)

Website undangan pernikahan digital interaktif mobile-first modern dengan transisi halus, audio latar, integrasi Supabase Realtime untuk RSVP & buku tamu, serta desain mewah berbasis video referensi.

---

## 🚀 Cara Menjalankan Website

### 1. Jalankan Mode Development
Buka terminal di folder project ini:
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 2. Personalisasi Nama Tamu (Link Khusus Tamu)
Tambahkan parameter `?to=Nama+Tamu` di akhir URL:
```text
http://localhost:3000/?to=Budi+Santoso
http://localhost:3000/?to=Keluarga+Bpk+Hendra
```
Nama tamu akan otomatis tampil di layar cover/splash screen dan formulir RSVP.

---

## 🎨 Cara Mengubah Data Undangan
Semua data teks, nama pengantin, tanggal, nomor rekening, alamat kado, galeri foto, dan musik **terpusat di satu file**:
👉 [`data/weddingData.js`](data/weddingData.js)

Tinggal edit file tersebut untuk mengganti:
- Nama mempelai pria & wanita beserta orang tua & akun Instagram
- Tanggal dan lokasi Akad Nikah, Resepsi, & Ngunduh Mantu
- Nomor rekening bank dan nama pemilik
- Alamat pengiriman kado fisik
- Foto-foto galeri dan foto cover

---

## 🗄️ Menghubungkan ke Supabase (Database Real-time)

Aplikasi ini sudah dilengkapi **Fallback Otomatis**: jika Supabase belum disetup, fitur RSVP tetap berjalan normal menggunakan Local Mock State untuk testing.

Untuk mengaktifkan Database Real-time online:
1. Buat project gratis di [supabase.com](https://supabase.com).
2. Masuk ke menu **SQL Editor**, buka file [`supabase_schema.sql`](supabase_schema.sql), lalu salin dan jalankan (Run) query di dalamnya.
3. Buka **Project Settings -> API**, salin `Project URL` dan `anon/public key`.
4. Buat file `.env.local` di root folder (atau rename `.env.example` menjadi `.env.local`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh......
   ```
5. Restart server (`npm run dev`). Sekarang setiap ucapan baru akan langsung tersimpan di Supabase dan muncul seketika di layar semua tamu tanpa reload!

---

## 📱 Daftar Komponen Utama
- `CoverScreen.jsx`: Splash screen pembuka + personalisasi nama tamu + kunci scroll
- `FloatingControls.jsx`: Pemutar musik piringan hitam berputar & floating bottom navigation dock (6 menu)
- `HeroSection.jsx`: Judul "The Wedding of" & nama mempelai
- `CoupleSection.jsx`: Basmalah & kartu profil mempelai wanita & pria
- `StorySection.jsx`: Ayat QS. Ar-Rum: 21 & linimasa cerita cinta (Perkenalan, Lamaran, Pernikahan)
- `CountdownSection.jsx`: Timer hitung mundur real-time & tombol "Add to Calendar"
- `EventsSection.jsx`: Rangkaian acara (Akad, Resepsi, Ngunduh Mantu) + link Google Maps
- `DressCodeSection.jsx`: Rekomendasi warna baju (swatches) & tombol live streaming (Instagram/YouTube)
- `GallerySection.jsx`: Galeri foto format masonry grid + modal preview lightbox
- `GiftSection.jsx`: Amplop digital accordion + tombol salin rekening instan + konfirmasi WhatsApp
- `PrayerSection.jsx`: Doa pengantin tulisan Arab/Latin & daftar keluarga yang turut mengundang
- `RsvpSection.jsx`: Form RSVP + efek confetti selebrasi + feed ucapan real-time + tombol suka (likes)
- `FooterSection.jsx`: Penutup ucapan terima kasih + tombol share WhatsApp + info lagu yang diputar

