export type Product = {
  slug: string;
  categorySlug: string;
  name: string;
  brand?: string;
  tagline: string;
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
  image?: string;
};

export const products: Product[] = [
  // === GRUNTY ===
  {
    slug: 'grunt-betonkontakt',
    categorySlug: 'grunty',
    name: 'Grunt Beton-Kontakt',
    brand: 'Beton-Kontakt',
    tagline: 'Grunt z piaskiem kwarcowym pod gładkie i trudne podłoża',
    description:
      'Wodna dyspersja kopolimerów akrylowych z piaskiem kwarcowym. Szybkoschnąca, o łagodnym zapachu. Wzmacnia podłoże i zwiększa przyczepność kolejnych warstw.',
    features: [
      'Wzmacnia podłoże',
      'Zwiększa przyczepność',
      'Wyrównuje chłonność',
      'Szybkoschnący',
      'Łagodny zapach',
    ],
    usage:
      'Pod okładziny ceramiczne i kamionkowe, gładzie szpachlowe, tapety, płyty paździerzowe i drewnopochodne. Wewnątrz i na zewnątrz.',
    application:
      'Podłoże musi być czyste, suche, wolne od kurzu, oleju, wapna, wosku i starych farb. Nanosić pędzlem lub wałkiem. Unikać opadów i silnego nasłonecznienia.',
    consumption: 'ok. 0,2 kg/m² (zależnie od chłonności podłoża)',
    packaging: '25 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    notes: ['Chronić przed przemrożeniem - produkt przemrożony nie nadaje się do użytku'],
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
  },
  {
    slug: 'grunt-gleboko-penetrujacy-koncentrat',
    categorySlug: 'grunty',
    name: 'Grunt głęboko penetrujący - koncentrat',
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
  },
  {
    slug: 'grunt-tynkarski-akrylowy',
    categorySlug: 'grunty',
    name: 'Grunt tynkarski akrylowy',
    brand: 'AkrylGrunt',
    tagline: 'Pod akrylowe masy tynkarskie i farby fasadowe',
    description:
      'Szybkoschnąca wodna dyspersja kopolimerów akrylowych z dodatkami modyfikującymi. Dedykowany podkład pod akrylowe systemy tynkarskie - zwiększa przyczepność i ujednolica kolorystyczne krycie.',
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
  },
  {
    slug: 'grunt-tynkarski-koncentrat',
    categorySlug: 'grunty',
    name: 'Grunt tynkarski - koncentrat',
    brand: 'MaxGrunt',
    tagline: 'Wydajny koncentrat 1:5 do rozcieńczania',
    description:
      'Koncentrat z wodnej dyspersji kopolimerów akrylowych z dodatkami modyfikującymi. Jednorodna ciecz o łagodnym zapachu. Po rozcieńczeniu pełni rolę uniwersalnego gruntu pod tynki i wykończenia.',
    features: [
      'Wzmacnia podłoże',
      'Zwiększa przyczepność',
      'Wyrównuje chłonność',
      'Szybko schnie',
      'Łagodny zapach',
    ],
    usage:
      'Pod kleje, gładzie, tynki, posadzki, farby. Pod okładziny ceramiczne, gładzie szpachlowe, tapety, płyty drewnopochodne. Wewnątrz i na zewnątrz.',
    application:
      'Czyste, suche podłoże bez kurzu, oleju, wapna i starych farb. Nanosić pędzlem lub wałkiem.',
    mixing: 'Rozcieńczyć z czystą wodą w stosunku 1:5 (lub dobrać do chłonności podłoża)',
    consumption: 'ok. 0,2 kg/m² gotowej cieczy',
    packaging: '18 kg',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w oryginalnym opakowaniu',
    notes: ['Chronić przed przemrożeniem'],
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
  },

  // === FARBY WEWNĘTRZNE ===
  {
    slug: 'farba-wewnetrzna-lateksowa',
    categorySlug: 'farby-wewnetrzne',
    name: 'Farba wewnętrzna lateksowa',
    tagline: 'Trwała powłoka odporna na zmywanie i szorowanie',
    description:
      'Ekologiczna farba lateksowa do dekoracyjnego malowania ścian i sufitów we wnętrzach. Daje matową, jednolitą powłokę o dobrym kryciu - po wyschnięciu odporną na czyszczenie wodą z detergentem.',
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
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'farba-wewnetrzna-silikonowa',
    categorySlug: 'farby-wewnetrzne',
    name: 'Farba wewnętrzna silikonowa',
    tagline: 'Wytrzymała farba silikonowa do wymagających wnętrz',
    description:
      'Farba silikonowa na bazie żywicy silikonowej. Wysoka paroprzepuszczalność i odporność na zabrudzenia - dobry wybór do wnętrz o intensywnej eksploatacji.',
    features: ['Paroprzepuszczalna', 'Odporna na zabrudzenia', 'Trwała', 'Wodorozcieńczalna'],
    usage: 'Wnętrza mieszkalne i użytkowe, kuchnie, korytarze, pomieszczenia narażone na wilgoć.',
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
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'farba-fasadowa-silikatowo-silikonowa',
    categorySlug: 'farby-fasadowe-elewacyjne',
    name: 'Farba fasadowa silikatowo-silikonowa',
    tagline: 'Hybrydowa formuła na trudne fasady',
    description:
      'Łączy zalety farb krzemianowych i silikonowych. Bardzo dobra paroprzepuszczalność przy jednoczesnej hydrofobowości - dobra na renowacje i obiekty zabytkowe.',
    features: ['Wysoka paroprzepuszczalność', 'Hydrofobowa', 'Odporna na zabrudzenia', 'Odporna na UV'],
    usage: 'Renowacje, fasady mineralne, obiekty zabytkowe. Na tynki cementowo-wapienne, silikatowe i mineralne.',
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'farba-fasadowa-silikonowa',
    categorySlug: 'farby-fasadowe-elewacyjne',
    name: 'Farba fasadowa silikonowa',
    tagline: 'Najwyższa odporność na czynniki atmosferyczne',
    description:
      'Farba na bazie żywicy silikonowej do elewacji wymagających najwyższej trwałości. Efekt samoczyszczenia powierzchni przy opadach.',
    features: ['Hydrofobowa - efekt samoczyszczenia', 'Wysoka paroprzepuszczalność', 'Odporna na grzyby i algi', 'Długa trwałość'],
    usage: 'Elewacje narażone na intensywne czynniki atmosferyczne. Budynki nowe i renowacje, podłoża mineralne i ETICS.',
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
    features: ['Mrozoodporny', 'Wodoodporny', 'Cienkowarstwowy', 'Dobre właściwości robocze'],
    usage:
      'Płytki ceramiczne, kamionkowe, fajansowe, mozaika ze szkła i porcelany. Na ścianach i podłogach, wewnątrz i na zewnątrz budynków.',
    application:
      'Podłoże nośne, suche, czyste - bez kurzu, tłuszczu i innych zanieczyszczeń. Luźne fragmenty skuć. Mieszać z czystą wodą. Nakładać pacą zębatą.',
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
      'Sucha mieszanka cementowa z dodatkami modyfikującymi elastyczność. Półelastyczny, mrozoodporny i wodoodporny - zalecany pod podłoża obciążone mechanicznie i termicznie, w tym ogrzewanie podłogowe.',
    features: ['Półelastyczny', 'Mrozoodporny', 'Wodoodporny', 'Pod ogrzewanie podłogowe'],
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
    features: ['Do systemów ETICS', 'Mrozoodporna', 'Dobra przyczepność do EPS', 'Praca w temperaturze dodatniej'],
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
    features: ['Do styropianu i wełny mineralnej', 'Do systemów ETICS', 'Mrozoodporna'],
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
    features: ['Biały kolor', 'Mocowanie i zatapianie w jednym produkcie', 'Mrozoodporna', 'Pod jasne tynki cienkowarstwowe'],
    usage: 'Pełny cykl ETICS - mocowanie izolacji (EPS, wełna) i warstwa zbrojona z siatką.',
    application:
      'Mocowanie: pacą zębatą równomiernie na całą powierzchnię płyty, docisnąć do podłoża. Warstwa zbrojona: nanieść klej, zatopić siatkę i wygładzić.',
    tempRange: '+5°C / +25°C',
    shelfLife: '12 miesięcy w szczelnie zamkniętym opakowaniu (chronić przed wilgocią)',
  },

  // === TYNKI CIENKOWARSTWOWE ===
  {
    slug: 'akrylowa-masa-tynkarska-kornik-baranek-1mm-3mm',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Akrylowa masa tynkarska - Kornik / Baranek 1-3 mm',
    tagline: 'Dekoracyjny tynk akrylowy na elewacje i wnętrza',
    description:
      'Gotowa do użycia masa tynkarska na bazie żywic akrylowych. Dostępna w fakturach kornik (drapana) i baranek (kasza) o uziarnieniu 1-3 mm. Tworzy trwałą, elastyczną powłokę dekoracyjną.',
    features: ['Gotowa do użycia', 'Wodoodporna', 'Trwała powłoka dekoracyjna', 'Faktury: kornik, baranek'],
    usage: 'Elewacje budynków, systemy ETICS, dekoracyjne wykończenie wnętrz. Na podłoża mineralne i gruntowane.',
    notes: ['Wymaga gruntowania - patrz Grunt tynkarski akrylowy', 'Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'siliconowa-masa-tynkarska-kornik-baranek-1mm-3mm',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Silikonowa masa tynkarska - Kornik / Baranek 1-3 mm',
    tagline: 'Hydrofobowa elewacja silikonowa o długiej trwałości',
    description:
      'Masa tynkarska na bazie żywicy silikonowej, gotowa do użycia. Hydrofobowość zapewnia efekt samoczyszczenia powierzchni przy opadach. Faktura kornik lub baranek, ziarno 1-3 mm.',
    features: ['Hydrofobowa - efekt samoczyszczenia', 'Wysoka paroprzepuszczalność', 'Odporna na grzyby i algi', 'Faktury: kornik, baranek'],
    usage: 'Elewacje budynków, w tym renowacje. Najbardziej polecana w systemach ETICS narażonych na warunki atmosferyczne.',
    notes: ['Wymaga gruntowania - patrz Grunt tynkarski silikonowy', 'Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'sylikatowo-sylikonowa-masa-tynkarska-kornik-baranek-1mm-3mm',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Silikatowo-silikonowa masa tynkarska - Kornik / Baranek 1-3 mm',
    tagline: 'Hybrydowa formuła łącząca cechy silikatów i silikonów',
    description:
      'Masa tynkarska oparta na hybrydowym spoiwie silikatowo-silikonowym. Łączy wysoką paroprzepuszczalność tynków krzemianowych z hydrofobowością tynków silikonowych - dobry wybór na renowacje i obiekty zabytkowe. Ziarno 1-3 mm.',
    features: ['Bardzo wysoka paroprzepuszczalność', 'Hydrofobowa', 'Dla renowacji i zabytków', 'Faktury: kornik, baranek'],
    usage: 'Elewacje budynków zabytkowych i renowacyjnych, oraz systemy ETICS.',
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'tynk-mineralny-kornik-baranek-1mm-3mm',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Tynk mineralny - Kornik / Baranek 1-3 mm',
    tagline: 'Cementowy tynk dekoracyjny do malowania',
    description:
      'Sucha mieszanka tynkarska na bazie cementu z wypełniaczami mineralnymi. Po nałożeniu i wyschnięciu wymaga malowania farbą fasadową (silikonową lub silikatowo-silikonową). Faktura kornik lub baranek 1-3 mm.',
    features: ['Cementowa baza', 'Najwyższa paroprzepuszczalność', 'Trwała', 'Faktury: kornik, baranek'],
    usage: 'Elewacje budynków i systemy ETICS. Do malowania farbą fasadową po nałożeniu.',
    application: 'Mieszać z czystą wodą do uzyskania jednorodnej masy. Nakładać pacą stalową, fakturować pacą plastikową.',
    notes: ['Wymaga gruntowania i malowania farbą fasadową', 'Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'trawertyn',
    categorySlug: 'tynki-cienkowarstwowe',
    name: 'Trawertyn',
    tagline: 'Dekoracyjny tynk imitujący kamień',
    description:
      'Dekoracyjna masa tynkarska tworząca powierzchnię imitującą naturalny trawertyn. Do wykończenia wnętrz i wybranych powierzchni elewacyjnych - charakterystyczny efekt głębi i nieregularnej tekstury.',
    features: ['Efekt naturalnego kamienia', 'Dekoracyjny', 'Do wnętrz i fragmentów elewacji', 'Indywidualne barwienie'],
    usage: 'Salony, hole, wybrane fragmenty elewacji, lokale gastronomiczne i komercyjne.',
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
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'masa-szpachlowa-szara',
    categorySlug: 'szpachle-i-gladzie',
    name: 'Masa szpachlowa szara',
    tagline: 'Szpachla wypełniająca do wyrównywania podłoży',
    description:
      'Szara masa szpachlowa na bazie cementu lub gipsu (zależnie od wersji) - do wyrównywania większych nierówności i wypełnień. Może pełnić rolę warstwy podkładowej pod gładź wykończeniową.',
    features: ['Wypełniacz', 'Większa grubość warstwy', 'Dobra przyczepność do tynków i betonu'],
    usage: 'Wyrównywanie tynków, wypełnianie ubytków, naprawy fragmentów ścian i sufitów.',
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'elastic-masa-szpachlowa-z-wloknem-stalym',
    categorySlug: 'szpachle-i-gladzie',
    name: 'Elastic - masa szpachlowa z włóknem',
    brand: 'Elastic',
    tagline: 'Zbrojona włóknem masa do trudnych podłoży',
    description:
      'Masa szpachlowa wzmocniona włóknami zbrojącymi. Tworzy elastyczną, odporną na pękanie powłokę - dobra na podłoża pracujące (np. nad rysami konstrukcyjnymi) oraz pod ogrzewanie podłogowe.',
    features: ['Zbrojona włóknem', 'Elastyczna', 'Odporna na pęknięcia', 'Do podłoży pracujących'],
    usage: 'Szpachlowanie podłoży zarysowanych, łączeń materiałów, podłóg pod ogrzewanie podłogowe.',
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
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'wylewka-samopoziomujaca-cienkowarstwowa-01-10mm',
    categorySlug: 'inne-produkty',
    name: 'Wylewka samopoziomująca cienkowarstwowa 1-10 mm',
    tagline: 'Szybka, samopoziomująca masa wyrównująca',
    description:
      'Samopoziomująca masa wyrównująca o cienkiej warstwie roboczej (1-10 mm). Tworzy gładkie podłoże bezpośrednio pod okładziny - bez konieczności dodatkowej obróbki.',
    features: ['Samopoziomująca', 'Cienka warstwa 1-10 mm', 'Szybkie schnięcie', 'Gładka powierzchnia'],
    usage: 'Wyrównywanie istniejących wylewek i podłoży przed układaniem płytek, paneli, wykładzin.',
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'zaprawa-beton-b-20',
    categorySlug: 'inne-produkty',
    name: 'Zaprawa - beton B-20',
    tagline: 'Beton drobnoziarnisty klasy B-20 (C16/20)',
    description:
      'Sucha mieszanka betonowa klasy wytrzymałości B-20 (C16/20). Do napraw i drobnych prac konstrukcyjnych - fundamenty, słupki, schody, naprawy ubytków.',
    features: ['Klasa B-20 / C16/20', 'Wytrzymały na ściskanie', 'Sucha mieszanka', 'Łatwy w użyciu'],
    usage: 'Drobne prace betoniarskie, fundamenty pomocnicze, naprawy ubytków, podbetonowanie.',
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'zaprawa-murarska',
    categorySlug: 'inne-produkty',
    name: 'Zaprawa murarska',
    tagline: 'Klasyczna zaprawa do murowania',
    description:
      'Sucha zaprawa murarska na bazie cementu z dodatkami modyfikującymi urabialność. Do murowania ścian wewnętrznych i zewnętrznych z typowych materiałów murarskich.',
    features: ['Cementowa baza', 'Dobra urabialność', 'Sucha mieszanka', 'Mrozoodporna'],
    usage: 'Murowanie ścian zewnętrznych i wewnętrznych, ogrodzeń, kominów - z cegły, pustaków, bloczków.',
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },

  // === TYNKI CEMENTOWO-WAPIENNE ===
  {
    slug: 'pow-100-obrzutka-wstepna',
    categorySlug: 'tynki-cementowo-wapienne',
    name: 'POW-100 Obrzutka wstępna',
    brand: 'POW-100',
    tagline: 'Cementowa warstwa sczepna pod tynki',
    description:
      'Sucha zaprawa cementowa do wykonania obrzutki wstępnej - cienkiej warstwy sczepnej zwiększającej przyczepność tynku do podłoża. Aplikowana ręcznie lub maszynowo, pokrycie typowo 50-70% powierzchni.',
    features: ['Warstwa sczepna pod tynk', 'Aplikacja ręczna lub maszynowa', 'Cementowa baza', 'Mrozoodporna'],
    usage: 'Pod tynki cementowo-wapienne na podłożach o niskiej lub nierównej chłonności (beton, bloczki, ceramika).',
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'ptc-15-tynk-wapienno-cementowy-super-lekki',
    categorySlug: 'tynki-cementowo-wapienne',
    name: 'PTC-15 Tynk wapienno-cementowy super lekki',
    brand: 'PTC-15',
    tagline: 'Lekki tynk maszynowy do wnętrz i elewacji',
    description:
      'Sucha mieszanka tynkarska wapienno-cementowa o obniżonej gęstości (z perlitem lub lekkimi kruszywami). Dzięki niższej masie szybciej i wygodniej się aplikuje, a powłoka ma dobre właściwości termoizolacyjne.',
    features: ['Super lekki', 'Maszynowa lub ręczna aplikacja', 'Paroprzepuszczalny', 'Wapienno-cementowa baza'],
    usage: 'Tynkowanie wnętrz i elewacji budynków mieszkalnych, użytkowych i przemysłowych.',
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },

  // === DOCIEPLENIA - PRODUKTY UZUPEŁNIAJĄCE ===
  {
    slug: 'kolek-do-styropianu',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Kołek do styropianu',
    tagline: 'Łącznik mechaniczny do mocowania izolacji',
    description:
      'Plastikowy łącznik z trzpieniem (metalowym lub plastikowym) do mechanicznego mocowania płyt styropianowych do podłoża. Stosowany jako uzupełnienie kleju w systemach ETICS.',
    features: ['Stosowany w ETICS', 'Dostępne różne długości', 'Trzpień metalowy lub plastikowy', 'Duża głowica - lepszy rozkład sił'],
    usage: 'Mechaniczne mocowanie płyt styropianowych i wełny w systemach ociepleń.',
    notes: ['Długość dobiera się do grubości izolacji + minimum zakotwienia w warstwie nośnej'],
  },
  {
    slug: 'siatka-elewacyjna',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Siatka elewacyjna',
    tagline: 'Siatka z włókna szklanego do warstwy zbrojonej',
    description:
      'Siatka z włókna szklanego o oczku ~4 mm, alkalo-odporna - zatapiana w warstwie kleju szpachlowego w systemach ETICS. Zwiększa wytrzymałość warstwy zbrojonej na pękanie.',
    features: ['Włókno szklane', 'Oczko ok. 4 mm', 'Alkalo-odporna', 'Do systemów ETICS'],
    usage: 'Warstwa zbrojona w systemach ociepleń elewacji (na styropianie i wełnie).',
    notes: ['Rolki standardowo 1 x 50 m'],
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
  },
  {
    slug: 'tasma-malarska-2',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Taśma tynkarska',
    tagline: 'Pomarańczowa taśma tynkarska Blue Dolphin',
    description:
      'Profesjonalna taśma tynkarska Blue Dolphin Tapes - odporna na wilgoć i uszkodzenia mechaniczne, łatwa w przerywaniu, sprawdza się na ostrych krawędziach.',
    features: ['Odporna na wilgoć', 'Wytrzymała mechanicznie', 'Łatwo się odrywa po pracy', 'Pomarańczowy kolor'],
    usage: 'Maskowanie krawędzi podczas tynkowania i malowania.',
    packaging: '48 mm x 50 m',
  },
  {
    slug: 'inne-2',
    categorySlug: 'docieplenia-produkty-uzupelniajace',
    name: 'Inne akcesoria do dociepleń',
    tagline: 'Profile, łączniki, drobny osprzęt - na zapytanie',
    description:
      'Dodatkowe akcesoria do systemów ociepleń - listwy startowe, profile dylatacyjne, łączniki specjalne. Asortyment dopasowujemy do projektu.',
    features: ['Asortyment na zamówienie', 'Listwy startowe, dylatacyjne, narożniki specjalne'],
    usage: 'Uzupełnienie pełnego systemu ETICS.',
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
    notes: ['Pełna karta techniczna dostępna na życzenie'],
  },
  {
    slug: 'inne',
    categorySlug: 'tynki-produkty-uzupelniajace',
    name: 'Inne akcesoria do tynków',
    tagline: 'Drobny osprzęt tynkarski - na zapytanie',
    description:
      'Dodatkowe akcesoria do prac tynkarskich - profile dylatacyjne, listwy okapowe, specjalistyczne narożniki. Asortyment dostosowujemy do projektu.',
    features: ['Asortyment na zamówienie'],
    usage: 'Uzupełnienie typowego cyklu tynkowania.',
    notes: ['Skontaktuj się z nami, by ustalić zakres dostawy'],
  },
];

export const getProductsByCategory = (categorySlug: string): Product[] =>
  products.filter((p) => p.categorySlug === categorySlug);

export const getProduct = (categorySlug: string, slug: string): Product | undefined =>
  products.find((p) => p.categorySlug === categorySlug && p.slug === slug);
