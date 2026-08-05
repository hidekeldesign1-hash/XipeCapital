'use client';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'glass' | 'quiet';
  full?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** Botón con barrido de luz. Mínimo 52 px de alto en todas las variantes. */
export default function LiquidButton({
  children, onClick, href, variant = 'primary', full = false, className = '', ariaLabel,
}: Props) {
  const base =
    'group relative inline-flex min-h-[54px] items-center justify-center gap-3 overflow-hidden rounded-full px-8 text-[15px] font-semibold uppercase tracking-[.11em] transition-all duration-200 ease-xipe';

  const skin = {
    primary: 'bg-gold text-ink hover:bg-gold-light shadow-[0_10px_30px_-14px_rgba(190,154,88,.9)]',
    glass: 'liquid liquid-sheen text-ink hover:border-white',
    quiet: 'text-muted hover:text-ink',
  }[variant];

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      {variant !== 'quiet' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/45 opacity-0 transition-all duration-500 ease-xipe group-hover:left-[110%] group-hover:opacity-100"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={`${base} ${skin} ${full ? 'w-full' : ''} ${className}`}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={`${base} ${skin} ${full ? 'w-full' : ''} ${className}`}>
      {inner}
    </button>
  );
}
