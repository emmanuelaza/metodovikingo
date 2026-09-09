# Método Vikingo — notas para Claude Code

- Landing de venta directa, **una sola página** (`app/page.tsx`). Next.js 16 (App Router), React 19, Tailwind v4 (`@theme` en `app/globals.css`, tokens de marca: `bg/bg-2/bg-3`, `ink/ink-dim/ink-faint`, `ember/ember-2/ember-deep`, `line`). Fuentes: Anton (`font-display`) para títulos, Manrope (default) para texto.
- **Sin base de datos, sin auth, sin backend propio.** Se eliminó por completo el reto de 30 días gratuito (racha, notificaciones, Supabase, cron jobs, PDFs) para quedarse solo con esta landing — decisión explícita del producto, no reintroducir esa arquitectura sin que se pida.
- **Cero anuncios en todo el sitio.** Es una página de venta: el único camino es comprar o irse, cualquier distracción le resta a una conversión que vale mucho más que cualquier impresión publicitaria.
- El único CTA es `app/components/BotonHotmart.tsx`, que trackea el clic (`clic_hotmart`, con `ubicacion`: hero/precio/cta_final) vía Vercel Analytics (`<Analytics />` en `app/layout.tsx`) — es la métrica que decide si el proyecto genera dinero, nunca quitarla sin reemplazarla.
- **Nunca inventar precio, garantía o testimonios.** `NEXT_PUBLIC_PRECIO` y `NEXT_PUBLIC_GARANTIA_DIAS` controlan si esas secciones se muestran — si están vacías, la sección se omite en vez de mostrar un número o una cita fabricada. Mismo principio para testimonios: no agregar citas de clientes inventadas, solo reales cuando existan.
- `NEXT_PUBLIC_HOTMART_URL` debe ser el link real del checkout del producto, no la home genérica de hotmart.com — si no está puesta, el CTA entero desaparece (con un `console.warn` de aviso en los logs del servidor).
- Idioma de UI y comentarios: español.
- Verificar con `npm run lint` y `npm run build`. Si `tsc`/`next build` fallan con módulos de rutas que ya no existen, es cache de `.next/types` — borrar `.next/` y reintentar.
