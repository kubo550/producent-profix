import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ArrowRight, MessageSquare, GitCompareArrows } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { CategoryHighlights } from '@/components/ui/CategoryHighlights';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
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
  const { locale, slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    ...(cat.seoKeywords?.length ? { keywords: cat.seoKeywords } : {}),
    alternates: { canonical: `/${locale}/produkty/${slug}` },
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

  const base = `${siteConfig.url}/${locale}`;
  const categoryUrl = `${base}/produkty/${cat.slug}`;

  // A category is a collection of products, not a single Product. Use
  // CollectionPage + ItemList so the markup matches the page and Google does
  // not flag invalid/incomplete Product fields.
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.name,
    description: cat.description,
    url: categoryUrl,
    isPartOf: { '@id': `${siteConfig.url}#website` },
    about: { '@id': `${siteConfig.url}#org` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: productList.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `${categoryUrl}/${p.slug}`,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'Produkty', item: `${base}/produkty` },
      {
        '@type': 'ListItem',
        position: 3,
        name: cat.name,
        item: categoryUrl,
      },
    ],
  };

  const hasBgVideo = Boolean(cat.bgVideo);

  return (
    <div className={hasBgVideo ? 'isolate' : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {hasBgVideo && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {cat.bgVideoPoster && (
            <Image
              src={cat.bgVideoPoster}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <video
            src={cat.bgVideo}
            poster={cat.bgVideoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            className="relative h-full w-full object-cover motion-reduce:hidden"
          />
          <div className="absolute inset-0 bg-[var(--color-bg)]/70 motion-reduce:bg-[var(--color-bg)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/45 via-[var(--color-bg)]/25 to-[var(--color-bg)]/80" />
        </div>
      )}

      {hasBgVideo ? (
        <div className="[&_.h-eyebrow]:text-halo [&_h1]:text-halo [&_p]:text-halo">
          <PageHero eyebrow="Kategoria" title={cat.name} subtitle={cat.short} />
        </div>
      ) : (
        <PageHero eyebrow="Kategoria" title={cat.name} subtitle={cat.short} />
      )}

      {/* Lead + social proof + CTA up top, then the products straight away. */}
      <section className="relative pb-12">
        <Container size="xl">
          <Link
            href="/produkty"
            className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-[var(--color-fg)]"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            {t('back')}
          </Link>

          <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
            <Reveal
              className={`space-y-5 ${
                hasBgVideo ? '[&_p]:text-halo [&_p]:!text-[var(--color-fg)]' : ''
              }`}
            >
              <p className="text-pretty text-lg leading-relaxed text-fg-muted">
                {cat.description}
              </p>
              {cat.trustNote && (
                <RotatingBadge
                  items={Array.isArray(cat.trustNote) ? cat.trustNote : [cat.trustNote]}
                  halo={hasBgVideo}
                />
              )}
            </Reveal>

            <Reveal delay={0.12} className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                  {t('applicableFor')}
                </span>
                {cat.audience.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-3 py-1 text-sm text-[var(--color-accent)]"
                  >
                    {audienceLabel[a]}
                  </span>
                ))}
              </div>
              <LinkButton href="/kontakt" variant="primary" size="lg" className="w-full">
                <MessageSquare size={18} strokeWidth={1.75} />
                {t('cta')}
              </LinkButton>
              <p
                className={`text-sm leading-relaxed text-fg-muted${
                  hasBgVideo ? ' text-halo' : ''
                }`}
              >
                {t('intro')}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {slug === 'tynki-cementowo-wapienne' && (
        <section className="relative pb-8">
          <Container size="xl">
            <Reveal>
              <Link
                href="/produkty/porownanie-tynkow"
                className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-6 transition-colors hover:border-[var(--color-accent)]"
              >
                <span className="flex items-center gap-3">
                  <GitCompareArrows
                    size={22}
                    strokeWidth={1.75}
                    className="flex-none text-[var(--color-accent)]"
                  />
                  <span className="font-medium text-[var(--color-fg)]">
                    Nie wiesz, który tynk wybrać? Porównaj PTC-10, PTC-11, PTC-12 i PTC-15
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)]">
                  Porównanie tynków
                  <ArrowRight
                    size={15}
                    strokeWidth={1.75}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {slug === 'betony' && (
        <section className="relative pb-8">
          <Container size="xl">
            <Reveal>
              <Link
                href="/produkty/porownanie-betonow"
                className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-6 transition-colors hover:border-[var(--color-accent)]"
              >
                <span className="flex items-center gap-3">
                  <GitCompareArrows
                    size={22}
                    strokeWidth={1.75}
                    className="flex-none text-[var(--color-accent)]"
                  />
                  <span className="font-medium text-[var(--color-fg)]">
                    Nie wiesz, który beton wybrać? Porównaj C16/20, C20/25, C25/30 i C30/35
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)]">
                  Porównanie betonów
                  <ArrowRight
                    size={15}
                    strokeWidth={1.75}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {productList.length > 0 && (
        <section className="relative pb-24">
          <Container size="xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2
                className={`font-display text-2xl font-semibold sm:text-3xl${
                  hasBgVideo ? ' text-halo' : ''
                }`}
              >
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

      {cat.highlights && (
        <CategoryHighlights
          items={cat.highlights}
          title={cat.highlightsTitle}
          lead={cat.highlightsLead}
          halo={hasBgVideo}
        />
      )}

      {cat.highlightsSecondary && (
        <CategoryHighlights
          items={cat.highlightsSecondary}
          title={cat.highlightsSecondaryTitle}
          lead={cat.highlightsSecondaryLead}
          halo={hasBgVideo}
        />
      )}

      {cat.closingTitle && cat.closingBody && (
        <section className="relative pb-20">
          <Container size="xl">
            <Reveal className="max-w-2xl space-y-3">
              <h2
                className={`font-display text-2xl font-semibold sm:text-3xl${
                  hasBgVideo ? ' text-halo' : ''
                }`}
              >
                {cat.closingTitle}
              </h2>
              <p
                className={`text-pretty text-base leading-relaxed text-fg-muted${
                  hasBgVideo ? ' text-halo' : ''
                }`}
              >
                {cat.closingBody}
              </p>
            </Reveal>
          </Container>
        </section>
      )}
    </div>
  );
}
