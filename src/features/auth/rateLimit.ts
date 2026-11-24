import type { SqlClient } from '@/lib/db';

const MAX_FAILED_ATTEMPTS = 10;
export const WINDOW_MINUTES = 15;

export interface LoginRateLimiter {
  isBlocked(ip: string): Promise<boolean>;
  recordFailure(ip: string): Promise<void>;
  reset(ip: string): Promise<void>;
}

/** In Postgres, not memory: serverless instances do not share memory and reset on cold start. */
export class PgLoginRateLimiter implements LoginRateLimiter {
  constructor(private readonly sql: SqlClient) {}

  async isBlocked(ip: string): Promise<boolean> {
    const rows = await this.sql.query(
      `SELECT count(*)::int AS n FROM login_attempts
       WHERE ip = $1 AND attempted_at > now() - make_interval(mins => $2)`,
      [ip, WINDOW_MINUTES],
    );
    return Number(rows[0]?.n ?? 0) >= MAX_FAILED_ATTEMPTS;
  }

  async recordFailure(ip: string): Promise<void> {
    // One round trip; the cleanup keeps the table tiny without a cron job.
    await this.sql.query(
      `WITH expired AS (DELETE FROM login_attempts WHERE attempted_at < now() - interval '1 day')
       INSERT INTO login_attempts (ip) VALUES ($1)`,
      [ip],
    );
  }

  async reset(ip: string): Promise<void> {
    await this.sql.query('DELETE FROM login_attempts WHERE ip = $1', [ip]);
  }
}
