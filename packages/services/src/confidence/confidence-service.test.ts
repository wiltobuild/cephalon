import { describe, expect, test } from "vitest";
import { CONFIDENCE_MAP, ConfidenceService } from "./confidence-service";
import { WEAPON_STAT_FIELDS, WARFRAME_STAT_FIELDS } from "../build/build-service";

describe("ConfidenceService", () => {
  test("locks the full confidence map", () => expect(CONFIDENCE_MAP).toMatchSnapshot());

  test("never resolves approximation, not-modeled, or pending keys to verified", () => {
    const service = new ConfidenceService();
    for (const [key, tag] of Object.entries(CONFIDENCE_MAP)) {
      if (tag !== "verified") {
        expect(service.tag(key as keyof typeof CONFIDENCE_MAP)).not.toBe("verified");
      }
    }
  });

  test("assertTagged throws on an un-tagged key", () =>
    expect(() => new ConfidenceService().assertTagged(["burstDps", "notAStat"])).toThrow("Un-tagged mechanic"));

  test("every key a BuildService view-model actually emits is in the map", () => {
    const service = new ConfidenceService();
    const emitted = [
      ...WEAPON_STAT_FIELDS.map((f) => f.key),
      ...WARFRAME_STAT_FIELDS.map((f) => f.key),
      "ttk",
      "modCapacityCost",
    ] as const;
    // does not throw + resolves to a real tag for each
    expect(() => service.assertTagged(emitted)).not.toThrow();
    for (const key of emitted) expect(service.tag(key)).toMatch(/^(verified|approximation|not-modeled|pending-verification)$/);
  });

  test("warframe durability stats are not routed through an unrelated damage key", () => {
    // regression for Themis M1: Shield/Armor/Energy must not be tagged via "totalDamage"
    for (const f of WARFRAME_STAT_FIELDS) expect(f.key).not.toBe("totalDamage");
  });
});
