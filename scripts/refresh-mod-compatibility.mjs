import { writeFile } from "node:fs/promises";
import { allMods, allArcanes } from "../packages/engine/dist/index.js";
const revision = process.argv[2];
if (!/^[a-f0-9]{40}$/.test(revision ?? ""))
  throw new Error("Pass a reviewed WFCD commit SHA.");
const source = `https://raw.githubusercontent.com/WFCD/warframe-items/${revision}/data/json/Mods.json`;
const response = await fetch(source);
if (!response.ok) throw new Error(`Source returned ${response.status}`);
const rows = await response.json();
const arcaneResponse = await fetch(source.replace("Mods.json", "Arcanes.json"));
if (!arcaneResponse.ok)
  throw new Error("Arcane compatibility source unavailable");
const arcaneRows = await arcaneResponse.json();
const arcaneClasses = {};
for (const arcane of allArcanes) {
  const matches = arcaneRows.filter((row) => row.name === arcane.name);
  if (matches.length === 1 && typeof matches[0].type === "string")
    arcaneClasses[arcane.id] = matches[0].type
      .toLowerCase()
      .replace(/ arcane$/, "");
}
const byName = new Map();
for (const row of rows) {
  if (
    typeof row.name !== "string" ||
    (typeof row.compatName !== "string" && typeof row.type !== "string")
  )
    continue;
  const name = row.name.toLowerCase(),
    values = byName.get(name) ?? new Set();
  values.add((row.compatName ?? row.type).toLowerCase());
  byName.set(name, values);
}
const compatibility = {};
const presentation = {};
for (const mod of allMods) {
  const matches = byName.get(mod.name.toLowerCase());
  if (matches?.size === 1) compatibility[mod.id] = [...matches][0];
  const named = rows.filter(
    (row) => row.name?.toLowerCase() === mod.name.toLowerCase(),
  );
  if (named.length === 1)
    presentation[mod.id] = {
      exilus: named[0].isUtility === true,
      rankText: (named[0].levelStats ?? []).map((level) =>
        (level.stats ?? []).join("\n").replace(/<[^>]*>/g, ""),
      ),
    };
}
await writeFile(
  new URL(
    "../packages/services/src/catalog/mod-compatibility.json",
    import.meta.url,
  ),
  JSON.stringify(
    { source, revision, compatibility, presentation, arcaneClasses },
    null,
    2,
  ) + "\n",
);
console.log(
  `Wrote ${Object.keys(compatibility).length} compatibility labels; no damage statistics imported.`,
);
