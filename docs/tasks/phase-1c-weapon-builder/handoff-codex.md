# Codex handoff — task 13: Weapon Builder UI

Run from repo root:
```
codex.cmd exec --skip-git-repo-check -s workspace-write -C "C:\Users\Wil\Documents\Projects\Cephalon" "<prompt>" < /dev/null
```

## Prompt

Task: build the **Weapon Builder** screen in `apps/web` — pick a weapon,
configure mods / arcane / riven / scenario, see live confidence-tagged
performance with per-mod deltas. First real product surface; template for the
Warframe Builder.

Read first:
- `docs/tasks/phase-1c-weapon-builder/brief.md` — scope, architecture, the 9
  ACs. Follow it.
- `docs/design/design-language.md` — "Weapon / build pages" + "Mod slots"
  sections. Weapon is the visual focus; compact tactical mod slots; the mod
  grid is NOT the whole design; confidence surfaced; dark/dense/typographic.
- `packages/services/src/*` and `packages/engine/src/index.ts` — the surfaces
  you consume server-side.

### Hard rules

- **No `@cephalon/engine` or `@cephalon/services` import anywhere except
  `apps/web/src/server/**`.** Client components / `apps/web/src/ui/**` call
  route handlers. Extend `scripts/check-engine-boundary.mjs` to also fail on
  those imports outside `apps/web/src/server/`.
- All calc runs server-side. Catalog never ships to the browser.
- Do not build the Warframe builder, comparison view, codex, saving/sharing,
  player-ownership, or real charts. Riven = a stat-input panel, not a browser.
- No upstream project name anywhere. Do not commit.

### Step 1 — engine barrel + services helpers

`packages/engine/src/index.ts` — add to the **catalog-assembly** export group
(these are catalog/eligibility helpers, host-only):
`modEligibleForWeaponSlot`, and the types `WeaponModSlotType`,
`WeaponModProfile` from `mods/mod-weapon-eligibility.ts`. Rebuild the engine
(`pnpm --filter @cephalon/engine build`).

`packages/services/src/catalog/catalog-service.ts` — add:
- `listWeapons(): { id; name; category; masteryReq; disposition; isIncarnon }[]`
  — lightweight, derived from the weapons catalog, memoised.
- `getWeaponDetail(id)` → `{ base: <summary of the enriched Weapon's display
  stats>, modSlotCount, polarities: string[], exilus: boolean, arcaneSlots:
  number, incarnon?: { forms: string[] } }` — enough to render an empty build.
- `compatibleMods(weaponId): { id; name; polarity; rarity; maxRank;
  primaryEffect: string }[]` — filter `getModMap()` through
  `modEligibleForWeaponSlot` for the weapon's category + a `regular` slot
  (include exilus-eligible separately if easy). `primaryEffect` = a short
  human string for the mod's dominant stat line.
Keep these thin (no calc). Add a `catalog-service.test.ts` case per new method.

### Step 2 — `apps/web` server layer (`apps/web/src/server/`)

- `apps/web/package.json` — add `"@cephalon/services": "workspace:*"`.
- `services.ts` — module-singleton wiring:
  `const catalog = new CatalogService(); const confidence = new
  ConfidenceService(); const builds = new BuildService(catalog, confidence);
  const sims = new SimulationService(catalog, confidence);` exported.
- `contracts.ts` — shared request/response TS types for the three endpoints
  (import `Scenario`, `ConfidenceTag`, `BuildViewModel` shapes as types from
  `@cephalon/services` here — this file is under `server/` so that's allowed;
  re-export the client-needed pieces).
- Route handlers (App Router `route.ts`, `runtime = "nodejs"`):
  - `apps/web/src/app/api/weapons/route.ts` — `GET` → `catalog.listWeapons()`.
    `Cache-Control` immutable-ish; it's static.
  - `apps/web/src/app/api/weapons/[id]/route.ts` — `GET` →
    `{ ...catalog.getWeaponDetail(id), mods: catalog.compatibleMods(id) }`;
    404 if unknown.
  - `apps/web/src/app/api/build/weapon/route.ts` — `POST`, body per
    `contracts.ts` `{ weaponId, modSlots, arcaneIds?, rivenStatChanges?,
    incarnonStatChanges?, scenario }` → `builds.calculateWeapon(...)` result,
    plus `ttk` from `sims.simulate(result, { enemyArchetypeId, level,
    steelPath })` when `scenario.enemyArchetypeId` is set. Validate the body
    (zod or hand-rolled); 400 on bad input. Every returned stat keeps its
    `ConfidenceTag`.
- Route/service test: `apps/web/src/server/build-weapon.test.ts` (vitest) —
  POST-equivalent for `braton` bare + `braton` + `[serration_r3,
  split_chamber_r3]` returns `sustainedDps` matching `builds.calculateWeapon`
  called directly.

### Step 3 — the builder UI

Route: `apps/web/src/app/(app)/tools/weapon-builder/page.tsx` (client shell) +
components under `apps/web/src/app/(app)/tools/weapon-builder/_components/`.
Add "Damage Calculator" in the Tools nav to point here (or add a
"Weapon Builder" item).

State (client): `weaponId | null`, `modSlots: ModSlot[]`, `arcaneIds: string[]`,
`riven: { stat; value }[]` (→ `rivenStatChanges`), `scenario: Scenario`,
`result: BuildWeaponResponse | null`, `prevResult` (for deltas),
`status: "idle" | "calculating"`.

- **Header** — weapon name (display font, large) + a **weapon switcher** button
  that opens a `cmdk`-style dialog listing `/api/weapons` (search by name);
  MR / disposition / Incarnon chips (`Badge`). Empty state: centered `Panel`
  "Choose a weapon to begin" + the switcher.
- **Primary metrics** — a `StatRow`: Sustained DPS · Burst DPS · Average Hit ·
  Expected TTK. Each a big tabular value + its `ConfidenceBadge`. On a result
  change, animate value + show `prev → next  ±x%` for ~2s (a small
  `<Delta prev next />` helper; respect reduced-motion). "calculating" =
  a subtle pulse on the metrics, never a page spinner.
- **Damage profile** — a stacked `MiniBar` of IPS + elemental portions +
  legend.
- **Critical profile** — CC / CM / crit-tier label.
- **Status output** — status/sec + per-status rows.
- **Mod configuration** — `modSlotCount` compact slots (+ exilus if
  `detail.exilus`): each shows mod name, a rank stepper, polarity glyph, the
  mod's `primaryEffect`, a small rarity marker; empty slot = polarity hint +
  "＋". Click → a **Drawer** mod picker (search + polarity/type filter over
  `detail.mods`); pick fills the slot → recalc. Hover/focus a filled slot →
  `Tooltip` with the mod's effect lines **and** its marginal contribution
  (`result.perModContribution` → `dpsDelta`, `pct`).
- **Arcane** — 1–2 slots, same pattern over weapon arcanes; stack count from
  the scenario.
- **Riven** — a small panel: 2–3 positive stat rows (name select + number) +
  optional 1 negative → `rivenStatChanges` map. No grading.
- **Scenario** — a `Panel`/`Drawer`: `faction` (SegmentedControl / select),
  `enemyArchetypeId` (select from a small enemy list — hardcode the 19 ids or
  add `/api/enemies`), `level` (NumberInput), **Steel Path** toggle
  (`scenario.steelPath`), **Headshots** binary toggle (label "Headshots
  (on/off)"), **Status types on target** 0–5 stepper (label it — it's a
  count, not uptime), **Kill stacks** 0–5, **Arcane stacks** number. A footnote:
  "Armor strip and status uptime are derived by the simulation, not set here."
  **No** armor-strip-% / headshot-% / status-uptime fields.
- **Detailed calculations** — a `<details>`/expandable `Panel`: the full
  `result.stats[]` with every `ConfidenceBadge`, then `result.caveats[]`.
- Approximation badges must show on stance-DPS / ability-contribution /
  radial-damage rows; the Steel Path row shows its `approximation` tag when SP
  is on.
- Recalc: a `useEffect` on the build inputs → debounced 150ms `fetch` to
  `/api/build/weapon` with an `AbortController` cancelling the previous
  in-flight request; on response set `prevResult = result; result = next`.

### Step 4 — tests + checks

- `apps/web/e2e/weapon-builder.spec.ts` (Playwright): visit
  `/tools/weapon-builder`, open the switcher, pick "Braton", wait for metrics,
  assert Sustained DPS is a finite number, open slot 1, pick Serration, assert
  the metric changed and a delta element appeared, assert ≥1
  `[data-confidence]` / `ConfidenceBadge` is visible. Add `@playwright/test`
  devDep, `"e2e": "playwright test"` script, `playwright.config.ts`
  (webServer: `pnpm --filter web dev`, port 3210), and a CI `e2e` job
  (`pnpm exec playwright install --with-deps chromium` then `pnpm --filter web e2e`).
- Extend `scripts/check-engine-boundary.mjs`: a new scan that fails if
  `@cephalon/engine` or `@cephalon/services` is imported anywhere under
  `apps/web/src` **except** `apps/web/src/server/`.
- `pnpm -r typecheck`, `pnpm --filter @cephalon/engine test`,
  `pnpm --filter @cephalon/services test`, `pnpm --filter web build` all pass.

### Report back

- New/changed engine barrel exports + services methods (with the tests added).
- The `contracts.ts` types.
- The component tree under `_components/`.
- `pnpm -r typecheck` + all suite outputs; the boundary-check extension output.
- Playwright: the spec + whether it ran locally (if the env can't, say so).
- Any place the design-language weapon-page hierarchy had to bend, and why.
- Do not commit.
