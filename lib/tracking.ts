/**
 * Analítica de la VARIANTE B.
 *
 * Todos los eventos llevan variant:"B" para poder compararlos contra la
 * versión A sin tocar el resto del esquema. En preview solo va a consola.
 *
 * Conexiones futuras (ninguna activa):
 *   GTM      -> window.dataLayer.push({ event, variant:VARIANT, ...data })
 *   GA4      -> window.gtag('event', event, { variant:VARIANT, ...data })
 *   Meta     -> window.fbq('trackCustom', event, { variant:VARIANT, ...data })
 *   CAPI     -> servidor a servidor con el mismo event_id
 *   Ads      -> window.gtag('event','conversion',{ send_to:'AW-XXX/YYY' })
 *   TikTok   -> window.ttq.track(event, data)
 *   Clarity  -> window.clarity('set','variant',VARIANT)
 *   GoHighLevel -> webhook del diagnóstico + tag de variante
 *   Vercel Analytics -> <Analytics /> en app/layout.tsx (ver comentario ahí)
 */

export const VARIANT = 'B' as const;

export const EVENTS = [
  'variant_viewed',
  'hero_viewed',
  'hero_primary_cta_click',
  'architecture_explore_click',
  'living_architecture_interaction',
  'architecture_layer_selected',
  'greca_interaction',
  'service_section_viewed',
  'service_selected',
  'protection_selected',
  'savings_selected',
  'investment_selected',
  'medical_selected',
  'auto_selected',
  'retirement_selected',
  'method_step_viewed',
  'diagnosis_started',
  'diagnosis_step_completed',
  'diagnosis_back_clicked',
  'diagnosis_abandoned',
  'diagnosis_completed',
  'diagnosis_result_viewed',
  'advisor_review_requested',
  'authority_viewed',
  'faq_opened',
  'final_cta_click',
  'mobile_sticky_cta_click',
] as const;

export type XipeEvent = (typeof EVENTS)[number];
export type TrackPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: XipeEvent | string, eventData: TrackPayload = {}) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line no-console
  console.log('[Xipe Tracking]', { variant: VARIANT, event: eventName, ...eventData });
}

const fired = new Set<string>();
export function trackOnce(eventName: XipeEvent | string, eventData: TrackPayload = {}) {
  const key = eventName + JSON.stringify(eventData);
  if (fired.has(key)) return;
  fired.add(key);
  trackEvent(eventName, eventData);
}

/**
 * Marca temporal de la primera interacción, para comparar "time to first
 * interaction" entre A y B. Se calcula en cliente y no se persiste.
 */
let firstInteractionAt: number | null = null;
export function markFirstInteraction(where: string) {
  if (firstInteractionAt !== null) return;
  firstInteractionAt = Date.now();
  trackEvent('greca_interaction', { where, ms_since_load: Math.round(performance.now()) });
}
