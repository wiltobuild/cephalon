import type { ModSlot } from "@cephalon/engine";
import {
  BuildService,
  type BuildViewModel,
  type WeaponBuildInput,
} from "../build/build-service";
import {
  SimulationService,
  type SimulationTarget,
} from "../simulation/simulation-service";
import type {
  ConfidenceTag,
  MechanicKey,
} from "../confidence/confidence-service";
import { capacityCost } from "../build/validation";

export interface BuildDiffRow {
  key: MechanicKey;
  label: string;
  a: number;
  b: number;
  delta: number;
  confidence: ConfidenceTag;
}
export interface BuildDiff {
  rows: BuildDiffRow[];
  whereEachWins: string[];
  a: BuildViewModel;
  b: BuildViewModel;
}

export class ComparisonService {
  constructor(
    readonly builds: BuildService,
    readonly simulations: SimulationService,
  ) {}
  compareBuilds(
    aInput: WeaponBuildInput,
    bInput: WeaponBuildInput,
    target?: SimulationTarget,
  ): BuildDiff {
    if (target) {
      const enemy = this.builds.catalog
        .getEnemyTypes()
        .find((e) => e.id === target.enemyArchetypeId);
      if (!enemy) throw new Error("Unknown comparison target.");
      const scenario = {
        ...aInput.scenario,
        enemyArchetypeId: enemy.id,
        faction: enemy.faction,
        level: target.level,
        steelPath: target.steelPath ?? aInput.scenario.steelPath,
      };
      aInput = { ...aInput, scenario };
      bInput = { ...bInput, scenario };
    }
    const a = this.builds.calculateWeapon(aInput);
    const b = this.builds.calculateWeapon(bInput);
    const stat = (build: BuildViewModel, key: MechanicKey) =>
      build.stats.find((row) => row.key === key)?.value ?? 0;
    const rows: BuildDiffRow[] = (
      [
        ["sustainedDps", "Sustained DPS"],
        ["burstDps", "Burst DPS"],
        ["statusChance", "Status Chance"],
      ] as const
    ).map(([key, label]) => ({
      key,
      label,
      a: stat(a, key),
      b: stat(b, key),
      delta: stat(b, key) - stat(a, key),
      confidence: a.stats.find((row) => row.key === key)!.confidence,
    }));
    if (target) {
      const aTtk = this.simulations.simulate(a, target).ttk.ttk;
      const bTtk = this.simulations.simulate(b, target).ttk.ttk;
      rows.push({
        key: "ttk",
        label: "TTK",
        a: aTtk,
        b: bTtk,
        delta: bTtk - aTtk,
        confidence: this.builds.confidence.tag("ttk"),
      });
    }
    const costA = capacityCost(
      this.builds.catalog,
      aInput.modSlots,
      aInput.slotPolarities,
    );
    const costB = capacityCost(
      this.builds.catalog,
      bInput.modSlots,
      bInput.slotPolarities,
    );
    rows.push({
      key: "modCapacityCost",
      label: "Mod Capacity Cost",
      a: costA,
      b: costB,
      delta: costB - costA,
      confidence: this.builds.confidence.tag("modCapacityCost"),
    });
    const wins: string[] = [];
    if (rows.find((row) => row.key === "sustainedDps")!.delta > 0)
      wins.push("Build B wins sustained DPS.");
    if (rows.find((row) => row.key === "sustainedDps")!.delta < 0)
      wins.push("Build A wins sustained DPS.");
    if (target && rows.find((row) => row.key === "ttk")!.delta < 0)
      wins.push("Build B wins target TTK.");
    return { rows, whereEachWins: wins, a, b };
  }

  compareModSwap(
    baseInput: WeaponBuildInput,
    candidateModId: string,
    removeModId?: string,
    target?: SimulationTarget,
  ): BuildDiff {
    const removed = removeModId ?? baseInput.modSlots.at(-1)?.modId;
    const slots = baseInput.modSlots.filter((slot) => slot.modId !== removed);
    const index =
      baseInput.modSlots.find((slot) => slot.modId === removed)?.slotIndex ??
      Array.from({ length: 8 }, (_, i) => i).find(
        (i) => !slots.some((slot) => slot.slotIndex === i),
      );
    if (index === undefined) throw new Error("No empty slot.");
    slots.push({
      modId: candidateModId,
      rank: this.builds.catalog.getModMap().get(candidateModId)?.maxRank ?? 0,
      slotIndex: index,
    });
    return this.compareBuilds(
      baseInput,
      { ...baseInput, modSlots: slots },
      target,
    );
  }
}
