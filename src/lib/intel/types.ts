export type Aircraft = {
  id: string;
  callsign: string;
  hex: string;
  type: string;
  reg: string;
  lat: number;
  lon: number;
  altFt: number | null;
  speedKt: number;
  track: number;
  squawk: string;
  fixMs: number;
};

export type VesselKind = "tanker" | "cargo";

export type Vessel = {
  id: string;
  name: string;
  kind: VesselKind;
  region: "Ormuz" | "Bałtyk";
  lat: number;
  lon: number;
  speedKt: number;
  course: number;
  dest: string;
  flag: string;
  detail: string;
  fixMs: number;
  dwt: number | null;
};

export type Headline = {
  id: string;
  title: string;
  href?: string;
  source: string;
  when: string;
  place?: string;
};

export type NewsEvent = {
  id: string;
  place: string;
  lat: number;
  lon: number;
  heat: boolean;
  when: string;
  headlines: Headline[];
};

export type Quake = {
  id: string;
  title: string;
  lat: number;
  lon: number;
  mag: number;
  depthKm: number;
  tsunami: boolean;
  when: string;
  href?: string;
};

export type Hazard = {
  id: string;
  title: string;
  kind: string;
  lat: number;
  lon: number;
  when: string;
  href?: string;
};

export type HormuzSummary = {
  tankers: number;
  cargo: number;
  moving: number;
  anchored: number;
  inChoke: number;
};

export type SourceStatus = {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
};

export type IndexPart = {
  label: string;
  points: number;
};

export type Feed = {
  updatedAt: string;
  index: number;
  parts: IndexPart[];
  sources: SourceStatus[];
  aircraft: Aircraft[];
  vessels: Vessel[];
  events: NewsEvent[];
  headlines: Headline[];
  quakes: Quake[];
  hazards: Hazard[];
  hormuz: HormuzSummary | null;
};
