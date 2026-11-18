import { describe, expect, it } from 'vitest';
import type { SiloDto } from '../dto';
import { boardReducer, INITIAL_BOARD } from './boardState';
import type { SiloDraft } from './draft';

const silo = { id: 's1', name: 'Kowalski', comment: null, lat: 50, lng: 19, accuracyM: 5, source: 'gps' } as SiloDto;
const draft: SiloDraft = { id: 'd1', lat: null, lng: null, accuracyM: null, source: 'gps', name: '', comment: '' };

describe('boardReducer', () => {
  it('ignores position updates while no form is open', () => {
    const s = boardReducer(INITIAL_BOARD, { type: 'setPosition', position: { lat: 1, lng: 2 }, source: 'manual', accuracyM: null });
    expect(s).toBe(INITIAL_BOARD);
  });

  it('a position update replaces location, source and accuracy of the open draft', () => {
    const creating = boardReducer(INITIAL_BOARD, { type: 'startCreate', draft });
    const s = boardReducer(creating, { type: 'setPosition', position: { lat: 1, lng: 2 }, source: 'gps', accuracyM: 9 });
    expect(s).toEqual({ mode: 'create', draft: { ...draft, lat: 1, lng: 2, source: 'gps', accuracyM: 9 } });
  });

  it('edit starts from the silo values and closing returns to that silo selected', () => {
    let s = boardReducer(INITIAL_BOARD, { type: 'startEdit', silo });
    expect(s).toEqual({
      mode: 'edit',
      draft: { id: 's1', lat: 50, lng: 19, accuracyM: 5, source: 'gps', name: 'Kowalski', comment: '' },
    });
    s = boardReducer(s, { type: 'setText', field: 'name', value: 'Nowak' });
    expect(boardReducer(s, { type: 'close' })).toEqual({ mode: 'browse', selectedId: 's1' });
  });

  it('ignores selection changes while a form is open', () => {
    const creating = boardReducer(INITIAL_BOARD, { type: 'startCreate', draft });
    expect(boardReducer(creating, { type: 'select', id: 's1' })).toBe(creating);
  });

  it('closing a new pin returns to an empty browse state', () => {
    const creating = boardReducer(INITIAL_BOARD, { type: 'startCreate', draft });
    expect(boardReducer(creating, { type: 'close' })).toEqual(INITIAL_BOARD);
  });
});
