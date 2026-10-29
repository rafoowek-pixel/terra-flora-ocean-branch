import { isHeat, locate } from "@/lib/intel/match";
import type {
  Aircraft,
  Feed,
  Hazard,
  Headline,
  HormuzSummary,
  NewsEvent,
  Quake,
  SourceStatus,
  Vessel,
} from "@/lib/intel/types";
import { inHotZone } from "@/lib/intel/zones";

type CacheEntry<T> = { at: number; data: T };

function makeSource<T>(ttl: number, empty: T, load: () => Promise<T>) {
  let entry: CacheEntry<T> | null = null;
  let pending: Promise<T> | null = null;

  return async (force: boolean): Promise<{ data: T; ok: boolean; detail: string }> => {
    if (!force && entry && Date.now() - entry.at < ttl) {
      return { data: entry.data, ok: true, detail: "z pamięci podręcznej" };
    }
    if (!pending) {
      pending = load()
        .then((data) => {
          entry = { at: Date.now(), data };
          return data;
        })
        .finally(() => {
          pending = null;
        });
    }
    try {
      const data = await pending;
      return { data, ok: true, detail: "świeże" };
    } catch (error) {
      const message = error instanceof Error ? error.message : "błąd źródła";
      if (entry) return { data: entry.data, ok: true, detail: `ostatnie dobre (${message})` };
      return { data: empty, ok: false, detail: message };
    }
  };
}

async function getJson(url: string, headers?: HeadersInit, ms = 14000): Promise<unknown> {
  const response = await fetch(url, {
    headers: { accept: "application/json", ...headers },
    signal: AbortSignal.timeout(ms),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function getText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      accept: "application/rss+xml, application/xml, text/xml, */*",
      "user-agent": "Meridian/1.0 (live geopolitical map)",
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function epochMs(value: unknown): number {
  const n = num(value);
  if (n == null) return Date.now();
  if (n < 1e11) return n * 1000;
  return n;
}

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/&#0?39;|'/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code: string) => {
      const parsed = Number(code);
      return parsed > 0 && parsed < 65536 ? String.fromCharCode(parsed) : "";
    })
    .replace(/\s+/g, " ")
    .trim();
}

function pickTag(chunk: string, tag: string): string {
  const cdata = chunk.match(new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i"));
  if (cdata?.[1]) return cdata[1].trim();
  const plain = chunk.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return plain?.[1]?.trim() ?? "";
}

function safeUrl(value: string): string | undefined {
  try {
    const url = new URL(value.trim());
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
  } catch {
    return undefined;
  }
  return undefined;
}

function hashId(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) | 0;
  return (hash >>> 0).toString(36);
}

type Story = Headline & { desc: string };

function parseRss(xml: string, source: string): Story[] {
  return xml
    .split(/<item\b/i)
    .slice(1, 36)
    .map((chunk) => {
      const title = decodeXml(pickTag(chunk, "title"));
      const href = safeUrl(decodeXml(pickTag(chunk, "link")));
      const whenRaw = decodeXml(pickTag(chunk, "pubDate"));
      const parsed = whenRaw ? Date.parse(whenRaw) : Number.NaN;
      const when = Number.isFinite(parsed) ? new Date(parsed).toISOString() : new Date().toISOString();
      const desc = decodeXml(pickTag(chunk, "description")).slice(0, 320);
      return {
        id: hashId(`${source}:${title}`),
        title,
        href,
        source,
        when,
        desc,
      };
    })
    .filter((item) => item.title.length > 8);
}

const FEEDS: [string, string][] = [
  ["BBC", "https://feeds.bbci.co.uk/news/world/rss.xml"],
  ["Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml"],
  ["Guardian", "https://www.theguardian.com/world/rss"],
  ["RMF24", "https://www.rmf24.pl/fakty/swiat/feed"],
];

const loadNews = makeSource(150_000, { events: [] as NewsEvent[], headlines: [] as Headline[] }, async () => {
  const batches = await Promise.all(
    FEEDS.map(async ([source, url]) => {
      try {
        return parseRss(await getText(url), source);
      } catch {
        return [];
      }
    }),
  );
  const seen = new Set<string>();
  const stories = batches
    .flat()
    .filter((story) => {
      const key = story.title.toLowerCase().slice(0, 90);
      if (seen.has(key)) return false;
      seen.add(key);
      const age = Date.now() - Date.parse(story.when);
      return age < 3 * 24 * 3600 * 1000;
    })
    .sort((a, b) => b.when.localeCompare(a.when));

  if (!stories.length) throw new Error("brak depesz");

  const byPlace = new Map<string, NewsEvent>();
  for (const story of stories) {
    const place = locate(`${story.title}. ${story.desc}`);
    if (!place) continue;
    const heat = isHeat(`${story.title}. ${story.desc}`);
    const headline: Headline = {
      id: story.id,
      title: story.title,
      href: story.href,
      source: story.source,
      when: story.when,
      place: place.name,
    };
    const existing = byPlace.get(place.id);
    if (!existing) {
      byPlace.set(place.id, {
        id: place.id,
        place: place.name,
        lat: place.lat,
        lon: place.lon,
        heat,
        when: story.when,
        headlines: [headline],
      });
      continue;
    }
    if (heat) existing.heat = true;
    if (story.when > existing.when) existing.when = story.when;
    if (existing.headlines.length < 4) existing.headlines.push(headline);
  }

  const events = [...byPlace.values()]
    .sort((a, b) => Number(b.heat) - Number(a.heat) || b.when.localeCompare(a.when))
    .slice(0, 40);

  const headlines = stories.slice(0, 50).map((story) => ({
    id: story.id,
    title: story.title,
    href: story.href,
    source: story.source,
    when: story.when,
    place: locate(`${story.title}. ${story.desc}`)?.name,
  }));

  return { events, headlines };
});

type AcRaw = {
  hex?: string;
  flight?: string;
  r?: string;
  t?: string;
  lat?: number;
  lon?: number;
  alt_baro?: number | string;
  gs?: number;
  track?: number;
  squawk?: string;
  seen_pos?: number;
};

const loadAircraft = makeSource(20_000, [] as Aircraft[], async () => {
  let payload: unknown;
  try {
    payload = await getJson("https://api.adsb.lol/v2/mil");
  } catch {
    payload = await getJson("https://avioadsb.org/v1/mil");
  }
  const root = asRecord(payload);
  const list = root && Array.isArray(root.ac) ? root.ac : [];
  const now = Date.now();
  const aircraft: Aircraft[] = [];
  for (const item of list) {
    const row = item as AcRaw;
    if (typeof row.lat !== "number" || typeof row.lon !== "number") continue;
    if (Math.abs(row.lat) > 90 || Math.abs(row.lon) > 180) continue;
    const alt = typeof row.alt_baro === "number" ? row.alt_baro : null;
    const seen = typeof row.seen_pos === "number" ? row.seen_pos : 0;
    aircraft.push({
      id: row.hex || `${row.lat},${row.lon}`,
      callsign: str(row.flight) || str(row.hex) || "—",
      hex: str(row.hex),
      type: str(row.t) || "?",
      reg: str(row.r),
      lat: round4(row.lat),
      lon: round4(row.lon),
      altFt: alt,
      speedKt: typeof row.gs === "number" ? row.gs : 0,
      track: typeof row.track === "number" ? row.track : 0,
      squawk: str(row.squawk),
      fixMs: now - Math.max(0, seen) * 1000,
    });
    if (aircraft.length >= 450) break;
  }
  if (!aircraft.length) throw new Error("pusta odpowiedź ADS-B");
  return aircraft;
});

type HzVessel = {
  mmsi?: string | number;
  name?: string;
  lat?: number;
  lon?: number;
  speed?: number;
  course?: number;
  destination?: string;
  flag?: string;
  dwt?: number;
  length?: number;
  gtLabel?: string;
  shiptypeLabel?: string;
  category?: string;
  posAt?: number;
};

const loadHormuz = makeSource(
  25_000,
  { vessels: [] as Vessel[], summary: null as HormuzSummary | null },
  async () => {
    const payload = asRecord(await getJson("https://hormuz.now/api/snapshot"));
    if (!payload) throw new Error("pusty kadr Ormuzu");
    const stats = asRecord(payload.stats);
    const summary: HormuzSummary = {
      tankers: num(stats?.tankers) ?? 0,
      cargo: num(stats?.cargo) ?? 0,
      moving: num(stats?.moving) ?? 0,
      anchored: num(stats?.anchored) ?? 0,
      inChoke: num(stats?.inChokePoint) ?? 0,
    };
    const list = Array.isArray(payload.vessels) ? payload.vessels : [];
    const vessels: Vessel[] = [];
    for (const item of list) {
      const row = item as HzVessel;
      if (typeof row.lat !== "number" || typeof row.lon !== "number") continue;
      const blob = `${row.category ?? ""} ${row.shiptypeLabel ?? ""} ${row.gtLabel ?? ""}`.toLowerCase();
      let kind: Vessel["kind"] | null = null;
      if (blob.includes("tanker")) kind = "tanker";
      else if (blob.includes("cargo") || blob.includes("bulk") || blob.includes("container")) kind = "cargo";
      if (!kind) continue;
      const dwt = typeof row.dwt === "number" && row.dwt > 0 ? row.dwt : null;
      const length = typeof row.length === "number" && row.length > 0 ? `${row.length} m` : "";
      const label = str(row.gtLabel) || str(row.shiptypeLabel) || kind;
      vessels.push({
        id: `hz-${row.mmsi ?? vessels.length}`,
        name: str(row.name) || "bez nazwy",
        kind,
        region: "Ormuz",
        lat: round4(row.lat),
        lon: round4(row.lon),
        speedKt: typeof row.speed === "number" ? row.speed : 0,
        course: typeof row.course === "number" ? row.course : 0,
        dest: str(row.destination),
        flag: str(row.flag),
        detail: [label, row.flag ? `bandera ${row.flag}` : "", dwt ? `${dwt.toLocaleString("pl-PL")} DWT` : "", length]
          .filter(Boolean)
          .join(" · "),
        fixMs: epochMs(row.posAt),
        dwt,
      });
    }
    if (!vessels.length) throw new Error("brak statków w Ormuzie");
    return { vessels, summary };
  },
);

type DtVessel = { mmsi?: number; name?: string; shipType?: number; destination?: string; draught?: number };
type DtFeature = {
  mmsi?: number;
  geometry?: { coordinates?: number[] };
  properties?: { mmsi?: number; sog?: number; cog?: number; timestampExternal?: number };
};

const loadBaltic = makeSource(30_000, [] as Vessel[], async () => {
  const headers = { "Digitraffic-User": "Meridian/1.0 (https://meridian.live)" };
  const [metaRaw, locRaw] = await Promise.all([
    getJson("https://meri.digitraffic.fi/api/ais/v1/vessels", headers),
    getJson("https://meri.digitraffic.fi/api/ais/v1/locations", headers),
  ]);
  const metaList = Array.isArray(metaRaw) ? (metaRaw as DtVessel[]) : [];
  const meta = new Map<number, DtVessel>();
  for (const row of metaList) {
    if (typeof row.mmsi === "number") meta.set(row.mmsi, row);
  }
  const root = asRecord(locRaw);
  const features = root && Array.isArray(root.features) ? (root.features as DtFeature[]) : [];
  const vessels: Vessel[] = [];
  const now = Date.now();
  for (const feature of features) {
    const coords = feature.geometry?.coordinates;
    const props = feature.properties;
    if (!coords || coords.length < 2 || !props) continue;
    const mmsi = props.mmsi ?? feature.mmsi;
    if (typeof mmsi !== "number") continue;
    const info = meta.get(mmsi);
    const shipType = info?.shipType ?? 0;
    const kind: Vessel["kind"] | null =
      shipType >= 80 && shipType <= 89 ? "tanker" : shipType >= 70 && shipType <= 79 ? "cargo" : null;
    if (!kind) continue;
    const fixMs = typeof props.timestampExternal === "number" ? props.timestampExternal : now;
    if (now - fixMs > 3 * 3600 * 1000) continue;
    const draught =
      typeof info?.draught === "number" && info.draught > 0 ? `${(info.draught / 10).toFixed(1)} m zanurzenia` : "";
    vessels.push({
      id: `bal-${mmsi}`,
      name: str(info?.name) || `MMSI ${mmsi}`,
      kind,
      region: "Bałtyk",
      lat: round4(coords[1] ?? 0),
      lon: round4(coords[0] ?? 0),
      speedKt: typeof props.sog === "number" ? props.sog : 0,
      course: typeof props.cog === "number" ? props.cog : 0,
      dest: str(info?.destination),
      flag: "",
      detail: [`AIS ${shipType}`, draught].filter(Boolean).join(" · "),
      fixMs,
      dwt: null,
    });
  }
  if (!vessels.length) throw new Error("brak AIS na Bałtyku");
  return vessels;
});

const loadQuakes = makeSource(90_000, [] as Quake[], async () => {
  const payload = asRecord(
    await getJson("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"),
  );
  const features = payload && Array.isArray(payload.features) ? payload.features : [];
  const quakes: Quake[] = [];
  for (const feature of features) {
    const row = asRecord(feature);
    const geometry = asRecord(row?.geometry);
    const props = asRecord(row?.properties);
    const coords = geometry && Array.isArray(geometry.coordinates) ? geometry.coordinates : null;
    if (!coords || !props) continue;
    const lon = num(coords[0]);
    const lat = num(coords[1]);
    const depth = num(coords[2]) ?? 0;
    const mag = num(props.mag);
    if (lat == null || lon == null || mag == null) continue;
    const time = num(props.time) ?? Date.now();
    quakes.push({
      id: str(row?.id) || `q-${lat}-${lon}`,
      title: str(props.place) || "wstrząs",
      lat: round4(lat),
      lon: round4(lon),
      mag,
      depthKm: Math.round(depth),
      tsunami: props.tsunami === 1,
      when: new Date(time).toISOString(),
      href: safeUrl(str(props.url)),
    });
  }
  return quakes.sort((a, b) => b.mag - a.mag).slice(0, 40);
});

const HAZARD_LABEL: Record<string, string> = {
  severeStorms: "Cyklon",
  wildfires: "Pożar",
  volcanoes: "Wulkan",
  floods: "Powódź",
  drought: "Susza",
  landslides: "Osuwisko",
  seaLakeIce: "Lód",
  dustHaze: "Pył",
  tempExtremes: "Ekstremum",
  snow: "Śnieg",
  manmade: "Zdarzenie",
};

function geometryPoint(value: unknown): { lat: number; lon: number } | null {
  const flat: number[][] = [];
  const walk = (node: unknown) => {
    if (!Array.isArray(node) || node.length === 0) return;
    if (typeof node[0] === "number" && typeof node[1] === "number") {
      flat.push([node[0], node[1]]);
      return;
    }
    for (const child of node) walk(child);
  };
  walk(value);
  if (!flat.length) return null;
  const lon = flat.reduce((sum, pair) => sum + (pair[0] ?? 0), 0) / flat.length;
  const lat = flat.reduce((sum, pair) => sum + (pair[1] ?? 0), 0) / flat.length;
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  return { lat, lon };
}

const loadHazards = makeSource(240_000, [] as Hazard[], async () => {
  const payload = asRecord(await getJson("https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=60"));
  const events = payload && Array.isArray(payload.events) ? payload.events : [];
  const hazards: Hazard[] = [];
  for (const event of events) {
    const row = asRecord(event);
    if (!row) continue;
    const categories = Array.isArray(row.categories) ? row.categories : [];
    const category = asRecord(categories[0]);
    const categoryId = str(category?.id);
    if (categoryId === "earthquakes") continue;
    const geometries = Array.isArray(row.geometry) ? row.geometry : [];
    const last = asRecord(geometries[geometries.length - 1]);
    const point = geometryPoint(last?.coordinates);
    if (!point) continue;
    const whenRaw = str(last?.date);
    hazards.push({
      id: str(row.id) || hashId(str(row.title)),
      title: str(row.title) || "zagrożenie",
      kind: HAZARD_LABEL[categoryId] || "Zagrożenie",
      lat: round4(point.lat),
      lon: round4(point.lon),
      when: whenRaw || new Date().toISOString(),
      href: safeUrl(str(asRecord(Array.isArray(row.sources) ? row.sources[0] : null)?.url)),
    });
    if (hazards.length >= 35) break;
  }
  return hazards;
});

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

let flight: Promise<Feed> | null = null;

export function getFeed(force = false): Promise<Feed> {
  if (!force && flight) return flight;
  flight = build(force).finally(() => {
    flight = null;
  });
  return flight;
}

async function build(force: boolean): Promise<Feed> {
  const [news, aircraft, hormuz, baltic, quakes, hazards] = await Promise.all([
    loadNews(force),
    loadAircraft(force),
    loadHormuz(force),
    loadBaltic(force),
    loadQuakes(force),
    loadHazards(force),
  ]);

  const vessels = [...hormuz.data.vessels, ...baltic.data];
  const heatStories = news.data.events.filter((event) => event.heat).length;
  const anchoredTankers = hormuz.data.vessels.filter((vessel) => vessel.kind === "tanker" && vessel.speedKt < 1).length;
  const milHot = aircraft.data.filter(
    (plane) => (plane.altFt ?? 0) > 800 && inHotZone(plane.lat, plane.lon),
  ).length;
  const maxMag = quakes.data.reduce((max, quake) => Math.max(max, quake.mag), 0);

  const parts = [
    { label: "Tło sytuacji", points: 12 },
    { label: "Depesze o użyciu siły i sankcjach", points: Math.min(34, heatStories * 3) },
    { label: "Tankowce stojące w Ormuzie", points: Math.min(16, Math.round(anchoredTankers / 12)) },
    { label: "Lotnictwo nad strefami gorącymi", points: Math.min(18, milHot) },
    { label: "Sejsmika", points: maxMag >= 6.5 ? 14 : maxMag >= 5.5 ? 8 : maxMag >= 4.5 ? 3 : 0 },
    { label: "Otwarte zagrożenia naturalne", points: Math.min(8, hazards.data.length) },
  ];
  const index = clamp(
    parts.reduce((sum, part) => sum + part.points, 0),
    0,
    100,
  );

  const sources: SourceStatus[] = [
    {
      id: "adsb",
      label: "Samoloty wojskowe",
      ok: aircraft.ok,
      detail: aircraft.ok ? `${aircraft.data.length} pozycji ADS-B · ${aircraft.detail}` : aircraft.detail,
    },
    {
      id: "hormuz",
      label: "AIS Ormuz",
      ok: hormuz.ok,
      detail: hormuz.ok
        ? `${hormuz.data.vessels.length} tankowców i frachtu · ${hormuz.detail}`
        : hormuz.detail,
    },
    {
      id: "baltic",
      label: "AIS Bałtyk",
      ok: baltic.ok,
      detail: baltic.ok ? `${baltic.data.length} statków towarowych · ${baltic.detail}` : baltic.detail,
    },
    {
      id: "news",
      label: "Depesze",
      ok: news.ok,
      detail: news.ok
        ? `${news.data.headlines.length} tytułów, ${news.data.events.length} miejsc · ${news.detail}`
        : news.detail,
    },
    {
      id: "usgs",
      label: "USGS",
      ok: quakes.ok,
      detail: quakes.ok ? `${quakes.data.length} wstrząsów ≥ 4.5 · ${quakes.detail}` : quakes.detail,
    },
    {
      id: "eonet",
      label: "NASA EONET",
      ok: hazards.ok,
      detail: hazards.ok ? `${hazards.data.length} otwartych zdarzeń · ${hazards.detail}` : hazards.detail,
    },
  ];

  return {
    updatedAt: new Date().toISOString(),
    index,
    parts,
    sources,
    aircraft: aircraft.data,
    vessels,
    events: news.data.events,
    headlines: news.data.headlines,
    quakes: quakes.data,
    hazards: hazards.data,
    hormuz: hormuz.data.summary,
  };
}
