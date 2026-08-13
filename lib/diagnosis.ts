/**
 * Diagnóstico de Arquitectura Patrimonial Xipe.
 *
 * IMPORTANTE: el resultado es CONCEPTUAL. No asigna productos, no entrega
 * porcentajes, no calcula sumas aseguradas y no constituye asesoría.
 * Solo nombra qué capa de la arquitectura conviene revisar primero.
 */

export type StepId =
  | 'primary_priority'
  | 'financial_stage'
  | 'time_horizon'
  | 'primary_value'
  | 'monthly_capacity_range';

export type Step = {
  id: StepId;
  n: string;
  question: string;
  note?: string;
  options: { value: string; label: string }[];
};

export const STEPS: Step[] = [
  {
    id: 'primary_priority',
    n: '01',
    question: '¿Qué quieres resolver primero?',
    options: [
      { value: 'familia', label: 'Proteger a mi familia' },
      { value: 'retiro', label: 'Preparar mi retiro' },
      { value: 'educacion', label: 'Construir el futuro educativo' },
      { value: 'capital', label: 'Invertir capital' },
      { value: 'reserva', label: 'Crear una reserva' },
      { value: 'salud', label: 'Proteger mi salud' },
      { value: 'patrimonial', label: 'Ordenar mi situación patrimonial / fiscal' },
      { value: 'empresa', label: 'Proteger mi empresa' },
      { value: 'no_se', label: 'Todavía no lo sé' },
    ],
  },
  {
    id: 'financial_stage',
    n: '02',
    question: '¿Qué situación describe mejor tu momento?',
    options: [
      { value: 'comenzando', label: 'Estoy comenzando a organizarme' },
      { value: 'con_productos', label: 'Ya tengo algunos productos' },
      { value: 'revisar', label: 'Quiero revisar lo que contraté' },
      { value: 'cambio', label: 'Mis ingresos o responsabilidades cambiaron' },
      { value: 'urgente', label: 'Tengo una decisión urgente' },
      { value: 'largo_plazo', label: 'Quiero construir una estrategia de largo plazo' },
    ],
  },
  {
    id: 'time_horizon',
    n: '03',
    question: '¿Cuál es tu horizonte principal?',
    options: [
      { value: 'lt1', label: 'Menos de un año' },
      { value: '1_3', label: 'De uno a tres años' },
      { value: '3_10', label: 'De tres a diez años' },
      { value: 'gt10', label: 'Más de diez años' },
      { value: 'no_se', label: 'Todavía no lo sé' },
    ],
  },
  {
    id: 'primary_value',
    n: '04',
    question: '¿Qué valoras más en este momento?',
    options: [
      { value: 'certeza', label: 'Certeza' },
      { value: 'liquidez', label: 'Liquidez' },
      { value: 'proteccion', label: 'Protección' },
      { value: 'crecimiento', label: 'Crecimiento' },
      { value: 'flexibilidad', label: 'Flexibilidad' },
      { value: 'acompanamiento', label: 'Acompañamiento' },
    ],
  },
  {
    id: 'monthly_capacity_range',
    n: '05',
    question: '¿En qué rango se encuentra la capacidad que podrías destinar mensualmente?',
    note: 'Este dato no representa un compromiso de aportación.',
    options: [
      { value: 'lt2000', label: 'Menos de $2,000' },
      { value: '2000_5000', label: '$2,000 a $5,000' },
      { value: '5001_10000', label: '$5,001 a $10,000' },
      { value: '10001_20000', label: '$10,001 a $20,000' },
      { value: 'gt20000', label: 'Más de $20,000' },
      { value: 'conversacion', label: 'Prefiero definirlo durante la conversación' },
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

export type Result = {
  focus: string;
  layers: string[];
  reading: string;
  next: string;
};

/** Lectura conceptual. Nombra capas, nunca productos ni cifras. */
export function buildResult(a: Answers): Result {
  const priority = a.primary_priority ?? 'no_se';
  const value = a.primary_value ?? 'certeza';
  const horizon = a.time_horizon ?? 'no_se';

  const map: Record<string, { focus: string; layers: string[]; reading: string }> = {
    familia: {
      focus: 'Protección y liquidez',
      layers: ['Protección', 'Ahorro'],
      reading: 'Tu prioridad se concentra en la base de la arquitectura: qué ocurre con los ingresos y con quienes dependen de ellos.',
    },
    retiro: {
      focus: 'Continuidad y horizonte',
      layers: ['Continuidad', 'Inversión'],
      reading: 'La prioridad es de largo plazo, donde la sostenibilidad de la aportación pesa más que el punto de partida.',
    },
    educacion: {
      focus: 'Horizonte educativo',
      layers: ['Ahorro', 'Inversión'],
      reading: 'La prioridad apunta a un objetivo con fecha: conviene separar reserva inmediata de capital con horizonte educativo.',
    },
    capital: {
      focus: 'Crecimiento con base revisada',
      layers: ['Inversión', 'Ahorro'],
      reading: 'La prioridad apunta a crecimiento. Conviene confirmar que la base y la reserva no queden expuestas al asignar capital.',
    },
    reserva: {
      focus: 'Liquidez y estructura',
      layers: ['Ahorro', 'Protección'],
      reading: 'La prioridad está en construir capacidad de respuesta antes de comprometer capital a largo plazo.',
    },
    salud: {
      focus: 'Protección y liquidez',
      layers: ['Protección', 'Ahorro'],
      reading: 'La prioridad está en evitar que un evento médico obligue a liquidar lo que ya está funcionando.',
    },
    patrimonial: {
      focus: 'Orden patrimonial',
      layers: ['Protección', 'Ahorro', 'Continuidad'],
      reading: 'La prioridad es ordenar lo existente: qué función cumple cada pieza y dónde hay huecos o duplicidades.',
    },
    empresa: {
      focus: 'Continuidad empresarial',
      layers: ['Protección', 'Continuidad'],
      reading: 'La prioridad está en la empresa: ingresos, continuidad y el impacto patrimonial de un imprevisto operativo.',
    },
    no_se: {
      focus: 'Diagnóstico de base',
      layers: ['Protección', 'Ahorro'],
      reading: 'Cuando no hay una prioridad definida, la lectura empieza por la base: qué está expuesto hoy y con qué reserva se cuenta.',
    },
  };

  const base = map[priority] ?? map.no_se;

  const valueNote: Record<string, string> = {
    certeza: 'Como valoras la certeza, el orden de revisión debería empezar por lo que hoy no está cubierto.',
    liquidez: 'Como valoras la liquidez, conviene revisar primero qué parte del capital podría necesitarse sin aviso.',
    proteccion: 'Como valoras la protección, la conversación empieza por los eventos de mayor impacto.',
    crecimiento: 'Como valoras el crecimiento, el punto a revisar es qué plazo puedes sostener sin necesitar ese capital.',
    flexibilidad: 'Como valoras la flexibilidad, conviene revisar qué compromisos de permanencia estarías aceptando.',
    acompanamiento: 'Como valoras el acompañamiento, el siguiente paso natural es una conversación, no un producto.',
  };

  const horizonNote: Record<string, string> = {
    lt1: 'Con un horizonte corto, la disponibilidad pesa más que el rendimiento.',
    '1_3': 'Con un horizonte de uno a tres años, la liquidez sigue siendo la variable dominante.',
    '3_10': 'Con un horizonte de tres a diez años, empieza a tener sentido separar reserva de capital de crecimiento.',
    gt10: 'Con un horizonte largo, la sostenibilidad de la aportación importa más que el punto de partida.',
    no_se: 'Definir el horizonte es, en sí mismo, uno de los primeros pasos.',
  };

  return {
    focus: base.focus,
    layers: base.layers,
    reading: base.reading,
    next: `${valueNote[value] ?? ''} ${horizonNote[horizon] ?? ''}`.trim(),
  };
}

/**
 * Estructura lista para el CRM. En preview NO se envía.
 *
 * Conexión futura con GoHighLevel:
 *   A · Webhook      -> fetch(process.env.NEXT_PUBLIC_GHL_WEBHOOK!, { method:'POST', body: JSON.stringify(payload) })
 *   B · API v2       -> POST https://services.leadconnectorhq.com/contacts/  (token SOLO del lado servidor, en una route handler)
 *   C · Make/Zapier  -> únicamente si se requiere enrutar por asesor
 * Nunca incluir claves en el cliente.
 */
export function buildCrmPayload(a: Answers, c: Contact, selectedRoute?: string) {
  return {
    first_name: c.first_name,
    phone: c.phone,
    email: c.email,
    city: c.city,
    preferred_time: c.preferred_time,
    primary_priority: a.primary_priority ?? '',
    financial_stage: a.financial_stage ?? '',
    time_horizon: a.time_horizon ?? '',
    primary_value: a.primary_value ?? '',
    monthly_capacity_range: a.monthly_capacity_range ?? '',
    selected_route: selectedRoute ?? '',
    lead_source: '[UTM_SOURCE]',
    campaign: '[UTM_CAMPAIGN]',
    content: '[UTM_CONTENT]',
    consent: c.consent,
  };
}
