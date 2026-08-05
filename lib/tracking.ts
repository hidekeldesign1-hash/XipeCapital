/**
 * Analítica central de Xipe Capital Group.
 *
 * En preview SOLO escribe a consola. No envía datos, no persiste nada
 * y no toca información personal.
 *
 * Conexiones futuras (ninguna activa aquí):
 *   Google Tag Manager  -> window.dataLayer.push({ event: name, ...data })
 *   GA4                 -> window.gtag('event', name, data)
 *   Meta Pixel          -> window.fbq('trackCustom', name, data)
 *   Meta Conversion API -> envío servidor a servidor con el mismo event_id
 *   Google Ads          -> window.gtag('event','conversion',{ send_to: 'AW-XXX/YYY' })
 *   TikTok Pixel        -> window.ttq.track(name, data)
 *   Microsoft Clarity   -> window.clarity('event', name)
 *   GoHighLevel         -> webhook del diagnóstico + tag por ruta seleccionada
 *   Conversiones offline-> subir la póliza emitida asociando el click_id
 */

export type TrackPayload = Record<string, string | number | boolean | undefined>;

export const EVENTS = [
  'hero_viewed',
  'hero_primary_cta_click',
  'method_link_click',
  'patrimonial_core_interaction',
  'architecture_layer_viewed',
  'route_selected',
  'diagnosis_started',
  'diagnosis_step_completed',
  'diagnosis_back_clicked',
  'diagnosis_completed',
  'result_viewed',
  'advisor_review_requested',
  'protection_cta_click',
  'savings_cta_click',
  'investment_cta_click',
  'health_cta_click',
  'auto_cta_click',
  'retirement_cta_click',
  'process_viewed',
  'team_viewed',
  'article_clicked',
  'faq_opened',
  'final_cta_click',
  'mobile_sticky_cta_click',
] as const;

export type XipeEvent = (typeof EVENTS)[number];

export function trackEvent(eventName: XipeEvent | string, eventData: TrackPayload = {}) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line no-console
  console.log('[Xipe]', eventName, eventData);
}

/** Dispara un evento una sola vez por sesión de página. */
const fired = new Set<string>();
export function trackOnce(eventName: XipeEvent | string, eventData: TrackPayload = {}) {
  const key = eventName + JSON.stringify(eventData);
  if (fired.has(key)) return;
  fired.add(key);
  trackEvent(eventName, eventData);
}
