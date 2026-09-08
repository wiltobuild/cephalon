# Elemental combat scoring — 2026-09-07

User requested that the optimizer account for elemental status effects, favor useful combinations where appropriate, and enforce chosen damage preferences.

## Implementation

The default UI objective is now Combat effectiveness: simulated time to kill. The existing deterministic shot/proc simulation accounts for elemental weighting and status chance, Viral health amplification, Corrosive/Heat armor reduction, damage-over-time, crit interactions and reloads. It does not grant maximum target status stacks at the first shot. Explicit paper sustained/burst objectives remain available and labeled as direct-damage metrics.

The search constructs ordered elemental skeletons before greedy expansion. Auto compares Viral + Heat, Corrosive + Heat, Viral, Corrosive, Magnetic, Radiation, Blast and Gas packages alongside existing and unconstrained candidates. Representatives include cheap, high-damage and high-status elemental mods, including 60/60 mods. Status damage/duration and forced-Slash mods are retained in the candidate pool instead of being discarded by the old damage-stat filter.

Explicit preferences must exist in the final engine-calculated elemental composition. Viral + Heat and Corrosive + Heat require both types simultaneously. The search evaluates actual slot order and innate elements, respects locks/ownership/capacity, and preserves the selected arcane and Exilus mod. If no legal matching candidate is found, it reports the constraints instead of silently applying a different damage type. Search remains bounded: skeletons use up to three added elemental mods with low/high-rank representatives, followed by greedy growth and ordering swaps. This is not a proof of global feasibility or optimality.

The faction comparison now labels paper DPS separately and reports peak expected Viral/Corrosive stacks reached by its full simulation. Lower paper DPS can therefore accompany a stronger combat result. No hard-coded preference forces Viral + Heat to win every weapon/target matchup.

## Sources and model scope

No engine formulas were changed; this change wires existing mechanics into default search ranking and fixes candidate construction. Source behavior is documented by Digital Extremes in [Warframe Revised](https://www.warframe.com/ja/patch-notes/switch/27-2-2) and [Jade Shadows](https://www.warframe.com/ko/patch-notes/switch/36-0-0). The inherited enemy resistance tables/scaling and unmodeled special defenses remain limitations. Tests establish internal behavior, not live-game parity.

## Verification

- Production build/typechecking passes.
- 72 service tests pass, including all ten explicit elemental preferences, a locked Heat slot, active Viral proc output and full-catalog Auto combat search.
- 11 Chromium end-to-end tests cover default combat selection, applying a Viral + Heat build, and changing a preference/retrying after an unsuccessful search.
- Engine boundary and ambient catalog checks pass.
- Local full-catalog combat regression took approximately 4–5 seconds after status candidates were included; this is not a performance SLA.
