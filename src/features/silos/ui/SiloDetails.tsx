'use client';

import { useState } from 'react';
import { Archive, CheckCircle2, Navigation, Pencil, X } from 'lucide-react';
import { confirmSilo, markSiloCollected } from '../actions';
import { STALE_AFTER_DAYS } from '../domain';
import type { SiloDto } from '../dto';
import { formatDate, formatDaysAgo, navigationUrl } from './format';
import { StaleBadge } from './StaleBadge';
import { useSiloCommand } from './useSiloCommand';

type Props = {
  silo: SiloDto;
  onEdit: () => void;
  onClose: () => void;
};

export function SiloDetails({ silo, onEdit, onClose }: Props) {
  const [confirmingCollect, setConfirmingCollect] = useState(false);
  const confirm = useSiloCommand();
  const collect = useSiloCommand(onClose);
  const busy = confirm.pending || collect.pending;
  const error = confirm.error ?? collect.error;

  return (
    <article className="space-y-4" aria-labelledby="silo-details-title">
      <header className="sticky -top-4 z-10 -mx-4 -mt-4 flex items-start justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 pb-3 pt-4">
        <div className="min-w-0 space-y-1">
          <h2 id="silo-details-title" className="break-words text-xl">
            {silo.name}
          </h2>
          {silo.stale && <StaleBadge />}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="panel-btn panel-btn--ghost -mr-2 -mt-1 h-10 w-10 shrink-0 p-0"
          aria-label="Zamknij szczegóły"
        >
          <X size={20} aria-hidden />
        </button>
      </header>

      {silo.comment && <p className="whitespace-pre-line text-[15px]">{silo.comment}</p>}

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-fg-muted">
        <dt>Dodał</dt>
        <dd>
          {silo.createdBy}, {formatDate(silo.createdAt)}
        </dd>
        <dt>Potwierdzony</dt>
        <dd className={silo.stale ? 'font-medium text-[var(--color-clay)]' : undefined}>
          {formatDaysAgo(silo.daysSinceVerified)} ({silo.verifiedBy})
        </dd>
      </dl>

      {silo.stale && (
        <p className="rounded-[var(--radius-md)] bg-[var(--color-clay-soft)] p-3 text-sm">
          Nikt nie potwierdził tego silosu od ponad {STALE_AFTER_DAYS} dni. Sprawdź, czy nadal tam stoi.
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        <a
          href={navigationUrl(silo)}
          target="_blank"
          rel="noopener noreferrer"
          className="panel-btn panel-btn--primary col-span-2"
        >
          <Navigation size={18} aria-hidden />
          Nawiguj
        </a>
        <button
          type="button"
          disabled={busy}
          onClick={() => confirm.run(confirmSilo, silo.id)}
          className="panel-btn panel-btn--secondary"
        >
          <CheckCircle2 size={18} aria-hidden />
          {confirm.pending ? 'Zapisuję…' : 'Nadal stoi'}
        </button>
        <button type="button" disabled={busy} onClick={onEdit} className="panel-btn panel-btn--secondary">
          <Pencil size={18} aria-hidden />
          Edytuj
        </button>

        {confirmingCollect ? (
          <div className="col-span-2 space-y-2 rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] p-3">
            <p className="text-sm">Oznaczyć silos jako odebrany? Zniknie z mapy i trafi do archiwum.</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmingCollect(false)}
                className="panel-btn panel-btn--ghost flex-1"
              >
                Nie
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => collect.run(markSiloCollected, silo.id)}
                className="panel-btn panel-btn--danger flex-1"
              >
                {collect.pending ? 'Zapisuję…' : 'Tak, odebrany'}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => setConfirmingCollect(true)}
            className="panel-btn panel-btn--ghost col-span-2"
          >
            <Archive size={18} aria-hidden />
            Odebrany
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-[var(--color-clay)]">
          {error}
        </p>
      )}
    </article>
  );
}
