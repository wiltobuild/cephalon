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
