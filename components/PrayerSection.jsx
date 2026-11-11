'use client';

import { motion } from 'framer-motion';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function PrayerSection() {
  const { prayer, invitedBy } = weddingData;

  return (
    <section className="py-20 px-6 bg-wedding-dark text-white text-center relative z-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-wedding-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10">
        {/* Doa Untuk Pengantin Card */}
        <AnimateReveal y={35} duration={0.7} scale={0.97} className="mb-12">
          <div className="luxury-card-dark double-gold-border rounded-[32px] p-7 sm:p-8 text-center transition-all duration-300 hover:border-wedding-gold/60 shadow-xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-wedding-gold/15 text-wedding-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-5 border border-wedding-gold/30">
              DOA RESTU
            </span>

            <h3 className="font-serif text-2xl font-bold tracking-wide text-white mb-6">
              Doa Untuk Pengantin
            </h3>

            <p className="font-arabic text-2xl sm:text-3xl text-wedding-gold-light leading-relaxed mb-4 drop-shadow-sm">
              {prayer.arabic}
            </p>

            <p className="font-sans text-xs sm:text-sm text-gray-300 italic mb-4 font-light">
              {prayer.latin}
            </p>

            <div className="h-[1px] w-12 bg-wedding-gold/40 mx-auto my-4" />

            <p className="font-sans text-xs sm:text-sm text-gray-200 font-light leading-relaxed px-2">
              "{prayer.translation}"
            </p>
          </div>
        </AnimateReveal>

        {/* Turut Mengundang Card */}
        <AnimateReveal y={35} duration={0.7} delay={0.12} scale={0.97}>
          <div className="luxury-card-dark double-gold-border rounded-[32px] p-7 sm:p-8 text-center transition-all duration-300 hover:border-wedding-gold/60 shadow-xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-wedding-gold/15 text-wedding-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-4 border border-wedding-gold/30">
              KELUARGA BESAR
            </span>

            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white mb-3">
              Turut Mengundang
            </h3>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-[1px] w-8 bg-wedding-gold/40" />
              <span className="text-[10px] text-wedding-gold">❖</span>
              <div className="h-[1px] w-8 bg-wedding-gold/40" />
            </div>

            {/* Structured 2-column or neat card list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
              {invitedBy.map((name, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + i * 0.03, duration: 0.35 }}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 hover:border-wedding-gold/30 transition-colors"
                >
                  <span className="text-wedding-gold text-[10px] shrink-0">❖</span>
                  <span className="text-xs text-gray-200 font-light truncate">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimateReveal>
      </div>
    </section>
  );
}
