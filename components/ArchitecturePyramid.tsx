'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { trackEvent } from '@/lib/tracking';

/**
 * Pirámide de Arquitectura Financiera — templo escalonado ornamentado (SVG).
 * Misma interacción: hover/tap ilumina el nivel y atenúa el resto.
 */

const GOLD = '#C4A77D';
const GOLD_BRIGHT = '#E6D09A';
const GOLD_DIM = '#806A42';

type Level = {
  id: string;
  index: string;
  label: string;
  side: 'left' | 'right';
  blurb: string;
  /** Outer trapezoid of the stepped tier */
  points: string;
  /** Mid Y of the tier (portal + label) */
  midY: number;
  /** Left / right outer edges at midY */
  leftX: number;
  rightX: number;
  labelPos: { x: number; y: number };
  /** Inner ornament band bounds */
  band: { y1: number; y2: number; xL: number; xR: number };
};

/**
 * Geometría del templo (viewBox 900×640).
 * Cada nivel es un escalón: plataforma superior más angosta que la base.
 */
const LEVELS: Level[] = [
  {
    id: 'legado',
    index: '04',
    label: 'Legado',
    side: 'right',
    blurb: 'Continuidad: lo que se transmite con orden y criterio.',
    points: '392,78 508,78 528,158 372,158',
    midY: 118,
    leftX: 382,
    rightX: 518,
    labelPos: { x: 640, y: 118 },
    band: { y1: 86, y2: 150, xL: 380, xR: 520 },
  },
  {
    id: 'inversion',
    index: '03',
    label: 'Inversión',
    side: 'left',
    blurb: 'Crecimiento: capital trabajando con riesgo calibrado.',
    points: '348,168 552,168 582,258 318,258',
    midY: 213,
    leftX: 333,
    rightX: 567,
    labelPos: { x: 128, y: 213 },
    band: { y1: 176, y2: 250, xL: 330, xR: 570 },
  },
  {
    id: 'liquidez',
    index: '02',
    label: 'Liquidez',
    side: 'right',
    blurb: 'Disponibilidad: reservas que sostienen decisiones sin forzar ventas.',
    points: '286,268 614,268 654,368 246,368',
    midY: 318,
    leftX: 266,
    rightX: 634,
    labelPos: { x: 640, y: 318 },
    band: { y1: 276, y2: 360, xL: 260, xR: 640 },
  },
  {
    id: 'proteccion',
    index: '01',
    label: 'Protección',
    side: 'left',
    blurb: 'Cimiento: blindaje del patrimonio ante imprevistos y fricción.',
    points: '210,378 690,378 740,498 160,498',
    midY: 438,
    leftX: 185,
    rightX: 715,
    labelPos: { x: 128, y: 438 },
    band: { y1: 386, y2: 490, xL: 180, xR: 720 },
  },
];

export default function ArchitecturePyramid() {
  const uid = useId().replace(/:/g, '');
  const [hot, setHot] = useState<string | null>(null);
  const active = LEVELS.find((l) => l.id === hot) ?? null;

  const activate = (id: string) => {
    setHot(id);
    trackEvent('architecture_pyramid_hover', { level: id });
  };

  const clear = () => setHot(null);

  return (
    <div className="relative mx-auto w-full max-w-[720px]">
      <svg
        viewBox="0 0 900 640"
        className="mx-auto h-auto w-full select-none"
        role="img"
        aria-label="Pirámide de arquitectura financiera: Protección, Liquidez, Inversión y Legado"
      >
        <defs>
          <filter id={`glow-${uid}`} x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD_BRIGHT} stopOpacity="0.2" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Marcos de esquina — plano técnico */}
        <g stroke={GOLD} strokeWidth="0.65" opacity="0.28" aria-hidden fill="none">
          <path d="M42 42h20M42 42v20" />
          <path d="M858 42h-20M858 42v20" />
          <path d="M42 598h20M42 598v-20" />
          <path d="M858 598h-20M858 598v-20" />
        </g>

        {/* Corona / crest encima del nivel 04 */}
        <g
          stroke={GOLD}
          fill="none"
          strokeWidth="0.9"
          opacity={hot && hot !== 'legado' ? 0.22 : 0.7}
          style={{ transition: 'opacity .35s ease' }}
          pointerEvents="none"
          aria-hidden
        >
          <circle cx="450" cy="28" r="1.4" fill={GOLD} stroke="none" />
          <circle cx="450" cy="40" r="1.4" fill={GOLD} stroke="none" />
          <circle cx="450" cy="52" r="1.4" fill={GOLD} stroke="none" />
          <rect x="436" y="58" width="28" height="14" />
          <path d="M442 65h16M446 61h8" opacity="0.7" strokeWidth="0.7" />
          <path d="M422 72h56" strokeWidth="0.7" opacity="0.55" />
        </g>

        {/* Niveles ornamentados */}
        {LEVELS.map((level) => {
          const on = hot === level.id;
          const dim = hot !== null && !on;
          const stroke = on ? GOLD_BRIGHT : dim ? GOLD_DIM : GOLD;
          const op = dim ? 0.22 : on ? 1 : 0.78;

          return (
            <g
              key={level.id}
              onMouseEnter={() => activate(level.id)}
              onMouseLeave={clear}
              onFocus={() => activate(level.id)}
              onBlur={clear}
              onClick={() => {
                if (hot === level.id) clear();
                else activate(level.id);
              }}
              tabIndex={0}
              role="button"
              aria-pressed={on}
              aria-label={`${level.index} ${level.label}: ${level.blurb}`}
              className="cursor-pointer outline-none"
              style={{ outline: 'none' }}
            >
              {/* Hit + glow fill */}
              <polygon points={level.points} fill="transparent" />
              <polygon
                points={level.points}
                fill={on ? `url(#fill-${uid})` : 'transparent'}
                filter={on ? `url(#glow-${uid})` : undefined}
                style={{ transition: 'fill .35s ease' }}
              />

              {/* Contorno del escalón */}
              <polygon
                points={level.points}
                fill="none"
                stroke={stroke}
                strokeWidth={on ? 1.35 : 0.95}
                opacity={op}
                style={{ transition: 'stroke .35s ease, opacity .35s ease, stroke-width .35s ease' }}
              />

              {/* Doble trazo interno (densidad arquitectónica) */}
              <TierInset level={level} stroke={stroke} opacity={op * 0.55} />

              {/* Relieves en los flancos inclinados */}
              <TierFlanks level={level} stroke={stroke} opacity={op * 0.4} />

              {/* Grecas laterales */}
              <TierGrecas level={level} stroke={stroke} opacity={op} on={on} />

              {/* Portal central con índice */}
              <TierPortal
                level={level}
                stroke={stroke}
                opacity={op}
                on={on}
                dim={dim}
              />

              {/* Leader + etiqueta */}
              <LevelLabel level={level} on={on} dim={dim} />
            </g>
          );
        })}

        {/* Pie de plano */}
        <text
          x="450"
          y="548"
          textAnchor="middle"
          fill={GOLD}
          opacity="0.38"
          style={{
            fontSize: 9,
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            letterSpacing: '0.32em',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        >
          Arquitectura financiera · 4 niveles
        </text>
      </svg>

      <div className="mx-auto mt-1 min-h-[2.75rem] max-w-md px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={active?.id ?? 'idle'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28 }}
            className="text-[12px] leading-relaxed tracking-wide text-text-muted sm:text-[13px]"
          >
            {active
              ? active.blurb
              : 'Cada nivel es cimiento del siguiente. Explora un bloque para leer la estructura.'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Doble línea interna del escalón + plataforma superior */
function TierInset({
  level,
  stroke,
  opacity,
}: {
  level: Level;
  stroke: string;
  opacity: number;
}) {
  const { band } = level;
  const inset = level.id === 'proteccion' ? 10 : level.id === 'liquidez' ? 8 : 6;
  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth="0.55"
      opacity={opacity}
      pointerEvents="none"
      style={{ transition: 'stroke .35s ease, opacity .35s ease' }}
    >
      {/* Plataforma superior */}
      <line x1={band.xL + inset} y1={band.y1 + 4} x2={band.xR - inset} y2={band.y1 + 4} />
      <line
        x1={band.xL + inset + 4}
        y1={band.y1 + 8}
        x2={band.xR - inset - 4}
        y2={band.y1 + 8}
        opacity={0.5}
        strokeDasharray="1.5 3"
      />
      {/* Base del escalón */}
      <line x1={band.xL + inset} y1={band.y2 - 4} x2={band.xR - inset} y2={band.y2 - 4} />
    </g>
  );
}

/** Líneas de relieve en los flancos del escalón */
function TierFlanks({
  level,
  stroke,
  opacity,
}: {
  level: Level;
  stroke: string;
  opacity: number;
}) {
  const pts = level.points.split(' ').map((p) => {
    const [x, y] = p.split(',').map(Number);
    return { x, y };
  });
  // points order: TL TR BR BL
  const [tl, tr, br, bl] = pts;
  if (!tl || !tr || !br || !bl) return null;

  const left = [
    { x: tl.x + (bl.x - tl.x) * 0.22, y: tl.y + (bl.y - tl.y) * 0.22 },
    { x: tl.x + (bl.x - tl.x) * 0.78, y: tl.y + (bl.y - tl.y) * 0.78 },
  ];
  const right = [
    { x: tr.x + (br.x - tr.x) * 0.22, y: tr.y + (br.y - tr.y) * 0.22 },
    { x: tr.x + (br.x - tr.x) * 0.78, y: tr.y + (br.y - tr.y) * 0.78 },
  ];

  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth="0.5"
      opacity={opacity}
      pointerEvents="none"
      style={{ transition: 'stroke .35s ease, opacity .35s ease' }}
    >
      <line x1={left[0].x} y1={left[0].y} x2={left[1].x} y2={left[1].y} />
      <line
        x1={left[0].x + 4}
        y1={left[0].y}
        x2={left[1].x + 4}
        y2={left[1].y}
        opacity="0.55"
      />
      <line x1={right[0].x} y1={right[0].y} x2={right[1].x} y2={right[1].y} />
      <line
        x1={right[0].x - 4}
        y1={right[0].y}
        x2={right[1].x - 4}
        y2={right[1].y}
        opacity="0.55"
      />
    </g>
  );
}

/** Grecas geométricas a izquierda y derecha del portal */
function TierGrecas({
  level,
  stroke,
  opacity,
  on,
}: {
  level: Level;
  stroke: string;
  opacity: number;
  on: boolean;
}) {
  const { band, midY } = level;
  const portalHalf =
    level.id === 'proteccion' ? 42 : level.id === 'liquidez' ? 34 : level.id === 'inversion' ? 28 : 22;
  const leftEnd = 450 - portalHalf - 8;
  const rightStart = 450 + portalHalf + 8;
  const h = (band.y2 - band.y1) * 0.62;
  const y0 = midY - h / 2;

  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth={on ? 0.9 : 0.65}
      opacity={opacity * 0.9}
      pointerEvents="none"
      style={{ transition: 'stroke .35s ease, opacity .35s ease, stroke-width .35s ease' }}
    >
      <GrecaBlock x1={band.xL + 12} x2={leftEnd} y={y0} h={h} mirror={false} dense={level.id === 'proteccion' || level.id === 'liquidez'} />
      <GrecaBlock x1={rightStart} x2={band.xR - 12} y={y0} h={h} mirror dense={level.id === 'proteccion' || level.id === 'liquidez'} />
    </g>
  );
}

function GrecaBlock({
  x1,
  x2,
  y,
  h,
  mirror,
  dense,
}: {
  x1: number;
  x2: number;
  y: number;
  h: number;
  mirror?: boolean;
  dense?: boolean;
}) {
  const w = x2 - x1;
  if (w < 24) return null;

  const y2 = y + h;
  const s = Math.max(5, Math.min(11, w * 0.11));
  const s2 = s * 1.7;

  // Meandro anidado tipo xicalcoliuhqui / greca escalonada
  const outer = mirror
    ? `M${x1} ${y} H${x2} V${y + s} H${x1 + s} V${y2 - s} H${x2} V${y2} H${x1}`
    : `M${x2} ${y} H${x1} V${y + s} H${x2 - s} V${y2 - s} H${x1} V${y2} H${x2}`;

  const inner = mirror
    ? `M${x1 + s} ${y + s2} H${x2 - s} V${y + s2 + s} H${x1 + s2} V${y2 - s2} H${x2 - s}`
    : `M${x2 - s} ${y + s2} H${x1 + s} V${y + s2 + s} H${x2 - s2} V${y2 - s2} H${x1 + s}`;

  const spiral = mirror
    ? `M${x2 - s * 0.5} ${y + h * 0.45} h${-s} v${s} h${s * 0.55} v${-s * 0.45}`
    : `M${x1 + s * 0.5} ${y + h * 0.45} h${s} v${s} h${-s * 0.55} v${-s * 0.45}`;

  return (
    <g>
      <path d={outer} />
      <path d={inner} opacity="0.75" />
      <path d={spiral} opacity="0.65" />
      {/* Trama de puntos */}
      {dense &&
        Array.from({ length: 4 }).map((_, i) => (
          <circle
            key={i}
            cx={mirror ? x2 - 5 : x1 + 5}
            cy={y + h * (0.22 + i * 0.18)}
            r="0.9"
            fill={GOLD}
            stroke="none"
            opacity="0.45"
          />
        ))}
      {/* Escalones de esquina */}
      <path
        d={
          mirror
            ? `M${x2} ${y}h-${s}M${x2} ${y}v${s}M${x2} ${y2}h-${s}M${x2} ${y2}v-${s}`
            : `M${x1} ${y}h${s}M${x1} ${y}v${s}M${x1} ${y2}h${s}M${x1} ${y2}v-${s}`
        }
        opacity="0.6"
      />
      {/* Líneas paralelas de densidad */}
      <line
        x1={x1 + (mirror ? 2 : s + 2)}
        y1={y + 2}
        x2={x2 - (mirror ? s + 2 : 2)}
        y2={y + 2}
        opacity="0.35"
        strokeDasharray="1.2 2.5"
      />
      <line
        x1={x1 + (mirror ? 2 : s + 2)}
        y1={y2 - 2}
        x2={x2 - (mirror ? s + 2 : 2)}
        y2={y2 - 2}
        opacity="0.35"
        strokeDasharray="1.2 2.5"
      />
    </g>
  );
}

function TierPortal({
  level,
  stroke,
  opacity,
  on,
  dim,
}: {
  level: Level;
  stroke: string;
  opacity: number;
  on: boolean;
  dim: boolean;
}) {
  const half =
    level.id === 'proteccion' ? 36 : level.id === 'liquidez' ? 30 : level.id === 'inversion' ? 24 : 20;
  const ph =
    level.id === 'proteccion' ? 28 : level.id === 'liquidez' ? 24 : level.id === 'inversion' ? 20 : 18;
  const x = 450 - half;
  const y = level.midY - ph / 2;

  return (
    <g pointerEvents="none" style={{ transition: 'opacity .35s ease' }} opacity={opacity}>
      <rect
        x={x}
        y={y}
        width={half * 2}
        height={ph}
        fill="none"
        stroke={stroke}
        strokeWidth={on ? 1.2 : 0.85}
        style={{ transition: 'stroke .35s ease, stroke-width .35s ease' }}
      />
      <rect
        x={x + 3}
        y={y + 3}
        width={half * 2 - 6}
        height={ph - 6}
        fill="none"
        stroke={stroke}
        strokeWidth="0.5"
        opacity="0.5"
      />
      <text
        x="450"
        y={level.midY + 3.5}
        textAnchor="middle"
        fill={on ? GOLD_BRIGHT : dim ? GOLD_DIM : GOLD}
        style={{
          fontSize: level.id === 'proteccion' ? 12 : 11,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          letterSpacing: '0.22em',
          fontWeight: 600,
          transition: 'fill .35s ease',
        }}
      >
        {level.index}
      </text>
    </g>
  );
}

function LevelLabel({
  level,
  on,
  dim,
}: {
  level: Level;
  on: boolean;
  dim: boolean;
}) {
  const isLeft = level.side === 'left';
  const edgeX = isLeft ? level.leftX : level.rightX;
  const labelX = isLeft ? level.labelPos.x - 8 : level.labelPos.x + 8;
  const lineEndX = isLeft ? level.labelPos.x + 4 : level.labelPos.x - 4;

  return (
    <g
      opacity={dim ? 0.2 : 1}
      style={{ transition: 'opacity .35s ease' }}
      pointerEvents="none"
    >
      <line
        x1={edgeX}
        y1={level.labelPos.y}
        x2={lineEndX}
        y2={level.labelPos.y}
        stroke={on ? GOLD_BRIGHT : GOLD}
        strokeWidth={on ? 0.95 : 0.55}
        opacity={on ? 0.95 : 0.5}
        style={{ transition: 'stroke .35s ease, opacity .35s ease' }}
      />
      <circle
        cx={edgeX}
        cy={level.labelPos.y}
        r={on ? 2.3 : 1.5}
        fill={on ? GOLD_BRIGHT : GOLD}
        opacity={on ? 1 : 0.6}
        style={{ transition: 'r .35s ease, fill .35s ease, opacity .35s ease' }}
      />
      <text
        x={labelX}
        y={level.labelPos.y + 3}
        textAnchor={isLeft ? 'end' : 'start'}
        fill={on ? GOLD_BRIGHT : GOLD}
        style={{
          fontSize: 11,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          letterSpacing: '0.22em',
          fontWeight: on ? 600 : 500,
          textTransform: 'uppercase',
          transition: 'fill .35s ease',
        }}
      >
        {level.label}
      </text>
    </g>
  );
}
