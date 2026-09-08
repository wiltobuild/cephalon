import { catalog } from "@/server/services";
export function GET(request: Request) {
  const kind = new URL(request.url).searchParams.get("kind");
  if (kind === "warframe")
    return Response.json(
      [...catalog.getWarframesMap().values()].map((w) => ({
        id: w.id,
        name: w.name,
        category: "Warframe",
        description: `${w.health} health · ${w.shield} shields · ${w.armor} armor`,
        kind: "warframe",
      })),
    );
  if (kind === "mod")
    return Response.json(
      [...catalog.getModMap().values()].map((m) => ({
        id: m.id,
        name: m.name,
        category: m.category,
        description: m.description,
        kind: "mod",
      })),
    );
  if (kind === "shard")
    return Response.json(
      ["Crimson", "Azure", "Amber", "Emerald", "Topaz", "Violet"].flatMap(
        (color) =>
          [false, true].map((tau) => ({
            id: `${tau ? "tau-" : ""}${color.toLowerCase()}`,
            name: `${tau ? "Tauforged " : ""}${color} Archon Shard`,
            category: tau ? "Tauforged" : "Archon Shard",
            description:
              "Inspect the in-game effect before allocating. Offensive shard coverage varies by effect.",
            kind: "shard",
          })),
      ),
    );
  if (kind === "forma")
    return Response.json(
      ["Forma", "Umbra Forma", "Omni Forma", "Stance Forma"].map((name) => ({
        id: name,
        name,
        category: "Upgrade",
        description:
          "Configure installed polarities in the builder. The optimizer reports additional standard Forma.",
        kind: "forma",
      })),
    );
  return Response.json(
    catalog
      .listWeapons()
      .map((w) => ({
        ...w,
        description: w.isIncarnon
          ? "Incarnon available · builder uses catalog base form"
          : "Explore and build",
        kind: "weapon",
      })),
  );
}
