import 'server-only';
import { neon, neonConfig } from '@neondatabase/serverless';

export type Row = Record<string, unknown>;

export interface SqlClient {
  /** Parameterised query: `$1`, `$2`... placeholders, values passed separately. */
  query(text: string, params?: unknown[]): Promise<Row[]>;
}

let client: SqlClient | null = null;

/** Lazy, so `next build` works without DATABASE_URL (set by the Neon integration on Vercel). */
export function getSql(): SqlClient {
  if (client) return client;

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');

  // The HTTP driver cannot reach a plain local Postgres; this points it at a local Neon HTTP proxy.
  const localEndpoint = process.env.NEON_LOCAL_FETCH_ENDPOINT;
  if (localEndpoint && process.env.NODE_ENV !== 'production') {
    neonConfig.fetchEndpoint = () => localEndpoint;
  }

  const sql = neon(url);
  client = { query: (text, params = []) => sql.query(text, params) as Promise<Row[]> };
  return client;
}
