'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { STEPS, EMPTY_CONTACT, buildResult, buildCrmPayload, type Answers, type Contact } from '@/lib/diagnosis';
import { trackEvent } from '@/lib/tracking';

type OpenOpts = { priority?: string };
type Ctx = {
  open: (source?: string, opts?: OpenOpts) => void;
  close: () => void;
  isOpen: boolean;
};
const DiagnosisCtx = createContext<Ctx>({ open: () => {}, close: () => {}, isOpen: false });
export const useDiagnosis = () => useContext(DiagnosisCtx);

const TOTAL = STEPS.length;

export default function DiagnosisProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [step, setStep] = useState(0);           // 0..TOTAL-1 preguntas, TOTAL = resultado
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((source = 'unknown', opts?: OpenOpts) => {
    lastFocus.current = document.activeElement as HTMLElement;
    if (opts?.priority) {
      setAnswers({ primary_priority: opts.priority });
      setStep(1);
    } else {
      setAnswers({});
      setStep(0);
    }
    setContact(EMPTY_CONTACT);
    setSent(false);
    setErrors({});
    setOpen(true);
    trackEvent('diagnosis_started', { source, priority: opts?.priority });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus();
  }, []);

  // Bloqueo de scroll + Escape + foco atrapado
  useEffect(() => {
    document.body.classList.toggle('is-locked', isOpen);
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables).filter((el) => el.offsetParent !== null);
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('button, input')?.focus(), 60);
    return () => { window.removeEventListener('keydown', onKey); window.clearTimeout(t); };
  }, [isOpen, close]);

  const current = STEPS[step];
  const result = useMemo(() => buildResult(answers), [answers]);
  const progress = Math.round((Math.min(step, TOTAL) / TOTAL) * 100);

  function choose(value: string) {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    trackEvent('diagnosis_step_completed', { step: current.n, field: current.id });
    window.setTimeout(() => {
      if (step + 1 >= TOTAL) {
        trackEvent('diagnosis_completed');
        trackEvent('result_viewed');
      }
      setStep((s) => s + 1);
    }, 180);
  }

  function back() {
    trackEvent('diagnosis_back_clicked', { from: step + 1 });
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setAnswers({});
    setContact(EMPTY_CONTACT);
    setErrors({});
    setSent(false);
    setStep(0);
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

    // PREVIEW: no se envía nada. Este es el punto de conexión con el CRM.
    // eslint-disable-next-line no-console
    console.log('[Xipe] Payload listo para CRM (no enviado):', buildCrmPayload(answers, contact));
    trackEvent('advisor_review_requested', { primary_priority: answers.primary_priority ?? '' });
    setSent(true);
  }

  return (
    <DiagnosisCtx.Provider value={{ open, close, isOpen }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Diagnóstico de arquitectura patrimonial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.28, 1] }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black"
          >
            <div className="grid-bg" aria-hidden />
            <span className="glow absolute -right-40 -top-40 h-[620px] w-[620px]" aria-hidden />

            <div ref={panelRef} className="relative mx-auto flex min-h-svh max-w-3xl flex-col px-6 py-8 md:px-10 md:py-12">
              {/* Barra superior */}
              <div className="mb-10 flex items-center gap-5">
                <span className="t-label flex items-center gap-3 text-gold">
                  <span className="fret" aria-hidden />
                  Diagnóstico
                </span>
                <span className="ml-auto text-[14px] tabular-nums text-text-muted">
                  {step >= TOTAL ? 'Resultado' : `${String(step + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`}
                </span>
                <button type="button" onClick={close} aria-label="Cerrar diagnóstico" className="grid h-11 w-11 place-items-center rounded-sm border border-white/10 transition-colors hover:border-gold/50">
                  <span className="relative block h-px w-4 rotate-45 bg-text after:absolute after:left-0 after:top-0 after:h-px after:w-4 after:-rotate-90 after:bg-text" />
                </button>
              </div>

              <div className="mb-12 h-px w-full bg-white/10" role="progressbar" aria-label="Avance del diagnóstico" aria-valuemin={0} aria-valuemax={100} aria-valuenow={step >= TOTAL ? 100 : progress}>
                <motion.span className="block h-px bg-signal" animate={{ width: `${step >= TOTAL ? 100 : progress}%` }} transition={{ duration: 0.45, ease: [0.22, 0.61, 0.28, 1] }} />
              </div>

              <AnimatePresence mode="wait">
                {step < TOTAL && current && (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.38, ease: [0.22, 0.61, 0.28, 1] }}
                    className="flex-1"
                  >
                    <h2 className="t-display t-h3 max-w-[22ch]">{current.question}</h2>
                    {current.note && <p className="mt-4 text-[15px] text-text-muted">{current.note}</p>}

                    <div className="mt-9 grid gap-2">
                      {current.options.map((o) => {
                        const on = answers[current.id] === o.value;
                        return (
                          <button
                            key={o.value}
                            type="button"
                            aria-pressed={on}
                            onClick={() => choose(o.value)}
                            className={`flex min-h-[60px] items-center gap-4 rounded-sm border px-5 text-left text-[16px] transition-all duration-200 ${
                              on ? 'border-signal bg-signal/10 text-text' : 'border-white/10 bg-surface text-text-muted hover:border-white/25 hover:text-text'
                            }`}
                          >
                            <span className={`h-4 w-4 flex-none rotate-45 border transition-colors ${on ? 'border-signal bg-signal' : 'border-white/20'}`} aria-hidden />
                            {o.label}
                          </button>
                        );
                      })}
                    </div>

                    {step > 0 && (
                      <button type="button" onClick={back} className="mt-9 inline-flex items-center gap-3 py-3 text-[14px] uppercase tracking-[.12em] text-text-muted transition-colors hover:text-gold-light">
                        <span className="h-px w-7 bg-current" aria-hidden /> Anterior
                      </button>
                    )}
                  </motion.div>
                )}

                {step >= TOTAL && (
                  <motion.div key="resultado" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 0.61, 0.28, 1] }} className="flex-1 pb-16">
                    <p className="t-label mb-5 text-signal">Lectura conceptual</p>
                    <h2 className="t-display t-h3 max-w-[20ch]">{result.focus}</h2>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {result.layers.map((l) => (
                        <span key={l} className="rounded-sm border border-gold/30 px-3 py-1.5 text-[14px] uppercase tracking-[.12em] text-gold">{l}</span>
                      ))}
                    </div>

                    <p className="t-lede mt-8 max-w-prose2 text-text-muted">{result.reading}</p>
                    <p className="mt-5 max-w-prose2 text-[16px] leading-relaxed text-text-muted">{result.next}</p>

                    <p className="mt-8 border-l border-gold/50 py-2 pl-5 text-[15px] leading-relaxed text-text-muted">
                      Esta lectura es conceptual y no constituye una recomendación financiera, fiscal
                      o jurídica. No asigna productos ni define montos.
                    </p>

                    {!sent ? (
                      <div className="mt-12 border border-white/10 bg-surface p-6 md:p-8">
                        <h3 className="t-display t-h4 mb-2">Revisar esta lectura con un asesor</h3>
                        <p className="mb-7 text-[15px] text-text-muted">Tú eliges el horario. Sin compromiso.</p>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field id="first_name" label="Nombre" value={contact.first_name} error={errors.first_name} onChange={(v) => setContact({ ...contact, first_name: v })} />
                          <Field id="phone" label="WhatsApp" type="tel" placeholder="10 dígitos" value={contact.phone} error={errors.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
                          <Field id="email" label="Correo (opcional)" type="email" value={contact.email} error={errors.email} onChange={(v) => setContact({ ...contact, email: v })} />
                          <Field id="city" label="Ciudad (opcional)" value={contact.city} onChange={(v) => setContact({ ...contact, city: v })} />
                        </div>

                        <div className="mt-5">
                          <label htmlFor="preferred_time" className="mb-1.5 block text-[14px] font-semibold uppercase tracking-[.1em] text-text-muted">Horario preferido</label>
                          <select
                            id="preferred_time"
                            value={contact.preferred_time}
                            aria-invalid={!!errors.preferred_time}
                            aria-describedby={errors.preferred_time ? 'err_preferred_time' : undefined}
                            onChange={(e) => setContact({ ...contact, preferred_time: e.target.value })}
                            className="min-h-[56px] w-full rounded-sm border border-white/10 bg-graphite px-4 text-[16px] text-text focus:border-gold"
                          >
                            <option value="">Selecciona</option>
                            <option value="Mañana 9-12">Mañana, 9:00 a 12:00</option>
                            <option value="Tarde 12-18">Tarde, 12:00 a 18:00</option>
                            <option value="Noche 18-20">Noche, 18:00 a 20:00</option>
                            <option value="Cualquiera">Cualquier horario</option>
                          </select>
                          {errors.preferred_time && <p id="err_preferred_time" role="alert" className="mt-2 text-[14px] text-[#E9A08C]">{errors.preferred_time}</p>}
                        </div>

                        <label htmlFor="consent" className="mt-6 flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-text-muted">
                          <input
                            id="consent" type="checkbox" checked={contact.consent}
                            aria-invalid={!!errors.consent}
                            aria-describedby={errors.consent ? 'err_consent' : undefined}
                            onChange={(e) => setContact({ ...contact, consent: e.target.checked })}
                            className="mt-1 h-5 w-5 flex-none accent-[#9DE4D0]"
                          />
                          <span>
                            Acepto ser contactado por Xipe Capital Group para revisar esta lectura y
                            he leído el aviso de privacidad.{' '}
                            <span className="inline-flex items-center gap-2 rounded-sm border border-dashed border-gold/40 bg-gold/5 px-2 py-0.5 text-[14px] text-gold">
                              [AVISO DE PRIVACIDAD PENDIENTE]
                            </span>
                          </span>
                        </label>
                        {errors.consent && <p id="err_consent" role="alert" className="mt-2 text-[14px] text-[#E9A08C]">{errors.consent}</p>}

                        <div className="mt-4 flex gap-3 rounded-sm border border-dashed border-white/12 bg-white/[.02] p-4 text-[14px] leading-relaxed text-text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
                          Preview de demostración. La información no se envía ni se almacena.
                        </div>

                        <button type="button" onClick={submit} className="mt-7 min-h-[58px] w-full rounded-sm bg-gold px-8 text-[15px] font-semibold uppercase tracking-[.13em] text-black transition-colors hover:bg-gold-light">
                          Solicitar revisión con un asesor
                        </button>
                      </div>
                    ) : (
                      <div className="mt-12 border border-signal/30 bg-signal/[.06] p-8" role="status" aria-live="polite">
                        <span className="mb-6 grid h-14 w-14 place-items-center border border-signal/50">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9DE4D0" strokeWidth="1.8" strokeLinecap="square" aria-hidden><path d="M4 12l5 5L20 7" /></svg>
                        </span>
                        <h3 className="t-display t-h4 mb-3">Recibido en la demostración.</h3>
                        <p className="max-w-[46ch] text-[16px] leading-relaxed text-text-muted">
                          En una implementación real, esta lectura se enviaría al CRM, se asignaría a
                          un asesor y activaría el seguimiento en el horario que elegiste.
                        </p>
                        <p className="mt-5 inline-flex items-center gap-2 rounded-sm border border-dashed border-gold/40 bg-gold/5 px-3 py-1.5 text-[14px] text-gold">
                          [TIEMPO DE RESPUESTA Y HORARIO DE ATENCIÓN PENDIENTES]
                        </p>
                      </div>
                    )}

                    <div className="mt-9 flex flex-wrap gap-6">
                      <button type="button" onClick={restart} className="inline-flex items-center gap-3 py-2 text-[14px] uppercase tracking-[.12em] text-text-muted transition-colors hover:text-gold-light">
                        <span className="h-px w-7 bg-current" aria-hidden /> Reiniciar diagnóstico
                      </button>
                      <button type="button" onClick={close} className="inline-flex items-center gap-3 py-2 text-[14px] uppercase tracking-[.12em] text-text-muted transition-colors hover:text-gold-light">
                        <span className="h-px w-7 bg-current" aria-hidden /> Volver al sitio
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DiagnosisCtx.Provider>
  );
}

function Field({
  id, label, value, onChange, error, type = 'text', placeholder,
}: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold uppercase tracking-[.1em] text-text-muted">{label}</label>
      <input
        id={id} type={type} value={value} placeholder={placeholder}
        aria-invalid={!!error} aria-describedby={error ? `err_${id}` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[56px] w-full rounded-sm border border-white/10 bg-graphite px-4 text-[16px] text-text placeholder:text-white/25 focus:border-gold"
      />
      {error && <p id={`err_${id}`} role="alert" className="mt-2 text-[14px] text-[#E9A08C]">{error}</p>}
    </div>
  );
}
