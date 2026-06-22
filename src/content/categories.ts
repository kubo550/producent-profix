export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  audience: Array<'fachowiec' | 'inwestor'>;
  /** Path under /public, e.g. /photos/products/beton-c-20-25.png */
  coverImage?: string;
  /** When true, this category is highlighted on the homepage grid.
   * Non-featured categories still appear in /produkty (full catalog) and the mega-menu. */
  featuredOnHome?: boolean;
  /** When true, the category is part of the current public launch: it is surfaced in the
   * navbar mega-menu, the /produkty catalog and the homepage grid. Categories without this
   * flag stay in the data (their pages still render) but are not linked anywhere yet. */
  live?: boolean;
  /** Optional muted/looping video used as a fixed page background on the category page.
   * Path under /public. When set, bgVideoPoster should accompany it. */
  bgVideo?: string;
  bgVideoPoster?: string;
  /** Optional selling-points block shown on the category page (curated, not the full product list). */
  highlightsTitle?: string;
  highlightsLead?: string;
  highlights?: Array<{ title: string; description: string }>;
  /** Trust line(s) shown under the highlights. Multiple values rotate through a ticker badge. */
  trustNote?: string | string[];
  /** Optional second selling-points block (same card layout), e.g. application & finishing. */
  highlightsSecondaryTitle?: string;
  highlightsSecondaryLead?: string;
  highlightsSecondary?: Array<{ title: string; description: string }>;
  /** Optional closing block (heading + paragraph), e.g. a brand/trust message. */
  closingTitle?: string;
  closingBody?: string;
  /** Extra search phrases (synonyms, popular query forms) emitted as <meta keywords>
   * on the category page. Real-world buyer phrasing, not just the category name. */
  seoKeywords?: string[];
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
      'Szukasz niezawodnych rozwiązań dla swojego projektu budowlanego? Tynki cementowe PROFIX to linia produktów stworzona z myślą o profesjonalistach. W zależności od wybranego rodzaju, nasze tynki gwarantują szybką i efektywną pracę, doskonałą wydajność oraz optymalną, niską gęstość nasypową.',
    audience: ['fachowiec'],
    coverImage: '/photos/products/ptc-10-v2.png',
    featuredOnHome: true,
    live: true,
    bgVideo: '/photos/about-production.mp4',
    bgVideoPoster: '/photos/about-production-poster.jpg',
    highlightsTitle: 'Dlaczego warto wybrać tynki PROFIX?',
    highlights: [
      {
        title: 'Uniwersalne zastosowanie',
        description: 'Idealne do wnętrz oraz na zewnątrz obiektów budowlanych.',
      },
      {
        title: 'Doskonałe parametry',
        description: 'Wysoka hydrofobowość (odporność na wilgoć) oraz tiksotropowość.',
      },
      {
        title: 'Wygoda pracy',
        description: 'Tynki są wyjątkowo plastyczne i łatwe w obróbce.',
      },
      {
        title: 'Szerokie spektrum użycia',
        description:
          'Optymalne dopasowanie zarówno do mniejszych prac ręcznych, jak i dużych inwestycji realizowanych maszynowo.',
      },
    ],
    trustNote: [
      'Sprawdzona polska jakość',
      'Zaufały nam tysiące firm budowlanych',
      'Produkcja w 100% w Polsce',
      'Wsparcie techniczne na każdym etapie',
    ],
    highlightsSecondaryTitle: 'Elastyczność aplikacji i wykończenia',
    highlightsSecondaryLead:
      'Tynki cementowe PROFIX dopasowują się do Twoich potrzeb w pracach ręcznych oraz maszynowych:',
    highlightsSecondary: [
      {
        title: 'Metoda nakładania',
        description: 'Ręcznie lub maszynowo (za pomocą agregatu oraz w technice silosowej).',
      },
      {
        title: 'Efekt końcowy',
        description:
          'Łatwe zacieranie ręczne lub mechaniczne pozwala uzyskać jednolitą, gładką warstwę.',
      },
      {
        title: 'Alternatywa',
        description:
          'Możliwość pozostawienia powierzchni zatartej „na ostro” pod kolejne warstwy wykończeniowe.',
      },
    ],
    closingTitle: 'Wybierz sprawdzoną polską jakość',
    closingBody:
      'Produktom PROFIX zaufały już tysiące polskich firm budowlanych. Wybierając nasze materiały, stawiasz na najwyższy standard wykończenia i jednocześnie wspierasz rodzimą gospodarkę.',
    seoKeywords: [
      'tynki cementowo-wapienne',
      'tynki wapienno-cementowe',
      'tynki cementowe',
      'tynki maszynowe',
      'tynki ręczne',
      'tynk ręczny',
      'tynki tradycyjne',
      'tynki lekkie',
      'tynk super lekki',
      'tynk z perlitem',
      'tynki gładkie',
      'tynki drobne',
      'tynki elewacyjne',
      'zaprawy tynkarskie',
      'zaprawa tynkarska lekka',
      'technika silosowa',
      'agregat tynkarski',
      'tynki Kraków',
      'tynki Małopolska',
      'tynki Krzeszowice',
      'tynki Śląsk',
    ],
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
    live: true,
    seoKeywords: [
      'kleje do dociepleń',
      'system dociepleń',
      'systemy ociepleń ETICS',
      'klej do styropianu',
      'klej do wełny',
      'zaprawa klejąca do siatki',
    ],
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
    live: true,
    seoKeywords: [
      'grunt tynkarski',
      'grunt szczepny',
      'grunt sczepny',
      'grunt polimerowy',
      'grunt pod tynki gipsowe',
      'grunt z piaskiem kwarcowym',
      'betonkontakt',
      'beton kontakt',
      'podkłady gruntujące',
      'grunt głęboko penetrujący',
      'grunt pod farby',
    ],
  },
  {
    slug: 'impregnaty',
    name: 'Impregnaty',
    short: 'Silikonowy impregnat hydrofobizujący do elewacji',
    description:
      'Impregnaty silikonowe do ochrony i renowacji elewacji. Hydrofobizują powierzchnię (efekt perlenia), chronią przed nasiąkaniem, zabrudzeniami i porostami oraz wydłużają trwałość fasady, zachowując jej paroprzepuszczalność.',
    audience: ['fachowiec', 'inwestor'],
    coverImage: '/photos/products/impregnat-waterproofing.jpg',
    live: true,
    seoKeywords: [
      'impregnat do elewacji',
      'impregnat silikonowy',
      'impregnat hydrofobowy',
      'hydrofobizacja elewacji',
      'impregnat do fasady',
      'impregnat z biocydem',
    ],
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
    live: true,
  },
  {
    slug: 'betony',
    name: 'Betony',
    short: 'Suche mieszanki betonowe C16/20, C20/25, C25/30 i C30/35',
    description:
      'Gotowe suche mieszanki betonowe w czterech klasach wytrzymałości. Do podkładów podłogowych, słupków, kotwień, napraw konstrukcyjnych i posadzek. Zgodne z normami EN 13813:2002 i EN 1504-3:2005.',
    audience: ['fachowiec', 'inwestor'],
    coverImage: '/photos/products/beton-c-20-25.png',
    featuredOnHome: true,
    live: true,
    seoKeywords: [
      'beton',
      'sucha mieszanka betonowa',
      'beton C16/20',
      'beton C20/25',
      'beton C25/30',
      'beton workowany',
      'cement',
    ],
  },
  {
    slug: 'zaprawy-murarskie',
    name: 'Zaprawy murarskie',
    short: 'Zaprawa murarska cementowo-wapienna klasy M10',
    description:
      'Sucha zaprawa murarska cementowo-wapienna klasy M10 do murowania ścian nośnych, działowych, słupów i filarów ze wszystkich powszechnie stosowanych cegieł i bloczków. Do stosowania wewnątrz i na zewnątrz. Zgodna z normą PN-EN 998-2:2016.',
    audience: ['fachowiec', 'inwestor'],
    coverImage: '/photos/materials-pallets.jpg',
    live: true,
    seoKeywords: [
      'zaprawa murarska',
      'zaprawy murarskie',
      'zaprawa murarska M10',
      'zaprawa cementowo-wapienna',
      'zaprawa do murowania ścian nośnych',
      'sucha zaprawa murarska',
    ],
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

/** Whether a category is part of the current public launch (see `Category.live`). */
export const isCategoryLive = (slug: string): boolean =>
  categories.some((c) => c.slug === slug && c.live === true);
