'use client';

import { weddingData } from '@/data/weddingData';
import { CornerFloral, BackgroundWatermark } from './FloralOrnaments';
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
      <BackgroundWatermark />

      <div className="max-w-md mx-auto text-center relative z-10">
        {/* Love Story Script Header */}
        <AnimateReveal variant="zoom" scale={0.2} duration={0.95} className="mb-6">
          <h2 className="font-script text-4xl sm:text-5xl text-wedding-blue drop-shadow-sm">
            Love Story
          </h2>
        </AnimateReveal>

        {/* Rounded Couple Photo Banner */}
        <AnimateReveal variant="zoom" scale={0.22} duration={1.0} className="mb-8">
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-wedding-gold/50 bg-[#fffdf9] p-1.5">
            <img
              src={storyPhoto}
              alt="Love Story Yana & Yuzlan"
              className="w-full h-56 sm:h-64 object-cover object-center rounded-xl"
            />
          </div>
        </AnimateReveal>

        {/* Centered Story Chapters Zooming In */}
        <div className="space-y-6 px-2">
          {story.map((item, index) => (
            <AnimateReveal
              key={item.title}
              variant="zoom"
              scale={0.22}
              delay={index * 0.08}
              duration={0.95}
            >
              <div className="text-center">
                <h3 className="font-serif text-base sm:text-lg font-bold text-wedding-blue tracking-wide">
                  {item.title}
                  {item.date && item.date !== '-' ? ` (${item.date})` : ''}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-700 font-normal leading-relaxed mt-1.5">
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
