import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const result = spawnSync("pnpm", ["exec", "vite-node", "scripts/write-baseline.ts"], { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
process.exit(result.status ?? 1);
