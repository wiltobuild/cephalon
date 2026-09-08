import {
  MOD_EXCLUSION_GROUPS,
  modCapacityAtRank,
  modSlotCapacityCost,
} from "@cephalon/engine";
import type { ModSlot } from "@cephalon/engine";
import type { CatalogService } from "../catalog/catalog-service";
import type { WeaponBuildInput } from "./build-service";

export const POLARITIES = [
  "madurai",
  "vazarin",
  "naramon",
  "zenurik",
  "umbra",
  "universal",
  "penjaga",
];
export function weaponModExclusions(catalog: CatalogService): string[][] {
  // Inherited groups omit several ordinary/Primed pairs. Derive these by exact
  // displayed base name, keeping the explicit non-name-based groups as well.
  const groups = new Map<string, string[]>();
  for (const mod of catalog.getModMap().values()) {
    const family = mod.name.toLowerCase().replace(/^primed /, "");
    groups.set(family, [...(groups.get(family) ?? []), mod.id]);
  }
  return [
    ...MOD_EXCLUSION_GROUPS,
    ...[...groups.values()].filter((ids) => ids.length > 1),
  ];
}
export function capacityCost(
  catalog: CatalogService,
  slots: ModSlot[],
  polarities: Record<number, string> = {},
) {
  return slots.reduce((sum, slot) => {
    const mod = catalog.getModMap().get(slot.modId);
    if (!mod) throw new Error(`Unknown mod: ${slot.modId}`);
    return (
      sum +
      modSlotCapacityCost(
        modCapacityAtRank(mod.drain, slot.rank),
        polarities[slot.slotIndex],
        mod.polarity,
      )
    );
  }, 0);
}
export function validateWeaponBuild(
  catalog: CatalogService,
  input: WeaponBuildInput,
) {
  if (!input || typeof input.weaponId !== "string")
    throw new Error("Choose a weapon.");
  const weapon = catalog.getWeapon(input.weaponId);
  if (!weapon) throw new Error(`Unknown weapon: ${input.weaponId}`);
  const slotCount =
    weapon.modSlots +
    (catalog.getWeaponDetail(input.weaponId)?.exilusSlot ? 1 : 0);
  if (!Array.isArray(input.modSlots) || input.modSlots.length > slotCount)
    throw new Error("Too many mod slots.");
  const eligible = new Set(
    catalog.compatibleMods(input.weaponId).map((mod) => mod.id),
  );
  const exilus = new Set(
    catalog.compatibleMods(input.weaponId, "exilus").map((mod) => mod.id),
  );
  const positions = new Set<number>(),
    ids = new Set<string>(),
    names = new Set<string>();
  for (const slot of input.modSlots) {
    if (!slot || typeof slot.modId !== "string")
      throw new Error("Invalid mod slot.");
    const mod = catalog.getModMap().get(slot.modId);
    if (
      !mod ||
      !(slot.slotIndex === weapon.modSlots ? exilus : eligible).has(slot.modId)
    )
      throw new Error(`Mod is not compatible: ${mod?.name ?? slot.modId}`);
    if (
      !Number.isInteger(slot.slotIndex) ||
      slot.slotIndex < 0 ||
      slot.slotIndex >= slotCount ||
      positions.has(slot.slotIndex)
    )
      throw new Error("Each mod needs a unique valid slot.");
    if (
      !Number.isInteger(slot.rank) ||
      slot.rank < 0 ||
      slot.rank > mod.maxRank
    )
      throw new Error(`Invalid rank for ${mod.name}.`);
    if (ids.has(mod.id) || names.has(mod.name.toLowerCase()))
      throw new Error(`${mod.name} can only be equipped once.`);
    positions.add(slot.slotIndex);
    ids.add(mod.id);
    names.add(mod.name.toLowerCase());
  }
  for (const group of weaponModExclusions(catalog)) {
    if (group.filter((id) => ids.has(id)).length > 1)
      throw new Error("These mod variants cannot be equipped together.");
  }
  const capacity = input.capacity ?? 60;
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 80)
    throw new Error("Capacity must be between 1 and 80.");
  if (
    input.slotPolarities &&
    (typeof input.slotPolarities !== "object" ||
      Array.isArray(input.slotPolarities))
  )
    throw new Error("Invalid slot polarities.");
  for (const [index, polarity] of Object.entries(input.slotPolarities ?? {})) {
    if (
      !Number.isInteger(Number(index)) ||
      Number(index) < 0 ||
      Number(index) >= slotCount ||
      !POLARITIES.includes(polarity)
    )
      throw new Error("Invalid slot polarity.");
  }
  if (capacityCost(catalog, input.modSlots, input.slotPolarities) > capacity)
    throw new Error(
      "Build exceeds capacity. Lower a rank or configure matching polarities.",
    );
  const s = input.scenario;
  if (
    !s ||
    typeof s.headshots !== "boolean" ||
    (s.steelPath !== undefined && typeof s.steelPath !== "boolean")
  )
    throw new Error("Invalid scenario.");
  for (const [key, max] of [
    ["statusTypesOnTarget", 5],
    ["killStacks", 5],
    ["arcaneStacks", 1000],
  ] as const) {
    if (!Number.isInteger(s[key]) || s[key] < 0 || s[key] > max)
      throw new Error(`Invalid ${key}.`);
  }
  if (
    !Number.isInteger(s.level ?? 100) ||
    (s.level ?? 100) < 1 ||
    (s.level ?? 100) > 9999
  )
    throw new Error("Level must be between 1 and 9999.");
  if (
    s.enemyArchetypeId &&
    !catalog.getEnemyTypes().some((e) => e.id === s.enemyArchetypeId)
  )
    throw new Error("Unknown enemy.");
  if (
    s.faction &&
    ![
      "Grineer",
      "Corpus",
      "Infested",
      "Corrupted",
      "Stalker",
      "The Murmur",
      "Scaldra",
      "Techrot",
    ].some((f) => f.toLowerCase() === s.faction?.toLowerCase())
  )
    throw new Error("Unknown faction.");
  if (
    input.arcaneIds &&
    (!Array.isArray(input.arcaneIds) ||
      input.arcaneIds.length >
        (catalog.getWeaponDetail(input.weaponId)?.arcaneSlots ?? 0) ||
      new Set(input.arcaneIds).size !== input.arcaneIds.length ||
      input.arcaneIds.some(
        (id) =>
          !catalog.compatibleArcanes(input.weaponId).some((a) => a.id === id),
      ))
  )
    throw new Error("Invalid arcane selection.");
  for (const changes of [input.rivenStatChanges, input.incarnonStatChanges]) {
    if (
      changes &&
      (typeof changes !== "object" ||
        Array.isArray(changes) ||
        Object.values(changes).some(
          (v) =>
            typeof v !== "number" || !Number.isFinite(v) || Math.abs(v) > 100,
        ))
    )
      throw new Error("Invalid stat changes.");
  }
}
