import type { EquippedArchonShard, Mod, ModSlot, ModularBuildData } from "@/types";

export interface BuildResolverCatalogs {
  modsMap: Map<string, Mod>;
  arcanes: Mod[];
}

/** Arcanes are not in mods.ts; resolve from caller-provided catalogs. */
export function resolveArcaneById(id: string, catalogs: BuildResolverCatalogs): Mod | null {
  return catalogs.modsMap.get(id) ?? catalogs.arcanes.find((arcane) => arcane.id === id) ?? null;
}

/** Restore equipped arcane row from saved `arcaneIds`. */
export function resolveSavedArcaneSlots(
  arcaneIds: (string | null)[] | undefined,
  catalogs: BuildResolverCatalogs,
  slotCount = 2,
): (Mod | null)[] {
  const ids = arcaneIds ?? [];
  const out: (Mod | null)[] = [];
  for (let i = 0; i < slotCount; i++) {
    const id = ids[i];
    out.push(id ? resolveArcaneById(id, catalogs) : null);
  }
  return out;
}

export interface SavedBuild {
  id: string;
  name: string;
  description?: string;
  isPublic?: boolean;
  type: "weapon" | "warframe" | "companion" | "modular" | "archwing" | "railjack" | "loadout";
  tags?: string[];
  createdAt: number;
  updatedAt: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface WeaponBuildData {
  weaponId: string;
  mods: ModSlot[];
  stanceModId?: string;
  arcaneIds: (string | null)[];
  hasOrokinCatalyst: boolean;
  isMR30: boolean;
  slotPolarities: Record<number, string>;
  progenitorElement?: string;
  progenitorBonusPercent?: number;
  incarnonEvolutions?: Record<number, number>;
}

export interface WarframeBuildData {
  warframeId: string;
  mods: ModSlot[];
  shards: (EquippedArchonShard | null)[];
  arcaneIds: (string | null)[];
  arcaneRanks?: number[];
  hasOrokinReactor: boolean;
  isMR30: boolean;
  slotPolarities: Record<number, string>;
  helminthSlot?: number | null;
  helminthAbilityId?: string | null;
  exaltedMods?: ModSlot[];
  exaltedSlotPolarities?: Record<number, string>;
  exaltedArcaneIds?: (string | null)[];
  exaltedMeleeMods?: ModSlot[];
  exaltedMeleeSlotPolarities?: Record<number, string>;
  exaltedMeleeArcaneIds?: (string | null)[];
  dualFormBuilds?: Record<string, {
    mods: ModSlot[];
    slotPolarities?: Record<number, string>;
    arcaneIds?: (string | null)[];
    arcaneRanks?: number[];
  }>;
}

export interface CompanionBuildData {
  companionId: string;
  mods: ModSlot[];
  weaponId?: string;
  weaponMods: ModSlot[];
  weaponSlotPolarities?: Record<number, string>;
  arcaneIds: (string | null)[];
  hasReactor: boolean;
  hasCatalyst?: boolean;
  isMR30: boolean;
  slotPolarities: Record<number, string>;
}

export type { ModularBuildData };

export interface RailjackBuildData {
  reactorId?: string;
  shieldId?: string;
  engineId?: string;
  platingId?: string;
  turretIds?: (string | undefined)[];
  turretId?: string;
  ordnanceId?: string;
  integratedMods: ModSlot[];
  battleMods: ModSlot[];
  tacticalMods: ModSlot[];
  integratedPolarities: Record<number, string>;
  battlePolarities: Record<number, string>;
  tacticalPolarities: Record<number, string>;
  eliteCrewId?: string;
  reactorTraitId?: string;
  shieldTraitId?: string;
  engineTraitId?: string;
  intrinsics?: { tactical?: number; piloting?: number; gunnery?: number; engineering?: number; command?: number };
  simulation?: {
    crimsonFugueStacks?: number;
    cruisingSpeedActive?: boolean;
    protectiveShotsActive?: boolean;
    shieldsDepleted?: boolean;
    activeBattleAbilityId?: string | null;
    activeTacticalAbilityId?: string | null;
  };
}

export interface ArchwingBuildData {
  mode: string;
  frameId?: string;
  frameMods: ModSlot[];
  weaponId?: string;
  weaponMods: ModSlot[];
  hasReactor: boolean;
  hasCatalyst: boolean;
  isMR30: boolean;
  framePolarities: Record<number, string>;
  weaponPolarities: Record<number, string>;
}
