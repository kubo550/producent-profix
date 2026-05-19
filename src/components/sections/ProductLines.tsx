import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';

/** Four flagship production lines visualized to match the brand banner photo
 * (TYNKI / KLEJE / BETON / ZAPRAWY in their brand colors). */
const lines = [
  { key: 'tynki', href: '/produkty/tynki-cementowo-wapienne', color: '#4caf50' },
  { key: 'kleje', href: '/produkty/kleje', color: '#1f8fd1' },
  { key: 'beton', href: '/produkty/betony', color: '#3f4248' },
  { key: 'zaprawy', href: '/produkty/zaprawy-klejace-do-systemow-docieplen', color: '#d3203a' },
] as const;

export async function ProductLines() {
  const t = await getTranslations('productLines');

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-32 -z-10 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-[0.05] blur-[120px]"
      />
      <Container size="xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
          className="mb-16"
        />

        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl border border-[var(--color-border-strong)] bg-white shadow-[0_28px_60px_-20px_rgba(0,0,0,0.18)] lg:max-w-none">
              <Image
                src="/photos/products/beton-kontakt-banner.jpg"
                alt="Produkty PROFIX: tynki, kleje, beton, zaprawy"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="space-y-3">
            {lines.map((line) => (
              <Link
                key={line.key}
                href={line.href}
                className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 pl-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-strong)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-2"
                  style={{ backgroundColor: line.color }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">
                    {t(`items.${line.key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {t(`items.${line.key}.description`)}
                  </p>
                </div>
                <span
                  className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[var(--color-border)] text-fg-muted transition-all group-hover:border-current group-hover:text-[var(--color-fg)]"
                  style={{ color: line.color }}
                >
                  <ArrowUpRight size={18} strokeWidth={1.75} />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
