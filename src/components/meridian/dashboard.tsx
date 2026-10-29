import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
  type RefObject,
} from "react";
import {
  Crosshair,
  ExternalLink,
  Minus,
  Plus,
  Radio,
  RefreshCw,
} from "lucide-react";
import { enrichTheaters, type LiveTheater } from "@/lib/intel/geo";
import { bases, nodes } from "@/lib/intel/places";
import type { Feed, Headline, NewsEvent, Vessel } from "@/lib/intel/types";
import { EMERGENCY_SQUAWK, STRATEGIC_TYPES, inHotZone } from "@/lib/intel/zones";
import type { MapHandle, MovingMark, StaticMark } from "@/components/meridian/map-view";
import { Desk } from "@/components/meridian/desk";

type LayerId = "conflict" | "aircraft" | "tanker" | "cargo" | "base" | "node" | "quake" | "hazard";

const DEFAULT_LAYERS: Record<LayerId, boolean> = {
  conflict: true,
  aircraft: true,
  tanker: true,
  cargo: false,
  base: true,
  node: true,
  quake: true,
  hazard: true,
};

const LAYER_ORDER: { id: LayerId; label: string; hint: string }[] = [
  { id: "conflict", label: "Konflikty", hint: "teatry i depesze" },
  { id: "aircraft", label: "Samoloty", hint: "wojskowe ADS-B" },
  { id: "tanker", label: "Tankowce", hint: "Ormuz i Bałtyk" },
  { id: "cargo", label: "Fracht", hint: "masowce, kontenery" },
  { id: "base", label: "Bazy", hint: "stałe instalacje" },
  { id: "node", label: "Węzły", hint: "cieśniny, porty, energia" },
  { id: "quake", label: "Trzęsienia", hint: "USGS od 4.5" },
  { id: "hazard", label: "Zagrożenia", hint: "cyklony, pożary, powodzie" },
];

type Detail = {
  id: string;
  kicker: string;
  title: string;
  note?: string;
  lines: { label: string; value: string }[];
  href?: string;
  lat: number;
  lon: number;
};

type MapComponent = ForwardRefExoticComponent<
  {
    planes: MovingMark[];
    ships: MovingMark[];
    dots: StaticMark[];
    showLanes: boolean;
    selectedId: string | null;
    onSelect: (id: string | null) => void;
  } & RefAttributes<MapHandle>
>;

function isFeed(value: unknown): value is Feed {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<Feed>;
  return Array.isArray(row.aircraft) && Array.isArray(row.vessels) && typeof row.index === "number";
}

function tone(index: number): string {
  if (index >= 70) return "text-conflict";
  if (index >= 40) return "text-signal";
  return "text-sea";
}

function fmtWhen(iso: string, now: number): string {
  const stamp = Date.parse(iso);
  if (!Number.isFinite(stamp)) return "—";
  const seconds = Math.max(0, Math.round((now - stamp) / 1000));
  if (seconds < 60) return `${seconds} s temu`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min temu`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} godz. temu`;
  return `${Math.round(hours / 24)} dni temu`;
}

function fmtSpeed(knots: number): string {
  if (!Number.isFinite(knots) || knots < 0.6) return "stoi albo dryfuje";
  return `${Math.round(knots)} kn · ${Math.round(knots * 1.852)} km/h`;
}

function fmtAlt(feet: number | null): string {
  if (feet == null) return "na ziemi albo brak wysokości";
  if (feet < 150) return "przy ziemi";
  return `${Math.round(feet).toLocaleString("pl-PL")} ft · ${Math.round(feet * 0.3048).toLocaleString("pl-PL")} m`;
}

function squawkLabel(code: string): string {
  if (code === "7500") return "7500 · porwanie";
  if (code === "7600") return "7600 · utrata łączności";
  if (code === "7700") return "7700 · alarm ogólny";
  return code || "—";
}

function courseLabel(course: number): string {
  if (!(course >= 0 && course < 360)) return "—";
  return `${Math.round(course)}°`;
}

function Swatch({ id }: { id: LayerId }) {
  if (id === "conflict") return <i className="size-2.5 shrink-0 bg-conflict" />;
  if (id === "aircraft") return <i className="size-2.5 shrink-0 bg-air" />;
  if (id === "tanker") return <i className="size-2.5 shrink-0 bg-sea" />;
  if (id === "cargo") return <i className="size-2.5 shrink-0 border border-sea" />;
  if (id === "base") return <i className="size-2.5 shrink-0 bg-base" />;
  if (id === "node") return <i className="size-2.5 shrink-0 bg-signal" />;
  if (id === "quake") return <i className="size-2.5 shrink-0 bg-quake" />;
  return <i className="size-2.5 shrink-0 border border-dashed border-quake" />;
}

function UtcClock() {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const text = new Intl.DateTimeFormat("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
        timeZone: "UTC",
      }).format(now);
      setLabel(`${text} UTC`);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <time>{label ?? "—:—:— UTC"}</time>;
}

function Age({ iso }: { iso?: string }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (!iso) return <span>czekam na strumień</span>;
  return <span>odświeżono {fmtWhen(iso, now)}</span>;
}

function Meter({ value }: { value: number }) {
  const lit = Math.round((value / 100) * 24);
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <span key={index} className={index < lit ? "h-1.5 flex-1 bg-signal" : "h-1.5 flex-1 bg-line"} />
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-line bg-bg px-3 py-2">
      <div className="font-mono text-lg text-fg">{value.toLocaleString("pl-PL")}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

export function Dashboard() {
  const mapApi = useRef<MapHandle>(null);
  const pulling = useRef(false);
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [layersReady, setLayersReady] = useState(false);
  const [feed, setFeed] = useState<Feed | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [view, setView] = useState<"map" | "desk">("map");
  const deskRefresh = useRef<(() => void) | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("meridian-layers");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Record<LayerId, boolean>>;
        setLayers({ ...DEFAULT_LAYERS, ...parsed });
      }
    } catch {
      /* ignore broken local prefs */
    }
    setLayersReady(true);
  }, []);

  useEffect(() => {
    if (!layersReady) return;
    localStorage.setItem("meridian-layers", JSON.stringify(layers));
  }, [layers, layersReady]);

  const pull = useCallback(async (fresh = false) => {
    if (pulling.current) return;
    pulling.current = true;
    try {
      const response = await fetch(fresh ? "/api/feed?fresh=1" : "/api/feed");
      const payload: unknown = await response.json();
      if (!response.ok || !isFeed(payload)) throw new Error("feed");
      setFeed(payload);
      setError(null);
    } catch {
      setError("Strumień chwilowo nie odpowiada. Zostawiam ostatnie pozycje.");
    } finally {
      pulling.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void pull(false);
    const timer = window.setInterval(() => void pull(false), 20000);
    const onVisible = () => {
      if (document.visibilityState === "visible") void pull(false);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [pull]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (selectedId) setSheetOpen(true);
  }, [selectedId]);

  const enriched = useMemo(() => enrichTheaters(feed?.events ?? []), [feed]);

  const counts = useMemo(() => {
    const vessels = feed?.vessels ?? [];
    return {
      conflict: enriched.theaters.length + enriched.loose.length,
      aircraft: feed?.aircraft.length ?? 0,
      tanker: vessels.filter((vessel) => vessel.kind === "tanker").length,
      cargo: vessels.filter((vessel) => vessel.kind === "cargo").length,
      base: bases.length,
      node: nodes.length,
      quake: feed?.quakes.length ?? 0,
      hazard: feed?.hazards.length ?? 0,
    } satisfies Record<LayerId, number>;
  }, [feed, enriched]);

  const planes = useMemo<MovingMark[]>(() => {
    if (!layers.aircraft || !feed) return [];
    return feed.aircraft.map((plane) => ({
      id: plane.id,
      lat: plane.lat,
      lon: plane.lon,
      course: plane.track,
      speedKt: plane.speedKt,
      fixMs: plane.fixMs,
      title: `${plane.callsign} · ${plane.type}`,
      hot: STRATEGIC_TYPES.has(plane.type) || EMERGENCY_SQUAWK.has(plane.squawk),
      kind: "aircraft",
    }));
  }, [feed, layers.aircraft]);

  const ships = useMemo<MovingMark[]>(() => {
    if (!feed) return [];
    return feed.vessels
      .filter((vessel) => (vessel.kind === "tanker" ? layers.tanker : layers.cargo))
      .map((vessel) => ({
        id: vessel.id,
        lat: vessel.lat,
        lon: vessel.lon,
        course: vessel.course,
        speedKt: vessel.speedKt,
        fixMs: vessel.fixMs,
        title: `${vessel.name} · ${vessel.region}`,
        kind: vessel.kind,
      }));
  }, [feed, layers.tanker, layers.cargo]);

  const dots = useMemo<StaticMark[]>(() => {
    const marks: StaticMark[] = [];
    if (layers.base) {
      for (const site of bases) {
        marks.push({
          id: `base:${site.id}`,
          lat: site.lat,
          lon: site.lon,
          title: site.title,
          kind: "base",
          radius: 4.5,
        });
      }
    }
    if (layers.node) {
      for (const site of nodes) {
        marks.push({
          id: `node:${site.id}`,
          lat: site.lat,
          lon: site.lon,
          title: site.title,
          kind: "node",
          radius: 5,
        });
      }
    }
    if (layers.conflict) {
      for (const theater of enriched.theaters) {
        marks.push({
          id: `theater:${theater.id}`,
          lat: theater.lat,
          lon: theater.lon,
          title: theater.headline ? `${theater.title}: ${theater.headline}` : theater.title,
          kind: "conflict",
          radius: theater.heat ? 8 : 5.5,
          heat: theater.heat || Boolean(theater.headline),
        });
      }
      for (const event of enriched.loose) {
        marks.push({
          id: `event:${event.id}`,
          lat: event.lat,
          lon: event.lon,
          title: `${event.place}: ${event.headlines[0]?.title ?? ""}`,
          kind: "conflict",
          radius: event.heat ? 6.5 : 4.5,
          heat: event.heat,
        });
      }
    }
    if (layers.quake && feed) {
      for (const quake of feed.quakes) {
        marks.push({
          id: `quake:${quake.id}`,
          lat: quake.lat,
          lon: quake.lon,
          title: `M ${quake.mag.toFixed(1)} ${quake.title}`,
          kind: "quake",
          radius: 3.5 + Math.min(6, quake.mag),
        });
      }
    }
    if (layers.hazard && feed) {
      for (const hazard of feed.hazards) {
        marks.push({
          id: `hazard:${hazard.id}`,
          lat: hazard.lat,
          lon: hazard.lon,
          title: `${hazard.kind}: ${hazard.title}`,
          kind: "hazard",
          radius: 5.5,
        });
      }
    }
    return marks;
  }, [layers, enriched, feed]);

  const detail = useMemo(
    () => (selectedId ? resolveDetail(selectedId, feed, enriched.theaters, enriched.loose) : null),
    [selectedId, feed, enriched],
  );

  const searchHits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const hits: { id: string; title: string; meta: string; lat: number; lon: number }[] = [];
    const push = (id: string, title: string, meta: string, lat: number, lon: number) => {
      if (hits.length >= 24) return;
      if (`${title} ${meta}`.toLowerCase().includes(q)) hits.push({ id, title, meta, lat, lon });
    };
    for (const theater of enriched.theaters) {
      push(`theater:${theater.id}`, theater.title, theater.headline ?? theater.blurb, theater.lat, theater.lon);
    }
    for (const event of enriched.loose) {
      push(`event:${event.id}`, event.place, event.headlines[0]?.title ?? "", event.lat, event.lon);
    }
    for (const site of bases) push(`base:${site.id}`, site.title, site.tag, site.lat, site.lon);
    for (const site of nodes) push(`node:${site.id}`, site.title, site.tag, site.lat, site.lon);
    for (const plane of feed?.aircraft ?? []) {
      push(plane.id, plane.callsign, plane.type, plane.lat, plane.lon);
    }
    for (const vessel of feed?.vessels ?? []) {
      push(vessel.id, vessel.name, `${vessel.kind === "tanker" ? "tankowiec" : "fracht"} ${vessel.region}`, vessel.lat, vessel.lon);
    }
    for (const quake of feed?.quakes ?? []) {
      push(`quake:${quake.id}`, `M ${quake.mag.toFixed(1)}`, quake.title, quake.lat, quake.lon);
    }
    return hits;
  }, [query, feed, enriched]);

  const notable = useMemo(() => {
    return (feed?.aircraft ?? [])
      .filter(
        (plane) =>
          STRATEGIC_TYPES.has(plane.type) ||
          EMERGENCY_SQUAWK.has(plane.squawk) ||
          ((plane.altFt ?? 0) > 1000 && inHotZone(plane.lat, plane.lon)),
      )
      .slice(0, 6);
  }, [feed]);

  const choose = (id: string, lat: number, lon: number) => {
    setSelectedId(id);
    mapApi.current?.focus(lat, lon);
  };

  const index = feed?.index ?? 0;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg text-fg">
      <header className="flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-line px-3 py-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center border border-signal text-signal">
            <Crosshair className="size-4" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-sm font-semibold tracking-widest">MERIDIAN</h1>
              <span className="inline-flex items-center gap-1.5 text-xs text-signal">
                <i className="live-dot size-1.5 rounded-full bg-signal" />
                na żywo
              </span>
            </div>
            <p className="hidden truncate text-xs text-muted lg:block">Geopolityka, energia i ruch, który rusza cenami</p>
          </div>
          <nav className="flex shrink-0 border border-line" aria-label="Widok">
            <button
              type="button"
              aria-pressed={view === "map"}
              className={view === "map" ? "h-11 px-3 text-sm text-fg bg-surface-2" : "h-11 px-3 text-sm text-muted"}
              onClick={() => setView("map")}
            >
              Mapa
            </button>
            <button
              type="button"
              aria-pressed={view === "desk"}
              className={view === "desk" ? "h-11 border-l border-line px-3 text-sm text-fg bg-surface-2" : "h-11 border-l border-line px-3 text-sm text-muted"}
              onClick={() => setView("desk")}
            >
              Biurko
            </button>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="text-right">
            <div className={`font-mono text-xl leading-none ${feed ? tone(index) : "text-muted"}`}>
              {feed ? index : "—"}
            </div>
            <div className="text-xs text-muted">indeks napięcia</div>
          </div>
          <div className="hidden text-right font-mono text-xs text-muted sm:block">
            <UtcClock />
            <div>
              <Age iso={feed?.updatedAt} />
            </div>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center border border-line bg-surface text-fg"
            onClick={() => {
              if (view === "desk") deskRefresh.current?.();
              else void pull(true);
            }}
            aria-label="Odśwież teraz"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>
      </header>

      {view === "desk" ? (
        <Desk refreshRef={deskRefresh} />
      ) : (
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-line bg-surface md:flex">
          <div className={selectedId ? "hidden min-h-0 flex-1 flex-col lg:flex" : "flex min-h-0 flex-1 flex-col"}>
            <Situation
              layers={layers}
              counts={counts}
              onToggle={(id) => setLayers((current) => ({ ...current, [id]: !current[id] }))}
              query={query}
              onQuery={setQuery}
              searchHits={searchHits}
              feed={feed}
              enriched={enriched}
              notable={notable}
              now={now}
              loading={loading}
              error={error}
              onChoose={choose}
            />
          </div>
          <div className={selectedId ? "flex min-h-0 flex-1 flex-col lg:hidden" : "hidden"}>
            <DetailView detail={detail} onBack={() => setSelectedId(null)} />
          </div>
        </aside>

        <div className="relative min-w-0 flex-1">
          <LiveMap
            api={mapApi}
            planes={planes}
            ships={ships}
            dots={dots}
            showLanes={layers.node}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
            <button
              type="button"
              className="grid size-11 place-items-center border border-line bg-surface text-fg"
              aria-label="Przybliż"
              onClick={() => mapApi.current?.zoomIn()}
            >
              <Plus className="size-5" />
            </button>
            <button
              type="button"
              className="grid size-11 place-items-center border border-line bg-surface text-fg"
              aria-label="Oddal"
              onClick={() => mapApi.current?.zoomOut()}
            >
              <Minus className="size-5" />
            </button>
            <button
              type="button"
              className="grid size-11 place-items-center border border-line bg-surface text-fg"
              aria-label="Widok świata"
              onClick={() => mapApi.current?.world()}
            >
              <Radio className="size-4" />
            </button>
          </div>
          {loading && !feed ? (
            <div className="pointer-events-none absolute bottom-20 left-3 z-20 border border-line bg-surface px-3 py-2 text-sm text-muted md:bottom-4">
              Łączę źródła na żywo…
            </div>
          ) : null}
        </div>

        <aside className="hidden w-80 shrink-0 flex-col border-l border-line bg-surface lg:flex">
          {detail ? (
            <DetailView detail={detail} onBack={() => setSelectedId(null)} />
          ) : (
            <HeadlineColumn feed={feed} now={now} onChoose={choose} theaters={enriched.theaters} events={enriched.loose} />
          )}
        </aside>
      </div>
      )}

      {view === "map" ? (
      <div className="absolute inset-x-0 bottom-0 z-30 border-t border-line bg-surface md:hidden">
        <button
          type="button"
          className="flex h-16 w-full items-center justify-between px-4 text-left"
          aria-expanded={sheetOpen}
          onClick={() => setSheetOpen((open) => !open)}
        >
          <span>
            <span className="block text-xs text-muted">Sytuacja</span>
            <span className={`font-mono text-lg ${feed ? tone(index) : "text-muted"}`}>
              {feed ? `indeks ${index}` : "łączenie"}
            </span>
          </span>
          <span className="text-xs text-muted">{sheetOpen ? "Zwiń" : "Rozwiń"}</span>
        </button>
        {sheetOpen ? (
          <div className="max-h-[70dvh] overflow-y-auto px-3 pb-4 scroll-thin">
            {detail ? (
              <DetailView detail={detail} onBack={() => setSelectedId(null)} />
            ) : (
              <Situation
                layers={layers}
                counts={counts}
                onToggle={(id) => setLayers((current) => ({ ...current, [id]: !current[id] }))}
                query={query}
                onQuery={setQuery}
                searchHits={searchHits}
                feed={feed}
                enriched={enriched}
                notable={notable}
                now={now}
                loading={loading}
                error={error}
                onChoose={choose}
              />
            )}
          </div>
        ) : null}
      </div>
      ) : null}
    </div>
  );
}

function LiveMap({
  api,
  ...props
}: {
  api: RefObject<MapHandle | null>;
  planes: MovingMark[];
  ships: MovingMark[];
  dots: StaticMark[];
  showLanes: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [View, setView] = useState<MapComponent | null>(null);
  useEffect(() => {
    let live = true;
    void import("@/components/meridian/map-view").then((mod) => {
      if (live) setView(() => mod.MapView);
    });
    return () => {
      live = false;
    };
  }, []);
  if (!View) return <div className="h-full w-full bg-bg" />;
  return <View ref={api} {...props} />;
}

function Situation({
  layers,
  counts,
  onToggle,
  query,
  onQuery,
  searchHits,
  feed,
  enriched,
  notable,
  now,
  loading,
  error,
  onChoose,
}: {
  layers: Record<LayerId, boolean>;
  counts: Record<LayerId, number>;
  onToggle: (id: LayerId) => void;
  query: string;
  onQuery: (value: string) => void;
  searchHits: { id: string; title: string; meta: string; lat: number; lon: number }[];
  feed: Feed | null;
  enriched: { theaters: LiveTheater[]; loose: NewsEvent[] };
  notable: Feed["aircraft"];
  now: number;
  loading: boolean;
  error: string | null;
  onChoose: (id: string, lat: number, lon: number) => void;
}) {
  return (
    <>
      <div className="shrink-0 border-b border-line p-3">
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <span className="text-xs tracking-widest text-muted">WARSTWY</span>
          <span className="font-mono text-xs text-muted">{feed ? `${feed.sources.filter((source) => source.ok).length}/6 źródeł` : "—"}</span>
        </div>
        <div className="grid grid-cols-1">
          {LAYER_ORDER.map((layer) => {
            const on = layers[layer.id];
            return (
              <button
                key={layer.id}
                type="button"
                aria-pressed={on}
                onClick={() => onToggle(layer.id)}
                className={`flex min-h-11 items-center gap-3 border px-2 text-left ${on ? "border-line bg-surface-2 text-fg" : "border-transparent text-muted"}`}
              >
                <Swatch id={layer.id} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm">{layer.label}</span>
                  <span className="block text-xs text-muted">{layer.hint}</span>
                </span>
                <span className="font-mono text-xs">{counts[layer.id]}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-3 scroll-thin">
        <label className="mb-3 block">
          <span className="sr-only">Szukaj</span>
          <input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Szukaj: Gaza, tankowiec, Ramstein…"
            className="h-11 w-full border border-line bg-bg px-3 text-sm text-fg outline-none placeholder:text-muted focus:border-signal"
          />
        </label>
        {error ? <p className="mb-3 text-sm text-conflict">{error}</p> : null}
        {query.trim().length >= 2 ? (
          <ul className="flex flex-col">
            {searchHits.length === 0 ? <li className="text-sm text-muted">Nic nie pasuje.</li> : null}
            {searchHits.map((hit) => (
              <li key={hit.id}>
                <button
                  type="button"
                  className="flex min-h-11 w-full flex-col items-start justify-center border-b border-line py-2 text-left"
                  onClick={() => onChoose(hit.id, hit.lat, hit.lon)}
                >
                  <span className="text-sm">{hit.title}</span>
                  <span className="text-xs text-muted">{hit.meta}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-4">
            {feed ? (
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-xs tracking-widest text-muted">INDEKS</span>
                  <span className={`font-mono text-sm ${tone(feed.index)}`}>{feed.index}/100</span>
                </div>
                <Meter value={feed.index} />
                <ul className="mt-2 flex flex-col gap-1">
                  {feed.parts
                    .filter((part) => part.points > 0)
                    .map((part) => (
                      <li key={part.label} className="flex justify-between gap-3 text-xs text-muted">
                        <span>{part.label}</span>
                        <span className="font-mono text-fg">+{part.points}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-muted">{loading ? "Pobieram samoloty, statki i depesze." : "Brak danych."}</p>
            )}
            {feed?.hormuz ? (
              <div>
                <h2 className="mb-2 text-xs tracking-widest text-muted">ORMUZ TERAZ</h2>
                <div className="grid grid-cols-2 gap-2">
                  <Stat label="Tankowce w kadrze" value={feed.hormuz.tankers} />
                  <Stat label="Fracht w kadrze" value={feed.hormuz.cargo} />
                  <Stat label="W gardle cieśniny" value={feed.hormuz.inChoke} />
                  <Stat label="W ruchu, wszystkie" value={feed.hormuz.moving} />
                </div>
              </div>
            ) : null}
            <Section title="Teatry">
              {enriched.theaters.map((theater) => (
                <Row
                  key={theater.id}
                  title={theater.title}
                  meta={theater.headline ?? theater.blurb}
                  stamp={theater.when ? fmtWhen(theater.when, now) : "bez świeżej depeszy"}
                  hot={theater.heat}
                  onClick={() => onChoose(`theater:${theater.id}`, theater.lat, theater.lon)}
                />
              ))}
            </Section>
            {enriched.loose.length > 0 ? (
              <Section title="Inne miejsca w depeszach">
                {enriched.loose.slice(0, 8).map((event) => (
                  <Row
                    key={event.id}
                    title={event.place}
                    meta={event.headlines[0]?.title ?? ""}
                    stamp={fmtWhen(event.when, now)}
                    hot={event.heat}
                    onClick={() => onChoose(`event:${event.id}`, event.lat, event.lon)}
                  />
                ))}
              </Section>
            ) : null}
            {notable.length > 0 ? (
              <Section title="Loty warte uwagi">
                {notable.map((plane) => (
                  <Row
                    key={plane.id}
                    title={plane.callsign}
                    meta={`${plane.type} · ${inHotZone(plane.lat, plane.lon) ?? "poza strefą"} · ${fmtAlt(plane.altFt)}`}
                    stamp={fmtSpeed(plane.speedKt)}
                    hot={EMERGENCY_SQUAWK.has(plane.squawk)}
                    onClick={() => onChoose(plane.id, plane.lat, plane.lon)}
                  />
                ))}
              </Section>
            ) : null}
            {(feed?.quakes.length ?? 0) > 0 ? (
              <Section title="Najsilniejsze wstrząsy">
                {feed?.quakes.slice(0, 4).map((quake) => (
                  <Row
                    key={quake.id}
                    title={`M ${quake.mag.toFixed(1)}`}
                    meta={quake.title}
                    stamp={fmtWhen(quake.when, now)}
                    hot={quake.mag >= 6}
                    onClick={() => onChoose(`quake:${quake.id}`, quake.lat, quake.lon)}
                  />
                ))}
              </Section>
            ) : null}
          </div>
        )}
        <Sources feed={feed} />
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-1 text-xs tracking-widest text-muted">{title.toUpperCase()}</h2>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

function Row({
  title,
  meta,
  stamp,
  hot,
  onClick,
}: {
  title: string;
  meta: string;
  stamp: string;
  hot?: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-11 w-full flex-col items-start justify-center border-b border-line py-2 text-left">
      <span className="flex w-full items-baseline justify-between gap-2">
        <span className={`text-sm ${hot ? "text-conflict" : "text-fg"}`}>{title}</span>
        <span className="shrink-0 font-mono text-xs text-muted">{stamp}</span>
      </span>
      <span className="line-clamp-2 text-xs text-muted">{meta}</span>
    </button>
  );
}

function HeadlineColumn({
  feed,
  now,
  onChoose,
  theaters,
  events,
}: {
  feed: Feed | null;
  now: number;
  onChoose: (id: string, lat: number, lon: number) => void;
  theaters: LiveTheater[];
  events: NewsEvent[];
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-line px-4 py-3">
        <h2 className="text-xs tracking-widest text-muted">DEPESZE</h2>
        <p className="mt-1 text-sm text-fg">Kliknij tytuł z miejscem, żeby dolecieć. Reszta zostaje w taśmie.</p>
      </div>
      <ul className="min-h-0 flex-1 overflow-y-auto scroll-thin">
        {(feed?.headlines ?? []).map((headline) => (
          <li key={headline.id} className="border-b border-line">
            <HeadlineRow headline={headline} now={now} theaters={theaters} events={events} onChoose={onChoose} />
          </li>
        ))}
        {!feed?.headlines.length ? <li className="px-4 py-3 text-sm text-muted">Brak tytułów.</li> : null}
      </ul>
      <Sources feed={feed} />
    </div>
  );
}

function HeadlineRow({
  headline,
  now,
  theaters,
  events,
  onChoose,
}: {
  headline: Headline;
  now: number;
  theaters: LiveTheater[];
  events: NewsEvent[];
  onChoose: (id: string, lat: number, lon: number) => void;
}) {
  const theater = theaters.find((item) => item.headline === headline.title);
  const event = events.find((item) => item.headlines.some((itemHeadline) => itemHeadline.id === headline.id));
  const body = (
    <>
      <span className="text-sm text-fg">{headline.title}</span>
      <span className="mt-1 flex flex-wrap gap-x-2 text-xs text-muted">
        <span>{headline.source}</span>
        <span>{fmtWhen(headline.when, now)}</span>
        {headline.place ? <span>{headline.place}</span> : null}
      </span>
    </>
  );
  if (theater) {
    return (
      <button type="button" className="w-full px-4 py-3 text-left" onClick={() => onChoose(`theater:${theater.id}`, theater.lat, theater.lon)}>
        {body}
      </button>
    );
  }
  if (event) {
    return (
      <button type="button" className="w-full px-4 py-3 text-left" onClick={() => onChoose(`event:${event.id}`, event.lat, event.lon)}>
        {body}
      </button>
    );
  }
  if (headline.href) {
    return (
      <a href={headline.href} target="_blank" rel="noreferrer" className="block px-4 py-3">
        {body}
      </a>
    );
  }
  return <div className="px-4 py-3">{body}</div>;
}

function DetailView({
  detail,
  onBack,
}: {
  detail: Detail | null;
  onBack: () => void;
}) {
  if (!detail) {
    return <p className="p-4 text-sm text-muted">Wybierz punkt na mapie.</p>;
  }
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-line px-4 py-3">
        <button type="button" onClick={onBack} className="mb-3 text-xs text-signal lg:hidden">
          Wróć
        </button>
        <div className="text-xs tracking-widest text-muted">{detail.kicker.toUpperCase()}</div>
        <h2 className="mt-1 text-lg font-semibold leading-tight">{detail.title}</h2>
        {detail.note ? <p className="mt-2 text-sm text-muted">{detail.note}</p> : null}
      </div>
      <dl className="min-h-0 flex-1 overflow-y-auto px-4 py-3 scroll-thin">
        {detail.lines.map((line) => (
          <div key={line.label} className="flex items-baseline justify-between gap-3 border-b border-line py-2 text-sm">
            <dt className="shrink-0 text-muted">{line.label}</dt>
            <dd className="text-right text-fg">{line.value}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-3 border-b border-line py-2 text-sm">
          <dt className="text-muted">Pozycja</dt>
          <dd className="font-mono text-xs">
            {detail.lat.toFixed(2)}, {detail.lon.toFixed(2)}
          </dd>
        </div>
      </dl>
      {detail.href ? (
        <a
          href={detail.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 border-t border-line px-4 text-sm text-signal"
        >
          Otwórz źródło
          <ExternalLink className="size-4" />
        </a>
      ) : null}
    </div>
  );
}

function Sources({ feed }: { feed: Feed | null }) {
  return (
    <details className="border-t border-line px-4 py-3 text-xs text-muted">
      <summary className="text-sm text-fg">Źródła i co jest na żywo</summary>
      <ul className="mt-2 flex flex-col gap-1">
        {(feed?.sources ?? []).map((source) => (
          <li key={source.id}>
            <span className={source.ok ? "text-sea" : "text-conflict"}>{source.ok ? "OK" : "PRZERWA"}</span> {source.label}: {source.detail}
          </li>
        ))}
      </ul>
      <p className="mt-2">
        Samoloty: społeczna sieć ADS-B (adsb.lol). Tankowce w Ormuzie: hormuz.now, publiczny AIS (CC BY 4.0). Bałtyk i Zatoka Fińska: Fintraffic Digitraffic (CC BY 4.0). Depesze: BBC, Al Jazeera, Guardian, RMF — miejsce z tytułu, więc to przybliżenie, nie współrzędna redakcji. Wstrząsy: USGS. Zagrożenia: NASA EONET. Bazy i węzły są stałym atlasem, nie ruchem wojsk.
      </p>
      <p className="mt-2">
        Między odświeżeniami samoloty i statki suną po kursie i prędkości, najwyżej dwie minuty. Indeks napięcia to heurystyka z tego strumienia, nie prognoza rynkowa. Globalny AIS handlowy jest płatny — żywa żegluga obejmuje Ormuz i Bałtyk, czyli dwa miejsca, które najbardziej ruszają ropą.
      </p>
    </details>
  );
}

function vesselLines(vessel: Vessel): { label: string; value: string }[] {
  return [
    { label: "Akwen", value: vessel.region === "Ormuz" ? "Cieśnina Ormuz i Zatoka" : "Bałtyk / Zatoka Fińska" },
    { label: "Klasa", value: vessel.kind === "tanker" ? "Tankowiec" : "Fracht" },
    { label: "Prędkość", value: fmtSpeed(vessel.speedKt) },
    { label: "Kurs", value: courseLabel(vessel.course) },
    { label: "Cel", value: vessel.dest || "—" },
    { label: "Opis", value: vessel.detail || "—" },
  ];
}

function resolveDetail(
  id: string,
  feed: Feed | null,
  theaters: LiveTheater[],
  events: NewsEvent[],
): Detail | null {
  if (id.startsWith("base:")) {
    const site = bases.find((item) => item.id === id.slice(5));
    if (!site) return null;
    return {
      id,
      kicker: "Baza · stały punkt",
      title: site.title,
      note: site.detail,
      lat: site.lat,
      lon: site.lon,
      lines: [{ label: "Rola", value: site.tag }],
    };
  }
  if (id.startsWith("node:")) {
    const site = nodes.find((item) => item.id === id.slice(5));
    if (!site) return null;
    const extra: { label: string; value: string }[] = [{ label: "Typ", value: site.tag }];
    if (site.id === "hormuz" && feed?.hormuz) {
      extra.push({
        label: "Na żywo",
        value: `${feed.hormuz.tankers} tankowców, ${feed.hormuz.cargo} frachtu, ${feed.hormuz.inChoke} w gardle`,
      });
    }
    if (site.id === "primorsk" || site.id === "ustluga" || site.id === "danish") {
      const balticTankers = (feed?.vessels ?? []).filter((vessel) => vessel.region === "Bałtyk" && vessel.kind === "tanker").length;
      extra.push({ label: "AIS Bałtyk", value: `${balticTankers} tankowców w kadrze fińskim` });
    }
    return {
      id,
      kicker: "Węzeł gospodarczy",
      title: site.title,
      note: site.detail,
      lat: site.lat,
      lon: site.lon,
      lines: extra,
    };
  }
  if (id.startsWith("theater:")) {
    const theater = theaters.find((item) => item.id === id.slice(8));
    if (!theater) return null;
    return {
      id,
      kicker: theater.heat ? "Teatr · świeże napięcie" : "Teatr napięcia",
      title: theater.title,
      note: theater.headline ?? theater.blurb,
      href: theater.href,
      lat: theater.lat,
      lon: theater.lon,
      lines: [
        { label: "Kontekst", value: theater.blurb },
        { label: "Depesza", value: theater.headline ?? "brak świeżego trafienia w promieniu 220 km" },
        { label: "Źródło", value: theater.source ?? "—" },
        { label: "Czas", value: theater.when ?? "—" },
      ],
    };
  }
  if (id.startsWith("event:")) {
    const event = events.find((item) => item.id === id.slice(6));
    if (!event) return null;
    return {
      id,
      kicker: event.heat ? "Depesza · siła lub sankcje" : "Depesza",
      title: event.place,
      note: "Miejsce dopasowane słownikiem z tytułu. To nie jest współrzędna reportera.",
      href: event.headlines[0]?.href,
      lat: event.lat,
      lon: event.lon,
      lines: event.headlines.slice(0, 4).map((headline, index) => ({
        label: index === 0 ? "Najnowsza" : headline.source,
        value: `${headline.title} (${headline.source})`,
      })),
    };
  }
  if (id.startsWith("quake:")) {
    const quake = feed?.quakes.find((item) => item.id === id.slice(6));
    if (!quake) return null;
    return {
      id,
      kicker: quake.tsunami ? "Trzęsienie · tsunami" : "Trzęsienie",
      title: `M ${quake.mag.toFixed(1)}`,
      note: quake.title,
      href: quake.href,
      lat: quake.lat,
      lon: quake.lon,
      lines: [
        { label: "Magnituda", value: quake.mag.toFixed(1) },
        { label: "Głębokość", value: `${quake.depthKm} km` },
        { label: "Czas", value: quake.when.replace("T", " ").slice(0, 16) + " UTC" },
        { label: "Tsunami", value: quake.tsunami ? "alert w danych USGS" : "nie" },
      ],
    };
  }
  if (id.startsWith("hazard:")) {
    const hazard = feed?.hazards.find((item) => item.id === id.slice(7));
    if (!hazard) return null;
    return {
      id,
      kicker: hazard.kind,
      title: hazard.title,
      href: hazard.href,
      lat: hazard.lat,
      lon: hazard.lon,
      lines: [
        { label: "Klasa", value: hazard.kind },
        { label: "Od", value: hazard.when.slice(0, 10) },
      ],
    };
  }
  const plane = feed?.aircraft.find((item) => item.id === id);
  if (plane) {
    const zone = inHotZone(plane.lat, plane.lon);
    return {
      id,
      kicker: EMERGENCY_SQUAWK.has(plane.squawk) ? "Samolot · squawk alarmowy" : "Samolot wojskowy",
      title: plane.callsign,
      note: zone ? `W strefie: ${zone}. Pozycja z ADS-B, kilka–kilkadziesiąt sekund temu.` : "Pozycja z ADS-B. Wojskowe transpondery bywają wyłączone — brak kropki nie znaczy brak samolotu.",
      lat: plane.lat,
      lon: plane.lon,
      lines: [
        { label: "Typ ICAO", value: plane.type },
        { label: "Rejestracja", value: plane.reg || "—" },
        { label: "Hex", value: plane.hex || "—" },
        { label: "Pułap", value: fmtAlt(plane.altFt) },
        { label: "Prędkość", value: fmtSpeed(plane.speedKt) },
        { label: "Kurs", value: courseLabel(plane.track) },
        { label: "Squawk", value: squawkLabel(plane.squawk) },
      ],
    };
  }
  const vessel = feed?.vessels.find((item) => item.id === id);
  if (vessel) {
    return {
      id,
      kicker: vessel.kind === "tanker" ? "Tankowiec" : "Frachtowiec",
      title: vessel.name,
      note: "Pozycja AIS z publicznego kadru. Nazwa i cel pochodzą z komunikatu statku — bywają puste albo mylące.",
      lat: vessel.lat,
      lon: vessel.lon,
      lines: vesselLines(vessel),
    };
  }
  return null;
}
