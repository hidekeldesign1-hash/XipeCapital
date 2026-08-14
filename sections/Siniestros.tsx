'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CLAIM_TYPES, CLAIM_STEPS } from '@/lib/constants';
import { useDiagnosis } from '@/components/Diagnosis';
import { trackEvent } from '@/lib/tracking';
import { EASE } from '@/lib/animations';

const CLAIM_ICONS: Record<string, React.ReactNode> = {
  car: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-7 w-7" aria-hidden>
      <path d="M6 20l2-7h16l2 7" /><path d="M4 20h24v4H4z" /><circle cx="9" cy="24" r="2" /><circle cx="23" cy="24" r="2" />
    </svg>
  ),
  medical: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-7 w-7" aria-hidden>
      <rect x="6" y="6" width="20" height="20" rx="2" /><path d="M16 10v12M10 16h12" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-7 w-7" aria-hidden>
      <path d="M5 15l11-9 11 9v12H5V15z" /><path d="M13 27v-8h6v8" />
    </svg>
  ),
  moto: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-7 w-7" aria-hidden>
      <circle cx="8" cy="22" r="4" /><circle cx="24" cy="22" r="4" /><path d="M12 22h6l4-8h-5l-2 4H10" />
    </svg>
  ),
  pet: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-7 w-7" aria-hidden>
      <ellipse cx="11" cy="12" rx="2.5" ry="3.5" /><ellipse cx="21" cy="12" rx="2.5" ry="3.5" />
      <ellipse cx="8" cy="18" rx="2" ry="2.5" /><ellipse cx="24" cy="18" rx="2" ry="2.5" />
      <ellipse cx="16" cy="20" rx="5" ry="4" />
    </svg>
  ),
  other: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-7 w-7" aria-hidden>
      <circle cx="16" cy="16" r="10" /><path d="M16 10v8M16 22h.01" />
    </svg>
  ),
};

export default function Siniestros() {
  const { open } = useDiagnosis();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="siniestros" className="relative overflow-hidden bg-deep py-24 md:py-28">
      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10 xl:px-24">
        <div className="grid items-stretch gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="t-label mb-4 text-gold">
              <span className="text-gold-muted">—</span> 07 Siniestros
            </p>
            <h2 className="t-display t-h2 max-w-[16ch] font-medium">
              ¿Tuviste un siniestro? Estamos contigo.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[15px] font-normal leading-relaxed tracking-wide text-text-muted md:text-[16px]">
              Te guiamos para que el proceso sea claro y sin complicaciones.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {CLAIM_TYPES.map((c) => {
                const on = active === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setActive(c.id);
                      trackEvent('protection_cta_click', { claim: c.id });
                    }}
                    className={`flex min-h-[96px] flex-col items-center justify-center gap-2.5 rounded-sm border px-3 py-4 text-center transition-all duration-300 ${
                      on
                        ? 'border-[#C4A77D]/35 bg-white/[0.03] text-gold-light'
                        : 'border-white/10 text-gold hover:border-[#C4A77D]/35 hover:bg-white/[0.02]'
                    }`}
                  >
                    {CLAIM_ICONS[c.icon]}
                    <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-text sm:text-[13px]">
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <ol className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
              {CLAIM_STEPS.map((s, i) => (
                <li key={s.n} className="flex flex-1 items-start gap-3 sm:flex-col sm:items-stretch sm:gap-0">
                  <div className="flex items-start gap-3 sm:pr-4">
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-white/10 text-[12px] font-medium text-gold">
                      {s.n}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold uppercase tracking-[0.1em] text-text">{s.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-text-muted">{s.body}</p>
                    </div>
                  </div>
                  {i < CLAIM_STEPS.length - 1 && (
                    <span className="hidden text-gold/50 sm:mt-3 sm:block sm:pl-10" aria-hidden>
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="relative flex flex-col justify-center border border-white/10 bg-black p-8 transition-all duration-300 hover:border-[#C4A77D]/20 sm:p-10 lg:min-h-full"
          >
            <span className="mb-6 grid h-9 w-9 place-items-center border border-white/10 text-gold" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 3l2.4 6.8H21l-5.4 4 2.1 6.7L12 16.8 6.3 20.5l2.1-6.7L3 9.8h6.6L12 3z" />
              </svg>
            </span>
            <p className="t-display t-h3 mb-4 max-w-[14ch] font-medium text-text">
              Empieza por entender, no por comprar.
            </p>
            <p className="mb-8 max-w-[34ch] text-[15px] font-normal leading-relaxed tracking-wide text-text-muted">
              Una conversación clara hoy puede evitar problemas mañana.
            </p>

            <button
              type="button"
              onClick={() => {
                trackEvent('final_cta_click', { from: 'siniestros' });
                open('siniestros');
              }}
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-sm bg-ivory px-6 text-[13px] font-medium uppercase tracking-[0.14em] text-dark-text transition-opacity duration-200 hover:opacity-90"
            >
              Descubrir mi arquitectura
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-x-1" aria-hidden>
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => {
                trackEvent('advisor_review_requested', { from: 'siniestros' });
                open('siniestros_advisor');
              }}
              className="group mt-5 inline-flex items-center gap-2 self-start py-2 text-[14px] font-medium text-text transition-colors hover:text-gold-light"
            >
              Hablar con un asesor
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </button>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
