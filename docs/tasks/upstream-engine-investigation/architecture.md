# Cephalon — Architecture (upstream-engine investigation & Phase 1 plan)

_Deliverable of the `upstream-engine-investigation` task. This is the executive
synthesis; the exhaustive evidence lives in [`investigation.md`](investigation.md)
(Argus, §§1–9, heavy file:line citation) and [`plan.md`](plan.md) (Athena,
Parts A–I). Where this doc summarises, those are authoritative on detail._

Status: Part A decisions **approved by the user 2026-08-30**
([`../../agent/decisions.md`](../../agent/decisions.md)); Themis re-reviewed the
revised plan and found no remaining must-fix
([`review.md`](review.md) → "Re-review (revision 2)"). Phase 1a task 1 starts
after milestone-1a approval.

The upstream engine is referred to only as "the upstream engine" here; its
identity, repository URL, pinned revision, and licensing facts are recorded once
internally in [`../../agent/upstream-engine.md`](../../agent/upstream-engine.md)
and must not appear in any user-facing surface.

---

## 1. Current upstream architecture

A Next.js 16 / React 19 / TypeScript app with a Discord bot, Prisma 7 +
better-sqlite3, next-auth v5, Vitest 3. Layout (`vendor/upstream-engine/`):

| Path | Files | Role |
|---|---:|---|
| `src/lib/calc/` | 70 (35 non-test) | **the calculation engine** (~18k LOC) |
| `src/data/` | 49 | static game catalogs as committed `.ts` (~66k LOC) |
| `src/lib/{builds,mods,weapons,overrides,codex,display,…}/` | ~130 | domain support: build orchestration, mod-behavior registry, weapon enrichment, runtime data-overrides, codex helpers, UI formatting |
| `src/app/` | 102 | Next App Router — 40 routes + 39 `api/*/route.ts` |
| `src/components/` | 76 (67 `"use client"`) | UI |
| `src/lib/{auth,site,bot,warframe-arsenal}/`, `prisma/`, `bot/` | — | accounts, Discord, player-arsenal import — **not reused by Cephalon** |
| `docs/ARCHITECTURE.md`, `docs/ACCURACY_CHECKLIST.md` | — | in-repo maps of the calc stack and its accuracy tiers; spot-checked accurate |

The calc code is a port of an earlier **Dart** app (`calc/calculator.ts:1` and
data-file headers). Detail: [`investigation.md`](investigation.md) §1.

---

## 2. The calculation engine and what it covers

**Location:** `src/lib/calc/`. Plain exported functions, no classes/DI/config
object. **Public entry points** (preserved verbatim by Cephalon — see §11):

`calculateWeaponBuild`, `calculateWeaponBuildWithArcanes`,
`calculateWarframeBuild`, `applyWarframeShardsAndArcanes` (`calculator.ts`);
`calculateTTK`, `simulateDiscreteTTK` (`ttk.ts`); `runDamageSim`
(`damage-sim.ts`); `calculateCompanionBuild`, `calculateArchwingBuild`,
`calculateNecramechBuild`, `calculateRailjackBuild`; `evaluateRiven` +
`getRivenGrade` + `getStatsWithDisposition` (`riven-calculator.ts`);
`resolveIncarnonActiveWeapon` + `applyIncarnonFormToWeapon`;
`buildAbilityTTKEntries` + `calculateAbilityTTK`; `computeDpsContributions`;
`mergeIncarnonStatChanges` / `mergeRivenStatChanges`; pure override helpers.

I/O types in `src/lib/types.ts` (1,308 LOC, zero `any`): `Weapon`, `Mod`,
`Warframe`, `ModSlot`, `SimulationParams` (+ `DEFAULT_SIM_PARAMS`, ~60 fields),
`CalculatedStats` (~280 fields), `WarframeCalculatedStats`, `EnemyType`,
`TTKResult`, etc.

**Determinism: total.** No `Math.random` / `Date.now` / I/O on the calc path
(`investigation.md` §2). `simulateDiscreteTTK` is a fixed 0.25 s step loop;
status procs use expected value (`SC × multishot`), not RNG.

**Coverage** (full table: [`investigation.md`](investigation.md) §2):

- **Solid / test-locked:** base damage & IPS, quantization, elemental
  combination + mod ordering, crit tiers (incl. orange/red/beyond), multishot,
  beam/charge/bow timing, enemy armor/health/shield scaling + armor DR,
  corrosive/heat/puncture armor strip, viral, DoT (Slash/Heat/Toxin/Electric/
  Gas), faction (Bane/Expel) multipliers, Gun CO / Galvanized / Blood Rush /
  Weeping Wounds, set bonuses, exalted weapons, Incarnon forms/evolutions
  (deepest-tested), Rivens (**grading only**), companion/archwing/necramech/
  railjack builds, mod capacity/polarity/forma.
- **Approximate (self-labelled):** `simulateDiscreteTTK` (EV status, not a
  distribution), stance/melee DPS ("not full combo-string simulation"),
  radial/explosion (flat average, no distance falloff), Warframe ability damage
  (linear `damage × strength`, "sparse"), riven grade (heuristic).
- **Not modeled:** **Steel Path** (no scaling multipliers — only raw enemy
  level), Archon Shard offensive effects (Violet ability-damage, Topaz on-kill,
  Emerald toxin/corrosion are `break;` no-ops), magnetic stacks / shield-gating
  / overguard / eximus, enemy roster beyond 19 hardcoded archetypes (no liches,
  Murmur, Narmer, Zariman, bosses).

Steel Path is being added in Phase 1 under the calc-formula gate (§12 task 11).

---

## 3. Where game data comes from

All catalog data is **committed static TypeScript** under `src/data/*.ts`
(`allWeapons`, `allMods`, `allWarframes`, …). No DB table holds game data; the
calc path makes **zero network calls ever**. `@wfcd/items` /
`@wfcd/arsenal-parser` are used **only** in the player-arsenal import feature
(`src/lib/warframe-arsenal/`), not by the engine or `src/data/`.

Runtime transforms are pure: `weapons/effective-data.ts` merges staff
"data-fix" overrides + runs `weapon-enrich.ts`. Catalog maintenance is a
maintainer-run **offline** `scripts/` pipeline (Python + `.mjs`) that scrapes
`wiki.warframe.com` / `warframe.fandom.com` / `api.warframestat.us` and writes
into `src/data/`; `scripts/README.md` calls it "scratch" — **not a reproducible
build**. Largest files: `mods.ts` 22,239 LOC, `weapons.ts` 15,531,
`warframes.ts` 8,676. Detail: [`investigation.md`](investigation.md) §3.

**Risk:** the catalog is the product's moat *and* a continuous
maintenance liability — ~66k LOC of hand/scripted numbers that DE patches every
few weeks, with no automated "still correct after patch X" gate beyond
hand-entered goldens.

---

## 4. UI coupling

**The engine is a leaf.** `src/lib/calc/` never imports `src/app/` or
`src/components/`; UI and `builds/build-stats.ts` / `loadout-stats.ts` call
*into* it. A scripted transitive-import closure from 18 entry points =
**89 files, 0 npm packages, 0 React/Next/Prisma/next-auth/@wfcd/`fetch`/
`process.env`** ([`investigation.md`](investigation.md) §2, §4).

Three coupling blemishes, all fixable structurally (§11, §12 task 5):

1. `overrides/data-overrides.ts` (in the closure) has a module-level
   `let overrideCache` and a `typeof window` reference.
2. `getOverrides()` is read implicitly as a **default parameter** on the
   override helpers and 16× across the 8 `effective-data.ts` accessors; the
   orchestration files call `getEffective*()` ~20× with no args relying on the
   ambient singleton. (Themis M3 corrected Argus's original "one file" scope.)
3. `builds/build-stats.ts` / `loadout-stats.ts` import `build-storage.ts`
   (`localStorage`) for three pure resolvers, and the misfiled-but-pure
   `warframe-arsenal/riven-resolve.ts`.

`src/data/**` is **not** a clean leaf: it imports `@/lib/codex/item-behavior-types`
(25×, all `mod-behaviors/batches/*`) and `@/lib/mods/set-mod-catalog` (1×) in
addition to `@/lib/types` (9×), while `src/lib/**` imports `@/data/*` 75× — so
`lib` and `data` are **bidirectionally coupled at directory level** and cannot
be split into two one-way packages as-is ([`investigation.md`](investigation.md)
§4 corrected; Themis M2). The file-level graph is still a DAG.
`reactCompiler: true` never touches engine code (no JSX / React import anywhere
in the closure).

---

## 5. Reusable systems / extraction candidates

**KEEP + WRAP wholesale** — the 89-file closure (`calc/` + `src/data/` +
`types.ts` + 14 support helpers under `codex/ display/ mods/ overrides/
weapons/`), plus the 47-file / 1898-test suite. It ships as **one
`packages/engine` package** (see §11 / decision). The 3 pure files that cause
the `lib`⇄`data` cycle (`item-behavior-types.ts` — zero imports,
`set-mod-catalog.ts`, `types.ts`) can move to a data-side package **later** as a
~1-commit mechanical change; not Phase 1.

**REFACTOR (structural, no formula change)** — the override de-singleton +
orchestration lift (§12 task 5).

**DO NOT IMPORT** — `src/app`, `src/components`, `prisma/`,
`src/lib/{auth,bot,site,warframe-arsenal}`, `bot/`, `@wfcd/*`. Cephalon builds
these native in `apps/web`.

**DEFER (later, gated)** — god-file decomposition (`calculator.ts` 2,227 LOC,
`arcane-handlers.ts` 2,080 LOC), a dated `game-constants.ts` extraction, and
gap-filling (ability damage, Archon offensive shards, radial falloff,
magnetic/overguard, expanded enemy roster). Full keep/wrap/defer table:
[`plan.md`](plan.md) Part F.

---

## 6. Test suite assessment

`npx vitest run` → **47 files / 1898 tests / 0 failures / ~17 s**, `node` env,
no setup file, no mocks, inline literal fixtures only, ~94 % calculation-focused.
Imports only `vitest` + `@/lib/*` / `@/data/*` — **lifts into the package
unchanged** (needs only the `@` alias in the package's `vitest.config.ts`).

It is a **regression lock authored bottom-up from the wiki, not a spec** — it
asserts "this build → this number" for thousands of concrete cases; it does not
prove the model is conceptually complete, and a systematic wiki-transcription
error would be locked in as "correct". **Thin spots:** `simulateDiscreteTTK`
(~9 assertions for 415 LOC), riven grader (7), arcane handlers (7 direct for
2,080 LOC), companions; **no test** for Steel Path (doesn't exist yet) or
ability crit/status through the pseudo-weapon path. Detail:
[`investigation.md`](investigation.md) §6.

Cephalon's testing strategy is §12.

---

## 7. Technical debt / risky architecture

Concentrated, not pervasive (type quality is high — `strict`, ~1 `any` in the
whole calc dir). The real risks:

- **God files:** `calc/calculator.ts` (2,227 LOC; `calculateWeaponBuild` alone
  ~1,100 LOC), `calc/arcane-handlers.ts` (2,080 LOC of `if (id === …)`
  ladders), `codex/ability-scaling-registry.ts` (1,660), test file
  `phase5-9-audit.test.ts` (6,066). Refactoring the risky bits (TTK sim,
  arcanes) has a thin safety net.
- **Hardcoded game constants** scattered across `ttk.ts` / `calculator.ts` /
  `combat-multipliers.ts` (armor soft-cap `2700`, S-curve coefficients,
  `ENEMY_TYPES`, damage-type modifier tables) — no dated "constants last
  verified" module; every DE balance patch is silent drift.
- **`overrideCache` module singleton** — a correctness hazard for server-side
  multi-user use (fixed in Phase 1 task 5).
- **`SimulationParams` kitchen sink** — 60+ fields, many per-weapon one-offs; a
  wide, ever-growing compatibility surface.
- **Catalog `scripts/` pipeline is "scratch"** — re-deriving the catalog is not
  a supported operation.

Detail: [`investigation.md`](investigation.md) §7.

---

## 8. Licensing (not legal advice)

Facts ([`investigation.md`](investigation.md) §8;
[`../../agent/upstream-engine.md`](../../agent/upstream-engine.md) → History):
`LICENSE` = **AGPL-3.0** "going forward; previous versions were MIT";
`package.json` still declares `"license": "MIT"` (a published, machine-read
contradiction — SBOM / `license-checker` will report the upstream as MIT); no
CLA; no per-file headers; calc + data are a port of an earlier **Dart** project
of **unstated** license.

**History recovered** (the "unrecoverable" premise was an artifact of the
`--depth 1` vendor clone; a full-history reference clone now exists, 438
commits 2026-02-15 → 2026-07-25): **single copyright holder** — every commit is
one person (the sole author, four aliases), **no third-party
contributors**, so the missing CLA is moot. MIT→AGPL switch is commit `ffd82e9`,
**2026-07-16** (LICENSE-only; `package.json` "MIT" simply never updated —
confirmed stale). Our pinned rev `e66896a` (2026-07-25) is **post-switch**; the
`src/lib/calc/` engine has **no MIT-era version** in this repo, so the calc code
is AGPL-only. ~48 `src/data/**` files do have a 2026-07-13 MIT snapshot but with
heavy post-switch work since. The maintainer's email is active; **per user
decision no outreach is pursued** ("unreachable" is a project choice, not a
fact).

**AGPL §13** attaches to any Cephalon service that links this code: while the
project is open-source, the complete corresponding source of the combined work
must be offered to users under AGPL-3.0. A **closed-source / commercial pivot is
still not a clean step** — but the recovered history narrows it: there is **one
identifiable rights holder** (a clean commercial/dual license *if* the
maintainer were engaged, which the project has chosen not to pursue). The
residual unknown is the **Dart-origin project's license** (probably self,
unverified). Absent that, the pivot route is removal/rewrite of the AGPL
portions — and the calc engine has no MIT-era fallback.

**Decision (user-approved 2026-08-30):** build on the upstream engine **now
under full AGPL-3.0**; keep only the legally required `LICENSE` + a `NOTICE`
(seeded from `upstream-engine.md`) in `packages/engine`; **the upstream name
appears nowhere user-facing and only in `docs/agent/upstream-engine.md`
internally**; **no maintainer-outreach track**; **treat the code as AGPL**
despite the stale `package.json` and state in this section + `NOTICE` that
automated scans will misreport it. The engine is kept behind a hard
`packages/engine` boundary and the golden-baseline corpus (§12) is built to
double as a clean-room-rewrite spec, so a future pivot is a package swap. **A
qualified open-source licensing professional must review before any commercial
or closed-source pivot** — this documents the risk, it does not clear it.

---

## 9. External APIs / data dependencies

**None on the engine's critical path.** All external calls are server-side and
peripheral: `api.warframestat.us` (Discord bot), `api.warframe.com` +
`gql.twitch.tv` (player-arsenal import), Google OAuth, Resend (email), Discord,
Buy-Me-a-Coffee webhook; wiki + `api.warframestat.us` scraping is **build-time
only**, maintainer-run, output committed. `tesseract.js` pulls WASM/traineddata
from CDNs for the optional screenshot mod-importer. Detail:
[`investigation.md`](investigation.md) §9.

Cephalon adopts the engine and ignores all of this except the offline
data-sync scripts, whose cadence it must own (§12 task 6). Any future
live-worldstate or live-arsenal data **on the calc path** is an
architecture-gate decision.

---

## 10. Keep / refactor / rewrite / delete

See [`plan.md`](plan.md) **Part F** for the full per-subsystem table. Summary:

| Verdict | What |
|---|---|
| **KEEP verbatim + WRAP** | all of `calc/` (weapon/warframe/TTK/crit/combat-mult/fire-rate/melee-combo/elemental/arcanes/rivens/incarnon/set-bonuses/companion/archwing/railjack/ability-TTK/dps-contributions), all of `src/data/**`, all 1898 tests |
| **REFACTOR (structural, no formula change)** | `overrides/data-overrides.ts` + `effective-data.ts` (8 accessors) + `arcane-effect-overrides.ts` de-singleton; lift `build-stats.ts` / `loadout-stats.ts` into engine `orchestration/` taking catalogs as params; move `riven-resolve.ts` into `support/` — **one merged task** |
| **ADD (Phase 1, calc-formula gate)** | Steel Path scaling as an opt-in `sp` input |
| **DEFER (later, each gated)** | god-file decomposition; `game-constants.ts`; ability-damage / Archon-offensive-shard / radial-falloff / magnetic-overguard / enemy-roster gap-filling; the `engine` / `warframe-data` package split |
| **DO NOT IMPORT** | upstream `src/app`, `src/components`, `prisma/`, `auth/`, `bot/`, `site/`, `warframe-arsenal/`, `@wfcd/*` |

---

## 11. Proposed Cephalon architecture

Full component table + data-flow traces: [`plan.md`](plan.md) Parts B, C, C2, D.

### Layers

```
UI  — apps/web (Next.js App Router, React 19, Cephalon design system)
        renders view-models only; shows Verified / Approximation / Not-modeled badges
  ↓ view-models (numbers + confidence tags), never raw engine types
Application Services — apps/web/src/server/services
        CatalogService · BuildService · SimulationService · ComparisonService
        · ConfidenceService · PlayerContextService(stub)
        owns: SimulationParams assembly · OverrideSet application · confidence
        tagging · caching · orchestration wrapping
  ↓ pure sync calls          ↓ server-only            ↓ server-only
@cephalon/engine (AGPL)   Player Context           External-data wrappers    AI tool layer (Phase 2+)
  packages/engine:          (Supabase Postgres:      (server-only fetch +      function-call defs →
  calc/ + data/ +           accounts, builds,        cache + rate-limit:       call Services only.
  types.ts + support/ +     loadouts, inventory,     warframe.market,          NEVER computes
  orchestration/ + tests    RLS)                     worldstate, wiki, DE)     Warframe math.
  NO react/next/prisma/
  net/env/DOM/mutable state
```

Dependency rule: arrows point **inward/down only**. Services depend on the
`@cephalon/engine` barrel; the AI tool layer depends on **Services**, never the
engine directly.

### Packaging (decision — approved)

**pnpm workspace monorepo.** The engine ships as **ONE `packages/engine`
package** — `calc/` + `data/` (~66k LOC catalog, incl. `enrichWeapon` +
`effective-data.ts`) + `types.ts` + `support/` + `orchestration/` + the ported
Vitest suite. Contained `@` alias → `packages/engine/src`; **no Phase-1
codemod** (one tree, every `@/lib/*` and `@/data/*` specifier resolves).
Consumers use the alias-free barrel `@cephalon/engine`. The `lib`⇄`data`
directory coupling makes a two-package split unbuildable as-is; the
code/catalog separation (DE-owned facts vs AGPL calc surface) is a **documented
future task** with a costed recipe (move 2–3 pure files, re-point 26 importers,
scoped `@/data/*` codemod over ~75 non-test + ~81 test statements), triggered by
a concrete commercial-pivot plan or a second catalog consumer.

**Build step (R2):** `apps/web` either adds `packages/engine/src` to its own
`@` path-mapping + `transpilePackages: ['@cephalon/engine']` (one consumer), or
`packages/engine` builds with `tsup` / `tsc + tsc-alias` to a relative-path
`dist/` (second consumer / publish). Decided in task 1. Not a source change.

### Engine boundary — MUST NOT contain

React, Next, `@prisma/*`, `next-auth`, `@wfcd/*`, `warframe-worldstate-data`,
`tesseract.js`; any `fetch` / network; any `process.env`; any
`window`/`document`/`localStorage`; any mutable module-level state; any JSX.
Enforced by a **CI grep import-guard** over `packages/engine/src`
(Argus §2 confirms this already holds except the two `data-overrides.ts`
blemishes, cleared by task 5).

### Public API surface

Two labelled export groups from the barrel:
1. **Calculation** — the ~15 preserved entry points from §2 + the I/O types.
   Consumed by `BuildService` / `SimulationService` / `ComparisonService`,
   which receive **already-assembled** catalogs.
2. **Catalog assembly (R1)** — the catalog loaders + `enrichWeapon` + the
   post-refactor `getEffective*(…, overrideSet)` accessors + the `OverrideSet`
   type. Consumed **only by `CatalogService`**. Task 4 AC checks nothing else
   imports this group.

Everything else in `packages/engine/src/**` is internal.

### Coupling-blemish resolution (Themis M3/M4)

Task 5 (one pass over the ~5 files / ~40 call sites): delete `overrideCache` +
all `window` / client-import code + the `= getOverrides()` default params;
`apply*Overrides` / `getEffective*` take a **required** explicit `OverrideSet`;
`effective-data.ts` **stays in `packages/engine`** next to the data; lift
`build-stats.ts` / `loadout-stats.ts` into `orchestration/` **refactored to
receive catalogs as parameters**. `CatalogService` owns the OverrideSet
lifecycle and does load → apply → enrich → hand explicit `Weapon[]` / `Map` to
`calculate*`. AC: `engine-regression` 1898/1898 **plus** a typecheck proving no
zero-arg `getEffective*` / `getOverrides` remains in `packages/engine/src`, plus
a concurrency test.

### Confidence model (M6 — definition is load-bearing)

`ConfidenceService` owns a single table tagging every surfaced stat
**Verified / Approximation / Not-modeled**.

> **Verified** = *a deterministic formula, covered by the ported upstream-engine
> regression suite, whose formula source is cited to the Warframe wiki.* It does
> **NOT** mean "independently confirmed against current live-game values". A wiki
> transcription error, or post-patch drift, would still present as Verified. The
> badge asserts *internal determinism + test coverage + a cited source*, not
> ground truth. (Fallback label if UX review finds "Verified" too strong:
> "Regression-locked" / "Deterministic".)

> **Approximation** = the engine models this with a self-documented
> simplification. **Not modeled** = no model; output absent or raw passthrough.

Tag map (from Argus §2): Verified — base/IPS/quantization, elemental combos +
ordering, crit tiers, multishot/beam/charge, enemy scaling + armor strip +
viral + DoT, faction multipliers, Gun CO / Galvanized / BR / WW, Incarnon, set
bonuses, exalted, railjack. Approximation — `simulateDiscreteTTK`, stance/melee
DPS, radial/explosion, ability damage, riven grade. Approximation → not-an-input
— **armor-strip %** (proc-derived only, no toggle), **headshot %**
(`applyHeadshots` is boolean), **status uptime** (`statusTypesOnTarget` is a
0–5 count) — S1. Not modeled — Archon offensive shards, magnetic/shield-gate/
overguard/eximus, enemy roster beyond 19. **Steel Path** — "Approximation —
pending verification" until task 11 lands, **Verified** after.
Snapshot-tested; a surfaced stat with no tag fails CI.

### Data-flow traces

Full step-by-step in [`plan.md`](plan.md) Part D. In short:
- **Weapon builder mod toggle:** UI → `BuildService.calculateWeapon` →
  `CatalogService` (enriched `Weapon` + `Map`, overrides pre-applied) →
  `BuildService` assembles `SimulationParams` → `calculateWeaponBuildWithArcanes`
  (pure, sync) + `computeDpsContributions` → `SimulationService.calculateTTK`
  → `ConfidenceService.tag` → view-model → UI animates the delta.
- **AI "Primed Bane of Grineer?":** UI → AI model calls tool
  `compare_mod_swap` → AI tool layer → `ComparisonService.compareModSwap` →
  runs `BuildService` for both variants against `targetFaction: grineer` →
  diffs `CalculatedStats` / `TTKResult`, annotates faction-gating → `Confidence`
  tags (faction multiplier = Verified, TTK = Approximation) → structured
  `BuildDiff` back to the model → model composes prose **from the numbers**. The
  AI computes nothing.

---

## 12. Testing strategy & Phase 1 breakdown

### Testing (full: [`plan.md`](plan.md) Part E)

1. **Regression lock** — all 47 test files + `*-goldens.ts` move into
   `packages/engine` unchanged; CI job `engine-regression` gates merges at
   **47 files / 1898 tests / 0 failures / 0 skips**.
2. **Calc-formula gate in practice** — CI path-filter: any PR touching
   `packages/engine/src/{calc,data}/**`, `*-goldens.ts`, or the golden baseline
   is labelled `calc-formula-gate` and fails unless the same diff includes a
   `docs/agent/decisions.md` change + Athena before/after + elevated Themis.
3. **Golden-baseline** — `test/golden/engine-baseline.json`: ~50 canonical
   builds computed through the barrel, byte-compared by `verify-engine-baseline`.
   Catches drift from **catalog pulls** as well as code edits.
4. **Cephalon layers** — service unit tests (real engine, no mocks),
   integration tests (~15 weapon + ~10 warframe reference builds vs known-good
   numbers), comparison/AI-tool tests (the Primed-Bane sign + faction-gating),
   Playwright UI tests.
5. **Confidence-metadata tests** — every mechanic has exactly one tag; the
   Approximation/Not-modeled set can **never** resolve to Verified; snapshot of
   the full map.

CI order: `typecheck` → `engine-regression` → `verify-engine-baseline` →
`service + integration` → `ui`.

### Phase 1 — 16 tasks in three milestones (each its own approval point)

Full task specs + ACs: [`plan.md`](plan.md) Part G.

**1a — engine extraction (tasks 1–6):**
1. Scaffold the monorepo (+ the R2 build-step choice).
2. **Import the engine (calc + data + types + support) — GAME-DATA BUNDLING
   GATE (approved).** LICENSE + NOTICE + `data/PROVENANCE.md`; CI import-guard;
   record `tsc` time vs a budget. **Linchpin — blocks tasks 3–11.**
3. Port the test suite; `engine-regression` becomes a required check.
4. Define the public API barrel (both export groups, R1).
5. Catalog-assembly de-singleton + orchestration lift (structural, no formula
   change — M3/M4); AC includes the no-ambient-catalog typecheck + concurrency
   test.
6. Full-history reference clone (outside the repo) + `docs/agent/upstream-sync.md`
   runbook (curated-pull cadence, data-only vs formula-gate split, the future
   package-split recipe).

**1b — service layer + gates (tasks 7–11):**
7. `CatalogService` + `ConfidenceService` (the tag map + M6 definitions + S1
   rows as code).
8. `BuildService` + `SimulationService`.
9. `ComparisonService`.
10. Engine golden-baseline gate (+ the CI path-filter / `decisions.md` check).
11. **Steel Path scaling — first calc-formula gate.** Opt-in `sp` input; Argus
    sources the multipliers from the wiki → Athena before/after → **user
    sign-off in `decisions.md` on the values** → Codex (`SimulationParams` +
    `ttk.ts` + dated `game-constants` block) → elevated Themis → Apollo (1898
    unchanged with `sp` off + new SP tests). `ConfidenceService` upgrades Steel
    Path to Verified only after this lands.

**1c — UI foundation + surfaces (tasks 12–16)** — each runs its own
Argus→Athena→approval→Codex→Apollo cycle under the "UI change" row:
12. Design system foundation (tokens, dark theme, `<ConfidenceBadge>`, app
    shell, Ctrl+K palette).
13. Weapon Builder UI — scenario panel labels the S1 knobs honestly (headshots
    = binary toggle, no armor-strip-% field, `statusTypesOnTarget` = a count).
14. Warframe Builder UI — ability damage marked Approximation; Archon
    Violet/Topaz/Emerald offensive fields marked Not-modeled.
15. Scenario Simulator view — **requires task 11**; real Steel Path toggle
    carrying its confidence tag; roster of 19 + not-modeled limits surfaced.
16. Build Comparison view — explained row-by-row diff with a confidence badge
    per row.

**Deferred out of Phase 1:** the AI tool layer + Ask Cephalon UI (boundary
designed now, built in Phase 2); a full `game-constants.ts` extraction;
ability-damage / Archon-shard / radial / magnetic-overguard / enemy-roster
gap-filling; god-file decomposition; `PlayerContextService` beyond a stub
(depends on Supabase auth/schema gates).

---

## 13. Major risks

Full table (18 rows, each with a mitigation): [`plan.md`](plan.md) Part H. The
top ones:

| Risk | Mitigation |
|---|---|
| **AGPL §13 couples Cephalon's server source to disclosure; a commercial pivot needs an unobtainable grant or a rewrite.** Stale `package.json` "MIT"; unstated Dart-origin license; lost history; unreachable maintainer. | Build under full AGPL now; hard `packages/engine` boundary + golden-baseline-as-spec so a clean-room swap is a package replacement; keep only `LICENSE` + `NOTICE`, name it nowhere else; treat as AGPL. **Licensing professional required before any commercial / closed-source pivot** — documented, not cleared. |
| **Catalog maintenance is continuous, not a one-time port** — ~66k LOC drifts every DE patch; the sync pipeline is "scratch". | Curated-pull only (never auto-merge); `verify-engine-baseline` flags behavioral drift a pull introduces; `data/PROVENANCE.md` + `upstream-sync.md` name the process + cadence; a "catalog refresh" task type in `workflow.md`. |
| **Game-constant drift** — armor cap 2700, S-curve coeffs, `ENEMY_TYPES`, modifier tables hardcoded across files; no "last verified" gate. | Deferred `game-constants.ts` extraction; until then the golden-baseline + audit suites catch changes; every constant value change routes through the calc-formula gate. |
| **God files** `calculator.ts` / `arcane-handlers.ts` — high risk for any formula edit. | Phase 1 does not touch them (WRAP only); decomposition is a later gated phase after characterization-test expansion; the `calc-formula-gate` CI label forces review. |
| **`simulateDiscreteTTK` (415 LOC) has ~9 assertions** and is what "time to kill" answers call. | Surfaced as Approximation; expand characterization tests before any refactor; golden-baseline includes discrete-TTK cases. |
| **Override de-singleton spans ~5 files / ~40 call sites** (Themis M3), not one file — under-scoping leaves it half-done. | Task 5 does the whole call graph in one pass; AC = 1898/1898 + the no-ambient-catalog typecheck + concurrency test. |
| **Scenario-simulator honesty** — no Steel Path model today; S1 knobs (armor-strip %, headshot %, status uptime) aren't real engine inputs. | Steel Path scoped into Phase 1 under the formula gate (task 11); until it lands, tagged "Approximation — pending verification"; S1 knobs are labelled in the UI for what they actually are and the fake ones aren't built. |
| **Ability damage (linear) + Archon offensive shards (`break;` no-ops)** are the weakest links — and what an AI assistant leans on. | Tagged Approximation / Not-modeled; the AI tool layer only *explains* engine output; gap-fills are later, each gated with an Argus pass. |
| **Staying in sync with an active upstream** — squashed vendor clone, formula changes upstream must not enter silently. | Curated-pull only; full-history reference clone as diff/license oracle; catalog pulls = data-only review; any upstream formula/constant change = calc-formula gate. |
| **`SimulationParams` kitchen sink** (60+ fields). | `BuildService` owns assembly behind a small typed scenario API; the UI exposes only the common subset; per-weapon one-offs resolved from catalog metadata where possible. |
| **~66k LOC catalog in one package** — `tsc` time / CI cost / client bundle bloat. | `skipLibCheck` + `incremental`; server-side calc by default so the catalog need not ship to the browser; measure `tsc` time in task 2 vs a CI budget. |
| **"Verified" ≠ live-game-confirmed** — a transcription error presents as Verified. | The M6 definition is stated in this doc + `NOTICE`; Cephalon's reference-build integration tests cross-check a sample against a second source and record discrepancies. |

---

## Appendix — where the detail lives

- **[`investigation.md`](investigation.md)** — §§1–9, exhaustive file:line
  evidence, the full coverage table, the corrected `lib`⇄`data` edge counts,
  the test-run output, the licensing document quotes.
- **[`plan.md`](plan.md)** — Parts A (9 decisions in decision-shape), B
  (component table), C/C2 (API surface + confidence map), D (data-flow traces),
  E (testing), F (keep/wrap/defer), G (16 task specs + ACs), H (18 risks), I
  (this doc's acceptance checklist).
- **[`review.md`](review.md)** — Themis's two review passes.
- **[`../../agent/upstream-engine.md`](../../agent/upstream-engine.md)** — the
  only internal record of the upstream's identity + licensing facts.
- **[`../../agent/decisions.md`](../../agent/decisions.md)** — the dated
  user-approved decisions.
