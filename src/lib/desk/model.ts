export type HorizonId = "short" | "long";

export type Preset = {
  id: string;
  interval: "5m" | "15m" | "1h" | "1d" | "1wk";
  range: string;
  label: string;
  hint: string;
};

export type LegDef = {
  id: string;
  symbol: string;
  label: string;
  name: string;
};

export type BasketDef = {
  id: string;
  name: string;
  note: string;
  legs: LegDef[];
};

export const SHORT_PRESETS: Preset[] = [
  { id: "5m-5d", interval: "5m", range: "5d", label: "5 min", hint: "5 sesji" },
  { id: "15m-5d", interval: "15m", range: "5d", label: "15 min", hint: "5 sesji" },
  { id: "15m-1mo", interval: "15m", range: "1mo", label: "15 min", hint: "miesiąc" },
  { id: "1h-1mo", interval: "1h", range: "1mo", label: "1 godz.", hint: "miesiąc" },
  { id: "1h-3mo", interval: "1h", range: "3mo", label: "1 godz.", hint: "3 miesiące" },
];

export const LONG_PRESETS: Preset[] = [
  { id: "1d-3mo", interval: "1d", range: "3mo", label: "dzień", hint: "3 miesiące" },
  { id: "1d-6mo", interval: "1d", range: "6mo", label: "dzień", hint: "pół roku" },
  { id: "1d-1y", interval: "1d", range: "1y", label: "dzień", hint: "rok" },
  { id: "1d-2y", interval: "1d", range: "2y", label: "dzień", hint: "2 lata" },
  { id: "1wk-5y", interval: "1wk", range: "5y", label: "tydzień", hint: "5 lat" },
];

export const BASKETS: BasketDef[] = [
  {
    id: "index",
    name: "Indeksy i frank",
    note: "NQ, ES, YM, RTY oraz frank szwajcarski. Futures, front month.",
    legs: [
      { id: "NQ", symbol: "NQ=F", label: "NQ", name: "Nasdaq 100" },
      { id: "ES", symbol: "ES=F", label: "ES", name: "S&P 500" },
      { id: "YM", symbol: "YM=F", label: "YM", name: "Dow" },
      { id: "RTY", symbol: "RTY=F", label: "RTY", name: "Russell 2000" },
      { id: "CHF", symbol: "6S=F", label: "CHF", name: "Frank szwajcarski" },
    ],
  },
  {
    id: "fx",
    name: "Euro, funt, dolar",
    note: "EUR/USD, GBP/USD i DXY. Triada dolara.",
    legs: [
      { id: "EUR", symbol: "EURUSD=X", label: "EUR/USD", name: "Euro" },
      { id: "GBP", symbol: "GBPUSD=X", label: "GBP/USD", name: "Funt" },
      { id: "DXY", symbol: "DX-Y.NYB", label: "DXY", name: "Indeks dolara" },
    ],
  },
  {
    id: "bonds",
    name: "Obligacje skarbowe",
    note: "Futures USA: krótki koniec, brzuch i długi koniec krzywej. Cena, nie yield.",
    legs: [
      { id: "ZT", symbol: "ZT=F", label: "ZT", name: "2-latka" },
      { id: "ZF", symbol: "ZF=F", label: "ZF", name: "5-latka" },
      { id: "ZN", symbol: "ZN=F", label: "ZN", name: "10-latka" },
      { id: "ZB", symbol: "ZB=F", label: "ZB", name: "30-latka" },
    ],
  },
];

export const ALL_LEGS: LegDef[] = BASKETS.flatMap((basket) => basket.legs);

export type Point = { t: number; c: number };

export type SeriesIn = {
  id: string;
  points: Point[];
  last: number | null;
  changePct: number | null;
  ok: boolean;
};

export type Matrix = {
  ids: string[];
  labels: string[];
  rho: (number | null)[][];
  n: number[][];
};

export type PairLink = {
  a: string;
  b: string;
  rho: number;
  n: number;
};

export type Drift = {
  a: string;
  b: string;
  short: number;
  long: number;
  gap: number;
};

export type HorizonBlock = {
  presetId: string;
  label: string;
  hint: string;
  interval: Preset["interval"];
  matrices: Record<string, Matrix>;
  cross: Matrix;
  tight: PairLink[];
  inverse: PairLink[];
};

export type DeskPayload = {
  updatedAt: string;
  quotes: {
    id: string;
    label: string;
    name: string;
    basketId: string;
    last: number | null;
    changePct: number | null;
    ok: boolean;
  }[];
  baskets: { id: string; name: string; note: string; legIds: string[] }[];
  short: HorizonBlock;
  long: HorizonBlock;
  drift: Drift[];
  warnings: string[];
};

const SESSION_HOUR = 21;

export function sessionCloses(points: Point[]): Point[] {
  const best = new Map<number, { point: Point; dist: number }>();
  for (const point of points) {
    if (!(point.c > 0)) continue;
    const day = Math.floor(point.t / 86400);
    const hour = Math.floor((point.t % 86400) / 3600);
    let dist = Math.abs(hour - SESSION_HOUR);
    if (dist > 12) dist = 24 - dist;
    if (dist > 3) continue;
    const prev = best.get(day);
    if (!prev || dist < prev.dist || (dist === prev.dist && point.t > prev.point.t)) {
      best.set(day, { point, dist });
    }
  }
  return [...best.keys()]
    .sort((a, b) => a - b)
    .map((day) => ({ t: day * 86400 + SESSION_HOUR * 3600, c: best.get(day)!.point.c }));
}

export function presetById(id: string, horizon: HorizonId): Preset {
  const list = horizon === "short" ? SHORT_PRESETS : LONG_PRESETS;
  return list.find((preset) => preset.id === id) ?? list[horizon === "short" ? 1 : 2];
}

function bucketOf(ts: number, interval: Preset["interval"]): number {
  if (interval === "1d") return Math.floor((ts + 5 * 3600) / 86400);
  if (interval === "1wk") return Math.floor((ts + 5 * 3600) / (86400 * 7));
  const step = interval === "5m" ? 300 : interval === "15m" ? 900 : 3600;
  return Math.floor(ts / step);
}

function toMap(points: Point[], interval: Preset["interval"]): Map<number, number> {
  const map = new Map<number, { t: number; c: number }>();
  for (const point of points) {
    if (!(point.c > 0)) continue;
    const bucket = bucketOf(point.t, interval);
    const prev = map.get(bucket);
    if (!prev || point.t >= prev.t) map.set(bucket, point);
  }
  const closes = new Map<number, number>();
  for (const [bucket, point] of map) closes.set(bucket, point.c);
  return closes;
}

function pearson(xs: number[], ys: number[]): number | null {
  const n = xs.length;
  const MIN_N = 12;
  if (n < MIN_N) return null;
  let sx = 0;
  let sy = 0;
  let sxx = 0;
  let syy = 0;
  let sxy = 0;
  for (let i = 0; i < n; i++) {
    const x = xs[i];
    const y = ys[i];
    sx += x;
    sy += y;
    sxx += x * x;
    syy += y * y;
    sxy += x * y;
  }
  const cov = sxy - (sx * sy) / n;
  const vx = sxx - (sx * sx) / n;
  const vy = syy - (sy * sy) / n;
  if (vx <= 1e-12 || vy <= 1e-12) return null;
  const rho = cov / Math.sqrt(vx * vy);
  if (!Number.isFinite(rho)) return null;
  return Math.max(-1, Math.min(1, rho));
}

export function correlate(
  a: Point[],
  b: Point[],
  interval: Preset["interval"],
): { rho: number | null; n: number } {
  const left = toMap(a, interval);
  const right = toMap(b, interval);
  const keys = [...left.keys()].filter((key) => right.has(key)).sort((x, y) => x - y);
  const xs: number[] = [];
  const ys: number[] = [];
  const adjacent = interval !== "1d" && interval !== "1wk";
  for (let i = 1; i < keys.length; i++) {
    if (adjacent && keys[i] - keys[i - 1] !== 1) continue;
    const p0 = left.get(keys[i - 1]);
    const p1 = left.get(keys[i]);
    const q0 = right.get(keys[i - 1]);
    const q1 = right.get(keys[i]);
    if (p0 == null || p1 == null || q0 == null || q1 == null) continue;
    if (p0 <= 0 || p1 <= 0 || q0 <= 0 || q1 <= 0) continue;
    xs.push(Math.log(p1 / p0));
    ys.push(Math.log(q1 / q0));
  }
  return { rho: pearson(xs, ys), n: xs.length };
}

function matrixFor(ids: string[], byId: Map<string, SeriesIn>, interval: Preset["interval"]): Matrix {
  const labels = ids.map((id) => ALL_LEGS.find((leg) => leg.id === id)?.label ?? id);
  const rho: (number | null)[][] = [];
  const n: number[][] = [];
  for (let row = 0; row < ids.length; row++) {
    const rhoRow: (number | null)[] = [];
    const nRow: number[] = [];
    for (let col = 0; col < ids.length; col++) {
      if (row === col) {
        rhoRow.push(1);
        nRow.push(0);
        continue;
      }
      const left = byId.get(ids[row]);
      const right = byId.get(ids[col]);
      if (!left?.ok || !right?.ok) {
        rhoRow.push(null);
        nRow.push(0);
        continue;
      }
      if (col < row) {
        rhoRow.push(rho[col][row]);
        nRow.push(n[col][row]);
        continue;
      }
      const pair = correlate(left.points, right.points, interval);
      rhoRow.push(pair.rho);
      nRow.push(pair.n);
    }
    rho.push(rhoRow);
    n.push(nRow);
  }
  return { ids, labels, rho, n };
}

function extreme(matrix: Matrix, sign: "tight" | "inverse"): PairLink[] {
  const found: PairLink[] = [];
  for (let row = 0; row < matrix.ids.length; row++) {
    for (let col = row + 1; col < matrix.ids.length; col++) {
      const rho = matrix.rho[row][col];
      if (rho == null) continue;
      found.push({ a: matrix.labels[row], b: matrix.labels[col], rho, n: matrix.n[row][col] });
    }
  }
  found.sort((left, right) => (sign === "tight" ? right.rho - left.rho : left.rho - right.rho));
  return found.slice(0, 3);
}

function horizonBlock(preset: Preset, byId: Map<string, SeriesIn>): HorizonBlock {
  const matrices: Record<string, Matrix> = {};
  for (const basket of BASKETS) {
    matrices[basket.id] = matrixFor(
      basket.legs.map((leg) => leg.id),
      byId,
      preset.interval,
    );
  }
  const cross = matrixFor(
    ALL_LEGS.map((leg) => leg.id),
    byId,
    preset.interval,
  );
  return {
    presetId: preset.id,
    label: preset.label,
    hint: preset.hint,
    interval: preset.interval,
    matrices,
    cross,
    tight: extreme(cross, "tight"),
    inverse: extreme(cross, "inverse"),
  };
}

export function assemble(input: {
  short: SeriesIn[];
  long: SeriesIn[];
  shortId: string;
  longId: string;
}): DeskPayload {
  const shortPreset = presetById(input.shortId, "short");
  const longPreset = presetById(input.longId, "long");
  const shortById = new Map(input.short.map((row) => [row.id, row]));
  const longById = new Map(input.long.map((row) => [row.id, row]));
  const short = horizonBlock(shortPreset, shortById);
  const long = horizonBlock(longPreset, longById);
  const warnings = ALL_LEGS.filter((leg) => !shortById.get(leg.id)?.ok || !longById.get(leg.id)?.ok).map(
    (leg) => `Brak serii: ${leg.label}`,
  );

  const drift: Drift[] = [];
  for (let row = 0; row < short.cross.ids.length; row++) {
    for (let col = row + 1; col < short.cross.ids.length; col++) {
      const brief = short.cross.rho[row][col];
      const distant = long.cross.rho[row][col];
      if (brief == null || distant == null) continue;
      drift.push({
        a: short.cross.labels[row],
        b: short.cross.labels[col],
        short: brief,
        long: distant,
        gap: brief - distant,
      });
    }
  }
  drift.sort((left, right) => Math.abs(right.gap) - Math.abs(left.gap));

  return {
    updatedAt: new Date().toISOString(),
    quotes: BASKETS.flatMap((basket) =>
      basket.legs.map((leg) => {
        const live = shortById.get(leg.id)?.ok ? shortById.get(leg.id) : longById.get(leg.id);
        return {
          id: leg.id,
          label: leg.label,
          name: leg.name,
          basketId: basket.id,
          last: live?.last ?? null,
          changePct: live?.changePct ?? null,
          ok: Boolean(shortById.get(leg.id)?.ok || longById.get(leg.id)?.ok),
        };
      }),
    ),
    baskets: BASKETS.map((basket) => ({
      id: basket.id,
      name: basket.name,
      note: basket.note,
      legIds: basket.legs.map((leg) => leg.id),
    })),
    short,
    long,
    drift: drift.slice(0, 8),
    warnings,
  };
}
