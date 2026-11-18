'use client';

import { FileClock } from 'lucide-react';
import type { SiloDraft } from './draft';

type Props = {
  draft: SiloDraft;
  onResume: (draft: SiloDraft) => void;
  onDiscard: () => void;
};

export function PendingDraftBanner({ draft, onResume, onDiscard }: Props) {
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-clay)] bg-[var(--color-clay-soft)] p-3"
    >
      <FileClock size={20} className="shrink-0 text-[var(--color-clay)]" aria-hidden />
      <p className="flex-1 text-sm">
        Masz niewysłany silos{draft.name ? `: ${draft.name}` : ''}.
      </p>
      <button type="button" onClick={onDiscard} className="panel-btn panel-btn--ghost min-h-9 px-3 text-sm">
        Odrzuć
      </button>
      <button
        type="button"
        onClick={() => onResume(draft)}
        className="panel-btn panel-btn--primary min-h-9 px-3 text-sm"
      >
        Dokończ
      </button>
    </div>
  );
}
