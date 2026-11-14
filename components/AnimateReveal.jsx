'use client';

import { motion } from 'framer-motion';

/**
 * AnimateReveal — Lightweight, Hardware-Accelerated Scroll Animation
 *
 * Dioptimalkan agar super ringan di HP & desktop (60fps mulus):
 * - Menggunakan transform 3D GPU acceleration
 * - Durasi responsif 0.5s (tidak lambat/berat)
 * - Easing bezier natural tanpa layout thrashing
 */
export default function AnimateReveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 30,
  x = 0,
  scale = 1,
  ease,
  once = false, // Tetap continuous saat scroll atas/bawah
  variant = 'up',
  amount = 0.1,
  margin = '0px 0px -30px 0px',
  className = '',
}) {
  const naturalEase = ease || [0.22, 1, 0.36, 1];

  const getInitial = () => {
    switch (variant) {
      case 'left':  return { opacity: 0, x: -Math.abs(x || 25), y: 0 };
      case 'right': return { opacity: 0, x: Math.abs(x || 25),  y: 0 };
      case 'down':  return { opacity: 0, y: -Math.abs(y), x: 0 };
      case 'scale': return { opacity: 0, scale: scale < 1 ? scale : 0.92 };
      case 'fade':  return { opacity: 0 };
      case 'up':
      default:      return { opacity: 0, y: Math.abs(y), x: x || 0 };
    }
  };

  const getAnimate = () => {
    switch (variant) {
      case 'scale': return { opacity: 1, scale: 1 };
      default:      return { opacity: 1, y: 0, x: 0 };
    }
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
