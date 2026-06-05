import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { categories, isCategoryLive } from '@/content/categories';
import { categoryHasProducts } from '@/content/products';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'productsPage' });
  return { title: t('title'), description: t('intro') };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('productsPage');

  return (
    <>
      <PageHero eyebrow="Katalog" title={t('title')} subtitle={t('subtitle')}>
        <p className="text-base leading-relaxed text-fg-muted sm:text-lg">{t('intro')}</p>
      </PageHero>

      <section className="relative pb-20 sm:pb-28">
        <Container size="xl">
          <h2 className="mb-10 font-display text-2xl font-semibold sm:text-3xl">
            {t('categoriesTitle')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.filter((c) => isCategoryLive(c.slug) && categoryHasProducts(c.slug)).map((cat, i) => (
              <Reveal key={cat.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/produkty/${cat.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-strong)] hover:shadow-[0_20px_60px_-20px_rgba(232,132,58,0.35)]"
                >
                  <div className="relative flex flex-1 flex-col justify-between p-6">
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
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative pb-24">
        <Container size="xl">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 backdrop-blur-xl sm:flex-row sm:items-center sm:p-12">
              <div className="max-w-xl space-y-3">
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('ctaTitle')}</h2>
                <p className="text-pretty text-base leading-relaxed text-fg-muted">
                  {t('ctaDescription')}
                </p>
              </div>
              <LinkButton href="/kontakt" variant="primary" size="lg">
                <MessageSquare size={18} strokeWidth={1.75} />
                {t('ctaButton')}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
