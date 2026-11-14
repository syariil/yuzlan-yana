'use client';

import { weddingData } from '@/data/weddingData';
import { CornerFloral } from './FloralOrnaments';
import AnimateReveal from './AnimateReveal';

export default function StorySection() {
  const { storyPhoto, story } = weddingData;

  return (
    <section
      id="story"
      className="py-16 px-6 ivory-bg text-stone-800 relative z-10 overflow-hidden"
    >
      {/* Corner Floral Ornaments (Video 00:45 - 00:49) */}
      <CornerFloral position="top-left" />
      <CornerFloral position="top-right" />
      <CornerFloral position="bottom-left" />
      <CornerFloral position="bottom-right" />

      <div className="max-w-md mx-auto text-center relative z-10">
        {/* Love Story Script Header */}
        <AnimateReveal y={25} duration={0.65} className="mb-6">
          <h2 className="font-script text-4xl sm:text-5xl text-wedding-gold-dark drop-shadow-sm">
            Love Story
          </h2>
        </AnimateReveal>

        {/* Rounded Couple Photo Banner */}
        <AnimateReveal variant="scale" duration={0.8} className="mb-8">
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-wedding-gold/40 bg-white p-1.5">
            <img
              src={storyPhoto}
              alt="Love Story Yana & Yuzlan"
              className="w-full h-56 sm:h-64 object-cover object-center rounded-xl"
            />
          </div>
        </AnimateReveal>

        {/* Centered Story Chapters */}
        <div className="space-y-6 px-2">
          {story.map((item, index) => (
            <AnimateReveal
              key={item.title}
              y={25}
              delay={index * 0.1}
              duration={0.65}
            >
              <div className="text-center">
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-800 tracking-wide">
                  {item.title}
                  {item.date && item.date !== '-' ? ` (${item.date})` : ''}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mt-1.5">
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
