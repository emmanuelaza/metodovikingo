-- =====================================================================
-- Reto Vikingo — esquema (plataforma de curso simple)
-- Ejecutar en el SQL Editor de Supabase (o con `supabase db push`).
--
-- Modelo: el desbloqueo de días es puro cálculo por calendario a partir de
-- `profiles.fecha_inicio` (ver lib/progreso.ts) — no hay estado mutable que
-- proteger con RPCs. Marcar un día como completado es solo un hecho
-- (fila en `daily_completions`); la racha se calcula leyendo esas fechas.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. TABLAS
-- ---------------------------------------------------------------------

create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  -- Referencia para el desbloqueo automático: día N se habilita cuando
  -- current_date >= fecha_inicio + (N-1).
  fecha_inicio  date not null default current_date,
  created_at    timestamptz not null default now()
);

create table if not exists public.daily_completions (
  id            bigint generated always as identity primary key,
  user_id       uuid not null references public.profiles(id) on delete cascade,
  day_number    int  not null check (day_number between 1 and 30),
  completed_at  date not null default current_date,
  unique (user_id, day_number)
);

create table if not exists public.body_progress_logs (
  id                  bigint generated always as identity primary key,
  user_id             uuid not null references public.profiles(id) on delete cascade,
  logged_at           date not null default current_date,
  peso_kg             numeric(5,2) check (peso_kg is null or peso_kg between 20 and 400),
  medida_cintura_cm   numeric(5,2) check (medida_cintura_cm is null or medida_cintura_cm between 30 and 300),
  nota                text,
  created_at          timestamptz not null default now()
);

create index if not exists daily_completions_user_idx
  on public.daily_completions (user_id);

create index if not exists body_progress_logs_user_fecha_idx
  on public.body_progress_logs (user_id, logged_at);

-- ---------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------

alter table public.profiles            enable row level security;
alter table public.daily_completions   enable row level security;
alter table public.body_progress_logs  enable row level security;

create policy "profiles: ver propio" on public.profiles for select using (auth.uid() = id);

-- El checkbox de "marcar como completado" escribe directo (insert/delete),
-- protegido por RLS. No hace falta una función security definer: es un
-- hecho idempotente, no un estado derivado que requiera atomicidad extra.
create policy "completions: ver propias"   on public.daily_completions for select using (auth.uid() = user_id);
create policy "completions: crear propias" on public.daily_completions for insert with check (auth.uid() = user_id);
create policy "completions: borrar propias" on public.daily_completions for delete using (auth.uid() = user_id);

create policy "body: ver propios"    on public.body_progress_logs for select using (auth.uid() = user_id);
create policy "body: crear propios"  on public.body_progress_logs for insert with check (auth.uid() = user_id);
create policy "body: editar propios" on public.body_progress_logs for update using (auth.uid() = user_id);
create policy "body: borrar propios" on public.body_progress_logs for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- 3. TRIGGER: crear profile al registrarse (incluye usuarios anónimos)
-- ---------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
