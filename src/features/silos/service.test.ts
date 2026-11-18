import { beforeEach, describe, expect, it } from 'vitest';
import type { Silo } from './domain';
import type { NewSilo, SiloPatch, SiloRepository, SiloState } from './repository';
import { SiloNotFoundError, SiloService, SiloStateError } from './service';

/** Mirrors PgSiloRepository semantics: idempotent create, state-guarded update. */
class InMemoryRepo implements SiloRepository {
  rows = new Map<string, Silo>();

  async listActive() {
    return [...this.rows.values()].filter((s) => !s.collectedAt);
  }
  async listCollected(limit: number) {
    return [...this.rows.values()].filter((s) => s.collectedAt).slice(0, limit);
  }
  async findById(id: string) {
    return this.rows.get(id) ?? null;
  }
  async create(s: NewSilo) {
    if (!this.rows.has(s.id)) this.rows.set(s.id, { ...s, collectedAt: null, collectedBy: null });
    return this.rows.get(s.id)!;
  }
  async update(id: string, requiredState: SiloState, patch: SiloPatch) {
    const cur = this.rows.get(id);
    if (!cur || (requiredState === 'active') !== (cur.collectedAt === null)) return null;
    const next = { ...cur, ...patch };
    this.rows.set(id, next);
    return next;
  }
}

const T0 = new Date('2026-01-01T10:00:00Z');
const T1 = new Date('2026-02-01T10:00:00Z');
const ID = '3f0c1d2e-8a4b-4c5d-9e6f-7a8b9c0d1e2f';
const input = { id: ID, name: 'Kowalski', comment: null, lat: 50, lng: 19, accuracyM: 8, source: 'gps' as const };

describe('SiloService', () => {
  let repo: InMemoryRepo;
  let now: Date;
  let service: SiloService;

  beforeEach(() => {
    repo = new InMemoryRepo();
    now = T0;
    service = new SiloService(repo, () => now);
  });

  it('create records the author as creator and first confirmer', async () => {
    expect(await service.create(input, 'Janek')).toMatchObject({
      createdBy: 'Janek',
      createdAt: T0,
      verifiedBy: 'Janek',
      verifiedAt: T0,
    });
  });

  it('creating the same draft twice keeps one silo with the first author', async () => {
    await service.create(input, 'Janek');
    now = T1;
    await service.create({ ...input, name: 'retry' }, 'Ola');
    expect(await service.listActive()).toEqual([expect.objectContaining({ name: 'Kowalski', createdBy: 'Janek' })]);
  });

  it('editing text keeps the verification and the original location metadata', async () => {
    await service.create(input, 'Janek');
    now = T1;
    const updated = await service.update({ ...input, name: 'Kowalski 2', accuracyM: null, source: 'manual' }, 'Ola');
    expect(updated).toMatchObject({
      name: 'Kowalski 2',
      verifiedAt: T0,
      verifiedBy: 'Janek',
      accuracyM: 8,
      source: 'gps',
      updatedBy: 'Ola',
      updatedAt: T1,
    });
  });

  it('moving the pin counts as a fresh confirmation', async () => {
    await service.create(input, 'Janek');
    now = T1;
    const moved = await service.update({ ...input, lat: 50.5, source: 'manual', accuracyM: null }, 'Ola');
    expect(moved).toMatchObject({ lat: 50.5, source: 'manual', accuracyM: null, verifiedAt: T1, verifiedBy: 'Ola' });
  });

  it('confirm resets the verification date', async () => {
    await service.create(input, 'Janek');
    now = T1;
    expect(await service.confirm(ID, 'Ola')).toMatchObject({ verifiedAt: T1, verifiedBy: 'Ola' });
  });

  it('a second "collected" click is rejected and keeps the first collector', async () => {
    await service.create(input, 'Janek');
    now = T1;
    await service.markCollected(ID, 'Ola');
    await expect(service.markCollected(ID, 'Piotr')).rejects.toThrow(
      new SiloStateError('Ten silos jest już oznaczony jako odebrany.'),
    );
    expect(await repo.findById(ID)).toMatchObject({ collectedBy: 'Ola', collectedAt: T1 });
  });

  it('archived silos cannot be confirmed or edited', async () => {
    await service.create(input, 'Janek');
    await service.markCollected(ID, 'Ola');
    await expect(service.confirm(ID, 'Ola')).rejects.toBeInstanceOf(SiloStateError);
    await expect(service.update(input, 'Ola')).rejects.toBeInstanceOf(SiloStateError);
  });

  it('restore brings a collected silo back as freshly confirmed, and only once', async () => {
    await service.create(input, 'Janek');
    await service.markCollected(ID, 'Ola');
    now = T1;
    expect(await service.restore(ID, 'Piotr')).toMatchObject({
      collectedAt: null,
      collectedBy: null,
      verifiedAt: T1,
      verifiedBy: 'Piotr',
    });
    await expect(service.restore(ID, 'Piotr')).rejects.toThrow(new SiloStateError('Ten silos nie jest w archiwum.'));
  });

  it('unknown ids raise SiloNotFoundError', async () => {
    await expect(service.confirm('missing', 'Ola')).rejects.toBeInstanceOf(SiloNotFoundError);
    await expect(service.update({ ...input, id: 'missing' }, 'Ola')).rejects.toBeInstanceOf(SiloNotFoundError);
  });
});
