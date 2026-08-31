import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "packages", "engine", "src");
async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  }))).flat();
}

const pattern = /getEffective[A-Za-z]*\s*\(\s*\)|getOverrides\s*\(/g;
const violations = [];
for (const file of await filesUnder(root)) {
  if (!file.endsWith(".ts")) continue;
  const matches = (await readFile(file, "utf8")).match(pattern) ?? [];
  if (matches.length) violations.push(`${path.relative(root, file)}: ${matches.join(", ")}`);
}
if (violations.length) {
  console.error("Ambient catalog check failed:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log("Ambient catalog check passed.");
}
