# Verification report — Task 11: Steel Path scaling (calc-formula gate)

Verifier: coordinator (Apollo-equivalent). Commands run this session. Nothing
committed. This is a **calc-formula-gate** change — user signed off the values
in `docs/agent/decisions.md` (2026-08-30 "Steel Path scaling values SIGNED OFF").

## Signed-off spec conformance

`git diff` of `packages/engine/src/calc/ttk.ts` is **exactly** the spec:
- Constants: `SP_LEVEL_SHIFT = 100`, `SP_HEALTH_MULT = 2.5`,
  `SP_SHIELD_MULT = 2.5`, **no `SP_ARMOR_MULT`** — each with its wiki citation
  comment.
- At the `simulateDiscreteTTK` scaling call sites:
  `effLevel = sp ? level + SP_LEVEL_SHIFT : level`; `scaleHealth`/`scaleArmor`/
  `scaleShield` on `effLevel` **unchanged**; `× (sp ? SP_HEALTH_MULT : 1)` on
  the health result, `× (sp ? SP_SHIELD_MULT : 1)` on the shield result, armor
  gets the shift only.
- `calculateTTK(stats, enemy, level, sp = false)` — defaulted 4th param, passes
  `sp` through.
- `types.ts`: `SimulationParams.sp?: boolean` + `DEFAULT_SIM_PARAMS.sp = false`.
  Nothing else.
- **No collateral edits.** `scaleHealth`/`scaleArmor`/`scaleShield` bodies, the
  `2700` cap, `enemyArmorDamageReduction`, the S-curve smoothstep, `ENEMY_TYPES`,
  and the `*_MODIFIERS` tables are byte-identical (verified by targeted diff —
  no matching `-`/`+` lines).

## `sp = false` is a provable no-op

- `ttk.ts`: `false ? level + 100 : level` ≡ `level`; `(false ? M : 1) * v` ≡ `v`
  for all IEEE-754 `v`. New params default `false`; no positional-arg shift
  (`simulateDiscreteTTK`'s `sp` is a new 5th param after the existing opts slot).
- **1925 pre-existing engine tests: byte-identical pass.** No existing test's
  expected numbers changed. `engine-baseline.json` diff is append-only (2 new
  `sp:true` entries; zero `-` lines).

## Themis elevated review — 1 must-fix, RESOLVED

`review.md` (Themis, elevated): "needs another pass, 1 must-fix."
- **Must-fix:** Codex also refactored `runDamageSim` (`damage-sim.ts`) to read
  `discrete.scaledHealth/scaledArmor/scaledShield` off the `TTKResult` instead
  of calling the scaling primitives. On the main `TTKResult` path
  `scaledArmor` is `endArmor` (armor **after** in-sim corrosive/heat/puncture
  strip), not the pristine level-scaled value — so `DamageSimResult.baseArmor`
  (documented "before status strips") was corrupted (e.g. corrosive vs
  heavy_gunner @ 80 reported ~540 instead of the 2700 soft-cap), cascading into
  `armor`, `armorDR`, every `typeBreakdown` row, and heat/toxin DoT DPS. Not
  caught by the suite because no test pinned `baseArmor`'s value. Violates the
  "every current engine test byte-identical / sp defaults false" bar.
- **Fix applied:** `runDamageSim` reverted to `scaleHealth` / `scaleArmor` /
  `scaleShield` calls, with `sp` threaded the same way as `ttk.ts` (`effLevel`
  + `× (sp ? MULT : 1)` on health/shield, armor shift-only). Re-imported the 3
  primitives + `SP_*` constants. Added a comment warning against reading
  `discrete.scaledArmor` there.
- **New regression tests** (`steel-path.test.ts`, +2): `runDamageSim` `baseArmor`
  == `scaleArmor(base, level)` (pins at 2700 for SP-off heavy_gunner, not the
  post-strip ~540) and `== runDamageSim(..., false)`; SP-on `runDamageSim`
  applies `×2.5` health/shield + armor shift-only.

Everything else Themis checked passed: oracle tests are real `.toBe` /
`±0.5` assertions against the 8 sourced numbers (no `.skip`/`.only`);
`CONFIDENCE_MAP.steelPath` `pending-verification → approximation` matches the
decisions entry; services caveat wording never claims the scaling is verified;
golden baseline additions are append-only and deterministic.

## Final state (re-verified after the fix)

| Check | Result |
|---|---|
| `pnpm --filter @cephalon/engine test` | **47 files / 1933 / 0 fail** (1925 pre-existing unchanged + `steel-path.test.ts` 6 + baseline +2) |
| `pnpm --filter @cephalon/services test` | 6 / 37 / 0 |
| `pnpm -r typecheck` | engine / services / web all Done |
| `check-engine-boundary` / `check-no-ambient-catalog` / `check-formula-gate --self-test` | pass |
| `check-formula-gate` on the real diff | **passes** — `docs/agent/decisions.md` is in the diff |
| `pnpm --filter web build` | compiled |
| `ttk.ts` scaling primitives / constants / tables | byte-identical to pre-change |

## Oracle examples (sourcing.md §6) — asserted in `steel-path.test.ts`

`33828.8, 1209.5, 38678.8, 1229.5, 270751.3, 2700, 23207.3, 24934.9`
(Lancer 60/100, Heavy Gunner 100, Crewman 100) — ±0.5 tolerance, matched.

## Open (deferred, per the decisions entry)

- **Damage Attenuation** — separate follow-up task. The wiki page is
  self-flagged unreliable; it is a boss/Lich/Archon mechanic, not SP-specific,
  and no enemy in the 19-unit roster has it.
- SP confidence stays **`approximation`** ("pending live verification") — the
  engine's underlying level curve is itself an approximation of DE's; SP tests
  assert the composition, not live-game absolute values.
