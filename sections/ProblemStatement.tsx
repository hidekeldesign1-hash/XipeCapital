'use client';

import { motion } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import { PROBLEM_CONCEPTS } from '@/lib/constants';

/** Sección luminosa: rompe el ritmo oscuro y sostiene la tesis. */
export default function ProblemStatement() {
  return (
    <section className="relative bg-ivory py-24 text-dark-text md:py-36">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-24">
          <div>
            <SectionLabel n="01" tone="light">La tesis</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.75, ease: [0.22, 0.61, 0.28, 1] }}
              className="t-display t-h2 max-w-[20ch] text-dark-text"
            >
              La mayoría de las personas acumula productos financieros. Muy pocas construyen una estructura.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 0.61, 0.28, 1] }}
            className="lg:pt-24"
          >
            <p className="t-lede max-w-[48ch] text-dark-text/70">
              Un seguro por aquí, una inversión por allá, un ahorro sin destino claro.
              Cada pieza puede ser correcta por separado y aun así no sostener nada en
              conjunto. La diferencia no está en tener más productos: está en que cada
              uno cumpla una función dentro de la misma estructura.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-0 border-t border-dark-text/12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {PROBLEM_CONCEPTS.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 0.61, 0.28, 1] }}
              className="border-b border-dark-text/12 py-8 lg:border-b-0"
            >
              <p className="t-display mb-4 text-[2.75rem] font-normal leading-none text-dark-text/25">{c.n}</p>
              <h3 className="t-display mb-3 text-[1.3rem] text-dark-text">{c.title}</h3>
              <p className="max-w-[32ch] text-[16px] leading-relaxed text-dark-text/65">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
