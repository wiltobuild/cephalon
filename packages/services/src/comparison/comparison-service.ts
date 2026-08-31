import type { ModSlot } from "@cephalon/engine";
import { BuildService, type BuildViewModel, type WeaponBuildInput } from "../build/build-service";
import { SimulationService, type SimulationTarget } from "../simulation/simulation-service";
import type { ConfidenceTag, MechanicKey } from "../confidence/confidence-service";

export interface BuildDiffRow { key: MechanicKey; label: string; a: number; b: number; delta: number; confidence: ConfidenceTag; }
export interface BuildDiff { rows: BuildDiffRow[]; whereEachWins: string[]; a: BuildViewModel; b: BuildViewModel; }

export class ComparisonService {
  constructor(readonly builds: BuildService, readonly simulations: SimulationService) {}
  compareBuilds(aInput: WeaponBuildInput, bInput: WeaponBuildInput, target?: SimulationTarget): BuildDiff {
    const a = this.builds.calculateWeapon(aInput);
    const b = this.builds.calculateWeapon(bInput);
    const stat = (build: BuildViewModel, key: MechanicKey) => build.stats.find((row) => row.key === key)?.value ?? 0;
    const rows: BuildDiffRow[] = ([
      ["sustainedDps", "Sustained DPS"], ["burstDps", "Burst DPS"], ["statusChance", "Status Chance"],
    ] as const).map(([key, label]) => ({ key, label, a: stat(a, key), b: stat(b, key), delta: stat(b, key) - stat(a, key), confidence: a.stats.find((row) => row.key === key)!.confidence }));
    if (target) {
      const aTtk = this.simulations.simulate(a, target).ttk.ttk;
      const bTtk = this.simulations.simulate(b, target).ttk.ttk;
      rows.push({ key: "ttk", label: "TTK", a: aTtk, b: bTtk, delta: bTtk - aTtk, confidence: this.builds.confidence.tag("ttk") });
    }
    const capacity = (slots: ModSlot[]) => slots.reduce((total, slot) => total + (this.builds.catalog.getModMap().get(slot.modId)?.drain ?? 0), 0);
    rows.push({ key: "modCapacityCost", label: "Mod Capacity Cost", a: capacity(aInput.modSlots), b: capacity(bInput.modSlots), delta: capacity(bInput.modSlots) - capacity(aInput.modSlots), confidence: this.builds.confidence.tag("modCapacityCost") });
    const wins: string[] = [];
    if (rows.find((row) => row.key === "sustainedDps")!.delta > 0) wins.push("Build B wins sustained DPS.");
    if (rows.find((row) => row.key === "sustainedDps")!.delta < 0) wins.push("Build A wins sustained DPS.");
    if (target && rows.find((row) => row.key === "ttk")!.delta < 0) wins.push("Build B wins target TTK.");
    return { rows, whereEachWins: wins, a, b };
  }

  compareModSwap(baseInput: WeaponBuildInput, candidateModId: string, removeModId?: string, target?: SimulationTarget): BuildDiff {
    const removed = removeModId ?? baseInput.modSlots.at(-1)?.modId;
    const slots = baseInput.modSlots.filter((slot) => slot.modId !== removed);
    slots.push({ modId: candidateModId, rank: this.builds.catalog.getModMap().get(candidateModId)?.maxRank ?? 0, slotIndex: slots.length });
    return this.compareBuilds(baseInput, { ...baseInput, modSlots: slots }, target);
  }
}
