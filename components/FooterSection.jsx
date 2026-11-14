'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Share2, Check, MessageCircle, ArrowUp } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function FooterSection() {
  const { bride, groom, music } = weddingData;
  const [copied, setCopied] = useState(false);

  const shareToWhatsApp = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(
      `Undangan Pernikahan ${bride.nickname} & ${groom.nickname}\nSilakan buka tautan berikut:\n${url}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const copyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-20 px-6 bg-wedding-darker text-white text-center pb-36 relative overflow-hidden">
      {/* Decorative Gold Flourish */}
      <div className="max-w-md mx-auto">
        <AnimateReveal y={30} duration={0.8}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-12 bg-wedding-gold/50" />
            <span className="text-xs text-wedding-gold">❖</span>
            <div className="h-[1px] w-12 bg-wedding-gold/50" />
          </div>

          {/* Couple Names */}
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-white mb-4 gold-glow">
            {bride.nickname} & {groom.nickname}
          </h2>


          {/* Now Playing Footer Pill */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-dark text-xs text-gray-300 border border-wedding-gold/30 shadow-md mb-8">
            <Music className="w-3.5 h-3.5 text-wedding-gold animate-pulse" />
            <span className="font-light">
              {music.title} — {music.artist}
            </span>
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-wedding-gold hover:text-white transition-colors py-2 px-4 rounded-full hover:bg-white/5"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Kembali ke Atas</span>
            </button>
          </div>

          <p className="text-[12px] text-gray-500 mt-8 tracking-widest">
            <a href='https://www.instagram.com/@syahrii_l' target='_blank' rel='noopener noreferrer'>© {new Date().getFullYear()} Develop With ❤️ By <a href='https://www.instagram.com/syahrii_l' target='_blank' rel='noopener noreferrer'>@syahrii_l</a></a>
          </p>
        </AnimateReveal>
      </div>
    </footer>
  );
}
