# Reto Vikingo — notas para Claude Code

- Next.js 16 (App Router, `proxy.ts` en vez de middleware), React 19, Tailwind v4 (`@theme` en `app/globals.css`, tokens de marca: `bg/bg-2/bg-3`, `ink/ink-dim/ink-faint`, `ember/ember-2/ember-deep`, `line`). Fuentes: Anton (`font-display`) para títulos, Manrope (default) para texto. `params`/`searchParams` son Promises.
- Idioma de UI y comentarios: español. Diseño full-bleed (sin `max-w-lg` global): `app/layout.tsx` no restringe ancho, cada página arma su propio contenedor (franja de header + `max-w-3xl`/`max-w-4xl` interno).
- **Sin registro visible**: la auth es anónima (`supabase.auth.signInAnonymously()` en `lib/supabase/middleware.ts`, primera visita). No reintroducir landing, "palabra de entrada", magic link ni formularios de registro sin que el usuario lo pida explícitamente — es una decisión de producto tomada a propósito.
- **El desbloqueo de días es puro cálculo por calendario**, nunca por acción del usuario: `diaMaximoDisponible()` en `lib/progreso.ts` a partir de `profiles.fecha_inicio`. No hay `current_day` guardado ni RPC de "completar día" — no reintroducir ese patrón.
- El checkbox "marcar como completado" (`app/reto/[dia]/actions.ts`) es solo seguimiento personal: un insert/delete simple en `daily_completions` protegido por RLS, no un gate. No hace falta `security definer` para esto.
- La racha se calcula leyendo fechas de `daily_completions` (`calcularEstadoCurso` en `lib/progreso.ts`), no se guarda como contador. No hay mecánica de "recuperar racha".
- La fecha "hoy" viene de `lib/fecha.ts` (`hoyISO()`, zona `RETO_TIMEZONE`).
- Texto de lecciones/piezas: `lib/contenido.ts` (Sanity con fallback a `content/*-seed.ts`). No hardcodear lecciones en páginas.
- Anuncios: `app/components/AdSlot.tsx`; apagar con `NEXT_PUBLIC_ADS_ENABLED=false`.
- Discord y PDFs descargables son placeholders "Próximamente" a propósito (temario + final de cada lección) — no construir esa funcionalidad sin que se pida.
- `sanity/` está excluido del typecheck (importa el paquete `sanity`, que vive en el Studio aparte).
- Verificar con `npm run lint` y `npm run build`. Si `tsc`/`next build` fallan con módulos de rutas que ya no existen (p. ej. `app/dashboard`), es cache de `.next/types` — borrar `.next/` y reintentar.
