import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as lanes } from "./router-DZhBV_dC.mjs";
import { n as project } from "./routes-Bi1JebCo.mjs";
import { t as require_leaflet_src } from "../_libs/leaflet.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-view-Dkfaf7AB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_leaflet_src = /* @__PURE__ */ __toESM(require_leaflet_src());
var COLOR = {
	aircraft: "var(--color-air)",
	tanker: "var(--color-sea)",
	cargo: "var(--color-sea)",
	base: "var(--color-base)",
	node: "var(--color-signal)",
	conflict: "var(--color-conflict)",
	quake: "var(--color-quake)",
	hazard: "var(--color-quake)"
};
function esc(value) {
	return value.replace(/[&<>"']/g, (char) => {
		switch (char) {
			case "&": return "&amp;";
			case "<": return "&lt;";
			case ">": return "&gt;";
			case "\"": return "&quot;";
			default: return "&#39;";
		}
	});
}
function planeIcon(track, hot) {
	return import_leaflet_src.default.divIcon({
		className: hot ? "ac-icon is-hot" : "ac-icon",
		html: `<span style="display:block;transform:rotate(${Math.round(track)}deg)"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 1.2 11.2 14 8 11.4 4.8 14Z" fill="currentColor"/></svg></span>`,
		iconSize: [16, 16],
		iconAnchor: [8, 8]
	});
}
var MapView = (0, import_react.forwardRef)(function MapView(props, ref) {
	const host = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const movers = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const statics = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const groups = (0, import_react.useRef)(null);
	const ringRef = (0, import_react.useRef)(null);
	const onSelect = (0, import_react.useRef)(props.onSelect);
	const selectedRef = (0, import_react.useRef)(props.selectedId);
	const [ready, setReady] = (0, import_react.useState)(false);
	onSelect.current = props.onSelect;
	selectedRef.current = props.selectedId;
	(0, import_react.useImperativeHandle)(ref, () => ({
		zoomIn: () => mapRef.current?.zoomIn(),
		zoomOut: () => mapRef.current?.zoomOut(),
		world: () => mapRef.current?.setView([28, 28], 3),
		focus: (lat, lon) => {
			const map = mapRef.current;
			if (!map) return;
			map.flyTo([lat, lon], Math.max(map.getZoom(), 5.2), { duration: .7 });
		}
	}));
	(0, import_react.useEffect)(() => {
		const el = host.current;
		if (!el) return;
		let dead = false;
		const map = import_leaflet_src.default.map(el, {
			zoomControl: false,
			minZoom: 2,
			maxZoom: 16,
			worldCopyJump: true,
			attributionControl: true
		}).setView([28, 28], 3);
		import_leaflet_src.default.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
			maxZoom: 16,
			attribution: "&copy; Esri, HERE, Garmin, OpenStreetMap"
		}).addTo(map);
		import_leaflet_src.default.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
			maxZoom: 16,
			attribution: ""
		}).addTo(map);
		map.attributionControl.setPrefix("");
		groups.current = {
			lanes: import_leaflet_src.default.layerGroup().addTo(map),
			planes: import_leaflet_src.default.layerGroup().addTo(map),
			ships: import_leaflet_src.default.layerGroup().addTo(map),
			dots: import_leaflet_src.default.layerGroup().addTo(map)
		};
		map.on("click", () => onSelect.current(null));
		if (!dead) {
			mapRef.current = map;
			setReady(true);
		}
		return () => {
			dead = true;
			map.remove();
			mapRef.current = null;
			groups.current = null;
			setReady(false);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		const buckets = groups.current;
		if (!map || !buckets || !ready) return;
		movers.current.clear();
		statics.current.clear();
		buckets.lanes.clearLayers();
		buckets.planes.clearLayers();
		buckets.ships.clearLayers();
		buckets.dots.clearLayers();
		const bind = (marker, id, title) => {
			marker.bindTooltip(esc(title), {
				className: "md-tip",
				direction: "top",
				offset: [0, -6]
			});
			marker.on("click", (event) => {
				import_leaflet_src.default.DomEvent.stopPropagation(event);
				onSelect.current(id);
			});
		};
		if (props.showLanes) for (const lane of lanes) import_leaflet_src.default.polyline(lane.path, {
			color: "var(--color-muted)",
			weight: 1,
			opacity: .45,
			dashArray: "3 7",
			interactive: false
		}).addTo(buckets.lanes);
		for (const plane of props.planes) {
			const marker = import_leaflet_src.default.marker([plane.lat, plane.lon], {
				icon: planeIcon(plane.course, Boolean(plane.hot)),
				keyboard: false,
				zIndexOffset: plane.hot ? 400 : 200
			});
			bind(marker, plane.id, plane.title);
			marker.addTo(buckets.planes);
			movers.current.set(plane.id, {
				lat: plane.lat,
				lon: plane.lon,
				course: plane.course,
				speedKt: plane.speedKt,
				fixMs: plane.fixMs,
				marker,
				hot: plane.hot,
				kind: "aircraft"
			});
		}
		for (const ship of props.ships) {
			const marker = import_leaflet_src.default.circleMarker([ship.lat, ship.lon], {
				radius: ship.kind === "tanker" ? 4.5 : 3.2,
				color: COLOR[ship.kind],
				weight: ship.kind === "tanker" ? 1.6 : 1,
				fillColor: COLOR[ship.kind],
				fillOpacity: ship.kind === "tanker" ? .9 : .35,
				opacity: ship.kind === "tanker" ? 1 : .8
			});
			bind(marker, ship.id, ship.title);
			marker.addTo(buckets.ships);
			movers.current.set(ship.id, {
				lat: ship.lat,
				lon: ship.lon,
				course: ship.course,
				speedKt: ship.speedKt,
				fixMs: ship.fixMs,
				marker,
				kind: ship.kind
			});
		}
		for (const dot of props.dots) {
			const marker = import_leaflet_src.default.circleMarker([dot.lat, dot.lon], {
				radius: dot.radius,
				color: COLOR[dot.kind],
				weight: dot.kind === "node" ? 1.5 : 1.25,
				fillColor: COLOR[dot.kind],
				fillOpacity: dot.kind === "node" ? .2 : dot.heat ? .85 : .55,
				dashArray: dot.kind === "hazard" ? "2 2" : void 0
			});
			bind(marker, dot.id, dot.title);
			marker.addTo(buckets.dots);
			statics.current.set(dot.id, {
				lat: dot.lat,
				lon: dot.lon,
				marker
			});
		}
	}, [
		props.planes,
		props.ships,
		props.dots,
		props.showLanes,
		ready
	]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const timer = window.setInterval(() => {
			const now = Date.now();
			movers.current.forEach((entry) => {
				const next = project(entry.lat, entry.lon, entry.course, entry.speedKt, entry.fixMs, now);
				entry.marker.setLatLng([next.lat, next.lon]);
			});
			const selected = selectedRef.current;
			const map = mapRef.current;
			if (!map || !selected) {
				ringRef.current?.remove();
				ringRef.current = null;
				return;
			}
			const moving = movers.current.get(selected);
			const fixed = statics.current.get(selected);
			const at = moving ? project(moving.lat, moving.lon, moving.course, moving.speedKt, moving.fixMs, now) : fixed ? {
				lat: fixed.lat,
				lon: fixed.lon
			} : null;
			if (!at) {
				ringRef.current?.remove();
				ringRef.current = null;
				return;
			}
			if (!ringRef.current) ringRef.current = import_leaflet_src.default.circleMarker([at.lat, at.lon], {
				radius: 13,
				color: "var(--color-signal)",
				weight: 1,
				fillOpacity: 0,
				interactive: false
			}).addTo(map);
			else ringRef.current.setLatLng([at.lat, at.lon]);
		}, 1e3);
		return () => window.clearInterval(timer);
	}, [ready]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: host,
		className: "meridian-map h-full w-full"
	});
});
//#endregion
export { MapView };
