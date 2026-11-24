'use client';

import { useActionState } from 'react';
import { AlertTriangle, Crosshair, LoaderCircle, MapPin } from 'lucide-react';
import { createSilo, updateSilo, type ActionResult } from '../actions';
import { COMMENT_MAX, NAME_MAX, POOR_ACCURACY_M, type Coordinates } from '../domain';
import { AddressSearch } from './AddressSearch';
import { hasPosition, type SiloDraft } from './draft';
import { offlineResult, safeAction } from './safeAction';
import { formatCoords } from './format';
import type { GeolocationState } from './useGeolocation';

type Props = {
  isNew: boolean;
  draft: SiloDraft;
  geo: GeolocationState;
  onLocate: () => void;
  onStopLocating: () => void;
  onAddressPick: (position: Coordinates) => void;
  onTextChange: (field: 'name' | 'comment', value: string) => void;
  /** Called on cancel and after a successful save. */
  onClose: () => void;
};

const SOURCE_LABEL: Record<SiloDraft['source'], string> = {
  gps: 'z GPS',
  manual: 'ustawiona ręcznie',
  address: 'z adresu',
};

function LocationStatus({ draft, geo }: Pick<Props, 'draft' | 'geo'>) {
  if (geo.status === 'locating') {
    return (
      <p className="flex items-center gap-2 text-sm" role="status">
        <LoaderCircle size={16} className="animate-spin" aria-hidden />
        Szukam pozycji
        {geo.fix ? ` (dokładność ok. ${Math.round(geo.fix.accuracyM)} m)` : ''}…
      </p>
    );
  }
  if (geo.status === 'error' && !hasPosition(draft)) {
    return (
      <p role="alert" className="text-sm text-[var(--color-clay)]">
        {geo.message}
      </p>
    );
  }
  if (!hasPosition(draft)) {
    return (
      <p className="text-sm text-fg-muted">
        Pobierz pozycję z GPS, wyszukaj adres albo przytrzymaj palec na mapie.
      </p>
    );
  }

  const poor = draft.source === 'gps' && draft.accuracyM !== null && draft.accuracyM > POOR_ACCURACY_M;
  return (
    <div className="space-y-1.5">
      <p className="flex items-center gap-2 text-sm">
        <MapPin size={16} className="text-[var(--color-clay)]" aria-hidden />
        Pozycja {SOURCE_LABEL[draft.source]}
        {draft.source === 'gps' && draft.accuracyM !== null && ` (±${draft.accuracyM} m)`}
        <span className="font-mono text-xs text-fg-subtle">{formatCoords(draft)}</span>
      </p>
      {poor && (
        <p role="alert" className="flex items-start gap-2 text-sm text-[var(--color-clay)]">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden />
          Słaba dokładność GPS. Spróbuj ponownie za chwilę albo przeciągnij pinezkę we właściwe miejsce.
        </p>
      )}
      <p className="text-xs text-fg-subtle">Pinezkę możesz przeciągnąć na mapie, żeby poprawić miejsce.</p>
    </div>
  );
}

export function SiloForm({
  isNew,
  draft,
  geo,
  onLocate,
  onStopLocating,
  onAddressPick,
  onTextChange,
  onClose,
}: Props) {
  const save = isNew ? createSilo : updateSilo;
  const [result, formAction, pending] = useActionState<ActionResult | null, FormData>(
    async (prev, formData) => {
      const res = await safeAction(() => save(prev, formData), offlineResult);
      if (res.ok) onClose();
      return res;
    },
    null,
  );

  const fieldErrors = result && !result.ok ? result.fieldErrors : undefined;
  const positionError = fieldErrors?.lat?.[0] ?? fieldErrors?.lng?.[0];
  const locating = geo.status === 'locating';

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <h2 className="text-xl">{isNew ? 'Nowy silos' : 'Edytuj silos'}</h2>

      <input type="hidden" name="id" value={draft.id} />
      <input type="hidden" name="lat" value={draft.lat ?? ''} />
      <input type="hidden" name="lng" value={draft.lng ?? ''} />
      <input type="hidden" name="accuracyM" value={draft.accuracyM ?? ''} />
      <input type="hidden" name="source" value={draft.source} />

      <fieldset className="space-y-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-paper-2)] p-3">
        <legend className="px-1 text-sm font-medium">Lokalizacja</legend>
        <LocationStatus draft={draft} geo={geo} />
        {positionError && (
          <p role="alert" className="text-sm text-[var(--color-clay)]">
            {positionError}
          </p>
        )}
        <button
          type="button"
          onClick={locating ? onStopLocating : onLocate}
          className="panel-btn panel-btn--secondary w-full"
        >
          <Crosshair size={18} aria-hidden />
          {locating
            ? 'Użyj obecnej pozycji'
            : hasPosition(draft) && draft.source === 'gps'
              ? 'Pobierz GPS ponownie'
              : 'Pobierz moją pozycję z GPS'}
        </button>
        <AddressSearch onPick={onAddressPick} />
      </fieldset>

      <div className="space-y-1.5">
        <label htmlFor="silo-name" className="block text-sm font-medium">
          Nazwa <span className="text-[var(--color-clay)]">*</span>
        </label>
        <input
          id="silo-name"
          name="name"
          required
          maxLength={NAME_MAX}
          value={draft.name}
          onChange={(e) => onTextChange('name', e.target.value)}
          placeholder="np. Kowalski, Zabierzów"
          aria-invalid={Boolean(fieldErrors?.name)}
          aria-describedby={fieldErrors?.name ? 'silo-name-error' : undefined}
          className="panel-input w-full"
        />
        {fieldErrors?.name && (
          <p id="silo-name-error" className="text-sm text-[var(--color-clay)]">
            {fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="silo-comment" className="block text-sm font-medium">
          Komentarz <span className="font-normal text-fg-subtle">(opcjonalnie)</span>
        </label>
        <textarea
          id="silo-comment"
          name="comment"
          rows={3}
          maxLength={COMMENT_MAX}
          value={draft.comment}
          onChange={(e) => onTextChange('comment', e.target.value)}
          placeholder="np. tynk CW, wjazd od strony lasu, odbiór po 20."
          className="panel-input w-full resize-y"
        />
        {fieldErrors?.comment && (
          <p className="text-sm text-[var(--color-clay)]">{fieldErrors.comment[0]}</p>
        )}
      </div>

      {result && !result.ok && result.error && (
        <p role="alert" className="rounded-[var(--radius-md)] bg-[var(--color-clay-soft)] p-3 text-sm">
          {result.error}
          {isNew && ' Szkic jest zapisany w telefonie, możesz wysłać go później.'}
        </p>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={onClose} className="panel-btn panel-btn--ghost flex-1">
          Anuluj
        </button>
        <button
          type="submit"
          disabled={pending || !hasPosition(draft) || locating}
          className="panel-btn panel-btn--primary flex-[2]"
        >
          {pending ? 'Zapisuję…' : 'Zapisz'}
        </button>
      </div>
    </form>
  );
}
