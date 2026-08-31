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
  modEligibleForWeaponSlot,
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
      masteryReq: Number((weapon as unknown as Record<string, unknown>).masteryReq ?? 0),
      disposition: Number((weapon as unknown as Record<string, unknown>).disposition ?? 1),
      isIncarnon: weapon.isIncarnon,
    }));
  }
  getWeaponDetail(id: string) {
    const weapon = this.getWeapon(id);
    if (!weapon) return undefined;
    const metadata = weapon as unknown as Record<string, unknown>;
    return {
      base: { damage: weapon.damage, impact: weapon.impact, puncture: weapon.puncture, slash: weapon.slash, heat: weapon.heat ?? 0, cold: weapon.cold ?? 0, toxin: weapon.toxin ?? 0, electricity: weapon.electricity ?? 0, criticalChance: weapon.criticalChance, criticalMultiplier: weapon.criticalMultiplier, statusChance: weapon.statusChance, fireRate: weapon.fireRate, magazine: weapon.magazine, reloadTime: weapon.reloadTime, multishot: weapon.multishot },
      modSlotCount: weapon.modSlots,
      polarities: Array.isArray(metadata.polarities) ? metadata.polarities.filter((value): value is string => typeof value === "string") : [],
      exilus: Boolean(metadata.exilus ?? metadata.hasExilusSlot),
      arcaneSlots: weapon.arcaneSlots ?? (weapon.hasPrimaryArcaneSlot || weapon.hasSecondaryArcaneSlot ? 1 : 0),
      ...(weapon.isIncarnon ? { incarnon: { forms: weapon.incarnonEvolutions ?? [] } } : {}),
    };
  }
  compatibleMods(weaponId: string) {
    const weapon = this.getWeapon(weaponId);
    if (!weapon) return [];
    const builderCategory = ["melee", "beast_claw"].includes(weapon.category) ? "melee" : ["pistol", "secondary", "dual_pistols"].includes(weapon.category) ? "secondary" : "primary";
    return [...this.mods.values()].filter((mod) => modEligibleForWeaponSlot(mod, builderCategory, weapon.category, "regular"))
      .map((mod) => { const dominant = Object.entries(mod.stats)[0]; return { id: mod.id, name: mod.name, polarity: mod.polarity, rarity: mod.rarity, maxRank: mod.maxRank, primaryEffect: dominant ? `${dominant[0]} ${Math.round(dominant[1] * 100)}%` : mod.description }; });
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
