type AssetKind =
  | "weapon"
  | "mod"
  | "mod-card"
  | "warframe"
  | "shard"
  | "forma"
  | "arcane"
  | "companion"
  | "archwing";
const categories: Record<AssetKind, string[]> = {
  archwing: ["Archwing"],
  weapon: ["Primary", "Secondary", "Melee", "Arch-Gun"],
  mod: ["Mods"],
  "mod-card": ["Mods"],
  warframe: ["Warframes"],
  shard: ["Misc"],
  forma: ["Misc"],
  arcane: ["Arcanes"],
  companion: ["Pets", "Sentinels", "Primary", "Secondary", "Melee"],
};
type Asset = {
  uniqueName: string;
  name: string;
  imageName: string;
  wikiaThumbnail?: string;
};
const normalize = (name: string) =>
  name
    .replace(/<[^>]*>/g, "")
    .trim()
    .toLowerCase();

/** External artwork metadata stays independent from the calculation catalog. */
export class AssetService {
  private cache = new Map<string, Promise<Asset[]>>();
  constructor(
    private readonly loader: (category: string) => Promise<unknown>,
  ) {}
  private load(category: string): Promise<Asset[]> {
    const cached = this.cache.get(category);
    if (cached) return cached;
    const pending = this.loader(category)
      .then((rows) => {
        if (!Array.isArray(rows)) throw new Error("Invalid artwork manifest");
        return rows
          .filter(
            (row): row is Asset =>
              !!row &&
              typeof row.name === "string" &&
              typeof row.uniqueName === "string" &&
              typeof row.imageName === "string" &&
              /^[\w. -]+$/.test(row.imageName) &&
              !/test/i.test(row.name),
          )
          .map((row) => ({
            uniqueName: row.uniqueName,
            name: normalize(row.name),
            imageName: row.imageName,
            wikiaThumbnail:
              typeof row.wikiaThumbnail === "string" &&
              /^https:\/\/wiki\.warframe\.com\/images\//.test(
                row.wikiaThumbnail,
              )
                ? row.wikiaThumbnail
                : undefined,
          }));
      })
      .catch((error) => {
        this.cache.delete(category);
        throw error;
      });
    this.cache.set(category, pending);
    return pending;
  }
  async resolve(kind: string, name: string): Promise<string | undefined> {
    if (!Object.hasOwn(categories, kind) || name.length > 150) return undefined;
    if (kind === "shard") {
      // The artwork manifest points Tauforged shards at a glow-only sprite
      // (ArchonShard*MythicGlow.png); the wiki carries the composited crystal.
      // The Archon Shard name set is closed and each URL below is verified.
      const shard = normalize(name).match(
        /^(tauforged )?(amber|azure|crimson|emerald|topaz|violet) archon shard$/,
      );
      if (shard) {
        const color = shard[2][0].toUpperCase() + shard[2].slice(1);
        const file = `${shard[1] ? "Tauforged" : ""}${color}ArchonShard`;
        return `https://wiki.warframe.com/images/${file}.png`;
      }
    }
    const lists = await Promise.all(
      categories[kind as AssetKind].map((category) => this.load(category)),
    );
    const matches = lists.flat().filter((row) => row.name === normalize(name));
    if (kind === "mod-card") {
      const cards = [
        ...new Set(matches.map((row) => row.wikiaThumbnail).filter(Boolean)),
      ];
      return cards.length === 1 ? cards[0] : undefined;
    }
    const images = [...new Set(matches.map((row) => row.imageName))];
    return images.length === 1
      ? `https://cdn.warframestat.us/img/${encodeURIComponent(images[0])}`
      : undefined;
  }
}
