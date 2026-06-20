import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { products } from './src/content/products';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

// Permanent redirects from the old (WordPress) URLs to the new locale-prefixed
// routes. Reclaims the SEO equity of the old pages and stops Google/users from
// hitting 404s. `permanent: true` issues a 308 (treated like a 301 by Google).
// Extend `legacyRedirects` as more old URLs surface in the Search Console
// "Strony" report. Note: hacked spam paths (e.g. /kasyno-*) are deliberately
// NOT redirected - they should keep returning 404 so Google drops them.
const legacyRedirects = [
  { source: '/o-firmie', destination: '/pl/o-firmie' },
  { source: '/dla-fachowca', destination: '/pl/dla-fachowca' },
  { source: '/dla-fachowca/deklaracje-wlasciwosci-uzytkowych', destination: '/pl/dla-fachowca' },
  { source: '/dla-inwestora', destination: '/pl/dla-inwestora' },
  { source: '/przetargi', destination: '/pl/przetargi' },
  { source: '/fundusze-europejskie', destination: '/pl/fundusze-europejskie' },
  { source: '/kontakt', destination: '/pl/kontakt' },
  { source: '/polityka-prywatnosci', destination: '/pl/polityka-prywatnosci' },
  { source: '/category/kleje', destination: '/pl/produkty/kleje' },
  { source: '/zaprawa-beton-b-20', destination: '/pl/produkty/betony/beton-c-16-20' },
];

// The old site served products at a flat root slug (e.g. /ptc-15-tynk-wapienno-
// cementowy-super-lekki/). Those flat URLs are what currently rank in Google -
// map each one to its new nested route so the ranking/equity transfers instead
// of dying on a 404. Slugs are unchanged, so this is a 1:1 mapping.
const flatProductRedirects = products
  .filter((p) => !p.draft)
  .map((p) => ({
    source: `/${p.slug}`,
    destination: `/pl/produkty/${p.categorySlug}/${p.slug}`,
  }));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'loremflickr.com' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
      ...flatProductRedirects.map((r) => ({ ...r, permanent: true })),
      // Old category URLs lived under /produkty/... without the locale prefix.
      { source: '/produkty/:path*', destination: '/pl/produkty/:path*', permanent: true },
      // Catch any remaining old WordPress category URLs and send them to the
      // product catalog rather than a 404.
      { source: '/category/:slug*', destination: '/pl/produkty', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
