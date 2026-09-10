import type {
  BuildViewModel,
  ConfidenceTag,
  Scenario,
} from "@cephalon/services";

export type { ConfidenceTag, Scenario };
export type { OptimizeOptions, OptimizationResult } from "@cephalon/services";
export type ModSlot = { modId: string; rank: number; slotIndex: number };
export type BuildWeaponRequest = {
  weaponId: string;
  modSlots: ModSlot[];
  capacity?: number;
  slotPolarities?: Record<number, string>;
  arcaneIds?: string[];
  rivenStatChanges?: Record<string, number>;
  incarnonStatChanges?: Record<string, number>;
  scenario: Scenario;
};
export type BuildWeaponResponse = Omit<BuildViewModel, "rawStats"> & {
  capacityUsed: number;
  ttk?: {
    target: {
      id: string;
      name: string;
      faction: string;
      level: number;
      reference: boolean;
    };
    value: number | null;
    outcome: "killed" | "time_limit" | "unsupported";
    confidence: ConfidenceTag;
    caveats: { key: string; tag: ConfidenceTag; text: string }[];
  };
};
export type WeaponListItem = {
  id: string;
  name: string;
  category: string;
  disposition?: number;
  isIncarnon: boolean;
};
export type CompatibleMod = {
  id: string;
  name: string;
  polarity: string;
  rarity: string;
  maxRank: number;
  drain: number;
  primaryEffect: string;
  rankText?: string[];
};
export type WeaponDetail = {
  base: Record<string, number>;
  modSlotCount: number;
  arcaneSlots: number;
  exilusSlot: boolean;
  exilusMods: CompatibleMod[];
  arcanes: {
    id: string;
    name: string;
    description: string;
    maxRank: number;
    modeled: boolean;
    maxStacks: number;
  }[];
  incarnon?: { forms: string[] };
  mods: CompatibleMod[];
};
