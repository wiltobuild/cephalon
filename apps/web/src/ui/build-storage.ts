import type { BuildWeaponRequest } from "@/server/contracts";
export type SavedBuild = {
  id: string;
  name: string;
  weaponName: string;
  savedAt: string;
  version: 1;
  build: BuildWeaponRequest;
};
const KEY = "cephalon.builds.v1";
export function isBuild(value: unknown): value is BuildWeaponRequest {
  if (!value || typeof value !== "object") return false;
  const b = value as BuildWeaponRequest;
  return (
    typeof b.weaponId === "string" &&
    b.weaponId.length < 150 &&
    Array.isArray(b.modSlots) &&
    b.modSlots.length <= 10 &&
    b.modSlots.every(
      (s) =>
        s &&
        typeof s.modId === "string" &&
        Number.isInteger(s.rank) &&
        Number.isInteger(s.slotIndex),
    ) &&
    !!b.scenario &&
    typeof b.scenario.headshots === "boolean"
  );
}
export function readBuilds(): SavedBuild[] {
  try {
    const items: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(items)
      ? items.filter(
          (s) =>
            s?.version === 1 &&
            typeof s.id === "string" &&
            typeof s.name === "string" &&
            isBuild(s.build),
        )
      : [];
  } catch {
    return [];
  }
}
export function saveBuild(
  build: BuildWeaponRequest,
  weaponName: string,
  name: string,
): SavedBuild {
  const entry: SavedBuild = {
    id: crypto.randomUUID(),
    name: name.trim() || `${weaponName} build`,
    weaponName,
    savedAt: new Date().toISOString(),
    version: 1,
    build,
  };
  localStorage.setItem(
    KEY,
    JSON.stringify([entry, ...readBuilds()].slice(0, 100)),
  );
  return entry;
}
export function deleteBuild(id: string) {
  localStorage.setItem(
    KEY,
    JSON.stringify(readBuilds().filter((s) => s.id !== id)),
  );
}
export function buildFragment(build: BuildWeaponRequest) {
  const bytes = new TextEncoder().encode(JSON.stringify({ version: 1, build }));
  return btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join(""));
}
export function parseFragment(fragment: string): BuildWeaponRequest {
  if (fragment.length > 24000) throw new Error("Shared build is too large.");
  const parsed = JSON.parse(
    new TextDecoder().decode(
      Uint8Array.from(atob(fragment), (c) => c.charCodeAt(0)),
    ),
  );
  if (parsed.version !== 1 || !isBuild(parsed.build))
    throw new Error(
      "This build link is invalid or uses an unsupported version.",
    );
  return parsed.build;
}
