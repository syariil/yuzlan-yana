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

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-xs mx-auto mb-10 px-2">
            Suatu kebahagiaan & kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i
            berkenan hadir dan memberikan do'a restu kepada kami.
          </p>

          {/* Social Share Buttons */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              onClick={shareToWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share WhatsApp</span>
            </button>

            <button
              onClick={copyLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all border border-wedding-gold/40 active:scale-95 shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-wedding-gold" />
                  <span>Salin Link</span>
                </>
              )}
            </button>
          </div>

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

          <p className="text-[10px] text-gray-500 mt-8 tracking-widest uppercase">
            © {new Date().getFullYear()} {bride.nickname} & {groom.nickname} Wedding Invitation
          </p>
        </AnimateReveal>
      </div>
    </footer>
  );
}
