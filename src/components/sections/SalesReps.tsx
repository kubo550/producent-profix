import { getTranslations } from 'next-intl/server';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { salesReps } from '@/content/salesReps';

export async function SalesReps() {
  const t = await getTranslations('salesReps');

  return (
    <section id="przedstawiciele" className="relative py-24 sm:py-32">
      <Container size="xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
          className="mb-14"
        />

        <Reveal>
          <ul className="mx-auto max-w-4xl space-y-4">
            {salesReps.map((rep, index) => {
              const regions = (t.raw(`reps.${rep.id}.regions`) as string[]).join(' · ');
              return (
                <li key={rep.id}>
                  <a
                    href={`tel:${rep.phone}`}
                    className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-6 py-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-soft-lg)] sm:grid-cols-[auto_1fr_auto] sm:gap-x-8 sm:py-7"
                  >
                    <span
                      aria-hidden
                      className="font-display text-base tabular-nums text-[var(--color-accent)]"
                      style={{ fontVariationSettings: '"SOFT" 100, "opsz" 14' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-semibold leading-tight text-[var(--color-fg)] sm:text-3xl">
                        {regions}
                      </h3>
                      <p className="h-eyebrow mt-2">
                        {rep.name} · {t('role')}
                      </p>
                    </div>

                    <div className="col-start-2 flex items-center gap-3 sm:col-start-3 sm:justify-self-end">
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-fg-inverse)]">
                        <Phone size={16} strokeWidth={2} />
                      </span>
                      <span className="whitespace-nowrap text-lg font-medium tabular-nums text-[var(--color-fg)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                        {rep.phoneDisplay}
                      </span>
                      <ArrowRight
                        size={18}
                        strokeWidth={1.75}
                        className="hidden flex-none text-[var(--color-fg-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-accent)] sm:block"
                      />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
