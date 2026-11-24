'use client';

import { Undo2 } from 'lucide-react';
import { restoreSilo } from '../actions';
import { useSiloCommand } from './useSiloCommand';

/** Undo for a mistaken "Odebrany": puts the silo back on the map. */
export function RestoreButton({ id }: { id: string }) {
  const { run, pending, error } = useSiloCommand();

  return (
    <div className="shrink-0 text-right">
      <button
        type="button"
        disabled={pending}
        onClick={() => run(restoreSilo, id)}
        className="panel-btn panel-btn--secondary min-h-10 px-3 text-sm"
      >
        <Undo2 size={16} aria-hidden />
        {pending ? 'Przywracam…' : 'Przywróć'}
      </button>
      {error && (
        <p role="alert" className="mt-1 max-w-48 text-xs text-[var(--color-clay)]">
          {error}
        </p>
      )}
    </div>
  );
}
