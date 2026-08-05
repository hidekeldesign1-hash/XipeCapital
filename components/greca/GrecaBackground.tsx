'use client';

import { useEffect, useRef } from 'react';

/**
 * Capas de greca al fondo, desplazándose a velocidades distintas.
 * Muy tenue: acompaña sin competir con el texto.
 */
export default function GrecaBackground({ opacity = 0.5 }: { opacity?: number }) {
  const slow = useRef<SVGGElement>(null);
  const fast = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (slow.current) slow.current.style.transform = `translateX(${(y * 0.02) % 120}px)`;
        if (fast.current) fast.current.style.transform = `translateX(${-(y * 0.05) % 120}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const unit = 'h20 v-14 h20 v14 h20';
  const row = (y: number) => `M-120 ${y} ${Array.from({ length: 30 }, () => unit).join(' ')}`;

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ opacity }} aria-hidden>
      <g ref={slow} stroke="var(--xipe-cloud)" strokeWidth="1" fill="none">
        <path d={row(120)} /><path d={row(420)} /><path d={row(720)} />
      </g>
      <g ref={fast} stroke="var(--xipe-champagne)" strokeWidth="1" fill="none">
        <path d={row(270)} /><path d={row(570)} />
      </g>
    </svg>
  );
}
