'use client';

import dynamic from 'next/dynamic';
import { useEffect, useReducer } from 'react';
import { Crosshair } from 'lucide-react';
import type { Coordinates, LocationSource } from '../domain';
import type { SiloDto } from '../dto';
import { boardReducer, INITIAL_BOARD } from './boardState';
import { hasPosition, newDraft, usePersistedDraft } from './draft';
import { PendingDraftBanner } from './PendingDraftBanner';
import { SiloDetails } from './SiloDetails';
import { SiloForm } from './SiloForm';
import { SiloList } from './SiloList';
import { useShowAllSilosRequest } from './showAllSilos';
import { useGeolocation, type GeoFix } from './useGeolocation';

// Leaflet touches `window` on import.
const SiloMap = dynamic(() => import('./SiloMap'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center bg-[var(--color-bg-deep)] text-sm text-fg-muted">
      Ładuję mapę…
    </div>
  ),
});

type Props = {
  silos: SiloDto[];
  fallbackCenter: Coordinates;
};

export function SilosBoard({ silos, fallbackCenter }: Props) {
  const [state, dispatch] = useReducer(boardReducer, INITIAL_BOARD);
  const geo = useGeolocation();
  const pending = usePersistedDraft();
  // An open form keeps its unsent input; only a selection is dropped.
  useShowAllSilosRequest(() => {
    if (state.mode === 'browse') dispatch({ type: 'select', id: null });
  });

  const editing = state.mode !== 'browse';
  const selected =
    state.mode === 'browse' ? (silos.find((s) => s.id === state.selectedId) ?? null) : null;

  // Syncs the open "new silo" form to device storage (external system).
  const { save: saveDraft, clear: clearDraft } = pending;
  useEffect(() => {
    if (state.mode === 'create') saveDraft(state.draft);
  }, [state, saveDraft]);

  const applyGpsFix = (fix: GeoFix) =>
    dispatch({
      type: 'setPosition',
      position: fix,
      source: 'gps',
      accuracyM: Math.round(fix.accuracyM),
    });

  const setPosition = (position: Coordinates, source: LocationSource) => {
    geo.reset();
    dispatch({ type: 'setPosition', position, source, accuracyM: null });
  };

  const startGpsCreate = () => {
    dispatch({ type: 'startCreate', draft: newDraft() });
    geo.start(applyGpsFix);
  };

  // Long-press: moves the pin while a form is open, otherwise starts a new pin
  // there - but never over an unsent one.
  const pickOnMap = (position: Coordinates) => {
    if (editing) return setPosition(position, 'manual');
    if (pending.stored) return;
    dispatch({ type: 'startCreate', draft: newDraft({ ...position, source: 'manual' }) });
  };

  const close = () => {
    geo.reset();
    if (state.mode === 'create') clearDraft();
    dispatch({ type: 'close' });
  };

  const draft = editing ? state.draft : null;

  return (
    <div className="flex h-[calc(100dvh-var(--panel-header-h))] flex-col lg:flex-row">
      <div
        className={`relative shrink-0 transition-[height] duration-200 lg:h-auto lg:flex-1 ${
          editing || selected ? 'h-[30dvh]' : 'h-[45dvh]'
        }`}
      >
        <SiloMap
          silos={silos}
          selectedId={selected?.id ?? null}
          hiddenId={state.mode === 'edit' ? state.draft.id : null}
          draft={draft && hasPosition(draft) ? draft : null}
          fallbackCenter={fallbackCenter}
          onSelect={(id) => dispatch({ type: 'select', id })}
          onPick={pickOnMap}
        />
      </div>

      <aside className="flex min-h-0 flex-1 flex-col border-t border-[var(--color-border)] bg-[var(--color-bg-2)] lg:w-[420px] lg:flex-none lg:border-l lg:border-t-0">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {editing ? (
            <SiloForm
              key={state.draft.id}
              isNew={state.mode === 'create'}
              draft={state.draft}
              geo={geo.state}
              onLocate={() => geo.start(applyGpsFix)}
              onStopLocating={geo.stop}
              onAddressPick={(position) => setPosition(position, 'address')}
              onTextChange={(field, value) => dispatch({ type: 'setText', field, value })}
              onClose={close}
            />
          ) : selected ? (
            <SiloDetails
              key={selected.id}
              silo={selected}
              onEdit={() => dispatch({ type: 'startEdit', silo: selected })}
              onClose={() => dispatch({ type: 'select', id: null })}
            />
          ) : (
            <>
              {pending.stored && (
                <PendingDraftBanner
                  draft={pending.stored}
                  onResume={(stored) => dispatch({ type: 'startCreate', draft: stored })}
                  onDiscard={clearDraft}
                />
              )}
              <SiloList silos={silos} onSelect={(id) => dispatch({ type: 'select', id })} />
              <p className="text-xs text-fg-subtle">
                Wskazówka: przytrzymaj palec na mapie, żeby postawić pinezkę w wybranym miejscu.
              </p>
            </>
          )}
        </div>

        {!editing && !selected && (
          <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-2)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={startGpsCreate}
              disabled={Boolean(pending.stored)}
              aria-describedby={pending.stored ? 'pending-draft-hint' : undefined}
              className="panel-btn panel-btn--primary h-14 w-full text-base"
            >
              <Crosshair size={20} aria-hidden />
              Dodaj silos
            </button>
            {pending.stored && (
              <p id="pending-draft-hint" className="mt-2 text-center text-xs text-fg-muted">
                Najpierw dokończ albo odrzuć niewysłany silos.
              </p>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
