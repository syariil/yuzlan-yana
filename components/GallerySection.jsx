'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { weddingData } from '@/data/weddingData';
import { CornerFloral } from './FloralOrnaments';
import AnimateReveal from './AnimateReveal';

export default function GallerySection() {
  const { galleryQuote, gallery } = weddingData;
  const [selectedImage, setSelectedImage] = useState(null);

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
    <section
      id="gallery"
      className="py-16 px-6 ivory-bg text-stone-800 relative z-10 overflow-hidden"
    >
      <CornerFloral position="top-left" className="opacity-70" />
      <CornerFloral position="top-right" className="opacity-70" />

      <div className="max-w-md mx-auto text-center relative z-10">
        {/* Title: Galeri Foto (Video 00:50 - 00:53) */}
        <AnimateReveal y={25} duration={0.7} className="mb-8">
          <h2 className="font-script text-4xl sm:text-5xl text-wedding-gold-dark mb-2">
            Galeri Foto
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
            &ldquo;{galleryQuote}&rdquo;
          </p>
        </AnimateReveal>

        {/* 2-Column Rounded Photo Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
          {gallery.map((item, idx) => (
            <AnimateReveal
              key={item.id}
              y={25}
              delay={(idx % 4) * 0.07}
              duration={0.6}
              scale={0.96}
              className={item.span === 'col-span-2' ? 'col-span-2' : 'col-span-1'}
            >
              <div
                onClick={() => setSelectedImage(item)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-md bg-stone-200 border-2 border-white ring-1 ring-wedding-gold/30 transition-all duration-300 ${
                  item.span === 'col-span-2' ? 'h-52 sm:h-60' : 'h-44 sm:h-48'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-wedding-blue-dark/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                  <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center mb-1 border border-white/50">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
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
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Tutup foto"
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 border border-white/20 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full rounded-2xl overflow-hidden bg-white shadow-2xl border-2 border-wedding-gold/40"
            >
              <div className="relative bg-stone-950">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  className="w-full max-h-[75vh] object-contain mx-auto"
                />
              </div>
              <div className="p-3.5 bg-[#fcfbf9] text-center flex items-center justify-between px-5">
                <p className="text-xs text-stone-700 font-medium">
                  {selectedImage.caption}
                </p>
                <span className="text-[10px] text-wedding-blue-dark uppercase tracking-wider font-bold">
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
