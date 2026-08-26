// Setup idempotente de la tabla capture_sessions en Supabase.
// Si la tabla no existe, la crea. Si ya existe, solo confirma la conexión.
//
// Necesita SUPABASE_DB_URL: la connection string directa a Postgres (no la
// URL/key de la REST API que usa @supabase/supabase-js en tiempo de
// ejecución). Se saca de: Supabase dashboard → Project Settings →
// Database → Connection string → URI. Va en .env.local.
//
// Uso: npm run db:setup

import pg from 'pg';

const { Client } = pg;

const connectionString = process.env.SUPABASE_DB_URL;

if (!connectionString) {
  console.error(
    'Falta SUPABASE_DB_URL. Agregala a .env.local con la connection string ' +
      'directa de Postgres (Supabase dashboard → Project Settings → ' +
      'Database → Connection string → URI).',
  );
  process.exit(1);
}

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  console.log('Conectado a la base de Supabase.');

  const { rows } = await client.query(
    `select 1 from information_schema.tables where table_schema = 'public' and table_name = 'capture_sessions'`,
  );

  if (rows.length > 0) {
    console.log('La tabla "capture_sessions" ya existe — nada que crear, conexión OK.');
    return;
  }

  console.log('La tabla "capture_sessions" no existe. Creándola...');
  await client.query(`
    create table if not exists capture_sessions (
      id uuid primary key default gen_random_uuid(),
      status text not null default 'pending',
      created_at timestamptz not null default now(),
      photo_data_url text
    );
  `);
  console.log('Tabla "capture_sessions" creada.');
}

main()
  .catch((err) => {
    console.error('Error al conectar/crear la tabla:', err.message);
    process.exitCode = 1;
  })
  .finally(() => client.end());
