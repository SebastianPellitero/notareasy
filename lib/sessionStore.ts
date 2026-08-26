import { createClient } from '@supabase/supabase-js';

export type SessionStatus = 'pending' | 'completed';

export interface CaptureSession {
  id: string;
  status: SessionStatus;
  createdAt: number;
  photoDataUrl: string | null;
}

const TTL_MS = 10 * 60 * 1000;
const TABLE = 'capture_sessions';

interface Row {
  id: string;
  status: SessionStatus;
  created_at: string;
  photo_data_url: string | null;
}

/**
 * Supabase (Postgres) como session store. Necesario porque las API routes
 * corren como funciones serverless en Vercel: un `Map` en memoria no se
 * comparte entre la invocación que crea la sesión (desktop) y la que sube
 * la foto (celular, segundos/minutos después, puede caer en otra
 * instancia). Postgres es un store externo compartido, así que resuelve eso.
 *
 * Requiere la tabla `capture_sessions` (ver README/SQL en el plan) y las
 * env vars SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY. La service role key
 * NO lleva prefijo NEXT_PUBLIC_ a propósito: tiene acceso total a la DB
 * (bypassea RLS) y solo se usa server-side en este archivo, nunca debe
 * llegar al bundle del cliente.
 */
let supabase: ReturnType<typeof createClient> | null = null;

// Lazy: si se instancia a nivel de módulo, Next.js explota al armar el build
// (evalúa el módulo para "collect page data" sin las env vars presentes).
function getSupabase() {
  if (!supabase) {
    supabase = createClient(
      process.env.SUPABASE_URL ?? '',
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    );
  }
  return supabase;
}

function fromRow(row: Row): CaptureSession {
  return {
    id: row.id,
    status: row.status,
    createdAt: new Date(row.created_at).getTime(),
    photoDataUrl: row.photo_data_url,
  };
}

function isExpired(session: CaptureSession): boolean {
  return Date.now() - session.createdAt > TTL_MS;
}

export async function createSession(): Promise<CaptureSession> {
  // Cast puntual a `any`: postgrest-js infiere `never` para el payload de
  // insert/update sin un tipo Database generado; el runtime no valida shape
  // vía TS de todas formas, y el resultado se castea explícitamente a Row
  // más abajo (fromRow).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = getSupabase().from(TABLE);
  const { data, error } = await query.insert({ status: 'pending' }).select().single();

  if (error || !data) throw new Error(`No se pudo crear la sesión: ${error?.message}`);
  return fromRow(data as Row);
}

export async function getSession(id: string): Promise<CaptureSession | null> {
  const { data, error } = await getSupabase().from(TABLE).select().eq('id', id).maybeSingle();
  if (error || !data) return null;

  const session = fromRow(data as Row);
  if (isExpired(session)) return null; // TTL manejado en app code, Postgres no expira filas solo
  return session;
}

export async function completeSession(id: string, photoDataUrl: string): Promise<CaptureSession | null> {
  const session = await getSession(id);
  if (!session) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = getSupabase().from(TABLE);
  const { data, error } = await query
    .update({ status: 'completed', photo_data_url: photoDataUrl })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) return null;
  return fromRow(data as Row);
}
