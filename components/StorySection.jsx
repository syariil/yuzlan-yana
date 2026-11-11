'use client';

import { motion } from 'framer-motion';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function StorySection() {
  const { holyVerse, storyPhoto, story } = weddingData;

  return (
    <section className="py-20 px-6 bg-wedding-dark text-white relative z-10">
      <div className="max-w-md mx-auto text-center">
        {/* Holy Verse (QS Ar-Rum 21) */}
        <AnimateReveal y={25} duration={0.7} className="mb-12">
          <p className="font-sans text-xs sm:text-sm text-gray-200 italic leading-relaxed px-4 mb-4 drop-shadow-sm">
            "{holyVerse.translation}"
          </p>
          <span className="text-xs uppercase tracking-widest text-wedding-gold font-semibold">
            — {holyVerse.surah} —
          </span>
        </AnimateReveal>

        {/* Photo Intermezzo */}
        <AnimateReveal y={35} duration={0.8} scale={0.96} className="mb-14">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-wedding-gold/30 group">
            <img
              src={storyPhoto}
              alt="Romantic Couple"
              className="w-full h-64 object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </AnimateReveal>

        {/* Our Story Header */}
        <AnimateReveal y={25} duration={0.65} className="mb-10">
          <h2 className="font-script text-4xl sm:text-5xl text-wedding-gold drop-shadow-sm">
            Our Story
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[1px] w-8 bg-wedding-gold/40" />
            <span className="text-xs text-wedding-gold">✦</span>
            <div className="h-[1px] w-8 bg-wedding-gold/40" />
          </div>
        </AnimateReveal>

        {/* Story Cards - With Numbered Badges & Double Gold Borders */}
        <div className="space-y-6">
          {story.map((item, index) => (
            <AnimateReveal
              key={item.title}
              y={30}
              delay={index * 0.12}
              duration={0.65}
            >
              <div className="luxury-card-dark double-gold-border rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-wedding-gold/50 relative overflow-hidden">
                {/* Step number badge */}
                <span className="inline-block px-3 py-0.5 rounded-full bg-wedding-gold/15 text-wedding-gold text-[10px] font-bold tracking-widest uppercase mb-2 border border-wedding-gold/30">
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
          ))}
        </div>
      </div>
    </section>
  );
}
