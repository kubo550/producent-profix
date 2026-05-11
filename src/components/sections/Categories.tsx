import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';
import { LinkButton } from '@/components/ui/Button';
import { categories } from '@/content/categories';

export async function Categories() {
  const t = await getTranslations('categoriesSection');

  return (
    <section id="produkty" className="relative py-24 sm:py-32">
      <Container size="xl">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
          <LinkButton href="/produkty" variant="secondary" size="md">
            {t('cta')}
            <ArrowUpRight size={16} strokeWidth={1.75} />
          </LinkButton>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/produkty/${cat.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-strong)] hover:shadow-[0_20px_60px_-20px_rgba(232,132,58,0.35)]"
              >
                <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-fg-muted)] transition-all group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-accent-fg)]">
                  <ArrowUpRight size={16} strokeWidth={1.75} />
                </div>
                <div className="space-y-3 pr-12">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-xl font-semibold leading-tight transition-colors group-hover:text-[var(--color-accent)]">
                    {cat.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{cat.short}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-fg-subtle">
                  {cat.audience.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-[var(--color-border)] px-2 py-0.5 capitalize"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
