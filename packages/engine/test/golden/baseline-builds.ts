import {
  allWarframes,
  allWeapons,
  archwings,
  calculateTTK,
  calculateArchwingBuild,
  calculateRailjackBuild,
  calculateWarframeBuild,
  calculateWeaponBuildWithArcanes,
  getEffectiveModsMap,
  ENEMY_TYPES,
} from "../../src/index";

export interface BaselineBuild { id: string; kind: "weapon" | "warframe" | "archwing" | "railjack"; weaponId?: string; modIds?: string[]; warframeId?: string; archwingId?: string; enemyId?: string; sp?: boolean; }

/** Canonical representative builds: bare weapons across trigger families plus a small modded set. */
export const BASELINE_BUILDS: BaselineBuild[] = [
  ...["braton", "braton_prime", "soma", "tenora", "baza", "boltor", "paris", "cernos", "cernos_prime", "mutalist_cernos", "strun", "hek", "kohm", "boar", "tigris", "corinth", "arca_plasmor", "phage", "astilla", "exergis", "skana", "skana_prime", "dual_skana", "galatine", "gram", "gram_prime", "lex", "lex_prime", "vasto", "pandero", "angstrum", "ocucor", "ballistica", "spira", "phenmor", "torid", "laetum"].map((weaponId) => ({ id: `bare:${weaponId}`, kind: "weapon" as const, weaponId })),
  { id: "modded:braton", kind: "weapon", weaponId: "braton", modIds: ["serration"] },
  { id: "modded:hek", kind: "weapon", weaponId: "hek", modIds: ["point_blank"] },
  { id: "modded:paris", kind: "weapon", weaponId: "paris", modIds: ["serration"] },
  { id: "modded:skana", kind: "weapon", weaponId: "skana", modIds: ["pressure_point"] },
  { id: "modded:torid", kind: "weapon", weaponId: "torid", modIds: ["serration"] },
  { id: "sp:bare:braton:lancer", kind: "weapon", weaponId: "braton", enemyId: "lancer", sp: true },
  { id: "sp:modded:hek:crewman", kind: "weapon", weaponId: "hek", modIds: ["point_blank"], enemyId: "crewman", sp: true },
  { id: "warframe:excalibur", kind: "warframe", warframeId: "excalibur" },
  { id: "archwing:odonata", kind: "archwing", archwingId: "odonata" },
  { id: "railjack:bare", kind: "railjack" },
];

function numericFields(value: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => typeof item === "number" && Number.isFinite(item)));
}

/** Computes only load-bearing numeric output through the public engine barrel. */
export function computeBaseline(build: BaselineBuild): Record<string, unknown> {
  const mods = getEffectiveModsMap([]);
  if (build.kind === "weapon") {
    const weapon = allWeapons.find((item) => item.id === build.weaponId);
    if (!weapon) throw new Error(`Missing baseline weapon ${build.weaponId}`);
    const modSlots = (build.modIds ?? []).map((modId, slotIndex) => ({ modId, rank: mods.get(modId)?.maxRank ?? 0, slotIndex }));
    const stats = calculateWeaponBuildWithArcanes(weapon, modSlots, mods, []);
    const enemy = build.enemyId ? ENEMY_TYPES.find((item) => item.id === build.enemyId) : ENEMY_TYPES[0];
    if (!enemy) throw new Error(`Missing baseline enemy ${build.enemyId}`);
    const ttk = calculateTTK(stats, enemy, 100, build.sp ?? false);
    if (build.sp) return { ttkSeconds: ttk.ttk, shotsToKill: ttk.shotsToKill };
    return { ...numericFields(stats as unknown as Record<string, unknown>), ttkSeconds: ttk.ttk, shotsToKill: ttk.shotsToKill };
  }
  if (build.kind === "warframe") {
    const warframe = allWarframes.find((item) => item.id === build.warframeId);
    if (!warframe) throw new Error(`Missing baseline warframe ${build.warframeId}`);
    return numericFields(calculateWarframeBuild(warframe, [], mods) as unknown as Record<string, unknown>);
  }
  if (build.kind === "archwing") {
    const archwing = archwings.find((item) => item.id === build.archwingId);
    if (!archwing) throw new Error(`Missing baseline archwing ${build.archwingId}`);
    return numericFields(calculateArchwingBuild(archwing, [], mods) as unknown as Record<string, unknown>);
  }
  return numericFields(calculateRailjackBuild({}, mods) as unknown as Record<string, unknown>);
}

export function computeAllBaselines() {
  return Object.fromEntries(BASELINE_BUILDS.map((build) => [build.id, computeBaseline(build)]));
}
