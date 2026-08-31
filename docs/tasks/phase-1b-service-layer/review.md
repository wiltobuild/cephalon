# Themis review — Phase 1b service layer + golden-baseline / formula-gate CI (tasks 7–10)

Reviewer: Themis (independent). Reviewed the uncommitted working tree against
`brief.md` (11 ACs; task 11 / Steel Path explicitly out of scope),
`handoff-codex.md`, `../upstream-engine-investigation/architecture.md` §§11–12
(Part C2 confidence map + "Verified" definition), `docs/agent/decisions.md`
(incl. the 2026-08-30 arcane-effect deviation + its Phase-1b follow-up), and the
Phase-1a review for continuity.

Independently re-ran on this machine:

- `pnpm -r typecheck` → engine / services / web all **Done**.
- `pnpm --filter @cephalon/engine test` → **46 files / 1925 / 0 fail**.
- `pnpm --filter @cephalon/engine build` → `dist/index.js` 2.72 MB, `dist/index.d.ts` 65.8 KB, ok.
- `pnpm --filter @cephalon/services test` → **5 files / 23 / 0 fail**.
- `check-engine-boundary.mjs`, `check-no-ambient-catalog.mjs`, `check-formula-gate.mjs --self-test` → pass.
- Formula-gate real demo: staged `packages/engine/src/calc/ttk.ts` with no
  `decisions.md` → `check-formula-gate.mjs` exits 1; reverted.
- `checkFormulaGate(['packages/engine/test/golden/engine-baseline.json'])` →
  returns the failure string (see M4).

---

## Must-fix

### M1. Warframe view-model emits five distinct stats under one key (`totalDamage`), force-tagged `verified`

`packages/services/src/build/build-service.ts:42-48`:

```ts
const warframeFields = [
  { key: "totalDamage", label: "Effective Health", field: "effectiveHealth" },
  { key: "totalDamage", label: "Health", field: "totalHealth" },
  { key: "totalDamage", label: "Shield", field: "totalShield" },
  { key: "totalDamage", label: "Armor", field: "totalArmor" },
  { key: "totalDamage", label: "Energy", field: "totalEnergy" },
];
```

Every warframe durability row is emitted with `key: "totalDamage"` and, via
`mapStats` → `confidence.tag("totalDamage")`, `confidence: "verified"`.

Concrete failures:

1. **Key collision breaks consumer selection.** `ComparisonService.compareBuilds`
   selects rows with `build.stats.find(row => row.key === key)` and
   `a.stats.find(row => row.key === key)!.confidence` (non-null assertion,
   `comparison-service.ts:14,17`). Run against a warframe view-model, five rows
   share `key === "totalDamage"`; `.find` returns only "Effective Health" and
   silently discards Health/Shield/Armor/Energy. Any AI-tool or UI code that
   maps stats by key has the same collision.
2. **Hollow confidence guarantee.** Shield / Armor / Energy are surfaced as
   `verified` sourced from the `totalDamage` mechanic entry — a key unrelated to
   warframe EHP. Part C2 has **no** durability row, and there is no
   `effectiveHealth` / `shield` / `armor` / `energy` / `warframeDurability`
   member in `MechanicKey` / `CONFIDENCE_MAP`. The correct tag for these stats
   is undefined, not "verified". `assertTagged` passes only because the code
   games it by reusing a key that happens to exist.

Fix: add real mechanic keys (or a single `warframeDurability` key) with an
explicit, justified tag, and stop routing durability through `totalDamage`.

### M2. BuildService "reference builds vs known-good numbers" (AC 6) is a smoke test, not an integration test

`packages/services/src/build/build-service.test.ts` iterates 10 weapon ids +
6 warframe ids, but:

- every build passes `modSlots: []` — the modded assembly path
  (`Scenario` → `SimulationParams`, mods → `calculateWeaponBuildWithArcanes`,
  arcane / riven / incarnon plumbing) is never exercised;
- the only assertions are `expect.any(Number)` on two raw fields plus
  `stat.confidence` truthy. **No numeric value is locked.**

AC 6 and the handoff are explicit: "≥10 reference weapon builds + ≥6 warframe
builds **vs known-good numbers**", "compute the expected values once from the
engine and **lock them** … cite the build". As written, a regression in
`scenarioToSimulationParams`, in the param assembly over `DEFAULT_SIM_PARAMS`,
in the `CalculatedStats` → view-model field mapping (e.g. the "Reload Time" row
silently reading the wrong field), or in the arcane/riven pass-through would all
stay green.

This gap is **not** covered by task 10: `verify-engine-baseline.test.ts` calls
the engine barrel directly (`baseline-builds.ts:34-55`) and never touches
`BuildService`, `Scenario`, or the view-model mapping. The service layer's own
translation logic currently has no numeric-correctness test.

Fix: lock expected numbers for a handful of *modded* weapon builds + warframe
builds computed *through* `BuildService` (seed once from the engine, cite the
mod list), per the AC.

### M3. `scenario.primedTarget` is mapped to `applyTriggerBuffs`, an unrelated engine mechanic

`packages/services/src/build/scenario.ts:28` — `applyTriggerBuffs: scenario.primedTarget ?? false`.

Per `packages/engine/src/types.ts:563-568`, `applyTriggerBuffs` =

> "Treat aim/reload/cast/wall-latch trigger buffs as active (Catalyzer Link,
> Spring-Loaded Chamber, Deadly Efficiency, …). Default false — the in-game
> arsenal never includes them."

That is a property of the **player's weapon trigger state**, nothing to do with
the target being "primed". A UI binding a "primed target" toggle to this field
would silently switch on player trigger buffs and move DPS for an unrelated
reason. There is no target-priming input in the engine — priming, like armor
strip, is proc-derived (an S1-class non-input). `scenario.ts` carries **no**
comment flagging or explaining the mapping (contrast the three S1 comments it
does carry).

Severity note: `primedTarget` is optional and defaults to `false` →
`applyTriggerBuffs: false` = the `DEFAULT_SIM_PARAMS` value, so the default path
is currently harmless. But it is an AC-9 field with a wrong, undocumented
mapping that misleads the moment anyone sets it.

Fix: drop `primedTarget` from the mapping (and preferably from the `Scenario`
type, with an S1-style comment), or map it to a real input. Do not alias it to
trigger buffs.

### M4. The 1b change cannot pass its own `formula-gate` on the first PR

`scripts/check-formula-gate.mjs:5` — `protectedPath` matches
`/(^|\/)engine-baseline\.json$/`. This change adds
`packages/engine/test/golden/engine-baseline.json` and touches **no**
`docs/agent/decisions.md`. Verified directly:

```
checkFormulaGate(['packages/engine/test/golden/engine-baseline.json'])
  => "Formula-gate: calculation/data/golden changes require docs/agent/decisions.md in the same diff."
```

So the CI `formula-gate` job exits 1 on the pull request that first carries the
baseline. (It does not block a direct `push` to `main` — on `push`,
`GITHUB_BASE_REF` is unset, `git diff --cached` on a clean checkout is empty, and
the gate is a no-op — so the local phase commit is unaffected. The failure bites
as soon as a remote is added and work goes through PRs, which is the stated
plan.)

Fix (either): add a `docs/agent/decisions.md` entry establishing the golden
baseline as part of this commit — it fits the decision-log discipline and
records the baseline's provenance / game-patch version — or have the gate exempt
pure file *creation* (`git diff --name-status` = `A`) of `engine-baseline.json`.

---

## Optional

- **O1. ConfidenceService coverage test is hollow (AC 5).**
  `confidence-service.test.ts:10` asserts only that
  `assertTagged(["burstDps", "notAStat"])` throws. It never imports the real
  `weaponFields` / `warframeFields` from `build-service.ts`, so "every stat key a
  view-model emits has a tag" is checked against a hand-written pair, not the
  emitted set. (It also "passes" for warframes only because of the M1
  mislabelling.) Iterate the actual field tables.

- **O2. Confidence tags assigned outside ConfidenceService in ComparisonService.**
  `comparison-service.ts:21,24` hardcode `confidence: "approximation"` (TTK row)
  and `"verified"` (`modCapacityCost` row) instead of `confidence.tag(...)`.
  `modCapacityCost` is not in `CONFIDENCE_MAP` (only in the row-union type). Same
  class of issue as M1 — the "single source of truth" is bypassed.

- **O3. Fresh-clone DX: `@cephalon/services` typecheck and test both need
  `@cephalon/engine`'s gitignored `dist/` built first.** `services/tsconfig.json`
  and `services/vitest.config.ts` resolve the engine through its `exports` map →
  `dist/index.{js,d.ts}`. CI is covered (every consuming job runs
  `pnpm --filter @cephalon/engine build` first), but
  `pnpm --filter @cephalon/services test` on a fresh clone fails until the engine
  is built. Add a `pretest` / `pretypecheck` script in
  `packages/services/package.json` (or a task graph) so the dependency is
  explicit rather than convention.

- **O4. Steel Path caveat threshold is a hard `target.level >= 100`
  (`simulation-service.ts:24`).** A sim at level 60–99 — clearly above the star
  chart, clearly "endgame" — gets no "this is raw enemy level, not Steel Path"
  note. The EV / roster / special-defenses caveats are attached unconditionally;
  consider attaching the "enemy-level only, SP not modelled" clarification
  unconditionally too (or at a much lower threshold). Also `SimulationTarget` has
  no `sp`-like flag, so AC 7's "or an `sp`-like flag is requested" branch is
  simply unimplemented — acceptable while no SP feature exists, but note it.
  (It never presents level scaling *as* Steel Path — the caveat text is honest —
  so the hard "must not" is met.)

- **O5. `incremental` removed from `tsconfig.base.json` hits all three
  packages.** Only tsup's dts pass needed it gone. A dedicated
  `tsconfig.build.json` referenced from `tsup.config.ts` would have kept
  incremental `tsc --noEmit` for engine / services / web local iteration. Low
  cost (CI has no TS cache), but a wider blast radius than necessary.

- **O6. The new `test/golden/**` and `scripts/*.ts` files are type-checked
  nowhere.** `packages/engine/tsconfig.json` `include` is `["src/**/*.ts"]`
  (excludes `test/`); `packages/services/tsconfig.json` excludes
  `src/**/*.test.ts`. So `baseline-builds.ts`, `write-baseline.ts`,
  `verify-engine-baseline.test.ts`, and every services `*.test.ts` are only
  transpiled by vitest / vite-node (no type checking). `pnpm -r typecheck` is
  green partly because these files are invisible to it.

- **O7. Two baseline generators, one does nothing.**
  `packages/engine/scripts/gen-baseline.mjs` only shells
  `pnpm exec vite-node scripts/write-baseline.ts`. `vite-node` is not a declared
  devDependency of `@cephalon/engine` (resolved transitively via vitest).
  Consider folding into one script and declaring `vite-node` if it is meant to be
  invoked directly.

- **O8. `formula-gate` CI job is effectively PR-only** (see M4 parenthetical). On
  `push` it is a no-op. Fine while there is no remote and phase commits land
  directly on `main`; revisit when a remote is added (or add an
  `HEAD^...HEAD` diff for push events).

- **O9. `check-engine-boundary.mjs` does not scan `packages/services`.** It walks
  only `packages/engine/src`. Nothing in CI enforces the brief's "no React /
  Next / Prisma / Supabase / network in `packages/services`" — currently clean by
  manual grep (`grep -rnE 'from "(react|next|@prisma|next-auth|@wfcd)|fetch\(|process\.env'`
  → nothing). Extend the boundary check (or an ESLint rule) to the services
  package.

- **O10. CatalogService memoisation test is partial.**
  `catalog-service.test.ts` checks `getWeaponsMap()` / `getModMap()` identity but
  not `getArcanes` / `getArchonShards` / `getCompanions` / `getArcaneEffectsMap`.
  Implementation is correct-by-construction (all getters return stored fields),
  so this is a coverage gap, not a bug. There is no test at all for
  `getArcaneEffectsMap()` (the decisions.md follow-up hook).

---

## Scope drift / notes

- **Arcane-effect override follow-up (decisions.md 2026-08-30) is half-done —
  acceptably.** `CatalogService.getArcaneEffectsMap()` exposes the
  override-merged `ARCANE_EFFECTS` map, but nothing threads it into the calc path
  (`BuildService` calls `calculateWeaponBuildWithArcanes` without an effects
  argument). The Phase-1a gap ("arcane-effect *magnitude* overrides don't reach
  the damage math") is therefore still open. The handoff only authorised
  "build a merged `ARCANE_EFFECTS` map and expose it … do NOT thread anything
  through `calc/calculator.ts`", so this meets the letter of what was allowed —
  but the follow-up must not be recorded as closed.

- **Brief AC 3 ("still 45 files / 1880") is stale** and contradicted by AC 10
  ("will make the file count 46"). Actual, re-run: **46 files / 1925 / 0 fail**.
  Not a defect — AC 10 governs.

- **tsup dist → browser bundle risk (deferred).** `dist/index.js` is 2.72 MB
  (inlines the ~66k-LOC catalog). `apps/web` currently imports **nothing** from
  `@cephalon/engine` (grep clean), so there is no client-bundle impact today.
  Flag for milestone 1c: engine calls must stay server-side; a single client
  import pulls the whole catalog into the browser bundle.

- **`ComparisonService.compareModSwap` silently drops the last mod slot** when
  called with no `removeModId` (`removed = ... ?? baseInput.modSlots.at(-1)?.modId`,
  `comparison-service.ts:33`). Harmless for the bare-weapon test; surprising for
  an 8-mod build. Document the behaviour.

---

## Things checked and OK

- **Nothing junk staged.** `dist/` and `*.tsbuildinfo` are gitignored;
  `git ls-files` shows nothing tracked under `dist/`; `packages/services/tsconfig.tsbuildinfo`
  exists on disk but is ignored. `engine-baseline.json` and the vitest `.snap`
  are (correctly) not ignored. No `node_modules`, no stray build output.
- **Golden baseline (task 10) is real.** `verify-engine-baseline.test.ts` does a
  full `expect(...).toEqual(baseline[id])` per build over every finite numeric
  field (`numericFields` filter) — a deep-equal, not a spot-check; would catch a
  0.1 % drift on any field. `engine-baseline.json` is deterministic:
  insertion-ordered keys, no timestamps, `JSON.stringify(..., null, 2)`.
  `BASELINE_BUILDS` (~48) spans trigger families + Incarnon (`phenmor`,
  `laetum`) + melee (`skana`/`galatine`/`gram`…) + a warframe + archwing
  (`odonata`) + railjack — within the 40–60 target. TTK fields
  (`ttkSeconds`, `shotsToKill`) are captured.
- **Formula gate works.** `--self-test` passes; staged `calc/ttk.ts` without
  `decisions.md` → exit 1 (re-run, reverted); staged with `decisions.md` →
  passes. Protected globs cover `src/calc/`, `src/data/`, `*-goldens.ts`,
  `engine-baseline.json`. (The chicken-and-egg with the baseline's own
  introduction is M4.)
- **CI wiring.** `typecheck` / `services` / `web-build` each run
  `pnpm --filter @cephalon/engine build` before their step; `engine-regression`
  correctly does not (it runs vitest against `src`). New `formula-gate` and
  `services` jobs added; existing jobs otherwise unchanged.
- **"Verified" definition** in `confidence-service.ts:1-9` is the architecture
  §11 / Part C2 text verbatim (incl. the "Regression-locked / Deterministic"
  fallback note). `CONFIDENCE_MAP` covers every Part C2 row; snapshot-locked
  (`__snapshots__/confidence-service.test.ts.snap`). The negative test genuinely
  iterates every non-`verified` entry and asserts `.not.toBe("verified")`.
  (The S1 "not-an-input" rows are present as keys but not as explanatory doc
  comments — minor, folded into O1's spirit.)
- **ComparisonService Primed Bane of Grineer (AC 8).** Re-ran: `delta > 0` vs
  `grineer`, `delta === 0` (exact `toBe(0)`, not epsilon) vs `corpus`.
  `compareModSwap` recomputes both variants; `primed_bane_of_grineer` is a real
  catalog id (an unknown id would make the grineer assertion fail); the engine
  normalises faction to lowercase (`combat-multipliers.ts:34`), so the
  lowercase `"grineer"` / `"corpus"` in the test are valid.
- **Scenario type (AC 9 / S1).** `scenario.ts` carries the three S1 comments
  (no armor-strip-%, no headshot-rate, no status-uptime) with rationale; fields
  match the AC; `statusTypesOnTarget` / `killStacks` clamped 0–5. (The
  `primedTarget` mapping is M3.)
- **PlayerContextService** is a pure type stub + `NullPlayerContext` returning
  `"unknown"`; no Supabase, no network.
- **Boundary.** `packages/services/src` has no `react` / `next` / `@prisma` /
  `next-auth` / `@wfcd` / `fetch(` / `process.env` / `require(` (grep). The new
  `scripts/*` and `test/golden/*` add no engine `src/calc|data` edits and no
  boundary regression; `check-engine-boundary.mjs` still passes.
- **Licensing / naming (AC 11).** No upstream project name, external URL, or
  author string in any new file (only the vitest snapshot header URL). The
  confidence doc comment uses the approved euphemism "upstream engine".
- **Deps.** Only `tsup` (devDep on `@cephalon/engine`, pre-authorised by the R2
  decision) + its esbuild/rollup tree, and the `@cephalon/services` →
  `@cephalon/engine` workspace link. No new runtime deps in `packages/services`.

---

## Verdict

**Needs another pass.** 4 must-fix.

The infrastructure is sound and independently verified: the golden baseline with
a real per-build deep-equal, the formula gate, the CI wiring, the tsup dist
build, the confidence map + verbatim "Verified" definition + genuine negative
test, and the faction-gating case all hold up. But:

- **M2** — the service layer's numeric-correctness is essentially untested; the
  AC-6 "vs known-good numbers" test is `expect.any(Number)` over bare weapons.
- **M1** — the warframe view-model mislabels five durability stats under one
  mechanic key and force-tags them `verified`, breaking key-based selection and
  hollowing the confidence guarantee.
- **M3** — an AC-9 `Scenario` knob is wired to an unrelated engine flag, with no
  comment.
- **M4** — the change red-CIs its own formula gate on the first PR.

M1 and M3 are small code fixes; M4 is a one-line `decisions.md` entry (or a small
gate tweak); M2 needs real locked-value tests through `BuildService`.
