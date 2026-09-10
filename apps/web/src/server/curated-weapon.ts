import { catalog } from "./services";
import type { Guide } from "./guide-types";
import type { BuildWeaponRequest } from "./contracts";
import { planCapacity, type CapacitySlot } from "@/ui/capacity-plan";
import { slotPolarity } from "./guide-polarities";
import native from "../../../../packages/services/src/catalog/weapon-metadata.json";
const clean = (s: string) =>
  s
    .replace(/ Incarnon$/i, "")
    .replace(/ \(.*?\)$/g, "")
    .trim()
    .toLowerCase();
const cache = new Map<string, ReturnType<typeof create>>();
function create(g: Guide) {
  const weapon = [...catalog.getWeaponsMap().values()].find(
    (w) => clean(w.name) === clean(g.frame),
  );
  if (!weapon) return null;
  const regular = catalog.compatibleMods(weapon.id),
    exilus = catalog.compatibleMods(weapon.id, "exilus");
  const warnings: string[] = [];
  const modSlots: BuildWeaponRequest["modSlots"] = [];
  const slots: CapacitySlot[] = [];
  const slotCount =
    weapon.modSlots + (catalog.getWeaponDetail(weapon.id)?.exilusSlot ? 1 : 0);
  for (let i = 0; i < slotCount; i++) {
    const entry =
      i === 8
        ? { name: g.exilus.split(",")[0], rank: -1, polarity: g.exilus }
        : g.mods[i];
    const mod = (i === 8 ? exilus : regular).find(
      (m) => m.name.toLowerCase() === entry?.name.toLowerCase(),
    );
    if (entry?.name && !mod)
      warnings.push(
        `${entry.name}: not available for this weapon in the calculation catalog.`,
      );
    const rank = mod
      ? entry.rank < 0
        ? mod.maxRank
        : Math.min(entry.rank, mod.maxRank)
      : 0;
    if (mod) modSlots.push({ modId: mod.id, rank, slotIndex: i });
    slots.push({
      index: i,
      drain: mod?.drain ?? 0,
      rank,
      polarity: mod?.polarity ?? "universal",
      target: entry ? slotPolarity(entry.polarity) : null,
      group: i === 8 ? "exilus" : "regular",
    });
  }
  const original =
    (native as Record<string, { polarities: string[] }>)[
      weapon.name
    ]?.polarities.filter((p) =>
      [
        "madurai",
        "naramon",
        "vazarin",
        "zenurik",
        "umbra",
        "unairu",
        "penjaga",
      ].includes(p),
    ) ?? [];
  const stock = {
    regular: [...original, ...Array(Math.max(0, 8 - original.length)).fill("")],
    exilus: [""],
  };
  let plan = planCapacity(slots, stock, 60);
  if (!plan.fits)
    plan = planCapacity(
      slots.map((s) => ({ ...s, target: s.target === "" ? null : s.target })),
      stock,
      60,
    );
  if (!plan.fits) {
    plan = planCapacity(
      slots.map((s) => ({ ...s, target: null })),
      stock,
      60,
    );
    if (plan.fits) warnings.push("Guide polarities adjusted to fit the equipped mods.");
  }
  if (/Incarnon/i.test(g.frame))
    warnings.push(
      "Performance uses the catalog base form; Incarnon evolutions are not configured.",
    );
  const arcanes = catalog.compatibleArcanes(weapon.id);
  const arcaneIds = g.arcanes
    .flatMap((name) => {
      const arcane = arcanes.find(
        (a) => a.name === name.replace(/\s*\(.*?\)/g, ""),
      );
      if (!arcane && name)
        warnings.push(`${name}: arcane unavailable for this weapon.`);
      return arcane ? [arcane.id] : [];
    })
    .slice(0, 1);
  const initialBuild: BuildWeaponRequest = {
    weaponId: weapon.id,
    modSlots,
    slotPolarities: plan.polarities,
    capacity: 60,
    arcaneIds,
    scenario: {
      headshots: false,
      statusTypesOnTarget: 0,
      killStacks: 5,
      arcaneStacks: arcanes.find((a) => a.id === arcaneIds[0])?.maxStacks ?? 0,
      level: 100,
      steelPath: false,
    },
  };
  if (!plan.fits)
    warnings.push(
      "Even fully matching polarities exceed capacity at the authored ranks. Lower a mod rank to fit this build.",
    );
  return { initialBuild, stock, forma: plan.forma, warnings };
}
export function curatedWeapon(g: Guide) {
  if (!cache.has(g.slug)) cache.set(g.slug, create(g));
  return cache.get(g.slug)!;
}
