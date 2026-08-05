'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LiquidPanel from '@/components/ui/LiquidPanel';
import GrecaBackground from '@/components/greca/GrecaBackground';
import { FAQS } from '@/lib/constants';
import { EASE } from '@/lib/motion';
import { trackEvent } from '@/lib/tracking';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-ivory py-24 md:py-32">
      <GrecaBackground opacity={0.38} />
      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <p className="t-label mb-6 text-gold-ink">06 · Preguntas</p>
        <h2 className="t-display t-h2 mb-12 max-w-[14ch]">Antes de avanzar, lo importante.</h2>

        <div className="grid gap-3 lg:grid-cols-[36px_1fr] lg:gap-6">
          {/* Greca lateral: indica la posición dentro de la lista */}
          <svg viewBox="0 0 36 600" preserveAspectRatio="none" className="hidden h-full w-9 lg:block" aria-hidden>
            <path d="M18 0 V80 H30 V180 H6 V280 H30 V380 H6 V480 H18 V600" fill="none" stroke="var(--xipe-cloud)" strokeWidth="1.4" />
            <motion.path
              d="M18 0 V80 H30 V180 H6 V280 H30 V380 H6 V480 H18 V600"
              fill="none" stroke="var(--xipe-gold)" strokeWidth="2"
              initial={false} animate={{ pathLength: open === null ? 0 : (open + 1) / FAQS.length }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </svg>

          <div className="grid gap-3">
            {FAQS.map((f, i) => {
              const on = open === i;
              return (
                <LiquidPanel key={f.q} strong={on} sheen={false} className="overflow-hidden rounded-2xl">
                  <h3>
                    <button
                      type="button" id={`faq-b-${i}`} aria-expanded={on} aria-controls={`faq-b-panel-${i}`}
                      onClick={() => { setOpen(on ? null : i); if (!on) trackEvent('faq_opened', { index: i + 1 }); }}
                      className="flex min-h-[64px] w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    >
                      <span className={`t-display text-[clamp(1.05rem,1rem+.35vw,1.25rem)] leading-snug ${on ? 'text-ink' : 'text-muted'}`}>
                        {f.q}
                      </span>
                      <motion.span
                        aria-hidden animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.24, ease: EASE }}
                        className="grid h-7 w-7 flex-none place-items-center rounded-full"
                        style={{ background: on ? 'var(--xipe-mint)' : 'transparent', border: '1px solid var(--xipe-border-dark)' }}
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 0v12M0 6h12" stroke="var(--xipe-ink)" strokeWidth="1.3" /></svg>
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`faq-b-panel-${i}`} role="region" aria-labelledby={`faq-b-${i}`}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-reading px-6 pb-6 text-[16px] leading-relaxed text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </LiquidPanel>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
