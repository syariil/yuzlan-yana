'use client';

import { motion } from 'framer-motion';

/**
 * 1. BottomFloralBouquet
 * Rangkaian bunga peony biru pastel, mawar krem, dan dedaunan emas realistis (watercolor)
 * di bagian bawah Cover, Hero, Card Acara, dan Footer.
 */
export function BottomFloralBouquet({ className = '' }) {
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none leading-none relative ${className}`}
    >
      <motion.img
        src="/images/ornaments/floral-bottom.png"
        alt="Blue Peony and Cream Rose Bouquet"
        initial={{ scale: 1.01, y: 4 }}
        animate={{ scale: [1.01, 1.04, 1.01], y: [4, 0, 4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-auto block object-cover object-bottom"
      />
    </div>
  );
}

/**
 * 2. CastleIllustration
 * Ilustrasi Watercolor Kastil Dongeng (Fairytale Castle) realistis dengan pepohonan berkabut
 */
export function CastleIllustration({ className = '', size = 'large' }) {
  const isSmall = size === 'small';
  return (
    <div
      className={`pointer-events-none select-none flex justify-center relative ${className}`}
    >
      <div
        className={
          isSmall
            ? 'w-32 sm:w-36 relative'
            : 'w-full max-w-[330px] sm:max-w-[360px] relative'
        }
      >
        <img
          src="/images/ornaments/castle.png"
          alt="Fairytale Castle Illustration"
          className="w-full h-auto block mx-auto drop-shadow-sm"
        />
        {/* Soft bottom mist fade so the castle base blends seamlessly into the ivory paper */}
        <div
          className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(252,251,249,0.95) 0%, rgba(252,251,249,0) 100%)',
          }}
        />
      </div>
    </div>
  );
}

/**
 * 3. GoldOvalPortrait
 * Bingkai foto oval emas murni (untuk Cover & Footer seperti di video detik 00:07 & 00:59)
 */
export function GoldOvalPortrait({ src, alt, className = '' }) {
  return (
    <div
      className={`relative w-44 h-60 sm:w-48 sm:h-64 rounded-full p-[6px] bg-gradient-to-b from-[#f5e3be] via-[#c8a464] to-[#8f6b32] shadow-[0_14px_30px_-6px_rgba(74,103,133,0.28)] ${className}`}
    >
      <div className="w-full h-full rounded-full p-1 bg-[#fcfbf9] overflow-hidden relative border border-[#d2ae6d]/70">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top rounded-full"
        />
      </div>
    </div>
  );
}

/**
 * 4. OvalFloralFrame
 * Bingkai foto oval emas dengan rangkaian bunga peony biru & mawar krem watercolor realistis
 * yang memeluk lengkungan bingkai secara presisi:
 * - flowerSide="left"  -> menggunakan floral-side-left.png di lengkung kiri-bawah (untuk Mempelai Wanita)
 * - flowerSide="right" -> menggunakan floral-side.png di lengkung kanan-bawah (untuk Mempelai Pria)
 */
export function OvalFloralFrame({ src, alt, flowerSide = 'left' }) {
  const isLeftFlower = flowerSide === 'left';
  return (
    <div className="relative inline-block my-4">
      {/* Ornate Metallic Gold Outer Oval Frame (208px x 272px) */}
      <div className="relative w-52 h-[272px] sm:w-56 sm:h-[292px] rounded-full p-[6px] bg-gradient-to-b from-[#f5e3be] via-[#c8a464] to-[#8f6b32] shadow-[0_14px_30px_-6px_rgba(74,103,133,0.28)]">
        <div className="w-full h-full rounded-full p-1 bg-[#fcfbf9] overflow-hidden relative border border-[#d2ae6d]/70">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top rounded-full"
          />
        </div>
      </div>

      {/* Pre-aligned Watercolor Crescent Floral Wreath Hugging the Gold Rim */}
      <div
        className={`absolute -bottom-6 ${
          isLeftFlower ? '-left-6' : '-right-6'
        } w-56 sm:w-60 pointer-events-none select-none z-10`}
      >
        <motion.img
          src={
            isLeftFlower
              ? '/images/ornaments/floral-side-left.png'
              : '/images/ornaments/floral-side.png'
          }
          alt="Floral Wreath Ornament"
          animate={{ rotate: isLeftFlower ? [-1.2, 1.2, -1.2] : [1.2, -1.2, 1.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-auto block drop-shadow-md"
        />
      </div>
    </div>
  );
}

/**
 * 5. CornerFloral
 * Ornamen bunga sudut kartu watercolor realistis
 */
export function CornerFloral({ position = 'top-right', className = '' }) {
  const posClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 scale-x-[-1]',
    'bottom-left': 'bottom-0 left-0 scale-y-[-1]',
    'bottom-right': 'bottom-0 right-0 scale-x-[-1] scale-y-[-1]',
  };

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 ${posClasses[position]} ${className}`}
    >
      <img
        src="/images/ornaments/floral-corner.png"
        alt=""
        className="w-32 sm:w-36 h-auto block"
      />
    </div>
  );
}

/**
 * 6. FlyingBirds
 * Animasi siluet burung-burung terbang melintasi langit kastil
 */
export function FlyingBirds() {
  return (
    <div className="absolute inset-x-0 top-12 h-48 overflow-hidden pointer-events-none select-none z-20">
      <motion.div
        initial={{ x: '-12%', y: 24, opacity: 0 }}
        animate={{ x: '112%', y: -16, opacity: [0, 0.85, 0.85, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
        className="flex gap-4 items-center"
      >
        <svg width="18" height="12" viewBox="0 0 24 14" fill="none">
          <path
            d="M1 9 Q7 1 12 7 Q17 1 23 9 Q17 5 12 10 Q7 5 1 9 Z"
            fill="#3d5269"
          />
        </svg>
        <svg
          width="14"
          height="10"
          viewBox="0 0 24 14"
          fill="none"
          className="-mt-4"
        >
          <path
            d="M1 9 Q7 1 12 7 Q17 1 23 9 Q17 5 12 10 Q7 5 1 9 Z"
            fill="#3d5269"
          />
        </svg>
        <svg
          width="12"
          height="8"
          viewBox="0 0 24 14"
          fill="none"
          className="mt-3"
        >
          <path
            d="M1 9 Q7 1 12 7 Q17 1 23 9 Q17 5 12 10 Q7 5 1 9 Z"
            fill="#3d5269"
          />
        </svg>
      </motion.div>
    </div>
  );
}

/**
 * 7. RomanArchway
 * Gerbang Lengkung Istana Klasik dengan ukiran daun emas (seperti di video detik 00:15 - 00:22)
 */
export function RomanArchway({ className = '' }) {
  return (
    <div
      className={`w-full h-full relative pointer-events-none select-none overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 500 750"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pillarStone" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d5c7b0" />
            <stop offset="30%" stopColor="#f6f0e4" />
            <stop offset="70%" stopColor="#e8decb" />
            <stop offset="100%" stopColor="#c2b197" />
          </linearGradient>
          <linearGradient id="goldVine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3dfb6" />
            <stop offset="50%" stopColor="#d4b06a" />
            <stop offset="100%" stopColor="#9e7a40" />
          </linearGradient>
        </defs>

        {/* Outer Stone Arch Frame */}
        <path
          d="M25 750 L25 270 A225 225 0 0 1 475 270 L475 750 L415 750 L415 270 A165 165 0 0 0 85 270 L85 750 Z"
          fill="url(#pillarStone)"
          stroke="#b59b72"
          strokeWidth="2"
        />

        {/* Inner Arch Moldings */}
        <path
          d="M85 750 L85 270 A165 165 0 0 1 415 270 L415 750"
          stroke="#c5a880"
          strokeWidth="3"
          fill="none"
        />

        {/* Left Fluted Column */}
        <rect
          x="22"
          y="272"
          width="66"
          height="478"
          fill="url(#pillarStone)"
          stroke="#b59b72"
          strokeWidth="1.5"
        />
        <line x1="38" y1="288" x2="38" y2="740" stroke="#b59b72" strokeWidth="1.2" opacity="0.6" />
        <line x1="55" y1="288" x2="55" y2="740" stroke="#b59b72" strokeWidth="1.2" opacity="0.6" />
        <line x1="72" y1="288" x2="72" y2="740" stroke="#b59b72" strokeWidth="1.2" opacity="0.6" />
        {/* Left Capital */}
        <rect
          x="14"
          y="252"
          width="82"
          height="22"
          rx="4"
          fill="#ece0cc"
          stroke="#a68a5e"
          strokeWidth="1.5"
        />

        {/* Right Fluted Column */}
        <rect
          x="412"
          y="272"
          width="66"
          height="478"
          fill="url(#pillarStone)"
          stroke="#b59b72"
          strokeWidth="1.5"
        />
        <line x1="428" y1="288" x2="428" y2="740" stroke="#b59b72" strokeWidth="1.2" opacity="0.6" />
        <line x1="445" y1="288" x2="445" y2="740" stroke="#b59b72" strokeWidth="1.2" opacity="0.6" />
        <line x1="462" y1="288" x2="462" y2="740" stroke="#b59b72" strokeWidth="1.2" opacity="0.6" />
        {/* Right Capital */}
        <rect
          x="404"
          y="252"
          width="82"
          height="22"
          rx="4"
          fill="#ece0cc"
          stroke="#a68a5e"
          strokeWidth="1.5"
        />

        {/* Golden Botanical Leaves Wrapping the Archway & Pillars (Video 00:15 - 00:21) */}
        <g fill="url(#goldVine)" stroke="#8f6b32" strokeWidth="0.9">
          <path d="M90 195 Q115 145 155 130 Q135 175 90 195 Z" />
          <path d="M145 125 Q185 80 230 72 Q200 115 145 125 Z" />
          <path d="M250 52 Q272 20 250 8 Q228 20 250 52 Z" />
          <path d="M355 125 Q315 80 270 72 Q300 115 355 125 Z" />
          <path d="M410 195 Q385 145 345 130 Q365 175 410 195 Z" />
          {/* Left Pillar Vines */}
          <path d="M28 350 Q70 320 86 295 Q62 302 28 350 Z" />
          <path d="M84 425 Q40 395 25 370 Q55 382 84 425 Z" />
          <path d="M30 500 Q72 470 86 445 Q60 455 30 500 Z" />
          {/* Right Pillar Vines */}
          <path d="M472 350 Q430 320 414 295 Q438 302 472 350 Z" />
          <path d="M416 425 Q460 395 475 370 Q445 382 416 425 Z" />
          <path d="M470 500 Q428 470 414 445 Q440 455 470 500 Z" />
        </g>
      </svg>

      {/* Top Corner Watercolor Florals */}
      <img
        src="/images/ornaments/floral-corner.png"
        alt=""
        className="absolute top-0 left-0 w-40 h-auto"
      />
      <img
        src="/images/ornaments/floral-corner.png"
        alt=""
        className="absolute top-0 right-0 w-40 h-auto scale-x-[-1]"
      />
    </div>
  );
}
