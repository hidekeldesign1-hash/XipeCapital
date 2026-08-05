'use client';

import { motion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';

/** Revelado por máscara. Un solo gesto para todas las secciones. */
export default function SectionReveal({
  children, delay = 0, className = '', mask = false,
}: { children: React.ReactNode; delay?: number; className?: string; mask?: boolean }) {
  return (
    <motion.div
      className={className}
      initial={mask ? { clipPath: 'inset(0 0 100% 0)', opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={mask ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: mask ? DUR.section : DUR.reveal, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
