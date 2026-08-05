import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        day: '#F8F9F6',
        white: '#FFFFFF',
        ivory: '#F4F1E9',
        mist: '#EAEFEB',
        cloud: '#DDE5E0',
        ink: '#0A0D0B',
        graphite: '#1B201D',
        muted: '#66706A',
        gold: '#BE9A58',
        'gold-light': '#E3CCA0',
        'gold-ink': '#8A6D30',
        champagne: '#F1E2C4',
        mint: '#8EDCC9',
        'mint-light': '#C7F2E7',
        aqua: '#8BCED2',
      },
      fontFamily: {
        display: ['var(--font-manrope)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { shell: '1400px', reading: '58ch' },
      boxShadow: {
        liquid: '0 1px 0 rgba(255,255,255,.9) inset, 0 18px 48px -22px rgba(27,49,39,.22)',
        'liquid-lg': '0 1px 0 rgba(255,255,255,.95) inset, 0 34px 90px -34px rgba(27,49,39,.30)',
      },
      transitionTimingFunction: { xipe: 'cubic-bezier(.22,.61,.28,1)' },
    },
  },
  plugins: [],
};
export default config;
