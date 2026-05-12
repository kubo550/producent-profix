import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed',
});

export const localeNames: Record<(typeof routing.locales)[number], string> = {
  pl: 'Polski',
  en: 'English',
};
