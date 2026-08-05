'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import LiquidPanel from '@/components/ui/LiquidPanel';
import LiquidButton from '@/components/ui/LiquidButton';
import GrecaPath from '@/components/greca/GrecaPath';
import { NAV } from '@/lib/constants';
import { EASE } from '@/lib/motion';
import { useDiagnosis } from '@/components/Diagnosis';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openDiagnosis } = useDiagnosis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
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
      <div className="fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4 md:px-8 md:pt-6">
        <motion.div
          animate={{ scale: scrolled ? 0.97 : 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="w-full max-w-shell origin-top"
        >
          <LiquidPanel
            strong={scrolled}
            className={`flex items-center gap-6 rounded-2xl px-4 transition-shadow duration-300 md:px-6 ${
              scrolled ? 'shadow-liquid-lg' : 'shadow-liquid'
            }`}
          >
            {/* La greca del header avanza discretamente al hacer scroll */}
            <svg viewBox="0 0 400 12" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-3 w-full opacity-60" aria-hidden>
              <motion.g animate={{ x: scrolled ? -24 : 0 }} transition={{ duration: 0.9, ease: EASE }}>
                <GrecaPath d="M-40 10 h14 v-7 h14 v7 h14 h14 v-7 h14 v7 h14 h14 v-7 h14 v7 h14 h14 v-7 h14 v7 h14 h14 v-7 h14 v7 h14 h14 v-7 h14 v7 h14 h14 v-7 h14 v7 h14" stroke="var(--xipe-champagne)" width={1} draw={false} />
              </motion.g>
            </svg>

            <a href="#top" aria-label="Xipe Capital Group, inicio" className="relative flex flex-none items-center py-3">
              <Image
                src="/xipe-logo.png" alt="Xipe Capital Group" width={264} height={271} priority
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-9' : 'h-11'}`}
              />
            </a>

            <nav className="relative ml-auto hidden lg:block" aria-label="Navegación principal">
              <ul className="flex items-center gap-8">
                {NAV.map((n) => (
                  <li key={n.label}>
                    <a href={n.href} className="group relative block py-2 text-[15px] text-muted transition-colors hover:text-ink">
                      {n.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px w-0 bg-gold transition-all duration-200 ease-xipe group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative ml-auto flex items-center gap-2 lg:ml-8">
              <LiquidButton onClick={() => openDiagnosis('header')} className="hidden !min-h-[46px] !px-6 !text-[14px] sm:inline-flex">
                Diseñar mi arquitectura
              </LiquidButton>

              <button
                type="button" onClick={() => setOpen(true)}
                aria-label="Abrir menú" aria-expanded={open} aria-controls="menu-b"
                className="grid h-12 w-12 place-items-center rounded-full border border-border-dark/0 bg-white/60 lg:hidden"
                style={{ borderColor: 'var(--xipe-border-dark)' }}
              >
                <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden>
                  <path d="M0 1h18M0 6h12M0 11h18" stroke="var(--xipe-ink)" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
          </LiquidPanel>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-b" role="dialog" aria-modal="true" aria-label="Menú"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(28px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[130] flex flex-col overflow-y-auto bg-white/82 px-6 pb-14 pt-5"
          >
            <span className="daylight" aria-hidden />
            <div className="relative z-10 mb-10 flex min-h-[64px] items-center justify-between">
              <Image src="/xipe-logo.png" alt="Xipe Capital Group" width={264} height={271} className="h-10 w-auto" />
              <button
                type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú"
                className="grid h-12 w-12 place-items-center rounded-full bg-white/70"
                style={{ border: '1px solid var(--xipe-border-dark)' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="M1 1l14 14M15 1L1 15" stroke="var(--xipe-ink)" strokeWidth="1.4" />
                </svg>
              </button>
            </div>

            <nav className="relative z-10" aria-label="Navegación móvil">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.label} href={n.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: EASE }}
                  className="t-display flex items-baseline gap-5 border-b py-5 text-[clamp(1.9rem,8vw,2.6rem)]"
                  style={{ borderColor: 'var(--xipe-border-dark)' }}
                >
                  <span className="t-label text-[13px] text-gold-ink">{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                </motion.a>
              ))}
            </nav>

            <LiquidButton full className="relative z-10 mt-10" onClick={() => { setOpen(false); openDiagnosis('menu'); }}>
              Diseñar mi arquitectura
            </LiquidButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
