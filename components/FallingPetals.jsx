'use client';

import { useEffect, useState } from 'react';

// SVG Petal shapes - kelopak bunga ringan tanpa filter berat
const PETAL_SHAPES = [
  // Kelopak peony biru / krem oval
  `<svg width="18" height="22" viewBox="0 0 18 22" fill="none">
    <ellipse cx="9" cy="12" rx="8" ry="10" fill="FILL_COLOR" opacity="0.8"/>
  </svg>`,

  // Kelopak bunga hati lembut
  `<svg width="18" height="16" viewBox="0 0 20 18" fill="none">
    <path d="M10 16 C10 16 1 10 1 5 C1 2 3.5 1 6 2 C7.5 2.5 9 4 10 5 C11 4 12.5 2.5 14 2 C16.5 1 19 2 19 5 C19 10 10 16 10 16Z" fill="FILL_COLOR" opacity="0.75"/>
  </svg>`,

  // Kelopak bunga biru mungil
  `<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M8 1 C9 3 11 3 12 1 C13 3 15 4 15 6 C13 7 13 9 14 11 C12 10 10 11 10 13 C9 11 7 11 6 13 C6 11 4 10 2 11 C3 9 3 7 1 6 C1 4 3 3 4 1 C5 3 7 3 8 1Z" fill="FILL_COLOR" opacity="0.72"/>
  </svg>`,

  // Kelopak daun emas/biru memanjang tipis
  `<svg width="10" height="22" viewBox="0 0 10 24" fill="none">
    <path d="M5 1 C8 5 9 10 8 15 C7 19 5 22 5 22 C5 22 3 19 2 15 C1 10 2 5 5 1Z" fill="FILL_COLOR" opacity="0.75"/>
  </svg>`,
];

// Palet warna Royal Blue Flora, Cream Rose & Gold Leaf
const PETAL_COLORS = [
  '#8aa9c9', // Dusty Peony Blue
  '#b6cde4', // Pastel Sky Blue
  '#d8e6f3', // Soft Ice Blue
  '#f6ebd4', // Cream Rose
  '#e2c792', // Soft Floral Gold
  '#9ab6d4', // Cornflower Pastel
];

const FALL_VARIANTS = ['petal-fall-1', 'petal-fall-2', 'petal-fall-3', 'petal-fall-4', 'petal-fall-5'];

function createPetalData(id) {
  const shape = PETAL_SHAPES[id % PETAL_SHAPES.length];
  const color = PETAL_COLORS[id % PETAL_COLORS.length];
  const svgContent = shape.replace(/FILL_COLOR/g, color);

  const leftPct = 5 + (id * 9.5) % 90;
  const duration = 9 + (id % 4) * 2.5;
  const delay = (id * 1.4) % 10;
  const size = 0.7 + (id % 3) * 0.2;
  const fallAnim = FALL_VARIANTS[id % FALL_VARIANTS.length];

  return { id, svgContent, leftPct, duration, delay, size, fallAnim };
}

export default function FallingPetals({ count = 10, active = true }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!active) return;
    const generated = Array.from({ length: count }, (_, i) => createPetalData(i));
    setPetals(generated);
  }, [count, active]);

  if (!active || petals.length === 0) return null;

  return (
    <div className="petals-container" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.leftPct}%`,
            animationName: petal.fallAnim,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
            transform: `scale(${petal.size})`,
          }}
          dangerouslySetInnerHTML={{ __html: petal.svgContent }}
        />
      ))}
    </div>
  );
}
