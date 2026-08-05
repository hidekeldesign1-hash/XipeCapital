'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LiquidPanel from '@/components/ui/LiquidPanel';
import LiquidButton from '@/components/ui/LiquidButton';
import GrecaConnector from '@/components/greca/GrecaConnector';
import { SERVICES } from '@/lib/constants';
import { EASE } from '@/lib/motion';
import { trackEvent, trackOnce, markFirstInteraction } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';

/**
 * Service constellation: los servicios orbitan un núcleo y se conectan con
 * greca. Uno se ve en detalle; el resto quedan como accesos breves.
 * En móvil se convierte en lista interactiva, no en carrusel automático.
 */
export default function ServiceConstellation() {
  const ref = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const { open } = useDiagnosis();
  const active = SERVICES.find((s) => s.id === activeId)!;

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && trackOnce('service_section_viewed'), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (id: string) => {
    setActiveId(id);
    markFirstInteraction('services');
    const s = SERVICES.find((x) => x.id === id)!;
    trackEvent('service_selected', { service: id });
    trackEvent(s.event, { service: id });
  };

  return (
    <section id="servicios" ref={ref} className="relative overflow-hidden bg-day py-24 md:py-32">
      <span className="daylight" aria-hidden />
      <span className="caustic absolute right-0 top-1/4 h-[380px] w-[380px] bg-champagne" aria-hidden />

      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <p className="t-label mb-6 text-gold-ink">03 · Servicios</p>
        <h2 className="t-display t-h2 mb-12 max-w-[13ch]">Una arquitectura. Distintas rutas.</h2>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          {/* Constelación — escritorio */}
          <div className="relative hidden aspect-square w-full lg:block">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              {SERVICES.map((s, k) => (
                <GrecaConnector key={s.id} from={{ x: 50, y: 50 }} to={{ x: s.x, y: s.y }} active={s.id === activeId} delay={k * 0.08} />
              ))}
              <circle cx="50" cy="50" r="6" fill="rgba(255,255,255,.85)" stroke="var(--xipe-gold)" strokeWidth="0.5" />
              <text x="50" y="61" textAnchor="middle" fontSize="3.1" letterSpacing="0.8" fill="var(--xipe-muted)">PATRIMONIO</text>
            </svg>

            {SERVICES.map((s) => {
              const on = s.id === activeId;
              const scale = s.size === 'lg' ? 1 : s.size === 'md' ? 0.9 : 0.82;
              return (
                <button
                  key={s.id} type="button" aria-pressed={on}
                  onMouseEnter={() => select(s.id)} onFocus={() => select(s.id)} onClick={() => select(s.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  <span
                    className={`liquid liquid-sheen block min-h-[48px] rounded-full px-5 py-3 text-[15px] font-semibold transition-all duration-200 ease-xipe ${
                      on ? 'text-ink shadow-liquid-lg' : 'text-muted hover:text-ink'
                    }`}
                    style={{ transform: `scale(${on ? scale * 1.06 : scale})`, borderColor: on ? 'var(--xipe-mint)' : undefined }}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Lista interactiva — móvil y tablet */}
          <div className="flex flex-wrap gap-2 lg:hidden">
            {SERVICES.map((s) => (
              <button
                key={s.id} type="button" aria-pressed={s.id === activeId} onClick={() => select(s.id)}
                className={`min-h-[48px] rounded-full px-5 text-[15px] font-semibold transition-all duration-200 ease-xipe ${
                  s.id === activeId ? 'bg-ink text-day' : 'liquid text-muted'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Detalle del servicio activo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <LiquidPanel strong className="rounded-3xl p-8 md:p-10">
                <svg viewBox="0 0 120 60" className="mb-7 h-14 w-32" aria-hidden>
                  <motion.path
                    d="M4 46 h22 v-16 h18 v16 h22 v-28 h18 v28 h32"
                    fill="none" stroke="var(--xipe-gold)" strokeWidth="1.4" strokeLinecap="square"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE }}
                  />
                  <motion.circle
                    cx="4" cy="46" r="3" fill="var(--xipe-mint)"
                    animate={{ cx: [4, 116], cy: [46, 46] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                </svg>

                <h3 className="t-display t-h3 mb-4">{active.name}</h3>
                <p className="t-body mb-8 max-w-[36ch]">{active.line}</p>

                <LiquidButton onClick={() => open(`servicio_${active.id}`)}>{active.cta}</LiquidButton>
              </LiquidPanel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
