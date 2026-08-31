import { describe, expect, test } from "vitest";
import { CatalogService } from "../catalog/catalog-service";
import { ConfidenceService } from "../confidence/confidence-service";
import { BuildService } from "./build-service";

const builds = new BuildService(new CatalogService(), new ConfidenceService());
const scenario = { headshots: false, statusTypesOnTarget: 0, killStacks: 0, arcaneStacks: 0 };
const weaponIds = ["braton", "soma", "paris", "cernos", "hek", "boar", "skana", "galatine", "lex", "torid"];
const warframeIds = ["ash", "excalibur", "mag", "volt", "rhino", "loki"];

describe("BuildService reference builds", () => {
  for (const weaponId of weaponIds) test(`weapon gold: ${weaponId}`, () => {
    const result = builds.calculateWeapon({ weaponId, modSlots: [], scenario });
    expect(result.rawStats).toMatchObject({ totalDamage: expect.any(Number), sustainedDps: expect.any(Number) });
    expect(result.stats.every((stat) => stat.confidence)).toBe(true);
  });
  for (const warframeId of warframeIds) test(`warframe gold: ${warframeId}`, () => {
    const result = builds.calculateWarframe({ warframeId, modSlots: [] });
    expect(result.rawStats).toMatchObject({ totalHealth: expect.any(Number), totalArmor: expect.any(Number) });
  });
});
