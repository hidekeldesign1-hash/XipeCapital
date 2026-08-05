'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SPRING } from '@/lib/motion';

/**
 * Tipografía viva. Cada carácter se eleva 1–4 px según la cercanía del
 * cursor y vuelve con física elástica. En táctil, un toque ilumina la
 * palabra y se restablece solo.
 *
 * Accesibilidad: el texto se lee completo en el DOM (aria-label en el
 * contenedor y los caracteres ocultos a lectores). La interacción nunca
 * es necesaria para entender el mensaje.
 */
export default function KineticText({
  text, className = '', maxLift = 4,
}: { text: string; className?: string; maxLift?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pointer, setPointer] = useState<number | null>(null);
  const [tapped, setTapped] = useState(false);

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chars = Array.from(text);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPointer(e.clientX - r.left);
  };

  const onTap = () => {
    if (reduced) return;
    setTapped(true);
    window.setTimeout(() => setTapped(false), 620);
  };

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      onMouseMove={onMove}
      onMouseLeave={() => setPointer(null)}
      onTouchStart={onTap}
    >
      {chars.map((c, i) => {
        const width = (ref.current?.offsetWidth ?? 0) / Math.max(1, chars.length);
        const cx = width * (i + 0.5);
        const dist = pointer === null ? Infinity : Math.abs(pointer - cx);
        const near = Math.max(0, 1 - dist / 130);
        const lift = tapped ? maxLift * 0.6 : -maxLift * near;
        return (
          <motion.span
            key={`${c}-${i}`}
            aria-hidden
            className="kinetic"
            animate={{
              y: reduced ? 0 : lift,
              filter: near > 0.35 || tapped ? 'brightness(1.14)' : 'brightness(1)',
            }}
            transition={SPRING}
          >
            {c}
          </motion.span>
        );
      })}
    </span>
  );
}
