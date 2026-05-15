import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Heritage section heading — small caps eyebrow + serif title + warm rule.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  inverse,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** Inverse colors for dark-spread sections. */
  inverse?: boolean;
}) {
  const eyebrowColor = inverse ? 'text-[var(--color-fg-inverse-muted)]' : 'text-[var(--color-fg-muted)]';
  const subtitleColor = inverse ? 'text-[var(--color-fg-inverse-muted)]' : 'text-fg-muted';

  return (
    <div
      className={cn(
        'max-w-3xl space-y-5',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className="h-rule" />
          <span className={cn('h-eyebrow', eyebrowColor)}>{eyebrow}</span>
        </div>
      )}
      <h2
        className="font-display text-balance text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-[3.75rem]"
        style={{ fontVariationSettings: '"SOFT" 50, "opsz" 72' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-pretty text-lg leading-[1.65] sm:text-xl',
            align === 'center' && 'mx-auto',
            subtitleColor,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
