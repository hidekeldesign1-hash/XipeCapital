'use client';

import { motion } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import { ARTICLES } from '@/lib/constants';
import { trackEvent } from '@/lib/tracking';

/** Sección luminosa editorial. */
export default function Education() {
  const lead = ARTICLES.find((a) => a.lead)!;
  const rest = ARTICLES.filter((a) => !a.lead);

  return (
    <section id="recursos" className="relative bg-warm-white py-24 text-dark-text md:py-36">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-24">
        <SectionLabel n="08" tone="light">Recursos</SectionLabel>
        <h2 className="t-display t-h2 mb-14 max-w-[20ch] text-dark-text">
          Comprender antes de decidir.
        </h2>

        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); trackEvent('article_clicked', { article: lead.n }); }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.28, 1] }}
          className="group flex min-h-[280px] flex-col justify-end gap-6 border border-dark-text/12 bg-ivory p-8 transition-all duration-300 hover:border-gold-muted/50 md:p-12"
        >
          <span className="flex items-center gap-5 text-[13px] uppercase tracking-[.16em] text-dark-text/45">
            <span className="text-gold-muted">{lead.n}</span>
            <span>{lead.tag}</span>
            <span>{lead.time}</span>
          </span>
          <h3 className="t-display max-w-[20ch] text-[clamp(1.6rem,1.2rem+1.7vw,2.6rem)] text-dark-text">{lead.title}</h3>
          <span className="inline-flex items-center gap-3 text-[14px] font-semibold uppercase tracking-[.14em] text-gold-muted">
            Leer
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </span>
        </motion.a>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((a, i) => (
            <motion.a
              key={a.n}
              href="#"
              onClick={(e) => { e.preventDefault(); trackEvent('article_clicked', { article: a.n }); }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 0.61, 0.28, 1] }}
              className="group flex flex-col justify-between gap-6 border border-dark-text/12 bg-ivory p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-muted/50"
            >
              <span className="flex items-center gap-4 text-[13px] uppercase tracking-[.16em] text-dark-text/45">
                <span className="text-gold-muted">{a.n}</span>
                <span>{a.time}</span>
              </span>
              <h3 className="t-display text-[1.2rem] text-dark-text">{a.title}</h3>
              <span className="inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[.14em] text-gold-muted">
                Leer
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>

        <p className="mt-10 inline-flex items-center gap-2 rounded-sm border border-dashed border-gold-muted/40 bg-gold-muted/5 px-3 py-1.5 text-[14px] text-gold-muted">
          [CONTENIDOS POR REDACTAR — ENLACES DE DEMOSTRACIÓN]
        </p>
      </div>
    </section>
  );
}
