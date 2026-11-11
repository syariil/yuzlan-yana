'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const addToCalendar = () => {
    const title = encodeURIComponent(
      `Pernikahan ${weddingData.bride.nickname} & ${weddingData.groom.nickname}`
    );
    const details = encodeURIComponent(
      `Akad & Resepsi Pernikahan ${weddingData.bride.fullName} dan ${weddingData.groom.fullName}`
    );
    const location = encodeURIComponent(weddingData.events[0]?.address || 'Bogor');
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261231T010000Z/20261231T070000Z`;

    window.open(calendarUrl, '_blank');
  };

  return (
    <section className="py-20 px-6 bg-wedding-darker text-white text-center border-t border-white/5 relative z-10">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <AnimateReveal y={25} duration={0.65}>
          <h2 className="font-script text-3xl sm:text-4xl text-wedding-gold mb-3 drop-shadow-sm">
            Counting down to the big day
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-wedding-gold/40" />
            <span className="text-xs text-wedding-gold">❖</span>
            <div className="h-[1px] w-8 bg-wedding-gold/40" />
          </div>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-10 px-4">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
            Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia kami:
          </p>
        </AnimateReveal>

        {/* 4 Counter Boxes */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 mb-10">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <AnimateReveal
              key={item.label}
              y={25}
              delay={0.06 + idx * 0.06}
              duration={0.55}
              scale={0.94}
            >
              <div className="luxury-card-dark rounded-2xl py-4 px-1.5 flex flex-col items-center justify-center hover:-translate-y-1 hover:border-wedding-gold/60 transition-all duration-300 shadow-lg border border-wedding-gold/30">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-md text-wedding-gold-light">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">
                  {item.label}
                </span>
              </div>
            </AnimateReveal>
          ))}
        </div>

        {/* Add to Calendar Button */}
        <AnimateReveal y={20} delay={0.35} duration={0.65}>
          <button
            onClick={addToCalendar}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-wedding-gold/40 bg-white/10 hover:bg-wedding-gold hover:text-wedding-darker text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-xl group"
          >
            <CalendarPlus className="w-4 h-4 text-wedding-gold group-hover:text-wedding-darker transition-colors" />
            <span>Simpan ke Kalender</span>
          </button>
        </AnimateReveal>
      </div>
    </section>
  );
}
