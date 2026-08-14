'use client';

import { motion } from 'framer-motion';
import { useDiagnosis } from '@/components/Diagnosis';
import ArchitecturePyramid from '@/components/ArchitecturePyramid';
import { trackEvent } from '@/lib/tracking';
import { EASE } from '@/lib/animations';

/**
 * Cierre visual: pirámide de arquitectura financiera (plano técnico interactivo).
 */
export default function ArquitecturaCierre() {
  const { open } = useDiagnosis();

  return (
    <section id="arquitectura-cierre" className="relative overflow-hidden bg-black py-24 md:py-28">
      <div className="grid-bg opacity-60" aria-hidden />

      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto mb-12 max-w-[720px]"
        >
          <ArchitecturePyramid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
          className="mx-auto max-w-[44rem] text-center"
        >
          <h2 className="t-display t-h2 mx-auto max-w-[34ch] font-medium sm:max-w-[38ch]">
            Has construido mucho.
            <br />
            <span className="text-gold">
              Ahora diseñemos la estructura que lo protege, lo ordena y lo hace crecer.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[48ch] text-[16px] font-normal leading-relaxed tracking-wide text-text-muted md:text-[17px]">
            En Xipe convertimos objetivos, protección, ahorro e inversión en una
            arquitectura patrimonial clara, estratégica y acompañada.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <button
              type="button"
              onClick={() => {
                trackEvent('final_cta_click', { from: 'arquitectura_cierre' });
                open('arquitectura_cierre');
              }}
              className="group inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-sm bg-gold px-8 text-[13px] font-medium uppercase tracking-[0.14em] text-black transition-opacity duration-200 hover:opacity-90 sm:w-auto"
            >
              Diseñar mi arquitectura
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-x-1" aria-hidden>
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </button>

            <a
              href="#metodo"
              onClick={() => trackEvent('method_link_click', { from: 'arquitectura_cierre' })}
              className="group inline-flex items-center gap-3 py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-light"
            >
              Explorar el método
              <span className="h-px w-7 bg-current transition-all duration-300 group-hover:w-11" aria-hidden />
            </a>
          </div>

          <p className="mx-auto mt-8 max-w-[40ch] text-[13px] leading-relaxed text-text-muted md:text-[14px]">
            Empieza por una conversación clara. En cinco preguntas entendemos por dónde conviene comenzar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
