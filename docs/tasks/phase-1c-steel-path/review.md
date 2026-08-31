# Themis review — Task 11: Steel Path (`sp`) scaling (calc-formula gate, elevated scrutiny)

Reviewer: Themis. Date: 2026-08-30. Nothing committed.
Binding spec: `docs/agent/decisions.md` → "2026-08-30 — Steel Path scaling values
SIGNED OFF"; `docs/tasks/phase-1c-steel-path/sourcing.md` §3–§6.

## Verification re-run (confirmed)

| Check | Result |
|---|---|
| `@cephalon/engine` tests | **47 files / 1931 / 0 fail** (+`steel-path.test.ts` 4, +2 golden `sp` cases) — matches claim |
| `@cephalon/services` tests | **6 / 37 / 0** — matches claim |
| `tsc --noEmit` engine / services / web | all **Done** |
| `check-engine-boundary` / `check-no-ambient-catalog` / formula-gate `--self-test` | pass |
| formula-gate on real diff | **pass** (`decisions.md` present in diff) |
| No existing `*.test.ts` modified; `engine-baseline.json` existing entries | untouched — pure append |

## Exact-spec conformance — `ttk.ts` (PASS)

`git diff HEAD -- packages/engine/src/calc/ttk.ts` is exactly:
- Constants block: `SP_LEVEL_SHIFT = 100`, `SP_HEALTH_MULT = 2.5`,
  `SP_SHIELD_MULT = 2.5`, `// NO SP armor multiplier …`. Citation comments
  present. **No `SP_ARMOR_MULT`.** ✔ matches decisions entry verbatim.
- `simulateDiscreteTTK` gets `sp = false` as a **5th** param, after the `opts?`
  4th — as the spec anticipated.
- Call sites (was `ttk.ts:323-325`, now 329-332):
  ```ts
  const effLevel     = sp ? level + SP_LEVEL_SHIFT : level;
  const scaledHp     = (sp ? SP_HEALTH_MULT : 1) * scaleHealth(enemy.baseHealth, effLevel, enemy.faction);
  const baseArmor    = scaleArmor(enemy.baseArmor, effLevel);            // shift only, no mult
  const scaledShield = (sp ? SP_SHIELD_MULT : 1) * scaleShield(enemy.baseShield, effLevel);
  ```
  Order of operations = shift → unchanged primitive → ×2.5 on health/shield
  results, ×1 on armor. ✔ Exactly §4.
- `calculateTTK(stats, enemy, level, sp = false)` → `simulateDiscreteTTK(…, undefined, sp)`. ✔
- `scaleHealth` / `scaleArmor` / `scaleShield` bodies, the `2700` cap,
  `enemyArmorDamageReduction`, the 70–80 smoothstep, `ENEMY_TYPES`, the
  `*_MODIFIERS` tables — **byte-identical**. No `sp` param on the primitives. ✔
- `types.ts`: only `sp?: boolean` (with the spec's doc comment) on
  `SimulationParams` + `sp: false` in `DEFAULT_SIM_PARAMS`. Nothing else. ✔

Other `calculateTTK` callers (`ability-ttk.ts:142`, `loadout-stats.ts` ×4) use
the 3-arg form → `sp` defaults `false`, no positional shift. ✔

## `sp = false` no-op analysis

- **`ttk.ts`: provably a true no-op.** `false ? X : level` ≡ `level`;
  `(false ? M : 1) * v` ≡ `1 * v` ≡ `v` for every IEEE-754 value. The new 4th/5th
  params default `false` at every internal hop. No path defaults `sp` to
  anything but `false`.
- **`damage-sim.ts`: NOT a no-op — see Must-fix 1.** This is unrelated to the
  `sp` flag itself; it is a collateral refactor Codex made in the same edit.

## Must-fix

### 1. `damage-sim.ts` changes `runDamageSim`'s armor semantics for **all** callers, `sp` on or off — breaks the "sp=false is byte-identical" gate requirement

`runDamageSim` previously computed its own layer stats from the primitives:

```ts
const hp        = scaleHealth(enemy.baseHealth, level, enemy.faction);
const baseArmor = scaleArmor(enemy.baseArmor, level);   // pristine, level-scaled
const shield    = scaleShield(enemy.baseShield, level);
```

Codex replaced all three with reads off the `TTKResult`:

```ts
const hp        = discrete.scaledHealth;
const baseArmor = discrete.scaledArmor;   // <-- NOT pristine
const shield    = discrete.scaledShield;
```

`hp` and `shield` are fine (`TTKResult.scaledHealth/scaledShield` are the
pristine composed values). **`TTKResult.scaledArmor` is not**: in the normal
(enemy-killed / normal) return path it is `endArmor` —
`currentArmorFromStrips(baseArmor, corrosiveStacks, heatActive, punctureStacks, …)`
(`ttk.ts:685`, returned at line 721), i.e. armor **after** in-sim
corrosive/heat/puncture stripping. Only the `totalRaw <= 0` "zero" early return
(`ttk.ts:340`) carries pristine armor, and `runDamageSim` returns `null` before
ever reaching `calculateTTK` in that case.

**Concrete failure scenario (verified, `sp = false`):**
`runDamageSim({ dmgTypes: { corrosive: 200 }, statusChance: 1, multishot: 2,
fireRate: 10, … }, heavy_gunner, 80)` →
- before this change: `sim.baseArmor === scaleArmor(500, 80) === 2700`
- after this change: `sim.baseArmor === 539.9999…` (fully corrosive-stripped
  end state)

`baseArmor` then feeds `corrosiveStrippedArmor = baseArmor *
corrosiveArmorRemaining(corStacks) * heatArmorRemaining(…) *
punctureArmorRemaining(…)` (double-strips the already-stripped value), and from
there `armor`, `armorDR`, every `typeBreakdown` row (`typeVsLayer(…, armor, …)`),
`heatDotDps` and `toxinDotDps` (`× (1 - armorDR)`), and the returned
`baseArmor` / `armor` / `armorDR` fields. So the paper breakdown that
`runDamageSim` exists to produce is materially wrong for any armored enemy with
armor-stripping damage — with SP off, today.

Why the suite stays green: `damage-sim.test.ts` never pins `baseArmor`'s
absolute value (`expect(sim.baseArmor).toBeGreaterThan(0)` plus a self-referential
`sim.baseArmor * corrosiveArmorRemaining(...)` identity), and the golden baseline
does not exercise `runDamageSim`. Green ≠ unchanged here.

Blast radius today is limited (no live `SimulationService` path calls
`runDamageSim`; `ScenarioResult.damageSimulation` is typed but never populated),
but `runDamageSim` is a public `@cephalon/engine` barrel export
(`packages/engine/src/index.ts:9`), and the signed-off spec + handoff both state
"**every one of the current 1925 engine tests must still pass byte-identical**"
and "`sp` defaults to `false` everywhere" ⇒ no behavior delta when off. This
edit violates that.

**Fix (keep it minimal):** restore `runDamageSim`'s own primitive calls and
thread `sp` through them the same way `simulateDiscreteTTK` does — re-add the
`scaleHealth`/`scaleArmor`/`scaleShield` imports:

```ts
const discrete  = calculateTTK(stats, enemy, level, sp);
const effLevel  = sp ? level + SP_LEVEL_SHIFT : level;
const hp        = (sp ? SP_HEALTH_MULT : 1) * scaleHealth(enemy.baseHealth, effLevel, enemy.faction);
const baseArmor = scaleArmor(enemy.baseArmor, effLevel);
const shield    = (sp ? SP_SHIELD_MULT : 1) * scaleShield(enemy.baseShield, effLevel);
```

This is byte-identical to pre-change for `sp = false` and correct for `sp = true`.
Add a one-line `runDamageSim` assertion to `steel-path.test.ts` (SP-on
`sim.baseArmor === scaleArmor(base, level + 100)`; SP-off `sim.baseArmor ===
scaleArmor(base, level)`) so the no-op is pinned going forward.

## Optional

- **O1 — oracle-test tolerance.** `steel-path.test.ts` "matches the eight sourced
  worked examples" asserts `|actual - rounded| <= 0.5` against the 1-dp figures
  in sourcing §6. Spec-sanctioned (handoff said "±0.5 on the rounded figures"),
  and the composition test already pins exact identities, so this is fine — but
  asserting the full-precision values (33828.75, 1209.4845, 38678.75, 1229.4845,
  270751.25, 2700, 23207.25, 24934.875) with `toBeCloseTo(…, 3)` would make the
  oracle a real second check rather than a loose sanity bound.
- **O2 — Heavy Gunner "both ways" at the cap.** sourcing §6 lists SP-**off**
  Heavy Gunner @200 also pinned at 2700; the test only asserts the SP-on side.
  Add the `sp:false` half for completeness (golden baseline covers Heavy Gunner
  elsewhere, so low value).
- **O3 — `simulation-service.ts:18`** `target.steelPath ?? stats.simParams.sp ??
  false` — the `stats.simParams.sp` fallback is slightly beyond "SimulationTarget
  gets `steelPath?`". It is safe (`simParams` is a required `CalculatedStats`
  field, `types.ts:756`, and `scenarioToSimulationParams` now always sets `sp`)
  and arguably desirable (build-level scenario SP flows through). Keep, but worth
  a sentence in the final report.

## Scope drift

- **SD1 (→ Must-fix 1).** `damage-sim.ts` dropping the
  `scaleArmor`/`scaleHealth`/`scaleShield` imports and re-sourcing layer stats
  from `TTKResult` is beyond "thread `sp` the same defaulted way". It should be
  reverted to primitive calls + `sp` threading.
- **SD2 (accept).** `baseline-builds.ts` gains `enemyId?` / `sp?` fields and a
  `if (build.sp) return { ttkSeconds, shotsToKill }` branch (SP rows omit the
  enemy-independent stat block). Within the handoff's "extend with a few
  `sp: true` variants" grant; `engine-baseline.json` change is append-only, keys
  unique, deterministic order preserved.
- No armor multiplier, no damage-attenuation modelling, no Archwing/Duviri mode
  inference, no `sp` param on the scaling primitives. ✔ Nothing from the spec is
  missing: shield ×2.5 ✔, `runDamageSim` threading ✔ (mechanism present, but see
  Must-fix 1), `DEFAULT_SIM_PARAMS.sp = false` ✔.

## Item-by-item (review brief)

1. Exact-spec conformance in `ttk.ts` — **PASS** (constants, order, call-site
   application, citations, no primitive-body edits).
2. `sp = false` no-op — **PASS in `ttk.ts` (provable)**, **FAIL in `damage-sim.ts`**
   (Must-fix 1). `calculateTTK` 4th-param default and `simulateDiscreteTTK`
   5th-param-after-`opts` default both resolve to `false`; no caller shifted a
   positional arg.
3. No collateral edits — **PASS for `ttk.ts` / `types.ts`**, **FAIL for
   `damage-sim.ts`** (Must-fix 1 / SD1). Primitives, `2700`, DR fn, smoothstep,
   `ENEMY_TYPES`, `*_MODIFIERS` all byte-identical.
4. Oracle tests real, not tautologies — **PASS**. Composition identities use
   `.toBe` against independently-recomputed `SP_*_MULT * primitive(base, level+100)`;
   8 sourced numbers asserted; `sp:false` no-op `toEqual`-asserted; Heavy Gunner
   cap case present; no `.skip` / `.only` / `expect.any`.
5. `stats.simParams` usage — **PASS**. `simParams: SimulationParams` is a
   pre-existing required `CalculatedStats` field; engine copies it onto output
   (services test `rawStats.simParams.sp === true` passes). No runtime-throw risk.
6. Golden baseline `sp` entries — **PASS**. Two genuine `sp: true` weapon×enemy
   rows; non-SP rows unchanged (`build.sp ?? false` → identical call);
   `engine-baseline.json` append-only, deterministic.
7. Confidence map — **PASS**. `steelPath: "pending-verification" → "approximation"`,
   snapshot updated, matches the decisions entry's explicit refinement of the
   earlier "then Verified"; the never-verified invariant test still holds.
8. Services caveat — **PASS**. SP-on text: "Steel Path applied (+100 level, ×2.5
   health/shield); an approximation of DE's live scaling, not verified against
   the game" — tag `approximation`, TTK asserted longer than non-SP. SP-off:
   "Enemy level only — Steel Path scaling is not applied." Neither claims the
   scaling is verified.
9. Scope / spec drift — one drift (SD1), otherwise clean; nothing from the spec
   omitted.

## Verdict

**Needs another pass.** One must-fix. The core formula change in `ttk.ts` is an
exact, citation-backed implementation of the signed-off spec and `sp = false` is
provably a no-op there. The blocker is a collateral refactor in
`damage-sim.ts` that changes `runDamageSim`'s armor semantics for every caller
regardless of `sp`, which the "byte-identical with SP off" bar does not permit.
The fix is small and local (revert to primitive calls + thread `sp`), plus one
pinning test. Re-review can be narrow: `damage-sim.ts` + the new test only.
