# Codex handoff B — Phase 1a sub-task 5 (catalog-assembly de-singleton + orchestration lift)

Builds on the staged (uncommitted) work from handoff A. Run from repo root:

```
codex.cmd exec --skip-git-repo-check -s workspace-write -C "C:\Users\Wil\Documents\Projects\Cephalon" "<prompt below>" < /dev/null
```

---

## Prompt

Task: Cephalon Phase 1a sub-task 5 — remove the ambient `overrideCache`
singleton and all `window`/`localStorage`/persistence code from
`packages/engine`, make override application an explicit parameter everywhere,
split the pure resolvers out of the (not-copied) `build-storage.ts`, and lift
the two build-orchestration modules into `packages/engine/src/orchestration/`
taking catalogs as parameters. **This is a structural refactor. Do NOT change
any calculation formula, constant, scaling, or numeric test assertion.** The
only permitted test edits are mechanical call-site updates for the signature
changes below (e.g. `getEffectiveWeapons()` → `getEffectiveWeapons([])`).

Read first: `docs/tasks/phase-1a-engine-extraction/brief.md` (sub-task 5 + ACs
3,4,5,6,7), `docs/tasks/upstream-engine-investigation/plan.md` Part G task 5 and
the "`overrideCache` singleton" + "orchestration" decisions in Part A. Full-history
reference source at `../_upstream-engine-reference/src/lib/` for anything not
copied.

Handoff A chose alias `@ → packages/engine/src` and rewrote `@/lib/...` → `@/...`.
Keep that.

### 5.1 — `overrides/data-overrides.ts`

- **Delete** `overrideCache`, `setOverrideCache`, `getOverrides`.
- **Delete** `saveOverride`, `deleteOverride`, `deleteOverrides`,
  `exportOverrides`, `importOverrides` (all lazy-import
  `@/overrides/data-overrides-client`, which is not in the package — it stays in
  `apps/web`), `notifyDataOverridesUpdated` (`window`), and `generateOverrideId`
  (`Date.now`/`Math.random`; authoring-only). Remove the now-dead
  `data-overrides-client` import sites.
- **Keep** `DataOverride`, `OVERRIDE_CATEGORIES`, `OverrideCategory`,
  `mergeOverrideLists`, `applyOverridesToList`, `applyModify`,
  `deepMergeOverrideFields` (re-exported), and the eight `apply*Overrides`
  functions — but change every `apply*Overrides(items, overrides = getOverrides())`
  to `apply*Overrides(items: T[], overrides: DataOverride[])` — **required
  param, no default**.
- Change `getOverrideForTarget(targetType, targetId)` →
  `getOverrideForTarget(overrides: DataOverride[], targetType, targetId)`.
- Add and export `export type OverrideSet = readonly DataOverride[];` — use it
  as the param type on the `apply*` / `getEffective*` signatures (an alias for
  `DataOverride[]`; no runtime wrapper).

### 5.2 — `overrides/arcane-effect-overrides.ts`

- It calls `getOverrides().filter(...)`. Change its exported function(s) to take
  `overrides: OverrideSet` and use that instead. Update callers (grep the
  package).

### 5.3 — `weapons/effective-data.ts`

- All 8 `getEffective<X>()` accessors + their `<X>Map` variants call
  `getOverrides()` with no args. Give each a **required** `overrides: OverrideSet`
  parameter and thread it into the `apply*Overrides` calls. The `*Map` variants
  take `overrides` and pass to the non-map variant.
- No caching/memoisation added here (the host's CatalogService will own that).

### 5.4 — split `build-storage.ts` pure resolvers → `support/build-resolvers.ts`

`build-storage.ts` was intentionally NOT copied (localStorage/fetch). Create
`packages/engine/src/support/build-resolvers.ts` containing ONLY the pure
members the package needs, ported verbatim from
`../_upstream-engine-reference/src/lib/builds/build-storage.ts`:
- `resolveArcaneById`, `resolveSavedArcaneSlots`
- the type-only exports: `SavedBuild`, `WeaponBuildData`, `WarframeBuildData`,
  `CompanionBuildData`, `ArchwingBuildData`, `RailjackBuildData`, and
  `export type { ModularBuildData }`.
- Do NOT port `getSavedBuilds`/`saveBuild`/`deleteBuild`/`generateBuildId`/
  `getCloudBuilds`/`saveCloudBuild`/`deleteCloudBuild`/`persistSavedBuild`
  (localStorage + fetch — they belong to `apps/web`).
Then repoint every `@/builds/build-storage` import in the package
(`build-stats.ts`, `dual-form-warframes.ts`, `loadout-stats.ts`, `loadouts.ts`,
`loadout-save.test.ts`) to `@/support/build-resolvers`.

### 5.5 — split `builds/loadouts.ts`

- Keep in the package (pure): `LoadoutBuildData`, `normalizeLoadoutBuildData`,
  `loadoutToBuildData`, `loadoutFromSavedBuild`, `mergeCloudLoadout`,
  `mergeCloudLoadoutPreservingSlots`, and any other pure serialization helper.
- **Remove** `getLoadouts`, `saveLoadout`, `deleteLoadout` (`window` /
  `localStorage`) and `generateId` if it uses `Date.now`/`Math.random`. If a
  pure function needs an id, accept it as a parameter.
- `loadout-save.test.ts` imports 3 symbols from `@/builds/loadouts` — keep those
  exported (they are the pure ones).

### 5.6 — lift orchestration into `packages/engine/src/orchestration/`

- Move `builds/build-stats.ts` → `orchestration/build-stats.ts` and
  `builds/loadout-stats.ts` → `orchestration/loadout-stats.ts` (update their
  own relative imports).
- **Refactor both to receive catalogs as parameters** instead of calling
  `getEffective*()` with no args. Add a single `catalogs` parameter object to
  each public entry point, e.g.
  `{ weapons, weaponsMap, modsMap, warframesMap, companionsMap, arcanes, archonShards, … }`
  — whatever subset each function actually uses (grep the ~20 `getEffective*`
  call sites). The functions must NOT import `@/weapons/effective-data` for data
  any more; they receive it. (They MAY still import pure types from there.)
- `builds/build-url.ts` stays where it is (pure serialization). Keep
  `builds/build-url.test.ts`, `builds/loadout-save.test.ts`,
  `overrides/override-merge.test.ts` — update only their import paths and any
  bare `getEffective*()` / no-arg calls to pass `[]` or an explicit small
  catalog. **No numeric assertion changes.**

### 5.7 — move `warframe-arsenal/riven-resolve.ts` → `support/riven-resolve.ts`

Verify it is import-pure (Argus: it is — DE-tag→stat lookup tables + a mapping
function, zero deep imports). Move it, update importers
(`loadout-stats.ts` per Argus). Delete the now-empty
`packages/engine/src/warframe-arsenal/` if nothing else remains there.

### 5.8 — barrel + boundary + guard

- `packages/engine/src/index.ts`: in the **catalog-assembly** group, export
  `OverrideSet`, `DataOverride`, `mergeOverrideLists`, the `apply*Overrides`
  helpers, `deepMergeOverrideFields`, `enrichWeapon`, and the 8
  `getEffective*` accessors (now taking `OverrideSet`). Keep the calculation
  group unchanged. Add the `orchestration/` entry points
  (`calcSavedWeaponBuildStats`/`calcLoadoutStats`/etc. — whatever they are) to
  the calculation group with a comment that they take a `catalogs` param.
- `scripts/check-engine-boundary.mjs`: **remove the `overrides/data-overrides.ts`
  allowlist entry**. The script must now pass with an **empty** allowlist over
  all of `packages/engine/src`.
- Add `scripts/check-no-ambient-catalog.mjs` (wire into CI + `pnpm -r typecheck`
  job): greps `packages/engine/src/**/*.ts` and fails on any
  `getEffective[A-Za-z]*\(\s*\)` (zero-arg) or `getOverrides\s*\(` occurrence.
  Zero matches required.

### 5.9 — concurrency test (AC 5)

Add `packages/engine/src/overrides/override-isolation.test.ts`: build two
different `OverrideSet` values (e.g. one that renames weapon `braton` to "A",
one to "B"), call `applyWeaponOverrides(weapons, setA)` and
`applyWeaponOverrides(weapons, setB)` interleaved, assert the two results are
independent and neither leaks into the other or into a third bare call. Also
assert there is no module-level mutable state (a second import returns the same
pure behavior).

### Do NOT
- Change any `calc/**` or `data/**` file except mechanical import-path updates.
- Change any numeric test expectation or `it`/`describe` count semantics
  (adding the 1 new isolation test file is expected).
- Add any runtime npm dependency.
- Commit.

### Report back
- Every file moved/created/deleted.
- The `catalogs` parameter shape you gave each orchestration entry point.
- Which bare `getEffective*()` / `getOverrides()` call sites you updated (incl.
  in tests) and to what.
- `scripts/check-engine-boundary.mjs` output (must pass, empty allowlist) and
  `scripts/check-no-ambient-catalog.mjs` output (must pass).
- Anything that required a judgement call or that you could not make pass.
