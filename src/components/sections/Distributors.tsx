import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { MapPin, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge';
import { distributors } from '@/content/distributors';

export async function Distributors() {
  const t = await getTranslations('distributorsSection');

  return (
    <section className="section-alt relative py-24 sm:py-32">
      <Container size="xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] shadow-[var(--shadow-soft-lg)]">
            <div className="grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
              <div className="space-y-7">
                <SectionHeading
                  eyebrow={t('eyebrow')}
                  title={t('title')}
                  subtitle={t('subtitle')}
                />
                {distributors.length === 0 && (
                  <p className="flex items-start gap-3 rounded-md border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-2)] p-5 text-sm text-fg-muted">
                    <MapPin
                      size={18}
                      strokeWidth={1.75}
                      className="mt-0.5 flex-none text-[var(--color-accent)]"
                    />
                    <span>
                      <span className="font-display italic text-sm text-[var(--color-accent)] mr-2" style={{ fontVariationSettings: '"SOFT" 100, "opsz" 14' }}>
                        — Wkrótce
                      </span>
                      {t('empty')}
                    </span>
                  </p>
                )}
                <LinkButton href="#kontakt" variant="primary" size="md">
                  <Search size={16} strokeWidth={1.75} />
                  {t('cta')}
                </LinkButton>
              </div>

              <PlaceholderImage />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * CDN placeholder — swap with branded photo / interactive map when distributors list lands.
 */
function PlaceholderImage() {
  return (
    <figure className="relative hidden h-80 w-80 overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)] lg:block">
      <Image
        src="https://picsum.photos/seed/profix-distributors/640/640"
        alt=""
        fill
        sizes="320px"
        className="h-photo-warm object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/30 via-transparent to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/55 to-transparent" />
      <figcaption className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[var(--color-paper)]/95 px-3 py-1.5 shadow-[var(--shadow-soft)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg)]">
          Krzeszowice · HQ
        </span>
      </figcaption>
      <p
        className="absolute bottom-4 left-4 right-4 font-display italic text-sm text-[var(--color-fg-inverse)]"
        style={{ fontVariationSettings: '"SOFT" 100, "opsz" 14' }}
      >
        — Małopolska, PL
      </p>
      <PlaceholderBadge className="bottom-4 right-4" />
    </figure>
  );
}
