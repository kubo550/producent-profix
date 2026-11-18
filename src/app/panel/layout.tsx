import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import '../globals.css';
import './panel.css';

const inter = Inter({
  variable: '--font-sans-display',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'PROFIX Silosy', template: '%s | PROFIX Silosy' },
  description: 'Panel pracownika PROFIX',
  manifest: '/panel/manifest.webmanifest',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  appleWebApp: { capable: true, title: 'Silosy', statusBarStyle: 'default' },
  icons: { apple: '/panel/icon-192.png' },
};

export const viewport: Viewport = {
  themeColor: '#224A67',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/** Outside [locale] on purpose: Polish only, none of the marketing site's chrome. */
export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Same as the main site: stop Dark Reader from rewriting colours (and breaking hydration). */}
        <meta name="darkreader-lock" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} panel-body min-h-dvh font-sans`}>
        {children}
      </body>
    </html>
  );
}
