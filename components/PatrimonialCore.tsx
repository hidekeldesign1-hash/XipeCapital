'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CORE_NODES } from '@/lib/constants';
import { trackEvent } from '@/lib/tracking';

/**
 * XIPE PATRIMONIAL CORE
 * Un núcleo (el símbolo real de la marca) y seis nodos conectados por
 * trazos ortogonales escalonados: la misma geometría de la greca.
 * Los pulsos viajan del núcleo hacia afuera a velocidades distintas.
 */
export default function PatrimonialCore() {
  const [hot, setHot] = useState<string | null>(null);
  const active = CORE_NODES.find((n) => n.id === hot) ?? null;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      <svg viewBox="0 0 640 640" className="absolute inset-0 h-full w-full" aria-hidden>
        <g fill="none" strokeWidth="1" strokeLinecap="square">
          {CORE_NODES.map((n, i) => {
            const on = hot === n.id;
            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.09, duration: 0.7 }}
              >
                <motion.path
                  d={n.path}
                  stroke={on ? '#E6D09A' : '#806A42'}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5 + i * 0.09, duration: 0.9, ease: [0.22, 0.61, 0.28, 1] }}
                  style={{ transition: 'stroke .3s var(--ease)' }}
                />
                <rect
                  x={n.x - 7} y={n.y - 7} width="14" height="14"
                  fill={on ? '#9DE4D0' : '#C9A765'}
                  style={{ transition: 'fill .3s var(--ease)' }}
                />
              </motion.g>
            );
          })}
        </g>

        <g fill="#E6D09A">
          {CORE_NODES.map((n, i) => (
            <rect
              key={n.id}
              className="spark"
              width="4" height="4"
              style={{ '--p': `path('${n.path}')`, '--dur': `${8 + i * 0.9}s`, '--dl': `-${i * 1.7}s` } as React.CSSProperties}
            />
          ))}
        </g>
      </svg>

      {/* Anillo lento y núcleo con el símbolo real */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <motion.span
          aria-hidden
          className="border border-gold/25"
          style={{ width: '32%', aspectRatio: '1/1' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.28, 1] }}
          className="absolute grid place-items-center border border-gold/30 bg-black shadow-[0_0_0_14px_rgba(5,6,5,.9),0_0_90px_14px_rgba(201,167,101,.16)]"
          style={{ width: '24%', aspectRatio: '1/1' }}
        >
          <Image src="/xipe-mark.png" alt="" width={465} height={384} className="w-[74%]" priority />
        </motion.span>
      </div>

      {/* Etiquetas interactivas */}
      {CORE_NODES.map((n) => (
        <a
          key={n.id}
          href={n.href}
          onMouseEnter={() => { setHot(n.id); trackEvent('patrimonial_core_interaction', { node: n.id }); }}
          onMouseLeave={() => setHot(null)}
          onFocus={() => { setHot(n.id); trackEvent('patrimonial_core_interaction', { node: n.id }); }}
          onBlur={() => setHot(null)}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 text-[13px] font-semibold uppercase tracking-[.18em] transition-colors duration-200"
          style={{
            left: `${(n.x / 640) * 100}%`,
            top: `${(n.y / 640) * 100 + (n.y > 480 ? 5 : n.y < 200 ? -5 : 0)}%`,
            color: hot === n.id ? '#9DE4D0' : '#A7AAA4',
          }}
        >
          {n.label}
        </a>
      ))}

      {/* Lectura del nodo activo */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-4 mx-auto max-w-sm px-4 text-center md:-bottom-8">
        <motion.p
          key={active?.id ?? 'idle'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="text-[15px] leading-relaxed text-text-muted"
        >
          {active ? active.blurb : 'Seis elementos. Una sola estructura.'}
        </motion.p>
      </div>
    </div>
  );
}
