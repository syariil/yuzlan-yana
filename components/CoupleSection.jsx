'use client';

import { motion } from 'framer-motion';
import { Instagram, Sparkles } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function CoupleSection() {
  const { bride, groom, basmalah, openingGreeting } = weddingData;

  return (
    <section id="couple" className="py-20 px-6 bg-wedding-cream text-stone-800 relative z-10 overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-wedding-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md mx-auto text-center relative z-10">
        {/* Basmalah & Salam Pembuka */}
        <AnimateReveal y={25} duration={0.7} className="mb-14">
          <p className="font-arabic text-2xl sm:text-3xl text-stone-900 leading-relaxed mb-4 drop-shadow-sm">
            {basmalah}
          </p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 bg-wedding-gold/50" />
            <span className="text-[10px] text-wedding-gold">❖</span>
            <div className="h-[1px] w-8 bg-wedding-gold/50" />
          </div>
          <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-light px-3">
            {openingGreeting}
          </p>
        </AnimateReveal>

        {/* Mempelai Wanita (Bride) */}
        <AnimateReveal y={35} duration={0.75} delay={0.1} scale={0.97} className="mb-12">
          <div className="luxury-card-light double-gold-border rounded-[36px] p-6 sm:p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* The Bride Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wedding-gold/15 text-wedding-gold-dark text-[10px] font-bold tracking-[0.2em] uppercase mb-5 border border-wedding-gold/30">
              <Sparkles className="w-3 h-3 text-wedding-gold" />
              <span>THE BRIDE</span>
            </div>

            {/* Foto Arch Dome Frame with Double Gold Ring Offset */}
            <div className="relative w-full aspect-[4/5] arch-photo-frame overflow-hidden mb-6 shadow-lg border-2 border-wedding-gold/40 ring-2 ring-wedding-gold/20 ring-offset-4 ring-offset-white group">
              <img
                src={bride.photo}
                alt={bride.fullName}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <p className="font-script text-3xl sm:text-4xl text-wedding-gold-dark mb-1">
              {bride.nickname}
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-wide">
              {bride.fullName}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light mb-6 px-2">
              {bride.parents}
            </p>

            <a
              href={bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-wedding-gold-dark hover:text-white transition-all duration-300 shadow-md active:scale-95 border border-wedding-gold/30"
            >
              <Instagram className="w-3.5 h-3.5 text-wedding-gold" />
              <span>@{bride.nickname.toLowerCase()}</span>
            </a>
          </div>
        </AnimateReveal>

        {/* Divider & Simbol Cinta */}
        <AnimateReveal y={15} duration={0.5}>
          <div className="my-6 flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-wedding-gold/60" />
            <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-wedding-gold/40 flex items-center justify-center">
              <span className="font-script text-2xl text-wedding-gold leading-none">&</span>
            </div>
            <div className="h-[1px] w-12 bg-wedding-gold/60" />
          </div>
        </AnimateReveal>

        {/* Mempelai Pria (Groom) */}
        <AnimateReveal y={35} duration={0.75} delay={0.15} scale={0.97}>
          <div className="luxury-card-light double-gold-border rounded-[36px] p-6 sm:p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* The Groom Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wedding-gold/15 text-wedding-gold-dark text-[10px] font-bold tracking-[0.2em] uppercase mb-5 border border-wedding-gold/30">
              <Sparkles className="w-3 h-3 text-wedding-gold" />
              <span>THE GROOM</span>
            </div>

            {/* Foto Arch Dome Frame with Double Gold Ring Offset */}
            <div className="relative w-full aspect-[4/5] arch-photo-frame overflow-hidden mb-6 shadow-lg border-2 border-wedding-gold/40 ring-2 ring-wedding-gold/20 ring-offset-4 ring-offset-white group">
              <img
                src={groom.photo}
                alt={groom.fullName}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <p className="font-script text-3xl sm:text-4xl text-wedding-gold-dark mb-1">
              {groom.nickname}
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-wide">
              {groom.fullName}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light mb-6 px-2">
              {groom.parents}
            </p>

            <a
              href={groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-wedding-gold-dark hover:text-white transition-all duration-300 shadow-md active:scale-95 border border-wedding-gold/30"
            >
              <Instagram className="w-3.5 h-3.5 text-wedding-gold" />
              <span>@{groom.nickname.toLowerCase()}</span>
            </a>
          </div>
        </AnimateReveal>
      </div>
    </section>
  );
}
