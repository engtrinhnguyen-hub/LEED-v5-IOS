-- Run once in Supabase SQL Editor
create table if not exists public.cloud_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_key text not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, storage_key)
);
alter table public.cloud_state enable row level security;
drop policy if exists "read own cloud state" on public.cloud_state;
drop policy if exists "insert own cloud state" on public.cloud_state;
drop policy if exists "update own cloud state" on public.cloud_state;
drop policy if exists "delete own cloud state" on public.cloud_state;
create policy "read own cloud state" on public.cloud_state for select using (auth.uid() = user_id);
create policy "insert own cloud state" on public.cloud_state for insert with check (auth.uid() = user_id);
create policy "update own cloud state" on public.cloud_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own cloud state" on public.cloud_state for delete using (auth.uid() = user_id);
