'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PatrimonialCore from '@/components/PatrimonialCore';
import { trackEvent, trackOnce } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';
import { rise, softScale } from '@/lib/animations';

export default function Hero() {
  const { open } = useDiagnosis();
  useEffect(() => { trackOnce('hero_viewed'); }, []);

  return (
    <section id="top" className="relative flex min-h-[92svh] items-center overflow-hidden pt-32 md:pt-36">
      <div className="grid-bg" aria-hidden />
      <span className="glow absolute -right-64 -top-72 h-[900px] w-[900px]" aria-hidden />
      <span className="glow glow--signal absolute -left-56 bottom-0 h-[560px] w-[560px]" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-shell items-center gap-16 px-6 pb-20 md:px-10 lg:grid-cols-[1.03fr_.97fr] lg:gap-20 lg:pb-28">
        <div>
          <motion.p custom={0} variants={rise} initial="hidden" animate="show" className="t-label mb-7 flex items-center gap-3 text-gold">
            <span className="fret" aria-hidden />
            Arquitectura patrimonial
          </motion.p>

          <motion.h1 custom={1} variants={rise} initial="hidden" animate="show" className="t-display t-h1 max-w-[15ch]">
            Tu patrimonio no necesita más productos. Necesita una{' '}
            <span className="t-glow">arquitectura</span>.
          </motion.h1>

          <motion.p custom={2} variants={rise} initial="hidden" animate="show" className="t-lede mt-8 max-w-[46ch] text-text-muted">
            Integramos protección, ahorro e inversión dentro de una estructura clara,
            comprensible y acompañada.
          </motion.p>

          <motion.div custom={3} variants={rise} initial="hidden" animate="show" className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => { trackEvent('hero_primary_cta_click'); open('hero'); }}
              className="group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-sm bg-gold px-9 text-[15px] font-semibold uppercase tracking-[.13em] text-black transition-all duration-200 hover:bg-gold-light hover:shadow-[0_18px_50px_-24px_rgba(201,167,101,.7)]"
            >
              Diseñar mi arquitectura
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </button>

            <a
              href="#metodo"
              onClick={() => trackEvent('method_link_click', { from: 'hero' })}
              className="group inline-flex items-center gap-3 py-3 text-[15px] font-medium uppercase tracking-[.1em] text-text-muted transition-colors hover:text-gold-light"
            >
              Explorar el método
              <span className="h-px w-7 bg-current transition-all duration-300 group-hover:w-11" aria-hidden />
            </a>
          </motion.div>

          <motion.p custom={4} variants={rise} initial="hidden" animate="show" className="mt-14 flex max-w-[44ch] gap-4 text-[15px] leading-relaxed text-text-muted">
            <span className="mt-1 block h-10 w-px flex-none bg-gradient-to-b from-gold to-transparent" aria-hidden />
            Empieza por una prioridad concreta. El diagnóstico ordena el resto.
          </motion.p>
        </div>

        <motion.div {...softScale}>
          <PatrimonialCore />
        </motion.div>
      </div>
    </section>
  );
}
