'use client';

import { motion } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import { PILLARS, INVESTMENT_NOTE } from '@/lib/constants';
import { trackEvent } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';

/** Matriz asimétrica: dos columnas de distinto peso, sin rejilla uniforme. */
export default function Pillars() {
  const { open } = useDiagnosis();

  return (
    <section id="pilares" className="relative bg-graphite py-24 md:py-28">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-24">
        <SectionLabel n="03">Los pilares</SectionLabel>
        <h2 className="t-display t-h2 mb-16 max-w-[18ch]">
          Cada pilar resuelve algo distinto. <span className="t-glow">Ninguno sustituye a otro.</span>
        </h2>

        <div className="grid gap-x-14 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.22, 0.61, 0.28, 1] }}
              className={`group border-t border-white/10 py-10 ${i % 2 === 1 ? 'md:pt-24' : ''}`}
            >
              <div className="flex items-baseline gap-5">
                <span className="t-display text-[1.4rem] font-normal tabular-nums text-white/25">{p.n}</span>
                <h3 className="t-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] transition-colors group-hover:text-gold-light">{p.title}</h3>
              </div>

              <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-text-muted">{p.body}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.items.map((it) => (
                  <li key={it} className="rounded-sm border border-white/12 px-3 py-1.5 text-[14px] uppercase tracking-[.1em] text-text-muted">{it}</li>
                ))}
              </ul>

              {p.id === 'inversion' && (
                <p className="mt-6 max-w-[48ch] border-l border-gold/50 py-2 pl-5 text-[15px] leading-relaxed text-text-muted">
                  {INVESTMENT_NOTE}
                </p>
              )}

              <button
                type="button"
                onClick={() => { trackEvent(p.event, { pillar: p.id }); open(`pilar_${p.id}`); }}
                className="mt-8 inline-flex items-center gap-3 py-2 text-[14px] font-semibold uppercase tracking-[.14em] text-gold transition-colors hover:text-gold-light"
              >
                {p.cta}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
