# Final report — Phase 1a: engine extraction

**Milestone:** Phase 1a of Phase 1 (see
[`../upstream-engine-investigation/architecture.md`](../upstream-engine-investigation/architecture.md)
§12). **Status:** complete, verified, Themis-reviewed (one pass + fixups).
Committed as part of the Phase 1a commit.

## What changed

A pnpm workspace monorepo now exists, with the upstream AGPL Warframe
calculation engine extracted into `packages/engine` as a single
framework-agnostic package, its regression suite preserved, a public API barrel
defined, and the override/catalog-assembly layer de-singletoned so the engine
is safe to run server-side for multiple users.

### New structure
- `pnpm-workspace.yaml`, root `package.json` (pnpm 9), `tsconfig.base.json`,
  `.npmrc`, `.github/workflows/ci.yml` (jobs: `typecheck` + guard scripts,
  `engine-regression`, `web-build`).
- `apps/web` — minimal Next.js 16 / React 19 shell; declares
  `@cephalon/engine` + `transpilePackages`.
- `packages/engine` — `src/{calc,data,codex,display,mods,weapons,overrides,
  orchestration,support,builds,__smoke__}`, `types.ts`, `index.ts` barrel,
  `LICENSE` (full AGPL-3.0), `NOTICE`, `src/data/PROVENANCE.md`,
  `vitest.config.ts`, `tsconfig.json` (contained `@ → src` alias).
- `scripts/check-engine-boundary.mjs` (+ self-test),
  `scripts/check-no-ambient-catalog.mjs`.
- `docs/agent/upstream-sync.md` — curated-pull runbook.

### Engine extraction (sub-tasks 2–4)
- The full calc closure + `src/data/**` (~66k LOC catalog) + `types.ts` +
  support helpers copied from the upstream working tree, alias `@/lib/…` →
  `@/…` (mechanical, 105 files). Codex's first pass under-copied ~7 pure
  support modules the *full* suite needs (`weapon-alternate-mode`,
  `weapon-gravimag`, `mod-slot-categories`, `tome-weapons`,
  `weapon-arbucep-mode`, `archwing-augment-mods`, `weapon-radial-dps` chain);
  added from the full-history reference clone.
- `calc/**` and `data/**` are **byte-identical to upstream** (CRLF-normalised,
  alias-normalised) **except 4 files** — `calc/{archwing,companion,railjack}-
  calculator.ts` and `mods/warframe-augment-mods.ts` — which differ only by the
  `([])` argument now required on `getEffectiveModsMap` /
  `getEffectiveWarframesMap` default-parameter values. No formula, constant, or
  numeric assertion changed anywhere.
- Barrel `src/index.ts`: two labelled groups — **calculation** (the ~20
  preserved entry points + I/O types) and **catalog-assembly** (loaders,
  `enrichWeapon`, the `getEffective*` accessors, override helpers,
  `OverrideSet`; for the host CatalogService only).

### De-singleton + orchestration lift (sub-task 5)
- Deleted from `overrides/data-overrides.ts`: the `overrideCache` module
  singleton, `setOverrideCache`/`getOverrides`, `notifyDataOverridesUpdated`
  (`window`), `generateOverrideId` (`Date.now`), and every persistence /
  `data-overrides-client` lazy import.
- `apply*Overrides`, `getOverrideForTarget`, `resolveEffectiveModOrArcane`, and
  the 8 `getEffective*` (+ `*Map`) accessors now take a **required**
  `OverrideSet` (= `readonly DataOverride[]`).
- `arcane-effect-overrides.ts` — `getArcaneEffectDef` /
  `applyArcaneEffectOverrides` take `overrides: OverrideSet = []` (a **recorded
  deviation** — see open items; making it required would touch the excluded
  `calc/calculator.ts` god file).
- `builds/build-stats.ts` + `builds/loadout-stats.ts` → `orchestration/`,
  refactored to take a `catalogs` param object (no ambient `getEffective*()`).
- New `support/build-resolvers.ts` (pure subset of the never-copied
  `build-storage.ts`); `warframe-arsenal/riven-resolve.ts` → `support/`;
  `builds/loadouts.ts` split (persistence removed, pure serialization kept).
- Themis verified: **no module-scope `let`** anywhere in `packages/engine/src`;
  `deepMergeOverrideFields` is non-mutating; multi-tenant-safe.

## Verification (all re-run after fixups — see `verification.md`)

| Check | Result |
|---|---|
| `pnpm -r typecheck` | engine **Done**, web **Done** |
| `pnpm --filter @cephalon/engine test` | **45 files / 1880 / 0 fail / 0 skip** |
| Engine baseline | 43 engine test files / 1875 (= upstream 47/1898 − 4 non-engine files / 23 tests) + `override-isolation` + `__smoke__/barrel` |
| `check-engine-boundary.mjs` | passes, self-test ok, **now catches** react/next/next-auth/@prisma/@wfcd imports (M1 fix) |
| `check-no-ambient-catalog.mjs` | passes — no bare `getEffective*()` / `getOverrides()` |
| `pnpm --filter web build` | `next build` compiled successfully |
| Licensing | full AGPL-3.0 `LICENSE` (root + package); `NOTICE` + `PROVENANCE.md` accurate; upstream name only in `NOTICE`/`PROVENANCE`/`docs/agent/upstream-engine.md` |

## Acceptance criteria — met

1 (install/typecheck) ✅ · 2 (suite green at engine baseline) ✅ · 3 (boundary,
now genuinely enforced) ✅ · 4 (no ambient catalog) ✅ · 5 (override isolation
test) ✅ · 6 (override-merge / build-url / loadout-save pass) ✅ · 7
(orchestration has no persistence) ✅ · 8 (licensing artifacts + name
confinement) ✅ · 9 (barrel smoke) ✅ *via in-package `__smoke__/barrel.test.ts`
+ `next build`; the `apps/web` consumer import is deferred — see open items* ·
10 (upstream-sync runbook + reference clone) ✅

## Open items (not blocking Phase 1a)

- **O4 / R2** — an `@cephalon/engine` import from `apps/web` makes `apps/web`'s
  `tsc` traverse the engine's `@/`-aliased source. Clean resolution needs the
  R2 `dist` build (`tsup` / `tsc-alias`), deferred to the first second consumer
  or publish. Until then AC 9's consumer path is covered by `next build` +
  the in-package barrel test.
- **S3 follow-up (Phase 1b)** — thread `arcane_effect` (magnitude) overrides to
  the calc path when `CatalogService` lands: either it builds a merged
  `ARCANE_EFFECTS` map passed via `getArcaneEffectDef`'s `effects?` param, or an
  `OverrideSet` is threaded through `calculateWeaponBuildWithArcanes`. Recorded
  in `docs/agent/decisions.md` (2026-08-30).
- **O3** — `packages/engine/tsconfig.json` excludes `*.test.ts` from `tsc`;
  ported test call-sites aren't type-checked. Consider a test-inclusive tsc
  project so they stay type-safe as signatures evolve in 1b.
- **S2 note** — the 3 calculator default params (`= getEffectiveModsMap([])`)
  are places where data overrides silently won't flow unless the caller threads
  an overrides-aware map. Flag for `CatalogService`.

## Next

Milestone **1b** — service layer (`CatalogService`, `BuildService`,
`SimulationService`, `ComparisonService`, `ConfidenceService`), the
golden-baseline / calc-formula-gate CI (task 10), and **Steel Path** as the
first calc-formula-gated task (task 11, needs its own Argus sourcing pass +
`decisions.md` sign-off on the wiki values).
