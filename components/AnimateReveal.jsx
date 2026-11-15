'use client';

import { motion } from 'framer-motion';

/**
 * AnimateReveal — Animasi Scroll Persis Seperti Video Referensi
 *
 * Setiap elemen masuk dengan efek Zoom-In dari kecil (scale: 0.18 -> 1.0)
 * atau Slide menyilang (kanan/kiri) saat masuk ke layar, dan aktif berulang
 * setiap kali di-scroll ke atas maupun ke bawah (once: false).
 */
export default function AnimateReveal({
  children,
  delay = 0,
  duration = 1.0,
  y = 32,
  x = 0,
  scale = 0.2,
  ease,
  once = false,
  variant = 'zoom',
  amount = 0.2,
  margin = '0px 0px -10% 0px',
  className = '',
}) {
  const smoothZoomEase = ease || [0.16, 1, 0.3, 1];

  const getInitial = () => {
    switch (variant) {
      case 'left':
        return { opacity: 0, x: -Math.abs(x || 85), y: 0, scale: 0.65 };
      case 'right':
        return { opacity: 0, x: Math.abs(x || 85), y: 0, scale: 0.65 };
      case 'down':
        return { opacity: 0, y: -Math.abs(y || 40), x: 0, scale: 0.7 };
      case 'zoom':
      case 'scale':
        return {
          opacity: 0,
          scale: scale < 1 ? scale : 0.2,
          y: 22,
        };
      case 'fade':
        return { opacity: 0 };
      case 'up':
      default:
        return {
          opacity: 0,
          y: Math.abs(y || 35),
          x: x || 0,
          scale: scale < 1 ? scale : 0.3,
        };
    }
  };

  const getAnimate = () => {
    return { opacity: 1, y: 0, x: 0, scale: 1 };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, amount, margin }}
      transition={{
        duration,
        delay,
        ease: smoothZoomEase,
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
