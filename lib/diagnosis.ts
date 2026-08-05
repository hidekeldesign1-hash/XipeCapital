/**
 * Diagnóstico — VERSIÓN B. Cinco pasos: cuatro preguntas y contacto.
 * El resultado es CONCEPTUAL y no supera 55 palabras. No asigna productos,
 * no entrega cifras y no constituye asesoría.
 */

export type StepId = 'primary_priority' | 'financial_stage' | 'primary_value' | 'time_horizon';

export type Step = {
  id: StepId;
  n: string;
  question: string;
  options: { value: string; label: string }[];
};

export const STEPS: Step[] = [
  {
    id: 'primary_priority',
    n: '01',
    question: '¿Qué quieres resolver primero?',
    options: [
      { value: 'proteccion', label: 'Protección' },
      { value: 'ahorro', label: 'Ahorro' },
      { value: 'inversion', label: 'Inversión' },
      { value: 'salud', label: 'Salud' },
      { value: 'auto', label: 'Automóvil' },
      { value: 'retiro', label: 'Retiro' },
      { value: 'no_se', label: 'No estoy seguro' },
    ],
  },
  {
    id: 'financial_stage',
    n: '02',
    question: '¿Qué describe mejor tu momento?',
    options: [
      { value: 'comenzando', label: 'Estoy comenzando' },
      { value: 'con_productos', label: 'Ya tengo algunos productos' },
      { value: 'revisar', label: 'Quiero revisar lo que contraté' },
      { value: 'cambio', label: 'Mis responsabilidades cambiaron' },
      { value: 'inmediata', label: 'Tengo una decisión inmediata' },
    ],
  },
  {
    id: 'primary_value',
    n: '03',
    question: '¿Qué valoras más ahora?',
    options: [
      { value: 'certeza', label: 'Certeza' },
      { value: 'liquidez', label: 'Liquidez' },
      { value: 'crecimiento', label: 'Crecimiento' },
      { value: 'flexibilidad', label: 'Flexibilidad' },
      { value: 'acompanamiento', label: 'Acompañamiento' },
    ],
  },
  {
    id: 'time_horizon',
    n: '04',
    question: '¿Cuál es tu horizonte principal?',
    options: [
      { value: 'lt1', label: 'Menos de un año' },
      { value: '1_3', label: 'De uno a tres años' },
      { value: '3_10', label: 'De tres a diez años' },
      { value: 'gt10', label: 'Más de diez años' },
      { value: 'no_se', label: 'Todavía no lo sé' },
    ],
  },
];

export type Answers = Partial<Record<StepId, string>>;

export type Contact = {
  first_name: string;
  phone: string;
  email: string;
  city: string;
  preferred_time: string;
  consent: boolean;
};

export const EMPTY_CONTACT: Contact = {
  first_name: '', phone: '', email: '', city: '', preferred_time: '', consent: false,
};

export type Result = { focus: string; layers: string[]; reading: string };

/** Lectura conceptual, máximo 55 palabras. Nombra capas, nunca productos. */
export function buildResult(a: Answers): Result {
  const priority = a.primary_priority ?? 'no_se';
  const value = a.primary_value ?? 'certeza';

  const base: Record<string, { focus: string; layers: string[]; reading: string }> = {
    proteccion: { focus: 'Protección y liquidez', layers: ['Proteger', 'Conservar'], reading: 'Tu prioridad está en la base: qué eventos pueden afectar tus ingresos y qué protección ya tienes.' },
    salud: { focus: 'Protección y liquidez', layers: ['Proteger', 'Conservar'], reading: 'Tu prioridad está en evitar que un evento médico obligue a liquidar lo que ya funciona.' },
    auto: { focus: 'Protección de activos', layers: ['Proteger'], reading: 'Tu prioridad está acotada a un activo, así que conviene empezar por una revisión puntual.' },
    ahorro: { focus: 'Liquidez y estructura', layers: ['Conservar', 'Proteger'], reading: 'Tu prioridad es construir capacidad de respuesta antes de comprometer capital a plazo.' },
    inversion: { focus: 'Crecimiento con base revisada', layers: ['Crecer', 'Conservar'], reading: 'Tu prioridad apunta a crecimiento. Conviene confirmar que base y reserva no queden expuestas.' },
    retiro: { focus: 'Continuidad y horizonte', layers: ['Continuar', 'Crecer'], reading: 'Tu prioridad es de largo plazo: pesa más lo que puedas sostener que el punto de partida.' },
    no_se: { focus: 'Diagnóstico de base', layers: ['Proteger', 'Conservar'], reading: 'Sin una prioridad definida, la lectura empieza por lo que hoy está expuesto y qué reserva existe.' },
  };

  const tail: Record<string, string> = {
    certeza: 'El siguiente paso sería revisar qué no está cubierto hoy.',
    liquidez: 'El siguiente paso sería revisar qué capital podrías necesitar sin aviso.',
    crecimiento: 'El siguiente paso sería definir qué plazo puedes sostener.',
    flexibilidad: 'El siguiente paso sería revisar qué permanencia estarías aceptando.',
    acompanamiento: 'El siguiente paso sería una conversación, no un producto.',
  };

  const b = base[priority] ?? base.no_se;
  return { focus: b.focus, layers: b.layers, reading: `${b.reading} ${tail[value] ?? ''}`.trim() };
}

/**
 * Payload de CRM. En preview NO se envía.
 *
 * GoHighLevel:
 *   A · Webhook -> fetch(process.env.NEXT_PUBLIC_GHL_WEBHOOK!, { method:'POST', body: JSON.stringify(payload) })
 *   B · API v2  -> POST services.leadconnectorhq.com/contacts/ desde una route handler (token solo en servidor)
 *   C · Make    -> solo si hay que enrutar por asesor
 * Nunca incluir claves en el cliente.
 */
export function buildCrmPayload(a: Answers, c: Contact, selectedService?: string) {
  return {
    first_name: c.first_name,
    phone: c.phone,
    email: c.email,
    city: c.city,
    preferred_time: c.preferred_time,
    primary_priority: a.primary_priority ?? '',
    financial_stage: a.financial_stage ?? '',
    primary_value: a.primary_value ?? '',
    time_horizon: a.time_horizon ?? '',
    selected_route: selectedService ?? '',
    lead_source: '[UTM_SOURCE]',
    campaign: '[UTM_CAMPAIGN]',
    content: '[UTM_CONTENT]',
    variant: 'B',
    consent: c.consent,
  };
}
