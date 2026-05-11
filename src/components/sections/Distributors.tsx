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
    <section className="relative py-24 sm:py-32">
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

              <div className="relative hidden h-64 w-64 lg:block">
                <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/15" />
                <div className="absolute inset-6 rounded-full border-2 border-dashed border-[var(--color-accent)]/40" />
                <div className="absolute inset-12 rounded-full border border-[var(--color-accent)]/30" />
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-fg)] shadow-[0_0_40px_rgba(232,132,58,0.4)]">
                  <MapPin size={22} strokeWidth={1.75} />
                </div>
                <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                  Skawina
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
