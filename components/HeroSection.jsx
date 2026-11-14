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
} from './FloralOrnaments';
import AnimateReveal from './AnimateReveal';

export default function HeroSection({ isInvitationOpen = false }) {
  // Stage animasi pembukaan persis seperti video 00:10 - 00:29:
  // 'gold-arch' (00:10-00:14) -> 'roman-pillar' (00:15-00:21) -> 'open-castle' (00:22+)
  const [stage, setStage] = useState('gold-arch');

  useEffect(() => {
    if (!isInvitationOpen) {
      setStage('gold-arch');
      return;
    }

    // 0.0s - 1.6s: Gold Arch Frame over distant castle (00:10 - 00:14)
    setStage('gold-arch');

    // 1.6s - 3.6s: Roman Pillars Archway zooms in & frames castle + text (00:15 - 00:21)
    const t1 = setTimeout(() => {
      setStage('roman-pillar');
    }, 1600);

    // 3.6s+: Roman Pillars zoom outward past camera into the Castle courtyard (00:22 - 00:29)
    const t2 = setTimeout(() => {
      setStage('open-castle');
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isInvitationOpen]);

  const scrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showHeroText = stage === 'roman-pillar' || stage === 'open-castle';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between ivory-bg text-stone-800 text-center overflow-hidden pt-6"
    >
      {/* Top Corner Watercolor Florals */}
      <CornerFloral position="top-left" className="opacity-85" />
      <CornerFloral position="top-right" className="opacity-85" />

      {/* Flying Birds Silhouette across the castle sky */}
      <FlyingBirds />

      {/* STAGE 1 OVERLAY: Golden Arch Border over Distant Castle (Video 00:10 - 00:14) */}
      <AnimatePresence>
        {isInvitationOpen && stage === 'gold-arch' && (
          <motion.div
            key="gold-arch-frame"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1.04 }}
            exit={{ opacity: 0, scale: 1.25 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-7 top-14 bottom-24 rounded-t-full rounded-b-[140px] border-[2.5px] border-[#c8a464] pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(200,164,100,0.2)]"
          />
        )}
      </AnimatePresence>

      {/* STAGE 2 & 3 OVERLAY: Roman Stone Pillars & Archway Zooming Outward (Video 00:15 - 00:23) */}
      <AnimatePresence>
        {isInvitationOpen && stage === 'roman-pillar' && (
          <motion.div
            key="roman-gate"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 2.65,
              opacity: 0,
              transition: { duration: 1.85, ease: [0.22, 1, 0.36, 1] },
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
              ? { scale: 0.85, opacity: 0.75, y: 12 }
              : { scale: 1, opacity: 1, y: 0 }
          }
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full -mb-3"
        >
          <CastleIllustration size="large" />
        </motion.div>

        {/* Text & Save The Date Button Zooming In (Video 00:20 - 00:29) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 20 }}
          animate={
            showHeroText
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.3, y: 20 }
          }
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.22em] text-stone-700 font-semibold mb-1.5">
            THE WEDDING OF
          </p>

          <h1 className="font-script text-4xl sm:text-5xl text-wedding-blue-dark tracking-wide my-1 drop-shadow-sm">
            {weddingData.bride.nickname} &amp; {weddingData.groom.nickname}
          </h1>

          <p className="font-serif text-base sm:text-lg tracking-[0.28em] text-stone-800 font-semibold mt-1.5 mb-4">
            08 . 12 . 2026
          </p>

          <button
            onClick={scrollToEvents}
            className="inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-wedding-blue hover:bg-wedding-blue-dark text-white font-sans text-xs font-semibold uppercase tracking-[0.16em] shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            SAVE THE DATE
          </button>
        </motion.div>
      </div>

      {/* Bottom Realistic Watercolor Blue Peony & Cream Rose Bouquet */}
      <div className="w-full relative z-30 -mb-1">
        <BottomFloralBouquet />
      </div>
    </section>
  );
}
