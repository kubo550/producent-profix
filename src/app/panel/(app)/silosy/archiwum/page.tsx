import type { Metadata } from 'next';
import { requireSession } from '@/features/auth/session';
import { getSiloService } from '@/features/silos/container';
import { toSiloDto } from '@/features/silos/dto';
import { RestoreButton } from '@/features/silos/ui/RestoreButton';
import { formatDate } from '@/features/silos/ui/format';
import { ARCHIVE_LIMIT } from '@/features/silos/service';

export const metadata: Metadata = { title: 'Archiwum silosów' };

export default async function SiloArchivePage() {
  await requireSession();
  const now = new Date();
  const silos = (await getSiloService().listCollected()).map((s) => toSiloDto(s, now));

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <div className="space-y-1">
        <h1 className="text-2xl">Archiwum</h1>
        <p className="text-sm text-fg-muted">
          Silosy oznaczone jako odebrane, od najnowszych. Pokazujemy ostatnie {ARCHIVE_LIMIT}.
        </p>
      </div>

      {silos.length === 0 ? (
        <p className="py-6 text-center text-sm text-fg-muted">Archiwum jest puste.</p>
      ) : (
        <ul className="divide-y divide-[var(--color-border)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-paper)]">
          {silos.map((s) => (
            <li key={s.id} className="flex items-start justify-between gap-3 px-4 py-3">
              <div className="min-w-0 space-y-0.5">
                <p className="break-words font-medium">{s.name}</p>
                {s.comment && <p className="text-sm text-fg-muted">{s.comment}</p>}
                <p className="text-xs text-fg-subtle">
                  Dodał {s.createdBy} {formatDate(s.createdAt)} · odebrał {s.collectedBy}{' '}
                  {s.collectedAt && formatDate(s.collectedAt)}
                </p>
              </div>
              <RestoreButton id={s.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
