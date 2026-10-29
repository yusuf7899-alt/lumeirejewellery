-- ========================================================
-- LUMEIRE JEWELLERY DUBAI — DATABASE SCHEMA & RLS POLICIES
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Products Table
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  category text not null check (category in ('Bangles', 'Bracelets', 'Cuffs', 'Necklaces', 'Rings', 'Earrings')),
  collection text not null default 'Iconic Atelier',
  description text not null,
  story text not null,
  price numeric(12, 2) not null default 0,
  currency text not null default 'AED',
  show_price boolean not null default true,
  model_3d text, -- Storage path or public URL to .glb file
  images text[] default '{}',
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  specifications jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Policy 1: Public Read (Anyone can view published products)
create policy "Public can view published products"
  on public.products
  for select
  using (published = true);

-- Policy 2: Owner Full Access (Only authenticated owner can insert, update, delete, view drafts)
create policy "Owner can manage all products"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);

-- 2. Storage Bucket for Jewellery Media & 3D Models
insert into storage.buckets (id, name, public)
values ('lumeire-assets', 'lumeire-assets', true)
on conflict (id) do nothing;

-- Storage Policy: Public can view assets
create policy "Public can view lumeire assets"
  on storage.objects
  for select
  using (bucket_id = 'lumeire-assets');

-- Storage Policy: Authenticated owner can upload and delete assets
create policy "Owner can upload lumeire assets"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'lumeire-assets');

create policy "Owner can update/delete lumeire assets"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'lumeire-assets');
