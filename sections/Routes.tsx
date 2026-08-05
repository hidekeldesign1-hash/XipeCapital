'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import { ROUTES } from '@/lib/constants';
import { trackEvent } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';

export default function Routes() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { open } = useDiagnosis();

  return (
    <section id="rutas" className="relative bg-deep py-24 md:py-36">
      <div className="grid-bg" aria-hidden />
      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <SectionLabel n="05">Rutas</SectionLabel>
        <h2 className="t-display t-h2 mb-4 max-w-[20ch]">
          Seis puntos de entrada. <span className="t-glow">La misma arquitectura.</span>
        </h2>
        <p className="t-lede mb-14 max-w-[48ch] text-text-muted">
          Elige la situación más cercana a la tuya. Cada ruta muestra la pregunta que
          hay detrás y el primer paso que corresponde.
        </p>

        <div className="border-t border-white/10">
          {ROUTES.map((r) => {
            const on = openId === r.id;
            return (
              <div key={r.id} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`ruta-${r.id}`}
                  onClick={() => {
                    setOpenId(on ? null : r.id);
                    if (!on) trackEvent('route_selected', { route: r.id });
                  }}
                  className="group flex w-full items-baseline gap-5 py-8 text-left transition-all duration-300 hover:pl-4 md:gap-8"
                >
                  <span className="t-display text-[1.25rem] font-normal tabular-nums text-white/25">{r.n}</span>
                  <span className="flex-1">
                    <span className={`t-display block text-[clamp(1.5rem,1.15rem+1.5vw,2.4rem)] transition-colors ${on ? 'text-gold-light' : 'group-hover:text-gold-light'}`}>
                      {r.title}
                    </span>
                    <span className="mt-2 block max-w-[52ch] text-[16px] leading-relaxed text-text-muted">{r.trigger}</span>
                  </span>
                  <span className={`mt-2 h-3 w-3 flex-none rotate-45 border transition-all duration-300 ${on ? 'border-signal bg-signal' : 'border-white/25'}`} aria-hidden />
                </button>

                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`ruta-${r.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 0.61, 0.28, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-2 md:pl-[calc(1.25rem+2rem)]">
                        <div>
                          <p className="t-label mb-3 text-gold">La pregunta</p>
                          <p className="t-display text-[1.2rem] leading-snug">{r.question}</p>
                        </div>
                        <div>
                          <p className="t-label mb-3 text-gold">El primer paso</p>
                          <p className="max-w-[42ch] text-[16px] leading-relaxed text-text-muted">{r.first}</p>
                          <button
                            type="button"
                            onClick={() => { trackEvent(r.event, { route: r.id }); open(`ruta_${r.id}`); }}
                            className="mt-6 inline-flex min-h-[52px] items-center gap-3 rounded-sm border border-white/15 px-6 text-[14px] font-semibold uppercase tracking-[.13em] transition-colors hover:border-gold hover:text-gold-light"
                          >
                            {r.cta}
                          </button>
                        </div>
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
