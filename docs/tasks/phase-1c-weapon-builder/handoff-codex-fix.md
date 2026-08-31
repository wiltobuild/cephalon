# Codex handoff — task 13 fix pass (Themis must-fixes + polish)

All wiring-level. No architectural change. Read
`docs/tasks/phase-1c-weapon-builder/review.md` (Themis) for full context and
`docs/design/design-language.md` for the bar. Deps installed. Do not commit.

Run from repo root:
```
"C:\Users\Wil\AppData\Local\OpenAI\Codex\bin\b99306303521e97e\codex.exe" exec --skip-git-repo-check -s workspace-write -C "C:\Users\Wil\Documents\Projects\Cephalon" "<prompt>" < /dev/null
```
(The `codex.cmd` wrapper is currently broken — use the full path above.)

## Prompt

Task: fix pass on the Cephalon Weapon Builder (task 13). Nine items. Keep the
architecture (server-side calc via `apps/web/src/server/**`, no engine/services
import in client code) and the visual system.

### M1 + M2 — wire the Damage / Critical / Status panels to the live `result`

`apps/web/src/app/(app)/tools/weapon-builder/_components/weapon-builder.tsx` —
the three profile panels currently render from `detail.base` (static
`/api/weapons/[id]`). Drive them from `result.stats[]` instead, falling back to
`detail.base` only before the first `result` arrives:
- **Critical profile** — `criticalChance`, `criticalMultiplier` from
  `result.stats`; show the crit-tier label if the response has it, else derive
  from CC.
- **Status output** — `statusChance` (and status/sec if present) from
  `result.stats`.
- **Damage profile** — the stacked bar + legend must include the modded IPS
  **and** the innate/added elemental portions. `result.stats` has
  `totalDamage`; if per-type modded damage isn't in `result.stats`, add the
  needed fields to `BuildService`'s `WEAPON_STAT_FIELDS` mapping in
  `packages/services/src/build/build-service.ts` (e.g. surface `impact`,
  `puncture`, `slash`, and the `elements` breakdown from `CalculatedStats`) so
  the client has real numbers — with `ConfidenceTag`s.
- **Every badge on these panels must be the `ConfidenceTag` from the matching
  `result.stats[]` entry** — remove the hard-coded `tag="verified"` /
  `tag="approximation"` literals.

### M3 — make the server route test actually run + gate CI

- Add `apps/web/vitest.config.ts`: `environment: "node"`, resolve `@/*` →
  `apps/web/src`, and rely on the built `@cephalon/engine` dist (add a
  `pretest`/`pretypecheck`-style `build:engine` hook to `apps/web/package.json`
  like `packages/services` has, or a root task).
- `apps/web/src/server/build-weapon.test.ts` — ensure it imports resolve and it
  asserts `/api/build/weapon` (call the route handler directly, or the service)
  for ~3 reference builds (`braton` bare, `braton` + `[serration_r3,
  split_chamber_r3]`, one with a scenario/Steel Path) returns `sustainedDps`
  etc. matching `BuildService.calculateWeapon` called directly.
- `.github/workflows/ci.yml` — add a `web-unit` job: build engine, then
  `pnpm --filter web test`.

### M4 — stop fabricating MR / disposition / polarities

`packages/services/src/catalog/catalog-service.ts`:
- `listWeapons` / `getWeaponDetail` — **wire `disposition`** from
  `packages/engine/src/data/riven-dispositions.ts` (`rivenDispositions`, keyed by
  weapon name; export a lookup from the engine barrel if needed). Round to 2
  decimals.
- `masteryReq`, `polarities`, `exilus` — **there is no data source.** Remove
  them from the return types entirely (don't return `0` / `[]` / `false`).
- `weapon-builder.tsx` + the switcher — drop the "MR n" text and the polarity
  hint on empty slots (show just the `◇` slot marker); keep the DISPOSITION chip
  (now real) and the INCARNON chip. The switcher rows show `category` +
  `disposition` only.

### M5 — a sim failure must not discard the deterministic build

`apps/web/src/app/api/build/weapon/route.ts`:
- Validate `weaponId` (404 if unknown) and clamp/validate `scenario.level`
  (e.g. 1–9999) and `enemyArchetypeId` (must be in
  `catalog.getEnemyTypes()` — 400 with a clear message if not) **before**
  calling anything.
- Run `builds.calculateWeapon(...)` first. Then run `sims.simulate(...)` in its
  **own** `try/catch`: on failure, return the build view-model with `ttk`
  omitted and a caveat like `"TTK unavailable: <reason>"`. The deterministic
  result always returns 200.
- `weapon-builder.tsx` — the `level` `NumberInput` gets `min={1} max={9999}`;
  handle a response with no `ttk` (show "—" + the caveat, not a blank screen);
  add a visible error state if the whole request 500s (a small inline message,
  keep the last good result).

### M6 — mod picker must not offer wrong-class mods

`packages/services/src/catalog/catalog-service.ts` `compatibleMods`:
- Build a `WeaponModProfile` for the weapon (the engine's
  `modEligibleForWeaponSlot` accepts one as the 5th arg — check its shape in
  `packages/engine/src/mods/mod-weapon-eligibility.ts`; it needs `weaponId` and
  whatever `modCompatibleWithWeaponProfile` reads). Pass it.
- Also post-filter by real weapon class: a `rifle` must not get `shotgun` /
  `bow` / `launcher` mods, `shotgun` only shotgun+rifle-generic, `bow` only
  bow+rifle-generic, `archgun` only archgun mods, etc. Map from
  `weapon.category` / `weapon.triggerType`, not the coarse
  primary/secondary/melee bucket.
- Add a `catalog-service.test.ts` case: `compatibleMods("braton")` includes
  `serration_r3` / `split_chamber_r3` and **excludes** `hells_chamber` /
  a bow-only mod.
- Sort the returned list: exact-class before generic, then by rarity
  (legendary→common) then name. (O6)

### O1 — scope the builder stylesheet

`weapon-builder.css` is global (bare `select {}` restyles the whole app).
Convert to a CSS module (`weapon-builder.module.css`) or prefix every rule with
`.weapon-builder`. No bare element selectors. Replace the hard-coded
`.damage-stack` hex colours (`#a5b4fc` etc.) with tokens (O8).

### O2 — the delta should clear and respect reduced-motion

`<Delta>` — after a change, show `prev → next  ±x%` for ~2 s then clear (a
`setTimeout` keyed to the result). Add a subtle transition on the metric value
(token `--dur-base` / `--ease-standard`), disabled under
`@media (prefers-reduced-motion: reduce)`.

### O3 — no nested buttons

The filled `.mod-slot` is a `<button>` containing rank-stepper `<button>`s.
Make the slot a `<div role="button" tabIndex={0}>` (with key handlers) or lift
the steppers out. `pnpm --filter web dev` must show **no** React
`validateDOMNesting` console warnings.

### O10 — empty-state centering

`.builder-empty { margin: 12vh auto }` inside the shell's scroll container
causes a short scroll with dead space. Use the shell's pattern instead:
`min-height: <something like 60vh>; display: grid; place-items: center;`.

### O11 — readability

`weapon-builder.tsx` is 37 lines of multi-statement one-liners; it's the
template for task 14. Reformat to normal multi-line TSX (one statement per
line, components extracted where it helps). No behaviour change. Same for the
CSS (one rule per line).

### Verify + report
- `pnpm -r typecheck`, `pnpm --filter @cephalon/engine test`,
  `pnpm --filter @cephalon/services test`, `pnpm --filter web test` (new),
  `pnpm --filter web build` all pass.
- `node scripts/check-engine-boundary.mjs` passes.
- `pnpm --filter web dev` — pick Braton, add Serration + Point Strike: the
  crit panel CC/CM and the status panel now move with the top metrics; badges
  come from the server; mod picker has no shotgun mods; delta clears after ~2s;
  no console warnings.
- Report: files touched, the `WEAPON_STAT_FIELDS` additions (if any), the
  `compatibleMods` filter logic, and the new vitest/CI wiring.
- Do not commit.
