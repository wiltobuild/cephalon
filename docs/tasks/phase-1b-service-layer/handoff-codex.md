# Codex handoff — Phase 1b tasks 7–10 (service layer + golden-baseline gate)

Run from repo root:

```
codex.cmd exec --skip-git-repo-check -s workspace-write -C "C:\Users\Wil\Documents\Projects\Cephalon" "<prompt below>" < /dev/null
```

---

## Prompt

Task: Cephalon Phase 1b tasks 7–10 — build the application service layer on top
of `@cephalon/engine` and the golden-baseline / calc-formula-gate CI. **No
calculation-formula, scaling, or constant changes anywhere. No Steel Path
(task 11, out of scope).**

Read first (all in the repo):
- `docs/tasks/phase-1b-service-layer/brief.md` — scope, out-of-scope, the 11
  ACs. Follow it precisely.
- `docs/tasks/upstream-engine-investigation/architecture.md` §11 (component
  table, Part C2 confidence map + the "Verified" definition, Part D data-flow
  traces) and §12.
- `docs/agent/decisions.md` (the 2026-08-30 entries, incl. the arcane-effect
  deviation and its Phase-1b follow-up — you may implement that follow-up:
  `CatalogService` can build a merged `ARCANE_EFFECTS` map and expose it, but do
  NOT thread anything through `calc/calculator.ts`).
- `packages/engine/src/index.ts` — the only surface you consume.

### Package: `packages/services` = `@cephalon/services`

- `package.json` (`private`, `type: module`, deps: `"@cephalon/engine":
  "workspace:*"`; devDep `vitest`), `tsconfig.json` (extends
  `../../tsconfig.base.json`, `noEmit`, no `@` alias needed — use relative
  imports and the `@cephalon/engine` barrel), `vitest.config.ts`
  (`environment: node`).
- Layout:
  - `src/catalog/catalog-service.ts` — `CatalogService` (AC 4). A class or a
    factory returning memoised getters. Loads from the barrel's catalog-assembly
    exports; applies an `OverrideSet` (default `[]`; read
    `src/catalog/catalog-overrides.json` if present — ship an empty `[]` file);
    runs `enrichWeapon` where relevant. Also `getArcaneEffectsMap()` returning
    the override-merged `ARCANE_EFFECTS` (the decisions.md follow-up).
  - `src/confidence/confidence-service.ts` — the Part C2 map as a typed
    `Record<MechanicKey, ConfidenceTag>` where `ConfidenceTag =
    "verified" | "approximation" | "not-modeled" | "pending-verification"`.
    Include the "Verified" definition verbatim as the file's doc comment.
    `tag(key)`, `assertTagged(keys)`. Export the `MechanicKey` union.
  - `src/build/build-service.ts` — `BuildService` (AC 6). `calculateWeapon` /
    `calculateWarframe`. Depends on `CatalogService` + `ConfidenceService`
    (constructor injection). Maps `Scenario` → `SimulationParams` over
    `DEFAULT_SIM_PARAMS`. View-model:
    `{ stats: { key, label, value: number, confidence: ConfidenceTag }[],
       perModContribution: { modId, label, dpsDelta, pct }[],
       caveats: string[] }`.
  - `src/build/scenario.ts` — the `Scenario` type (AC 9) with the S1 comments
    (no armor-strip-%, no headshot-%, no status-uptime — explain why in
    comments) and `scenarioToSimulationParams(scenario)`.
  - `src/simulation/simulation-service.ts` — `SimulationService` (AC 7).
    `ScenarioResult` view-model + the caveat set. Steel Path caveat is tagged
    `pending-verification` and its text must say "enemy-level only; Steel Path
    scaling not yet modelled (pending calc-formula task)".
  - `src/comparison/comparison-service.ts` — `ComparisonService` (AC 8).
    `compareBuilds`, `compareModSwap`. `BuildDiff` view-model with per-row
    `confidence` and a `whereEachWins: string[]`.
  - `src/player-context/player-context-service.ts` — a **type-only stub**:
    an `interface PlayerContextService` (ownership / mastery / inventory
    queries returning `Promise`s) + a `NullPlayerContext` implementation that
    returns "unknown" for everything. No Supabase.
  - `src/index.ts` — barrel for all of the above.
- Tests co-located as `*.test.ts` (vitest). Cover every AC's stated tests:
  CatalogService retrieval/override/memoisation; ConfidenceService snapshot +
  negative test + coverage assertion; BuildService ≥10 weapon + ≥6 warframe
  reference builds vs known-good numbers (compute the expected values once from
  the engine and lock them — they are Cephalon-side goldens, cite the build);
  SimulationService caveat presence; ComparisonService incl. the Primed Bane of
  Grineer faction-gating case.

### Task 10 — golden-baseline gate

- `packages/engine/scripts/gen-baseline.mjs` — imports the built barrel
  (`../src/index.ts` via a vitest/tsx run, or write it as a `*.bench`-style
  node script invoked through `pnpm --filter @cephalon/engine exec`), computes
  ~40–60 canonical builds (list them in a `BASELINE_BUILDS` array: bare +
  a few modded weapons across `rifle`/`shotgun`/`bow`/`beam`/`melee`, one
  Incarnon weapon, a warframe with mods, one railjack, one archwing), and
  writes `packages/engine/test/golden/engine-baseline.json` (stable key order,
  2-space indent) with the load-bearing numeric fields of each result
  (`sustainedDps`, `burstDps`, `totalDamage`, crit/status fields; for TTK
  entries the `ttkSeconds`/`shotsToKill`).
- `packages/engine/test/golden/verify-engine-baseline.test.ts` — recomputes the
  same builds and `expect(...).toEqual(baseline)` per build. Wire into the
  engine test run (it will make the file count 46 and add ~1 test-per-build).
- `scripts/check-formula-gate.mjs` — given the staged/committed diff
  (`git diff --name-only <base>...HEAD` or `--cached`), if any path matches
  `packages/engine/src/calc/`, `packages/engine/src/data/`, `-goldens.ts`, or
  `engine-baseline.json` AND no path matches `docs/agent/decisions.md`, exit 1
  with a clear message. Include a self-test.
- `.github/workflows/ci.yml` — add a `formula-gate` job running
  `node scripts/check-formula-gate.mjs` (against the PR base), and a
  `services` job (`pnpm --filter @cephalon/services test`). Existing jobs
  unchanged.
- **Demonstrate** (in your report, do not leave the change): temporarily bump a
  constant in `packages/engine/src/calc/ttk.ts` (e.g. the `2700` armor cap),
  show `verify-engine-baseline` fails and `check-formula-gate.mjs` fails, then
  revert.

### Must-not

- No change to any `packages/engine/src/{calc,data}/**` file (except adding the
  `test/golden/**` files and `scripts/gen-baseline.mjs`).
- No Steel Path, no `sp` field, no scaling/constant edits.
- No React / Next / Prisma / Supabase / network in `packages/services`.
- No new runtime npm deps beyond `@cephalon/engine` (workspace).
- Don't commit.

### Report back

- `pnpm -r typecheck`, `pnpm --filter @cephalon/services test`,
  `pnpm --filter @cephalon/engine test` (must stay 45→46 files / 0 fail)
  outputs.
- The `Scenario` → `SimulationParams` mapping table.
- The `MechanicKey` list and any Part C2 row you couldn't map to a concrete
  view-model stat.
- The `BASELINE_BUILDS` list.
- The formula-gate demonstration output (fail on constant bump, pass after
  revert).
- Any barrel export you needed that was missing, and anything ambiguous.
