'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingData } from '@/data/weddingData';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Kumpulkan seluruh aset penting yang harus di-download sebelum tampilan muncul
    const imagesToPreload = [
      weddingData.coverPhoto,
      weddingData.heroPhoto,
      weddingData.bride.photo,
      weddingData.groom.photo,
      weddingData.storyPhoto,
      weddingData.quotePhoto,
      weddingData.rsvpPhoto,
      ...(weddingData.gallery?.slice(0, 6).map((g) => g.src) || []),
    ].filter(Boolean);

    let loadedCount = 0;
    const totalAssets = imagesToPreload.length + 1; // +1 untuk fonts
    let isCancelled = false;

    // Helper untuk update target progress berdasarkan aset yang selesai
    const assetLoaded = () => {
      loadedCount++;
    };

    // Preload semua gambar
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = assetLoaded;
      img.onerror = assetLoaded; // jangan biarkan error memblokir loading
    });

    // Preload font dokumen
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(assetLoaded).catch(assetLoaded);
    } else {
      assetLoaded();
    }

    // Timer simulasi progres halus (smooth interpolation)
    // Memastikan transisi terlihat indah minimal ~1.6 detik dan maksimal ~4 detik
    let currentPct = 0;
    const interval = setInterval(() => {
      if (isCancelled) return;

      // Hitung progress sebenarnya dari aset yang berhasil di-load
      const actualPct = Math.round((loadedCount / totalAssets) * 100);

      // Kecepatan progress menyesuaikan: cepat di awal, menunggu jika aset belum selesai
      if (currentPct < actualPct || currentPct < 90) {
        currentPct += Math.max(1, Math.floor((actualPct - currentPct) * 0.25) + 1);
      } else if (actualPct >= 100 && currentPct < 100) {
        currentPct += 2;
      }

      if (currentPct >= 100) {
        currentPct = 100;
        setProgress(100);
        clearInterval(interval);

        // Beri jeda 350ms saat 100% agar pengguna melihat angka 100%
        setTimeout(() => {
          if (!isCancelled) {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }
        }, 350);
      } else {
        setProgress(currentPct);
      }
    }, 35);

    // Safeguard: Maksimal 4.5 detik langsung selesai agar tidak pernah hang
    const safetyTimeout = setTimeout(() => {
      if (!isCancelled && currentPct < 100) {
        setProgress(100);
        setIsDone(true);
        if (onComplete) onComplete();
      }
    }, 4500);

    return () => {
      isCancelled = true;
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.7, ease: [0.45, 0, 0.55, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-wedding-darker text-white px-6 select-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-wedding-gold/10 blur-3xl pointer-events-none" />

          {/* Floating Sparkles Decor */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <span
              className="particle w-2.5 h-2.5 top-1/4 left-1/4"
              style={{ animation: 'float-particle 5s ease-in-out infinite' }}
            />
            <span
              className="particle w-2 h-2 top-3/4 right-1/4"
              style={{ animation: 'float-particle 6s ease-in-out 1s infinite' }}
            />
            <span
              className="particle w-3 h-3 bottom-1/4 left-1/3"
              style={{ animation: 'float-particle 7s ease-in-out 0.5s infinite' }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
            {/* Monogram Emblem / Interlocking Rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-20 h-20 mb-6 flex items-center justify-center"
            >
              {/* Outer pulsing gold ring */}
              <div className="absolute inset-0 rounded-full border border-wedding-gold/40 animate-ping opacity-30" />
              <div className="w-20 h-20 rounded-full border-2 border-wedding-gold/60 flex items-center justify-center shadow-[0_0_20px_rgba(197,168,128,0.3)] bg-black/40 backdrop-blur-sm">
                {/* Interlocking Rings SVG */}
                <svg
                  className="w-10 h-10 stroke-wedding-gold fill-none stroke-[1.6]"
                  viewBox="0 0 24 24"
                >
                  <circle cx="9" cy="12" r="5" />
                  <circle cx="15" cy="12" r="5" />
                </svg>
              </div>
            </motion.div>

            {/* Typography */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-script text-3xl sm:text-4xl text-wedding-gold tracking-wide"
            >
              The Wedding of
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white mt-1 gold-glow"
            >
              {weddingData.bride.nickname} & {weddingData.groom.nickname}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center justify-center gap-2 mt-3 mb-8"
            >
              <div className="h-[1px] w-8 bg-wedding-gold/50" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-wedding-gold-light font-semibold">
                {weddingData.weddingDateDisplay}
              </span>
              <div className="h-[1px] w-8 bg-wedding-gold/50" />
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-56 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-wedding-gold/70 via-wedding-gold to-wedding-gold-light rounded-full shadow-[0_0_12px_#c5a880]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Percentage Text */}
            <div className="flex items-center justify-between w-56 sm:w-64 mt-2.5 text-[11px] font-sans">
              <span className="text-gray-400 font-light flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-wedding-gold" />
                <span>Memuat...</span>
              </span>
              <span className="font-serif font-bold text-wedding-gold tracking-wider">
                {progress}%
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-[11px] text-gray-400 font-light mt-4 italic tracking-wide">
              Menyiapkan momen bahagia...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
