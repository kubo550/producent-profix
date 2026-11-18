import { describe, expect, it } from 'vitest';
import { siloInputSchema } from './schema';

const ID = '3f0c1d2e-8a4b-4c5d-9e6f-7a8b9c0d1e2f';
const form = { id: ID, name: '  Kowalski  ', comment: '', lat: '50.12', lng: '19.61', accuracyM: '12.6', source: 'gps' };

describe('siloInputSchema', () => {
  it('parses form strings, trims the name, stores an empty comment as null and rounds accuracy', () => {
    expect(siloInputSchema.parse(form)).toEqual({
      id: ID,
      name: 'Kowalski',
      comment: null,
      lat: 50.12,
      lng: 19.61,
      accuracyM: 13,
      source: 'gps',
    });
  });

  it.each([
    { testCase: 'blank name', patch: { name: '   ' } },
    { testCase: 'empty lat (would coerce to 0)', patch: { lat: '' } },
    { testCase: 'missing coordinates', patch: { lat: null, lng: null } },
    { testCase: 'lat out of range', patch: { lat: '91' } },
    { testCase: 'non-numeric lng', patch: { lng: 'abc' } },
    { testCase: 'non-numeric accuracy', patch: { accuracyM: 'x' } },
    { testCase: 'unknown source', patch: { source: 'telepathy' } },
    { testCase: 'non-uuid id', patch: { id: '1' } },
  ])('rejects $testCase', ({ patch }) => {
    expect(siloInputSchema.safeParse({ ...form, ...patch }).success).toBe(false);
  });

  it('treats a missing accuracy as unknown', () => {
    expect(siloInputSchema.parse({ ...form, accuracyM: '' }).accuracyM).toBeNull();
  });

  it('drops keys it does not know, such as Next.js action ids', () => {
    expect(siloInputSchema.parse({ ...form, $ACTION_ID_abc: '' })).not.toHaveProperty('$ACTION_ID_abc');
  });
});
