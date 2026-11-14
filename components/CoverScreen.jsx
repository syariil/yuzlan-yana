'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import {
  BottomFloralBouquet,
  CornerFloral,
  GoldOvalPortrait,
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
            transition: { duration: 0.75, ease: [0.45, 0, 0.55, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between ivory-bg text-stone-800 overflow-hidden"
        >
          <div className="relative w-full max-w-md mx-auto h-full flex flex-col items-center justify-between pt-8 sm:pt-10">
            <CornerFloral position="top-left" className="opacity-75" />
            <CornerFloral position="top-right" className="opacity-75" />

            {/* Top & Center Content (Video 00:03 - 00:09) */}
            <motion.div
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.5 } }}
              className="relative z-10 flex flex-col items-center text-center px-6 my-auto"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.4, y: -15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-xs sm:text-sm uppercase tracking-[0.22em] text-stone-700 font-semibold mb-5"
              >
                THE WEDDING OF
              </motion.p>

              {/* Oval Couple Photo in Gold Ring (Zoom-in from small like Video 00:06) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mb-5"
              >
                <GoldOvalPortrait
                  src={weddingData.coverPhoto}
                  alt={`${weddingData.bride.nickname} & ${weddingData.groom.nickname}`}
                />
              </motion.div>

              {/* Couple Script Names in Dusty Blue */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.4, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-script text-4xl sm:text-5xl text-wedding-blue-dark tracking-wide my-1 drop-shadow-sm"
              >
                {weddingData.bride.nickname} &amp; {weddingData.groom.nickname}
              </motion.h1>

              {/* Guest Addressing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.45, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 flex flex-col items-center"
              >
                <p className="font-sans text-xs sm:text-sm text-stone-600 font-normal">
                  Kepada Bapak/Ibu/Saudara/i
                </p>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mt-1 mb-4 capitalize px-4">
                  {guestName}
                </h2>

                {/* Dusty Blue Pill Button: BUKA UNDANGAN */}
                <button
                  onClick={onOpen}
                  className="inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-wedding-blue hover:bg-wedding-blue-dark text-white font-sans font-semibold text-xs tracking-[0.15em] uppercase shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 animate-shimmer border border-white/40"
                >
                  <MailOpen className="w-3.5 h-3.5" />
                  <span>BUKA UNDANGAN</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Bottom Blue Peony & Cream Rose Realistic Watercolor Bouquet */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="w-full relative z-10 -mb-1"
            >
              <BottomFloralBouquet />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
