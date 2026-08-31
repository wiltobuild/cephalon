# Themis review — Phase 1a engine extraction

Reviewer: Themis (independent). Reviewed the uncommitted working tree against
`brief.md` (10 ACs), handoffs A/B, the Part A decisions, and the full-history
upstream reference at `../_upstream-engine-reference/` @ `e66896a`.

Independently re-ran: `pnpm --filter @cephalon/engine test` (**45 files / 1879 /
0 skips**), `pnpm -r typecheck` (clean), both guard scripts (pass), and a
file-by-file diff of every `packages/engine/src/**/*.ts` against upstream
(CRLF-normalised, `@/lib/` → `@/`).

---

## Must-fix

### M1. `check-engine-boundary.mjs` — 3 of 8 checks never fire (violates AC 3)

`scripts/check-engine-boundary.mjs:19-24` runs every check against
`sourceCodeOnly(content)`, which strips **all string literals** (line 23:
`.replace(/(['"`])…\1/g, "")`) before matching. The three import-detection
checks match on the module specifier *inside a string*:

- `framework import` → `/(?:from\s*["']|import\s*["'])(?:react|next|next-auth)…/`
- `Prisma import` → `/(?:from\s*["']|import\s*["'])@prisma\//`
- `WFCD import` → `/(?:from\s*["']|import\s*["'])@wfcd\//`

After string-stripping, `import { useState } from "react"` becomes
`import { useState } from ;` — the specifier is gone, so none of the three can
ever match. Only the five bare-identifier checks (`process.env`, `fetch(`,
`window`, `document`, `localStorage`) actually work.

**Proven:** a probe file containing

```ts
import { useState } from "react";
import NextAuth from "next-auth";
import items from "@wfcd/items";
export const x = useState;
```

placed in `packages/engine/src/` → `node scripts/check-engine-boundary.mjs`
prints "Engine boundary check passed. Temporary allowlist: empty", **exit 0**.
(A probe that also references `process.env` / `window` as bare words *is*
caught — confirming only the string-based checks are dead.)

**Failure scenario:** in milestone 1b/1c someone adds
`import { useState } from "react"` (or a `@wfcd/items`-derived catalog import,
or `next/*`) to `packages/engine/src`. CI stays green. The hard
`packages/engine` boundary that the "open now / commercial later" decision
(`decisions.md`, 2026-08-30) and the clean-room-swap plan depend on is
silently breached; AC 3's stated enforcement ("enforced by a committed CI
import-guard script") is not real for `react` / `next` / `next-auth` /
`@prisma` / `@wfcd`.

The engine tree is clean *today* (diff-verified byte-identical to upstream bar
the 4 files below, and a manual grep finds no such imports), so nothing
defective is in the artifact — but the guard must actually guard before this
is committed as the milestone's safety net.

**Fix:** run the import-specifier checks against a version of the file that
strips comments but preserves string contents (or match
`from\s*["'](react|next|next-auth|@prisma/|@wfcd/)` on raw content). Keep the
string-strip only for the bare-word checks if false positives are a concern.
Add a one-line self-test / fixture so a future regression of the stripper is
caught.

---

## Optional

- **O1 — `override-isolation.test.ts` is thin.** It only exercises
  `applyWeaponOverrides` (a pure list transform that was already safe). It does
  not touch the `getEffective*` accessors or prove that `mergedWeaponsBase`
  (the shared module-level array in `weapons/effective-data.ts:28`) is never
  mutated across override applications. The de-singleton *is* in fact safe —
  `deepMergeOverrideFields` (`overrides/override-merge.ts:13`) is non-mutating
  (spread + recursive new objects) and there is **no module-scope `let`**
  anywhere in `packages/engine/src` — but the test as written wouldn't catch a
  future regression to in-place mutation. Add an assertion that a
  `getEffectiveWeapons(setA)` call leaves `getEffectiveWeapons([])` output
  byte-equal to the pre-call baseline.

- **O2 — minimal-diff alternative for the 4 default-param files.** The static
  `new Map(allMods.map(...))` defaults are behaviourally identical to
  `getEffectiveModsMap([])` (empty override set → base data). Using
  `getEffectiveModsMap([])` / `getEffectiveWarframesMap([])` would have been a
  smaller, more consistent diff and would keep a single code path for
  "no-overrides catalog". Not required, but cleaner if revisited.

- **O3 — test files are excluded from `tsc`.** `packages/engine/tsconfig.json`
  has `"exclude": [..., "src/**/*.test.ts"]`, so `pnpm -r typecheck` never
  type-checks the ported suite. Vitest transpiles without type-checking, so a
  wrong-arity / wrong-type call in a test is only caught if it throws at
  runtime. AC 4 is still covered (the `check-no-ambient-catalog.mjs` grep does
  scan test files), but consider a test-inclusive `tsc` project so ported test
  call-sites stay type-safe as signatures evolve.

- **O4 — AC 9 is only half-satisfied.** `apps/web` declares
  `"@cephalon/engine": "workspace:*"` but nothing imports it —
  `apps/web/src/app/page.tsx` is static JSX. `next build` therefore never
  resolves or executes engine code; the "smoke import that runs one weapon
  calc + one warframe calc + `calculateTTK`" required by AC 9 is satisfied only
  by the in-package `__smoke__/barrel.test.ts`. Add a trivial server component
  / route in `apps/web` that imports the barrel and runs the three calcs, so
  the `transpilePackages` consumer path is actually exercised by CI's
  `web-build` job.

- **O5 — `LICENSE` is upstream's 7-line stub.** Both copies
  (`/LICENSE`, `/packages/engine/LICENSE`) are a verbatim copy of upstream's
  LICENSE, which is just a pointer to `gnu.org/licenses/agpl-3.0.html` plus the
  copyright line — not the full AGPL-3.0 text. This is faithful to handoff A's
  "copy verbatim" instruction, but AGPL distribution really wants the full
  text shipped. Consider adding the full licence as `LICENSE.AGPL-3.0` (or
  inlining it) while keeping the upstream stub verbatim.

- **O6 — barrel omits the arcane-effect accessors.** `getArcaneEffectDef` /
  `applyArcaneEffectOverrides` are not exported from `src/index.ts`. Combined
  with S3 below, arcane-effect overrides are unreachable through the public
  API. If the host CatalogService is ever meant to feed them, they need a
  barrel entry.

---

## Scope drift

- **S1 — `mods/warframe-augment-mods.ts` changed beyond import paths.**
  `buildWarframeToAugmentsIndex` (l.60) and `getAugmentWarframeEntry` (l.89)
  had their `getEffectiveModsMap()` / `getEffectiveWarframesMap()` calls
  replaced with inline `new Map(allMods.map(...))` / `new Map(allWarframes...)`,
  adding two new imports. Unlike the 3 calculators, these functions take **no
  catalog/overrides parameter at all** — the override seam is removed
  entirely, not just re-defaulted. Impact today is nil: neither
  `getAugmentModIdsForWarframe` nor `getAugmentWarframeEntry` is called
  anywhere in `packages/engine/src` and neither is in the barrel (they were
  UI-only in upstream). Still, this is a `mods/` support file edited past
  "import-path rewrites"; `getEffectiveModsMap([])` would have kept the diff
  mechanical.

- **S2 — `calc/{archwing,companion,railjack}-calculator.ts` default params.**
  `allMods: Map<string, Mod> = getEffectiveModsMap()` → static map built from
  `@/data/mods`. Forced (the accessor now requires an arg). Behaviour-
  preserving: every one of the 1879 tests passes because no test sets
  overrides, and Phase 1 ships no override host, so the effective map == the
  static map. **The parameter seam is preserved** — a host can still pass an
  overrides-aware `allMods` — so this is a defaulting change, not a capability
  loss. Flag for the CatalogService milestone: these three defaults are places
  where overrides silently will *not* flow unless the caller threads them.

- **S3 — `overrides/arcane-effect-overrides.ts` uses `= []`, not required.**
  `brief.md` sub-task 5 (l.41) groups this file with "`apply*Overrides` /
  `getEffective*` take a **required** explicit `OverrideSet`"; handoff B §5.2
  says "change its exported function(s) to take `overrides: OverrideSet`" with
  no default. The implementation gives both functions `overrides: OverrideSet
  = []`. Rationale (per the coordinator) was to avoid threading an override
  set through `calc/calculator.ts` (which calls `getArcaneEffectDef(arcane.id)`
  at l.1923, plus 4 call sites in `calc/arcane-calculator.ts`).

  Consequence: once a host wires overrides, weapon/mod/warframe/companion/
  arcane/archon-shard/archwing/necramech overrides all flow (required params
  force the host to pass them), but **arcane-*effect* magnitude overrides
  silently will not** — the one override category that reaches deep into the
  damage math via `calculator.ts`. In upstream, a populated `overrideCache`
  would surface those on the calc path.

  Phase-1 impact is **nil** (no override host exists; `setOverrideCache` is
  deleted; upstream-in-this-repo would also see an empty cache server-side).
  But it is an undocumented divergence from the brief's stated "required"
  intent and a latent footgun for the milestone that adds the CatalogService.
  Acceptable to keep the `= []` *if* it is recorded as an approved deviation
  with a follow-up task ("thread arcane_effect overrides through
  `calculator.ts` / `arcane-calculator.ts` when the override host lands").
  Right now it exists only as an open question in `verification.md`.

- **S4 — pre-existing, not this change:**
  `docs/tasks/upstream-engine-investigation/{architecture,brief,investigation,plan}.md`
  (committed in `0838d2d`) contain the upstream project name, which the
  CLAUDE.md naming rule and AC 8 confine to `NOTICE` / `PROVENANCE.md` /
  `docs/agent/*`. The new artifacts in this change
  (`docs/tasks/phase-1a-engine-extraction/*`, `docs/agent/upstream-sync.md`)
  are clean. AC 8's allow-list also doesn't literally mention `LICENSE`, whose
  verbatim copyright line necessarily contains the prior project name — that's
  unavoidable and correct. Worth a cleanup pass on the investigation docs
  separately.

---

## What was verified clean (no action)

- **De-singleton complete.** `overrideCache`, `setOverrideCache`,
  `getOverrides`, `notifyDataOverridesUpdated`, `generateOverrideId`, the
  `data-overrides-client` lazy imports, and all `saveOverride`/`export…`/
  `import…` persistence funcs are gone from `overrides/data-overrides.ts`. No
  dangling references anywhere in the package. No module-scope `let`; the only
  shared module state left (`mergedWeaponsBase`, registry `const` maps) is
  read-only and never mutated (`deepMergeOverrideFields` is pure). `OverrideSet
  = readonly DataOverride[]` + required params on all 8 `apply*Overrides`, the
  8 `getEffective*` + `*Map` variants, `getOverrideForTarget`, and
  `resolveEffectiveModOrArcane`. Multi-tenant-safe.

- **Orchestration lift is faithful.** `orchestration/build-stats.ts` and
  `orchestration/loadout-stats.ts` diff against upstream as *only*
  import-path rewrites + a threaded `catalogs` param + the
  `resolveSavedArcaneSlots(ids, catalogs, n)` signature change. **Zero**
  numeric/logic changes. No `getEffective*()`, `localStorage`, `window`, or
  persistence imports remain (guard-verified over all of
  `packages/engine/src`). The `LoadoutStatsCatalogs` / `BuildStatsCatalogs`
  shape (`extends BuildResolverCatalogs` with
  `weapons/weaponsMap/modsMap/warframesMap/companionsMap` + `arcanes`) covers
  every catalog the functions actually read; helminth/incarnon/dual-form data
  is static and imported directly (as upstream did). `build-url.test.ts` and
  `override-merge.test.ts` are byte-identical; `loadout-save.test.ts` has only
  import-path + `catalogs` threading, no assertion changes.

- **`support/build-resolvers.ts` is a genuine pure subset.**
  `resolveArcaneById` / `resolveSavedArcaneSlots` reimplemented to read
  `catalogs.{modsMap,arcanes}` instead of `resolveEffectiveModOrArcane`;
  behaviourally equivalent. Only the intended type-only exports pulled across.
  No `localStorage`, no `fetch`, none of
  `getSavedBuilds`/`saveBuild`/`persistSavedBuild`/`generateBuildId`/`getCloudBuilds`/etc.

- **`support/riven-resolve.ts`** — byte-identical to upstream
  `warframe-arsenal/riven-resolve.ts` except one comment de-naming the
  upstream project. `warframe-arsenal/` dir removed; sole importer
  (`orchestration/loadout-stats.ts`) repointed.

- **`builds/loadouts.ts`** — `getLoadouts`/`saveLoadout`/`deleteLoadout`/
  `generateId`/`normalizeLoadout` (all `window`/`localStorage`/`Date.now`)
  removed; pure serialization helpers kept and still exported for
  `loadout-save.test.ts`.

- **Test-count honesty.** 47 upstream files − 4 non-engine
  (`bot/worldstate-client`, `warframe-arsenal/{catalog-match,normalize-payload}`,
  `components/stats/use-sim-stat-change-flash` — matches Argus §6) = 43, + 2
  new (`override-isolation`, `__smoke__/barrel`) = 45. No `.skip` / `.only` /
  `.todo` / `xit` / `xdescribe` / commented-out `it(`. 1879 = 1875 + 1
  isolation + 3 smoke. (Brief AC 2 predicted 44/1876 — it just didn't count
  the barrel smoke file that handoff A adds. Doc nit, not a defect.)

- **`check-no-ambient-catalog.mjs`** works: probe with
  `getEffectiveWeapons()`, `getEffectiveModsMap(  )`, `getOverrides()` → all
  three caught; `getEffectiveWeapons([])` → correctly ignored. Scans test
  files too.

- **CI wiring.** `.github/workflows/ci.yml` has three jobs that run real
  commands with no `continue-on-error`: `typecheck` (`pnpm -r typecheck` +
  both guard scripts), `engine-regression`
  (`pnpm --filter @cephalon/engine test`), `web-build`. The guards gate via
  the `typecheck` job. (Branch protection can't exist yet — no remote.)

- **Licensing artifacts.** `LICENSE` present and identical at repo root +
  `packages/engine/`; `packages/engine/NOTICE` accurate against
  `docs/agent/upstream-engine.md` (repo URL, rev `e66896a`, prior names,
  MIT→AGPL note, unstated Dart-origin licence, DE fan-content disclaimer);
  `packages/engine/src/data/PROVENANCE.md` present and accurate. See O5, S4.

- **`apps/web`** is a bare shell (`layout.tsx`, `page.tsx` = `<main>Cephalon</main>`,
  `next.config.ts` with `transpilePackages`, tsconfig). No scope creep. See O4.

---

## Verdict

**Needs one more pass — small.** This is a clean, faithful mechanical
extraction: `calc/**` and `data/**` are byte-identical to upstream except the
four documented default-param files, the de-singleton genuinely removes all
shared mutable state, and the orchestration lift changes no calculation logic.
The suite is green at the right baseline with no dropped tests.

Blocking before commit:

1. **M1** — fix `check-engine-boundary.mjs` so the `react`/`next`/`next-auth`/
   `@prisma`/`@wfcd` import checks actually fire (2-line fix + a self-test).
   AC 3 names this script as the enforcement mechanism and it currently
   doesn't enforce.
2. **S3** — either restore the required `OverrideSet` param on
   `arcane-effect-overrides.ts` (threading through `calculator.ts` /
   `arcane-calculator.ts`), or record the `= []` as an explicit approved
   deviation in `decisions.md` with a follow-up task for the CatalogService
   milestone. Don't leave it as only an open question in `verification.md`.

Everything else (O1–O6, S1–S2) can be logged as follow-ups. Once M1 is fixed
and S3 is written down, ready to commit.
