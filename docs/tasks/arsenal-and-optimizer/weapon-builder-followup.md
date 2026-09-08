# Weapon builder follow-up — 2026-09-07

User requested familiar in-game mod cards, Exilus, hover effects, weapon arcanes, better combat assumptions, and broader companion positioning.

## Changes

- Full mod-card images resolve through the source manifest's wiki thumbnail URL. Some wiki requests fail; those cards retain a reconstructed frame with authentic artwork, name, polarity, drain, rank pips and effect text. Lower-rank cards use source rank-specific display text when available. Hover and keyboard focus expose details; text remains visible on touch screens.
- Slot index 8 is the weapon Exilus slot. Validation uses source utility metadata and weapon compatibility, shares ordinary mod capacity, and enforces exclusions across all nine slots. The optimizer preserves its selected mod and rank.
- A primary/secondary/melee arcane selector exposes class-compatible arcanes at max rank. Equipped arcanes flow through the existing engine for manual results, comparisons and optimizer evaluations. Active stack controls are explicit. Unmodeled entries are labeled; no automatic arcane selection or lower-rank arcane editing is claimed.
- Ordinary ground weapon arcane availability derives from the weapon class; inherited false flags incorrectly suppressed Braton's slot. An installed adapter is assumed and labeled.
- New builds default to in-combat stacks (5 mod kill stacks, 12 arcane stacks); the first-encounter preset zeros both. Each mechanic retains its engine stack cap. Heavy Caliber/accuracy-reducing candidates are opt-in; explicitly locked mods remain respected. Paper DPS still assumes hits land.
- Exact displayed-name Primed families augment inherited exclusion groups. This closes missing pairs including Cryo Rounds and Primed Cryo Rounds. Source type fallback excludes Plexus/Railjack items such as Orgone Tuning Matrix.
- Overview messaging and primary action now emphasize browsing the broader companion rather than the solver.

## Source and scope

WFCD/warframe-items commit e754da2d337eeaea93773e63cb25e94422567363 supplies compatibility, utility flags and rank display text. The refresh script now emits 1,485 compatibility labels; display text does not update damage formulas. Source: https://github.com/WFCD/warframe-items/tree/e754da2d337eeaea93773e63cb25e94422567363/data/json . Galvanized conditional/stack behavior and weapon arcane introduction: https://www.warframe.com/en/patch-notes/switch/30-5-0 .

The user explicitly authorized these corrections. Engine formulas remain unchanged; this change exports an existing compatibility helper. Approximate enemy resistance/scaling and special-mode limitations remain as documented.

## Verification

Production build/typechecking; 59 service tests and 8 web unit tests; 9 Chromium flows including Exilus restrictions, hover details, arcane damage/reload effects and preservation while solving. Service regressions cover stacked Galvanized Chamber selection, accuracy penalty exclusion, Exilus capacity, wrong-class arcanes, Railjack exclusion and ordinary/Primed mutual exclusion.
