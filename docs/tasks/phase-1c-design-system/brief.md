# Brief: Phase 1c task 12 — design-system foundation

## Scope

Build the **foundation** of Cephalon's design system in `apps/web`: the token
layer, fonts, core primitives, the app shell (sidebar + top bar), and a Ctrl+K
command-palette scaffold — plus a `/components` gallery route that renders
everything for review.

**This task builds the system, not the product screens.** No home dashboard, no
weapon/build pages, no mod slots, no comparison view, no codex, no AI panel, no
real search, no charts. Those are tasks 13–16+.

Everything is built and judged against
[`docs/design/design-language.md`](../../design/design-language.md) — the
user-authored design direction. Stack (decided): **Tailwind v4 + CSS-custom-property
tokens**, **Radix UI** unstyled primitives + **cmdk**. Dark theme only for now
(tokens structured so a light theme is possible later — do not hardcode colors
in components).

## Deliverables

### 1. Tailwind v4 + token layer
- Tailwind v4 in `apps/web` (CSS-first `@theme`), `src/app/globals.css`.
- Design tokens as CSS custom properties, one source of truth:
  - **Surface levels** — `--bg` (near-black), `--surface-1/2/3` (charcoal →
    graphite, layered), `--surface-inset`, `--overlay`.
  - **Text** — `--text-primary` (soft off-white), `--text-secondary` (muted
    gray), `--text-tertiary`, `--text-disabled`. No tiny gray-on-black — set a
    documented minimum.
  - **Accent** — `--accent` (primary) + `--accent-2` (secondary), each with
    `-hover` / `-muted` / `-contrast` variants. Used sparingly.
  - **Semantic** — `--positive`, `--negative`, `--warning`, `--info`, and
    rarity `--rare`, `--legendary`, plus `--selected`. Each with a `-bg` /
    `-border` / `-text` triplet where relevant.
  - **Spacing** — a 4px-based scale (`--space-0` … `--space-16` or a t-shirt
    scale). Consistent everywhere.
  - **Radii** — restrained: `--radius-sm` (~2px), `--radius-md` (~4px),
    `--radius-none`. Plus a **corner-clip** utility/token for the angular
    panel-edge treatment (a `clip-path` or pseudo-element notch) — used
    deliberately, not everywhere.
  - **Lines/borders** — `--line` (thin separator), `--line-strong`,
    `--border-subtle`. Line work over boxed borders.
  - **Typography** — see §2. Scale: `--text-display-lg/md/sm`, `--text-title`,
    `--text-label` (section labels, likely uppercase + tracking), `--text-body`,
    `--text-caption`, `--text-mono`. Line-heights + weights defined.
  - **Elevation** — 2–3 subtle shadow tokens (borders/insets preferred over
    heavy shadows).
  - **Motion** — `--dur-fast` (~120ms), `--dur-base` (~180ms), `--dur-slow`
    (~240ms); `--ease-standard` (ease-out, no spring). Respect
    `prefers-reduced-motion`.
  - **z-index** — a small named scale (`--z-sidebar`, `--z-header`,
    `--z-drawer`, `--z-dialog`, `--z-palette`, `--z-tooltip`).
- A `docs/design/tokens.md` (or a section in the gallery) listing every token +
  its value + intended use.

### 2. Fonts (self-hosted via `next/font`)
- **Display** (headings): a strong condensed / semi-condensed sans — use
  **Saira Condensed** (or Barlow Semi Condensed if it reads better). Weights
  500/600/700.
- **Body/UI**: **Inter** (or IBM Plex Sans). 400/500/600.
- **Numeric/mono**: **JetBrains Mono** (or IBM Plex Mono) — used for all stats
  and calculations, with `font-variant-numeric: tabular-nums`.
- Wire into `layout.tsx` + token CSS vars (`--font-display`, `--font-body`,
  `--font-mono`).

### 3. Core primitives (`apps/web/src/ui/`)
Styled with tokens only. Each with hover / focus-visible / disabled / selected
states where applicable, full keyboard support, ARIA correct.
- `Button` — variants `primary` / `secondary` / `ghost` / `danger`; sizes
  `sm` / `md`; optional leading icon. **Not** pill-shaped; restrained radius.
- `IconButton`.
- `Panel` / `Section` — inset surface, optional clipped corner, thin header
  separator, `title` + `actions` slots. The dense-page building block (not a
  card).
- `Card` — exists but visually distinct from Panel; use sparingly (doc when).
- `Stat` — `label` (uppercase label style) + `value` (mono/tabular) +
  optional `delta` (signed, colored positive/negative) + optional
  `confidence` slot. The core data-display atom.
- `StatGrid` / `StatRow` — dense aligned layouts of `Stat`.
- `Table` — dense, tabular-nums columns, thin row separators, no zebra,
  sortable-header affordance (visual only), sticky header option.
- `SegmentedControl` — keyboard-navigable, for scenario toggles / view
  switches (replaces most "tab bars" and pill groups).
- `Tabs` — Radix, styled minimal (underline/marker, not boxed).
- `Tooltip` — Radix, for progressive disclosure.
- `Drawer` — Radix Dialog as a right-side contextual drawer.
- `Dialog` / `Modal` — Radix.
- `Badge` — small, semantic, **not pill**; rarity variants.
- `ConfidenceBadge` — consumes the tag union
  `verified | approximation | not-modeled | pending-verification` (matches
  `@cephalon/services` `ConfidenceTag`); small, with a tooltip carrying the
  short definition; semantic color per tag (verified = neutral/positive,
  approximation = warning-ish, not-modeled = muted, pending = info). **Tasks
  13–16 consume this — its API must be stable.**
- `Field` set — `Label`, `TextInput`, `NumberInput` (tabular), minimal; enough
  for scenario panels later.
- `Kbd` — keyboard-shortcut hint.
- Lightweight data-viz atoms: `Sparkline` (thin line, no axes),
  `DeltaBar` / `MiniBar` (compact horizontal bar), `RadialMeter` (used
  sparingly). Documented viz rules. **No full charts.**

### 4. App shell (`apps/web/src/app/(app)/layout.tsx` or `src/ui/shell/`)
- `Sidebar` — persistent left, **compact**. The nav structure from
  `design-language.md` (Home / Arsenal / Builds / Farm / Market / Codex /
  Tools / Ask Cephalon), icon + label, grouped with subtle group labels,
  subtle active state (marker/inset, not a big filled button), collapsible.
  Icons: `lucide-react`.
- `TopBar` — thin. Slots: page-context (breadcrumb/title), a search trigger
  (opens the palette), right side: world-state indicator placeholder,
  notifications placeholder, account placeholder. Minimal vertical space.
- `AppShell` composing sidebar + topbar + main content region (with the
  correct scroll/overflow behavior for dense pages).
- Route group with **placeholder pages** for each nav destination (just the
  route + a titled empty `Panel` saying "<name> — coming in a later task").
  Do not build the real pages.

### 5. Command palette scaffold
- `CommandPalette` — `cmdk` inside a Radix Dialog, bound to **Ctrl+K /
  Cmd+K** (and an Escape close), styled to the system. Static grouped items:
  the nav destinations (navigating works), plus a disabled "Search items —
  coming soon" group. Not wired to real data.

### 6. `/components` gallery route
A single page (outside the app shell or in it, your call) that renders:
- every token — color swatches with the **contrast ratio vs their intended
  text/bg** annotated, the spacing scale, the type scale (each level with
  sample text), radii, motion (a play button per easing/duration).
- every primitive in every variant + every interaction state (show
  hover/focus/selected/disabled statically side by side where possible).
- `ConfidenceBadge` in all four tag states with its tooltip.
- the data-viz atoms with sample data.
This page is the review artifact and the acceptance surface.

## Acceptance criteria

1. `pnpm --filter web build` and `pnpm --filter web typecheck` pass;
   `pnpm --filter web dev` serves without console errors.
2. `/components` renders every token and every primitive/variant/state listed
   above.
3. **WCAG AA contrast**: every text-on-surface and text-on-accent pair used in
   the system is ≥ 4.5:1 for body text / ≥ 3:1 for large text — ratios shown on
   the gallery page. No tiny gray-on-black.
4. Keyboard: Tab reaches every interactive element with a **visible focus
   ring**; Ctrl+K opens/closes the palette; arrow keys work in
   `SegmentedControl`, `Tabs`, `Sidebar`, and the palette; Escape closes
   overlays.
5. `prefers-reduced-motion: reduce` disables non-essential animation.
6. No hardcoded hex/px in components — everything references tokens (a grep for
   `#[0-9a-f]{3,6}` in `src/ui/` returns only the token definition file).
7. `ConfidenceBadge` accepts exactly the `@cephalon/services` `ConfidenceTag`
   union and is exported for tasks 13–16.
8. The design **visibly embodies** `design-language.md`: dark layered surfaces,
   restrained accent, condensed display type + tabular numerics, angular/clipped
   panel edges (not all-rounded), line work over boxed borders, compact
   sidebar, thin header. It must **not** look like a generic AI SaaS dashboard —
   the `design-language.md` anti-pattern list is a review checklist.
9. New deps limited to: `tailwindcss` v4 (+ its postcss/vite plugin), Radix UI
   packages actually used, `cmdk`, `lucide-react`. No component/theme library.
10. No upstream project name introduced anywhere.

## Preflight state

- Branch `main`, last commit `2e22098` (task 11).
- `apps/web` is a bare Next 16 / React 19 scaffold — `layout.tsx` +
  `page.tsx` = "Cephalon", `next.config.ts` has `transpilePackages`, **no CSS
  setup at all**.
- `@cephalon/services` exports `ConfidenceTag =
  "verified" | "approximation" | "not-modeled" | "pending-verification"`.
- Workflow: this is a "UI change" row — Codex implements → coordinator runs the
  app + visual check (Apollo) → the user reviews the `/components` gallery and
  the shell **before** tasks 13–16 start. Argus/Athena are light here (no
  existing UI to investigate; the design direction is the spec).
