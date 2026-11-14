'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-1 bg-wedding-blue/20">
      <motion.div
        className="h-full bg-gradient-to-r from-wedding-blue via-wedding-gold to-wedding-blue-dark origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
