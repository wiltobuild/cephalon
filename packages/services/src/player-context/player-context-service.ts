export type PlayerKnowledge = "unknown";

/** Type-only boundary for the future authenticated inventory provider. */
export interface PlayerContextService {
  owns(itemId: string): Promise<PlayerKnowledge>;
  masteryRank(): Promise<PlayerKnowledge>;
  inventoryQuantity(itemId: string): Promise<PlayerKnowledge>;
}

export class NullPlayerContext implements PlayerContextService {
  async owns(): Promise<PlayerKnowledge> { return "unknown"; }
  async masteryRank(): Promise<PlayerKnowledge> { return "unknown"; }
  async inventoryQuantity(): Promise<PlayerKnowledge> { return "unknown"; }
}
