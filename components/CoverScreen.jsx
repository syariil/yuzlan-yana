'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import {
  BottomFloralBouquet,
  CornerFloral,
  GoldOvalPortrait,
  BackgroundWatermark,
} from './FloralOrnaments';

export default function CoverScreen({ isOpen, onOpen }) {
  const [guestName, setGuestName] = useState('Tamu Undangan');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) {
        setGuestName(to.replace(/\+/g, ' '));
      }
    }
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.65, ease: [0.45, 0, 0.55, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between ivory-bg text-stone-800 overflow-hidden"
        >
          <div className="relative w-full max-w-md mx-auto h-full flex flex-col items-center justify-between pt-8 sm:pt-10">
            <CornerFloral position="top-left" className="opacity-85" />
            <CornerFloral position="top-right" className="opacity-85" />
            <BackgroundWatermark className="bottom-16" />

            {/* Top & Center Content (Video 00:03 - 00:09) */}
            <motion.div
              exit={{ scale: 0.75, opacity: 0, transition: { duration: 0.45 } }}
              className="relative z-10 flex flex-col items-center text-center px-6 my-auto"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.2, y: -15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-xs sm:text-sm uppercase tracking-[0.22em] text-stone-700 font-semibold mb-5"
              >
                THE WEDDING OF
              </motion.p>

              {/* Oval Couple Photo in Gold Ring (Zoom-in from tiny like Video 00:06) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.18 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.05, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mb-5"
              >
                <GoldOvalPortrait
                  src={weddingData.coverPhoto}
                  alt={`${weddingData.bride.nickname} & ${weddingData.groom.nickname}`}
                />
              </motion.div>

              {/* Couple Script Names in Royal Maroon */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.2, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-script text-4xl sm:text-5xl text-wedding-blue tracking-wide my-1 drop-shadow-sm"
              >
                {weddingData.bride.nickname} &amp; {weddingData.groom.nickname}
              </motion.h1>

              {/* Guest Addressing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.25, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 flex flex-col items-center"
              >
                <p className="font-sans text-xs sm:text-sm text-stone-600 font-normal">
                  Kepada Bapak/Ibu/Saudara/i
                </p>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mt-1 mb-4 capitalize px-4">
                  {guestName}
                </h2>

                {/* Royal Maroon Pill Button: BUKA UNDANGAN */}
                <button
                  onClick={onOpen}
                  className="inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-wedding-blue hover:bg-wedding-blue-dark text-white font-sans font-semibold text-xs tracking-[0.15em] uppercase shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 animate-shimmer border border-wedding-gold/50"
                >
                  <MailOpen className="w-3.5 h-3.5 text-wedding-gold-light" />
                  <span>BUKA UNDANGAN</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Bottom Maroon Peony & Cream Rose Realistic Watercolor Bouquet */}
            <div className="w-full relative z-10 -mb-1">
              <BottomFloralBouquet />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
