# Verification report — Phase 1a engine extraction

Verifier: coordinator (Apollo-equivalent). All commands run in this session on
the real workspace (Node v24.18, pnpm 9 via `npx pnpm@9`). Nothing committed.

## Acceptance criteria

1. **`pnpm install` clean; `pnpm -r typecheck` green** — **VERIFIED.**
   `pnpm -r typecheck` → `packages/engine: Done`, `apps/web: Done`, exit 0.
2. **Engine suite green at the engine baseline** — **VERIFIED.**
   `pnpm --filter @cephalon/engine test` → **45 files / 1879 tests / 0 failures
   / 0 skips.** Baseline: 43 engine test files / 1875 tests (upstream 47/1898
   minus the 4 non-engine files — `bot/worldstate-client`,
   `warframe-arsenal/{catalog-match,normalize-payload}`,
   `components/stats/use-sim-stat-change-flash` = 23 tests, per Argus
   investigation.md §6). Added: `overrides/override-isolation.test.ts` (+1
   file, +1 test) and `__smoke__/barrel.test.ts` (+1 file, +3 tests).
3. **`packages/engine/src` free of react/next/@prisma/next-auth/@wfcd/
   process.env/fetch(/window/document/localStorage** — **VERIFIED.**
   `node scripts/check-engine-boundary.mjs` → "Engine boundary check passed.
   Temporary allowlist: empty". No `data-overrides.ts` allowlist remains.
4. **No zero-arg `getEffective*(` / `getOverrides(` in `packages/engine/src`** —
   **VERIFIED.** `node scripts/check-no-ambient-catalog.mjs` → "Ambient catalog
   check passed." `getOverrides` is deleted entirely.
5. **Concurrency: two `OverrideSet`s don't cross-contaminate** — **VERIFIED.**
   `overrides/override-isolation.test.ts` passes.
6. **`override-merge.test.ts`, `build-url.test.ts`, `loadout-save.test.ts` pass
   in-package** — **VERIFIED** (all green in the suite; import paths updated to
   `@/support/build-resolvers` and `@/orchestration/loadout-stats`, no
   assertion changes).
7. **`orchestration/**` has no localStorage/window/persistence imports** —
   **VERIFIED** by the boundary check (covers all of `packages/engine/src`,
   `orchestration/` included) + `check-no-ambient-catalog`.
8. **`LICENSE` (AGPL-3.0) at repo root + `packages/engine/`; `NOTICE` +
   `data/PROVENANCE.md` present; upstream name not leaked** — **VERIFIED for
   file presence** (`LICENSE` both locations, `packages/engine/NOTICE`,
   `packages/engine/src/data/PROVENANCE.md`). NOTICE/PROVENANCE content accuracy
   and name-leak scan → deferred to Themis review.
9. **`apps/web` builds and imports `@cephalon/engine`** — **VERIFIED.**
   `pnpm --filter web build` → `next build` (Turbopack) "Compiled successfully",
   "Finished TypeScript", 3 static routes generated. The build resolves and
   typechecks `@cephalon/engine` via `transpilePackages` + source. Plus
   `__smoke__/barrel.test.ts` runs `calculateWeaponBuild` + `calculateWarframeBuild`
   + `calculateTTK` through the barrel — green.
10. **`docs/agent/upstream-sync.md` committed; full-history reference clone
    exists** — **VERIFIED.** Runbook written; reference clone at
    `../_upstream-engine-reference/` (438 commits, outside the monorepo,
    recorded in the runbook).

## calc/data integrity

`calc/**` and `data/**` diffed against the full-history upstream reference
(CRLF-normalized, `@/lib/` → `@/`): **byte-identical except 4 files** —
`calc/{archwing,companion,railjack}-calculator.ts` and
`mods/warframe-augment-mods.ts`, whose `allMods = getEffectiveModsMap()`
**default parameter values** were changed to a static `Map` built from
`@/data/mods` (the ambient accessor they defaulted to now requires an
argument). All callers that pass `allMods` explicitly are unaffected; with no
overrides set (every one of the 1875 ported tests) the static map is identical
to the effective map, so behaviour under test is unchanged. Runtime-with-
overrides implications flagged for Themis / follow-up.

`weapons/effective-data.ts` differs as intended (8 accessors now take
`OverrideSet`). `overrides/data-overrides.ts` differs as intended (singleton +
persistence removed).

## Post-Themis fixups (2026-08-30)

Themis review (`review.md`) → "needs one more small pass": 1 must-fix + 1
documentation must-do + optionals. Applied:

- **M1 (must-fix) — FIXED.** `scripts/check-engine-boundary.mjs` rewritten:
  import-specifier checks now run against comment-stripped-but-string-preserving
  content (bare-word checks still run against fully-stripped content), plus a
  built-in self-test that aborts if any check stops firing. Verified: a probe
  `import { useState } from "react"` in `packages/engine/src` now fails the
  script (exit 1); removing it passes (exit 0); self-test "ok".
- **S3 (must-do) — RECORDED.** `arcane-effect-overrides.ts` keeps
  `overrides: OverrideSet = []` (making it required would force an
  `OverrideSet` param through the excluded `calc/calculator.ts`). Logged as an
  approved deviation with a Phase-1b follow-up in `docs/agent/decisions.md`
  (2026-08-30 entry) and flagged in the barrel comment + open items below.
- **O2 / S1 / S2 — minimised.** The 4 default-param files
  (`calc/{archwing,companion,railjack}-calculator.ts`,
  `mods/warframe-augment-mods.ts`) now differ from upstream by exactly the
  `([])` argument on `getEffectiveModsMap` / `getEffectiveWarframesMap` — the
  minimal change the required-param signature forces. `warframe-augment-mods.ts`
  keeps its accessor imports (no static-map rebuild, no seam removal).
- **O1 — done.** `override-isolation.test.ts` extended: applies a non-trivial
  override via `getEffectiveWeapons(set)` then asserts a fresh
  `getEffectiveWeapons([])` is byte-identical to the pre-call baseline (proves
  no in-place mutation of shared base state).
- **O5 — done.** `LICENSE` (repo root + `packages/engine/`) is now the full
  canonical GNU AGPL-3.0 text (fetched from gnu.org) with a short Cephalon
  copyright preamble; upstream attribution lives in `packages/engine/NOTICE`.
  No upstream project name in `LICENSE`.
- **O6 — done.** `getArcaneEffectDef` / `applyArcaneEffectOverrides` added to
  the barrel's catalog-assembly group with a comment marking the S3 gap.
- **O4 — deferred (not done).** A real `@cephalon/engine` import in `apps/web`
  makes `apps/web`'s `tsc` walk into the engine's `@/`-aliased source, which
  only resolves under the engine's own tsconfig. Resolving that cleanly needs
  the R2 `dist` build step (tsup / tsc-alias), which is explicitly deferred to
  the first second consumer / publish. AC 9 is covered for now by the
  in-package `__smoke__/barrel.test.ts` (runs weapon + warframe + TTK through
  the barrel) and by `next build` compiling `apps/web` with the dependency
  declared + `transpilePackages`. Booked as an open item.
- **S4 — done.** Scrubbed the upstream project name / author / repo URL from
  the investigation + phase-1a task docs; it now appears only in
  `docs/agent/upstream-engine.md`, `packages/engine/NOTICE`, and
  `packages/engine/src/data/PROVENANCE.md`.
- **CI wiring — confirmed by Themis** (`.github/workflows/ci.yml`: `typecheck`
  runs `pnpm -r typecheck` + both guard scripts; `engine-regression` runs the
  suite; `web-build`; no `continue-on-error`).
- **Housekeeping:** `*.tsbuildinfo` added to `.gitignore`; removed a dead
  `packages/engine/smoke/` (superseded by `src/__smoke__/`).

## Final state (re-verified after all fixups)

- `pnpm -r typecheck` → engine **Done**, web **Done**.
- `pnpm --filter @cephalon/engine test` → **45 files / 1880 tests / 0 failures
  / 0 skips**.
- `node scripts/check-engine-boundary.mjs` → passes, self-test ok, empty
  allowlist, and now genuinely catches `react`/`next`/`next-auth`/`@prisma`/
  `@wfcd` imports.
- `node scripts/check-no-ambient-catalog.mjs` → passes.
- `pnpm --filter web build` → `next build` compiled successfully.
- `calc/**` + `data/**` vs upstream: byte-identical except the 4 files above
  (`([])` argument only).

## Open items (carried to the final report)

- **O4** — `apps/web` consumer smoke import, blocked on the R2 `dist` build.
- **S3 follow-up** — thread `arcane_effect` overrides to the calc path when the
  CatalogService lands (Phase 1b).
- **O3** — engine `tsconfig.json` excludes `*.test.ts` from `tsc`; ported test
  call-sites aren't type-checked (only the `check-no-ambient-catalog` grep +
  runtime). Consider a test-inclusive tsc project.
- `packages/engine/NOTICE` / `PROVENANCE.md` accuracy confirmed by Themis.
