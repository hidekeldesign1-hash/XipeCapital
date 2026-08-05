'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GrecaPath from '@/components/greca/GrecaPath';
import { LIVING_LAYERS } from '@/lib/constants';
import { EASE } from '@/lib/motion';
import { trackEvent, markFirstInteraction } from '@/lib/tracking';

/**
 * XIPE LIVING ARCHITECTURE
 * Cuatro superficies de cristal desplazadas lateralmente y conectadas por
 * un circuito de greca. No es una pirámide ni una escalera: las capas se
 * desplazan en profundidad y el circuito las recorre en ciclo.
 */
export default function LivingArchitecture({ onSelect }: { onSelect?: (id: string) => void }) {
  const [active, setActive] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const el = wrap.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientX - r.left) / r.width - 0.5) * 18,
        y: ((e.clientY - r.top) / r.height - 0.5) * -14,
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  // Cada capa es una superficie desplazada, no un escalón apilado.
  const planes = [
    { id: 'proteccion', x: 40, y: 372, w: 300, depth: 0 },
    { id: 'ahorro', x: 132, y: 288, w: 300, depth: 1 },
    { id: 'inversion', x: 78, y: 204, w: 300, depth: 2 },
    { id: 'continuidad', x: 168, y: 120, w: 300, depth: 3 },
  ];

  const select = (id: string) => {
    setActive((cur) => (cur === id ? null : id));
    markFirstInteraction('living_architecture');
    trackEvent('living_architecture_interaction', { layer: id });
    trackEvent('architecture_layer_selected', { layer: id });
    onSelect?.(id);
  };

  const line = LIVING_LAYERS.find((l) => l.id === active);

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[600px]">
      <motion.div
        animate={{ rotateY: tilt.x * 0.4, rotateX: tilt.y * 0.4 }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
        style={{ transformPerspective: 1200 }}
      >
        <svg viewBox="0 0 520 520" className="w-full" role="img" aria-label="Arquitectura viva: cuatro capas conectadas por un circuito">
          <defs>
            <linearGradient id="glassA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".9" />
              <stop offset="100%" stopColor="#EAEFEB" stopOpacity=".45" />
            </linearGradient>
            <linearGradient id="glassOn" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".96" />
              <stop offset="100%" stopColor="#C7F2E7" stopOpacity=".6" />
            </linearGradient>
          </defs>

          {/* Circuito de greca: recorre las cuatro superficies en ciclo */}
          <g opacity=".9">
            <GrecaPath
              d="M56 400 V352 H120 V320 H420 V268 H360 V236 H132 V184 H300 V152 H452 V104 H396"
              stroke="var(--xipe-gold)" width={1.15} sweep sweepDur={11} duration={1.6}
            />
          </g>

          {planes.map((p, i) => {
            const on = active === p.id;
            const layer = LIVING_LAYERS[i];
            return (
              <motion.g
                key={p.id}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.75, ease: EASE }}
                style={{ x: tilt.x * (p.depth * 0.5), y: tilt.y * (p.depth * 0.4) }}
              >
                <g
                  role="button" tabIndex={0}
                  aria-pressed={on}
                  aria-label={`${layer.name}: ${layer.line}`}
                  className="cursor-pointer outline-none"
                  onClick={() => select(p.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(p.id); } }}
                >
                  <rect
                    x={p.x} y={p.y} width={p.w} height="62" rx="14"
                    fill={on ? 'url(#glassOn)' : 'url(#glassA)'}
                    stroke={on ? 'var(--xipe-mint)' : 'var(--xipe-border)'}
                    strokeWidth="1"
                    style={{ transition: 'fill .24s var(--ease), stroke .24s var(--ease)' }}
                  />
                  <rect x={p.x} y={p.y} width={p.w} height="1" fill="rgba(255,255,255,.95)" />
                  <circle cx={p.x + 26} cy={p.y + 31} r={on ? 6 : 4} fill={on ? 'var(--xipe-mint)' : 'var(--xipe-gold)'} style={{ transition: 'r .2s var(--ease)' }} />
                  <text x={p.x + 46} y={p.y + 37} fill="var(--xipe-ink)" fontSize="15" letterSpacing="2.4" fontWeight="600">
                    {layer.name.toUpperCase()}
                  </text>
                </g>
              </motion.g>
            );
          })}

          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <circle cx="440" cy="430" r="46" fill="rgba(255,255,255,.7)" stroke="var(--xipe-border)" />
            <text x="440" y="492" textAnchor="middle" fill="var(--xipe-muted)" fontSize="12" letterSpacing="3">PATRIMONIO</text>
          </motion.g>
        </svg>
      </motion.div>

      {/* Núcleo translúcido con el símbolo real */}
      <span className="pointer-events-none absolute" style={{ left: '84.6%', top: '82.7%', transform: 'translate(-50%,-50%)', width: '13%' }}>
        <Image src="/xipe-mark.png" alt="" width={465} height={384} className="w-full opacity-90 mix-blend-multiply" />
      </span>

      <p className="mt-3 min-h-[3rem] text-center text-[15px] leading-snug text-muted md:text-left" aria-live="polite">
        {line ? <><span className="font-semibold text-ink">{line.name}.</span> {line.line}</> : 'Toca una capa para ver su función.'}
      </p>
    </div>
  );
}
