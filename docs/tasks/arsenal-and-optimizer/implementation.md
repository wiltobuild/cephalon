# Implementation notes

## Current implemented surface

- Overview, searchable Arsenal (weapons, Warframes, mods, regular/Tauforged shards, Forma), item inspection and source links.
- Responsive weapon builder with authentic artwork, rank/polarity editing, remove, locks, undo/redo, independent picker searches, working dialog dismissal, and configured capacity.
- Build validation shared by calculation and optimization: known/compatible items, unique slots and mods, exclusion groups, legal ranks, capacity, scenario ranges and enemy identity.
- Narrow JSON response contract. Simulation time-limit returns an explicit outcome and null value, displayed as >600 seconds; raw engine state stays server-side.
- Bounded deterministic beam search with equal-weight general-use/faction presets, sustained/burst/legacy-TTK objectives, element requirements, additional standard Forma budget, locked slots, and optional owned-mod selection.
- Candidate pool and rank subset are disclosed. Same inputs produce the same result. No exact-optimality or current-game-accuracy claim. Current input is considered when permitted by constraints.
- Local versioned saves, shared snapshot fragments, and comparison recalculated under one scenario.
- Model/source page; old placeholder destinations removed from primary navigation.

## Data and mechanics

Damage formulas and engine golden outputs are unchanged. New public validation requires legal ranks, so service test fixtures now use catalog maxRank instead of rank 99. A matching slot polarity makes the existing heavy fixture legal; this does not affect damage or its snapshot.

`packages/services/src/catalog/mod-compatibility.json` contains only engine-ID-to-compatibility labels, plus source and revision; no imported damage stats. Source: WFCD/warframe-items commit e754da2d337eeaea93773e63cb25e94422567363, Mods.json. Refresh with `node scripts/refresh-mod-compatibility.mjs <reviewed-sha>` after building the engine; inspect the diff and run class eligibility tests. The source project distributes its metadata tooling under MIT; game content remains Digital Extremes' property. Preserve existing AGPL/NOTICE attribution.

Artwork metadata is fetched by a web server adapter and passed to a framework-free AssetService. Stable source identities are retained during resolution. Duplicate names resolve only when their artwork agrees; ambiguous/missing matches return a visible category fallback. Damage data is never updated by an artwork request. Sources: https://github.com/WFCD/warframe-items and https://www.warframe.com/en/contentpolicy.

## Deliberate model limits

Enemy resistances still use the legacy engine model. TTK is prominently labeled approximate. No Overguard/special-defense accuracy claim; no full Incarnon/Riven/exalted/ability optimization. Capacity and existing polarities are user-configured; ownership selection assumes available ranks, not actual Endo inventory.

Search is cooperative and bounded in the server process, with concurrency admission and cancellation. Distributed worker jobs, persistent optimizer caches, exact proofs, complete mechanic families, inventory integration and full loadout optimization remain future milestones.

## Verification approach

Preserve existing engine and service damage snapshots. Add legality, source-category, serialization, deterministic-search, lock/budget/ownership, and image-ambiguity tests. Verify production build plus live browser editing, optimizer, save/reopen, and phone flows. Tests do not establish current-game formula accuracy.
