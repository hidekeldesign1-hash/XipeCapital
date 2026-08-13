'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ARCHETYPES } from '@/lib/constants';
import { useDiagnosis } from '@/components/Diagnosis';
import { trackEvent } from '@/lib/tracking';
import { EASE } from '@/lib/animations';

export default function Arquetipos() {
  const { open } = useDiagnosis();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="arquetipos" className="relative overflow-hidden bg-black py-24 md:py-28 lg:py-32">
      <div className="relative z-10 mx-auto max-w-shell px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <p className="t-label mb-4 text-gold">
              <span className="text-gold-muted">—</span> 02 Arquetipos
            </p>
            <h2 className="t-display t-h2 max-w-[18ch] font-medium">¿Qué papel quieres que juegue tu patrimonio?</h2>
          </div>
          <p className="max-w-[34ch] text-[15px] font-normal leading-relaxed tracking-wide text-text-muted md:pb-2 md:text-right">
            Cada persona tiene un propósito distinto. Identifica el tuyo.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {ARCHETYPES.map((a, i) => {
            const on = active === a.id;
            return (
              <motion.button
                key={a.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.65, ease: EASE }}
                onClick={() => {
                  setActive(a.id);
                  trackEvent('diagnosis_step_completed', { step: '02', field: 'archetype', value: a.id });
                  open('arquetipos', { priority: a.id === 'protector' ? 'familia' : a.id === 'constructor' ? 'reserva' : 'capital' });
                }}
                className={`group relative overflow-hidden rounded-sm border text-left transition-colors duration-300 ${
                  on ? 'border-[#C4A77D]/30' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-xipe group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center border border-white/15 bg-black/40 text-gold" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 12h16M12 4v16" />
                    </svg>
                  </span>
                </div>

                <div className="bg-black px-5 py-5 sm:px-6 sm:py-6">
                  <h3 className="t-label mb-3 font-medium text-gold">{a.title}</h3>
                  <p className="border-t border-white/10 pt-3 text-[15px] font-normal leading-relaxed tracking-wide text-text-muted">
                    {a.line}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
