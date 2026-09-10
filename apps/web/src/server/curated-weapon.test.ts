import { test, expect } from "vitest";
import { curatedWeapon } from "./curated-weapon";
import { calculateResponse } from "./calculate-response";
import guides from "./equipment-guides.json";
import type { Guide } from "./guide-types";
import { layoutForma, planCapacity } from "@/ui/capacity-plan";
test("Torid loads a valid build and its displayed Forma matches the fitted layout", () => {
  const plan = curatedWeapon(
    guides.find((g) => g.slug === "the-chaining-rot")! as Guide,
  )!;
  const result = calculateResponse(plan.initialBuild);
  expect(result.capacityUsed).toBeLessThanOrEqual(plan.initialBuild.capacity!);
  expect(plan.initialBuild.modSlots).toHaveLength(9);
  expect(
    layoutForma(
      plan.initialBuild.slotPolarities!,
      plan.stock,
      Object.fromEntries(
        Array.from({ length: 9 }, (_, i) => [
          i,
          i === 8 ? "exilus" : "regular",
        ]),
      ),
    ),
  ).toBe(plan.forma);
});
test("capacity planner uses native polarities and the fewest additional Forma", () => {
  const slots = Array.from({ length: 8 }, (_, index) => ({
    index,
    drain: 6,
    rank: 4,
    polarity: "madurai",
    target: null,
    group: "regular",
  }));
  const plan = planCapacity(
    slots,
    { regular: ["madurai", ...Array(7).fill("")] },
    60,
  );
  expect(plan.fits).toBe(true);
  expect(plan.used).toBe(60);
  expect(plan.forma).toBe(3);
  expect(layoutForma({}, { regular: ["madurai"] }, { 0: "regular" })).toBe(1);
});
test("a matching aura increases the available capacity", () => {
  const plan = planCapacity(
    [
      {
        index: 0,
        drain: -2,
        rank: 5,
        polarity: "naramon",
        target: "naramon",
        group: "aura",
      },
    ],
    { aura: ["naramon"] },
  );
  expect(plan.used).toBe(-14);
  expect(plan.forma).toBe(0);
});
test("all fitted curated weapon layouts validate; impossible ranks remain explicit", () => {
  const failures: string[] = [];
  for (const g of guides) {
    const plan = curatedWeapon(g as Guide);
    if (!plan) continue;
    if (
      plan.warnings.some((w) => w.startsWith("Even fully matching polarities exceed"))
    ) {
      expect(g.slug).toBe("the-charged-fist");
      continue;
    }
    try {
      calculateResponse(plan.initialBuild);
    } catch (e) {
      failures.push(g.slug + ": " + String(e));
    }
  }
  expect(failures).toEqual([]);
}, 120000);
