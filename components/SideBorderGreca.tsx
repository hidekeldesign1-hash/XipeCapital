'use client';

type Side = 'left' | 'right';

type Props = {
  side: Side;
  className?: string;
};

/**
 * Ornamento geométrico dorado animado — laterales de la página.
 * Trazo, pulso, flujo y glifos según el gráfico de referencia.
 */
export default function SideBorderGreca({ side, className = '' }: Props) {
  return (
    <div
      className={`pointer-events-none fixed inset-y-0 z-[1] hidden w-[88px] overflow-hidden md:block lg:w-[108px] xl:w-[124px] ${
        side === 'left' ? 'left-0' : 'right-0'
      } ${className}`}
      aria-hidden
    >
      <svg
        className={`side-glyph h-full w-full ${side === 'right' ? 'scale-x-[-1]' : ''}`}
        viewBox="50 16 150 748"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <g>
          {/* Marco y grandes recorridos */}
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 1320, '--time': '10s' } as React.CSSProperties}
            d="M62 88H104V101H75V238H108V272H151V579H111V613H75V744H104V756H62Z"
          />
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 940, '--time': '8.4s', '--delay': '-2s' } as React.CSSProperties}
            d="M79 116H139V219H109V251H158V567H125V596H80V657H137V711H87V682H122V671H67V583H104V557H137V288H91V259H67V116Z"
          />
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 430, '--time': '6.2s', '--delay': '-3.1s' } as React.CSSProperties}
            d="M98 132H127V207H93V164H111V188H116V145H98Z"
          />
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 410, '--time': '5.8s', '--delay': '-1.2s' } as React.CSSProperties}
            d="M91 669H130V720H83V693H111V707H117V683H91Z"
          />

          {/* Espirales independientes */}
          <g className="glyph-pulse" style={{ '--time': '4.8s' } as React.CSSProperties}>
            <path
              className="glyph-line glyph-trace"
              style={{ '--len': 260, '--time': '5s', '--delay': '-1s' } as React.CSSProperties}
              d="M103 344c-32-3-37 45-7 50 28 5 39-34 16-45-18-8-29 14-17 25 10 9 24-3 16-13"
            />
          </g>
          <g className="glyph-pulse" style={{ '--time': '5.7s', '--delay': '-2s' } as React.CSSProperties}>
            <path
              className="glyph-line glyph-trace"
              style={{ '--len': 245, '--time': '5.5s', '--delay': '-2.5s' } as React.CSSProperties}
              d="M104 496c-29-2-35 40-8 46 26 5 37-31 16-42-17-9-28 12-17 23 9 9 22-2 15-12"
            />
          </g>

          {/* Glifos interiores */}
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 120, '--time': '4.2s', '--delay': '-1.5s' } as React.CSSProperties}
            d="M100 225h25v-15h-8v-11h-18v12"
          />
          <rect
            className="glyph-line glyph-pulse"
            style={{ '--time': '3.8s', '--delay': '-.6s' } as React.CSSProperties}
            x="137"
            y="238"
            width="18"
            height="20"
            rx="2"
          />
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 90, '--time': '3.7s', '--delay': '-2s' } as React.CSSProperties}
            d="M83 290h17m-17 11h11m-11 11h16"
          />
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 150, '--time': '4s', '--delay': '-1s' } as React.CSSProperties}
            d="M87 408c13-8 23 13 9 20-14 6-22-13-9-20m9 3 6-5"
          />
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 130, '--time': '4.4s', '--delay': '-2.6s' } as React.CSSProperties}
            d="M90 456c12-6 20 12 8 18-13 6-20-12-8-18m10-2 8-10"
          />
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 130, '--time': '4.8s', '--delay': '-.8s' } as React.CSSProperties}
            d="M89 566v31h25v16H88m41-35h18v18h-18Z"
          />
          <path
            className="glyph-line glyph-trace"
            style={{ '--len': 100, '--time': '3.8s', '--delay': '-2s' } as React.CSSProperties}
            d="M91 622h20v17H93v-9"
          />

          {/* Línea lateral y partículas */}
          <path className="glyph-line glyph-thin" d="M184 72V707" />
          <path
            className="glyph-line glyph-thin glyph-flow"
            style={{ '--time': '3.8s' } as React.CSSProperties}
            d="M184 113V665"
          />
          <g className="glyph-spin" style={{ '--time': '11s' } as React.CSSProperties}>
            <path className="glyph-line" d="M184 253l8 11-8 11-8-11Z" />
          </g>
          <g className="glyph-spin" style={{ '--time': '14s', '--delay': '-5s' } as React.CSSProperties}>
            <path className="glyph-line" d="M184 420l10 12-10 12-10-12Z" />
          </g>
          <g className="glyph-pulse" style={{ '--time': '3.2s' } as React.CSSProperties}>
            <circle className="glyph-line" cx="184" cy="568" r="6" />
          </g>

          {/* Ornamentos superior e inferior */}
          <g className="glyph-float" style={{ '--time': '4.2s' } as React.CSSProperties}>
            <path className="glyph-line" d="M86 28l10 12-10 12-10-12Z" />
            <path
              className="glyph-line glyph-pulse"
              style={{ '--time': '3.6s' } as React.CSSProperties}
              d="M86 63l5 6-5 6-5-6Z"
            />
          </g>
          <g className="glyph-float" style={{ '--time': '5s', '--delay': '-2.4s' } as React.CSSProperties}>
            <path className="glyph-line" d="M86 748l10 13-10 13-10-13Z" />
            <path
              className="glyph-line glyph-pulse"
              style={{ '--time': '3.6s' } as React.CSSProperties}
              d="M86 726l5 6-5 6-5-6Z"
            />
          </g>

          {/* Puntos con ritmos separados */}
          <g fill="#E6D09A">
            <circle className="glyph-blink" style={{ '--delay': '-.2s' } as React.CSSProperties} cx="121" cy="320" r="1.4" />
            <circle className="glyph-blink" style={{ '--delay': '-1.1s' } as React.CSSProperties} cx="121" cy="333" r="1.2" />
            <circle className="glyph-blink" style={{ '--delay': '-.7s' } as React.CSSProperties} cx="122" cy="440" r="1.4" />
            <circle className="glyph-blink" style={{ '--delay': '-1.5s' } as React.CSSProperties} cx="122" cy="458" r="1.2" />
            <circle className="glyph-blink" style={{ '--delay': '-.4s' } as React.CSSProperties} cx="139" cy="617" r="1.5" />
            <circle className="glyph-blink" style={{ '--delay': '-1.8s' } as React.CSSProperties} cx="142" cy="635" r="1.2" />
            <circle className="glyph-blink" style={{ '--delay': '-1s' } as React.CSSProperties} cx="184" cy="590" r="1.5" />
            <circle className="glyph-blink" style={{ '--delay': '-2s' } as React.CSSProperties} cx="184" cy="608" r="1.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}
