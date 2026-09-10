import { test, expect } from "vitest";
import {
  slotPolarity,
  guidePolarities,
  auditedForma,
} from "./guide-polarities";
import guides from "./warframe-guides.json";
import type { Guide } from "./guide-types";
test("slots keep authored polarity separate from the mod polarity", () => {
  const g = guides.find((g) => g.slug === "the-caged-beast")! as Guide;
  expect(guidePolarities(g)[0]).toBe("");
  expect(guidePolarities(g)[1]).toBe("madurai");
  expect(slotPolarity("aura slot")).toBeNull();
  expect(auditedForma(g).count).toBeNull();
  const clarified = { ...g, auras: ["Corrosive Projection, Naramon polarity"] };
  expect(auditedForma(clarified).count).toBe(3);
});
test("stock polarities are reused before counting Forma", () => {
  const g = guides.find((g) => g.frame === "Valkyr Prime")! as Guide;
  const layout = {
    ...g,
    mods: g.mods.map((m, i) => ({
      ...m,
      polarity: i < 3 ? "Madurai" : "unpolarised",
    })),
    exilus: "unpolarised",
    auras: ["Madurai polarity"],
  };
  expect(auditedForma(layout).count).toBe(0);
});
