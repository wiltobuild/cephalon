import type { Guide } from "./guide-types";
const exalted: Record<string, string[]> = {
  Mesa: ["Regulators"],
  Titania: ["Dex Pixia", "Diwata"],
  Excalibur: ["Exalted"],
  Ivara: ["Artemis Bow"],
  Hildryn: ["Balefire"],
  Dante: ["Noctua"],
  Jade: ["Glory"],
  Valkyr: ["Valkyr"],
  Wukong: ["Iron Staff"],
  Baruuk: ["Desert Wind"],
  Khora: ["Whipclaw"],
  Ash: ["Shadow Clones"],
  Atlas: ["Landslide"],
  Gara: ["Shattered Lash"],
  Sevagoth: ["Shadow Claws"],
};
export function linkedExaltedGuides(g: Guide, equipment: Guide[]) {
  const prefixes = exalted[g.frame.split(" ")[0]] ?? [];
  return equipment.filter((e) =>
    prefixes.some((prefix) => e.frame.startsWith(prefix)),
  );
}
export function orionGuide(g: Guide): Guide {
  const replacements: Record<string, string> = {
    "Primed Continuity": "Augur Reach",
    Equilibrium: "Overextended",
    "Archon Vitality": "Augur Secrets",
  };
  return {
    ...g,
    subtitle: "Orion configuration · armour strip and Celestial Clash",
    mods: g.mods.map((m) =>
      replacements[m.name]
        ? {
            ...m,
            name: replacements[m.name],
            rank: 5,
            polarity: "",
            note: "Orion variant from the guide",
          }
        : m,
    ),
    auras: ["Growing Power"],
    aura: "Growing Power",
    arcanes: g.arcanes.map((a) =>
      a === "Molt Augmented" ? "Arcane Energize" : a,
    ),
    buildText:
      g.sections.find((s) => s.title === "Orion's differences")?.text ??
      g.buildText,
  };
}
