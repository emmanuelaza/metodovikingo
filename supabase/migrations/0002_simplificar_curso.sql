-- =====================================================================
-- Reto Vikingo — actualiza un proyecto que ya tenía aplicada la primera
-- versión del esquema (app gamificada: user_progress, palabra_ingresada,
-- RPCs de racha) al modelo actual de curso simple (desbloqueo por
-- calendario, sin RPCs). Ejecutar una sola vez en el SQL Editor.
-- =====================================================================

-- 1. Piezas del modelo viejo que ya no existen
drop function if exists public.completar_dia(uuid, int, text, date);
drop function if exists public.completar_dia(uuid, int, date);
drop function if exists public.recuperar_racha(uuid, date);
drop table if exists public.user_progress;

-- 2. profiles: agregar fecha_inicio (referencia del desbloqueo por calendario)
--    y quitar los campos del formulario de registro que ya no existe.
alter table public.profiles
  add column if not exists fecha_inicio date not null default current_date;

alter table public.profiles
  drop column if exists nombre,
  drop column if exists whatsapp,
  drop column if exists objetivo;

drop policy if exists "profiles: editar propio" on public.profiles;

-- 3. daily_completions: quitar palabra_ingresada; completed_at pasa a date
--    (antes timestamptz) para que la racha se calcule por día de calendario.
alter table public.daily_completions
  drop column if exists palabra_ingresada;

alter table public.daily_completions
  alter column completed_at type date using completed_at::date,
  alter column completed_at set default current_date;

-- 4. El checkbox "marcar como completado" ahora escribe directo
--    (insert/delete), protegido por RLS — antes solo podía insertar la
--    función completar_dia (security definer).
drop policy if exists "completions: crear propias"  on public.daily_completions;
drop policy if exists "completions: borrar propias" on public.daily_completions;
create policy "completions: crear propias"  on public.daily_completions for insert with check (auth.uid() = user_id);
create policy "completions: borrar propias" on public.daily_completions for delete using (auth.uid() = user_id);

-- 5. Trigger de alta simplificado (ya no recibe nombre/whatsapp/objetivo)
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
