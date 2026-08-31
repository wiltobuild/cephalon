import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const engineSource = path.join(repositoryRoot, "packages", "engine", "src");
const temporaryAllowlist = new Map();

// `import` checks run against comment-stripped-but-STRING-PRESERVING content so the
// module specifier is still visible. Bare-identifier checks run against fully
// stripped content (strings removed) to avoid false positives from text/JSON.
const importChecks = [
  ["framework import", /(?:from|import)\s*["'](?:react|next|next-auth)(?:["']|\/)/g],
  ["Prisma import", /(?:from|import)\s*["']@prisma\//g],
  ["WFCD import", /(?:from|import)\s*["']@wfcd\//g],
];
const bareChecks = [
  ["process.env", /process\.env/g],
  ["fetch", /\bfetch\s*\(/g],
  ["window", /\bwindow\b/g],
  ["document", /\bdocument\b/g],
  ["localStorage", /\blocalStorage\b/g],
];

function stripComments(content) {
  return content.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\r\n]*/g, "");
}
function stripStrings(content) {
  return content.replace(/(['"`])(?:\\.|(?!\1)[^\\\r\n])*\1/g, "");
}

function scan(relativePath, raw) {
  const noComments = stripComments(raw);
  const noStrings = stripStrings(noComments);
  const found = [];
  for (const [label, pattern] of importChecks) {
    const n = (noComments.match(pattern) ?? []).length;
    if (n > 0 && !(temporaryAllowlist.get(relativePath) ?? []).includes(label)) {
      found.push(`${relativePath}: ${label} (${n})`);
    }
  }
  for (const [label, pattern] of bareChecks) {
    const n = (noStrings.match(pattern) ?? []).length;
    if (n > 0 && !(temporaryAllowlist.get(relativePath) ?? []).includes(label)) {
      found.push(`${relativePath}: ${label} (${n})`);
    }
  }
  return found;
}

// --- self-test: the guard must catch a known-bad probe -----------------------
const PROBE = [
  'import { useState } from "react";',
  'import NextAuth from "next-auth";',
  'import client from "@prisma/client";',
  'import items from "@wfcd/items";',
  "const a = process.env.FOO;",
  "const b = window;",
  "const c = localStorage;",
  'const d = fetch("/x");',
  "const e = document;",
].join("\n");
const probeHits = scan("__probe__.ts", PROBE).map((h) => h.split(": ")[1].split(" ")[0]);
const expected = ["framework", "framework", "Prisma", "WFCD", "process.env", "fetch", "window", "document", "localStorage"];
const missing = expected.filter((label) => !probeHits.some((h) => h.startsWith(label.split(".")[0])));
if (missing.length > 0) {
  console.error("check-engine-boundary self-test FAILED — these checks did not fire:", missing.join(", "));
  process.exit(2);
}

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(fullPath) : [fullPath];
  }));
  return nested.flat();
}

const violations = [];
for (const file of await filesUnder(engineSource)) {
  if (!file.endsWith(".ts")) continue;
  const relativePath = path.relative(engineSource, file).replaceAll(path.sep, "/");
  violations.push(...scan(relativePath, await readFile(file, "utf8")));
}

if (violations.length > 0) {
  console.error("Engine boundary check failed:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log("Engine boundary check passed (self-test ok).");
  console.log(`Temporary allowlist: ${temporaryAllowlist.size === 0 ? "empty" : [...temporaryAllowlist.keys()].join(", ")}`);
}
