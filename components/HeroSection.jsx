'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between text-white text-center px-6 overflow-hidden bg-wedding-darker"
    >
      {/* Background Image with slow gentle zoom */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.03 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.68]"
        style={{ backgroundImage: `url(${weddingData.heroPhoto})` }}
      />

      {/* Multi-layer Gradient: Radial vignette + Linear fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-wedding-darker" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Floating subtle sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span
          className="particle w-2 h-2 top-1/5 left-1/4"
          style={{ animation: 'float-particle 6s ease-in-out infinite' }}
        />
        <span
          className="particle w-2.5 h-2.5 top-1/2 right-1/4"
          style={{ animation: 'float-particle 7s ease-in-out 1s infinite' }}
        />
      </div>

      {/* Top Decor - The Wedding of */}
      <div className="relative z-10 pt-20">
        <AnimateReveal delay={0.2} y={25}>
          <p className="font-script text-3xl sm:text-4xl text-wedding-gold drop-shadow-md">
            The Wedding of
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[1px] w-8 bg-wedding-gold/50" />
            <span className="text-[10px] text-wedding-gold">❖</span>
            <div className="h-[1px] w-8 bg-wedding-gold/50" />
          </div>
        </AnimateReveal>
      </div>

      {/* Main Couple Names */}
      <div className="relative z-10 my-auto py-8">
        <AnimateReveal delay={0.4} y={35} duration={0.85}>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide text-white drop-shadow-xl gold-glow">
            {weddingData.bride.nickname} & {weddingData.groom.nickname}
          </h1>
        </AnimateReveal>

        <AnimateReveal delay={0.55} y={25}>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-[1px] w-12 bg-wedding-gold/60" />
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-wedding-gold-light font-semibold">
              {weddingData.weddingDateDisplay}
            </p>
            <div className="h-[1px] w-12 bg-wedding-gold/60" />
          </div>
        </AnimateReveal>
      </div>

      {/* Scroll Down Indicator */}
      <AnimateReveal delay={0.7} y={20}>
        <div className="relative z-10 pb-16 flex flex-col items-center gap-2 text-gray-300">
          <span className="text-[10px] uppercase tracking-widest text-wedding-gold-light font-medium">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full border border-wedding-gold/40 flex items-center justify-center bg-black/30 backdrop-blur-sm shadow-md"
          >
            <ChevronDown className="w-4 h-4 text-wedding-gold" />
          </motion.div>
        </div>
      </AnimateReveal>
    </section>
  );
}
