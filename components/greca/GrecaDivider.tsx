'use client';

import GrecaPath from './GrecaPath';

/** Filete horizontal: patrón de greca que separa secciones. */
export default function GrecaDivider({ className = '', tone = 'var(--xipe-gold)' }: { className?: string; tone?: string }) {
  const unit = 'h18 v-10 h18 v10 h18';
  const d = `M0 22 ${Array.from({ length: 22 }, () => unit).join(' ')}`;
  return (
    <svg viewBox="0 0 1200 32" preserveAspectRatio="none" className={`h-8 w-full ${className}`} aria-hidden>
      <GrecaPath d={d} stroke={tone} width={1} duration={1.6} />
    </svg>
  );
}
