'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { METHOD } from '@/lib/constants';
import { EASE } from '@/lib/animations';

/** 05 · El método — layout blanco con timeline a la derecha */
export default function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.62 - r.top) / r.height));
      setFill(p);
      setActive(Math.min(METHOD.length - 1, Math.floor(p * METHOD.length)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="metodo" className="relative z-10 overflow-hidden bg-white py-24 text-dark-text md:py-28 lg:py-32">

      <div className="relative z-10 mx-auto grid max-w-shell gap-14 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="t-label mb-5 flex items-center gap-3 text-gold-muted">
            <span className="h-px w-6 bg-gold-muted" aria-hidden />
            05 El método
          </p>
          <h2 className="t-display t-h2 max-w-[14ch] font-medium text-dark-text">
            Un proceso que puedes anticipar.
          </h2>
          <p className="mt-5 max-w-[36ch] text-[15px] font-normal leading-relaxed tracking-wide text-dark-text/55 md:text-[16px]">
            Seis etapas que ocurren en el mismo orden, sin importar por dónde empieces.
          </p>
        </div>

        <div ref={ref} className="relative pl-8 md:pl-10">
          <span className="absolute left-0 top-2 bottom-2 w-px bg-dark-text/10" aria-hidden>
            <span
              className="absolute inset-x-0 top-0 block bg-gold-muted transition-[height] duration-150"
              style={{ height: `${fill * 100}%` }}
            />
          </span>

          {METHOD.map((m, i) => (
            <motion.article
              key={m.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative grid gap-3 py-7 sm:grid-cols-[88px_1fr] sm:gap-8 sm:py-8 md:grid-cols-[110px_1fr]"
            >
              <span
                className={`absolute -left-[calc(2rem+4.5px)] top-10 h-[10px] w-[10px] rotate-45 border transition-all duration-300 md:-left-[calc(2.5rem+4.5px)] ${
                  i <= active
                    ? 'border-gold-muted bg-gold-muted'
                    : 'border-dark-text/25 bg-white'
                }`}
                aria-hidden
              />
              <p
                className={`t-display text-[clamp(2.4rem,1.6rem+2.5vw,3.5rem)] font-normal leading-none transition-colors duration-300 ${
                  i <= active ? 'text-gold-muted' : 'text-dark-text/18'
                }`}
              >
                {m.n}
              </p>
              <div className="sm:pt-2">
                <p className="t-display mb-2 text-[clamp(1.15rem,1rem+0.6vw,1.4rem)] font-medium text-dark-text">
                  {m.title}
                </p>
                <p className="max-w-[42ch] text-[15px] font-normal leading-relaxed tracking-wide text-dark-text/55 md:text-[16px]">
                  {m.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
