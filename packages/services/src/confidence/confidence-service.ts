/**
 * **Verified** = *a deterministic formula, covered by the ported upstream-engine
 * regression suite, whose formula source is cited to the Warframe wiki.* It does
 * **NOT** mean "independently confirmed against current live-game values". A wiki
 * transcription error, or post-patch drift, would still present as Verified. The
 * badge asserts *internal determinism + test coverage + a cited source*, not
 * ground truth. (Fallback label if UX review finds "Verified" too strong:
 * "Regression-locked" / "Deterministic".)
 */
export type ConfidenceTag = "verified" | "approximation" | "not-modeled" | "pending-verification";

export type MechanicKey =
  | "totalDamage" | "burstDps" | "sustainedDps" | "criticalChance" | "criticalMultiplier"
  | "statusChance" | "fireRate" | "multishot" | "reloadTime" | "magazine" | "modCapacityCost"
  // Warframe survivability outputs (deterministic; covered by warframe-math-audit /
  // warframe-mod-audit in the ported suite).
  | "warframeEhp" | "warframeHealth" | "warframeShield" | "warframeArmor" | "warframeEnergy"
  | "factionMultiplier" | "enemyScaling" | "armorStrip" | "viral" | "dot"
  | "elementalCombos" | "incarnon" | "setBonuses" | "exalted" | "railjack"
  | "ttk" | "discreteTtk" | "meleeDps" | "radialDamage" | "abilityDamage" | "rivenGrade"
  // S1 — not first-class engine inputs (proc-derived / binary / a 0–5 count). Present so a
  // view-model that surfaces an assumption row can tag it honestly; never "verified".
  | "armorStripPercent" | "headshotPercent" | "statusUptime" | "archonOffensiveShards"
  | "magneticShieldGateOverguardEximus" | "enemyRoster" | "steelPath";

export const CONFIDENCE_MAP: Record<MechanicKey, ConfidenceTag> = {
  totalDamage: "verified", burstDps: "verified", sustainedDps: "verified", criticalChance: "verified",
  criticalMultiplier: "verified", statusChance: "verified", fireRate: "verified", multishot: "verified",
  reloadTime: "verified", magazine: "verified", modCapacityCost: "verified",
  warframeEhp: "verified", warframeHealth: "verified", warframeShield: "verified",
  warframeArmor: "verified", warframeEnergy: "verified",
  factionMultiplier: "verified", enemyScaling: "verified",
  armorStrip: "verified", viral: "verified", dot: "verified", elementalCombos: "verified", incarnon: "verified",
  setBonuses: "verified", exalted: "verified", railjack: "verified", ttk: "approximation",
  discreteTtk: "approximation", meleeDps: "approximation", radialDamage: "approximation",
  abilityDamage: "approximation", rivenGrade: "approximation", armorStripPercent: "not-modeled",
  headshotPercent: "not-modeled", statusUptime: "not-modeled", archonOffensiveShards: "not-modeled",
  magneticShieldGateOverguardEximus: "not-modeled", enemyRoster: "not-modeled", steelPath: "approximation",
};

export class ConfidenceService {
  tag(key: MechanicKey): ConfidenceTag { return CONFIDENCE_MAP[key]; }
  assertTagged(keys: readonly string[]): asserts keys is readonly MechanicKey[] {
    for (const key of keys) if (!(key in CONFIDENCE_MAP)) throw new Error(`Un-tagged mechanic: ${key}`);
  }
}
