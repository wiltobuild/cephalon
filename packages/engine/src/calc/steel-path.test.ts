import { describe, expect, test } from "vitest";
import {
  calculateTTK,
  ENEMY_TYPES,
  enemyArmorDamageReduction,
  scaleArmor,
  scaleHealth,
  scaleShield,
  SP_HEALTH_MULT,
  SP_LEVEL_SHIFT,
  SP_SHIELD_MULT,
} from "@/calc/ttk";
import { runDamageSim, type DamageSimInputs } from "@/calc/damage-sim";
import { DEFAULT_SIM_PARAMS, type CalculatedStats } from "@/types";

function stats(totalDamage = 0): CalculatedStats {
  return {
    totalDamage,
    impact: totalDamage,
    puncture: 0,
    slash: 0,
    elements: [],
    rawElements: [],
    fireRate: 1,
    effectiveFireRate: 1,
    criticalChance: 0,
    criticalMultiplier: 1,
    statusChance: 0,
    statusChancePerShot: 0,
    magazine: 0,
    reloadTime: 0,
    multishot: 1,
    burstDps: 0,
    sustainedDps: 0,
    statusProcs: [],
    heavyAttackDamage: 0,
    heavyAttackWindUp: 0,
    comboCount: 0,
    comboDuration: 0,
    heavyAttackEfficiency: 0,
    comboMultiplier: 1,
    heavyAttackComboMultiplier: 1,
    conditionOverloadBonus: 0,
    bloodRushStacks: 0,
    weavingFrameBonus: 0,
    simParams: { ...DEFAULT_SIM_PARAMS },
    galvanizedMultishotOnKill: 0,
    galvanizedDamagePerStatus: 0,
    berserkerFuryBonus: 0,
    weepingWoundsBonus: 0,
    moddedBaseDamage: totalDamage,
  };
}

function enemy(id: string) {
  const value = ENEMY_TYPES.find((candidate) => candidate.id === id);
  if (!value) throw new Error(`Missing enemy ${id}`);
  return value;
}

function scaled(id: string, level: number, sp: boolean) {
  return calculateTTK(stats(), enemy(id), level, sp);
}

describe("Steel Path scaling", () => {
  test("composes the level shift and pool multipliers without armor multiplication", () => {
    for (const [id, level] of [["lancer", 60], ["heavy_gunner", 100], ["crewman", 100]] as const) {
      const target = enemy(id);
      const result = scaled(id, level, true);
      expect(result.scaledHealth).toBe(SP_HEALTH_MULT * scaleHealth(target.baseHealth, level + SP_LEVEL_SHIFT, target.faction));
      expect(result.scaledShield).toBe(SP_SHIELD_MULT * scaleShield(target.baseShield, level + SP_LEVEL_SHIFT));
      expect(result.scaledArmor).toBe(scaleArmor(target.baseArmor, level + SP_LEVEL_SHIFT));
    }
  });

  test("matches the eight sourced worked examples", () => {
    // docs/tasks/phase-1c-steel-path/sourcing.md §6; rounded values, ±0.5 tolerance.
    const examples = [
      ["lancer", 60, "scaledHealth", 33828.8],
      ["lancer", 60, "scaledArmor", 1209.5],
      ["lancer", 100, "scaledHealth", 38678.8],
      ["lancer", 100, "scaledArmor", 1229.5],
      ["heavy_gunner", 100, "scaledHealth", 270751.3],
      ["heavy_gunner", 100, "scaledArmor", 2700],
      ["crewman", 100, "scaledHealth", 23207.3],
      ["crewman", 100, "scaledShield", 24934.9],
    ] as const;
    for (const [id, level, field, expected] of examples) {
      expect(Math.abs(scaled(id, level, true)[field] - expected)).toBeLessThanOrEqual(0.5);
    }
  });

  test("sp false is a no-op", () => {
    for (const [target, level, build] of [[enemy("lancer"), 50, stats()], [enemy("crewman"), 100, stats(100)]] as const) {
      expect(calculateTTK(build, target, level)).toEqual(calculateTTK(build, target, level, false));
    }
  });

  test("SP Heavy Gunner at base level 100 remains pinned at the armor cap", () => {
    const result = scaled("heavy_gunner", 100, true);
    expect(result.scaledArmor).toBe(2700);
    expect(enemyArmorDamageReduction(result.scaledArmor)).toBe(0.9);
    expect(result.armorDR).toBe(90);
  });

  // Regression for Themis (elevated review): runDamageSim must derive baseArmor
  // from scaleArmor (pristine), NOT from discrete.scaledArmor (which is
  // end-of-fight armor after in-sim corrosive/heat strip on the main path).
  const dsInput = (over: Partial<DamageSimInputs> = {}): DamageSimInputs => ({
    dmgTypes: { corrosive: 200 },
    fireRate: 10, critChance: 0, critMulti: 1, multishot: 1, statusChance: 1,
    magazine: 30, reloadTime: 2, statusDamageBonus: 0, headshotDamageBonus: 0,
    factionBonuses: {}, applyHeadshots: false, ...over,
  });

  test("runDamageSim baseArmor is pristine level-scaled armor, not post-strip (sp=false no-op)", () => {
    const gunner = enemy("heavy_gunner");
    const sim = runDamageSim(dsInput(), gunner, 80)!;
    // scaleArmor(500, 80) is well over the 2700 soft-cap -> baseArmor pins at 2700,
    // NOT the ~540 post-corrosive-strip value.
    expect(sim.baseArmor).toBe(scaleArmor(gunner.baseArmor, 80));
    expect(sim.baseArmor).toBe(2700);
    expect(sim.corrosiveStrippedArmor).toBeLessThan(sim.baseArmor);
    // sp omitted === sp false
    expect(runDamageSim(dsInput(), gunner, 80)).toEqual(runDamageSim(dsInput(), gunner, 80, false));
  });

  test("runDamageSim applies Steel Path composition to its paper defenses", () => {
    const crewman = enemy("crewman");
    const off = runDamageSim(dsInput({ dmgTypes: { viral: 200 } }), crewman, 100, false)!;
    const on = runDamageSim(dsInput({ dmgTypes: { viral: 200 } }), crewman, 100, true)!;
    expect(on.hp).toBeCloseTo(SP_HEALTH_MULT * scaleHealth(crewman.baseHealth, 100 + SP_LEVEL_SHIFT, crewman.faction), 4);
    expect(on.shield).toBeCloseTo(SP_SHIELD_MULT * scaleShield(crewman.baseShield, 100 + SP_LEVEL_SHIFT), 4);
    expect(on.baseArmor).toBe(scaleArmor(crewman.baseArmor, 100 + SP_LEVEL_SHIFT)); // armor: shift only
    expect(on.hp).toBeGreaterThan(off.hp);
  });
});
