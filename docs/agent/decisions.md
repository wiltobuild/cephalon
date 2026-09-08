# Decisions Log

_Append-only. Each approved decision goes here so it is not re-litigated in a
later session. Newest at the bottom._

---

## 2026-08-30 — Documentation level: Standard

**Context**: Bootstrapping the Cephalon Warframe companion project. Needed to
set per-task artifact rigor.
**Options considered**: Lightweight (brief + final-report only); Standard
(full artifact set for non-trivial work); Standard + a Regulated sign-off
tier for calc/licensing code paths.
**Decision**: Standard. Full `docs/tasks/<slug>/` artifact set (brief,
investigation, plan, review, verification, final-report) for anything beyond
a trivial fix. No separate Regulated tier, but see the approval-gate entry
below for two hard-stop code paths.
**Approved by**: user

## 2026-08-30 — Project commercial posture: open now, commercial later

**Context**: the upstream engine (the calculation engine we build on) is AGPLv3. The
posture determines how strictly the engine boundary is enforced.
**Options considered**: Personal open-source (AGPL-OK, no boundary concern);
open now / commercial later (clean boundary, engine independently
replaceable); commercial/portfolio-critical (quarantine or avoid AGPL from
day one).
**Decision**: Open-source for now, but the calculation engine must sit behind
a clean service boundary with no UI/React coupling, so it can be
independently re-implemented (clean-room) if the product is later taken
closed-source. AGPL notices and attribution are preserved while open-source.
**Approved by**: user

## 2026-08-30 — Extra approval gates (hard stops)

**Context**: Deciding which changes require explicit user sign-off beyond the
global defaults (architecture, schema, auth, new deps, destructive actions,
scope expansion).
**Options considered**: copying/adapting AGPL code; adopting external data
sources/APIs; bundling game-data files; changing calc formulas.
**Decision**: Two extra hard-stop gates, each recorded here when triggered:
(1) **Calc-formula changes** — any change to a damage/scaling/interaction
formula away from the upstream engine's behavior; (2) **Game-data bundling** —
committing bulk Warframe game data into the repo (source + license + refresh
strategy reviewed first). Copying/adapting AGPL code and adopting external
APIs are left to the global new-dependency / architecture gates, but AGPL
implications must still be documented in the first task.
**Approved by**: user

## 2026-08-30 — Data sensitivity: sensitive from day one

**Context**: The product will link player accounts, import inventory, and
handle market activity before long.
**Options considered**: treat as non-sensitive until accounts land; treat as
sensitive from day one.
**Decision**: Sensitive from day one. No logging of player identifiers or
account tokens; plan encryption at rest and least-privilege DB access before
any account feature ships. Revisit the data safety policy in `workflow.md`
when Supabase auth / account linking / inventory import is implemented.
**Approved by**: user

## 2026-08-30 — Git: new repo, main branch, no remote yet

**Context**: Directory was not a git repository.
**Decision**: `git init -b main` in place. Small commits per approved phase.
No remote, no pushes/PRs until the user adds a remote and approves pushing.
No commits without explicit user request.
**Approved by**: user

## 2026-08-30 — the upstream engine source of record

**Context**: Need the engine repository to investigate.
**Decision**: the upstream engine — provenance and licensing facts in `docs/agent/upstream-engine.md` (AGPL-3.0).
Cloned read-only into the workspace (`vendor/upstream-engine/`, gitignored) for
investigation; treated as an engine to extract from, not a base to fork and
reskin.
**Approved by**: user

---

## 2026-08-30 — Licensing path: build on the upstream engine under full AGPL-3.0; minimal name footprint; no maintainer track

**Context**: The upstream engine is AGPL-3.0 with a stale `package.json`
`"license": "MIT"`, no CLA, no per-file headers, calc/data ported from an
earlier Dart project of unstated license, and only a single squashed commit —
so the MIT→AGPL line and rename date are unrecoverable. The maintainer is
treated as **not reachable**. Full facts: `docs/agent/upstream-engine.md`.
**Options considered**: (1) hybrid — build on it now under AGPL, contact the
maintainer in parallel, defer the commercial question; (2) contact maintainer
first; (3) clean-room from day one; (4) treat as AGPL and drop the maintainer
track entirely.
**Decision**: Build Cephalon on the upstream engine **now under full AGPL-3.0**
for the whole service. Keep only the legally required `LICENSE` + a `NOTICE`
(seeded from `docs/agent/upstream-engine.md`) in `packages/engine`. **Keep the
upstream project's name out of all user-facing surfaces and out of internal
docs** — internal docs say "the upstream engine"; the one internal file that
names it is `docs/agent/upstream-engine.md`. **No maintainer-outreach track**
(unreachable). The engine stays behind a hard `packages/engine` boundary and
the golden-baseline corpus is built to double as a clean-room-rewrite spec, so
a future commercial pivot is a package swap. **A qualified open-source
licensing professional must review before any commercial or closed-source
pivot** — this decision documents the risk, it does not clear it. Not legal
advice.
**Approved by**: user

## 2026-08-30 — Game-data bundling gate: APPROVED (upstream catalog, verbatim)

**Context**: Hard-stop gate (see the approval-gates entry above). The plan
requires committing the upstream engine's `src/data/**` (~66k LOC static TS:
`mods.ts` ~22k, `weapons.ts` ~15k, `warframes.ts` ~8.7k, `mod-behaviors/`
batches, `riven-dispositions.ts`, etc.) into `packages/engine/src/data/` so the
1898-test regression suite — calibrated to this exact catalog's numbers and
shapes — keeps passing unchanged.
**Options considered**: (1) bundle the upstream catalog verbatim; (2) don't
bundle — derive at runtime from `@wfcd/items` + external APIs (puts external
APIs on the calc path, invalidates the exact-number goldens); (3) bundle a
re-derived catalog from a hardened pipeline (the upstream sync pipeline is
self-described "scratch"; not available).
**Decision**: **Approve option 1.** Source: the upstream engine @ `e66896a`
(itself a Dart port + wiki/`api.warframestat.us` reconciliation). Licensing:
AGPL-3.0 arrangement over DE-owned game facts; a `PROVENANCE.md` in the package
records source, licence note, and the DE fan-content disclaimer. Size/format:
~66k LOC static TS, ~10 large files + `mod-behaviors/batches/` (22 files).
Refresh: curated pull per Warframe major patch (never auto-merge); the
golden-baseline byte-compare test gates any behavioural drift a pull
introduces. Unblocks Phase 1a task 2, the linchpin for the extraction tasks
that follow.
**Approved by**: user

## 2026-08-30 — Steel Path: scoped INTO Phase 1 as the first calc-formula gate

**Context**: The upstream engine has **no Steel Path scaling model** — only raw
enemy level (users approximate SP by raising the level). The product's
scenario-simulator spec lists "Steel Path on/off". Athena recommended deferring
SP to Phase 2 to keep Phase 1 free of formula changes; the user chose to scope
it in now.
**Decision**: Steel Path modelling is a **Phase 1 task, handled under the
calc-formula-change hard-stop gate**: a dedicated Argus pass sources SP's
health / armor / level-shift / damage-resistance multipliers from the wiki with
citations; Athena writes the before/after formula and the value sources; the
user signs off with a dated entry in this log; Codex adds an `sp` input to
`SimulationParams` and the scaling primitives in `ttk.ts`; Themis reviews with
elevated scrutiny; Apollo runs the full ported suite plus new SP tests. Until
that task lands, any scenario UI shipped shows SP as **Approximation — pending
verification**, never Verified. This is the first exercise of the
calc-formula gate and its golden-baseline / `decisions.md` machinery.
**Approved by**: user

## 2026-08-30 — Phase 1a — R2 engine build-step

**Decision**: apps/web consumes `@cephalon/engine` via `transpilePackages` +
source; a tsup/tsc-alias dist build is deferred to the first second consumer or
publish. Approved by: user (Part A bundle).

## 2026-08-30 — Phase 1a — arcane-effect overrides use a default empty set (deviation from brief, recorded)

**Context**: Phase 1a sub-task 5 (de-singleton) made `apply*Overrides` and the
8 `getEffective*` accessors take a **required** `OverrideSet`. The brief grouped
`overrides/arcane-effect-overrides.ts` (`applyArcaneEffectOverrides`,
`getArcaneEffectDef`) with that "required" set. Making it required forces an
`OverrideSet` parameter through `calc/calculator.ts` (l.1923) and 4 call sites
in `calc/arcane-calculator.ts` — i.e. modifying a `calc/` god file, which
Phase 1a scope explicitly excludes ("KEEP verbatim + WRAP", no calc-formula or
calc-file changes).
**Options considered**: (1) thread `OverrideSet` through `calculator.ts` /
`arcane-calculator.ts` now — rejected, touches the excluded god file and
widens the diff into calc logic; (2) give the two functions
`overrides: OverrideSet = []` and record the gap — chosen; (3) drop the
functions from the package — rejected, `calculator.ts` imports
`getArcaneEffectDef`.
**Decision**: `applyArcaneEffectOverrides` / `getArcaneEffectDef` take
`overrides: OverrideSet = []`. Consequence: once a host wires real data
overrides, every category flows via the required params **except arcane-effect
(magnitude) overrides**, which reach the damage math through `calculator.ts`.
Phase-1 impact is nil — no override host exists, `setOverrideCache` is deleted,
and the upstream server-side path would also see an empty set. The functions
are exported from the barrel's catalog-assembly group with a comment marking
the gap.
**Follow-up (Phase 1b, CatalogService milestone)**: thread arcane-effect
overrides to the calc path — either `CatalogService` builds a merged
`ARCANE_EFFECTS` map and passes it via the existing `effects?` param of
`getArcaneEffectDef`, or an `OverrideSet` is threaded through
`calculateWeaponBuildWithArcanes`. Tracked in the Phase 1a final-report open
items.
**Approved by**: Claude (coordinator) under the standing Phase-1a authorisation;
surfaced to the user in the Phase 1a report.

## 2026-08-30 — Phase 1b — engine golden-baseline established (task 10)

**Context**: The calc-formula gate (`scripts/check-formula-gate.mjs`) treats
`packages/engine/test/golden/engine-baseline.json` as a protected path — a
change to it requires a `decisions.md` entry in the same diff. This entry
establishes the baseline itself so the introducing commit satisfies its own
gate.
**Decision**: `packages/engine/test/golden/engine-baseline.json` records the
deterministic `CalculatedStats` / `TTKResult` numeric fields for ~48 canonical
builds (`baseline-builds.ts` — weapons across trigger families + Incarnon +
melee + a warframe + archwing + railjack), computed through the
`@cephalon/engine` barrel. `verify-engine-baseline.test.ts` deep-equals every
finite numeric field per build. Provenance: the bundled catalog at upstream rev
`e66896a` (see `packages/engine/src/data/PROVENANCE.md`); Warframe balance as of
the July 2026 catalog sync. Any future change to these numbers — from a catalog
pull or a formula edit — must be reviewed and recorded here (the gate enforces
it). Regenerate with `packages/engine/scripts/gen-baseline.mjs` only when a
change has been approved.
**Follow-up**: refine `check-formula-gate.mjs` to distinguish file *creation*
(`git diff --name-status` = `A`) of the baseline from *modification*, so a
future first-time addition of a golden file doesn't need a paired decisions
entry.
**Approved by**: Claude (coordinator) under the standing Phase-1b authorisation;
in the Phase 1b report to the user.

## 2026-08-30 — Steel Path scaling values SIGNED OFF (calc-formula gate, task 11)

**Context**: The 2026-08-30 "Steel Path scoped INTO Phase 1" decision requires
the user's dated sign-off on the wiki-sourced scaling values before any code.
Argus sourced them from the current official wiki
(`docs/tasks/phase-1c-steel-path/sourcing.md`) and found the commonly cited
figures are stale (rebalanced in Update 36.0, 2024-06-18).

**Values approved (user, "approve as sourced"):**
- `SP_LEVEL_SHIFT = 100` — wiki.warframe.com/w/The_Steel_Path: "level increased by 100".
- `SP_HEALTH_MULT = 2.5` — same page: "+150% (to a total of 250%, or 2.5x) bonus to health".
- `SP_SHIELD_MULT = 2.5` — U36.0 patch note: "Shields are now multiplied by 2.5x" (was ×6.25).
- **NO armor multiplier** — U36.0 patch note: "Steel Path no longer increases Armor values." Armor rises on SP only via the +100 level shift.
- Out of scope: resource/mod drop chance, enemy damage output, Archwing/Railjack (+50) / Duviri (+20) mode variants, Eidolon fixed levels.

**Order of operations:** (1) `effLevel = sp ? level + 100 : level`; (2) run the
existing `scaleHealth` / `scaleArmor` / `scaleShield` on `effLevel`, unchanged;
(3) multiply the health and shield *results* by 2.5 when `sp`; armor gets the
shift only. Apply at the three call sites in `simulateDiscreteTTK`
(`ttk.ts:323-325`) — scaling primitives keep their signatures.

**Surface:** `sp?: boolean` on `SimulationParams` (+ `DEFAULT_SIM_PARAMS: false`)
and a param on `calculateTTK`. Opt-in — `sp` off/absent = byte-identical to
today. New named constants at the top of `ttk.ts` with the citations above.

**Confidence label:** Steel Path output = **`approximation`** ("Approximation —
pending live verification"), NOT `verified`. Rationale: the engine's underlying
level curve is already a linear approximation of DE's post-U27.2 formulas, so
absolute SP numbers will drift from live; SP tests assert the *composition*
(`sp_result === 2.5 × non_sp(level + 100)` for health/shield; `=== non_sp(level+100)`
for armor), not live-game values. `ConfidenceService.CONFIDENCE_MAP.steelPath`
moves from `pending-verification` to `approximation` when task 11 lands. (This
refines the earlier "then Verified" wording in the Steel Path scoping entry —
Argus's sourcing shows Verified would over-claim.)

**Deferred to a separate follow-up task:** Damage Attenuation (the wiki page is
self-flagged unreliable; it is a boss/Lich/Archon mechanic, not SP-specific, and
no enemy in the engine's 19-unit roster has it).

**Verification bar for the implementation:** full ported suite stays
**1925 tests / 0 fail** with `sp` off; new SP characterization tests match the
8 worked oracle examples in the sourcing doc; `verify-engine-baseline` extended
with SP-on cases (that extension itself paired with this entry). Elevated Themis
review; Apollo runs the full suite + SP tests.

**Approved by**: user (Steel Path scaling values, 2026-08-30).

## 2026-09-06 — Arsenal and optimizer implementation

The user approved implementation after reviewing the September 6 audit and plan (message: “implement”). This authorizes the planned builder redesign, authentic image integration, validation, compatibility corrections, and deterministic search foundation. No engine damage formulas changed in this implementation.

Eligibility metadata uses WFCD/warframe-items revision e754da2d337eeaea93773e63cb25e94422567363, from Mods.json. The committed projection contains only 1,343 compatibility labels for existing engine mod IDs and source provenance, not item damage stats or binary art. This corrects observed cross-class illegal builds. Its refresh script requires an explicit reviewed source commit. Artwork remains an independently fetched manifest/CDN integration. See docs/tasks/arsenal-and-optimizer/implementation.md for scope and remaining model limitations.

## 2026-09-07 — Weapon builder corrections

User explicitly requested game-like mod cards, Exilus restrictions, weapon arcanes, better combat assumptions and a broader companion focus. Approved scope includes source-backed slot eligibility and missing ordinary/Primed exclusion corrections. The pinned WFCD projection now includes 1,485 compatibility labels, utility flags, rank display text and arcane classes from Mods.json/Arcanes.json; none of these display fields changes engine damage formulas. See docs/tasks/arsenal-and-optimizer/weapon-builder-followup.md for behavior and verification.

## 2026-09-07 — Elemental combat objective and preference enforcement

The user explicitly requested status-aware elemental scoring and reliable damage preferences. Default search now uses the existing deterministic TTK/status model, adds ordered elemental skeletons and enforces multi-element output constraints. No engine formulas changed. See docs/tasks/arsenal-and-optimizer/elemental-combat.md for sources, bounded-search limits and verification.
