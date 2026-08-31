import { Loadout } from "../types";
import type { SavedBuild } from "@/support/build-resolvers";

/** Slot payloads only — name/description/isPublic live on SavedBuild when cloud-synced. */
export type LoadoutBuildData = Omit<
  Loadout,
  "id" | "name" | "description" | "isPublic" | "cloudId" | "createdAt" | "updatedAt"
>;

/** Ensure cloud-safe defaults on slot payloads before POST /api/builds. */
export function normalizeLoadoutBuildData(data: LoadoutBuildData): LoadoutBuildData {
  let out: LoadoutBuildData;
  try {
    out = JSON.parse(JSON.stringify(data)) as LoadoutBuildData;
  } catch {
    out = { ...data };
  }

  if (out.warframeBuild) {
    const wb = out.warframeBuild;
    out.warframeBuild = {
      ...wb,
      slotPolarities: wb.slotPolarities ?? {},
      shards: wb.shards ?? [null, null, null, null, null],
      hasOrokinReactor: wb.hasOrokinReactor ?? false,
      isMR30: wb.isMR30 ?? false,
      mods: wb.mods ?? [],
      arcaneIds: wb.arcaneIds ?? [null, null],
    };
  }

  const normalizeWeapon = (build: LoadoutBuildData["primaryBuild"]) => {
    if (!build) return build;
    return {
      ...build,
      hasOrokinCatalyst: build.hasOrokinCatalyst ?? false,
      isMR30: build.isMR30 ?? false,
      slotPolarities: build.slotPolarities ?? {},
      arcaneIds: build.arcaneIds ?? [null, null],
      mods: build.mods ?? [],
    };
  };

  out.primaryBuild = normalizeWeapon(out.primaryBuild);
  out.secondaryBuild = normalizeWeapon(out.secondaryBuild);
  out.meleeBuild = normalizeWeapon(out.meleeBuild);

  if (out.companionBuild) {
    const cb = out.companionBuild;
    out.companionBuild = {
      ...cb,
      hasReactor: cb.hasReactor ?? false,
      hasCatalyst: cb.hasCatalyst ?? false,
      mods: cb.mods ?? [],
      weaponMods: cb.weaponMods ?? [],
      slotPolarities: cb.slotPolarities ?? {},
      weaponSlotPolarities: cb.weaponSlotPolarities ?? {},
    };
  }

  if (out.modularBuild) {
    const mb = out.modularBuild;
    out.modularBuild = {
      ...mb,
      hasOrokinCatalyst: mb.hasOrokinCatalyst ?? false,
      slotPolarities: mb.slotPolarities ?? {},
      arcaneIds: mb.arcaneIds ?? [null, null],
      mods: mb.mods ?? [],
    };
  }

  return out;
}

export function loadoutToBuildData(loadout: Loadout): LoadoutBuildData {
  const {
    id: _id,
    name: _name,
    description: _description,
    isPublic: _isPublic,
    cloudId: _cloudId,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...data
  } = loadout;
  return normalizeLoadoutBuildData(data);
}

export function loadoutFromSavedBuild(build: SavedBuild): Loadout {
  return {
    id: build.id,
    cloudId: build.id,
    name: build.name,
    description: build.description,
    isPublic: build.isPublic,
    createdAt: build.createdAt,
    updatedAt: build.updatedAt,
    ...(build.data as LoadoutBuildData),
  };
}

export function mergeCloudLoadout(local: Loadout, cloud: SavedBuild): Loadout {
  return mergeCloudLoadoutPreservingSlots(local, cloud);
}

/** Merge cloud slot data onto a local loadout without wiping filled slots with empty cloud payloads. */
export function mergeCloudLoadoutPreservingSlots(local: Loadout, cloud: SavedBuild): Loadout {
  const cloudData = (cloud.data ?? {}) as LoadoutBuildData;
  const localData = loadoutToBuildData(local);

  const hasMods = (mods?: { length: number }) => (mods?.length ?? 0) > 0;

  const mergeWeapon = (
    localSlot: LoadoutBuildData["primaryBuild"],
    cloudSlot: LoadoutBuildData["primaryBuild"],
  ) => {
    if (!cloudSlot) return localSlot;
    if (!localSlot) return cloudSlot;
    return hasMods(cloudSlot.mods) || cloudSlot.weaponId ? cloudSlot : localSlot;
  };

  return {
    ...local,
    name: cloud.name || local.name,
    description: cloud.description ?? local.description,
    isPublic: cloud.isPublic ?? local.isPublic,
    cloudId: cloud.id,
    warframeBuild:
      cloudData.warframeBuild && hasMods(cloudData.warframeBuild.mods)
        ? cloudData.warframeBuild
        : localData.warframeBuild ?? cloudData.warframeBuild,
    primaryBuild: mergeWeapon(localData.primaryBuild, cloudData.primaryBuild),
    secondaryBuild: mergeWeapon(localData.secondaryBuild, cloudData.secondaryBuild),
    meleeBuild: mergeWeapon(localData.meleeBuild, cloudData.meleeBuild),
    companionBuild:
      cloudData.companionBuild &&
      (hasMods(cloudData.companionBuild.mods) || hasMods(cloudData.companionBuild.weaponMods))
        ? cloudData.companionBuild
        : localData.companionBuild ?? cloudData.companionBuild,
    modularBuild: cloudData.modularBuild ?? localData.modularBuild,
    archwingBuild: cloudData.archwingBuild ?? localData.archwingBuild,
  };
}

