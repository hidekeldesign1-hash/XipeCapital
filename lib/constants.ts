/** Contenido y tokens compartidos. Todo el copy vive aquí para poder auditarlo. */

export const NAV = [
  { label: 'Arquitectura', href: '#arquitectura' },
  { label: 'Protección', href: '#pilares' },
  { label: 'Ahorro', href: '#pilares' },
  { label: 'Inversión', href: '#pilares' },
  { label: 'Método', href: '#metodo' },
  { label: 'Xipe', href: '#firma' },
];

export type CoreNode = {
  id: string;
  label: string;
  blurb: string;
  href: string;
  /** posición en el viewBox 640x640 del núcleo */
  x: number;
  y: number;
  /** trazo escalonado desde el núcleo hasta el nodo */
  path: string;
};

/**
 * XIPE PATRIMONIAL CORE
 * Los trazos son ortogonales y escalonados: la misma geometría de la greca
 * del logotipo, que es un trazo que avanza girando en ángulos rectos.
 */
export const CORE_NODES: CoreNode[] = [
  {
    id: 'proteccion',
    label: 'Protección',
    blurb: 'La base. Reduce el impacto de lo que puede desestabilizar todo lo demás.',
    href: '#pilares',
    x: 96, y: 128,
    path: 'M320 250 V196 H160 V128 H104',
  },
  {
    id: 'ahorro',
    label: 'Ahorro',
    blurb: 'Liquidez y capacidad de respuesta antes de comprometer capital.',
    href: '#pilares',
    x: 544, y: 128,
    path: 'M320 250 V180 H480 V128 H536',
  },
  {
    id: 'inversion',
    label: 'Inversión',
    blurb: 'Crecimiento evaluado por horizonte, liquidez y perfil.',
    href: '#pilares',
    x: 576, y: 368,
    path: 'M390 320 H512 V368 H568',
  },
  {
    id: 'salud',
    label: 'Salud',
    blurb: 'Evita que una emergencia médica comprometa activos e ingresos.',
    href: '#rutas',
    x: 460, y: 556,
    path: 'M356 390 V470 H408 V556 H452',
  },
  {
    id: 'activos',
    label: 'Activos',
    blurb: 'Automóvil, bienes y elementos relevantes del patrimonio.',
    href: '#rutas',
    x: 180, y: 556,
    path: 'M284 390 V470 H232 V556 H188',
  },
  {
    id: 'continuidad',
    label: 'Continuidad',
    blurb: 'Retiro, dependientes, negocio y transferencia patrimonial.',
    href: '#rutas',
    x: 64, y: 368,
    path: 'M250 320 H128 V368 H72',
  },
];

export const PROBLEM_CONCEPTS = [
  { n: '01', title: 'Proteger', body: 'Reducir el impacto de lo inesperado sobre ingresos, salud y activos.' },
  { n: '02', title: 'Conservar', body: 'Crear liquidez y capacidad de respuesta sin desarmar la estrategia.' },
  { n: '03', title: 'Crecer', body: 'Asignar capital según objetivos, horizonte y tolerancia al riesgo.' },
  { n: '04', title: 'Continuar', body: 'Preparar retiro, dependientes, negocio y transferencia patrimonial.' },
];

export type Layer = {
  n: string;
  title: string;
  role: string;
  body: string;
  items: string[];
  missing: string;
};

export const LAYERS: Layer[] = [
  {
    n: '01',
    title: 'Protección',
    role: 'Base de la arquitectura',
    body: 'Lo primero no es crecer. Es evitar que un solo evento obligue a deshacer todo lo construido.',
    items: ['Ingresos', 'Salud', 'Dependientes', 'Activos', 'Automóvil', 'Eventos de alto impacto'],
    missing: 'Sin esta capa, un imprevisto se financia vendiendo o liquidando lo que sí estaba funcionando.',
  },
  {
    n: '02',
    title: 'Ahorro',
    role: 'Liquidez y estabilidad',
    body: 'La reserva es lo que permite decidir con calma en lugar de decidir con urgencia.',
    items: ['Reserva', 'Objetivos', 'Capital disponible', 'Disciplina', 'Capacidad de respuesta'],
    missing: 'Sin liquidez, cualquier decisión de largo plazo se interrumpe al primer imprevisto.',
  },
  {
    n: '03',
    title: 'Inversión',
    role: 'Crecimiento y horizonte',
    body: 'El capital se asigna cuando ya existe base y reserva, no antes.',
    items: ['Objetivo', 'Plazo', 'Perfil', 'Liquidez', 'Diversificación', 'Soluciones autorizadas'],
    missing: 'Sin las capas previas, el crecimiento se vuelve frágil y se interrumpe en el peor momento.',
  },
  {
    n: '04',
    title: 'Continuidad',
    role: 'Visión de largo plazo',
    body: 'Lo que ocurre cuando tú ya no estás dirigiendo la estructura todos los días.',
    items: ['Retiro', 'Dependientes', 'Negocio', 'Sucesión', 'Legado'],
    missing: 'Sin continuidad, el patrimonio depende de que una sola persona siga presente.',
  },
];

export const PILLARS = [
  {
    n: '01', id: 'proteccion', title: 'Protección',
    body: 'Diseñar una base que reduzca el impacto financiero de eventos que pueden alterar tu patrimonio.',
    items: ['Salud', 'Ingresos', 'Familia', 'Activos', 'Automóvil'],
    cta: 'Evaluar mi protección', event: 'protection_cta_click',
  },
  {
    n: '02', id: 'ahorro', title: 'Ahorro',
    body: 'Construir liquidez y capital para responder, elegir y avanzar sin desordenar toda la estrategia.',
    items: ['Reserva', 'Metas', 'Capital disponible'],
    cta: 'Organizar mi ahorro', event: 'savings_cta_click',
  },
  {
    n: '03', id: 'inversion', title: 'Inversión',
    body: 'Evaluar crecimiento, horizonte, liquidez y riesgo antes de asignar capital.',
    items: ['Horizonte', 'Perfil', 'Liquidez', 'Diversificación'],
    cta: 'Explorar mi estrategia', event: 'investment_cta_click',
  },
  {
    n: '04', id: 'continuidad', title: 'Continuidad',
    body: 'Preparar retiro, dependientes, negocio y transferencia patrimonial.',
    items: ['Retiro', 'Dependientes', 'Negocio', 'Sucesión'],
    cta: 'Planear el largo plazo', event: 'retirement_cta_click',
  },
] as const;

export const METHOD = [
  { n: '01', title: 'Diagnosticar', body: 'Comprender prioridades, riesgos, capacidad y horizonte.' },
  { n: '02', title: 'Estructurar', body: 'Definir qué función debe cumplir cada solución dentro del conjunto.' },
  { n: '03', title: 'Evaluar', body: 'Revisar protección, liquidez, permanencia y posibles escenarios.' },
  { n: '04', title: 'Implementar', body: 'Coordinar información, propuesta, contratación y seguimiento.' },
  { n: '05', title: 'Evolucionar', body: 'Revisar la arquitectura cuando cambian ingresos, metas o responsabilidades.' },
];

export const ROUTES = [
  { n: '01', id: 'proteccion', title: 'Protección', trigger: 'Alguien depende de tus ingresos y no sabes qué pasaría sin ellos.', question: '¿Qué quedaría abierto si tú faltaras?', first: 'Revisar compromisos, dependientes y suma asegurada.', cta: 'Evaluar mi protección', event: 'protection_cta_click' },
  { n: '02', id: 'ahorro', title: 'Ahorro', trigger: 'Ahorras, pero sin una función clara para cada peso.', question: '¿Cuánta reserva necesitas antes de comprometer capital?', first: 'Separar reserva, metas y capital de largo plazo.', cta: 'Organizar mi ahorro', event: 'savings_cta_click' },
  { n: '03', id: 'inversion', title: 'Inversión', trigger: 'Quieres crecer capital pero no sabes con qué criterio elegir.', question: '¿Qué horizonte y qué liquidez necesitas realmente?', first: 'Definir objetivo, plazo y perfil antes de mirar alternativas.', cta: 'Explorar mi estrategia', event: 'investment_cta_click' },
  { n: '04', id: 'salud', title: 'Gastos médicos', trigger: 'Una hospitalización te haría revisar números que hoy no tienes claros.', question: '¿Cuánto quedaría a tu cargo entre deducible y coaseguro?', first: 'Revisar lo que ya tienes y lo que quedaría descubierto.', cta: 'Evaluar mi protección médica', event: 'health_cta_click' },
  { n: '05', id: 'auto', title: 'Automóvil', trigger: 'Tu póliza vence o compraste un vehículo.', question: '¿El precio corresponde a la protección que estás contratando?', first: 'Revisar cobertura, deducible, uso y momento de renovación.', cta: 'Revisar mi seguro', event: 'auto_cta_click' },
  { n: '06', id: 'retiro', title: 'Retiro', trigger: 'Quieres construir algo sostenible, no un plan que abandones en dos años.', question: '¿Qué aportación puedes sostener durante el horizonte que eliges?', first: 'Dimensionar horizonte, capacidad real y flexibilidad.', cta: 'Planear el largo plazo', event: 'retirement_cta_click' },
];

export const PROCESS = [
  { n: '01', title: 'Diagnóstico', body: 'Prioridad, momento, horizonte, capacidad y lo que ya está contratado.' },
  { n: '02', title: 'Análisis', body: 'Qué función cumple hoy cada elemento y dónde hay duplicidades o huecos.' },
  { n: '03', title: 'Ruta', body: 'El orden en que conviene atender cada capa, con lo que puede esperar.' },
  { n: '04', title: 'Propuesta', body: 'Alternativas explicadas con condiciones, costos y límites a la vista.' },
  { n: '05', title: 'Implementación', body: 'Coordinación de solicitud, documentación y respuesta de la institución.' },
  { n: '06', title: 'Revisión', body: 'La arquitectura se revisa cuando cambian ingresos, metas o responsabilidades.' },
];

export const ARTICLES = [
  { n: '01', title: 'Protección, ahorro e inversión no cumplen la misma función.', tag: 'Fundamentos', time: '5 min', lead: true },
  { n: '02', title: 'Cómo saber si tu patrimonio tiene huecos.', tag: 'Diagnóstico', time: '4 min', lead: false },
  { n: '03', title: 'Qué revisar antes de comprometerte a largo plazo.', tag: 'Decisiones', time: '4 min', lead: false },
  { n: '04', title: 'Prima, deducible y cobertura: por qué no son lo mismo.', tag: 'Conceptos', time: '3 min', lead: false },
  { n: '05', title: 'Cuándo debe actualizarse una estrategia patrimonial.', tag: 'Revisión', time: '3 min', lead: false },
];

export const FAQS = [
  { q: '¿Qué es una arquitectura patrimonial?', a: ['Es la forma en que se relacionan entre sí protección, ahorro, inversión y continuidad. No es un producto: es el orden y la función que cumple cada elemento dentro del conjunto.'] },
  { q: '¿El diagnóstico tiene costo?', a: ['El diagnóstico y la explicación de la ruta inicial no tienen costo para la persona.', '[VALIDAR RESPUESTA OPERATIVA: esquema de remuneración y su comunicación]'] },
  { q: '¿El diagnóstico representa una recomendación definitiva?', a: ['No. Es una orientación conceptual sobre qué conviene revisar primero. No constituye asesoría financiera, fiscal ni jurídica, y no sustituye el análisis de tu caso con la documentación aplicable.'] },
  { q: '¿Xipe trabaja con una o varias instituciones?', a: ['[VALIDAR RESPUESTA OPERATIVA: figura de operación e instituciones con las que se trabaja]', 'No publicaremos esta información hasta poder acreditarla.'] },
  { q: '¿Cuál es la diferencia entre protección, ahorro e inversión?', a: ['La protección busca reducir el impacto financiero de un evento. El ahorro busca disponibilidad. La inversión busca crecimiento aceptando riesgo y plazo.', 'Confundirlas es el origen más común de una estrategia que no funciona: se le pide liquidez a algo diseñado para crecer, o crecimiento a algo diseñado para proteger.'] },
  { q: '¿Qué información necesito compartir?', a: ['Para el diagnóstico inicial basta con tu prioridad, tu momento, tu horizonte y un rango de capacidad. Los datos de contacto se piden al final, después de ver el resultado.', 'No se solicitan datos bancarios, documentos ni información fiscal en esta etapa.'] },
  { q: '¿Cómo se protegen mis datos?', a: ['En este preview no se envía ni se almacena ninguna información.', '[VALIDAR RESPUESTA OPERATIVA: aviso de privacidad, finalidades, plazos de conservación y ejercicio de derechos ARCO]'] },
  { q: '¿Puedo revisar productos que ya contraté?', a: ['Sí. Revisar lo existente suele ser el primer paso: permite identificar duplicidades, huecos y elementos que ya no corresponden a tu situación, sin que eso implique cambiarlos.'] },
  { q: '¿Qué sucede después del diagnóstico?', a: ['Recibes una lectura conceptual de tu prioridad y, si quieres avanzar, se agenda una conversación para revisarla con la información completa.', '[VALIDAR RESPUESTA OPERATIVA: tiempos del proceso y horarios de atención]'] },
  { q: '¿Cada cuánto debe revisarse una estrategia?', a: ['Cuando cambia algo que la afecta: ingresos, responsabilidades, dependientes, salud, negocio o metas. Una revisión anual es una referencia razonable en ausencia de cambios.'] },
];

export const DISCLAIMER =
  'La información presentada es de carácter general e informativo. No constituye una recomendación financiera, fiscal o jurídica. Las condiciones, costos, coberturas, riesgos, aceptación y disponibilidad dependen de las instituciones, productos, evaluaciones y documentación aplicables.';

export const INVESTMENT_NOTE =
  'Las alternativas, riesgos, liquidez, costos y disponibilidad dependen de la solución correspondiente y deben revisarse antes de cualquier decisión.';
