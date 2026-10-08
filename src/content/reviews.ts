/** Google Business Profile of PROFIX (Krzeszowice, Sienkiewicza 20). */
export const googleProfileUrl = 'https://maps.google.com/?cid=357809572523909822';

/** Snapshot of the Google rating - update by hand when the profile changes. */
export const googleRating = { value: 5.0, count: 20 };

export type Review = {
  author: string;
  rating: number;
  text: string;
};

/**
 * Quotes copied from public Google reviews (October 2026). Keep them verbatim -
 * shorten only with "[…]". No Review/AggregateRating schema here: Google doesn't
 * allow marking up reviews sourced from another site.
 */
export const reviews: Review[] = [
  {
    author: 'Paweł R.',
    rating: 5,
    text: 'Profesjonalna i rzetelna firma, która wyróżnia się wysoką jakością produktów oraz terminową obsługą. Robili u mnie tynki cementowo-wapienne […] wszystko równe, nic nie pęka.',
  },
  {
    author: 'Szymon W.',
    rating: 5,
    text: 'Robota wykonana konkretnie i bez kombinowania. Tynki zrobione równo, solidnie i zgodnie z ustaleniami. Ekipa zna się na fachu, terminowo i bez zbędnego gadania. Polecam.',
  },
  {
    author: 'Paweł Ć.',
    rating: 5,
    text: 'Pełen profesjonalizm. Usługa wykonana na najwyższym poziomie.',
  },
];
