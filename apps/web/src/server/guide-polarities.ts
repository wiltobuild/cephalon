import type { Guide } from "./guide-types";
import native from "./native-warframe-polarities.json";
const names = [
  "madurai",
  "vazarin",
  "naramon",
  "zenurik",
  "umbra",
  "unairu",
  "penjaga",
  "universal",
];
export function slotPolarity(text: string): string | null {
  const lower = text.toLowerCase();
  if (/unpolari[sz]ed|no polarity/.test(lower)) return "";
  return names.find((n) => new RegExp(`\\b${n}\\b`).test(lower)) ?? null;
}
export function guidePolarities(g: Guide): Record<number, string | null> {
  return Object.fromEntries([
    ...g.mods.map((m, i) => [i, slotPolarity(m.polarity)]),
    [8, slotPolarity(g.exilus)],
    ...g.auras.map((a, i) => [9 + i, slotPolarity(a)]),
  ]);
}
export function auditedForma(g: Guide): { count: number | null; note: string } {
  const frame = (
    native as Record<
      string,
      { polarities: (string | null)[]; aura: string | string[] | null }
    >
  )[g.frame.replace("Sirius and Orion", "Sirius & Orion")];
  const target = guidePolarities(g);
  if (
    !frame ||
    g.mods.length !== 8 ||
    Object.values(target).some((p) => p === null)
  )
    return {
      count: null,
      note: "Guide estimate; the source does not specify every slot polarity.",
    };
  const stock = [...frame.polarities.filter(Boolean)];
  while (stock.length < 8) stock.push("");
  let count = 0;
  for (let i = 0; i < 8; i++) {
    const match = stock.indexOf(target[i] ?? "");
    if (match >= 0) stock.splice(match, 1);
    else count++;
  }
  if (target[8]) count++;
  const auras = Array.isArray(frame.aura) ? frame.aura : [frame.aura ?? ""];
  for (let i = 0; i < g.auras.length; i++)
    if (target[9 + i] !== (auras[i] ?? "")) count++;
  return {
    count,
    note: "Minimum polarity changes from the stock Warframe to the guide’s slot layout, allowing regular-slot rearrangement. Includes aura and Exilus changes; excludes an Exilus adapter and Reactor.",
  };
}
