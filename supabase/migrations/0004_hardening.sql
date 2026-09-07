-- =====================================================================
-- Reto Vikingo — hardening (aplicado directo al proyecto vía MCP de Supabase;
-- este archivo documenta el cambio para que el repo quede sincronizado).
-- =====================================================================

-- 1. handle_new_user es un trigger, no una función pública: cerrar la exposición vía RPC.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- 2. Recrear políticas usando (select auth.uid()) para que el planner lo evalúe
--    una sola vez por consulta, no una vez por fila (recomendación de Supabase:
--    https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select).
drop policy "profiles: ver propio" on public.profiles;
create policy "profiles: ver propio" on public.profiles for select using ((select auth.uid()) = id);

drop policy "profiles: crear propio" on public.profiles;
create policy "profiles: crear propio" on public.profiles for insert with check ((select auth.uid()) = id);

drop policy "completions: ver propias" on public.daily_completions;
create policy "completions: ver propias" on public.daily_completions for select using ((select auth.uid()) = user_id);

drop policy "completions: crear propias" on public.daily_completions;
create policy "completions: crear propias" on public.daily_completions for insert with check ((select auth.uid()) = user_id);

drop policy "completions: borrar propias" on public.daily_completions;
create policy "completions: borrar propias" on public.daily_completions for delete using ((select auth.uid()) = user_id);

drop policy "body: ver propios" on public.body_progress_logs;
create policy "body: ver propios" on public.body_progress_logs for select using ((select auth.uid()) = user_id);

drop policy "body: crear propios" on public.body_progress_logs;
create policy "body: crear propios" on public.body_progress_logs for insert with check ((select auth.uid()) = user_id);

drop policy "body: editar propios" on public.body_progress_logs;
create policy "body: editar propios" on public.body_progress_logs for update using ((select auth.uid()) = user_id);

drop policy "body: borrar propios" on public.body_progress_logs;
create policy "body: borrar propios" on public.body_progress_logs for delete using ((select auth.uid()) = user_id);

drop policy "push: ver propias" on public.push_subscriptions;
create policy "push: ver propias" on public.push_subscriptions for select using ((select auth.uid()) = user_id);

drop policy "push: crear propias" on public.push_subscriptions;
create policy "push: crear propias" on public.push_subscriptions for insert with check ((select auth.uid()) = user_id);

drop policy "push: borrar propias" on public.push_subscriptions;
create policy "push: borrar propias" on public.push_subscriptions for delete using ((select auth.uid()) = user_id);
