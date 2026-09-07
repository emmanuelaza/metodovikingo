# Reto Vikingo

Curso web gratuito de 30 días (Método Vikingo), estilo plataforma de curso simple (tipo Udemy/Platzi básico) — sin mecánicas de juego. Next.js 16 + Supabase (auth anónima) + Sanity + Tailwind v4.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completa las variables
npm run dev
```

### 1. Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, corre en orden los archivos de `supabase/migrations/` (`0001_init.sql`, luego `0002_simplificar_curso.sql` si el proyecto tenía el esquema viejo, `0003_push_subscriptions.sql`, `0004_hardening.sql`). Las migraciones son manuales: editar los `.sql` de este repo no cambia nada hasta que se pegan en el SQL Editor (o se aplican vía el MCP de Supabase, si está conectado).
3. En **Authentication → Sign In / Providers**, activa **"Allow anonymous sign-ins"**. Es el único paso de auth necesario: no hay email, ni magic link, ni formulario de registro — la primera visita crea una sesión anónima automáticamente (ver `lib/supabase/middleware.ts`).
4. Copia `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` a `.env.local` (**no** a `.env.example` — ese archivo se sube a git y Next.js no lo lee; solo `.env.local` alimenta la app y está en `.gitignore`). `SUPABASE_SERVICE_ROLE_KEY` solo hace falta para el cron de notificaciones push.

### 2. Sanity (opcional al inicio)

Ver [`sanity/README.md`](sanity/README.md). Mientras no esté configurado, la app usa `content/lecciones-seed.ts`, `content/piezas-seed.ts` y `content/fases-seed.ts`.

### 3. Anuncios (Adsterra)

- `NEXT_PUBLIC_ADS_ENABLED=true` para encender; `false` apaga los 4 slots del sitio de una vez.
- Los 4 slots (código real, no configurables por env) están en `lib/adsConfig.ts`: banner nativo dentro de cada lección, 300x250 en el temario, y los banners de footer 320x50 (móvil) / 728x90 (escritorio), mutuamente excluyentes por breakpoint.

### 4. Notificaciones push

1. Genera un par de claves: `npx web-push generate-vapid-keys` y ponlas en `.env.local` (`NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT=mailto:...`).
2. En producción (Vercel), define además `CRON_SECRET` (cualquier string) — protege `/api/cron/notificar`, que `vercel.json` programa para correr una vez al día.
3. El usuario decide activarlas desde el banner discreto que aparece una sola vez, tras completar el día 1 (`NotificacionesPrompt.tsx`) — nunca de entrada.

## Estructura

```
app/
  page.tsx                  Temario agrupado en 5 fases — página principal, full-bleed
  reto/[dia]/               Lección (intro, concepto, rutina/plan, tip, preview) + actions.ts
  metodo-secreto/           Síntesis final (visible cuando el día 30 está habilitado)
  progreso/                 Registro de peso/cintura + gráfica (Recharts)
  privacidad/               Política de privacidad (cookies + anuncios de terceros)
  api/og/racha/route.tsx    Imagen compartible de la racha (next/og)
  api/ads/frame/route.ts    Aísla los banners iframe de Adsterra (document.write) en su propio HTML
  api/cron/notificar/       Envío diario de push (protegido con CRON_SECRET)
  recetas/ · faq/           Contenido evergreen
  components/               AdSlot, ProgressBar, CompartirRacha, PiezaDesbloqueada, MarcarCompletado,
                             TestimonioProximamente, NotificacionesPrompt, Nav
  template.tsx              Transición fade/slide entre navegaciones
  */loading.tsx             Skeletons por ruta
lib/
  supabase/                 Clientes server/browser (+ admin.ts, solo para el cron) y sesión anónima (proxy.ts)
  contenido.ts              Capa de contenido: Sanity → fallback content/ (lecciones, piezas/runas, fases)
  progreso.ts               requireUsuario, getPerfil, diaMaximoDisponible, calcularEstadoCurso
  fecha.ts                  "Hoy" en RETO_TIMEZONE
  adsConfig.ts              Los 4 slots reales de Adsterra
  push/                     client.ts (suscripción), actions.ts (guardar), server.ts (VAPID/web-push)
content/                    Seeds locales (lecciones, piezas/runas, fases, recetas, FAQ)
supabase/migrations/        SQL del esquema (0001-0004, ya aplicadas al proyecto real)
sanity/schemas/             Schemas para el Studio (leccionDiaria, piezaMetodo, fase)
public/sw.js                Service worker (solo push, no cache offline)
```

## Cómo funciona el desbloqueo (sin mecánicas de juego)

- **Cero fricción de entrada**: no hay landing, ni palabra de entrada, ni registro. El middleware crea una sesión anónima de Supabase en la primera visita (`auth.signInAnonymously()`) y el usuario cae directo en el temario.
- **Desbloqueo por calendario, no por acción del usuario**: cada `profiles.fecha_inicio` (fijada al crear el perfil) determina qué día máximo está disponible: `día_máximo = min(30, hoy - fecha_inicio + 1)`. No hace falta "activar" ni completar nada para que se abra el siguiente día — simplemente pasa el tiempo. Ver `diaMaximoDisponible()` en `lib/progreso.ts`.
- **El checkbox de "marcar como completado" es solo seguimiento personal**: inserta/borra una fila en `daily_completions`. No bloquea ni desbloquea nada — es un dato para la barra de progreso y la racha, no un gate. Por eso no hace falta una función `security definer`: es un hecho idempotente protegido por RLS, no un estado derivado con invariantes que proteger.
- **Racha**: se calcula leyendo las fechas distintas de `daily_completions` (días de calendario consecutivos con al menos una lección marcada, como Duolingo/GitHub) — no hay contador guardado ni mecánica de "recuperar racha". Ver `calcularEstadoCurso()`.
- **"Continuar donde quedaste"**: el temario (`/`) calcula el primer día habilitado sin marcar y lo ofrece como botón principal, sin que el usuario tenga que buscarlo en la lista.
- **Piezas del Método**: contenido real embebido dentro de las lecciones de los días 7, 14 y 21 (no una animación de "desbloqueo"). El día 30 se habilita `/metodo-secreto` con la síntesis completa.
- **Diseño de página completa**: `app/layout.tsx` no restringe el ancho; cada página arma su propio full-bleed (franja de header + contenedor interno de lectura), en vez de una tarjeta centrada angosta.
- **Pendiente**: comunidad de Discord y guías descargables en PDF están marcadas como "Próximamente" en el temario y al final de cada lección — placeholders intencionales, sin funcionalidad detrás todavía.

## Limitación conocida del login anónimo

Al no haber cuenta, el progreso vive en las cookies de ese navegador/dispositivo. Cambiar de navegador, usar modo incógnito o borrar datos del sitio reinicia el progreso. Si más adelante se quiere permitir "guardar mi progreso" con un correo opcional, se puede vincular la identidad anónima a un email con `supabase.auth.updateUser()` sin perder el historial.
