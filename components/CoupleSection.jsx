'use client';

import { Instagram } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import {
  CastleIllustration,
  OvalFloralFrame,
  FlyingBirds,
  CornerFloral,
} from './FloralOrnaments';
import AnimateReveal from './AnimateReveal';

export default function CoupleSection() {
  const { bride, groom, openingGreeting, holyVerse } = weddingData;

  return (
    <section
      id="couple"
      className="py-16 px-6 ivory-bg text-stone-800 relative z-10 overflow-hidden"
    >
      <CornerFloral position="top-left" className="opacity-70" />
      <CornerFloral position="top-right" className="opacity-70" />

      <div className="max-w-md mx-auto relative z-10">
        {/* Slide Bagian 1: Small Castle, WITH LOVE & QS Ar-Rum: 21 (Video 00:30 - 00:33) */}
        <div className="text-center mb-14 pt-2">
          <AnimateReveal variant="zoom" scale={0.25} duration={0.9}>
            <CastleIllustration size="small" className="-mb-3" />
          </AnimateReveal>

          <AnimateReveal variant="zoom" scale={0.35} duration={0.85} delay={0.1}>
            <h2 className="font-serif text-lg sm:text-xl tracking-[0.22em] uppercase text-stone-800 font-semibold mb-5">
              WITH LOVE
            </h2>
          </AnimateReveal>

          <AnimateReveal variant="zoom" scale={0.3} duration={0.9} delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal px-2 mb-3">
              &ldquo;{holyVerse.translation}&rdquo;
            </p>
            <p className="font-serif text-xs sm:text-sm font-semibold text-stone-700 mb-8">
              ({holyVerse.surah})
            </p>
          </AnimateReveal>

          <AnimateReveal variant="zoom" scale={0.3} duration={0.9} delay={0.2}>
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed px-3">
              {openingGreeting}
            </p>
          </AnimateReveal>
        </div>

        {/* Slide Bagian 2: Mempelai Wanita — Bingkai Oval di Kanan, Teks di Kiri (Video 00:34 - 00:37) */}
        <div className="mb-6">
          {/* Foto Oval Mempelai Wanita di sisi kanan dengan bunga di lengkung kiri-bawah */}
          <AnimateReveal
            variant="right"
            x={75}
            duration={0.9}
            className="flex justify-end pr-2 sm:pr-4"
          >
            <OvalFloralFrame
              src={bride.photo}
              alt={bride.fullName}
              flowerSide="left"
            />
          </AnimateReveal>

          {/* Nama & Orang Tua Mempelai Wanita rata kiri */}
          <AnimateReveal
            variant="left"
            x={65}
            duration={0.85}
            delay={0.1}
            className="flex flex-col items-start text-left mt-5 pl-1"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-wedding-gold-dark font-normal tracking-wide mb-2">
              {bride.fullName}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-stone-600 font-normal max-w-[260px] leading-relaxed mb-3.5">
              {bride.parents}
            </p>

            <a
              href={bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${bride.fullName}`}
              className="w-9 h-9 rounded-full bg-wedding-gold hover:bg-wedding-gold-dark text-white flex items-center justify-center shadow-md transition-all duration-300 active:scale-95"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </AnimateReveal>
        </div>

        {/* Divider & Flying Birds (Video 00:37) */}
        <AnimateReveal
          variant="zoom"
          scale={0.3}
          duration={0.75}
          className="relative py-5 my-2 text-center"
        >
          <FlyingBirds />
          <span className="font-script text-4xl sm:text-5xl text-stone-800 select-none">
            &amp;
          </span>
        </AnimateReveal>

        {/* Slide Bagian 3: Mempelai Pria — Bingkai Oval di Kiri, Teks di Kanan (Video 00:38 - 00:39) */}
        <div className="mt-2">
          {/* Foto Oval Mempelai Pria di sisi kiri dengan bunga di lengkung kanan-bawah */}
          <AnimateReveal
            variant="left"
            x={75}
            duration={0.9}
            className="flex justify-start pl-2 sm:pl-4"
          >
            <OvalFloralFrame
              src={groom.photo}
              alt={groom.fullName}
              flowerSide="right"
            />
          </AnimateReveal>

          {/* Nama & Orang Tua Mempelai Pria rata kanan */}
          <AnimateReveal
            variant="right"
            x={65}
            duration={0.85}
            delay={0.1}
            className="flex flex-col items-end text-right mt-5 pr-1"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-wedding-gold-dark font-normal tracking-wide mb-2">
              {groom.fullName}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-stone-600 font-normal max-w-[260px] leading-relaxed mb-3.5">
              {groom.parents}
            </p>

            <a
              href={groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${groom.fullName}`}
              className="w-9 h-9 rounded-full bg-wedding-gold hover:bg-wedding-gold-dark text-white flex items-center justify-center shadow-md transition-all duration-300 active:scale-95"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </AnimateReveal>
        </div>
      </div>
    </section>
  );
}
