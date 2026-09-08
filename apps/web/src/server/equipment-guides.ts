import "server-only";
import data from "./equipment-guides.json";
import type { Guide } from "./guide-types";
export const equipmentGuides: Guide[] = data;
export const categories = {
  weapons: "Weapon builds",
  primary: "Primary weapon builds",
  secondary: "Secondary weapon builds",
  melee: "Melee weapon builds",
  archwing: "Archwing weapon builds",
  companions: "Companion builds",
} as const;
export type Category = keyof typeof categories;
const sourceCategories: Record<string, Category> = {
  "Primary weapons": "primary",
  "Secondary weapons": "secondary",
  "Melee weapons": "melee",
  "Archwing weapons": "archwing",
  Companions: "companions",
};
export function categoryFor(g: Guide): Category {
  const category = sourceCategories[g.category];
  if (!category) throw new Error(`Unknown guide category: ${g.category}`);
  return category;
}
export function categoryGuides(c: Category) {
  return equipmentGuides.filter((g) =>
    c === "weapons"
      ? ["primary", "secondary", "melee"].includes(categoryFor(g))
      : categoryFor(g) === c,
  );
}
