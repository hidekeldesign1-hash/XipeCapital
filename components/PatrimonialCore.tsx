'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { CORE_NODES, type CoreNode } from '@/lib/constants';
import { trackEvent } from '@/lib/tracking';

/**
 * XIPE PATRIMONIAL CORE
 * Núcleo con marcos concéntricos + seis pilares conectados por trazos
 * ortogonales. En hover, el nodo se eleva y un pulso de luz viaja al centro.
 */
export default function PatrimonialCore() {
  const uid = useId().replace(/:/g, '');
  const [hot, setHot] = useState<string | null>(null);
  const active = CORE_NODES.find((n) => n.id === hot) ?? null;

  const activate = (id: string) => {
    setHot(id);
    trackEvent('patrimonial_core_interaction', { node: id });
  };

  return (
    <div className="relative mx-auto w-full">
      {/* ── Desktop / tablet: diagrama radial ── */}
      <div className="relative mx-auto hidden aspect-square w-full sm:block">
        {/* Halo ambiental detrás del núcleo */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,167,101,0.1)_0%,transparent_70%)]"
          aria-hidden
        />

        <svg viewBox="0 0 640 640" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id={`core-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E6D09A" stopOpacity="0" />
              <stop offset="50%" stopColor="#E6D09A" stopOpacity="1" />
              <stop offset="100%" stopColor="#E6D09A" stopOpacity="0" />
            </linearGradient>
          </defs>

          {CORE_NODES.map((n, i) => {
            const on = hot === n.id;
            const dim = hot !== null && !on;
            return (
              <g key={n.id}>
                {/* Trazo base */}
                <motion.path
                  d={n.path}
                  fill="none"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={on ? 1.35 : 1}
                  stroke={on ? '#E6D09A' : dim ? '#3d3424' : '#806A42'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.85, ease: [0.22, 0.61, 0.28, 1] }}
                  style={{ transition: 'stroke .35s ease, stroke-width .35s ease' }}
                />

                {/* Pulso idle (hacia afuera, sutil) */}
                {!on && (
                  <path
                    d={n.path}
                    className="core-flow-idle"
                    fill="none"
                    stroke="#C9A765"
                    strokeWidth="1.2"
                    strokeLinecap="square"
                    pathLength={100}
                    style={
                      {
                        strokeDasharray: '8 92',
                        '--dur': `${9 + i * 1.1}s`,
                        '--dl': `${-i * 1.4}s`,
                      } as React.CSSProperties
                    }
                  />
                )}

                {/* Pulso hover → hacia el núcleo */}
                {on && (
                  <path
                    d={n.path}
                    className="core-flow-in"
                    fill="none"
                    stroke={`url(#core-grad-${uid})`}
                    strokeWidth="2.2"
                    strokeLinecap="square"
                    pathLength={100}
                    style={{ strokeDasharray: '14 86' }}
                  />
                )}

                {/* Nodo cuadrado en el extremo */}
                <rect
                  x={n.x - (on ? 8 : 6)}
                  y={n.y - (on ? 8 : 6)}
                  width={on ? 16 : 12}
                  height={on ? 16 : 12}
                  fill={on ? '#E6D09A' : '#C9A765'}
                  className={on ? 'core-node-dot core-node-dot--hot' : 'core-node-dot'}
                  style={{ transition: 'all .3s cubic-bezier(.22,.61,.28,1)' }}
                />
              </g>
            );
          })}
        </svg>

        {/* Núcleo central */}
        <CoreNucleus />

        {/* Etiquetas de pilares */}
        {CORE_NODES.map((n) => (
          <PillarLabel
            key={n.id}
            node={n}
            active={hot === n.id}
            muted={hot !== null && hot !== n.id}
            onEnter={() => activate(n.id)}
            onLeave={() => setHot(null)}
          />
        ))}
      </div>

      {/* ── Mobile: núcleo + chips apilados ── */}
      <div className="sm:hidden">
        <div className="relative mx-auto mb-8 aspect-square w-[58%] max-w-[220px]">
          <div
            className="pointer-events-none absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(201,167,101,0.2)_0%,transparent_68%)] core-halo"
            aria-hidden
          />
          <CoreNucleus compact />
        </div>

        <ul className="grid grid-cols-2 gap-2.5">
          {CORE_NODES.map((n) => {
            const on = hot === n.id;
            return (
              <li key={n.id}>
                <a
                  href={n.href}
                  onMouseEnter={() => activate(n.id)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => activate(n.id)}
                  onBlur={() => setHot(null)}
                  className={`group flex items-center gap-3 border px-3.5 py-3 transition-colors duration-300 ${
                    on
                      ? 'border-[#C4A77D]/30 bg-white/[0.03]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <span
                    className={`h-2 w-2 shrink-0 transition-colors duration-300 ${
                      on ? 'bg-gold-light' : 'bg-gold'
                    }`}
                    aria-hidden
                  />
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                      on ? 'text-gold-light' : 'text-text-muted group-hover:text-gold-light'
                    }`}
                  >
                    {n.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Lectura del nodo */}
      <div className="pointer-events-none relative z-10 mx-auto mt-3 max-w-sm px-2 text-center sm:absolute sm:inset-x-0 sm:bottom-0 sm:mt-0">
        <AnimatePresence mode="wait">
          <motion.p
            key={active?.id ?? 'idle'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28 }}
            className="text-[12px] leading-relaxed text-text-muted sm:text-[13px]"
          >
            {active ? active.blurb : 'Seis elementos. Una sola estructura.'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CoreNucleus({ compact = false }: { compact?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      {/* Marco exterior — rotación lenta */}
      <span
        aria-hidden
        className="core-ring-spin absolute border border-gold/12"
        style={{ width: compact ? '78%' : '34%', aspectRatio: '1 / 1' }}
      />
      {/* Marco en diamante — contra-rotación */}
      <span
        aria-hidden
        className="core-ring-spin-rev absolute border border-gold/10"
        style={{ width: compact ? '68%' : '30%', aspectRatio: '1 / 1' }}
      />
      {/* Marco alineado estático */}
      <span
        aria-hidden
        className="absolute border border-gold/15"
        style={{ width: compact ? '58%' : '26%', aspectRatio: '1 / 1' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 0.61, 0.28, 1] }}
        className="core-nucleus absolute grid place-items-center border border-gold/25 bg-black"
        style={{
          width: compact ? '48%' : '22%',
          aspectRatio: '1 / 1',
        }}
      >
        <Image
          src="/xipe-mark.png"
          alt=""
          width={465}
          height={384}
          className="w-[72%] select-none"
          priority
        />
      </motion.div>
    </div>
  );
}

function PillarLabel({
  node,
  active,
  muted,
  onEnter,
  onLeave,
}: {
  node: CoreNode;
  active: boolean;
  muted: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const below = node.y > 480;
  const above = node.y < 200;
  const midLeft = !above && !below && node.x < 320;
  const midRight = !above && !below && node.x > 320;

  const transform = midLeft
    ? 'translate(calc(-100% - 16px), -50%)'
    : midRight
      ? 'translate(16px, -50%)'
      : 'translate(-50%, -50%)';

  return (
    <a
      href={node.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={`group absolute z-20 whitespace-nowrap px-1 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 md:text-[13px] ${
        active
          ? 'text-gold-light'
          : muted
            ? 'text-text-muted/35'
            : 'text-text-muted hover:text-gold-light'
      }`}
      style={{
        left: `${(node.x / 640) * 100}%`,
        top: `${(node.y / 640) * 100 + (below ? 5.5 : above ? -5.5 : 0)}%`,
        transform,
      }}
    >
      <span className="relative inline-block">
        {node.label}
        <span
          aria-hidden
          className={`absolute left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-light to-transparent transition-all duration-300 ${
            below ? '-top-1.5' : '-bottom-1.5'
          } ${active ? 'w-full opacity-100' : 'opacity-0 group-hover:w-3/4 group-hover:opacity-70'}`}
        />
      </span>
    </a>
  );
}
