import { defineConfig } from "tsup";

// R2 build step (architecture.md §11 packaging decision): the engine keeps a
// contained `@/*` alias internally; consumers must not see it. tsup bundles
// `src/index.ts` into a single alias-free `dist/index.js` + `dist/index.d.ts`,
// so `@cephalon/services` / `apps/web` resolve `@cephalon/engine` via the
// package `exports` map with no alias knowledge. Engine's own tests still run
// against `src/` (vitest.config.ts).
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  sourcemap: true,
  clean: true,
  target: "es2022",
  platform: "neutral",
  tsconfig: "tsconfig.json",
});
