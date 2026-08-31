# Codex handoff A — Phase 1a sub-tasks 1–4 (scaffold + engine import + tests + barrel)

Run from repo root `C:\Users\Wil\Documents\Projects\Cephalon`:

```
codex.cmd exec --skip-git-repo-check -s workspace-write -C "C:\Users\Wil\Documents\Projects\Cephalon" "<the prompt below>" < /dev/null
```

---

## Prompt

Task: Cephalon Phase 1a sub-tasks 1–4 — scaffold a pnpm monorepo and extract the
upstream Warframe calculation engine into one `packages/engine` package with its
full test suite passing. This is a mechanical extraction: **do not change any
calculation logic, formula, constant, or test assertion.**

Read first (all in the repo):
- `docs/tasks/phase-1a-engine-extraction/brief.md` — scope, out-of-scope, ACs.
- `docs/tasks/upstream-engine-investigation/plan.md` — Part G tasks 1–4 (the
  detailed spec), Part C (the public API surface), the "Repository shape &
  engine packaging" decision (Part A) incl. the R2 build-step note.
- `docs/tasks/upstream-engine-investigation/investigation.md` §2 (entry points +
  the 14 support helpers by name), §4 (bucket a/b/c), §5 (extraction blockers),
  Appendix (the closure file list).
- `docs/agent/upstream-engine.md` — seed content for the NOTICE file. Also note
  the naming rule: the upstream project's real name must appear ONLY in
  `packages/engine/NOTICE`, `packages/engine/src/data/PROVENANCE.md`, and the
  existing `docs/agent/*.md` — nowhere else (code, comments you add, config).

The upstream working clone is at `vendor/upstream-engine/` (gitignored, rev
e66896a). Source layout there: `src/lib/calc/`, `src/lib/{codex,display,mods,
overrides,weapons,builds,warframe-arsenal}/`, `src/lib/types.ts`, `src/data/`.
It uses Vitest 3, TypeScript 5 strict, a `@/* -> ./src/*` path alias, and
`npx vitest run` there is green at **47 files / 1898 tests**.

### Sub-task 1 — scaffold

- pnpm workspace (`pnpm-workspace.yaml`) with `apps/*` and `packages/*`.
- Node 24; pnpm via corepack. Add a root `package.json` (private, workspaces),
  `.npmrc` if needed, `tsconfig.base.json` (strict, `skipLibCheck`,
  `incremental`, `moduleResolution: "bundler"` or `"node16"` — match what the
  engine needs to compile).
- `apps/web`: a minimal Next.js 15+ App Router + TS app (`next`, `react`,
  `react-dom` — apps/web picks its OWN versions, independent of the engine). One
  page is fine. Add `transpilePackages: ['@cephalon/engine']` to `next.config`
  and a `@/*` path mapping in `apps/web/tsconfig.json` scoped to `apps/web/src`
  (NOT the engine's). This is the R2 decision: consumer resolves the engine
  from source via `transpilePackages` for now.
- Root scripts: `pnpm -r typecheck`, `pnpm -r test`. Per-package `typecheck`
  (`tsc --noEmit`).
- CI skeleton at `.github/workflows/ci.yml`: jobs `typecheck`,
  `engine-regression` (`pnpm --filter @cephalon/engine test`), `web-build`.
  Jobs must actually run these commands.
- Record the R2 choice in `docs/agent/decisions.md` (append a dated entry:
  "Phase 1a — R2 engine build-step: apps/web consumes @cephalon/engine via
  transpilePackages + source; a tsup/tsc-alias dist build is deferred to the
  first second consumer or publish. Approved by: user (Part A bundle)").

### Sub-task 2 — import the engine (this is the approved game-data bundling gate)

- Create `packages/engine` with `package.json` (`name: "@cephalon/engine"`,
  `private: true`, `type: "module"` if the source is ESM — check the upstream),
  `main`/`exports` pointing at `src/index.ts` (source; the dist build is
  deferred), `scripts`: `test` (`vitest run`), `typecheck` (`tsc --noEmit`).
- Copy, preserving the internal tree, from `vendor/upstream-engine/src/` into
  `packages/engine/src/`:
  - `lib/calc/**` (all of it, incl. `*-goldens.ts` and `*.test.ts`).
  - `lib/types.ts`.
  - `data/**` including `data/mod-behaviors/**`.
  - The support helpers named in investigation.md §2 — at minimum:
    `lib/codex/{ability-scaling-registry,codex-catalog,item-behavior-types,railjack-abilities}.ts`,
    `lib/display/{mod-display,arcane-display}.ts`,
    `lib/mods/{mod-behavior-registry,railjack-plexus-mods,set-mod-catalog}.ts`,
    `lib/overrides/{arcane-effect-overrides,data-overrides,override-merge,override-schemas,override-stat-catalog}.ts`,
    `lib/weapons/{effective-data,exalted-weapons,weapon-enrich,weapon-external-buffs,weapon-radial-utils}.ts`.
  - Also copy `lib/builds/{build-stats,loadout-stats,build-url}.ts` and their
    tests, and `lib/warframe-arsenal/riven-resolve.ts` — sub-task-5 (a LATER
    handoff) refactors these; for now just get them compiling in place under
    `packages/engine/src/` (put `builds/` and `riven-resolve.ts` where they
    currently sit relative to `src/`, i.e. `src/lib/builds/…` →
    `packages/engine/src/builds/…`? NO — keep the SAME relative path as
    upstream: `src/lib/...` in upstream becomes `src/lib/...` here is wrong.
    **Decision: drop the `lib/` prefix.** Upstream `src/lib/calc/x.ts` →
    `packages/engine/src/calc/x.ts`; upstream `src/lib/types.ts` →
    `packages/engine/src/types.ts`; upstream `src/data/x.ts` →
    `packages/engine/src/data/x.ts`. Update the `@` alias so `@/calc/...`,
    `@/data/...`, `@/types` resolve under `packages/engine/src`. You will need
    to rewrite the `@/lib/...` specifiers to `@/...` — this is a bounded
    mechanical find/replace across the copied files, NOT a logic change. If you
    prefer to keep `@/lib/...` working, instead alias `@` -> `packages/engine`
    so `@/lib/...` and `@/data/...` both resolve; pick whichever gives the
    smallest diff and document which in a `packages/engine/README.md`.)
- Do NOT copy: `src/app`, `src/components`, `prisma`, `src/lib/{auth,bot,site}`,
  the rest of `src/lib/warframe-arsenal`, anything importing `@wfcd/*`,
  `next-auth`, `@prisma/*`, `next/*`, `react`.
- `packages/engine/tsconfig.json` extends the base, sets the `@` path alias,
  `noEmit` for typecheck.
- `packages/engine/vitest.config.ts`: `environment: "node"`, `include:
  ["src/**/*.test.ts"]`, `resolve.alias` for `@` matching tsconfig.
- Dependencies: the closure has **zero** runtime npm deps. If the typecheck or
  test run reveals an import of an npm package, STOP and report it — do not add
  it silently (it would mean the closure is bigger than mapped).
- `LICENSE`: copy `vendor/upstream-engine/LICENSE` verbatim to repo root AND
  `packages/engine/LICENSE`.
- `packages/engine/NOTICE`: create from the "Attribution that must be preserved"
  + provenance facts in `docs/agent/upstream-engine.md` (upstream URL, rev
  e66896a, prior project name, MIT->AGPL note, unstated Dart-origin license, DE
  fan-content disclaimer).
- `packages/engine/src/data/PROVENANCE.md`: source = upstream `src/data/**` @
  e66896a; licence note (AGPL arrangement over DE-owned game facts); ~66k LOC;
  refresh = curated pull per Warframe major patch (see
  `docs/agent/upstream-sync.md`, written separately).
- `scripts/check-engine-boundary.mjs` (or `.sh`): greps `packages/engine/src`
  and exits non-zero on any match for `\b(react|next|next-auth)\b` imports,
  `@prisma`, `@wfcd/`, `process\.env`, `fetch\(`, `\bwindow\b`, `\bdocument\b`,
  `localStorage`. Allow a documented allowlist for `overrides/data-overrides.ts`
  ONLY (sub-task 5 removes it). Wire it into the `typecheck` CI job or its own
  job.

### Sub-task 3 — port tests

- The `*.test.ts` and `*-goldens.ts` were copied in sub-task 2. Ensure they all
  resolve under the package alias and run.
- `pnpm --filter @cephalon/engine test` MUST report **47 test files, 1898
  tests, 0 failures, 0 skipped** — identical to the upstream baseline. If the
  count differs, find the missing/extra file and fix the copy — do NOT edit
  test assertions or `it`/`describe` counts.

### Sub-task 4 — public API barrel

- `packages/engine/src/index.ts` re-exporting, in two clearly commented groups:
  - **Calculation surface**: `calculateWeaponBuild`,
    `calculateWeaponBuildWithArcanes`, `calculateWarframeBuild`,
    `applyWarframeShardsAndArcanes`, `calculateTTK`, `simulateDiscreteTTK`,
    `runDamageSim`, `calculateCompanionBuild`, `calculateArchwingBuild`,
    `calculateNecramechBuild`, `calculateRailjackBuild`, `evaluateRiven`,
    `getRivenGrade`, `getStatsWithDisposition`, `resolveIncarnonActiveWeapon`,
    `applyIncarnonFormToWeapon`, `buildAbilityTTKEntries`, `calculateAbilityTTK`,
    `abilityToPseudoWeaponStats`, `computeDpsContributions`,
    `mergeIncarnonStatChanges`, `mergeRivenStatChanges` — plus the I/O types
    from `types.ts` listed in plan.md Part C (`Weapon`, `Mod`, `Warframe`,
    `ModSlot`, `SimulationParams`, `DEFAULT_SIM_PARAMS`, `CalculatedStats`,
    `WarframeCalculatedStats`, `CompanionCalculatedStats`,
    `ArchwingCalculatedStats`, `RailjackCalculatedStats`, `EnemyType`,
    `TTKResult`, `DamageSimInputs`, `DamageSimResult`, `Loadout`,
    `SetBonusLinkage`, `WeaponCalculationOptions`, `ArchonShard`,
    `EquippedArchonShard`, `ModularBuildData`, `WeaponExternalBuff`, `Ability`,
    `EquippedMod`).
  - **Catalog-assembly surface (R1)**: the catalog loaders from `data/**` (e.g.
    `allWeapons`/`allMods`/… or whatever the accessor names are), `enrichWeapon`,
    the `effective-data.ts` `getEffective*` accessors, the override apply/merge
    helpers, and the `OverrideSet`/`DataOverride` types. Comment that this group
    is for the host's CatalogService only.
  - Verify names against the actual exports in the copied source; fix any that
    don't match and report the corrections.
- Add `packages/engine/src/__smoke__/barrel.test.ts` (counts toward the suite
  is fine, or keep it separate): imports ONLY from `@cephalon/engine` (the
  barrel, via a relative path to `../index` is acceptable in-package), builds a
  trivial weapon + a warframe from the catalog, runs `calculateWeaponBuild` /
  `calculateWarframeBuild` / `calculateTTK`, asserts finite positive numbers.

### Do NOT

- Change any file under `calc/`, `data/`, or any `*.test.ts` / `*-goldens.ts`
  except for import-path rewrites (`@/lib/...` -> `@/...`) needed by the chosen
  alias scheme. Report the exact find/replace you ran.
- Touch `overrides/data-overrides.ts`'s `overrideCache` / `window` logic, the
  `= getOverrides()` defaults, or `build-stats.ts`/`loadout-stats.ts` internals
  — that is sub-task 5, a separate handoff.
- Add any runtime npm dependency to `packages/engine`.

### Report back

- The alias scheme you chose and the exact import-path find/replace.
- `pnpm --filter @cephalon/engine test` output (the 47/1898/0/0 line).
- `pnpm -r typecheck` result.
- `scripts/check-engine-boundary` output (allowlist contents).
- Any barrel export name corrections.
- Anything that forced a judgement call.

Do not commit — leave everything staged/unstaged for review.
