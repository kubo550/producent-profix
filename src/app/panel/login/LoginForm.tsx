'use client';

import { useActionState, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { login, type LoginState } from '@/features/auth/actions';

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            required
            aria-invalid={Boolean(state.fieldErrors?.password || state.error)}
            className="panel-input w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-[var(--radius-md)] text-fg-subtle hover:text-[var(--color-fg)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            {showPassword ? <EyeOff size={20} aria-hidden /> : <Eye size={20} aria-hidden />}
          </button>
        </div>
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
