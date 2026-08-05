# Xipe Capital Group — Arquitectura Patrimonial

Experiencia digital en Next.js (App Router), TypeScript y React. Dirección visual
*dark luminous*: base oscura con secciones marfil, oro champaña y un color señal
técnico usado con moderación.

---

## Ejecución local

Requiere Node.js 18.18 o superior.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # sirve el build
```

## Despliegue en Vercel

**Opción A — desde GitHub (recomendada)**

1. Sube el proyecto a un repositorio.
2. En Vercel: **Add New → Project → Import Git Repository**.
3. Framework: *Next.js* (se detecta solo). Build: `npm run build`. Output: `.next`.
4. **Deploy**.

**Opción B — desde tu Mac**

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # producción
```

No hay variables de entorno obligatorias. Cuando conectes el CRM, agrega la clave
en **Settings → Environment Variables** y consúmela **solo desde el servidor**
(una route handler en `app/api/`), nunca desde un componente cliente.

---

## Estructura

```
app/
  layout.tsx        Fuentes, metadata, skip link, providers
  page.tsx          Orden de secciones
  globals.css       Tokens, tipografía, greca, fondos, reduced-motion
  icon.png          Favicon
components/         UI reutilizable
  MotionProvider    Lenis + GSAP ScrollTrigger
  Header / Footer / StickyCTA
  Diagnosis         Panel de diagnóstico (5 pasos + resultado)
  PatrimonialCore   Núcleo patrimonial (SVG + motion)
  SectionLabel
sections/           Secciones de página (una responsabilidad cada una)
  Hero, ProblemStatement, ArchitectureLayers, Pillars,
  Method, Routes, Authority, ProcessProof, Education, FAQ, FinalCTA
lib/
  animations/       Easings, variants Framer, GSAP helpers, CanvasSequence
  tracking.ts       trackEvent() central, 24 eventos, solo consola
  constants.ts      Todo el copy, en un solo archivo auditable
  diagnosis.ts      Pasos, resultado conceptual y payload de CRM
```

## Analítica

`lib/tracking.ts` centraliza los 24 eventos. En preview solo escriben a consola.
Los puntos de conexión (GTM, GA4, Meta, Ads, TikTok, Clarity, GoHighLevel,
Conversion API y conversiones offline) están documentados en el mismo archivo.

## CRM

`buildCrmPayload()` en `lib/diagnosis.ts` arma el objeto con los 15 campos
acordados. **No se envía nada**: se imprime en consola. Las tres vías de conexión
con GoHighLevel están comentadas ahí mismo.

## Reglas de contenido

No hay aseguradoras, cédulas, testimonios, cifras, rendimientos ni avales
inventados. Todo lo que falta aparece como placeholder visible en pantalla, con
el formato `[TEXTO PENDIENTE]`, para que no pueda publicarse por descuido.

## Accesibilidad

Un solo H1, jerarquía correcta, skip link, foco visible, foco atrapado y Escape
en los paneles, `aria-expanded` / `aria-controls` / `aria-live`, áreas táctiles de
44 px y respeto a `prefers-reduced-motion` (Lenis y GSAP no se inicializan).

## Variante B (paralela)

El branch `version-b` (Daylight Liquid Architecture) vive en el **mismo** repo.
**No se fusiona con `main`.** Ver `BRANCHES.md`. En Vercel: Production = `main`;
asigna un dominio al Git Branch `version-b` para la URL estable de B.
