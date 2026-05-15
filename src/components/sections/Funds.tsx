import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';

export async function Funds({ hideCta = false }: { hideCta?: boolean } = {}) {
  const t = await getTranslations('funds');

  return (
    <section className="relative py-20 sm:py-24">
      <Container size="xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-deep)] shadow-[var(--shadow-soft-lg)]">
            {/* EU blue/gold tint */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#003399]/70 via-[#003399]/30 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(255,215,0,0.18),transparent_55%)]" />
            <div
              className={`relative grid items-center gap-8 p-8 sm:p-12 ${
                hideCta ? 'lg:grid-cols-[auto_1fr]' : 'lg:grid-cols-[auto_1fr_auto]'
              }`}
            >
              <div className="rounded-md bg-[var(--color-paper)] p-3 shadow-[var(--shadow-soft)]">
                <Image
                  src="/legacy/logo-eu.png"
                  alt="Fundusze Europejskie i Unia Europejska"
                  width={300}
                  height={68}
                  className="h-14 w-auto sm:h-16"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-[2px] w-10 bg-white/85" />
                  <span className="h-eyebrow text-white/85">{t('eyebrow')}</span>
                </div>
                <h2
                  className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl"
                  style={{ fontVariationSettings: '"SOFT" 50, "opsz" 48' }}
                >
                  {t('title')}
                </h2>
                <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
                  {t('description')}
                </p>
              </div>
              {!hideCta && (
                <Link
                  href="/fundusze-europejskie"
                  className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--color-paper)] px-6 py-3 text-sm font-medium text-[#003399] shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:gap-3 lg:self-center"
                >
                  {t('cta')}
                  <ArrowRight size={18} strokeWidth={1.75} />
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
