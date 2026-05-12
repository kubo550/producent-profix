import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, Check, MessageSquare, Package, Thermometer, Clock, Droplets, Brush, AlertTriangle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { getCategory } from '@/content/categories';
import { products, getProduct } from '@/content/products';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/content/site';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.categorySlug, product: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; product: string }>;
}) {
  const { slug, product } = await params;
  const p = getProduct(slug, product);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; product: string }>;
}) {
  const { locale, slug, product } = await params;
  setRequestLocale(locale);

  const cat = getCategory(slug);
  const p = getProduct(slug, product);
  if (!cat || !p) notFound();

  const t = await getTranslations('productPage');

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    brand: { '@type': 'Brand', name: p.brand ?? siteConfig.name },
    manufacturer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    category: cat.name,
    url: `${siteConfig.url}/produkty/${cat.slug}/${p.slug}`,
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
      {
        '@type': 'ListItem',
        position: 4,
        name: p.name,
        item: `${siteConfig.url}/produkty/${cat.slug}/${p.slug}`,
      },
    ],
  };

  const specRows: Array<{ icon: React.ReactNode; label: string; value: string }> = [];
  if (p.packaging) specRows.push({ icon: <Package size={16} strokeWidth={1.75} />, label: t('specs.packaging'), value: p.packaging });
  if (p.consumption) specRows.push({ icon: <Droplets size={16} strokeWidth={1.75} />, label: t('specs.consumption'), value: p.consumption });
  if (p.mixing) specRows.push({ icon: <Brush size={16} strokeWidth={1.75} />, label: t('specs.mixing'), value: p.mixing });
  if (p.tempRange) specRows.push({ icon: <Thermometer size={16} strokeWidth={1.75} />, label: t('specs.temperature'), value: p.tempRange });
  if (p.shelfLife) specRows.push({ icon: <Clock size={16} strokeWidth={1.75} />, label: t('specs.shelfLife'), value: p.shelfLife });

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
      <PageHero
        eyebrow={cat.name}
        title={p.name}
        subtitle={p.tagline}
      >
        {p.brand && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {p.brand}
          </span>
        )}
      </PageHero>

      <section className="relative pb-20">
        <Container size="xl">
          <Link
            href={`/produkty/${cat.slug}`}
            className="mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-[var(--color-fg)]"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            {cat.name}
          </Link>

          <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
            <Reveal className="space-y-10">
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                  {t('sections.description')}
                </p>
                <p className="text-pretty text-lg leading-relaxed text-fg-muted">
                  {p.description}
                </p>
              </div>

              {p.features.length > 0 && (
                <div className="space-y-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                    {t('sections.features')}
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 backdrop-blur-xl"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-fg)]">
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                        <span className="text-sm text-fg-muted">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                  {t('sections.usage')}
                </p>
                <p className="text-pretty text-base leading-relaxed text-fg-muted">{p.usage}</p>
              </div>

              {p.application && (
                <div className="space-y-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                    {t('sections.application')}
                  </p>
                  <p className="text-pretty text-base leading-relaxed text-fg-muted">
                    {p.application}
                  </p>
                </div>
              )}

              {p.notes && p.notes.length > 0 && (
                <div className="rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-fg)]">
                      <AlertTriangle size={14} strokeWidth={1.75} />
                    </span>
                    <ul className="space-y-1 text-sm text-[var(--color-accent)]">
                      {p.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Reveal>

            <Reveal delay={0.15} className="space-y-5 lg:sticky lg:top-32">
              {specRows.length > 0 && (
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 backdrop-blur-xl">
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                    {t('sections.specs')}
                  </p>
                  <dl className="space-y-3">
                    {specRows.map((row) => (
                      <div key={row.label} className="flex items-start gap-3 border-b border-[var(--color-border)] pb-3 last:border-b-0 last:pb-0">
                        <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                          {row.icon}
                        </span>
                        <div className="flex-1">
                          <dt className="text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                            {row.label}
                          </dt>
                          <dd className="mt-0.5 text-sm font-medium text-[var(--color-fg)]">
                            {row.value}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <LinkButton href="/kontakt" variant="primary" size="lg" className="w-full">
                <MessageSquare size={18} strokeWidth={1.75} />
                {t('cta')}
              </LinkButton>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
