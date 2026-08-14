'use client';

type Side = 'left' | 'right';

type Props = {
  side: Side;
  className?: string;
};

const GOLD = '#C4A77D';
const GLOW = '#E6D09A';

/**
 * Laterales de página — plano técnico / glifo precolombino minimalista.
 * Fijos, sutiles, sin bloquear interacción.
 */
export default function SideBorderGreca({ side, className = '' }: Props) {
  return (
    <div
      className={`pointer-events-none fixed inset-y-0 z-[1] hidden overflow-hidden md:block ${
        side === 'left' ? 'left-0' : 'right-0'
      } w-[72px] lg:w-[92px] xl:w-[108px] ${className}`}
      style={{
        opacity: 0.32,
        maskImage:
          side === 'left'
            ? 'linear-gradient(90deg, transparent 0%, black 12%, black 85%, transparent 100%)'
            : 'linear-gradient(270deg, transparent 0%, black 12%, black 85%, transparent 100%)',
        WebkitMaskImage:
          side === 'left'
            ? 'linear-gradient(90deg, transparent 0%, black 12%, black 85%, transparent 100%)'
            : 'linear-gradient(270deg, transparent 0%, black 12%, black 85%, transparent 100%)',
      }}
      aria-hidden
    >
      <svg
        className={`h-full w-full ${side === 'right' ? 'scale-x-[-1]' : ''}`}
        viewBox="0 0 120 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id={`rail-glow-${side}`} x="-80%" y="-10%" width="260%" height="120%">
            <feGaussianBlur stdDeviation="1.1" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g stroke={GOLD} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
          {/* Diamantes superiores */}
          <path d="M48 28l8 8-8 8-8-8z" opacity="0.85" />
          <path d="M48 48l5 5-5 5-5-5z" opacity="0.55" />

          {/* Laberinto / espiral cuadrada superior */}
          <path
            d="M28 72h44v36H36v-24h24v12H48v-4"
            opacity="0.8"
            fill="none"
          />
          <path d="M64 78h14v48H42v-10h26v-28" opacity="0.55" />
          <path d="M22 88h8M22 100h6M22 112h10" opacity="0.4" strokeWidth="0.8" />

          {/* Bloque técnico — líneas paralelas */}
          <g opacity="0.7" strokeWidth="0.85">
            <line x1="40" y1="148" x2="40" y2="320" />
            <line x1="48" y1="156" x2="48" y2="312" />
            <line x1="56" y1="148" x2="56" y2="320" />
            <line x1="64" y1="160" x2="64" y2="300" />
          </g>

          {/* Eje lateral con nodos */}
          <line x1="88" y1="140" x2="88" y2="760" strokeWidth="0.7" opacity="0.5" />
          {[180, 240, 310, 420, 520, 620, 710].map((y) => (
            <path key={y} d={`M88 ${y - 3.5}l3.5 3.5-3.5 3.5-3.5-3.5z`} opacity="0.55" />
          ))}
          <circle cx="88" cy="470" r="3.5" opacity="0.55" />

          {/* Círculos y arcos (glifo técnico) */}
          <circle cx="36" cy="200" r="14" opacity="0.55" />
          <circle cx="36" cy="248" r="9" opacity="0.5" />
          <line x1="29" y1="241" x2="43" y2="255" opacity="0.45" strokeWidth="0.8" />
          <path d="M24 288a14 14 0 0 1 28 0" opacity="0.5" />

          {/* Ticks / datos */}
          <g opacity="0.35" strokeWidth="0.7">
            <line x1="72" y1="190" x2="80" y2="190" />
            <line x1="72" y1="210" x2="78" y2="210" />
            <line x1="72" y1="268" x2="80" y2="268" />
            <line x1="30" y1="330" x2="70" y2="330" />
          </g>

          {/* Medallón central */}
          <g opacity="0.75">
            <circle cx="52" cy="400" r="34" strokeWidth="0.85" />
            <circle cx="52" cy="400" r="26" strokeWidth="0.6" strokeDasharray="1.5 4" opacity="0.7" />
            <circle cx="52" cy="400" r="18" strokeWidth="0.85" />
            {/* Glifo geométrico interior */}
            <rect x="44" y="392" width="16" height="16" opacity="0.85" />
            <rect x="48" y="396" width="8" height="8" opacity="0.55" />
            <path d="M52 378v8M52 414v8M34 400h8M62 400h8" opacity="0.55" strokeWidth="0.8" />
            {/* Escalones */}
            <path d="M40 418h24M44 422h16" opacity="0.4" strokeWidth="0.7" />
          </g>

          {/* Greca escalonada media */}
          <path
            d="M30 460h40v14H38v12h28v14H30v-14h28v-12H30z"
            opacity="0.65"
          />

          {/* Continuación de líneas */}
          <g opacity="0.65" strokeWidth="0.85">
            <line x1="40" y1="520" x2="40" y2="640" />
            <line x1="48" y1="528" x2="48" y2="632" />
            <line x1="56" y1="520" x2="56" y2="640" />
          </g>

          {/* Laberinto inferior */}
          <path
            d="M28 660h44v36H36v-24h24v12H48v-4"
            opacity="0.75"
          />
          <path d="M64 666h14v40H42v-8h26" opacity="0.5" />

          {/* Cenefa / S suave */}
          <path
            d="M52 720c-14 2-16 22-3 25 12 3 18-16 8-21-7-4-12 6-8 12"
            opacity="0.55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Diamantes inferiores */}
          <path d="M48 780l5 5-5 5-5-5z" opacity="0.55" />
          <path d="M48 800l8 8-8 8-8-8z" opacity="0.85" />

          {/* Marcos de esquina sutiles */}
          <path d="M12 120h16M12 120v16" opacity="0.35" strokeWidth="0.8" />
          <path d="M12 780h16M12 780v-16" opacity="0.35" strokeWidth="0.8" />
        </g>

        {/* Nodos de luz */}
        <g fill={GLOW} filter={`url(#rail-glow-${side})`}>
          <circle cx="48" cy="36" r="1.2" opacity="0.7" />
          <circle cx="52" cy="400" r="1.6" opacity="0.85" />
          <circle cx="88" cy="470" r="1.2" opacity="0.65" />
          <circle cx="48" cy="808" r="1.2" opacity="0.7" />
          <circle cx="36" cy="200" r="1" opacity="0.45" />
        </g>
      </svg>
    </div>
  );
}
