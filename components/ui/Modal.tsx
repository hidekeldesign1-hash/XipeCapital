'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * Panel líquido de pantalla completa. Bloquea scroll, atrapa el foco,
 * cierra con Escape y devuelve el foco al disparador.
 */
export default function Modal({
  open, onClose, label, children,
}: { open: boolean; onClose: () => void; label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) last.current = document.activeElement as HTMLElement;
    document.body.classList.toggle('is-locked', open);
    if (!open) { last.current?.focus(); return; }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !ref.current) return;
      const nodes = Array.from(
        ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    };

    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => ref.current?.querySelector<HTMLElement>('button, input')?.focus(), 70);
    return () => { window.removeEventListener('keydown', onKey); window.clearTimeout(t); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog" aria-modal="true" aria-label={label}
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(26px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.42, ease: EASE }}
          className="fixed inset-0 z-[120] overflow-y-auto bg-white/78"
        >
          <div ref={ref} className="relative mx-auto min-h-svh w-full max-w-3xl px-5 py-6 md:px-10 md:py-10">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
