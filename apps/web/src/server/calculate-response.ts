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
  if (input.scenario.enemyArchetypeId) {
    const result = sims.simulate(calculated, {
      enemyArchetypeId: input.scenario.enemyArchetypeId,
      level: input.scenario.level ?? 100,
      steelPath: input.scenario.steelPath,
    });
    response.ttk = {
      value: Number.isFinite(result.ttk.ttk) ? result.ttk.ttk : null,
      outcome: Number.isFinite(result.ttk.ttk) ? "killed" : "time_limit",
      confidence: "approximation",
      caveats: result.caveats,
    };
  }
  return response;
}
