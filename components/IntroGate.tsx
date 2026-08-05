'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/animations';
import { trackEvent, trackOnce } from '@/lib/tracking';

/**
 * Puerta de entrada al sitio.
 * Fondo preparado para una animación en loop (canvas / secuencia).
 * El CTA revela la landing con una salida suave.
 */
export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('is-locked', visible);
    return () => document.body.classList.remove('is-locked');
  }, [visible]);

  useEffect(() => {
    if (visible) trackOnce('intro_viewed');
  }, [visible]);

  const enter = () => {
    trackEvent('intro_enter_click');
    setVisible(false);
  };

  return (
    <>
      <div aria-hidden={visible || undefined} className={visible ? 'pointer-events-none select-none' : undefined}>
        {children}
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="intro"
            role="dialog"
            aria-modal="true"
            aria-label="Bienvenida a Xipe Capital Group"
            className="fixed inset-0 z-[180] flex flex-col items-center justify-center overflow-hidden bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Slot de fondo: aquí irá la animación en loop */}
            <div className="pointer-events-none absolute inset-0" data-intro-bg aria-hidden>
              <div className="grid-bg opacity-70" />
              <span className="glow absolute left-1/2 top-[28%] h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2" />
              <span className="glow glow--signal absolute -bottom-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 opacity-80" />
            </div>

            <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.85, ease: EASE }}
                className="mb-10"
              >
                <Image
                  src="/xipe-logo.png"
                  alt="Xipe Capital Group"
                  width={264}
                  height={271}
                  priority
                  className="mx-auto h-auto w-[min(56vw,220px)]"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7, ease: EASE }}
                className="t-label mb-5 flex items-center justify-center gap-3 text-gold"
              >
                <span className="fret" aria-hidden />
                Arquitectura patrimonial
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.75, ease: EASE }}
                className="t-display t-h3 mb-12 max-w-[16ch] text-text"
              >
                Tu patrimonio necesita una <span className="t-glow">arquitectura</span>.
              </motion.p>

              <motion.button
                type="button"
                onClick={enter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.7, ease: EASE }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="intro-cta group relative inline-flex min-h-[64px] items-center justify-center gap-3 overflow-hidden rounded-sm bg-gold px-10 text-[15px] font-semibold uppercase tracking-[.14em] text-black transition-colors duration-200 hover:bg-gold-light"
              >
                <span className="relative z-10">Diseñar mi arquitectura</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                >
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
