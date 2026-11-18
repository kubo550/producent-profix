import { describe, expect, it } from 'vitest';
import type { SqlClient } from '@/lib/db';
import { buildUpdate, mapRow, PgSiloRepository } from './pgRepository';

const row = {
  id: 'a',
  name: 'Kowalski',
  comment: null,
  lat: 50.1,
  lng: 19.6,
  accuracy_m: null,
  source: 'manual',
  created_at: '2026-01-01T10:00:00.000Z',
  created_by: 'Janek',
  verified_at: '2026-01-02T10:00:00.000Z',
  verified_by: 'Janek',
  updated_at: '2026-01-02T10:00:00.000Z',
  updated_by: 'Janek',
  collected_at: null,
  collected_by: null,
};

describe('mapRow', () => {
  it('maps snake_case columns, parses dates and keeps nulls', () => {
    const silo = mapRow(row);
    expect(silo.accuracyM).toBeNull();
    expect(silo.verifiedAt).toEqual(new Date('2026-01-02T10:00:00.000Z'));
    expect(silo.collectedAt).toBeNull();
  });
});

describe('buildUpdate', () => {
  it('builds a parameterised SET from whitelisted columns, skipping undefined, guarded by state', () => {
    const at = new Date();
    const { text, params } = buildUpdate('id-1', 'active', {
      name: 'X',
      comment: undefined,
      collectedAt: null,
      updatedAt: at,
      updatedBy: 'Ola',
    });
    expect(text.replace(/\s+/g, ' ')).toContain(
      'SET name = $1, collected_at = $2, updated_at = $3, updated_by = $4 WHERE id = $5 AND collected_at IS NULL',
    );
    expect(params).toEqual(['X', null, at, 'Ola', 'id-1']);
  });
});

describe('PgSiloRepository', () => {
  it('passes values only as parameters', async () => {
    const calls: { text: string; params?: unknown[] }[] = [];
    const sql: SqlClient = {
      query: async (text, params) => {
        calls.push({ text, params });
        return [row];
      },
    };
    await new PgSiloRepository(sql).findById("x'; DROP TABLE silos; --");
    expect(calls[0].text).not.toContain('DROP');
    expect(calls[0].params).toEqual(["x'; DROP TABLE silos; --"]);
  });

  it('returns null when update matches no row', async () => {
    const sql: SqlClient = { query: async () => [] };
    expect(await new PgSiloRepository(sql).update('x', 'active', { updatedAt: new Date(), updatedBy: 'a' })).toBeNull();
  });
});
