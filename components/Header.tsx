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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-xipe ${
          stuck ? 'border-b border-white/10 bg-black/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto grid h-[4.25rem] max-w-shell grid-cols-[1fr_auto] items-center px-6 md:h-[4.5rem] md:px-12 lg:grid-cols-[1fr_auto_1fr] lg:px-16 xl:px-20">
          <a href="#top" className="justify-self-start" aria-label="Xipe Capital Group, inicio">
            <Image
              src="/xipe-logo.png"
              alt="Xipe Capital Group"
              width={264}
              height={271}
              priority
              className={`w-auto transition-all duration-300 ${stuck ? 'h-8' : 'h-9 md:h-10'}`}
            />
          </a>

          <nav className="hidden justify-self-center lg:block" aria-label="Navegación principal">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group relative block px-3.5 py-2 text-[13px] font-medium tracking-[0.04em] text-text-muted transition-colors hover:text-text xl:px-4"
                  >
                    {item.label}
                    <span className="absolute bottom-0.5 left-3.5 right-3.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-xipe group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-3 justify-self-end">
            <button
              type="button"
              onClick={() => openDiagnosis('header')}
              className="group hidden min-h-[40px] items-center gap-2 rounded-sm bg-gold px-5 text-[12px] font-medium uppercase tracking-[.12em] text-black transition-opacity duration-200 hover:opacity-90 sm:inline-flex"
            >
              Diseñar mi arquitectura
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="menu-movil"
              className="grid h-12 w-12 place-items-center rounded-sm border border-white/10 lg:hidden"
            >
              <span className="relative block h-px w-5 bg-text before:absolute before:-top-1.5 before:left-0 before:h-px before:w-5 before:bg-text after:absolute after:top-1.5 after:left-0 after:h-px after:w-5 after:bg-text" />
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
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-black px-6 pb-16 pt-5 md:px-10"
          >
            <div className="mb-12 flex min-h-[72px] items-center justify-between">
              <Image src="/xipe-logo.png" alt="Xipe Capital Group" width={264} height={271} className="h-10 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="grid h-12 w-12 place-items-center rounded-sm border border-white/10"
              >
                <span className="relative block h-px w-5 rotate-45 bg-text after:absolute after:left-0 after:top-0 after:h-px after:w-5 after:-rotate-90 after:bg-text" />
              </button>
            </div>

            <nav aria-label="Navegación móvil">
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

            <button
              type="button"
              onClick={() => { setOpen(false); openDiagnosis('menu'); }}
              className="mt-12 min-h-[56px] w-full rounded-sm bg-gold px-6 text-[15px] font-semibold uppercase tracking-[.12em] text-black"
            >
              Diseñar mi arquitectura
            </button>

            <button
              type="button"
              onClick={() => { setOpen(false); trackEvent('method_link_click', { from: 'menu' }); document.querySelector('#diagnostico')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="mt-4 min-h-[52px] w-full rounded-sm border border-white/15 px-6 text-[15px] uppercase tracking-[.12em] text-text-muted"
            >
              Empezar diagnóstico
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
