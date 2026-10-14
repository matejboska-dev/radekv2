import bytImage from '@/assets/property-byt-pribram.webp';
import dumImage from '@/assets/property-dum-pribram.webp';
import byt31Image from '@/assets/property-byt31-pribram.webp';
import garazImage from '@/assets/property-garaz-pribram.webp';
import jelenceImage from '@/assets/property-dum-jelence.webp';
import bytVeDvoreImage from '@/assets/property-byt-ve-dvore.webp';
import bytMarianskaImage from '@/assets/property-byt-marianska.webp';
import bytCechovskaImage from '@/assets/property-byt-cechovska.webp';
import bytCapkuImage from '@/assets/property-byt-capku-pribram.webp';
import bytBezruceImage from '@/assets/property-byt-bezruce-pribram.webp';
import bytCertakImage from '@/assets/property-byt-certak-pribram.jpg';
import bytBrodskaImage from '@/assets/property-byt-brodska-pribram.webp';
import bytZdaborImage from '@/assets/property-byt-zdabor-slunna-pribram.webp';
import bytBeneseImage from '@/assets/property-byt-edvarda-benese-pribram.webp';
import dumTynecImage from '@/assets/property-dum-tynec-nad-sazavou.webp';
import dumBohutinImage from '@/assets/property-dum-bohutin.webp';
import bytRynecekImage from '@/assets/property-byt-rynecek-pribram.webp';
import chataKamykImage from '@/assets/property-chata-kamyk-nad-vltavou.webp';

export type SoldKind = 'byt' | 'dum' | 'chata' | 'garaz';

export type SoldProperty = {
  id: number;
  kind: SoldKind;
  /** Nemovitost leží přímo ve městě Příbram (ne v okolních obcích a městech). */
  inPribram: boolean;
  title: string;
  location: string;
  size: string;
  status: string;
  /** Počet dní, za které byla nemovitost prodána, tak jak ho zveřejňuje stránka /prodano. */
  days: number;
  image: string;
};

export const soldProperties: SoldProperty[] = [
  {
    id: 18,
    kind: 'chata',
    inPribram: false,
    title: 'Chata, Kamýk nad Vltavou',
    location: 'Kamýk nad Vltavou',
    size: '89 m²',
    status: 'Prodáno',
    days: 122,
    image: chataKamykImage,
  },
  {
    id: 17,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 2+kk, Příbram',
    location: 'Ryneček, Příbram',
    size: '40 m²',
    status: 'Prodáno',
    days: 15,
    image: bytRynecekImage,
  },
  {
    id: 16,
    kind: 'dum',
    inPribram: false,
    title: 'Rodinný dům, Bohutín',
    location: 'Bohutín, okres Příbram',
    size: '94 m²',
    status: 'Prodáno',
    days: 19,
    image: dumBohutinImage,
  },
  {
    id: 15,
    kind: 'dum',
    inPribram: false,
    title: 'Rodinný dům, Týnec nad Sázavou',
    location: 'Týnec nad Sázavou',
    size: '234 m²',
    status: 'Prodáno',
    days: 28,
    image: dumTynecImage,
  },
  {
    id: 14,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 2+kk, Příbram',
    location: 'Brodská, Příbram',
    size: '54 m²',
    status: 'Prodáno',
    days: 46,
    image: bytBrodskaImage,
  },
  {
    id: 13,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 2+kk, Příbram',
    location: 'Zdaboř – Slunná, Příbram',
    size: '45 m²',
    status: 'Prodáno',
    days: 13,
    image: bytZdaborImage,
  },
  {
    id: 12,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 3+kk, Příbram',
    location: 'Edvarda Beneše, Příbram',
    size: '60 m²',
    status: 'Prodáno',
    days: 7,
    image: bytBeneseImage,
  },
  {
    id: 11,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 2+1, Příbram',
    location: 'Pod Čertovým pahorkem, Příbram',
    size: '58 m²',
    status: 'Prodáno',
    days: 25,
    image: bytCertakImage,
  },
  {
    id: 10,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 2+1, Příbram',
    location: 'Petra Bezruče, Příbram',
    size: '59 m²',
    status: 'Prodáno',
    days: 9,
    image: bytBezruceImage,
  },
  {
    id: 1,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 3+kk, Příbram',
    location: 'nám. 17. listopadu, Příbram VII',
    size: '61 m²',
    status: 'Prodáno',
    days: 18,
    image: bytImage,
  },
  {
    id: 2,
    kind: 'dum',
    inPribram: true,
    title: 'Rodinný dům, Příbram',
    location: 'Rožmitálská, Příbram VI – Březové Hory',
    size: '141 m²',
    status: 'Prodáno',
    days: 21,
    image: dumImage,
  },
  {
    id: 3,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 3+1, Příbram',
    location: 'tř. Osvobození, Příbram VII',
    size: '75 m²',
    status: 'Prodáno',
    days: 14,
    image: byt31Image,
  },
  {
    id: 4,
    kind: 'garaz',
    inPribram: true,
    title: 'Garáž, Příbram',
    location: 'Rožmitálská, Příbram VI – Březové Hory',
    size: '20 m²',
    status: 'Prodáno',
    days: 52,
    image: garazImage,
  },
  {
    id: 5,
    kind: 'dum',
    inPribram: false,
    title: 'Rodinný dům, Jelence',
    location: 'Jelence, okres Příbram',
    size: '224 m²',
    status: 'Prodáno',
    days: 15,
    image: jelenceImage,
  },
  {
    id: 6,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 1+kk, Příbram',
    location: 'Ve Dvoře, Příbram',
    size: '23 m²',
    status: 'Prodáno',
    days: 4,
    image: bytVeDvoreImage,
  },
  {
    id: 7,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 1+1, Příbram',
    location: 'Mariánská, Příbram',
    size: '27 m²',
    status: 'Prodáno',
    days: 35,
    image: bytMarianskaImage,
  },
  {
    id: 8,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 2+kk, Příbram',
    location: 'Čechovská, Příbram',
    size: '47 m²',
    status: 'Prodáno',
    days: 12,
    image: bytCechovskaImage,
  },
  {
    id: 9,
    kind: 'byt',
    inPribram: true,
    title: 'Byt 3+1, Příbram',
    location: 'Bratří Čapků, Příbram',
    size: '64 m²',
    status: 'Prodáno',
    days: 21,
    image: bytCapkuImage,
  },
];

export const daysLabel = (n: number) => `${n} ${n === 1 ? 'den' : n >= 2 && n <= 4 ? 'dny' : 'dní'}`;

export type SoldSummary = {
  count: number;
  average: number;
  median: number;
  fastest: number;
  slowest: number;
  /** Počty nemovitostí podle doby prodeje: do 14 dní, 15 až 30 dní, 31 až 60 dní, přes 60 dní. */
  buckets: { label: string; count: number }[];
};

/** Statistiky doby prodeje počítané přímo z dat výše, aby se čísla v článcích nikdy nerozešla se stránkou /prodano. */
export function summarizeSold(list: SoldProperty[]): SoldSummary {
  const days = list.map((p) => p.days).sort((a, b) => a - b);
  const mid = Math.floor(days.length / 2);
  const median = days.length % 2 ? days[mid] : (days[mid - 1] + days[mid]) / 2;
  const count = (test: (d: number) => boolean) => days.filter(test).length;
  return {
    count: days.length,
    average: days.reduce((sum, d) => sum + d, 0) / days.length,
    median,
    fastest: days[0],
    slowest: days[days.length - 1],
    buckets: [
      { label: 'do 14 dní', count: count((d) => d <= 14) },
      { label: '15 až 30 dní', count: count((d) => d > 14 && d <= 30) },
      { label: '31 až 60 dní', count: count((d) => d > 30 && d <= 60) },
      { label: 'přes 60 dní', count: count((d) => d > 60) },
    ],
  };
}

export const soldAll = summarizeSold(soldProperties);
export const soldPribram = summarizeSold(soldProperties.filter((p) => p.inPribram));

/** České číslo s desetinnou čárkou, např. 16,5. */
export const formatDays = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');
