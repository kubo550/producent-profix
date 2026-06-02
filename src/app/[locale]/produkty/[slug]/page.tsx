import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { Link } from '@/i18n/navigation';
import { categories, getCategory } from '@/content/categories';
import { getProductsByCategory } from '@/content/products';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/content/site';
import { pluralPl } from '@/lib/plural';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const cat = getCategory(slug);
  if (!cat) notFound();

  const t = await getTranslations('categoryPage');
  const productList = getProductsByCategory(slug);

  const audienceLabel: Record<typeof cat.audience[number], string> = {
    fachowiec: t('professional'),
    inwestor: t('investor'),
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: cat.name,
    description: cat.description,
    brand: { '@type': 'Brand', name: siteConfig.name },
    manufacturer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    category: 'Materiały budowlane',
    url: `${siteConfig.url}/produkty/${cat.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Produkty', item: `${siteConfig.url}/produkty` },
      {
        '@type': 'ListItem',
        position: 3,
        name: cat.name,
        item: `${siteConfig.url}/produkty/${cat.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHero eyebrow="Kategoria" title={cat.name} subtitle={cat.short} />

      <section className="relative pb-20">
        <Container size="xl">
          <Link
            href="/produkty"
            className="mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-[var(--color-fg)]"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            {t('back')}
          </Link>

          <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="space-y-6">
              <p className="text-pretty text-lg leading-relaxed text-fg-muted">
                {cat.description}
              </p>
              <p className="text-pretty text-base leading-relaxed text-fg-muted">{t('intro')}</p>
            </Reveal>

            <Reveal delay={0.15} className="space-y-5">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 backdrop-blur-xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                  {t('applicableFor')}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.audience.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-3 py-1 text-sm text-[var(--color-accent)]"
                    >
                      {audienceLabel[a]}
                    </span>
                  ))}
                </div>
              </div>

              <LinkButton href="/kontakt" variant="primary" size="lg" className="w-full">
                <MessageSquare size={18} strokeWidth={1.75} />
                {t('cta')}
              </LinkButton>
            </Reveal>
          </div>
        </Container>
      </section>

      {productList.length > 0 && (
        <section className="relative pb-24">
          <Container size="xl">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                {t('productsTitle')}
              </h2>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                {productList.length}{' '}
                {pluralPl(
                  productList.length,
                  t('productsCountOne'),
                  t('productsCountFew'),
                  t('productsCountMany')
                )}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {productList.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
