-- Gems and Metal: Supabase schema.
-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS / OR REPLACE).

-- ============================================================
-- 1. PRODUCTS
-- ============================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  price numeric(12, 2) not null check (price >= 0),
  category text not null default '',
  material text not null default '',
  is_custom boolean not null default false,
  availability text not null default 'in_stock'
    check (availability in ('in_stock', 'made_to_order')),
  stock integer,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Anyone (including the public storefront, using the anon key) can read products.
drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
  on public.products for select
  to anon, authenticated
  using (true);

-- Only the server (service role key, used exclusively in admin server actions)
-- can insert/update/delete. The anon key has no write policy, so it is denied
-- by default — this is what keeps the public storefront read-only.

-- ============================================================
-- 2. ORDERS
-- ============================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity,
  customer_name text not null,
  customer_phone text not null,
  shipping_address text not null,
  items jsonb not null, -- [{ product_id, name, price, qty, is_custom }]
  total_price numeric(12, 2) not null check (total_price >= 0),
  amount_paid_now numeric(12, 2) not null check (amount_paid_now >= 0),
  remaining_balance numeric(12, 2) not null default 0 check (remaining_balance >= 0),
  payment_method text not null check (payment_method in ('COD', 'Bank/Wallet')),
  screenshot_url text,
  status text not null default 'awaiting_verification'
    check (status in ('awaiting_verification', 'confirmed', 'shipped', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- The checkout page (anon key, client-side) is allowed to create an order,
-- but never to read, list, or modify orders — that would leak every
-- customer's name/phone/address to anyone with the public anon key.
drop policy if exists "Public can create orders" on public.orders;
create policy "Public can create orders"
  on public.orders for insert
  to anon, authenticated
  with check (status = 'awaiting_verification');

-- No select/update/delete policy for anon/authenticated: only the service
-- role key (server-only, used in admin server actions) can read or update
-- orders. Service role bypasses RLS entirely, so no policy is needed for it.

-- ============================================================
-- 3. STORAGE BUCKETS
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('payment-screenshots', 'payment-screenshots', false)
on conflict (id) do nothing;

-- product-images: public read (storefront displays them directly), writes
-- only via the service role key (admin product form).
drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

-- payment-screenshots: the checkout page uploads directly from the browser
-- (anon key), but nobody with just the anon key can read them back — only
-- the service role key (admin order-review page) can, via a signed URL.
drop policy if exists "Public can upload payment screenshots" on storage.objects;
create policy "Public can upload payment screenshots"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'payment-screenshots');
