import { expect, test } from "vitest";
import { BuildService } from "../build/build-service";
import { CatalogService } from "../catalog/catalog-service";
import { ComparisonService } from "./comparison-service";
import { ConfidenceService } from "../confidence/confidence-service";
import { SimulationService } from "../simulation/simulation-service";

test("Primed Bane of Grineer is faction gated", () => {
  const catalog = new CatalogService(); const confidence = new ConfidenceService(); const builds = new BuildService(catalog, confidence);
  const comparison = new ComparisonService(builds, new SimulationService(catalog, confidence));
  const base = { weaponId: "braton", modSlots: [], scenario: { headshots: false, statusTypesOnTarget: 0, killStacks: 0, arcaneStacks: 0 } };
  const grineer = comparison.compareModSwap({ ...base, scenario: { ...base.scenario, faction: "grineer" } }, "primed_bane_of_grineer");
  const corpus = comparison.compareModSwap({ ...base, scenario: { ...base.scenario, faction: "corpus" } }, "primed_bane_of_grineer");
  expect(grineer.rows.find((row) => row.key === "sustainedDps")?.delta).toBeGreaterThan(0);
  expect(corpus.rows.find((row) => row.key === "sustainedDps")?.delta).toBe(0);
});
