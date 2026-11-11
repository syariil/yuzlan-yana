'use client';

/**
 * Curved Wave Divider between dark & cream sections
 * Menghilangkan potongan garis lurus kaku dan memberikan transisi lengkungan mewah seperti di video
 */
export default function SectionCurve({ to = 'light', flip = false }) {
  // Warna target
  const fillColor = to === 'light' ? '#faf8f5' : '#1e2022';

  return (
    <div
      className={`relative w-full overflow-hidden leading-none z-20 pointer-events-none ${
        flip ? 'transform rotate-180 -mb-[1px]' : '-mt-[1px]'
      }`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-8 sm:h-12"
        style={{ fill: fillColor }}
      >
        <path d="M0,0 C300,95 900,95 1200,0 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}

