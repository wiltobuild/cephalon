import { expect, test, vi } from "vitest";
import { AssetService } from "./asset-service";
test("same-name aliases resolve only when artwork agrees, with cached metadata", async () => {
  const load = vi.fn(async () => [
    { name: "Serration", uniqueName: "/a", imageName: "Serration.png" },
    { name: "Serration", uniqueName: "/b", imageName: "Serration.png" },
  ]);
  const service = new AssetService(load);
  expect(await service.resolve("mod", "Serration")).toBe(
    "https://cdn.warframestat.us/img/Serration.png",
  );
  await service.resolve("mod", "Serration");
  expect(load).toHaveBeenCalledTimes(1);
});
test("ambiguous variants and untrusted kinds never produce a guessed image", async () => {
  const service = new AssetService(async () => [
    { name: "A", uniqueName: "/a", imageName: "A.png" },
    { name: "A", uniqueName: "/b", imageName: "B.png" },
  ]);
  expect(await service.resolve("mod", "A")).toBeUndefined();
  expect(await service.resolve("__proto__", "A")).toBeUndefined();
});
test("shards resolve to the composited wiki crystal, not the manifest glow sprite", async () => {
  const load = vi.fn(async () => {
    throw new Error("shards must not consult the artwork manifest");
  });
  const service = new AssetService(load);
  expect(await service.resolve("shard", "Azure Archon Shard")).toBe(
    "https://wiki.warframe.com/images/AzureArchonShard.png",
  );
  expect(
    await service.resolve("shard", "Tauforged Crimson Archon Shard"),
  ).toBe("https://wiki.warframe.com/images/TauforgedCrimsonArchonShard.png");
  expect(load).not.toHaveBeenCalled();
});
test("an unrecognised shard name still falls through to the manifest", async () => {
  const service = new AssetService(async () => [
    { name: "Archon Shard", uniqueName: "/x", imageName: "ArchonCrystal.png" },
  ]);
  expect(await service.resolve("shard", "Archon Shard")).toContain(
    "ArchonCrystal.png",
  );
});
