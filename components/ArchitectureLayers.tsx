'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GrecaPath from '@/components/greca/GrecaPath';
import KineticText from '@/components/ui/KineticText';
import LiquidPanel from '@/components/ui/LiquidPanel';
import { STAGES } from '@/lib/constants';
import { EASE } from '@/lib/motion';
import { trackOnce, trackEvent, markFirstInteraction } from '@/lib/tracking';

/**
 * Cuatro funciones que se construyen al deslizar. El fondo interpola de
 * marfil a blanco y luego a niebla fría; la greca se dibuja de etapa en
 * etapa. Se explica por movimiento, no por párrafos.
 */
const BG = ['#F4F1E9', '#FFFFFF', '#F8F9F6', '#EAEFEB'];

export default function ArchitectureLayers() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(0.999, Math.max(0, (window.innerHeight * 0.55 - r.top) / (r.height - window.innerHeight * 0.45)));
      setI(Math.floor(p * STAGES.length));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  useEffect(() => { trackOnce('architecture_layer_selected', { stage: STAGES[i].verb, via: 'scroll' }); }, [i]);

  const stage = STAGES[i];

  return (
    <motion.section
      id="arquitectura" ref={ref}
      animate={{ backgroundColor: BG[i] }}
      transition={{ duration: 0.85, ease: EASE }}
      className="relative py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <p className="t-label mb-6 text-gold-ink">02 · La arquitectura</p>
        <h2 className="t-display t-h2 mb-12 max-w-[14ch]">
          Cuatro funciones. Una <KineticText text="arquitectura" className="text-gold-ink" maxLift={3} />.
        </h2>

        {/* La greca atraviesa la sección y cambia de forma con la etapa */}
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none" className="mb-10 h-16 w-full md:h-20" aria-hidden>
          <path d="M0 62 h180 v-34 h120 v34 h180 v-34 h120 v34 h180 v-34 h120 v34 h300" fill="none" stroke="var(--xipe-cloud)" strokeWidth="1.4" />
          <motion.path
            d="M0 62 h180 v-34 h120 v34 h180 v-34 h120 v34 h180 v-34 h120 v34 h300"
            fill="none" stroke="var(--xipe-gold)" strokeWidth="2" strokeLinecap="square"
            initial={false} animate={{ pathLength: (i + 1) / STAGES.length }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          {STAGES.map((_, k) => (
            <motion.circle
              key={k} cx={110 + k * 300} cy={k % 2 === 0 ? 62 : 28} r="7"
              initial={false}
              animate={{ fill: k <= i ? 'var(--xipe-mint)' : 'var(--xipe-cloud)', scale: k === i ? 1.25 : 1 }}
              transition={{ duration: 0.32, ease: EASE }}
              style={{ transformOrigin: `${110 + k * 300}px ${k % 2 === 0 ? 62 : 28}px` }}
            />
          ))}
        </svg>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          {/* Selector: también táctil, no solo por scroll */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Funciones de la arquitectura">
            {STAGES.map((s, k) => (
              <button
                key={s.n} role="tab" aria-selected={k === i}
                onClick={() => { setI(k); markFirstInteraction('architecture_tabs'); trackEvent('architecture_layer_selected', { stage: s.verb, via: 'tap' }); }}
                className={`min-h-[48px] rounded-full px-5 text-[15px] font-semibold transition-all duration-200 ease-xipe ${
                  k === i ? 'bg-ink text-day' : 'liquid text-muted hover:text-ink'
                }`}
              >
                <span className="mr-2 text-[13px] opacity-60">{s.n}</span>{s.verb}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={stage.n}
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <LiquidPanel strong className="rounded-3xl p-7 md:p-10">
                <p className="t-label mb-4 text-gold-ink">{stage.n}</p>
                <h3 className="t-display t-h3 mb-6">{stage.verb}</h3>
                <ul className="flex flex-wrap gap-2">
                  {stage.items.map((it, k) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + k * 0.06, duration: 0.35, ease: EASE }}
                      className="rounded-full border px-4 py-2 text-[15px] text-muted"
                      style={{ borderColor: 'var(--xipe-border-dark)' }}
                    >
                      {it}
                    </motion.li>
                  ))}
                </ul>
                <svg viewBox="0 0 300 24" className="mt-7 h-6 w-full" aria-hidden>
                  <GrecaPath d="M0 18 h44 v-12 h30 v12 h60 v-12 h30 v12 h136" stroke="var(--xipe-mint)" width={1.2} duration={0.9} />
                </svg>
              </LiquidPanel>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Alternativa textual: la arquitectura se entiende sin interacción */}
        <p className="sr-only">
          La arquitectura tiene cuatro funciones: {STAGES.map((s) => `${s.verb} (${s.items.join(', ')})`).join('; ')}.
        </p>
      </div>
    </motion.section>
  );
}
