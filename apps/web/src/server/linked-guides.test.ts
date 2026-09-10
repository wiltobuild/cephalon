import { expect, test } from "vitest";
import { linkedExaltedGuides, orionGuide } from "./linked-guides";
import frameData from "./warframe-guides.json";
import type { Guide } from "./guide-types";
const frames = frameData as Guide[];
import equipment from "./equipment-guides.json";
test("Orion applies the authored swaps without mutating Sirius", () => {
  const sirius = frames.find((g) => g.slug === "the-divided-star")!;
  const orion = orionGuide(sirius);
  expect(orion.mods.map((m) => m.name)).toEqual([
    "Blind Rage",
    "Umbral Intensify",
    "Overextended",
    "Augur Secrets",
    "Transient Fortitude",
    "Stretch",
    "Augur Reach",
    "Primed Flow",
  ]);
  expect(orion.auras).toEqual(["Growing Power"]);
  expect(orion.arcanes).toContain("Arcane Energize");
  expect(sirius.mods[2].name).toBe("Equilibrium");
});
test("Exalted tabs match the Warframe and include available variants", () => {
  const mesa = frames.find((g) => g.frame === "Mesa Prime")!;
  expect(linkedExaltedGuides(mesa, equipment).map((g) => g.frame)).toEqual([
    "Regulators Prime",
  ]);
  const titania = frames.find((g) => g.frame === "Titania Prime")!;
  expect(
    linkedExaltedGuides(titania, equipment).some((g) =>
      g.frame.includes("Diwata"),
    ),
  ).toBe(true);
  expect(
    linkedExaltedGuides(
      frames.find((g) => g.frame === "Revenant Prime")!,
      equipment,
    ),
  ).toEqual([]);
});
