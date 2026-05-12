create extension if not exists "pgcrypto";

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  description text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  email text,
  service text not null,
  appointment_date date not null,
  appointment_time time not null,
  mode text not null check (mode in ('Video call', 'Phone call', 'WhatsApp')),
  notes text,
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'payment_pending', 'confirmed', 'completed', 'cancelled')),
  jitsi_room text not null,
  jitsi_url text not null,
  amount_paise integer not null default 9900,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments(id) on delete cascade,
  provider text not null default 'razorpay',
  order_id text not null,
  payment_id text,
  signature text,
  amount_paise integer not null,
  currency text not null default 'INR',
  status text not null default 'created' check (status in ('created', 'paid', 'failed', 'refunded')),
  created_at timestamptz not null default now()
);

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_name text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.chat_sessions(id) on delete set null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;
alter table public.appointments enable row level security;
alter table public.payments enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.admin_profiles enable row level security;

create policy "Admins can read appointments"
  on public.appointments for select
  to authenticated
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can update appointments"
  on public.appointments for update
  to authenticated
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can read payments"
  on public.payments for select
  to authenticated
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can read chats"
  on public.chat_messages for select
  to authenticated
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));
