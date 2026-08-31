import { DEFAULT_SIM_PARAMS } from "@cephalon/engine";
import type { SimulationParams } from "@cephalon/engine";

export interface Scenario {
  faction?: string;
  enemyArchetypeId?: string;
  level?: number;
  /** Binary because the engine exposes applyHeadshots, not a headshot-rate model. */
  headshots: boolean;
  /** A 0–5 count because the engine does not model per-status uptime. */
  statusTypesOnTarget: number;
  killStacks: number;
  arcaneStacks: number;
  // No armorStripPercent: armor strip is proc-derived in the engine, not a first-class toggle.
  // No headshotRate: the engine takes a boolean headshot state, not a percentage.
  // No statusUptime: the engine takes a status-type count, not time-based uptime.
  // No primedTarget: "priming" is proc-derived (S1-class). A UI that wants to model
  //   "the target already has statuses" sets statusTypesOnTarget > 0 — there is no
  //   engine input for target priming, and applyTriggerBuffs is a PLAYER trigger-buff
  //   flag (Catalyzer Link etc.), unrelated to the target.
}

export function scenarioToSimulationParams(scenario: Scenario): SimulationParams {
  return {
    ...DEFAULT_SIM_PARAMS,
    targetFaction: scenario.faction,
    applyHeadshots: scenario.headshots,
    statusTypesOnTarget: Math.max(0, Math.min(5, scenario.statusTypesOnTarget)),
    killStacks: Math.max(0, Math.min(5, scenario.killStacks)),
    arcaneStacks: Math.max(0, scenario.arcaneStacks),
  };
}
