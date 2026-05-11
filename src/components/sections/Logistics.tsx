import { getTranslations } from 'next-intl/server';
import { Truck, ArrowUpFromLine, Forklift, Container as ContainerIcon, Package } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const icons = [Package, Truck, Forklift, ArrowUpFromLine, ContainerIcon] as const;

export async function Logistics() {
  const t = await getTranslations('logistics');
  const fleet = t.raw('fleet') as Array<{ name: string; description: string }>;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-[0.08] blur-[120px]"
      />
      <Container size="xl">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              subtitle={t('lead')}
            />
          </Reveal>

          <Reveal delay={0.15} className="space-y-3">
            {fleet.map((item, i) => {
              const Icon = icons[i] ?? Truck;
              return (
                <div
                  key={item.name}
                  className="group flex items-start gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
                >
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform group-hover:scale-110">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
