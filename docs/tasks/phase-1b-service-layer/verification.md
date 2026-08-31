# Verification report — Phase 1b (tasks 7–10)

Verifier: coordinator. Commands run this session on the real workspace (Node
v24.18, pnpm 9). Nothing committed. Task 11 (Steel Path) not in scope.

## Commands

| Check | Result |
|---|---|
| `pnpm install` | clean (adds `tsup` + tree; pre-authorised by the R2 decision) |
| `pnpm --filter @cephalon/engine build` (tsup) | `dist/index.js` 2.72 MB + `dist/index.d.ts` 65.8 KB + sourcemap |
| `pnpm -r typecheck` | engine **Done**, services **Done**, web **Done** |
| `pnpm --filter @cephalon/engine test` | **46 files / 1925 / 0 fail** (was 45/1880; +`verify-engine-baseline.test.ts`, +~45 build assertions) |
| `pnpm --filter @cephalon/services test` | **5 files / 23 / 0 fail** |
| `pnpm --filter web build` | `next build` compiled successfully |
| `node scripts/check-engine-boundary.mjs` | passes (self-test ok, empty allowlist) |
| `node scripts/check-no-ambient-catalog.mjs` | passes |
| `node scripts/check-formula-gate.mjs --self-test` | passes |
| formula-gate real demo | staging `packages/engine/test/golden/engine-baseline.json` (or any `calc/` file) without a `docs/agent/decisions.md` change → `check-formula-gate.mjs` exits 1 with the guard message |

## Coordinator changes on top of the Codex handoff

- **tsup dist build for `@cephalon/engine` (R2 trigger fired).** A second
  consumer (`packages/services`) means `tsc` and vitest for the consumer must
  resolve `@cephalon/engine` without the engine's internal `@/*` alias. Added
  `packages/engine/tsup.config.ts` (bundle `src/index.ts` → single alias-free
  `dist/index.{js,d.ts}`), `build` script, `exports`/`main`/`module`/`types` →
  `dist`. Engine's own tests still run against `src/` (`vitest.config.ts`
  untouched). Removed `"incremental": true` from `tsconfig.base.json` (it broke
  tsup's dts worker; `*.tsbuildinfo` already gitignored). CI `typecheck` /
  `services` / `web-build` jobs run `pnpm --filter @cephalon/engine build`
  first; `dist/` is gitignored (built in CI / on demand locally).
- **`build-service.ts` type fix** — `arcaneIds.map(...).filter(Boolean)`
  produced `(Mod | undefined)[]` where `Mod[]` was required; changed to a typed
  `.filter((a): a is NonNullable<typeof a> => a != null)`. No behaviour change.
- **`.gitignore` fix** — the bare `build/` rule was matching
  `packages/services/src/build/` and would have silently dropped `BuildService`
  + `Scenario` from the commit. Anchored to `/build/`.
- **CI** — added `pnpm --filter @cephalon/engine build` to the three dependent
  jobs.

## Acceptance criteria (1b)

1 (install/typecheck) ✅ · 2 (`@cephalon/services test` green + CI `services`
job) ✅ · 3 (engine suite unaffected — 46/1925, the +file/+tests are task 10's
own baseline verifier) ✅ · 4 (CatalogService) ✅ · 5 (ConfidenceService —
map + Verified definition + negative test) — **see Themis** for whether the
coverage assertion is real and the `totalDamage` key reuse for
Shield/Armor/Energy is a modelling bug · 6 (BuildService) — **partial**:
`build-service.test.ts` runs 10 weapon + 6 warframe cases but asserts only
shape/tag, not locked known-good values, and only bare (`modSlots: []`) builds.
Flagged for Themis / a follow-up; engine numeric correctness is locked by task
10 · 7 (SimulationService caveats) ✅ (Steel Path caveat gated at level ≥ 100 —
Themis to judge the threshold) · 8 (ComparisonService + Primed Bane faction
gating) ✅ · 9 (`Scenario` type omits armor-strip-% / headshot-% /
status-uptime with comments) ✅ · 10 (golden baseline + formula-gate + CI) ✅
· 11 (no upstream name leak) ✅

## Post-Themis fixups (2026-08-30)

Themis review (`review.md`) → "needs another pass", 4 must-fix + 10 optional.
Applied:

- **M1 (must-fix) — FIXED.** Added real `MechanicKey`s
  `warframeEhp`/`warframeHealth`/`warframeShield`/`warframeArmor`/`warframeEnergy`
  (all `verified` — deterministic survivability, covered by
  `warframe-math-audit` / `warframe-mod-audit`) + `modCapacityCost` (`verified`).
  `WARFRAME_STAT_FIELDS` no longer routes 5 distinct stats through
  `totalDamage`; key-based selection in `ComparisonService` no longer collapses.
  New regression test in `confidence-service.test.ts` asserts no warframe field
  key is `totalDamage`.
- **M2 (must-fix) — FIXED.** New `build/build-service.golden.test.ts`:
  (a) **faithful-translation** deep-equal — `BuildService.calculateWeapon`/
  `calculateWarframe` `.rawStats` `toEqual` a direct `@cephalon/engine` call
  with the same inputs, for **4 modded weapon builds + 1 modded warframe**
  (cited mod lists, a non-default `Scenario`: grineer / headshots / 2 status /
  3 kill / 12 arcane); (b) **regression anchors** — key stats
  (sustained/burst DPS, total damage, CC, multishot / EHP, HP, armor, shield)
  for 3 cited modded builds + 1 warframe are snapshot-locked
  (`__snapshots__/build-service.golden.test.ts.snap`). Values sanity-checked
  (braton 4-mod burst 3832, soma+HeavyCal burst 15298, rhino EHP 2314 — all
  plausible). Codex's 16 shape tests kept as smoke.
- **M3 (must-fix) — FIXED.** Removed `primedTarget` from the `Scenario` type
  and the `applyTriggerBuffs` mapping. Added an S1-style comment: priming is
  proc-derived (set `statusTypesOnTarget > 0`), and `applyTriggerBuffs` is a
  player trigger-buff flag unrelated to the target.
- **M4 (must-fix) — FIXED.** `docs/agent/decisions.md` entry (2026-08-30)
  establishes the golden baseline (provenance: catalog @ `e66896a`, July 2026
  sync), so the introducing commit satisfies its own formula-gate; the entry
  also books the `check-formula-gate.mjs` create-vs-modify refinement as a
  follow-up.
- **O1 — done.** `confidence-service.test.ts` now imports the real
  `WEAPON_STAT_FIELDS` / `WARFRAME_STAT_FIELDS` from `build-service.ts` and
  asserts every emitted key (+ `ttk`, `modCapacityCost`) resolves to a real
  tag.
- **O2 — done.** `ComparisonService` routes the TTK and mod-capacity row
  confidence through `this.builds.confidence.tag(...)` instead of hardcoded
  strings.
- **O3 — done.** `packages/services/package.json` gets `pretest` /
  `pretypecheck` → `pnpm --filter @cephalon/engine build`, so a fresh clone
  works without a manual pre-build (verified: `pretypecheck` auto-built the
  engine in the run above).
- **O4 — done.** The Steel Path caveat is now attached **unconditionally**
  (was `level >= 100`) with clearer text; a test asserts it at levels 30 / 100
  / 500 and that the text never claims the level scaling shown IS Steel Path.
- **O9 — done.** `scripts/check-engine-boundary.mjs` now also scans
  `packages/services/src` for framework/ORM imports + `fetch(` (rename:
  "Boundary check").
- **Deferred (optional):** O5 (`incremental` blast radius), O6 (test files +
  `test/golden/**` + `scripts/*` not in `tsc` scope), O7 (fold the two baseline
  generators; declare `vite-node`), O8 (`formula-gate` is PR-only on `push`),
  O10 (memoisation test covers only 2 of the catalog getters). Logged as
  follow-ups; none blocks the milestone.
- **Scope-drift note carried:** the arcane-effect override follow-up
  (decisions.md 2026-08-30) is **half-done** — `CatalogService.getArcaneEffectsMap()`
  exposes the merged map but `BuildService` does not yet pass it to the calc
  path. Still open; not closed. Recorded in the final report.

## Final state (re-verified after fixups)

- `pnpm -r typecheck` → engine / services / web all **Done** (services
  `pretypecheck` builds the engine dist first).
- `pnpm --filter @cephalon/engine test` → **46 files / 1925 / 0 fail**.
- `pnpm --filter @cephalon/services test` → **6 files / 35 / 0 fail**.
- `check-engine-boundary.mjs` (engine + services), `check-no-ambient-catalog.mjs`,
  `check-formula-gate.mjs --self-test` → all pass.
- `pnpm --filter web build` → compiled.
