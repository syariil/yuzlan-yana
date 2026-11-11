'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll Progress Bar
 * Garis emas tipis di paling atas layar yang menunjukkan progress scroll halaman
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-1 bg-black/10">
      <motion.div
        className="h-full bg-gradient-to-r from-wedding-gold/80 via-wedding-gold to-wedding-gold-light origin-left shadow-[0_0_12px_rgba(197,168,128,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
}

