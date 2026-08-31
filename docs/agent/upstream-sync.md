# Upstream-engine sync runbook

_How Cephalon pulls fixes from the upstream engine without letting a formula or
constant change enter silently. Referenced by `docs/agent/workflow.md` ("Catalog
refresh" row) and the `packages/engine` `PROVENANCE.md`._

The upstream is referred to only as "the upstream engine"; its identity is in
`docs/agent/upstream-engine.md`.

## Clones

| Purpose | Location | Depth | Committed? |
|---|---|---|---|
| Working copy used during the investigation | `vendor/upstream-engine/` (in-repo) | `--depth 1` @ `e66896a` | no — gitignored |
| **Reference / diff / license oracle** | `../_upstream-engine-reference/` (sibling of the repo, **outside** the monorepo) | full history (438 commits, 2026-02-15 → 2026-07-25) | no — outside the repo |

Keep the reference clone; it is the only full-history copy and the source for
license-provenance questions (see `docs/agent/upstream-engine.md` → History).
Refresh it with `git fetch --all` before each sync review. Do **not** add either
clone as a git remote of the Cephalon repo and do **not** merge from it.

## Cadence

Review for an upstream pull **once per Warframe major/mainline patch** (roughly
every 4–8 weeks), or when a specific bug in `packages/engine` is known to be
fixed upstream. Not on a fixed calendar; not automatically.

## Procedure (curated pull — never auto-merge)

1. `cd ../_upstream-engine-reference && git fetch origin && git log --oneline e66896a..origin/main`
   (replace `e66896a` with the rev recorded in `packages/engine/NOTICE` from the
   last sync).
2. Diff the two paths that matter, against the vendored copy:
   - `git diff <last-synced-rev>..origin/main -- src/data src/lib/calc`
     (adjust upstream paths; in `packages/engine` they are `src/data` and
     `src/calc`).
3. **Classify every change:**
   - **Catalog data only** — new/changed rows in `src/data/**` (`mods.ts`,
     `weapons.ts`, `warframes.ts`, `mod-behaviors/batches/**`,
     `riven-dispositions.ts`, etc.), no change to any `.ts` under `calc/` and no
     change to a numeric constant that a formula reads. → handle under the
     `workflow.md` **"Catalog refresh"** row: Argus confirms the classification,
     user approves, Codex applies the data delta, Apollo runs
     `verify-engine-baseline` (byte-compare) + the full 1898-suite. If the
     baseline moves, that is expected for genuine stat corrections — the diff of
     `engine-baseline.json` is reviewed and the update justified in the same PR.
   - **Any change to `calc/**` logic, or to a game constant** (armor cap 2700,
     S-curve coefficients, `ENEMY_TYPES` base stats, damage-type modifier
     tables, `ELEMENTAL_COMBOS`, stance multipliers, `ADAPTATION_*`, …) →
     **calc-formula-change gate**: split it out, Argus before/after + source,
     Athena writes it up, **user sign-off with a dated `decisions.md` entry**,
     elevated Themis, Apollo full-suite + any new characterization tests. Never
     bundle this with a data-only pull.
   - **Upstream app / bot / auth / arsenal / UI changes** → ignored; Cephalon
     does not use that code.
4. Apply the accepted delta to `packages/engine` by hand or a scoped patch —
   preserve `LICENSE`/`NOTICE`; bump the "synced to rev" line in
   `packages/engine/NOTICE` and `src/data/PROVENANCE.md`.
5. `pnpm --filter @cephalon/engine test` must stay at **1898/1898** (plus any
   tests added for a gated formula change). `verify-engine-baseline` runs.

## The `engine` / `warframe-data` package split (deferred — recipe)

Trigger: a concrete commercial-pivot plan, or a second consumer of the catalog.
Then (Argus: "~1 mechanical commit"):

1. New `packages/warframe-data` + a `packages/warframe-types` leaf.
2. Move the 3 pure files that cause the `calc`⇄`data` directory coupling into
   the leaf / data package: `types.ts`, `codex/item-behavior-types.ts` (zero
   imports), `mods/set-mod-catalog.ts` (only imports the `Mod` type — verify).
3. Re-point their importers — **26** edges (25 `item-behavior-types`, 1
   `set-mod-catalog`) plus the `types` importers.
4. Scoped codemod over the `@/data/*` specifiers now crossing the new boundary:
   **~75 non-test + ~81 test statements, 24 distinct modules** →
   `@cephalon/warframe-data`.
5. `packages/engine` keeps `calc/` + `support/` + `orchestration/`; depends on
   `@cephalon/warframe-data` (data) and `@cephalon/warframe-types` (types),
   one-way.
6. Re-run the 1898 suite + `verify-engine-baseline`; both must be unchanged.

Until the trigger, the engine ships as one package and this section is just a
plan.
