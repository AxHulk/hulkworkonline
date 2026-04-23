create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  name text not null,
  contact text not null,
  message text,
  page_url text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create policy "Anyone can submit contact form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);