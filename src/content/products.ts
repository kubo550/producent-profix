export type Product = {
  slug: string;
  categorySlug: string;
  name: string;
  brand?: string;
  tagline: string;
  /** Short, scannable differentiator shown as a chip on the catalog card
   * (e.g. "Wewnątrz · 0,1–0,4 mm"). Helps distinguish near-identical products. */
  highlight?: string;
  description: string;
  features: string[];
  usage: string;
  application?: string;
  mixing?: string;
  consumption?: string;
  packaging?: string;
  tempRange?: string;
  shelfLife?: string;
  notes?: string[];
  /** Path under /public, e.g. /photos/products/beton-c-16-20.png */
  image?: string;
  /** Additional images for gallery */
  gallery?: string[];
  /** Norm compliance, e.g. ["EN 13813:2002"] */
  norms?: string[];
  /** Extra spec fields shown in the technical sidebar */
  extraSpecs?: Array<{ label: string; value: string }>;
  /** Downloadable documents (technical data sheet, declaration of performance, etc.).
   * `href` is a path under /public, e.g. /dokumenty/profix-ptc-15-karta-techniczna.pdf */
  documents?: Array<{ label: string; href: string }>;
  /** When true, product is hidden everywhere (catalog list, detail page, navbar).
   * Use for placeholders awaiting full content from client - flip to undefined/false to publish. */
  draft?: boolean;
  /** Extra search phrases (synonyms, popular query forms) emitted as <meta keywords>
   * on the product page. Use real-world phrasing buyers type, not exact product names. */
  seoKeywords?: string[];
  /** Custom SEO meta description for the product page (<160 chars ideal).
   * Falls back to `tagline` when absent. */
  metaDescription?: string;
  /** Questions and answers rendered as a visible FAQ block and emitted as
   * FAQPage structured data - targets long-tail / "People also ask" queries
   * (drying time, consumption, hand vs machine, differences between products). */
  faq?: Array<{ q: string; a: string }>;
};

export const products: Product[] = [
  // === GRUNTY ===
  {
    slug: 'grunt-betonkontakt',
    categorySlug: 'grunty',
    name: 'Beton Kontakt, grunt polimerowo-kwarcowy',
    brand: 'PROFIX BK',
    tagline: 'Grunt sczepny pod tynki, gładzie i posadzki na trudnych podłożach',
    description:
      'Grunt polimerowo-kwarcowy o silnej sile sczepnej. Dzięki zawartości kruszywa kwarcowego tworzy szorstką powierzchnię, która znacząco zwiększa przyczepność tynków cementowych i gipsowych do gładkich podłoży takich jak beton.',
    features: [
      'Zwiększa przyczepność tynków do betonu',
      'Z kruszywem kwarcowym (efekt szorstkości)',
      'Szybki czas schnięcia (~2 h)',
      'Wodorozcieńczalny, łagodny zapach',
      'Do stosowania wewnątrz i na zewnątrz',
    ],
    usage:
      'Gruntowanie i wzmacnianie podłoży budowlanych. Zwiększa przyczepność tynków cementowych i gipsowych do betonu. Pod kleje, gładzie, posadzki, farby, okładziny ceramiczne, betonowe i kamionkowe. Również pod gładzie szpachlowe, tapety, płyty paździerzowe i drewnopochodne.',
    application:
      'Podłoże musi być czyste, suche i wolne od substancji obniżających przyczepność (kurz, brud, wapno, olej, tłuszcz, wosk, stare farby). Nanosić pędzlem, wałkiem lub pistoletem. Unikać opadów i silnego nasłonecznienia. Czas schnięcia ok. 2 godzin.',
    consumption: 'ok. 0,25 kg/m² (zależnie od chłonności podłoża)',
    packaging: '15 kg / 23 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    image: '/photos/products/beton-kontakt-15kg.jpg',
    gallery: [
      '/photos/products/beton-kontakt-15kg.jpg',
      '/photos/products/beton-kontakt-23kg.jpg',
      '/photos/products/beton-kontakt-banner.jpg',
    ],
    documents: [
      { label: 'Karta techniczna', href: '/dokumenty/profix-beton-kontakt-karta-techniczna.pdf' },
    ],
    notes: [
      'Chronić przed dziećmi. Stosować rękawice i okulary ochronne.',
      'Produkt który uległ przemrożeniu nie nadaje się do użytku.',
    ],
    seoKeywords: [
      'betonkontakt',
      'beton kontakt',
      'grunt szczepny',
      'grunt sczepny',
      'grunt polimerowy',
      'grunt z piaskiem kwarcowym',
      'grunt pod tynki gipsowe',
      'grunt na beton',
      'podkład kontaktowy',
    ],
  },
  {
    slug: 'grunt-gleboko-penetrujacy',
    categorySlug: 'grunty',
    name: 'Grunt głęboko penetrujący',
    tagline: 'Wzmacnia chłonne i osłabione podłoża',
    description:
      'Szybkoschnąca wodna dyspersja kopolimerów akrylowych. Głęboko penetruje strukturę podłoża, ujednolica chłonność i zwiększa przyczepność kolejnych warstw wykończeniowych.',
    features: [
      'Głęboko penetruje',
      'Wzmacnia osłabione podłoża',
      'Wyrównuje chłonność',
      'Gotowy do użycia',
    ],
    usage:
      'Pod kleje, gładzie, tynki, posadzki, farby. Pod okładziny ceramiczne, gładzie szpachlowe, tapety, płyty drewnopochodne. Wewnątrz i na zewnątrz.',
    application: 'Nanosić pędzlem lub wałkiem na czyste, suche podłoże.',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    notes: ['Chronić przed przemrożeniem'],
    seoKeywords: [
      'grunt głęboko penetrujący',
      'podkład gruntujący',
      'grunt pod tynki',
      'grunt gruntujący ściany',
      'grunt akrylowy',
    ],
  },
  {
    slug: 'grunt-gleboko-penetrujacy-koncentrat',
    categorySlug: 'grunty',
    name: 'Grunt głęboko penetrujący, koncentrat',
    brand: 'MaxiGrunt',
    tagline: 'Skondensowana formuła do rozcieńczenia 1:4',
    description:
      'Koncentrat na bazie wodnej dyspersji kopolimerów akrylowych. Jednorodna ciecz o łagodnym zapachu. Po rozcieńczeniu działa jak grunt głęboko penetrujący, w bardzo wydajnej kalkulacji litrowej.',
    features: [
      'Wzmacnia i zwiększa przyczepność',
      'Wyrównuje chłonność',
      'Wydajny koncentrat',
      'Szybkoschnący',
      'Łagodny zapach',
    ],
    usage:
      'Pod kleje, gładzie, tynki, posadzki, farby. Pod okładziny ceramiczne i kamionkowe, gładzie szpachlowe, tapety, płyty paździerzowe i drewnopochodne. Wewnątrz i na zewnątrz.',
    application:
      'Czyste, suche podłoże bez kurzu, oleju, wapna i starych farb. Nanosić pędzlem lub wałkiem. Unikać opadów i silnego nasłonecznienia.',
    mixing: 'Rozcieńczyć z czystą wodą w stosunku 1:4 (lub dobrać proporcje do chłonności podłoża)',
    consumption: 'ok. 0,2 kg/m² gotowej cieczy',
    packaging: '5 l',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    notes: ['Chronić przed przemrożeniem'],
    seoKeywords: [
      'grunt głęboko penetrujący koncentrat',
      'grunt koncentrat',
      'podkład gruntujący koncentrat',
      'wydajny grunt',
    ],
  },
  {
    slug: 'grunt-tynkarski-akrylowy',
    categorySlug: 'grunty',
    name: 'Grunt tynkarski akrylowy',
    brand: 'AkrylGrunt',
    tagline: 'Pod akrylowe masy tynkarskie i farby fasadowe',
    description:
      'Szybkoschnąca wodna dyspersja kopolimerów akrylowych z dodatkami modyfikującymi. Dedykowany podkład pod akrylowe systemy tynkarskie, zwiększa przyczepność i ujednolica kolorystyczne krycie.',
    features: [
      'Paroprzepuszczalny',
      'Zwiększa przyczepność',
      'Idealne krycie',
      'Łagodny zapach',
      'Wodo- i mrozoodporny',
    ],
    usage:
      'Pod akrylowe masy tynkarskie, farby fasadowe, kleje, gładzie, tynki, posadzki. Pod okładziny ceramiczne, fasady, gładzie szpachlowe, tapety, płyty drewnopochodne. Wewnątrz i na zewnątrz.',
    application:
      'Czyste, suche podłoże. Nanosić pędzlem lub wałkiem. Unikać opadów i silnego nasłonecznienia.',
    consumption: 'ok. 0,2 kg/m²',
    packaging: '20 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    notes: ['Chronić przed przemrożeniem'],
    seoKeywords: [
      'grunt tynkarski',
      'grunt tynkarski akrylowy',
      'grunt pod tynk akrylowy',
      'podkład tynkarski',
      'grunt pod farby fasadowe',
    ],
  },
  {
    slug: 'grunt-tynkarski-koncentrat',
    categorySlug: 'grunty',
    name: 'Hydro Primer, polimerowy grunt tynkarski koncentrat',
    brand: 'Hydro Primer',
    tagline: 'Wydajny koncentrat 1:5 pod tynki, gładzie, kleje i farby',
    description:
      'Polimerowy grunt tynkarski w formie koncentratu. Szybkoschnąca wodna dyspersja kopolimerów akrylowych z dodatkami modyfikującymi, jednorodna ciecz o łagodnym zapachu. Po rozcieńczeniu wzmacnia podłoże, ujednolica chłonność i znacząco zwiększa przyczepność kolejnych warstw.',
    features: [
      'Wzmacnia podłoże',
      'Zwiększa przyczepność',
      'Wyrównuje chłonność',
      'Paroprzepuszczalny',
      'Szybkoschnący (~2 h)',
      'Łagodny zapach',
    ],
    usage:
      'Pod tynki cementowe i gipsowe, kleje, gładzie, posadzki, farby. Pod okładziny ceramiczne, kamionkowe, gładzie szpachlowe, tapety, płyty paździerzowe i drewnopochodne. Wewnątrz i na zewnątrz obiektów.',
    application:
      'Podłoże musi być czyste, suche, wolne od kurzu, oleju, wapna, wosku i starych farb. Nanosić pędzlem, wałkiem lub pistoletem. Unikać opadów i silnego nasłonecznienia. Czas schnięcia ok. 2 godziny.',
    mixing: 'Rozcieńczyć z czystą wodą w stosunku 1:5 (lub dobrać do chłonności podłoża)',
    consumption: 'ok. 0,2 kg/m² gotowej cieczy',
    packaging: '12 kg / 17 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    image: '/photos/products/hydro-primer-12kg.jpg',
    gallery: [
      '/photos/products/hydro-primer-12kg.jpg',
      '/photos/products/hydro-primer-17kg.jpg',
      '/photos/products/hydro-primer-banner.jpg',
    ],
    documents: [
      { label: 'Karta techniczna', href: '/dokumenty/profix-hydro-primer-karta-techniczna.pdf' },
    ],
    notes: [
      'Chronić przed dziećmi. Stosować rękawice i okulary ochronne.',
      'Produkt, który uległ przemrożeniu nie nadaje się do użytku.',
    ],
    seoKeywords: [
      'grunt tynkarski koncentrat',
      'grunt polimerowy',
      'grunt pod tynki gipsowe',
      'grunt pod tynki cementowe',
      'podkład gruntujący pod tynk',
      'wydajny grunt koncentrat',
    ],
  },
  {
    slug: 'grunt-tynkarski-silikonowy',
    categorySlug: 'grunty',
    name: 'Grunt tynkarski silikonowy',
    brand: 'SilGrunt',
    tagline: 'Pod silikonowe masy tynkarskie i farby fasadowe',
    description:
      'Wodna dyspersja kopolimerów silikonowych (nie akrylowych jak pozostałe) z dodatkami modyfikującymi. Dedykowany podkład pod silikonowe systemy elewacyjne.',
    features: [
      'Paroprzepuszczalny',
      'Zwiększa przyczepność',
      'Idealne krycie',
      'Łagodny zapach',
      'Wodo- i mrozoodporny',
    ],
    usage:
      'Pod silikonowe masy tynkarskie i farby fasadowe. Pod okładziny ceramiczne, fasady, gładzie szpachlowe, tapety, płyty drewnopochodne. Wewnątrz i na zewnątrz.',
    application:
      'Czyste, suche podłoże. Nanosić pędzlem lub wałkiem. Unikać opadów i silnego nasłonecznienia.',
    consumption: 'ok. 0,2 kg/m²',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    notes: ['Chronić przed przemrożeniem'],
    seoKeywords: [
      'grunt tynkarski silikonowy',
      'grunt pod tynk silikonowy',
      'podkład pod tynki silikonowe',
      'grunt silikonowy elewacja',
    ],
  },

  // === FARBY WEWNĘTRZNE ===
  {
    slug: 'farba-wewnetrzna-lateksowa',
    categorySlug: 'farby-wewnetrzne',
    name: 'Farba wewnętrzna lateksowa',
    tagline: 'Trwała powłoka odporna na zmywanie i szorowanie',
    description:
      'Ekologiczna farba lateksowa do dekoracyjnego malowania ścian i sufitów we wnętrzach. Daje matową, jednolitą powłokę o dobrym kryciu, po wyschnięciu odporną na czyszczenie wodą z detergentem.',
    features: [
      'Idealne krycie',
      'Szybko schnąca',
      'Łagodny zapach',
      'Gotowa do użycia',
      'Wodorozcieńczalna',
      'Odporna na zmywanie i ścieranie',
    ],
    usage:
      'Na równe i nośne podłoża mineralne: beton, tynk cementowy, cementowo-wapienny, gips, płyty gipsowo-kartonowe oraz tapety. Wnętrza mieszkalne i użytkowe.',
    application:
      'Wymieszać przed nanoszeniem. Aplikować pędzlem, wałkiem lub natryskiem. Pełne krycie zwykle wymaga dwóch warstw. Narzędzia myć wodą bezpośrednio po użyciu. Po malowaniu wietrzyć pomieszczenie do zaniku zapachu.',
    consumption: '0,22 l/m² przy jednorazowym malowaniu',
    packaging: '15 l',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    notes: [
      'Barwienie wg palety PROFIX lub indywidualne zamówienie',
      'Chronić przed przemrożeniem',
    ],
  },
  {
    slug: 'farba-wewnetrzna-silikatowo-silikonowa',
    categorySlug: 'farby-wewnetrzne',
    name: 'Farba wewnętrzna silikatowo-silikonowa',
    tagline: 'Paroprzepuszczalna powłoka dla wnętrz o podwyższonej wilgotności',
    description:
      'Hybrydowa farba na bazie spoiwa silikatowo-silikonowego przeznaczona do wnętrz. Doskonale paroprzepuszczalna, dobrze sprawdza się w pomieszczeniach narażonych na okresową wilgoć.',
    features: [
      'Idealne krycie',
      'Szybko schnąca',
      'Łagodny zapach',
      'Gotowa do użycia',
      'Wodorozcieńczalna',
      'Paroprzepuszczalna',
    ],
    usage:
      'Na podłoża mineralne: beton, tynk cementowy i cementowo-wapienny, gips, płyty gipsowo-kartonowe oraz tapety. Wewnątrz budynków.',
    application:
      'Wymieszać przed użyciem. Nanosić pędzlem, wałkiem lub natryskiem. Pełne krycie zwykle przy dwóch warstwach.',
    consumption: '0,22 l/m² przy jednorazowym malowaniu',
    packaging: '15 l',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    notes: [
      'Barwienie wg palety PROFIX lub indywidualne zamówienie',
      'Chronić przed przemrożeniem',
    ],
  },
  {
    slug: 'farba-wewnetrzna-akrylowa',
    categorySlug: 'farby-wewnetrzne',
    name: 'Farba wewnętrzna akrylowa',
    tagline: 'Ekonomiczna farba dekoracyjna do ścian i sufitów',
    description:
      'Akrylowa farba wodorozcieńczalna do dekoracyjnego malowania wnętrz. Praktyczna w dużych powierzchniach mieszkalnych i komercyjnych.',
    features: ['Wodorozcieńczalna', 'Łagodny zapach', 'Szybko schnąca', 'Dekoracyjna powłoka'],
    usage: 'Wnętrza mieszkalne, biurowe, użytkowe. Na podłoża mineralne i płyty gipsowo-kartonowe.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'farba-wewnetrzna-silikonowa',
    categorySlug: 'farby-wewnetrzne',
    name: 'Farba wewnętrzna silikonowa',
    tagline: 'Wytrzymała farba silikonowa do wymagających wnętrz',
    description:
      'Farba silikonowa na bazie żywicy silikonowej. Wysoka paroprzepuszczalność i odporność na zabrudzenia, dobry wybór do wnętrz o intensywnej eksploatacji.',
    features: ['Paroprzepuszczalna', 'Odporna na zabrudzenia', 'Trwała', 'Wodorozcieńczalna'],
    usage: 'Wnętrza mieszkalne i użytkowe, kuchnie, korytarze, pomieszczenia narażone na wilgoć.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },

  // === FARBY FASADOWE / ELEWACYJNE ===
  {
    slug: 'farba-fasadowa-lateksowa',
    categorySlug: 'farby-fasadowe-elewacyjne',
    name: 'Farba fasadowa lateksowa',
    tagline: 'Trwała powłoka elewacyjna na bazie lateksu',
    description:
      'Farba do malowania elewacji budynków. Tworzy elastyczną powłokę odporną na zmienne warunki atmosferyczne i promieniowanie UV.',
    features: ['Odporna na UV', 'Wodoodporna', 'Elastyczna', 'Paroprzepuszczalna'],
    usage: 'Elewacje domów i budynków użyteczności publicznej. Na tynki cementowo-wapienne, beton i podłoża mineralne.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'farba-fasadowa-silikatowo-silikonowa',
    categorySlug: 'farby-fasadowe-elewacyjne',
    name: 'Farba fasadowa silikatowo-silikonowa',
    tagline: 'Hybrydowa formuła na trudne fasady',
    description:
      'Łączy zalety farb krzemianowych i silikonowych. Bardzo dobra paroprzepuszczalność przy jednoczesnej hydrofobowości, dobra na renowacje i obiekty zabytkowe.',
    features: ['Wysoka paroprzepuszczalność', 'Hydrofobowa', 'Odporna na zabrudzenia', 'Odporna na UV'],
    usage: 'Renowacje, fasady mineralne, obiekty zabytkowe. Na tynki cementowo-wapienne, silikatowe i mineralne.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'farba-fasadowa-silikonowa',
    categorySlug: 'farby-fasadowe-elewacyjne',
    name: 'Farba fasadowa silikonowa',
    tagline: 'Najwyższa odporność na czynniki atmosferyczne',
    description:
      'Farba na bazie żywicy silikonowej do elewacji wymagających najwyższej trwałości. Efekt samoczyszczenia powierzchni przy opadach.',
    features: ['Hydrofobowa, efekt samoczyszczenia', 'Wysoka paroprzepuszczalność', 'Odporna na grzyby i algi', 'Długa trwałość'],
    usage: 'Elewacje narażone na intensywne czynniki atmosferyczne. Budynki nowe i renowacje, podłoża mineralne i ETICS.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },

  // === KLEJE DO PŁYTEK ===
  {
    slug: 'pkt-1-klej-do-glazury-i-terakoty-standard',
    categorySlug: 'kleje',
    name: 'PKT-1 Klej do glazury i terakoty Standard',
    brand: 'PKT-1',
    tagline: 'Mrozoodporny klej cementowy do typowych zastosowań',
    description:
      'Sucha mieszanka klejowa na bazie cementu z wypełniaczami mineralnymi i dodatkami modyfikującymi przyczepność. Klej cementowy klasy C1 do mocowania okładzin ceramicznych w technice cienkowarstwowej.',
    features: ['Mrozoodporny', 'Wodoodporny', 'Cienkowarstwowy', 'Dobre właściwości robocze', 'Dostępny także luzem w technice silosowej'],
    usage:
      'Płytki ceramiczne, kamionkowe, fajansowe, mozaika ze szkła i porcelany. Na ścianach i podłogach, wewnątrz i na zewnątrz budynków.',
    application:
      'Podłoże nośne, suche, czyste, bez kurzu, tłuszczu i innych zanieczyszczeń. Luźne fragmenty skuć. Mieszać z czystą wodą. Nakładać pacą zębatą.',
    consumption: '1,2 kg/m² (zależnie od rodzaju podłoża)',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w szczelnie zamkniętym, oryginalnym opakowaniu (chronić przed wilgocią)',
  },
  {
    slug: 'pkt-2-klej-do-glazury-i-terakoty-elastic',
    categorySlug: 'kleje',
    name: 'PKT-2 Klej do glazury i terakoty Elastic',
    brand: 'PKT-2',
    tagline: 'Półelastyczny klej pod obciążenia mechaniczne i termiczne',
    description:
      'Sucha mieszanka cementowa z dodatkami modyfikującymi elastyczność. Półelastyczny, mrozoodporny i wodoodporny, zalecany pod podłoża obciążone mechanicznie i termicznie, w tym ogrzewanie podłogowe.',
    features: ['Półelastyczny', 'Mrozoodporny', 'Wodoodporny', 'Pod ogrzewanie podłogowe', 'Dostępny także luzem w technice silosowej'],
    usage:
      'Płytki ceramiczne, kamionkowe, fajansowe, gres, mozaika. Tarasy, balkony, podłogi z ogrzewaniem, łazienki. Wewnątrz i na zewnątrz.',
    application:
      'Czyste, nośne, suche podłoże. Mieszać z czystą wodą do uzyskania jednorodnej, plastycznej masy. Nakładać pacą zębatą.',
    consumption: '1,2 kg/m² (zależnie od rodzaju podłoża)',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w szczelnie zamkniętym opakowaniu (chronić przed wilgocią)',
  },
  {
    slug: 'pkt-3-klej-do-glazury-i-terakoty-elastic-flex',
    categorySlug: 'kleje',
    name: 'PKT-3 Klej do glazury i terakoty Elastic Flex',
    brand: 'PKT-3',
    tagline: 'W pełni elastyczny klej do trudnych podłoży',
    description:
      'Wysoko elastyczna zaprawa klejowa o podwyższonej przyczepności. Dedykowany pod gres porcelanowy, płytki wielkoformatowe oraz podłoża krytyczne (taras zewnętrzny, basen, ogrzewanie podłogowe).',
    features: ['W pełni elastyczny', 'Wysoka przyczepność', 'Do gresu wielkoformatowego', 'Mrozoodporny i wodoodporny'],
    usage: 'Gres porcelanowy, płytki wielkoformatowe, baseny, tarasy, podłoża narażone na pracę termiczną.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },

  // === ZAPRAWY KLEJĄCE DO SYSTEMÓW DOCIEPLEŃ (ETICS) ===
  {
    slug: 'pk-100-klej-do-przyklejania-styropianu',
    categorySlug: 'zaprawy-klejace-do-systemow-docieplen',
    name: 'PK-100 Klej do przyklejania styropianu',
    brand: 'PK-100',
    tagline: 'Klej do mocowania płyt EPS w systemach ETICS',
    description:
      'Zaprawa klejowa przeznaczona do przyklejania płyt styropianowych w bezspoinowych systemach ociepleń ścian zewnętrznych metodą lekką-mokrą. Sprawdza się zarówno na nowych obiektach jak i przy renowacjach.',
    features: ['Do systemów ETICS', 'Mrozoodporna', 'Dobra przyczepność do EPS', 'Praca w temperaturze dodatniej', 'Dostępny także luzem w technice silosowej'],
    usage: 'Mocowanie płyt styropianowych (EPS) na elewacjach w technologii lekkiej-mokrej.',
    application:
      'Nanosić pacą zębatą 8-12 mm równomiernie na całą powierzchnię płyty termoizolacyjnej, by po przyklejeniu utworzyła jednolitą warstwę. Płytę docisnąć do podłoża.',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w szczelnie zamkniętym opakowaniu (chronić przed wilgocią)',
  },
  {
    slug: 'pk-101-klej-do-zatapiania-siatki',
    categorySlug: 'zaprawy-klejace-do-systemow-docieplen',
    name: 'PK-101 Klej do zatapiania siatki',
    brand: 'PK-101',
    tagline: 'Zaprawa do warstwy zbrojonej w ETICS',
    description:
      'Klej-zaprawa szpachlowa do zatapiania siatki z włókna szklanego w systemach ociepleń. Tworzy elastyczną warstwę zbrojącą będącą podkładem pod tynk cienkowarstwowy.',
    features: ['Do zatapiania siatki ETICS', 'Elastyczna', 'Mrozoodporna', 'Dobre właściwości robocze'],
    usage: 'Wykonanie warstwy zbrojonej w systemach ociepleń budynków (na styropianie i wełnie).',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'pk-200-klej-do-welny',
    categorySlug: 'zaprawy-klejace-do-systemow-docieplen',
    name: 'PK-200 Klej do wełny',
    brand: 'PK-200',
    tagline: 'Uniwersalny klej do styropianu i wełny mineralnej',
    description:
      'Zaprawa klejowa do przyklejania płyt styropianowych oraz wełny mineralnej w bezspoinowych systemach ociepleń ścian zewnętrznych metodą lekką-mokrą. Pasuje do nowych obiektów i renowacji.',
    features: ['Do styropianu i wełny mineralnej', 'Do systemów ETICS', 'Mrozoodporna', 'Dostępny także luzem w technice silosowej'],
    usage: 'Mocowanie płyt styropianowych (EPS) i płyt z wełny mineralnej na elewacjach.',
    application:
      'Nanosić pacą zębatą 8-12 mm równomiernie na całą powierzchnię płyty, by po przyklejeniu utworzyła warstwę o określonej grubości. Płytę docisnąć do podłoża.',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w szczelnie zamkniętym opakowaniu (chronić przed wilgocią)',
  },
  {
    slug: 'pk-201-klej-bialy-do-siatki',
    categorySlug: 'zaprawy-klejace-do-systemow-docieplen',
    name: 'PK-201 Klej biały do siatki',
    brand: 'PK-201',
    tagline: 'Biała zaprawa klejowo-szpachlowa do całego cyklu ETICS',
    description:
      'Biała zaprawa klejowo-szpachlowa do przyklejania płyt styropianowych, wełny mineralnej oraz zatapiania siatki w bezspoinowych systemach ociepleń. Jasny kolor ułatwia kontrolę grubości warstwy i podkład pod jasne tynki.',
    features: ['Biały kolor', 'Mocowanie i zatapianie w jednym produkcie', 'Mrozoodporna', 'Pod jasne tynki cienkowarstwowe', 'Dostępny także luzem w technice silosowej'],
    usage: 'Pełny cykl ETICS, mocowanie izolacji (EPS, wełna) i warstwa zbrojona z siatką.',
    application:
      'Mocowanie: pacą zębatą równomiernie na całą powierzchnię płyty, docisnąć do podłoża. Warstwa zbrojona: nanieść klej, zatopić siatkę i wygładzić.',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w szczelnie zamkniętym opakowaniu (chronić przed wilgocią)',
  },

  // === TYNKI CIENKOWARSTWOWE ===
  {
    slug: 'akrylowa-masa-tynkarska-kornik-baranek-1mm-3mm',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Akrylowa masa tynkarska, Kornik / Baranek 1-3 mm',
    tagline: 'Dekoracyjny tynk akrylowy na elewacje i wnętrza',
    description:
      'Gotowa do użycia masa tynkarska na bazie żywic akrylowych. Dostępna w fakturach kornik (drapana) i baranek (kasza) o uziarnieniu 1-3 mm. Tworzy trwałą, elastyczną powłokę dekoracyjną.',
    features: ['Gotowa do użycia', 'Wodoodporna', 'Trwała powłoka dekoracyjna', 'Faktury: kornik, baranek'],
    usage: 'Elewacje budynków, systemy ETICS, dekoracyjne wykończenie wnętrz. Na podłoża mineralne i gruntowane.',
    draft: true,
    notes: ['Wymaga gruntowania, patrz Grunt tynkarski akrylowy', 'Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'siliconowa-masa-tynkarska-kornik-baranek-1mm-3mm',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Silikonowa masa tynkarska, Kornik / Baranek 1-3 mm',
    tagline: 'Hydrofobowa elewacja silikonowa o długiej trwałości',
    description:
      'Masa tynkarska na bazie żywicy silikonowej, gotowa do użycia. Hydrofobowość zapewnia efekt samoczyszczenia powierzchni przy opadach. Faktura kornik lub baranek, ziarno 1-3 mm.',
    features: ['Hydrofobowa, efekt samoczyszczenia', 'Wysoka paroprzepuszczalność', 'Odporna na grzyby i algi', 'Faktury: kornik, baranek'],
    usage: 'Elewacje budynków, w tym renowacje. Najbardziej polecana w systemach ETICS narażonych na warunki atmosferyczne.',
    draft: true,
    notes: ['Wymaga gruntowania, patrz Grunt tynkarski silikonowy', 'Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'sylikatowo-sylikonowa-masa-tynkarska-kornik-baranek-1mm-3mm',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Silikatowo-silikonowa masa tynkarska, Kornik / Baranek 1-3 mm',
    tagline: 'Hybrydowa formuła łącząca cechy silikatów i silikonów',
    description:
      'Masa tynkarska oparta na hybrydowym spoiwie silikatowo-silikonowym. Łączy wysoką paroprzepuszczalność tynków krzemianowych z hydrofobowością tynków silikonowych, dobry wybór na renowacje i obiekty zabytkowe. Ziarno 1-3 mm.',
    features: ['Bardzo wysoka paroprzepuszczalność', 'Hydrofobowa', 'Dla renowacji i zabytków', 'Faktury: kornik, baranek'],
    usage: 'Elewacje budynków zabytkowych i renowacyjnych, oraz systemy ETICS.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'tynk-mineralny-kornik-baranek-1mm-3mm',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Tynk mineralny, Kornik / Baranek 1-3 mm',
    tagline: 'Cementowy tynk dekoracyjny do malowania',
    description:
      'Sucha mieszanka tynkarska na bazie cementu z wypełniaczami mineralnymi. Po nałożeniu i wyschnięciu wymaga malowania farbą fasadową (silikonową lub silikatowo-silikonową). Faktura kornik lub baranek 1-3 mm.',
    features: ['Cementowa baza', 'Najwyższa paroprzepuszczalność', 'Trwała', 'Faktury: kornik, baranek'],
    usage: 'Elewacje budynków i systemy ETICS. Do malowania farbą fasadową po nałożeniu.',
    application: 'Mieszać z czystą wodą do uzyskania jednorodnej masy. Nakładać pacą stalową, fakturować pacą plastikową.',
    draft: true,
    notes: ['Wymaga gruntowania i malowania farbą fasadową', 'Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'trawertyn',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Trawertyn',
    tagline: 'Dekoracyjny tynk imitujący kamień',
    description:
      'Dekoracyjna masa tynkarska tworząca powierzchnię imitującą naturalny trawertyn. Do wykończenia wnętrz i wybranych powierzchni elewacyjnych, charakterystyczny efekt głębi i nieregularnej tekstury.',
    features: ['Efekt naturalnego kamienia', 'Dekoracyjny', 'Do wnętrz i fragmentów elewacji', 'Indywidualne barwienie'],
    usage: 'Salony, hole, wybrane fragmenty elewacji, lokale gastronomiczne i komercyjne.',
    draft: true,
    notes: ['Wymaga doświadczonej ekipy wykonawczej', 'Pełna karta techniczna dostępna na życzenie'],
  },

  // === SZPACHLE I GŁADZIE ===
  {
    slug: 'masa-szpachlowa-snieznobiala',
    categorySlug: 'szpachle-i-gladzie',
    name: 'Masa szpachlowa śnieżnobiała',
    tagline: 'Gładź do wykończenia ścian pod malowanie',
    description:
      'Drobnoziarnista, śnieżnobiała masa szpachlowa do wykończeniowego szpachlowania ścian i sufitów we wnętrzach. Daje gładką powłokę bezpośrednio pod malowanie.',
    features: ['Śnieżnobiały kolor', 'Drobnoziarnista', 'Dobra urabialność', 'Łatwa do szlifowania'],
    usage: 'Wykończeniowe szpachlowanie tynków cementowo-wapiennych, gipsowych i płyt gipsowo-kartonowych przed malowaniem.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'masa-szpachlowa-szara',
    categorySlug: 'szpachle-i-gladzie',
    name: 'Masa szpachlowa szara',
    tagline: 'Szpachla wypełniająca do wyrównywania podłoży',
    description:
      'Szara masa szpachlowa na bazie cementu lub gipsu (zależnie od wersji), do wyrównywania większych nierówności i wypełnień. Może pełnić rolę warstwy podkładowej pod gładź wykończeniową.',
    features: ['Wypełniacz', 'Większa grubość warstwy', 'Dobra przyczepność do tynków i betonu'],
    usage: 'Wyrównywanie tynków, wypełnianie ubytków, naprawy fragmentów ścian i sufitów.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'elastic-masa-szpachlowa-z-wloknem-stalym',
    categorySlug: 'szpachle-i-gladzie',
    name: 'Elastic, masa szpachlowa z włóknem',
    brand: 'Elastic',
    tagline: 'Zbrojona włóknem masa do trudnych podłoży',
    description:
      'Masa szpachlowa wzmocniona włóknami zbrojącymi. Tworzy elastyczną, odporną na pękanie powłokę, dobra na podłoża pracujące (np. nad rysami konstrukcyjnymi) oraz pod ogrzewanie podłogowe.',
    features: ['Zbrojona włóknem', 'Elastyczna', 'Odporna na pęknięcia', 'Do podłoży pracujących'],
    usage: 'Szpachlowanie podłoży zarysowanych, łączeń materiałów, podłóg pod ogrzewanie podłogowe.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },

  // === INNE PRODUKTY ===
  {
    slug: 'hydroizolacja',
    categorySlug: 'inne-produkty',
    name: 'Hydroizolacja',
    tagline: 'Powłoka uszczelniająca pod okładziny',
    description:
      'Elastyczna powłoka hydroizolacyjna do zabezpieczania podłoży przed wilgocią. Stosowana pod okładziny ceramiczne w łazienkach, kuchniach, na tarasach i balkonach.',
    features: ['Elastyczna', 'Wodoszczelna', 'Pod okładziny ceramiczne', 'Do wnętrz mokrych'],
    usage: 'Łazienki, kuchnie, tarasy, balkony, pomieszczenia narażone na okresową wilgoć.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'wylewka-cementowa-jastrych-10-60mm',
    categorySlug: 'inne-produkty',
    name: 'Wylewka cementowa (jastrych) 10-60 mm',
    tagline: 'Cementowy podkład podłogowy do większych grubości',
    description:
      'Klasyczna wylewka cementowa do wyrównywania podłoży i tworzenia podkładów podłogowych w przedziale grubości 10-60 mm. Pod okładziny ceramiczne, drewno, panele.',
    features: ['Grubość 10-60 mm', 'Cementowa baza', 'Pod różne wykończenia podłogowe'],
    usage: 'Wyrównywanie i przygotowanie podłóg w domach, lokalach, obiektach komercyjnych.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'wylewka-samopoziomujaca-cienkowarstwowa-01-10mm',
    categorySlug: 'inne-produkty',
    name: 'Wylewka samopoziomująca cienkowarstwowa 1-10 mm',
    tagline: 'Szybka, samopoziomująca masa wyrównująca',
    description:
      'Samopoziomująca masa wyrównująca o cienkiej warstwie roboczej (1-10 mm). Tworzy gładkie podłoże bezpośrednio pod okładziny, bez konieczności dodatkowej obróbki.',
    features: ['Samopoziomująca', 'Cienka warstwa 1-10 mm', 'Szybkie schnięcie', 'Gładka powierzchnia'],
    usage: 'Wyrównywanie istniejących wylewek i podłoży przed układaniem płytek, paneli, wykładzin.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  // (Beton B-20 przeniesiony do nowej kategorii 'betony' jako beton-c-16-20)
  {
    slug: 'zaprawa-murarska',
    categorySlug: 'inne-produkty',
    name: 'M-10 Zaprawa murarska',
    brand: 'M-10',
    tagline: 'Cementowo-wapienna zaprawa klasy M10 do ścian nośnych',
    highlight: 'Mury nośne · klasa M10 · 0,1–0,8 mm',
    description:
      'Sucha mieszanka zaprawy murarskiej na bazie cementu portlandzkiego, wapna i piasku kwarcowego o uziarnieniu 0,1–0,8 mm, z dodatkami uplastyczniającymi. Zaprawa ogólnego przeznaczenia (GP) klasy M10 do murowania ścian nośnych, słupów i ścian działowych ze wszystkich powszechnie stosowanych cegieł i bloczków. Po 28 dniach uzyskuje wytrzymałość ≥ 10 MPa. Do stosowania wewnątrz i na zewnątrz budynków.',
    features: [
      'Cementowo-wapienna, klasa M10 (≥ 10 MPa)',
      'Do ścian nośnych, słupów i ścian działowych',
      'Uziarnienie 0,1–0,8 mm',
      'Do cegieł i bloczków wszystkich typów',
      'Wewnątrz i na zewnątrz',
      'Dostępna także luzem w technice silosowej',
    ],
    usage:
      'Murowanie ścian nośnych, działowych, słupów i filarów z cegły pełnej i dziurawki, pustaków oraz bloczków budowlanych. Do stosowania wewnątrz i na zewnątrz budynków.',
    application:
      'Cegły i bloczki powinny być czyste i nośne. Suchą mieszankę 25 kg zarobić ok. 3,4 l czystej wody i mieszać 2–3 minuty mieszadłem mechanicznym lub w betoniarce do uzyskania jednorodnej konsystencji. Zaprawę wyrobić w ciągu ok. 1 godziny. Nie prowadzić prac na przemrożonym podłożu ani przy zagrożeniu przymrozkami.',
    mixing: 'ok. 3,4 l wody na worek 25 kg (0,13–0,14 l/kg)',
    consumption: 'zależne od formatu cegieł/bloczków i grubości spoiny',
    packaging: '25 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '6 miesięcy w oryginalnym, szczelnie zamkniętym opakowaniu',
    norms: ['PN-EN 998-2:2016'],
    extraSpecs: [
      { label: 'Klasa zaprawy', value: 'M10 (≥ 10 MPa @ 28 dni)' },
      { label: 'Uziarnienie', value: '0,1–0,8 mm' },
      { label: 'Reakcja na ogień', value: 'A1' },
      { label: 'Absorpcja wody', value: '≤ 0,5 kg/(m²·min^0,5)' },
      { label: 'Paroprzepuszczalność (μ)', value: '15/35' },
    ],
    documents: [
      { label: 'Karta techniczna', href: '/dokumenty/profix-m-10-karta-techniczna.pdf' },
      {
        label: 'Deklaracja właściwości użytkowych',
        href: '/dokumenty/profix-m-10-deklaracja-wlasciwosci-uzytkowych.pdf',
      },
    ],
    notes: ['Nie wykonywać prac na przemrożonym podłożu ani przy ryzyku przymrozków.'],
    seoKeywords: [
      'zaprawa murarska',
      'zaprawy murarskie',
      'zaprawa do murowania',
      'zaprawa cementowo-wapienna',
      'zaprawa murarska M10',
      'zaprawa do ścian nośnych',
    ],
  },

  // === TYNKI CEMENTOWO-WAPIENNE ===
  {
    slug: 'pow-100-obrzutka-wstepna',
    categorySlug: 'tynki-cementowo-wapienne',
    name: 'POW-100 Obrzutka wstępna',
    brand: 'POW-100',
    tagline: 'Cementowa warstwa sczepna pod tynki systemu PROFIX',
    highlight: 'Warstwa pod tynk · ziarno do 1 mm',
    description:
      'Sucho mieszana zaprawa cementowa do obrzutki wstępnej. Wchodzi w skład systemu zapraw tynkarskich PROFIX, stosowana pod tynki cementowe nakładane maszynowo lub ręcznie na wszystkie podłoża mineralne. Wyrównuje chłonność podłoża i poprawia przyczepność tynków do ścian i sufitów. Nadaje się do obróbki ręcznej i maszynowej.',
    features: [
      'Warstwa sczepna pod tynk',
      'Wyrównuje chłonność podłoża',
      'Aplikacja ręczna lub maszynowa (agregat tynkarski)',
      'Ziarno do 1 mm',
      'Kolor naturalnie szary',
      'Dostępny także luzem w technice silosowej',
    ],
    usage:
      'Zalecana pod tynki cementowe na wszystkie podłoża mineralne (beton, bloczki, ceramika, beton komórkowy). Powierzchnię należy pokryć w 100% cienką warstwą POW-100; po pełnym utwardzeniu (ok. 24 h) można przystąpić do tynkowania zasadniczego.',
    application:
      'Podłoże nośne, wolne od kurzu, tłuszczu i innych zanieczyszczeń. Luźne części skuć do warstwy stabilnej. Przed nałożeniem zagruntować gruntem tynkarskim PROFIX. Grzyby i pleśń usunąć środkiem grzybobójczym. Nakładać stalową kielnią trapezową lub trójkątną, albo natryskowo agregatem.',
    mixing: 'ok. 6–7,2 l wody na 30 kg suchej zaprawy; czas przydatności do przerobu max ok. 3 h',
    consumption: '4–8 kg/m² (w zależności od rodzaju podłoża)',
    packaging: '30 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym, szczelnie zamkniętym opakowaniu',
    image: '/photos/products/pow-100-v2.png',
    norms: ['PN-EN 998-1:2004', 'PN-EN 998-1:2004/AC:2006'],
    extraSpecs: [
      { label: 'Absorpcja wody', value: 'W2' },
      { label: 'Tynkowanie / obciążenie', value: 'po ok. 24 h / pełne po ok. 7 dniach' },
    ],
    notes: ['Nie dopuścić do zbyt szybkiego wysychania (przeciągi, mocne nasłonecznienie, ogrzewanie pomieszczeń).'],
    seoKeywords: [
      'obrzutka wstępna',
      'warstwa sczepna pod tynk',
      'obrzutka cementowa',
      'tynk maszynowy obrzutka',
      'technika silosowa',
    ],
  },
  {
    slug: 'ptc-10-tynk-wapienno-cementowy',
    categorySlug: 'tynki-cementowo-wapienne',
    name: 'PTC-10 Tynk wapienno-cementowy',
    brand: 'PTC-10',
    tagline: 'Uniwersalny tynk maszynowy i ręczny do wnętrz',
    highlight: 'Wnętrza · 0,1–0,5 mm · standard',
    description:
      'Sucho mieszana zaprawa tynkarska na bazie cementu portlandzkiego, piasku naturalnego i kwarcowego (uziarnienie 0,1–0,5 mm) z dodatkami uplastyczniającymi poprawiającymi właściwości obróbki. Standardowy tynk podkładowy o sprawdzonej wytrzymałości.',
    features: [
      'Uziarnienie 0,1–0,5 mm',
      'Aplikacja ręczna i mechaniczna',
      'Pod tynki ozdobne i farby',
      'Również jako tynk naprawczy',
      'Paroprzepuszczalny',
      'Dostępny także luzem w technice silosowej',
    ],
    usage:
      'Ściany wewnętrzne i stropy. Na silnie porowatych podłożach (cegła i pustak porowaty, beton komórkowy, beton szalowany, piaskowiec) oraz jako tynk podkładowy pod tynki ozdobne i farby. Nie stosować w strefie cokołowej.',
    application:
      'Podłoże nośne, oczyszczone i stabilne. Zastosować obrzutkę wstępną POW-100, a powierzchnie ekstremalnie chłonne dodatkowo zagruntować gruntem tynkarskim PROFIX. Drugą warstwę nakładać na pierwszą zatartą na ostro.',
    mixing: '0,23–0,24 l wody na 1 kg zaprawy (ok. 7 l / 30 kg)',
    consumption: '14 kg/m² przy warstwie 10 mm (min. grubość 7 mm)',
    packaging: '30 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '6 miesięcy w oryginalnym, szczelnie zamkniętym opakowaniu',
    image: '/photos/products/ptc-10-v2.png',
    norms: ['PN-EN 998-1:2004', 'PN-EN 998-1:2004/AC:2006'],
    extraSpecs: [
      { label: 'Absorpcja wody (kapilarna)', value: 'W2' },
    ],
    seoKeywords: [
      'tynk cementowo-wapienny',
      'tynk wapienno-cementowy',
      'tynk maszynowy',
      'tynk ręczny',
      'tynki tradycyjne',
      'tynk podkładowy',
      'tynki cementowe',
      'tynk wewnętrzny',
    ],
  },
  {
    slug: 'ptc-11-tynk-cementowo-wapienny-drobnoziarnisty-lekki',
    categorySlug: 'tynki-cementowo-wapienne',
    name: 'PTC-11 Tynk cementowo-wapienny drobnoziarnisty lekki',
    brand: 'PTC-11',
    tagline: 'Drobny lekki tynk do zacierania na gładko',
    highlight: 'Wnętrza · 0,1–0,4 mm · na gładko',
    description:
      'Sucho mieszana zaprawa tynkarska z lekkim kruszywem perlitowym i drobnym uziarnieniem 0,1–0,4 mm. Dzięki drobnemu ziarnu można ją zacierać na gładko – doskonale nadaje się jako warstwa końcowa (szlichta). Produkt uniwersalny, nakładany w systemie dwuwarstwowym.',
    features: [
      'Lekkie kruszywo perlitowe',
      'Drobne uziarnienie 0,1–0,4 mm',
      'Można zacierać na gładko (szlichta)',
      'Aplikacja ręczna i mechaniczna',
      'Niższa masa – wygodniejsza obróbka',
      'Dostępny także luzem w technice silosowej',
    ],
    usage:
      'Tylko wewnątrz budynków, na ściany i stropy. Na silnie porowatych podłożach (cegła i pustak porowaty, beton komórkowy, beton szalowany, piaskowiec), jako tynk podkładowy pod tynki ozdobne i farby lub jako tynk naprawczy. Nie stosować w strefie cokołowej.',
    application:
      'Zastosować obrzutkę wstępną POW-100, a podłoża ekstremalnie chłonne zagruntować gruntem tynkarskim PROFIX. Drugą warstwę nakładać na pierwszą zatartą na ostro.',
    mixing: '0,23–0,24 l wody na 1 kg zaprawy (ok. 7 l / 30 kg)',
    consumption: '12 kg/m² przy warstwie 10 mm (min. grubość 7 mm)',
    packaging: '30 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '6 miesięcy w oryginalnym, szczelnie zamkniętym opakowaniu',
    image: '/photos/products/ptc-11-v2.png',
    norms: ['PN-EN 998-1:2004', 'PN-EN 998-1:2004/AC:2006'],
    extraSpecs: [
      { label: 'Absorpcja wody (kapilarna)', value: 'W2' },
    ],
    seoKeywords: [
      'tynk drobnoziarnisty',
      'tynk lekki',
      'tynk z perlitem',
      'tynk gładki',
      'tynki gładkie',
      'tynk maszynowy',
      'tynk ziarno 0,1-0,4',
      'tynk cementowo-wapienny lekki',
    ],
  },
  {
    slug: 'ptc-12-tynk-cementowo-wapienny-lekki',
    categorySlug: 'tynki-cementowo-wapienne',
    name: 'PTC-12 Tynk cementowo-wapienny lekki',
    brand: 'PTC-12',
    tagline: 'Lekki tynk na ściany zewnętrzne i wewnętrzne',
    highlight: 'Zewnątrz i wnętrza · 0,1–0,8 mm',
    description:
      'Sucho mieszana zaprawa tynkarska z lekkim kruszywem perlitowym, na bazie cementu portlandzkiego i piasku kwarcowego o uziarnieniu 0,1–0,8 mm. Wyższa wytrzymałość przy niższej masie – uniwersalny tynk podkładowy o szerokim zastosowaniu.',
    features: [
      'Lekkie kruszywo perlitowe',
      'Uziarnienie 0,1–0,8 mm',
      'Ściany zewnętrzne, wewnętrzne i stropy',
      'Aplikacja ręczna i mechaniczna',
      'Pod tynki ozdobne i farby',
      'Dostępny także luzem w technice silosowej',
    ],
    usage:
      'Ściany zewnętrzne, wewnętrzne i stropy. Na silnie porowatych podłożach (cegła i pustak porowaty, beton komórkowy, beton szalowany, piaskowiec), jako tynk podkładowy pod tynki ozdobne i farby lub jako tynk naprawczy. Nie stosować w strefie cokołowej.',
    application:
      'Zastosować obrzutkę wstępną POW-100, a podłoża ekstremalnie chłonne zagruntować gruntem tynkarskim PROFIX. Drugą warstwę nakładać na pierwszą zatartą na ostro.',
    mixing: '0,23–0,24 l wody na 1 kg zaprawy (ok. 7 l / 30 kg)',
    consumption: '14 kg/m² przy warstwie 10 mm (min. grubość 7 mm)',
    packaging: '30 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '6 miesięcy w oryginalnym, szczelnie zamkniętym opakowaniu',
    image: '/photos/products/ptc-12-v2.png',
    norms: ['PN-EN 998-1:2004', 'PN-EN 998-1:2004/AC:2006'],
    extraSpecs: [
      { label: 'Absorpcja wody (kapilarna)', value: 'W2' },
    ],
    seoKeywords: [
      'tynk lekki',
      'tynk z perlitem',
      'tynk elewacyjny',
      'tynk cementowo-wapienny',
      'tynk maszynowy',
      'tynk na zewnątrz',
      'tynk wydajny',
    ],
  },
  {
    slug: 'ptc-15-tynk-wapienno-cementowy-super-lekki',
    categorySlug: 'tynki-cementowo-wapienne',
    name: 'PTC-15 Tynk wapienno-cementowy gładki super lekki',
    brand: 'PTC-15',
    tagline: 'Gładki tynk wewnętrzny na ściany i sufity, o zwiększonej wydajności',
    highlight: 'Wnętrza · 0,1–0,4 mm · gładki',
    description:
      'Sucho mieszana zaprawa tynkarska na bazie cementu portlandzkiego, piasku naturalnego oraz dodatków uplastyczniających. Służy do tynkowania ścian i sufitów wewnątrz budynków w systemie dwuwarstwowym: obrzutka wstępna i właściwa warstwa tynku. Drobne uziarnienie 0,1–0,4 mm pozwala uzyskać gładką powierzchnię, a perlit i dodatki napowietrzające zwiększają wydajność zaprawy o ok. 40%. Właściwości tiksotropowe sprawiają, że przy grubszym narzucie zaprawa nie spływa ze ścian i sufitów, co ogranicza pracochłonność i straty materiału. Krótki czas wiązania i czas pracy nieprzekraczający dwóch godzin pozwalają na szybką i efektywną pracę. Nadaje się również do dekoracyjnego modelowania i sztukowania brakujących elementów gzymsów wewnątrz budynków.',
    features: [
      'Gładka powierzchnia – uziarnienie 0,1–0,4 mm',
      'Wydajność większa o ok. 40% (perlit + dodatki napowietrzające)',
      'Tiksotropowy – nie spływa ze ścian i sufitów',
      'Krótki czas wiązania, czas pracy do 2 godzin',
      'Eliminuje efekt „bombelkowania”',
      'Aplikacja ręczna i maszynowa',
      'Dostępny także luzem w technice silosowej',
    ],
    usage:
      'Tynkowanie ścian wewnętrznych i stropów, także na silnie porowatych podłożach: cegła i pustak porowaty, beton komórkowy, beton szalowany, piaskowiec. Sprawdza się jako tynk podkładowy pod tynki ozdobne i farby oraz jako tynk naprawczy. Do nakładania ręcznego i mechanicznego.',
    application:
      'Podłoże powinno być nośne, czyste, wolne od kurzu i tłuszczu; luźne części skuć do warstwy stabilnej. Zastosować obrzutkę wstępną POW-100, a podłoża ekstremalnie chłonne dodatkowo zagruntować gruntem tynkarskim PROFIX. Suchą mieszankę 30 kg zarobić ok. 8,5 l wody do uzyskania jednorodnej masy. Przy nakładaniu drugiej warstwy pierwszą pozostawić zatartą „na ostro”. Nie dopuszczać do zbyt szybkiego wysychania (przeciągi, nasłonecznienie, ogrzewanie pomieszczeń).',
    mixing: 'ok. 8,5 l wody na 30 kg (0,27–0,29 l/kg)',
    consumption: 'ok. 12 kg/m² przy warstwie 10 mm',
    packaging: '30 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '6 miesięcy w oryginalnym, szczelnie zamkniętym opakowaniu',
    image: '/photos/products/ptc-15-v2.png',
    norms: ['PN-EN 998-1:2016'],
    extraSpecs: [
      { label: 'Uziarnienie', value: '0,1–0,4 mm' },
      { label: 'Minimalna grubość tynku', value: '10 mm' },
      { label: 'Absorpcja wody (kapilarna)', value: 'W2' },
    ],
    documents: [
      { label: 'Karta techniczna', href: '/dokumenty/profix-ptc-15-karta-techniczna.pdf' },
      {
        label: 'Deklaracja właściwości użytkowych',
        href: '/dokumenty/profix-ptc-15-deklaracja-wlasciwosci-uzytkowych.pdf',
      },
      {
        label: 'Karta charakterystyki',
        href: '/dokumenty/profix-ptc-15-karta-charakterystyki.pdf',
      },
      { label: 'Karta produktu', href: '/dokumenty/profix-ptc-15-karta-produktu.pdf' },
    ],
    notes: ['Producent nie ponosi odpowiedzialności za nieprawidłowe użycie materiału.'],
    seoKeywords: [
      'tynk super lekki',
      'tynk gładki',
      'tynki gładkie',
      'tynk z perlitem',
      'tynk wydajny',
      'tynk maszynowy',
      'tynk ręczny',
      'tynk ziarno 0,1-0,4',
      'tynk cementowo-wapienny super lekki',
    ],
    metaDescription:
      'PTC-15 to gładki tynk wapienno-cementowy super lekki PROFIX (uziarnienie 0,1–0,4 mm) na ściany i sufity. Wydajność większa o ok. 40%, aplikacja ręczna i maszynowa. Kupujesz prosto od producenta z Krzeszowic.',
    faq: [
      {
        q: 'Czy tynk PTC-15 nakłada się ręcznie czy maszynowo?',
        a: 'Obiema metodami. PTC-15 nadaje się do nakładania ręcznego oraz mechanicznego agregatem tynkarskim, także w technice silosowej.',
      },
      {
        q: 'Jakie jest zużycie tynku PTC-15?',
        a: 'Ok. 12 kg/m² przy warstwie 10 mm. Worek 30 kg wystarcza wtedy na ok. 2,5 m² powierzchni. Minimalna grubość tynku to 10 mm.',
      },
      {
        q: 'Ile wody dodać do worka 30 kg PTC-15?',
        a: 'Ok. 8,5 l czystej wody na 30 kg (0,27–0,29 l na 1 kg), do uzyskania jednorodnej masy. Czas pracy z zaprawą nie przekracza 2 godzin.',
      },
      {
        q: 'Czy podłoże trzeba zagruntować przed nałożeniem PTC-15?',
        a: 'Tak. Zastosuj obrzutkę wstępną POW-100, a podłoża ekstremalnie chłonne dodatkowo zagruntuj gruntem tynkarskim PROFIX. Drugą warstwę nakładaj na pierwszą zatartą „na ostro”.',
      },
      {
        q: 'Czym PTC-15 różni się od PTC-12?',
        a: 'PTC-15 to gładki tynk super lekki o drobnym uziarnieniu 0,1–0,4 mm, przeznaczony na ściany i sufity wewnątrz budynków. PTC-12 ma grubsze uziarnienie 0,1–0,8 mm, jest cięższy i nadaje się też na ściany zewnętrzne.',
      },
      {
        q: 'Na jakie podłoża można nakładać PTC-15?',
        a: 'Na ściany wewnętrzne i stropy, także silnie porowate: cegłę i pustak porowaty, beton komórkowy, beton szalowany, piaskowiec. Sprawdza się jako tynk podkładowy pod tynki ozdobne i farby oraz jako tynk naprawczy.',
      },
      {
        q: 'Czy PTC-15 nadaje się pod malowanie i tynki dekoracyjne?',
        a: 'Tak. Dzięki drobnemu uziarnieniu daje gładką powierzchnię i jest przeznaczony jako warstwa podkładowa pod farby oraz tynki ozdobne.',
      },
      {
        q: 'Dlaczego PTC-15 jest wydajniejszy od zwykłego tynku?',
        a: 'Zawiera perlit i dodatki napowietrzające, które zwiększają wydajność zaprawy o ok. 40%. Właściwości tiksotropowe sprawiają, że przy grubszym narzucie nie spływa ze ścian i sufitów, co ogranicza straty materiału.',
      },
    ],
  },

  // === DOCIEPLENIA - PRODUKTY UZUPEŁNIAJĄCE ===
  {
    slug: 'kolek-do-styropianu',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Kołek do styropianu',
    tagline: 'Łącznik mechaniczny do mocowania izolacji',
    description:
      'Plastikowy łącznik z trzpieniem (metalowym lub plastikowym) do mechanicznego mocowania płyt styropianowych do podłoża. Stosowany jako uzupełnienie kleju w systemach ETICS.',
    features: ['Stosowany w ETICS', 'Dostępne różne długości', 'Trzpień metalowy lub plastikowy', 'Duża głowica, lepszy rozkład sił'],
    usage: 'Mechaniczne mocowanie płyt styropianowych i wełny w systemach ociepleń.',
    notes: ['Długość dobiera się do grubości izolacji + minimum zakotwienia w warstwie nośnej'],
    draft: true,
  },
  {
    slug: 'siatka-elewacyjna',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Siatka elewacyjna',
    tagline: 'Siatka z włókna szklanego do warstwy zbrojonej',
    description:
      'Siatka z włókna szklanego o oczku ~4 mm, alkalo-odporna, zatapiana w warstwie kleju szpachlowego w systemach ETICS. Zwiększa wytrzymałość warstwy zbrojonej na pękanie.',
    features: ['Włókno szklane', 'Oczko ok. 4 mm', 'Alkalo-odporna', 'Do systemów ETICS'],
    usage: 'Warstwa zbrojona w systemach ociepleń elewacji (na styropianie i wełnie).',
    notes: ['Rolki standardowo 1 x 50 m'],
    draft: true,
  },
  {
    slug: 'naroznik-z-siatka',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Narożnik z siatką',
    tagline: 'Aluminiowy narożnik wzmacniający krawędzie',
    description:
      'Profil narożnikowy z aluminium z fabrycznie zamocowaną siatką z włókna szklanego. Wzmacnia naroże w systemach ociepleń i chroni przed uszkodzeniami mechanicznymi.',
    features: [
      'Aluminium + siatka z włókna szklanego',
      'Wzmocnienie naroży ETICS',
      'Ochrona mechaniczna ostrych krawędzi',
      'Doskonała przyczepność mas szpachlowych i farb',
    ],
    usage: 'Wzmocnienie krawędzi styropianu w systemach dociepleń. Naroża płyt gipsowo-kartonowych. Wszędzie tam, gdzie naroże jest narażone na uszkodzenia.',
    application: 'Wpuszczany w klej szpachlowy razem z siatką zbrojeniową, dociskany pacą.',
  },
  {
    slug: 'listwa-okienna-z-siatka',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Listwa okienna z siatką',
    tagline: 'Profil przyokienny z uszczelką i siatką',
    description:
      'Listwa PCV do wykończenia ościeży okiennych w systemach ociepleń. Posiada uszczelkę rozprężną i fabrycznie zamocowaną siatkę z włókna szklanego do połączenia z warstwą zbrojoną.',
    features: ['PCV + uszczelka + siatka', 'Pył- i wodoszczelne połączenie z oknem', 'Estetyczne wykończenie ościeży'],
    usage: 'Ościeża okienne w elewacjach z systemem ociepleń.',
    notes: ['Najczęściej stosowana długość 2,4 m'],
    draft: true,
  },
  {
    slug: 'folia-ochronna-2',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Folia ochronna',
    tagline: 'Folia malarska/tynkarska do zabezpieczania powierzchni',
    description:
      'Mocna, przezroczysta folia ochronna do zabezpieczania powierzchni przed uszkodzeniami i zabrudzeniem podczas prac tynkarskich i malarskich.',
    features: ['Przezroczysta', 'Wytrzymała', 'Standardowy wymiar 5 x 4 m (20 m²)'],
    usage: 'Zabezpieczanie podłóg, mebli i okien podczas remontów.',
    packaging: '5 x 4 m (20 m²)',
    draft: true,
  },
  {
    slug: 'tasma-malarska-2',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Taśma tynkarska',
    tagline: 'Pomarańczowa taśma tynkarska Blue Dolphin',
    description:
      'Profesjonalna taśma tynkarska Blue Dolphin Tapes, odporna na wilgoć i uszkodzenia mechaniczne, łatwa w przerywaniu, sprawdza się na ostrych krawędziach.',
    features: ['Odporna na wilgoć', 'Wytrzymała mechanicznie', 'Łatwo się odrywa po pracy', 'Pomarańczowy kolor'],
    usage: 'Maskowanie krawędzi podczas tynkowania i malowania.',
    packaging: '48 mm x 50 m',
    draft: true,
  },
  {
    slug: 'inne-2',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Inne akcesoria do dociepleń',
    tagline: 'Profile, łączniki, drobny osprzęt, na zapytanie',
    description:
      'Dodatkowe akcesoria do systemów ociepleń, listwy startowe, profile dylatacyjne, łączniki specjalne. Asortyment dopasowujemy do projektu.',
    features: ['Asortyment na zamówienie', 'Listwy startowe, dylatacyjne, narożniki specjalne'],
    usage: 'Uzupełnienie pełnego systemu ETICS.',
    draft: true,
    notes: ['Skontaktuj się z nami, by ustalić zakres dostawy'],
  },

  // === TYNKI - PRODUKTY UZUPEŁNIAJĄCE ===
  {
    slug: 'folia-ochronna',
    categorySlug: 'tynki-produkty-uzupelniajace',
    name: 'Folia ochronna',
    tagline: 'Folia malarska/tynkarska do zabezpieczania powierzchni',
    description:
      'Mocna, przezroczysta folia ochronna do zabezpieczania powierzchni przed uszkodzeniami i zabrudzeniem podczas prac tynkarskich i malarskich.',
    features: ['Przezroczysta', 'Wytrzymała', 'Standardowy wymiar 5 x 4 m (20 m²)'],
    usage: 'Zabezpieczanie podłóg, mebli i okien podczas remontów.',
    packaging: '5 x 4 m (20 m²)',
    draft: true,
  },
  {
    slug: 'tasma-malarska',
    categorySlug: 'tynki-produkty-uzupelniajace',
    name: 'Taśma malarska',
    tagline: 'Taśma maskująca do prac malarskich',
    description:
      'Taśma malarska do precyzyjnego maskowania krawędzi podczas malowania. Łatwo się odrywa bez pozostawiania kleju na powierzchni.',
    features: ['Łatwa do odrywania', 'Bez pozostałości kleju', 'Standardowa szerokość', 'Do wnętrz'],
    usage: 'Maskowanie listew, ościeży, krawędzi sufitów podczas malowania.',
    packaging: '48 mm x 50 m',
    draft: true,
  },
  {
    slug: 'listwa-przyokienna-pcv',
    categorySlug: 'tynki-produkty-uzupelniajace',
    name: 'Listwa przyokienna PCV',
    tagline: 'Profil PCV z uszczelką dla ościeży okiennych',
    description:
      'Listwa PCV z uszczelką rozprężną do wykończenia połączenia tynk-okno. Eliminuje pęknięcia i nieszczelności w miejscu styku.',
    features: ['PCV + uszczelka', 'Zapobiega pęknięciom', 'Estetyczne wykończenie'],
    usage: 'Ościeża okienne we wnętrzach i na elewacjach.',
    notes: ['Standardowa długość 2,4 m'],
    draft: true,
  },
  {
    slug: 'naroznik-murarski-tynkarski',
    categorySlug: 'tynki-produkty-uzupelniajace',
    name: 'Narożnik murarski / tynkarski',
    tagline: 'Aluminiowy profil do wzmacniania naroży tynkowanych',
    description:
      'Profil narożnikowy z aluminium do wzmacniania krawędzi tynkowanych ścian i naroży zewnętrznych. Daje estetyczną, równą krawędź.',
    features: ['Aluminiowy profil', 'Wzmocnienie naroża', 'Prosta krawędź pod tynk', 'Odporny na korozję'],
    usage: 'Naroża zewnętrzne ścian, połączenia ścian, ościeża drzwiowe.',
    notes: ['Długości standardowe 2,5 m i 3 m'],
    draft: true,
  },
  {
    slug: 'naroznik-widra-apbk-do-lukow',
    categorySlug: 'tynki-produkty-uzupelniajace',
    name: 'Narożnik elastyczny do łuków',
    tagline: 'Profil elastyczny dopasowujący się do łuków',
    description:
      'Elastyczny profil narożnikowy do tworzenia łukowych przejść i krzywizn. Wykonany z materiału umożliwiającego dopasowanie do wybranego promienia.',
    features: ['Elastyczny', 'Do łuków i krzywizn', 'Z siatką zbrojącą', 'Łatwy w docinaniu'],
    usage: 'Łuki ścienne, łukowe ościeża, dekoracyjne wnęki.',
    draft: true,
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'inne',
    categorySlug: 'tynki-produkty-uzupelniajace',
    name: 'Inne akcesoria do tynków',
    tagline: 'Drobny osprzęt tynkarski, na zapytanie',
    description:
      'Dodatkowe akcesoria do prac tynkarskich, profile dylatacyjne, listwy okapowe, specjalistyczne narożniki. Asortyment dostosowujemy do projektu.',
    features: ['Asortyment na zamówienie'],
    usage: 'Uzupełnienie typowego cyklu tynkowania.',
    draft: true,
    notes: ['Skontaktuj się z nami, by ustalić zakres dostawy'],
  },

  // === BETONY ===
  {
    slug: 'beton-c-16-20',
    categorySlug: 'betony',
    name: 'Beton C16/20',
    brand: 'PROFIX',
    tagline: 'Mrozoodporna mieszanka konstrukcyjna do typowych prac betoniarskich',
    description:
      'Sucha mieszanka betonowa klasy wytrzymałości C16/20 (dawniej B-20). Skomponowana z cementu portlandzkiego, piasku kwarcowego i żwiru 0,1-4 mm z dodatkami uplastyczniającymi. Wystarczy dodać czystą wodę, po 28 dniach uzyskuje wytrzymałość ≥ 20 MPa.',
    features: [
      'Klasa wytrzymałości C16/20 (≥ 20 MPa po 28 dniach)',
      'Mrozoodporna',
      'Duża wytrzymałość',
      'Gotowa mieszanka, wystarczy dodać wodę',
      'Drobne uziarnienie 0-4 mm',
      'Dostępny także luzem w technice silosowej',
    ],
    usage:
      'Podkłady podłogowe na bazie cementu wewnątrz obiektów budowlanych. Mocowanie słupków i kotwień. Wykonywanie posadzek użytkowych.',
    application:
      'Do odmierzonej zimnej wody (3,4 l) wsypać zawartość worka 25 kg i mieszać 2-3 minuty mieszadłem mechanicznym lub w betoniarce do uzyskania jednorodnej konsystencji. Efektywne mieszanie powinno trwać nie krócej niż 5 min od dodania całej wody zarobowej. Zaprawę wyrobić w ciągu około 1 godziny. Beton zagęścić, ściągnąć i wygładzić powierzchnię.',
    mixing: '3,4 l wody na worek 25 kg (≈ 0,13-0,14 l/kg)',
    consumption: 'ok. 20 kg/m² przy grubości 1 cm (min. 10 mm)',
    packaging: '25 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '6 miesięcy w szczelnie zamkniętym, oryginalnym opakowaniu',
    image: '/photos/products/beton-c-16-20.png',
    norms: ['EN 13813:2002'],
    extraSpecs: [
      { label: 'Klasa wytrzymałości', value: 'C16/20 (≥ 20 MPa @ 28 dni)' },
      { label: 'Uziarnienie', value: '0-4 mm' },
      { label: 'Min. grubość warstwy', value: '10 mm' },
      { label: 'Min. czas mieszania', value: '5 min od dodania wody' },
      { label: 'Czas roboczy po zarobieniu', value: 'ok. 1 godzina' },
    ],
    documents: [
      { label: 'Karta techniczna', href: '/dokumenty/profix-beton-c-16-20-karta-techniczna.pdf' },
      {
        label: 'Deklaracja właściwości użytkowych',
        href: '/dokumenty/profix-beton-c-16-20-deklaracja-wlasciwosci-uzytkowych.pdf',
      },
      { label: 'Karta charakterystyki', href: '/dokumenty/profix-beton-c-16-20-karta-charakterystyki.pdf' },
    ],
    notes: [
      'Pielęgnacja wilgotnościowa przez 3-7 dni po wykonaniu (zwilżanie i przykrycie).',
      'Nie wykonywać prac na przemrożonym podłożu ani przy ryzyku przymrozków.',
    ],
  },
  {
    slug: 'beton-c-20-25',
    categorySlug: 'betony',
    name: 'Beton C20/25',
    brand: 'PROFIX',
    tagline: 'Mrozoodporna mieszanka do prac konstrukcyjnych, naprawczych i remontowych',
    description:
      'Sucha mieszanka betonowa klasy wytrzymałości C20/25 na bazie cementu portlandzkiego, piasku kwarcowego i żwiru 0,1-4 mm z dodatkami uplastyczniającymi. Wszechstronna, sprawdza się w pracach konstrukcyjnych, remontowych i naprawczych. Po 28 dniach uzyskuje wytrzymałość ≥ 25 MPa i staje się odporna na warunki atmosferyczne.',
    features: [
      'Klasa wytrzymałości C20/25 (≥ 25 MPa po 28 dniach)',
      'Mrozoodporna',
      'Duża wytrzymałość',
      'Odporna na warunki atmosferyczne',
      'Do prac wewnętrznych i zewnętrznych',
      'Drobne uziarnienie 0-4 mm',
      'Dostępny także luzem w technice silosowej',
    ],
    usage:
      'Prace konstrukcyjne, naprawcze i remontowe, podkłady podłogowe, posadzki, mury, nadproża, belki, kotwienie słupków. Stosowana wewnątrz i na zewnątrz budynków.',
    application:
      'Do 3,4 l zimnej wody wsypać zawartość worka 25 kg i mieszać 2-3 minuty mieszadłem mechanicznym lub w betoniarce do uzyskania jednorodnej konsystencji. Efektywne mieszanie powinno trwać nie krócej niż 5 min od dodania całej wody zarobowej. Zaprawę wyrobić w ciągu około 1 godziny. Po nałożeniu starannie zagęścić, ściągnąć, zatrzeć i wygładzić powierzchnię.',
    mixing: '3,4 l wody na worek 25 kg (≈ 0,13-0,14 l/kg)',
    consumption: 'ok. 20 kg/m² przy grubości 1 cm (min. 10 mm)',
    packaging: '25 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '6 miesięcy w szczelnie zamkniętym, oryginalnym opakowaniu',
    image: '/photos/products/beton-c-20-25.png',
    norms: ['EN 13813:2002'],
    extraSpecs: [
      { label: 'Klasa wytrzymałości', value: 'C20/25 (≥ 25 MPa @ 28 dni)' },
      { label: 'Uziarnienie', value: '0-4 mm' },
      { label: 'Min. grubość warstwy', value: '10 mm' },
      { label: 'Min. czas mieszania', value: '5 min od dodania wody' },
      { label: 'Czas roboczy po zarobieniu', value: 'ok. 1 godzina' },
      { label: 'Zastosowanie', value: 'wewnątrz i na zewnątrz' },
    ],
    documents: [
      { label: 'Karta techniczna', href: '/dokumenty/profix-beton-c-20-25-karta-techniczna.pdf' },
      {
        label: 'Deklaracja właściwości użytkowych',
        href: '/dokumenty/profix-beton-c-20-25-deklaracja-wlasciwosci-uzytkowych.pdf',
      },
      { label: 'Karta charakterystyki', href: '/dokumenty/profix-beton-c-20-25-karta-charakterystyki.pdf' },
    ],
    notes: [
      'Pielęgnacja wilgotnościowa przez 3-7 dni, zwilżanie i przykrycie powierzchni.',
      'Nie wykonywać prac na przemrożonym podłożu ani przy ryzyku przymrozków.',
    ],
  },
  {
    slug: 'beton-c-25-30',
    categorySlug: 'betony',
    name: 'Beton C25/30',
    brand: 'PROFIX',
    tagline: 'Wysoka klasa, mrozoodporny beton konstrukcyjny i naprawczy',
    description:
      'Wysoka klasa wytrzymałości C25/30 (≥ 30 MPa po 28 dniach). Skomponowany z cementu portlandzkiego, piasku kwarcowego i żwiru 0,1-4 mm z dodatkami uplastyczniającymi. Mrozoodporny i odporny na warunki atmosferyczne, sprawdza się w pracach konstrukcyjnych, naprawczych i remontowych, zarówno wewnątrz jak i na zewnątrz.',
    features: [
      'Klasa wytrzymałości C25/30 (≥ 30 MPa po 28 dniach)',
      'Mrozoodporna',
      'Duża wytrzymałość',
      'Odporna na warunki atmosferyczne',
      'Do prac wewnętrznych i zewnętrznych',
      'Do napraw elementów konstrukcyjnych',
      'Dostępny także luzem w technice silosowej',
    ],
    usage:
      'Prace konstrukcyjne, naprawcze i remontowe, podkłady podłogowe, posadzki, mury, nadproża, belki, kotwienie słupków, naprawy elementów konstrukcyjnych. Stosowana wewnątrz i na zewnątrz budynków.',
    application:
      'Do 3,4 l zimnej wody wsypać worek 25 kg, mieszać 2-3 minuty mieszadłem mechanicznym lub w betoniarce do uzyskania jednorodnej konsystencji. Efektywne mieszanie powinno trwać nie krócej niż 5 min od dodania całej wody zarobowej. Zaprawę zużyć w ciągu około 1 godziny. Po nałożeniu starannie zagęścić, ściągnąć, zatrzeć i wygładzić powierzchnię.',
    mixing: '3,4 l wody na worek 25 kg (≈ 0,13-0,14 l/kg)',
    consumption: 'ok. 20 kg/m² przy grubości 1 cm (min. 10 mm)',
    packaging: '25 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '6 miesięcy w szczelnie zamkniętym, oryginalnym opakowaniu',
    image: '/photos/products/beton-c-25-30.png',
    norms: ['EN 13813:2002', 'EN 1504-3:2005'],
    extraSpecs: [
      { label: 'Klasa wytrzymałości', value: 'C25/30 (≥ 30 MPa @ 28 dni)' },
      { label: 'Uziarnienie', value: '0-4 mm' },
      { label: 'Min. grubość warstwy', value: '10 mm' },
      { label: 'Min. czas mieszania', value: '5 min od dodania wody' },
      { label: 'Czas roboczy po zarobieniu', value: 'ok. 1 godzina' },
      { label: 'Zastosowanie', value: 'wewnątrz i na zewnątrz' },
    ],
    documents: [
      { label: 'Karta techniczna', href: '/dokumenty/profix-beton-c-25-30-karta-techniczna.pdf' },
      {
        label: 'Deklaracja właściwości użytkowych',
        href: '/dokumenty/profix-beton-c-25-30-deklaracja-wlasciwosci-uzytkowych.pdf',
      },
      { label: 'Karta charakterystyki', href: '/dokumenty/profix-beton-c-25-30-karta-charakterystyki.pdf' },
    ],
    notes: [
      'Pielęgnacja wilgotnościowa przez 3-7 dni po wykonaniu.',
      'Nie wykonywać prac na przemrożonym podłożu ani przy ryzyku przymrozków.',
    ],
  },
  {
    slug: 'beton-c-30-35',
    categorySlug: 'betony',
    name: 'Beton C30/35',
    brand: 'PROFIX',
    tagline: 'Najwyższa klasa wytrzymałości, uniwersalny beton naprawczy i konstrukcyjny',
    description:
      'Sucha mieszanka betonowa klasy C30/35 na bazie cementu portlandzkiego, piasku kwarcowego i żwiru 0,1-4 mm z dodatkami uplastyczniającymi i polepszającymi wyrób. Uniwersalna mieszanka do prac naprawczych oraz podkładów podłogowych, do stosowania wewnątrz i na zewnątrz. Po 28 dniach uzyskuje wytrzymałość ≥ 35 MPa oraz odporność na działanie warunków atmosferycznych.',
    features: [
      'Klasa wytrzymałości C30/35 (≥ 35 MPa po 28 dniach)',
      'Najwyższa wytrzymałość w serii betonów PROFIX',
      'Mrozoodporna',
      'Odporna na warunki atmosferyczne',
      'Do prac wewnętrznych i zewnętrznych',
      'Drobne uziarnienie 0-4 mm',
      'Dostępny także luzem w technice silosowej',
    ],
    usage:
      'Uniwersalna mieszanka do prac naprawczych. Podkłady podłogowe na bazie cementu wewnątrz obiektów budowlanych oraz prace inżynierskie. Do stosowania zarówno wewnątrz, jak i na zewnątrz budynków.',
    application:
      'Do odmierzonych 3,4 l chłodnej wody wsypać zawartość worka 25 kg i dokładnie mieszać 2-3 minuty, najlepiej mieszadłem mechanicznym lub w betoniarce, do uzyskania jednorodnej konsystencji. Tak przygotowaną zaprawę wyrobić w ciągu około 1 godziny. Nałożony beton starannie zagęścić, a następnie ściągnąć, zatrzeć i wygładzić powierzchnię.',
    mixing: '3,4 l wody na worek 25 kg (≈ 0,13-0,14 l/kg)',
    consumption: 'ok. 20 kg/m² przy grubości 1 cm (min. 10 mm)',
    packaging: '25 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '6 miesięcy w szczelnie zamkniętym, oryginalnym opakowaniu',
    image: '/photos/products/beton-c-30-35.png',
    norms: ['EN 13813:2002', 'EN 1504-3:2005'],
    extraSpecs: [
      { label: 'Klasa wytrzymałości', value: 'C30/35 (≥ 35 MPa @ 28 dni)' },
      { label: 'Uziarnienie', value: '0-4 mm' },
      { label: 'Min. grubość warstwy', value: '10 mm' },
      { label: 'Czas mieszania', value: '2-3 min' },
      { label: 'Czas roboczy po zarobieniu', value: 'ok. 1 godzina' },
      { label: 'Zastosowanie', value: 'wewnątrz i na zewnątrz' },
    ],
    notes: [
      'Pielęgnacja wilgotnościowa przez 3-7 dni po związaniu (polewanie i okrywanie powierzchni).',
      'Przez pierwsze 3 dni chronić przed zbyt szybkim wysychaniem, unikać przeciągów i zbyt mocnego nasłonecznienia.',
      'Nie wykonywać prac na przemrożonym podłożu ani przy ryzyku przymrozków.',
    ],
  },
];

/** Published (non-draft) products only. Drafts are placeholders awaiting client content. */
export const publishedProducts: Product[] = products.filter((p) => !p.draft);

export const getProductsByCategory = (categorySlug: string): Product[] =>
  publishedProducts.filter((p) => p.categorySlug === categorySlug);

export const getProduct = (categorySlug: string, slug: string): Product | undefined =>
  publishedProducts.find((p) => p.categorySlug === categorySlug && p.slug === slug);

/** True when category has at least one published product (used to hide empty categories). */
export const categoryHasProducts = (categorySlug: string): boolean =>
  publishedProducts.some((p) => p.categorySlug === categorySlug);
