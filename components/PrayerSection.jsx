'use client';

import { weddingData } from '@/data/weddingData';
import { CornerFloral, BackgroundWatermark } from './FloralOrnaments';
import AnimateReveal from './AnimateReveal';

export default function PrayerSection() {
  const { prayer } = weddingData;

  return (
    <section className="py-12 px-5 royal-blue-bg text-stone-800 text-center relative z-10 overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        <div className="royal-white-card rounded-[38px] p-7 sm:p-8 text-center relative overflow-hidden">
          <CornerFloral position="top-left" />
          <CornerFloral position="top-right" />
          <CornerFloral position="bottom-left" />
          <CornerFloral position="bottom-right" />
          <BackgroundWatermark />

          <div className="relative z-10">
            <AnimateReveal variant="zoom" scale={0.2} duration={0.95}>
              <h3 className="font-script text-4xl sm:text-5xl text-wedding-blue mb-4">
                Doa Pengantin
              </h3>
            </AnimateReveal>

            <AnimateReveal variant="zoom" scale={0.22} duration={0.95} delay={0.08}>
              <p className="font-arabic text-2xl sm:text-3xl text-stone-800 leading-relaxed mb-3">
                {prayer.arabic}
              </p>

              <p className="font-sans text-xs text-wedding-blue italic mb-3 font-medium">
                {prayer.latin}
              </p>

              <div className="h-[1px] w-14 bg-wedding-gold/50 mx-auto my-3" />

              <p className="font-sans text-xs sm:text-sm text-stone-700 font-normal leading-relaxed px-2">
                &ldquo;{prayer.translation}&rdquo;
              </p>
            </AnimateReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
