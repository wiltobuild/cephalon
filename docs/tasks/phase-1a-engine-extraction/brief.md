# Brief: Phase 1a — engine extraction

## Scope

Milestone 1a of Phase 1, as specified in
[`../upstream-engine-investigation/architecture.md`](../upstream-engine-investigation/architecture.md)
§12 and [`../upstream-engine-investigation/plan.md`](../upstream-engine-investigation/plan.md)
Part G tasks 1–6. Part A decisions are approved
([`../../agent/decisions.md`](../../agent/decisions.md) 2026-08-30).

Set up a pnpm workspace monorepo and extract the upstream Warframe calculation
engine into a single framework-agnostic `packages/engine` package, preserving
its behaviour and its 1898-test regression suite exactly, then make two
structural (non-formula) refactors that let the engine run server-side and
multi-tenant.

Sub-tasks:

1. **Scaffold the monorepo** — pnpm workspaces: `apps/web` (Next.js App Router
   + TS, minimal) + `packages/engine`; shared `tsconfig.base.json`; root Vitest
   config; CI skeleton (typecheck + test jobs); decide + record the R2
   build-step approach (`transpilePackages` for now).
2. **Import the engine** (GAME-DATA BUNDLING GATE — approved) — copy the
   89-file closure from `vendor/upstream-engine/src/` into
   `packages/engine/src/` preserving the internal tree: `lib/calc/**`, the 14
   `support/` helpers (from `lib/{codex,display,mods,overrides,weapons}/`),
   `lib/types.ts`, and `data/**` + `data/mod-behaviors/**`. Contained `@` alias
   → `packages/engine/src`. Preserve `LICENSE` (AGPL-3.0) verbatim at package +
   repo root; add `packages/engine/NOTICE` seeded from
   [`../../agent/upstream-engine.md`](../../agent/upstream-engine.md); add
   `packages/engine/src/data/PROVENANCE.md`. Add the CI import-guard.
3. **Port the test suite** — move all 47 `*.test.ts` + `*-goldens.ts` next to
   their targets in `packages/engine`; wire `vitest.config.ts`; CI job
   `engine-regression`.
4. **Define the public API barrel** — `packages/engine/src/index.ts` with two
   labelled export groups (calculation surface; catalog-assembly surface, R1);
   everything else internal.
5. **Catalog-assembly de-singleton + orchestration lift** (structural, NO
   formula change) — remove `overrideCache` + `window`/client-import code + the
   `= getOverrides()` default params across `overrides/data-overrides.ts`,
   `weapons/effective-data.ts` (8 accessors), `overrides/arcane-effect-overrides.ts`;
   `apply*Overrides` / `getEffective*` take a **required** explicit
   `OverrideSet`. Split the 3 pure resolvers out of `build-storage.ts` into
   `support/build-resolvers.ts`; move `warframe-arsenal/riven-resolve.ts` into
   `support/`. Lift `builds/build-stats.ts` + `builds/loadout-stats.ts` into
   `packages/engine/src/orchestration/` **refactored to receive catalogs as
   parameters** (the ~20 no-arg `getEffective*()` calls rewritten).
6. **Reference clone + upstream-sync runbook** — full-history clone of the
   upstream repo outside the monorepo; write `docs/agent/upstream-sync.md`
   (curated-pull cadence, catalog-only vs formula-gate split, the future
   `engine`/`warframe-data` package-split recipe).

## Out of scope

- Any calc formula / scaling / constant change. Steel Path (task 11), the
  `game-constants.ts` extraction, and all gap-filling are later, gated.
- Cephalon's service layer (`CatalogService` etc.), design system, and all UI
  (milestones 1b / 1c).
- Supabase, auth, schema, `PlayerContextService`.
- Publishing `packages/engine`; the `engine`/`warframe-data` split.
- Decomposing `calculator.ts` / `arcane-handlers.ts`.

## Acceptance criteria

1. `corepack pnpm install` (or `npx pnpm install`) completes clean;
   `pnpm -r typecheck` green.
2. `pnpm --filter @cephalon/engine test` → **43 files / 1875 tests / 0
   failures / 0 skips** (+ 1 new override-isolation test file from sub-task 5 →
   44 files / 1876). The upstream baseline is 47 files / 1898; the **4 excluded
   files are non-engine** — `bot/worldstate-client.test.ts` (8),
   `warframe-arsenal/{catalog-match,normalize-payload}.test.ts` (13),
   `components/stats/use-sim-stat-change-flash.test.ts` (2) = 23 tests
   (1898 − 23 = 1875), per Argus investigation.md §6. No calc/data assertion
   differs from upstream.
3. `packages/engine/src` contains **zero** matches for `react`, `next`,
   `@prisma`, `next-auth`, `@wfcd/`, `process.env`, `fetch(`, `window`,
   `document`, `localStorage` — enforced by a committed CI import-guard script.
   (After sub-task 5; sub-tasks 2–4 may keep a temporary allowlist for
   `overrides/data-overrides.ts` only.)
4. A typecheck / lint rule proves **no zero-arg `getEffective*(` or
   `getOverrides(` call remains anywhere in `packages/engine/src`**.
5. New test: two different `OverrideSet` values applied concurrently do not
   cross-contaminate (no shared mutable cache).
6. `override-merge.test.ts`, `build-url.test.ts`, `loadout-save.test.ts` pass
   in-package.
7. `packages/engine/orchestration/**` has zero `localStorage` / `window` /
   persistence imports.
8. `LICENSE` (AGPL-3.0) present at repo root and `packages/engine/`; `NOTICE`
   and `data/PROVENANCE.md` present and accurate; no upstream project name
   introduced anywhere outside `NOTICE` / `PROVENANCE.md` /
   `docs/agent/upstream-engine.md` / `docs/agent/upstream-sync.md`.
9. `apps/web` builds (`pnpm --filter web build` or `next build`) and can
   `import` from `@cephalon/engine` (a smoke import that runs one weapon calc +
   one warframe calc + `calculateTTK`).
10. `docs/agent/upstream-sync.md` committed; a full-history reference clone
    exists outside the monorepo (path recorded in the runbook).

## Preflight state

- Branch: `main`; last commit `0838d2d` (investigation + architecture).
- `vendor/upstream-engine/` — working clone (gitignored), rev `e66896a`, 1898
  tests green under its own `npx vitest run`.
- Toolchain: Node v24.18; pnpm via `corepack` (0.35) or `npx pnpm@9`; Codex CLI
  for implementation.
- Workflow row: "Engine import / extraction" — Argus/Athena already done at the
  architecture-investigation level; this milestone is Codex implementation →
  Themis review of the sub-task-5 refactor → Apollo verification against the
  ACs above. User has authorised proceeding through 1a without per-task stops.
