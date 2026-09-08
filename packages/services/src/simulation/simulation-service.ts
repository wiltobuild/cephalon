import {
  calculateTTK,
  runDamageSim,
  simulateDiscreteTTK,
} from "@cephalon/engine";
import type { CalculatedStats, TTKResult } from "@cephalon/engine";
import type { BuildViewModel } from "../build/build-service";
import { CatalogService } from "../catalog/catalog-service";
import {
  ConfidenceService,
  type ConfidenceTag,
} from "../confidence/confidence-service";

export interface SimulationTarget {
  enemyArchetypeId: string;
  level: number;
  factionOverride?: string;
  discrete?: boolean;
  steelPath?: boolean;
}
export interface ScenarioCaveat {
  key: string;
  tag: ConfidenceTag;
  text: string;
}
export interface ScenarioResult {
  ttk: TTKResult;
  caveats: ScenarioCaveat[];
  damageSimulation?: ReturnType<typeof runDamageSim>;
}

export class SimulationService {
  constructor(
    readonly catalog: CatalogService,
    readonly confidence: ConfidenceService,
  ) {}
  simulate(
    build: BuildViewModel | CalculatedStats,
    target: SimulationTarget,
  ): ScenarioResult {
    const stats = "rawStats" in build ? build.rawStats : build;
    if (!("sustainedDps" in stats))
      throw new Error("Simulation requires weapon calculated stats");
    const enemy = this.catalog
      .getEnemyTypes()
      .find((item) => item.id === target.enemyArchetypeId);
    if (!enemy)
      throw new Error(`Unknown enemy archetype: ${target.enemyArchetypeId}`);
    if (
      target.factionOverride &&
      target.factionOverride.toLowerCase() !== enemy.faction.toLowerCase()
    )
      throw new Error(
        "Enemy identity determines faction. Recalculate the build for the selected enemy instead of overriding faction.",
      );
    const steelPath = target.steelPath ?? stats.simParams.sp ?? false;
    const ttk = target.discrete
      ? simulateDiscreteTTK(stats, enemy, target.level, undefined, steelPath)
      : calculateTTK(stats, enemy, target.level, steelPath);
    const caveats: ScenarioCaveat[] = [
      {
        key: "expectedValueStatus",
        tag: "approximation",
        text: "Expected-value status and proc behavior; not a live combat replay.",
      },
      {
        key: "enemyRoster",
        tag: "not-modeled",
        text: `Limited to the bundled ${this.catalog.getEnemyTypes().length}-archetype enemy roster.`,
      },
      {
        key: "legacyResistances",
        tag: "approximation",
        text: "Legacy enemy resistances and approximate scaling. Not validated against the current game; use TTK for model comparisons only.",
      },
      {
        key: "specialDefenses",
        tag: "not-modeled",
        text: "no magnetic / overguard / eximus modeling.",
      },
      {
        key: "steelPath",
        tag: this.confidence.tag("steelPath"),
        text: steelPath
          ? "Steel Path applied (+100 level, ×2.5 health/shield); an approximation of DE's live scaling, not verified against the game."
          : "Enemy level only — Steel Path scaling is not applied.",
      },
    ];
    return { ttk, caveats };
  }
}
