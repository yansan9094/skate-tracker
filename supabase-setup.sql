-- Skate Tracker Sync – einmalig im Supabase-Dashboard unter SQL Editor ausführen.
-- Tabelle für Pro-Datensatz-Sync (Raum "family"), RLS nur für angemeldete Familienkonten.

create table if not exists public.sync_records (
  space       text        not null,
  kind        text        not null,          -- coach | child | session
  id          text        not null,          -- Client-seitige uid()
  data        jsonb,                         -- Record-Inhalt (bei Tombstone: null)
  deleted     boolean     not null default false,
  ord         integer     not null default 0,-- Reihenfolge (z. B. Kinder-Auswahl)
  updated_at  bigint      not null,          -- Client-Zeit in ms (Last-write-wins pro Record)
  primary key (space, kind, id)
);

alter table public.sync_records enable row level security;

-- Nur authentifizierte Benutzer dieses Projekts dürfen lesen/schreiben.
-- Da das Projekt nur der Familie gehört (ein geteiltes Konto), reicht diese Regel.
drop policy if exists "family only" on public.sync_records;
create policy "family only" on public.sync_records
  for all to authenticated using (true) with check (true);

-- Realtime: Live-Änderungen auf dem Kanal skate-sync-family
drop publication if exists skate_sync_pub;
create publication skate_sync_pub for table public.sync_records;
