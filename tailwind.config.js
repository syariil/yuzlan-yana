/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          dark: '#2b0912',
          darker: '#1c050b',
          card: '#3d0e1b',
          cream: '#fbf5ea',
          ivory: '#fdfaf3',
          soft: '#f5ead6',
          gold: '#c5a059',
          'gold-light': '#e6cfa3',
          'gold-dark': '#9c7834',
          // Mapped to Royal Maroon & Cream palette so all existing classes automatically adopt Maroon + Cream
          blue: '#731c2e',
          'blue-dark': '#52111f',
          'blue-light': '#f2d8dc',
          'blue-soft': '#faecee',
          maroon: '#731c2e',
          'maroon-dark': '#52111f',
          'maroon-light': '#f2d8dc',
          muted: '#8b7a7d',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        script: ['var(--font-script)', 'Great Vibes', 'cursive'],
        arabic: ['var(--font-arabic)', 'Amiri', 'serif'],
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
