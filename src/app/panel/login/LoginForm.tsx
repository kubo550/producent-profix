'use client';

import { useActionState } from 'react';
import { login, type LoginState } from '@/features/auth/actions';

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="space-y-1.5">
        <label htmlFor="displayName" className="block text-sm font-medium">
          Twoje imię
        </label>
        <input
          id="displayName"
          name="displayName"
          autoComplete="given-name"
          required
          maxLength={40}
          defaultValue={state.displayName}
          placeholder="np. Janek"
          aria-invalid={Boolean(state.fieldErrors?.displayName)}
          aria-describedby="displayName-hint"
          className="panel-input w-full"
        />
        <p id="displayName-hint" className="text-xs text-fg-subtle">
          {state.fieldErrors?.displayName?.[0] ?? 'Pokaże się przy pinezkach, które dodasz.'}
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium">
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={Boolean(state.fieldErrors?.password || state.error)}
          className="panel-input w-full"
        />
        {state.fieldErrors?.password && (
          <p className="text-sm text-[var(--color-clay)]">{state.fieldErrors.password[0]}</p>
        )}
      </div>

      {state.error && (
        <p role="alert" className="rounded-[var(--radius-md)] bg-[var(--color-clay-soft)] p-3 text-sm">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="panel-btn panel-btn--primary h-14 w-full text-base">
        {pending ? 'Loguję…' : 'Zaloguj'}
      </button>
    </form>
  );
}
