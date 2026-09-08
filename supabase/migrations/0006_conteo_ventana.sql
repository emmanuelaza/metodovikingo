-- ---------------------------------------------------------------------
-- Acota `completados_hoy` a la ventana del día actual.
--
-- La función es pública a propósito (la prueba social del temario la ve
-- cualquier visitante), pero aceptar una fecha arbitraria dejaba enumerar
-- la actividad diaria de todo el histórico vía /rest/v1/rpc. No expone
-- datos personales, pero es una métrica de negocio que no hace falta
-- publicar. Fuera de la ventana devuelve null, y la UI ya trata null como
-- "no mostrar nada".
--
-- El parámetro sigue existiendo porque "hoy" se calcula en RETO_TIMEZONE
-- (America/Bogota), que no coincide con `current_date` del servidor; el
-- rango cubre ese desfase horario sin abrir el histórico.
-- ---------------------------------------------------------------------

create or replace function public.completados_hoy(fecha date)
returns integer
language sql
security definer
set search_path = public
stable
as $$
  select case
    when fecha between current_date - 2 and current_date + 1 then (
      select count(distinct user_id)::integer
      from public.daily_completions
      where completed_at = fecha
    )
  end;
$$;
