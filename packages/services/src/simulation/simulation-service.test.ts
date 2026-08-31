import { expect, test } from "vitest";
import { BuildService } from "../build/build-service";
import { CatalogService } from "../catalog/catalog-service";
import { ConfidenceService } from "../confidence/confidence-service";
import { SimulationService } from "./simulation-service";

const scenario = { headshots: false, statusTypesOnTarget: 0, killStacks: 0, arcaneStacks: 0 };

test("attaches EV / roster / special-defenses / Steel-Path caveats unconditionally", () => {
  const catalog = new CatalogService();
  const confidence = new ConfidenceService();
  const build = new BuildService(catalog, confidence).calculateWeapon({ weaponId: "braton", modSlots: [], scenario });
  const sim = new SimulationService(catalog, confidence);

  for (const level of [30, 100, 500]) {
    const result = sim.simulate(build, { enemyArchetypeId: "lancer", level });
    const keys = result.caveats.map((c) => c.key);
    expect(keys).toEqual(expect.arrayContaining(["expectedValueStatus", "enemyRoster", "specialDefenses", "steelPath"]));
    const sp = result.caveats.find((c) => c.key === "steelPath")!;
    expect(sp.tag).toBe("pending-verification");
    expect(sp.text).toMatch(/Steel Path scaling is not yet modelled/i);
    // never claims the level scaling shown IS Steel Path
    expect(sp.text).not.toMatch(/Steel Path (applied|active|modelled\.)/i);
  }
});

test("rejects an unknown enemy archetype", () => {
  const catalog = new CatalogService();
  const confidence = new ConfidenceService();
  const build = new BuildService(catalog, confidence).calculateWeapon({ weaponId: "braton", modSlots: [], scenario });
  expect(() => new SimulationService(catalog, confidence).simulate(build, { enemyArchetypeId: "not_a_real_enemy", level: 50 }))
    .toThrow(/Unknown enemy archetype/);
});
