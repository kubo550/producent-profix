import { hasMoved, isCollected, type Silo } from './domain';
import type { SiloPatch, SiloRepository, SiloState } from './repository';
import type { SiloInput } from './schema';

export class SiloNotFoundError extends Error {
  constructor(id: string) {
    super(`Silo ${id} not found`);
    this.name = 'SiloNotFoundError';
  }
}

export class SiloStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SiloStateError';
  }
}

export type Clock = () => Date;

export const ARCHIVE_LIMIT = 200;

/** `actor` is the display name of the logged-in employee. */
export class SiloService {
  constructor(
    private readonly repo: SiloRepository,
    private readonly now: Clock = () => new Date(),
  ) {}

  listActive(): Promise<Silo[]> {
    return this.repo.listActive();
  }

  listCollected(): Promise<Silo[]> {
    return this.repo.listCollected(ARCHIVE_LIMIT);
  }

  /** A new pin counts as confirmed by its author at creation. */
  create(input: SiloInput, actor: string): Promise<Silo> {
    const now = this.now();
    return this.repo.create({
      ...input,
      createdAt: now,
      createdBy: actor,
      verifiedAt: now,
      verifiedBy: actor,
      updatedAt: now,
      updatedBy: actor,
    });
  }

  /** Editing text keeps the verification date; moving the pin counts as a fresh confirmation. */
  async update(input: SiloInput, actor: string): Promise<Silo> {
    const current = await this.repo.findById(input.id);
    if (!current) throw new SiloNotFoundError(input.id);

    const now = this.now();
    const { id, ...fields } = input;
    const moved = hasMoved(current, fields);

    return this.save(id, 'active', {
      ...fields,
      accuracyM: moved ? fields.accuracyM : current.accuracyM,
      source: moved ? fields.source : current.source,
      ...(moved ? { verifiedAt: now, verifiedBy: actor } : {}),
      updatedAt: now,
      updatedBy: actor,
    });
  }

  confirm(id: string, actor: string): Promise<Silo> {
    const now = this.now();
    return this.save(id, 'active', { verifiedAt: now, verifiedBy: actor, updatedAt: now, updatedBy: actor });
  }

  markCollected(id: string, actor: string): Promise<Silo> {
    const now = this.now();
    return this.save(id, 'active', { collectedAt: now, collectedBy: actor, updatedAt: now, updatedBy: actor });
  }

  /** Undo for a mistaken "Odebrany"; the restored pin counts as confirmed now. */
  restore(id: string, actor: string): Promise<Silo> {
    const now = this.now();
    return this.save(id, 'collected', {
      collectedAt: null,
      collectedBy: null,
      verifiedAt: now,
      verifiedBy: actor,
      updatedAt: now,
      updatedBy: actor,
    });
  }

  private async save(id: string, requiredState: SiloState, patch: SiloPatch): Promise<Silo> {
    const saved = await this.repo.update(id, requiredState, patch);
    if (saved) return saved;

    // Rejected: tell "gone" apart from "someone changed its state first".
    const current = await this.repo.findById(id);
    if (!current) throw new SiloNotFoundError(id);
    throw new SiloStateError(
      isCollected(current)
        ? 'Ten silos jest już oznaczony jako odebrany.'
        : 'Ten silos nie jest w archiwum.',
    );
  }
}
