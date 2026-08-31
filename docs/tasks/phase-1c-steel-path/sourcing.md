# Steel Path scaling — sourced before/after spec (calc-formula gate)

Argus, read-only. 2026-08-30. For the hard-stop calc-formula gate
(`docs/agent/decisions.md`, 2026-08-30 "Steel Path" entry). Task 11 adds an
opt-in Steel Path (`sp`) input to the engine's TTK path.

**Headline finding — the commonly cited figures are stale.** Steel Path was
rebalanced in **Update 36.0 (2024-06-18, "Jade Shadows")**. As of that update
Steel Path **no longer multiplies enemy Armor at all** (it used to apply a large
armor multiplier), and the Shield multiplier is **×2.5**, not the old ×6.25. The
task brief's "×3.0 armor" is an old value and must not be used. The current,
official-wiki Steel Path enemy combat modifiers are:

| Stat | SP modifier (current) | Source |
|---|---|---|
| Enemy level | **+100** (base mission level) | wiki.warframe.com/w/The_Steel_Path |
| Health | **×2.5** ("+150%, to a total of 250%") | wiki.warframe.com/w/The_Steel_Path |
| Shield | **×2.5** (was ×6.25 pre-U36) | wiki.warframe.com/w/The_Steel_Path (U36.0 patch note) |
| Armor | **×1 — not modified** (removed in U36.0) | wiki.warframe.com/w/The_Steel_Path (U36.0 patch note) |
| Damage dealt | no SP-specific multiplier documented | (see §3) |
| Resource/mod drop chance | +100% each | out of scope (not combat) |

---

## 1. Verified facts — Steel Path enemy modifiers

### 1a. Level shift: +100

> "All enemies have their level increased by **100**, and gain an additional
> +**150%** (to a total of **250%**, or **2.5x**) bonus to health and shields."
> — https://wiki.warframe.com/w/The_Steel_Path

Exceptions (cite, but out of scope for the `sp` flag — the engine takes a raw
level and has no game-mode context):

> "Enemies in Archwing and Empyrean have their level increased by 50" (i.e. +50,
> not +100). "Enemies in Duviri have their level increased by +20, but with no
> changes to Health or Shields." — https://wiki.warframe.com/w/The_Steel_Path

Eidolon bosses get fixed levels (Teralyst 110 / Gantulyst 120 / Hydrolyst 130),
also out of scope.

### 1b. Health multiplier: ×2.5 (stacks multiplicatively on level-scaled health)

Same sentence as above: "+150% (to a total of 250%, or 2.5x) bonus to health".
The wiki phrases it as a **bonus multiplier applied on top of** the normal
level-scaled health — i.e. `finalHP = levelScaledHP(baseHP, level+100) × 2.5`.
It does **not** replace any part of the level curve.

> Update 36.0 (2024-06-18): "enemy stat scalings, such as Health and Shields, now
> grow faster as enemy level increases, in compensation of the loss in Enemy
> Armor" — warframe.com patch notes / wiki U36.0 note

(That "grow faster" change is baked into DE's live level curve, which the engine
already only approximates — see §2 risk. It is not a separate SP multiplier.)

### 1c. Armor multiplier: NONE (as of U36.0)

> Update 36.0 (2024-06-18): "**Steel Path no longer increases Armor values.**"
> — https://wiki.warframe.com/w/The_Steel_Path (Patch History)

Armor on Steel Path still rises — but **only** through the +100 level shift fed
into the normal armor curve. There is no SP armor multiplier.

### 1d. Shield multiplier: ×2.5

> Update 36.0 (2024-06-18): "**Steel Path Shields are now multiplied by 2.5x**, in
> place of the previous 6.25x. Steel Path Shields were doubly-applying the
> multiplier unintentionally." — https://wiki.warframe.com/w/The_Steel_Path
> (Patch History)

Same composition as health: `finalShield = levelScaledShield(baseShield, level+100) × 2.5`.

### 1e. Non-combat modifiers (list, out of scope)

- "+100% Resource Drop Chance"
- "+100% Mod Drop Chance (excluded from Railjack)"
  — https://wiki.warframe.com/w/The_Steel_Path

No credit or affinity multiplier is listed as a baseline SP modifier. **None of
these touch TTK — exclude from the `sp` flag.**

### 1f. Enemy *damage output* on Steel Path

The Steel Path page lists **no** SP-specific damage-dealt multiplier. General
(non-SP) enemy damage scaling is `1 + 0.015 × (level − baseLevel)^1.55` with a
flat ×2 (Corpus/Grineer/Techrot) or ×3 (Infested) faction factor
(https://wiki.warframe.com/w/Enemy_Level_Scaling). The engine's TTK path models
the player killing the enemy, not incoming damage, so enemy damage output is
**out of scope** for task 11 regardless.

---

## 2. Current engine formulas (`packages/engine/src/calc/ttk.ts`)

All quotes verbatim from `packages/engine/src/calc/ttk.ts` (731 lines).

### 2a. `scaleArmor(base, level)` — lines 78–97

```ts
export function scaleArmor(base: number, level: number): number {
  if (base <= 0) return 0;
  const d = level - 1;
  if (d <= 0) return Math.min(base, 2700);
  let s: number;
  if (d < 70) {
    s = base * (1 + 0.005 * Math.pow(d, 1.75));
  } else if (d > 80) {
    const a80 = base * (1 + 0.005 * Math.pow(80, 1.75));
    s = a80 + (d - 80) * 0.5;
  } else {
    const t = (d - 70) / 10;
    const sm = t * t * (3 - 2 * t);
    const lo = base * (1 + 0.005 * Math.pow(d, 1.75));
    const a80 = base * (1 + 0.005 * Math.pow(80, 1.75));
    const hi = a80 + (d - 80) * 0.5;
    s = lo * (1 - sm) + hi * sm;
  }
  return Math.max(base, Math.min(s, 2700));
}
```

- Lower curve `1 + 0.005·d^1.75` matches the wiki's armor lower endpoint
  `f1 = 1 + 0.005(q)^1.75` (https://wiki.warframe.com/w/Enemy_Level_Scaling).
- `d = level - 1` — the engine assumes **every enemy has base level 1**; the wiki
  uses `q = currentLevel − baseLevel`. Pre-existing simplification, not part of
  this task.
- Upper region is a linear `a80 + 0.5·(d−80)` — the engine's own approximation of
  the wiki's `f2 = 1 + 0.4·q^0.75` upper endpoint (**divergent** — see risks).
- Soft cap **2700** (armor DR caps at 90%); `enemyArmorDamageReduction` (lines
  104–107) `= min(0.9, 0.9·armor/2700)`.

### 2b. `scaleHealth(base, level, faction?)` — lines 150–165

```ts
export function scaleHealth(base: number, level: number, faction?: string): number {
  const d = level - 1;
  if (d <= 0) return base;
  const exp = faction?.toLowerCase() === "infested" ? 2.15 : 2.0;
  if (d < 70) return base * (1 + 0.015 * Math.pow(d, exp));
  if (d > 80) {
    const a80 = base * (1 + 0.015 * Math.pow(80, exp));
    return a80 * (1 + (d - 80) * 0.005);
  }
  const t = (d - 70) / 10;
  const sm = t * t * (3 - 2 * t);
  const lo = base * (1 + 0.015 * Math.pow(d, exp));
  const a80 = base * (1 + 0.015 * Math.pow(80, exp));
  const hi = a80 * (1 + (d - 80) * 0.005);
  return lo * (1 - sm) + hi * sm;
}
```

- Lower curve `1 + 0.015·d^exp`, `exp = 2.0` (2.15 Infested). Wiki current lower
  endpoint is `1 + 0.015·q^2.12` (Grineer/Corpus) / `1 + 0.0225·q^2.12` (Infested)
  — engine is close but **not identical** (2.0/2.15 vs 2.12, and the Infested
  coefficient differs). Pre-existing.
- Upper region `a80·(1 + 0.005·(d−80))` — again the engine's linear approximation,
  not the wiki's `1 + 10.7332·q^0.72`-style upper endpoint. **Divergent.**

### 2c. `scaleShield(base, level)` — lines 167–181

```ts
export function scaleShield(base: number, level: number): number {
  if (base <= 0 || level <= 1) return base;
  const d = level - 1;
  if (d < 70) return base * (1 + 0.0075 * Math.pow(d, 2));
  if (d > 80) {
    const a80 = base * (1 + 0.0075 * Math.pow(80, 2));
    return a80 * (1 + (d - 80) * 0.003);
  }
  const t = (d - 70) / 10;
  const sm = t * t * (3 - 2 * t);
  const lo = base * (1 + 0.0075 * Math.pow(d, 2));
  const a80 = base * (1 + 0.0075 * Math.pow(80, 2));
  const hi = a80 * (1 + (d - 80) * 0.003);
  return lo * (1 - sm) + hi * sm;
}
```

### 2d. Constants / tables

- `ENEMY_TYPES` — lines 26–49. Base stats e.g. line 28:
  `{ id: "lancer", name: "Lancer", faction: "Grineer", baseHealth: 100, baseArmor: 100, baseShield: 0, healthType: "cloned_flesh", armorType: "ferrite", shieldType: "none" }`.
  Line 30 Heavy Gunner `baseHealth: 700, baseArmor: 500`. Line 35 Crewman
  `baseHealth: 60, baseShield: 150`.
- Armor soft-cap `2700` — literal in `scaleArmor` (lines 81, 86, 92, 96) and
  `enemyArmorDamageReduction` (line 106).
- S-curve smoothstep `sm = t*t*(3-2*t)` over the level-diff 70–80 band — armor
  line 89, health line 159, shield line 175.
- `HEALTH_MODIFIERS` lines 52–61, `ARMOR_MODIFIERS` lines 63–66,
  `SHIELD_MODIFIERS` lines 68–71 — damage-type × surface-type tables, **not**
  level-dependent, unaffected by SP.

### 2e. Where scaling is invoked

`simulateDiscreteTTK` — lines 323–325:

```ts
const scaledHp = scaleHealth(enemy.baseHealth, level, enemy.faction);
const baseArmor = scaleArmor(enemy.baseArmor, level);
const scaledShield = scaleShield(enemy.baseShield, level);
```

Public entry — line 729:
`export function calculateTTK(stats: CalculatedStats, enemy: EnemyType, level: number): TTKResult`.
There is no `sp` / Steel Path parameter anywhere in `ttk.ts` or in
`SimulationParams` today (confirmed by `docs/tasks/upstream-engine-investigation/investigation.md`
§2 coverage table, "Steel Path — ❌").

---

## 3. Proposed before/after

Add three named constants (single source, top of `ttk.ts`):

```ts
export const SP_LEVEL_SHIFT = 100; // wiki.warframe.com/w/The_Steel_Path — "level increased by 100"
export const SP_HEALTH_MULT  = 2.5; // wiki.warframe.com/w/The_Steel_Path — "+150% (to a total of 250%, or 2.5x)"
export const SP_SHIELD_MULT  = 2.5; // wiki.warframe.com/w/The_Steel_Path U36.0 — "Shields are now multiplied by 2.5x"
// NO SP_ARMOR_MULT — wiki.warframe.com/w/The_Steel_Path U36.0: "Steel Path no longer increases Armor values."
```

Preferred shape: thread an optional `sp` boolean down to the three scaling calls
(and expose it on `SimulationParams` + `calculateTTK`), applying the level shift
as an argument and the multipliers on the return value. Keeps the scaling
primitives' signatures backward-compatible if `sp` defaults to `false`.

### 3a. Effective level input

| | Expression |
|---|---|
| Before | `level` (raw, passed straight through) |
| After  | `const effLevel = sp ? level + SP_LEVEL_SHIFT : level;` |

### 3b. `scaleHealth`

| | Expression (at the call site in `simulateDiscreteTTK` line 323) |
|---|---|
| Before | `scaleHealth(enemy.baseHealth, level, enemy.faction)` |
| After  | `(sp ? SP_HEALTH_MULT : 1) * scaleHealth(enemy.baseHealth, effLevel, enemy.faction)` |

### 3c. `scaleArmor`

| | Expression (line 324) |
|---|---|
| Before | `scaleArmor(enemy.baseArmor, level)` |
| After  | `scaleArmor(enemy.baseArmor, effLevel)`  — **no multiplier**, only the level shift; the 2700 soft-cap still applies inside `scaleArmor` |

### 3d. `scaleShield`

| | Expression (line 325) |
|---|---|
| Before | `scaleShield(enemy.baseShield, level)` |
| After  | `(sp ? SP_SHIELD_MULT : 1) * scaleShield(enemy.baseShield, effLevel)` |

(If the team prefers the multipliers *inside* the primitives, add an `sp` param to
each of `scaleHealth`/`scaleArmor`/`scaleShield`; behaviour is identical. Doing it
at the call site keeps the primitives untouched and the diff smaller.)

---

## 4. Order of operations (explicit)

1. **Level shift first.** `effLevel = level + 100` (SP on).
2. **Then base level-scaling**, unchanged, on `effLevel`:
   `scaleHealth(base, effLevel)`, `scaleArmor(base, effLevel)`,
   `scaleShield(base, effLevel)`.
3. **Then the SP multipliers** on the scaled results: health `× 2.5`,
   shield `× 2.5`, armor `× 1` (untouched).

So SP is **"+100 levels AND ×2.5 on the level-scaled health/shield"** — the
multiplier is applied *after* the shifted-and-scaled value, matching the wiki's
"gain an additional +150% … bonus to health and shields" wording. Armor gets the
shift only.

Armor DR (`enemyArmorDamageReduction`, line 104) needs no change — it consumes
whatever `scaleArmor` returns; with the +100 shift most SP heavies already pin at
the 2700 cap / 90% DR (see §6).

---

## 5. Risks / unknowns

1. **Engine level curve ≠ current DE curve (pre-existing, not introduced here).**
   The engine's upper-region health/armor/shield formulas are linear
   approximations, and its exponents (health `2.0`/`2.15` vs wiki `2.12`) differ
   from the post-U27.2 wiki endpoints. Feeding `level+100` pushes every SP enemy
   deep into that approximated upper region, so **absolute** SP numbers will drift
   from live. This is a property of the existing `scaleHealth`/`scaleArmor` the
   gate already lives with — the `sp` flag does not make it worse, but SP tests
   should assert the **relationship** (`sp` result `== mult × non-sp(level+100)`),
   not live-game absolute values. Confidence label for SP output: **Approximation**,
   not Verified, until checked against the live game.
2. **No S-curve double-count for health/shield.** The engine's upper region is
   `a80·(1 + 0.005·(d−80))` — linear growth, *not* an asymptote. A flat ×2.5 on
   top is a clean multiplier and does not interact pathologically with the curve.
   (The old ×3.0-armor double-count worry is now **moot** — SP no longer
   multiplies armor.)
3. **Armor soft-cap interaction.** With `+100` levels, armored heavies
   (Heavy Gunner base 500, Bombard base 400, Eximus base 750) hit the 2700 cap
   well below SP levels even *without* a multiplier, so removing the old armor
   multiplier changes SP armor far less than expected for those units (they were
   already capped). Light units (Lancer base 100) stay well under the cap and see
   armor rise only modestly. This is correct per wiki but worth calling out so the
   sign-off isn't surprised that "SP armor barely moved".
4. **Damage Attenuation — defer, do NOT bundle into task 11.** The wiki's
   "Damage Attenuation" mechanic (DPS-adaptive damage reduction on large health
   pools) is **not cleanly specified**: the page opens with
   "Unclear if new or old Damage Attenuation stats, unclear how long it lasts. The
   whole page needs a check and rewrite." (https://wiki.warframe.com/w/Damage_Attenuation).
   It is **not Steel-Path-specific** — it's a special-/boss-enemy mechanic
   (Liches, Archons, Eidolons, Demolysts, etc.) that exists at any level. The
   engine's 19-enemy roster has no such units and `ttk.ts` does not model it.
   **Recommendation: separate follow-up task**, out of scope for the `sp` flag.
5. **Console vs PC / pre-vs-post-update.** The ×2.5 health, ×2.5 shield, no-armor
   figures are **post-U36.0 (2024-06-18)** and platform-agnostic. Older
   community/Fandom references (and this task's own brief) cite ×3.0 armor or
   ×6.25 shield — those are **stale**; use only the wiki.warframe.com values
   above. No PC/console split.
6. **Archwing/Railjack use +50, Duviri +20 with no health/shield mult.** The
   engine has no game-mode context, so the `sp` flag models the standard
   ground-mission case (+100 / ×2.5 / ×2.5). Document this as a known scope
   limit; do not try to infer mode.
7. **Faction string casing.** `scaleHealth` lowercases `faction` for the Infested
   exponent; `enemy.faction` values in `ENEMY_TYPES` are `"Grineer"`/`"Corpus"`/
   `"Infested"`/`"Corrupted"`/`"Stalker"`. `"Corrupted"` enemies use the non-
   Infested exponent today — unchanged by SP, just noting the `sp` path inherits
   whatever `scaleHealth` already does.

---

## 6. Worked oracle examples (for `sp`-on characterization tests)

Computed with the **current `ttk.ts` formulas** (script-run against verbatim
copies of `scaleHealth`/`scaleArmor`/`scaleShield`). SP-on = feed `level+100`,
then `×2.5` health, `×2.5` shield, `×1` armor. These assert the **composition is
wired correctly**, not live-game accuracy (see risk 1). Round-trip identity to
prefer in tests: `scaleHealth_sp(base, L) === 2.5 * scaleHealth(base, L + 100)`.

| Enemy (base stats) | Base level | SP feeds level | Stat | SP-off | SP-on | Check |
|---|---|---|---|---|---|---|
| Grineer Lancer (HP 100, armor 100, `cloned_flesh`/`ferrite`) | 60 | 160 | health | 5 321.5 | **33 828.8** | `= 2.5 × scaleHealth(100,160,"Grineer")` (13 531.5) |
| " | 60 | 160 | armor | 728.0 | **1 209.5** | `= scaleArmor(100,160)`, no mult; DR 24.3% → 40.3% |
| Grineer Lancer | 100 | 200 | health | 10 621.5 | **38 678.8** | `= 2.5 × scaleHealth(100,200,"Grineer")` |
| " | 100 | 200 | armor | 1 179.5 | **1 229.5** | shift-only; DR 39.3% → 41.0% (barely moves — armor near curve knee) |
| Grineer Heavy Gunner (HP 700, armor 500) | 100 | 200 | health | 74 350.5 | **270 751.3** | `= 2.5 ×` scaled |
| " | 100 | 200 | armor | 2 700.0 | **2 700.0** | already at soft-cap both ways; DR 90% → 90% |
| Corpus Crewman (HP 60, shield 150, armor 0) | 100 | 200 | health | 6 372.9 | **23 207.3** | `= 2.5 ×` scaled |
| " | 100 | 200 | shield | 7 768.9 | **24 934.9** | `= 2.5 × scaleShield(150,200)` |

(Exact float values reproducible with the formulas in §2; regenerate alongside
`gen-baseline.mjs` if the engine curve is ever retuned.)

---

## 7. Recommendation

**Cleanly sourced enough to gate on now — with one correction to the brief and
one deferral.**

- The three constants are unambiguous on the current official wiki:
  **`SP_LEVEL_SHIFT = 100`**, **`SP_HEALTH_MULT = 2.5`**, **`SP_SHIELD_MULT = 2.5`**,
  **no armor multiplier** (armor gets the level shift only). Confidence: **high**
  — single canonical source, explicit U36.0 patch note for the armor removal and
  the shield ×2.5.
- **Correct the task brief:** it specifies "×2.5 health / ×3.0 armor". The ×3.0
  armor figure is pre-U36 and wrong; there is now **no** SP armor multiplier.
  Shield ×2.5 (not in the brief) should be added.
- **Order of operations:** level shift first → existing base scaling on the
  shifted level → SP multipliers on the health/shield results. Armor: shift only.
- **Defer Damage Attenuation** to a separate follow-up — the wiki page is
  self-flagged as unreliable, and the mechanic is not SP-specific and touches no
  enemy in the engine's roster.
- A narrower "+100 levels only, multipliers deferred" first version is **not
  necessary** — the health/shield multipliers are as well-sourced as the level
  shift. Ship all three (shift + ×2.5 health + ×2.5 shield) together; that is the
  complete current SP combat model.
- Output confidence label for SP results in the UI: **Approximation — pending
  live verification** (the engine's underlying level curve is already an
  approximation of DE's; SP inherits that), per the existing decisions-log entry.

### §4 of the upstream investigation ("SP proxy = raise the level")

`docs/tasks/upstream-engine-investigation/investigation.md` says users approximate
SP by raising enemy level. That gets the **+100 level shift** right (and thus most
of the armor and a large part of the health growth). What it **misses**: the
flat **×2.5 on health** and **×2.5 on shields** applied on top of the level
curve — a level-only proxy under-states SP health by 2.5× and SP shields by 2.5×.
It does **not** miss an armor multiplier, because there no longer is one — a
level-only proxy is actually *correct* for SP armor.
