import type { BuildViewModel, ConfidenceTag, Scenario } from "@cephalon/services";

export type { ConfidenceTag, Scenario };
export type ModSlot = { modId: string; rank: number; slotIndex: number };
export type BuildWeaponRequest = { weaponId: string; modSlots: ModSlot[]; arcaneIds?: string[]; rivenStatChanges?: Record<string, number>; incarnonStatChanges?: Record<string, number>; scenario: Scenario };
export type BuildWeaponResponse = BuildViewModel & { ttk?: { value: number; confidence: ConfidenceTag; caveats: { key: string; tag: ConfidenceTag; text: string }[] } };
export type WeaponListItem = { id: string; name: string; category: string; masteryReq: number; disposition: number; isIncarnon: boolean };
export type CompatibleMod = { id: string; name: string; polarity: string; rarity: string; maxRank: number; primaryEffect: string };
export type WeaponDetail = { base: Record<string, number>; modSlotCount: number; polarities: string[]; exilus: boolean; arcaneSlots: number; incarnon?: { forms: string[] }; mods: CompatibleMod[] };
