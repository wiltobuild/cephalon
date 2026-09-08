import "server-only";
import samples from "./warframe-guides.json";
import { catalog } from "./services";
import type { Guide } from "./guide-types";
export const guides: Guide[] = samples as Guide[];
export function guideDetails(slug: string) {
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return null;
  const frame = [...catalog.getWarframesMap().values()].find(
    (w) => w.name === guide.frame,
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
