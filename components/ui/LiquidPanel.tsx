'use client';

import { useRef } from 'react';

/** Superficie de cristal con reflejo que sigue al cursor. */
export default function LiquidPanel({
  children, className = '', strong = false, sheen = true, as: Tag = 'div',
}: {
  children: React.ReactNode; className?: string; strong?: boolean; sheen?: boolean;
  as?: 'div' | 'section' | 'article' | 'aside';
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={sheen ? onMove : undefined}
      className={`liquid ${strong ? 'liquid-strong' : ''} ${sheen ? 'liquid-sheen' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
