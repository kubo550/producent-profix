import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { privacyContent } from '@/content/privacy';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPage' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `/${locale}/polityka-prywatnosci` },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacyPage');

  return (
    <>
      <PageHero eyebrow="Polityka" title={t('title')} subtitle={t('subtitle')} />

      <section className="relative pb-24">
        <Container size="md">
          <Reveal className="space-y-6 text-base leading-relaxed text-fg-muted sm:text-lg">
            {privacyContent.map((block, idx) => {
              if (block.type === 'heading') {
                return (
                  <h2
                    key={idx}
                    className="pt-4 font-display text-2xl font-semibold text-[var(--color-fg)] sm:text-3xl"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="text-pretty">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={idx} className="list-disc space-y-2 pl-6">
                    {block.items.map((item, i) => (
                      <li key={i} className="text-pretty">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'ordered') {
                return (
                  <ol key={idx} className="list-decimal space-y-4 pl-6 marker:font-mono marker:text-[var(--color-accent)]">
                    {block.items.map((item, i) => {
                      if (typeof item === 'string') {
                        return (
                          <li key={i} className="text-pretty">
                            {item}
                          </li>
                        );
                      }
                      return (
                        <li key={i} className="text-pretty">
                          {item.lead}
                          <ul className="mt-2 list-[lower-alpha] space-y-1.5 pl-6 marker:text-fg-subtle">
                            {item.sub.map((s, j) => (
                              <li key={j} className="text-pretty">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ol>
                );
              }
              return null;
            })}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
