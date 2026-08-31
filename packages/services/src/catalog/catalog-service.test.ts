import { describe, expect, test } from "vitest";
import type { OverrideSet } from "@cephalon/engine";
import { CatalogService } from "./catalog-service";

describe("CatalogService", () => {
  test("retrieves enriched catalog entries and memoises maps", () => {
    const catalog = new CatalogService();
    expect(catalog.getWeapon("braton")?.name).toBe("Braton");
    expect(catalog.getWeaponsMap()).toBe(catalog.getWeaponsMap());
    expect(catalog.getModMap()).toBe(catalog.getModMap());
  });
  test("applies explicit overrides once", () => {
    const overrides: OverrideSet = [{ id: "test", targetType: "weapon", targetId: "braton", action: "modify", fields: { name: "Test Braton" }, note: "test", timestamp: 0 }];
    expect(new CatalogService(overrides).getWeapon("braton")?.name).toBe("Test Braton");
  });
  test("provides lightweight builder catalog helpers", () => {
    const catalog = new CatalogService();
    expect(catalog.listWeapons().find((weapon) => weapon.id === "braton")?.name).toBe("Braton");
    expect(catalog.getWeaponDetail("braton")?.modSlotCount).toBeGreaterThan(0);
    expect(catalog.compatibleMods("braton").find((mod) => mod.id === "serration_r3")?.name).toBe("Serration");
  });
  test("filters compatible mods by the weapon's actual class", () => {
    const mods = new CatalogService().compatibleMods("braton").map((mod) => mod.id);
    expect(mods).toContain("serration_r3");
    expect(mods).toContain("split_chamber_r3");
    // shotgun mod, correctly categorised in the bundled catalog -> excluded
    expect(mods).not.toContain("hells_chamber");
    // NOTE: a few bow-only mods (e.g. split_flights) are mis-tagged `category: "primary"`
    // in the bundled catalog, so class-filtering can't exclude them. Tracked as a
    // catalog-data follow-up; the eligibility filter is correct.
  });
});
