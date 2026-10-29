import type { NewsEvent } from "@/lib/intel/types";
import { theaters, type Theater } from "@/lib/intel/places";

export function kmBetween(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const r = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const la1 = (aLat * Math.PI) / 180;
  const la2 = (bLat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * r * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function project(
  lat: number,
  lon: number,
  course: number,
  speedKt: number,
  fixMs: number,
  now: number,
): { lat: number; lon: number } {
  const dt = Math.min(120, Math.max(0, (now - fixMs) / 1000));
  const courseOk = course >= 0 && course < 360;
  if (!courseOk || speedKt < 1 || dt < 1) return { lat, lon };
  const rad = (course * Math.PI) / 180;
  const nm = speedKt * (dt / 3600);
  const dLat = (nm / 60) * Math.cos(rad);
  const cos = Math.cos((lat * Math.PI) / 180);
  const dLon = cos > 0.15 ? ((nm / 60) * Math.sin(rad)) / cos : 0;
  return { lat: lat + dLat, lon: lon + dLon };
}

export type LiveTheater = Theater & {
  heat: boolean;
  when?: string;
  headline?: string;
  href?: string;
  source?: string;
};

export function enrichTheaters(events: NewsEvent[]): {
  theaters: LiveTheater[];
  loose: NewsEvent[];
} {
  const used = new Set<string>();
  const ranked = [...events].sort((a, b) => {
    if (a.heat !== b.heat) return a.heat ? -1 : 1;
    return b.when.localeCompare(a.when);
  });

  const next = theaters.map((theater) => {
    const hit = ranked.find(
      (event) => !used.has(event.id) && kmBetween(theater.lat, theater.lon, event.lat, event.lon) <= 220,
    );
    if (!hit) return { ...theater, heat: false };
    used.add(hit.id);
    const top = hit.headlines[0];
    return {
      ...theater,
      heat: hit.heat,
      when: hit.when,
      headline: top?.title,
      href: top?.href,
      source: top?.source,
    };
  });

  return { theaters: next, loose: events.filter((event) => !used.has(event.id)) };
}
