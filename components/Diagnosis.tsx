'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import LiquidPanel from '@/components/ui/LiquidPanel';
import LiquidButton from '@/components/ui/LiquidButton';
import GrecaProgress from '@/components/greca/GrecaProgress';
import { STEPS, EMPTY_CONTACT, buildResult, buildCrmPayload, type Answers, type Contact } from '@/lib/diagnosis';
import { EASE } from '@/lib/motion';
import { trackEvent } from '@/lib/tracking';

type Ctx = { open: (source?: string) => void; close: () => void; isOpen: boolean };
const DiagnosisCtx = createContext<Ctx>({ open: () => {}, close: () => {}, isOpen: false });
export const useDiagnosis = () => useContext(DiagnosisCtx);

const Q = STEPS.length;          // 4 preguntas
const TOTAL = Q + 1;             // + contacto = 5 pasos

export default function DiagnosisProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);         // 0..Q-1 preguntas · Q resultado+contacto
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [source, setSource] = useState('unknown');

  const open = useCallback((src = 'unknown') => {
    setSource(src);
    setIsOpen(true);
    trackEvent('diagnosis_started', { source: src });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (!sent) trackEvent('diagnosis_abandoned', { at_step: step + 1, of: TOTAL });
  }, [sent, step]);

  const current = STEPS[step];
  const result = useMemo(() => buildResult(answers), [answers]);

  useEffect(() => {
    if (isOpen && step === Q) trackEvent('diagnosis_result_viewed');
  }, [isOpen, step]);

  function choose(value: string) {
    if (!current) return;
    setAnswers((p) => ({ ...p, [current.id]: value }));
    trackEvent('diagnosis_step_completed', { step: current.n, field: current.id });
    window.setTimeout(() => {
      if (step + 1 === Q) trackEvent('diagnosis_completed', { source });
      setStep((s) => s + 1);
    }, 170);
  }

  function back() {
    trackEvent('diagnosis_back_clicked', { from: step + 1 });
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setAnswers({}); setContact(EMPTY_CONTACT); setErrors({}); setSent(false); setStep(0);
  }

  function submit() {
    const e: Record<string, string> = {};
    if (contact.first_name.trim().length < 2) e.first_name = 'Escribe tu nombre.';
    if (!/^\d{10}$/.test(contact.phone.replace(/\D/g, ''))) e.phone = 'Escribe un número de 10 dígitos.';
    if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email)) e.email = 'Revisa el formato del correo.';
    if (!contact.preferred_time) e.preferred_time = 'Selecciona un horario.';
    if (!contact.consent) e.consent = 'Necesitamos tu aceptación para poder contactarte.';
    setErrors(e);
    if (Object.keys(e).length) return;

    // PREVIEW: no se envía nada. Punto de conexión con el CRM.
    // eslint-disable-next-line no-console
    console.log('[Xipe] Payload listo para CRM (no enviado):', buildCrmPayload(answers, contact));
    trackEvent('advisor_review_requested', { primary_priority: answers.primary_priority ?? '' });
    setSent(true);
  }

  return (
    <DiagnosisCtx.Provider value={{ open, close, isOpen }}>
      {children}

      <Modal open={isOpen} onClose={close} label="Diagnóstico de arquitectura patrimonial">
        <span className="daylight" aria-hidden />
        <span className="caustic absolute -right-20 top-0 h-[340px] w-[340px] bg-champagne" aria-hidden />

        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-4">
            <span className="t-label text-gold-ink">Diagnóstico</span>
            <span className="ml-auto text-[14px] tabular-nums text-muted">
              {String(Math.min(step + 1, TOTAL)).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </span>
            <button
              type="button" onClick={close} aria-label="Cerrar diagnóstico"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/70"
              style={{ border: '1px solid var(--xipe-border-dark)' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden><path d="M1 1l14 14M15 1L1 15" stroke="var(--xipe-ink)" strokeWidth="1.4" /></svg>
            </button>
          </div>

          <div className="mb-10">
            <GrecaProgress step={Math.min(step + (sent ? 1 : 0), TOTAL)} total={TOTAL} label="Avance del diagnóstico" />
          </div>

          <AnimatePresence mode="wait">
            {step < Q && current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.36, ease: EASE }}
              >
                <h2 className="t-display t-h3 mb-8 max-w-[18ch]">{current.question}</h2>

                <div className="grid gap-2.5">
                  {current.options.map((o) => {
                    const on = answers[current.id] === o.value;
                    return (
                      <button
                        key={o.value} type="button" aria-pressed={on} onClick={() => choose(o.value)}
                        className={`liquid liquid-sheen flex min-h-[62px] items-center gap-4 rounded-2xl px-6 text-left text-[17px] transition-all duration-200 ease-xipe ${
                          on ? 'text-ink shadow-liquid-lg' : 'text-muted hover:text-ink'
                        }`}
                        style={{ borderColor: on ? 'var(--xipe-mint)' : undefined }}
                      >
                        <span
                          className="grid h-5 w-5 flex-none place-items-center rounded-full"
                          style={{ border: '1px solid var(--xipe-border-dark)', background: on ? 'var(--xipe-mint)' : 'transparent' }}
                          aria-hidden
                        />
                        {o.label}
                      </button>
                    );
                  })}
                </div>

                {step > 0 && (
                  <button type="button" onClick={back} className="mt-8 inline-flex min-h-[48px] items-center gap-3 text-[14px] uppercase tracking-[.11em] text-muted transition-colors hover:text-ink">
                    <span className="h-px w-7 bg-current" aria-hidden /> Anterior
                  </button>
                )}
              </motion.div>
            )}

            {step === Q && (
              <motion.div
                key="resultado"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="pb-16"
              >
                <LiquidPanel strong className="mb-8 rounded-3xl p-7 md:p-9">
                  <p className="t-label mb-4 text-gold-ink">Tu lectura</p>
                  <h2 className="t-display t-h3 mb-5">{result.focus}</h2>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {result.layers.map((l) => (
                      <span key={l} className="rounded-full px-4 py-1.5 text-[14px] font-semibold" style={{ background: 'var(--xipe-mint-light)' }}>{l}</span>
                    ))}
                  </div>

                  <p className="max-w-reading text-[17px] leading-relaxed text-graphite">{result.reading}</p>
                  <p className="mt-5 border-l pl-5 text-[14px] leading-relaxed text-muted" style={{ borderColor: 'var(--xipe-gold)' }}>
                    Orientación inicial. No constituye una recomendación, cotización ni aceptación.
                  </p>
                </LiquidPanel>

                {!sent ? (
                  <LiquidPanel className="rounded-3xl p-7 md:p-9" sheen={false}>
                    <h3 className="t-display mb-6 text-[1.35rem]">Revisar mi ruta con un asesor</h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="first_name" label="Nombre" value={contact.first_name} error={errors.first_name} onChange={(v) => setContact({ ...contact, first_name: v })} />
                      <Field id="phone" label="WhatsApp" type="tel" placeholder="10 dígitos" value={contact.phone} error={errors.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
                      <Field id="email" label="Correo (opcional)" type="email" value={contact.email} error={errors.email} onChange={(v) => setContact({ ...contact, email: v })} />
                      <Field id="city" label="Ciudad (opcional)" value={contact.city} onChange={(v) => setContact({ ...contact, city: v })} />
                    </div>

                    <div className="mt-4">
                      <label htmlFor="preferred_time" className="mb-1.5 block text-[14px] font-semibold uppercase tracking-[.09em] text-muted">Horario</label>
                      <select
                        id="preferred_time" value={contact.preferred_time}
                        aria-invalid={!!errors.preferred_time} aria-describedby={errors.preferred_time ? 'err_preferred_time' : undefined}
                        onChange={(e) => setContact({ ...contact, preferred_time: e.target.value })}
                        className="min-h-[56px] w-full rounded-xl bg-white/70 px-4 text-[16px] text-ink"
                        style={{ border: '1px solid var(--xipe-border-dark)' }}
                      >
                        <option value="">Selecciona</option>
                        <option value="Mañana 9-12">Mañana, 9:00 a 12:00</option>
                        <option value="Tarde 12-18">Tarde, 12:00 a 18:00</option>
                        <option value="Noche 18-20">Noche, 18:00 a 20:00</option>
                        <option value="Cualquiera">Cualquier horario</option>
                      </select>
                      {errors.preferred_time && <p id="err_preferred_time" role="alert" className="mt-2 text-[14px] text-[#A8452C]">{errors.preferred_time}</p>}
                    </div>

                    <label htmlFor="consent" className="mt-6 flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-muted">
                      <input
                        id="consent" type="checkbox" checked={contact.consent}
                        aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'err_consent' : undefined}
                        onChange={(e) => setContact({ ...contact, consent: e.target.checked })}
                        className="mt-1 h-5 w-5 flex-none accent-[#8EDCC9]"
                      />
                      <span>Acepto ser contactado para revisar esta lectura. <span className="text-gold-ink">[AVISO DE PRIVACIDAD PENDIENTE]</span></span>
                    </label>
                    {errors.consent && <p id="err_consent" role="alert" className="mt-2 text-[14px] text-[#A8452C]">{errors.consent}</p>}

                    <p className="mt-5 rounded-xl px-4 py-3 text-[14px] leading-relaxed text-muted" style={{ background: 'var(--xipe-glass-dark)' }}>
                      Preview de demostración. La información no se envía ni se almacena.
                    </p>

                    <LiquidButton full className="mt-6" onClick={submit}>Revisar mi ruta con un asesor</LiquidButton>
                  </LiquidPanel>
                ) : (
                  <LiquidPanel strong className="rounded-3xl p-8" sheen={false}>
                    <div role="status" aria-live="polite">
                      <span className="mb-5 grid h-14 w-14 place-items-center rounded-full" style={{ background: 'var(--xipe-mint-light)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--xipe-ink)" strokeWidth="1.7" strokeLinecap="square" aria-hidden><path d="M4 12l5 5L20 7" /></svg>
                      </span>
                      <h3 className="t-display mb-3 text-[1.35rem]">Recibido en la demostración.</h3>
                      <p className="max-w-reading text-[16px] leading-relaxed text-muted">
                        En una implementación real esto iría al CRM, se asignaría a un asesor y activaría el seguimiento en el horario que elegiste.
                      </p>
                    </div>
                  </LiquidPanel>
                )}

                <div className="mt-7 flex flex-wrap gap-6">
                  <button type="button" onClick={restart} className="min-h-[48px] text-[14px] uppercase tracking-[.11em] text-muted transition-colors hover:text-ink">Reiniciar</button>
                  <button type="button" onClick={close} className="min-h-[48px] text-[14px] uppercase tracking-[.11em] text-muted transition-colors hover:text-ink">Volver al sitio</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </DiagnosisCtx.Provider>
  );
}

function Field({
  id, label, value, onChange, error, type = 'text', placeholder,
}: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold uppercase tracking-[.09em] text-muted">{label}</label>
      <input
        id={id} type={type} value={value} placeholder={placeholder}
        aria-invalid={!!error} aria-describedby={error ? `err_${id}` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[56px] w-full rounded-xl bg-white/70 px-4 text-[16px] text-ink placeholder:text-muted/50"
        style={{ border: '1px solid var(--xipe-border-dark)' }}
      />
      {error && <p id={`err_${id}`} role="alert" className="mt-2 text-[14px] text-[#A8452C]">{error}</p>}
    </div>
  );
}
