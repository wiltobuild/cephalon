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
