'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { trackEvent } from '@/lib/tracking';
import { useDiagnosis } from '@/components/Diagnosis';

/** Solo móvil. Aparece después del hero y se retira al llegar al pie. */
export default function StickyCTA() {
  const [show, setShow] = useState(false);
  const { open, isOpen } = useDiagnosis();

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const past = window.scrollY > window.innerHeight * 0.85;
      const nearEnd = window.scrollY + window.innerHeight > doc.scrollHeight - 420;
      setShow(past && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && !isOpen && (
        <motion.div
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          exit={{ y: '120%' }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.28, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 px-6 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden"
        >
          <button
            type="button"
            onClick={() => { trackEvent('mobile_sticky_cta_click'); open('sticky'); }}
            className="min-h-[54px] w-full rounded-sm bg-gold text-[15px] font-medium uppercase tracking-[.13em] text-black transition-opacity hover:opacity-90"
          >
            Diseñar mi arquitectura
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
