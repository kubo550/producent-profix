export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  audience: Array<'fachowiec' | 'inwestor'>;
  /** Path under /public, e.g. /photos/products/beton-c-20-25.jpg */
  coverImage?: string;
  /** When true, this category is highlighted on the homepage grid.
   * Non-featured categories still appear in /produkty (full catalog) and the mega-menu. */
  featuredOnHome?: boolean;
  /** Optional muted/looping video used as a fixed page background on the category page.
   * Path under /public. When set, bgVideoPoster should accompany it. */
  bgVideo?: string;
  bgVideoPoster?: string;
  /** Optional selling-points block shown on the category page (curated, not the full product list). */
  highlightsTitle?: string;
  highlightsLead?: string;
  highlights?: Array<{ title: string; description: string }>;
  /** Short trust line shown under the highlights (e.g. "Polska produkcja · ..."). */
  trustNote?: string;
};

export const categories: Category[] = [
  {
    slug: 'farby-fasadowe-elewacyjne',
    name: 'Farby fasadowe i elewacyjne',
    short: 'Akrylowe, silikonowe, silikatowe',
    description:
      'Trwałe powłoki zewnętrzne odporne na promieniowanie UV i zmienne warunki atmosferyczne. Stosowane na elewacjach domów, budynków użyteczności publicznej i obiektów przemysłowych.',
    audience: ['fachowiec', 'inwestor'],
    featuredOnHome: true,
  },
  {
    slug: 'tynki-cementowo-wapienne',
    name: 'Tynki cementowo wapienne',
    short: 'Zaprawy tynkarskie wewnątrz i na zewnątrz',
    description:
      'Tynki cementowe PROFIX to linia stworzona z myślą o profesjonalistach. Niezawodne, wydajne i uniwersalne: sprawdzają się wewnątrz i na zewnątrz, na stropach, dużych powierzchniach oraz w obiektach remontowanych i budownictwie przemysłowym.',
    audience: ['fachowiec'],
    coverImage: '/photos/products/ptc-10.jpg',
    featuredOnHome: true,
    bgVideo: '/photos/about-production.mp4',
    bgVideoPoster: '/photos/about-production-poster.jpg',
    highlightsTitle: 'Szybkość, wydajność i najwyższa jakość',
    highlightsLead:
      'Poszczególne rodzaje różnią się uziarnieniem i wytrzymałością, ale wszystkie łączy niska gęstość nasypowa, która przekłada się na większą wydajność i szybszą pracę.',
    highlights: [
      {
        title: 'Uniwersalne zastosowanie',
        description:
          'Wnętrza i elewacje, stropy i duże powierzchnie, obiekty remontowane oraz budownictwo przemysłowe.',
      },
      {
        title: 'Hydrofobowość i tiksotropowość',
        description:
          'Wysoka odporność na wilgoć i stabilna praca na pionie oraz suficie, bez osuwania się zaprawy.',
      },
      {
        title: 'Ręcznie lub maszynowo',
        description:
          'Aplikacja agregatem i w technice silosowej. Materiał plastyczny i łatwy w obróbce.',
      },
      {
        title: 'Elastyczne wykończenie',
        description:
          'Zacieranie na gładką, jednolitą warstwę albo pozostawienie „na ostro” pod kolejne warstwy wykończeniowe.',
      },
    ],
    trustNote: 'Sprawdzona polska jakość · zaufały nam tysiące firm budowlanych',
  },
  {
    slug: 'tynki-cienkowarstwowe',
    name: 'Tynki cienkowarstwowe',
    short: 'Dekoracyjne tynki strukturalne',
    description:
      'Tynki akrylowe, silikonowe i mineralne o różnej grubości ziarna. Wykończenie elewacji w systemach dociepleń, gotowa kolorystyka lub barwienie na zamówienie.',
    audience: ['fachowiec', 'inwestor'],
  },
  {
    slug: 'tynki-produkty-uzupelniajace',
    name: 'Tynki, produkty uzupełniające',
    short: 'Grunty, podkłady, dodatki do tynków',
    description:
      'Akcesoria niezbędne do pełnego cyklu tynkowania: grunty pod tynk, podkłady kontaktowe, mieszanki specjalne.',
    audience: ['fachowiec'],
  },
  {
    slug: 'zaprawy-klejace-do-systemow-docieplen',
    name: 'Zaprawy klejące do systemów dociepleń',
    short: 'Mocowanie i zatapianie siatki',
    description:
      'Kleje do mocowania płyt styropianowych i wełny mineralnej oraz zaprawy do zatapiania siatki zbrojącej. Stosowane w systemach ETICS.',
    audience: ['fachowiec'],
    coverImage: '/photos/workers-team.jpg',
  },
  {
    slug: 'grunty',
    name: 'Grunty',
    short: 'Preparaty gruntujące do różnych podłoży',
    description:
      'Grunty głęboko penetrujące, kontaktowe, pod farby i tynki. Poprawiają przyczepność i ujednolicają chłonność podłoża.',
    audience: ['fachowiec', 'inwestor'],
    featuredOnHome: true,
    coverImage: '/photos/products/beton-kontakt-15kg.jpg',
  },
  {
    slug: 'farby-wewnetrzne',
    name: 'Farby wewnętrzne',
    short: 'Lateksowe, akrylowe, sufitowe',
    description:
      'Farby do pomieszczeń mieszkalnych i użytkowych. Odporność na szorowanie, paroprzepuszczalność, gotowe bazy kolorystyczne i barwienie na zamówienie.',
    audience: ['fachowiec', 'inwestor'],
    coverImage: '/photos/products/cat-farby-wewnetrzne.jpg',
  },
  {
    slug: 'docieplenia-produkty-uzupelniajace',
    name: 'Docieplenia, produkty uzupełniające',
    short: 'Akcesoria do systemów ociepleń',
    description:
      'Listwy startowe, narożniki, siatki, łączniki, dyble. Wszystko co potrzeba do prawidłowo wykonanej elewacji ETICS.',
    audience: ['fachowiec'],
    coverImage: '/photos/products/cat-docieplenia.jpg',
  },
  {
    slug: 'szpachle-i-gladzie',
    name: 'Szpachle i gładzie',
    short: 'Wykończenie ścian przed malowaniem',
    description:
      'Gładzie gipsowe i polimerowe, szpachle wypełniające, masy do spoinowania płyt gipsowo kartonowych.',
    audience: ['fachowiec', 'inwestor'],
  },
  {
    slug: 'kleje',
    name: 'Klej do płytek ceramicznych',
    short: 'Kleje cementowe C1 i C2',
    description:
      'Kleje do gresu, terakoty, glazury oraz płytek wielkoformatowych. Wewnątrz i na zewnątrz, na typowe i trudne podłoża.',
    audience: ['fachowiec', 'inwestor'],
    coverImage: '/photos/products/cat-kleje.jpg',
  },
  {
    slug: 'betony',
    name: 'Betony',
    short: 'Suche mieszanki betonowe C16/20, C20/25, C25/30',
    description:
      'Gotowe suche mieszanki betonowe w trzech klasach wytrzymałości. Do podkładów podłogowych, słupków, kotwień, napraw konstrukcyjnych i posadzek. Zgodne z normami EN 13813:2002 i EN 1504-3:2005.',
    audience: ['fachowiec', 'inwestor'],
    coverImage: '/photos/products/beton-c-20-25.jpg',
    featuredOnHome: true,
  },
  {
    slug: 'inne-produkty',
    name: 'Inne produkty',
    short: 'Pozostały asortyment budowlany',
    description:
      'Produkty uzupełniające ofertę: preparaty specjalne, akcesoria, materiały na zamówienie indywidualne.',
    audience: ['fachowiec', 'inwestor'],
  },
];

export const getCategory = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
