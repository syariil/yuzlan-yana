'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import { CastleIllustration, BottomFloralBouquet } from './FloralOrnaments';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const imagesToPreload = [
      '/images/ornaments/castle.png',
      '/images/ornaments/floral-bottom.png',
      '/images/ornaments/floral-corner.png',
      '/images/ornaments/floral-side.png',
      '/images/ornaments/floral-side-left.png',
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
    const totalAssets = imagesToPreload.length + 1;
    let isCancelled = false;

    const assetLoaded = () => {
      loadedCount++;
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = assetLoaded;
      img.onerror = assetLoaded;
    });

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(assetLoaded).catch(assetLoaded);
    } else {
      assetLoaded();
    }

    let currentPct = 0;
    const interval = setInterval(() => {
      if (isCancelled) return;

      const actualPct = Math.round((loadedCount / totalAssets) * 100);

      if (currentPct < actualPct || currentPct < 90) {
        currentPct += Math.max(1, Math.floor((actualPct - currentPct) * 0.25) + 1);
      } else if (actualPct >= 100 && currentPct < 100) {
        currentPct += 2;
      }

      if (currentPct >= 100) {
        currentPct = 100;
        setProgress(100);
        clearInterval(interval);

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
            scale: 1.03,
            transition: { duration: 0.65, ease: [0.45, 0, 0.55, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between ivory-bg text-stone-800 select-none overflow-hidden"
        >
          <div className="pt-12" />

          {/* Center Castle & Progress */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-xs w-full px-6">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mb-2"
            >
              <CastleIllustration size="small" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-serif text-xs uppercase tracking-[0.25em] text-stone-600 mb-1"
            >
              THE WEDDING OF
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-script text-4xl sm:text-5xl text-wedding-blue-dark my-1"
            >
              {weddingData.bride.nickname} &amp; {weddingData.groom.nickname}
            </motion.h1>

            {/* Progress Bar Container */}
            <div className="w-56 sm:w-64 h-2 bg-wedding-blue-light rounded-full overflow-hidden relative shadow-inner p-[1px] mt-5">
              <motion.div
                className="h-full bg-gradient-to-r from-wedding-blue via-wedding-blue-dark to-wedding-gold rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Percentage Text */}
            <div className="flex items-center justify-between w-56 sm:w-64 mt-2 text-[11px] font-sans">
              <span className="text-stone-500 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-wedding-gold-dark" />
                <span>Menyiapkan undangan...</span>
              </span>
              <span className="font-serif font-bold text-wedding-blue-dark">
                {progress}%
              </span>
            </div>
          </div>

          {/* Bottom Floral Bouquet */}
          <div className="w-full max-w-md mx-auto">
            <BottomFloralBouquet />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
