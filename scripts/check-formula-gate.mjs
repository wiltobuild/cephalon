import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const selfTest = process.argv.includes("--self-test");
const protectedPath = (path) => /^packages\/engine\/src\/(calc|data)\//.test(path) || /-goldens\.ts$/.test(path) || /(^|\/)engine-baseline\.json$/.test(path);
const decisionsPath = (path) => path === "docs/agent/decisions.md";
export function checkFormulaGate(paths) {
  if (paths.some(protectedPath) && !paths.some(decisionsPath)) return "Formula-gate: calculation/data/golden changes require docs/agent/decisions.md in the same diff.";
  return undefined;
}
const invokedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (selfTest && invokedDirectly) {
  if (!checkFormulaGate(["packages/engine/src/calc/ttk.ts"]) || checkFormulaGate(["packages/engine/src/calc/ttk.ts", "docs/agent/decisions.md"])) throw new Error("formula-gate self-test failed");
  console.log("formula-gate self-test passed");
} else if (invokedDirectly) {
  const base = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}...HEAD` : "--cached";
  const paths = execFileSync("git", ["diff", "--name-only", ...base.split(" ")], { encoding: "utf8" }).split(/\r?\n/).filter(Boolean);
  const failure = checkFormulaGate(paths);
  if (failure) { console.error(failure); process.exit(1); }
  console.log("formula-gate passed");
}
