'use client';

import GrecaPath from './GrecaPath';

/**
 * Conecta dos puntos con un trazo escalonado (nunca en diagonal).
 * Coordenadas en porcentaje del contenedor, viewBox 100x100.
 */
export default function GrecaConnector({
  from, to, active = false, delay = 0,
}: { from: { x: number; y: number }; to: { x: number; y: number }; active?: boolean; delay?: number }) {
  const midY = (from.y + to.y) / 2;
  const d = `M${from.x} ${from.y} V${midY} H${to.x} V${to.y}`;
  return (
    <GrecaPath
      d={d}
      stroke={active ? 'var(--xipe-mint)' : 'var(--xipe-cloud)'}
      width={active ? 0.55 : 0.4}
      delay={delay}
      duration={0.9}
    />
  );
}
