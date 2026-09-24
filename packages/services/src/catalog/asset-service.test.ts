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
test("normal and Tauforged shards retain separate images", async () => {
  const service = new AssetService(async () => [
    {
      name: "<Shard_blue_simple> Azure Archon Shard",
      uniqueName: "/a",
      imageName: "Azure.png",
    },
    {
      name: "Tauforged Azure Archon Shard",
      uniqueName: "/b",
      imageName: "Tau.png",
    },
  ]);
  expect(await service.resolve("shard", "Azure Archon Shard")).toContain(
    "Azure.png",
  );
  expect(await service.resolve("shard", "Tauforged Azure Archon Shard")).toBe(
    "/art/shards/TauforgedAzureArchonShard.png",
  );
});

test("ability icons resolve from nested Warframe abilities", async () => {
  const service = new AssetService(async () => [
    {
      abilities: [
        {
          name: "Shuriken",
          uniqueName: "/ability",
          imageName: "NinjaStar.png",
        },
      ],
    },
  ]);
  expect(await service.resolve("ability", "Shuriken")).toBe(
    "https://cdn.warframestat.us/img/NinjaStar.png",
  );
});

test("all six Tauforged colors use complete local artwork without fetching glow metadata", async () => {
  const load = vi.fn(async () => []);
  const service = new AssetService(load);
  for (const color of [
    "Crimson",
    "Amber",
    "Azure",
    "Topaz",
    "Violet",
    "Emerald",
  ]) {
    expect(
      await service.resolve("shard", `Tauforged ${color} Archon Shard`),
    ).toBe(`/art/shards/Tauforged${color}ArchonShard.png`);
  }
  expect(load).not.toHaveBeenCalled();
});
