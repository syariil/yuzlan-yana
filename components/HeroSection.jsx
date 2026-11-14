'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { weddingData } from '@/data/weddingData';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between text-white text-center px-6 overflow-hidden bg-wedding-darker"
    >
      {/* Background Image dengan overlay ringan */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${weddingData.heroPhoto})` }}
      />

      {/* Multi-layer Gradient overlay ringan */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-wedding-darker" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Top — The Wedding of */}
      <div className="relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <p className="font-script text-3xl sm:text-4xl text-wedding-gold drop-shadow-md">
            The Wedding of
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[1px] w-10 bg-wedding-gold/60" />
            <span className="text-[10px] text-wedding-gold">❖</span>
            <div className="h-[1px] w-10 bg-wedding-gold/60" />
          </div>
        </motion.div>
      </div>

      {/* Main Couple Names */}
      <div className="relative z-10 my-auto py-8">
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide text-white drop-shadow-xl gold-glow"
        >
          {weddingData.bride.nickname} & {weddingData.groom.nickname}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="flex items-center justify-center gap-3 mt-6"
        >
          <div className="h-[1px] w-12 bg-wedding-gold/60" />
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-wedding-gold-light font-semibold">
            {weddingData.weddingDateDisplay}
          </p>
          <div className="h-[1px] w-12 bg-wedding-gold/60" />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 pb-16 flex flex-col items-center gap-2 text-gray-300"
      >
        <span className="text-[10px] uppercase tracking-widest text-wedding-gold-light font-medium">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-9 h-9 rounded-full border border-wedding-gold/40 flex items-center justify-center bg-black/30 backdrop-blur-sm shadow-md"
        >
          <ChevronDown className="w-4 h-4 text-wedding-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
