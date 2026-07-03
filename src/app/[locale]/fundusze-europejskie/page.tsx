import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CalendarCheck, MapPin, Sparkles, Target } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Funds } from '@/components/sections/Funds';
import { Reveal } from '@/components/ui/Reveal';
import { fundsProjects, statusLabel } from '@/content/funds';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fundsPage' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: { canonical: `/${locale}/fundusze-europejskie` },
  };
}

export default async function FundsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('fundsPage');

  return (
    <>
      <PageHero eyebrow="Fundusze Europejskie" title={t('title')} subtitle={t('subtitle')}>
        <p className="text-pretty text-base leading-[1.7] text-fg-muted sm:text-lg">
          {t('intro')}
        </p>
      </PageHero>

      <Funds hideCta />


      <section className="relative pb-24">
        <Container size="md">
          <div className="space-y-12">
            {fundsProjects.map((project, idx) => (
              <Reveal
                key={project.slug}
                delay={idx * 0.08}
                className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 backdrop-blur-xl sm:p-10"
              >
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
                    <Sparkles size={12} strokeWidth={1.75} />
                    Projekt B+R
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-fg-muted">
                    {statusLabel[project.status]}
                  </span>
                  {project.endDate && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-fg-muted">
                      <CalendarCheck size={12} strokeWidth={1.75} />
                      Do {project.endDate}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-fg-muted">
                    <MapPin size={12} strokeWidth={1.75} />
                    {project.location}
                  </span>
                </div>

                <h2 className="text-balance font-display text-2xl font-semibold leading-tight sm:text-3xl">
                  {project.title}
                </h2>

                <p className="mt-5 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
                  {project.summary}
                </p>

                <div className="mt-8">
                  <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                    Zakres projektu
                  </h3>
                  <ol className="space-y-3 text-base leading-relaxed text-fg-muted">
                    {project.scope.map((item, i) => {
                      if (typeof item === 'string') {
                        return (
                          <li key={i} className="flex gap-3">
                            <span className="flex-none font-mono text-[var(--color-accent)]">
                              {i + 1}.
                            </span>
                            <span className="text-pretty">{item}</span>
                          </li>
                        );
                      }
                      return (
                        <li key={i} className="flex gap-3">
                          <span className="flex-none font-mono text-[var(--color-accent)]">
                            {i + 1}.
                          </span>
                          <div className="space-y-2">
                            <span className="text-pretty">{item.heading}</span>
                            <ul className="space-y-1.5 pl-1 text-sm">
                              {item.items.map((sub, j) => (
                                <li key={j} className="flex gap-2 text-pretty">
                                  <span className="text-[var(--color-accent)]">-</span>
                                  <span>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="mt-8 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
                    <Target size={14} strokeWidth={1.75} />
                    Efekt
                  </div>
                  <p className="text-pretty text-base leading-relaxed text-[var(--color-fg)]">
                    {project.outcome}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
