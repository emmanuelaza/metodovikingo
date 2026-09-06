# Reto Vikingo

Plataforma web del reto gratuito de 30 días (Método Vikingo). Next.js 16 + Supabase + Sanity + Tailwind v4.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completa las variables
npm run dev
```

### 1. Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, pega y ejecuta `supabase/migrations/0001_init.sql` (tablas, RLS, trigger y funciones `completar_dia` / `recuperar_racha`).
3. En **Authentication → Providers → Email**: activa Email y desactiva "Confirm email" no es necesario (el magic link ya verifica).
4. En **Authentication → URL Configuration**: agrega `http://localhost:3000/auth/callback` y la URL de producción a *Redirect URLs*.
5. En **Authentication → Email Templates → Magic Link**, incluye el código de 6 dígitos además del link, para que funcione aunque el usuario abra el correo en otro navegador (típico desde TikTok):

   ```html
   <h2>Tu acceso al Reto Vikingo</h2>
   <p><a href="{{ .ConfirmationURL }}">Entrar al reto</a></p>
   <p>O escribe este código: <strong>{{ .Token }}</strong></p>
   ```
6. Copia `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` a `.env.local`.

### 2. Sanity (opcional al inicio)

Ver [`sanity/README.md`](sanity/README.md). Mientras no esté configurado, la app usa `content/lecciones-seed.ts` y `content/piezas-seed.ts`.

### 3. Anuncios

- `NEXT_PUBLIC_ADS_ENABLED=true` para encender; `false` apaga todos los slots del sitio.
- `NEXT_PUBLIC_AD_PROVIDER=adsense|adsterra` cambia de red sin tocar código.

## Estructura

```
app/
  page.tsx                  Landing: palabra de entrada + captura (magic link / código)
  auth/actions.ts           Server Actions de auth · auth/callback/route.ts
  dashboard/                Racha, progreso, piezas, recuperar racha
  reto/[dia]/               Lección del día + Server Action completarDia()
  metodo-secreto/           Reveal final (solo reto_completado)
  progreso/                 Registro de peso/cintura + gráfica (Recharts)
  api/og/racha/route.tsx    Imagen compartible de la racha (next/og)
  recetas/ · faq/           Contenido evergreen
  components/               AdSlot, RachaBadge, ProgressBar, PalabraDelDiaInput, PiezaDesbloqueada, …
lib/
  supabase/                 Clientes server/browser + refresco de sesión (proxy.ts)
  contenido.ts              Capa de contenido: Sanity → fallback content/
  progreso.ts               requireUsuario, getProgreso, estadoRacha
  fecha.ts                  "Hoy" en RETO_TIMEZONE
content/                    Seeds locales (lecciones, piezas, recetas, FAQ)
supabase/migrations/        SQL del esquema
sanity/schemas/             Schemas para el Studio
```

## Reglas de negocio

- **Un día por fecha**: `completar_dia` rechaza un segundo día el mismo día (`ya_completado_hoy`). El día siguiente se abre mañana.
- **Racha**: +1 si completó ayer; se reinicia si pasaron ≥ 2 días. `recuperar_racha` (1 vez/mes) mueve `last_completed_at` a ayer para que la racha continúe.
- **Fecha del día**: la calcula el servidor de Next en `RETO_TIMEZONE` y la pasa a Postgres (`p_hoy`), no depende de UTC.
- **Palabra del día**: se valida en el servidor (`completarDia`); la palabra correcta nunca llega al cliente. Comparación sin tildes ni mayúsculas.
- **Escrituras de progreso**: solo por RPC (`security definer`), nunca desde el cliente. RLS no da `update` sobre `user_progress` ni `insert` sobre `daily_completions` al rol `authenticated`.
- **Piezas**: días 7, 14, 21 → `pieces_unlocked`; día 30 → `reto_completado = true` y acceso a `/metodo-secreto`.
