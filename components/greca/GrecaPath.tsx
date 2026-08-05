'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * Trazo ortogonal escalonado. Es la unidad del sistema: ángulos rectos,
 * cambios de dirección, nunca diagonales ni curvas.
 */
export default function GrecaPath({
  d, className = '', stroke = 'var(--xipe-gold)', width = 1.25,
  draw = true, sweep = false, delay = 0, duration = 1.1, sweepDur = 9,
}: {
  d: string; className?: string; stroke?: string; width?: number;
  draw?: boolean; sweep?: boolean; delay?: number; duration?: number; sweepDur?: number;
}) {
  return (
    <>
      <motion.path
        d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="square"
        className={className}
        initial={draw ? { pathLength: 0, opacity: 0 } : false}
        whileInView={draw ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration, delay, ease: EASE }}
      />
      {sweep && (
        <path
          d={d} fill="none" stroke="var(--xipe-white)" strokeWidth={width + 1.25}
          strokeLinecap="round" className="greca-sweep"
          style={{ ['--dur' as string]: `${sweepDur}s` } as React.CSSProperties}
        />
      )}
    </>
  );
}
