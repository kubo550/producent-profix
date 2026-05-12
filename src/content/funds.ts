export type FundsProject = {
  slug: string;
  title: string;
  status: 'planned' | 'in_progress' | 'completed';
  endDate?: string;
  location: string;
  summary: string;
  scope: Array<string | { heading: string; items: string[] }>;
  outcome: string;
};

export const fundsProjects: FundsProject[] = [
  {
    slug: 'krzeszowice-zaprawa-tynkarska',
    title:
      'Wdrożenie efektów prac B+R nad innowacyjną zaprawą tynkarską poprzez budowę nowoczesnego Zakładu Produkcyjnego chemii budowlanej',
    status: 'completed',
    endDate: '31.12.2019',
    location: 'Krzeszowice, województwo małopolskie',
    summary:
      'Projekt realizowany przez F.P.H.U. PROFIX Katarzyna Sokół polegał na budowie hali produkcyjnej oraz zakupie i instalacji linii technologicznej do produkcji chemii budowlanej suchej. Innowacja produktowa jest wynikiem prac badawczo-rozwojowych samodzielnie przeprowadzonych przez wnioskodawcę.',
    scope: [
      'Budowa hali produkcyjnej.',
      {
        heading: 'Zakup i instalacja linii technologicznej do produkcji chemii budowlanej:',
        items: [
          'Zakup i instalacja silosów piasku dla frakcji 0 - 0,5 mm.',
          'Zakup i instalacja linii mieszania o wydajności 10 t/h.',
          'Zakup i instalacja układu paletyzowania worków 25-30 kg o wydajności 10 t/h.',
          'Zakup i instalacja linii suszenia piasku o wydajności 10 t/h.',
        ],
      },
    ],
    outcome:
      'Otwarcie nowoczesnego Zakładu Produkcyjnego w Krzeszowicach. Zakład składa się z hali produkcyjnej oraz linii technologicznej do produkcji chemii budowlanej suchej, co umożliwia produkcję innowacyjnej na skalę międzynarodową zaprawy tynkarskiej opartej na trzech spoiwach mineralnych, przeznaczonej do wykończeniowych powłok wewnątrz budynków na typowe podłoża budowlane. Realizacja projektu pozwoliła podnieść konkurencyjność firmy, wzmocnić pozycję na rynku oraz zaspokoić coraz wyższe wymogi stawiane producentom chemii budowlanej.',
  },
];

export const statusLabel: Record<FundsProject['status'], string> = {
  planned: 'Planowany',
  in_progress: 'W trakcie realizacji',
  completed: 'Zakończony',
};
