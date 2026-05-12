'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const subscribe = () => () => {};
const mountedClient = () => true;
const mountedServer = () => false;

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, mountedClient, mountedServer);

  // Use resolvedTheme on client to handle system preference; before mount default to light.
  const isDark = mounted ? (theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark')) : false;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-fg-muted backdrop-blur transition-colors hover:bg-[var(--color-surface-strong)] hover:text-[var(--color-fg)]"
    >
      {isDark ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
    </button>
  );
}
