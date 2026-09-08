type AssetKind =
  | "weapon"
  | "mod"
  | "mod-card"
  | "warframe"
  | "shard"
  | "forma"
  | "arcane"
  | "companion";
const categories: Record<AssetKind, string[]> = {
  weapon: ["Primary", "Secondary", "Melee", "Arch-Gun"],
  mod: ["Mods"],
  "mod-card": ["Mods"],
  warframe: ["Warframes"],
  shard: ["Misc"],
  forma: ["Misc"],
  arcane: ["Arcanes"],
  companion: ["Pets", "Sentinels"],
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
