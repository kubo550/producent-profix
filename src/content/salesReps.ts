export type SalesRep = {
  /** Stable id, used as the translation key for region labels. */
  id: string;
  name: string;
  /** Phone in tel: format, no spaces. */
  phone: string;
  /** Human-friendly phone for display. */
  phoneDisplay: string;
};

export const salesReps: SalesRep[] = [
  {
    id: 'tomasz',
    name: 'Tomasz',
    phone: '+48539664159',
    phoneDisplay: '+48 539 664 159',
  },
  {
    id: 'piotr',
    name: 'Piotr',
    phone: '+48539664157',
    phoneDisplay: '+48 539 664 157',
  },
  {
    id: 'marcin',
    name: 'Marcin',
    phone: '+48783764436',
    phoneDisplay: '+48 783 764 436',
  },
  {
    id: 'lukasz',
    name: 'Łukasz',
    phone: '+48793741321',
    phoneDisplay: '+48 793 741 321',
  },
];
