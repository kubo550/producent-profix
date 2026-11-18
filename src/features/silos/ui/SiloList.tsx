'use client';

import type { SiloDto } from '../dto';
import { formatDaysAgo } from './format';
import { StaleBadge } from './StaleBadge';

type Props = {
  silos: SiloDto[];
  onSelect: (id: string) => void;
};

/** Already ordered by the server: "do weryfikacji" first. */
export function SiloList({ silos, onSelect }: Props) {
  if (silos.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-fg-muted">
        Na mapie nie ma jeszcze żadnych silosów. Dodaj pierwszy przyciskiem poniżej.
      </p>
    );
  }

  const staleCount = silos.filter((s) => s.stale).length;

  return (
    <section aria-labelledby="silo-list-title" className="space-y-2">
      <h2 id="silo-list-title" className="h-eyebrow">
        Silosy na mapie: {silos.length}
        {staleCount > 0 && ` · do weryfikacji: ${staleCount}`}
      </h2>
      <ul className="divide-y divide-[var(--color-border)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-paper)]">
        {silos.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--color-surface-2)]"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">{s.name}</span>
                <span className="block truncate text-sm text-fg-muted">
                  potwierdzony {formatDaysAgo(s.daysSinceVerified)} · {s.verifiedBy}
                </span>
              </span>
              {s.stale && <StaleBadge />}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
