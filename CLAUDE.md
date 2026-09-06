# Reto Vikingo — notas para Claude Code

- Next.js 16 (App Router, `proxy.ts` en vez de middleware), React 19, Tailwind v4 (`@theme` en `app/globals.css`, tokens `vk-*`). `params`/`searchParams` son Promises.
- Idioma de UI y comentarios: español. Mobile-first (`max-w-lg`).
- Progreso del usuario: NUNCA escribir `user_progress` / `daily_completions` desde el cliente ni con el cliente anon directamente. Siempre Server Action → `supabase.rpc('completar_dia' | 'recuperar_racha')`. El SQL vive en `supabase/migrations/`.
- La fecha "hoy" viene de `lib/fecha.ts` (`hoyISO()`, zona `RETO_TIMEZONE`) y se pasa a las RPC como `p_hoy`.
- Texto de lecciones/piezas: `lib/contenido.ts` (Sanity con fallback a `content/*-seed.ts`). No hardcodear lecciones en páginas.
- La palabra del día se valida solo en el servidor (`app/reto/[dia]/actions.ts`). No enviar `palabraDelDia` al cliente.
- Anuncios: `app/components/AdSlot.tsx`; apagar con `NEXT_PUBLIC_ADS_ENABLED=false`. No poner slots dentro del flujo del input de palabra.
- `sanity/` está excluido del typecheck (importa el paquete `sanity`, que vive en el Studio aparte).
- Verificar con `npm run lint` y `npm run build`.
