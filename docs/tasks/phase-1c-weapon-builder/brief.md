# Brief: Phase 1c task 13 — Weapon Builder UI

## Scope

Build the **Weapon Builder** screen in `apps/web`: pick a weapon, configure its
mods / arcane(s) / riven / scenario, and see live confidence-tagged
performance with per-mod deltas. It is the first real product surface and the
template for the Warframe Builder (task 14).

Built against [`docs/design/design-language.md`](../../design/design-language.md)
— specifically the **"Weapon / build pages"** and **"Mod slots"** sections. The
weapon is the visual focus; hierarchy is item name → primary metrics → damage
profile → critical profile → status output → mod configuration → arcane →
scenario settings → detailed calculations. The mod grid is **not** the whole
design.

## Architecture (required)

- **The engine never reaches the browser.** `@cephalon/engine`'s bundle inlines
  the ~66k-LOC catalog (2.7 MB). All calculation runs **server-side** through
  `@cephalon/services`. UI components must have **no** direct
  `@cephalon/engine` or `@cephalon/services` import — they call route handlers /
  server actions.
- Add `@cephalon/services` (+ its `@cephalon/engine` transitive) as an
  `apps/web` dependency. CI `web-build` already builds the engine first.
- **Server layer** in `apps/web/src/server/` (framework-glue only — instantiates
  the services, no business logic):
  - `catalog.ts` — a singleton `CatalogService` + `ConfidenceService` +
    `BuildService` + `SimulationService` + `ComparisonService`.
  - Route handlers (App Router `route.ts`) or typed server actions:
    - `GET /api/weapons` → lightweight list for the picker:
      `{ id, name, category, masteryReq, disposition, isIncarnon }[]`. Cache it.
    - `GET /api/weapons/:id` → what the builder needs to render an empty build:
      base stats summary, `modSlotCount` + polarities, arcane slot count,
      incarnon form info if any, compatible-mod list
      (`{ id, name, polarity, rarity, maxRank, primaryEffect }[]` — enough for
      the slot + picker; filter by the weapon's mod-compat rules via the
      catalog).
    - `POST /api/build/weapon` → body
      `{ weaponId, modSlots: ModSlot[], arcaneIds?: string[],
      rivenStatChanges?: Record<string,number>,
      incarnonStatChanges?: Record<string,number>, scenario: Scenario }`
      → `BuildViewModel` from `BuildService.calculateWeapon`, **plus** a
      `ttk` block from `SimulationService.simulate` when the scenario names an
      enemy. Every returned stat carries its `ConfidenceTag`.
  - Keep payloads small and typed. Share the request/response types between
    server and client via a `apps/web/src/server/contracts.ts`.

## UI (client components, `apps/web/src/app/(app)/tools/weapon-builder/` or `/arsenal/weapons/[id]/build`)

Pick a route — a dedicated `/weapon-builder` tool route is fine for task 13; a
per-weapon `/arsenal/weapons/[id]` unified page is task-15+ territory.

- **Header** — weapon name in the display font, large; a weapon switcher
  (button that opens a weapon picker — reuse the `cmdk` palette pattern or a
  dedicated `Command`-style dialog listing `/api/weapons`), plus MR / disposition
  / incarnon chips. Empty state before a weapon is chosen: a centered prompt to
  pick one.
- **Primary metrics** — a `StatRow` of Sustained DPS · Burst DPS · Average Hit ·
  Expected TTK. Big tabular values, each with its `ConfidenceBadge`. On any
  change, animate the value and show a signed delta vs the previous result
  (e.g. `3.81m → 3.11m  −18.4%`) for ~2 s, per the design doc. Respect
  `prefers-reduced-motion`.
- **Damage profile** — stacked bar of IPS + elemental damage (use `MiniBar` /
  a small stacked bar), with a legend. Confidence: Verified.
- **Critical profile** — CC, CM, crit tier label. Verified.
- **Status output** — status/sec and per-status-type breakdown. Verified for
  the core, but the discrete-sim-derived bits carry Approximation.
- **Mod configuration** — the weapon's mod slots (8 + exilus if applicable) as
  compact tactical slots: mod name, rank, polarity glyph, the mod's primary
  stat effect, a small rarity marker. Empty slot = a polarity hint + "＋".
  - Click a slot → a mod picker (drawer or panel) listing compatible mods
    (search + filter by polarity/type); selecting fills the slot and triggers a
    recalc.
  - Hover / focus a filled slot → a tooltip with the mod's full stat lines
    **and** its marginal DPS contribution for the current build
    (`BuildViewModel.perModContribution` → `{ dpsDelta, pct }`).
  - Rank control on the slot (a compact stepper).
- **Arcane** — 1–2 arcane slots, same interaction (picker of weapon arcanes,
  stack count from the scenario).
- **Riven** — a stat-input panel: the user enters the riven's stat names +
  values (2–3 positives, optional negative) → mapped to `rivenStatChanges`.
  **Not** a riven browser. Grade via `evaluateRiven` is out of scope for
  task 13 (can show the raw effect only).
- **Scenario settings** — a compact panel/drawer: `faction` (SegmentedControl
  or select), `enemyArchetypeId` + `level` (NumberInput), **Steel Path** toggle
  (backed by task 11 — `scenario.steelPath`), **headshots** (binary toggle —
  label it "Headshots (on/off)" not a %), **statusTypesOnTarget** (0–5 stepper
  — label "Status types on target (count)"), **kill-stacks** (0–5),
  **arcaneStacks**. The S1 non-inputs (armor-strip %, headshot %, status
  uptime) must **not** appear as fields; if the panel has an "assumptions"
  footnote, state that armor strip and status uptime are derived by the sim.
- **Detailed calculations** — an expandable section: the full `stats[]` list
  with every `ConfidenceBadge`, plus the `caveats[]` from the view-model
  (EV-status, Steel-Path note, roster note, etc.).
- **Confidence** must be visible, not buried: Approximation badges on stance
  DPS / ability-contribution / radial-damage rows; the Steel Path row reflects
  its `approximation` tag when SP is on.

All calc calls: debounced ~150 ms, cancel in-flight on a newer change, show a
subtle "calculating" state on the metrics (not a full-page spinner).

## Out of scope

- Warframe builder (task 14), comparison view (task 16), codex/search,
  AI panel, home dashboard.
- Player ownership / mastery of mods (no player context yet) — the mod picker
  shows all compatible mods.
- Saving / sharing builds, loadouts, URL-encoding.
- Riven grading UI, riven roll generation.
- Companion / exalted / modular-weapon specifics beyond what falls out of the
  generic path.
- Real charts (use the `Sparkline`/`MiniBar` atoms only).

## Acceptance criteria

1. `pnpm --filter web build` + `typecheck` pass; `pnpm --filter web dev` serves
   the builder with no console errors.
2. **No `@cephalon/engine` or `@cephalon/services` import anywhere under
   `apps/web/src/app/**` client components or `apps/web/src/ui/**`** — only
   `apps/web/src/server/**` imports them. Enforced by a grep in
   `scripts/check-engine-boundary.mjs` (extend it) or a dedicated check.
3. Picking a weapon renders base stats; toggling a mod, changing a rank, adding
   an arcane, editing a riven stat, or changing a scenario field updates the
   metrics **without a full page reload** and shows the signed delta.
4. `POST /api/build/weapon` returns a `BuildViewModel` whose every stat has a
   `ConfidenceTag`; the response type is shared via `contracts.ts`.
5. Approximation badges render on stance-DPS / ability-contribution /
   radial-damage rows; the Steel Path row shows `approximation` when SP is on,
   and the scenario panel exposes no armor-strip-% / headshot-% / status-uptime
   fields (S1).
6. A **Playwright** test (`apps/web/e2e/weapon-builder.spec.ts`): loads the
   builder, picks a known weapon (e.g. `braton`), asserts a primary metric is a
   finite number, toggles a mod (`serration_r3`), asserts the metric changed and
   a delta appeared, asserts at least one `ConfidenceBadge` is present. Add a
   `pnpm --filter web e2e` script + a CI job (Playwright install in CI).
7. Server route/service tests: `/api/build/weapon` for ~3 reference builds
   returns numbers matching `BuildService` called directly (reuse the
   `@cephalon/services` golden values where possible).
8. Visually matches `design-language.md`: weapon is the focus, hierarchy as
   listed, compact tactical mod slots (not Warframe-card clones, not the whole
   design), dark/dense/typographic, confidence surfaced. No AI-SaaS patterns.
9. No upstream project name anywhere.

## Preflight state

- Branch `main`, last commit is the task-12 chain (`1272979` + the polish
  commit).
- `@cephalon/services` exports: `CatalogService` (`getWeapons`? — check;
  currently `getWeapon(id)`, `getWeaponsMap`, `getModMap`, `getArcanes`,
  `getEnemyTypes`, `getArcaneEffectsMap`), `ConfidenceService`, `BuildService`
  (`calculateWeapon`/`calculateWarframe` → `BuildViewModel` with
  `stats[]`/`perModContribution[]`/`caveats[]`/`rawStats`), `SimulationService`
  (`simulate(build, target)` → `{ ttk, caveats }`), `ComparisonService`,
  `Scenario` + `scenarioToSimulationParams`, `ConfidenceTag`, `MechanicKey`,
  `NullPlayerContext`. If the builder needs a `CatalogService.getWeapons()`
  list accessor or a "compatible mods for weapon X" helper that doesn't exist,
  add it to `@cephalon/services` (thin, over the engine catalog) and note it.
- `apps/web` design system: `@/ui` exports Panel, Stat, StatGrid/Row, Table,
  SegmentedControl, Tabs, Tooltip, Dialog, Drawer, Badge, ConfidenceBadge,
  Button, fields, Sparkline/MiniBar/RadialMeter, Kbd, the shell + cmdk palette.
- Engine has `sp` (Steel Path) opt-in; services `Scenario.steelPath` wired.
- Workflow: "UI change" row — Codex implements → coordinator runs the app +
  Playwright + visual check → **user reviews the running builder** before
  task 14.
