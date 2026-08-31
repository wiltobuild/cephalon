import { describe, expect, it } from "vitest";
import {
  calculateWeaponBuild,
  calculateWarframeBuild,
  calculateTTK,
  getEffectiveWeapons,
  getEffectiveModsMap,
  getEffectiveWarframesMap,
  ENEMY_TYPES,
} from "../index";

/**
 * Phase 1a AC 9: the public barrel is importable and runs a weapon calc,
 * a warframe calc, and calculateTTK end to end with no ambient catalog state
 * (overrides passed explicitly as []).
 */
describe("@cephalon/engine barrel smoke", () => {
  const weapons = getEffectiveWeapons([]);
  const modsMap = getEffectiveModsMap([]);
  const warframesMap = getEffectiveWarframesMap([]);

  it("runs a bare weapon build", () => {
    const weapon = weapons.find((w) => w.id === "braton")!;
    const stats = calculateWeaponBuild(weapon, [], modsMap);
    const dps = stats.sustainedDps ?? stats.burstDps;
    expect(typeof dps).toBe("number");
    expect(dps).toBeGreaterThan(0);
  });

  it("runs a bare warframe build", () => {
    const warframe = warframesMap.get("ash")!;
    const stats = calculateWarframeBuild(warframe, [], modsMap);
    expect(stats.totalHealth ?? stats.health).toBeGreaterThan(0);
  });

  it("runs calculateTTK against a scenario enemy", () => {
    const weapon = weapons.find((w) => w.id === "braton")!;
    const stats = calculateWeaponBuild(weapon, [], modsMap);
    const ttk = calculateTTK(stats, ENEMY_TYPES[0], 100);
    expect(ttk).toBeTruthy();
  });
});
