import { allHelminthAbilities, type HelminthAbility } from "@/data/helminth";
import {
  resolveSavedArcaneSlots,
  type ArchwingBuildData,
  type CompanionBuildData,
  type WarframeBuildData,
  type WeaponBuildData,
  type BuildResolverCatalogs,
} from "@/support/build-resolvers";
import { buildAbilityTTKEntries, type AbilityTTKEntry } from "@/calc/ability-ttk";
import { resolveDefaultCompanionWeapon } from "@/weapons/companion-weapons";
import {
  calcSavedWeaponBuildStats,
  getIncarnonStatChangesForWeapon,
  scenarioSimParams,
} from "@/orchestration/loadout-stats";
import { weaponFromModularData } from "@/builds/modular-resolve";
import {
  applyWarframeShardsAndArcanes,
  calculateWarframeBuild,
  calculateWeaponBuild,
  calculateWeaponBuildWithArcanes,
} from "@/calc/calculator";
import { getMeleeExaltedWeapon, getPrimaryExaltedWeapon } from "@/weapons/exalted-weapons";
import { enrichWeapon } from "@/weapons/weapon-enrich";
import type {
  Ability,
  CalculatedStats,
  EquippedArchonShard,
  Mod,
  ModularBuildData,
  ModSlot,
  Warframe,
  WarframeCalculatedStats,
  Weapon,
} from "@/types";

export interface PublicBuildWeaponPreview {
  label: string;
  weapon: Weapon;
  stats: CalculatedStats;
  baseStats: CalculatedStats;
  isMelee: boolean;
}

export interface PublicBuildWarframePreview {
  warframe: Warframe;
  stats: WarframeCalculatedStats;
  modSlots: ModSlot[];
  shards: (EquippedArchonShard | null)[];
  arcanes: (Mod | null)[];
  arcaneRanks: number[];
  abilityEntries: AbilityTTKEntry[];
  exalted: PublicBuildWeaponPreview | null;
  /** Titania Diwata (melee) when Dex Pixia is primary. */
  exaltedMelee: PublicBuildWeaponPreview | null;
}

export interface BuildStatsCatalogs extends BuildResolverCatalogs {
  weapons: Weapon[];
  weaponsMap: Map<string, Weapon>;
  modsMap: Map<string, Mod>;
  warframesMap: Map<string, Warframe>;
  companionsMap: Map<string, import("@/types").Companion>;
}

function helminthToAbility(h: HelminthAbility): Ability {
  return {
    name: h.name,
    energyCost: h.energyCost,
    description: h.description,
    damage: h.damage,
    damageBuff: h.damageBuff,
    damageReduction: h.damageReduction,
    duration: h.duration,
    range: h.range,
    radius: h.radius,
    castTime: h.castTime,
    statusChance: h.statusChance,
    damageType: h.damageType,
    miscStats: h.miscStats,
  };
}

function resolveBuildAbilities(data: WarframeBuildData, catalogs: BuildStatsCatalogs): { ability: Ability; slot: number; helminth?: boolean }[] {
  const wf = catalogs.warframesMap.get(data.warframeId);
  if (!wf) return [];

  const rows = wf.abilities.map((ability, i) => ({
    ability,
    slot: i + 1,
    helminth: false as boolean | undefined,
  }));

  if (data.helminthAbilityId != null && data.helminthSlot != null) {
    const helminth = allHelminthAbilities.find((a) => a.id === data.helminthAbilityId);
    if (helminth && data.helminthSlot >= 0 && data.helminthSlot < rows.length) {
      rows[data.helminthSlot] = {
        ability: helminthToAbility(helminth),
        slot: data.helminthSlot + 1,
        helminth: true,
      };
    }
  }

  return rows;
}

function resolveExaltedWeaponPreview(
  weapon: Weapon,
  mods: ModSlot[],
  arcaneIds: (string | null)[] | undefined,
  abilityStrength: number,
  catalogs: BuildStatsCatalogs,
  labelPrefix = "Exalted",
): PublicBuildWeaponPreview | null {
  const exaltedArcanes = resolveSavedArcaneSlots(arcaneIds, catalogs, 2).filter((m): m is Mod => m != null);
  if (mods.length === 0 && exaltedArcanes.length === 0) return null;
  const modsMap = catalogs.modsMap;
  const base = enrichWeapon(weapon);
  const calcOptions = { abilityStrength };
  const sim = scenarioSimParams("midFight");
  const stats =
    exaltedArcanes.length > 0
      ? calculateWeaponBuildWithArcanes(base, mods, modsMap, exaltedArcanes, undefined, sim, calcOptions)
      : calculateWeaponBuild(base, mods, modsMap, undefined, sim, calcOptions);
  const isMelee = base.category === "melee" || base.triggerType === "Melee";
  return {
    label: `${labelPrefix} — ${base.name}`,
    weapon: base,
    stats,
    baseStats: calculateWeaponBuild(base, [], modsMap, undefined, sim, calcOptions),
    isMelee,
  };
}

function resolveExaltedPreview(
  data: WarframeBuildData,
  allWeapons: Weapon[],
  catalogs: BuildStatsCatalogs,
  abilityStrength = 1,
): PublicBuildWeaponPreview | null {
  const exaltedWeapon = getPrimaryExaltedWeapon(data.warframeId, allWeapons);
  if (!exaltedWeapon) return null;
  return resolveExaltedWeaponPreview(
    exaltedWeapon,
    data.exaltedMods ?? [],
    data.exaltedArcaneIds,
    abilityStrength,
    catalogs,
  );
}

function resolveExaltedMeleePreview(
  data: WarframeBuildData,
  allWeapons: Weapon[],
  catalogs: BuildStatsCatalogs,
  abilityStrength = 1,
): PublicBuildWeaponPreview | null {
  const meleeWeapon = getMeleeExaltedWeapon(data.warframeId, allWeapons);
  if (!meleeWeapon) return null;
  return resolveExaltedWeaponPreview(
    meleeWeapon,
    data.exaltedMeleeMods ?? [],
    data.exaltedMeleeArcaneIds,
    abilityStrength,
    catalogs,
    "Exalted Melee",
  );
}

export function resolvePublicBuildWarframePreview(
  data: unknown,
  catalogs: BuildStatsCatalogs,
): PublicBuildWarframePreview | null {
  if (!data || typeof data !== "object") return null;
  const d = data as WarframeBuildData;
  const wf = catalogs.warframesMap.get(d.warframeId);
  if (!wf) return null;

  const modSlots = d.mods ?? [];
  const modsMap = catalogs.modsMap;
  const baseStats = calculateWarframeBuild(wf, modSlots, modsMap);
  const stats = applyWarframeShardsAndArcanes(
    baseStats,
    d.shards,
    resolveSavedArcaneSlots(d.arcaneIds, catalogs, 2),
    d.arcaneRanks,
  );

  const abilityRows = resolveBuildAbilities(d, catalogs);
  const abilityEntries = buildAbilityTTKEntries(abilityRows, stats);

  return {
    warframe: wf,
    stats,
    modSlots,
    shards: d.shards ?? [],
    arcanes: resolveSavedArcaneSlots(d.arcaneIds, catalogs, 2),
    arcaneRanks: d.arcaneRanks ?? [],
    abilityEntries,
    exalted: resolveExaltedPreview(d, catalogs.weapons, catalogs, stats.abilityStrength),
    exaltedMelee: resolveExaltedMeleePreview(d, catalogs.weapons, catalogs, stats.abilityStrength),
  };
}

function baseWeaponStats(weapon: Weapon, catalogs: BuildStatsCatalogs, incarnonEvolutions?: Record<number, number>): CalculatedStats {
  const incarnonChanges = getIncarnonStatChangesForWeapon(weapon.id, incarnonEvolutions);
  return calculateWeaponBuild(
    enrichWeapon(weapon),
    [],
    catalogs.modsMap,
    incarnonChanges,
    scenarioSimParams("midFight"),
  );
}

/** Resolve weapon stats for a public/community build page (when the build has a weapon to analyze). */
export function resolvePublicBuildWeaponPreview(
  type: string,
  data: unknown,
  catalogs: BuildStatsCatalogs,
): PublicBuildWeaponPreview | null {
  if (!data || typeof data !== "object") return null;
  const modsMap = catalogs.modsMap;
  const weaponsMap = catalogs.weaponsMap;

  switch (type) {
    case "weapon": {
      const d = data as WeaponBuildData;
      const entry = calcSavedWeaponBuildStats({
        weaponId: d.weaponId,
        mods: d.mods ?? [],
        arcaneIds: d.arcaneIds,
        progenitorElement: d.progenitorElement,
        progenitorBonusPercent: d.progenitorBonusPercent,
        incarnonEvolutions: d.incarnonEvolutions,
      }, catalogs);
      if (!entry) return null;
      const weapon = weaponsMap.get(d.weaponId);
      if (!weapon) return null;
      return {
        label: entry.name,
        weapon: enrichWeapon(weapon),
        stats: entry.stats,
        baseStats: baseWeaponStats(weapon, catalogs, d.incarnonEvolutions),
        isMelee: entry.isMelee,
      };
    }
    case "warframe":
      return resolveExaltedPreview(data as WarframeBuildData, catalogs.weapons, catalogs);
    case "companion": {
      const d = data as CompanionBuildData;
      const weaponMods = d.weaponMods ?? [];
      if (weaponMods.length === 0) return null;
      const companion = catalogs.companionsMap.get(d.companionId);
      if (!companion) return null;
      const companionWeapon = resolveDefaultCompanionWeapon(companion, catalogs.weapons);
      if (!companionWeapon) return null;
      const entry = calcSavedWeaponBuildStats({
        weaponId: companionWeapon.id,
        mods: weaponMods,
        arcaneIds: d.arcaneIds,
      }, catalogs);
      if (!entry) return null;
      return {
        label: `Companion weapon — ${entry.name}`,
        weapon: enrichWeapon(companionWeapon),
        stats: entry.stats,
        baseStats: baseWeaponStats(companionWeapon, catalogs),
        isMelee: entry.isMelee,
      };
    }
    case "modular": {
      const d = data as ModularBuildData;
      const assembled = weaponFromModularData(d);
      if (!assembled) return null;
      const base = enrichWeapon(assembled);
      const simParams = scenarioSimParams("midFight");
      const modSlots = d.mods ?? [];
      const arcaneMods = resolveSavedArcaneSlots(d.arcaneIds, catalogs, 2).filter((m): m is Mod => m != null);
      const stats =
        arcaneMods.length > 0
          ? calculateWeaponBuildWithArcanes(base, modSlots, modsMap, arcaneMods, undefined, simParams)
          : calculateWeaponBuild(base, modSlots, modsMap, undefined, simParams);
      const isMelee = base.category === "melee" || base.triggerType === "Melee";
      return {
        label: base.name,
        weapon: base,
        stats,
        baseStats: calculateWeaponBuild(base, [], modsMap, undefined, simParams),
        isMelee,
      };
    }
    case "archwing": {
      const d = data as ArchwingBuildData;
      const weaponMods = d.weaponMods ?? [];
      if (!d.weaponId || weaponMods.length === 0) return null;
      const weapon = weaponsMap.get(d.weaponId);
      if (!weapon) return null;
      const entry = calcSavedWeaponBuildStats({
        weaponId: d.weaponId,
        mods: weaponMods,
      }, catalogs);
      if (!entry) return null;
      return {
        label: entry.name,
        weapon: enrichWeapon(weapon),
        stats: entry.stats,
        baseStats: baseWeaponStats(weapon, catalogs),
        isMelee: entry.isMelee,
      };
    }
    default:
      return null;
  }
}
