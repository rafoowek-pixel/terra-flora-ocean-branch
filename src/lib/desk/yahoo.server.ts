import {
  ALL_LEGS,
  assemble,
  presetById,
  sessionCloses,
  type DeskPayload,
  type Point,
  type Preset,
  type SeriesIn,
} from "@/lib/desk/model";

type CacheEntry = { at: number; data: SeriesIn };

const cache = new Map<string, CacheEntry>();

function ttlFor(interval: string): number {
  return interval === "1d" || interval === "1wk" ? 180_000 : 45_000;
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

async function fetchSeries(id: string, symbol: string, interval: string, range: string): Promise<SeriesIn> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}&includePrePost=false`;
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "Mozilla/5.0 (compatible; Meridian/1.0)",
    },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const payload = (await response.json()) as {
    chart?: {
      result?: {
        timestamp?: number[];
        indicators?: { quote?: { close?: (number | null)[] }[] };
        meta?: { regularMarketPrice?: number; regularMarketChangePercent?: number };
      }[];
    };
  };
  const result = payload.chart?.result?.[0];
  if (!result) throw new Error("pusta seria");
  const stamps = result.timestamp ?? [];
  const closes = result.indicators?.quote?.[0]?.close ?? [];
  const points: Point[] = [];
  for (let i = 0; i < stamps.length; i++) {
    const close = closes[i];
    if (typeof close === "number" && Number.isFinite(close) && close > 0) {
      points.push({ t: stamps[i], c: close });
    }
  }
  if (points.length < 2) throw new Error("za krótka seria");
  return {
    id,
    points,
    last: num(result.meta?.regularMarketPrice) ?? points[points.length - 1].c,
    changePct: num(result.meta?.regularMarketChangePercent),
    ok: true,
  };
}

async function loadOne(
  id: string,
  symbol: string,
  interval: string,
  range: string,
  force: boolean,
): Promise<SeriesIn> {
  const key = `${symbol}|${interval}|${range}`;
  const hit = cache.get(key);
  if (!force && hit && Date.now() - hit.at < ttlFor(interval)) return { ...hit.data, id };
  try {
    const data = await fetchSeries(id, symbol, interval, range);
    cache.set(key, { at: Date.now(), data });
    return data;
  } catch {
    if (hit) return { ...hit.data, id };
    return { id, points: [], last: null, changePct: null, ok: false };
  }
}

async function pool<T>(jobs: (() => Promise<T>)[], size: number): Promise<T[]> {
  const out: T[] = new Array(jobs.length);
  let cursor = 0;
  async function worker() {
    while (cursor < jobs.length) {
      const index = cursor;
      cursor += 1;
      out[index] = await jobs[index]();
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, jobs.length) }, () => worker()));
  return out;
}

async function loadForPreset(id: string, symbol: string, preset: Preset, force: boolean): Promise<SeriesIn> {
  if (preset.interval !== "1d") return loadOne(id, symbol, preset.interval, preset.range, force);
  const key = `${symbol}|session|${preset.range}`;
  const hit = cache.get(key);
  if (!force && hit && Date.now() - hit.at < ttlFor("1d")) return { ...hit.data, id };
  try {
    const raw = await fetchSeries(id, symbol, "1h", preset.range);
    const points = sessionCloses(raw.points);
    if (points.length < 8) throw new Error("za mało sesji");
    const data: SeriesIn = { ...raw, points };
    cache.set(key, { at: Date.now(), data });
    return data;
  } catch {
    if (hit) return { ...hit.data, id };
    return loadOne(id, symbol, "1d", preset.range, force);
  }
}

export async function getDesk(shortId: string, longId: string, force: boolean): Promise<DeskPayload> {
  const short = presetById(shortId, "short");
  const long = presetById(longId, "long");
  const jobs = ALL_LEGS.flatMap((leg) => [
    () => loadForPreset(leg.id, leg.symbol, short, force),
    () => loadForPreset(leg.id, leg.symbol, long, force),
  ]);
  const rows = await pool(jobs, 6);
  const shortSeries = rows.filter((_, index) => index % 2 === 0);
  const longSeries = rows.filter((_, index) => index % 2 === 1);
  return assemble({ short: shortSeries, long: longSeries, shortId: short.id, longId: long.id });
}
