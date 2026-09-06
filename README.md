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
2. En **SQL Editor**, pega y ejecuta `supabase/migrations/0001_init.sql` (tablas `profiles`, `daily_completions`, `body_progress_logs` + RLS + trigger de alta).
   - Si el proyecto ya tenía aplicada una versión anterior del esquema (con `user_progress`, `palabra_ingresada` o las funciones `completar_dia`/`recuperar_racha`), corre también `supabase/migrations/0002_simplificar_curso.sql` para actualizarlo al modelo actual. Las migraciones son manuales: editar los archivos `.sql` en este repo no cambia nada hasta que se pegan en el SQL Editor.
3. En **Authentication → Sign In / Providers**, activa **"Allow anonymous sign-ins"**. Es el único paso de auth necesario: no hay email, ni magic link, ni formulario de registro — la primera visita crea una sesión anónima automáticamente (ver `lib/supabase/middleware.ts`).
4. Copia `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` a `.env.local` (**no** a `.env.example` — ese archivo se sube a git y Next.js no lo lee; solo `.env.local` alimenta la app y está en `.gitignore`).

### 2. Sanity (opcional al inicio)

Ver [`sanity/README.md`](sanity/README.md). Mientras no esté configurado, la app usa `content/lecciones-seed.ts` y `content/piezas-seed.ts`.

### 3. Anuncios

- `NEXT_PUBLIC_ADS_ENABLED=true` para encender; `false` apaga todos los slots del sitio.
- `NEXT_PUBLIC_AD_PROVIDER=adsense|adsterra` cambia de red sin tocar código.

## Estructura

```
app/
  page.tsx                  Temario (índice de 30 días) — página principal, full-bleed
  reto/[dia]/               Lección del día como artículo + actions.ts (marcarCompletado)
  metodo-secreto/           Síntesis final (visible cuando el día 30 está habilitado)
  progreso/                 Registro de peso/cintura + gráfica (Recharts)
  api/og/racha/route.tsx    Imagen compartible de la racha (next/og)
  recetas/ · faq/           Contenido evergreen
  components/               AdSlot, ProgressBar, CompartirRacha, PiezaDesbloqueada, MarcarCompletado, Nav
lib/
  supabase/                 Clientes server/browser + alta de sesión anónima (proxy.ts)
  contenido.ts              Capa de contenido: Sanity → fallback content/
  progreso.ts               requireUsuario, getPerfil, diaMaximoDisponible, calcularEstadoCurso
  fecha.ts                  "Hoy" en RETO_TIMEZONE
content/                    Seeds locales (lecciones, piezas, recetas, FAQ)
supabase/migrations/        SQL del esquema
sanity/schemas/             Schemas para el Studio
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
