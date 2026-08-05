'use client';

import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';

/**
 * Cierre cinematográfico. Las cuatro capas convergen en una sola figura
 * escalonada: la arquitectura terminada, que es también la greca de Xipe.
 */
export default function FinalCTA() {
  const { open } = useDiagnosis();

  const tiers = [
    { w: 340, y: 208 },
    { w: 258, y: 156 },
    { w: 176, y: 104 },
    { w: 96, y: 52 },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-28 text-center md:py-40">
      <span className="glow absolute left-1/2 top-1/3 h-[760px] w-[760px] -translate-x-1/2" aria-hidden />

      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <motion.svg
          viewBox="0 0 440 300"
          className="mx-auto mb-12 w-full max-w-[380px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          role="img"
          aria-label="Las cuatro capas convergen en una sola estructura"
        >
          {tiers.map((t, i) => (
            <motion.g
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.16, duration: 0.8, ease: [0.22, 0.61, 0.28, 1] } },
              }}
            >
              <rect x={220 - t.w / 2} y={t.y} width={t.w} height="44" fill="rgba(201,167,101,.07)" stroke="#C9A765" strokeWidth="1" />
              <path d={`M${220 - t.w / 2 + 18} ${t.y} v-9 h20 v9`} fill="none" stroke="#E6D09A" strokeWidth="1" />
              <path d={`M${220 + t.w / 2 - 38} ${t.y} v-9 h20 v9`} fill="none" stroke="#E6D09A" strokeWidth="1" />
            </motion.g>
          ))}
          <motion.line
            x1="60" y1="264" x2="380" y2="264" stroke="#806A42" strokeWidth="1"
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { delay: 0.1, duration: 0.9 } } }}
          />
        </motion.svg>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 0.61, 0.28, 1] }}
          className="t-display t-h2 mx-auto max-w-[17ch]"
        >
          Has construido mucho. <span className="t-glow">Ahora construyamos la estructura que lo sostiene.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 0.61, 0.28, 1] }}
          className="t-lede mx-auto mt-7 max-w-[46ch] text-text-muted"
        >
          Empieza por una prioridad. En cinco preguntas obtienes una lectura clara de
          por dónde conviene comenzar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.28, 1] }}
          className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => { trackEvent('final_cta_click'); open('cierre'); }}
            className="group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-sm bg-gold px-10 text-[15px] font-semibold uppercase tracking-[.13em] text-black transition-all duration-200 hover:bg-gold-light hover:shadow-[0_18px_50px_-24px_rgba(201,167,101,.7)]"
          >
            Diseñar mi arquitectura
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </button>

          <a
            href="#metodo"
            onClick={() => trackEvent('method_link_click', { from: 'cierre' })}
            className="group inline-flex items-center gap-3 py-3 text-[15px] uppercase tracking-[.1em] text-text-muted transition-colors hover:text-gold-light"
          >
            Explorar el método
            <span className="h-px w-7 bg-current transition-all duration-300 group-hover:w-11" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
