import { expect, test } from "vitest";
import { CatalogService } from "../catalog/catalog-service";
import { BuildService } from "../build/build-service";
import { ConfidenceService } from "../confidence/confidence-service";
import { validateWeaponBuild } from "../build/validation";
import { OptimizerService, type OptimizeOptions } from "./optimizer-service";
const catalog = new CatalogService();
const solver = new OptimizerService(catalog);
const build = {
  weaponId: "braton",
  modSlots: [],
  scenario: {
    headshots: false,
    statusTypesOnTarget: 0,
    killStacks: 0,
    arcaneStacks: 0,
    level: 20,
  },
};
const options: OptimizeOptions = {
  target: "general",
  goal: "sustained",
  damage: "auto",
  maxForma: 2,
  lockedSlots: [],
  ownedModIds: ["serration_r3", "split_chamber_r3", "cryo_rounds_r3"],
};
test.each([
  "heat",
  "toxin",
  "viral",
  "corrosive",
  "magnetic",
  "radiation",
  "blast",
  "gas",
  "viral_heat",
  "corrosive_heat",
] as const)(
  "enforces the %s damage preference through actual elemental ordering",
  async (damage) => {
    const result = await solver.optimize(build, {
      ...options,
      damage,
      ownedModIds: [
        "cryo_rounds_r3",
        "infected_clip_r3",
        "hellfire_r3",
        "stormbringer_r3",
      ],
    });
    const output = new BuildService(
      catalog,
      new ConfidenceService(),
    ).calculateWeapon(result.build);
    const types = output.stats
      .find((s) => s.key === "elementalDamage")!
      .breakdown!.map((element) => element.type);
    for (const type of damage.split("_")) expect(types).toContain(type);
  },
  30000,
);
test("combat evaluation includes Viral procs and retains a requested Viral + Heat package", async () => {
  const result = await solver.optimize(
    {
      ...build,
      weaponId: "braton_prime",
      scenario: { ...build.scenario, level: 100 },
    },
    {
      ...options,
      goal: "ttk",
      target: "Grineer",
      damage: "viral_heat",
      ownedModIds: [
        "cryo_rounds_r3",
        "infected_clip_r3",
        "hellfire_r3",
        "serration_r3",
      ],
    },
  );
  expect(
    result.matrix.find((row) => row.faction === "Grineer")!.peakViralStacks,
  ).toBeGreaterThan(0);
}, 30000);
test("full-catalog Auto combat search produces a legal elemental build", async () => {
  const result = await solver.optimize(
    {
      ...build,
      scenario: {
        ...build.scenario,
        level: 100,
        killStacks: 5,
        arcaneStacks: 12,
      },
    },
    { ...options, goal: "ttk", ownedModIds: undefined },
  );
  expect(() => validateWeaponBuild(catalog, result.build)).not.toThrow();
  const output = new BuildService(
    catalog,
    new ConfidenceService(),
  ).calculateWeapon(result.build);
  expect(
    output.stats
      .find((s) => s.key === "elementalDamage")!
      .breakdown!.some((e) =>
        [
          "viral",
          "corrosive",
          "magnetic",
          "radiation",
          "blast",
          "gas",
        ].includes(e.type),
      ),
  ).toBe(true);
}, 60000);
test("Viral + Heat respects an existing locked Heat slot", async () => {
  const heat = { modId: "hellfire_r3", rank: 5, slotIndex: 7 };
  const result = await solver.optimize(
    { ...build, modSlots: [heat] },
    {
      ...options,
      damage: "viral_heat",
      lockedSlots: [7],
      ownedModIds: ["hellfire_r3", "cryo_rounds_r3", "infected_clip_r3"],
    },
  );
  expect(result.build.modSlots).toContainEqual(heat);
  expect(
    result.build.modSlots.some((slot) => slot.modId === "infected_clip_r3"),
  ).toBe(true);
}, 30000);
test("combat stacks favor Galvanized Chamber and preserve arcanes and Exilus", async () => {
  const utility = { modId: "vigilante_supplies", rank: 5, slotIndex: 8 };
  const result = await solver.optimize(
    {
      ...build,
      modSlots: [utility],
      arcaneIds: ["arcane_primary_merciless"],
      scenario: { ...build.scenario, killStacks: 5, arcaneStacks: 12 },
    },
    {
      ...options,
      ownedModIds: [
        "vigilante_supplies",
        "split_chamber_r3",
        "galvanized_chamber",
        "heavy_caliber",
      ],
    },
  );
  expect(result.build.modSlots).toContainEqual(utility);
  expect(result.build.arcaneIds).toEqual(["arcane_primary_merciless"]);
  expect(result.build.modSlots.map((s) => s.modId)).toContain(
    "galvanized_chamber",
  );
  expect(result.build.modSlots.map((s) => s.modId)).not.toContain(
    "heavy_caliber",
  );
  expect(result.build.modSlots.map((s) => s.modId)).not.toContain(
    "split_chamber_r3",
  );
  expect(() => validateWeaponBuild(catalog, result.build)).not.toThrow();
}, 30000);
test("deterministic, legal, owned-only build with a fixed multi-faction configuration", async () => {
  const a = await solver.optimize(build, options),
    b = await solver.optimize(build, options);
  expect(a).toEqual(b);
  expect(a.status).toBe("best_found");
  expect(a.build.modSlots.length).toBeGreaterThan(0);
  expect(
    a.build.modSlots.every((s) => options.ownedModIds!.includes(s.modId)),
  ).toBe(true);
  expect(a.forma).toBeLessThanOrEqual(2);
  expect(a.matrix).toHaveLength(4);
  expect(() => validateWeaponBuild(catalog, a.build)).not.toThrow();
}, 30000);
test("preserves an explicitly locked slot and rank", async () => {
  const slot = { modId: "serration_r3", rank: 3, slotIndex: 5 };
  const result = await solver.optimize(
    { ...build, modSlots: [slot] },
    { ...options, lockedSlots: [5], maxForma: 0 },
  );
  expect(result.build.modSlots.find((s) => s.slotIndex === 5)).toEqual(slot);
  expect(result.forma).toBe(0);
}, 30000);
test("rejects unsupported mechanics and infeasible constraints", async () => {
  await expect(
    solver.optimize({ ...build, weaponId: "skana" }, options),
  ).rejects.toThrow(/supports/);
  await expect(
    solver.optimize(build, { ...options, maxForma: 99 }),
  ).rejects.toThrow(/constraints/);
  await expect(
    solver.optimize(build, { ...options, damage: "viral", ownedModIds: [] }),
  ).rejects.toThrow(/No feasible/);
});
