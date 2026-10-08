import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowUpRight, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { googleProfileUrl, googleRating, reviews } from '@/content/reviews';

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="flex gap-0.5 text-[var(--color-accent)]" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} strokeWidth={1.5} fill={i < Math.round(value) ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

export async function Reviews() {
  const t = await getTranslations('reviewsSection');
  const locale = await getLocale();
  const rating = googleRating.value.toLocaleString(locale, { minimumFractionDigits: 1 });

  return (
    <section id="opinie" className="relative py-24 sm:py-32">
      <Container size="xl">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
          <a
            href={googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-none items-center gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-6 py-4 shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--color-accent)]"
          >
            <span className="font-display text-4xl font-medium">{rating}</span>
            <span className="space-y-1">
              <Stars value={googleRating.value} />
              <span className="flex items-center gap-1 text-sm text-fg-muted group-hover:text-[var(--color-accent)]">
                {t('count', { count: googleRating.count })}
                <ArrowUpRight size={14} strokeWidth={1.75} />
              </span>
            </span>
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.author} delay={i * 0.08}>
              <figure className="flex h-full flex-col gap-5 rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] p-7 shadow-[var(--shadow-soft)]">
                <Stars value={r.rating} />
                <blockquote className="flex-1 text-pretty leading-relaxed text-[var(--color-fg)]">
                  „{r.text}”
                </blockquote>
                <figcaption className="text-sm text-fg-muted">
                  <span className="font-semibold text-[var(--color-fg)]">{r.author}</span> · {t('source')}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
