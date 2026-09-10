import "server-only";
import samples from "./warframe-guides.json";
import { catalog } from "./services";
import type { Guide } from "./guide-types";
export const guides: Guide[] = samples as Guide[];
export function guideDetails(slug: string, override?: Guide) {
  const source = override ?? guides.find((g) => g.slug === slug);
  const guide =
    source?.frame.includes("Sirius") &&
    source.shardSlots.every((s) => s === null)
      ? {
          ...source,
          shardSlots: [
            { shardId: "amber_standard", effect: "castingSpeed" },
            { shardId: "amber_standard", effect: "castingSpeed" },
            ...Array.from({ length: 3 }, () => ({
              shardId: "crimson_standard",
              effect: "abilityStrength",
            })),
          ],
        }
      : source;
  if (!guide) return null;
  const frame = [...catalog.getWarframesMap().values()].find(
    (w) => w.name === guide.frame.replace("Sirius and Orion", "Sirius & Orion"),
  );
  const mods = [...catalog.getModMap().values()];
  return {
    guide,
    frame,
    mods: guide.mods.map((slot) => {
      const mod = mods.find((m) => m.name === slot.name);
      return {
        ...slot,
        card: {
          id: mod?.id ?? slot.name,
          name: slot.name,
          rarity: mod?.rarity ?? "rare",
          polarity: mod?.polarity ?? "",
          maxRank: mod?.maxRank ?? slot.rank,
          drain: mod?.drain ?? 0,
          primaryEffect: mod?.description ?? slot.note,
        },
      };
    }),
  };
}
