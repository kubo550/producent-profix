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

const CATEGORY = 'tynki-cementowo-wapienne';

// Display order: hero product (PTC-15) is highlighted but the table keeps the
// natural numeric order for scannability.
const COLS: ReadonlyArray<{ code: string; slug: string; hero?: boolean }> = [
  { code: 'PTC-10', slug: 'ptc-10-tynk-wapienno-cementowy' },
  { code: 'PTC-11', slug: 'ptc-11-tynk-cementowo-wapienny-drobnoziarnisty-lekki' },
  { code: 'PTC-12', slug: 'ptc-12-tynk-cementowo-wapienny-lekki' },
  { code: 'PTC-15', slug: 'ptc-15-tynk-wapienno-cementowy-super-lekki', hero: true },
];

// Curated comparison matrix (values per column, in COLS order).
const ROWS: Array<{ label: string; values: Array<string | boolean> }> = [
  { label: 'Uziarnienie', values: ['0,1–0,5 mm', '0,1–0,4 mm', '0,1–0,8 mm', '0,1–0,4 mm'] },
  {
    label: 'Masa / lekkość',
    values: ['Standard', 'Lekki (perlit)', 'Lekki (perlit)', 'Super lekki (perlit + napowietrzenie)'],
  },
  { label: 'Wnętrze', values: [true, true, true, true] },
  { label: 'Na zewnątrz', values: [false, false, true, false] },
  { label: 'Gładkie wykończenie', values: [false, true, false, true] },
  { label: 'Wydajność', values: ['Standard', 'Standard', 'Standard', '+ ok. 40%, tiksotropowy'] },
  { label: 'Zużycie (warstwa 10 mm)', values: ['14 kg/m²', '12 kg/m²', '14 kg/m²', '~12 kg/m²'] },
  { label: 'Opakowanie', values: ['30 kg', '30 kg', '30 kg', '30 kg'] },
  { label: 'Dostępny luzem (technika silosowa)', values: [true, true, true, true] },
  { label: 'Norma', values: ['PN-EN 998-1:2004', 'PN-EN 998-1:2004', 'PN-EN 998-1:2004', 'PN-EN 998-1:2016'] },
];

const SCENARIOS = [
  {
    when: 'Gładka ściana i sufit wewnątrz, mniej materiału na m²',
    pick: 'PTC-15',
    why: 'Drobne ziarno 0,1–0,4 mm na gładko + perlit = ok. 40% większa wydajność.',
  },
  {
    when: 'Elewacja albo ściana zewnętrzna',
    pick: 'PTC-12',
    why: 'Lekki tynk o wyższej wytrzymałości, dopuszczony do stosowania na zewnątrz.',
  },
  {
    when: 'Cienka warstwa wykończeniowa na gładko (szlichta)',
    pick: 'PTC-11',
    why: 'Drobnoziarnisty i lekki, łatwo zacierany na gładko jako warstwa końcowa.',
  },
  {
    when: 'Klasyczny, sprawdzony tynk podkładowy w dobrej cenie',
    pick: 'PTC-10',
    why: 'Uniwersalny tynk standardowy o sprawdzonej wytrzymałości pod tynki ozdobne i farby.',
  },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Tynki cementowo-wapienne PROFIX – porównanie PTC-10, PTC-11, PTC-12 i PTC-15',
    description:
      'Porównaj tynki PROFIX: PTC-10, PTC-11, PTC-12 i gładki super lekki PTC-15. Uziarnienie, lekkość, wydajność i zastosowanie – dobierz tynk prosto od producenta z Krzeszowic.',
    keywords: [
      'porównanie tynków profix',
      'profix ptc-15 vs ptc-12',
      'który tynk cementowo-wapienny wybrać',
      'PTC-10 PTC-11 PTC-12 PTC-15',
      'tynk gładki czy lekki',
    ],
    alternates: { canonical: `/${locale}/produkty/porownanie-tynkow` },
  };
}

export default async function PlasterComparisonPage({
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
  const pageUrl = `${base}/produkty/porownanie-tynkow`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'Produkty', item: `${base}/produkty` },
      { '@type': 'ListItem', position: 3, name: 'Tynki cementowo wapienne', item: categoryUrl },
      { '@type': 'ListItem', position: 4, name: 'Porównanie tynków', item: pageUrl },
    ],
  };

  // Hero product (PTC-15) listed first - it is the recommended default.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Porównanie tynków cementowo-wapiennych PROFIX',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: COLS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${c.code} – tynk cementowo-wapienny PROFIX`,
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
        title="Tynki cementowo-wapienne PROFIX – który wybrać?"
        subtitle="PTC-10, PTC-11, PTC-12 i PTC-15 – różnice w uziarnieniu, wadze, wydajności i zastosowaniu."
      >
        <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
          Wszystkie cztery tynki produkujemy w Krzeszowicach. Poniżej porównanie parametrów i krótki
          przewodnik, który pomoże dobrać właściwy tynk do Twojej budowy.
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
            Tynki cementowo wapienne
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
                            <Check size={16} strokeWidth={2} className="text-[var(--color-accent)]" />
                          ) : (
                            <Minus size={16} strokeWidth={2} className="text-fg-subtle" />
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
            Pełne karty techniczne i deklaracje właściwości użytkowych udostępniamy na stronach
            poszczególnych produktów.
          </p>
        </Container>
      </section>

      {/* Decision guide */}
      <section className="section-alt relative py-16 sm:py-20">
        <Container size="xl">
          <h2 className="mb-10 font-display text-2xl font-semibold sm:text-3xl">
            Który tynk wybrać?
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
                Nie wiesz, który tynk zamówić?
              </h2>
              <p className="mt-1 text-sm text-fg-muted">
                Doradzimy dobór do podłoża i podpowiemy najbliższego dystrybutora.
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
