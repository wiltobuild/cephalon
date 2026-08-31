# Cephalon — Design Language

_Canonical design direction for the whole product. Authored by the user
(product owner) 2026-08-30. Every UI task (milestone 1c onward) is built and
reviewed against this. If a screen doesn't meet this bar, redesign it._

**Stack (decided):** Next.js App Router + React 19 · **Tailwind v4** with design
tokens as CSS custom properties (`--color-*`, `--space-*`, …), themeable · **Radix
UI** unstyled primitives + **cmdk** for the command palette. No component
library's visual styling — primitives are styled with our tokens only.

---

## Identity

A **serious Warframe command center** — a high-end game companion / tactical
sci-fi interface. Premium, intentional, distinctive. **Not** generic
AI-generated SaaS UI.

Feels like: high-end game companion, tactical sci-fi interface, restrained
futuristic design, clean information density, strong hierarchy, premium desktop
application, readable for long theorycrafting sessions. Inspired by Warframe's
universe without copying Warframe's actual UI.

### Anti-patterns — do NOT ship

- Excessive rounded cards everywhere; every component a rounded rectangle
- Random gradients on every surface; gradients used for "personality"
- Giant empty hero sections
- Generic dashboard template look
- Overuse of glassmorphism
- Purple-on-black cyberpunk cliché
- Inconsistent spacing
- Huge pill buttons
- Meaningless decorative blobs
- Cluttered card grids
- Excessive borders around every element
- Tiny gray text on black backgrounds

The distinctive identity comes from **typography, shape language, subtle line
work, panel structure, motion, iconography, and data visualization** — not
gradients.

---

## Visual direction

### Color

- Dark interface: layered **charcoal, graphite, near-black** surfaces (defined
  surface levels, not ad-hoc).
- Text: soft **off-white**; **muted gray** for secondary info. Strong contrast —
  no tiny gray-on-black.
- **One primary accent + one secondary accent**, used sparingly.
- Strong colors reserved for **semantic meaning only**: positive, negative,
  warning, rare, legendary, selected. Not a rainbow.
- Gradients: subtle, occasional, only for selected states, important stats, rare
  / special-weapon indicators, progress visualization.

### Shape language

- **Not** every element a rounded rectangle. Use: slightly clipped corners,
  angular panel edges, thin separators, segmented controls, inset surfaces,
  restrained corner radii, occasional asymmetric layouts.
- **Cards only when information genuinely belongs in a card.** Dense pages (build
  planner) use structured panels and sections, not dozens of floating cards.
- Restraint on borders — line work, not a border around everything.

### Typography (does a lot of the visual work)

- **Display font**: strong condensed / semi-condensed, for headings.
- **Body/UI font**: highly readable modern sans-serif.
- **Numeric**: monospace or tabular numerals for calculations and stats —
  aligned tabular numbers wherever possible. Numerical data must be
  exceptionally easy to scan.
- Obvious hierarchy across: page titles, section labels, item names, primary
  stats, secondary stats, explanatory text, metadata.

### Motion

- Precise and restrained. Quick, polished transitions.
- Subtle animation for: changing builds, switching tabs, expanding details,
  comparison deltas, opening drawers, command palette, loading calculations.
- **No** bouncy animations, **no** excessive spring effects.

### Data visualization

- Integrated into the interface, not giant colorful analytics charts.
- Prefer: thin line graphs, compact bars, sparingly-used radial indicators,
  stacked damage distributions, small sparklines, comparison deltas.

---

## Information density

Power-user application. Do **not** oversimplify to the point of 5 clicks for
basic info. High density **and** readable.

**Progressive disclosure**: show the most important info immediately; deeper
detail via expandable rows, tooltips, side panels, tabs, contextual drawers,
hover states. The user understands a build quickly without feeling buried.

---

## Layout & navigation

### Persistent left sidebar — compact and premium

Icons + labels + subtle active states + clear grouping. **Not** giant nav
buttons. Structure:

```
Home
Arsenal
  Warframes · Weapons · Companions · Operator
Builds
  My Builds · Loadouts · Compare
Farm
  Relics · Resources · Prime Parts · Mastery
Market
Codex
Tools
  Damage Calculator · Enemy Simulator · Riven Analyzer
Ask Cephalon   (global)
```

### Global Ctrl+K command / search interface.

### Thin top header

Current page context · search · account/profile · world-state indicators ·
notifications. Do not waste vertical space.

### Responsive

Desktop-first (power-user tool). Still responsive: collapse sidebar, stack
comparison panels, secondary panels become drawers, preserve the most important
stats.

---

## Screen direction (for later 1c tasks — not task 12)

- **Home dashboard** — a player's command center. Mixed layout: one strong
  primary section + compact status rows + small metric blocks + contextual side
  panels. Not identical cards. Answers "what should I care about right now?"
  (equipped loadout, goals, world state, recommended activities, crafting
  timers, relic opportunities, mastery progress, market opportunities).
- **Weapon / build pages** — the weapon is the visual focus. Hierarchy: item
  name → primary metrics (sustained DPS, burst DPS, average hit, expected TTK) →
  damage profile → critical profile → status output → mod configuration →
  arcane → scenario settings → detailed calculations. The mod grid is **not**
  the whole design.
- **Mod slots** — compact, tactical, readable: mod name, rank, polarity, major
  stat effect, rarity marker. Deeper mechanics on hover/click. Changing a mod
  visibly animates the effect on the build (e.g. `Sustained DPS 3.81m → 3.11m
  −18.4%`).
- **Build comparison** — one of the strongest visual features. Side-by-side /
  split. Highlight only meaningful differences (not dozens of red/green
  numbers). Show major perf differences, TTK, DPS, status, faction multipliers,
  survivability. Include a short "Why this changed" section.
- **Codex / search** — fast, information-rich compact rows (not giant cards).
  Each row: type, ownership, mastery, market value, availability, relevant
  status. One unified detail page per item, not scattered sections.
- **Ask Cephalon** — not a ChatGPT clone. Contextual side panel / command
  interface, integrated. When it references weapons/mods/builds/enemies/market
  items, render them as **native interactive app objects**, not plain text.
  Another control surface for the app.

---

## Design-system requirements

Define once, reuse everywhere — the whole app looks like one product:

spacing scale · typography scale · surface levels · border rules · corner styles
· icon sizes · hover states · selected states · focus states · semantic colors ·
data-visualization rules.

Do not style screens independently.

---

## Quality bar (check every major screen before "done")

- Does this look like a generic AI dashboard? → redesign
- Too many cards? Too many rounded rectangles?
- Is the information hierarchy obvious? Is the page easy to scan?
- Does the app have a recognizable visual identity?
- Does this feel appropriate for Warframe?
- Can a serious theorycrafter use this for hours without eye strain?
- Does every decorative element have a purpose?

The final result should feel like a polished premium Warframe companion built by
an experienced product design team — not a generated template.
