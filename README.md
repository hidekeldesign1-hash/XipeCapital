# Xipe Capital Group — Versión B · Daylight Liquid Architecture

> **NO fusionar este branch con `main`.**  
> `main` = Versión A (dark). `version-b` = Versión B (daylight).  
> Son variantes paralelas para comparar, no un merge.

Variante conceptual luminosa de la experiencia de arquitectura patrimonial.

- **Versión A** (`main`): dark luminous — producción del mismo proyecto Vercel  
- **Versión B** (`version-b`): esta — preview / dominio asignado al branch

---

## Ejecución local

Requiere Node.js 18.18 o superior.

```bash
git checkout version-b
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

Volver a A:

```bash
git checkout main
```

---

## Despliegue en Vercel (mismo proyecto, dos branches)

Usa **un solo** proyecto Vercel conectado al repo `XipeCapital`.

1. **Production Branch = `main`**  
   Settings → Git → Production Branch → `main`  
   Así la URL de producción (ej. `xipe-capital.vercel.app`) siempre es la versión A.

2. **Push de `version-b`**  
   Vercel genera un **Preview Deployment** automático para este branch.

3. **URL estable para B (recomendado)**  
   Settings → Domains → Add → `xipe-capital-b.vercel.app` (o el subdominio que quieras)  
   → Assign to **Git Branch** → `version-b`  
   Cada push a `version-b` actualiza esa URL; `main` no se toca.

4. **No abras un PR de `version-b` → `main`** para “publicar” B.  
   Publicar B = asignar dominio al branch, no mergear.

Sin variables de entorno obligatorias. Cuando conectes el CRM, guarda la clave
en Environment Variables y úsala **solo desde el servidor** (`app/api/`).

---

## Estructura

```
app/            layout · page · globals.css · icon
components/
  Header, HeroDaylight, LivingArchitecture, ArchitectureLayers,
  ServiceConstellation, Method, Diagnosis, AuthorityProcess,
  FAQ, FinalCTA, Footer, StickyBar
components/greca/
  GrecaPath, GrecaDivider, GrecaProgress, GrecaBackground, GrecaConnector
components/ui/
  LiquidPanel, LiquidButton, KineticText, SectionReveal, Modal
lib/
  tracking.ts   VARIANT="B", 27 eventos, marca de primera interacción
  diagnosis.ts  5 pasos, resultado ≤55 palabras, payload de CRM
  motion.ts     curvas y duraciones compartidas
  constants.ts  todo el copy
```

## Medición A vs B

`lib/tracking.ts` marca cada evento con `variant: "B"`. En consola verás:

```
[Xipe Tracking] { variant: 'B', event: 'diagnosis_started', source: 'hero' }
```

`markFirstInteraction()` registra el tiempo hasta la primera interacción real
para poder compararlo contra A. Conversión principal `diagnosis_completed`,
secundaria `service_selected`, terciaria `advisor_review_requested`.

## Vercel Analytics

Preparado, no conectado. Instrucciones en el comentario de `app/layout.tsx`.

## Nota de contraste

El dorado de marca `#BE9A58` da 2.5:1 sobre el fondo día: **no se usa en
texto**. Para eso existe `--xipe-gold-ink: #8A6D30` (4.6:1, AA). El dorado
de marca queda para trazos, nodos, rellenos y el fondo del CTA principal
(texto tinta sobre dorado: 7.4:1).
