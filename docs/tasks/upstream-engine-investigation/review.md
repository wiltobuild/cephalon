# Themis review — the upstream engine engine investigation & target architecture

Reviewer: Themis (independent). Read-only. Reviewed: `brief.md`, `investigation.md`
(Argus), `plan.md` (Athena), `docs/agent/{project-profile,workflow,decisions}.md`,
and spot-checks against `vendor/upstream-engine/` @ `e66896a`.

"Must-fix" = the architecture doc / plan must address this before the user should
approve it (a wrong or unsupported claim, a missing brief deliverable, an unsafe
Phase-1 refactor, or a risk that changes a Part A decision).

Bottom line up front: the **direction** is sound (pnpm monorepo, preserve the 1898
tests as a regression lock, build on full AGPL now behind a hard package boundary,
defer Steel Path). But the **packaging mechanics** in two Part A decisions are
internally contradictory and rest on an Argus undercount, and two of the three
Phase-1 refactors are scoped to "one file" when the code says otherwise. These are
load-bearing on decisions the user is being asked to approve. Needs another
planning pass before sign-off.

---

## Must-fix

### M1. "Contained `@` alias, no codemod" is incompatible with separate `engine` + `warframe-data` packages

**Where:** Decision "Engine-packaging & extraction strategy" (Approval requested:
"contained `@` alias, no codemod, source copied close to upstream"); Decision
"Repository shape" (separate `packages/engine` and `packages/warframe-data`); Part
E §1; tasks 2–4.

**Problem:** Argus §5 assumed a *single* extracted package when it said "keep a
`@/*` alias pointing at the package `src/`". Athena splits the closure into two
packages (`engine` = `src/lib/**`, `warframe-data` = `src/data/**`) but carries the
single-package alias plan forward unchanged. Measured against the real tree:

- **196** `@/data/*` import specifiers in code that lands in `packages/engine`
  (115 in `src/lib/{calc,weapons,mods,codex}/*.ts` non-test) plus **81** in the
  ported test files — every one crosses the new package boundary.
- **23** distinct `@/data/*` modules referenced (`@/data/mods`, `@/data/weapons`,
  `@/data/incarnon`, `@/data/riven-dispositions`, …).
- A `packages/engine/vitest.config.ts` whose only alias is `@ → packages/engine/src`
  (task 4 as written) will fail to resolve every `@/data/...` import in both the
  engine source and the ported goldens. Task 4's AC ("47 files / 1898 tests / 0
  failures") cannot pass under the stated config.

Only three ways out, and each contradicts a stated decision: (a) share one `@/*`
alias root across both packages — which is exactly the cross-consumer "footgun"
Argus §5 named and defeats the isolation rationale in the Repository-shape
decision; (b) run the `@/data/*` → `@cephalon/warframe-data` codemod — which
Athena explicitly defers "indefinitely"; (c) keep it one package — which
contradicts the Repository-shape decision.

**Fix:** Pick and document the resolution. The defensible one is a **scoped
codemod of just the `@/data/*` specifiers** (→ `@cephalon/warframe-data`) plus the
35 `@/lib/*` specifiers inside `src/data/**` (→ `@cephalon/engine`, see M2),
leaving the ~40 intra-`src/lib` `@/lib/*` specifiers on the contained alias. That
is a bounded, scriptable change (~230 specifiers, mechanical) and it is the honest
cost of the two-package split. The plan should state the specifier counts and stop
describing extraction as alias-only / no-codemod.

### M2. The `engine` ⇄ `warframe-data` split is a dependency cycle, not a clean cut — and Argus undercounted it

**Where:** Decision "Repository shape" — "Why" bullet: *"a future clean-room engine
rewrite must not drag 66k LOC of catalog with it, and a catalog refresh must not
touch AGPL calc code"*; Decision "Data-catalog ownership"; task 3; Part B
dependency rule ("arrows point down / inward only").

**Problem:** `src/data/**` does **not** depend only on `@/lib/types`. Measured:

| Imported by `src/data/**` | Count | Target package under the plan |
|---|---|---|
| `@/lib/types` | 9 | `warframe-data`-local or shared types |
| `@/lib/codex/item-behavior-types` | **25** | `packages/engine/src/support/` (Argus §2 closure helper) |
| `@/lib/mods/set-mod-catalog` | 1 | `packages/engine/src/support/` (Argus §2 closure helper) |

The 25 importers are `src/data/arcane-behaviors.ts`, `src/data/mod-behaviors/index.ts`,
`src/data/mod-behaviors/verified-mods.ts`, and all 22 `src/data/mod-behaviors/batches/*.ts`.
Meanwhile `packages/engine` code (`calc/calculator.ts`, `calc/arcane-*.ts`,
`weapons/effective-data.ts`, `weapons/weapon-enrich.ts`, `mods/mod-behavior-registry.ts`,
…) imports `@/data/*`. So the two proposed packages import each other.

Argus §4 states *"Only imports are `@/lib/types` (9×) and two tiny intra-`data`
cross-imports"* — that is materially wrong (it misses 26 `@/lib/**` edges into the
codex/mods helpers), and Athena inherited the error. The "catalog refresh never
touches AGPL calc code" and "clean-room engine won't drag the catalog" claims — a
stated reason to have two packages at all — do not hold while `mod-behaviors/**`
depends on engine-side modules.

**Fix:** Re-classify `item-behavior-types.ts` (a pure types module — zero imports)
and `set-mod-catalog.ts` into `packages/warframe-data` rather than engine
`support/`, or into a third leaf `packages/warframe-types` that both depend on.
Verify `set-mod-catalog.ts`'s own import list first. Then re-assert the dependency
DAG with the corrected package membership, and correct the Argus §4 sentence in the
merged `architecture.md`.

### M3. Task 5 (de-singleton `data-overrides.ts`) is scoped to "one file"; it is ~5 files and ~40 call sites

**Where:** Decision "`overrideCache` singleton" — "Why": *"confined to one file
(`data-overrides.ts`) plus deleting `data-overrides-client` … not a change to
`calculator.ts` … Safe for Phase 1."* Task 5 AC checks only
`override-merge.test.ts` + a new concurrency test.

**Problem:** `getOverrides()` (the singleton read) is not confined to
`data-overrides.ts`:

- `src/lib/weapons/effective-data.ts` calls `getOverrides()` **16 times** across
  its **8** `getEffective*` accessors (`getEffectiveWeapons`, `getEffectiveModsMap`,
  `getEffectiveWarframesMap`, `getEffectiveCompanionsMap`, arcanes, archon shards,
  archwings, necramechs). This file is a closure/support helper.
- `src/lib/overrides/arcane-effect-overrides.ts` (closure helper) calls
  `getOverrides()`.
- `applyWeaponOverrides` / `applyModOverrides` / `applyWarframeOverrides` / … are
  "pure" only if the caller passes the 2nd arg; their **default parameter is
  `= getOverrides()`** (`data-overrides.ts:117–145`). Argus §4's "the calc-relevant
  exports … are pure" is true only under that caveat.
- `src/lib/builds/build-stats.ts` and `loadout-stats.ts` — the files task 6 lifts
  into `packages/engine/src/orchestration/` — call `getEffective*Map()` /
  `getEffectiveWeapons()` **~20 times with no arguments**, relying entirely on the
  ambient singleton being populated.

Removing the singleton forces a signature change on all 8 `getEffective*`
accessors, on `arcane-effect-overrides.ts`, and then threads an `OverrideSet` (or
a pre-merged catalog) through ~20 call sites in the two orchestration files. It is
not a formula change — but it is not "one file", and it directly couples task 5 to
task 6. The AC as written would pass while leaving `effective-data.ts` and the
orchestration files broken or still singleton-bound.

**Fix:** Rewrite the decision's scope and task 5/6 ACs to cover `effective-data.ts`
(8 accessors), `arcane-effect-overrides.ts`, the default-param removal, and the
orchestration call sites. Require `engine-regression` (1898/1898) *plus* a
typecheck of `orchestration/` with no ambient-catalog access as the AC. Consider
merging tasks 5 and 6 since they touch the same call graph.

### M4. `effective-data.ts` / `enrichWeapon` package placement is left undecided in a document meant for approval

**Where:** Part B component table: *"`enrichWeapon` lives here or in engine
`support/`"*; Part C "How catalog data is supplied" implies `CatalogService` (in
`apps/web`) owns enrich; Part F lists `effective-data.ts` as a KEEP under the
engine closure; task 6 orchestration imports `getEffective*` from it.

**Problem:** Where `effective-data.ts` (and `weapon-enrich.ts`) lands determines
(a) whether the engine still contains override-cache reads (M3), (b) whether
`packages/engine` imports `@/data/*` for `weapon-radial-attacks` / `weapon-passives`
(it does today), and (c) whether `CatalogService` re-implements or re-exports the
`getEffective*` layer. The orchestration lift (task 6) can't be specified until
this is fixed. An architecture doc that the user signs off "before any Phase 1
coding" cannot leave its own catalog-supply seam as "here or there".

**Fix:** Decide it. Recommended: `enrichWeapon` + the radial/passive data go to
`packages/warframe-data`; `effective-data.ts`'s override-merge accessors are
**not** carried into the engine — `CatalogService` owns "load → apply OverrideSet
→ enrich → hand `Weapon[]`/`Map` to the engine". Then task 6's orchestration files
must be refactored to receive catalogs as parameters (reinforces M3 scope).

### M5. Phase 1 = 16 tasks including a full design system + 4 UI builders is not "foundation only"

**Where:** Part G (16 tasks); `project-profile.md`: *"Phase 1 is foundation only"*;
plan's own grouping "1–7 isolate+preserve / 8–11 service layer / 12–16 design
system + product surfaces".

**Problem:** Tasks 12–16 (design-system foundation, Weapon Builder, Warframe
Builder, Scenario Simulator, Build Comparison) are a product-build phase with its
own Argus→Athena→approval→Codex→Apollo cycle *per surface* under the `workflow.md`
"UI change" row. Bundling them with engine extraction under one "Phase 1" label
understates the effort the user is approving and collides with the profile's
"foundation only" framing. The plan already implicitly concedes this with its
three-way grouping.

**Fix:** Split into explicit milestones — 1a extraction (tasks 1–7), 1b services +
gates (8–11), 1c UI foundation + surfaces (12–16) — or move 12–16 to Phase 2 and
let Phase 1 end at a tested engine behind services with no UI. Either way, stop
calling all 16 a single phase.

### M6. "Verified" is used as a trust label without a definition, against Argus's own characterization of the suite

**Where:** Part C2 confidence table tags ~11 mechanic groups **Verified** with
basis "Tier A Locked / bare goldens"; `project-profile.md` hard rule: *"Never
present an approximation as verified"*; Argus §6: the suite is *"a regression lock,
authored bottom-up from the wiki, not a spec"*, and §6 Risks: *"Goldens are
hand-transcribed wiki values; a systematic transcription error would be locked in
as correct."*

**Problem:** "Verified" in the table means "matches the upstream engine's tested output,
which matches values a human typed in from the wiki." It does **not** mean
"validated against the live game." An end user reading a green "Verified" badge
will assume the stronger claim. The profile makes confidence-surfacing a hard
rule, so the wording is load-bearing, not cosmetic.

**Fix:** Define the term in `architecture.md`: *Verified = deterministic formula,
covered by the ported regression suite, formula source cited to the wiki — not
independently confirmed against current live-game values.* Optionally rename to
"Deterministic" / "Regression-locked". Keep Approximation / Not-modeled as is.
Note explicitly that a wiki transcription error would present as Verified.

### M7. The task's actual deliverable — a single `architecture.md` — does not exist yet

**Where:** `brief.md` deliverable + acceptance criterion 1: *"`architecture.md`
exists and covers all 13 sections … each grounded in specific `vendor/upstream-engine/`
file paths"*. Plan Part I item 1: sections 1–10 "come from investigation.md",
11–13 from the plan.

**Problem:** There is an `investigation.md` and a `plan.md` but no assembled
13-section `architecture.md`. Acceptance criterion 1 is unmet as of this review.
Also, Part I item 1 says "sections 1–10 come from investigation.md" but §10
(keep/refactor/rewrite/delete recommendations) is only in the plan (Part F);
`investigation.md` stops at §9.

**Fix:** Produce the merged `architecture.md` (can be post-approval if the user
prefers to approve the Part A decisions first, but the brief asks for the single
document and the criterion should not be silently dropped). Correct the "1–10 from
investigation" statement to "1–9 from investigation, 10–13 from the plan".

---

## Optional / nice-to-have

### O1. Lifting `build-stats.ts` + `loadout-stats.ts` into `packages/engine` deepens the AGPL surface a clean-room rewrite must reproduce

Decision "orchestration placement" chooses Option 2 (lift ~913 LOC of the upstream engine
orchestration into the engine package) on the preserve-first ground rule. That is
defensible, but it enlarges the code a future clean-room engine must re-implement
from scratch, versus keeping a thin Cephalon-authored orchestration in the service
layer that calls the preserved `calculate*` primitives. The plan should explicitly
weigh this against the "commercial exit stays cheap" goal rather than treating
preserve-first as automatically dominant here. The 10 orchestration tests
(`build-url.test.ts`, `loadout-save.test.ts`) are serialization tests and could
travel with a service-layer implementation too.

### O2. Task 3 (game-data gate) blocks far more than the plan's "blocked-until-approved: task 3" implies

The ported suite imports `@/data/*` in 81 places; tasks 4, 5, 6, 9, 10, 11 all
need the catalog present to run. If the game-data bundling gate is not approved,
Phase 1 stops at task 2. The plan lists task 3 as one blocked item among several;
it is the linchpin for tasks 4–11 and should be labelled as such.

### O3. Next.js 16.2.10 / React 19.2.3 — the "match the upstream engine's stack" risk is smaller than it looks

`package.json` pins `next 16.2.10` and `react 19.2.3` — both are patch releases,
not `.0` bleeding-edge, and by the current date they are mature. Argus §4 confirms
no engine file contains JSX or a React import, so `reactCompiler: true` never
touches engine code. Worth one line in Part H to close the concern rather than
leaving it unstated.

### O4. `package.json "license": "MIT"` vs `LICENSE` AGPL

Handled adequately by the "contact maintainer" action item; no change needed, but
the merged doc should state plainly that until the maintainer resolves it, Cephalon
treats the code as AGPL and the SBOM/`license-checker` output will be wrong.

---

## Scope drift

### Missing relative to the brief

- **S1. Scenario-simulator input gaps beyond Steel Path are not flagged.** The
  brief's scenario spec lists "faction, enemy level, Steel Path on/off, armor
  strip %, headshot %, arcane stacks, status uptime". Checked against
  `SimulationParams` / `damage-sim.ts` / `ttk.ts`:
  - `targetFaction` ✅, `arcaneStacks` ✅, enemy `level` ✅ (free param).
  - **armor strip %** — no input. Armor strip is *proc-derived only*
    (`corrosiveArmorRemaining(stacks)`, `heatArmorRemaining(bool)`,
    `punctureArmorRemaining(stacks, stripPerStack)` in `ttk.ts`, driven by the
    build's own status output inside the sim). There is no "assume target is 100%
    stripped" toggle. Neither task 13's scenario panel nor task 15's simulator
    exposes one, and the plan does not note the gap.
  - **headshot %** — `applyHeadshots` is a **boolean** everywhere
    (`SimulationParams:550`, `DamageSimInputs`), not a percentage / hit-rate blend.
  - **status uptime** — `statusTypesOnTarget` is a 0–5 *count of unique status
    types* (Condition Overload / Galvanized), not an uptime fraction. DoT uptime is
    an emergent output of the discrete sim, not a user knob.
  The plan's confidence table should carry "armor-strip assumption", "headshot
  model (binary)", and "status-uptime (derived, not set)" as explicit
  Approximation / not-an-input entries, and tasks 13/15 should say these brief
  knobs are not first-class engine inputs.

- **S2. `architecture.md` not assembled** — see M7.

### Added relative to a minimal reading of the brief (acceptable, but note it)

- Tasks 12–16 (design system + 4 UI surfaces) go well beyond "a realistic Phase 1
  task breakdown" for an engine-extraction brief. Not wrong to plan them, but they
  belong in their own milestone (M5).
- Curated-pull upstream-sync, golden-baseline corpus, `PROVENANCE.md`, CI
  import-guard, `game-constants.ts` deferral — all sensible additions beyond the
  brief's ask; flag them to the user as scope they are approving, not as given.

---

## Verdict

**Needs another planning pass before user approval.**

The strategic spine is sound and I would not relitigate it: pnpm monorepo,
preserve the 1898-test regression lock unchanged, build on full AGPL now behind a
CI-enforced package boundary, contact the maintainer in parallel, defer Steel Path
with an honest Not-modeled label, licensing-professional review gated before any
commercial pivot. Decisions on stack, upstream-sync, and the game-data gate are
well argued.

But four of the items above (M1, M2, M3, M4) are defects in the **packaging and
refactor mechanics** that the Part A decisions ask the user to approve, and two of
them rest on an Argus undercount (`src/data/**` → engine `@/lib/**` edges) that
also needs correcting in the investigation. M1 and M2 together mean the
"two clean packages, contained alias, no codemod" story as written is not
buildable. M3 and M4 mean two of the three "structural, no formula change,
Phase-1-safe" refactors are under-scoped and interdependent in ways the task ACs
would not catch.

Recommended path: Athena revises the packaging decision (specifier counts, the
codemod that is actually required, corrected package membership for
`item-behavior-types` / `set-mod-catalog`), rescopes tasks 5–6 against the real
`getOverrides` / `getEffective*` call graph, resolves the `effective-data.ts`
placement, splits Phase 1 into milestones, and adds a "Verified means…"
definition. Argus corrects §4. Then re-review before the user signs off.

Must-fix count: **7** (M1–M7). Optional: 4. Scope-drift items: 2 missing
(S1, S2) + noted additions.

---

# Re-review (revision 2)

Second pass, focused on whether must-fixes M1-M7 + S1 are *resolved in the text*
(not just claimed), per the coordinator's six check items. Reviewed: `plan.md`
revision 2 (1225 lines) and the corrected `investigation.md` sections 4/5/6/Appendix.
Spot-checked `vendor/upstream-engine/src/lib/weapons/effective-data.ts` exports and the
`@/` alias usage again.

## Must-fix disposition

| # | Status | Evidence in revised text |
|---|---|---|
| **M1** (alias/codemod contradiction) | **Resolved** | Decision "Repository shape & engine packaging" now recommends **one `packages/engine`** (calc + data + types + support + tests). With one tree, every `@/lib/*` and `@/data/*` specifier resolves under one contained `@` -> `packages/engine/src` alias - genuinely no codemod. Part E section 1 spells out why this makes the "1898 pass" AC achievable. Argus section 5 corrected to state the two-package split is "not buildable as-is". |
| **M2** (engine<->data cycle, Argus undercount) | **Resolved** | Argus section 4 carries an explicit **Correction** block: `src/data/**` has **35** edges into `src/lib/**` (`item-behavior-types` x25, `types` x9, `set-mod-catalog` x1), all three targets pure leaves; file graph acyclic, directory graph bidirectional (75 lib->data / 35 data->lib). The one-package recommendation sidesteps it; the two/three-package split (with a `warframe-types` leaf) is booked as a documented future task with a costed ~1-commit recipe and a trigger (commercial pivot or 2nd catalog consumer). |
| **M3** (override de-singleton under-scoped) | **Resolved** | Decision "`overrideCache` singleton" now enumerates the real scope: `data-overrides.ts` + `effective-data.ts` 8 accessors (16 `getOverrides()` reads) + `arcane-effect-overrides.ts` + `= getOverrides()` default-param removal + ~20 no-arg orchestration call sites ~= 5 files / 40 sites. Merged with the orchestration lift into a single milestone-1a task 5. AC now requires 1898/1898 **plus a typecheck proving no zero-arg `getEffective*`/`getOverrides` remains anywhere in `packages/engine/src`**, plus the concurrency test. Part H risk 6 rewritten to match. |
| **M4** (`effective-data.ts` placement undecided) | **Resolved & consistent** | "Stays in `packages/engine`, accessors take an explicit `overrideSet` param" - stated identically in Part B component table, Part C "How catalog data is supplied (M4 - decided)", Part F table, task 5, and Part I item 5. No remaining "here or there". |
| **M5** (16 tasks != "foundation only") | **Resolved** | Part G split into milestones **1a** (extraction, tasks 1-6), **1b** (services + gates, 7-10), **1c** (UI, 11-15), each its own approval point; 1c explicitly "a product-build milestone, not one approval," each surface running its own workflow.md "UI change" cycle. |
| **M6** ("Verified" undefined) | **Resolved** | Part C2 "Term definitions" block defines Verified verbatim (*deterministic + regression-locked + wiki-cited; NOT live-game-confirmed; a wiki transcription error or post-patch drift still presents as Verified*), with "Regression-locked"/"Deterministic" offered as fallback labels. Carried into Part H risk 13, Part I item 7, and task 7 AC ("the M6 definitions ... as code"). |
| **M7** (`architecture.md` not assembled) | **Resolved** | Header + Part I "Status of the deliverable (M7)" both state it does not exist yet, is assembled by the coordinator post-approval, and correct the mapping to **sections 1-9 from investigation, sections 10-13 from plan**. |
| **S1** (simulator input gaps beyond Steel Path) | **Resolved** | Part C2 gains three rows - armor-strip ("Not an input / Approximation"), headshot ("Approximation (binary)"), status-uptime ("Derived, not an input") - each citing the mechanism (`corrosiveArmorRemaining(stacks)` etc.; `applyHeadshots` boolean; `statusTypesOnTarget` 0-5 count). Task 12 forbids a strip-% field / uptime slider and labels the headshot control as binary; task 14 forbids strip-% and headshot-% inputs; Part H risk 15 dedicated. |
| **O1-O4** | **Folded in** | O1 -> orchestration sub-decision "Acknowledged tradeoff" + Part H risk 16; O2 -> task 2 flagged "the linchpin blocking tasks 3-10" in the Data-catalog decision, Part G, and Part I item 9; O3 -> Part H risk 18; O4 -> Part H risk 17 + licensing-decision note. |

Argus's corrections (section 4 Correction block, section 5 "one package"
recommendation with the 26-importer relocation recipe, section 6 alias note,
Appendix lib<->data line) are present and internally consistent with the plan.

## Answers to the six check items

1. **Does one-package eliminate M1/M2 or relocate the problem?** Eliminates them
   for Phase 1. The `@` alias is now genuinely internal to one tree; the
   import-guard ("no react/next/@prisma/next-auth/@wfcd/process.env/fetch(/
   window/document/localStorage in `packages/engine/src`") now also covers
   `data/`, and Argus section 3/4 confirm `src/data/**` has zero framework/IO
   matches, so the guard still passes - it is in fact *stronger* now. `apps/web`
   consuming the barrel `@cephalon/engine` is standard pnpm-workspace and
   unaffected. The catalog/AGPL-surface separation rationale is preserved as a
   costed future task, not discarded. See R1/R2 below for two spec points the
   merge left loose.

2. **Merged task 5 - scoped right? AC sufficient? too big for one /start-task?**
   Scope is now correct and matches the code. The AC's load-bearing check is the
   **concurrency test** (two `OverrideSet`s -> divergent `getEffective*` output)
   - the 1898 regression suite alone would *not* catch a broken `overrideSet`
   thread-through, because with no overrides set every accessor still returns
   raw-catalog+enrich and stays green (only `override-merge.test.ts` (4 tests)
   touches override logic and it tests `mergeOverrideLists`, not the accessors).
   The typecheck-for-zero-arg-calls AC covers residual ambient reads. Sufficient,
   provided the concurrency test explicitly calls `getEffectiveWeaponsMap(setA)`
   vs `(setB)` and asserts divergence - recommend sharpening that one AC line.
   The task is the largest in 1a (~5 files rewritten + 2 file moves + ~40 call
   sites + 3 new/kept test files) but it is mechanical, formula-neutral, and
   splitting it would create a red intermediate state (5a leaves `build-stats.ts`
   calling now-broken zero-arg accessors). Merging is the right call; suggest an
   internal checkpoint (overrides de-singletoned + `effective-data` green) before
   the orchestration lift within the same task.

3. **M4 consistent across Part B/C/F/tasks?** Yes - verified all five locations
   say the same thing. One knock-on inconsistency (R1).

4. **M6 definition load-bearing everywhere the tag appears?** Yes in Part C2,
   Part H risk 13, Part I item 7, task 7 AC. Part B's `ConfidenceService` row
   names the tag without the definition but points to Part C - acceptable. The
   data-flow trace (a) step 8 uses "Verified" bare, which is fine for an example.

5. **New defects from the revision / renumbering?** Task renumbering is clean:
   old task 3 (game-data gate) folded into **new task 2**, and every reference
   ("linchpin blocking tasks 3-10", Part G blocked list, risk 10, Part I item 9)
   says task 2 consistently; old task 15 -> **new task 14** (Scenario Simulator),
   referenced consistently in the Steel Path blocker; `verify-engine-baseline`
   "filled in task 10" matches new task 10. No dangling old numbers found.
   15-task count reconciles (6+4+5). Two loose spec points, both introduced/
   sharpened by the M4 merge - R1 and R2 below.

6. **S1 honest in both the confidence table and the task ACs?** Yes - Part C2
   rows + task 12 AC ("the S1 inputs are labelled for what they are") + task 14
   AC ("Steel Path + S1 limitations visible in UI and in the exported result").

## Remaining items (fix during architecture.md assembly - not blockers to Part A sign-off)

### R1 - Barrel export list vs CatalogService's needs (knock-on from M4)

Part C says the barrel "re-exports **exactly** the ~15 entry points + the
input/output types ... Everything else in `packages/engine/src/**` is
**internal** - not re-exported from the barrel," and task 4's AC matches that.
But Part B and Part C also have `CatalogService` (in `apps/web`) *"import the
catalog loaders + `enrichWeapon` + `effective-data.ts` accessors from
`@cephalon/engine`."* Those 13 `getEffective*` / `resolveEffectiveModOrArcane`
exports, `enrichWeapon`, and the raw catalog arrays are **not** in the "~15 entry
points" list - so a barrel built to task 4's AC cannot serve task 7. Fix: Part C
must define a **second public export group** - "catalog-assembly surface:
catalog loaders, `enrichWeapon`, the `getEffective*(overrideSet)` accessors" -
and task 4's AC must include it. Small, but the two task ACs currently
contradict.

### R2 - "Contained `@` alias, no codemod" needs a stated compile step to be true

`packages/engine/src` code really does use `@/data/*` (115 non-test specifiers,
confirmed). Plain `tsc` emit does **not** rewrite path aliases - it passes
`import "@/data/mods"` through verbatim, which then fails to resolve in
`apps/web` unless `apps/web`'s build *also* configures the `@` alias (exactly the
cross-consumer "footgun" the original Argus section 5 named). "Contained" is only
true if `packages/engine` ships **compiled JS with resolved paths** (via `tsup` /
`tsc-alias` / a bundler) or is consumed as source through Next
`transpilePackages` *with the alias re-declared in `apps/web`*. The decision text
and task 1/4 should name which. One or two sentences; doesn't change the
one-package decision.

Neither R1 nor R2 reverses or undermines a Part A decision - they are spec
tightenings the coordinator can apply while lifting Parts B/C/G into
`architecture.md`.

## Verdict - approvable

All seven must-fixes (M1-M7) and S1 are genuinely resolved in revision 2, not
merely asserted: the packaging contradiction is gone (one package, backed by
Argus's corrected edge counts), the two refactor tasks are scoped to the real
call graph with an AC that can actually catch a regression, `effective-data.ts`
placement is decided and consistent, Phase 1 is honestly milestoned, "Verified"
is defined where it matters, and the simulator's non-input knobs are flagged in
both the confidence table and the UI-task ACs. No Part A decision was reversed;
the packaging change refined a decision that had not yet been approved.

The user can sign off the Part A decisions. R1 and R2 are low-severity spec
points to fold into the `architecture.md` assembly (and, for R1, into task 4's
acceptance criteria) - they do not warrant a third planning pass.

**Remaining must-fix: none.** Recommended-before-assembly: R1 (barrel export
group), R2 (alias compile-step sentence), and one AC-sharpening on the task 5
concurrency test.
