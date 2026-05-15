import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { MapPin, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { distributors } from '@/content/distributors';

export async function Distributors() {
  const t = await getTranslations('distributorsSection');

  return (
    <section className="section-alt relative py-24 sm:py-32">
      <Container size="xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 backdrop-blur-xl sm:p-12">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
              <div className="space-y-6">
                <SectionHeading
                  eyebrow={t('eyebrow')}
                  title={t('title')}
                  subtitle={t('subtitle')}
                />
                {distributors.length === 0 && (
                  <p className="flex items-start gap-3 rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-2)] p-5 text-sm text-fg-muted">
                    <MapPin
                      size={18}
                      strokeWidth={1.75}
                      className="mt-0.5 flex-none text-[var(--color-accent)]"
                    />
                    {t('empty')}
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
 * TEMP: generic placeholder image from picsum.photos (CDN).
 * Seeded so the rendered image stays stable across deploys.
 * Replace with branded photo / map once client provides distributors list.
 */
function PlaceholderImage() {
  return (
    <div className="relative hidden h-72 w-72 overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] lg:block">
      <Image
        src="https://picsum.photos/seed/profix-distributors/600/600"
        alt=""
        fill
        sizes="288px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/30 via-transparent to-transparent mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">
          Krzeszowice · HQ
        </span>
      </div>
    </div>
  );
}
