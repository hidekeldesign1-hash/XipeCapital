'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { registerGsap, ScrollTrigger } from '@/lib/animations/gsap';

const ReducedCtx = createContext(false);
export const useReducedMotionSafe = () => useContext(ReducedCtx);

/**
 * Scroll suave con Lenis + sincronía con ScrollTrigger.
 * Si el usuario pide movimiento reducido, Lenis no se inicializa.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let destroy = () => {};

    (async () => {
      registerGsap();
      const { default: Lenis } = await import('lenis');

      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1 });
      lenis.on('scroll', ScrollTrigger.update);

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      destroy = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    })();

    return () => destroy();
  }, [reduced]);

  return <ReducedCtx.Provider value={reduced}>{children}</ReducedCtx.Provider>;
}
