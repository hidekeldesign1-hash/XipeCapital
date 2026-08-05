'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * Indicador de avance en forma de greca. Cada paso completa un escalón,
 * así que el progreso no depende solo del color.
 */
export default function GrecaProgress({ step, total, label }: { step: number; total: number; label: string }) {
  const seg = 100 / total;
  const d = Array.from({ length: total }, (_, i) => {
    const x = i * seg;
    return `M${x} 18 h${seg * 0.42} v-11 h${seg * 0.36} v11 h${seg * 0.22}`;
  }).join(' ');

  return (
    <div className="w-full" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={step}>
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="h-6 w-full" aria-hidden>
        <path d={d} fill="none" stroke="var(--xipe-border-dark)" strokeWidth="1.4" strokeLinecap="square" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={d} fill="none" stroke="var(--xipe-gold-ink)" strokeWidth="1.8" strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={{ pathLength: Math.min(1, step / total) }}
          transition={{ duration: 0.55, ease: EASE }}
        />
      </svg>
    </div>
  );
}
