# Plan: Cephalon architecture on the upstream engine engine

_Athena (planner). Read-only. This document supplies **sections 10–13** of the
merged `architecture.md` (§10 ← Part F; §11 ← Parts B/C/C2/D; §12 ← Parts E/G;
§13 ← Part H) plus the cross-cutting Part A decisions. `investigation.md`
supplies §§1–9. The merged `architecture.md` does not exist yet — it is
assembled after the Part A decisions are approved (M7). This document does not
authorize implementation._

Inputs: `brief.md`, `investigation.md` (Argus), `docs/agent/project-profile.md`,
`docs/agent/workflow.md`, `docs/agent/decisions.md`.

Ground rule carried through every choice below: **preserve as much of
the upstream engine's calculation functions and tests as possible. Wrap, don't replace.
Rewrite only where AGPL/commercial necessity or hard coupling forces it.**

_Revision 3 (post-Themis re-review + user Part A decisions, 2026-08-30). The
strategic spine is unchanged — pnpm monorepo, 1898 tests preserved as a
regression lock, build on full AGPL now behind a CI-enforced boundary,
licensing-professional review gated before any commercial pivot. User decisions
folded in: **build on full AGPL, minimal name footprint, NO maintainer-outreach
track** (maintainer unreachable — see `docs/agent/upstream-engine.md`);
**game-data bundling gate APPROVED**; **Steel Path scoped INTO Phase 1** as the
first calc-formula-gated task (task 11), not deferred. Revision-2 changes
(retained):_
- _**Packaging (M1/M2): ship the engine as ONE `packages/engine` package**
  (calc + data + types + support), contained `@` alias, **genuinely no codemod**
  for Phase 1. Argus's corrected §4/§5 shows `src/lib` ⇄ `src/data` are
  bidirectionally coupled (75 lib→data vs 35 data→lib statements) so they
  **cannot** be two one-way packages as-is — but one package containing both
  makes that a non-issue. The data/code separation is preserved as a
  **documented future split** with a measured recipe, not a Phase-1 action._
- _**Override de-singleton (M3):** spans ~5 files / ~40 call sites
  (`data-overrides.ts`, `effective-data.ts`'s 8 accessors,
  `arcane-effect-overrides.ts`, the `= getOverrides()` default params, ~20
  no-arg orchestration call sites) — not "one file". Merged with the
  orchestration lift as one task._
- _**`effective-data.ts` placement (M4):** decided — stays in `packages/engine`
  next to the data; `CatalogService` owns apply-OverrideSet → enrich → pass
  explicit `Weapon[]`/`Map` to `calculate*`; orchestration files refactored to
  take catalogs as parameters._
- _**Phase 1 split into milestones 1a/1b/1c (M5); "Verified" now defined (M6);
  Part I / architecture.md status corrected (M7); scenario-simulator input
  gaps beyond Steel Path flagged (S1); O1–O4 folded in.**_

---

## Part A — Cross-cutting decisions

Each uses the role packet's decision shape. "Approval requested" lines are the
hard gates before Phase 1 implementation can start.

---

## Decision: Repository shape & engine packaging

### Evidence
- Argus §5: the clean extractable unit is the **89-file closure** (`src/lib/calc/`
  + `src/data/` + `src/lib/types.ts` + 14 helpers), **0 npm deps, 0 imports from
  `app/` or `components/`**. "A framework-agnostic `@cephalon/engine` package is
  genuinely feasible with days, not weeks, of mechanical work."
- Argus §5 (corrected): the **file-level** module graph is a **DAG — no cycle**.
  But at the **directory level `src/lib` ⇄ `src/data` reference each other
  bidirectionally**: **75** `lib → @/data/*` statements (142 symbols, 24 distinct
  data modules) in non-test code, **81** more in tests (75 in `calc/`); versus
  **35** `data → @/lib/*` statements into just 3 pure leaf files
  (`codex/item-behavior-types` ×25 — zero imports; `types` ×9 — zero imports;
  `mods/set-mod-catalog` ×1 — `import type { Mod }` only). "You cannot draw a
  one-way package boundary between `lib` and `data`" until those 3 files move.
- Argus §5: "Treat the engine as **one package** (`lib/` + `data/` + `types`) —
  or pay the relocation cost … Any Athena plan that assumes 'engine package
  imports a separate data package, one-way' is wrong until those 3 leaf files
  move."
- Argus §5/§6: "keep a `@/*` alias pointing at the package `src/`" — with one
  package the closure's `@/lib/*` and `@/data/*` specifiers **all resolve inside
  one `packages/engine/src` tree**; the contained alias covers them with **no
  codemod**. The 47 test files import only `vitest` + `@/lib/*` / `@/data/*` and
  lift unchanged under that alias.
- `project-profile.md`: engine "must sit behind a clean boundary so it can be
  independently re-implemented (clean-room) if the product is later taken
  closed-source". `workflow.md`: repo structure "to be decided in the first
  architecture task and recorded in `decisions.md`".

### Options
1. **Single Next.js app**, engine as an internal `src/engine/` directory.
2. **Monorepo, ONE `packages/engine`** = `calc/` + `data/` + `types.ts` +
   `support/` (the 14 helpers) + the ported tests. Contained `@` alias →
   `packages/engine/src`. `apps/web` consumes the alias-free barrel
   `@cephalon/engine`. **No codemod.** Data/code separation booked as a
   documented future task.
3. **Monorepo, TWO+ packages now** (`engine` code / `warframe-data` catalog,
   plus a `warframe-types` leaf to break the directory cycle). Requires
   relocating 3 files + re-pointing 26 importers + a scoped `@/data/*` codemod
   (~277 specifiers) up front.
4. **Git submodule** of an upstream-engine fork.
5. **Published private npm package.**

### Recommendation
**Option 2 — one `packages/engine` package now, contained `@` alias, no
codemod.** Structure: `apps/web` + `packages/engine` + (later) `packages/ui`,
`packages/services` if a service package is wanted separate from `apps/web`.

Book the **data/code separation as a documented future task** (not Phase 1),
with Argus's measured recipe:
> Split `packages/engine` → `packages/engine` (calc + support) +
> `packages/warframe-data` (catalog) + `packages/warframe-types` (leaf:
> `types.ts` + `item-behavior-types.ts`). Move those 2 pure files + verify and
> move `set-mod-catalog.ts`; re-point **26** importers (25 `item-behavior-types`,
> 1 `set-mod-catalog`) + the `types` importers; run a scoped codemod over the
> **75** non-test + **81** test `@/data/*` statements (24 distinct modules) →
> `@cephalon/warframe-data`. Argus: "mechanical, ~1 commit."
Trigger for doing it: a concrete commercial-pivot plan, or a second consumer of
the catalog, whichever comes first.

### Why
- Argus is explicit that a two-package `lib`/`data` split is **not buildable
  as-is** (bidirectional directory coupling). One package sidesteps M1 and M2
  entirely — the `@/lib/*` and `@/data/*` specifiers stay inside one tree the
  contained alias covers, so **task 4's "1898 tests pass" AC is achievable with
  zero import rewriting**.
- This preserves the source **closest to upstream** (the ground rule): no
  ~300-specifier codemod, no file relocations, upstream diffs stay 1:1.
- The commercial-later rationale for eventually separating catalog (DE-owned
  facts, AGPL surface) from calc code is still sound — it is **recorded as a
  future split with a costed recipe**, not discarded. Deferring it costs
  nothing now and the recipe is ~1 mechanical commit when the trigger arrives.
- A single package boundary still gives the CI import-guard its enforcement
  point ("no React/Prisma/network/env/DOM in `packages/engine/src`") and still
  lets the 1898-test suite run as an isolated CI job.
- **Build-step / consumption (R2):** "contained alias, no codemod" only holds if
  the `@/*` alias is resolved *for consumers* — plain `tsc` emits `@/…`
  specifiers unchanged. Resolve it one of two ways, decided in task 1 and
  recorded: (a) **`apps/web` adds `packages/engine/src` to its own `@`
  path-mapping** and lists `@cephalon/engine` in Next's `transpilePackages`, so
  the app's bundler compiles the engine from source (simplest; fine while
  there's one consumer); or (b) **`packages/engine` builds with `tsup` (or
  `tsc` + `tsc-alias`)** to emit a `dist/` with relative paths and a real
  `exports` map (needed once a second consumer or a published package appears).
  Vitest already resolves `@` via `vitest.config.ts`, so the in-package test
  run is unaffected either way. This is a build-config choice, not a source
  change — it does not reintroduce a codemod.
- Submodule (4) rejected: Phase 1 must modify the vendored source (de-singleton
  the override cache, remove the `window` ref, port tests) — a submodule pinned
  to upstream fights that. Keep a **full-history reference clone** outside the
  monorepo as a diff/license/test oracle. Published package (5) premature.

### Approval requested
Confirm: **pnpm workspace monorepo; the engine ships as ONE `packages/engine`
package (calc + data + types + support + tests); contained `@` alias; no
codemod in Phase 1.** Confirm the **data/code separation is booked as a
documented future task** (recipe + trigger above), not Phase 1. Record both in
`decisions.md`.

---

## Decision: Licensing path (highest-stakes)

### Evidence (all from Argus §8 — factual, not legal advice)
- `LICENSE` = AGPL-3.0, "Copyright (c) 2026 the sole author and the upstream project
  contributors", "Previous versions were under MIT; new contributions and this
  license change apply going forward."
- `package.json` still says `"license": "MIT"`, `"name": "upstream-project"` — a
  published, machine-read contradiction. SBOM/`license-checker` tooling will
  report this project as MIT.
- `README.md`: "This repository is not intended for self-hosting."
- `CONTRIBUTING.md`: **no CLA, no copyright assignment.**
- **No per-file license headers** anywhere in `src/lib/**` or `src/data/**`.
- Calc + data are a **port of an earlier Dart project of unstated license**
  (`calculator.ts:1`, `data/incarnon.ts`, `data/custom-items.ts`).
- Vendored clone is **1 squashed commit** — the MIT→AGPL date, the
  the upstream project→the upstream engine rename date, and which lines predate the switch are **not
  recoverable** without upstream history or the maintainer.
- AGPL-3.0 §13: a network service incorporating this code must offer users the
  complete corresponding source of the whole combined work under AGPL-3.0. A
  "framework-agnostic package" boundary does not change that while the code is
  linked into the running service.
- A later closed commercial product needs either a commercial grant from **all**
  rights holders (maintainer + Dart-origin author + any post-switch
  contributors) or removal/rewrite of the AGPL portions.
- `decisions.md` 2026-08-30: posture is "open now, commercial later", engine
  "independently re-implementable (clean-room)".

### Options
1. **Commit to AGPL-3.0 for the entire Cephalon service now.** Keep the engine
   as a clean isolated package (already the plan). Publish Cephalon's full
   corresponding source under AGPL while open-source. Defer the commercial
   question entirely; treat a commercial pivot as a future project that would
   require the clean-room engine (option 3) to already exist.
2. **Contact the maintainer before building deep** — request (a) the real git
   history / a non-squashed clone, (b) the original Dart project's license, (c)
   whether they will resolve the `package.json` vs `LICENSE` contradiction in
   writing, (d) whether they would grant Cephalon a commercial / dual license.
   Gate the depth of engine integration on the answers.
3. **Plan a clean-room re-implementation of the engine as a parallel long-term
   track.** Use the upstream engine now purely as a reference spec + test oracle; write
   Cephalon's own engine from the wiki + `@wfcd/items` + the upstream engine's public
   test numbers (treating the *numbers* as DE-owned game facts, not the
   maintainer's IP — Argus §8). Ship on the upstream engine in the interim under AGPL.
4. **Hybrid**: option 1 now (build on the upstream engine, full AGPL, open-source) +
   option 2 in parallel as near-term correspondence + option 3 scoped as a
   Phase 3+ track that starts the moment a commercial pivot becomes a real
   plan rather than a "later".

### Recommendation
**Option 1 (build on the upstream engine now, full AGPL-3.0, open-source), with
options 3's cheap hedges — and NO maintainer track.** _(User decision,
2026-08-30: maintainer is treated as unreachable; option 2 is off the table.
Full facts in `docs/agent/upstream-engine.md`.)_

Concrete near-term actions, in order:
1. **Build on the upstream engine now under full AGPL-3.0** for the whole
   Cephalon service. Compatible with the "open now" posture; blocks nothing on
   the Phase 1 roadmap.
2. **Preserve only the legally required notices, name it nowhere else.**
   `LICENSE` (AGPL-3.0) verbatim in `packages/engine` + repo root; a `NOTICE`
   seeded from `docs/agent/upstream-engine.md` (upstream URL, rev `e66896a`,
   prior project name, MIT→AGPL history note, unstated Dart-origin license, DE
   fan-content disclaimer). **No upstream name in product UI, marketing, public
   README, or user docs; internal docs say "the upstream engine"; the only
   internal file that names it is `docs/agent/upstream-engine.md`.**
3. **Keep the engine boundary hard** so a clean-room swap is a package
   replacement, not an app rewrite.
4. **No maintainer-outreach track.** The maintainer is unreachable; the git
   history, the Dart-origin license, and the `package.json`/`LICENSE`
   contradiction stay permanently unresolved. Cephalon **treats the code as
   AGPL-3.0** regardless of the stale `package.json`, and states in
   `architecture.md` §8 + `NOTICE` that automated license scans of the upstream
   will report MIT and are wrong.
5. **No clean-room engine work in Phase 1.** Instead make the two things a
   clean-room effort needs cheap: (a) the contained package boundary, (b) the
   golden-baseline corpus (Part C / task 10) — which doubles as the clean-room
   spec + acceptance oracle.
6. **Flag explicitly**: before any closed-source or paid pivot, a qualified
   open-source licensing professional must review — the unrecoverable MIT→AGPL
   line, the unstated Dart-origin license, the absent CLA, and the
   `package.json` contradiction are unresolved risks this plan documents but
   cannot clear.

### Why
- The stated "commercial later" intent is preserved not by a maintainer deal
  (impossible — unreachable) but by the hard package boundary + the
  golden-baseline-as-spec, so a clean-room rewrite is a scoped package swap if
  that day comes.
- Option 3 (clean-room now) is wasteful: it spends the project's scarcest
  resource hedging a future that may not arrive, and a from-scratch engine
  would ship years behind the upstream's accuracy (Argus: 1898 wiki-locked
  cases, the `ACCURACY_CHECKLIST`).
- Option 2 (contact first) is moot — no reachable counterparty.
- This is project-risk framing, not legal advice: assume AGPL applies to
  everything, act accordingly, get a professional before betting money on any
  other reading.

### Approval requested
Confirm: **(a) build on the upstream engine now under full AGPL-3.0**;
**(b) keep only `LICENSE` + `NOTICE`, the upstream name nowhere user-facing and
only in `docs/agent/upstream-engine.md` internally**; **(c) no
maintainer-outreach track; treat the code as AGPL despite the stale
`package.json`**; **(d) no clean-room engine work in Phase 1**; **(e)
licensing-professional review is a hard prerequisite for any commercial /
closed-source pivot.** Recorded in `decisions.md` 2026-08-30.

---

## Decision: Upstream-sync strategy

### Evidence
- Argus §2/§3: the engine's accuracy is "catalog-data-bound"; `mods.ts` (22k
  LOC), `weapons.ts` (15k), the 22 `mod-behaviors` batches and
  `riven-dispositions.ts` are maintained "against a game DE patches every few
  weeks. A reused engine inherits a **continuous data-maintenance burden**, not
  a one-time port."
- Argus §7: "Game-constant drift — every DE balance patch can invalidate 2700,
  the scaling coefficients, `ENEMY_TYPES`, and the modifier tables."
- Argus §8: vendored clone is 1 squashed commit; upstream GitHub has real
  history.
- `workflow.md`: **calc-formula changes are a hard-stop gate** with a
  `decisions.md` entry, regardless of size.

### Options
1. **Hard fork.** Take the `e66896a` snapshot, never pull from upstream again.
   Cephalon owns all future catalog + formula maintenance.
2. **Auto-track upstream.** Add the upstream engine as a remote, periodically merge
   `main`.
3. **Curated pull (patch review).** Keep a full-history reference clone of
   the upstream engine. On a cadence (e.g. per Warframe major patch), diff upstream
   `src/data/**` and `src/lib/calc/**` against the vendored copy. **Catalog
   changes** are reviewed and cherry-picked as data-only updates. **Any calc
   code / formula / constant change** goes through the calc-formula approval
   gate (Argus before/after, `decisions.md` entry) before it lands.

### Recommendation
Option 3 — curated pull. Never auto-merge. The reference clone (full history,
obtained from upstream GitHub) lives outside the monorepo and is used only as a
diff source and as the license/history record the squashed vendor clone lacks.

### Why
- Option 1 throws away the upstream engine's ongoing wiki-reconciliation work — exactly
  the "moat and liability" Argus identifies. We'd be signing up to re-derive
  catalog deltas every patch with a `scripts/` pipeline Argus calls "scratch".
- Option 2 is incompatible with `workflow.md`: an auto-merge could silently
  change a damage formula, which is a hard-stop gate. It also risks pulling
  app-layer churn we don't want.
- Option 3 separates the two risk classes cleanly: catalog data refreshes are
  low-risk and frequent; formula/constant changes are high-risk and gated. This
  matches the existing approval-gate structure instead of fighting it.
- Cost: a periodic manual diff. Mitigated by the golden-baseline test (Part C),
  which flags any behavioral drift a catalog pull introduces.

### Approval requested
Confirm: **curated pull, no auto-merge; catalog updates reviewed as data-only;
every formula/constant change hits the calc-formula gate.** Obtain a
full-history reference clone of the upstream engine for the license/provenance record.
Record in `decisions.md`.

---

## Decision: Data-catalog ownership & the game-data bundling gate

### Evidence
- Argus §3: "All catalog data is committed static TypeScript under
  `src/data/*.ts`." No DB, no runtime fetch. `@wfcd/items` was "walled off" in
  one feature and evidently rejected as the catalog source.
- Argus §3: `scripts/` is "explicitly 'scratch' … the data pipeline is not a
  hardened, reproducible build. Re-deriving the catalog from scratch is not
  currently a supported operation."
- Argus §2: `calculate*` functions take `Weapon[]` / `Map<string,Mod>`
  explicitly — data is already a parameter, not a hard dependency of the calc
  code.
- `project-profile.md` / `workflow.md`: **game-data bundling is a hard-stop
  gate** — committing bulk Warframe game data requires sign-off on source,
  license compatibility, size/format, and refresh strategy, recorded in
  `decisions.md`.

### Options
1. **Bundle the upstream engine's `src/data/**` verbatim** into
   `packages/engine/src/data/` (one package — Repository-shape decision), as
   static committed TS. Refresh via curated pull (upstream-sync decision).
2. **Don't bundle; derive at runtime** from `@wfcd/items` + external APIs,
   normalizing into `types.ts` shapes at load time.
3. **Bundle a re-derived catalog** built by Cephalon's own hardened pipeline
   from `@wfcd/items` + wiki.

### Recommendation
Option 1 — bundle the upstream engine's catalog verbatim into `packages/engine/src/data/`
(kept a distinct subtree with its own `PROVENANCE.md`; the eventual pull-out to
`@cephalon/warframe-data` is the documented future split). This **triggers the
game-data bundling gate now**; Phase 1 task 2 cannot proceed without that
sign-off, and it is the **linchpin blocking tasks 3–11** (they all need the
catalog present — Themis O2).

### Why
- The engine's 1898 tests and its entire accuracy story are calibrated to
  *this* catalog's exact numbers and shapes (Argus §6: goldens are inline,
  hand-transcribed from the wiki against this data). Swapping the catalog source
  in Phase 1 would invalidate the regression lock we're trying to preserve.
- Option 2 puts external APIs on the calc path — directly against
  `project-profile.md` ("don't couple external APIs to UI"; the engine
  currently "makes zero network calls ever", Argus §9) and adds ToS/rate-limit
  risk Argus §9 flags.
- Option 3 is the clean-room catalog track — same reasoning as the clean-room
  engine: valuable later, wasteful in Phase 1, and blocked on building the
  "hardened pipeline" the upstream engine itself never finished.
- Keeping `data/` a **distinct subtree** (not intermixed with `calc/`) inside
  the one package means the future pull-out to a separate package is the
  ~1-commit mechanical move Argus describes.

Gate submission contents (for Phase 1 task 2):
- **Source**: the upstream engine `src/data/**` @ `e66896a`, itself derived from a Dart
  port + wiki/`api.warframestat.us` reconciliation.
- **License**: AGPL-3.0 as applied by the maintainer to the arrangement;
  underlying numbers are DE-owned game facts used under fan-site convention
  (Argus §8). `NOTICE` + `PROVENANCE.md` record this.
- **Size/format**: ~66k LOC static TS, ~10 large files (`mods.ts` 22k LOC etc.)
  + `mod-behaviors/batches/` (22 files).
- **Refresh**: curated pull per the upstream-sync decision; golden-baseline
  test gates behavioral drift.

### Approval requested
**Game-data bundling gate**: approve committing the upstream engine's `src/data/**`
(~66k LOC) into `packages/engine/src/data/` under the source/license/size/
refresh terms above. Record in `decisions.md`. Phase 1 task 2 (and therefore
3–10) is blocked until this is signed off.

---

## Decision: Steel Path — in or out of Phase 1

### Evidence
- Argus §2 gap list #1: "**Steel Path** — no scaling multipliers at all; only
  raw level. No SP toggle anywhere in `calc/` or `SimulationParams`. Users
  approximate SP by raising enemy level."
- Argus §7: SP scaling would be new hardcoded game constants — "exactly the kind
  of game-constant drift" flagged as a risk; no dated constants module exists.
- `workflow.md`: adding a scaling formula is a **calc-formula change** — hard
  gate, Argus before/after + source + `decisions.md` entry.
- Handoff item 7: Phase 1 includes "a scenario simulator" and says to include it
  "honestly given there's no Steel Path model yet — either scope Steel Path in
  as the first formula-gated addition, or explicitly defer it and document the
  limitation in the confidence metadata."
- `project-profile.md`: "Calculation confidence must be surfaced… Never present
  an approximation as verified."

### Options
1. **Defer.** Phase 1 scenario simulator exposes enemy level only (matching
   the upstream engine). A prominent "Steel Path modifiers not yet modeled" caveat in the
   UI and in the confidence metadata. Steel Path becomes the **first
   formula-gated task of Phase 2**, preceded by its own Argus sourcing pass for
   the SP multipliers.
2. **Scope in now** as the first calc-formula gate: Argus sources SP's
   health/armor/level/damage-resistance multipliers from the wiki, Athena writes
   the before/after, user signs off, Codex adds an `sp: boolean` to
   `SimulationParams` and the scaling primitives in `ttk.ts`.
3. **Partial**: ship an SP toggle that only does the well-known
   "+100 enemy levels" shift, label everything else Approximation.

### Recommendation
**Option 2 — scope Steel Path into Phase 1 as the first exercise of the
calc-formula-change gate.** _(User decision, 2026-08-30 — overrides the
planner's original Option 1 recommendation. Recorded in `decisions.md`.)_

Concretely, this becomes a dedicated Phase 1a task, run under the
"Calc-formula change" workflow row, sequenced **after** the engine + tests are
imported and green (so the regression lock exists to protect the change), and
**before** the Scenario Simulator UI (task 14) so that UI can ship a real SP
toggle:
1. **Argus sourcing pass** — collect SP's multipliers from the wiki with
   citations: the enemy-level shift, the health multiplier, the armor
   multiplier, the flat damage-resistance/"damage attenuation" behavior, and
   whether they compose additively or multiplicatively with the base S-curve
   in `ttk.ts`. Output: a sourced before/after spec.
2. **Athena** writes the before/after formula and names every constant's
   source.
3. **User sign-off** with a dated `decisions.md` entry (the formula values,
   not just "yes").
4. **Codex** adds an `sp` input to `SimulationParams` (+ `DEFAULT_SIM_PARAMS`)
   and the scaling primitives in `ttk.ts` / `scaleHealth` / `scaleArmor`,
   plus a `game-constants` block for the new SP numbers (dated).
5. **Themis** — elevated scrutiny (formula-gate row).
6. **Apollo** — full ported suite (**1898/1898 unchanged** — SP is a new
   opt-in branch, so existing non-SP tests must not move) **plus** new SP
   characterization tests against the sourced wiki values.

### Why (given the user's choice)
- The user wants the scenario simulator to answer real endgame questions;
  "enemy level only" would make it materially less useful for the content
  Cephalon is aimed at.
- Doing it *first*, under the gate, with its own Argus pass and golden tests,
  is exactly the safe way to add a formula — it also proves out the
  calc-formula-gate machinery (CI label, `decisions.md` check, golden-baseline)
  on a real change while the codebase is small.
- Risk contained: SP is added as an **opt-in `sp` branch**. With `sp` off the
  engine behaves identically, so "the regression lock still passes unchanged"
  holds. The new behavior is covered by new tests seeded from the wiki.
- Until the SP task lands, any scenario UI shipped shows Steel Path as
  **"Approximation — pending verification"**, never Verified and never as a
  finished model.

### Approval requested
Confirm: **Steel Path is a Phase 1a calc-formula-gated task** (Argus sourcing →
Athena before/after → **user sign-off in `decisions.md`** → Codex → elevated
Themis → Apollo full-suite + new SP tests), sequenced after engine/test import
and before the Scenario Simulator UI. `sp` is an opt-in input; non-SP
regression tests stay byte-identical. Recorded in `decisions.md`.

---

## Decision: Stack confirmation

### Evidence
- `project-profile.md` recommended stack: "Next.js + TypeScript, Supabase, a
  standalone deterministic calculation package, normalized Warframe data layer,
  service layer between UI and calculations, server-side wrappers for external
  data, AI tool layer."
- Argus preflight: the upstream engine is Next.js 16 / React 19 / TS 5 / **Vitest 3** /
  Prisma 7 + better-sqlite3 / next-auth v5. Its app layer is not reused; the
  framework choice is compatible.
- Argus §6: the test suite is Vitest, `environment: "node"`, no setup file —
  lifts unchanged.

### Options
1. Next.js (App Router) + TypeScript + Supabase (Postgres) + pnpm workspaces +
   Vitest + React 19; Playwright for UI E2E. the upstream engine's app layer
   (Prisma/better-sqlite3/next-auth) **not** carried over — Supabase provides
   auth + DB.
2. Same but keep Prisma as the ORM against Supabase Postgres.
3. A non-Next framework (Remix/SvelteKit/etc.).

### Recommendation
Option 1.

### Why
- Matches the profile's recommended stack and the upstream engine's own framework family,
  so React/Next knowledge and the compiler setup transfer.
- Vitest is non-negotiable — it's what the 1898-test regression lock runs on
  (Argus §6). Using it for Cephalon's own tests too means one runner, one CI
  config.
- Supabase (not Prisma+SQLite) because `project-profile.md` names it and because
  "data sensitive from day one" (`decisions.md`) wants managed auth + RLS +
  encryption-at-rest rather than a rolled next-auth/SQLite stack. Prisma can be
  revisited as an ORM layer later without disturbing the engine.
- Option 3 throws away the framework-compatibility dividend for no stated
  benefit.

### Approval requested
Confirm the Option 1 stack. Record in `decisions.md`. (Schema/auth specifics
remain under their own gates and are out of Phase 1 scope beyond scaffolding.)

---

## Decision: `overrideCache` singleton & the `data-overrides.ts` `window` guard

### Evidence
- Argus §4/§7: `overrides/data-overrides.ts` is **inside the calc closure** but
  has a module-level `let overrideCache: DataOverride[] = []` and a
  `typeof window !== "undefined"` reference in `notifyDataOverridesUpdated()`;
  `saveOverride`/`deleteOverride`/`exportOverrides` lazy-`import(
  "@/lib/overrides/data-overrides-client")`.
- Argus §7: "An engine reused in a server/multi-tenant context would share this
  [cache] across requests." — named a "correctness hazard".
- Argus §4: "the **calc-relevant exports** … are pure" — **true only with a
  caveat** (Themis M3): they are pure *if the caller passes the 2nd argument*;
  their **default parameter is `= getOverrides()`** (`data-overrides.ts:117–145`).
- **Themis M3 — the singleton read is not confined to `data-overrides.ts`:**
  - `weapons/effective-data.ts` calls `getOverrides()` **16×** across its **8**
    `getEffective*` accessors (`getEffectiveWeapons`, `getEffectiveModsMap`,
    `getEffectiveWarframesMap`, `getEffectiveCompanionsMap`, arcanes, archon
    shards, archwings, necramechs).
  - `overrides/arcane-effect-overrides.ts` (closure helper) calls `getOverrides()`.
  - `builds/build-stats.ts` + `loadout-stats.ts` (the orchestration files) call
    `getEffective*()` **~20× with no arguments**, relying entirely on the
    ambient singleton being populated.
  Total: ~5 files, ~40 call sites.
- Argus §2: `calculate*` entry points already take catalogs as explicit
  parameters — so the fix stops *above* the `calculate*` layer, at the
  catalog-assembly layer.

### Options
1. **Leave as-is.** Document that the engine must only be used single-tenant.
2. **Thread an override context param** through `calculateWeaponBuild` et al.
   (~15 `calculate*` signatures, touches the god file). Rejected.
3. **Host-applies-overrides, catalog passed explicitly.** Remove `overrideCache`
   and all `window`/client-import code from `packages/engine`. Change the
   **catalog-assembly seam** so nothing reads an ambient singleton:
   - `applyWeaponOverrides` / `applyModOverrides` / `applyWarframeOverrides` / …
     lose the `= getOverrides()` **default parameter** — `OverrideSet` becomes
     required.
   - the **8** `getEffective*` accessors in `weapons/effective-data.ts` (16
     `getOverrides()` reads) gain an explicit `overrideSet` parameter.
     `effective-data.ts` **stays inside `packages/engine`** next to the data
     (M4 — see the "catalog supply" note in Part C); it is just no longer
     singleton-bound.
   - `overrides/arcane-effect-overrides.ts` takes the `OverrideSet` explicitly.
   - the **~20** no-arg `getEffective*()` calls in `build-stats.ts` /
     `loadout-stats.ts` are rewritten to receive a pre-merged catalog (or
     `OverrideSet`) as a parameter — i.e. the orchestration files are lifted
     **and** refactored to take catalogs as arguments in the same pass.
   - `CatalogService` (in `apps/web`) builds the `OverrideSet` (Supabase or a
     static file), applies it, runs `enrichWeapon`, and hands `Weapon[]` /
     `Map<string,Mod>` to the engine. Persistence, the `window` event, and the
     lazy client import move to `apps/web`.

### Recommendation
Option 3 — scoped honestly at **~5 files / ~40 call sites**
(`data-overrides.ts`, `effective-data.ts`'s 8 accessors,
`arcane-effect-overrides.ts`, the `= getOverrides()` default-param removal, the
~20 orchestration call sites). It is the **same call graph** as lifting
`build-stats.ts` / `loadout-stats.ts` into the engine, so **the two are one
Phase-1 task**: *"Catalog-assembly de-singleton + orchestration lift"*
(milestone 1a, task 5). Zero formula impact — no `calculate*` body changes.

### Sub-decision: orchestration — lift vs reimplement (was O1)
`build-stats.ts` + `loadout-stats.ts` (~913 LOC) encode tested loadout-assembly
ordering (frame + weapons + companion + arcanes + shards + external ability
buffs → every calculator in the right order); their `build-url.test.ts` /
`loadout-save.test.ts` (10 tests) are serialization tests. Options: **(2a)
lift + refactor-to-params into `packages/engine/src/orchestration/`** (preserve
the ordering logic and its tests); **(2b) reimplement thin in `BuildService`**
(smaller AGPL surface a clean-room rewrite must reproduce; the 10 tests could
travel with a service-layer impl too). **Recommendation: 2a (lift).** The
ground rule is preserve-first and the ordering logic is exactly the kind of
thing a reimplementation gets subtly wrong. **Acknowledged tradeoff:** this
enlarges the code a future clean-room engine must re-derive by ~913 LOC versus a
Cephalon-authored orchestrator over the preserved `calculate*` primitives — a
real cost weighed against test preservation, not ignored. If the clean-room
track ever starts, the orchestrator is a candidate to re-author service-side
then.

### Approval requested
Confirm Option 3 **merged with the orchestration lift (2a) as one Phase 1
task** (1a/task 5), scoped to ~5 files / ~40 call sites. AC: `engine-regression`
**1898/1898** green; `override-merge.test.ts` + `build-url.test.ts` +
`loadout-save.test.ts` green; a new concurrency test (two `OverrideSet`s applied
concurrently don't cross-contaminate); **and** a typecheck of
`packages/engine/src/orchestration/` proving no ambient-catalog access (no
zero-arg `getEffective*` / `getOverrides` calls remain anywhere in
`packages/engine/src`). Record in `decisions.md` (structural, no formula
change). Note the acknowledged clean-room-surface tradeoff of choosing 2a.

---

## Part B — Proposed Cephalon architecture (deliverable §11)

### Layered diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│ UI  —  apps/web  (Next.js App Router, React 19, Cephalon design system)   │
│  Ctrl+K search · Weapon Builder · Warframe Builder · Scenario Simulator · │
│  Build Comparison · (Phase 2+) unified item pages · Ask Cephalon          │
│  Renders view-models only. Shows Verified / Approximation badges.         │
└───────────────┬──────────────────────────────────────────────────────────┘
                │  view-models (numbers + confidence tags), never raw engine types
┌───────────────▼──────────────────────────────────────────────────────────┐
│ Application Services  —  apps/web/src/server/services  (or packages/services)│
│  CatalogService · BuildService · SimulationService · ComparisonService ·  │
│  ConfidenceService · PlayerContextService                                 │
│  Owns: SimulationParams assembly · OverrideSet application · confidence   │
│  tagging · caching/memoisation · orchestration wrapping                   │
└───┬─────────────────┬───────────────────┬────────────────────┬───────────┘
    │ pure, sync      │                   │ server-only        │ server-only
┌──────────────────────────┐ ┌───────────────────┐ ┌────────────────┐ ┌───────────────┐
│ @cephalon/engine (AGPL)   │ │ Player Context     │ │ External-data   │ │ AI tool layer  │
│  ONE package:             │ │  (Supabase:        │ │  wrappers       │ │  (Phase 2+)    │
│   calc/                   │ │  accounts, saved   │ │  (server-only:  │ │  fn-call defs  │
│   data/    (~66k LOC      │ │  builds, loadouts, │ │  warframe.market│ │  → Services    │
│            catalog TS)    │ │  inventory, RLS)   │ │  worldstate,    │ │  only. NEVER   │
│   types.ts                │ │                    │ │  wiki, DE)      │ │  computes      │
│   support/  orchestration/│ │                    │ │  cached, rate-  │ │  Warframe math │
│   + ported vitest suite   │ │                    │ │  limited        │ │               │
│  NO react/next/prisma/    │ │                    │ │                 │ │               │
│  net/env/DOM/mutable state│ │                    │ │                 │ │               │
└──────────────────────────┘ └───────────────────┘ └────────────────┘ └───────────────┘
     contained `@` alias → packages/engine/src ; consumers use the barrel @cephalon/engine
     (future: data/ + types.ts + item-behavior-types.ts split out to @cephalon/warframe-data
      + @cephalon/warframe-types — documented recipe, ~1 mechanical commit, not Phase 1)
```

Dependency rule: arrows point **down / inward** only. `@cephalon/engine` is a
single package — `calc/` and `data/` co-reside (Argus §5: `lib` ⇄ `data` are
bidirectionally coupled and can't be two one-way packages as-is). The
`calculate*` functions still **receive catalog instances as arguments**
(`Weapon[]` / `Map<string,Mod>`), assembled by `CatalogService`. Nothing below
the Services line imports React or Next. The AI tool layer never imports
`@cephalon/engine` directly — it goes through Services.

### Component list & responsibilities

| Component | Package / path | Responsibility | Must NOT |
|---|---|---|---|
| `@cephalon/engine` | `packages/engine` (ONE package) | Pure deterministic calc: the ~15 the upstream engine entry points (Part C) + `data/` (~66k LOC catalog TS, incl. `enrichWeapon` + `effective-data.ts`) + `types.ts` + `support/` + `orchestration/` (lifted `build-stats`/`loadout-stats`) + the ported vitest suite. Exposes a single barrel `index.ts`. | Import react/next/@prisma/next-auth/@wfcd/*; call `fetch`; read `process.env`; touch `window`/`document`/`localStorage`; hold mutable module state. |
| `data/` (inside `@cephalon/engine`) | `packages/engine/src/data` | Static catalog TS + loaders returning `Weapon[]`, `Warframe[]`, `Map<string,Mod>`, arcane/incarnon/disposition tables; `enrichWeapon`; `effective-data.ts` (override-merge accessors, now taking an explicit `OverrideSet`). Subject to the **game-data bundling gate**. Documented future task splits this to `@cephalon/warframe-data`. | Contain `calculate*` formula logic; `fetch` at runtime. |
| `CatalogService` | `apps/web/src/server/services` | Import catalog loaders + `enrichWeapon` from `@cephalon/engine`; build an `OverrideSet` (static file now, Supabase later); apply overrides + enrich; expose `getWeapon`/`getWarframe`/`getModMap`/`getArcanes`. Caches the merged catalog. Hands explicit `Weapon[]`/`Map` to `BuildService`. | Leak `DataOverride` mutation / ambient singletons into the engine. |
| `BuildService` | ″ | Given `{itemId, modSlots, arcanes, shards, rivenStatChanges, incarnonStatChanges, scenario}` → assemble `SimulationParams` over `DEFAULT_SIM_PARAMS`, call `calculateWeaponBuildWithArcanes` / `calculateWarframeBuild` + `applyWarframeShardsAndArcanes`, run `computeDpsContributions`, return a `BuildResult` view-model with per-stat confidence tags. Wraps engine `orchestration/` for full loadouts. | Do formula math itself. |
| `SimulationService` | ″ | Given a `BuildResult` + `{enemyArchetype, level, factionOverride}` → `calculateTTK` and/or `simulateDiscreteTTK` / `runDamageSim`; return `ScenarioResult` with the EV-status and no-Steel-Path caveats attached. | Present enemy-level scaling as Steel Path. |
| `ComparisonService` | ″ | `compareBuilds(a, b, scenario)` and `compareModSwap(build, candidateModId, removeModId?)` → run BuildService/SimulationService for each variant, diff `CalculatedStats` / `TTKResult`, annotate faction-gated mods, return a `BuildDiff` view-model. | — |
| `ConfidenceService` | ″ | Single source of truth for the Verified/Approximation map (Part C). Tags every surfaced stat. Snapshot-tested. | Let any Approximation mechanic be tagged Verified. |
| `PlayerContextService` | ″ | Supabase-backed: accounts, saved builds, loadouts, inventory. Feeds "do I own this" context into builders. Sensitive-from-day-one rules apply. | Log player identifiers / account tokens. |
| External-data wrappers | `apps/web/src/server/external` | Server-only fetch + cache + rate-limit for `warframe.market`, worldstate, wiki, DE endpoints. | Be called from UI components or from the calc path. |
| AI tool layer | `apps/web/src/server/ai` (Phase 2+) | Function-call schemas (`compare_mod_swap`, `explain_build`, `simulate_scenario`, …) that invoke Services and return structured results for the model to explain. | Compute or estimate any Warframe number. |
| Design system | `apps/web/src/ui` or `packages/ui` | Tokens, primitives, the `<ConfidenceBadge>` (Verified / Approximation), layout shell, dark theme. | — |

---

## Part C — Calculation engine boundaries (deliverable §11 cont.)

### Public API surface Cephalon depends on

Cephalon's Services depend **only** on the `@cephalon/engine` barrel, which
re-exports exactly the upstream engine's existing entry points (preserved, not renamed).
From Argus §2:

| Export | Signature (abbrev.) | Returns | Covers |
|---|---|---|---|
| `calculateWeaponBuild` | `(rawWeapon, equippedMods, allMods, incarnonStatChanges?, simParams?, calcOptions?, linkage?, rivenStatChanges?)` | `CalculatedStats` (~280 fields) | base/IPS, elemental combos + mod ordering, crit tiers, multishot, beam/charge/bow, Gun CO / Galvanized / Blood Rush / Weeping Wounds, set bonuses, radial (flat), quantization |
| `calculateWeaponBuildWithArcanes` | `(…same…, arcanes, …)` | `CalculatedStats` | above + weapon arcanes, recomputed melee combo + effective fire rate |
| `calculateWarframeBuild` | `(warframe, equippedMods, allMods, linkage?)` | `WarframeCalculatedStats` | HP/shield/armor/energy/sprint, ability S/D/E/R, EHP, DR |
| `applyWarframeShardsAndArcanes` | `(stats, shards?, arcanes?, arcaneRanks?)` | `WarframeCalculatedStats` | Archon shards (Azure/Crimson/Amber + partial Violet/Topaz/Emerald — see gaps), warframe arcanes |
| `calculateTTK` | `(stats, enemy: EnemyType, level)` | `TTKResult` | analytic TTK, enemy armor/health/shield scaling, armor DR, armor strip, viral, DoT |
| `simulateDiscreteTTK` | `(…)` | shot-by-shot result | 0.25s-step sim; EV status procs (not sampled) |
| `runDamageSim` | `(DamageSimInputs)` | `DamageSimResult` | paper breakdown + discrete TTK for hand-entered stats |
| `calculateCompanionBuild` | `(…)` | `CompanionCalculatedStats` | companion/beast DPS via weapons, Hunter/Mecha sets |
| `calculateArchwingBuild` / `calculateNecramechBuild` | `(…)` | `ArchwingCalculatedStats` | atmosphere + space overlays |
| `calculateRailjackBuild` | `(…)` | `RailjackCalculatedStats` | ship/armaments/intrinsics/Tunguska |
| `evaluateRiven` + `getRivenGrade` + `getStatsWithDisposition` | `(RivenMod)` | score 0–1 / grade / stat ranges | riven **grading only** — no roll generation |
| `resolveIncarnonActiveWeapon` + `applyIncarnonFormToWeapon` | `(…)` | resolved `Weapon` | Incarnon forms/evolutions (deepest-tested subsystem) |
| `buildAbilityTTKEntries` + `calculateAbilityTTK` + `abilityToPseudoWeaponStats` | `(ability, wfStats, …)` | ability TTK entries | ability damage via linear `damage × strength` pseudo-weapon (Approximation) |
| `computeDpsContributions` | `(…)` | per-mod DPS delta | "+X% DPS per mod" marginal analysis |
| `mergeIncarnonStatChanges` / `mergeRivenStatChanges` | `(…)` | merged records | stat-change plumbing |
| pure override helpers | `applyWeaponOverrides` / `applyModOverrides` / `mergeOverrideLists` / `deepMergeOverrideFields` (post-refactor, taking explicit `OverrideSet`) | merged catalog | staff data-fix corrections |

Plus input/output **types** from `packages/engine/src/types.ts` (Argus §2):
`Weapon`, `Mod`, `Warframe`, `Ability`, `ModSlot`, `EquippedMod`,
`EquippedArchonShard`, `ArchonShard`, `ModularBuildData`, `SetBonusLinkage`,
`WeaponExternalBuff`, `WeaponCalculationOptions`, `SimulationParams` +
`DEFAULT_SIM_PARAMS`, `CalculatedStats`, `WarframeCalculatedStats`,
`CompanionCalculatedStats`, `ArchwingCalculatedStats`, `RailjackCalculatedStats`,
`Loadout`, `EnemyType`, `TTKResult`, `DamageSimInputs/Result`.

**Second export group — catalog assembly (R1).** `CatalogService` needs the
catalog-side helpers to produce the `Weapon[]` / `Map<string,Mod>` it hands to
the `calculate*` functions, so the barrel also re-exports a small, explicitly
labelled **catalog-assembly surface**: the `@cephalon/warframe-data`-style
loaders (`getAllWeapons`/`getAllMods`/`getAllWarframes`/`getArcanes`/… ),
`enrichWeapon`, the `effective-data.ts` `getEffective*` accessors (post-refactor,
taking an explicit `overrideSet`), and the `OverrideSet` type. This group is
consumed **only by `CatalogService`**, never by `BuildService` /
`SimulationService` / `ComparisonService` (which take already-assembled
catalogs). Task 4's AC checks both groups are present and that nothing outside
`CatalogService` imports the catalog-assembly group.

Everything else in `packages/engine/src/**` is **internal** — not re-exported
from the barrel, not imported by Services.

### What the engine package MUST NOT contain

React, Next, `@prisma/*`, `next-auth`, `@wfcd/*`, `warframe-worldstate-data`,
`tesseract.js`; any `fetch(` / network; any `process.env`; any
`window`/`document`/`localStorage`; any mutable module-level state; any JSX.
Enforced by a CI grep-guard over `packages/engine/src`. Argus §2 confirms this
already holds for the closure except the two `data-overrides.ts` blemishes,
which task 5 removes.

### How catalog data is supplied (M4 — decided)

The catalog TS **lives inside `packages/engine/src/data/`** (one package — Argus
§5). But the `calculate*` functions still **receive catalog instances as
arguments**, not via an ambient singleton. `CatalogService` (in `apps/web`)
imports the catalog loaders + `enrichWeapon` + `effective-data.ts` accessors
from `@cephalon/engine`, builds an `OverrideSet`, applies it, runs enrich, and
passes concrete `Weapon` / `Map<string,Mod>` / arcane arrays into
`calculateWeaponBuild` et al. `effective-data.ts` stays in the engine package
(next to the data it merges) but its 8 `getEffective*` accessors take an
explicit `overrideSet` param after task 5 — no module-level `overrideCache`.

### `overrideCache` + `window` guard resolution

Per the decision above: Phase 1 **task 5** (milestone 1a, merged with the
orchestration lift) removes the module-level `overrideCache` and all
`window`/client-import code from `packages/engine`, removes the
`= getOverrides()` default params, and adds an explicit `overrideSet` param to
`effective-data.ts`'s 8 accessors + `arcane-effect-overrides.ts`.
`CatalogService` owns the `OverrideSet` lifecycle. Result: safe for
server-side, multi-user, multi-dataset use.

### `build-stats.ts` / `loadout-stats.ts` orchestration

Per the decision above: **lifted into `packages/engine/src/orchestration/` and
refactored to take catalogs as parameters** (task 5, same pass as the
de-singleton — same call graph), after splitting pure resolvers out of
`build-storage.ts` and moving `riven-resolve.ts` into `support/`. `BuildService`
wraps this orchestration; it does not reimplement it. `localStorage`
persistence stays in `apps/web`.

---

## Part C2 — Confidence metadata: the Verified / Approximation map

`ConfidenceService` owns this table. Derived from Argus §2 coverage table + gap
list. Snapshot-tested; a new surfaced stat with no entry fails CI.

### Term definitions (M6 — must also land verbatim in `architecture.md`)

- **Verified** = *a deterministic formula, covered by the ported upstream-engine
  regression suite, whose formula source is cited to the Warframe wiki.* It does
  **NOT** mean "independently confirmed against current live-game values". Argus
  §6: the suite is "a regression lock, authored bottom-up from the wiki, not a
  spec", and "goldens are hand-transcribed wiki values; a systematic
  transcription error would be locked in as correct." **A wiki transcription
  error, or post-patch game drift, would still present to the user as
  Verified.** The badge asserts *internal determinism + test coverage + a cited
  source*, not ground truth. (If "Verified" still reads as too strong in UX
  review, the fallback label is "Regression-locked" / "Deterministic" — the
  definition is what matters.)
- **Approximation** = the engine models this, but with a self-documented
  simplification (EV instead of distribution, linear instead of per-ability,
  flat average instead of a curve). Never present as Verified.
- **Not modeled** = the engine has no model; the output is absent or a raw
  passthrough. The UI must say so.

| Mechanic / output | Tag | Basis (Argus) |
|---|---|---|
| Base damage / IPS / quantization | **Verified** | Tier A "Locked", bare goldens |
| Elemental combination + mod ordering | **Verified** | tested, `conditional-stack-audit` |
| Crit tiers incl. orange/red/beyond | **Verified** | `crit-utils.test.ts` |
| Multishot, beam, charge/bow timing | **Verified** | goldens |
| Enemy armor/health/shield scaling, armor DR, armor strip, viral, DoT | **Verified** | `ttk.ts` wiki-cited, tested |
| Faction (Bane/Expel) multipliers | **Verified** | `combat-multipliers.ts` |
| Gun CO / Galvanized / Blood Rush / Weeping Wounds | **Verified** | Tier B7 "Locked" |
| Incarnon forms/evolutions | **Verified** | deepest-tested |
| Set bonuses | **Verified** | `set-bonus-audit` |
| Exalted weapons | **Verified** | Tier B9 "Locked" |
| Railjack | **Verified** | RJ1–RJ7 "Locked" |
| `simulateDiscreteTTK` result | **Approximation** | EV status procs not sampled; ~9 direct assertions for 415 LOC |
| Stance / melee DPS | **Approximation** | self-labelled "not full combo-string simulation" |
| Radial / explosion damage | **Approximation** | flat average, no distance falloff |
| Warframe ability damage | **Approximation** | linear `damage × strength`, "sparse" (Tier B5) |
| Archon shard offensive effects (Violet ability-dmg, Topaz on-kill, Emerald toxin/corrosion) | **Approximation / not modeled** | explicit `break;` no-ops |
| Riven grade | **Approximation** | heuristic, "approximate community tables" |
| **Steel Path** | **Approximation — pending verification** until the Phase 1a SP calc-formula task lands; **Verified** after (opt-in `sp` input, new tests vs sourced wiki values) | currently no SP scaling; being added under the calc-formula gate per decisions.md 2026-08-30 |
| Magnetic stacks / shield-gating / overguard / eximus | **Not modeled** | absent from `ENEMY_TYPES` / sim |
| Enemy roster beyond the 19 archetypes (liches, Murmur, Narmer, Zariman, bosses) | **Not modeled** | hardcoded roster |
| **Armor-strip assumption** (S1) | **Not an input / Approximation** | Argus S1: no "assume target N% stripped" toggle. Strip is *proc-derived only* inside the sim (`corrosiveArmorRemaining(stacks)`, `heatArmorRemaining(bool)`, `punctureArmorRemaining(stacks, stripPerStack)`), driven by the build's own status output. UI must not offer a strip-% field implying otherwise. |
| **Headshot model** (S1) | **Approximation (binary)** | Argus S1: `applyHeadshots` is a **boolean** (`SimulationParams`, `DamageSimInputs`), not a hit-rate %/blend. "50% headshots" is not expressible. |
| **Status uptime** (S1) | **Derived, not an input** | Argus S1: `statusTypesOnTarget` is a 0–5 *count of unique status types* (for CO/Galvanized), not an uptime fraction. DoT uptime is an emergent output of the discrete sim. |

---

## Part D — Data flow traces (deliverable §11 cont.)

### (a) User opens the Weapon Builder for Torid and toggles a mod

1. **UI** — user toggles Primed Cryo Rounds in the mod grid. Local React state
   updates `ModSlot[]`. A debounced effect fires.
2. **UI → Services** — calls
   `BuildService.calculateWeapon({ weaponId: "torid", modSlots, arcanes, rivenStatChanges, incarnonStatChanges, scenario })`.
   One in-process call (Services co-located in the Next.js server) or one RPC.
3. **BuildService → CatalogService** — `getWeapon("torid")` returns an enriched
   `Weapon` (catalog loaders imported from `@cephalon/engine`'s `data/`,
   `OverrideSet` already applied, `enrichWeapon` already run, memoised).
   `getModMap()` returns `Map<string,Mod>`.
4. **BuildService** — assembles `SimulationParams` by merging the scenario panel
   (targetFaction, enemy level, `statusTypesOnTarget`, `applyHeadshots`,
   `killStacks`, …) over `DEFAULT_SIM_PARAMS`.
5. **BuildService → engine** — calls
   `calculateWeaponBuildWithArcanes(weapon, modSlots, allMods, incarnonStatChanges, simParams, calcOptions, linkage, rivenStatChanges, arcanes)`.
   Pure, synchronous, deterministic. Returns `CalculatedStats`.
6. **BuildService → engine** — calls `computeDpsContributions(...)` for the
   per-mod delta column.
7. **BuildService → SimulationService** (if the scenario panel shows TTK) —
   `calculateTTK(stats, enemy, level)` and/or `simulateDiscreteTTK(...)`.
8. **BuildService → ConfidenceService** — tags each output stat
   (base/crit/status = Verified; stance DPS, radial, ability contribution,
   discrete-TTK = Approximation). Attaches the "Steel Path not modeled" note if
   the scenario used a high level.
9. **BuildService → UI** — returns a `WeaponBuildResult` view-model: numbers +
   confidence tags + per-mod DPS deltas.
10. **UI** — renders the stat panel, animates the delta vs the previous state,
    shows Approximation badges where tagged. No catalog re-fetch; if the catalog
    is bundled client-side, steps 3–9 can even run in the browser (still no
    network on the calc path).

### (b) AI assistant answers "should I use Primed Bane of Grineer here?"

1. **UI (Ask Cephalon)** — sends the user message + current build context
   (`weaponId`, current `modSlots`, current `scenario`) to the AI endpoint.
2. **AI model** — decides to call tool
   `compare_mod_swap({ build, candidateModId: "primed_bane_of_grineer", removeModId?: <a chosen mod> })`.
   The model computes nothing.
3. **AI tool layer → ComparisonService** — `compareModSwap(...)`.
4. **ComparisonService** — builds two `ModSlot[]` variants (with / without
   Primed Bane) and calls `BuildService.calculateWeapon` for each, reusing the
   trace-(a) path (steps 3–7), against the scenario's `targetFaction` (Grineer)
   and level.
5. **ComparisonService** — diffs the two `CalculatedStats` / `TTKResult`:
   sustained DPS, burst DPS, TTK vs the scenario enemy, mod-capacity cost. Adds
   an annotation: the Grineer faction bonus is applied via
   `combat-multipliers.factionBonusFromStats`; if `targetFaction !== "grineer"`
   it contributes 0.
6. **ComparisonService → ConfidenceService** — faction multiplier = Verified;
   TTK = Approximation (EV status); any ability interaction = Approximation.
7. **AI tool layer → model** — returns the structured `BuildDiff` as the tool
   result.
8. **Model** — composes prose from the numbers: "Against Grineer at level 150,
   Primed Bane of Grineer raises sustained DPS from X to Y (+Z%) and cuts TTK on
   a Bombard from A s to B s, costing 16 mod points. It does nothing versus
   other factions." — explaining engine output, not producing it.
9. **UI** — streams the answer with the confidence badges from step 6.

---

## Part E — Testing strategy (deliverable §12)

### 1. Preserve the upstream engine's 1898 tests as the regression lock

- All 47 `*.test.ts` + the `*-bare-goldens.ts` inline datasets move with the
  code into `packages/engine` (one package — calc + data co-reside). Argus §6:
  they import only `vitest` + `@/lib/*` / `@/data/*`, no setup file,
  `environment: "node"`.
- The package's `vitest.config.ts` keeps the `@`→`packages/engine/src` alias
  (contained alias). Because `calc/` and `data/` are in the **same** package
  tree, every `@/lib/*` and `@/data/*` specifier resolves under that one alias
  with **no import rewriting** (this is why the one-package decision makes the
  "1898 pass" AC achievable — Argus §5).
- CI job **`engine-regression`**: `pnpm --filter @cephalon/engine test`. Merge
  gate: **47 files / 1898 tests / 0 failures / 0 skips**, matching Argus's
  baseline run. Any deviation blocks merge.
- This is a *regression lock, not a spec* (Argus §6) — it answers "did we break
  a formula", not "is the model complete".

### 2. Enforce the calc-formula approval gate in practice

Three layers:
- **CI path filter**: any PR touching `packages/engine/src/calc/**`,
  `packages/engine/src/data/**`, `**/*-goldens.ts`, or the golden-baseline file
  (below) is auto-labelled `calc-formula-gate` and requires (a) a `decisions.md`
  entry in the same PR,
  (b) Athena before/after + source, (c) elevated Themis review. Enforced by a CI
  check that fails if the label is present and no `docs/agent/decisions.md`
  change is in the diff.
- **The existing audit suites already are golden diffs** — they assert exact
  numbers for thousands of concrete builds. A formula change that alters
  behavior breaks them; the break must be justified in the reviewed diff
  (`workflow.md`).
- **Cephalon golden-baseline** (`test/golden/engine-baseline.json`): a script
  computes ~50 canonical builds (weapons across trigger types + Incarnon +
  melee, warframes, one railjack, one archwing) through the public barrel and
  serializes `CalculatedStats` / `TTKResult`. A `verify-engine-baseline` test
  recomputes and byte-compares. This catches drift from **catalog pulls** too,
  not just code edits — a `data/` catalog refresh that moves a number trips it,
  routing the change through review.

### 3. Cephalon's own test layers (Vitest, on top)

- **Service unit tests** — `SimulationParams` assembly over `DEFAULT_SIM_PARAMS`;
  `OverrideSet` application; `ConfidenceService` tagging; view-model shape.
  Call the *real* engine (pure, fast) — no mocking.
- **Integration tests** — `BuildService` + `CatalogService` + real catalog:
  assert end-to-end numbers for ~15 reference weapon builds + ~10 warframe
  builds against known-good values (seeded from the upstream engine goldens / wiki).
- **Comparison / AI-tool tests** — `compareModSwap` returns the correct sign and
  faction-gating (the Primed Bane case: positive vs Grineer, exactly 0
  contribution vs other factions).
- **UI tests** (Playwright + RTL) — weapon builder toggles a mod → stat panel
  updates without full reload; compare view renders a diff; confidence badges
  appear on Approximation rows; scenario simulator shows the Steel Path caveat.

### 4. Confidence-metadata tests

- Table-driven: every mechanic in the Part C2 map has exactly one tag; every
  stat surfaced by a Service view-model carries a tag.
- Negative test: the Approximation / Not-modeled set (Steel Path, stance DPS,
  radial falloff, ability damage, Archon offensive shards, riven grade,
  magnetic/overguard) can **never** resolve to Verified.
- Snapshot the full confidence map; a new surfaced stat without an entry fails
  CI.

### 5. CI ordering

`typecheck` → `engine-regression` (1898) → `verify-engine-baseline` →
`service + integration` → `ui`. Engine tests run in `node` env, unchanged from
the upstream engine.

---

## Part F — Keep / wrap / refactor / rewrite / defer (deliverable §10 cross-ref)

Honors "preserve as much as possible". "WRAP" = unchanged code, called through a
Cephalon Service. God-file decomposition and gap-filling are explicitly LATER
phases with their own gates.

| Subsystem | Files (vendor/upstream-engine) | Phase 1 action | Rationale |
|---|---|---|---|
| Core weapon calc | `calc/calculator.ts` (`calculateWeaponBuild` / `…WithArcanes`) | **KEEP verbatim + WRAP** in `BuildService` | 2,227-LOC god file but golden-locked; no touch in Phase 1 |
| TTK / discrete sim | `calc/ttk.ts` | **KEEP verbatim + WRAP**; expand characterization tests before any later refactor | thin coverage (~9 assertions / 415 LOC) |
| Warframe build | `calc/calculator.ts` (`calculateWarframeBuild`, `applyWarframeShardsAndArcanes`) | **KEEP + WRAP** | survivability golden-locked |
| Crit / combat-mult / fire-rate / melee-combo | `crit-utils.ts`, `combat-multipliers.ts`, `effective-fire-rate.ts`, `melee-combo.ts` (+ stance maps) | **KEEP verbatim** | well tested |
| Elemental combos | `calculator.ts` `ELEMENTAL_COMBOS` | **KEEP** | tested; constants wiki-cited |
| Arcanes | `arcane-calculator.ts`, `arcane-handlers.ts` (2,080), `arcane-proc-model.ts`, `arcane-behavior-registry.ts` | **KEEP verbatim + WRAP**; surface thin-coverage areas as Approximation | `if (id===…)` ladder decomposition deferred to a gated phase |
| Rivens (grader) | `riven-calculator.ts` | **KEEP + WRAP**; surface as **Approximation** | heuristic; no generation |
| Incarnon | `incarnon-active-weapon.ts` + `data/incarnon*.ts` | **KEEP verbatim** | deepest-tested |
| Set bonuses | `set-bonuses.ts` | **KEEP** | `set-bonus-audit` green |
| Companion / Archwing / Necramech / Railjack | `companion-calculator.ts`, `archwing-calculator.ts`, `railjack-calculator.ts` | **KEEP + WRAP** | tested; preserved even though lower Cephalon priority |
| Ability TTK / scaling registry | `ability-ttk.ts`, `codex/ability-scaling-registry.ts` | **KEEP + WRAP**; surface as **Approximation** (linear model) | Argus Tier B5 "sparse" |
| DPS contributions | `dps-contributions.ts` | **KEEP + WRAP** | powers the per-mod delta column |
| Overrides + catalog-assembly de-singleton | `overrides/data-overrides.ts` (+ delete `data-overrides-client.ts`), `weapons/effective-data.ts` (8 accessors), `overrides/arcane-effect-overrides.ts` | **REFACTOR (structural, no formula change) — ~5 files / ~40 call sites** (M3): remove `overrideCache` + `window` + `= getOverrides()` defaults; `apply*`/`merge*`/`getEffective*` take an explicit `OverrideSet`. `effective-data.ts` **stays in `packages/engine`** (M4). Merged with orchestration lift into one task. | server multi-tenant safety |
| Build orchestration | `builds/build-stats.ts`, `builds/loadout-stats.ts` | **REFACTOR (light)** — split pure resolvers out of `build-storage.ts`; lift into `packages/engine/src/orchestration/` **and refactor to take catalogs as parameters** (~20 no-arg call sites). Same task as the de-singleton (same call graph). | preserve tested orchestration logic; acknowledged: adds ~913 LOC to the clean-room re-derivation surface (O1) |
| Riven resolve | `warframe-arsenal/riven-resolve.ts` | **MOVE** into engine `support/` | verified pure, misfiled only |
| Catalog data | `src/data/**`, `data/mod-behaviors/**` | **KEEP verbatim** inside `packages/engine/src/data/` (one package — Argus §5) (**game-data gate**) | 1898 tests calibrated to it; re-derivation unsupported; `lib` ⇄ `data` bidirectional coupling blocks a 2-package split now |
| Path aliases (`@/lib/*` + `@/data/*`) | closure-wide | **KEEP** the `@` alias contained in `packages/engine` config — **genuinely no codemod** (one package, all specifiers resolve in one tree) | closest to upstream; zero import churn |
| Data/code package split | `data/` + `types.ts` + `item-behavior-types.ts` (+ `set-mod-catalog.ts`) | **DEFER** — documented future task: move 2–3 pure files, re-point ~26 importers, scoped `@/data/*` codemod (~75 non-test + ~81 test statements, 24 modules). Argus: "~1 mechanical commit." Trigger: commercial-pivot plan or a 2nd catalog consumer. | preserve the AGPL-surface / DE-facts separation rationale without paying M1/M2 cost in Phase 1 |
| Game constants (2700, S-curve coeffs, `ENEMY_TYPES`, modifier tables) | scattered in `ttk.ts`, `calculator.ts`, `combat-multipliers.ts` | **DEFER** — later task to extract a dated `game-constants.ts` (value-preserving = not a formula gate; any value change is) | Argus drift risk; not Phase 1 |
| Steel Path | new opt-in `sp` input in `SimulationParams` + scaling in `ttk.ts` (`scaleHealth`/`scaleArmor`/level shift/damage attenuation) + dated `game-constants` entries | **ADD in Phase 1a under the calc-formula gate** (user decision, decisions.md 2026-08-30): Argus sources multipliers → Athena before/after → user sign-off with values → Codex → elevated Themis → Apollo (1898/1898 unchanged with `sp` off, + new SP tests). Sequenced after engine/test import, before the Scenario Simulator UI. | user scoped it into Phase 1; opt-in branch keeps the regression lock intact |
| Ability damage formulas, Archon offensive shards, radial falloff, magnetic/overguard/eximus, expanded enemy roster | — | **DEFER** — each its own later formula-gated task, each preceded by an Argus sourcing pass | out of Phase 1 scope |
| `calculator.ts` / `arcane-handlers.ts` decomposition | — | **DEFER** — later refactor phase, gated, needs characterization-test expansion first | high risk, thin safety net |
| the upstream engine app / components / API routes / Prisma / auth / bot / arsenal / `@wfcd/*` | `src/app`, `src/components`, `prisma/`, `src/lib/{auth,bot,site,warframe-arsenal}` | **DO NOT IMPORT** — build native in `apps/web` | AGPL surface minimization + not reusable; not in the closure |

---

## Part G — Phase 1 implementation plan

Each task is sized for one `/start-task` run (Argus → Codex → Themis/Apollo as
the workflow row dictates) with its own acceptance criteria. Ordered; later
tasks depend on earlier ones.

**Phase 1 is split into three milestones (M5) — each its own approval point:**
- **1a — engine extraction** (tasks 1–6): isolate the engine as one package,
  preserve the 1898-test suite, de-singleton catalog assembly, define the API
  barrel. Ends at a tested engine with no UI.
- **1b — service layer + gates** (tasks 7–11): Cephalon's services, confidence
  model, comparison logic, the golden-baseline / formula-gate CI, and the
  **Steel Path scaling model (task 11)** as the first exercise of the
  calc-formula gate. Task 11 carries its own `decisions.md` sign-off on the
  wiki-sourced values.
- **1c — UI foundation + surfaces** (tasks 12–16): design system + the four
  builder/sim/compare surfaces. Each surface runs its **own**
  Argus→Athena→approval→Codex→Apollo cycle under the `workflow.md` "UI change"
  row — 1c is a product-build milestone, not one task.

**Blocked-until-approved:** the whole plan (Part A decisions); **task 2** (the
game-data bundling gate — it is the linchpin: tasks 3–11 all need the catalog
present, O2). **Task 11** (Steel Path) is itself a calc-formula gate needing
its own `decisions.md` sign-off on the sourced values; **task 15** (Scenario
Simulator) requires task 11 complete.

---

### Milestone 1a — engine extraction

#### 1. Scaffold the monorepo
pnpm workspaces: `apps/web` (Next.js App Router + TS) + `packages/engine`,
shared `tsconfig.base.json`, root Vitest + Playwright config, CI skeleton
(typecheck + empty test jobs).
**AC:** `pnpm install` clean; `pnpm -r typecheck` green; CI green on an empty
app; `decisions.md` entries for repo shape + stack landed.

#### 2. Import the engine (calc + data + types + support) into `packages/engine`  — GAME-DATA BUNDLING GATE
**Blocked until the game-data gate is signed off** (it covers the `src/data/**`
copy). Copy the full 89-file closure — `src/lib/calc/**` + the 14 `support/`
helpers + `types.ts` + **`src/data/**` + `data/mod-behaviors/**`** — into
`packages/engine/src/`, preserving the internal tree so `@/lib/*` and `@/data/*`
resolve under one contained `@` alias (`tsconfig.json` + `vitest.config.ts`).
Preserve `LICENSE` (AGPL-3.0) verbatim at package + repo root; add `NOTICE`
(upstream URL, rev `e66896a`, the upstream project→the upstream engine rename, Dart-port provenance).
Add `PROVENANCE.md` for `data/` (source, license note, DE fan-facts statement,
refresh = curated pull). Add the CI import-guard.
**AC:** `decisions.md` game-data-bundling entry (source/license/size/refresh);
`packages/engine` typechecks; **no codemod / no import rewriting** was needed;
import-guard passes (**zero** matches for react/next/@prisma/next-auth/@wfcd/
process.env/`fetch(`/window/document/localStorage — task 5 clears the
`data-overrides.ts` blemish; a temporary allowlist for that one file is
permitted until then); measured `tsc` time recorded against a CI budget.

#### 3. Port the upstream engine test suite
Move all 47 `*.test.ts` + `*-goldens.ts` into `packages/engine` next to their
targets. Wire `vitest.config.ts`. Add CI job `engine-regression`.
**AC:** `pnpm --filter @cephalon/engine test` → **47 files / 1898 tests / 0
failures / 0 skips**; `engine-regression` is a required merge check;
`verify-engine-baseline` placeholder present (filled in task 10).

#### 4. Define the public API barrel
`packages/engine/src/index.ts` re-exports **exactly** the ~15 entry points +
the input/output types from Part C. Everything else marked internal.
**AC:** the documented surface matches Argus §2's entry-point list; a test that
imports **only** from `@cephalon/engine` runs a weapon calc + a warframe calc +
a `calculateTTK` and asserts sane output; `apps/web` can `import` the barrel.

#### 5. Catalog-assembly de-singleton + orchestration lift  (structural, no formula change — M3/M4/O1)
One pass over the catalog-assembly call graph (~5 files / ~40 call sites):
- `overrides/data-overrides.ts`: delete `overrideCache`, all `window` /
  lazy-`import("./data-overrides-client")` code; delete `data-overrides-client`
  from the package; remove the `= getOverrides()` default params —
  `apply*Overrides` / `mergeOverrideLists` / `deepMergeOverrideFields` take a
  **required** `OverrideSet`.
- `weapons/effective-data.ts` (stays in the package): the 8 `getEffective*`
  accessors take an explicit `overrideSet` param. `overrides/arcane-effect-overrides.ts`
  likewise.
- split `resolveSavedArcaneSlots` / `resolveDefaultCompanionWeapon` /
  `WarframeBuildData` out of `build-storage.ts` into pure
  `support/build-resolvers.ts`; move `warframe-arsenal/riven-resolve.ts` into
  `support/`.
- lift `build-stats.ts` + `loadout-stats.ts` into
  `packages/engine/src/orchestration/`, **refactored to receive catalogs
  (`Weapon[]` / `Map` / `OverrideSet`) as parameters** — the ~20 no-arg
  `getEffective*()` calls are rewritten.
**AC:** `engine-regression` **1898/1898** green; `override-merge.test.ts` +
`build-url.test.ts` + `loadout-save.test.ts` green; new concurrency test (two
`OverrideSet`s applied concurrently don't cross-contaminate); import-guard
passes with **no** `data-overrides.ts` allowlist; a typecheck proves **no
zero-arg `getEffective*` / `getOverrides` call remains anywhere in
`packages/engine/src`**.

#### 6. Reference clone + upstream-sync runbook
Obtain a full-history clone of the upstream engine (outside the monorepo). Write
`docs/agent/upstream-sync.md`: the curated-pull cadence, the catalog-only vs
formula-gate split, the data/code future-split recipe (Repository-shape
decision).
**AC:** reference clone documented; runbook committed; `decisions.md`
upstream-sync entry landed.

---

### Milestone 1b — service layer + gates

#### 7. CatalogService + ConfidenceService
`CatalogService`: import catalog loaders + `enrichWeapon` + `effective-data.ts`
accessors from `@cephalon/engine`; build + apply an `OverrideSet` (static JSON
now), run enrich, expose `getWeapon` / `getWarframe` / `getModMap` /
`getArcanes`, memoise. `ConfidenceService`: the Part C2 map (incl. the M6
definitions and the S1 not-an-input rows) as code + `tag(stat)` API.
**AC:** unit tests for catalog retrieval + override application; confidence-map
snapshot test; negative test (Approximation / Not-modeled set can't be
Verified); every stat a Service will surface has a tag.

#### 8. BuildService + SimulationService
`BuildService`: assemble `SimulationParams` over `DEFAULT_SIM_PARAMS`, call
`calculateWeaponBuildWithArcanes` / `calculateWarframeBuild` +
`applyWarframeShardsAndArcanes`, run `computeDpsContributions`, return
confidence-tagged view-models; wrap engine `orchestration/` for full loadouts.
`SimulationService`: `calculateTTK` / `simulateDiscreteTTK` / `runDamageSim`
with the EV-status + no-Steel-Path caveats attached.
**AC:** integration tests for ~15 reference weapon builds + ~10 warframe builds
vs known-good numbers; scenario sim returns TTK with the EV-status caveat in the
payload; view-models carry per-stat confidence tags.

#### 9. ComparisonService
`compareBuilds(a, b, scenario)` + `compareModSwap(build, candidateModId,
removeModId?)`; structured `BuildDiff`; faction-gated-mod annotation.
**AC:** unit tests incl. the Primed Bane of Grineer case (positive diff vs
Grineer, exactly 0 contribution vs other factions); diff includes mod-capacity
delta.

#### 10. Engine golden-baseline gate
Script → `test/golden/engine-baseline.json` for ~50 canonical builds via the
barrel. `verify-engine-baseline` test recomputes + byte-compares. CI path-filter
check: PRs touching `packages/engine/src/calc/**`, `packages/engine/src/data/**`,
`**/*-goldens.ts`, or the baseline require a `decisions.md` change in the same
diff.
**AC:** baseline committed; `verify-engine-baseline` green; a scratch-branch
formula tweak demonstrably fails CI with the `calc-formula-gate` label and the
missing-`decisions.md` check.

#### 11. Steel Path scaling — first calc-formula gate  (user decision, decisions.md 2026-08-30)
Run under the `workflow.md` "Calc-formula change" row, using the gate machinery
built in task 10. Add Steel Path as an **opt-in `sp` input** so non-SP behavior
is byte-identical.
- **Argus sourcing pass** — wiki-cited values for: the SP enemy-level shift,
  the health multiplier, the armor multiplier, the flat damage
  resistance/"attenuation", and how each composes with the existing `ttk.ts`
  S-curve. Output: a sourced before/after spec.
- **Athena** before/after formula + every constant's source.
- **User sign-off** in `decisions.md` (the values, not just "yes").
- **Codex** — `sp` field on `SimulationParams` + `DEFAULT_SIM_PARAMS`; scaling
  in `ttk.ts` (`scaleHealth`/`scaleArmor`/level shift/attenuation); the new SP
  numbers in a dated `game-constants` block.
- **Themis** — elevated scrutiny.
- **Apollo** — full ported suite **1898/1898 unchanged with `sp` off** + new SP
  characterization tests vs the sourced values; `verify-engine-baseline`
  updated with SP-on cases and the update justified in the same PR + a
  `decisions.md` entry.
**AC:** `sp` off ⇒ every existing test byte-identical; `sp` on ⇒ new tests
match wiki-sourced numbers; `decisions.md` carries the formula + sources;
`ConfidenceService` upgrades Steel Path from "Approximation — pending
verification" to **Verified** only after this lands.

---

### Milestone 1c — UI foundation + surfaces

_Each surface (13–16) runs its own Argus→Athena→approval→Codex→Apollo cycle
under the `workflow.md` "UI change" row. This milestone is a product-build
phase, not a single approval._

#### 12. Design system foundation
Tokens, dark theme, primitives (Button, Panel, Stat, Table, `<ConfidenceBadge>`
with Verified / Approximation / Not-modeled variants), app shell, Ctrl+K command
palette scaffold.
**AC:** a components page (or Storybook) renders every primitive; WCAG AA
contrast pass; `<ConfidenceBadge>` is the component surfaces 13–16 consume.

#### 13. Weapon Builder UI
Weapon picker (Ctrl+K), mod grid, arcane slots, riven stat input, scenario
panel (faction, enemy level, `statusTypesOnTarget`, headshot toggle,
kill-stacks). **The panel must not imply precision the engine can't deliver
(S1):** headshots is a **binary toggle** (not a %), there is **no armor-strip
% field** (strip is proc-derived inside the sim), `statusTypesOnTarget` is a
**count of unique status types** (0–5) not an uptime slider. Live stat panel
with per-mod DPS delta + confidence badges. Calls `BuildService` only.
**AC:** toggling a mod updates stats without a full reload; Approximation badges
render on stance DPS / ability-contribution / radial rows; the S1 inputs are
labelled for what they are; Playwright happy-path test green; no direct
`@cephalon/engine` import in the component.

#### 14. Warframe Builder UI
Mods, arcanes, Archon shards, ability S/D/E/R panel, EHP / DR readout. Ability
damage section labelled Approximation; Archon offensive-shard fields show a
"not modeled" note.
**AC:** a reference frame's numbers match `BuildService`; Archon
Violet/Topaz/Emerald offensive fields visibly marked Not-modeled; Playwright
happy-path green.

#### 15. Scenario Simulator view  (requires task 11 — Steel Path — complete)
Standalone: hand-enter or load a build, pick an enemy archetype (the 19) +
level, **Steel Path toggle** (backed by the task-11 `sp` model), show paper DPS
+ discrete TTK via `runDamageSim` / `simulateDiscreteTTK`. The SP toggle
carries the confidence tag from `ConfidenceService` (Verified once task 11
lands; "Approximation — pending verification" if this UI somehow ships first).
Remaining honest limits still surfaced: **no armor-strip-% or headshot-%
inputs (S1)** — the sim derives both; enemy roster limited to the 19
archetypes; magnetic/overguard/eximus not modeled.
**AC:** output matches `SimulationService`; SP toggle changes results per the
task-11 model and shows its confidence tag; S1 + roster + not-modeled limits
visible in UI and in the exported result; Playwright test asserts the SP toggle
and the limitation notes are present.

#### 16. Build Comparison view
Two builds side by side, explained row-by-row diff from `ComparisonService`,
confidence badge per row, faction-sensitive mods annotated.
**AC:** comparing two saved builds shows a diff matching `ComparisonService`;
faction-gated rows annotated; Playwright test green.

**Explicitly deferred out of Phase 1:** the AI tool layer + Ask Cephalon UI
(Phase 2 — the boundary is designed here, built when the assistant feature
lands); a full dated `game-constants.ts` extraction (task 11 adds only the SP
block); ability-damage / Archon-offensive-shard / radial-falloff /
magnetic-overguard / expanded-enemy-roster gap-filling (each its own later
formula-gated task); god-file decomposition; `PlayerContextService` beyond a
stub (depends on Supabase auth/schema gates).

---

## Part H — Major risks (deliverable §13)

Carried forward from Argus + planning-level additions. Each with a mitigation.

| # | Risk | Source | Mitigation |
|---|---|---|---|
| 1 | **Licensing — AGPL §13 couples Cephalon's server source to disclosure; a commercial pivot needs a grant from unidentifiable parties or a rewrite.** `package.json` "MIT" vs `LICENSE` "AGPL" contradiction; unstated Dart-origin license; no CLA; 1-squashed-commit clone hides the MIT→AGPL line; **maintainer treated as unreachable — no outreach track**. | Argus §8; decisions.md 2026-08-30 | Build under full AGPL now; hard `packages/engine` boundary so a clean-room swap is a package replacement, and the golden-baseline corpus is built to double as that rewrite's spec; keep only the legally required `LICENSE` + `NOTICE`, name the upstream nowhere user-facing and only in `docs/agent/upstream-engine.md` internally; treat the code as AGPL despite the stale `package.json`. **A qualified open-source licensing professional must review before any commercial / closed-source pivot** — this plan documents the risk, it does not clear it. Not legal advice. |
| 2 | **Catalog maintenance is a continuous burden, not a one-time port** — `mods.ts` (22k), `weapons.ts` (15k), `mod-behaviors/batches/`, `riven-dispositions.ts` drift every DE patch; the `scripts/` pipeline is self-described "scratch". | Argus §2, §3 | Curated-pull upstream-sync (never auto-merge); `verify-engine-baseline` flags any behavioral drift a catalog pull introduces; `data/` isolated under `packages/engine/src/data/` with a `PROVENANCE.md`; own a refresh cadence (per major patch). |
| 3 | **Game-constant drift** — `2700`, S-curve coeffs, `ELEMENTAL_COMBOS`, `ENEMY_TYPES`, damage-type modifier tables are hardcoded across `ttk.ts` / `calculator.ts` / `combat-multipliers.ts`; no "constants last verified" gate. | Argus §7 | Deferred `game-constants.ts` extraction task (value-preserving); until then the golden-baseline + audit suites catch changes; every constant value change routes through the calc-formula gate. |
| 4 | **`calculator.ts` (2,227 LOC, `calculateWeaponBuild` ~1,100 LOC) and `arcane-handlers.ts` (2,080 LOC) are god files** — high risk for anyone changing formula behavior. | Argus §7 | Phase 1 does **not** touch them (WRAP only); decomposition is a later gated phase preceded by characterization-test expansion; `calc-formula-gate` CI label forces review on any edit. |
| 5 | **`simulateDiscreteTTK` (415 LOC) has ~9 direct assertions** and is exactly what "how long to kill" answers call. | Argus §6 | Surface its output as **Approximation** (EV status, not sampled); expand characterization tests before any refactor; golden-baseline includes discrete-TTK cases. |
| 6 | **`overrideCache` singleton + `window` guard + `= getOverrides()` defaults span ~5 files / ~40 call sites** (`data-overrides.ts`, `effective-data.ts` ×8, `arcane-effect-overrides.ts`, ~20 orchestration calls — Themis M3), not one file — unsafe for server-side multi-user use, and under-scoping the fix would leave it half-done. | Argus §4/§7, Themis M3 | Phase 1 task 5 does the whole call graph in one pass (merged with the orchestration lift); AC requires 1898/1898 **plus** a typecheck proving no zero-arg `getEffective*`/`getOverrides` remains in `packages/engine/src`; concurrency test added; import-guard enforces no mutable module state. |
| 7 | **Scenario simulator honesty problem** — the engine has no Steel Path model today; users fake it with raw level; presenting level-scaling as endgame-accurate would mislead. | Argus §2 gap #1; handoff item 7 | User scoped Steel Path **into Phase 1** (task 11) under the calc-formula gate — dedicated Argus sourcing pass, `decisions.md` sign-off on the values, opt-in `sp` branch so non-SP regression stays byte-identical, new SP tests vs wiki. Until task 11 lands, `ConfidenceService` tags SP "Approximation — pending verification"; the Scenario Simulator UI (task 15) is sequenced after task 11. Remaining sim limits (roster of 19, no magnetic/overguard/eximus) stay surfaced. |
| 8 | **Ability damage (linear `damage × strength`) and Archon offensive shards (`break;` no-ops) are the weakest links — and exactly what an AI build assistant leans on.** | Argus §2 gap #2/#3, §7 | Both labelled **Approximation / Not-modeled**; AI tool layer only ever *explains* engine output, never fills the gap itself; gap-filling tasks are later, gated, each with an Argus pass. |
| 9 | **Staying in sync with the upstream engine** — squashed vendor clone, active upstream, formula changes upstream must not silently enter Cephalon. | Argus §8; `workflow.md` | Curated-pull only; full-history reference clone kept outside the monorepo as diff/license oracle; catalog pulls = data-only review; any upstream formula/constant change = calc-formula gate. |
| 10 | **Catalog sync ownership unassigned** — nobody currently owns "is `data/` still correct after patch X". | planning-level | Phase 1 task 2 `PROVENANCE.md` + task 6 `upstream-sync.md` name the refresh process; a recurring "catalog refresh" task type is added to `workflow.md`; golden-baseline is the automated tripwire. |
| 11 | **`SimulationParams` kitchen sink (60+ fields, many per-weapon one-offs)** — any Service or AI tool must know which knobs matter for which build. | Argus §2, §7 | `BuildService` owns `SimulationParams` assembly behind a small typed scenario API; the UI scenario panel exposes only the common subset; per-weapon one-offs resolved from catalog metadata, not user input, where possible. |
| 12 | **Large payload** — ~66k LOC catalog in `packages/engine`; TS typecheck time / CI cost; potential client bundle bloat if shipped to the browser. | Argus §3, §5 | `packages/engine/tsconfig` uses `skipLibCheck` + `incremental`; Services default to server-side calc so the catalog need not ship to the client; measure `tsc` time in task 2 against a CI budget. |
| 13 | **Goldens are hand-transcribed wiki values; "Verified" ≠ live-game-confirmed** — a systematic transcription error or post-patch drift is "locked in as correct" and would present to users as Verified (Themis M6). | Argus §6, Themis M6 | "Verified" is **defined** in Part C2 / `architecture.md` as *deterministic + regression-locked + wiki-cited, not independently confirmed*; where Cephalon adds reference-build integration tests, cross-check a sample against a second source (`@wfcd/items`, live wiki) and record discrepancies. |
| 14 | **External-data ToS / rate limits** if live worldstate or live arsenal ever reach the calc path. | Argus §9 | Architecture keeps external data in server-only wrappers *beside* Services, never on the calc path; the engine stays network-free; any future live-data-on-calc-path proposal is an architecture-gate decision. |
| 15 | **Scenario-simulator input honesty beyond Steel Path (S1)** — the brief's "armor strip %", "headshot %", "status uptime" are **not** first-class engine inputs (strip is proc-derived; `applyHeadshots` is boolean; `statusTypesOnTarget` is a 0–5 count). A UI offering those fields would imply precision the engine can't deliver. | Argus S1 | Part C2 carries all three as explicit "not-an-input / Approximation" rows; tasks 12 + 14 state the constraint and label the controls for what they actually are; no strip-% / headshot-% fields are built. |
| 16 | **`build-stats`/`loadout-stats` lift enlarges the clean-room re-derivation surface by ~913 LOC (O1)** — a future closed-source engine rewrite must reproduce Cephalon-held orchestration, not just the `calculate*` primitives. | Themis O1 | Accepted deliberately under preserve-first; the tradeoff is documented in the orchestration sub-decision; if the clean-room track starts, the orchestrator is flagged as a candidate to re-author service-side then (the 10 tests are serialization tests and travel either way). |
| 17 | **`package.json "license": "MIT"` vs `LICENSE` AGPL (O4)** — SBOM / `license-checker` tooling will report Cephalon's engine dependency as MIT until the maintainer resolves it. | Argus §8, Themis O4 | Until resolved, Cephalon **treats the code as AGPL** in all its own docs/notices and states plainly (in `architecture.md` §8 + `NOTICE`) that automated license scans of the upstream will be wrong; the contradiction is question (c) to the maintainer. |
| 18 | **Next 16.2.10 / React 19.2.3 "bleeding-edge stack" worry (O3)** — perceived risk of matching the upstream engine's framework versions. | Themis O3 | Low: both are **patch** releases and mature by the current date; Argus §4 confirms **no engine file imports React or contains JSX**, so `reactCompiler` never touches engine code. `apps/web` picks its own Next/React versions independently of the engine. |

---

## Part I — Consolidated acceptance criteria for THIS investigation task

**Status of the deliverable (M7):** the brief asks for one assembled
`architecture.md` with 13 sections. It does **not exist yet** — there is
`investigation.md` (§§1–9) and this `plan.md`. Per the coordinator, the merged
`architecture.md` is assembled **after the Part A decisions are approved** (the
coordinator runs that assembly); Part F of this plan is written to be lifted
**verbatim as §10**. This section is the checklist that assembly must satisfy.

`architecture.md` is complete and approvable when:

1. **All 13 sections present.** **§§1–9 come from `investigation.md`** (Argus);
   **§§10–13 come from this plan** (§10 ← Part F; §11 ← Parts B/C/C2/D; §12 ←
   Part E + Part G; §13 ← Part H). Every claim is cited to a `vendor/upstream-engine/`
   file (and line where Argus gave one). The corrected Argus §4 sentence about
   `src/data → src/lib` edges (25 `item-behavior-types` + 9 `types` + 1
   `set-mod-catalog`) is carried in.
2. **§11 defines a hard engine boundary**: `@cephalon/engine` is a
   framework-agnostic package with typed inputs/outputs and **no** React, Next,
   Prisma, next-auth, `@wfcd/*`, network, `process.env`, DOM, or mutable module
   state — stated as a CI-enforced import rule over `packages/engine/src`.
3. **§11 includes the layered diagram + component list** (Part B) with
   per-component responsibilities and "must not" constraints, and the packaging
   strategy: **monorepo; the engine ships as ONE `packages/engine` package
   (calc + data + types + support + tests); contained `@` alias; no Phase-1
   codemod; data/code separation booked as a documented future task** with the
   costed recipe.
4. **§11 enumerates the public API surface** (Part C): the ~15 preserved
   the upstream engine entry points with signatures, the systems each covers, the type
   surface, and how catalog data is supplied (`CatalogService` assembles and
   passes explicit `Weapon[]` / `Map<string,Mod>`; no ambient singleton).
5. **§11 resolves the coupling blemishes** Argus named, at their **real scope**
   (Themis M3/M4): the `overrideCache` singleton + `window` guard +
   `= getOverrides()` defaults across ~5 files / ~40 call sites (host-applies
   -overrides, explicit `OverrideSet`), and `build-stats`/`loadout-stats`
   lifted into engine `orchestration/` **and refactored to take catalogs as
   parameters** — one merged Phase-1 task. `effective-data.ts` placement is
   decided (stays in `packages/engine`).
6. **§11 traces both data flows** end to end with every layer hop: (a) weapon
   builder mod toggle for Torid, (b) AI "Primed Bane of Grineer?" answer —
   showing the AI never computes.
7. **§11 / §12 specify the confidence model** (Part C2): the **defined** terms
   Verified ( = deterministic + regression-locked + wiki-cited, *not*
   live-game-confirmed) / Approximation / Not-modeled, a tag for every
   mechanic, owned by `ConfidenceService`, snapshot-tested, with Steel Path /
   stance DPS / radial falloff / ability damage / Archon offensive shards /
   riven grade / the S1 armor-strip, headshot-binary, status-uptime rows
   explicitly not Verified.
8. **§12 testing strategy** covers: the 1898 tests preserved as a merge-gating
   regression lock (**one package, contained alias, genuinely no rewrite**);
   the calc-formula gate enforced by a CI path-filter over
   `packages/engine/src/{calc,data}/**` + mandatory `decisions.md` entry + a
   golden-baseline byte-compare that also catches catalog drift; Cephalon's own
   service / integration / UI layers; confidence-metadata tests.
9. **§12 Phase 1 breakdown** is the ordered **16-task list in three milestones
   1a/1b/1c** (Part G), each task `/start-task`-sized with its own acceptance
   criteria, explicitly favouring KEEP/WRAP over rewrite (Part F backs this),
   with the **game-data bundling gate (task 2) flagged as the linchpin
   blocking tasks 3–11**, **Steel Path as task 11 under the calc-formula gate**
   (its own `decisions.md` sign-off on sourced values), and **task 15 (Scenario
   Simulator) requiring task 11 complete**.
10. **§13 risks** are the Part H table (18 rows) — every row names a file / dep
    / mechanic / licensing fact and carries a mitigation; no platitudes.
11. **Licensing (§8 + this plan's decision)** lays out the four options, the
    chosen path (build on full AGPL now, minimal name footprint, **no
    maintainer track**, treat as AGPL despite the stale `package.json`), the
    concrete near-term actions, the note that SBOM tooling will misreport the
    upstream as MIT, and an explicit "not legal advice / licensing professional
    required before any commercial or closed-source pivot" disclaimer.
12. **Every material decision uses the decision shape** with an explicit
    "Approval requested" line, and the set recorded in `decisions.md`
    (2026-08-30): **repo shape & one-package engine**; **no-codemod extraction +
    R2 build-step choice + documented future data/code split**; **licensing
    path (AGPL now, no maintainer track, minimal name footprint)**;
    upstream-sync; **game-data bundling — APPROVED**; **Steel Path — scoped into
    Phase 1 as the first calc-formula gate**; stack confirmation;
    catalog-assembly de-singleton + orchestration lift (merged, structural).
13. **Themis has re-reviewed** this revision (per the `workflow.md`
    "Engine import / extraction" row) and the user has given explicit sign-off
    on the Part A decisions before any Phase 1 task starts.

---

## Stop

This is the revised plan (Revision 3 — Themis-re-reviewed, user Part A
decisions of 2026-08-30 folded in). No implementation, no Codex handoff. The
merged `architecture.md` is assembled next by the coordinator; Phase 1a task 1
does not start until that assembly is presented and milestone 1a is approved.
