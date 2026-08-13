'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FIRM_CREDENTIALS, FIRM_STATS } from '@/lib/constants';
import { trackOnce } from '@/lib/tracking';
import { EASE } from '@/lib/animations';

const STAT_ICONS: Record<string, React.ReactNode> = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <circle cx="9" cy="8" r="3" /><circle cx="16" cy="9" r="2.5" /><path d="M3 19c.8-3.5 3.2-5 6-5s5.2 1.5 6 5" /><path d="M14 14c2.2 0 4.2 1 5 3.5" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path d="M12 3l8 3v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3z" />
    </svg>
  ),
};

export default function LaFirma() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && trackOnce('team_viewed'),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="firma" ref={ref} className="relative overflow-hidden bg-black py-24 md:py-28 lg:py-32">

      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-20">
          {/* Columna foto + testimonio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="t-label mb-6 text-gold lg:hidden">
              <span className="text-gold-muted">—</span> 06 La firma
            </p>

            <figure className="relative border border-white/10 bg-deep">
              <span className="absolute left-3 top-3 z-10 grid h-8 w-8 place-items-center border border-white/15 bg-black/40 text-gold" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 12h16M12 4v16" />
                </svg>
              </span>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/advisor-portrait.jpg"
                  alt="Asesor de Xipe Capital Group"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-5 pb-5 pt-20">
                  <p className="t-label text-[11px] leading-relaxed text-gold sm:text-[12px]">
                    Enfoque humano. Estructura que trasciende.
                  </p>
                </div>
              </div>
            </figure>

            <blockquote className="mt-7 flex gap-4">
              <span className="mt-1 text-2xl leading-none text-gold" aria-hidden>“</span>
              <div>
                <p className="max-w-[40ch] text-[16px] leading-relaxed text-text md:text-[17px]">
                  Xipe me ayudó a entender lo que realmente necesitaba y a tomar
                  decisiones con claridad y tranquilidad.
                </p>
                <footer className="mt-3 text-[13px] uppercase tracking-[0.14em] text-text-muted">
                  — Cliente de Xipe
                </footer>
              </div>
            </blockquote>
          </motion.div>

          {/* Columna copy + credenciales */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="lg:pt-2"
          >
            <p className="t-label mb-6 hidden text-gold lg:block">
              <span className="text-gold-muted">—</span> 06 La firma
            </p>
            <h2 className="t-display t-h2 mb-7 max-w-[16ch] font-medium">
              La estructura organiza el proceso. El criterio humano dirige la{' '}
              <span className="text-gold">decisión</span>.
            </h2>

            <p className="mb-9 max-w-[46ch] border-l border-white/15 pl-5 text-[16px] font-normal leading-relaxed tracking-wide text-text-muted md:text-[17px]">
              Técnica y criterio se encuentran aquí: una arquitectura clara, explicada
              con calma, y un acompañamiento que no desaparece después de firmar.
            </p>

            <p className="t-display mb-2 text-[1.25rem] font-medium text-text">
              Manuel{' '}
              <span className="ml-1 inline-flex items-center border-b border-white/20 px-0.5 align-middle text-[13px] font-sans font-normal tracking-normal text-text-muted">
                [Apellido]
              </span>
            </p>
            <p className="mb-8 text-[15px] text-text-muted">
              Responsable de la asesoría y del acompañamiento en Xipe Capital Group.
            </p>

            <ul className="grid gap-3 sm:grid-cols-2">
              {FIRM_CREDENTIALS.map((t) => (
                <li key={t}>
                  <span className="flex min-h-[48px] items-center border border-white/10 px-4 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-8 md:mt-16 md:pt-12">
          {FIRM_STATS.map((s) => (
            <div key={s.label} className="flex items-start gap-4">
              <span className="mt-1 text-gold" aria-hidden>
                {STAT_ICONS[s.icon]}
              </span>
              <div>
                <p className="t-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] leading-none text-text">
                  {s.value}
                </p>
                <p className="mt-2 text-[14px] text-text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
