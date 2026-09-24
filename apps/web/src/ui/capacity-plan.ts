import {
  modCapacityAtRank,
  modSlotCapacityCost,
} from "@cephalon/services/capacity";
export type CapacitySlot = {
  index: number;
  drain: number;
  rank: number;
  polarity: string;
  target: string | null;
  group: string;
};
export function planCapacity(
  slots: CapacitySlot[],
  stock: Record<string, string[]>,
  capacity = 60,
) {
  const buckets = Object.entries(stock).flatMap(([group, values]) =>
    [...new Set(values)].map((p) => ({
      group,
      p,
      count: values.filter((v) => v === p).length,
    })),
  );
  type State = {
    used: number;
    counts: number[];
    forma: number;
    polarized: number;
    polarities: Record<number, string>;
  };
  let states = new Map<string, State>([
    [
      "start",
      {
        used: 0,
        counts: buckets.map(() => 0),
        forma: 0,
        polarized: 0,
        polarities: {},
      },
    ],
  ]);
  for (const slot of slots) {
    const next = new Map<string, State>();
    const choices =
      slot.target !== null
        ? [slot.target]
        : [
            ...new Set(["", slot.polarity, ...(stock[slot.group] ?? [])]),
          ].filter(
            (p) => p !== "universal" || (stock[slot.group] ?? []).includes(p),
          );
    for (const state of states.values())
      for (const p of choices) {
        const counts = [...state.counts];
        const bucket = buckets.findIndex(
          (b) => b.group === slot.group && b.p === p,
        );
        const free = bucket >= 0 && counts[bucket] < buckets[bucket].count;
        if (free) counts[bucket]++;
        const used =
          state.used +
          modSlotCapacityCost(
            modCapacityAtRank(slot.drain, slot.rank),
            p,
            slot.polarity,
          );
        const candidate = {
          used,
          counts,
          forma: state.forma + Number(!free),
          polarized: state.polarized + Number(Boolean(p)),
          polarities: { ...state.polarities, [slot.index]: p },
        };
        const key = used + ":" + counts.join(",");
        const previous = next.get(key);
        if (
          !previous ||
          candidate.forma < previous.forma ||
          (candidate.forma === previous.forma &&
            candidate.polarized < previous.polarized)
        )
          next.set(key, candidate);
      }
    states = next;
  }
  const candidates = [...states.values()];
  const fitted = candidates
    .filter((s) => s.used <= capacity)
    .sort(
      (a, b) =>
        a.forma - b.forma || a.polarized - b.polarized || a.used - b.used,
    )[0];
  const best =
    fitted ??
    candidates.sort((a, b) => a.used - b.used || a.forma - b.forma)[0];
  return {
    polarities: best?.polarities ?? {},
    forma: best?.forma ?? 0,
    used: best?.used ?? 0,
    fits: !!fitted,
  };
}
export function layoutForma(
  polarities: Record<number, string>,
  stock: Record<string, string[]>,
  groups: Record<number, string>,
) {
  const remaining = Object.fromEntries(
    Object.entries(stock).map(([g, p]) => [g, [...p]]),
  );
  let cost = 0;
  for (const index of Object.keys(groups)) {
    const p = polarities[Number(index)] ?? "";
    const pool = remaining[groups[Number(index)] ?? "regular"] ?? [];
    const at = pool.indexOf(p);
    if (at < 0) cost++;
    else pool.splice(at, 1);
  }
  return cost;
}
