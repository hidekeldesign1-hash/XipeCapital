'use client';

import { useEffect, useRef } from 'react';
import LiquidPanel from '@/components/ui/LiquidPanel';
import SectionReveal from '@/components/ui/SectionReveal';
import GrecaDivider from '@/components/greca/GrecaDivider';
import { PROCESS_SIGNALS } from '@/lib/constants';
import { trackOnce } from '@/lib/tracking';

export default function AuthorityProcess() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && trackOnce('authority_viewed'), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="xipe" ref={ref} className="relative overflow-hidden bg-day py-24 md:py-32">
      <span className="daylight" aria-hidden />
      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <p className="t-label mb-6 text-gold-ink">05 · Xipe</p>
        <h2 className="t-display t-h2 mb-14 max-w-[16ch]">Tecnología para ordenar. Criterio para decidir.</h2>

        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <SectionReveal>
            {/* Retrato luminoso: placeholder, nunca cuadro gris */}
            <div
              className="relative mx-auto grid aspect-[4/5] w-full max-w-[400px] place-items-center overflow-hidden rounded-3xl"
              style={{ background: 'linear-gradient(158deg, #FFFFFF 0%, #F1E2C4 55%, #C7F2E7 100%)' }}
            >
              <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full opacity-45" aria-hidden>
                <GrecaGrid />
              </svg>
              <span className="relative z-10 grid justify-items-center gap-5 px-8 text-center">
                <svg width="60" height="60" viewBox="0 0 64 64" fill="none" stroke="var(--xipe-gold-ink)" strokeWidth="0.9" aria-hidden>
                  <circle cx="32" cy="23" r="11" /><path d="M9 58c0-12.7 10.3-23 23-23s23 10.3 23 23" />
                </svg>
                <span className="t-label text-[13px] text-gold-ink">[INSERTAR FOTOGRAFÍA AUTORIZADA]</span>
              </span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <LiquidPanel strong className="rounded-3xl p-8 md:p-10">
              <p className="t-display text-[clamp(1.25rem,1.05rem+.9vw,1.75rem)] leading-snug">
                No comenzamos por el producto. Comenzamos por la función que debe cumplir dentro de tu patrimonio.
              </p>

              <div className="my-8 opacity-70">
                <GrecaDivider tone="var(--xipe-gold)" />
              </div>

              <p className="t-display mb-1 text-[1.15rem]">
                Manuel <span className="ml-1 align-middle text-[13px] font-normal tracking-normal text-gold-ink">[VALIDAR NOMBRE Y ROL]</span>
              </p>
              <p className="t-body mb-6">
                <span className="text-gold-ink">[VALIDAR CÉDULA Y FIGURA DE OPERACIÓN]</span>{' '}
                <span className="text-gold-ink">[VALIDAR ESPECIALIDADES]</span>
              </p>

              <ul className="grid gap-4 sm:grid-cols-3">
                {PROCESS_SIGNALS.map((p) => (
                  <li key={p.n} className="border-t pt-4" style={{ borderColor: 'var(--xipe-border-dark)' }}>
                    <span className="t-label mb-2 block text-[13px] text-gold-ink">{p.n}</span>
                    <span className="mb-1 block font-semibold">{p.title}</span>
                    <span className="t-body block text-[15px]">{p.line}</span>
                  </li>
                ))}
              </ul>
            </LiquidPanel>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/** Retícula de greca detrás del retrato. */
function GrecaGrid() {
  const unit = 'h12 v-9 h12 v9 h12';
  return (
    <g stroke="var(--xipe-white)" strokeWidth="1" fill="none">
      {[40, 90, 140, 190].map((y) => (
        <path key={y} d={`M-20 ${y} ${Array.from({ length: 8 }, () => unit).join(' ')}`} />
      ))}
    </g>
  );
}
