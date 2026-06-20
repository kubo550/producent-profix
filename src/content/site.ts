export const siteConfig = {
  name: 'PROFIX',
  legalName: 'F.P.H.U PROFIX Katarzyna Sokół',
  tagline: 'Kolory dla Twojego domu',
  descriptor: 'Producent materiałów wykończeniowo budowlanych',
  foundedYear: 2009,
  url: 'https://www.producent-profix.pl',
  email: 'biuro@producent-profix.pl',
  emailRodo: 'sokolp1@interia.pl',
  phone: '+48 12 270 00 32',
  phoneDisplay: '12 270 00 32',
  nip: '944-182-25-17',
  regon: '120926888',
  address: {
    street: 'ul. Sienkiewicza 20',
    postal: '32-065',
    city: 'Krzeszowice',
    country: 'PL',
  },
  social: {
    facebook: 'https://www.facebook.com/producentprofix/',
    tiktok: 'https://www.tiktok.com/@pogromcatynkow',
  },
  // Web3Forms key is public by design (frontend submission, rate-limited per key).
  // ENV var NEXT_PUBLIC_WEB3FORMS_KEY overrides this if set.
  web3formsKey: 'f24c825f-36fe-4924-b1e8-ea8f6d826d6c',
  geo: {
    lat: 50.1349,
    lng: 19.6325,
  },
} as const;

export type SiteConfig = typeof siteConfig;
