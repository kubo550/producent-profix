'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';

export function LocaleSwitcher() {
  const current = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const switchTo = (locale: string) => {
    if (locale === current) return;
    // next-intl preserves dynamic params (e.g. [slug], [product]) when navigating across locales
    router.replace(
      // @ts-expect-error - pathname is the locale-stripped path, params shape is dynamic
      { pathname, params },
      { locale }
    );
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 text-[11px] font-semibold backdrop-blur"
    >
      {routing.locales.map((loc) => {
        const active = loc === current;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'inline-flex h-7 min-w-9 items-center justify-center rounded-full px-2.5 uppercase tracking-[0.12em] transition-colors',
              active
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
                : 'text-fg-muted hover:text-[var(--color-fg)]'
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
