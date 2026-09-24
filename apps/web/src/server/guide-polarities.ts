import { catalog } from "./services";
import { planCapacity, type CapacitySlot } from "@/ui/capacity-plan";
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
function rawGuidePolarities(g: Guide): Record<number, string | null> {
  return Object.fromEntries([
    ...g.mods.map((m, i) => [i, slotPolarity(m.polarity)]),
    [8, slotPolarity(g.exilus)],
    ...g.auras.map((a, i) => [9 + i, slotPolarity(a)]),
  ]);
}

const plans = new Map<string, ReturnType<typeof planCapacity> | null>();
function plannedLayout(g: Guide) {
  const key = JSON.stringify([g.frame, g.mods, g.exilus, g.auras]);
  if (plans.has(key)) return plans.get(key)!;
  const frame = (
    native as Record<
      string,
      { polarities: (string | null)[]; aura: string | string[] | null }
    >
  )[g.frame.replace("Sirius and Orion", "Sirius & Orion")];
  if (!frame) return null;
  const raw = rawGuidePolarities(g);
  const slots: CapacitySlot[] = [];
  const mods = [...catalog.getModMap().values()];
  const entries = [
    ...Array.from({ length: 8 }, (_, i) => g.mods[i]),
    { name: g.exilus.split(",")[0], rank: -1 },
    ...g.auras.map((a) => ({ name: a.split(",")[0], rank: -1 })),
  ];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const mod = mods.find((m) => m.name === entry?.name);
    if (entry?.name && !mod) {
      plans.set(key, null);
      return null;
    }
    slots.push({
      index: i,
      drain: mod?.drain ?? 0,
      rank: mod ? (entry.rank < 0 ? mod.maxRank : entry.rank) : 0,
      polarity: mod?.polarity ?? "universal",
      target: raw[i] ?? null,
      group: i < 8 ? "regular" : i === 8 ? "exilus" : `aura${i - 9}`,
    });
  }
  const regular = frame.polarities.map((p) => p ?? "");
  while (regular.length < 8) regular.push("");
  const auras = Array.isArray(frame.aura) ? frame.aura : [frame.aura ?? ""];
  const stock = {
    regular,
    exilus: [""],
    ...Object.fromEntries(auras.map((a, i) => [`aura${i}`, [a]])),
  };
  let plan = planCapacity(slots, stock);
  if (!plan.fits)
    plan = planCapacity(
      slots.map((s) => ({ ...s, target: s.target === "" ? null : s.target })),
      stock,
    );
  plans.set(key, plan);
  return plan;
}
export function guidePolarities(g: Guide): Record<number, string | null> {
  return plannedLayout(g)?.polarities ?? rawGuidePolarities(g);
}
export function auditedForma(g: Guide): { count: number | null; note: string } {
  const plan = plannedLayout(g);
  return plan
    ? {
        count: plan.forma,
        note: plan.fits
          ? "Minimum polarity changes from native slots; unspecified polarities filled to fit capacity."
          : "Specified layout exceeds capacity; adjust a mod or polarity.",
      }
    : {
        count: null,
        note: "Native slots or a guide mod are unavailable; using guide estimate.",
      };
}
