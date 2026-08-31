# Themis review — Task 13, Weapon Builder (`37c98f6`)

Reviewed as a defect hunt. Nothing here needs re-approval. Verified builds/tests
re-run where possible; findings below are code-read + engine/service cross-checks.

---

## Must-fix

### M1. Damage / Critical / Status profile panels never reflect the build
`weapon-builder.tsx` renders the three profile panels (`Damage profile`,
`Critical profile`, `Status output`) entirely from `detail.base` — the static
`GET /api/weapons/[id]` base-stat summary. They do **not** read `result`. So
adding Serration, Point Strike, Split Chamber, a riven, or an arcane changes the
top `StatRow` (Sustained/Burst/Avg Hit/TTK) but the crit panel still shows the
bare "10% CC · 2.0× CM", status still shows the unmodded rate, and the damage
bar still shows only innate IPS. Three of the six required hierarchy sections
(brief: "damage profile → critical profile → status output") are dead, and they
visibly contradict the live primary metrics next to them. The modded values are
already in the response — `WEAPON_STAT_FIELDS` emits `criticalChance`,
`criticalMultiplier`, `statusChance`, `multishot`, `fireRate` with confidence
tags — they are just not wired in. Violates AC 3 ("toggling a mod … updates the
metrics") and AC 8 (hierarchy). Fix: drive these panels from `result.stats`,
falling back to `detail.base` only pre-first-result.

### M2. The three profile panels hard-code their confidence tags
Related to M1: `<ConfidenceBadge tag="verified" />` (damage), `tag="verified"`
(crit), `tag="approximation"` (status) are literals in the client, not values
from the server response. AC 4/5 require every rendered stat to carry its
server-issued `ConfidenceTag`. `ConfidenceService` is the authority; the UI must
not invent tags. Fix alongside M1 by rendering the tag from the corresponding
`result.stats[]` entry.

### M3. AC 7 not met — the server route test runs nowhere and cannot run as written
`apps/web/src/server/build-weapon.test.ts` exists but:
- `apps/web` has **no `vitest.config.*`** and no `pretest` engine build. `pnpm
  --filter web test` runs bare `vitest run`, which does not resolve tsconfig
  `paths`. The test imports `@/app/api/build/weapon/route` and `@/server/services`
  — both fail module resolution. (`packages/services` works only because it ships
  its own `vitest.config.ts`.)
- **No CI job invokes it.** `.github/workflows/ci.yml` adds an `e2e` job but no
  web unit-test job; nothing runs `pnpm -r test` or `pnpm --filter web test`.
The commit message itself concedes "apps/web build-weapon.test not yet run by
CI". AC 7 ("Server route/service tests … returns numbers matching BuildService
called directly") is therefore unverified in practice. Fix: add
`apps/web/vitest.config.ts` with the `@/*` alias + engine build prereq, and a CI
job that runs it.

### M4. Every weapon shows fabricated "MR 0" and "Disposition 1.00"
The engine `Weapon` type (`packages/engine/src/types.ts:18`) has no `masteryReq`,
`disposition`, `polarities`, or `exilus`. `CatalogService.listWeapons` /
`getWeaponDetail` paper over this with `(weapon as unknown as Record<string,
unknown>)` casts and `?? 0` / `?? 1` / `[]`. Result: the header chips and every
weapon-switcher row render `MR 0` and `Disposition 1.00` for **all** weapons, and
every mod slot shows the `◇` "no polarity" fallback, and the exilus slot never
appears. This is fabricated data presented as fact on the primary product
surface. `disposition` **is** available — `rivenDispositions` in
`packages/engine/src/data/riven-dispositions.ts` (keyed by weapon name) — and the
brief's `/api/weapons` contract explicitly lists `disposition`. Fix: wire
`disposition` from that table; for `masteryReq` / `polarities` / `exilus` (no
data source yet) **omit the chip / slot hint** rather than print a false zero.

### M5. A simulation failure discards the deterministic build result
`POST /api/build/weapon` wraps `builds.calculateWeapon(...)` **and**
`sims.simulate(...)` in one `try`, returning `400 {error}` on any throw.
`SimulationService.simulate` throws on an unknown enemy id, and TTK/sim is the
approximation layer. Any sim-side error (future roster edit, a bad `level` — the
client's `level` `NumberInput` has no min/max clamp, unlike the other scenario
fields — or the discrete path) collapses the entire response, so the client's
`if (!response.ok) throw` path leaves the builder blank with only a
`console.error`. The project principle is that the deterministic engine result is
authoritative and must stand on its own. Fix: validate the enemy id up front, and
run the sim in its own `try` so the build view-model still returns with `ttk`
omitted + a caveat when the sim can't run.

### M6. `compatibleMods` offers cross-class mods (shotgun/bow mods on a rifle)
`CatalogService.compatibleMods` maps `melee|beast_claw → melee`,
`pistol|secondary|dual_pistols → secondary`, **everything else → primary**, and
calls `modEligibleForWeaponSlot(mod, builderCategory, weapon.category, "regular")`
with **no `weaponProfile`**. `modMatchesWeaponBuilderCategory` case `"primary"`
accepts mod categories `["primary","rifle","shotgun","bow","launcher","general"]`,
and without a `WeaponModProfile` the finer `modCompatibleWithWeaponProfile` gate
is skipped. So the Braton mod picker lists shotgun mods (Hell's Chamber, Blaze)
and bow mods. The brief requires filtering "by the weapon's mod-compat rules via
the catalog". A Warframe player will immediately reject a rifle picker full of
shotgun mods. Fix: pass a `WeaponModProfile` for the weapon (or at least
post-filter by `mod.category` against the weapon's real class); also `archgun`
weapons currently fall into `primary` and get rifle mods, not archgun mods.

---

## Optional / follow-up

- **O1. Global CSS leak.** `weapon-builder.css` is a plain (non-module)
  stylesheet imported from a client component, so Next treats it as global. It
  contains a bare element rule `select{min-height:…;background:…;border:0;
  border-bottom:…}` plus generic class names (`.metrics`, `.eyebrow`,
  `.details-list`, `.picker-list`). Once this route's chunk loads, that `select{}`
  rule restyles every native `<select>` in the app. Scope it (CSS module or a
  `.weapon-builder select` prefix). Borderline M — flagged Optional only because
  it doesn't break this screen.
- **O2. Delta never clears.** `<Delta>` renders whenever `previous.value !==
  result.value`; there is no ~2 s timeout (brief: "for ~2 s"; design doc:
  "visibly animates"). It also isn't an animation — just a static caption swap —
  and nothing in the file references `prefers-reduced-motion`. AC 3's literal
  "shows the signed delta" is met; the design intent isn't.
- **O3. Nested buttons.** Each filled `.mod-slot` is a `<button>` containing two
  more `<button>`s (rank steppers). Invalid DOM; React will log a
  `validateDOMNesting` warning, which brushes AC 1's "no console errors". Works
  because the inner handlers `stopPropagation`. Use non-button elements or lift
  the steppers out of the slot button.
- **O4. Boundary check is a blunt text match.** `scripts/check-engine-boundary.mjs`
  regex only catches the exact bare specifier. Verified it misses:
  `@cephalon/services/dist/…` and `@cephalon/engine/…` subpath imports, and
  `await import("@cephalon/services")`. It also can't see a **value** re-export
  through `apps/web/src/server/*` (the whole dir is exempt, and a client
  importing `@/server/x` reads as clean) — only safe today because `contracts.ts`
  re-exports **types** with `import type`. It does catch the realistic case
  (bare `from "@cephalon/engine"`, even minified) and `server/` is the sole
  exemption and is currently server-only. Tighten the regex to `@cephalon/(engine|services)(/|["'])` and consider failing on value re-exports from `server/`.
- **O5. Arcane picker is hard-coded primary-only.** The Drawer lists a fixed
  triplet `arcane_primary_{merciless,deadhead,dexterity}` for every weapon,
  regardless of category. Brief asked for "a picker of weapon arcanes" from the
  catalog. `BuildService` silently drops ids not in `getArcanes()`, so a secondary
  / melee weapon's arcane slot is a no-op. Confirm those ids are in the arcane
  catalog map (they exist in `arcane-behaviors.ts`; not verified in `getArcanes()`).
- **O6. `primaryEffect` string.** `Object.entries(mod.stats)[0]` then
  `${key} ${Math.round(v*100)}%`. Key order is data-insertion order (stable but
  not "dominant"), the label is the raw stat key (`criticalChance`, not "Crit
  Chance"), and `×100%` is wrong for any flat stat. Picker list has no sort
  (crit-on-headshot mods appear before Serration). Cosmetic; fix when the picker
  gets a real information design.
- **O7. Damage-bar legend** only prints Impact/Puncture/Slash and omits innate
  elementals that the bar itself renders (commit message notes this).
- **O8. `MiniBar` imported but unused** in `weapon-builder.tsx` (hand-rolled
  `.damage-stack` used instead). `.damage-stack` colours are hard-coded hex
  (`#a5b4fc` etc.) rather than tokens — minor design-system slip.
- **O9. Scenario `faction` select** offers only Grineer/Corpus/Infested but
  Corrupted / Stalker enemies are selectable; faction can silently disagree with
  the chosen enemy archetype.
- **O10. Empty-state scroll quirk** (as reported). `.builder-empty{margin:12vh
  auto}` inside the shell's `main{overflow:auto}` — the vertical `vh` margins
  don't collapse through the scroll container, so the centered panel forces a
  short scroll with empty space above/below. The shell already ships the right
  pattern (`.placeholder{min-height:180px;display:grid;place-items:center}`) —
  reuse it instead of `margin:12vh auto`.
- **O11. Source density.** `weapon-builder.tsx` is 37 lines of multi-statement
  one-liners; `weapon-builder.css` is one 1.6 KB line. This file is explicitly
  "the template for the Warframe Builder (task 14)" — it should be readable.

---

## Scope drift

- `vitest` added as an `apps/web` devDependency — beyond the sanctioned
  `@cephalon/services` + `@playwright/test`. Needed for M3's test, so fine, but
  note it (and it's currently inert — see M3).
- Commit message body contains stray heredoc artifacts (`EOF` and `)` lines 33–34).
- `@cephalon/engine` was removed from `apps/web` direct deps and replaced by
  `@cephalon/services` — expected per brief (engine is transitive), noted for
  completeness.
- No upstream project name found anywhere in the diff. No unexpected runtime deps.
- Nav "Damage Calculator" now points to `/tools/weapon-builder`; the old
  `/tools/damage-calculator` path had no route, so nothing is orphaned.

## What checks out

- AC 2 core: the boundary script does scan all of `apps/web/src` except
  `server/`, and catches the straightforward bare import in `ui/**` and `app/**`
  (evasions in O4).
- AC 5 (S1 honesty): scenario panel exposes only faction / enemy / level / Steel
  Path toggle / binary "Headshots (on/off)" / "Status types on target (count)"
  0–5 / kill stacks / arcane stacks. No armor-strip-%, headshot-rate-%, or
  status-uptime field. The "derived by the simulation" footnote is present.
  Steel Path's `approximation` tag surfaces on the TTK badge + detailed caveats
  (no dedicated SP row badge — minor).
- AC 4: `result.stats[]` — all 10 entries carry a `ConfidenceTag` from
  `ConfidenceService`; `ttk` gets one in the route; response types shared via
  `contracts.ts`. (The leak is the *client-side* panels — M2.)
- AC 6: the Playwright spec's selectors line up with the DOM
  (`choose weapon` button, `[data-metric=sustainedDps]`, `empty slot`,
  `[data-delta]`, `[data-confidence]`); a CI `e2e` job with `playwright install`
  is added.
- Calc plumbing arg shape: `modSlots` as `{modId,rank,slotIndex}` matches engine
  `ModSlot`; `calculateWeapon` receives `{weaponId,modSlots,arcaneIds,
  rivenStatChanges,scenario}` = `WeaponBuildInput`; `simulate(result, …)` and
  `simulation.ttk.ttk` are correct against `SimulationService`.
- `AbortController` cleanup aborts the previous in-flight request on every input
  change; 150 ms debounce. Out-of-order resolution is adequately guarded (weak
  spot: `setCalculating(false)` in each `finally`, and `setPrevious(result)` off
  a closure value — cosmetic only).
- Detailed-calculations section renders `result.stats[]` with badges,
  `result.caveats[]`, and `result.ttk.caveats[]`.

---

## Verdict

**Needs a pass.** The core loop works and the S1/confidence-contract discipline
is mostly sound, but three of the six hierarchy panels are static and contradict
the live metrics (M1/M2), the AC 7 test is inert (M3), the header presents
fabricated MR/disposition (M4), a sim error nukes the deterministic result (M5),
and the mod picker shows wrong-class mods (M6). None are architectural — all are
wiring fixes within the shape already built.
