import { Weapon, Mod, Companion, Warframe, ArchonShard } from "@/types";
import { Archwing, Necramech } from "@/data/archwing";
import { deepMergeOverrideFields } from "@/overrides/override-merge";

export { deepMergeOverrideFields } from "@/overrides/override-merge";

export const OVERRIDE_CATEGORIES = [
  "weapon", "mod", "warframe", "companion", "arcane", "arcane_effect", "archon_shard", "archwing", "necramech",
] as const;
export type OverrideCategory = (typeof OVERRIDE_CATEGORIES)[number];

export interface DataOverride {
  id: string;
  targetType: OverrideCategory;
  targetId: string;
  action: "modify" | "add" | "remove";
  fields: Record<string, unknown>;
  note: string;
  timestamp: number;
  /** Last staff member who saved this override (shared list). */
  updatedBy?: string;
}
export type OverrideSet = readonly DataOverride[];

export function getOverrideForTarget(
  overrides: OverrideSet,
  targetType: OverrideCategory,
  targetId: string,
): DataOverride | undefined {
  return overrides.find((o) => o.targetType === targetType && o.targetId === targetId);
}

/** Merge server + local lists; server wins on duplicate targets. */
export function mergeOverrideLists(base: DataOverride[], extra: DataOverride[]): DataOverride[] {
  const map = new Map<string, DataOverride>();
  for (const o of extra) {
    map.set(`${o.targetType}:${o.targetId}`, o);
  }
  for (const o of base) {
    map.set(`${o.targetType}:${o.targetId}`, o);
  }
  return Array.from(map.values());
}

export function applyModify<T extends object>(item: T, fields: Record<string, unknown>): T {
  return deepMergeOverrideFields(item, fields);
}

export function applyOverridesToList<T extends { id: string }>(
  items: T[],
  overrides: OverrideSet,
): T[] {
  if (overrides.length === 0) return items;

  let result = [...items];

  for (const ovr of overrides) {
    if (ovr.action === "remove") {
      result = result.filter((item) => item.id !== ovr.targetId);
    } else if (ovr.action === "modify") {
      const idx = result.findIndex((item) => item.id === ovr.targetId);
      if (idx >= 0) {
        result[idx] = applyModify(result[idx], ovr.fields);
      }
    } else if (ovr.action === "add") {
      if (!result.find((item) => item.id === ovr.targetId)) {
        result.push({ id: ovr.targetId, ...ovr.fields } as T);
      }
    }
  }

  return result;
}

export function applyWeaponOverrides(weapons: Weapon[], overrides: OverrideSet): Weapon[] {
  return applyOverridesToList(weapons, overrides.filter((o) => o.targetType === "weapon"));
}

export function applyModOverrides(mods: Mod[], overrides: OverrideSet): Mod[] {
  return applyOverridesToList(mods, overrides.filter((o) => o.targetType === "mod"));
}

export function applyCompanionOverrides(companions: Companion[], overrides: OverrideSet): Companion[] {
  return applyOverridesToList(companions, overrides.filter((o) => o.targetType === "companion"));
}

export function applyWarframeOverrides(warframes: Warframe[], overrides: OverrideSet): Warframe[] {
  return applyOverridesToList(warframes, overrides.filter((o) => o.targetType === "warframe"));
}

export function applyArcaneOverrides(arcanes: Mod[], overrides: OverrideSet): Mod[] {
  return applyOverridesToList(arcanes, overrides.filter((o) => o.targetType === "arcane"));
}

export function applyArchonShardOverrides(shards: ArchonShard[], overrides: OverrideSet): ArchonShard[] {
  return applyOverridesToList(shards, overrides.filter((o) => o.targetType === "archon_shard"));
}

export function applyArchwingOverrides(archwings: Archwing[], overrides: OverrideSet): Archwing[] {
  return applyOverridesToList(archwings, overrides.filter((o) => o.targetType === "archwing"));
}

export function applyNecramechOverrides(mechs: Necramech[], overrides: OverrideSet): Necramech[] {
  return applyOverridesToList(mechs, overrides.filter((o) => o.targetType === "necramech"));
}
