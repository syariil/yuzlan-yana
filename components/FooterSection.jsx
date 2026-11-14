'use client';

import { Instagram, MessageCircle } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import {
  BottomFloralBouquet,
  CornerFloral,
  GoldOvalPortrait,
} from './FloralOrnaments';
import AnimateReveal from './AnimateReveal';

export default function FooterSection() {
  const { bride, groom, coverPhoto } = weddingData;

  return (
    <footer className="ivory-bg text-stone-800 text-center relative overflow-hidden flex flex-col justify-between">
      <CornerFloral position="top-left" className="opacity-80" />
      <CornerFloral position="top-right" className="opacity-80" />

      {/* Closing Section Content (Video 00:58 - 01:01) */}
      <div className="max-w-md mx-auto pt-14 px-6 relative z-10 flex flex-col items-center">
        {/* Oval Couple Photo Zooming In from Small (Video 00:58) */}
        <AnimateReveal
          variant="zoom"
          scale={0.25}
          duration={0.95}
          className="mb-6"
        >
          <GoldOvalPortrait
            src={coverPhoto}
            alt={`${bride.nickname} & ${groom.nickname}`}
          />
        </AnimateReveal>

        <AnimateReveal variant="zoom" scale={0.35} duration={0.85} delay={0.1}>
          <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xs mx-auto mb-5">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
            kehadiran dan doa restunya, kami mengucapkan terima kasih.
          </p>

          <p className="font-serif text-xs sm:text-sm font-semibold text-stone-700 mb-2">
            Kami yang berbahagia,
          </p>
        </AnimateReveal>

        <AnimateReveal variant="zoom" scale={0.35} duration={0.85} delay={0.18}>
          <h2 className="font-script text-4xl sm:text-5xl text-wedding-blue-dark tracking-wide my-1">
            {bride.nickname} &amp; {groom.nickname}
          </h2>
        </AnimateReveal>
      </div>

      {/* Bottom Floral Bouquet */}
      <div className="w-full relative z-10 mt-2 -mb-1">
        <BottomFloralBouquet />
      </div>

      {/* Dusty Blue Credit Footer Bar (Video 01:01 - 01:02) — Zero nested <a> tags */}
      <div className="royal-blue-bg text-white py-8 pb-28 px-6 relative z-20">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <p className="text-xs text-white/90 tracking-wide mb-3">
            Created with ❤️ by{' '}
            <a
              href="https://www.instagram.com/syahrii_l"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-wedding-gold-light transition-colors"
            >
              @syahrii_l
            </a>
          </p>

          <div className="flex items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/syahrii_l"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Creator"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${weddingData.gifts.physicalGift.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
