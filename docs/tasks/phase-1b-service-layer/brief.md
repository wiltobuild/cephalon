# Brief: Phase 1b — service layer + gates (tasks 7–10)

## Scope

Milestone 1b tasks **7–10** from
[`../upstream-engine-investigation/architecture.md`](../upstream-engine-investigation/architecture.md)
§12 / [`plan.md`](../upstream-engine-investigation/plan.md) Part G. **Task 11
(Steel Path) is NOT in this scope** — it is a calc-formula-gate task that needs
the user's dated sign-off on wiki-sourced values first.

Build Cephalon's application service layer on top of `@cephalon/engine`: the
services the UI and the future AI tool layer call, the calculation-confidence
model, build comparison, and the golden-baseline / calc-formula-gate CI
machinery.

1. **CatalogService + ConfidenceService**
2. **BuildService + SimulationService**
3. **ComparisonService**
4. **Engine golden-baseline gate** (+ CI path-filter for the calc-formula gate)

New package: **`packages/services`** (`@cephalon/services`) — framework-free
TypeScript, its own `vitest`, its own CI job. (The architecture doc allows
`apps/web/src/server/services` *or* `packages/services`; a package is chosen for
isolated testability and reuse by the AI tool layer.)

## Out of scope

- **Steel Path / any calc-formula or constant change** (task 11, gated).
- Design system, any UI, `apps/web` beyond wiring (milestone 1c).
- The AI tool layer / Ask Cephalon (Phase 2 — services are shaped for it, not
  built).
- Supabase / auth / real `PlayerContextService` (a typed stub interface only).
- `@cephalon/engine` internals — consume the barrel only; no engine edits
  except, if unavoidable, adding a **named export** that was omitted (report
  it).
- The deferred R2 `dist` build for `@cephalon/engine`.

## Acceptance criteria

1. `pnpm install` clean; `pnpm -r typecheck` green (engine, services, web).
2. `pnpm --filter @cephalon/services test` green; a new CI job runs it.
3. `pnpm --filter @cephalon/engine test` still **45 files / 1880 / 0 fail**
   (services work must not touch the engine suite).
4. **CatalogService** — loads catalog from `@cephalon/engine`, applies an
   `OverrideSet` (empty static default; a `catalog-overrides.json` hook), runs
   enrich, exposes memoised `getWeapon(id)` / `getWeaponsMap()` /
   `getWarframe(id)` / `getWarframesMap()` / `getModMap()` / `getArcanes()` /
   `getArchonShards()` / `getCompanions()` / `getEnemyTypes()`. Never re-derives
   catalogs per call. Unit tests: retrieval, override application, memoisation
   identity.
5. **ConfidenceService** — single source of truth for the Verified /
   Approximation / Not-modeled / Pending-verification map (from architecture.md
   Part C2, including the M6 "Verified" definition verbatim as a doc comment and
   the S1 not-an-input rows). `tag(mechanicKey)` API. Tests: full-map snapshot;
   a **negative test** asserting the Approximation/Not-modeled/Pending set can
   never resolve to `verified`; every stat key a Service view-model emits has a
   tag.
6. **BuildService** — `calculateWeapon(input)` and `calculateWarframe(input)`
   return confidence-tagged view-models. `input` for weapon:
   `{ weaponId, modSlots, arcaneIds?, rivenStatChanges?, incarnonStatChanges?,
   scenario }`. Assembles `SimulationParams` over `DEFAULT_SIM_PARAMS` from the
   `scenario` (see below), calls `calculateWeaponBuildWithArcanes` +
   `computeDpsContributions`, maps `CalculatedStats` → a view-model of
   `{ key, label, value, confidence }[]` plus a `perModContribution` list.
   `calculateWarframe`: `calculateWarframeBuild` + `applyWarframeShardsAndArcanes`.
   No formula math in the service — only param assembly + field mapping +
   tagging. Integration tests: ≥10 reference weapon builds + ≥6 warframe builds
   vs known-good numbers (seed from the engine goldens / `braton`, `torid`,
   etc.).
7. **SimulationService** — `simulate(buildResult | CalculatedStats, target)`
   where `target = { enemyArchetypeId, level, factionOverride? }`. Runs
   `calculateTTK` and (when asked) `simulateDiscreteTTK` / `runDamageSim`.
   Returns a `ScenarioResult` view-model with **caveats** attached: the
   expected-value-status caveat always; a **Steel Path caveat** tagged
   `pending-verification` (task 11 not yet done) whenever `level` is high or an
   `sp`-like flag is requested; the 19-archetype roster limit; "no magnetic /
   overguard / eximus". Must never present enemy-level scaling as Steel Path.
8. **ComparisonService** — `compareBuilds(aInput, bInput, target)` and
   `compareModSwap(baseInput, candidateModId, removeModId?)`. Runs BuildService
   (+ SimulationService for TTK) for each variant, diffs the view-models
   (sustained/burst DPS, TTK, status/sec, mod-capacity cost), annotates
   faction-gated mods (a Bane/Expel mod contributes 0 unless
   `scenario.faction` matches — assert this). Returns a `BuildDiff`
   view-model with a per-row confidence tag and a short "where each wins" list.
   Unit test incl. the **Primed Bane of Grineer** case: positive diff vs
   Grineer, exactly 0 delta vs a non-Grineer faction.
9. **Scenario type** — a small typed `Scenario` the UI will bind to:
   `{ faction?, enemyArchetypeId?, level?, headshots: boolean,
   statusTypesOnTarget: number (0-5), killStacks: number (0-5),
   arcaneStacks: number, primedTarget?: boolean }`. **No** `armorStripPercent`,
   **no** `headshotRate` %, **no** `statusUptime` — S1: those are not
   first-class engine inputs; the type comments must say so. `BuildService`
   maps `Scenario` → `SimulationParams`.
10. **Golden-baseline gate (task 10)** —
    `packages/engine/test/golden/engine-baseline.json` generated by a committed
    script (`packages/engine/scripts/gen-baseline.mjs` or a `vitest` generator)
    computing ~40–60 canonical builds through the **barrel** (weapons across
    trigger types + an Incarnon + melee + a warframe + one railjack + one
    archwing) and serialising the key `CalculatedStats` / `TTKResult` fields.
    A `verify-engine-baseline.test.ts` recomputes and deep-equals. A CI check
    (`scripts/check-formula-gate.mjs` + a `ci.yml` job) fails a PR that touches
    `packages/engine/src/{calc,data}/**`, `**/*-goldens.ts`, or
    `engine-baseline.json` **without** a `docs/agent/decisions.md` change in the
    same diff. Demonstrate it: a scratch tweak to a constant makes
    `verify-engine-baseline` fail AND the gate check fail.
11. No upstream project name introduced outside the existing allowed files.

## Preflight state

- Branch `main`, last commit `65b864b` (Phase 1a).
- `@cephalon/engine` barrel exports (verified): calc entry points
  `calculateWeaponBuild(WithArcanes)`, `calculateWarframeBuild`,
  `applyWarframeShardsAndArcanes`, `calculateTTK`, `simulateDiscreteTTK`,
  `runDamageSim`, `computeDpsContributions`, `calculate{Companion,Archwing,
  Necramech,Railjack}Build`, `evaluateRiven`/`getRivenGrade`,
  `resolveIncarnonActiveWeapon`, `buildAbilityTTKEntries`, `merge*StatChanges`;
  catalog-assembly `allWeapons`/`allMods`/`allWarframes`/`allArcanes`/
  `allCompanions`/`allArchonShards`/`archwings`/`necramechs`, `enrichWeapon`,
  `getEffective*([])` accessors, `apply*Overrides`, `OverrideSet`, `DataOverride`,
  `ENEMY_TYPES`, `getArcaneEffectDef`. Types: `Weapon`, `Mod`, `Warframe`,
  `ModSlot`, `SimulationParams`, `DEFAULT_SIM_PARAMS`, `CalculatedStats`,
  `WarframeCalculatedStats`, `EnemyType`, `TTKResult`, `WeaponDpsCalcContext`,
  `DamageSimInputs/Result`.
- Key signatures:
  `calculateWeaponBuildWithArcanes(rawWeapon, equippedMods, allMods: Map, arcanes: Mod[], incarnonStatChanges?, simParams?, calcOptions?, linkage?, rivenStatChanges?)`;
  `calculateWarframeBuild(warframe, equippedMods, allMods: Map, linkage?)`;
  `calculateTTK(stats: CalculatedStats, enemy: EnemyType, level: number)`;
  `computeDpsContributions(ctx: WeaponDpsCalcContext)`.
- `SimulationParams` relevant fields: `targetFaction?: string`,
  `applyHeadshots?: boolean`, `statusTypesOnTarget: number`, `killStacks:
  number`, `arcaneStacks: number` (+ `DEFAULT_SIM_PARAMS`). **No Steel Path
  field exists** — task 11 adds it.
- Confidence map + "Verified" definition: architecture.md §11 Part C2.
- Workflow: Codex implementation → Themis review → coordinator verification →
  commit. Task 11 stops for user sign-off.
