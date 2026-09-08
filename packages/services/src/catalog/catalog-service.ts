import {
  ENEMY_TYPES,
  isWarframeExilusMod,
  applyArcaneEffectOverrides,
  enrichWeapon,
  getEffectiveArcanes,
  getEffectiveArchonShards,
  getEffectiveCompanions,
  getEffectiveModsMap,
  getEffectiveWarframesMap,
  getEffectiveWeaponsMap,
  getWeaponModProfile,
  modEligibleForWeaponSlot,
  modCompatibleWithWeaponProfile,
  rivenDispositions,
} from "@cephalon/engine";
import type {
  ArchonShard,
  EnemyType,
  Mod,
  OverrideSet,
  Warframe,
  Weapon,
} from "@cephalon/engine";
import { sourceAllowsWeapon, sourceModCategory } from "./mod-compatibility";
import metadata from "./mod-compatibility.json";

/** Owns the explicit override set and materialises each effective catalog once. */
export class CatalogService {
  private readonly weapons: Map<string, Weapon>;
  private readonly warframes: Map<string, Warframe>;
  private readonly mods: Map<string, Mod>;
  private readonly arcanes: Mod[];
  private readonly archonShards: ArchonShard[];
  private readonly companions: ReturnType<typeof getEffectiveCompanions>;
  private readonly arcaneEffects: ReturnType<typeof applyArcaneEffectOverrides>;

  constructor(readonly overrides: OverrideSet = []) {
    this.weapons = new Map(
      [...getEffectiveWeaponsMap(overrides)].map(([id, weapon]) => [
        id,
        enrichWeapon(weapon),
      ]),
    );
    this.warframes = getEffectiveWarframesMap(overrides);
    this.mods = getEffectiveModsMap(overrides);
    // Sample guides include this utility mod, absent from the pinned catalog.
    // Its knockdown effect is presentation-only; no displayed pool/ability stat changes.
    if (!this.mods.has("primed_sure_footed"))
      this.mods.set("primed_sure_footed", {
        id: "primed_sure_footed",
        name: "Primed Sure Footed",
        category: "warframe",
        polarity: "vazarin",
        rarity: "legendary",
        maxRank: 10,
        drain: 6,
        stats: {},
        description: "Knockdown resistance · utility effect",
      });
    this.arcanes = getEffectiveArcanes(overrides);
    this.archonShards = getEffectiveArchonShards(overrides);
    this.companions = getEffectiveCompanions(overrides);
    this.arcaneEffects = applyArcaneEffectOverrides(overrides);
  }

  getWeapon(id: string) {
    return this.weapons.get(id);
  }
  listWeapons() {
    return [...this.weapons.values()].map((weapon) => ({
      id: weapon.id,
      name: weapon.name,
      category: weapon.category,
      ...(rivenDispositions[weapon.name] !== undefined
        ? {
            disposition: Math.round(rivenDispositions[weapon.name] * 100) / 100,
          }
        : {}),
      isIncarnon: weapon.isIncarnon,
    }));
  }
  getWeaponDetail(id: string) {
    const weapon = this.getWeapon(id);
    if (!weapon) return undefined;
    return {
      base: {
        damage: weapon.damage,
        impact: weapon.impact,
        puncture: weapon.puncture,
        slash: weapon.slash,
        heat: weapon.heat ?? 0,
        cold: weapon.cold ?? 0,
        toxin: weapon.toxin ?? 0,
        electricity: weapon.electricity ?? 0,
        criticalChance: weapon.criticalChance,
        criticalMultiplier: weapon.criticalMultiplier,
        statusChance: weapon.statusChance,
        fireRate: weapon.fireRate,
        magazine: weapon.magazine,
        reloadTime: weapon.reloadTime,
        multishot: weapon.multishot,
      },
      modSlotCount: weapon.modSlots,
      exilusSlot: [
        "rifle",
        "shotgun",
        "bow",
        "primary",
        "launcher",
        "pistol",
        "secondary",
        "dual_pistols",
        "melee",
      ].includes(weapon.category),
      arcaneSlots: [
        "rifle",
        "shotgun",
        "bow",
        "primary",
        "launcher",
        "pistol",
        "secondary",
        "dual_pistols",
        "melee",
      ].includes(weapon.category)
        ? 1
        : (weapon.arcaneSlots ?? 0),
      ...(weapon.isIncarnon
        ? { incarnon: { forms: weapon.incarnonEvolutions ?? [] } }
        : {}),
    };
  }
  compatibleMods(weaponId: string, slot: "regular" | "exilus" = "regular") {
    const weapon = this.getWeapon(weaponId);
    if (!weapon) return [];
    const builderCategory =
      weapon.category === "archgun"
        ? "archgun"
        : ["melee", "beast_claw"].includes(weapon.category)
          ? "melee"
          : ["pistol", "secondary", "dual_pistols"].includes(weapon.category)
            ? "secondary"
            : "primary";
    const allowedCategories = this.allowedModCategories(weapon.category);
    const profile = getWeaponModProfile(weapon);
    const rarityOrder: Record<string, number> = {
      legendary: 0,
      rare: 1,
      uncommon: 2,
      common: 3,
    };
    return [...this.mods.values()]
      .filter((mod) => allowedCategories.includes(sourceModCategory(mod)))
      .filter((mod) => sourceAllowsWeapon(mod, weapon))
      .filter((mod) =>
        slot === "exilus" &&
        (metadata.presentation as Record<string, { exilus: boolean }>)[mod.id]
          ? (metadata.presentation as Record<string, { exilus: boolean }>)[
              mod.id
            ].exilus && modCompatibleWithWeaponProfile(mod.id, profile)
          : modEligibleForWeaponSlot(
              { ...mod, category: sourceModCategory(mod) },
              builderCategory,
              weapon.category,
              slot === "regular"
                ? "regular"
                : builderCategory === "secondary"
                  ? "weapon_exilus_secondary"
                  : builderCategory === "melee"
                    ? "weapon_exilus_melee"
                    : "weapon_exilus_primary",
              profile,
            ),
      )
      .sort((left, right) => {
        const classDelta =
          Number(left.category !== weapon.category) -
          Number(right.category !== weapon.category);
        return (
          classDelta ||
          (rarityOrder[left.rarity] ?? 99) -
            (rarityOrder[right.rarity] ?? 99) ||
          left.name.localeCompare(right.name)
        );
      })
      .map((mod) => ({
        id: mod.id,
        name: mod.name,
        polarity: mod.polarity,
        rarity: mod.rarity,
        maxRank: mod.maxRank,
        drain: mod.drain,
        primaryEffect: mod.description,
        rankText:
          (metadata.presentation as Record<string, { rankText: string[] }>)[
            mod.id
          ]?.rankText ?? [],
      }));
  }
  private allowedModCategories(category: string): string[] {
    switch (category) {
      case "rifle":
        return ["rifle", "primary", "general"];
      case "shotgun":
        return ["shotgun", "primary", "general"];
      case "bow":
        return ["bow", "rifle", "primary", "general"];
      case "launcher":
        return ["launcher", "rifle", "primary", "general"];
      case "archgun":
        return ["archgun"];
      case "pistol":
      case "secondary":
      case "dual_pistols":
        return ["pistol", "secondary", "general"];
      case "melee":
      case "beast_claw":
        return ["melee", "general"];
      default:
        return ["primary", "general"];
    }
  }
  getWeaponsMap() {
    return this.weapons;
  }
  getWarframe(id: string) {
    return this.warframes.get(id);
  }
  getWarframesMap() {
    return this.warframes;
  }
  getModMap() {
    return this.mods;
  }
  getArcanes() {
    return this.arcanes;
  }
  compatibleArcanes(weaponId: string) {
    const weapon = this.getWeapon(weaponId);
    if (!weapon || !this.getWeaponDetail(weaponId)?.arcaneSlots) return [];
    const category = ["pistol", "secondary", "dual_pistols"].includes(
      weapon.category,
    )
      ? "secondary"
      : weapon.category === "melee"
        ? "melee"
        : "primary";
    return this.arcanes
      .filter(
        (arcane) =>
          ((metadata.arcaneClasses as Record<string, string>)[arcane.id] ??
            arcane.subCategory) === category,
      )
      .map((arcane) => ({
        id: arcane.id,
        name: arcane.name,
        maxRank: arcane.maxRank,
        description: arcane.description
          .replace(/<[^>]+>/g, "")
          .replace(/\\n/g, "\n"),
        modeled: !!this.arcaneEffects[arcane.id],
        maxStacks: this.arcaneEffects[arcane.id]?.stackCap ?? 20,
      }));
  }
  compatibleWarframeMods(warframeId: string) {
    const frame = this.getWarframe(warframeId);
    if (!frame) return [];
    const baseId = warframeId.replace(/_prime$/, "");
    return [...this.mods.values()]
      .filter((m) => {
        const category = sourceModCategory(m);
        const source = (metadata.compatibility as Record<string, string>)[
          m.id
        ]?.replace(/ mod$/, "");
        const frameTag = frame.name.toLowerCase().replace(/ prime$/, "");
        const otherFrame = [...this.warframes.values()].some(
          (w) =>
            w.name.toLowerCase().replace(/ prime$/, "") === source &&
            source !== frameTag,
        );
        return (
          !otherFrame &&
          (category === "warframe" ||
            category === "aura" ||
            (m.category === "augment" && m.warframeId === "universal") ||
            source === frameTag) &&
          (source === "warframe" ||
            source === "aura" ||
            !m.warframeId ||
            m.warframeId === "universal" ||
            m.warframeId.replace(/_prime$/, "") === baseId)
        );
      })
      .map((m) => ({
        id: m.id,
        name: m.name,
        rarity: m.rarity,
        polarity: m.polarity,
        maxRank: m.maxRank,
        drain: m.drain,
        primaryEffect: m.description,
        rankText: (metadata.presentation as Record<string,{rankText?:string[]}>)[m.id]?.rankText,
        slotKind:
          sourceModCategory(m) === "aura"
            ? "aura"
            : (metadata.presentation as Record<string, { exilus?: boolean }>)[
                  m.id
                ]?.exilus ||
                isWarframeExilusMod(m) ||
                m.id === "primed_sure_footed"
              ? "exilus"
              : "regular",
      }));
  }
  getArchonShards() {
    return this.archonShards;
  }
  getCompanions() {
    return this.companions;
  }
  getEnemyTypes(): EnemyType[] {
    return ENEMY_TYPES;
  }
  /** Merged for hosts that later pass it to getArcaneEffectDef's effects parameter. */
  getArcaneEffectsMap() {
    return this.arcaneEffects;
  }
}
