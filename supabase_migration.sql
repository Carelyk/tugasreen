-- =========================================================================
-- TUGASREEN Supabase Database Schema & RLS Security Migration
-- Run this in your Supabase SQL Editor
-- =========================================================================

-- 1. PROFILES TABLE
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    nama text not null,
    email text not null unique,
    role text not null default 'client' check (role in ('client', 'admin')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "Users can view own profile and admins can view all." on public.profiles
    for select using (auth.uid() = id or public.is_admin());

create policy "Users can insert their own profile." on public.profiles
    for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
    for update using (auth.uid() = id);

-- 2. ORDERS TABLE
create table if not exists public.orders (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    jenis_layanan text not null,
    mata_kuliah text not null,
    judul text not null,
    deskripsi text not null,
    deadline timestamp with time zone not null,
    tingkat_kesulitan text not null check (tingkat_kesulitan in ('Mudah', 'Sedang', 'Sulit')),
    file_urls text[] default '{}'::text[],
    harga_diajukan numeric(12,2) not null default 0,
    harga_final numeric(12,2),
    status text not null default 'Menunggu ACC' check (status in ('Menunggu ACC', 'Nego Harga', 'Diproses', 'Revisi', 'Selesai', 'Dibatalkan', 'Ditolak')),
    alasan_tolak text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;

create policy "Clients can view their own orders." on public.orders
    for select using (auth.uid() = user_id or public.is_admin());

create policy "Clients can insert their own orders." on public.orders
    for insert with check (auth.uid() = user_id);

create policy "Admins can update any order." on public.orders
    for update using (public.is_admin());

-- 3. ORDER_EVENTS TABLE (Timeline progress)
create table if not exists public.order_events (
    id uuid default gen_random_uuid() primary key,
    order_id uuid references public.orders(id) on delete cascade not null,
    status text not null,
    catatan text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.order_events enable row level security;

create policy "Order events viewable by order owner or admin." on public.order_events
    for select using (
        exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
        or public.is_admin()
    );

create policy "Admins can insert order events." on public.order_events
    for insert with check (
        public.is_admin()
    );

-- 4. AUTOMATIC PROFILE TRIGGER ON SIGNUP
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, nama, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    'client'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. STORAGE BUCKET FOR TASK FILES
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('task-files', 'task-files', false, 26214400, array['application/zip'])
on conflict (id) do nothing;

create policy "Users upload into their own task folder." on storage.objects
    for insert with check (
      bucket_id = 'task-files'
      and auth.role() = 'authenticated'
      and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "Owners and admins can view task files." on storage.objects
    for select using (
      bucket_id = 'task-files'
      and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
    );

create policy "Owners and admins can delete task files." on storage.objects
    for delete using (
      bucket_id = 'task-files'
      and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
    );
