/** Todo el copy de la versión B, en un solo archivo auditable. */

export const NAV = [
  { label: 'Arquitectura', href: '#arquitectura' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Método', href: '#metodo' },
  { label: 'Xipe', href: '#xipe' },
];

/** Capas del núcleo vivo. Frases de máximo diez palabras. */
export const LIVING_LAYERS = [
  { id: 'proteccion', name: 'Protección', line: 'Reducir el impacto de lo inesperado.' },
  { id: 'ahorro', name: 'Ahorro', line: 'Crear liquidez y capacidad de decisión.' },
  { id: 'inversion', name: 'Inversión', line: 'Asignar capital según objetivo y horizonte.' },
  { id: 'continuidad', name: 'Continuidad', line: 'Preparar retiro, dependientes y legado.' },
];

/** Cuatro etapas de la arquitectura interactiva. */
export const STAGES = [
  { n: '01', verb: 'Proteger', items: ['Ingresos', 'Salud', 'Dependientes', 'Activos'] },
  { n: '02', verb: 'Conservar', items: ['Liquidez', 'Reserva', 'Ahorro', 'Respuesta'] },
  { n: '03', verb: 'Crecer', items: ['Horizonte', 'Perfil', 'Inversión', 'Capital'] },
  { n: '04', verb: 'Continuar', items: ['Retiro', 'Negocio', 'Familia', 'Legado'] },
];

export type Service = {
  id: string;
  name: string;
  line: string;
  cta: string;
  event: string;
  /** posición en la constelación, en porcentaje del contenedor */
  x: number;
  y: number;
  size: 'lg' | 'md' | 'sm';
};

export const SERVICES: Service[] = [
  { id: 'proteccion', name: 'Protección', line: 'Ingresos, dependientes y continuidad frente a eventos de alto impacto.', cta: 'Evaluar protección', event: 'protection_selected', x: 16, y: 20, size: 'lg' },
  { id: 'ahorro', name: 'Ahorro', line: 'Liquidez, objetivos y construcción ordenada de capital.', cta: 'Organizar ahorro', event: 'savings_selected', x: 78, y: 15, size: 'md' },
  { id: 'inversion', name: 'Inversión', line: 'Horizonte, riesgo, liquidez y alternativas disponibles.', cta: 'Explorar inversión', event: 'investment_selected', x: 86, y: 55, size: 'lg' },
  { id: 'medicos', name: 'Gastos médicos', line: 'Protección patrimonial ante una emergencia de salud.', cta: 'Revisar protección médica', event: 'medical_selected', x: 62, y: 86, size: 'sm' },
  { id: 'auto', name: 'Automóvil', line: 'Cobertura, deducible, uso y momento de renovación.', cta: 'Revisar mi seguro', event: 'auto_selected', x: 22, y: 82, size: 'sm' },
  { id: 'retiro', name: 'Retiro y continuidad', line: 'Preparación de largo plazo para retiro, familia o negocio.', cta: 'Planear continuidad', event: 'retirement_selected', x: 8, y: 52, size: 'md' },
];

export const METHOD = [
  { n: '01', title: 'Diagnosticar', line: 'Prioridad, riesgo, capacidad y horizonte.' },
  { n: '02', title: 'Diseñar', line: 'Funciones, rutas y alternativas.' },
  { n: '03', title: 'Evolucionar', line: 'Implementación, seguimiento y revisión.' },
];

export const PROCESS_SIGNALS = [
  { n: '01', title: 'Diagnóstico', line: 'Se revisa lo que ya existe antes de proponer.' },
  { n: '02', title: 'Estructura', line: 'Cada solución recibe una función explícita.' },
  { n: '03', title: 'Seguimiento', line: 'Lo acordado queda documentado y se revisa.' },
];

export const FAQS = [
  {
    q: '¿Qué es una arquitectura patrimonial?',
    a: 'El orden y la función que cumple cada elemento —protección, ahorro, inversión y continuidad— dentro de un mismo conjunto. No es un producto: es cómo se relacionan entre sí.',
  },
  {
    q: '¿El diagnóstico tiene costo?',
    a: 'No tiene costo para la persona. [VALIDAR RESPUESTA OPERATIVA: esquema de remuneración y su comunicación]',
  },
  {
    q: '¿El resultado es una recomendación definitiva?',
    a: 'No. Es una orientación conceptual sobre qué conviene revisar primero. No constituye asesoría financiera, fiscal ni jurídica, ni sustituye el análisis con documentación aplicable.',
  },
  {
    q: '¿Cuál es la diferencia entre protección, ahorro e inversión?',
    a: 'La protección reduce el impacto de un evento. El ahorro da disponibilidad. La inversión busca crecimiento aceptando plazo y riesgo. Confundirlas es el origen más común de una estrategia que no funciona.',
  },
  {
    q: '¿Puedo revisar soluciones que ya contraté?',
    a: 'Sí, y suele ser el primer paso. Permite ver duplicidades, huecos y elementos que ya no corresponden a tu situación, sin que eso implique cambiarlos.',
  },
  {
    q: '¿Qué sucede después del diagnóstico?',
    a: 'Recibes la lectura de tu prioridad. Si quieres avanzar, se agenda una conversación para revisarla con información completa. [VALIDAR RESPUESTA OPERATIVA: tiempos y horarios]',
  },
];

export const DISCLAIMER =
  'La información presentada es general e informativa. No constituye una recomendación financiera, fiscal o jurídica. Las coberturas, costos, riesgos, aceptación, disponibilidad y condiciones dependen de las instituciones, productos, evaluaciones y documentación correspondientes.';
