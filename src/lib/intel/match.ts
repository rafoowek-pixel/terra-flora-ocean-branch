import { places, type Place } from "@/lib/intel/places";

const HEAT =
  /\b(war|airstrike|missile|shelling|killed|troops|invasion|sanction|blockade|drone|warship|ceasefire|nuclear|mobilis|explosion|bombing|artillery|navy|tanker|pipeline|opec|embargo|strike|wojna|ostrzał|sankcj|rakiet|atak|inwazj|blokad|rop[ay]|tankow)\b/i;

type Compiled = { place: Place; regs: RegExp[] };

function escapeReg(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const compiled: Compiled[] = places.map((place) => ({
  place,
  regs: place.aliases.map(
    (alias) =>
      new RegExp(`(?:^|[^\\p{L}\\p{N}])${escapeReg(alias)}(?:$|[^\\p{L}\\p{N}])`, "iu"),
  ),
}));

export function locate(text: string): Place | null {
  let best: { place: Place; score: number } | null = null;
  for (const entry of compiled) {
    for (const reg of entry.regs) {
      const match = reg.exec(text);
      if (!match) continue;
      const aliasLength = match[0].trim().length;
      const score = entry.place.rank * 1000 + aliasLength;
      if (!best || score > best.score) best = { place: entry.place, score };
    }
  }
  return best?.place ?? null;
}

export function isHeat(text: string): boolean {
  return HEAT.test(text);
}
