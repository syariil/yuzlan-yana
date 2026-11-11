'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Sparkles } from 'lucide-react';
import { weddingData } from '@/data/weddingData';

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
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.95, ease: [0.45, 0, 0.55, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between text-white overflow-hidden bg-wedding-darker"
        >
          {/* Background Image with Dark Romantic Tint */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 filter brightness-[0.72]"
            style={{ backgroundImage: `url(${weddingData.coverPhoto})` }}
          />

          {/* Gradients Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

          {/* Floating Golden Ambient Sparkles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <span
              className="particle w-2.5 h-2.5 top-1/4 left-1/5"
              style={{ animation: 'float-particle 5s ease-in-out infinite' }}
            />
            <span
              className="particle w-2 h-2 top-1/3 right-1/4"
              style={{ animation: 'float-particle 6s ease-in-out 1s infinite' }}
            />
            <span
              className="particle w-3 h-3 bottom-1/3 left-1/6"
              style={{ animation: 'float-particle 7s ease-in-out 2s infinite' }}
            />
            <span
              className="particle w-2 h-2 top-2/3 right-1/5"
              style={{ animation: 'float-particle 5.5s ease-in-out 1.5s infinite' }}
            />
          </div>

          {/* Top Header */}
          <div className="relative z-10 pt-14 sm:pt-16 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="font-script text-3xl sm:text-4xl text-wedding-gold tracking-wider drop-shadow">
                The Wedding of
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide mt-2 gold-glow">
                {weddingData.bride.nickname} & {weddingData.groom.nickname}
              </h1>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-[1px] w-8 bg-wedding-gold/50" />
                <span className="text-[10px] text-wedding-gold">❖</span>
                <div className="h-[1px] w-8 bg-wedding-gold/50" />
              </div>
            </motion.div>
          </div>

          {/* Center Card - Guest Info */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-[88%] max-w-sm rounded-[28px] p-7 text-center glass-dark double-gold-border shadow-2xl border border-wedding-gold/30"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-wedding-gold-light mb-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
              <span>Kepada Yth. Bapak/Ibu/Saudara/i</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white my-3 capitalize break-words leading-tight">
              {guestName}
            </h2>

            <p className="text-[11px] text-gray-300 italic mb-6">
              *Mohon maaf apabila ada kesalahan penulisan nama/gelar
            </p>

            {/* Pulsing button wrapper */}
            <div className="relative group inline-block w-full">
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-wedding-gold/60 to-wedding-gold-light/60 blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <button
                onClick={onOpen}
                className="relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-wedding-darker font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:bg-wedding-gold hover:text-white transition-all duration-300 transform active:scale-95 animate-shimmer"
              >
                <MailOpen className="w-4 h-4 text-wedding-gold group-hover:text-white transition-colors" />
                <span>Buka Undangan</span>
              </button>
            </div>
          </motion.div>

          {/* Bottom Spacing */}
          <div className="relative z-10 pb-8 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium">
              {weddingData.weddingDateDisplay}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
