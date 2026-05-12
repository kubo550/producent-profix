export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  audience: Array<'fachowiec' | 'inwestor'>;
};

export const categories: Category[] = [
  {
    slug: 'farby-fasadowe-elewacyjne',
    name: 'Farby fasadowe i elewacyjne',
    short: 'Akrylowe, silikonowe, silikatowe',
    description:
      'Trwałe powłoki zewnętrzne odporne na promieniowanie UV i zmienne warunki atmosferyczne. Stosowane na elewacjach domów, budynków użyteczności publicznej i obiektów przemysłowych.',
    audience: ['fachowiec', 'inwestor'],
  },
  {
    slug: 'tynki-cementowo-wapienne',
    name: 'Tynki cementowo wapienne',
    short: 'Zaprawy tynkarskie wewnątrz i na zewnątrz',
    description:
      'Klasyczne tynki maszynowe i ręczne. Wysoka paroprzepuszczalność, dobra przyczepność do typowych podłoży budowlanych, długoletnia trwałość.',
    audience: ['fachowiec'],
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
  },
  {
    slug: 'grunty',
    name: 'Grunty',
    short: 'Preparaty gruntujące do różnych podłoży',
    description:
      'Grunty głęboko penetrujące, kontaktowe, pod farby i tynki. Poprawiają przyczepność i ujednolicają chłonność podłoża.',
    audience: ['fachowiec', 'inwestor'],
  },
  {
    slug: 'farby-wewnetrzne',
    name: 'Farby wewnętrzne',
    short: 'Lateksowe, akrylowe, sufitowe',
    description:
      'Farby do pomieszczeń mieszkalnych i użytkowych. Odporność na szorowanie, paroprzepuszczalność, gotowe bazy kolorystyczne i barwienie na zamówienie.',
    audience: ['fachowiec', 'inwestor'],
  },
  {
    slug: 'docieplenia-produkty-uzupelniajace',
    name: 'Docieplenia, produkty uzupełniające',
    short: 'Akcesoria do systemów ociepleń',
    description:
      'Listwy startowe, narożniki, siatki, łączniki, dyble. Wszystko co potrzeba do prawidłowo wykonanej elewacji ETICS.',
    audience: ['fachowiec'],
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
