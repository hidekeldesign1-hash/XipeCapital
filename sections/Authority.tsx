'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import { trackOnce } from '@/lib/tracking';

export default function Authority() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && trackOnce('team_viewed'),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="firma" ref={ref} className="relative bg-black py-24 md:py-36">
      <span className="glow absolute -right-40 top-10 h-[560px] w-[560px]" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-shell items-center gap-14 px-6 md:px-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.28, 1] }}
          className="relative mx-auto grid aspect-[4/5] w-full max-w-[420px] place-items-center overflow-hidden border border-white/10 bg-deep"
        >
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px)] bg-[length:100%_7px]" aria-hidden />
          <span className="relative z-10 grid justify-items-center gap-6 px-8 text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#806A42" strokeWidth="0.8" aria-hidden>
              <circle cx="32" cy="23" r="11" /><path d="M9 58c0-12.7 10.3-23 23-23s23 10.3 23 23" />
            </svg>
            <span className="text-[13px] uppercase tracking-[.24em] text-gold-muted">
              [FOTOGRAFÍA INSTITUCIONAL PENDIENTE]
            </span>
          </span>
          <span className="absolute bottom-0 left-0 h-px w-[38%] bg-gold" aria-hidden />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.61, 0.28, 1] }}
        >
          <SectionLabel n="06">La firma</SectionLabel>
          <h2 className="t-display t-h3 mb-8 max-w-[22ch]">
            La estructura organiza el proceso. <span className="t-glow">El criterio humano dirige la decisión.</span>
          </h2>

          <blockquote className="mb-9 border-l border-gold pl-6">
            <p className="t-lede max-w-[46ch] text-text">
              Un producto se contrata en una tarde. Una arquitectura se diseña
              entendiendo qué necesita sostener.
            </p>
          </blockquote>

          <p className="t-display mb-2 text-[1.3rem]">
            Manuel{' '}
            <span className="ml-2 inline-flex items-center gap-2 rounded-sm border border-dashed border-gold/40 bg-gold/5 px-2 py-1 align-middle text-[14px] font-normal tracking-normal text-gold">
              [APELLIDO PENDIENTE]
            </span>
          </p>
          <p className="mb-8 text-[16px] text-text-muted">
            Responsable de la asesoría y del acompañamiento en Xipe Capital Group.
          </p>

          <ul className="grid gap-3">
            {[
              '[CÉDULA, FIGURA DE OPERACIÓN Y REGISTRO PENDIENTES]',
              '[TRAYECTORIA Y AÑOS DE EXPERIENCIA PENDIENTES]',
              '[INSTITUCIONES CON LAS QUE SE OPERA PENDIENTES]',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 border border-gold" aria-hidden />
                <span className="inline-flex rounded-sm border border-dashed border-gold/40 bg-gold/5 px-3 py-1.5 text-[14px] leading-relaxed text-gold">{t}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[50ch] text-[16px] leading-relaxed text-text-muted">
            Áreas de trabajo: estructura de protección, liquidez y reserva, criterios de
            asignación de capital, y continuidad patrimonial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
