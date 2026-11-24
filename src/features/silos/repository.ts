import type { Silo } from './domain';

export type NewSilo = Omit<Silo, 'collectedAt' | 'collectedBy'>;

export type SiloPatch = Partial<
  Pick<
    Silo,
    | 'name'
    | 'comment'
    | 'lat'
    | 'lng'
    | 'accuracyM'
    | 'source'
    | 'verifiedAt'
    | 'verifiedBy'
    | 'collectedAt'
    | 'collectedBy'
  >
> &
  Pick<Silo, 'updatedAt' | 'updatedBy'>;

/** State the row must be in for the update to apply; checked in the same statement, so concurrent clicks cannot both win. */
export type SiloState = 'active' | 'collected';

export interface SiloRepository {
  listActive(): Promise<Silo[]>;
  listCollected(limit: number): Promise<Silo[]>;
  findById(id: string): Promise<Silo | null>;
  /** Idempotent on `id`: a repeated insert returns the silo already stored. */
  create(silo: NewSilo): Promise<Silo>;
  /** Null when no silo with this id is in the required state. */
  update(id: string, requiredState: SiloState, patch: SiloPatch): Promise<Silo | null>;
}
