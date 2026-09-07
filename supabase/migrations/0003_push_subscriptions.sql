-- =====================================================================
-- Reto Vikingo — suscripciones de notificaciones push (Web Push nativo).
-- =====================================================================

create table if not exists public.push_subscriptions (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references public.profiles(id) on delete cascade,
  endpoint     text not null unique,
  p256dh       text not null,
  auth         text not null,
  created_at   timestamptz not null default now()
);

create index if not exists push_subscriptions_user_idx on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;

create policy "push: ver propias"   on public.push_subscriptions for select using (auth.uid() = user_id);
create policy "push: crear propias" on public.push_subscriptions for insert with check (auth.uid() = user_id);
create policy "push: borrar propias" on public.push_subscriptions for delete using (auth.uid() = user_id);

-- El cron de notificaciones (app/api/cron/notificar) lee todas las suscripciones
-- con la service_role key, que ignora RLS — no necesita una policy adicional.
