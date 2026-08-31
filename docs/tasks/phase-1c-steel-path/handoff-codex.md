# Codex handoff — Task 11: Steel Path scaling (calc-formula gate)

Run from repo root:

```
codex.cmd exec --skip-git-repo-check -s workspace-write -C "C:\Users\Wil\Documents\Projects\Cephalon" "<prompt below>" < /dev/null
```

---

## Prompt

Task: Cephalon task 11 — add an **opt-in Steel Path (`sp`) scaling model** to the
engine's TTK path. This is a **calc-formula-gate change** — the values are
sourced and user-signed-off in `docs/agent/decisions.md` (2026-08-30 "Steel Path
scaling values SIGNED OFF"). Implement **exactly** that spec. Nothing outside it.

**Read first:**
- `docs/tasks/phase-1c-steel-path/sourcing.md` (Argus — the full before/after
  spec, §3 the exact expressions, §4 order of operations, §6 the 8 oracle
  examples).
- `docs/agent/decisions.md` — the 2026-08-30 Steel Path sign-off entry (the
  binding spec).
- `packages/engine/src/calc/ttk.ts` — the target.

### The change (do only this)

1. **Constants** — add at the top of `packages/engine/src/calc/ttk.ts`, each
   with the citation comment from the decisions entry:
   ```ts
   export const SP_LEVEL_SHIFT = 100;
   export const SP_HEALTH_MULT = 2.5;
   export const SP_SHIELD_MULT = 2.5;
   // NO SP armor multiplier — Steel Path stopped multiplying armor in U36.0.
   ```
2. **`SimulationParams`** (`packages/engine/src/types.ts`) — add `sp?: boolean;`
   with a doc comment ("Steel Path: +100 enemy level, ×2.5 health, ×2.5 shield;
   armor gets the level shift only. Default false = star-chart scaling.").
   Add `sp: false` to `DEFAULT_SIM_PARAMS`.
3. **`calculateTTK`** — signature becomes
   `calculateTTK(stats, enemy, level, sp = false)` (4th param, defaulted, so
   every existing call site is unaffected). Thread `sp` into whatever it calls.
4. **`simulateDiscreteTTK`** — it already receives the params needed; give it an
   `sp` input (from `SimulationParams.sp` if it reads a params object, else a
   defaulted param mirroring `calculateTTK`). At `ttk.ts:323-325` (the
   `scaleHealth` / `scaleArmor` / `scaleShield` calls):
   ```ts
   const effLevel = sp ? level + SP_LEVEL_SHIFT : level;
   const scaledHp     = (sp ? SP_HEALTH_MULT : 1) * scaleHealth(enemy.baseHealth, effLevel, enemy.faction);
   const baseArmor    = scaleArmor(enemy.baseArmor, effLevel);            // shift only, NO multiplier
   const scaledShield = (sp ? SP_SHIELD_MULT : 1) * scaleShield(enemy.baseShield, effLevel);
   ```
   Do **not** add an `sp` parameter to `scaleHealth` / `scaleArmor` /
   `scaleShield` themselves — keep the primitives' signatures untouched; apply
   the shift and multipliers at the call site as above.
5. **`runDamageSim`** / any other TTK entry that takes a level — if it plausibly
   needs SP, thread `sp` the same defaulted way; if not, leave it and note why.
6. **`DamageSimInputs`** — only if `runDamageSim` gets `sp`, add the field.

### Must-NOT

- No change to `scaleHealth` / `scaleArmor` / `scaleShield` bodies, the S-curve,
  the `2700` armor cap, `enemyArmorDamageReduction`, `ENEMY_TYPES`, the
  `*_MODIFIERS` tables, or any other constant.
- No armor multiplier. No damage-attenuation modelling (deferred).
- No change to any existing numeric test assertion. `sp` defaults to `false`
  everywhere, so **every one of the current 1925 engine tests must still pass
  byte-identical** — verify with `pnpm --filter @cephalon/engine test`.
- No mode inference (Archwing +50, Duviri +20) — the flag models the standard
  ground-mission case only.

### New tests (add)

`packages/engine/src/calc/steel-path.test.ts`:
- **Composition identity** (the primary assertion — see sourcing §6):
  for several `(enemy, baseLevel)` pairs, assert the `sp`-on scaled stats equal
  `mult × <primitive>(base, baseLevel + 100)`:
  - health: `spHealth === 2.5 * scaleHealth(base, level + 100, faction)`
  - shield: `spShield === 2.5 * scaleShield(base, level + 100)`
  - armor:  `spArmor  === scaleArmor(base, level + 100)` (no multiplier)
  Expose whatever internal value you need via a small exported helper, or
  assert through `calculateTTK` on an enemy whose TTK is dominated by one pool.
- **Oracle values** — assert against the 8 worked examples in sourcing.md §6
  (Lancer base 60/100, Heavy Gunner 100, Crewman 100), with a tolerance of
  ±0.5 on the rounded figures. Cite the table in a comment.
- **`sp: false` is a no-op** — `calculateTTK(stats, enemy, L)` deep-equals
  `calculateTTK(stats, enemy, L, false)` for a few builds.
- **Armor near the cap** — SP Heavy Gunner at base level 100 stays pinned at the
  2700 soft-cap / 90% DR (per sourcing §5 risk 3 / §6).

### Golden baseline

- Extend `packages/engine/test/golden/baseline-builds.ts` with **a few `sp: true`
  variants** of existing weapon builds vs a couple of enemies, regenerate
  `engine-baseline.json` (`node packages/engine/scripts/gen-baseline.mjs`), and
  let `verify-engine-baseline.test.ts` pick them up. This baseline change is
  paired with the `docs/agent/decisions.md` Steel Path entry, so the
  formula-gate is satisfied.

### `@cephalon/services` wiring (small)

- `packages/services/src/build/scenario.ts` — add `steelPath?: boolean` to the
  `Scenario` type (real input, not S1) and map it:
  `sp: scenario.steelPath ?? false` in `scenarioToSimulationParams`.
- `packages/services/src/simulation/simulation-service.ts` — `SimulationTarget`
  gets `steelPath?: boolean`; pass it to `calculateTTK` / `simulateDiscreteTTK`.
  When `steelPath` is true, the existing "Steel Path pending" caveat text should
  change to reflect that SP **is** now applied but is an approximation — e.g.
  key stays `steelPath`, tag `confidence.tag("steelPath")`, text: "Steel Path
  applied (+100 level, ×2.5 health/shield); an approximation of DE's live
  scaling, not verified against the game." When false, keep the current
  "enemy level only" caveat.
- `packages/services/src/confidence/confidence-service.ts` — change
  `CONFIDENCE_MAP.steelPath` from `"pending-verification"` to `"approximation"`.
  Update the snapshot (`pnpm --filter @cephalon/services test -u` for that file
  only) — this is an intended map change.
- A services test: `Scenario{ steelPath: true }` → `SimulationService` result
  TTK differs from `steelPath: false` in the expected direction (longer TTK),
  and the caveat text reflects "applied".

### Verify + report

- `pnpm --filter @cephalon/engine test` → **1925 pre-existing tests unchanged**
  + the new `steel-path.test.ts` + the new baseline `sp` entries, 0 fail.
- `pnpm --filter @cephalon/services test` → green (snapshot updated for the
  confidence map).
- `pnpm -r typecheck` → green.
- `node scripts/check-engine-boundary.mjs`, `check-no-ambient-catalog.mjs`,
  `check-formula-gate.mjs --self-test` → pass. (The real formula-gate will see
  `calc/ttk.ts` + `engine-baseline.json` changed **and** `decisions.md` changed
  → passes.)
- Report: the exact diff to `ttk.ts` lines 323-325 and the constants block; the
  new test file's assertions; the oracle-example results (your computed vs
  sourcing.md §6); confirmation the 1925 count is unchanged; the `Scenario` /
  `SimulationTarget` / confidence-map edits.
- Do not commit.
