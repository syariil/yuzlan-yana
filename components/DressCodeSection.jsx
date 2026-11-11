'use client';

import { motion } from 'framer-motion';
import { Shirt } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function DressCodeSection() {
  const { dressCode } = weddingData;

  return (
    <section className="py-16 px-6 bg-wedding-cream text-stone-800">
      <div className="max-w-md mx-auto">
        <AnimateReveal y={30} duration={0.7}>
          <div className="luxury-card-light double-gold-border rounded-[32px] p-7 text-center">
            {/* Dress Code Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wedding-gold/15 text-stone-800 mb-3 border border-wedding-gold/30">
              <svg
                className="w-6 h-6 stroke-current fill-none stroke-[1.5] text-stone-800"
                viewBox="0 0 24 24"
              >
                <path d="M12 4a3 3 0 0 1 3 3c0 1.5-1.5 2.5-3 3.5-6 4-9 6-9 8h18c0-2-3-4-9-8" />
              </svg>
            </div>

            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              Dress Code
            </h2>

            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-[1px] w-8 bg-wedding-gold/50" />
              <span className="text-[10px] text-wedding-gold">❖</span>
              <div className="h-[1px] w-8 bg-wedding-gold/50" />
            </div>

            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-xs mx-auto mb-7">
              {dressCode.description}
            </p>

            {/* Color Swatches */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {dressCode.colors.map((color, idx) => (
                <motion.div
                  key={color.name}
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + idx * 0.07 }}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-full shadow-md border-2 border-stone-200 group-hover:scale-110 group-hover:border-wedding-gold group-hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] text-stone-600 font-medium tracking-tight">
                    {color.name}
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
