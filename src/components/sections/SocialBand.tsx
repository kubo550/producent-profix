import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { socialLinks } from '@/components/ui/social';

/** Full-width "follow us" band rendered just above the footer.
 * Editorial styling (eyebrow + rule) keeps it consistent with the page sections,
 * while big tappable cards surface the active Facebook / TikTok channels without
 * the bloat of an embedded Page Plugin iframe. */
export async function SocialBand() {
  const t = await getTranslations('social');

  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--color-clay)] opacity-[0.08] blur-[80px]"
      />
      <Container size="xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="h-eyebrow">
              <span className="h-rule" />
              {t('eyebrow')}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted sm:text-base">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {socialLinks.map(({ key, href, label, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} ${t('handleAria')}`}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_22px_50px_-20px_rgba(0,0,0,0.4)]"
              >
                <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-accent-fg)]">
                  <Icon size={22} />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-lg font-semibold leading-tight">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-xs text-fg-muted">{t(`handle.${key}`)}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={2}
                  className="flex-none text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
