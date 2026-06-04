import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, BadgeCheck, Check, MessageSquare } from 'lucide-react';
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

  const hasBgVideo = Boolean(cat.bgVideo);

  return (
    <div className={hasBgVideo ? 'isolate' : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
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
            <Reveal className={`space-y-6 ${hasBgVideo ? '[&_p]:text-halo [&_p]:!text-[var(--color-fg)]' : ''}`}>
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

      {cat.highlights && cat.highlights.length > 0 && (
        <section className="relative pb-20">
          <Container size="xl">
            <Reveal className="max-w-2xl space-y-3">
              {cat.highlightsTitle && (
                <h2
                  className={`font-display text-2xl font-semibold sm:text-3xl ${hasBgVideo ? 'text-halo' : ''}`}
                >
                  {cat.highlightsTitle}
                </h2>
              )}
              {cat.highlightsLead && (
                <p
                  className={`text-pretty text-base leading-relaxed text-fg-muted ${hasBgVideo ? 'text-halo' : ''}`}
                >
                  {cat.highlightsLead}
                </p>
              )}
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cat.highlights.map((h, i) => (
                <Reveal key={h.title} delay={(i % 4) * 0.06}>
                  <div className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/85 p-5 backdrop-blur-2xl">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                      <Check size={16} strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold leading-tight">
                      {h.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{h.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {cat.trustNote && (
              <Reveal delay={0.1}>
                <p
                  className={`mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/85 px-4 py-2 text-sm text-fg-muted backdrop-blur-2xl ${hasBgVideo ? 'text-halo' : ''}`}
                >
                  <BadgeCheck size={16} strokeWidth={1.75} className="text-[var(--color-accent)]" />
                  {cat.trustNote}
                </p>
              </Reveal>
            )}
          </Container>
        </section>
      )}

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
    </div>
  );
}
