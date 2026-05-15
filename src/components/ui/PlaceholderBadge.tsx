import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/cn';

/**
 * Small badge overlaid on placeholder (CDN/illustrative) images so it's
 * unambiguous to clients/visitors that the photo isn't final brand content.
 * Positioned absolutely — caller controls placement via className.
 */
export async function PlaceholderBadge({
  className,
}: {
  className?: string;
}) {
  const t = await getTranslations('common');
  return (
    <span
      className={cn(
        'absolute z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-paper)]/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-subtle shadow-[var(--shadow-soft)] backdrop-blur-sm',
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
      {t('placeholderImage')}
    </span>
  );
}
