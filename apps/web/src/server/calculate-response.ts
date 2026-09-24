import { capacityCost } from "@cephalon/services";
import type { BuildWeaponRequest, BuildWeaponResponse } from "./contracts";
import { builds, catalog, sims } from "./services";
export function calculateResponse(
  input: BuildWeaponRequest,
): BuildWeaponResponse {
  const calculated = builds.calculateWeapon(input);
  const { rawStats: _rawStats, ...build } = calculated;
  const response: BuildWeaponResponse = {
    ...build,
    capacityUsed: capacityCost(catalog, input.modSlots, input.slotPolarities),
  };
  {
    const targetId = input.scenario.enemyArchetypeId ?? "heavy_gunner";
    const reference = input.scenario.enemyArchetypeId
      ? calculated
      : builds.calculateWeapon({
          ...input,
          scenario: {
            ...input.scenario,
            enemyArchetypeId: targetId,
            faction: "Grineer",
          },
        });
    const result = sims.simulate(reference, {
      enemyArchetypeId: targetId,
      level: input.scenario.level ?? 100,
      steelPath: input.scenario.steelPath,
    });
    const enemy = catalog.getEnemyTypes().find((e) => e.id === targetId)!;
    response.ttk = {
      target: {
        id: enemy.id,
        name: enemy.name,
        faction: enemy.faction,
        level: input.scenario.level ?? 100,
        reference: !input.scenario.enemyArchetypeId,
      },
      value: Number.isFinite(result.ttk.ttk) ? result.ttk.ttk : null,
      outcome: Number.isFinite(result.ttk.ttk) ? "killed" : "time_limit",
      confidence: "approximation",
      caveats: result.caveats,
    };
  }
  return response;
}
