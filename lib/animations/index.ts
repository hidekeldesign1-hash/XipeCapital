/**
 * Animaciones centralizadas de Xipe.
 * Preferimos transform + opacity (60fps). ScrollTrigger vive aquí
 * como helpers; el MotionProvider sincroniza Lenis.
 */

export const EASE = [0.22, 0.61, 0.28, 1] as const;
export const EASE_CSS = 'cubic-bezier(.22, .61, .28, 1)';

/** Entrada tipo Framer Motion: subir + fade */
export const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.09, duration: 0.7, ease: EASE },
  }),
};

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' as const },
  transition: { duration: 0.6, ease: EASE },
};

export const fadeSwap = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: EASE },
};

export const softScale = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1, ease: EASE },
};

/** Config ScrollTrigger para secciones pinneadas en desktop */
export const pinScrub = {
  start: 'top top' as const,
  scrub: true as const,
};
