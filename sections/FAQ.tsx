'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import { FAQS } from '@/lib/constants';
import { trackEvent } from '@/lib/tracking';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-black py-24 md:py-36">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <SectionLabel n="09">Preguntas</SectionLabel>
        <h2 className="t-display t-h2 mb-14 max-w-[20ch]">
          Antes de avanzar, <span className="t-glow">aclaremos lo importante.</span>
        </h2>

        <div className="mx-auto max-w-4xl border-t border-white/10">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="border-b border-white/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => { setOpen(on ? null : i); if (!on) trackEvent('faq_opened', { index: i + 1 }); }}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-text"
                  >
                    <span className={`t-display text-[clamp(1.05rem,1rem+.4vw,1.3rem)] leading-snug transition-colors ${on ? 'text-gold-light' : 'text-text-muted'}`}>
                      {f.q}
                    </span>
                    <span className={`h-3 w-3 flex-none rotate-45 border transition-all duration-300 ${on ? 'border-signal bg-signal' : 'border-white/25'}`} aria-hidden />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.28, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-prose2 pb-8">
                        {f.a.map((p, k) => (
                          <p key={k} className={`text-[16px] leading-relaxed text-text-muted ${k > 0 ? 'mt-4' : ''}`}>
                            {p.startsWith('[') ? (
                              <span className="inline-flex rounded-sm border border-dashed border-gold/40 bg-gold/5 px-3 py-1.5 text-[14px] text-gold">{p}</span>
                            ) : p}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
