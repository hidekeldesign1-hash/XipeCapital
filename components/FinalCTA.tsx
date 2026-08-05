'use client';

import { motion } from 'framer-motion';
import KineticText from '@/components/ui/KineticText';
import LiquidButton from '@/components/ui/LiquidButton';
import { EASE } from '@/lib/motion';
import { trackEvent } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';

/** Cierre: las rutas convergen en un solo circuito. */
export default function FinalCTA() {
  const { open } = useDiagnosis();

  const routes = [
    'M20 180 V120 H120 V80 H250',
    'M20 20 V70 H140 V100 H250',
    'M480 180 V130 H370 V90 H250',
    'M480 24 V72 H360 V104 H250',
  ];

  return (
    <section className="relative overflow-hidden bg-white py-28 text-center md:py-36">
      <span className="daylight" aria-hidden />
      <span className="caustic absolute left-1/2 top-8 h-[520px] w-[520px] -translate-x-1/2 bg-champagne" aria-hidden />
      <span className="caustic absolute bottom-0 left-1/4 h-[320px] w-[320px] bg-mint-light" style={{ ['--dur' as string]: '24s' } as React.CSSProperties} aria-hidden />

      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <motion.svg
          viewBox="0 0 500 200" className="mx-auto mb-12 w-full max-w-[420px]"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
          role="img" aria-label="Las rutas convergen en un solo punto"
        >
          {routes.map((d, i) => (
            <motion.path
              key={i} d={d} fill="none" stroke="var(--xipe-gold)" strokeWidth="1.3" strokeLinecap="square"
              variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { delay: 0.1 + i * 0.13, duration: 0.9, ease: EASE } } }}
            />
          ))}
          <motion.circle
            cx="250" cy="98" r="12" fill="var(--xipe-mint-light)" stroke="var(--xipe-mint)"
            variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { delay: 0.75, duration: 0.55, ease: EASE } } }}
            style={{ transformOrigin: '250px 98px' }}
          />
        </motion.svg>

        <motion.h2
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="t-display t-h2 mx-auto max-w-[15ch]"
        >
          Tu patrimonio ya existe. Ahora dale una{' '}
          <KineticText text="arquitectura" className="text-gold-ink" />.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <LiquidButton onClick={() => { trackEvent('final_cta_click'); open('cierre'); }}>
            Diseñar mi arquitectura
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </LiquidButton>
          <LiquidButton variant="quiet" href="#servicios">Explorar servicios</LiquidButton>
        </motion.div>
      </div>
    </section>
  );
}
