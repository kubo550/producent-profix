import type { Coordinates, LocationSource } from '../domain';
import type { SiloDto } from '../dto';
import type { SiloDraft } from './draft';

export type BoardState =
  | { mode: 'browse'; selectedId: string | null }
  | { mode: 'create'; draft: SiloDraft }
  | { mode: 'edit'; draft: SiloDraft };

export type BoardAction =
  | { type: 'select'; id: string | null }
  | { type: 'startCreate'; draft: SiloDraft }
  | { type: 'startEdit'; silo: SiloDto }
  | { type: 'setPosition'; position: Coordinates; source: LocationSource; accuracyM: number | null }
  | { type: 'setText'; field: 'name' | 'comment'; value: string }
  | { type: 'close' };

export const INITIAL_BOARD: BoardState = { mode: 'browse', selectedId: null };

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'select':
      return state.mode === 'browse' ? { mode: 'browse', selectedId: action.id } : state;

    case 'startCreate':
      return { mode: 'create', draft: action.draft };

    case 'startEdit': {
      const { id, lat, lng, accuracyM, source, name, comment } = action.silo;
      return { mode: 'edit', draft: { id, lat, lng, accuracyM, source, name, comment: comment ?? '' } };
    }

    case 'setPosition':
      if (state.mode === 'browse') return state;
      return {
        ...state,
        draft: { ...state.draft, ...action.position, source: action.source, accuracyM: action.accuracyM },
      };

    case 'setText':
      if (state.mode === 'browse') return state;
      return { ...state, draft: { ...state.draft, [action.field]: action.value } };

    case 'close':
      // After editing, stay on the silo that was edited.
      return { mode: 'browse', selectedId: state.mode === 'edit' ? state.draft.id : null };
  }
}
