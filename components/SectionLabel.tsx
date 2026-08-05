'use client';

import { motion } from 'framer-motion';

/** Marca de sección: número + nombre, con la greca como filete. */
export default function SectionLabel({
  n, children, tone = 'dark',
}: { n: string; children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.28, 1] }}
      className="t-label mb-6 flex items-center gap-3"
    >
      <span className="fret" aria-hidden />
      <span className={tone === 'light' ? 'text-gold-muted' : 'text-gold'}>{n}</span>
      <span className={tone === 'light' ? 'text-dark-text/60' : 'text-text-muted'}>{children}</span>
    </motion.p>
  );
}
