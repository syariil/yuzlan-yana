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
          dark: '#1e2022',
          darker: '#151718',
          card: '#282b2e',
          cream: '#faf8f5',
          soft: '#f3ede4',
          gold: '#c5a880',
          'gold-light': '#dfceb7',
          'gold-dark': '#9e7d54',
          muted: '#8b8f94',
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

