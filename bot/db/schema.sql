-- Bot referral eToro — schema Postgres (Supabase)
--
-- Principi:
--  · `leads` tiene lo stato corrente, `events` tiene la storia completa.
--    In caso di contestazione sul rimborso, `events` è la ricostruzione.
--  · Dei documenti non conserviamo nulla: degli screenshot salviamo solo
--    il file_id di Telegram, i file restano sui server di Telegram.
--  · I dati di pagamento stanno in una tabella separata con cancellazione
--    programmata: non c'è motivo di tenerli dopo il bonifico.

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────── leads

create table if not exists leads (
  id                bigserial primary key,
  tg_user_id        bigint      not null unique,
  tg_username       text,
  nome              text,
  source            text,                        -- da /start <payload>: story_ig_02, tiktok_bio…
  stato             text        not null default 'S0_START',
  stato_da          timestamptz not null default now(),

  -- consenso: serve poter dimostrare cosa ha accettato e quando
  consenso_at       timestamptz,
  consenso_versione text,

  -- pre-qualifica (risposte, per capire dove si perdono i lead)
  prequal           jsonb       not null default '{}'::jsonb,

  -- dati eToro dichiarati dal lead, da incrociare in dashboard
  etoro_username    text,
  etoro_email       text,
  etoro_reg_data    date,
  scadenza_deposito date,                        -- reg + 90gg

  deposito_importo  numeric(10,2),
  trade_importo     numeric(10,2),

  -- gate manuali
  verificato_at     timestamptz,
  verificato_da     bigint,
  bonus_at          timestamptz,
  bonus_da          bigint,
  ko_motivo         text,

  -- ponte admin
  topic_id          integer,                     -- message_thread_id nel gruppo admin
  auto              boolean     not null default true,   -- false = handoff umano in corso
  bloccato          boolean     not null default false,  -- il lead ha bloccato il bot

  note              text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists leads_stato_idx     on leads (stato);
create index if not exists leads_topic_idx     on leads (topic_id);
create index if not exists leads_source_idx    on leads (source);
create unique index if not exists leads_etoro_username_uq
  on leads (lower(etoro_username)) where etoro_username is not null;

-- ─────────────────────────────────────────────────────────────── events

create table if not exists events (
  id         bigserial primary key,
  lead_id    bigint      not null references leads(id) on delete cascade,
  tipo       text        not null,   -- transizione | messaggio | admin | sollecito | errore
  da_stato   text,
  a_stato    text,
  attore     text        not null default 'bot',  -- bot | lead | admin:<tg_id>
  payload    jsonb       not null default '{}'::jsonb,
  at         timestamptz not null default now()
);

create index if not exists events_lead_idx on events (lead_id, at desc);

-- ─────────────────────────────────────────────────────────────── media

-- Solo riferimenti Telegram: nessun file scaricato o conservato da noi.
create table if not exists media (
  id         bigserial primary key,
  lead_id    bigint      not null references leads(id) on delete cascade,
  tipo       text        not null,   -- deposito | trade | altro
  tg_file_id text        not null,
  at         timestamptz not null default now()
);

create index if not exists media_lead_idx on media (lead_id, at desc);

-- ─────────────────────────────────────────────────────── solleciti

create table if not exists solleciti (
  id         bigserial primary key,
  lead_id    bigint      not null references leads(id) on delete cascade,
  tipo       text        not null,   -- stato che l'ha generato, o 'scadenza'
  indice     integer     not null default 0,
  due_at     timestamptz not null,
  inviato_at timestamptz,
  annullato  boolean     not null default false
);

-- Il cron scansiona solo i pendenti: indice parziale.
create index if not exists solleciti_due_idx
  on solleciti (due_at) where inviato_at is null and annullato = false;

-- ─────────────────────────────────────────────────────────── payout

-- Dati di pagamento: separati, minimi, cancellati dopo il versamento.
-- `purge_at` viene impostato al momento del pagamento; il cron azzera i campi.
create table if not exists payout (
  id            bigserial primary key,
  lead_id       bigint      not null references leads(id) on delete cascade,
  metodo        text        not null,            -- paypal | bonifico
  destinatario  text,                            -- email PayPal oppure IBAN
  intestatario  text,
  importo       numeric(10,2),
  riferimento   text,
  richiesto_at  timestamptz not null default now(),
  pagato_at     timestamptz,
  pagato_da     bigint,
  purge_at      timestamptz,
  purged        boolean     not null default false
);

create index if not exists payout_lead_idx  on payout (lead_id);
create index if not exists payout_purge_idx on payout (purge_at) where purged = false;

-- ─────────────────────────────────────────────── azioni admin

create table if not exists admin_actions (
  id        bigserial primary key,
  lead_id   bigint      not null references leads(id) on delete cascade,
  admin_id  bigint      not null,
  azione    text        not null,   -- verifica_ok | verifica_ko | bonus_ok | pagato | auto_off…
  motivo    text,
  at        timestamptz not null default now()
);

create index if not exists admin_actions_lead_idx on admin_actions (lead_id, at desc);

-- ───────────────────────────────────────────────────────── trigger

create or replace function touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_touch on leads;
create trigger leads_touch before update on leads
  for each row execute function touch_updated_at();

-- ─────────────────────────────────────────────────────────── viste

-- Gli stati NON si possono confrontare come testo: 'S10…' < 'S3…' in ordine
-- lessicografico, quindi un lead arrivato al bonus risulterebbe indietro
-- rispetto a uno fermo al link. Serve un ordinale esplicito.
create or replace function stato_ord(s text) returns int as $$
  select case s
    when 'S0_START'              then 0
    when 'S1_DISCLAIMER'         then 1
    when 'S2_PREQUALIFICA'       then 2
    when 'S3_LINK_CONSEGNATO'    then 3
    when 'S4_REGISTRATO'         then 4
    when 'S5_KYC_INVIATO'        then 5
    when 'S6_DEPOSITO'           then 6
    when 'S7_TRADE'              then 7
    when 'S8_IN_VERIFICA'        then 8
    when 'S9_VERIFICATO'         then 9
    when 'S10_BONUS_ACCREDITATO' then 10
    when 'S11_PAYOUT'            then 11
    when 'S12_CHIUSO'            then 12
    else -1                                    -- X_* : uscite, fuori dall'imbuto
  end;
$$ language sql immutable;

-- Imbuto per canale: quanti entrano da ogni story e dove si fermano.
-- Il conteggio usa il punto PIÙ AVANZATO raggiunto: chi è uscito (X_*) dopo
-- aver depositato resta contato tra i depositi, altrimenti l'imbuto mente.
create or replace view funnel_per_source as
select
  coalesce(source, 'diretto')                        as canale,
  count(*)                                           as lead,
  count(*) filter (where stato_ord(stato) >= 3
                      or etoro_username is not null) as con_link,
  count(*) filter (where etoro_username is not null) as registrati,
  count(*) filter (where deposito_importo is not null) as depositi,
  count(*) filter (where trade_importo is not null)  as operazioni,
  count(*) filter (where verificato_at is not null)  as verificati,
  count(*) filter (where stato = 'S12_CHIUSO')       as chiusi,
  round(100.0 * count(*) filter (where stato = 'S12_CHIUSO')
        / nullif(count(*), 0), 1)                    as conv_pct
from leads
group by 1
order by lead desc;

-- Coda di lavoro: cosa aspetta un tuo tap, dal più vecchio.
create or replace view coda_admin as
select id, tg_username, nome, stato, stato_da,
       now() - stato_da as fermo_da,
       etoro_username, deposito_importo, trade_importo
from leads
where stato in ('S8_IN_VERIFICA', 'S9_VERIFICATO', 'S11_PAYOUT')
order by stato_da asc;
