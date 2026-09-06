# Cephalon — Handoff

_Snapshot for a fresh agent picking up this project. Written 2026-08-31 at commit
`f583a8c`. Read `docs/agent/project-profile.md`, `docs/agent/workflow.md`,
`docs/agent/decisions.md`, `docs/design/design-language.md`, and
`docs/agent/upstream-engine.md` alongside this._

---

## 1. What this project is (scope)

**Cephalon** — an all-in-one Warframe companion web app. A premium "command
center" that unifies Warframe info, **deterministic** build/damage
calculations, player context, inventory/farming/relic/mastery planning, market
data, and an AI assistant ("Ask Cephalon"). It combines the strengths of
Overframe / the Warframe Wiki / AlecaFrame / an existing open-source engine —
**not** a tab-for-tab clone of any of them.

It is built **around an existing open-source calculation engine** (referred to
only as "the upstream engine"; real identity + AGPL-3.0 licensing facts are in
`docs/agent/upstream-engine.md` and **nowhere else** — keep it out of code,
comments, commit messages, and any user-facing surface). The engine is treated
as a calculation/data library behind a hard package boundary; Cephalon builds a
new product around it.

**Phased roadmap** (from the original project handoff — see
`docs/agent/project-profile.md` and `architecture.md`):

| Phase | Content | Status |
|---|---|---|
| **1** | Isolate the engine, preserve its tests, service layer, design system, weapon/warframe builders, scenario simulator, comparison view | **in progress** (1a/1b done; 1c weapon builder done) |
| 2 | Universal search, Codex, wiki integration, market pricing, drop data, enemy DB, world state, **AI assistant** | not started |
| 3 | Accounts, saved builds, full loadouts, inventory, mastery/relic/farming planners | not started |
| 4 | AI build analysis, auto-optimization, player-specific recommendations, NL search | not started |
| 5 | Desktop companion, account sync, overlay, in-mission info, notifications | not started |

---

## 2. Current state (what's built)

**Monorepo**, pnpm workspace. Branch `main`, **no git remote** (see §5).

```
packages/engine    @cephalon/engine — the upstream calc engine, extracted intact
packages/services  @cephalon/services — Cephalon's application service layer
apps/web           Next.js 16 / React 19 web app
scripts/           check-engine-boundary.mjs, check-no-ambient-catalog.mjs, check-formula-gate.mjs
.github/workflows/ci.yml
vendor/upstream-engine/   working clone of the upstream engine (gitignored)
```

### `packages/engine` (commits: `65b864b`, `ff46547` build step, `2e22098` Steel Path)
- The upstream engine's `calc/**` + `data/**` (~66k LOC catalog) + `types.ts` +
  support helpers + its full regression suite, copied **near byte-identical**
  (only forced `([])` args on a few default params + the Steel Path additions).
- **De-singletoned**: no ambient `overrideCache`; `apply*Overrides` /
  `getEffective*` take an explicit `OverrideSet`. Orchestration
  (`build-stats`/`loadout-stats`) lifted into `orchestration/`, catalogs passed
  as params.
- Ships a **tsup `dist/`** (`pnpm --filter @cephalon/engine build`). Consumers
  import the built `dist` via the package `exports`; the engine's own tests run
  against `src/`. **The dist must be built before `apps/web` / `packages/services`
  typecheck or test** (CI does this; a fresh clone needs it).
- **Steel Path**: opt-in `sp` flag on `SimulationParams` + `calculateTTK`.
  `+100` level, `×2.5` health/shield, **no armor multiplier** (removed in game
  U36.0 — the commonly-cited ×3 armor is stale). `sp=false` is a byte-identical
  no-op. Tagged `approximation`, not `verified`. Signed off in `decisions.md`.
- Barrel `src/index.ts`: two export groups — **calculation surface** (the ~20
  preserved entry points + I/O types) and **catalog-assembly surface** (loaders,
  `enrichWeapon`, `getEffective*`, `modEligibleForWeaponSlot`, override helpers)
  — the latter is for the host `CatalogService` only.
- Tests: **47 files / 1933 passed**. Golden baseline at
  `packages/engine/test/golden/engine-baseline.json` (deep-equal per build).

### `packages/services` (commit: `ff46547`)
Framework-free. `CatalogService` (loads catalog, applies overrides, memoised;
`listWeapons` / `getWeaponDetail` / `compatibleMods`), `ConfidenceService`
(the Verified / Approximation / Not-modeled / Pending-verification map + the
verbatim "Verified" definition), `BuildService` (+ `Scenario` type,
`scenarioToSimulationParams`), `SimulationService`, `ComparisonService`,
`PlayerContextService` (type stub + `NullPlayerContext`). Tests: **6 files / 39**.

### `apps/web`
- **Design-system foundation** (commits `be8f787`…`5e1c921`): Tailwind v4 +
  CSS-custom-property tokens in `src/app/globals.css`, self-hosted fonts
  (Saira Condensed / Inter / JetBrains Mono via `next/font`), ~23 token-only
  primitives in `src/ui/` (Radix UI + cmdk under the hood), the app shell
  (compact left sidebar with the full nav tree + thin top bar), a Ctrl+K
  command palette, and a `/components` gallery route. Follows
  `docs/design/design-language.md` — **user-approved direction**.
- **Weapon Builder** (commits `37c98f6`, `eef5777`, `f583a8c`) at
  `/tools/weapon-builder`. Server-side calc only:
  `src/server/{services,contracts}.ts` + route handlers
  `GET /api/weapons`, `GET /api/weapons/[id]`, `POST /api/build/weapon`.
  **No `@cephalon/engine`/`@cephalon/services` import outside `apps/web/src/server/`**
  (enforced by `check-engine-boundary.mjs`). Client UI: weapon switcher,
  primary-metrics `StatRow` with animated deltas + `ConfidenceBadge`s,
  damage/crit/status profile panels driven by the live result, compact mod
  slots with a Drawer picker (class-filtered) + per-mod DPS-contribution
  tooltips, arcane slots, riven stat-input panel, honest scenario panel (Steel
  Path toggle, binary headshots, 0–5 status-type count — **no** fake
  %/uptime fields), expandable detailed calculations. Debounced 150 ms recalc
  with `AbortController`. Tests: `src/server/build-weapon.test.ts` (**1 file /
  3**, route-parity vs `BuildService`) + a Playwright happy-path
  (`apps/web/e2e/weapon-builder.spec.ts`).

### Verification status (as of `f583a8c`)
`pnpm -r typecheck` green · engine 47/1933 · services 6/39 · web-unit 1/3 ·
`check-engine-boundary` / `check-no-ambient-catalog` / `check-formula-gate --self-test`
pass · `pnpm --filter web build` compiles. Playwright not run locally (env
couldn't install `@playwright/test` during the Codex pass; CI job exists).

---

## 3. How work is run on this project

- **Operating docs** in `docs/agent/` define everything: `project-profile.md`
  (identity, constraints, approval gates, doc level = Standard),
  `workflow.md` (task-type → workflow table, the two hard-stop gates),
  `roles/{argus,athena,themis,apollo}.md`, `decisions.md` (append-only, dated,
  user-approved decisions), `upstream-engine.md`, `upstream-sync.md`.
- **Per-task artifacts** live in `docs/tasks/<slug>/`: `brief.md`,
  `investigation.md` (Argus), `plan.md` (Athena), `handoff-codex*.md`,
  `review.md` (Themis), `verification.md`, `final-report.md`.
- **Implementation is delegated to Codex** (`codex exec`). **Codex runs in a
  sandbox that cannot install packages or run pnpm/vitest/tsup/next build** — so
  after every Codex pass, the **coordinator (you) must install deps, build the
  engine dist, and run the full verification** (typecheck + all suites + guards
  + `web build`), then fix whatever Codex couldn't.
- **Themis reviews every non-trivial change** independently (a subagent given
  the role packet). Elevated scrutiny for calc-formula-gate changes.
- **Two hard-stop gates** (recorded in `decisions.md` when triggered):
  1. **Calc-formula changes** — any change to a damage/scaling/interaction
     formula away from the upstream engine's behavior. Needs an Argus sourcing
     pass + user sign-off on the values + elevated Themis + full-suite Apollo.
  2. **Game-data bundling** — committing bulk Warframe game data. (Already done
     once, approved, for the engine catalog.)
- **Design**: all UI is built and reviewed against
  `docs/design/design-language.md`. Its anti-pattern list ("no AI slop") is a
  hard checklist. The user owns visual direction.

---

## 4. Gotchas for the next agent

- **`codex.cmd` wrapper is broken.** A Codex auto-update left a stub dir
  (`%LOCALAPPDATA%\OpenAI\Codex\bin\82e11f77bc7dfcc8\` — contains only `rg.exe`)
  that's newer than the real install, so the wrapper picks the empty one and
  fails with exit 49. **Workaround:** call the real binary directly,
  `C:\Users\Wil\AppData\Local\OpenAI\Codex\bin\b99306303521e97e\codex.exe`
  (or whichever hashed dir actually has `codex.exe`). The user was told they can
  `rmdir /s /q` the stub to fix the wrapper; not done (their tool install).
- **`pnpm` is not on PATH.** Use `npx pnpm@9 ...` or `corepack pnpm ...`.
- **Build the engine dist first.** `pnpm --filter @cephalon/engine build`
  before any `apps/web` / `packages/services` typecheck/test on a fresh state.
  `tsup` needed `incremental` removed from `tsconfig.base.json` to emit `.d.ts`.
- **No git remote → cannot push.** All work is local commits on `main`. The
  user must add a remote and approve pushing (per `decisions.md`). When they do:
  the commit that introduced the engine must keep its `LICENSE`/`NOTICE`; AGPL
  §13 means the whole service source stays disclosable while open-source.
- **Upstream engine name discipline.** It appears only in
  `docs/agent/upstream-engine.md`, `packages/engine/NOTICE`, and
  `packages/engine/src/data/PROVENANCE.md`. Everywhere else: "the upstream
  engine". A CI-ish grep isn't in place for this — check by eye.
- **HTTP caching bit us once.** `/api/weapons` had a
  `Cache-Control: immutable` header that pinned stale data in the browser
  across server restarts. Removed; client fetches now use `cache: "no-store"`.
  If you see stale data in the browser pane, clear `apps/web/.next` and restart
  the preview.
- **Browser-pane coordinate clicks are unreliable** at the current render
  scale — use `read_page` / `find` to get `ref_N` and click by ref, or
  `javascript_tool` to assert state.
- **`@cephalon/services` / `apps/web` typecheck walks into engine source** if
  the engine isn't built to `dist` — you'll see `Cannot find module '@/types'`
  errors that are really "dist is stale".
- Steel Path confidence is **`approximation`**, not `verified` (the engine's
  underlying level curve is itself an approximation of DE's).

---

## 5. Remaining work

### Immediate — finish Phase 1c (each its own Argus→Athena→approval→Codex→Themis→Apollo "UI change" cycle; user reviews each surface)

- **Task 14 — Warframe Builder** (`/tools/warframe-builder`). Same template as
  the weapon builder: server route `POST /api/build/warframe` →
  `BuildService.calculateWarframe`. Mods + arcanes + **Archon Shards** + ability
  S/D/E/R panel + EHP/DR readout. **Ability damage section labelled
  Approximation; Archon Violet/Topaz/Emerald offensive fields marked
  Not-modeled** (they're `break;` no-ops in the engine). Reuse the weapon
  builder's `_components` patterns — it was written to be the template.
- **Task 15 — Scenario Simulator** (`/tools/enemy-simulator`). Standalone:
  hand-enter or load a build, pick an enemy archetype + level, **Steel Path
  toggle** (now real, from task 11), show paper DPS + discrete TTK. Surface the
  remaining honest limits: 19-archetype roster only, no magnetic/overguard/
  eximus, faction can disagree with enemy. Uses `SimulationService`.
- **Task 16 — Build Comparison** (`/builds/compare`). Two builds side by side,
  explained row-by-row diff from `ComparisonService`, confidence badge per row,
  faction-sensitive mods annotated, a short "why this changed" section. The
  design doc calls this "one of the strongest visual features".

### Roll into task 14+ (weapon-builder follow-ups from `docs/tasks/phase-1c-weapon-builder/review.md`)

- Shell doesn't fill tall viewports — dead space below content
  (`.app-shell { min-height: 100dvh }` or similar).
- Mod picker `primaryEffect` strings are raw (`cold 1500%`,
  `criticalChanceOnHeadshot 2250%`) — humanize labels; `×100` only for
  fractional stats.
- Mod list sort is rarity-first, not relevance.
- `split_flights` (a bow mod mis-tagged `category: "primary"` in the bundled
  catalog) still leaks into the rifle picker — **catalog-data fix**, tracked as
  a follow-up; the eligibility filter itself is correct.
- Arcane picker is a hard-coded primary-only triplet — wire it to the arcane
  catalog by weapon category (O5 in the review).
- Damage-bar legend omits innate elemental portions it renders (O7).

### Deferred earlier in Phase 1 (see `decisions.md` / final reports)

- **Arcane-effect (magnitude) overrides** are exposed by
  `CatalogService.getArcaneEffectsMap()` but **not threaded into the calc
  path** — `calculateWeaponBuildWithArcanes` is called without an effects arg.
  Close when a real override host lands (Phase 1b follow-up, `decisions.md`
  2026-08-30). `arcane-effect-overrides.ts` keeps `overrides: OverrideSet = []`
  as a recorded deviation.
- **Damage Attenuation** (SP-adjacent DPS-scaling DR on big health pools) —
  its own future calc-formula-gate task. The wiki page is self-flagged
  unreliable; no enemy in the 19-unit roster has it.
- **`game-constants.ts` extraction** — pull the scattered hardcoded game
  constants (armor cap 2700, S-curve coefficients, `ENEMY_TYPES`, modifier
  tables) into one dated module. Value-preserving = not a formula gate; any
  value change is.
- **God-file decomposition** — `calculator.ts` (~2,200 LOC),
  `arcane-handlers.ts` (~2,080 LOC). Later, gated, needs characterization-test
  expansion first.
- **`engine` / `warframe-data` package split** — recipe in
  `docs/agent/upstream-sync.md`. Trigger: a concrete commercial-pivot plan or a
  second catalog consumer.
- **`check-formula-gate.mjs` create-vs-modify** — currently a first-time golden
  file addition needs a paired `decisions.md` entry; refine to exempt `A`
  (creation) vs `M` (modification).
- **CI**: `web-unit` and `e2e` jobs are wired but Playwright hasn't run in
  anger; `apps/web` test files outside `tsc` scope.

### Bigger picture / not started

- Phase 2: universal search + Ctrl+K wired to real data, Codex/unified item
  pages, wiki integration, market pricing (`warframe.market`), drop data, enemy
  database, world state dashboard. **External data must go through server-only
  wrappers beside the services, never on the calc path** (`project-profile.md`).
- Phase 3: Supabase (auth + DB, "data sensitive from day one" — no logging
  player identifiers/tokens, plan encryption at rest + least-privilege before
  any account feature). Saved builds/loadouts/strategies, inventory import
  (the upstream had an OCR + Twitch-arsenal importer, not carried over),
  mastery/relic/farming planners.
- Phase 4: the AI tool layer. **The AI never computes Warframe math** — it
  calls the deterministic services and explains results. The service layer is
  already shaped for this (`compareModSwap`, `simulate`, confidence tags, etc.).
- Phase 5: desktop companion / overlay.

### Licensing (unchanged, standing)

Build on full AGPL-3.0 now; keep only `LICENSE` + `NOTICE`; **no
maintainer-outreach track** (treated as unreachable — though the email is in
the recovered history). A qualified open-source licensing professional must
review before any commercial / closed-source pivot. The engine stays behind
the `packages/engine` boundary + the golden-baseline corpus so a clean-room
re-implementation is a package swap. Full facts:
`docs/agent/upstream-engine.md`.

---

## 6. Suggested next step

Start **task 14 (Warframe Builder)** via `/start-task` (or directly): it's the
natural continuation, the weapon builder is its template, and `BuildService`
already has `calculateWarframe`. Fold the weapon-builder review follow-ups
(shell height, mod-label humanization, arcane picker) into the same pass since
they're shared components. Then 15, then 16 to finish Phase 1c. Get user
review of each surface before moving on — that's the established rhythm.

---

## 7. Doc map

| Doc | What |
|---|---|
| `docs/agent/project-profile.md` | identity, constraints, approval gates, doc level |
| `docs/agent/workflow.md` | task-type → workflow table, gates, git/data-safety policy |
| `docs/agent/decisions.md` | every dated user-approved decision (append-only) |
| `docs/agent/upstream-engine.md` | the upstream engine's real identity + AGPL facts + recovered history (the ONE place the name lives) |
| `docs/agent/upstream-sync.md` | curated-pull runbook + the future package-split recipe |
| `docs/agent/roles/*.md` | Argus / Athena / Themis / Apollo role packets |
| `docs/design/design-language.md` | the user-authored design direction (the bar for all UI) |
| `docs/design/tokens.md` | design token reference |
| `docs/tasks/upstream-engine-investigation/` | the deep investigation + architecture doc + plan (`architecture.md` is the executive synthesis) |
| `docs/tasks/phase-1a-engine-extraction/` | engine extraction task trail |
| `docs/tasks/phase-1b-service-layer/` | service layer task trail |
| `docs/tasks/phase-1c-steel-path/` | Steel Path sourcing + review + verification |
| `docs/tasks/phase-1c-design-system/` | design-system foundation task trail |
| `docs/tasks/phase-1c-weapon-builder/` | weapon builder brief + Themis review + fix handoff |
