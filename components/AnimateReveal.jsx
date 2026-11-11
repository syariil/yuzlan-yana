'use client';

import { motion } from 'framer-motion';

/**
 * Reusable Slide-Up Reveal Animation on Scroll
 * Dioptimalkan agar langsung meluncur seketika tanpa delay saat di-scroll
 */
export default function AnimateReveal({
  children,
  delay = 0,
  duration = 0.65,
  y = 30,
  scale = 1,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: scale < 1 ? scale : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -25px 0px', amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Kurva akselerasi natural, responsif & mulus
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
