import { catalog, builds } from "./services";
export function calculateWarframeDraft(input: unknown) {
  if (!input || typeof input !== "object") throw new Error("Invalid build.");
  const b = input as {
    warframeId: string;
    form?: "sirius" | "orion";
    mods: { modId: string; rank: number; slotIndex: number }[];
    shards: ({ shardId: string; effect: string } | null)[];
    includeShards: boolean;
  };
  if (
    b.form !== undefined &&
    (b.warframeId !== "sirius_orion" || !["sirius", "orion"].includes(b.form))
  )
    throw new Error("Invalid Warframe form.");
  const frame = catalog.getWarframe(b.warframeId);
  if (!frame) throw new Error("Unknown Warframe.");
  if (
    !Array.isArray(b.mods) ||
    b.mods.length > 11 ||
    !Array.isArray(b.shards) ||
    b.shards.length !== 5 ||
    typeof b.includeShards !== "boolean"
  )
    throw new Error("Invalid slots.");
  const eligible = catalog.compatibleWarframeMods(frame.id),
    seen = new Set<string>(),
    slots = new Set<number>();
  for (const slot of b.mods) {
    const mod = eligible.find((m) => m.id === slot.modId);
    if (
      !mod ||
      !Number.isInteger(slot.rank) ||
      slot.rank < 0 ||
      slot.rank > mod.maxRank ||
      !Number.isInteger(slot.slotIndex) ||
      slot.slotIndex < 0 ||
      slot.slotIndex > (frame.id === "jade" ? 10 : 9)
    )
      throw new Error(`Invalid mod or rank: ${slot.modId}.`);
    const kind =
      slot.slotIndex < 8 ? "regular" : slot.slotIndex === 8 ? "exilus" : "aura";
    if (
      kind === "aura"
        ? mod.slotKind !== "aura"
        : kind === "exilus"
          ? mod.slotKind !== "exilus"
          : mod.slotKind === "aura"
    )
      throw new Error(
        `Mod ${mod.name} (${mod.slotKind}) is not compatible with ${kind}.`,
      );
    const family = mod.name.replace(/^(Primed|Umbral|Archon) /, "");
    if (seen.has(family) || slots.has(slot.slotIndex))
      throw new Error("Duplicate mods or variants are not allowed.");
    seen.add(family);
    slots.add(slot.slotIndex);
  }
  const shards = b.shards.map((s, i) => {
    if (!s) return null;
    const shard = catalog.getArchonShards().find((a) => a.id === s.shardId);
    if (!shard || !Object.hasOwn(shard.statBonuses, s.effect))
      throw new Error("Invalid shard effect.");
    return {
      shardId: shard.id,
      shardColor: shard.color,
      shardTier: shard.tier,
      selectedBonus: s.effect,
      bonusValue: shard.statBonuses[s.effect],
      slotIndex: i,
    };
  });
  const calculation = builds.calculateWarframe({
    warframeId: frame.id,
    form: b.form,
    modSlots: b.mods,
    archonShards: b.includeShards ? shards : [],
  });
  const raw = calculation.rawStats;
  if (!("abilityStrength" in raw)) throw new Error("Invalid calculation.");
  return {
    confidence: {
      ...Object.fromEntries(
        calculation.stats.map((s) => [s.label.toLowerCase(), s.confidence]),
      ),
      Strength: "approximation" as const,
      Duration: "approximation" as const,
      Range: "approximation" as const,
      Efficiency: "approximation" as const,
    },
    caveats: calculation.caveats,
    stats: {
      Strength: raw.abilityStrength * 100,
      Duration: raw.abilityDuration * 100,
      Range: raw.abilityRange * 100,
      Efficiency: raw.abilityEfficiency * 100,
    },
    pools: {
      health: raw.totalHealth,
      shield: raw.totalShield,
      armor: raw.totalArmor,
      energy: raw.totalEnergy,
    },
    extras: {
      "Casting speed": raw.castingSpeedBonus * 100,
      "Parkour velocity": raw.parkourVelocityBonus * 100,
      "Melee critical damage": raw.meleeCritDamageBonus * 100,
      "Health regeneration /s": raw.healthRegenPerSec,
    },
  };
}
