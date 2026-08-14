'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DIAGNOSIS_PRIORITIES } from '@/lib/constants';
import { useDiagnosis } from '@/components/Diagnosis';
import { trackEvent } from '@/lib/tracking';
import { EASE } from '@/lib/animations';

const ICONS: Record<string, React.ReactNode> = {
  family: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10" aria-hidden>
      <circle cx="18" cy="14" r="5" /><circle cx="30" cy="14" r="5" />
      <path d="M8 38c1.5-7 5.5-11 10-11s8.5 4 10 11" /><path d="M20 38c1.5-7 5.5-11 10-11s8.5 4 10 11" />
    </svg>
  ),
  retire: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10" aria-hidden>
      <path d="M8 34h32" /><path d="M12 34V22l12-10 12 10v12" /><path d="M20 34v-8h8v8" />
    </svg>
  ),
  edu: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10" aria-hidden>
      <path d="M6 20l18-10 18 10-18 10L6 20z" /><path d="M12 23v10c0 2 6 6 12 6s12-4 12-6V23" /><path d="M42 20v12" />
    </svg>
  ),
  invest: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10" aria-hidden>
      <path d="M10 34V22M20 34V16M30 34V24M38 34V12" /><path d="M8 38h32" />
    </svg>
  ),
  reserve: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10" aria-hidden>
      <rect x="10" y="14" width="28" height="22" rx="1" /><path d="M10 22h28M18 14v-4h12v4" />
    </svg>
  ),
  health: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10" aria-hidden>
      <path d="M24 10v28M10 24h28" /><rect x="12" y="12" width="24" height="24" rx="2" />
    </svg>
  ),
  order: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10" aria-hidden>
      <path d="M12 14h24M12 24h18M12 34h22" /><rect x="8" y="8" width="32" height="32" rx="1" />
    </svg>
  ),
  business: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10" aria-hidden>
      <rect x="8" y="18" width="32" height="20" /><path d="M16 18v-6h16v6M8 26h32" />
    </svg>
  ),
  unknown: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10" aria-hidden>
      <circle cx="24" cy="24" r="14" /><path d="M18.5 19c1.2-3 4-4.5 6.5-4.2 2.8.3 5 2.4 5 5.2 0 3.2-2.8 4.5-5 5.5v2" /><circle cx="24" cy="33" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default function Diagnostico() {
  const { open } = useDiagnosis();
  const [selected, setSelected] = useState<string | null>('no_se');

  return (
    <section id="diagnostico" className="relative overflow-hidden bg-black py-24 md:py-28">
      <div className="grid-bg opacity-50" aria-hidden />

      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10 xl:px-24">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <p className="t-label mb-4 text-gold">
              <span className="text-gold-muted">—</span> 01 Diagnóstico
            </p>
            <h2 className="t-display t-h2 max-w-[16ch] font-medium">¿Qué quieres resolver primero?</h2>
          </div>
          <p className="max-w-[36ch] text-[15px] font-normal leading-relaxed tracking-wide text-text-muted md:pb-2 md:text-right">
            Empieza por una prioridad concreta. El diagnóstico ordena el resto de la arquitectura.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {DIAGNOSIS_PRIORITIES.map((item, i) => {
            const on = selected === item.value;
            return (
              <motion.button
                key={item.value}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: EASE }}
                onClick={() => {
                  setSelected(item.value);
                  trackEvent('diagnosis_step_completed', { step: '01', field: 'primary_priority', value: item.value });
                  open('diagnostico_section', { priority: item.value });
                }}
                className={`group flex min-h-[132px] flex-col items-center justify-center gap-4 rounded-sm border px-3 py-6 text-center transition-all duration-300 sm:min-h-[148px] sm:px-4 ${
                  on
                    ? 'border-[#C4A77D]/35 bg-white/[0.03]'
                    : 'border-white/10 bg-transparent hover:border-[#C4A77D]/35 hover:bg-white/[0.02]'
                }`}
              >
                <span className={`transition-colors duration-300 ${on ? 'text-gold-light' : 'text-gold group-hover:text-gold-light'}`}>
                  {ICONS[item.icon]}
                </span>
                <span className={`text-[13px] font-medium leading-snug tracking-wide sm:text-[14px] ${on ? 'text-text' : 'text-text-muted group-hover:text-text'}`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
