import {
  applyWarframeShardsAndArcanes,
  calculateWarframeBuild,
  calculateWeaponBuildWithArcanes,
  computeDpsContributions,
} from "@cephalon/engine";
import type {
  CalculatedStats,
  EquippedArchonShard,
  ModSlot,
  SetBonusLinkage,
  WarframeCalculatedStats,
} from "@cephalon/engine";
import { CatalogService } from "../catalog/catalog-service";
import {
  ConfidenceService,
  type ConfidenceTag,
  type MechanicKey,
} from "../confidence/confidence-service";
import { scenarioToSimulationParams, type Scenario } from "./scenario";
import { validateWeaponBuild } from "./validation";

export interface StatViewModel {
  key: MechanicKey;
  label: string;
  value: number;
  confidence: ConfidenceTag;
  breakdown?: { type: string; value: number }[];
}
export interface BuildViewModel {
  stats: StatViewModel[];
  perModContribution: {
    modId: string;
    label: string;
    dpsDelta: number;
    pct: number;
  }[];
  caveats: string[];
  rawStats: CalculatedStats | WarframeCalculatedStats;
}
export interface WeaponBuildInput {
  capacity?: number;
  slotPolarities?: Record<number, string>;
  weaponId: string;
  modSlots: ModSlot[];
  arcaneIds?: string[];
  rivenStatChanges?: Record<string, number>;
  incarnonStatChanges?: Record<string, number>;
  scenario: Scenario;
  linkage?: SetBonusLinkage;
}
export interface WarframeBuildInput {
  form?: "sirius" | "orion";
  warframeId: string;
  modSlots: ModSlot[];
  archonShards?: (EquippedArchonShard | null)[];
  arcaneIds?: string[];
  arcaneRanks?: number[];
  linkage?: SetBonusLinkage;
}

export const WEAPON_STAT_FIELDS: {
  key: MechanicKey;
  label: string;
  field: keyof CalculatedStats;
}[] = [
  { key: "totalDamage", label: "Total Damage", field: "totalDamage" },
  { key: "impact", label: "Impact", field: "impact" },
  { key: "puncture", label: "Puncture", field: "puncture" },
  { key: "slash", label: "Slash", field: "slash" },
  { key: "elementalDamage", label: "Elemental Damage", field: "totalDamage" },
  { key: "burstDps", label: "Burst DPS", field: "burstDps" },
  { key: "sustainedDps", label: "Sustained DPS", field: "sustainedDps" },
  { key: "criticalChance", label: "Critical Chance", field: "criticalChance" },
  {
    key: "criticalMultiplier",
    label: "Critical Multiplier",
    field: "criticalMultiplier",
  },
  { key: "statusChance", label: "Status Chance", field: "statusChance" },
  { key: "fireRate", label: "Fire Rate", field: "fireRate" },
  { key: "multishot", label: "Multishot", field: "multishot" },
  { key: "magazine", label: "Magazine", field: "magazine" },
  { key: "reloadTime", label: "Reload Time", field: "reloadTime" },
];
export const WARFRAME_STAT_FIELDS: {
  key: MechanicKey;
  label: string;
  field: keyof WarframeCalculatedStats;
}[] = [
  { key: "warframeEhp", label: "Effective Health", field: "effectiveHealth" },
  { key: "warframeHealth", label: "Health", field: "totalHealth" },
  { key: "warframeShield", label: "Shield", field: "totalShield" },
  { key: "warframeArmor", label: "Armor", field: "totalArmor" },
  { key: "warframeEnergy", label: "Energy", field: "totalEnergy" },
];

export class BuildService {
  constructor(
    readonly catalog: CatalogService,
    readonly confidence: ConfidenceService,
  ) {}

  calculateWeapon(input: WeaponBuildInput): BuildViewModel {
    validateWeaponBuild(this.catalog, input);
    const weapon = this.catalog.getWeapon(input.weaponId);
    if (!weapon) throw new Error(`Unknown weapon: ${input.weaponId}`);
    const arcanes = (input.arcaneIds ?? [])
      .map((id) => this.catalog.getArcanes().find((arcane) => arcane.id === id))
      .filter((arcane): arcane is NonNullable<typeof arcane> => arcane != null);
    const enemy = this.catalog
      .getEnemyTypes()
      .find((e) => e.id === input.scenario.enemyArchetypeId);
    const simParams = scenarioToSimulationParams({
      ...input.scenario,
      faction: enemy?.faction ?? input.scenario.faction,
    });
    const rawStats = calculateWeaponBuildWithArcanes(
      weapon,
      input.modSlots,
      this.catalog.getModMap(),
      arcanes,
      input.incarnonStatChanges,
      simParams,
      undefined,
      input.linkage,
      input.rivenStatChanges,
    );
    const contributions = computeDpsContributions({
      baseWeapon: weapon,
      modSlots: input.modSlots,
      allMods: this.catalog.getModMap(),
      arcanes,
      incarnonStatChanges: input.incarnonStatChanges,
      simParams,
      linkage: input.linkage,
      rivenStatChanges: input.rivenStatChanges,
    });
    return {
      stats: this.mapStats(rawStats, WEAPON_STAT_FIELDS),
      perModContribution: contributions.map((item) => ({
        modId: item.id,
        label: item.label,
        dpsDelta: rawStats.sustainedDps * (item.sustainedMarginalPct / 100),
        pct: item.sustainedMarginalPct,
      })),
      caveats: [
        "DPS is deterministic expected-value output; situational uptime is not simulated.",
      ],
      rawStats,
    };
  }

  calculateWarframe(input: WarframeBuildInput): BuildViewModel {
    const warframe = this.catalog.getWarframe(input.warframeId);
    if (!warframe) throw new Error(`Unknown warframe: ${input.warframeId}`);
    const base = calculateWarframeBuild(
      input.warframeId === "sirius_orion" && input.form === "orion"
        ? { ...warframe, health: 350, shield: 270, armor: 300, energy: 200 }
        : warframe,
      input.modSlots,
      this.catalog.getModMap(),
      input.linkage,
    );
    const arcanes = (input.arcaneIds ?? []).map(
      (id) =>
        this.catalog.getArcanes().find((arcane) => arcane.id === id) ?? null,
    );
    const rawStats = applyWarframeShardsAndArcanes(
      base,
      input.archonShards,
      arcanes,
      input.arcaneRanks,
    );
    return {
      stats: this.mapStats(rawStats, WARFRAME_STAT_FIELDS),
      perModContribution: [],
      caveats: ["Ability damage is an approximation."],
      rawStats,
    };
  }

  private mapStats<T extends object>(
    stats: T,
    fields: { key: MechanicKey; label: string; field: keyof T }[],
  ): StatViewModel[] {
    this.confidence.assertTagged(fields.map((item) => item.key));
    return fields.map((item) => ({
      key: item.key,
      label: item.label,
      value:
        item.key === "elementalDamage"
          ? (stats as CalculatedStats).elements.reduce(
              (total, element) => total + element.value,
              0,
            )
          : Number(stats[item.field]),
      confidence: this.confidence.tag(item.key),
      ...(item.key === "elementalDamage"
        ? {
            breakdown: (stats as CalculatedStats).elements.map((element) => ({
              type: element.type,
              value: element.value,
            })),
          }
        : {}),
    }));
  }
}
