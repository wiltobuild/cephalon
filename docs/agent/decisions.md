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

**Context**: VoidForge (the calculation engine we build on) is AGPLv3. The
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
formula away from VoidForge's behavior; (2) **Game-data bundling** —
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

## 2026-08-30 — VoidForge source of record

**Context**: Need the engine repository to investigate.
**Decision**: VoidForge = https://github.com/StepTwo33/VoidForge (AGPLv3).
To be cloned read-only into the workspace for investigation during the first
`/start-task`; treated as an engine to extract from, not a base to fork and
reskin.
**Approved by**: user
