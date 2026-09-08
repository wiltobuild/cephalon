import {
  calculateWeaponBuildWithArcanes,
  calculateTTK,
  modCapacityAtRank,
  modSlotCapacityCost,
} from "@cephalon/engine";
import type { Mod, ModSlot } from "@cephalon/engine";
import type { CatalogService } from "../catalog/catalog-service";
import type { WeaponBuildInput } from "../build/build-service";
import { scenarioToSimulationParams } from "../build/scenario";
import {
  capacityCost,
  validateWeaponBuild,
  weaponModExclusions,
} from "../build/validation";

export type OptimizeOptions = {
  target: "general" | "Grineer" | "Corpus" | "Infested" | "Corrupted";
  goal: "sustained" | "burst" | "ttk";
  damage:
    | "auto"
    | "heat"
    | "toxin"
    | "viral"
    | "corrosive"
    | "magnetic"
    | "radiation"
    | "blast"
    | "gas"
    | "viral_heat"
    | "corrosive_heat";
  maxForma: number;
  lockedSlots: number[];
  ownedModIds?: string[];
  allowAccuracyPenalty?: boolean;
};
export type OptimizationResult = {
  build: WeaponBuildInput;
  score: number;
  evaluated: number;
  forma: number;
  capacityUsed: number;
  status: "best_found";
  version: string;
  candidateCount: number;
  explanation: string[];
  matrix: {
    faction: string;
    enemy: string;
    sustainedDps: number;
    ttk: number | null;
    peakViralStacks: number;
    peakCorrosiveStacks: number;
  }[];
};
type Candidate = {
  slots: ModSlot[];
  polarities: Record<number, string>;
  forma: number;
  cost: number;
  score: number;
  key: string;
  matches: boolean;
};
const PRESETS = ["heavy_gunner", "tech", "ancient_healer", "corrupted_heavy"];
const DAMAGE = [
  "auto",
  "heat",
  "toxin",
  "viral",
  "corrosive",
  "magnetic",
  "radiation",
  "blast",
  "gas",
  "viral_heat",
  "corrosive_heat",
];
const requirements = (damage: string) =>
  damage === "auto" ? [] : damage.split("_");
const hasElements = (
  elements: { type: string; value: number }[],
  damage: string,
) =>
  requirements(damage).every((required) =>
    elements.some((element) => element.type === required && element.value > 0),
  );
const directStats = new Set([
  "damage",
  "multishot",
  "criticalChance",
  "criticalMultiplier",
  "statusChance",
  "statusDuration",
  "statusDamage",
  "slashOnCrit",
  "slashOnImpactProc",
  "fireRate",
  "reloadSpeed",
  "magazine",
  "heat",
  "cold",
  "toxin",
  "electricity",
  "viral",
  "corrosive",
  "magnetic",
  "radiation",
  "blast",
  "gas",
  "slash",
  "puncture",
  "impact",
  "factionDamageGrineer",
  "factionDamageCorpus",
  "factionDamageInfested",
  "factionDamageCorrupted",
]);
const order = (a: Candidate, b: Candidate) =>
  b.score - a.score ||
  a.forma - b.forma ||
  a.cost - b.cost ||
  a.key.localeCompare(b.key, "en");

/** Bounded deterministic beam search. It deliberately makes no global-optimality claim. */
export class OptimizerService {
  constructor(private readonly catalog: CatalogService) {}
  async optimize(
    input: WeaponBuildInput,
    options: OptimizeOptions,
    signal?: AbortSignal,
  ): Promise<OptimizationResult> {
    if (signal?.aborted) throw new Error("Optimization cancelled.");
    validateWeaponBuild(this.catalog, input);
    if (
      !options ||
      !["general", "Grineer", "Corpus", "Infested", "Corrupted"].includes(
        options.target,
      ) ||
      !["sustained", "burst", "ttk"].includes(options.goal) ||
      !DAMAGE.includes(options.damage) ||
      !Number.isInteger(options.maxForma) ||
      options.maxForma < 0 ||
      options.maxForma > 8 ||
      !Array.isArray(options.lockedSlots) ||
      options.lockedSlots.some((i) => !Number.isInteger(i) || i < 0 || i > 8) ||
      (options.allowAccuracyPenalty !== undefined &&
        typeof options.allowAccuracyPenalty !== "boolean")
    )
      throw new Error("Invalid optimizer constraints.");
    if (
      options.ownedModIds &&
      (!Array.isArray(options.ownedModIds) ||
        options.ownedModIds.length > 3000 ||
        options.ownedModIds.some((id) => typeof id !== "string"))
    )
      throw new Error("Invalid owned-mod list.");
    const weapon = this.catalog.getWeapon(input.weaponId)!;
    if (
      ![
        "rifle",
        "shotgun",
        "bow",
        "pistol",
        "secondary",
        "dual_pistols",
        "launcher",
      ].includes(weapon.category) ||
      weapon.isExalted
    )
      throw new Error(
        "Optimization currently supports ordinary primary and secondary weapons in their catalog base form. This weapon needs additional mechanic coverage.",
      );
    if (input.incarnonStatChanges || input.rivenStatChanges)
      throw new Error(
        "Clear custom Riven or Incarnon overrides before using this solver.",
      );
    const targets = this.catalog
      .getEnemyTypes()
      .filter(
        (e) =>
          PRESETS.includes(e.id) &&
          (options.target === "general" || e.faction === options.target),
      );
    const mods = this.catalog.getModMap();
    const arcanes = (input.arcaneIds ?? []).map((id) =>
      this.catalog.getArcanes().find((a) => a.id === id)!,
    );
    const reducesAccuracy = (mod: Mod) =>
      mod.id === "heavy_caliber" || (mod.stats.accuracy ?? 0) < 0;
    const factionMod = (mod: Mod) =>
      /\b(bane|expel|cleanse|smite)\b/i.test(mod.name) ||
      Object.keys(mod.stats).some((k) => /faction/i.test(k));
    const pool = this.catalog
      .compatibleMods(weapon.id)
      .map((m) => mods.get(m.id)!)
      .filter(
        (m) =>
          Object.keys(m.stats).some(
            (k) => directStats.has(k) || /^faction/.test(k),
          ) &&
          (options.target !== "general" || !factionMod(m)),
      )
      .filter((m) => options.allowAccuracyPenalty || !reducesAccuracy(m))
      .filter(
        (m) => !options.ownedModIds || options.ownedModIds.includes(m.id),
      );
    const locked = input.modSlots.filter(
      (slot) =>
        options.lockedSlots.includes(slot.slotIndex) ||
        slot.slotIndex === weapon.modSlots,
    );
    if (
      options.target === "general" &&
      locked.some((s) => factionMod(mods.get(s.modId)!))
    )
      throw new Error(
        "General-use builds exclude faction mods. Unlock or remove the faction mod.",
      );
    if (
      options.ownedModIds &&
      locked.some((s) => !options.ownedModIds!.includes(s.modId))
    )
      throw new Error("A locked mod is missing from your owned-mod list.");
    const conflicts = new Map<string, Set<string>>();
    for (const group of weaponModExclusions(this.catalog))
      for (const id of group)
        conflicts.set(id, new Set([...(conflicts.get(id) ?? []), ...group]));
    const baseline = targets.map((enemy) => {
      const stats = calculateWeaponBuildWithArcanes(
        weapon,
        [],
        mods,
        arcanes,
        undefined,
        scenarioToSimulationParams({
          ...input.scenario,
          faction: enemy.faction,
        }),
      );
      return {
        dps: Math.max(stats.sustainedDps, 1),
        ttk: Math.min(
          600,
          calculateTTK(
            stats,
            enemy,
            input.scenario.level ?? 100,
            input.scenario.steelPath,
          ).ttk,
        ),
      };
    });
    let evaluated = 0;
    const seen = new Map<string, Candidate | null>();
    const evaluate = (slots: ModSlot[]): Candidate | null => {
      const sorted = [...slots].sort((a, b) => a.slotIndex - b.slotIndex);
      const key = sorted
        .map((s) => `${s.slotIndex}:${s.modId}:${s.rank}`)
        .join("|");
      if (seen.has(key)) return seen.get(key)!;
      const ids = sorted.map((s) => s.modId);
      if (
        new Set(sorted.map((s) => mods.get(s.modId)!.name.toLowerCase()))
          .size !== sorted.length ||
        ids.some((id, i) =>
          ids.slice(i + 1).some((other) => conflicts.get(id)?.has(other)),
        )
      ) {
        seen.set(key, null);
        return null;
      }
      const polarities = { ...input.slotPolarities };
      const choices = sorted
        .map((s) => {
          const m = mods.get(s.modId)!,
            drain = modCapacityAtRank(m.drain, s.rank);
          return {
            index: s.slotIndex,
            polarity: m.polarity,
            saving:
              modSlotCapacityCost(drain, polarities[s.slotIndex], m.polarity) -
              modSlotCapacityCost(drain, m.polarity, m.polarity),
          };
        })
        .filter(
          (c) =>
            c.saving > 0 &&
            c.polarity !== "umbra" &&
            c.polarity !== "universal",
        )
        .sort((a, b) => b.saving - a.saving || a.index - b.index);
      let cost = capacityCost(this.catalog, sorted, polarities),
        forma = 0;
      for (const choice of choices) {
        if (cost <= (input.capacity ?? 60) || forma >= options.maxForma) break;
        polarities[choice.index] = choice.polarity;
        cost -= choice.saving;
        forma++;
      }
      if (cost > (input.capacity ?? 60)) {
        seen.set(key, null);
        return null;
      }
      evaluated++;
      let score = 0,
        matches = options.damage === "auto";
      for (let i = 0; i < targets.length; i++) {
        const enemy = targets[i];
        const stats = calculateWeaponBuildWithArcanes(
          weapon,
          sorted,
          mods,
          arcanes,
          undefined,
          scenarioToSimulationParams({
            ...input.scenario,
            faction: enemy.faction,
          }),
        );
        matches ||= hasElements(stats.elements, options.damage);
        if (options.goal === "ttk") {
          const ttk = calculateTTK(
            stats,
            enemy,
            input.scenario.level ?? 100,
            input.scenario.steelPath,
          ).ttk;
          score += Number.isFinite(ttk)
            ? 1 + Math.log1p(baseline[i].ttk / Math.max(ttk, 0.001))
            : Math.min(0.99, stats.sustainedDps / baseline[i].dps / 100000);
        } else
          score += Math.log1p(
            (options.goal === "burst" ? stats.burstDps : stats.sustainedDps) /
              baseline[i].dps,
          );
      }
      const candidate = {
        slots: sorted,
        polarities,
        forma,
        cost,
        score: score / targets.length,
        key,
        matches,
      };
      seen.set(key, candidate);
      return candidate;
    };
    // Rank the pool using actual single-mod evaluations, while retaining elemental options.
    const ranked = pool
      .map((m) => ({
        mod: m,
        score:
          evaluate([{ modId: m.id, rank: m.maxRank, slotIndex: 0 }])?.score ??
          0,
      }))
      .sort(
        (a, b) => b.score - a.score || a.mod.id.localeCompare(b.mod.id, "en"),
      );
    const selected = [
      ...new Map(
        [
          ...ranked.slice(0, 28),
          ...ranked.filter((r) =>
            [
              "statusDuration",
              "statusDamage",
              "slashOnCrit",
              "slashOnImpactProc",
            ].some((k) => r.mod.stats[k]),
          ),
          ...ranked.filter((r) =>
            [
              "heat",
              "cold",
              "toxin",
              "electricity",
              "viral",
              "corrosive",
              "magnetic",
              "radiation",
              "blast",
              "gas",
            ].some((k) => r.mod.stats[k]),
          ),
        ].map((r) => [r.mod.id, r.mod]),
      ).values(),
    ];
    let beam = [evaluate(locked)].filter((v): v is Candidate => !!v);
    if (!beam.length)
      throw new Error("Locked mods exceed the investment budget.");
    const finalists = [...beam];
    // Construct ordered elemental skeletons before greedy damage growth. A weak
    // Cold or Toxin mod alone must not eliminate a powerful Viral combination.
    const plans =
      options.damage === "auto"
        ? [
            "viral_heat",
            "corrosive_heat",
            "viral",
            "corrosive",
            "magnetic",
            "radiation",
            "blast",
            "gas",
          ]
        : [options.damage];
    const elemental = new Map<string, Mod>();
    for (const type of [
      "heat",
      "cold",
      "toxin",
      "electricity",
      "viral",
      "corrosive",
      "magnetic",
      "radiation",
      "blast",
      "gas",
    ]) {
      const choices = pool.filter((mod) => (mod.stats[type] ?? 0) > 0);
      const cheapest = [...choices].sort(
        (a, b) => a.drain - b.drain || a.id.localeCompare(b.id, "en"),
      )[0];
      const strongest = [...choices].sort(
        (a, b) =>
          (b.stats[type] ?? 0) * (b.maxRank + 1) +
            (b.stats.statusChance ?? 0) * (b.maxRank + 1) -
            ((a.stats[type] ?? 0) * (a.maxRank + 1) +
              (a.stats.statusChance ?? 0) * (a.maxRank + 1)) ||
          a.id.localeCompare(b.id, "en"),
      )[0];
      if (cheapest) elemental.set(cheapest.id, cheapest);
      if (strongest) elemental.set(strongest.id, strongest);
      const status = [...choices].sort(
        (a, b) =>
          (b.stats.statusChance ?? 0) * (b.maxRank + 1) -
            (a.stats.statusChance ?? 0) * (a.maxRank + 1) ||
          a.id.localeCompare(b.id, "en"),
      )[0];
      if (status) elemental.set(status.id, status);
    }
    const seedLists = new Map<
      string,
      { slots: ModSlot[]; paper: number; cost: number; procs: number }[]
    >();
    const free = Array.from({ length: 8 }, (_, i) => i).filter(
      (i) => !locked.some((slot) => slot.slotIndex === i),
    );
    let seedChecks = 0;
    const growSeed = async (
      slots: ModSlot[],
      depth: number,
      maxRank: boolean,
    ): Promise<void> => {
      if (depth > 0) {
        if (signal?.aborted) throw new Error("Optimization cancelled.");
        if (++seedChecks % 64 === 0)
          await new Promise((resolve) => setTimeout(resolve, 0));
        const stats = calculateWeaponBuildWithArcanes(
          weapon,
          slots,
          mods,
          arcanes,
          undefined,
          scenarioToSimulationParams(input.scenario),
        );
        const cost = capacityCost(this.catalog, slots, input.slotPolarities);
        for (const plan of plans)
          if (hasElements(stats.elements, plan)) {
            const list = seedLists.get(plan) ?? [];
            list.push({
              slots,
              paper: stats.sustainedDps,
              cost,
              procs: stats.statusChance * stats.multishot * stats.fireRate,
            });
            seedLists.set(plan, list);
          }
      }
      if (depth >= Math.min(3, free.length)) return;
      for (const mod of elemental.values()) {
        if (
          slots.some(
            (s) =>
              s.modId === mod.id ||
              mods.get(s.modId)!.name === mod.name ||
              conflicts.get(s.modId)?.has(mod.id),
          )
        )
          continue;
        await growSeed(
          [
            ...slots,
            {
              modId: mod.id,
              rank: maxRank ? mod.maxRank : 0,
              slotIndex: free[depth],
            },
          ],
          depth + 1,
          maxRank,
        );
      }
    };
    await growSeed(locked, 0, true);
    await growSeed(locked, 0, false);
    const seeds: Candidate[] = [];
    for (const list of seedLists.values()) {
      // Preserve both damage and cheap feasible skeletons under tight budgets.
      const shortlist = [
        ...[...list]
          .sort((a, b) => b.procs - a.procs || b.paper - a.paper)
          .slice(0, 6),
        ...[...list].sort((a, b) => b.paper - a.paper).slice(0, 6),
        ...[...list]
          .sort((a, b) => a.cost - b.cost || b.paper - a.paper)
          .slice(0, 6),
      ];
      for (const seed of shortlist) {
        const candidate = evaluate(seed.slots);
        if (candidate) seeds.push(candidate);
      }
    }
    finalists.push(...seeds);
    beam = [
      ...new Map(
        [...beam, ...seeds]
          .sort(order)
          .map((candidate) => [candidate.key, candidate]),
      ).values(),
    ].slice(0, 8);
    if (options.damage !== "auto") {
      beam = [
        ...new Map(
          [...beam, ...seeds]
            .filter((candidate) => candidate.matches)
            .sort(order)
            .map((candidate) => [candidate.key, candidate]),
        ).values(),
      ].slice(0, 8);
      if (!beam.length)
        throw new Error(
          `No feasible ${options.damage.replace(/_/g, " + ")} combination found with the available elemental mods, locked slot order and capacity. Add the required elemental mods, unlock a slot, or increase capacity/Forma. Your build was not changed.`,
        );
    }
    const currentAllowed = input.modSlots.every(
      (s) =>
        (options.allowAccuracyPenalty ||
          !reducesAccuracy(mods.get(s.modId)!) ||
          options.lockedSlots.includes(s.slotIndex)) &&
        (!options.ownedModIds || options.ownedModIds.includes(s.modId)) &&
        (options.target !== "general" || !factionMod(mods.get(s.modId)!)),
    );
    const current = currentAllowed ? evaluate(input.modSlots) : null;
    if (current) finalists.push(current);
    for (
      let depth = locked.filter((s) => s.slotIndex < weapon.modSlots).length;
      depth < Math.min(8, weapon.modSlots);
      depth++
    ) {
      const next: Candidate[] = [];
      for (const candidate of beam) {
        const index = Array.from({ length: 8 }, (_, i) => i).find(
          (i) => !candidate.slots.some((s) => s.slotIndex === i),
        );
        if (index === undefined) continue;
        for (const mod of selected) {
          if (candidate.slots.some((s) => s.modId === mod.id)) continue;
          for (const rank of [
            ...new Set([mod.maxRank, Math.max(0, mod.maxRank - 2), 0]),
          ]) {
            if (signal?.aborted) throw new Error("Optimization cancelled.");
            const result = evaluate([
              ...candidate.slots,
              { modId: mod.id, rank, slotIndex: index },
            ]);
            if (result && (options.damage === "auto" || result.matches))
              next.push(result);
          }
        }
        // Yield between bounded batches so cancelled requests and ordinary edits can proceed.
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      next.sort(order);
      beam = [...new Map(next.map((c) => [c.key, c])).values()].slice(0, 5);
      finalists.push(...beam);
      if (!beam.length) break;
    }
    // Check elemental-order swaps without moving locked slots.
    for (const candidate of [...beam])
      for (let a = 0; a < candidate.slots.length; a++)
        for (let b = a + 1; b < candidate.slots.length; b++) {
          if (
            options.lockedSlots.includes(candidate.slots[a].slotIndex) ||
            options.lockedSlots.includes(candidate.slots[b].slotIndex) ||
            candidate.slots[a].slotIndex === weapon.modSlots ||
            candidate.slots[b].slotIndex === weapon.modSlots
          )
            continue;
          const swapped = candidate.slots.map((s, i) => ({
            ...s,
            slotIndex:
              i === a
                ? candidate.slots[b].slotIndex
                : i === b
                  ? candidate.slots[a].slotIndex
                  : s.slotIndex,
          }));
          const result = evaluate(swapped);
          if (result) finalists.push(result);
        }
    const winner = finalists.filter((c) => c.matches).sort(order)[0];
    if (!winner)
      throw new Error(
        "No feasible build found with that damage preference. Try Auto, more capacity, or fewer locked slots.",
      );
    const build: WeaponBuildInput = {
      ...input,
      modSlots: winner.slots,
      slotPolarities: winner.polarities,
      scenario: {
        ...input.scenario,
        enemyArchetypeId:
          options.target === "general" ? undefined : targets[0].id,
        faction: options.target === "general" ? undefined : options.target,
      },
    };
    validateWeaponBuild(this.catalog, build);
    const matrix = this.catalog
      .getEnemyTypes()
      .filter((e) => PRESETS.includes(e.id))
      .map((enemy) => {
        const stats = calculateWeaponBuildWithArcanes(
          weapon,
          winner.slots,
          mods,
          arcanes,
          undefined,
          scenarioToSimulationParams({
            ...input.scenario,
            faction: enemy.faction,
          }),
        );
        const simulation = calculateTTK(
          stats,
          enemy,
          input.scenario.level ?? 100,
          input.scenario.steelPath,
        );
        return {
          faction: enemy.faction,
          enemy: enemy.name,
          sustainedDps: stats.sustainedDps,
          ttk: Number.isFinite(simulation.ttk) ? simulation.ttk : null,
          peakViralStacks: simulation.peakViralStacks ?? 0,
          peakCorrosiveStacks: simulation.peakCorrosiveStacks ?? 0,
        };
      });
    return {
      build,
      score: winner.score,
      evaluated,
      forma: winner.forma,
      capacityUsed: winner.cost,
      status: "best_found",
      version:
        "elemental-beam-v3/catalog-fa6b37f/eligibility-e754da2/legacy-ttk",
      candidateCount: selected.length,
      matrix,
      explanation: [
        `Best found using ${evaluated.toLocaleString("en-US")} legal evaluations from ${selected.length} candidate mods. Not proven globally optimal.`,
        `${winner.forma} additional standard Forma; ${winner.cost}/${input.capacity ?? 60} capacity. Existing slot polarities are user supplied.`,
        options.target === "general"
          ? "One fixed build evaluated with equal weights across Grineer, Corpus, Infested, and Corrupted. Faction mods excluded."
          : `Scored against the ${targets[0].name} faction preset.`,
        "Catalog base form only. Expected-value mechanics, legacy enemy resistances, and approximate scaling; no current-game accuracy claim.",
        "Search considers max rank, two ranks below max, and rank zero. Owned-mod filtering assumes those ranks are available.",
        options.goal === "ttk"
          ? "Combat ranking simulates proc chance and elemental weighting, Viral health amplification, Corrosive/Heat armor reduction, damage-over-time and reloads. Status effects ramp during the fight; their maximum benefit is not assumed at the first shot."
          : "Paper DPS objective: status utility is not included in this score. Choose Combat effectiveness to rank by simulated kill time.",
        options.damage === "auto"
          ? "Auto tests combined-element skeletons, including Viral + Heat and Corrosive + Heat, alongside alternatives; raw-damage and innate-element edge cases can still win."
          : `Required damage types verified in the final build: ${requirements(options.damage).join(" + ")}. Slot order and innate elements are included.`,
        `Uses ${input.scenario.killStacks} kill stacks and ${input.scenario.arcaneStacks} arcane stacks. Selected arcanes and the Exilus mod are preserved.`,
        options.allowAccuracyPenalty
          ? "Accuracy penalties allowed; paper DPS assumes hits land."
          : "Accuracy-reducing candidates excluded unless explicitly locked.",
      ],
    };
  }
}
