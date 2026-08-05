/** Curvas, duraciones y variantes compartidas. Un solo lenguaje de movimiento. */

export const EASE = [0.22, 0.61, 0.28, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  hover: 0.2,      // 160–240 ms
  tap: 0.26,       // 180–320 ms
  reveal: 0.6,     // 450–700 ms
  section: 0.8,    // 600–900 ms
  ambient: 16,     // 10–24 s
} as const;

export const revealUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: DUR.reveal, ease: EASE },
  }),
};

export const maskReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  show: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: DUR.section, ease: EASE },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.section, ease: EASE } },
};

/** Física elástica breve para la tipografía viva. */
export const SPRING = { type: 'spring', stiffness: 260, damping: 18, mass: 0.5 } as const;
