# Final report — upstream-engine investigation & target architecture

**Task type:** architecture investigation (workflow row: "Engine import /
extraction"). **Outcome:** deliverable produced and Part A decisions approved.
No production code written — this task ends at an approved architecture
document; Phase 1 implementation is separate, gated per milestone.

## What was done

1. **Argus** investigated `vendor/upstream-engine/` @ `e66896a` read-only,
   including `npm install` + `npx vitest run` → [`investigation.md`](investigation.md)
   (§§1–9). One factual correction pass after Themis flagged an undercount.
2. **Athena** produced the target architecture + Phase 1 plan →
   [`plan.md`](plan.md) (Parts A–I). Three revisions: initial, post-Themis
   must-fixes, post-user-decisions.
3. **Themis** independently reviewed twice → [`review.md`](review.md). First
   pass: 7 must-fixes (packaging mechanics resting on an Argus undercount, two
   under-scoped refactors, undefined "Verified", missing deliverable). Re-review:
   **all resolved, no remaining must-fix, approvable.**
4. **User** approved the Part A decisions 2026-08-30 (three via structured
   question, the rest as the bundle) — recorded in
   [`../../agent/decisions.md`](../../agent/decisions.md).
5. Merged deliverable assembled → [`architecture.md`](architecture.md) (13
   sections).
6. Upstream name scrubbed from all internal docs per user decision; the single
   internal record is [`../../agent/upstream-engine.md`](../../agent/upstream-engine.md).

## Key findings

- **The engine is cleanly separable.** `src/lib/calc/` (35 modules, ~18k LOC) +
  `src/data/` + `types.ts` + 14 helpers = an 89-file closure with **0 npm deps,
  0 React/Next/Prisma/network/env**. Fully deterministic. Preservable as-is.
- **The test suite is a strong regression lock** — 1898 tests, 0 failures,
  lifts into a package unchanged. Not a conceptual spec; goldens are
  hand-transcribed from the wiki.
- **`lib` ⇄ `data` are bidirectionally coupled** at directory level (75 vs 35
  edges) → the engine ships as **one package** now, not two. A code/catalog
  split is a costed future task.
- **Real model gaps:** no Steel Path (only raw enemy level), linear ability
  damage, Archon offensive shards are no-ops, flat radial falloff, 19-enemy
  roster. Steel Path is scoped into Phase 1 under the calc-formula gate; the
  rest are deferred, each gated.
- **Licensing is the hard constraint.** AGPL-3.0 with unrecoverable history,
  stale `package.json` "MIT", unstated Dart-origin license, unreachable
  maintainer. AGPL §13 applies to the whole service; a commercial pivot is not
  clean. Decision: build on full AGPL now, minimal name footprint, no
  maintainer track, hard package boundary + golden-baseline-as-spec to keep a
  clean-room swap cheap, licensing-professional review gated before any pivot.

## Decisions approved (see `decisions.md` 2026-08-30)

- pnpm monorepo; **one `packages/engine`** (calc + data + types + support +
  tests); contained `@` alias; no Phase-1 codemod; future code/catalog split
  documented with a recipe.
- Stack: Next.js + TS + React 19 + Supabase + Vitest + Playwright.
- Upstream sync: curated pull, never auto-merge; formula/constant changes hit
  the calc-formula gate.
- **Game-data bundling gate: APPROVED** — upstream `src/data/**` verbatim into
  `packages/engine/src/data/`.
- **Steel Path: scoped INTO Phase 1** as the first calc-formula-gated task
  (task 11), opt-in `sp` input, its own `decisions.md` sign-off on sourced
  values.
- Licensing: full AGPL now, no maintainer track, minimal name footprint,
  professional review before any commercial/closed pivot.
- Structural: override de-singleton + orchestration lift merged into one Phase
  1 task (no formula change).

## What remains open

- **Milestone 1a is not yet approved to start.** The architecture doc is done;
  the next gate is user sign-off to begin Phase 1a task 1 (scaffold the
  monorepo).
- Two low-severity spec points folded into `architecture.md` at assembly (R1
  catalog-assembly export group; R2 build-step choice) — no decision impact.
- Licensing risks are **documented, not cleared** — a professional review is a
  hard prerequisite before any commercial or closed-source move.
- The catalog-refresh cadence and ownership are defined in the plan (task 6 +
  a new `workflow.md` row) but not yet exercised.

## Artifacts

`docs/tasks/upstream-engine-investigation/`: `brief.md`, `investigation.md`,
`plan.md`, `review.md`, `architecture.md`, `final-report.md`.
Plus `docs/agent/upstream-engine.md` (new) and `docs/agent/decisions.md`
(4 new entries), `docs/agent/workflow.md` (monorepo structure + catalog-refresh
row), `CLAUDE.md` (deviations updated).
