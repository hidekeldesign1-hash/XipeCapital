'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import { METHOD } from '@/lib/constants';
import { fadeUp } from '@/lib/animations';

/** Sección luminosa: trayectoria vertical que se traza con el scroll. */
export default function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.66 - r.top) / r.height));
      setFill(p);
      setActive(Math.min(METHOD.length - 1, Math.floor(p * METHOD.length)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  return (
    <section id="metodo" className="relative bg-ivory py-24 text-dark-text md:py-36">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <SectionLabel n="04" tone="light">El método</SectionLabel>
        <h2 className="t-display t-h2 mb-4 max-w-[18ch] text-dark-text">
          Un proceso que puedes anticipar.
        </h2>
        <p className="t-lede mb-16 max-w-[46ch] text-dark-text/65">
          Cinco etapas que ocurren en el mismo orden, sin importar por dónde empieces.
        </p>

        <div ref={ref} className="relative pl-8 md:pl-12">
          <span className="absolute left-0 top-0 h-full w-px bg-dark-text/12" aria-hidden>
            <span className="absolute inset-x-0 top-0 block bg-gold-muted" style={{ height: `${fill * 100}%`, transition: 'height .15s linear' }} />
          </span>

          {METHOD.map((m, i) => (
            <motion.article
              key={m.n}
              {...fadeUp}
              className="relative grid gap-5 py-10 md:grid-cols-[220px_1fr] md:gap-12 md:py-14"
            >
              <span
                className={`absolute -left-[calc(2rem+5px)] top-12 h-[11px] w-[11px] rotate-45 border transition-all duration-300 md:-left-[calc(3rem+5px)] ${
                  i <= active ? 'border-gold-muted bg-gold-muted shadow-[0_0_0_6px_rgba(201,167,101,.15)]' : 'border-dark-text/25 bg-ivory'
                }`}
                aria-hidden
              />
              <p className={`t-display text-[clamp(2.75rem,2rem+3vw,4.75rem)] font-normal leading-none transition-colors duration-300 ${i <= active ? 'text-gold-muted' : 'text-dark-text/20'}`}>
                {m.n}
              </p>
              <div>
                <h3 className="t-display mb-3 text-[clamp(1.35rem,1.1rem+1vw,1.9rem)] text-dark-text">{m.title}</h3>
                <p className="max-w-[44ch] text-[17px] leading-relaxed text-dark-text/65">{m.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
