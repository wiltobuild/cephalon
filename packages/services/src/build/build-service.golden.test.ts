import { describe, expect, test } from "vitest";
import {
  calculateWeaponBuildWithArcanes,
  calculateWarframeBuild,
  applyWarframeShardsAndArcanes,
} from "@cephalon/engine";
import type { ModSlot } from "@cephalon/engine";
import { CatalogService } from "../catalog/catalog-service";
import { ConfidenceService } from "../confidence/confidence-service";
import { BuildService } from "./build-service";
import { scenarioToSimulationParams } from "./scenario";

/**
 * Themis M2 — the service layer's own translation logic (Scenario -> SimulationParams,
 * param order into the engine, CalculatedStats -> view-model field mapping) needs a
 * numeric-correctness test. The engine golden-baseline (task 10) does not cover this
 * path (it calls the barrel directly).
 *
 * Two guarantees:
 *  (a) faithful translation — BuildService.rawStats deep-equals a direct engine call
 *      with the same inputs, for MODDED builds (not just bare weapons);
 *  (b) regression anchors — key stats for three cited modded builds are snapshot-locked,
 *      so a mapping/param-assembly regression is caught even if it stays internally
 *      consistent.
 */

const catalog = new CatalogService();
const svc = new BuildService(catalog, new ConfidenceService());
const scenario = { faction: "grineer", headshots: true, statusTypesOnTarget: 2, killStacks: 3, arcaneStacks: 12 } as const;
const slots = (ids: string[]): ModSlot[] => ids.map((modId, i) => ({ modId, rank: 99, slotIndex: i }));

const WEAPON_BUILDS: { id: string; mods: string[] }[] = [
  { id: "braton", mods: ["serration_r3", "split_chamber_r3", "point_strike_r3", "vital_sense_r3"] },
  { id: "soma", mods: ["serration_r3", "split_chamber_r3", "point_strike_r3", "vital_sense_r3", "heavy_caliber"] },
  { id: "lex", mods: ["hornet_strike_r3", "barrel_diffusion_r3"] },
  { id: "hek", mods: ["point_blank_r3", "hells_chamber"] },
];

describe("BuildService faithful translation (modded)", () => {
  test("maps Scenario.steelPath to the engine SP input", () => {
    expect(scenarioToSimulationParams({ ...scenario, steelPath: true }).sp).toBe(true);
    expect(scenarioToSimulationParams(scenario).sp).toBe(false);
  });

  for (const { id, mods } of WEAPON_BUILDS) {
    test(`${id}: rawStats == direct engine call`, () => {
      const weapon = catalog.getWeapon(id)!;
      expect(weapon, `catalog missing weapon ${id}`).toBeTruthy();
      const modSlots = slots(mods);
      const direct = calculateWeaponBuildWithArcanes(
        weapon, modSlots, catalog.getModMap(), [], undefined,
        scenarioToSimulationParams(scenario), undefined, undefined, undefined,
      );
      const viaService = svc.calculateWeapon({ weaponId: id, modSlots, scenario }).rawStats;
      expect(viaService).toEqual(direct);
    });
  }

  test("rhino modded: warframe rawStats == direct engine call", () => {
    const wf = catalog.getWarframe("rhino")!;
    const modSlots = slots(["vitality_r3", "redirection_r3", "steel_fiber_r3"]);
    const direct = applyWarframeShardsAndArcanes(
      calculateWarframeBuild(wf, modSlots, catalog.getModMap(), undefined),
      undefined, [], undefined,
    );
    const viaService = svc.calculateWarframe({ warframeId: "rhino", modSlots }).rawStats;
    expect(viaService).toEqual(direct);
  });
});

describe("BuildService regression anchors (cited modded builds)", () => {
  for (const { id, mods } of WEAPON_BUILDS.slice(0, 3)) {
    test(`${id} + [${mods.join(", ")}] @ grineer/headshots/2 status/3 kill/12 arcane`, () => {
      const r = svc.calculateWeapon({ weaponId: id, modSlots: slots(mods), scenario }).rawStats;
      expect({
        sustainedDps: Math.round(r.sustainedDps),
        burstDps: Math.round(r.burstDps),
        totalDamage: Math.round(r.totalDamage),
        criticalChance: Number(r.criticalChance.toFixed(4)),
        multishot: Number(r.multishot.toFixed(4)),
      }).toMatchSnapshot();
    });
  }

  test("rhino + [vitality, redirection, steel_fiber] durability anchor", () => {
    const r = svc.calculateWarframe({ warframeId: "rhino", modSlots: slots(["vitality_r3", "redirection_r3", "steel_fiber_r3"]) }).rawStats;
    expect({
      effectiveHealth: Math.round(r.effectiveHealth),
      totalHealth: Math.round(r.totalHealth),
      totalArmor: Math.round(r.totalArmor),
      totalShield: Math.round(r.totalShield),
    }).toMatchSnapshot();
  });
});
