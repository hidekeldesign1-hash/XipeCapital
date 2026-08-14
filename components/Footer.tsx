'use client';

import Image from 'next/image';
import { DISCLAIMER, FOOTER_COLS } from '@/lib/constants';

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M6.5 8.5H3.7V20h2.8V8.5zM5.1 4a1.65 1.65 0 100 3.3 1.65 1.65 0 000-3.3zM20.3 20h-2.8v-5.6c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V20h-2.8s0-9.6 0-10.6h2.8v1.5c.4-.6 1.1-1.7 2.8-1.7 2 0 3.5 1.3 3.5 4.2V20z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M22 12.2s0-3.2-.4-4.7c-.2-.8-.8-1.4-1.6-1.6C18.5 5.5 12 5.5 12 5.5s-6.5 0-8 .4c-.8.2-1.4.8-1.6 1.6C2 9 2 12.2 2 12.2s0 3.2.4 4.7c.2.8.8 1.4 1.6 1.6 1.5.4 8 .4 8 .4s6.5 0 8-.4c.8-.2 1.4-.8 1.6-1.6.4-1.5.4-4.7.4-4.7zM10 15.2V9.2l5.2 3-5.2 3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-10 md:pt-20">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2.2fr] lg:gap-16">
          <div>
            <Image src="/xipe-logo.png" alt="Xipe Capital Group" width={264} height={271} className="h-16 w-auto md:h-20" />
            <p className="mt-5 max-w-[32ch] text-[15px] leading-relaxed text-text-muted">
              Arquitectura patrimonial: protección, ahorro e inversión dentro de una sola estructura.
            </p>
            <ul className="mt-6 flex gap-2.5">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center border border-white/10 text-gold transition-all duration-300 hover:border-[#C4A77D]/35 hover:bg-white/[0.02]"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {FOOTER_COLS.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="t-label mb-4 text-[11px] text-gold">{c.title}</p>
                <ul>
                  {c.links.map((l) => (
                    <li key={l} className="mb-2.5">
                      <a href="#" className="text-[14px] text-text-muted transition-colors hover:text-gold-light">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[13px] text-white/55">
              © 2024 Xipe Capital Group. Todos los derechos reservados.
            </p>
            <p className="mt-3 max-w-[90ch] text-[12px] leading-relaxed text-white/50">{DISCLAIMER}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-[13px] text-white/55">
              <a href="#" className="hover:text-gold-light">Aviso de privacidad</a>
              <a href="#" className="hover:text-gold-light">Términos y condiciones</a>
            </div>
          </div>
          <p className="flex items-center gap-2 text-[13px] text-white/55">
            Hecho en México
            <span aria-hidden className="text-base leading-none">🇲🇽</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
