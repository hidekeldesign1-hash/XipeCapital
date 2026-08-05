'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import LiquidPanel from '@/components/ui/LiquidPanel';
import GrecaPath from '@/components/greca/GrecaPath';
import SectionReveal from '@/components/ui/SectionReveal';
import { METHOD } from '@/lib/constants';
import { EASE } from '@/lib/motion';
import { trackOnce, markFirstInteraction } from '@/lib/tracking';

/** Tres momentos conectados por una greca continua. El líquido del panel sube. */
export default function Method() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(0.999, Math.max(0, (window.innerHeight * 0.7 - r.top) / r.height));
      setI(Math.floor(p * METHOD.length));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { trackOnce('method_step_viewed', { step: METHOD[i].n }); }, [i]);

  return (
    <section id="metodo" ref={ref} className="relative bg-mist py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <p className="t-label mb-6 text-gold-ink">04 · Método</p>
        <h2 className="t-display t-h2 mb-14 max-w-[12ch]">Diseñar antes de contratar.</h2>

        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="mb-8 h-12 w-full" aria-hidden>
          <GrecaPath d="M0 44 h260 v-28 h140 v28 h260 v-28 h140 v28 h400" stroke="var(--xipe-cloud)" width={1.4} draw={false} />
          <motion.path
            d="M0 44 h260 v-28 h140 v28 h260 v-28 h140 v28 h400"
            fill="none" stroke="var(--xipe-gold)" strokeWidth="2" strokeLinecap="square"
            initial={false} animate={{ pathLength: (i + 1) / METHOD.length }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </svg>

        <div className="grid gap-5 md:grid-cols-3">
          {METHOD.map((m, k) => {
            const on = k <= i;
            return (
              <SectionReveal key={m.n} delay={k * 0.08}>
                <LiquidPanel
                  strong={k === i}
                  className="relative h-full overflow-hidden rounded-3xl p-7"
                >
                  {/* El líquido del panel sube cuando la etapa se activa */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-mint-light/70 to-transparent"
                    initial={false}
                    animate={{ height: on ? '100%' : '0%' }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                  <button
                    type="button"
                    onClick={() => { setI(k); markFirstInteraction('method'); }}
                    className="relative block w-full text-left"
                    aria-pressed={k === i}
                  >
                    <span className="t-label mb-4 block text-gold-ink">{m.n}</span>
                    <span className="t-display mb-3 block text-[1.6rem]">{m.title}</span>
                    <span className="t-body block max-w-[26ch]">{m.line}</span>
                  </button>
                </LiquidPanel>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
