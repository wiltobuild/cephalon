import { describe, expect, test } from "vitest";
import { POST } from "@/app/api/build/weapon/route";
import { builds } from "./services";
describe("weapon builder server wiring", () => {
  test("POST-equivalent matches direct BuildService calculation for Braton", async () => {
    const input = { weaponId: "braton", modSlots: [{ modId: "serration_r3", rank: 10, slotIndex: 0 }, { modId: "split_chamber_r3", rank: 5, slotIndex: 1 }], scenario: { headshots: false, statusTypesOnTarget: 0, killStacks: 0, arcaneStacks: 0 } };
    const direct = builds.calculateWeapon(input);
    const response = await POST(new Request("http://localhost/api/build/weapon", { method: "POST", body: JSON.stringify(input) }));
    const result = await response.json() as typeof direct;
    expect(result.stats.find((stat) => stat.key === "sustainedDps")?.value).toBe(direct.stats.find((stat) => stat.key === "sustainedDps")?.value);
  });
});
