# the upstream engine / "the upstream project" — Argus investigation

Read-only investigation of `vendor/upstream-engine/` @ `e66896a0fa83b7336baaa5614d9fb7c8a7d61e88`
("Merge branch 'dev' into main", 2026-07-25, author `StepTwo33 <jasonwelch903@gmail.com>`).

Method: static analysis (`rg`, `Read`), a scripted transitive-import closure of the
calculation entry points, plus one read-only `npm install` + `npx vitest run`.

Naming note: the git remote is `https://github.com/StepTwo33/the upstream engine.git` and this
task calls the project "the upstream engine", but **every in-repo string says "the upstream project" /
`upstream-project` / `the-upstream-project.example`**. The GitHub repo was evidently renamed
the upstream project → the upstream engine; the working tree still self-identifies as the upstream project. This doc
uses "the engine" / "the repo" to avoid picking a side.

---

## 0. Test-suite run (evidence for §6)

```
npm install         # node_modules is gitignored; install completed exit 0
npx vitest run      # vitest 3.2.7
```

Verbatim result:

```
 Test Files  47 passed (47)
      Tests  1898 passed (1898)
   Duration  16.61s (transform 6.90s, collect 35.40s, tests 5.66s, prepare 17.49s)
```

JSON reporter: `numTotalTestSuites 303`, `numFailedTestSuites 0`, `numTotalTests 1898`,
`numPassedTests 1898`, `numFailedTests 0`, `numPendingTests 0`. **Green, no skips, no
flakes on a single run.** No `.env`, DB, or network needed (confirmed: no test file
imports `next`, `@prisma`, `next-auth`, `@testing-library`, and there is no vitest
setup file).

---

## 1. Repo map

### Verified facts

Top level (`vendor/upstream-engine/`):

| Path | What it is |
|---|---|
| `src/app/` | Next.js 16 App Router — 40 route folders + 39 `api/*/route.ts` handlers |
| `src/components/` | 74 `.tsx`, 67 marked `"use client"` — UI shells, stat panels, pickers, override editors |
| `src/lib/` | 192 files — domain logic; **`src/lib/calc/` is the engine** |
| `src/data/` | 49 files — static game catalogs (mods, weapons, warframes, arcanes, …) as committed `.ts` |
| `src/proxy.ts` | CSP/proxy header helper (Next middleware-adjacent) |
| `bot/` | Standalone Discord bot process (`npm run bot` → `tsx bot/src/index.ts`) |
| `scripts/` | ~130 files: ~5 ops scripts + ~125 Python/JS wiki-scraping & catalog-audit pipeline scratch |
| `prisma/` | `schema.prisma` (15 models, all app-level) + 15 migrations; client generated to `src/generated/prisma` (gitignored) |
| `assets/`, `public/` | images / PWA icons |
| `docs/` | `ARCHITECTURE.md`, `ACCURACY_CHECKLIST.md` |

`src/lib/` subdirectory breakdown (file counts include `*.test.ts`):

| Folder | Files | Purpose |
|---|---:|---|
| `calc/` | 70 | **The calculation engine.** 35 non-test modules (~18k LOC) + 35 test files (~17k LOC) |
| `builds/` | 19 | Save / share / URL-encode builds & loadouts; `build-stats.ts` + `loadout-stats.ts` are the orchestration layer that drives the engine |
| `mods/` | 18 | Mod-behavior registry (`mod-behavior-registry.ts`, 976 LOC), weapon eligibility, augment/set catalogs |
| `weapons/` | 16 | Weapon enrichment (`weapon-enrich.ts`), exalted resolution, external (ability) buffs, `effective-data.ts` (catalog+override merge), `use-data.ts` (React hooks) |
| `overrides/` | 11 | Runtime "Data Fixes" — schemas, deep-merge, in-memory override cache |
| `display/` | 11 | Label/image/badge formatting for UI |
| `warframe-arsenal/` | 10 | Player Sync — Twitch/DE arsenal import; **only place `@wfcd/*` is used** |
| `codex/` | 8 | Codex catalog helpers + `ability-scaling-registry.ts` (1660 LOC, wiki-verified ability stat scaling) |
| `auth/` | 8 | next-auth v5 sessions, admin gating, Resend email, rate limits |
| `bot/` | 6 | Discord bot helpers used by both `bot/` and web API |
| `site/` | 7 | Site metadata, nav, public-origin resolution, site-updates |
| `guides/` | 1 | guide content helper |
| lib root | 6 | `types.ts` (1308 LOC), `utils.ts` (clsx/tailwind-merge), `prisma.ts`, `sqlite-path.ts`, `log-server-error.ts`, `read-json-body.ts` |

`src/data/` largest files: `mods.ts` (22,239 LOC), `weapons.ts` (15,531), `warframes.ts`
(8,676), `weapon-radial-attacks.ts` (5,562), `arcane-effects.ts` (3,101),
`incarnon.ts` (2,081), `arcanes.ts` (2,009), `arcane-behaviors.ts` (1,304). Total
`src/data/*.ts` ≈ 66k LOC. Plus `src/data/mod-behaviors/` — `index.ts`, `verified-mods.ts`,
and `batches/` with 22 category files (`rifle.ts`, `melee.ts`, `warframe.ts`, `set.ts`, …).

**What the in-repo docs claim vs. reality (spot-checked):**

- `docs/ARCHITECTURE.md` — "Calculation stack" table points at `calc/calculator.ts`,
  `crit-utils.ts`, `effective-fire-rate.ts`, `melee-combo.ts`, `ttk.ts`, `damage-sim.ts`,
  `ability-ttk.ts`, `arcane-calculator.ts`, `arcane-handlers.ts`,
  `arcane-behavior-registry.ts`, `companion-calculator.ts`, `archwing-calculator.ts`,
  `railjack-calculator.ts`, `mod-capacity.ts`, `compute-used-capacity.ts`,
  `weapon-stat-merges.ts`. **All 16 exist at those exact paths.** Accurate.
- Claims "Catalogs remain in `src/data/`… Files are large on purpose" — matches
  (`mods.ts` is 22k LOC).
- Claims "Client is generated into `src/generated/prisma` (gitignored)" — matches
  `.gitignore`.
- Claims tests "live next to modules as `*.test.ts` (Vitest)" — matches
  `vitest.config.ts` `include: ["src/**/*.test.ts"]`.
- `docs/ACCURACY_CHECKLIST.md` (588 lines) is a phase-by-phase log of accuracy work.
  It claims `npm test` "Green at Phase 0 (190); expanded with phase audit suites" and
  an item-behavior coverage of "1556/1556". The live suite is now **1898 tests / 47
  files**, consistent with "expanded". Tiers: **A = "must be exact"** (9 items, all
  "Locked"/"Fixed"), **B = "best-effort modeled"** (B1–B24 + Sim1–Sim16 + RJ1–RJ7 +
  M0–M17 — dozens, mostly "Locked"), **C = "documented out of scope"** (C1–C7: most
  `mod_panel`/`arcane_panel` lines, weapon passive *text*, full mission AI, per-hit
  stance animation graphs).

### Inferences

- **The engine is a port from an earlier Dart/Flutter app** (confidence: high).
  `calculator.ts:1` — "ported from Dart with elemental combos, status procs, heavy
  attacks"; `data/incarnon.ts` — "Converted from `lib/data/incarnon_data_complete.dart`";
  `data/custom-items.ts` — "fill gaps in the auto-converted Dart data… merged into…
  the Dart source". Confirm: search the pre-AGPL git history (not present here) or ask
  the maintainer for the Dart repo + its licence.

### Unknowns

- Full `src/app` / `src/components` internal structure not exhaustively mapped — out of
  budget and not on the engine's critical path (the engine never imports them; §4).

### Risks

- `docs/ACCURACY_CHECKLIST.md` is the *only* map of what is exact vs. approximated.
  It is prose, not machine-checked, and already slightly stale on counts. Any reuse
  plan that trusts a mechanic as "exact" must re-verify against the actual test file.

---

## 2. Calculation engine

### Verified facts — where it lives & its shape

Engine root: **`src/lib/calc/`**. 35 non-test `.ts` modules. Entry points are plain
exported functions (no classes, no DI, no config object) in `calculator.ts` (2,227 LOC)
and siblings.

**Transitive import closure** (scripted from 18 entry modules —
`calculator.ts`, `ttk.ts`, `damage-sim.ts`, `arcane-calculator.ts`,
`riven-calculator.ts`, `companion-calculator.ts`, `archwing-calculator.ts`,
`railjack-calculator.ts`, `incarnon-active-weapon.ts`, `dps-contributions.ts`,
`ability-ttk.ts`, `set-bonuses.ts`, `melee-combo.ts`, `effective-fire-rate.ts`,
`crit-utils.ts`, `combat-multipliers.ts`, `weapon-stat-merges.ts`, `mod-capacity.ts`):

> **89 files. 0 external npm packages. 0 unresolved imports.**

The closure spans exactly: `src/lib/calc/*` (26 of 35 modules — the rest are
golden-data / test-only), `src/data/*` (43 files incl. all 22 `mod-behaviors/batches/`),
`src/lib/codex/{ability-scaling-registry,codex-catalog,item-behavior-types,railjack-abilities}.ts`,
`src/lib/display/{mod-display,arcane-display}.ts`,
`src/lib/mods/{mod-behavior-registry,railjack-plexus-mods,set-mod-catalog}.ts`,
`src/lib/overrides/{arcane-effect-overrides,data-overrides,override-merge,override-schemas,override-stat-catalog}.ts`,
`src/lib/weapons/{effective-data,exalted-weapons,weapon-enrich,weapon-external-buffs,weapon-radial-utils}.ts`,
and `src/lib/types.ts`.

No `react`, `next`, `next-auth`, `@prisma/*`, `@wfcd/*`, `warframe-worldstate-data`,
`tesseract.js`, `fetch(`, or `process.env` anywhere in that closure
(`rg` over `src/lib/calc/*.ts` non-test: the only "prisma"/"react"/"next" hits are
weapon **ids** like `prisma_gorgon` and railjack **`reactor`** variables — all false
positives). Zero `: any` / `as any` in the closure except **one** occurrence in
`calc/*.ts`; zero `@ts-ignore` / `@ts-expect-error` / `eslint-disable` in `calc/`.

### Verified facts — public surface (actual exported names)

`calculator.ts`:
- `calculateWeaponBuild(rawWeapon: Weapon, equippedMods: ModSlot[], allMods: Map<string,Mod>, incarnonStatChanges?: Record<string,number>, simParams?: SimulationParams, calcOptions?: WeaponCalculationOptions, linkage?: SetBonusLinkage, rivenStatChanges?: Record<string,number>): CalculatedStats` — the core weapon calculator (~1,100 LOC).
- `calculateWeaponBuildWithArcanes(…same…, arcanes: Mod[], …): CalculatedStats` — wraps the above, then applies each arcane, recomputes melee combo + effective fire rate.
- `calculateWarframeBuild(warframe: Warframe, equippedMods: ModSlot[], allMods: Map<string,Mod>, linkage?: SetBonusLinkage): WarframeCalculatedStats` — HP/shield/armor/energy/sprint, ability S/D/E/R, EHP, damage reduction.
- `applyWarframeShardsAndArcanes(stats, shards?, arcanes?, arcaneRanks?)` — mutates + returns `WarframeCalculatedStats`.
- `computeAdaptationSurvivability(...)`, `applyArcaneToWeapon`, `applyArcaneToWarframe`, `getWarframeEnergyModBase`, `quantizeDamageValue`, consts `ADAPTATION_MAX_STACKS=9`, `ADAPTATION_DR_PER_STACK=0.1`.

`ttk.ts` (731 LOC): `calculateTTK(stats: CalculatedStats, enemy: EnemyType, level: number): TTKResult`;
`simulateDiscreteTTK(...)` (shot-by-shot, ~415 LOC); scaling primitives
`scaleArmor(base,level)`, `scaleHealth(base,level,faction?)`, `scaleShield(base,level)`,
`enemyArmorDamageReduction(armor)`, `corrosiveArmorRemaining(stacks)`,
`punctureArmorRemaining(stacks,stripPerStack)`, `viralHealthMultiplier(stacks)`,
`heatArmorRemaining(bool)`, `averageProcsPerShot(sc,ms)`; data tables `ENEMY_TYPES` (19
enemies), `HEALTH_MODIFIERS` / `ARMOR_MODIFIERS` / `SHIELD_MODIFIERS` (damage-type × 8
health / 2 armor / 2 shield tables), `interface EnemyType`, `interface DotInstance`.

`damage-sim.ts` (320 LOC): `runDamageSim(...)`, `simInputsToCalculatedStats(input, faction)`,
`interface DamageSimInputs / DamageSimResult / DamageSimTypeRow` — paper breakdown +
discrete TTK for **hand-entered** stats (the standalone Damage Simulator page).

`crit-utils.ts` (59 LOC): `avgCritMultiplier(cc,cm)` (tiered — handles CC>100% orange/red/beyond),
`critTierDamage(tier,cm)`, `quantizeBaseCritMultiplier(cm)` (`Round(cm×4095/32)×32/4095`),
`critTiersToShow`, `critTierLabel` ("Yellow/Orange/Red crit"), `critTierColorClass`,
`exceedsWarframeInt32` (`WF_DAMAGE_INT_MAX = 2_147_483_647`).

`combat-multipliers.ts` (315 LOC): `combatDamageMultiplier({factionBonus,applyHeadshots,headshotDamageBonus,stanceMultiplier})`,
`factionHitMultiplier`, `factionDotMultiplier` (faction²), `factionTripleDotMultiplier` (faction³),
`factionBonusFromStats`, `normalizeFactionName`, `headshotMultiplier`,
`resolveStanceDamageMultiplier`, tables `STANCE_AVG_DAMAGE_MULTIPLIER` (per-stance),
`STANCE_TYPE_AVG_MULTIPLIER` (per weapon class), `DEFAULT_STANCE_AVG_MULTIPLIER = 1.55`,
`FACTION_STAT_TO_ID`, types `StanceComboDirection`, `StanceDpsModel`.

`effective-fire-rate.ts`: `resolveEffectiveFireRate(FireTimingInput)`, `moddedChargeTime`,
`isBowLike`, `isChargeTrigger`, `isBurstTrigger`, type `ChargeMode = "standard"|"bow"|"lanka"`.

`melee-combo.ts`: `applyMeleeComboToStats`, `resolveEffectiveComboCount`,
`getMeleeComboRules`, `getMeleeScalingMultiplier`, `getHeavyAttackComboMultiplier`,
`sumInitialComboFromMods`, `getInnateInitialCombo`; consts `STANDARD_COMBO_STEP=20`,
`STANDARD_HEAVY_COMBO_MAX=12`, `DEX_NIKANA_COMBO_STEP=11`, map `WEAPON_INNATE_INITIAL_COMBO`.

`melee-combo` support: `stance-combo-multipliers.ts` + `stance-combo-cycle-multipliers.ts`
(direction × stance → multiplier maps).

`arcane-calculator.ts` (367): `applyArcaneEffectsToWeapon`, `applyArcaneEffectsToWarframe`,
`applyArcaneToWeaponFromMod`, `applyArcaneToWarframeFromMod`, `effectiveArcaneStacks`,
`getArcaneEffectDef`.
`arcane-handlers.ts` (2,080): `applyCustomArcaneToWeapon`, `applyCustomArcaneToWarframe`,
sets `WEAPON_CUSTOM_ARCANE_IDS`, `WARFRAME_CUSTOM_ARCANE_IDS`, contexts
`ArcaneHandlerContext`, `WarframeArcaneContext`.
`arcane-proc-model.ts` (223): `arcaneEffectStackMultiplier`, `getArcaneProcUptime`,
`bigCritProcRate`, `estimateEnervateCritStacks`, `scaleArcaneEffectForBuild`, …
`arcane-behavior-registry.ts` + `arcane-utils.ts` (`PERSISTENCE_DAMAGE_CAP_BY_RANK`, scaling helpers).

`riven-calculator.ts` (401): `evaluateRiven(riven: RivenMod): number` (heuristic 0-1 score),
`getRivenGrade(score)`, `getStatsWithDisposition(...)`, `getRifleStats/getMeleeStats/getShotgunStats/getPistolStats/getArchgunStats`,
`rivenRankMultiplier`, `rivenBuffCountMultiplier`, `getRivenDrain`, `getRerollCost`,
`isValueInStatRange`, `formatRivenStatValue`, types `RivenStat`, `RivenMod`. **Grader
only — no riven generation/optimization.**

`incarnon-active-weapon.ts` (498): `resolveIncarnonActiveWeapon(...)`,
`applyIncarnonFormToWeapon(base, form)`, `isIncarnonFormActive`, `getIncarnonFormAttack`,
type `IncarnonResolveOptions`.
`weapon-stat-merges.ts`: `mergeIncarnonStatChanges(...)`, `mergeRivenStatChanges(...)`.

`set-bonuses.ts` (487): Vigilante/Augur/Hunter/Mecha/Synth/Tek/Umbral set-piece counters
& multipliers; `buildWeaponSetBonusSummary`, `buildWarframeSetBonusSummary`,
`computeMechaSpreadPaperDps`, `getUmbralSetBonusMultiplier`, `hunterCompanionDamageMultiplier`, …

`ability-ttk.ts` (187): `abilityToPseudoWeaponStats(ability, wfStats)` → builds a
`CalculatedStats` stub so an ability runs through the **same** weapon-TTK pipeline;
`resolveAbilityHitDamage(ability, strength)`, `calculateAbilityTTK`, `buildAbilityTTKEntries`.
`codex/ability-scaling-registry.ts` (1,660): `getVerifiedFieldScaling`, `getVerifiedMiscScaling`,
`resolveAbilityScalingKey` — a large wiki-cited table of which ability stat scales with
S/D/E/R (+ non-linear formulas like `channeled_drain`, `cast_cost`).

`companion-calculator.ts` (`calculateCompanionBuild`), `archwing-calculator.ts`
(`calculateArchwingBuild`, `calculateNecramechBuild`), `railjack-calculator.ts` (558 —
`calculateRailjackBuild`, `computeTunguskaStats`, `resolveHouseTrait`,
`railjackBuildNeedsSimulation`), `dps-contributions.ts` (583 — `computeDpsContributions`
"how much DPS does each mod add" marginal analysis), `mod-capacity.ts` /
`compute-used-capacity.ts` (mod points / polarity / aura).

Key input/output types (`src/lib/types.ts`, 1,308 LOC, zero `any`):
`Mod`, `Weapon` (+ `WeaponAtmosphereStats`, `WeaponAlternateModeStats`, `WeaponRadialAttack`),
`Warframe` (+ `Ability`), `ModSlot`, `EquippedMod`, `EquippedArchonShard`, `ArchonShard`,
`ModularBuildData`, `SetBonusLinkage`, `WeaponExternalBuff`, `WeaponCalculationOptions`,
`SimulationParams` (+ `DEFAULT_SIM_PARAMS`) — ~60 fields, every one documented with a
wiki reference, e.g. `killStacks`, `statusTypesOnTarget`, `arcaneStacks`,
`stanceComboDirection`, `targetFaction`, `applyHeadshots`, `vexArmorFuryFraction`,
`thrallCount`, `valenceFormationElement`, `criticalPrecisionStacks`, …
`CalculatedStats` (~280 fields), `WarframeCalculatedStats`, `CompanionCalculatedStats`,
`ArchwingCalculatedStats`, `RailjackCalculatedStats`, `Loadout`.

### Verified facts — determinism

Fully deterministic. No `Math.random`, no `Date.now`, no I/O in the closure
(the one `Date.now` / `Math.random` in `overrides/data-overrides.ts` is
`generateOverrideId()`, not on the calc path). `simulateDiscreteTTK` is a fixed
0.25 s time-step loop; status procs use **expected value** (`SC × multishot`), not RNG
sampling. `avgCritMultiplier` is an analytic tier blend. Same inputs → identical output.

### Coverage table (Warframe system → implemented? → where → completeness)

| System | Impl? | Location (file:line) | Notes / completeness |
|---|---|---|---|
| Base damage / IPS | ✅ | `calculator.ts:578` `calculateWeaponBuild`; quantization `calculator.ts:332 quantizeDamageValue` | Tier A "Locked" (`warframe-math-audit.test.ts`, bare-weapon goldens) |
| Elemental combination + **mod ordering** | ✅ | `calculator.ts:70 ELEMENTAL_COMBOS`, `:85 resolveElementalCombos` | Left-to-right pairing in equipped-mod order; same final type merges into one line. 6 combos hardcoded |
| Crit — tiers, orange/red/beyond | ✅ | `crit-utils.ts` (`avgCritMultiplier`, `critTierDamage`, `quantizeBaseCritMultiplier`), `crit-utils.test.ts` | Handles CC > 100% (tier floor + blend); base-CM quantization `×4095/32` |
| Status: proc counts | ✅ (EV) | `ttk.ts:144 averageProcsPerShot`, `damage-sim.ts` | Average-procs model (`SC×MS`), not "≥1 proc" and not RNG |
| Status DoT: Slash / Heat / Toxin / Electric / Gas | ✅ | `ttk.ts:413` `spawnDot(...)`, `:582–610`; `DotInstance` `ttk.ts:226` | 1 s tick; Slash bypasses armor ("cinematic"), Toxin bypasses shields; per-type `typeMult`. Electric/Gas modeled |
| Enemy scaling — armor/health/shield by level | ✅ | `ttk.ts:78 scaleArmor` / `:150 scaleHealth` / `:167 scaleShield` | Post-U32 S-curve; armor soft-cap 2700; infested health exp 2.15 vs 2.0 |
| Enemy armor DR | ✅ | `ttk.ts:104 enemyArmorDamageReduction` = `0.9×armor/2700` | |
| Armor strip — Corrosive / Heat / Puncture | ✅ | `ttk.ts:114 corrosiveArmorRemaining`, `:201 heatArmorRemaining`, `:132 punctureArmorRemaining` | Corrosive −26% then −6%/stack→−80%@10; Heat flat 50%; Puncture parametric |
| Viral / Magnetic multipliers | ✅ Viral / ⚠️ Magnetic | `ttk.ts:189 viralHealthMultiplier` (2.0 +0.25/stack → 4.25×) | Magnetic-vs-shield handled only via `SHIELD_MODIFIERS` type table, no stack model |
| **Steel Path** | ❌ | — | No SP toggle anywhere in `calc/` or `SimulationParams`. Enemy **level** is free (`sim-limits.ts` slider 200 / input 9999); SP's ×health/×armor/damage-resistance are *not* applied. Users approximate SP by raising level |
| Faction (Bane/Expel) multipliers | ✅ | `combat-multipliers.ts:46 factionBonusFromStats`, `:61/65/71` hit / DoT² / tripleDoT³; `SimulationParams.targetFaction` | |
| Weapon damage calc (guns) | ✅ | `calculateWeaponBuild` | Primary/secondary bare goldens "Locked" (B10/B11) |
| Multishot — pellets | ✅ | `calculator.ts:1053` `multishot = (base + lastShotBaseMsEv) × (1+bonus)`; Acuity "multishot cannot be modified" handled `:1032` | Per-pellet status aggregation `:1902` |
| Beam weapons | ✅ | `calculator.ts:1909 kitgunChamberCategory === "beam"`, enrich charge/beam timing | |
| Charge weapons / bows | ✅ | `effective-fire-rate.ts` (`ChargeMode "bow"|"lanka"`, `moddedChargeTime`) | |
| Explosion / radial / falloff | ⚠️ partial | `weapon-radial-dps.ts` (`avgRadialDamage`, `radialAttacksPerSecond`, `scaleRadialAttacksWithDps`), `data/weapon-radial-attacks.ts` (5,562 LOC), `calculator.ts:387` | Direct-hit vs explosion split is wiki-locked per weapon (B16/B17); **distance falloff curve is not modeled** — radial is a flat avg |
| Mod interactions & stacking | ✅ | `mods/mod-behavior-registry.ts` (976) + `data/mod-behaviors/batches/*` (22 files) — per-mod "verified" stat lines with apply-target routing | 519 mod lines → `weapon_dps`, 179 → `warframe_totals` per ACCURACY_CHECKLIST; conditional stacks in `conditional-stack-audit.test.ts` (57 cases) |
| Gun CO / Condition Overload / Galvanized | ✅ | `SimulationParams.statusTypesOnTarget` + `killStacks`; `calculator.ts` `conditionOverloadBonus`, `galvanizedMultishotOnKill`, `galvanizedDamagePerStatus` fields; Tier B7 "Locked" (Phase 3 + Galv melee stacks) | Paper-vs-stacks both modeled |
| Blood Rush / Weeping Wounds / Berserker | ✅ | `calculator.ts` `bloodRushStacks`, `weepingWoundsBonus`, `berserkerFuryBonus`; `melee-combo.ts` | |
| Incarnon evolutions | ✅ | `incarnon-active-weapon.ts` (498) + `data/incarnon.ts` (2,081) + `data/incarnon-genesis-evolutions.ts` (761, wiki-parsed) + `weapon-stat-merges.ts`; tests `incarnon-active-weapon.test.ts` (2,504 LOC, ~132 cases), `phase5-9-audit.test.ts` | "53 Incarnon weapons"; form-active vs passive deltas, charge-mode deltas, per-variant overrides. Deepest-tested subsystem |
| Rivens — stat pools, disposition | ✅ (grader) | `riven-calculator.ts` (401), `data/riven-dispositions.ts` (647, `omegaAttenuation`) | Disposition-scaled ranges + heuristic grade; **no roll generation**; unknown-disposition warns |
| Arcanes — weapon + Warframe | ✅ | `arcane-calculator.ts` + `arcane-handlers.ts` (2,080) + `arcane-proc-model.ts` + `data/arcane-effects.ts` (3,101) / `arcane-behaviors.ts` (1,304) / `arcanes.ts` (2,009) | 20 arcane lines→`weapon_dps`, 30→`warframe_totals`, 81→custom handler (ACCURACY_CHECKLIST); `arcane-calculator.test.ts` |
| Warframe ability damage | ⚠️ modeled-thin | `ability-ttk.ts` `abilityToPseudoWeaponStats` / `resolveAbilityHitDamage` (= `damage × strength`, linear); scaling registry `codex/ability-scaling-registry.ts` | Tier B5 "ability scaling sparse… full kits through mechs/Nokko + heat/battery/absorb sims". Only stats in the verified registry scale; rest show base |
| Exalted weapons | ✅ | `weapons/exalted-weapons.ts` (`resolveExaltedStrengthForCalc`, `scaleExaltedWeaponByStrength`, `exaltedUsesAdditiveStrengthBonus`) | Tier B9 "Locked" — all 37 `isExalted` rows wiki-locked; STR scales base before mods; Lizzie additive `1.25×STR−1`; Garuda Talons ignore STR |
| Archon shards | ⚠️ partial | `calculator.ts:1965 applyWarframeShardsAndArcanes` | Azure/Topaz flat + Crimson/Violet S/D/E/R % + Amber applied. **Violet ability-damage, Topaz on-kill, Emerald corrosion/toxin-heal are explicit `break;` no-ops** (`calculator.ts:2035–2085`) |
| Modular weapons (Kitguns / Zaws / Amps) | ✅ | `data/modular-weapons.ts` (489 — chamber/grip/loader lookup tables, not multipliers) + `builds/modular-resolve.ts` `weaponFromModularData`; `modular-weapon-audit.test.ts` | Tier B15 "Locked" with noted approximations (Sporelacer/Vermisplicer grip deltas category-shared) |
| Modular Kubrows / Kavats / Hounds | ⚠️ | `data/companions.ts` (396), `data/custom-items.ts` (Hound weapons Akaten/…), `companion-calculator.ts` | Companion DPS via claws; beast breeding stats not modeled |
| Companion / beast sets (Hunter/Mecha) | ✅ | `set-bonuses.ts` `countHunterSetPieces`, `computeMechaSetMarkStats`, `computeMechaSpreadPaperDps` | Tier B4 "Improved" (mark-kill spread DoT sim-gated) |
| Archwing / Necramech | ✅ | `archwing-calculator.ts`, `data/archwing.ts`, `arch-*-goldens.ts`, `arch-weapon-audit.test.ts`, `necramech-mod-audit.test.ts` | Atmosphere + Space stat overlays (B13/B21) |
| Railjack (ship, armaments, intrinsics, Tunguska) | ✅ | `railjack-calculator.ts` (558) + `data/railjack.ts` (508) + `railjack-intrinsics.ts` + `mods/railjack-plexus-mods.ts`; `railjack-calculator.test.ts`, `railjack-*-audit.test.ts` | RJ1–RJ7 "Locked" |
| Helminth abilities | ✅ | `data/helminth.ts` (207), `weapons/weapon-external-buffs.ts`, `builds/build-stats.ts` | Roar/Eclipse/Nourish/Xata as `activeWeaponAbilityBuffs` |
| DPS contribution / marginal analysis | ✅ | `dps-contributions.ts` | "+X% DPS per mod" |
| Mod capacity / polarity / forma / aura | ✅ | `mod-capacity.ts`, `compute-used-capacity.ts` | |

### Gap list (missing / explicitly approximate)

1. **Steel Path** — no scaling multipliers at all; only raw level.
2. **Ability damage** — linear `damage × strength`; no per-ability damage formulas,
   armor interaction is a bool `ignoreArmor`, no ability crit/status pipeline beyond the
   pseudo-weapon stub. ACCURACY_CHECKLIST Tier B5 self-labels "sparse".
3. **Archon shard offensive effects** — Violet `abilityDamage*`, Topaz `*Kill*`,
   Emerald `toxin*` / `corrosionMaxStacks` are un-implemented `break;` cases.
4. **Radial/explosion distance falloff** — flat average, no falloff curve
   (`weapon-radial-dps.ts:15 avgRadialDamage`).
5. **Stance DPS** — `combat-multipliers.ts:90` self-labels "Approximate average stance
   damage multiplier… Tier B best-effort (not full combo-string simulation)". Two
   models: hit-avg (default) and `cycle`; per-hit animation timing is Tier C6 out of scope.
6. **Status procs are expected-value**, not a sampled distribution — fine for DPS,
   not for "chance to kill in N shots" variance.
7. **Riven** — grading only; `riven-calculator.ts:49` "Approximate community tables".
8. **Magnetic / shield-gate / overguard** — no magnetic stack model; overguard not in
   `ENEMY_TYPES`; shield-gating not modeled in `simulateDiscreteTTK`.
9. **Enemy roster is 19 hardcoded archetypes** (`ttk.ts:26`) — no eximus overguard, no
   liches/sisters, no Murmur/Narmer/Zariman factions, no boss profiles.
10. **Mission AI / squad buffs / unlisted team effects** — Tier C4, disclaimed.
11. `arcane-proc-model.ts:209` Enervate crit stacks "simplified"; several `Sim*`
    mechanics in ACCURACY_CHECKLIST are "user-estimated" slider inputs, not derived.

### Unknowns

- Whether the linear ability-damage model is materially wrong for the abilities
  Cephalon cares about — needs a spot-check against wiki worked examples.
- Numerical accuracy vs. live game for high-level (>lvl 300) scaling — only asserted
  by goldens that top out around the tested range.

### Risks

- The engine's accuracy story is **catalog-data-bound**: `mods.ts` (22k LOC),
  `weapons.ts` (15k), the 22 `mod-behaviors` batches and `riven-dispositions.ts` are
  hand/scripted-maintained against a game DE patches every few weeks. A reused engine
  inherits a **continuous data-maintenance burden**, not a one-time port.
- `calculator.ts` (2,227 LOC) and `arcane-handlers.ts` (2,080 LOC) are single-function
  god files — high risk for anyone modifying formula behavior.
- Ability damage and Archon shards are the weakest links and are exactly the areas an
  "AI build assistant" product is likely to lean on.

---

## 3. Game data — source & normalization

### Verified facts

- **All catalog data is committed static TypeScript** under `src/data/*.ts`
  (`export const allWeapons: Weapon[] = [ … ]`, `allMods`, `allWarframes`, `allArcanes`,
  `allCompanions`, `allArchonShards`, `archwings`/`necramechs`, `customWeapons`). No DB
  table holds game data (see §8 — Prisma models are all app-level). No runtime fetch
  builds catalogs.
- **`@wfcd/items` and `@wfcd/arsenal-parser` are used only in
  `src/lib/warframe-arsenal/`** (`lotus-resolve.ts`, `map-import.ts`,
  `normalize-payload.ts`) — the Player Sync / Twitch-extension import feature. They are
  **not** imported by `src/data/` or by the calc closure. `next.config.ts` lists all
  three `@wfcd`/worldstate packages in `serverExternalPackages` (server-only, large ESM).
- **`warframe-worldstate-data`** — not imported anywhere in `src/` I could find; the
  Discord bot uses `api.warframestat.us` over HTTP instead (`bot/lib/bot/worldstate-client.ts`).
- **Normalization into the engine's own types** happens at authoring time (the `src/data`
  files already conform to `src/lib/types.ts` `Weapon`/`Mod`/…). At runtime the only
  transform is:
  - `src/lib/weapons/effective-data.ts` — `getEffectiveWeapons()` etc.: takes static
    `allWeapons` (+ `customWeapons`), applies `DataOverride`s
    (`applyWeaponOverrides(...)` from `overrides/data-overrides.ts`), runs
    `enrichWeapon()`, returns arrays/Maps. Pure; no `window`/`fetch`/`localStorage`.
  - `src/lib/weapons/weapon-enrich.ts` — fills pure-element damage, charge/burst timing,
    attaches radial attacks & passives from `data/weapon-radial-attacks.ts` /
    `data/weapon-passives.ts`. Idempotent.
- **`DataOverride`** (`overrides/data-overrides.ts`): staff "Data Fixes" corrections.
  Held in a module-level `let overrideCache: DataOverride[] = []` populated from
  `GET /api/data-overrides`. `getOverrides()` returns it; defaults to `[]`, so the
  engine runs fully without the DB. `applyModify` = `deepMergeOverrideFields`.
- **Build/generation step**: `scripts/` — Python + `.mjs` that scrape
  `wiki.warframe.com` / `warframe.fandom.com` / `api.warframestat.us` and *write into*
  `src/data/` (`apply_*.py` write catalogs; `audit_*.py` report; `generate_*` /
  `fetch_*` / `convert_*` pipeline). Examples: `_sync_riven_dispositions.mjs`
  (`api.warframestat.us/weapons` → `src/data/riven-dispositions.ts`),
  `generate_all_mod_behavior_batches.py`, `_generate_incarnon_evolutions.js`,
  `verify-ability-scaling.py`. **These run offline by a maintainer; their output is
  reviewed and committed.** `package.json` has no data-gen in `build` (`build =
  "prisma generate && next build"`).
- **Large committed data blobs**: `src/data/mods.ts` 22,239 LOC; `weapons.ts` 15,531;
  `warframes.ts` 8,676; `weapon-radial-attacks.ts` 5,562; `arcane-effects.ts` 3,101.
  Also `scripts/_mod_wiki_meta.json`, `scripts/_wiki_mods_data.lua`.

### Inferences

- **Data provenance is: original auto-conversion from a Dart app, then incremental
  wiki-scrape reconciliation** (confidence: high — `custom-items.ts` header, `incarnon.ts`
  header, the `scripts/` naming, ACCURACY_CHECKLIST phase log).
- `@wfcd/items` was likely evaluated and rejected as the catalog source in favor of the
  hand-curated Dart-derived catalog (confidence: medium — it's a dependency but walled
  off in one feature folder). Confirm with maintainer.

### Unknowns

- How often the `scripts/` sync is actually run / how stale `src/data` is vs. current
  live game — no timestamps beyond "Last verified: 2026-07" comments.
- Whether every `src/data` file was machine-validated against `src/lib/types.ts`
  (there is `scripts/validate-mods.ts` and `audit_stat_keys.py`, but coverage unclear).

### Risks

- Pinned `@wfcd/items` `^1.1275.7` — only the Player Sync feature breaks if it drifts,
  not the engine.
- The catalog is the product's moat *and* its liability: ~50k LOC of hand-maintained
  numbers with no automated "is this still correct after patch X" gate beyond goldens
  that were themselves hand-entered from the wiki.
- `scripts/` is explicitly "scratch" per `scripts/README.md` — the data pipeline is not
  a hardened, reproducible build. Re-deriving the catalog from scratch is not currently
  a supported operation.

---

## 4. UI coupling map

### Verified facts — dependency direction

- **The engine is a leaf.** `rg "from ['\"]@/(app|components)/" src/lib/calc/` → **no
  matches**. `calc/` never imports `app/` or `components/`.
- Consumers of `calculateWeaponBuild` / `calculateWarframeBuild` / `runDamageSim` /
  `calculateTTK` (outside `calc/`):
  - `src/app/{weapon,warframe,companion,archwing,modular}-builder/page.tsx`,
    `src/app/compare/page.tsx`, `src/app/damage-simulator/page.tsx` — all `"use client"`
    page components.
  - `src/components/stats/ttk-section.tsx` — `"use client"`.
  - `src/lib/builds/build-stats.ts` (310 LOC), `src/lib/builds/loadout-stats.ts` (603
    LOC) — **framework-agnostic orchestration**; import only `@/data`, `@/lib/calc`,
    `@/lib/weapons`, `@/lib/builds`. These are the natural "services" seam.
  - `src/lib/weapons/weapon-external-buffs.ts` — pure, in the closure.
- **No API route runs the calculator.** All calculation is client-side.

### Bucket (a) — pure / portable (no React/Next/Prisma/fetch/env)

The **entire 89-file calc closure** (§2). Representative:
- `src/lib/calc/*.ts` (all 26 non-golden modules), e.g. `calculator.ts`, `ttk.ts:1`,
  `crit-utils.ts:1`, `combat-multipliers.ts:1`, `damage-sim.ts:1`.
- `src/lib/types.ts` — pure type + const module, zero imports, zero `any`.
- `src/data/**` — `rg "from ['\"](react|next|@prisma|next-auth)|process\.env|fetch\(|use client" src/data/` → **no matches** (no framework/IO coupling). **Correction (was previously understated here):** `src/data/**` is *not* a dependency-free leaf — it has **35 import edges into `src/lib/**`**:

  | `src/data` imports | count | from |
  |---|---:|---|
  | `@/lib/codex/item-behavior-types` | **25** | `arcane-behaviors.ts`, `mod-behaviors/index.ts`, `mod-behaviors/verified-mods.ts`, + all 22 `mod-behaviors/batches/*.ts` |
  | `@/lib/types` | **9** | `mods.ts`, `weapons.ts`, `warframes.ts`, `companions.ts`, `arcanes.ts`, `archon-shards.ts`, `archwing.ts`, `custom-items.ts`, `modular-weapons.ts` (approx.) |
  | `@/lib/mods/set-mod-catalog` | **1** | `mods.ts` |

  All **three** target files are themselves pure leaves: `types.ts` — **zero imports**; `codex/item-behavior-types.ts` — **zero imports** (6 type/interface exports + one trivial pure `itemApplyTargetLabel()` string map); `mods/set-mod-catalog.ts` — imports **only** `import type { Mod } from "@/lib/types"` (7 pure exports over the `Mod` shape). None import `@/data`. So the **file-level** dependency graph is acyclic, but at the **directory level `src/data` ⇄ `src/lib` point at each other** (~75 lib→data edges, 35 data→lib) — a clean 2-package `src/lib` / `src/data` split is blocked until `types.ts`, `item-behavior-types.ts` and `set-mod-catalog.ts` are relocated to the data/shared side. Both movable files are pure and moving them (re-pointing the 25 + 1 importers) eliminates all 35 back-edges. Plus 2 intra-`data` cross-imports (`incarnon.ts`, `incarnon-genesis-evolutions.ts`) and the `mod-behaviors/index.ts` barrel over 22 batch files.
- `src/lib/weapons/{effective-data,weapon-enrich,weapon-external-buffs,exalted-weapons,weapon-radial-utils}.ts` — verified clean.
- `src/lib/display/{mod-display,arcane-display}.ts`, `src/lib/mods/{mod-behavior-registry,set-mod-catalog,railjack-plexus-mods}.ts`, `src/lib/codex/{ability-scaling-registry,codex-catalog,item-behavior-types,railjack-abilities}.ts` — verified clean.
- `src/lib/builds/build-stats.ts`, `src/lib/builds/loadout-stats.ts` — pure (but
  `loadout-stats.ts:11` imports `build-storage.ts` → see bucket b).

### Bucket (b) — lightly coupled (obvious single seam)

- **`src/lib/overrides/data-overrides.ts`** (in the calc closure): 95% pure, but
  `notifyDataOverridesUpdated()` uses `window` (guarded `typeof window !== "undefined"`)
  and `saveOverride`/`deleteOverride`/`exportOverrides` do
  `await import("@/lib/overrides/data-overrides-client")` (lazy). The **calc-relevant
  exports** (`getOverrides`, `applyWeaponOverrides`, …, `mergeOverrideLists`) are pure.
  Seam: drop the mutation helpers, keep `getOverrides()` + `apply*Overrides()`.
- **`src/lib/weapons/use-data.ts`** (NOT in closure): `"use client"`, wraps the pure
  `effective-data.ts` getters in `useState`/`useEffect` hooks + a
  `"upstream-project-data-overrides-updated"` `window` event listener. This *is* the
  React-binding layer for catalogs — deliberately thin, re-exports the pure functions.
- **`src/lib/builds/build-storage.ts`** (imported by `loadout-stats.ts`): `localStorage`
  build persistence. `loadout-stats.ts` only pulls `resolveSavedArcaneSlots` /
  `WarframeBuildData` (types + a pure resolver) from it — but the file itself touches
  `localStorage`. Seam: split the pure resolvers out of `build-storage.ts`.
- `src/lib/warframe-arsenal/riven-resolve.ts` (imported by `loadout-stats.ts:27` for
  `rivenStatChangesFromModSlots`) — **verified pure**: zero imports, just DE-tag→stat
  lookup tables + a mapping function. Only "coupled" by folder placement; move it to the
  engine's support set.

### Bucket (c) — entangled (real React/Next/Prisma/next-auth dependency)

None of these are in the calc closure. Listed for completeness:
- `src/lib/prisma.ts`, `src/lib/auth/*` (`auth.ts`, `admin.ts`, `email.ts`,
  `supporter.ts`, `use-staff.ts`) — `@prisma/client`, `next-auth`, `next/headers`, Resend.
- `src/lib/builds/build-storage.ts`, `use-cloud-build-from-url.ts`,
  `use-local-build-from-url.ts`, `use-loadout-slot-from-url.ts` — React hooks + `fetch`.
- `src/lib/site/{public-origin,site-metadata,site-updates-server}.ts` — `next/*`, env, Prisma.
- `src/lib/warframe-arsenal/{fetch,twitch-auth}.ts`, `src/lib/bot/*` — server `fetch` to
  external services.
- `src/lib/overrides/data-overrides-client.ts` — `localStorage`, `fetch`, `window`.
- `src/lib/display/avatar-crop.ts` — `document`/canvas.
- All of `src/app/**` and 67/74 `src/components/**`.

### React 19 / compiler notes

- `next.config.ts:` `reactCompiler: true`; `babel-plugin-react-compiler@1.0.0` in
  devDeps. **App-wide, but irrelevant to the engine** — no file in the calc closure
  contains JSX or a React import, so the compiler plugin never touches engine code.
- No React 19 `use()` / RSC / `"use server"` anywhere in `src/lib/calc` or `src/data`
  (`rg` confirmed). Server Actions exist in the app layer only.

### Unknowns

- None material for this section. `build-stats.ts` / `loadout-stats.ts` verified clean
  of `react` / `next` / `@prisma` / `localStorage` / `window`; their only
  outside-the-closure imports are `build-storage.ts` (types + `resolveSavedArcaneSlots` /
  `resolveDefaultCompanionWeapon`) and the now-verified-pure `riven-resolve.ts`.

### Risks

- `build-stats.ts` / `loadout-stats.ts` are the cleanest "services" candidates but they
  currently reach into `build-storage.ts` (which itself touches `localStorage`) — a lift
  needs that one import path split into pure resolvers vs. persistence.
- `data-overrides.ts` sits *inside* the engine closure with a `window` reference. It's
  guarded and dead on Node, but it means "the engine has zero DOM references" is
  *nearly* true, not exactly true.

---

## 5. Extraction candidates

### Verified facts

- **Clean extractable unit = the 89-file closure**: `src/lib/calc/` + `src/data/` +
  `src/lib/types.ts` + the 14 helper files from `codex/`, `display/`, `mods/`,
  `overrides/`, `weapons/` listed in §2. Total ≈ 18k (calc) + 66k (data) + ~5k (helpers)
  ≈ **90k LOC**, mostly data.
- **Dependency fan-out**: the closure pulls in **nothing** from `src/app` or
  `src/components` and **zero** npm packages. Verified by script (0 external, 0
  unresolved).
- **Circular imports (file level)**: none. `calculator.ts:51` imports
  `mods/mod-behavior-registry.ts`; the registry does **not** import back
  (`rg "calc/calculator" src/lib/mods/mod-behavior-registry.ts` → only a code comment at
  `:655`). `arcane-calculator.ts` ↔ `arcane-handlers.ts` re-export each other's types
  via `export type { WarframeArcaneContext } from "…/arcane-handlers"` — type-only, not a
  runtime cycle.
- **Directory-level `src/lib` ⇄ `src/data` coupling (blocks a 2-package split)**:
  `src/lib` → `src/data` = **75** `from "@/data/…"` import statements (142 imported
  symbols) in non-test lib code, across **24 distinct `@/data/*` modules**; the reverse
  `src/data` → `src/lib` = **35** statements into just 3 files
  (`codex/item-behavior-types` ×25, `types` ×9, `mods/set-mod-catalog` ×1 — see §4). All
  3 are pure leaves, so no *module* cycle, but you cannot draw a one-way package boundary
  between `lib` and `data` until those 3 files move to the data/shared side. Test files
  add **81** more `from "@/data/…"` statements (89 symbols), 75 of them in `calc/` tests.
- **Path aliases**: `tsconfig.json` `"paths": { "@/*": ["./src/*"] }`;
  `vitest.config.ts` mirrors it (`resolve.alias "@" → ./src`). The closure uses `@/lib/*`
  and `@/data/*` throughout (plus some relative `../types`). To lift into a package you
  either (a) keep a `@/*` alias pointing at the package `src/`, or (b) rewrite
  `@/lib/…`→`./…` and `@/data/…`→`../data/…`. Count: ~40 distinct `@/` import specifiers
  across the closure — a scripted codemod, not hand work.

### What would block a clean lift

1. **`overrides/data-overrides.ts`** — the `window` reference + lazy
   `import("./data-overrides-client")`. Fix: extract a `pure` subset (`getOverrides`,
   `setOverrideCache`, `apply*Overrides`, `mergeOverrideLists`, `deepMergeOverrideFields`)
   and leave persistence in the app.
2. **`builds/build-stats.ts` / `loadout-stats.ts`** if you want them in the package —
   cut imports of `build-storage.ts` and `warframe-arsenal/riven-resolve.ts`.
3. **Catalog loading contract** — today the app calls `getEffectiveWeapons()` which
   merges overrides + enrich internally. A package should expose the pure
   `calculate*` functions that take `Weapon[]` / `Map<string,Mod>` explicitly (they
   already do) and let the host decide how catalogs are produced.
4. **`@wfcd/*` stays behind** — it's not in the closure, so nothing to do beyond not
   copying `src/lib/warframe-arsenal/`.
5. **Test alias** — the 47 test files import only `vitest` + `@/lib/*` / `@/data/*`
   (+ one component-util import in a non-calc test). They lift with the engine if the
   `@` alias is preserved in the package's `vitest.config.ts`.
6. **`src/data` ⇄ `src/lib` back-edges** (§4) — if the target layout keeps `lib` and
   `data` as *separate* packages, the 35 `src/data → src/lib` imports must be removed
   first by relocating `types.ts`, `codex/item-behavior-types.ts` and
   `mods/set-mod-catalog.ts` into the data (or a shared `warframe-types`) package and
   re-pointing 26 importers (25 for `item-behavior-types`, 1 for `set-mod-catalog`,
   plus the `types` importers). Both non-`types` files are pure — mechanical, ~1 commit.
   If instead the engine ships as **one** package containing both `lib/` and `data/`
   (recommended by the "days not weeks" read below), this is a non-issue.

### Inferences

- **A framework-agnostic `@cephalon/engine` package is genuinely feasible with days,
  not weeks, of mechanical work** (confidence: high). The hard part is already done —
  the maintainer kept `calc/` pure by discipline (ARCHITECTURE.md: "prefer these for new
  files", the `mod-behaviors` split, the "verified" registries).
- The natural package layout: `engine/src/calc/**`, `engine/src/data/**`,
  `engine/src/types.ts`, `engine/src/support/**` (the codex/display/mods/overrides/weapons
  helpers), `engine/test/**` (move `*.test.ts` or keep co-located).

### Unknowns

- Whether `build-stats.ts`/`loadout-stats.ts` orchestration should be *in* the package
  or in Cephalon's service layer — design call for Athena.
- Exact codemod scope for `@/` → relative (needs a dry run).

### Risks

- If the package keeps `@/*` aliasing, every consumer (Cephalon app, AI tools, tests)
  must configure the same alias — a footgun. Relative-rewrite is cleaner but touches
  the ~24 distinct `@/data/*` + ~40 `@/lib/*` specifiers across ~90 engine files and
  ~81 more `@/data/*` statements in tests — a scripted codemod, but a large one-way diff.
- **`src/lib` and `src/data` cannot be cleanly separated into two packages** as-is:
  bidirectional directory coupling (75 lib→data, 35 data→lib). Treat the engine as one
  package (`lib/` + `data/` + `types`) — or pay the relocation cost in blocker #6. Any
  Athena plan that assumes "engine package imports a separate data package, one-way"
  is wrong until those 3 leaf files move.
- Data and code are the same size problem: shipping the engine means shipping and
  versioning ~66k LOC of catalog. Package publish/CI needs to handle a large payload.

---

## 6. Test suite assessment

### Verified facts

- **Framework**: vitest 3 (`3.2.7` at run time; `package.json` `^3.2.4`).
  `vitest.config.ts` (full contents):
  ```ts
  export default defineConfig({
    test: { environment: "node", include: ["src/**/*.test.ts"] },
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  });
  ```
  No setup file, no coverage config, no mocks, `environment: "node"`.
- **Counts**: 47 test files, 1898 tests, all pass, ~16.6 s wall (see §0).
- **Location**: 35 of 47 test files are in `src/lib/calc/`. The other 12:
  `codex/ability-misc-stats.test.ts` (125 cases — ability scaling, calc-adjacent),
  `weapons/weapon-external-buffs.test.ts` (34 — calc-adjacent),
  `mods/{amalgam-furax-eligibility,mod-eligibility-inventory}.test.ts` (12),
  `weapons/companion-weapons.test.ts` (1),
  `builds/{build-url,loadout-save}.test.ts` (10 — serialization),
  `overrides/override-merge.test.ts` (4),
  `warframe-arsenal/{catalog-match,normalize-payload}.test.ts` (13 — import feature),
  `bot/worldstate-client.test.ts` (8 — bot),
  `components/stats/use-sim-stat-change-flash.test.ts` (2 — UI hook).
- **Calculation-focused share**: the 35 `calc/` files + `codex/ability-misc-stats` +
  `weapons/weapon-external-buffs` ≈ **~1,780 of 1,898 tests (~94%)** exercise
  calculation behavior. Non-calc ≈ ~50 (serialization, arsenal import, bot,
  1 UI hook).
- **Biggest calc test files**: `phase5-9-audit.test.ts` (6,066 LOC),
  `incarnon-active-weapon.test.ts` (2,504), `gun-mod-audit.test.ts` (1,280),
  `conditional-stack-audit.test.ts` (793), `warframe-math-audit.test.ts` (702),
  `exalted-weapon-audit.test.ts` (609), `melee-mod-audit.test.ts` (573).
- **Fixture style**: **inline literals only.** No JSON fixtures, no
  `toMatchSnapshot`, no `readFileSync`, no `__snapshots__` in any calc test
  (`rg` confirmed). "Golden" datasets are inline `.ts` arrays checked into
  `calc/*-bare-goldens.ts` (`melee-bare-goldens.ts` 2,664 LOC,
  `primary-bare-goldens.ts` 2,172, `secondary-bare-goldens.ts` 1,684,
  `arch-bare-goldens.ts`, `launcher-bare-goldens.ts`, `sentinel-bare-goldens.ts`,
  `arch-atmosphere-goldens.ts`) and consumed via `it.each` / `describe.each` in
  9 `*-weapon-audit.test.ts` files.
- **Portability**: test imports are **only** `vitest` and `@/lib/*` / `@/data/*`
  (`rg` over all 47: `47× vitest`, `1× @/components/stats/use-sim-stat-change-flash`).
  No Prisma, Next, next-auth, testing-library, MSW, or setup file. **The calc suite
  lifts into a standalone package essentially unchanged** — only requirement is the
  `@` → `src` alias in the package's `vitest.config.ts` (or a relative-import codemod).

### Well covered vs. thin (cross-ref §2 coverage table)

**Well covered**: bare weapon math / IPS / crit / multishot / fire rate
(`warframe-math-audit`, `*-bare-goldens` — hundreds of wiki-locked rows); gun & melee
mod application (`gun-mod-audit` 137, `melee-mod-audit` 57); Incarnon
(`incarnon-active-weapon` ~132 + big chunks of `phase5-9-audit`); conditional stacking
CO/BR/WW/Galv (`conditional-stack-audit` 57); exalted (`exalted-weapon-audit` 11 `.each`
over 37 rows); warframe survivability/power mods (`warframe-mod-audit` 56,
`warframe-math-audit` 44); set bonuses (`set-bonus-audit` 11); railjack (RJ suites);
arcanes weapon-side (`arcane-calculator`, phase5-9); ability *scaling* rules
(`codex/ability-misc-stats` 125).

**Thin**: discrete TTK (`ttk-discrete.test.ts` only 9 cases for a 415-LOC simulator);
`damage-sim.test.ts` (7); `dps-contributions.test.ts` (2); `riven-calculator.test.ts`
(7 — grader heuristic barely pinned); `arcane-calculator.test.ts` (7 — vs a 2,080-LOC
handler file); companion (`companion-mod-audit` 8, `companion-claw-mod-audit` 12);
`modular-weapon-audit.test.ts` (4); **no test at all** for Steel Path (doesn't exist),
enemy-roster completeness, ability crit/status through the pseudo-weapon path, or
radial falloff.

### Inferences

- The suite is a **regression lock, authored bottom-up from the wiki**, not a spec —
  it asserts "this build → this number" for thousands of concrete cases. High value for
  "did I break a formula", low value for "is the model conceptually complete"
  (confidence: high, from reading the audit files' structure).

### Unknowns

- Real per-`it` count if `it.each` rows were fully expanded (1898 is vitest's own count,
  so it already reflects `.each` expansion).
- Whether any tests are non-deterministic under a different TZ/locale — none observed,
  and there's no `Date`/`Intl` in the closure, so very unlikely.

### Risks

- The 415-LOC `simulateDiscreteTTK` — the thing an "how long to kill" AI answer would
  call — has ~9 direct assertions. Refactor risk is real.
- Goldens are hand-transcribed wiki values; a systematic transcription error would be
  "locked in" as correct.
- `phase5-9-audit.test.ts` at 6,066 LOC is itself a maintenance hazard.

---

## 7. Technical debt / risky architecture

### Verified facts

- **God files**: `calc/calculator.ts` 2,227 LOC with `calculateWeaponBuild` alone
  ~1,100 LOC (single function, deeply nested mod-accumulation); `calc/arcane-handlers.ts`
  2,080 LOC (two mega-functions `applyCustomArcaneToWeapon` `:323` /
  `applyCustomArcaneToWarframe` `:1468` — giant `if (arcaneId === …)` ladders);
  `codex/ability-scaling-registry.ts` 1,660; `mods/mod-behavior-registry.ts` 976;
  `calc/ttk.ts` 731 (`simulateDiscreteTTK` ~415). Test god file
  `phase5-9-audit.test.ts` 6,066.
- **Type quality is high, not a debt source**: `rg ": any|as any" src/lib/calc/*.ts`
  (non-test) → **1** hit total; `src/data/*.ts` → 0; `types.ts` → 0; no `@ts-ignore` /
  `@ts-expect-error` in `calc/`. `tsconfig.json` `strict: true`.
- **Magic numbers with sourcing**: mostly *good* — formulas carry wiki citations in
  JSDoc (`ttk.ts:78` S-curve, `:101` "DR = 0.9 × NetArmor / 2700", `crit-utils.ts:8`
  "Quantized Base CM = Round(Base CM × 4095/32) × (32/4095)"). But the constants are
  **hardcoded in code**, not a dated `game-constants.ts`: armor soft-cap `2700`
  (`ttk.ts:81,96,106`), health-scale coeff `0.015` / exp `2.0`/`2.15` (`:154`),
  armor `0.005`/`1.75` (`:84`), shield `0.0075` (`:174`), `ELEMENTAL_COMBOS`
  (`calculator.ts:70`), `DEFAULT_STANCE_AVG_MULTIPLIER = 1.55`
  (`combat-multipliers.ts:277`), `ADAPTATION_*` (`calculator.ts:1884`), 19-enemy
  `ENEMY_TYPES` base stats (`ttk.ts:26`), damage-type modifier tables (`ttk.ts:52-71`).
  DE changes these on balance patches.
- **Calc logic in React components / API routes**: **none found.** All `calculate*`
  callers in `src/app` are client page components that just call the pure function and
  render; no formula math in `route.ts` files.
- **Duplicated formula logic**: mostly avoided — `damage-sim.ts:2` explicitly "All
  armor / viral / corrosive / crit math comes from ttk.ts + crit-utils … Do not
  reimplement". `avgCritMult` is aliased not re-derived (`ttk.ts:185`). Some
  near-duplication of the elemental-combine + accumulate pattern between
  `calculator.ts` and `ability-ttk.ts`'s `abilityToPseudoWeaponStats` (both build a
  `CalculatedStats` by hand — ~80 field literal in each).
- **Global mutable state**: `overrides/data-overrides.ts` module-level
  `let overrideCache: DataOverride[] = []` (in the calc closure). It's the only mutable
  singleton on the path; `setOverrideCache` is called from the app. An engine reused in
  a server/multi-tenant context would share this across requests.
- **`@deprecated` still shipping**: `calculator.ts:80 DIRECT_ELEMENT_MOD_STATS`,
  `ttk.ts:185 avgCritMult`.
- **`@ts-nocheck`/lint escapes in `src/data`**: `mods.ts` etc. are huge literals —
  `skipLibCheck: true` globally; no evidence of `@ts-nocheck`, but a 22k-LOC literal
  strains the type checker (`tsconfig` `incremental: true`).
- **Approximation markers on the calc path**: 5 explicit
  (`combat-multipliers.ts:90/92` stance "not full combo-string simulation";
  `riven-calculator.ts:1/49` "heuristic" / "approximate community tables";
  `arcane-proc-model.ts:209` "simplified").

### Inferences

- **The engine is unusually disciplined for a hobby project** (confidence: high):
  strict types, no `any`, wiki-cited formulas, pure calc layer, layered `src/lib`
  domains, a written accuracy checklist. The debt is *concentrated* (a few god
  functions, hardcoded game constants) rather than pervasive.
- The `if (id === "…")` ladders in `arcane-handlers.ts` and the per-weapon special-cases
  in `incarnon-active-weapon.ts` / `SimulationParams` (30+ one-off sliders like
  `arbucepAttackMode`, `onosIncarnonMode`, `shardFullyGrownHosts`) will keep growing
  one weapon at a time — inherent to modelling Warframe, but it makes the surface
  ever-wider (confidence: high).

### Unknowns

- Whether `calculateWeaponBuild`'s size hides correctness bugs — the goldens say the
  outputs are right for tested builds; untested combinations are unknowable from here.
- Real TS typecheck time / memory for the full `src/data` (didn't run `tsc`).

### Risks

- **Game-constant drift**: every DE balance patch can invalidate `2700`, the scaling
  coefficients, `ENEMY_TYPES`, and the modifier tables. There is no single file to
  patch and no "constants last verified" gate.
- **Refactoring `calculator.ts` / `arcane-handlers.ts` is high-risk** — huge functions,
  and the safety net for the risky bits (TTK sim, arcanes) is thin (§6).
- **`overrideCache` singleton** is a correctness hazard if the engine is ever run
  server-side for multiple users/patched datasets concurrently.
- The `SimulationParams` "kitchen sink" (60+ fields, many per-weapon) is a compatibility
  liability: any consumer/AI tool must know which knobs matter for which build.

---

## 8. AGPL / licensing — factual picture

### Verified facts (documents, quoted minimally)

- **`LICENSE`** (full text, 6 lines): "This project is licensed under the GNU Affero
  General Public License v3.0 (AGPL-3.0)." … "Copyright (c) 2026 StepTwo33 (Jason) and
  the upstream project contributors." … **"Previous versions were under MIT; new contributions and
  this license change apply going forward."**
- **`package.json`**: `"name": "upstream-project"`, `"version": "0.1.0"`,
  `"description": "Open-source Warframe build planner (the upstream project)"`,
  **`"license": "MIT"`**, `"repository.url": "https://github.com/StepTwo33/the upstream project.git"`.
  → Direct contradiction with `LICENSE`.
- **`README.md`**: "# the upstream project", "Open-source verification source for
  [the-upstream-project.example]", **"This repository is not intended for self-hosting."**, "## License
  … GNU Affero General Public License v3.0 (AGPLv3) … This change provides stronger
  copyleft protection for the web application (if you modify and host it, you must share
  your changes)." Fan-project disclaimer re: Digital Extremes trademarks.
- **`CONTRIBUTING.md`**: "Thanks for helping with the upstream project." — no CLA, no
  copyright-assignment clause. "Issues and pull requests are welcome."
- **`SECURITY.md`**: email `support@the-upstream-project.example`; nothing licensing-related.
- **Git remote**: `https://github.com/StepTwo33/the upstream engine.git` (repo renamed from
  the upstream project). **The vendored clone is a single squashed commit** `e66896a`
  (`git rev-list --count HEAD` = **1**). There is **no history** to locate the
  MIT→AGPL commit, the rename commit, or their dates. `git log --grep` for
  license/AGPL/MIT/rename → nothing.
- **Per-file license headers in `src/lib`**: **none.** No SPDX identifiers, no
  copyright headers in any `src/lib/**` or `src/data/**` file I read. Files carry
  descriptive comments only (e.g. `calculator.ts:1` "ported from Dart…").
- **Pre-AGPL provenance signals in-tree**: `calculator.ts:1` "Advanced Build Calculator
  - ported from Dart"; `data/incarnon.ts` "Converted from
  `lib/data/incarnon_data_complete.dart`"; `data/custom-items.ts` "auto-converted Dart
  data … merged into … the Dart source". So a substantial part of the current code and
  data is a **port of an earlier Dart codebase** whose own licence is not stated here.
- **Third-party code in the engine**: none bundled. The calc closure has zero npm deps;
  `@wfcd/items` (MIT) is used only in the walled-off arsenal feature.
- **Game data**: README's own disclaimer treats Warframe stats as "used for
  informational purposes under community fan-site conventions" — i.e. DE-owned game
  facts, not the maintainer's to relicense.

### Inferences (labelled; NOT legal advice)

- **The MIT→AGPL switch was a unilateral maintainer relicense of an existing MIT
  codebase** (confidence: high, from `LICENSE` wording + no CLA in `CONTRIBUTING.md`).
  "Previous versions were under MIT" means: anyone who obtained a pre-switch version
  received it under MIT, and — absent CLA/assignment — outside contributions merged
  while the project was MIT remain available under MIT from those snapshots. The
  maintainer can relicense their *own* work but cannot retroactively remove the MIT
  grant already made on prior versions. Whether *this specific tree* (`e66896a`) is
  cleanly AGPL depends on whether every non-maintainer contribution after the switch
  was made under AGPL — **not verifiable from a 1-commit clone**.
- **`package.json "license": "MIT"` is almost certainly a stale field the relicense
  missed** (confidence: high) — `LICENSE` + `README` both say AGPL explicitly and
  recently. But it is a published, machine-read contradiction: tooling (npm, SBOM
  scanners, `license-checker`) will report this project as MIT. A downstream consumer
  acting in good faith on `package.json` has a colourable argument they received it as
  MIT.
- **For an open-source hosted product now**: AGPL-3.0 §13 means if Cephalon incorporates
  this code and offers it over a network, Cephalon must offer users the **complete
  corresponding source** of the whole combined work under AGPL-3.0 (confidence: high —
  this is the plain text of AGPL). "Framework-agnostic engine package" doesn't change
  that: linking AGPL code into a larger service makes the service's source an AGPL
  obligation.
- **For a closed commercial product later**: incompatible with AGPL unless (a) every
  copyright holder in the tree agrees to a separate commercial licence (the maintainer
  can grant one for their own portions; the Dart-origin author and any post-switch
  contributors would also need to agree), or (b) the AGPL portions are removed/rewritten.
  The **pre-switch MIT snapshot is the escape hatch**: code that existed in the last MIT
  commit can be used under MIT terms (attribution only, no copyleft) — but identifying
  exactly which lines of today's tree are unchanged-since-MIT requires the git history
  that this clone doesn't contain.
- **Data vs code**: the ~66k LOC of `src/data` is largely DE-owned game facts arranged
  by the maintainer. The *arrangement/selection* may attract thin copyright (AGPL as
  applied by the maintainer); the underlying numbers are not the maintainer's IP. A
  clean-room re-derivation from the wiki + `@wfcd/items` is possible in principle.

### Unknowns

- Date of the MIT→AGPL change; date of the project rename — **not in this
  clone** (1 squashed commit). Need the real upstream history or the maintainer.
- Whether any post-AGPL-switch commits contain third-party contributions not made under
  AGPL.
- The licence of the original Dart project the calculator/data were ported from.
- Whether the maintainer would grant Cephalon a commercial licence.

### Risks

- Building Cephalon on this tree as-is **couples Cephalon's server-side source to
  AGPL-3.0 §13 disclosure** for as long as any of this code is in the running service.
- The `package.json` MIT vs `LICENSE` AGPL contradiction is a landmine either way: rely
  on MIT and you may be wrong; rely on AGPL and you may be over-restricting code that
  was actually MIT.
- "We'll go closed-source commercial later" is **not a clean pivot** from an AGPL base
  without either a commercial grant from all rights holders or a rewrite — and the
  people who'd need to agree include parties not identifiable from this clone.
- No CLA means the maintainer themselves may not have the rights to relicense the whole
  current tree commercially.
- Relying on "port from MIT Dart code" needs the Dart repo's actual licence file — an
  unverified claim in a code comment is not a licence.

---

## 9. External APIs / data dependencies

### Verified facts

**`.env.example`** (summarised) — every key is optional for `npm test`; app needs
a maintainer flag + DB to run:
- `DATABASE_URL` (SQLite `file:./dev.db`), `AUTH_SECRET`, `AUTH_URL`,
  `NEXT_PUBLIC_APP_URL` — core app / next-auth.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth (optional).
- `RESEND_API_KEY` + `EMAIL_FROM_SUPPORT` / `EMAIL_FROM_NEWSLETTER` — Resend
  transactional email (verification, newsletter). Optional.
- `AUTH_ADMIN_EMAILS`, `BMC_WEBHOOK_SECRET` (Buy Me a Coffee supporter webhook),
  `TRUSTED_HOSTS`, `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`.
- `TWITCH_ARSENAL_CHANNEL_ID` / `WARFRAME_ARSENAL_JWT` — Player Sync via the official
  Warframe Twitch extension.
- `DISCORD_BOT_TOKEN` / `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` /
  `BOT_WORLDSTATE_POLL_MS` — Discord bot.

**External services actually contacted at runtime** (all server-side; grep of
`fetch(` + URL constants in `src/lib/**`, `bot/**`):

| Service | Where | Build- or run-time | Touches calc path? |
|---|---|---|---|
| `api.warframestat.us` (WFCD worldstate) | `src/lib/bot/worldstate-client.ts:12` `BASE`; polled by Discord bot | runtime (bot only) | **No** — bot feature |
| `api.warframe.com` / `content-{ps4,xb1,swi}.warframe.com` `/dynamic/twitch/getActiveLoadout.php` | `src/lib/warframe-arsenal/platforms.ts:15-18` | runtime (Player Sync import) | **No** — import feature; feeds catalog-match, not the engine |
| `gql.twitch.tv/gql` | `src/lib/warframe-arsenal/twitch-auth.ts:39` | runtime (Player Sync auth) | No |
| `discord.com/api/v10` (OAuth, guilds, channels, messages) | `src/lib/bot/discord-oauth.ts` | runtime (bot dashboard) | No |
| `cdn.discordapp.com` | `discord-link-service.ts`, `discord-oauth.ts` | runtime (icons) | No |
| `accounts.google.com` / `oauth2.googleapis.com` / `www.googleapis.com/oauth2/v2/userinfo` | `src/lib/auth/auth.ts:306,313,328` | runtime (sign-in) | No |
| Resend API | `src/lib/auth/email.ts` (+ `resend` pkg) | runtime (email) | No |
| Buy Me a Coffee | `src/app/api/webhooks/buymeacoffee/route.ts` | runtime (inbound webhook) | No |
| `wiki.warframe.com` / `warframe.fandom.com` / `api.warframestat.us/weapons` | `scripts/*` (e.g. `_sync_riven_dispositions.mjs:24`) | **build/dev-time only**, maintainer-run, output committed to `src/data` | Indirectly (produces catalog data) |
| `tessdata.projectnaptha.com`, `cdn.jsdelivr.net`, `unpkg.com` | `tesseract.js` OCR in `src/components/build-importer.tsx:141` + `src/proxy.ts` CSP allowlist | runtime (client OCR for screenshot mod import) | No |

- **App-internal**: every `fetch(` in `src/app/**` targets a relative `/api/*` route
  (verified — no external hosts in app components).
- **The calculation path makes zero network calls** at any time. Riven dispositions,
  ability-scaling rules, mod behaviors, radial attacks — all pre-baked into `src/data`
  by offline scripts.
- `next.config.ts` `images.remotePatterns` only allows `lh3-6.googleusercontent.com`
  (Google avatar images).

### Inferences

- **None of the external dependencies are on the engine's critical path** (confidence:
  very high). warframestat.us and api.warframe.com are peripheral-feature deps
  (bot, arsenal import). Cephalon could adopt the engine and ignore all of §9 except
  the offline data-sync scripts (confidence: high).

### Unknowns

- ToS / rate-limit posture of `api.warframestat.us` and `api.warframe.com` — not
  documented in-repo beyond a polite `User-Agent: "the upstream project-Bot/0.1
  (https://the-upstream-project.example)"` (`worldstate-client.ts:300`) and a default 60 s poll.
- Whether the Warframe Twitch-extension arsenal endpoint is an officially sanctioned
  integration (it uses a real extension JWT — `platforms.ts` comments imply it is).
- Legality/ToS of the wiki scraping in `scripts/` (Fandom + wiki.warframe.com).

### Risks

- If Cephalon later wants **live** worldstate or **live** player-arsenal data on the
  calc path, it inherits warframestat.us / DE endpoint availability, ToS, and
  rate-limit risk that the current engine deliberately avoids by pre-baking.
- The catalog-refresh pipeline depends on wiki HTML structure + `api.warframestat.us`
  staying stable; both are third-party and unversioned.
- `tesseract.js` pulls WASM/traineddata from CDNs (`tessdata.projectnaptha.com`,
  jsdelivr, unpkg) — a supply-chain surface, but confined to the optional
  screenshot-import UI, not the engine.

---

## Appendix — quick-reference

- **Engine location**: `vendor/upstream-engine/src/lib/calc/` (+ `src/data/`, `src/lib/types.ts`,
  and 14 helper files under `codex/ mods/ display/ overrides/ weapons/`).
- **Closure**: 89 files, 0 npm deps, 0 React/Next/Prisma/fetch. Script used:
  `scratchpad/closure.mjs`.
- **`lib` ⇄ `data` coupling** (§4): 75 `src/lib`→`@/data` import statements +
  35 `src/data`→`@/lib` (25 `codex/item-behavior-types`, 9 `types`, 1
  `mods/set-mod-catalog`; all 3 pure leaves). Ship engine as **one** package
  (`lib`+`data`+`types`); a separate one-way `data` package needs those 3 files moved.
- **Entry points**: `calculateWeaponBuild`, `calculateWeaponBuildWithArcanes`,
  `calculateWarframeBuild`, `applyWarframeShardsAndArcanes`, `calculateTTK`,
  `simulateDiscreteTTK`, `runDamageSim`, `calculateCompanionBuild`,
  `calculateArchwingBuild`, `calculateNecramechBuild`, `calculateRailjackBuild`,
  `evaluateRiven`, `resolveIncarnonActiveWeapon`, `buildAbilityTTKEntries`,
  `computeDpsContributions`.
- **Tests**: `npx vitest run` → 47 files / 1898 tests / 0 fail / ~17 s. ~94%
  calculation-focused. Inline fixtures. Portable with the engine (needs only `@`→`src`
  alias).
- **Licence**: `LICENSE` = AGPL-3.0 "going forward" (prev MIT); `package.json` =
  `"MIT"` (stale/contradictory); repo renamed the upstream project→the upstream engine; clone is 1 squashed
  commit so **no history** for the relicense/rename dates; no per-file headers; calc +
  data are a port of an earlier **Dart** project of unstated licence.
