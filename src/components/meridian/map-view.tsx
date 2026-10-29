import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { project } from "@/lib/intel/geo";
import { lanes } from "@/lib/intel/places";

export type MovingMark = {
  id: string;
  lat: number;
  lon: number;
  course: number;
  speedKt: number;
  fixMs: number;
  title: string;
  hot?: boolean;
  kind: "aircraft" | "tanker" | "cargo";
};

export type StaticMark = {
  id: string;
  lat: number;
  lon: number;
  title: string;
  kind: "base" | "node" | "conflict" | "quake" | "hazard";
  radius: number;
  heat?: boolean;
};

export type MapHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  world: () => void;
  focus: (lat: number, lon: number) => void;
};

type Props = {
  planes: MovingMark[];
  ships: MovingMark[];
  dots: StaticMark[];
  showLanes: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

type Mover = {
  lat: number;
  lon: number;
  course: number;
  speedKt: number;
  fixMs: number;
  marker: L.Marker | L.CircleMarker;
  hot?: boolean;
  kind: MovingMark["kind"];
};

const COLOR: Record<StaticMark["kind"] | MovingMark["kind"], string> = {
  aircraft: "var(--color-air)",
  tanker: "var(--color-sea)",
  cargo: "var(--color-sea)",
  base: "var(--color-base)",
  node: "var(--color-signal)",
  conflict: "var(--color-conflict)",
  quake: "var(--color-quake)",
  hazard: "var(--color-quake)",
};

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "\u0026amp;";
      case "<":
        return "\u0026lt;";
      case ">":
        return "\u0026gt;";
      case '"':
        return "\u0026quot;";
      default:
        return "\u0026#39;";
    }
  });
}

function planeIcon(track: number, hot: boolean) {
  return L.divIcon({
    className: hot ? "ac-icon is-hot" : "ac-icon",
    html: `<span style="display:block;transform:rotate(${Math.round(track)}deg)"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 1.2 11.2 14 8 11.4 4.8 14Z" fill="currentColor"/></svg></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

export const MapView = forwardRef<MapHandle, Props>(function MapView(props, ref) {
  const host = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const movers = useRef<Map<string, Mover>>(new Map());
  const statics = useRef<Map<string, { lat: number; lon: number; marker: L.CircleMarker }>>(new Map());
  const groups = useRef<{
    lanes: L.LayerGroup;
    planes: L.LayerGroup;
    ships: L.LayerGroup;
    dots: L.LayerGroup;
  } | null>(null);
  const ringRef = useRef<L.CircleMarker | null>(null);
  const onSelect = useRef(props.onSelect);
  const selectedRef = useRef(props.selectedId);
  const [ready, setReady] = useState(false);

  onSelect.current = props.onSelect;
  selectedRef.current = props.selectedId;

  useImperativeHandle(ref, () => ({
    zoomIn: () => mapRef.current?.zoomIn(),
    zoomOut: () => mapRef.current?.zoomOut(),
    world: () => mapRef.current?.setView([28, 28], 3),
    focus: (lat, lon) => {
      const map = mapRef.current;
      if (!map) return;
      map.flyTo([lat, lon], Math.max(map.getZoom(), 5.2), { duration: 0.7 });
    },
  }));

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let dead = false;
    const map = L.map(el, {
      zoomControl: false,
      minZoom: 2,
      maxZoom: 16,
      worldCopyJump: true,
      attributionControl: true,
    }).setView([28, 28], 3);
    const tileOpts = {
      maxZoom: 16,
      attribution: "&copy; Esri, HERE, Garmin, OpenStreetMap",
    };
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      tileOpts,
    ).addTo(map);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 16, attribution: "" },
    ).addTo(map);
    map.attributionControl.setPrefix("");
    groups.current = {
      lanes: L.layerGroup().addTo(map),
      planes: L.layerGroup().addTo(map),
      ships: L.layerGroup().addTo(map),
      dots: L.layerGroup().addTo(map),
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

  useEffect(() => {
    const map = mapRef.current;
    const buckets = groups.current;
    if (!map || !buckets || !ready) return;

    movers.current.clear();
    statics.current.clear();
    buckets.lanes.clearLayers();
    buckets.planes.clearLayers();
    buckets.ships.clearLayers();
    buckets.dots.clearLayers();

    const bind = (marker: L.Layer, id: string, title: string) => {
      marker.bindTooltip(esc(title), {
        className: "md-tip",
        direction: "top",
        offset: [0, -6],
      });
      marker.on("click", (event) => {
        L.DomEvent.stopPropagation(event);
        onSelect.current(id);
      });
    };

    if (props.showLanes) {
      for (const lane of lanes) {
        L.polyline(lane.path, {
          color: "var(--color-muted)",
          weight: 1,
          opacity: 0.45,
          dashArray: "3 7",
          interactive: false,
        }).addTo(buckets.lanes);
      }
    }

    for (const plane of props.planes) {
      const marker = L.marker([plane.lat, plane.lon], {
        icon: planeIcon(plane.course, Boolean(plane.hot)),
        keyboard: false,
        zIndexOffset: plane.hot ? 400 : 200,
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
        kind: "aircraft",
      });
    }

    for (const ship of props.ships) {
      const marker = L.circleMarker([ship.lat, ship.lon], {
        radius: ship.kind === "tanker" ? 4.5 : 3.2,
        color: COLOR[ship.kind],
        weight: ship.kind === "tanker" ? 1.6 : 1,
        fillColor: COLOR[ship.kind],
        fillOpacity: ship.kind === "tanker" ? 0.9 : 0.35,
        opacity: ship.kind === "tanker" ? 1 : 0.8,
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
        kind: ship.kind,
      });
    }

    for (const dot of props.dots) {
      const marker = L.circleMarker([dot.lat, dot.lon], {
        radius: dot.radius,
        color: COLOR[dot.kind],
        weight: dot.kind === "node" ? 1.5 : 1.25,
        fillColor: COLOR[dot.kind],
        fillOpacity: dot.kind === "node" ? 0.2 : dot.heat ? 0.85 : 0.55,
        dashArray: dot.kind === "hazard" ? "2 2" : undefined,
      });
      bind(marker, dot.id, dot.title);
      marker.addTo(buckets.dots);
      statics.current.set(dot.id, { lat: dot.lat, lon: dot.lon, marker });
    }
  }, [props.planes, props.ships, props.dots, props.showLanes, ready]);

  useEffect(() => {
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
      const at = moving
        ? project(moving.lat, moving.lon, moving.course, moving.speedKt, moving.fixMs, now)
        : fixed
          ? { lat: fixed.lat, lon: fixed.lon }
          : null;
      if (!at) {
        ringRef.current?.remove();
        ringRef.current = null;
        return;
      }
      if (!ringRef.current) {
        ringRef.current = L.circleMarker([at.lat, at.lon], {
          radius: 13,
          color: "var(--color-signal)",
          weight: 1,
          fillOpacity: 0,
          interactive: false,
        }).addTo(map);
      } else {
        ringRef.current.setLatLng([at.lat, at.lon]);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [ready]);

  return <div ref={host} className="meridian-map h-full w-full" />;
});
