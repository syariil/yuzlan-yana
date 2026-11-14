'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

// Connector dots between story cards
function TimelineConnector({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      style={{ transformOrigin: 'top' }}
      className="flex flex-col items-center my-2"
    >
      <div className="w-[1px] h-6 bg-gradient-to-b from-wedding-gold/60 to-wedding-gold/20" />
      <span className="text-wedding-gold/60 text-[8px]">▼</span>
    </motion.div>
  );
}

export default function StorySection() {
  const { holyVerse, storyPhoto, story } = weddingData;

  return (
    <section className="py-20 px-6 bg-wedding-dark text-white relative z-10 overflow-hidden">
      <div className="max-w-md mx-auto text-center relative z-10">
        {/* Holy Verse (QS Ar-Rum 21) */}
        <AnimateReveal y={25} duration={0.7} className="mb-12">
          <div className="relative inline-block w-full">
            {/* Decorative quote marks */}
            <span className="absolute -top-4 -left-2 font-serif text-5xl text-wedding-gold/20 leading-none select-none">"</span>
            <p className="font-sans text-xs sm:text-sm text-gray-200 italic leading-relaxed px-6 mb-4 drop-shadow-sm relative z-10">
              {holyVerse.translation}
            </p>
            <span className="absolute -bottom-6 -right-2 font-serif text-5xl text-wedding-gold/20 leading-none select-none rotate-180">"</span>
          </div>
          <div className="mt-6">
            <span className="text-xs uppercase tracking-widest text-wedding-gold font-semibold">
              — {holyVerse.surah} —
            </span>
          </div>
        </AnimateReveal>

        {/* Photo Intermezzo */}
        <AnimateReveal variant="scale" duration={0.9} className="mb-14">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-wedding-gold/30 group relative">
            <img
              src={storyPhoto}
              alt="Romantic Couple"
              className="w-full h-64 object-cover object-center filter brightness-85 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Overlay gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Heart badge on image */}
            <motion.div
              className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-wedding-gold/40"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </motion.div>
          </div>
        </AnimateReveal>

        {/* Our Story Header */}
        <AnimateReveal y={25} duration={0.65} className="mb-8">
          <h2 className="font-script text-4xl sm:text-5xl text-wedding-gold drop-shadow-sm gold-glow">
            Our Story
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-[1px] bg-wedding-gold/50"
            />
            <span className="text-sm text-wedding-gold animate-heartbeat">♥</span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-[1px] bg-wedding-gold/50"
            />
          </div>
        </AnimateReveal>

        {/* Story Cards with Timeline Connector */}
        <div className="space-y-0">
          {story.map((item, index) => (
            <div key={item.title}>
              <AnimateReveal
                variant={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.15}
                duration={0.7}
              >
                <div className="luxury-card-dark double-gold-border rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 card-gold-glow relative overflow-hidden">
                  {/* Subtle background gradient accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-wedding-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  {/* Step number badge */}
                  <span className="inline-block px-3 py-0.5 rounded-full bg-wedding-gold/15 text-wedding-gold text-[10px] font-bold tracking-widest uppercase mb-3 border border-wedding-gold/30">
                    Part 0{index + 1}
                  </span>

                  <h3 className="font-serif text-lg tracking-wider font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-wedding-gold mb-3 font-medium">
                    {item.date}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimateReveal>

              {/* Timeline connector between cards */}
              {index < story.length - 1 && (
                <TimelineConnector delay={index * 0.15 + 0.3} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
