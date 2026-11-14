'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [prevTime, setPrevTime] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const newTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        setPrevTime(timeLeft);
        setTimeLeft(newTime);
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

  const countItems = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6 bg-wedding-darker text-white text-center border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <AnimateReveal y={25} duration={0.65}>
          <h2 className="font-script text-3xl sm:text-4xl text-wedding-gold mb-3 drop-shadow-sm gold-glow">
            Counting down to the big day
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-wedding-gold/40" />
            <span className="text-xs text-wedding-gold animate-pulse">❖</span>
            <div className="h-[1px] w-8 bg-wedding-gold/40" />
          </div>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-10 px-4">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
            Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia kami:
          </p>
        </AnimateReveal>

        {/* 4 Counter Boxes — with flip-style number animation on 'Detik' */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 mb-10">
          {countItems.map((item, idx) => (
            <AnimateReveal
              key={item.label}
              variant="scale"
              delay={0.06 + idx * 0.08}
              duration={0.6}
            >
              <div className="luxury-card-dark rounded-2xl py-4 px-1.5 flex flex-col items-center justify-center transition-all duration-300 shadow-lg border border-wedding-gold/30 hover:border-wedding-gold/60 hover:-translate-y-1 card-gold-glow group">
                {/* Number — animated flip when value changes (seconds) */}
                <div className="relative overflow-hidden h-8 sm:h-10 flex items-center justify-center w-full">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={`${item.label}-${item.value}`}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="font-serif text-2xl sm:text-3xl font-bold text-wedding-gold-light drop-shadow-md absolute"
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-medium mt-1">
                  {item.label}
                </span>
                {/* Subtle bottom glow on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-wedding-gold/0 group-hover:bg-wedding-gold/40 rounded-full transition-all duration-300" />
              </div>
            </AnimateReveal>
          ))}
        </div>

        {/* Add to Calendar Button */}
        <AnimateReveal y={20} delay={0.5} duration={0.65}>
          <motion.button
            onClick={addToCalendar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-wedding-gold/50 bg-white/8 hover:bg-wedding-gold hover:text-wedding-darker text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl group"
          >
            <CalendarPlus className="w-4 h-4 text-wedding-gold group-hover:text-wedding-darker transition-colors" />
            <span>Simpan ke Kalender</span>
          </motion.button>
        </AnimateReveal>
      </div>
    </section>
  );
}
