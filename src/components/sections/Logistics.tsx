import Image from 'next/image';
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
      {/* Warm decorative blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-[0.08] blur-[120px]"
      />

      <Container size="xl">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal className="space-y-8 lg:sticky lg:top-32">
            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              subtitle={t('lead')}
            />
            <div className="space-y-3">
              <figure className="relative aspect-[16/9] overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
                <Image
                  src="/photos/truck-cysterna.jpg"
                  alt="Ciężarówka PROFIX z materiałami dostarczająca na osiedle domów jednorodzinnych"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-photo-warm object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/60 via-transparent to-transparent" />
                <figcaption
                  className="absolute bottom-4 left-4 rounded-md bg-[var(--color-paper)]/95 px-3.5 py-2 font-display italic text-sm text-[var(--color-accent)] shadow-[var(--shadow-soft)]"
                  style={{ fontVariationSettings: '"SOFT" 100, "opsz" 14' }}
                >
                  — Flota PROFIX
                </figcaption>
              </figure>
              <div className="grid grid-cols-2 gap-3">
                <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-border)] shadow-[var(--shadow-soft)]">
                  <Image
                    src="/photos/truck-hds.jpg"
                    alt="Ciężarówka PROFIX z dźwigiem HDS"
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="h-photo-warm object-cover"
                  />
                </figure>
                <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-border)] shadow-[var(--shadow-soft)]">
                  <Image
                    src="/photos/truck-silo-loading.jpg"
                    alt="Cysterna PROFIX przy silosach, załadunek materiałów sypkich"
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="h-photo-warm object-cover"
                  />
                </figure>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="space-y-3">
            {fleet.map((item, i) => {
              const Icon = icons[i] ?? Truck;
              return (
                <div
                  key={item.name}
                  className="group flex items-start gap-5 rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-soft-lg)] sm:p-7"
                >
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform group-hover:scale-105">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3
                      className="font-display text-xl font-medium leading-tight tracking-tight sm:text-2xl"
                      style={{ fontVariationSettings: '"SOFT" 50, "opsz" 28' }}
                    >
                      {item.name}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
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
