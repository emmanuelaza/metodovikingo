# Método Vikingo

Landing de venta de una sola página para "El Método Vikingo completo" (12 semanas de plan de alimentación y rutinas de fuerza), con checkout externo en Hotmart.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completa las variables reales
npm run dev
```

## Variables de entorno

Ver `.env.example`. Las importantes:

- `NEXT_PUBLIC_HOTMART_URL` — link real del checkout del producto (no la home de hotmart.com). Sin esto, el CTA de compra no se muestra.
- `NEXT_PUBLIC_PRECIO` / `NEXT_PUBLIC_GARANTIA_DIAS` — opcionales. Si están vacías, esas secciones simplemente no aparecen (nunca se muestra un precio o garantía inventados).

## Estructura

```
app/
  page.tsx                  La landing completa: hero, problema, pilares del método,
                             qué incluye, precio/garantía, FAQ, CTA final
  privacidad/                Política de privacidad
  api/og/route.tsx           Imagen Open Graph genérica (next/og)
  components/BotonHotmart.tsx  Único CTA de compra, trackea el clic (clic_hotmart) por sección
  layout.tsx                 Fuentes, metadata, footer, Vercel Analytics — sin ads, sin nav
  globals.css                Tokens de marca (Tailwind v4 @theme)
```

## Medir conversión

Vercel Analytics (activar en el panel del proyecto → Analytics → Enable) registra:

- Visitas normales
- Evento `clic_hotmart` con `ubicacion` (hero / precio / cta_final) — la métrica que dice si la landing convierte
