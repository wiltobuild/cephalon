import { describe, expect, test } from "vitest";
import { POST } from "@/app/api/build/weapon/route";
import { builds } from "./services";
describe("weapon builder server wiring", () => {
  test("simulation horizon is explicit and never becomes zero", async () => {
    const response = await POST(
      new Request("http://localhost/api/build/weapon", {
        method: "POST",
        body: JSON.stringify({
          weaponId: "braton",
          modSlots: [],
          scenario: {
            headshots: false,
            statusTypesOnTarget: 0,
            killStacks: 0,
            arcaneStacks: 0,
            enemyArchetypeId: "heavy_gunner",
            level: 100,
          },
        }),
      }),
    );
    const data = await response.json();
    expect(data.ttk.outcome).toBe("time_limit");
    expect(data.ttk.value).toBeNull();
    expect(data.rawStats).toBeUndefined();
    expect(
      data.ttk.caveats.some(
        (c: { key: string }) => c.key === "legacyResistances",
      ),
    ).toBe(true);
  });
  test.each([
    null,
    {},
    { weaponId: "braton", modSlots: [null] },
    {
      weaponId: "braton",
      modSlots: [],
      scenario: {
        headshots: false,
        statusTypesOnTarget: -1,
        killStacks: 0,
        arcaneStacks: 0,
      },
    },
  ])("malformed requests fail cleanly", async (input) => {
    const response = await POST(
      new Request("http://localhost/api/build/weapon", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    );
    expect(response.status).toBe(400);
  });
  test.each([
    {
      weaponId: "braton",
      modSlots: [],
      scenario: {
        headshots: false,
        statusTypesOnTarget: 0,
        killStacks: 0,
        arcaneStacks: 0,
      },
    },
    {
      weaponId: "braton",
      modSlots: [
        { modId: "serration_r3", rank: 10, slotIndex: 0 },
        { modId: "split_chamber_r3", rank: 5, slotIndex: 1 },
      ],
      scenario: {
        headshots: false,
        statusTypesOnTarget: 0,
        killStacks: 0,
        arcaneStacks: 0,
      },
    },
    {
      weaponId: "braton",
      modSlots: [],
      scenario: {
        headshots: true,
        statusTypesOnTarget: 3,
        killStacks: 0,
        arcaneStacks: 0,
        enemyArchetypeId: "heavy_gunner",
        level: 190,
        steelPath: true,
      },
    },
  ])("POST matches direct calculation for $weaponId", async (input) => {
    const direct = builds.calculateWeapon(input);
    const response = await POST(
      new Request("http://localhost/api/build/weapon", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    );
    expect(response.status).toBe(200);
    const result = (await response.json()) as typeof direct;
    for (const key of ["sustainedDps", "burstDps", "totalDamage"] as const) {
      expect(result.stats.find((stat) => stat.key === key)?.value).toBe(
        direct.stats.find((stat) => stat.key === key)?.value,
      );
    }
  });
});
