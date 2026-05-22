import { getTranslations } from 'next-intl/server';
import { ExternalLink, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from './ContactForm';
import { siteConfig } from '@/content/site';

export async function Contact() {
  const t = await getTranslations('contact');

  return (
    <section id="kontakt" className="relative py-24 sm:py-32">
      <Container size="xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
          className="mb-16"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-3">
            <ContactCard
              icon={<MapPin size={18} strokeWidth={1.75} />}
              label={t('directLabels.address')}
              value={
                <>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postal} {siteConfig.address.city}
                </>
              }
            />
            <ContactCard
              icon={<Phone size={18} strokeWidth={1.75} />}
              label={t('directLabels.phone')}
              value={
                <a href={`tel:${siteConfig.phone}`} className="hover:text-[var(--color-accent)]">
                  {siteConfig.phoneDisplay}
                </a>
              }
            />
            <ContactCard
              icon={<Mail size={18} strokeWidth={1.75} />}
              label={t('directLabels.email')}
              value={
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all hover:text-[var(--color-accent)]"
                >
                  {siteConfig.email}
                </a>
              }
            />
            <ContactCard
              icon={<Clock size={18} strokeWidth={1.75} />}
              label={t('directLabels.hours')}
              value={t('hours')}
            />
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-12">
          <MapEmbed />
        </Reveal>
      </Container>
    </section>
  );
}

function MapEmbed() {
  const address = `${siteConfig.address.street}, ${siteConfig.address.postal} ${siteConfig.address.city}`;
  const query = encodeURIComponent(address);
  const embedSrc = `https://maps.google.com/maps?q=${query}&hl=pl&z=15&output=embed`;
  const openUrl = `https://maps.google.com/?q=${query}`;
  return (
    <div className="relative overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)]">
      <iframe
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mapa: ${address}`}
        className="h-72 w-full sm:h-96"
        style={{ border: 0, filter: 'sepia(0.15) contrast(0.95)' }}
      />
      <a
        href={openUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-paper)] px-3.5 py-2 text-xs font-medium text-[var(--color-fg)] shadow-[var(--shadow-soft)] transition-all hover:gap-3"
      >
        <MapPin size={14} strokeWidth={1.75} />
        Otwórz w Google Maps
        <ExternalLink size={12} strokeWidth={1.75} />
      </a>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="group flex items-start gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] p-5 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-soft-lg)]">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
        {icon}
      </div>
      <div>
        <p className="h-eyebrow">{label}</p>
        <p className="mt-1.5 text-base text-[var(--color-fg)]">{value}</p>
      </div>
    </div>
  );
}
