-- =====================================================================
-- Reto Vikingo — esquema inicial
-- Ejecutar en el SQL Editor de Supabase (o con `supabase db push`).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. TABLAS
-- ---------------------------------------------------------------------

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nombre      text,
  whatsapp    text,
  objetivo    text check (objetivo in ('bajar_grasa', 'ganar_musculo', 'ambos')),
  created_at  timestamptz not null default now()
);

create table if not exists public.user_progress (
  user_id                    uuid primary key references public.profiles(id) on delete cascade,
  -- 1..30 = día pendiente; 31 = terminó el día 30
  current_day                int  not null default 1 check (current_day between 1 and 31),
  streak_current             int  not null default 0,
  streak_max                 int  not null default 0,
  last_completed_at          date,
  streak_freezes_used        int  not null default 0,
  streak_freeze_reset_month  date not null default date_trunc('month', current_date)::date,
  pieces_unlocked            int[] not null default '{}',
  reto_completado            boolean not null default false,
  updated_at                 timestamptz not null default now()
);

create table if not exists public.daily_completions (
  id                 bigint generated always as identity primary key,
  user_id            uuid not null references public.profiles(id) on delete cascade,
  day_number         int  not null check (day_number between 1 and 30),
  completed_at       timestamptz not null default now(),
  palabra_ingresada  text,
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

create index if not exists body_progress_logs_user_fecha_idx
  on public.body_progress_logs (user_id, logged_at);

create index if not exists daily_completions_user_idx
  on public.daily_completions (user_id);

-- ---------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------

alter table public.profiles            enable row level security;
alter table public.user_progress       enable row level security;
alter table public.daily_completions   enable row level security;
alter table public.body_progress_logs  enable row level security;

-- profiles
create policy "profiles: ver propio"       on public.profiles for select using (auth.uid() = id);
create policy "profiles: crear propio"     on public.profiles for insert with check (auth.uid() = id);
create policy "profiles: editar propio"    on public.profiles for update using (auth.uid() = id);

-- user_progress: el cliente solo LEE. Las escrituras van por las funciones RPC.
create policy "progress: ver propio"       on public.user_progress for select using (auth.uid() = user_id);
create policy "progress: crear propio"     on public.user_progress for insert with check (auth.uid() = user_id);

-- daily_completions: solo lectura desde el cliente (inserta la función completar_dia).
create policy "completions: ver propias"   on public.daily_completions for select using (auth.uid() = user_id);

-- body_progress_logs: el usuario gestiona sus propios registros.
create policy "body: ver propios"          on public.body_progress_logs for select using (auth.uid() = user_id);
create policy "body: crear propios"        on public.body_progress_logs for insert with check (auth.uid() = user_id);
create policy "body: editar propios"       on public.body_progress_logs for update using (auth.uid() = user_id);
create policy "body: borrar propios"       on public.body_progress_logs for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- 3. TRIGGER: crear profile + progress al registrarse
--    Los datos vienen de `options.data` en signInWithOtp (nombre, whatsapp, objetivo).
-- ---------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_objetivo text := new.raw_user_meta_data->>'objetivo';
begin
  insert into public.profiles (id, nombre, whatsapp, objetivo)
  values (
    new.id,
    nullif(new.raw_user_meta_data->>'nombre', ''),
    nullif(new.raw_user_meta_data->>'whatsapp', ''),
    case when v_objetivo in ('bajar_grasa', 'ganar_musculo', 'ambos') then v_objetivo else null end
  )
  on conflict (id) do nothing;

  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- 4. RPC: completar_dia
--    p_hoy lo manda el servidor de Next ya calculado en la zona horaria
--    del reto (RETO_TIMEZONE), para que "hoy" no dependa del reloj UTC.
-- ---------------------------------------------------------------------

create or replace function public.completar_dia(
  p_user_id uuid,
  p_day     int,
  p_palabra text,
  p_hoy     date default current_date
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_progress  public.user_progress%rowtype;
  v_dias_diff int;
  v_pieza     boolean := false;
begin
  -- Con sesión de usuario, solo puede tocar su propio registro.
  if auth.uid() is not null and auth.uid() <> p_user_id then
    return json_build_object('error', 'no_autorizado');
  end if;

  select * into v_progress
  from public.user_progress
  where user_id = p_user_id
  for update;

  if not found then
    return json_build_object('error', 'sin_progreso');
  end if;

  if v_progress.reto_completado or p_day < 1 or p_day > 30 then
    return json_build_object('error', 'dia_no_valido');
  end if;

  -- Solo se puede completar el día que toca, en orden.
  if p_day <> v_progress.current_day then
    return json_build_object('error', 'dia_no_valido');
  end if;

  if v_progress.last_completed_at is null then
    v_progress.streak_current := 1;
  else
    v_dias_diff := p_hoy - v_progress.last_completed_at;
    if v_dias_diff <= 0 then
      return json_build_object('error', 'ya_completado_hoy');
    elsif v_dias_diff = 1 then
      v_progress.streak_current := v_progress.streak_current + 1;
    else
      -- Más de un día sin completar: la racha vuelve a empezar.
      v_progress.streak_current := 1;
    end if;
  end if;

  v_progress.streak_max        := greatest(v_progress.streak_max, v_progress.streak_current);
  v_progress.current_day       := p_day + 1;
  v_progress.last_completed_at := p_hoy;

  if p_day in (7, 14, 21) and not (p_day = any (v_progress.pieces_unlocked)) then
    v_progress.pieces_unlocked := array_append(v_progress.pieces_unlocked, p_day);
    v_pieza := true;
  end if;

  if p_day = 30 then
    v_progress.reto_completado := true;
    if not (30 = any (v_progress.pieces_unlocked)) then
      v_progress.pieces_unlocked := array_append(v_progress.pieces_unlocked, 30);
    end if;
    v_pieza := true;
  end if;

  update public.user_progress set
    current_day       = v_progress.current_day,
    streak_current    = v_progress.streak_current,
    streak_max        = v_progress.streak_max,
    last_completed_at = v_progress.last_completed_at,
    pieces_unlocked   = v_progress.pieces_unlocked,
    reto_completado   = v_progress.reto_completado,
    updated_at        = now()
  where user_id = p_user_id;

  insert into public.daily_completions (user_id, day_number, palabra_ingresada)
  values (p_user_id, p_day, left(p_palabra, 100))
  on conflict (user_id, day_number) do nothing;

  return json_build_object(
    'success',          true,
    'nueva_racha',      v_progress.streak_current,
    'racha_max',        v_progress.streak_max,
    'pieza',            v_pieza,
    'reto_completado',  v_progress.reto_completado,
    'siguiente_dia',    v_progress.current_day
  );
end;
$$;

-- ---------------------------------------------------------------------
-- 5. RPC: recuperar_racha ("perdón de racha", 1 vez por mes)
--    Si el usuario dejó pasar >= 2 días, mueve last_completed_at a "ayer"
--    para que al completar hoy la racha continúe en vez de reiniciarse.
-- ---------------------------------------------------------------------

create or replace function public.recuperar_racha(
  p_user_id uuid,
  p_hoy     date default current_date
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_progress  public.user_progress%rowtype;
  v_dias_diff int;
  v_mes       date := date_trunc('month', p_hoy)::date;
begin
  if auth.uid() is not null and auth.uid() <> p_user_id then
    return json_build_object('error', 'no_autorizado');
  end if;

  select * into v_progress
  from public.user_progress
  where user_id = p_user_id
  for update;

  if not found then
    return json_build_object('error', 'sin_progreso');
  end if;

  -- Reset mensual del contador.
  if v_mes > v_progress.streak_freeze_reset_month then
    v_progress.streak_freezes_used       := 0;
    v_progress.streak_freeze_reset_month := v_mes;
  end if;

  if v_progress.last_completed_at is null or v_progress.streak_current = 0 then
    return json_build_object('error', 'sin_racha');
  end if;

  v_dias_diff := p_hoy - v_progress.last_completed_at;
  if v_dias_diff < 2 then
    return json_build_object('error', 'racha_intacta');
  end if;

  if v_progress.streak_freezes_used >= 1 then
    return json_build_object('error', 'sin_recuperaciones');
  end if;

  update public.user_progress set
    last_completed_at         = p_hoy - 1,
    streak_freezes_used       = v_progress.streak_freezes_used + 1,
    streak_freeze_reset_month = v_progress.streak_freeze_reset_month,
    updated_at                = now()
  where user_id = p_user_id;

  return json_build_object('success', true, 'racha', v_progress.streak_current);
end;
$$;

-- ---------------------------------------------------------------------
-- 6. PERMISOS: solo usuarios autenticados y el service role ejecutan RPCs.
-- ---------------------------------------------------------------------

revoke all on function public.completar_dia(uuid, int, text, date)  from public;
revoke all on function public.recuperar_racha(uuid, date)          from public;
grant execute on function public.completar_dia(uuid, int, text, date) to authenticated, service_role;
grant execute on function public.recuperar_racha(uuid, date)         to authenticated, service_role;
