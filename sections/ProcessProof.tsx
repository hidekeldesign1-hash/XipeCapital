'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import { PROCESS } from '@/lib/constants';
import { trackOnce } from '@/lib/tracking';

/** Prueba de proceso: sustituye cifras y testimonios que no existen todavía. */
export default function ProcessProof() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && trackOnce('process_viewed'), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-graphite py-24 md:py-36">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <SectionLabel n="07">Prueba de proceso</SectionLabel>
        <h2 className="t-display t-h2 mb-14 max-w-[20ch]">
          La confianza no se declara. <span className="t-glow">Se diseña en cada paso.</span>
        </h2>

        <div className="grid border-t border-white/10 md:grid-cols-2 md:gap-x-14 lg:grid-cols-3">
          {PROCESS.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 0.61, 0.28, 1] }}
              className="border-b border-white/10 py-8"
            >
              <p className="t-label mb-4 text-gold">{p.n}</p>
              <h3 className="t-display mb-3 text-[1.2rem]">{p.title}</h3>
              <p className="max-w-[36ch] text-[16px] leading-relaxed text-text-muted">{p.body}</p>
            </motion.article>
          ))}
        </div>

        {/*
          COMPONENTE DE TESTIMONIOS — preparado, oculto hasta contar con
          testimonios verificados y consentimiento por escrito.

          <figure className="mt-14 border-l border-gold pl-6">
            <blockquote className="t-lede">[TESTIMONIO VERIFICADO]</blockquote>
            <figcaption className="mt-4 text-[14px] uppercase tracking-[.14em] text-text-muted">
              [NOMBRE] · [OCUPACIÓN] · [FECHA]
            </figcaption>
          </figure>
        */}
      </div>
    </section>
  );
}
