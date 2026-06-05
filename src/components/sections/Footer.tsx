import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/content/site';

export async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  const company = [
    { href: '/o-firmie' as const, key: 'about' },
    { href: '/fundusze-europejskie' as const, key: 'funds' },
    { href: '/przetargi' as const, key: 'tenders' },
    { href: '/kontakt' as const, key: 'contact' },
    { href: '/polityka-prywatnosci' as const, key: 'privacy' },
  ];

  const products = [
    { href: '/produkty' as const, key: 'products' },
    { href: '/dla-fachowca' as const, key: 'professional', disabled: true },
    { href: '/dla-inwestora' as const, key: 'investor', disabled: true },
  ];

  return (
    <footer className="relative mt-16 border-t border-[var(--color-border)] bg-[var(--color-bg-2)] py-16">
      <Container size="xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
          {/* Brand column */}
          <div className="space-y-6">
            <Link href="/" aria-label={siteConfig.name} className="inline-block">
              {/* Dark-ink logo on the light footer; white + red on dark theme */}
              <Image
                src="/brand/logo-transparent.png"
                alt={siteConfig.name}
                width={2400}
                height={1500}
                className="block h-20 w-auto dark:hidden sm:h-24"
              />
              <Image
                src="/brand/logo-white.png"
                alt={siteConfig.name}
                width={2400}
                height={1500}
                className="hidden h-20 w-auto dark:block sm:h-24"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-fg-muted">{t('tagline')}</p>
            <address className="not-italic space-y-2 text-sm text-fg-muted">
              <p className="flex items-start gap-2.5">
                <MapPin
                  size={14}
                  strokeWidth={1.75}
                  className="mt-0.5 flex-none text-[var(--color-accent)]"
                />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.postal} {siteConfig.address.city}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone
                  size={14}
                  strokeWidth={1.75}
                  className="flex-none text-[var(--color-accent)]"
                />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-[var(--color-fg)]">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail
                  size={14}
                  strokeWidth={1.75}
                  className="flex-none text-[var(--color-accent)]"
                />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all hover:text-[var(--color-fg)]"
                >
                  {siteConfig.email}
                </a>
              </p>
            </address>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-paper)] text-[var(--color-fg-muted)] shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <FooterCol title={t('sections.company')}>
            {company.map((l) => (
              <FooterLink key={l.key} href={l.href}>
                {t(`links.${l.key}`)}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={t('sections.products')}>
            {products.map((l) => (
              <FooterLink key={l.key} href={l.href} disabled={l.disabled}>
                {t(`links.${l.key}`)}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border)] pt-8 text-xs text-fg-subtle sm:flex-row sm:items-center">
          <p>
            &copy; {year} {siteConfig.legalName}. {t('rights')}
          </p>
          <p className="font-mono">
            Made by{' '}
            <a
              href="https://jakubkurdziel.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted transition-colors hover:text-[var(--color-accent)]"
            >
              jk.dev
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <p className="h-eyebrow">{title}</p>
      <ul className="space-y-2.5">
        {Array.isArray(children) ? (
          children.map((c, i) => <li key={i}>{c}</li>)
        ) : (
          <li>{children}</li>
        )}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  disabled,
}: {
  href:
    | '/o-firmie'
    | '/produkty'
    | '/dla-fachowca'
    | '/dla-inwestora'
    | '/fundusze-europejskie'
    | '/przetargi'
    | '/kontakt'
    | '/polityka-prywatnosci';
  children: React.ReactNode;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        title="Wkrótce"
        className="text-sm text-[var(--color-fg-subtle)] opacity-60 cursor-not-allowed select-none"
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="text-sm text-fg-muted transition-colors hover:text-[var(--color-fg)]"
    >
      {children}
    </Link>
  );
}
