import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageSquare,
  Package,
  Thermometer,
  Clock,
  Droplets,
  Brush,
  AlertTriangle,
  ShieldCheck,
  Ruler,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { CategoryHighlights } from '@/components/ui/CategoryHighlights';
import { Link } from '@/i18n/navigation';
import { getCategory } from '@/content/categories';
import { publishedProducts, getProduct, getProductsByCategory } from '@/content/products';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/content/site';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    publishedProducts.map((p) => ({ locale, slug: p.categorySlug, product: p.slug }))
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

  const productUrl = `${siteConfig.url}/${locale}/produkty/${cat.slug}/${p.slug}`;
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    brand: { '@type': 'Brand', name: p.brand ?? siteConfig.name },
    manufacturer: { '@id': `${siteConfig.url}#org` },
    category: cat.name,
    url: productUrl,
    ...(p.image ? { image: `${siteConfig.url}${p.image}` } : {}),
    ...(p.norms && p.norms.length > 0 ? { hasEnergyConsumptionDetails: undefined, additionalProperty: p.norms.map((n) => ({ '@type': 'PropertyValue', name: 'Norm', value: n })) } : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Produkty', item: `${siteConfig.url}/${locale}/produkty` },
      {
        '@type': 'ListItem',
        position: 3,
        name: cat.name,
        item: `${siteConfig.url}/${locale}/produkty/${cat.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: p.name,
        item: productUrl,
      },
    ],
  };

  const specRows: Array<{ icon: React.ReactNode; label: string; value: string }> = [];
  if (p.packaging) specRows.push({ icon: <Package size={16} strokeWidth={1.75} />, label: t('specs.packaging'), value: p.packaging });
  if (p.consumption) specRows.push({ icon: <Droplets size={16} strokeWidth={1.75} />, label: t('specs.consumption'), value: p.consumption });
  if (p.mixing) specRows.push({ icon: <Brush size={16} strokeWidth={1.75} />, label: t('specs.mixing'), value: p.mixing });
  if (p.tempRange) specRows.push({ icon: <Thermometer size={16} strokeWidth={1.75} />, label: t('specs.temperature'), value: p.tempRange });
  if (p.shelfLife) specRows.push({ icon: <Clock size={16} strokeWidth={1.75} />, label: t('specs.shelfLife'), value: p.shelfLife });
  if (p.extraSpecs) {
    for (const s of p.extraSpecs) {
      specRows.push({ icon: <Ruler size={16} strokeWidth={1.75} />, label: s.label, value: s.value });
    }
  }

  // Related products - same category, current excluded, capped at 3.
  const related = getProductsByCategory(cat.slug)
    .filter((x) => x.slug !== p.slug)
    .slice(0, 3);

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
      {p.image ? (
        <section className="relative pb-12 pt-36 sm:pb-20 sm:pt-44">
          <span className="atmo-quiet sr-only" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-32 -z-10 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-[0.07] blur-[120px]"
          />
          <Container size="xl">
            <div className="relative">
              {/* Large product render - bleeds right, transparent so it floats on the
                  page; the copy is allowed to overlap it (per brand direction). */}
              <div className="pointer-events-none absolute -right-[4%] top-1/2 z-[5] hidden aspect-square w-[58%] max-w-3xl -translate-y-1/2 lg:block">
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.34] blur-[90px] dark:opacity-[0.18]"
                />
                <Image
                  src={p.image}
                  alt={`${p.name}, opakowanie produktu`}
                  fill
                  priority
                  sizes="60vw"
                  className="object-contain drop-shadow-[0_45px_90px_rgba(0,0,0,0.55)]"
                />
              </div>
              <div className="relative z-10 max-w-xl space-y-6 lg:max-w-2xl lg:[&_h1]:text-halo lg:[&_p]:text-halo">
                <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
                  <Link href="/" className="transition-colors hover:text-[var(--color-accent)]">
                    {t('breadcrumb.home')}
                  </Link>
                  <span aria-hidden className="text-fg-subtle/60">/</span>
                  <Link href="/produkty" className="transition-colors hover:text-[var(--color-accent)]">
                    {t('breadcrumb.products')}
                  </Link>
                  <span aria-hidden className="text-fg-subtle/60">/</span>
                  <Link
                    href={`/produkty/${cat.slug}`}
                    className="transition-colors hover:text-[var(--color-accent)]"
                  >
                    {cat.name}
                  </Link>
                  <span aria-hidden className="text-fg-subtle/60">/</span>
                  <span aria-current="page" className="text-fg-muted">
                    {p.brand ?? p.name}
                  </span>
                </nav>
                <div className="flex flex-wrap items-center gap-2">
                  {p.brand && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      {p.brand}
                    </span>
                  )}
                  {p.norms?.map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] font-medium text-fg-muted backdrop-blur"
                    >
                      <ShieldCheck size={12} strokeWidth={2} className="text-[var(--color-accent)]" />
                      {n}
                    </span>
                  ))}
                </div>
                <h1 className="text-balance font-display text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl xl:text-7xl">
                  {p.name}
                </h1>
                <p className="text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl">
                  {p.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <LinkButton href="/kontakt" variant="primary" size="lg">
                    <MessageSquare size={18} strokeWidth={1.75} />
                    {t('cta')}
                  </LinkButton>
                  {p.packaging && (
                    <span className="inline-flex items-center gap-2 text-sm text-fg-muted">
                      <Package size={16} strokeWidth={1.75} className="text-[var(--color-accent)]" />
                      {p.packaging}
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile / tablet: render stacked below the copy */}
              <div className="relative mx-auto mt-10 aspect-square w-full max-w-md lg:hidden">
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.30] blur-[70px] dark:opacity-[0.16]"
                />
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <PageHero eyebrow={cat.name} title={p.name} subtitle={p.tagline}>
          <div className="flex flex-wrap items-center gap-2">
            {p.brand && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {p.brand}
              </span>
            )}
            {p.norms?.map((n) => (
              <span
                key={n}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] font-medium text-fg-muted backdrop-blur"
              >
                <ShieldCheck size={12} strokeWidth={2} className="text-[var(--color-accent)]" />
                {n}
              </span>
            ))}
          </div>
        </PageHero>
      )}

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

      {cat.highlights && (
        <CategoryHighlights items={cat.highlights} title={t('sections.lineBenefits')} />
      )}

      {related.length > 0 && (
        <section className="section-alt relative py-20">
          <Container size="xl">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                {t('sections.related')}
              </h2>
              <Link
                href={`/produkty/${cat.slug}`}
                className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-[var(--color-accent)]"
              >
                {cat.name}
                <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp, i) => (
                <Reveal key={rp.slug} delay={(i % 3) * 0.06}>
                  <ProductCard product={rp} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
