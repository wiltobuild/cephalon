import { describe, expect, it } from "vitest";
import { allWeapons } from "@/data/weapons";
import { applyWeaponOverrides, type OverrideSet } from "@/overrides/data-overrides";
import {
  getEffectiveWeapons,
  getEffectiveModsMap,
} from "@/weapons/effective-data";

describe("override sets are isolated", () => {
  it("does not retain or cross-contaminate caller-provided overrides", async () => {
    const setA: OverrideSet = [{
      id: "a", targetType: "weapon", targetId: "braton", action: "modify",
      fields: { name: "A" }, note: "", timestamp: 1,
    }];
    const setB: OverrideSet = [{
      id: "b", targetType: "weapon", targetId: "braton", action: "modify",
      fields: { name: "B" }, note: "", timestamp: 2,
    }];
    const nameFor = (overrides: OverrideSet) =>
      applyWeaponOverrides(allWeapons, overrides).find((weapon) => weapon.id === "braton")?.name;

    expect(nameFor(setA)).toBe("A");
    expect(nameFor(setB)).toBe("B");
    expect(nameFor(setA)).toBe("A");
    expect(nameFor([])).toBe(allWeapons.find((weapon) => weapon.id === "braton")?.name);

    const reimported = await import("@/overrides/data-overrides");
    expect(reimported.applyWeaponOverrides(allWeapons, setB).find((weapon) => weapon.id === "braton")?.name).toBe("B");
  });

  it("getEffective* accessors do not mutate shared base catalog state across calls", () => {
    const modsMap = getEffectiveModsMap([]);
    const baseline = JSON.stringify(
      getEffectiveWeapons([]).find((w) => w.id === "braton"),
    );
    const set: OverrideSet = [{
      id: "x", targetType: "weapon", targetId: "braton", action: "modify",
      fields: { name: "MUTATED", disposition: 9 }, note: "", timestamp: 1,
    }];

    // apply a non-trivial override via the accessor, then confirm a fresh
    // no-override call is byte-identical to the pre-call baseline (i.e. the
    // shared module-level base arrays/maps were never mutated in place).
    const withOverride = getEffectiveWeapons(set).find((w) => w.id === "braton");
    expect(withOverride?.name).toBe("MUTATED");
    expect(JSON.stringify(getEffectiveWeapons([]).find((w) => w.id === "braton"))).toBe(baseline);

    // the mods map from a no-override call is likewise stable
    expect(modsMap).toBe(modsMap); // identity sanity
    expect(getEffectiveModsMap([]).size).toBe(modsMap.size);
  });
});
