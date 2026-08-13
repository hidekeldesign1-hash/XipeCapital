'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PatrimonialCore from '@/components/PatrimonialCore';
import { trackEvent, trackOnce } from '@/lib/tracking';
import { rise, softScale } from '@/lib/animations';

export default function Hero() {
  useEffect(() => { trackOnce('hero_viewed'); }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-[4.25rem] md:pt-[4.5rem] lg:h-[100svh] lg:max-h-[100svh]">
      <div className="grid-bg" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-shell items-center gap-6 px-6 py-6 md:px-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-8 xl:px-20">
        <div>
          <motion.p custom={0} variants={rise} initial="hidden" animate="show" className="t-label mb-4 flex items-center gap-3 text-gold">
            <span className="fret" aria-hidden />
            Arquitectura patrimonial
          </motion.p>

          <motion.h1 custom={1} variants={rise} initial="hidden" animate="show" className="t-display max-w-[14ch] text-[clamp(1.85rem,1.05rem+3vw,3.65rem)] font-medium leading-[1.08]">
            Tu patrimonio no necesita más productos. Necesita una{' '}
            <span className="t-glow">arquitectura</span>.
          </motion.h1>

          <motion.p custom={2} variants={rise} initial="hidden" animate="show" className="mt-5 max-w-[42ch] text-[15px] font-normal leading-relaxed tracking-wide text-text-muted md:text-[16px]">
            Integramos protección, ahorro e inversión dentro de una estructura clara,
            comprensible y acompañada.
          </motion.p>

          <motion.div custom={3} variants={rise} initial="hidden" animate="show" className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#diagnostico"
              onClick={() => trackEvent('hero_primary_cta_click')}
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-sm bg-gold px-6 text-[12px] font-medium uppercase tracking-[.14em] text-black transition-opacity duration-200 hover:opacity-90 sm:min-h-[48px] sm:px-7 sm:text-[13px]"
            >
              Diseñar mi arquitectura
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </a>

            <a
              href="#diagnostico"
              onClick={() => trackEvent('method_link_click', { from: 'hero' })}
              className="group inline-flex items-center justify-center gap-3 py-2 text-[12px] font-medium uppercase tracking-[.12em] text-text-muted transition-colors hover:text-gold-light sm:justify-start sm:text-[13px]"
            >
              Empezar diagnóstico
              <span className="h-px w-7 bg-current transition-all duration-300 group-hover:w-11" aria-hidden />
            </a>
          </motion.div>

          <motion.p
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] tracking-wide text-text-muted sm:text-[13px]"
          >
            <span>5 preguntas</span>
            <span className="text-gold/50" aria-hidden>·</span>
            <span>aproximadamente 3 minutos</span>
            <span className="text-gold/50" aria-hidden>·</span>
            <span>sin compromiso</span>
          </motion.p>
        </div>

        <motion.div {...softScale} className="mx-auto w-full max-w-[min(100%,42svh)] lg:max-w-[min(100%,48svh)]">
          <PatrimonialCore />
        </motion.div>
      </div>
    </section>
  );
}
