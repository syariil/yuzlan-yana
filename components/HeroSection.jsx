'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '@/data/weddingData';
import {
  CastleIllustration,
  BottomFloralBouquet,
  FlyingBirds,
  RomanArchway,
  CornerFloral,
  SideGoldFoliage,
} from './FloralOrnaments';

export default function HeroSection({ isInvitationOpen = false }) {
  // 4-Phase Cinematic Gate Opening Animation persis seperti video detik 00:10 - 00:29:
  // 'gold-arch' (00:10-00:14) -> 'roman-pillar' (00:15-00:19) -> 'roman-text' (00:20-00:21) -> 'open-castle' (00:22-00:29)
  const [stage, setStage] = useState('gold-arch');

  useEffect(() => {
    if (!isInvitationOpen) {
      setStage('gold-arch');
      return;
    }

    setStage('gold-arch');

    // Detik 1.8s: Masuk ke Gerbang Pilar Romawi (Video 00:15)
    const t1 = setTimeout(() => {
      setStage('roman-pillar');
    }, 1800);

    // Detik 3.2s: Teks The Wedding Of Yana & Yuzlan muncul di dalam gerbang (Video 00:20)
    const t2 = setTimeout(() => {
      setStage('roman-text');
    }, 3200);

    // Detik 4.6s: Gerbang Pilar Romawi membesar/membuka ke luar kamera menuju halaman Istana (Video 00:22 - 00:28)
    const t3 = setTimeout(() => {
      setStage('open-castle');
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInvitationOpen]);

  const scrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showHeroText = stage === 'roman-text' || stage === 'open-castle';
  const showRomanGate = stage === 'roman-pillar' || stage === 'roman-text';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between ivory-bg text-stone-800 text-center overflow-hidden pt-6"
    >
      {/* Top Corner Watercolor Florals */}
      <CornerFloral position="top-left" className="opacity-90" />
      <CornerFloral position="top-right" className="opacity-90" />

      {/* Swaying Gold Palm/Foliage on Left & Right Edges (Video 00:11 & 00:27) */}
      <SideGoldFoliage />

      {/* Flying Birds Silhouette across the castle sky */}
      <FlyingBirds />

      {/* PHASE 1 OVERLAY: Golden Arch Border over Distant Castle (Video 00:10 - 00:14) */}
      <AnimatePresence>
        {isInvitationOpen && stage === 'gold-arch' && (
          <motion.div
            key="gold-arch-frame"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{
              opacity: 0,
              scale: 2.2,
              transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-7 top-14 bottom-24 rounded-t-full rounded-b-[140px] border-[2.5px] border-[#c5a059] pointer-events-none z-20 shadow-[inset_0_0_24px_rgba(197,160,89,0.28)]"
          />
        )}
      </AnimatePresence>

      {/* PHASE 2 & 3 OVERLAY: Roman Stone Pillars & Archway Zooming Outward (Video 00:15 - 00:25) */}
      <AnimatePresence>
        {isInvitationOpen && showRomanGate && (
          <motion.div
            key="roman-gate"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 3.1,
              opacity: 0,
              transition: { duration: 2.1, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center origin-center"
          >
            <RomanArchway />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Content: Realistic Watercolor Fairytale Castle, Couple Script Name, Date & Button */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 my-auto w-full">
        {/* Realistic Watercolor Castle Illustration */}
        <motion.div
          initial={{ scale: 0.72, opacity: 0 }}
          animate={
            !isInvitationOpen
              ? { scale: 0.72, opacity: 0.4 }
              : stage === 'gold-arch'
              ? { scale: 0.88, opacity: 0.82, y: 18 }
              : stage === 'roman-pillar'
              ? { scale: 0.82, opacity: 0.65, y: 10 }
              : { scale: 1, opacity: 1, y: 0 }
          }
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full -mb-0"
        >
          <CastleIllustration size="large" />
        </motion.div>

        {/* Text & Save The Date Button Zooming In from Small (Video 00:20 - 00:29) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.18, y: 24 }}
          animate={
            showHeroText
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.18, y: 24 }
          }
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.22em] text-stone-700 font-semibold mb-1.5">
            THE WEDDING OF
          </p>

          <h1 className="font-script text-4xl sm:text-5xl text-wedding-blue tracking-wide my-1 drop-shadow-sm">
            {weddingData.bride.nickname} &amp; {weddingData.groom.nickname}
          </h1>

          <p className="font-serif text-base sm:text-lg tracking-[0.28em] text-stone-800 font-semibold mt-1.5 mb-4">
            08 . 12 . 2026
          </p>

          <button
            onClick={scrollToEvents}
            className="inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-wedding-blue hover:bg-wedding-blue-dark text-white font-sans text-xs font-semibold uppercase tracking-[0.16em] shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 border border-wedding-gold/40"
          >
            SAVE THE DATE
          </button>
        </motion.div>
      </div>

      {/* Bottom Realistic Watercolor Maroon Peony & Cream Rose Bouquet (Dips & rises during gate walk-through like Video 00:23-00:27) */}
      <motion.div
        animate={
          stage === 'roman-text'
            ? { y: 45, scale: 0.96 }
            : { y: 0, scale: 1 }
        }
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="w-full relative z-30 -mb-1"
      >
        <BottomFloralBouquet />
      </motion.div>
    </section>
  );
}
