# Final report — Phase 1b (tasks 7–10)

**Milestone:** Phase 1b tasks 7–10. **Status:** complete, verified,
Themis-reviewed (one pass + fixups). **Task 11 (Steel Path) is NOT done** — it
is the next task and requires the user's dated sign-off on wiki-sourced scaling
values.

## What changed

`packages/services` (`@cephalon/services`) — the framework-free application
service layer the UI and the future AI tool layer call:

| Service | Responsibility |
|---|---|
| `CatalogService` | loads the `@cephalon/engine` catalog, applies an `OverrideSet` (empty default + `catalog-overrides.json` hook), enriches, memoises `getWeapon`/`getWarframe`/`getModMap`/`getArcanes`/`getEnemyTypes`/`getArcaneEffectsMap` |
| `ConfidenceService` | the Part C2 map (`MechanicKey` → Verified/Approximation/Not-modeled/Pending), the "Verified" definition verbatim, `tag()` / `assertTagged()` |
| `BuildService` | `calculateWeapon` / `calculateWarframe` → confidence-tagged view-models; `Scenario` → `SimulationParams`; wraps engine calls, no formula math |
| `SimulationService` | `calculateTTK` / `simulateDiscreteTTK` / `runDamageSim` + an always-on caveat set (EV status, 19-archetype roster, no magnetic/overguard/eximus, **Steel Path pending-verification**) |
| `ComparisonService` | `compareBuilds` / `compareModSwap` → `BuildDiff` with per-row confidence + faction-gated-mod annotation |
| `PlayerContextService` | type-only interface + `NullPlayerContext` stub (no Supabase) |

Plus:
- **`Scenario` type** — deliberately omits `armorStripPercent` / headshot-rate /
  status-uptime / target-priming (S1: not first-class engine inputs), each with
  a rationale comment.
- **Golden baseline (task 10)** — `packages/engine/test/golden/`:
  `baseline-builds.ts` (~48 canonical builds), `engine-baseline.json`,
  `verify-engine-baseline.test.ts` (per-build deep-equal over every finite
  numeric field). Engine suite: 45 → **46 files / 1925 tests**.
- **Formula gate** — `scripts/check-formula-gate.mjs` (+ `--self-test`): a diff
  touching `packages/engine/src/{calc,data}/**` / `*-goldens.ts` /
  `engine-baseline.json` without a `docs/agent/decisions.md` change fails. CI
  jobs `formula-gate` + `services` added.
- **R2 engine build (forced by the second consumer).** `@cephalon/engine` now
  builds to `dist/` via **tsup** (single alias-free `index.js` + `.d.ts`);
  `exports`/`main`/`types` point there; engine's own tests still run against
  `src/`. `tsconfig.base.json` lost `"incremental"` (broke tsup's dts worker).
  CI `typecheck` / `services` / `web-build` build the engine first; `services`
  also has `pretest`/`pretypecheck` hooks for fresh clones.

## Themis review + fixups

Verdict "needs another pass", 4 must-fix — all resolved:
- **M1** warframe view-model routed 5 durability stats through one `totalDamage`
  key (broke key-based selection, hollow `verified` tag) → real
  `warframe*` keys added.
- **M2** AC-6 "vs known-good numbers" was `expect.any(Number)` over bare
  weapons → new `build-service.golden.test.ts`: faithful-translation deep-equal
  for 4 modded weapon + 1 modded warframe builds, + snapshot-locked anchors for
  3 cited modded builds.
- **M3** `scenario.primedTarget` was wired to the unrelated `applyTriggerBuffs`
  → field removed, documented.
- **M4** the change couldn't pass its own formula gate on a first PR →
  `decisions.md` entry establishing the baseline.
Optionals O1–O4, O9 also applied (see `verification.md`). O5–O8, O10 logged as
follow-ups.

## Verification (re-run after fixups)

- `pnpm -r typecheck` → engine / services / web **Done**.
- `pnpm --filter @cephalon/engine test` → **46 / 1925 / 0**.
- `pnpm --filter @cephalon/services test` → **6 / 35 / 0**.
- boundary (engine + services) / ambient-catalog / formula-gate self-test → pass.
- `pnpm --filter web build` → compiled.
- formula-gate real demo: a staged `calc/` or baseline change without
  `decisions.md` → exit 1.

## Open items (not blocking)

- **Arcane-effect override follow-up (decisions.md 2026-08-30) is half-done.**
  `CatalogService.getArcaneEffectsMap()` exposes the override-merged
  `ARCANE_EFFECTS`, but `BuildService` does not thread it into
  `calculateWeaponBuildWithArcanes`. The Phase-1a gap (arcane-effect *magnitude*
  overrides don't reach the damage math) is still open — close it when the
  override host / CatalogService wiring matures.
- Service tests: the golden test locks 4 weapon + 1 warframe builds; broaden as
  the 1c UI surfaces drive out what the view-models must return.
- O5 (`incremental` removed from the shared base tsconfig — wider than needed),
  O6 (`test/golden/**`, `scripts/*`, and `*.test.ts` are outside `tsc` scope),
  O7 (two baseline generators; `vite-node` undeclared), O8 (`formula-gate` is a
  no-op on `push`, only meaningful on PRs), O10 (memoisation test covers 2 of
  ~6 catalog getters).
- **1c client-bundle risk:** `dist/index.js` is 2.7 MB (inlines the catalog);
  `apps/web` must keep engine calls server-side — one client import pulls the
  whole catalog into the browser bundle.

## Next — STOP for user sign-off

**Task 11 — Steel Path**, the first exercise of the calc-formula gate:
1. Argus sources SP's health / armor / level-shift / damage-attenuation
   multipliers from the wiki with citations → a before/after spec.
2. Athena writes the before/after formula + value sources.
3. **User signs off with a dated `decisions.md` entry on the actual values.**
4. Codex adds an opt-in `sp` input to `SimulationParams` + the scaling in
   `ttk.ts` + a dated `game-constants` block; non-SP tests stay byte-identical.
5. Elevated Themis + Apollo (full suite + new SP tests).
Then `ConfidenceService` upgrades Steel Path from `pending-verification` to
`verified`, and 1c task 15 (Scenario Simulator) can ship a real SP toggle.
