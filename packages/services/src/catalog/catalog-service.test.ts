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
});
