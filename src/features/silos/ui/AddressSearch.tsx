'use client';

import { useState, useTransition } from 'react';
import { Search } from 'lucide-react';
import { geocodeAddress } from '../actions';
import type { Coordinates } from '../domain';
import type { GeocodeResult } from '../geocoder';
import { OFFLINE_MESSAGE, safeAction } from './safeAction';

type Props = { onPick: (position: Coordinates) => void };

/** Not a <form>: it sits inside the silo form and forms cannot nest. */
export function AddressSearch({ onPick }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function search() {
    setError(null);
    startTransition(async () => {
      const res = await safeAction(
        () => geocodeAddress(query),
        () => ({ ok: false as const, error: OFFLINE_MESSAGE }),
      );
      if (res.ok) {
        setResults(res.results);
        // A single unambiguous hit can be applied straight away.
        if (res.results.length === 1) pick(res.results[0]);
      } else {
        setResults([]);
        setError(res.error);
      }
    });
  }

  function pick(result: GeocodeResult) {
    onPick({ lat: result.lat, lng: result.lng });
    setResults([]);
  }

  return (
    <div className="space-y-2">
      <label htmlFor="silo-address" className="block text-sm font-medium">
        Albo wyszukaj adres
      </label>
      <div className="flex gap-2">
        <input
          id="silo-address"
          type="search"
          inputMode="search"
          autoComplete="street-address"
          enterKeyHint="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              search();
            }
          }}
          placeholder="np. Zabierzów, Krakowska 12"
          className="panel-input min-w-0 flex-1"
        />
        <button
          type="button"
          onClick={search}
          disabled={pending || query.trim().length < 3}
          className="panel-btn panel-btn--secondary shrink-0"
          aria-label="Szukaj adresu"
        >
          <Search size={18} aria-hidden />
          <span className="sr-only sm:not-sr-only">{pending ? 'Szukam…' : 'Szukaj'}</span>
        </button>
      </div>
      {error && (
        <p role="alert" className="text-sm text-[var(--color-clay)]">
          {error}
        </p>
      )}
      {results.length > 1 && (
        <ul className="divide-y divide-[var(--color-border)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-paper)]">
          {results.map((r) => (
            <li key={`${r.lat},${r.lng}`}>
              <button
                type="button"
                onClick={() => pick(r)}
                className="w-full px-3 py-2.5 text-left text-sm hover:bg-[var(--color-surface-2)]"
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
