import * as z from 'zod';
import { COMMENT_MAX, LOCATION_SOURCES, NAME_MAX } from './domain';

/** Form fields arrive as strings; '' and missing must stay "no value", not 0. */
const emptyToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

function coordinate(min: number, max: number, label: string) {
  return z.preprocess(
    emptyToUndefined,
    z.coerce
      .number({ error: 'Brak lokalizacji. Pobierz GPS, wyszukaj adres albo wskaż miejsce na mapie.' })
      .min(min, { error: `Nieprawidłowa ${label}.` })
      .max(max, { error: `Nieprawidłowa ${label}.` }),
  );
}

/**
 * Generated on the device when a draft starts, so resending a draft whose
 * first save reached the server (but not its reply) does not create a duplicate.
 */
const id = z.uuid({ error: 'Nieprawidłowy identyfikator silosu.' });

const name = z
  .string({ error: 'Podaj nazwę.' })
  .trim()
  .min(1, { error: 'Podaj nazwę.' })
  .max(NAME_MAX, { error: `Nazwa może mieć maksymalnie ${NAME_MAX} znaków.` });

const comment = z
  .string()
  .trim()
  .max(COMMENT_MAX, { error: `Komentarz może mieć maksymalnie ${COMMENT_MAX} znaków.` })
  .nullish()
  .transform((v) => v || null);

const accuracyM = z
  .preprocess(emptyToUndefined, z.coerce.number().nonnegative().optional())
  .transform((v) => (v === undefined ? null : Math.round(v)));

export const siloInputSchema = z.object({
  id,
  name,
  comment,
  lat: coordinate(-90, 90, 'szerokość geograficzna'),
  lng: coordinate(-180, 180, 'długość geograficzna'),
  accuracyM,
  source: z.enum(LOCATION_SOURCES, { error: 'Nieznane źródło lokalizacji.' }),
});
export type SiloInput = z.infer<typeof siloInputSchema>;

export const siloIdSchema = z.object({ id });

export const geocodeSchema = z.object({
  query: z
    .string()
    .trim()
    .min(3, { error: 'Wpisz co najmniej 3 znaki adresu.' })
    .max(200, { error: 'Adres jest za długi.' }),
});
