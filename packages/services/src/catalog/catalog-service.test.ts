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
    const overrides: OverrideSet = [
      {
        id: "test",
        targetType: "weapon",
        targetId: "braton",
        action: "modify",
        fields: { name: "Test Braton" },
        note: "test",
        timestamp: 0,
      },
    ];
    expect(new CatalogService(overrides).getWeapon("braton")?.name).toBe(
      "Test Braton",
    );
  });
  test("provides lightweight builder catalog helpers", () => {
    const catalog = new CatalogService();
    expect(
      catalog.listWeapons().find((weapon) => weapon.id === "braton")?.name,
    ).toBe("Braton");
    expect(catalog.getWeaponDetail("braton")?.modSlotCount).toBeGreaterThan(0);
    expect(
      catalog.compatibleMods("braton").find((mod) => mod.id === "serration_r3")
        ?.name,
    ).toBe("Serration");
  });
  test("filters compatible mods by the weapon's actual class", () => {
    const mods = new CatalogService()
      .compatibleMods("braton")
      .map((mod) => mod.id);
    expect(mods).toContain("serration_r3");
    expect(mods).toContain("split_chamber_r3");
    // shotgun mod, correctly categorised in the bundled catalog -> excluded
    expect(mods).not.toContain("hells_chamber");
    expect(mods).not.toContain("split_flights");
  });
});

test("rifles reject Focus, augments, crafting, veiled Rivens, stances and unresolved text", () => {
  const catalog = new CatalogService();
  const mods = catalog.compatibleMods("braton_prime");
  const ids = mods.map((m) => m.id);
  for (const id of [
    "cogron_tauron_strike",
    "lorak_tauron_strike",
    "nidri_tauron_strike",
    "thara_tauron_strike",
    "vexoric_tauron_strike",
    "wellspring",
    "void_strike",
    "inner_might",
    "great_quake",
    "killers_rush",
    "spectral_pages",
    "madurai_transmute_core",
    "naramon_transmute_core",
    "vazarin_transmute_core",
    "rifle_riven_mod",
    "argent_scourge",
    "phoenix_spirit",
    "split_flights",
  ])
    expect(ids).not.toContain(id);
  for (const id of ["serration_r3", "galvanized_chamber", "split_chamber_r3"])
    expect(ids).toContain(id);
  expect(mods.some((m) => /\|[A-Z_]+\|/.test(m.primaryEffect))).toBe(false);
  expect(
    catalog.compatibleMods("hek").some((m) => m.id === "galvanized_hell"),
  ).toBe(true);
  expect(
    catalog.compatibleMods("sobek").some((m) => m.id === "acid_shells"),
  ).toBe(true);
  expect(ids).not.toContain("acid_shells");
});
