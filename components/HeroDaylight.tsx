'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import LivingArchitecture from '@/components/LivingArchitecture';
import LiquidButton from '@/components/ui/LiquidButton';
import KineticText from '@/components/ui/KineticText';
import { revealUp } from '@/lib/motion';
import { trackEvent, trackOnce } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';

export default function HeroDaylight() {
  const { open } = useDiagnosis();

  useEffect(() => {
    trackOnce('variant_viewed');
    trackOnce('hero_viewed');
  }, []);

  return (
    <section id="top" className="relative flex min-h-[95svh] items-center overflow-hidden pt-32 md:pt-36">
      <span className="daylight" aria-hidden />
      <span className="caustic absolute -right-28 top-10 h-[420px] w-[420px] bg-champagne" style={{ ['--dur' as string]: '22s' } as React.CSSProperties} aria-hidden />
      <span className="caustic absolute -left-24 bottom-0 h-[360px] w-[360px] bg-mint-light" style={{ ['--dur' as string]: '18s' } as React.CSSProperties} aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-shell items-center gap-14 px-6 pb-16 md:px-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-16">
        <div>
          <motion.p custom={0} variants={revealUp} initial="hidden" animate="show" className="t-label mb-7 text-gold-ink">
            Arquitectura patrimonial
          </motion.p>

          <motion.h1 custom={1} variants={revealUp} initial="hidden" animate="show" className="t-display t-h1 max-w-[13ch]">
            Tu patrimonio, diseñado como un{' '}
            <KineticText text="sistema" className="text-gold-ink" />.
          </motion.h1>

          <motion.p custom={2} variants={revealUp} initial="hidden" animate="show" className="t-lede mt-7 max-w-[42ch]">
            Protección, ahorro e inversión dentro de una arquitectura clara que evoluciona contigo.
          </motion.p>

          <motion.div custom={3} variants={revealUp} initial="hidden" animate="show" className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <LiquidButton onClick={() => { trackEvent('hero_primary_cta_click'); open('hero'); }}>
              Diseñar mi arquitectura
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </LiquidButton>

            <LiquidButton
              variant="glass" href="#arquitectura"
              onClick={() => trackEvent('architecture_explore_click')}
            >
              Explorar las capas
            </LiquidButton>
          </motion.div>

          <motion.p custom={4} variants={revealUp} initial="hidden" animate="show" className="mt-7 text-[15px] text-muted">
            Empieza por una prioridad concreta.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 0.61, 0.28, 1] }}>
          <LivingArchitecture />
        </motion.div>
      </div>
    </section>
  );
}
