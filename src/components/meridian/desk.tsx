import { useCallback, useEffect, useState, type CSSProperties, type RefObject } from "react";
import { LONG_PRESETS, SHORT_PRESETS, type DeskPayload, type Matrix, type Preset } from "@/lib/desk/model";

const FX = new Set(["EUR", "GBP", "CHF"]);
const FINE = new Set(["DXY", "ZT", "ZF", "ZN", "ZB"]);

function isDesk(value: unknown): value is DeskPayload {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<DeskPayload>;
  return Array.isArray(row.quotes) && row.short != null && row.long != null && Array.isArray(row.drift);
}

function fmtRho(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "—";
  const text = Math.abs(value).toFixed(2);
  if (value > 0) return `+${text}`;
  if (value < 0) return `−${text}`;
  return "0.00";
}

function rhoClass(value: number | null, self: boolean): string {
  if (self) return "rho rho-flat";
  if (value == null) return "rho rho-na";
  const mag = Math.abs(value);
  const step = mag >= 0.75 ? 3 : mag >= 0.45 ? 2 : mag >= 0.2 ? 1 : 0;
  if (step === 0) return "rho rho-flat";
  return `rho rho-${value > 0 ? "pos" : "neg"}-${step}`;
}

function fmtPx(id: string, value: number | null): string {
  if (value == null) return "—";
  if (FX.has(id)) return value.toLocaleString("pl-PL", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  if (FINE.has(id)) return value.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return value.toLocaleString("pl-PL", { maximumFractionDigits: 1 });
}

function fmtChg(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "—";
  const text = `${Math.abs(value).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
  if (value > 0) return `+${text}`;
  if (value < 0) return `−${text}`;
  return text;
}

function sampleNote(matrix: Matrix): string {
  const counts: number[] = [];
  for (let row = 0; row < matrix.n.length; row++) {
    for (let col = row + 1; col < matrix.n.length; col++) {
      if (matrix.n[row][col] > 0) counts.push(matrix.n[row][col]);
    }
  }
  if (!counts.length) return "za mało wspólnych świec";
  counts.sort((a, b) => a - b);
  return `n ≈ ${counts[Math.floor(counts.length / 2)]} wspólnych zwrotów`;
}

function ends(matrix: Matrix): { tight: string; inverse: string } {
  let tight: { label: string; rho: number } | null = null;
  let inverse: { label: string; rho: number } | null = null;
  for (let row = 0; row < matrix.ids.length; row++) {
    for (let col = row + 1; col < matrix.ids.length; col++) {
      const rho = matrix.rho[row][col];
      if (rho == null) continue;
      const label = `${matrix.labels[row]}–${matrix.labels[col]} ${fmtRho(rho)}`;
      if (!tight || rho > tight.rho) tight = { label, rho };
      if (!inverse || rho < inverse.rho) inverse = { label, rho };
    }
  }
  return {
    tight: tight ? `razem ${tight.label}` : "brak pary",
    inverse: inverse && inverse.rho < 0.2 ? `osobno ${inverse.label}` : "brak wyraźnej pary odwrotnej",
  };
}

function MatrixView({ matrix, title }: { matrix: Matrix; title: string }) {
  const note = ends(matrix);
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="text-xs tracking-widest text-muted uppercase">{title}</h3>
        <span className="font-mono text-xs text-muted">{sampleNote(matrix)}</span>
      </div>
      <div className="overflow-x-auto">
        <div className="rho-grid min-w-80" style={{ "--cols": matrix.labels.length } as CSSProperties}>
          <div className="rho rho-head" />
          {matrix.labels.map((label) => (
            <div key={label} className="rho rho-head">
              {label}
            </div>
          ))}
          {matrix.labels.map((label, row) => (
            <div key={label} className="contents">
              <div className="rho rho-head justify-start px-2">{label}</div>
              {matrix.labels.map((colLabel, col) => {
                const value = matrix.rho[row][col];
                const count = matrix.n[row][col];
                return (
                  <div
                    key={colLabel}
                    className={rhoClass(value, row === col)}
                    title={
                      row === col
                        ? label
                        : `${label} × ${colLabel}: ${fmtRho(value)}${count ? ` · n=${count}` : ""}`
                    }
                  >
                    {row === col ? "1" : fmtRho(value)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        {note.tight}
        <span className="px-2 text-line">/</span>
        {note.inverse}
      </p>
    </div>
  );
}

function PresetRow({
  label,
  presets,
  active,
  onPick,
}: {
  label: string;
  presets: Preset[];
  active: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-2 text-xs tracking-widest text-muted uppercase">{label}</div>
      <div className="flex flex-wrap gap-1">
        {presets.map((preset) => {
          const on = preset.id === active;
          return (
            <button
              key={preset.id}
              type="button"
              aria-pressed={on}
              className={
                on
                  ? "h-11 border border-signal bg-surface-2 px-3 text-left text-sm text-fg"
                  : "h-11 border border-line px-3 text-left text-sm text-muted"
              }
              onClick={() => onPick(preset.id)}
            >
              {preset.label}
              <span className="text-muted"> · {preset.hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Desk({ refreshRef }: { refreshRef: RefObject<(() => void) | null> }) {
  const [shortId, setShortId] = useState("15m-5d");
  const [longId, setLongId] = useState("1d-1y");
  const [ready, setReady] = useState(false);
  const [desk, setDesk] = useState<DeskPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("meridian-desk");
      if (raw) {
        const parsed = JSON.parse(raw) as { short?: string; long?: string };
        const nextShort = parsed.short;
        const nextLong = parsed.long;
        if (nextShort && SHORT_PRESETS.some((preset) => preset.id === nextShort)) setShortId(nextShort);
        if (nextLong && LONG_PRESETS.some((preset) => preset.id === nextLong)) setLongId(nextLong);
      }
    } catch {
      /* ignore broken prefs */
    }
    setReady(true);
  }, []);

  const load = useCallback(
    async (fresh: boolean) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ short: shortId, long: longId });
        if (fresh) params.set("fresh", "1");
        const response = await fetch(`/api/desk?${params.toString()}`);
        const payload: unknown = await response.json();
        if (!response.ok || !isDesk(payload)) throw new Error("desk");
        setDesk(payload);
        setError(null);
      } catch {
        setError("Notowania chwilowo nie schodzą. Zostawiam ostatnią macierz.");
      } finally {
        setLoading(false);
      }
    },
    [shortId, longId],
  );

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("meridian-desk", JSON.stringify({ short: shortId, long: longId }));
    void load(false);
    const timer = window.setInterval(() => void load(false), 60000);
    return () => window.clearInterval(timer);
  }, [ready, shortId, longId, load]);

  useEffect(() => {
    refreshRef.current = () => void load(true);
    return () => {
      refreshRef.current = null;
    };
  }, [load, refreshRef]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto scroll-thin">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-3 py-4 sm:px-5">
        <div className="flex flex-col gap-4 border border-line bg-surface p-3 sm:p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <PresetRow label="Krótki horyzont" presets={SHORT_PRESETS} active={shortId} onPick={setShortId} />
            <PresetRow label="Długi horyzont" presets={LONG_PRESETS} active={longId} onPick={setLongId} />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="rho rho-neg-3 w-10">−1</span>
            <span>przeciwnie</span>
            <span className="rho rho-flat w-10">0</span>
            <span className="rho rho-pos-3 w-10">+1</span>
            <span>razem</span>
            <span className="min-w-0 flex-1">
              Pearson na log-zwrotach. Dzień bierze wspólną godzinę 21:00 UTC, żeby frank, dolar i indeksy stały na tej samej świecy. Notowania opóźnione. To opis związku, nie sygnał.
            </span>
          </div>
        </div>

        {error ? <p className="border border-line px-3 py-2 text-sm text-conflict">{error}</p> : null}
        {desk?.warnings.length ? (
          <p className="text-sm text-signal">{desk.warnings.join(" · ")}</p>
        ) : null}
        {loading && !desk ? <p className="text-sm text-muted">Liczenie korelacji…</p> : null}

        {desk
          ? desk.baskets.map((basket) => {
              const quotes = desk.quotes.filter((quote) => quote.basketId === basket.id);
              return (
                <section key={basket.id} className="flex flex-col gap-4">
                  <header>
                    <h2 className="text-sm font-semibold tracking-widest">{basket.name}</h2>
                    <p className="text-xs text-muted">{basket.note}</p>
                  </header>
                  <div
                    className={`grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 ${quotes.length > 4 ? "lg:grid-cols-5" : quotes.length === 4 ? "lg:grid-cols-4" : ""}`}
                  >
                    {quotes.map((quote) => (
                      <div key={quote.id} className="bg-surface px-3 py-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-mono text-sm text-fg">{quote.label}</span>
                          <span
                            className={
                              quote.changePct != null && quote.changePct < 0
                                ? "font-mono text-xs text-conflict"
                                : quote.changePct != null && quote.changePct > 0
                                  ? "font-mono text-xs text-sea"
                                  : "font-mono text-xs text-muted"
                            }
                          >
                            {fmtChg(quote.changePct)}
                          </span>
                        </div>
                        <div className="font-mono text-lg text-fg">{fmtPx(quote.id, quote.last)}</div>
                        <div className="text-xs text-muted">{quote.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <MatrixView matrix={desk.short.matrices[basket.id]} title={`Krótki · ${desk.short.label} · ${desk.short.hint}`} />
                    <MatrixView matrix={desk.long.matrices[basket.id]} title={`Długi · ${desk.long.label} · ${desk.long.hint}`} />
                  </div>
                </section>
              );
            })
          : null}

        {desk ? (
          <section className="flex flex-col gap-4 border-t border-line pt-4">
            <header>
              <h2 className="text-sm font-semibold tracking-widest">Względem siebie</h2>
              <p className="text-xs text-muted">
                Wszystkie nogi w jednej macierzy. Pod spodem pary, w których krótki horyzont najbardziej odjechał od długiego.
              </p>
            </header>
            <div className="grid gap-6">
              <MatrixView matrix={desk.short.cross} title={`Krótki · ${desk.short.label} · ${desk.short.hint}`} />
              <MatrixView matrix={desk.long.cross} title={`Długi · ${desk.long.label} · ${desk.long.hint}`} />
            </div>
            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="bg-surface text-xs tracking-widest text-muted uppercase">
                  <tr>
                    <th className="px-3 py-2 font-medium">Para</th>
                    <th className="px-3 py-2 font-medium">Krótki</th>
                    <th className="px-3 py-2 font-medium">Długi</th>
                    <th className="px-3 py-2 font-medium">Różnica</th>
                  </tr>
                </thead>
                <tbody>
                  {desk.drift.map((row) => (
                    <tr key={`${row.a}-${row.b}`} className="border-t border-line">
                      <td className="px-3 py-2 font-mono">
                        {row.a}–{row.b}
                      </td>
                      <td className="px-3 py-2 font-mono">{fmtRho(row.short)}</td>
                      <td className="px-3 py-2 font-mono">{fmtRho(row.long)}</td>
                      <td className={`px-3 py-2 font-mono ${Math.abs(row.gap) >= 0.35 ? "text-signal" : "text-muted"}`}>
                        {fmtRho(row.gap)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
