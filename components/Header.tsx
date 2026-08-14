'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV } from '@/lib/constants';
import { trackEvent } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openDiagnosis } = useDiagnosis();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-xipe ${
          stuck
            ? 'border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md'
            : 'border-white/[0.03] bg-[#0A0A0A]/55 backdrop-blur-md'
        }`}
      >
        <div className="relative mx-auto flex h-[4.25rem] max-w-shell items-center justify-between gap-4 px-6 md:h-[4.5rem] md:px-10 xl:px-24">
          {/* Logo */}
          <a
            href="#top"
            className="flex shrink-0 items-center"
            aria-label="Xipe Capital Group, inicio"
          >
            <Image
              src="/xipe-logo.png"
              alt="Xipe Capital Group"
              width={264}
              height={271}
              priority
              className={`w-auto transition-all duration-300 ${stuck ? 'h-8' : 'h-9 md:h-10'}`}
            />
          </a>

          {/* Nav centrado */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block" aria-label="Navegación principal">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group relative block px-3 py-2 text-[13px] font-medium tracking-[0.06em] text-white/55 transition-colors duration-300 hover:text-[#C4A77D]"
                  >
                    {item.label}
                    <span className="absolute bottom-0.5 left-3 right-3 h-px origin-left scale-x-0 bg-[#C4A77D]/70 transition-transform duration-300 ease-xipe group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA compacto + menú móvil */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => openDiagnosis('header')}
              className="hidden bg-transparent px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#C4A77D] transition-colors duration-300 sm:inline-flex sm:items-center sm:gap-1.5 border border-[#C4A77D]/60 hover:bg-[#C4A77D]/10 rounded-sm"
            >
              Diseñar mi arquitectura
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="menu-movil"
              className="grid h-9 w-9 place-items-center rounded-sm border border-white/10 text-white/70 transition-colors hover:border-[#C4A77D]/35 hover:text-[#C4A77D] lg:hidden"
            >
              <span className="relative block h-px w-4 bg-current before:absolute before:-top-1.5 before:left-0 before:h-px before:w-4 before:bg-current after:absolute after:top-1.5 after:left-0 after:h-px after:w-4 after:bg-current" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.28, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[#0A0A0A] px-6 pb-16 pt-5 md:px-10 xl:px-24"
          >
            <div className="mx-auto mb-12 flex min-h-[72px] w-full max-w-shell items-center justify-between">
              <Image src="/xipe-logo.png" alt="Xipe Capital Group" width={264} height={271} className="h-10 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="grid h-11 w-11 place-items-center rounded-sm border border-white/10 text-white/70"
              >
                <span className="relative block h-px w-5 rotate-45 bg-current after:absolute after:left-0 after:top-0 after:h-px after:w-5 after:-rotate-90 after:bg-current" />
              </button>
            </div>

            <nav className="mx-auto w-full max-w-shell" aria-label="Navegación móvil">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.45, ease: [0.22, 0.61, 0.28, 1] }}
                  className="t-display flex items-baseline gap-5 border-t border-white/10 py-5 text-[clamp(1.75rem,7vw,2.5rem)] last:border-b"
                >
                  <span className="t-label text-[13px] text-gold-muted">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="mx-auto mt-12 w-full max-w-shell">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openDiagnosis('menu');
                }}
                className="min-h-[52px] w-full rounded-sm border border-[#C4A77D]/40 px-6 text-[14px] font-medium uppercase tracking-[0.14em] text-[#C4A77D] transition-colors hover:bg-[#C4A77D]/10"
              >
                Diseñar mi arquitectura
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  trackEvent('method_link_click', { from: 'menu' });
                  document.querySelector('#diagnostico')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 min-h-[52px] w-full rounded-sm border border-white/15 px-6 text-[14px] uppercase tracking-[0.12em] text-white/55 transition-colors hover:text-[#C4A77D]"
              >
                Empezar diagnóstico
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
