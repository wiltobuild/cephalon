# Brief: the upstream engine engine investigation & target architecture

## Scope

A read-only technical investigation of the upstream engine repository
(the upstream repository (URL in docs/agent/upstream-engine.md), cloned at `vendor/upstream-engine/`,
rev `e66896a` "Merge branch 'dev' into main", 2026-07-25), followed by a
proposed architecture for Cephalon that reuses the upstream engine's calculation and
data layers as an engine.

The deliverable is a single architecture document at
`docs/tasks/upstream-engine-investigation/architecture.md` containing:

1. Current the upstream engine architecture (repo map, layering, control flow)
2. The calculation engine: entry points, every system it covers (damage
   formulas, enemy scaling, weapon calc, mod interactions, crit, status,
   elemental combos, faction multipliers, Gun CO, Incarnons, Rivens,
   arcanes, Warframe abilities, exalted weapons, Archon shards, modular
   weapons, special-case weapons), and how deterministic it is
3. Where game data comes from (bundled files, `@wfcd/*` packages, external
   APIs, DB) and how it is normalized
4. UI coupling map — which calc/data code depends on React/Next/Prisma and
   which is already pure
5. Extraction candidates — what can become a standalone package/service
6. Test suite assessment — framework, what calculation behavior is covered,
   fixture style, how portable the suite is
7. Technical debt / risky architecture (be critical)
8. AGPL-3.0 implications — including the MIT→AGPL history (LICENSE says
   AGPL-3.0 "going forward"; `package.json` still says `"license": "MIT"`,
   old name "the upstream project"/the upstream project) and what that means for a
   commercial-later product
9. External API / data dependencies and their ToS/rate-limit/licensing risk
10. Keep / refactor / rewrite / delete recommendations
11. Proposed Cephalon architecture using the engine as a base
    (UI → services → engine/player-context/external-data → AI tools),
    with explicit calculation-engine boundaries and data flow
12. A realistic Phase 1 task breakdown
13. Major risks

## Out of scope

- Any code changes to `vendor/upstream-engine/` or the Cephalon repo (no
  scaffolding, no extraction, no package setup) — this task ends at an
  approved architecture document.
- Choosing final versions of every dependency, writing schemas, or
  standing up Supabase.
- Building any UI, design system, or product feature.
- Running the upstream engine's dev server or database (static + test inspection
  only; running its `vitest` suite read-only is allowed for the coverage
  assessment).

## Acceptance criteria

1. `architecture.md` exists and covers all 13 sections above, each grounded
   in specific `vendor/upstream-engine/` file paths and line references (not
   generic description).
2. The calculation engine's public surface is enumerated concretely:
   actual function/module names, their inputs/outputs, and which of the
   listed Warframe systems each covers — plus a gap list of systems that
   are missing or only approximated.
3. UI-coupling map clearly separates "pure / portable", "lightly coupled
   (easy to decouple)", and "entangled with React/Next/Prisma".
4. Test assessment states the framework, an approximate count of
   calculation-focused tests, what's well-covered vs. thin, and whether the
   suite can be lifted into a standalone package with minimal change.
5. AGPL section gives a clear, cited reading of obligations for an
   open-source hosted product now and the risk profile for a closed
   commercial product later, including the MIT-history nuance.
6. Proposed architecture defines a hard boundary: the engine is a
   framework-agnostic module/package with typed inputs/outputs, no React,
   no Prisma, no network — and shows the data flow through services to UI
   and to AI tools.
7. Phase 1 breakdown is a concrete, ordered task list (each task small
   enough to run through `/start-task`), explicitly favouring **preserving
   as many the upstream engine functions and tests as possible** over rewriting.
8. Major risks section is specific (named files/deps/mechanics), not
   platitudes.

## Preflight state

- Branch: `main` (Cephalon repo; 1 commit — bootstrap docs)
- the upstream engine stack (from `vendor/upstream-engine/package.json`): Next.js 16 +
  React 19, TypeScript 5, Prisma 7 + better-sqlite3, next-auth v5, vitest 3.
  Game-data deps: `@wfcd/items`, `@wfcd/arsenal-parser`,
  `warframe-worldstate-data`. OCR: `tesseract.js`. Discord bot under `bot/`.
- the upstream engine source layout: `src/lib` (192 files — likely the engine),
  `src/app` (102, Next routes/pages), `src/components` (76, UI),
  `src/data` (49, game data / normalization). Existing in-repo docs:
  `docs/ARCHITECTURE.md`, `docs/ACCURACY_CHECKLIST.md`.
- Licensing signal: `LICENSE` = AGPL-3.0 (Copyright 2026 <author> /
  the upstream project contributors; "previous versions were under MIT... apply going
  forward"); `package.json` still declares `"license": "MIT"` and
  `name: "upstream-project"`.
- Workflow row: "Engine import / extraction (the upstream engine)" — but this task
  stops at Argus → Athena → independent Themis review → **approval**. No
  Codex/implementation this round.
- Guiding constraint from the user: **preserve as much of the upstream engine's
  calculation functions and tests as we can**; treat rewrite as a last
  resort, driven by AGPL/commercial or hard coupling only.
