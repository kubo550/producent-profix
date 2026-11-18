import type { Row, SqlClient } from '@/lib/db';
import type { LocationSource, Silo } from './domain';
import type { NewSilo, SiloPatch, SiloRepository, SiloState } from './repository';

const COLUMNS = `id, name, comment, lat, lng, accuracy_m, source,
  created_at, created_by, verified_at, verified_by, updated_at, updated_by,
  collected_at, collected_by`;

/** Column names in the dynamic SET come only from this map, never from input. */
const PATCH_COLUMNS: Record<keyof SiloPatch, string> = {
  name: 'name',
  comment: 'comment',
  lat: 'lat',
  lng: 'lng',
  accuracyM: 'accuracy_m',
  source: 'source',
  verifiedAt: 'verified_at',
  verifiedBy: 'verified_by',
  collectedAt: 'collected_at',
  collectedBy: 'collected_by',
  updatedAt: 'updated_at',
  updatedBy: 'updated_by',
};

const STATE_CONDITION: Record<SiloState, string> = {
  active: 'collected_at IS NULL',
  collected: 'collected_at IS NOT NULL',
};

const toDate = (value: unknown) => (value instanceof Date ? value : new Date(String(value)));

export function mapRow(row: Row): Silo {
  return {
    id: String(row.id),
    name: String(row.name),
    comment: (row.comment as string | null) ?? null,
    lat: Number(row.lat),
    lng: Number(row.lng),
    accuracyM: row.accuracy_m === null ? null : Number(row.accuracy_m),
    // The column's CHECK constraint limits it to LOCATION_SOURCES.
    source: row.source as LocationSource,
    createdAt: toDate(row.created_at),
    createdBy: String(row.created_by),
    verifiedAt: toDate(row.verified_at),
    verifiedBy: String(row.verified_by),
    updatedAt: toDate(row.updated_at),
    updatedBy: String(row.updated_by),
    collectedAt: row.collected_at === null ? null : toDate(row.collected_at),
    collectedBy: (row.collected_by as string | null) ?? null,
  };
}

export function buildUpdate(
  id: string,
  requiredState: SiloState,
  patch: SiloPatch,
): { text: string; params: unknown[] } {
  const params: unknown[] = [];
  const sets = Object.entries(patch)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      params.push(value);
      return `${PATCH_COLUMNS[key as keyof SiloPatch]} = $${params.length}`;
    });
  params.push(id);
  return {
    text: `UPDATE silos SET ${sets.join(', ')}
      WHERE id = $${params.length} AND ${STATE_CONDITION[requiredState]}
      RETURNING ${COLUMNS}`,
    params,
  };
}

export class PgSiloRepository implements SiloRepository {
  constructor(private readonly sql: SqlClient) {}

  async listActive(): Promise<Silo[]> {
    const rows = await this.sql.query(
      `SELECT ${COLUMNS} FROM silos WHERE collected_at IS NULL ORDER BY verified_at DESC`,
    );
    return rows.map(mapRow);
  }

  async listCollected(limit: number): Promise<Silo[]> {
    const rows = await this.sql.query(
      `SELECT ${COLUMNS} FROM silos WHERE collected_at IS NOT NULL
       ORDER BY collected_at DESC LIMIT $1`,
      [limit],
    );
    return rows.map(mapRow);
  }

  async findById(id: string): Promise<Silo | null> {
    const rows = await this.sql.query(`SELECT ${COLUMNS} FROM silos WHERE id = $1`, [id]);
    return rows[0] ? mapRow(rows[0]) : null;
  }

  async create(s: NewSilo): Promise<Silo> {
    const rows = await this.sql.query(
      `INSERT INTO silos (id, name, comment, lat, lng, accuracy_m, source,
         created_at, created_by, verified_at, verified_by, updated_at, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       ON CONFLICT (id) DO NOTHING
       RETURNING ${COLUMNS}`,
      [
        s.id,
        s.name,
        s.comment,
        s.lat,
        s.lng,
        s.accuracyM,
        s.source,
        s.createdAt,
        s.createdBy,
        s.verifiedAt,
        s.verifiedBy,
        s.updatedAt,
        s.updatedBy,
      ],
    );
    if (rows[0]) return mapRow(rows[0]);

    const existing = await this.findById(s.id);
    if (!existing) throw new Error(`Silo ${s.id} neither inserted nor found`);
    return existing;
  }

  async update(id: string, requiredState: SiloState, patch: SiloPatch): Promise<Silo | null> {
    const { text, params } = buildUpdate(id, requiredState, patch);
    const rows = await this.sql.query(text, params);
    return rows[0] ? mapRow(rows[0]) : null;
  }
}
