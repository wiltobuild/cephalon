import { describe, expect, test } from "vitest";
import { POST } from "@/app/api/build/weapon/route";
import { builds } from "./services";
describe("weapon builder server wiring", () => {
  test.each([
    { weaponId: "braton", modSlots: [], scenario: { headshots: false, statusTypesOnTarget: 0, killStacks: 0, arcaneStacks: 0 } },
    { weaponId: "braton", modSlots: [{ modId: "serration_r3", rank: 10, slotIndex: 0 }, { modId: "split_chamber_r3", rank: 5, slotIndex: 1 }], scenario: { headshots: false, statusTypesOnTarget: 0, killStacks: 0, arcaneStacks: 0 } },
    { weaponId: "braton", modSlots: [], scenario: { headshots: true, statusTypesOnTarget: 3, killStacks: 0, arcaneStacks: 0, enemyArchetypeId: "heavy_gunner", level: 190, steelPath: true } },
  ])("POST matches direct calculation for $weaponId", async (input) => {
    const direct = builds.calculateWeapon(input);
    const response = await POST(new Request("http://localhost/api/build/weapon", { method: "POST", body: JSON.stringify(input) }));
    expect(response.status).toBe(200);
    const result = await response.json() as typeof direct;
    for (const key of ["sustainedDps", "burstDps", "totalDamage"] as const) {
      expect(result.stats.find((stat) => stat.key === key)?.value).toBe(direct.stats.find((stat) => stat.key === key)?.value);
    }
  });
});
