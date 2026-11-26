-- tuGasREEN v2 upgrade for an existing Supabase project.
-- Run once in Supabase SQL Editor before testing the new upload flow.

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

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Users can view own profile and admins can view all." on public.profiles;
create policy "Users can view own profile and admins can view all." on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "Clients can view their own orders." on public.orders;
create policy "Clients can view their own orders." on public.orders
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Clients can update their own orders (e.g. accept nego)." on public.orders;
drop policy if exists "Admins can update any order." on public.orders;
create policy "Admins can update any order." on public.orders
  for update using (public.is_admin());

drop policy if exists "Order events viewable by order owner or admin." on public.order_events;
create policy "Order events viewable by order owner or admin." on public.order_events
  for select using (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
    or public.is_admin()
  );

drop policy if exists "Admins can insert order events." on public.order_events;
create policy "Admins can insert order events." on public.order_events
  for insert with check (public.is_admin());

update storage.buckets
set public = false,
    file_size_limit = 26214400,
    allowed_mime_types = array['application/zip']
where id = 'task-files';

drop policy if exists "Authenticated users can upload task files." on storage.objects;
drop policy if exists "Anyone can view task files." on storage.objects;
drop policy if exists "Users upload into their own task folder." on storage.objects;
drop policy if exists "Owners and admins can view task files." on storage.objects;
drop policy if exists "Owners and admins can delete task files." on storage.objects;

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

-- Set your real admin account after it has signed up:
-- update public.profiles set role = 'admin' where email = 'admin@example.com';
