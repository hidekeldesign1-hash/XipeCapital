import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sections/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#050605',
        deep: '#090B0A',
        graphite: '#111412',
        surface: '#171A17',
        'surface-2': '#20241F',
        ivory: '#F6F2E9',
        'warm-white': '#FFFDF8',
        'soft-white': '#EAE8E1',
        gold: '#C9A765',
        'gold-light': '#E6D09A',
        'gold-muted': '#806A42',
        signal: '#9DE4D0',
        text: '#F4F2EC',
        'text-muted': '#A7AAA4',
        'dark-text': '#111310',
      },
      fontFamily: {
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { shell: '1360px', prose2: '68ch' },
      transitionTimingFunction: { xipe: 'cubic-bezier(.22,.61,.28,1)' },
    },
  },
  plugins: [],
};
export default config;
