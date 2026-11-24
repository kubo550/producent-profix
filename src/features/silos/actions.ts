'use server';

import * as z from 'zod';
import { refresh } from 'next/cache';
import { getSession } from '@/features/auth/session';
import { getGeocoder, getSiloService } from './container';
import type { GeocodeResult } from './geocoder';
import { geocodeSchema, siloIdSchema, siloInputSchema } from './schema';
import { SiloNotFoundError, SiloStateError } from './service';

// Server actions are public POST endpoints: each one re-checks the session and validates input itself.

export type ActionResult =
  | { ok: true }
  | { ok: false; error?: string; fieldErrors?: Record<string, string[] | undefined> };

const SESSION_EXPIRED = 'Sesja wygasła. Odśwież stronę i zaloguj się ponownie.';

async function withActor(run: (actor: string) => Promise<unknown>): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: SESSION_EXPIRED };
  try {
    await run(session.name);
  } catch (err) {
    if (err instanceof SiloNotFoundError) {
      return { ok: false, error: 'Nie znaleziono silosu. Odśwież stronę.' };
    }
    if (err instanceof SiloStateError) return { ok: false, error: err.message };
    console.error('[silos] action failed', err);
    return { ok: false, error: 'Nie udało się zapisać. Spróbuj ponownie za chwilę.' };
  }
  refresh();
  return { ok: true };
}

function invalid(error: z.ZodError): ActionResult {
  return { ok: false, fieldErrors: z.flattenError(error).fieldErrors };
}

export async function createSilo(_prev: ActionResult | null, formData: FormData) {
  const parsed = siloInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  return withActor((actor) => getSiloService().create(parsed.data, actor));
}

export async function updateSilo(_prev: ActionResult | null, formData: FormData) {
  const parsed = siloInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  return withActor((actor) => getSiloService().update(parsed.data, actor));
}

type IdCommand = 'confirm' | 'markCollected' | 'restore';

async function runIdCommand(command: IdCommand, id: string): Promise<ActionResult> {
  const parsed = siloIdSchema.safeParse({ id });
  if (!parsed.success) return invalid(parsed.error);
  return withActor((actor) => getSiloService()[command](parsed.data.id, actor));
}

export async function confirmSilo(id: string) {
  return runIdCommand('confirm', id);
}

export async function markSiloCollected(id: string) {
  return runIdCommand('markCollected', id);
}

export async function restoreSilo(id: string) {
  return runIdCommand('restore', id);
}

export type GeocodeActionResult =
  | { ok: true; results: GeocodeResult[] }
  | { ok: false; error: string };

export async function geocodeAddress(query: string): Promise<GeocodeActionResult> {
  if (!(await getSession())) return { ok: false, error: SESSION_EXPIRED };

  const parsed = geocodeSchema.safeParse({ query });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Nieprawidłowy adres.' };
  }
  try {
    const results = await getGeocoder().search(parsed.data.query);
    return results.length
      ? { ok: true, results }
      : { ok: false, error: 'Nie znaleziono adresu. Postaw pinezkę ręcznie, przytrzymując palec na mapie.' };
  } catch (err) {
    console.error('[silos] geocoding failed', err);
    return { ok: false, error: 'Wyszukiwarka adresów nie odpowiada. Postaw pinezkę ręcznie na mapie.' };
  }
}
