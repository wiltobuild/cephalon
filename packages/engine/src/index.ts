// Calculation surface
export {
  calculateWeaponBuild,
  calculateWeaponBuildWithArcanes,
  calculateWarframeBuild,
  applyWarframeShardsAndArcanes,
} from "./calc/calculator";
export { calculateTTK, simulateDiscreteTTK, ENEMY_TYPES } from "./calc/ttk";
export { runDamageSim } from "./calc/damage-sim";
export type { DamageSimInputs, DamageSimResult } from "./calc/damage-sim";
export { calculateCompanionBuild } from "./calc/companion-calculator";
export {
  calculateArchwingBuild,
  calculateNecramechBuild,
} from "./calc/archwing-calculator";
export { calculateRailjackBuild } from "./calc/railjack-calculator";
// Orchestration entry points take an explicit catalogs parameter.
export {
  calcLoadoutStats,
  calcSavedWeaponBuildStats,
} from "./orchestration/loadout-stats";
export {
  resolvePublicBuildWarframePreview,
  resolvePublicBuildWeaponPreview,
} from "./orchestration/build-stats";
export {
  evaluateRiven,
  getRivenGrade,
  getStatsWithDisposition,
} from "./calc/riven-calculator";
export {
  resolveIncarnonActiveWeapon,
  applyIncarnonFormToWeapon,
} from "./calc/incarnon-active-weapon";
export {
  buildAbilityTTKEntries,
  calculateAbilityTTK,
  abilityToPseudoWeaponStats,
} from "./calc/ability-ttk";
export { computeDpsContributions } from "./calc/dps-contributions";
export { modCapacityAtRank, modSlotCapacityCost } from "./calc/mod-capacity";
export { MOD_EXCLUSION_GROUPS } from "./data/mod-exclusions";
export {
  mergeIncarnonStatChanges,
  mergeRivenStatChanges,
} from "./calc/weapon-stat-merges";
export { DEFAULT_SIM_PARAMS } from "./types";
export type {
  Ability,
  ArchonShard,
  ArchwingCalculatedStats,
  CalculatedStats,
  CompanionCalculatedStats,
  EquippedArchonShard,
  EquippedMod,
  Loadout,
  Mod,
  ModularBuildData,
  ModSlot,
  RailjackCalculatedStats,
  SetBonusLinkage,
  SimulationParams,
  Warframe,
  WarframeCalculatedStats,
  Weapon,
  WeaponCalculationOptions,
  WeaponExternalBuff,
} from "./types";
export type { EnemyType, TTKResult } from "./calc/ttk";

// Catalog-assembly surface (R1): for the host CatalogService only.
export { allWeapons } from "./data/weapons";
export { allMods } from "./data/mods";
export { allWarframes } from "./data/warframes";
export { allArcanes } from "./data/arcanes";
export { allCompanions } from "./data/companions";
export { allArchonShards } from "./data/archon-shards";
export { archwings, necramechs } from "./data/archwing";
export { enrichWeapon } from "./weapons/weapon-enrich";
export { modEligibleForWeaponSlot } from "./mods/mod-weapon-eligibility";
export type {
  WeaponModSlotType,
  WeaponModProfile,
} from "./mods/mod-weapon-eligibility";
export { getWeaponModProfile } from "./mods/weapon-mod-tags";
export { modCompatibleWithWeaponProfile } from "./mods/weapon-mod-tags";
export { rivenDispositions } from "./data/riven-dispositions";
export {
  getEffectiveArchonShards,
  getEffectiveArcanes,
  getEffectiveArchwings,
  getEffectiveCompanions,
  getEffectiveMods,
  getEffectiveModsMap,
  getEffectiveNecramechs,
  getEffectiveWarframes,
  getEffectiveWarframesMap,
  getEffectiveWeapons,
  getEffectiveWeaponsMap,
  resolveEffectiveModOrArcane,
} from "./weapons/effective-data";
export {
  applyArcaneOverrides,
  applyArchonShardOverrides,
  applyArchwingOverrides,
  applyCompanionOverrides,
  applyModOverrides,
  applyNecramechOverrides,
  applyWarframeOverrides,
  applyWeaponOverrides,
  applyOverridesToList,
  applyModify,
  getOverrideForTarget,
  mergeOverrideLists,
  OVERRIDE_CATEGORIES,
} from "./overrides/data-overrides";
export { deepMergeOverrideFields } from "./overrides/override-merge";
export type { DataOverride, OverrideSet } from "./overrides/data-overrides";
// Arcane-effect (magnitude) overrides. NOTE: internal calc callers invoke
// getArcaneEffectDef() with the default empty set — a host wiring real
// overrides must feed a merged effects map here. See decisions.md 2026-08-30
// ("arcane-effect overrides not threaded through calculator.ts in Phase 1a").
export {
  applyArcaneEffectOverrides,
  getArcaneEffectDef,
} from "./overrides/arcane-effect-overrides";
export { isWarframeExilusMod } from "./mods/mod-slot-categories";
