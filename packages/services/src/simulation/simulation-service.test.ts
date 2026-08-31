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
    expect(sp.tag).toBe("approximation");
    expect(sp.text).toMatch(/Enemy level only/i);
    expect(sp.text).not.toMatch(/Steel Path applied/i);
  }
});

test("applies Steel Path scaling and reports its approximation caveat", () => {
  const catalog = new CatalogService();
  const confidence = new ConfidenceService();
  const builds = new BuildService(catalog, confidence);
  const build = builds.calculateWeapon({ weaponId: "braton", modSlots: [], scenario });
  const steelPathBuild = builds.calculateWeapon({ weaponId: "braton", modSlots: [], scenario: { ...scenario, steelPath: true } });
  const sim = new SimulationService(catalog, confidence);
  const target = { enemyArchetypeId: "lancer", level: 100 };
  const standard = sim.simulate(build, target);
  const steelPath = sim.simulate(steelPathBuild, target);

  expect(steelPathBuild.rawStats.simParams.sp).toBe(true);
  expect(steelPath.ttk.ttk).toBeGreaterThan(standard.ttk.ttk);
  const caveat = steelPath.caveats.find((item) => item.key === "steelPath")!;
  expect(caveat.tag).toBe("approximation");
  expect(caveat.text).toMatch(/Steel Path applied/i);
});

test("rejects an unknown enemy archetype", () => {
  const catalog = new CatalogService();
  const confidence = new ConfidenceService();
  const build = new BuildService(catalog, confidence).calculateWeapon({ weaponId: "braton", modSlots: [], scenario });
  expect(() => new SimulationService(catalog, confidence).simulate(build, { enemyArchetypeId: "not_a_real_enemy", level: 50 }))
    .toThrow(/Unknown enemy archetype/);
});
