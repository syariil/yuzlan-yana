'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function GallerySection() {
  const { galleryQuote, quotePhoto, gallery } = weddingData;
  const [selectedImage, setSelectedImage] = useState(null);

  // Lock scroll when lightbox is opened & handle escape key
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedImage(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  return (
    <section id="gallery" className="bg-wedding-cream text-stone-800">
      {/* Banner Quote Photo */}
      <div className="relative w-full h-80 sm:h-96 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.6 }}
          src={quotePhoto}
          alt="Quote Banner"
          className="w-full h-full object-cover filter brightness-[0.72]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 flex items-center justify-center p-6 text-center">
          <AnimateReveal y={25} duration={0.8}>
            <div className="max-w-sm">
              <span className="font-serif text-3xl sm:text-4xl text-wedding-gold opacity-80 block mb-1">
                “
              </span>
              <p className="font-serif italic text-base sm:text-lg text-white leading-relaxed drop-shadow-md">
                {galleryQuote}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="h-[1px] w-6 bg-wedding-gold/60" />
                <span className="text-[10px] text-wedding-gold">✦</span>
                <div className="h-[1px] w-6 bg-wedding-gold/60" />
              </div>
            </div>
          </AnimateReveal>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-20 px-6 max-w-md mx-auto text-center">
        {/* Title */}
        <AnimateReveal y={30} duration={0.7} className="mb-10">
          <h2 className="font-serif text-3xl font-bold tracking-wide text-stone-900">
            Our Gallery
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-[1px] w-8 bg-wedding-gold/60" />
            <span className="text-xs text-wedding-gold-dark">✦</span>
            <div className="h-[1px] w-8 bg-wedding-gold/60" />
          </div>
        </AnimateReveal>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {gallery.map((item, idx) => (
            <AnimateReveal
              key={item.id}
              y={30}
              delay={idx * 0.08}
              duration={0.65}
              scale={0.96}
              className={item.span === 'col-span-2' ? 'col-span-2' : 'col-span-1'}
            >
              <div
                onClick={() => setSelectedImage(item)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-stone-200 border border-wedding-gold/30 hover:border-wedding-gold transition-all duration-300 ${
                  item.span === 'col-span-2' ? 'h-52' : 'h-44'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                  <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center mb-1 border border-wedding-gold/40">
                    <ZoomIn className="w-4 h-4 text-wedding-gold" />
                  </div>
                  <span className="text-[11px] font-light text-gray-200">
                    {item.caption}
                  </span>
                </div>
              </div>
            </AnimateReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Tutup foto"
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2.5 rounded-full glass-dark border border-white/20 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full rounded-2xl overflow-hidden bg-stone-950 shadow-2xl border border-wedding-gold/30"
            >
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  className="w-full max-h-[72vh] object-contain mx-auto"
                />
              </div>
              <div className="p-4 bg-stone-900/90 text-center border-t border-white/10 flex items-center justify-between px-5">
                <p className="text-xs text-gray-200 font-light">
                  {selectedImage.caption}
                </p>
                <span className="text-[10px] text-wedding-gold uppercase tracking-wider font-semibold">
                  Foto {selectedImage.id} / {gallery.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
