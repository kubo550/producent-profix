import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';
import { categories } from '@/content/categories';

// CDN seeds per featured tile — swap with real product/material shots later
const tileSeeds = [
  'profix-cat-1',
  'profix-cat-2',
  'profix-cat-3',
  'profix-cat-4',
  'profix-cat-5',
  'profix-cat-6',
  'profix-cat-7',
  'profix-cat-8',
  'profix-cat-9',
];

export async function Categories() {
  const t = await getTranslations('categoriesSection');

  const featured = categories.filter((c) => c.featuredOnHome);
  const remaining = categories.length - featured.length;

  return (
    <section
      id="produkty"
      className="section-alt relative overflow-hidden py-24 sm:py-32"
    >
      {/* Decorative CDN material backdrop */}
      <div aria-hidden className="pointer-events-none absolute -right-20 top-20 -z-10 h-[420px] w-[420px] overflow-hidden rounded-full opacity-30">
        <Image
          src="https://picsum.photos/seed/profix-cat-hero/800/800"
          alt=""
          fill
          sizes="420px"
          className="object-cover mix-blend-multiply"
        />
      </div>

      <Container size="xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {featured.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/produkty/${cat.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[rgb(31_24_21/0.22)] hover:shadow-[var(--shadow-soft-lg)]"
              >
                {/* Photo header — material/category swatch */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-border)]">
                  <Image
                    src={`https://picsum.photos/seed/${tileSeeds[i] ?? `profix-cat-${i}`}/720/450`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="h-photo-warm object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-bg-deep)]/30 via-transparent to-transparent" />
                  <span
                    aria-hidden
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-paper)]/95 text-[var(--color-fg)] shadow-[var(--shadow-soft)] transition-all duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-accent-fg)]"
                  >
                    <ArrowUpRight size={16} strokeWidth={1.75} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3
                    className="font-display text-2xl font-medium leading-[1.1] tracking-tight transition-colors group-hover:text-[var(--color-accent)]"
                    style={{ fontVariationSettings: '"SOFT" 50, "opsz" 36' }}
                  >
                    {cat.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">
                    {cat.short}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {cat.audience.map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-fg-muted"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {remaining > 0 && (
          <Reveal delay={0.2} className="mt-12 flex justify-center">
            <Link
              href="/produkty"
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-paper)] px-7 py-3.5 text-[15px] font-medium text-[var(--color-fg)] shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[var(--shadow-soft-lg)]"
            >
              <span>
                {t('cta')}
                <span className="ml-2 font-display italic text-sm text-fg-subtle">
                  ({categories.length})
                </span>
              </span>
              <ArrowRight size={16} strokeWidth={1.75} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
