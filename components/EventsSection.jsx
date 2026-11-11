'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Copy, Check, Clock, CalendarDays } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function EventsSection() {
  const { events } = weddingData;
  const [copiedId, setCopiedId] = useState(null);

  const copyAddress = (address, id) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="events" className="py-20 px-6 bg-wedding-cream text-stone-800 relative z-10">
      <div className="max-w-md mx-auto text-center">
        {/* Header */}
        <AnimateReveal y={30} duration={0.7} className="mb-14">
          <div className="inline-block p-4 rounded-full bg-wedding-gold/15 text-wedding-gold mb-3 shadow-sm border border-wedding-gold/30">
            {/* Interlocking Rings SVG */}
            <svg
              className="w-10 h-10 stroke-current fill-none stroke-[1.5]"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="12" r="5" />
              <circle cx="15" cy="12" r="5" />
            </svg>
          </div>

          <h2 className="font-serif text-3xl font-bold tracking-wide text-stone-900">
            Save The Date
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-[1px] w-8 bg-wedding-gold/60" />
            <span className="text-xs text-wedding-gold-dark">✦</span>
            <div className="h-[1px] w-8 bg-wedding-gold/60" />
          </div>
          <p className="text-xs text-stone-600 font-light mt-3 max-w-xs mx-auto">
            Rangkaian prosesi sakral yang akan kami laksanakan:
          </p>
        </AnimateReveal>

        {/* Event Cards List */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <AnimateReveal
              key={event.id}
              y={35}
              delay={index * 0.12}
              duration={0.7}
              scale={0.97}
              className="relative"
            >
              <div className="luxury-card-light double-gold-border rounded-[32px] p-7 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Event Category Tag */}
                <div className="inline-block px-3 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-semibold tracking-wider uppercase mb-3 border border-stone-200">
                  Acara #{index + 1}
                </div>

                {/* Event Title */}
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
                  {event.name}
                </h3>

                {/* Ornamental flourish */}
                <div className="flex items-center justify-center gap-3 my-3">
                  <div className="h-[1px] w-10 bg-wedding-gold/50" />
                  <span className="text-[10px] text-wedding-gold">❖</span>
                  <div className="h-[1px] w-10 bg-wedding-gold/50" />
                </div>

                {/* Date & Time with distinct pill badges */}
                <div className="space-y-1.5 my-3">
                  <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-800">
                    <CalendarDays className="w-3.5 h-3.5 text-wedding-gold-dark" />
                    <span>{event.date}</span>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-wedding-gold/15 text-wedding-gold-dark text-xs font-semibold border border-wedding-gold/30">
                      <Clock className="w-3 h-3 text-wedding-gold-dark" />
                      <span>{event.time}</span>
                    </span>
                  </div>
                </div>

                {/* Venue & Address */}
                <div className="mt-5 flex flex-col items-center pt-3 border-t border-stone-100">
                  <MapPin className="w-5 h-5 text-wedding-gold-dark mb-1.5" />
                  <h4 className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase text-stone-900 mb-1">
                    {event.venue}
                  </h4>
                  <p className="text-xs text-stone-600 font-light max-w-xs leading-relaxed px-2 mb-6">
                    {event.address}
                  </p>

                  {/* Dual Action Buttons: Google Maps & Salin Alamat */}
                  <div className="flex items-center justify-center gap-2.5 w-full flex-wrap">
                    <a
                      href={event.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-wedding-gold-dark transition-all duration-300 shadow-md active:scale-95"
                    >
                      <MapPin className="w-3.5 h-3.5 text-wedding-gold" />
                      <span>Google Maps</span>
                    </a>

                    <button
                      onClick={() => copyAddress(event.address, event.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-all border border-stone-200 active:scale-95"
                    >
                      {copiedId === event.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-600" />
                          <span>Salin Alamat</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </AnimateReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
