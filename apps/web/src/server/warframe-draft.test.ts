import { test, expect } from "vitest";
import { calculateWarframeDraft } from "./warframe-draft";
import { catalog } from "./services";
import guides from "./warframe-guides.json";
function draft(g: (typeof guides)[number]) {
  const frame = [...catalog.getWarframesMap().values()].find(
    (w) => w.name === g.frame,
  )!;
  const mods = [...catalog.getModMap().values()];
  return {
    warframeId: frame.id,
    mods: [
      ...g.mods.map((m, i) => ({
        modId: mods.find((x) => x.name === m.name)!.id,
        rank: m.rank,
        slotIndex: i,
      })),
      ...[g.exilus, ...g.auras].map((s, i) => {
        const m = mods.find((x) => x.name === s.split(",")[0])!;
        return { modId: m.id, rank: m.maxRank, slotIndex: i + 8 };
      }),
    ],
    shards: g.shardSlots,
    includeShards: false,
  };
}
test("all approved sample configurations calculate without invalid mods", () => {
  for (const g of guides) {
    expect(() => calculateWarframeDraft(draft(g)), g.title).not.toThrow();
    expect(
      () => calculateWarframeDraft({ ...draft(g), includeShards: true }),
      g.title,
    ).not.toThrow();
  }
});
test("mod and shard edits recalculate ability stats and reject tampered effects", () => {
  const d = draft(guides[0]);
  const a = calculateWarframeDraft(d);
  const b = calculateWarframeDraft({
    ...d,
    mods: d.mods.filter((m) => m.modId !== "blind_rage"),
  });
  expect(b.stats.Strength).toBeLessThan(a.stats.Strength);
  const s = calculateWarframeDraft({
    ...d,
    shards: [
      { shardId: "crimson_tauforged", effect: "abilityStrength" },
      null,
      null,
      null,
      null,
    ],
    includeShards: true,
  });
  expect(s.stats.Strength - a.stats.Strength).toBeCloseTo(15);
  expect(() =>
    calculateWarframeDraft({
      ...d,
      shards: [
        { shardId: "amber_standard", effect: "abilityStrength" },
        null,
        null,
        null,
        null,
      ],
    }),
  ).toThrow();
});
