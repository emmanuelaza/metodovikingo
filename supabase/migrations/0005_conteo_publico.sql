-- ---------------------------------------------------------------------
-- Conteo público de actividad del día (prueba social en el temario).
--
-- RLS solo deja ver las filas propias de daily_completions, así que un
-- usuario normal no puede contar cuántas personas completaron hoy. Esta
-- función es `security definer` a propósito, pero devuelve ÚNICAMENTE un
-- entero agregado: nunca expone user_id, día ni ninguna fila individual.
-- ---------------------------------------------------------------------

create or replace function public.completados_hoy(fecha date)
returns integer
language sql
security definer
set search_path = public
stable
as $$
  select count(distinct user_id)::integer
  from public.daily_completions
  where completed_at = fecha;
$$;

revoke all on function public.completados_hoy(date) from public;
grant execute on function public.completados_hoy(date) to anon, authenticated;
