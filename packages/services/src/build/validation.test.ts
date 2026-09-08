import { describe, expect, test } from "vitest";
import { CatalogService } from "../catalog/catalog-service";
import { BuildService } from "./build-service";
import { ConfidenceService } from "../confidence/confidence-service";
import { capacityCost, validateWeaponBuild } from "./validation";
const catalog = new CatalogService();
const builds = new BuildService(catalog, new ConfidenceService());
const base = {
  weaponId: "braton",
  modSlots: [],
  scenario: {
    headshots: false,
    statusTypesOnTarget: 0,
    killStacks: 0,
    arcaneStacks: 0,
  },
};
const serration = { modId: "serration_r3", rank: 10, slotIndex: 0 };
describe("legal weapon builds", () => {
  test("ordinary and Primed elemental variants cannot be equipped together", () => {
    expect(() =>
      validateWeaponBuild(catalog, {
        ...base,
        modSlots: [
          { modId: "cryo_rounds_r3", rank: 5, slotIndex: 0 },
          { modId: "primed_cryo_rounds", rank: 10, slotIndex: 1 },
        ],
      }),
    ).toThrow(/variants/);
  });
  test("Exilus slot accepts utility mods, rejects regular mods, and shares capacity", () => {
    const utility = catalog
      .compatibleMods("braton", "exilus")
      .find((m) => m.id === "vigilante_supplies")!;
    expect(utility).toBeDefined();
    const slot = { modId: utility.id, rank: utility.maxRank, slotIndex: 8 };
    expect(() =>
      validateWeaponBuild(catalog, { ...base, modSlots: [slot] }),
    ).not.toThrow();
    expect(() =>
      validateWeaponBuild(catalog, {
        ...base,
        modSlots: [{ ...serration, slotIndex: 8 }],
      }),
    ).toThrow(/compatible/);
    expect(() =>
      validateWeaponBuild(catalog, { ...base, modSlots: [slot], capacity: 1 }),
    ).toThrow(/capacity/);
  });
  test("weapon arcane categories are enforced and active effects reach calculations", () => {
    expect(catalog.compatibleArcanes("braton").map((a) => a.id)).not.toContain(
      "arcane_primary_charger",
    );
    expect(() =>
      builds.calculateWeapon({
        ...base,
        arcaneIds: ["arcane_secondary_merciless"],
      }),
    ).toThrow(/arcane/);
    const blight = catalog
      .compatibleArcanes("braton")
      .find((a) => a.id === "primary_blight")!;
    expect(blight.maxStacks).toBe(40);
    expect(() =>
      builds.calculateWeapon({
        ...base,
        arcaneIds: [blight.id],
        scenario: { ...base.scenario, arcaneStacks: blight.maxStacks },
      }),
    ).not.toThrow();
    const unmodded = builds.calculateWeapon(base);
    const equipped = builds.calculateWeapon({
      ...base,
      arcaneIds: ["arcane_primary_merciless"],
      scenario: { ...base.scenario, arcaneStacks: 12 },
    });
    expect(
      equipped.stats.find((s) => s.key === "sustainedDps")!.value,
    ).toBeGreaterThan(
      unmodded.stats.find((s) => s.key === "sustainedDps")!.value,
    );
    expect(
      equipped.stats.find((s) => s.key === "reloadTime")!.value,
    ).toBeLessThan(unmodded.stats.find((s) => s.key === "reloadTime")!.value);
  });
  test("source category corrections prevent shotgun mods on rifles and rifle mods on shotguns", () => {
    const rifle = catalog.compatibleMods("braton").map((m) => m.id);
    for (const id of [
      "chilling_reload",
      "magnetic_strafe",
      "galvanized_savvy",
      "sweeping_serration",
      "point_blank_r3",
      "conductive_blade",
      "orgone_tuning_matrix",
    ])
      expect(rifle).not.toContain(id);
    const shotgun = catalog.compatibleMods("hek").map((m) => m.id);
    expect(shotgun).not.toContain("serration_r3");
    expect(shotgun).toContain("point_blank_r3");
    expect(shotgun).toContain("chilling_reload");
  });
  test("rejects duplicate damage mods before calculation", () =>
    expect(() =>
      builds.calculateWeapon({
        ...base,
        modSlots: [serration, { ...serration, slotIndex: 1 }],
      }),
    ).toThrow(/once/));
  test("rejects mutually exclusive variants", () =>
    expect(() =>
      validateWeaponBuild(catalog, {
        ...base,
        modSlots: [
          serration,
          { modId: "amalgam_serration", rank: 0, slotIndex: 1 },
        ],
      }),
    ).toThrow(/variants/));
  test.each([-1, 11, 0.5, NaN])("rejects invalid rank %s", (rank) =>
    expect(() =>
      validateWeaponBuild(catalog, {
        ...base,
        modSlots: [{ ...serration, rank }],
      }),
    ).toThrow(/rank/),
  );
  test("rejects a slot collision", () =>
    expect(() =>
      validateWeaponBuild(catalog, {
        ...base,
        modSlots: [
          serration,
          { modId: "split_chamber_r3", rank: 5, slotIndex: 0 },
        ],
      }),
    ).toThrow(/unique/));
  test("checks capacity at rank and polarity", () => {
    const drain =
      catalog.getModMap().get(serration.modId)!.drain + serration.rank;
    expect(capacityCost(catalog, [serration])).toBe(drain);
    const polarity = catalog.getModMap().get(serration.modId)!.polarity;
    expect(capacityCost(catalog, [serration], { 0: polarity })).toBe(
      Math.ceil(drain / 2),
    );
    expect(() =>
      validateWeaponBuild(catalog, {
        ...base,
        modSlots: [serration],
        capacity: 5,
      }),
    ).toThrow(/capacity/);
  });
  test("enemy identity overrides a stale faction", () => {
    const modSlots = [
      { modId: "primed_bane_of_grineer", rank: 10, slotIndex: 0 },
    ];
    const a = builds.calculateWeapon({
      ...base,
      modSlots,
      scenario: {
        ...base.scenario,
        enemyArchetypeId: "crewman",
        faction: "Grineer",
      },
    });
    const b = builds.calculateWeapon({
      ...base,
      scenario: { ...base.scenario, enemyArchetypeId: "crewman" },
    });
    expect(a.stats.find((s) => s.key === "sustainedDps")?.value).toBe(
      b.stats.find((s) => s.key === "sustainedDps")?.value,
    );
  });
});
