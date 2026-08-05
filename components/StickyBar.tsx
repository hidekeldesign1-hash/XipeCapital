'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LiquidButton from '@/components/ui/LiquidButton';
import { EASE } from '@/lib/motion';
import { trackEvent } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';

/**
 * CTA sticky móvil después del hero, y WhatsApp solo tras una interacción
 * de intención (40% de scroll o apertura del diagnóstico).
 */
export default function StickyBar() {
  const [show, setShow] = useState(false);
  const [wa, setWa] = useState(false);
  const { open, isOpen } = useDiagnosis();

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const past = window.scrollY > window.innerHeight * 0.85;
      const nearEnd = window.scrollY + window.innerHeight > doc.scrollHeight - 420;
      setShow(past && !nearEnd);
      if ((window.scrollY + window.innerHeight) / doc.scrollHeight > 0.4) setWa(true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { if (isOpen) setWa(true); }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {show && !isOpen && (
          <motion.div
            initial={{ y: '130%' }} animate={{ y: 0 }} exit={{ y: '130%' }}
            transition={{ duration: 0.42, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 lg:hidden"
          >
            <div className="liquid liquid-strong rounded-full p-1.5">
              <LiquidButton full onClick={() => { trackEvent('mobile_sticky_cta_click'); open('sticky'); }}>
                Diseñar mi arquitectura
              </LiquidButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wa && !isOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.36, ease: EASE }}
            onClick={() => alert('Botón de demostración.\n\nEn la versión publicada abriría WhatsApp del asesor asignado.')}
            className="liquid liquid-strong fixed bottom-[104px] right-4 z-[80] inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-5 text-[14px] font-semibold uppercase tracking-[.09em] text-ink md:bottom-8 md:right-8"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--xipe-gold-ink)" aria-hidden>
              <path d="M12 2.4A9.6 9.6 0 0 0 3.7 16.9L2.4 21.6l4.8-1.3A9.6 9.6 0 1 0 12 2.4zm5.2 13.4c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2 0 .4-.1.5l-.4.5c-.1.1-.3.3-.1.5.3.6 1.1 1.8 2.4 2.4.2.1.4.1.5 0l.6-.6c.1-.2.3-.2.5-.1l2 .9c.2.1.4.2.4.3s.1.6-.1 1z" />
            </svg>
            WhatsApp
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
