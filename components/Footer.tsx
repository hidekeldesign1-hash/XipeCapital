'use client';

import Image from 'next/image';
import { DISCLAIMER } from '@/lib/constants';

const COLS = [
  { title: 'Arquitectura', links: ['Protección', 'Ahorro', 'Inversión', 'Continuidad'] },
  { title: 'Legal', links: ['Aviso de privacidad', 'Términos y condiciones', 'Derechos ARCO', 'Información regulatoria'] },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-16 md:py-20">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Image src="/xipe-logo.png" alt="Xipe Capital Group" width={264} height={271} className="h-20 w-auto" />
            <p className="mt-5 max-w-[34ch] text-[15px] text-text-muted">
              Arquitectura patrimonial: protección, ahorro e inversión dentro de una
              sola estructura.
            </p>
          </div>

          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="t-label mb-5 text-gold">{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l} className="mb-3">
                    <a href="#" className="text-[15px] text-text-muted transition-colors hover:text-gold-light">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="t-label mb-5 text-gold">Contacto</h2>
            <ul className="grid gap-3">
              {['[DATOS FISCALES PENDIENTES]', '[TELÉFONO Y CORREO PENDIENTES]', '[HORARIO DE ATENCIÓN PENDIENTE]', '[CÉDULAS Y FIGURA DE OPERACIÓN PENDIENTES]'].map((t) => (
                <li key={t}>
                  <span className="inline-flex rounded-sm border border-dashed border-gold/40 bg-gold/5 px-3 py-1.5 text-[14px] leading-relaxed text-gold">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-5 border-t border-white/10 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-[92ch] text-[14px] leading-relaxed text-white/40">{DISCLAIMER}</p>
          <p className="text-[14px] text-white/40">© 2026 Xipe Capital Group</p>
        </div>
      </div>
    </footer>
  );
}
