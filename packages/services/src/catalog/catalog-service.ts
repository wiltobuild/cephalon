import {
  ENEMY_TYPES,
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
  rivenDispositions,
} from "@cephalon/engine";
import type { ArchonShard, EnemyType, Mod, OverrideSet, Warframe, Weapon } from "@cephalon/engine";

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
      [...getEffectiveWeaponsMap(overrides)].map(([id, weapon]) => [id, enrichWeapon(weapon)]),
    );
    this.warframes = getEffectiveWarframesMap(overrides);
    this.mods = getEffectiveModsMap(overrides);
    this.arcanes = getEffectiveArcanes(overrides);
    this.archonShards = getEffectiveArchonShards(overrides);
    this.companions = getEffectiveCompanions(overrides);
    this.arcaneEffects = applyArcaneEffectOverrides(overrides);
  }

  getWeapon(id: string) { return this.weapons.get(id); }
  listWeapons() {
    return [...this.weapons.values()].map((weapon) => ({
      id: weapon.id, name: weapon.name, category: weapon.category,
      ...(rivenDispositions[weapon.name] !== undefined ? { disposition: Math.round(rivenDispositions[weapon.name] * 100) / 100 } : {}),
      isIncarnon: weapon.isIncarnon,
    }));
  }
  getWeaponDetail(id: string) {
    const weapon = this.getWeapon(id);
    if (!weapon) return undefined;
    return {
      base: { damage: weapon.damage, impact: weapon.impact, puncture: weapon.puncture, slash: weapon.slash, heat: weapon.heat ?? 0, cold: weapon.cold ?? 0, toxin: weapon.toxin ?? 0, electricity: weapon.electricity ?? 0, criticalChance: weapon.criticalChance, criticalMultiplier: weapon.criticalMultiplier, statusChance: weapon.statusChance, fireRate: weapon.fireRate, magazine: weapon.magazine, reloadTime: weapon.reloadTime, multishot: weapon.multishot },
      modSlotCount: weapon.modSlots,
      arcaneSlots: weapon.arcaneSlots ?? (weapon.hasPrimaryArcaneSlot || weapon.hasSecondaryArcaneSlot ? 1 : 0),
      ...(weapon.isIncarnon ? { incarnon: { forms: weapon.incarnonEvolutions ?? [] } } : {}),
    };
  }
  compatibleMods(weaponId: string) {
    const weapon = this.getWeapon(weaponId);
    if (!weapon) return [];
    const builderCategory = weapon.category === "archgun" ? "archgun" : ["melee", "beast_claw"].includes(weapon.category) ? "melee" : ["pistol", "secondary", "dual_pistols"].includes(weapon.category) ? "secondary" : "primary";
    const allowedCategories = this.allowedModCategories(weapon.category);
    const profile = getWeaponModProfile(weapon);
    const rarityOrder: Record<string, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 };
    return [...this.mods.values()]
      .filter((mod) => allowedCategories.includes(mod.category))
      .filter((mod) => modEligibleForWeaponSlot(mod, builderCategory, weapon.category, "regular", profile))
      .sort((left, right) => {
        const classDelta = Number(left.category !== weapon.category) - Number(right.category !== weapon.category);
        return classDelta || (rarityOrder[left.rarity] ?? 99) - (rarityOrder[right.rarity] ?? 99) || left.name.localeCompare(right.name);
      })
      .map((mod) => { const dominant = Object.entries(mod.stats)[0]; return { id: mod.id, name: mod.name, polarity: mod.polarity, rarity: mod.rarity, maxRank: mod.maxRank, primaryEffect: dominant ? `${dominant[0]} ${Math.round(dominant[1] * 100)}%` : mod.description }; });
  }
  private allowedModCategories(category: string): string[] {
    switch (category) {
      case "rifle": return ["rifle", "primary", "general"];
      case "shotgun": return ["shotgun", "primary", "general"];
      case "bow": return ["bow", "primary", "general"];
      case "launcher": return ["launcher", "primary", "general"];
      case "archgun": return ["archgun"];
      case "pistol": case "secondary": case "dual_pistols": return ["pistol", "secondary", "general"];
      case "melee": case "beast_claw": return ["melee", "general"];
      default: return ["primary", "general"];
    }
  }
  getWeaponsMap() { return this.weapons; }
  getWarframe(id: string) { return this.warframes.get(id); }
  getWarframesMap() { return this.warframes; }
  getModMap() { return this.mods; }
  getArcanes() { return this.arcanes; }
  getArchonShards() { return this.archonShards; }
  getCompanions() { return this.companions; }
  getEnemyTypes(): EnemyType[] { return ENEMY_TYPES; }
  /** Merged for hosts that later pass it to getArcaneEffectDef's effects parameter. */
  getArcaneEffectsMap() { return this.arcaneEffects; }
}
