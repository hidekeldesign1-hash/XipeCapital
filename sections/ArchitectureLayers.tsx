'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import { LAYERS } from '@/lib/constants';
import { trackOnce } from '@/lib/tracking';
import { useReducedMotionSafe } from '@/components/MotionProvider';
import { EASE, fadeSwap, pinScrub } from '@/lib/animations';

/**
 * LA CAPA VISUAL DE LA MARCA.
 * Cuatro capas se apilan al hacer scroll y, al completarse, forman la
 * silueta escalonada de la greca de Xipe.
 */
export default function ArchitectureLayers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const el = sectionRef.current;
    if (reduced || !el) return;
    let cleanup = () => {};

    (async () => {
      const { gsap, ScrollTrigger, registerGsap } = await import('@/lib/animations/gsap');
      registerGsap();

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const st = ScrollTrigger.create({
          trigger: el,
          ...pinScrub,
          end: '+=320%',
          pin: true,
          onUpdate: (self) => {
            const i = Math.min(LAYERS.length - 1, Math.floor(self.progress * LAYERS.length));
            setActive(i);
          },
        });
        return () => st.kill();
      });

      ScrollTrigger.refresh();
      cleanup = () => mm.revert();
    })();

    return () => cleanup();
  }, [reduced]);

  useEffect(() => {
    trackOnce('architecture_layer_viewed', { layer: LAYERS[active].title });
  }, [active]);

  const layer = LAYERS[active];

  return (
    <section id="arquitectura" ref={sectionRef} className="relative overflow-hidden bg-deep py-24 md:py-0 md:min-h-svh md:flex md:items-center">
      <div className="grid-bg" aria-hidden />
      <span className="glow absolute -left-52 top-1/4 h-[640px] w-[640px]" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-shell items-center gap-14 px-6 md:px-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
        <div>
          <SectionLabel n="02">La arquitectura</SectionLabel>
          <h2 className="t-display t-h2 max-w-[16ch]">
            Cuatro capas. <span className="t-glow">Un solo sistema.</span>
          </h2>

          <div className="mt-4 flex gap-2" role="tablist" aria-label="Capas de la arquitectura">
            {LAYERS.map((l, i) => (
              <button
                key={l.n}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="group flex-1 py-5"
              >
                <span className={`block h-1 w-full transition-colors duration-300 ${i <= active ? 'bg-gold' : 'bg-white/12 group-hover:bg-white/25'}`} />
                <span className="sr-only">{l.title}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={layer.n} {...fadeSwap} className="mt-9">
              <p className="t-label mb-3 text-gold">{layer.n} · {layer.role}</p>
              <h3 className="t-display t-h3 mb-4">{layer.title}</h3>
              <p className="t-lede max-w-[44ch] text-text-muted">{layer.body}</p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {layer.items.map((it) => (
                  <li key={it} className="rounded-sm border border-white/12 px-3 py-1.5 text-[14px] uppercase tracking-[.1em] text-text-muted">{it}</li>
                ))}
              </ul>

              <p className="mt-7 max-w-[46ch] border-l border-gold/50 py-2 pl-5 text-[15px] leading-relaxed text-text-muted">
                {layer.missing}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <LayerStack active={active} />
      </div>
    </section>
  );
}

function LayerStack({ active }: { active: number }) {
  const tiers = [
    { y: 384, w: 460, label: 'Protección' },
    { y: 292, w: 348, label: 'Ahorro' },
    { y: 200, w: 240, label: 'Inversión' },
    { y: 108, w: 132, label: 'Continuidad' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 560 520" className="w-full" role="img" aria-label={`Arquitectura patrimonial: capa activa ${tiers[active].label}`}>
        <line x1="40" y1="476" x2="520" y2="476" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
        {tiers.map((t, i) => {
          const on = i <= active;
          const isTop = i === active;
          const x = 280 - t.w / 2;
          return (
            <motion.g
              key={t.label}
              initial={false}
              animate={{ opacity: on ? 1 : 0.14, y: on ? 0 : 26 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <rect
                x={x} y={t.y} width={t.w} height="72"
                fill={isTop ? 'rgba(201,167,101,.10)' : 'rgba(255,255,255,.02)'}
                stroke={isTop ? '#E6D09A' : on ? '#806A42' : 'rgba(255,255,255,.12)'}
                strokeWidth="1"
              />
              <path
                d={`M${x + 22} ${t.y} v-12 h26 v12`}
                fill="none" stroke={isTop ? '#9DE4D0' : '#806A42'} strokeWidth="1"
              />
              <path
                d={`M${x + t.w - 48} ${t.y} v-12 h26 v12`}
                fill="none" stroke={isTop ? '#9DE4D0' : '#806A42'} strokeWidth="1"
              />
              <text x="280" y={t.y + 44} textAnchor="middle" fill={isTop ? '#F4F2EC' : '#A7AAA4'} fontSize="15" letterSpacing="4" style={{ textTransform: 'uppercase' }}>
                {t.label.toUpperCase()}
              </text>
            </motion.g>
          );
        })}
        <motion.text
          x="280" y="70" textAnchor="middle" fill="#C9A765" fontSize="13" letterSpacing="6"
          initial={false}
          animate={{ opacity: active === 3 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          ESTRUCTURA COMPLETA
        </motion.text>
      </svg>
    </div>
  );
}
