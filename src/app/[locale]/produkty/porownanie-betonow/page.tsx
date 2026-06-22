import { setRequestLocale } from 'next-intl/server';
import { Check, Minus, ArrowRight, ArrowLeft, MessageSquare, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { Link } from '@/i18n/navigation';
import { getProduct } from '@/content/products';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/content/site';

const CATEGORY = 'betony';

// Ordered by strength grade; no hero - choice depends on required class.
const COLS: ReadonlyArray<{ code: string; slug: string; hero?: boolean }> = [
  { code: 'C16/20', slug: 'beton-c-16-20' },
  { code: 'C20/25', slug: 'beton-c-20-25' },
  { code: 'C25/30', slug: 'beton-c-25-30' },
  { code: 'C30/35', slug: 'beton-c-30-35' },
];

const ROWS: Array<{ label: string; values: Array<string | boolean> }> = [
  { label: 'Wytrzymałość po 28 dniach', values: ['≥ 20 MPa', '≥ 25 MPa', '≥ 30 MPa', '≥ 35 MPa'] },
  { label: 'Uziarnienie', values: ['0–4 mm', '0–4 mm', '0–4 mm', '0–4 mm'] },
  { label: 'Wnętrza', values: [true, true, true, true] },
  { label: 'Na zewnątrz', values: [false, true, true, true] },
  { label: 'Elementy konstrukcyjne (nadproża, belki)', values: [false, true, true, true] },
  { label: 'Mrozoodporny', values: [true, true, true, true] },
  { label: 'Zużycie (warstwa 1 cm)', values: ['~20 kg/m²', '~20 kg/m²', '~20 kg/m²', '~20 kg/m²'] },
  { label: 'Opakowanie', values: ['25 kg', '25 kg', '25 kg', '25 kg'] },
  {
    label: 'Norma',
    values: [
      'EN 13813:2002',
      'EN 13813:2002',
      'EN 13813:2002 + EN 1504-3:2005',
      'EN 13813:2002 + EN 1504-3:2005',
    ],
  },
  { label: 'Dostępny luzem (technika silosowa)', values: [true, true, true, true] },
];

const SCENARIOS = [
  {
    when: 'Podkład podłogowy lub posadzka wewnątrz budynku',
    pick: 'C16/20',
    why: 'Ekonomiczna mieszanka o wytrzymałości ≥20 MPa do typowych podkładów, posadzek i kotwień wewnątrz.',
  },
  {
    when: 'Prace wewnątrz i na zewnątrz, z mrozoodpornością',
    pick: 'C20/25',
    why: 'Uniwersalny beton ≥25 MPa, mrozoodporny i odporny na warunki atmosferyczne.',
  },
  {
    when: 'Naprawy i elementy pod większym obciążeniem',
    pick: 'C25/30',
    why: 'Wyższa klasa ≥30 MPa z dodatkową deklaracją do napraw konstrukcyjnych (EN 1504-3).',
  },
  {
    when: 'Najwyższe wymagania i prace inżynierskie',
    pick: 'C30/35',
    why: 'Najwyższa wytrzymałość ≥35 MPa w linii betonów PROFIX, do zastosowań inżynierskich.',
  },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Betony PROFIX – porównanie C16/20, C20/25, C25/30 i C30/35',
    description:
      'Porównaj suche mieszanki betonowe PROFIX: klasy C16/20, C20/25, C25/30 i C30/35. Wytrzymałość, zastosowanie wewnątrz i na zewnątrz oraz normy – dobierz beton prosto od producenta z Krzeszowic.',
    keywords: [
      'porównanie betonów profix',
      'jaki beton wybrać',
      'beton C16/20 C20/25 C25/30 C30/35',
      'sucha mieszanka betonowa',
      'beton workowany klasa wytrzymałości',
    ],
    alternates: { canonical: `/${locale}/produkty/porownanie-betonow` },
  };
}

export default async function ConcreteComparisonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = COLS.map((c) => getProduct(CATEGORY, c.slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  const base = `${siteConfig.url}/${locale}`;
  const categoryUrl = `${base}/produkty/${CATEGORY}`;
  const pageUrl = `${base}/produkty/porownanie-betonow`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'Produkty', item: `${base}/produkty` },
      { '@type': 'ListItem', position: 3, name: 'Betony', item: categoryUrl },
      { '@type': 'ListItem', position: 4, name: 'Porównanie betonów', item: pageUrl },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Porównanie betonów PROFIX',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: COLS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Beton ${c.code} – sucha mieszanka betonowa PROFIX`,
      url: `${categoryUrl}/${c.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHero
        eyebrow="Porównanie"
        title="Betony PROFIX – który wybrać?"
        subtitle="C16/20, C20/25, C25/30 i C30/35 – różnice w klasie wytrzymałości, zastosowaniu i normach."
      >
        <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
          Wszystkie cztery suche mieszanki betonowe produkujemy w Krzeszowicach. Poniżej porównanie
          parametrów i krótki przewodnik, który pomoże dobrać właściwą klasę betonu do Twojej budowy.
        </p>
      </PageHero>

      {/* Comparison table */}
      <section className="relative pb-16 pt-4 sm:pb-20">
        <Container size="xl">
          <Link
            href={`/produkty/${CATEGORY}`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-[var(--color-fg)]"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            Betony
          </Link>

          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-xl">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="sticky left-0 z-10 bg-[var(--color-surface)] p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                    Parametr
                  </th>
                  {COLS.map((c) => (
                    <th
                      key={c.code}
                      className={`p-4 font-display text-base font-semibold ${
                        c.hero ? 'text-[var(--color-accent)]' : 'text-[var(--color-fg)]'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {c.hero && <Star size={13} strokeWidth={2} className="fill-current" />}
                        {c.code}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <th className="sticky left-0 z-10 bg-[var(--color-surface)] p-4 text-left text-[13px] font-medium text-fg-muted">
                      {row.label}
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={`p-4 align-top ${
                          COLS[i].hero ? 'bg-[var(--color-accent-soft)] text-[var(--color-fg)]' : 'text-fg-muted'
                        }`}
                      >
                        {typeof v === 'boolean' ? (
                          v ? (
                            <>
                              <Check size={16} strokeWidth={2} aria-hidden className="text-[var(--color-accent)]" />
                              <span className="sr-only">Tak</span>
                            </>
                          ) : (
                            <>
                              <Minus size={16} strokeWidth={2} aria-hidden className="text-fg-subtle" />
                              <span className="sr-only">Nie</span>
                            </>
                          )
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-fg-subtle">
            Pełne karty techniczne, deklaracje właściwości użytkowych i karty charakterystyki
            udostępniamy na stronach poszczególnych produktów.
          </p>
        </Container>
      </section>

      {/* Decision guide */}
      <section className="section-alt relative py-16 sm:py-20">
        <Container size="xl">
          <h2 className="mb-10 font-display text-2xl font-semibold sm:text-3xl">
            Który beton wybrać?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SCENARIOS.map((s, i) => (
              <Reveal key={s.pick} delay={(i % 2) * 0.06}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 backdrop-blur-xl">
                  <p className="text-base font-medium text-[var(--color-fg)]">{s.when}</p>
                  <p className="text-sm leading-relaxed text-fg-muted">{s.why}</p>
                  <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-fg)]">
                    Wybierz {s.pick}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Product cards */}
      {products.length > 0 && (
        <section className="relative py-16 sm:py-20">
          <Container size="xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">Zobacz produkty</h2>
              <Link
                href={`/produkty/${CATEGORY}`}
                className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-[var(--color-accent)]"
              >
                Cała kategoria
                <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="relative pb-24">
        <Container size="md">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold sm:text-2xl">
                Nie wiesz, który beton zamówić?
              </h2>
              <p className="mt-1 text-sm text-fg-muted">
                Doradzimy dobór klasy do obciążeń i podpowiemy najbliższego dystrybutora.
              </p>
            </div>
            <LinkButton href="/kontakt" variant="primary" size="lg" className="flex-none">
              <MessageSquare size={18} strokeWidth={1.75} />
              Zapytaj producenta
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
