'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Copy, Check, CalendarPlus } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import { CastleIllustration, BottomFloralBouquet } from './FloralOrnaments';
import AnimateReveal from './AnimateReveal';

export default function EventsSection() {
  const { events, heroPhoto, weddingDate } = weddingData;
  const [copiedId, setCopiedId] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingDate).getTime();

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
  }, [weddingDate]);

  const copyAddress = (address, id) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const addToCalendar = () => {
    const title = encodeURIComponent(
      `Pernikahan ${weddingData.bride.nickname} & ${weddingData.groom.nickname}`
    );
    const details = encodeURIComponent(
      `Akad & Resepsi Pernikahan ${weddingData.bride.fullName} dan ${weddingData.groom.fullName}`
    );
    const location = encodeURIComponent(events[0]?.address || 'Bau-Bau');
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261208T000000Z/20261208T060000Z`;

    window.open(calendarUrl, '_blank');
  };

  const countItems = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section
      id="events"
      className="royal-blue-bg text-stone-800 pb-16 relative z-10 overflow-hidden"
    >
      {/* Top Photo Banner with "Save The Date" (Video 00:40 - 00:41) */}
      <div className="relative w-full h-72 sm:h-80 overflow-hidden">
        <img
          src={heroPhoto}
          alt="Save The Date Banner"
          className="w-full h-full object-cover object-center filter brightness-[0.68]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-[#7492b3]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8 text-center">
          <AnimateReveal variant="zoom" scale={0.35} duration={0.85}>
            <h2 className="font-script text-4xl sm:text-5xl text-white drop-shadow-md">
              Save The Date
            </h2>
          </AnimateReveal>
        </div>
      </div>

      {/* 4 Countdown Boxes Overlapping Photo Banner & Dusty Blue Section */}
      <div className="max-w-md mx-auto px-5 -mt-12 relative z-20">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-5">
          {countItems.map((item, idx) => (
            <AnimateReveal
              key={item.label}
              variant="zoom"
              scale={0.35}
              delay={0.05 + idx * 0.08}
              duration={0.75}
            >
              <div className="bg-[#fcfbf9] rounded-xl py-3 px-1.5 flex flex-col items-center justify-center shadow-lg border border-wedding-gold/40">
                <div className="relative overflow-hidden h-7 sm:h-8 flex items-center justify-center w-full">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={`${item.label}-${item.value}`}
                      initial={{ y: -16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 16, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="font-serif text-xl sm:text-2xl font-bold text-stone-800 absolute"
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] text-stone-600 font-medium mt-0.5">
                  {item.label}
                </span>
              </div>
            </AnimateReveal>
          ))}
        </div>

        {/* Greeting Text & Save to Calendar on Dusty Blue Background (Video 00:41 - 00:42) */}
        <AnimateReveal
          variant="zoom"
          scale={0.4}
          duration={0.85}
          className="text-center mb-6 px-3"
        >
          <p className="font-sans text-xs text-white/95 leading-relaxed mb-3">
            Dan kami bersyukur, dipertemukan Allah di waktu terbaik. Kini kami
            menanti hari istimewa kami.
          </p>
          <button
            onClick={addToCalendar}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold tracking-wider uppercase border border-white/40 transition-all active:scale-95"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>Simpan ke Kalender</span>
          </button>
        </AnimateReveal>

        {/* White Arch Card Inside Dusty Blue Section (Video 00:41 - 00:44) */}
        <div className="royal-white-card rounded-[38px] pt-8 text-center relative overflow-hidden">
          {/* Small Castle Illustration Zooming In at Top of Card */}
          <AnimateReveal variant="zoom" scale={0.25} duration={0.9}>
            <CastleIllustration size="small" className="-mb-2" />
          </AnimateReveal>

          {/* Events List (Akad Nikah & Resepsi) — Each zooming in like Video 00:41-00:43 */}
          <div className="px-6 space-y-8 pb-6 relative z-10">
            {events.map((event, index) => (
              <div key={event.id}>
                {index > 0 && (
                  <div className="flex items-center justify-center gap-3 mb-7">
                    <div className="h-[1px] w-14 bg-wedding-gold/40" />
                    <span className="text-xs text-wedding-gold">❖</span>
                    <div className="h-[1px] w-14 bg-wedding-gold/40" />
                  </div>
                )}

                <AnimateReveal
                  variant="zoom"
                  scale={0.35}
                  duration={0.85}
                  delay={0.05}
                >
                  <h3 className="font-script text-4xl sm:text-5xl text-wedding-gold-dark mb-2">
                    {event.name}
                  </h3>
                </AnimateReveal>

                <AnimateReveal
                  variant="zoom"
                  scale={0.35}
                  duration={0.85}
                  delay={0.12}
                >
                  <p className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800">
                    {event.date}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-stone-600 font-medium mt-0.5 mb-3">
                    Pukul : {event.time}
                  </p>

                  <p className="font-sans text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
                    Tempat : {event.venue}
                  </p>
                  <p className="font-sans text-xs text-stone-600 font-normal leading-relaxed max-w-xs mx-auto mb-4 px-1">
                    {event.address}
                  </p>

                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <a
                      href={event.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-wedding-blue hover:bg-wedding-blue-dark text-white text-xs font-semibold shadow-md transition-all duration-300 active:scale-95"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>

                    <button
                      onClick={() => copyAddress(event.address, event.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-all border border-stone-200 active:scale-95"
                    >
                      {copiedId === event.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">
                            Tersalin!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Salin Alamat</span>
                        </>
                      )}
                    </button>
                  </div>
                </AnimateReveal>
              </div>
            ))}
          </div>

          {/* Bottom Floral Bouquet Inside the White Arch Card */}
          <div className="w-full -mb-1">
            <BottomFloralBouquet />
          </div>
        </div>
      </div>
    </section>
  );
}
