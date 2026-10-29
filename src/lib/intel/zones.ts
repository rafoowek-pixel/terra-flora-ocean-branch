export type HotZone = {
  name: string;
  s: number;
  n: number;
  w: number;
  e: number;
};

export const HOT_ZONES: HotZone[] = [
  { name: "Ukraina", s: 44, n: 53, w: 22, e: 41 },
  { name: "Lewant", s: 29, n: 37.6, w: 32, e: 37.5 },
  { name: "Zatoka", s: 22, n: 31, w: 46, e: 60 },
  { name: "Morze Czerwone", s: 12, n: 23, w: 36, e: 48 },
  { name: "Tajwan", s: 20, n: 28, w: 117, e: 126 },
  { name: "Korea", s: 33.5, n: 43.5, w: 124, e: 131 },
  { name: "Bałtyk", s: 53, n: 61.2, w: 9, e: 31 },
  { name: "Sahel", s: 10, n: 20, w: -15, e: 16 },
];

export function inHotZone(lat: number, lon: number): string | null {
  const hit = HOT_ZONES.find((z) => lat >= z.s && lat <= z.n && lon >= z.w && lon <= z.e);
  return hit ? hit.name : null;
}

export const STRATEGIC_TYPES = new Set([
  "A124",
  "A332",
  "A400",
  "A50",
  "B1",
  "B2",
  "B52",
  "B703",
  "B752",
  "B762",
  "C130",
  "C135",
  "C17",
  "C30J",
  "C5M",
  "E3CF",
  "E3TF",
  "E6",
  "E8",
  "EUFI",
  "F15",
  "F16",
  "F18",
  "F18H",
  "F22",
  "F35",
  "FA18",
  "H6",
  "IL76",
  "K35R",
  "MG31",
  "P8",
  "R135",
  "RFAL",
  "SU24",
  "SU27",
  "SU30",
  "SU34",
  "SU35",
  "T095",
  "T160",
  "T22M",
  "V22",
]);

export const EMERGENCY_SQUAWK = new Set(["7500", "7600", "7700"]);
