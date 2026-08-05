'use client';

import Image from 'next/image';
import GrecaDivider from '@/components/greca/GrecaDivider';
import { DISCLAIMER, NAV } from '@/lib/constants';

const LEGAL = ['Aviso de privacidad', 'Términos y condiciones', 'Derechos ARCO', 'Información regulatoria'];

export default function Footer() {
  return (
    <footer className="bg-mist pb-10 pt-16 md:pt-20">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <div className="mb-12 opacity-50">
          <GrecaDivider tone="var(--xipe-gold)" />
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <span className="inline-block rounded-2xl bg-ink px-4 py-3">
              <Image src="/xipe-logo.png" alt="Xipe Capital Group" width={264} height={271} className="h-16 w-auto" />
            </span>
            <p className="mt-5 max-w-[30ch] text-[15px] text-muted">
              Arquitectura patrimonial: protección, ahorro e inversión en una sola estructura.
            </p>
          </div>

          <nav aria-label="Secciones">
            <h2 className="t-label mb-4 text-gold-ink">Secciones</h2>
            <ul>
              {NAV.map((n) => (
                <li key={n.label} className="mb-2.5">
                  <a href={n.href} className="text-[15px] text-muted transition-colors hover:text-ink">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="t-label mb-4 text-gold-ink">Legal</h2>
            <ul>
              {LEGAL.map((l) => (
                <li key={l} className="mb-2.5">
                  <a href="#" className="text-[15px] text-muted transition-colors hover:text-ink">{l}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="t-label mb-4 text-gold-ink">Contacto</h2>
            <ul className="grid gap-2.5 text-[14px] text-gold-ink">
              <li>[DATOS FISCALES PENDIENTES]</li>
              <li>[TELÉFONO Y CORREO PENDIENTES]</li>
              <li>[HORARIO PENDIENTE]</li>
              <li>[CÉDULA Y FIGURA DE OPERACIÓN PENDIENTES]</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t pt-7 lg:grid-cols-[1fr_auto] lg:items-end" style={{ borderColor: 'var(--xipe-border-dark)' }}>
          <p className="max-w-[92ch] text-[14px] leading-relaxed text-muted">{DISCLAIMER}</p>
          <p className="text-[14px] text-muted">© 2026 Xipe Capital Group · Variante B</p>
        </div>
      </div>
    </footer>
  );
}
