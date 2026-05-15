import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  // 'always' = symmetric URLs (/pl/..., /en/...). Combined with localeDetection:false this
  // makes the URL the single source of truth — switching language sticks across navigation
  // instead of getting overridden by Accept-Language on every middleware pass.
  localePrefix: 'always',
  localeDetection: false,
});

export const localeNames: Record<(typeof routing.locales)[number], string> = {
  pl: 'Polski',
  en: 'English',
};
