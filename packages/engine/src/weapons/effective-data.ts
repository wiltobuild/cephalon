/**
 * Override-aware catalog accessors for calculations and lib code.
 * Applies the caller-provided override set.
 */
import { allMods } from "@/data/mods";
import { allWeapons, weaponsMap as baseWeaponsMap } from "@/data/weapons";
import { allWarframes } from "@/data/warframes";
import { allCompanions } from "@/data/companions";
import { allArcanes } from "@/data/arcanes";
import { allArchonShards } from "@/data/archon-shards";
import { archwings, necramechs } from "@/data/archwing";
import { customWeapons } from "@/data/custom-items";
import {
  applyModOverrides,
  applyWeaponOverrides,
  applyWarframeOverrides,
  applyCompanionOverrides,
  applyArcaneOverrides,
  applyArchonShardOverrides,
  applyArchwingOverrides,
  applyNecramechOverrides,
  type OverrideSet,
} from "@/overrides/data-overrides";
import { enrichWeapon } from "@/weapons/weapon-enrich";
import type { Mod, Weapon, Warframe, Companion, ArchonShard } from "@/types";
import type { Archwing, Necramech } from "@/data/archwing";

const mergedWeaponsBase: Weapon[] = (() => {
  const ids = new Set(allWeapons.map((w) => w.id));
  const extras = customWeapons.filter((w) => !ids.has(w.id));
  return [...allWeapons, ...extras].map(enrichWeapon);
})();

function toMap<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}

export function getEffectiveWeapons(overrides: OverrideSet): Weapon[] {
  return overrides.some((o) => o.targetType === "weapon")
    ? applyWeaponOverrides(mergedWeaponsBase, overrides)
    : mergedWeaponsBase;
}

export function getEffectiveWeaponsMap(overrides: OverrideSet): Map<string, Weapon> {
  return toMap(getEffectiveWeapons(overrides));
}

export function getEffectiveMods(overrides: OverrideSet): Mod[] {
  return overrides.some((o) => o.targetType === "mod")
    ? applyModOverrides(allMods, overrides)
    : allMods;
}

export function getEffectiveModsMap(overrides: OverrideSet): Map<string, Mod> {
  return toMap(getEffectiveMods(overrides));
}

export function getEffectiveWarframes(overrides: OverrideSet): Warframe[] {
  return overrides.some((o) => o.targetType === "warframe")
    ? applyWarframeOverrides(allWarframes, overrides)
    : allWarframes;
}

export function getEffectiveWarframesMap(overrides: OverrideSet): Map<string, Warframe> {
  return toMap(getEffectiveWarframes(overrides));
}

export function getEffectiveCompanions(overrides: OverrideSet): Companion[] {
  return overrides.some((o) => o.targetType === "companion")
    ? applyCompanionOverrides(allCompanions, overrides)
    : allCompanions;
}

export function getEffectiveCompanionsMap(overrides: OverrideSet): Map<string, Companion> {
  return toMap(getEffectiveCompanions(overrides));
}

export function getEffectiveArcanes(overrides: OverrideSet): Mod[] {
  return overrides.some((o) => o.targetType === "arcane")
    ? applyArcaneOverrides(allArcanes, overrides)
    : allArcanes;
}

export function getEffectiveArchonShards(overrides: OverrideSet): ArchonShard[] {
  return overrides.some((o) => o.targetType === "archon_shard")
    ? applyArchonShardOverrides(allArchonShards, overrides)
    : allArchonShards;
}

export function getEffectiveArchwings(overrides: OverrideSet): Archwing[] {
  return overrides.some((o) => o.targetType === "archwing")
    ? applyArchwingOverrides(archwings, overrides)
    : archwings;
}

export function getEffectiveNecramechs(overrides: OverrideSet): Necramech[] {
  return overrides.some((o) => o.targetType === "necramech")
    ? applyNecramechOverrides(necramechs, overrides)
    : necramechs;
}

/** Resolve mod or arcane catalog entry with overrides applied. */
export function resolveEffectiveModOrArcane(id: string, overrides: OverrideSet): Mod | null {
  return getEffectiveModsMap(overrides).get(id) ?? getEffectiveArcanes(overrides).find((a) => a.id === id) ?? null;
}

/** @deprecated Prefer getEffectiveWeaponsMap — static map without overrides. */
export { baseWeaponsMap as staticWeaponsMap };
