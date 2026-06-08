import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { SocialBand } from '@/components/sections/SocialBand';
import { LazyChrome } from '@/components/ui/LazyChrome';
import { siteConfig } from '@/content/site';

import '../globals.css';

const inter = Inter({
  variable: '--font-sans-display',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  axes: ['SOFT', 'opsz'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-mono-display',
  subsets: ['latin'],
  display: 'swap',
  // Used only for small decorative labels - keep it out of the render-blocking
  // preload set so it never delays first paint.
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t('title'), template: t('titleTemplate') },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      url: siteConfig.url,
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: siteConfig.name,
      images: [
        {
          url: '/photos/worker-pro.jpg',
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/photos/worker-pro.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'meta' });

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Manufacturer'],
    '@id': `${siteConfig.url}#org`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-on-light.png`,
    image: `${siteConfig.url}/photos/worker-pro.jpg`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: String(siteConfig.foundedYear),
    description: t('description'),
    vatID: siteConfig.nip,
    taxID: siteConfig.regon,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postal,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '16:00',
      },
    ],
    areaServed: { '@type': 'Country', name: 'Poland' },
    sameAs: [siteConfig.social.facebook, siteConfig.social.tiktok],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Tell Dark Reader extension to skip this site - we have our own light/dark theme.
         * Prevents hydration mismatch from extension-injected attributes. */}
        <meta name="darkreader-lock" />
        <meta name="google-site-verification" content="EqPpqj-TgwCoKtIW-qWrhspyWWHL4rdAfviDTDWLg48" />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} relative min-h-dvh font-sans`}
      >
        <ThemeProvider>
          <NextIntlClientProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-accent-fg)]"
            >
              Przejdź do treści
            </a>
            <Navbar />
            <main id="main">{children}</main>
            <SocialBand />
            <Footer />
            <LazyChrome />
          </NextIntlClientProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
