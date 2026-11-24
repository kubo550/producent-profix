'use client';

import { useState, useTransition } from 'react';
import type { ActionResult } from '../actions';
import { offlineResult, safeAction } from './safeAction';

export function useSiloCommand(onDone?: () => void) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function run(command: (id: string) => Promise<ActionResult>, id: string) {
    setError(null);
    startTransition(async () => {
      const res = await safeAction(() => command(id), offlineResult);
      if (res.ok) onDone?.();
      else setError(res.error ?? 'Nie udało się wykonać operacji.');
    });
  }

  return { run, pending, error };
}
