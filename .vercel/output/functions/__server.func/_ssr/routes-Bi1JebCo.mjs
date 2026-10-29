import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Minus, i as Plus, n as RefreshCw, o as ExternalLink, r as Radio, s as Crosshair } from "../_libs/lucide-react.mjs";
import { a as bases, c as theaters, i as inHotZone, l as __exportAll, n as EMERGENCY_SQUAWK, r as STRATEGIC_TYPES, s as nodes } from "./router-DZhBV_dC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bi1JebCo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function kmBetween(aLat, aLon, bLat, bLon) {
	const r = 6371;
	const dLat = (bLat - aLat) * Math.PI / 180;
	const dLon = (bLon - aLon) * Math.PI / 180;
	const la1 = aLat * Math.PI / 180;
	const la2 = bLat * Math.PI / 180;
	const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
	return 2 * r * Math.asin(Math.min(1, Math.sqrt(h)));
}
function project(lat, lon, course, speedKt, fixMs, now) {
	const dt = Math.min(120, Math.max(0, (now - fixMs) / 1e3));
	if (!(course >= 0 && course < 360) || speedKt < 1 || dt < 1) return {
		lat,
		lon
	};
	const rad = course * Math.PI / 180;
	const nm = speedKt * (dt / 3600);
	const dLat = nm / 60 * Math.cos(rad);
	const cos = Math.cos(lat * Math.PI / 180);
	const dLon = cos > .15 ? nm / 60 * Math.sin(rad) / cos : 0;
	return {
		lat: lat + dLat,
		lon: lon + dLon
	};
}
function enrichTheaters(events) {
	const used = /* @__PURE__ */ new Set();
	const ranked = [...events].sort((a, b) => {
		if (a.heat !== b.heat) return a.heat ? -1 : 1;
		return b.when.localeCompare(a.when);
	});
	return {
		theaters: theaters.map((theater) => {
			const hit = ranked.find((event) => !used.has(event.id) && kmBetween(theater.lat, theater.lon, event.lat, event.lon) <= 220);
			if (!hit) return {
				...theater,
				heat: false
			};
			used.add(hit.id);
			const top = hit.headlines[0];
			return {
				...theater,
				heat: hit.heat,
				when: hit.when,
				headline: top?.title,
				href: top?.href,
				source: top?.source
			};
		}),
		loose: events.filter((event) => !used.has(event.id))
	};
}
var DEFAULT_LAYERS = {
	conflict: true,
	aircraft: true,
	tanker: true,
	cargo: false,
	base: true,
	node: true,
	quake: true,
	hazard: true
};
var LAYER_ORDER = [
	{
		id: "conflict",
		label: "Konflikty",
		hint: "teatry i depesze"
	},
	{
		id: "aircraft",
		label: "Samoloty",
		hint: "wojskowe ADS-B"
	},
	{
		id: "tanker",
		label: "Tankowce",
		hint: "Ormuz i Bałtyk"
	},
	{
		id: "cargo",
		label: "Fracht",
		hint: "masowce, kontenery"
	},
	{
		id: "base",
		label: "Bazy",
		hint: "stałe instalacje"
	},
	{
		id: "node",
		label: "Węzły",
		hint: "cieśniny, porty, energia"
	},
	{
		id: "quake",
		label: "Trzęsienia",
		hint: "USGS od 4.5"
	},
	{
		id: "hazard",
		label: "Zagrożenia",
		hint: "cyklony, pożary, powodzie"
	}
];
function isFeed(value) {
	if (!value || typeof value !== "object") return false;
	const row = value;
	return Array.isArray(row.aircraft) && Array.isArray(row.vessels) && typeof row.index === "number";
}
function tone(index) {
	if (index >= 70) return "text-conflict";
	if (index >= 40) return "text-signal";
	return "text-sea";
}
function fmtWhen(iso, now) {
	const stamp = Date.parse(iso);
	if (!Number.isFinite(stamp)) return "—";
	const seconds = Math.max(0, Math.round((now - stamp) / 1e3));
	if (seconds < 60) return `${seconds} s temu`;
	const minutes = Math.round(seconds / 60);
	if (minutes < 60) return `${minutes} min temu`;
	const hours = Math.round(minutes / 60);
	if (hours < 48) return `${hours} godz. temu`;
	return `${Math.round(hours / 24)} dni temu`;
}
function fmtSpeed(knots) {
	if (!Number.isFinite(knots) || knots < .6) return "stoi albo dryfuje";
	return `${Math.round(knots)} kn · ${Math.round(knots * 1.852)} km/h`;
}
function fmtAlt(feet) {
	if (feet == null) return "na ziemi albo brak wysokości";
	if (feet < 150) return "przy ziemi";
	return `${Math.round(feet).toLocaleString("pl-PL")} ft · ${Math.round(feet * .3048).toLocaleString("pl-PL")} m`;
}
function squawkLabel(code) {
	if (code === "7500") return "7500 · porwanie";
	if (code === "7600") return "7600 · utrata łączności";
	if (code === "7700") return "7700 · alarm ogólny";
	return code || "—";
}
function courseLabel(course) {
	if (!(course >= 0 && course < 360)) return "—";
	return `${Math.round(course)}°`;
}
function Swatch({ id }) {
	if (id === "conflict") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 shrink-0 bg-conflict" });
	if (id === "aircraft") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 shrink-0 bg-air" });
	if (id === "tanker") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 shrink-0 bg-sea" });
	if (id === "cargo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 shrink-0 border border-sea" });
	if (id === "base") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 shrink-0 bg-base" });
	if (id === "node") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 shrink-0 bg-signal" });
	if (id === "quake") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 shrink-0 bg-quake" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 shrink-0 border border-dashed border-quake" });
}
function UtcClock() {
	const [label, setLabel] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => {
			const now = /* @__PURE__ */ new Date();
			const text = new Intl.DateTimeFormat("pl-PL", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hourCycle: "h23",
				timeZone: "UTC"
			}).format(now);
			setLabel(`${text} UTC`);
		};
		tick();
		const timer = window.setInterval(tick, 1e3);
		return () => window.clearInterval(timer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: label ?? "—:—:— UTC" });
}
function Age({ iso }) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(timer);
	}, []);
	if (!iso) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "czekam na strumień" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["odświeżono ", fmtWhen(iso, now)] });
}
function Meter({ value }) {
	const lit = Math.round(value / 100 * 24);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-0.5",
		"aria-hidden": "true",
		children: Array.from({ length: 24 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: index < lit ? "h-1.5 flex-1 bg-signal" : "h-1.5 flex-1 bg-line" }, index))
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line bg-bg px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-lg text-fg",
			children: value.toLocaleString("pl-PL")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted",
			children: label
		})]
	});
}
function Dashboard() {
	const mapApi = (0, import_react.useRef)(null);
	const pulling = (0, import_react.useRef)(false);
	const [layers, setLayers] = (0, import_react.useState)(DEFAULT_LAYERS);
	const [layersReady, setLayersReady] = (0, import_react.useState)(false);
	const [feed, setFeed] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [query, setQuery] = (0, import_react.useState)("");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => setNow(Date.now()), 3e4);
		return () => window.clearInterval(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem("meridian-layers");
			if (raw) {
				const parsed = JSON.parse(raw);
				setLayers({
					...DEFAULT_LAYERS,
					...parsed
				});
			}
		} catch {}
		setLayersReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!layersReady) return;
		localStorage.setItem("meridian-layers", JSON.stringify(layers));
	}, [layers, layersReady]);
	const pull = (0, import_react.useCallback)(async (fresh = false) => {
		if (pulling.current) return;
		pulling.current = true;
		try {
			const response = await fetch(fresh ? "/api/feed?fresh=1" : "/api/feed");
			const payload = await response.json();
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
	(0, import_react.useEffect)(() => {
		pull(false);
		const timer = window.setInterval(() => void pull(false), 2e4);
		const onVisible = () => {
			if (document.visibilityState === "visible") pull(false);
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => {
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", onVisible);
		};
	}, [pull]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") setSelectedId(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
		if (selectedId) setSheetOpen(true);
	}, [selectedId]);
	const enriched = (0, import_react.useMemo)(() => enrichTheaters(feed?.events ?? []), [feed]);
	const counts = (0, import_react.useMemo)(() => {
		const vessels = feed?.vessels ?? [];
		return {
			conflict: enriched.theaters.length + enriched.loose.length,
			aircraft: feed?.aircraft.length ?? 0,
			tanker: vessels.filter((vessel) => vessel.kind === "tanker").length,
			cargo: vessels.filter((vessel) => vessel.kind === "cargo").length,
			base: bases.length,
			node: nodes.length,
			quake: feed?.quakes.length ?? 0,
			hazard: feed?.hazards.length ?? 0
		};
	}, [feed, enriched]);
	const planes = (0, import_react.useMemo)(() => {
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
			kind: "aircraft"
		}));
	}, [feed, layers.aircraft]);
	const ships = (0, import_react.useMemo)(() => {
		if (!feed) return [];
		return feed.vessels.filter((vessel) => vessel.kind === "tanker" ? layers.tanker : layers.cargo).map((vessel) => ({
			id: vessel.id,
			lat: vessel.lat,
			lon: vessel.lon,
			course: vessel.course,
			speedKt: vessel.speedKt,
			fixMs: vessel.fixMs,
			title: `${vessel.name} · ${vessel.region}`,
			kind: vessel.kind
		}));
	}, [
		feed,
		layers.tanker,
		layers.cargo
	]);
	const dots = (0, import_react.useMemo)(() => {
		const marks = [];
		if (layers.base) for (const site of bases) marks.push({
			id: `base:${site.id}`,
			lat: site.lat,
			lon: site.lon,
			title: site.title,
			kind: "base",
			radius: 4.5
		});
		if (layers.node) for (const site of nodes) marks.push({
			id: `node:${site.id}`,
			lat: site.lat,
			lon: site.lon,
			title: site.title,
			kind: "node",
			radius: 5
		});
		if (layers.conflict) {
			for (const theater of enriched.theaters) marks.push({
				id: `theater:${theater.id}`,
				lat: theater.lat,
				lon: theater.lon,
				title: theater.headline ? `${theater.title}: ${theater.headline}` : theater.title,
				kind: "conflict",
				radius: theater.heat ? 8 : 5.5,
				heat: theater.heat || Boolean(theater.headline)
			});
			for (const event of enriched.loose) marks.push({
				id: `event:${event.id}`,
				lat: event.lat,
				lon: event.lon,
				title: `${event.place}: ${event.headlines[0]?.title ?? ""}`,
				kind: "conflict",
				radius: event.heat ? 6.5 : 4.5,
				heat: event.heat
			});
		}
		if (layers.quake && feed) for (const quake of feed.quakes) marks.push({
			id: `quake:${quake.id}`,
			lat: quake.lat,
			lon: quake.lon,
			title: `M ${quake.mag.toFixed(1)} ${quake.title}`,
			kind: "quake",
			radius: 3.5 + Math.min(6, quake.mag)
		});
		if (layers.hazard && feed) for (const hazard of feed.hazards) marks.push({
			id: `hazard:${hazard.id}`,
			lat: hazard.lat,
			lon: hazard.lon,
			title: `${hazard.kind}: ${hazard.title}`,
			kind: "hazard",
			radius: 5.5
		});
		return marks;
	}, [
		layers,
		enriched,
		feed
	]);
	const detail = (0, import_react.useMemo)(() => selectedId ? resolveDetail(selectedId, feed, enriched.theaters, enriched.loose) : null, [
		selectedId,
		feed,
		enriched
	]);
	const searchHits = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (q.length < 2) return [];
		const hits = [];
		const push = (id, title, meta, lat, lon) => {
			if (hits.length >= 24) return;
			if (`${title} ${meta}`.toLowerCase().includes(q)) hits.push({
				id,
				title,
				meta,
				lat,
				lon
			});
		};
		for (const theater of enriched.theaters) push(`theater:${theater.id}`, theater.title, theater.headline ?? theater.blurb, theater.lat, theater.lon);
		for (const event of enriched.loose) push(`event:${event.id}`, event.place, event.headlines[0]?.title ?? "", event.lat, event.lon);
		for (const site of bases) push(`base:${site.id}`, site.title, site.tag, site.lat, site.lon);
		for (const site of nodes) push(`node:${site.id}`, site.title, site.tag, site.lat, site.lon);
		for (const plane of feed?.aircraft ?? []) push(plane.id, plane.callsign, plane.type, plane.lat, plane.lon);
		for (const vessel of feed?.vessels ?? []) push(vessel.id, vessel.name, `${vessel.kind === "tanker" ? "tankowiec" : "fracht"} ${vessel.region}`, vessel.lat, vessel.lon);
		for (const quake of feed?.quakes ?? []) push(`quake:${quake.id}`, `M ${quake.mag.toFixed(1)}`, quake.title, quake.lat, quake.lon);
		return hits;
	}, [
		query,
		feed,
		enriched
	]);
	const notable = (0, import_react.useMemo)(() => {
		return (feed?.aircraft ?? []).filter((plane) => STRATEGIC_TYPES.has(plane.type) || EMERGENCY_SQUAWK.has(plane.squawk) || (plane.altFt ?? 0) > 1e3 && inHotZone(plane.lat, plane.lon)).slice(0, 6);
	}, [feed]);
	const choose = (id, lat, lon) => {
		setSelectedId(id);
		mapApi.current?.focus(lat, lon);
	};
	const index = feed?.index ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-dvh flex-col overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line px-3 sm:px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 shrink-0 place-items-center border border-signal text-signal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-sm font-semibold tracking-widest",
								children: "MERIDIAN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-xs text-signal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "live-dot size-1.5 rounded-full bg-signal" }), "na żywo"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted",
							children: "Geopolityka, energia i ruch, który rusza cenami"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-3 sm:gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `font-mono text-xl leading-none ${feed ? tone(index) : "text-muted"}`,
								children: feed ? index : "—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted",
								children: "indeks napięcia"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden text-right font-mono text-xs text-muted sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtcClock, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Age, { iso: feed?.updatedAt }) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center border border-line bg-surface text-fg",
							onClick: () => void pull(true),
							"aria-label": "Odśwież teraz",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden w-72 shrink-0 flex-col border-r border-line bg-surface md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: selectedId ? "hidden min-h-0 flex-1 flex-col lg:flex" : "flex min-h-0 flex-1 flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Situation, {
								layers,
								counts,
								onToggle: (id) => setLayers((current) => ({
									...current,
									[id]: !current[id]
								})),
								query,
								onQuery: setQuery,
								searchHits,
								feed,
								enriched,
								notable,
								now,
								loading,
								error,
								onChoose: choose
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: selectedId ? "flex min-h-0 flex-1 flex-col lg:hidden" : "hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailView, {
								detail,
								onBack: () => setSelectedId(null)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveMap, {
								api: mapApi,
								planes,
								ships,
								dots,
								showLanes: layers.node,
								selectedId,
								onSelect: setSelectedId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-3 right-3 z-20 flex flex-col gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 place-items-center border border-line bg-surface text-fg",
										"aria-label": "Przybliż",
										onClick: () => mapApi.current?.zoomIn(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 place-items-center border border-line bg-surface text-fg",
										"aria-label": "Oddal",
										onClick: () => mapApi.current?.zoomOut(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 place-items-center border border-line bg-surface text-fg",
										"aria-label": "Widok świata",
										onClick: () => mapApi.current?.world(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4" })
									})
								]
							}),
							loading && !feed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute bottom-20 left-3 z-20 border border-line bg-surface px-3 py-2 text-sm text-muted md:bottom-4",
								children: "Łączę źródła na żywo…"
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden w-80 shrink-0 flex-col border-l border-line bg-surface lg:flex",
						children: detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailView, {
							detail,
							onBack: () => setSelectedId(null)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadlineColumn, {
							feed,
							now,
							onChoose: choose,
							theaters: enriched.theaters,
							events: enriched.loose
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 z-30 border-t border-line bg-surface md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex h-16 w-full items-center justify-between px-4 text-left",
					"aria-expanded": sheetOpen,
					onClick: () => setSheetOpen((open) => !open),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted",
						children: "Sytuacja"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-mono text-lg ${feed ? tone(index) : "text-muted"}`,
						children: feed ? `indeks ${index}` : "łączenie"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: sheetOpen ? "Zwiń" : "Rozwiń"
					})]
				}), sheetOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[70dvh] overflow-y-auto px-3 pb-4 scroll-thin",
					children: detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailView, {
						detail,
						onBack: () => setSelectedId(null)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Situation, {
						layers,
						counts,
						onToggle: (id) => setLayers((current) => ({
							...current,
							[id]: !current[id]
						})),
						query,
						onQuery: setQuery,
						searchHits,
						feed,
						enriched,
						notable,
						now,
						loading,
						error,
						onChoose: choose
					})
				}) : null]
			})
		]
	});
}
function LiveMap({ api, ...props }) {
	const [View, setView] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("./map-view-Dkfaf7AB.mjs").then((mod) => {
			if (live) setView(() => mod.MapView);
		});
		return () => {
			live = false;
		};
	}, []);
	if (!View) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-bg" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, {
		ref: api,
		...props
	});
}
function Situation({ layers, counts, onToggle, query, onQuery, searchHits, feed, enriched, notable, now, loading, error, onChoose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shrink-0 border-b border-line p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs tracking-widest text-muted",
				children: "WARSTWY"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted",
				children: feed ? `${feed.sources.filter((source) => source.ok).length}/6 źródeł` : "—"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1",
			children: LAYER_ORDER.map((layer) => {
				const on = layers[layer.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": on,
					onClick: () => onToggle(layer.id),
					className: `flex min-h-11 items-center gap-3 border px-2 text-left ${on ? "border-line bg-surface-2 text-fg" : "border-transparent text-muted"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, { id: layer.id }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm",
								children: layer.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted",
								children: layer.hint
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs",
							children: counts[layer.id]
						})
					]
				}, layer.id);
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-0 flex-1 overflow-y-auto p-3 scroll-thin",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mb-3 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Szukaj"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (event) => onQuery(event.target.value),
					placeholder: "Szukaj: Gaza, tankowiec, Ramstein…",
					className: "h-11 w-full border border-line bg-bg px-3 text-sm text-fg outline-none placeholder:text-muted focus:border-signal"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-conflict",
				children: error
			}) : null,
			query.trim().length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-col",
				children: [searchHits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "Nic nie pasuje."
				}) : null, searchHits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex min-h-11 w-full flex-col items-start justify-center border-b border-line py-2 text-left",
					onClick: () => onChoose(hit.id, hit.lat, hit.lon),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: hit.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: hit.meta
					})]
				}) }, hit.id))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					feed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-widest text-muted",
								children: "INDEKS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `font-mono text-sm ${tone(feed.index)}`,
								children: [feed.index, "/100"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: feed.index }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 flex flex-col gap-1",
							children: feed.parts.filter((part) => part.points > 0).map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-3 text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-fg",
									children: ["+", part.points]
								})]
							}, part.label))
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: loading ? "Pobieram samoloty, statki i depesze." : "Brak danych."
					}),
					feed?.hormuz ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-xs tracking-widest text-muted",
						children: "ORMUZ TERAZ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Tankowce w kadrze",
								value: feed.hormuz.tankers
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Fracht w kadrze",
								value: feed.hormuz.cargo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "W gardle cieśniny",
								value: feed.hormuz.inChoke
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "W ruchu, wszystkie",
								value: feed.hormuz.moving
							})
						]
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Teatry",
						children: enriched.theaters.map((theater) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							title: theater.title,
							meta: theater.headline ?? theater.blurb,
							stamp: theater.when ? fmtWhen(theater.when, now) : "bez świeżej depeszy",
							hot: theater.heat,
							onClick: () => onChoose(`theater:${theater.id}`, theater.lat, theater.lon)
						}, theater.id))
					}),
					enriched.loose.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Inne miejsca w depeszach",
						children: enriched.loose.slice(0, 8).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							title: event.place,
							meta: event.headlines[0]?.title ?? "",
							stamp: fmtWhen(event.when, now),
							hot: event.heat,
							onClick: () => onChoose(`event:${event.id}`, event.lat, event.lon)
						}, event.id))
					}) : null,
					notable.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Loty warte uwagi",
						children: notable.map((plane) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							title: plane.callsign,
							meta: `${plane.type} · ${inHotZone(plane.lat, plane.lon) ?? "poza strefą"} · ${fmtAlt(plane.altFt)}`,
							stamp: fmtSpeed(plane.speedKt),
							hot: EMERGENCY_SQUAWK.has(plane.squawk),
							onClick: () => onChoose(plane.id, plane.lat, plane.lon)
						}, plane.id))
					}) : null,
					(feed?.quakes.length ?? 0) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Najsilniejsze wstrząsy",
						children: feed?.quakes.slice(0, 4).map((quake) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							title: `M ${quake.mag.toFixed(1)}`,
							meta: quake.title,
							stamp: fmtWhen(quake.when, now),
							hot: quake.mag >= 6,
							onClick: () => onChoose(`quake:${quake.id}`, quake.lat, quake.lon)
						}, quake.id))
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sources, { feed })
		]
	})] });
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-1 text-xs tracking-widest text-muted",
		children: title.toUpperCase()
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col",
		children
	})] });
}
function Row({ title, meta, stamp, hot, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex min-h-11 w-full flex-col items-start justify-center border-b border-line py-2 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex w-full items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-sm ${hot ? "text-conflict" : "text-fg"}`,
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 font-mono text-xs text-muted",
				children: stamp
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "line-clamp-2 text-xs text-muted",
			children: meta
		})]
	});
}
function HeadlineColumn({ feed, now, onChoose, theaters, events }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs tracking-widest text-muted",
					children: "DEPESZE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-fg",
					children: "Kliknij tytuł z miejscem, żeby dolecieć. Reszta zostaje w taśmie."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "min-h-0 flex-1 overflow-y-auto scroll-thin",
				children: [(feed?.headlines ?? []).map((headline) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-b border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadlineRow, {
						headline,
						now,
						theaters,
						events,
						onChoose
					})
				}, headline.id)), !feed?.headlines.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-3 text-sm text-muted",
					children: "Brak tytułów."
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sources, { feed })
		]
	});
}
function HeadlineRow({ headline, now, theaters, events, onChoose }) {
	const theater = theaters.find((item) => item.headline === headline.title);
	const event = events.find((item) => item.headlines.some((itemHeadline) => itemHeadline.id === headline.id));
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm text-fg",
		children: headline.title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "mt-1 flex flex-wrap gap-x-2 text-xs text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: headline.source }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtWhen(headline.when, now) }),
			headline.place ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: headline.place }) : null
		]
	})] });
	if (theater) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "w-full px-4 py-3 text-left",
		onClick: () => onChoose(`theater:${theater.id}`, theater.lat, theater.lon),
		children: body
	});
	if (event) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "w-full px-4 py-3 text-left",
		onClick: () => onChoose(`event:${event.id}`, event.lat, event.lon),
		children: body
	});
	if (headline.href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: headline.href,
		target: "_blank",
		rel: "noreferrer",
		className: "block px-4 py-3",
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 py-3",
		children: body
	});
}
function DetailView({ detail, onBack }) {
	if (!detail) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-muted",
		children: "Wybierz punkt na mapie."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-line px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onBack,
						className: "mb-3 text-xs text-signal lg:hidden",
						children: "Wróć"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs tracking-widest text-muted",
						children: detail.kicker.toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-lg font-semibold leading-tight",
						children: detail.title
					}),
					detail.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: detail.note
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "min-h-0 flex-1 overflow-y-auto px-4 py-3 scroll-thin",
				children: [detail.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3 border-b border-line py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "shrink-0 text-muted",
						children: line.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-right text-fg",
						children: line.value
					})]
				}, line.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3 border-b border-line py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Pozycja"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "font-mono text-xs",
						children: [
							detail.lat.toFixed(2),
							", ",
							detail.lon.toFixed(2)
						]
					})]
				})]
			}),
			detail.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: detail.href,
				target: "_blank",
				rel: "noreferrer",
				className: "inline-flex h-11 items-center gap-2 border-t border-line px-4 text-sm text-signal",
				children: ["Otwórz źródło", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })]
			}) : null
		]
	});
}
function Sources({ feed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "border-t border-line px-4 py-3 text-xs text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "text-sm text-fg",
				children: "Źródła i co jest na żywo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col gap-1",
				children: (feed?.sources ?? []).map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: source.ok ? "text-sea" : "text-conflict",
						children: source.ok ? "OK" : "PRZERWA"
					}),
					" ",
					source.label,
					": ",
					source.detail
				] }, source.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "Samoloty: społeczna sieć ADS-B (adsb.lol). Tankowce w Ormuzie: hormuz.now, publiczny AIS (CC BY 4.0). Bałtyk i Zatoka Fińska: Fintraffic Digitraffic (CC BY 4.0). Depesze: BBC, Al Jazeera, Guardian, RMF — miejsce z tytułu, więc to przybliżenie, nie współrzędna redakcji. Wstrząsy: USGS. Zagrożenia: NASA EONET. Bazy i węzły są stałym atlasem, nie ruchem wojsk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "Między odświeżeniami samoloty i statki suną po kursie i prędkości, najwyżej dwie minuty. Indeks napięcia to heurystyka z tego strumienia, nie prognoza rynkowa. Globalny AIS handlowy jest płatny — żywa żegluga obejmuje Ormuz i Bałtyk, czyli dwa miejsca, które najbardziej ruszają ropą."
			})
		]
	});
}
function vesselLines(vessel) {
	return [
		{
			label: "Akwen",
			value: vessel.region === "Ormuz" ? "Cieśnina Ormuz i Zatoka" : "Bałtyk / Zatoka Fińska"
		},
		{
			label: "Klasa",
			value: vessel.kind === "tanker" ? "Tankowiec" : "Fracht"
		},
		{
			label: "Prędkość",
			value: fmtSpeed(vessel.speedKt)
		},
		{
			label: "Kurs",
			value: courseLabel(vessel.course)
		},
		{
			label: "Cel",
			value: vessel.dest || "—"
		},
		{
			label: "Opis",
			value: vessel.detail || "—"
		}
	];
}
function resolveDetail(id, feed, theaters, events) {
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
			lines: [{
				label: "Rola",
				value: site.tag
			}]
		};
	}
	if (id.startsWith("node:")) {
		const site = nodes.find((item) => item.id === id.slice(5));
		if (!site) return null;
		const extra = [{
			label: "Typ",
			value: site.tag
		}];
		if (site.id === "hormuz" && feed?.hormuz) extra.push({
			label: "Na żywo",
			value: `${feed.hormuz.tankers} tankowców, ${feed.hormuz.cargo} frachtu, ${feed.hormuz.inChoke} w gardle`
		});
		if (site.id === "primorsk" || site.id === "ustluga" || site.id === "danish") {
			const balticTankers = (feed?.vessels ?? []).filter((vessel) => vessel.region === "Bałtyk" && vessel.kind === "tanker").length;
			extra.push({
				label: "AIS Bałtyk",
				value: `${balticTankers} tankowców w kadrze fińskim`
			});
		}
		return {
			id,
			kicker: "Węzeł gospodarczy",
			title: site.title,
			note: site.detail,
			lat: site.lat,
			lon: site.lon,
			lines: extra
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
				{
					label: "Kontekst",
					value: theater.blurb
				},
				{
					label: "Depesza",
					value: theater.headline ?? "brak świeżego trafienia w promieniu 220 km"
				},
				{
					label: "Źródło",
					value: theater.source ?? "—"
				},
				{
					label: "Czas",
					value: theater.when ?? "—"
				}
			]
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
				value: `${headline.title} (${headline.source})`
			}))
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
				{
					label: "Magnituda",
					value: quake.mag.toFixed(1)
				},
				{
					label: "Głębokość",
					value: `${quake.depthKm} km`
				},
				{
					label: "Czas",
					value: quake.when.replace("T", " ").slice(0, 16) + " UTC"
				},
				{
					label: "Tsunami",
					value: quake.tsunami ? "alert w danych USGS" : "nie"
				}
			]
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
			lines: [{
				label: "Klasa",
				value: hazard.kind
			}, {
				label: "Od",
				value: hazard.when.slice(0, 10)
			}]
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
				{
					label: "Typ ICAO",
					value: plane.type
				},
				{
					label: "Rejestracja",
					value: plane.reg || "—"
				},
				{
					label: "Hex",
					value: plane.hex || "—"
				},
				{
					label: "Pułap",
					value: fmtAlt(plane.altFt)
				},
				{
					label: "Prędkość",
					value: fmtSpeed(plane.speedKt)
				},
				{
					label: "Kurs",
					value: courseLabel(plane.track)
				},
				{
					label: "Squawk",
					value: squawkLabel(plane.squawk)
				}
			]
		};
	}
	const vessel = feed?.vessels.find((item) => item.id === id);
	if (vessel) return {
		id,
		kicker: vessel.kind === "tanker" ? "Tankowiec" : "Frachtowiec",
		title: vessel.name,
		note: "Pozycja AIS z publicznego kadru. Nazwa i cel pochodzą z komunikatu statku — bywają puste albo mylące.",
		lat: vessel.lat,
		lon: vessel.lon,
		lines: vesselLines(vessel)
	};
	return null;
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => SplitComponent });
var SplitComponent = Dashboard;
//#endregion
export { project as n, routes_exports as t };
