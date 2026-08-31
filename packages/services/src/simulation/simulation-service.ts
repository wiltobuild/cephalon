import { calculateTTK, runDamageSim, simulateDiscreteTTK } from "@cephalon/engine";
import type { CalculatedStats, TTKResult } from "@cephalon/engine";
import type { BuildViewModel } from "../build/build-service";
import { CatalogService } from "../catalog/catalog-service";
import { ConfidenceService, type ConfidenceTag } from "../confidence/confidence-service";

export interface SimulationTarget { enemyArchetypeId: string; level: number; factionOverride?: string; discrete?: boolean; }
export interface ScenarioCaveat { key: string; tag: ConfidenceTag; text: string; }
export interface ScenarioResult { ttk: TTKResult; caveats: ScenarioCaveat[]; damageSimulation?: ReturnType<typeof runDamageSim>; }

export class SimulationService {
  constructor(readonly catalog: CatalogService, readonly confidence: ConfidenceService) {}
  simulate(build: BuildViewModel | CalculatedStats, target: SimulationTarget): ScenarioResult {
    const stats = "rawStats" in build ? build.rawStats : build;
    if (!("sustainedDps" in stats)) throw new Error("Simulation requires weapon calculated stats");
    const enemy = this.catalog.getEnemyTypes().find((item) => item.id === target.enemyArchetypeId);
    if (!enemy) throw new Error(`Unknown enemy archetype: ${target.enemyArchetypeId}`);
    const ttk = target.discrete ? simulateDiscreteTTK(stats, enemy, target.level) : calculateTTK(stats, enemy, target.level);
    const caveats: ScenarioCaveat[] = [
      { key: "expectedValueStatus", tag: "approximation", text: "Expected-value status and proc behavior; not a live combat replay." },
      { key: "enemyRoster", tag: "not-modeled", text: "Limited to the bundled 19-archetype enemy roster." },
      { key: "specialDefenses", tag: "not-modeled", text: "no magnetic / overguard / eximus modeling." },
      // Always present: results are raw enemy level only. Steel Path's health/armor/
      // level-shift/attenuation multipliers are not modelled until the task-11
      // calc-formula gate lands. This is a clarification, never a claim that the
      // level scaling shown IS Steel Path.
      { key: "steelPath", tag: this.confidence.tag("steelPath"), text: "Enemy level only — Steel Path scaling is not yet modelled (pending the Steel Path calc-formula task)." },
    ];
    return { ttk, caveats };
  }
}
