'use client';

import { motion } from 'framer-motion';

/**
 * AnimateReveal — Hardware-Accelerated Scroll Animation matching the Video Reference
 *
 * Mendukung animasi Zoom-In dramatis (scale 0.35 -> 1), Slide-Left, Slide-Right, dan Slide-Up
 * yang selalu aktif saat di-scroll ke bawah maupun ke atas (once: false).
 */
export default function AnimateReveal({
  children,
  delay = 0,
  duration = 0.85,
  y = 35,
  x = 0,
  scale = 0.45,
  ease,
  once = false, // Continuous animation saat scroll atas/bawah
  variant = 'zoom', // Default 'zoom' seperti di video referensi
  amount = 0.15,
  margin = '0px 0px -40px 0px',
  className = '',
}) {
  const naturalEase = ease || [0.22, 1, 0.36, 1];

  const getInitial = () => {
    switch (variant) {
      case 'left':
        return { opacity: 0, x: -Math.abs(x || 70), y: 0, scale: 0.88 };
      case 'right':
        return { opacity: 0, x: Math.abs(x || 70), y: 0, scale: 0.88 };
      case 'down':
        return { opacity: 0, y: -Math.abs(y || 35), x: 0, scale: 0.9 };
      case 'zoom':
      case 'scale':
        return { opacity: 0, scale: scale < 1 ? scale : 0.4, y: 18 };
      case 'fade':
        return { opacity: 0 };
      case 'up':
      default:
        return {
          opacity: 0,
          y: Math.abs(y || 35),
          x: x || 0,
          scale: scale < 1 ? scale : 0.75,
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
        ease: naturalEase,
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
