# Codex handoff — Phase 1c task 12: design-system foundation

Run from repo root:

```
codex.cmd exec --skip-git-repo-check -s workspace-write -C "C:\Users\Wil\Documents\Projects\Cephalon" "<prompt below>" < /dev/null
```

---

## Prompt

Task: build the **design-system foundation** for Cephalon's web app (`apps/web`)
— token layer, fonts, core primitives, app shell, Ctrl+K command-palette
scaffold, and a `/components` gallery route. **Foundation only — no product
screens** (no home dashboard, weapon pages, mod slots, comparison view, codex,
AI panel, real search, real charts). Those are later tasks.

**Read first and follow closely:**
- `docs/tasks/phase-1c-design-system/brief.md` — full deliverable list + the 10
  acceptance criteria.
- `docs/design/design-language.md` — the user-authored design direction. This is
  the bar. Its **anti-pattern list is a hard checklist** — the output must not
  look like a generic AI/SaaS dashboard. Dark, layered, restrained, angular,
  typography-led, line work over boxed borders, compact.

`apps/web` is a bare Next 16 / React 19 scaffold with **no CSS setup**. Stack is
decided: **Tailwind v4** (CSS-first `@theme` in `globals.css`) + **CSS custom
property tokens**, **Radix UI** unstyled primitives, **cmdk**, `lucide-react`.
Dark theme only for now — but put every color/space/type value in a token; no
hardcoded hex/px in components.

### Concrete starting tokens (tune for contrast; these are the direction)

```css
/* surfaces — near-black → graphite, genuinely layered */
--bg:            #0a0b0d;
--surface-1:     #101216;
--surface-2:     #171a1f;
--surface-3:     #1f232a;
--surface-inset: #0c0d10;
--overlay:       rgba(6,7,9,0.72);

/* text — soft off-white, real contrast, NO tiny gray-on-black */
--text-primary:   #e9eaec;
--text-secondary: #a2a8af;
--text-tertiary:  #6d737b;   /* labels/metadata only, never long body copy */
--text-disabled:  #4b5058;

/* accent — restrained cool steel-cyan primary + warm amber secondary.
   NOT purple. Used sparingly. */
--accent:          #46a9b7;
--accent-hover:    #57c1d0;
--accent-muted:    #46a9b733;
--accent-contrast: #04191c;
--accent-2:        #cf9b47;   /* rare/important/legendary lean */
--accent-2-hover:  #e0ac57;

/* semantic — only for meaning */
--positive: #5bb47b;  --negative: #d75c52;  --warning: #d9a441;  --info: #5b93c4;
--rare:     #46a9b7;  --legendary: #cf9b47; --selected: #46a9b7;

/* lines over borders */
--line:        #24272d;
--line-strong: #333840;

/* spacing — 4px base */
--space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
--space-5:20px; --space-6:24px; --space-8:32px; --space-10:40px; --space-12:48px;

/* radii — restrained; plus an angular chamfer treatment */
--radius-sm:2px; --radius-md:4px; --radius-none:0;
/* --chamfer: a ~7px corner cut via clip-path, applied deliberately to
   Panel headers, active nav markers, selected states — NOT everywhere */

/* type */
--font-display:'Saira Condensed', 'Barlow Semi Condensed', system-ui, sans-serif;
--font-body:   'Inter', system-ui, sans-serif;
--font-mono:   'JetBrains Mono', ui-monospace, monospace;
--text-display-lg: 28px/1.1 600;
--text-display-md: 20px/1.15 600;
--text-title:      15px/1.3 600;
--text-label:      11px/1.2 600;   /* uppercase, letter-spacing .08em */
--text-body:       13px/1.5 400;
--text-caption:    11px/1.45 400;
--text-mono:       13px/1.4 500;   /* font-variant-numeric: tabular-nums */

/* motion */
--dur-fast:120ms; --dur-base:180ms; --dur-slow:240ms;
--ease-standard: cubic-bezier(.2,.0,.0,1);

/* z */
--z-sidebar:10; --z-header:20; --z-drawer:40; --z-dialog:50; --z-palette:60; --z-tooltip:70;
```

Fonts via `next/font/google` (`Saira_Condensed`, `Inter`, `JetBrains_Mono`),
wired to the `--font-*` vars in `layout.tsx`.

### Build

1. **Tailwind v4 setup** in `apps/web` (`@tailwindcss/postcss` or the vite
   plugin as Next 16 wants), `src/app/globals.css` importing Tailwind + the
   `@theme` token block above. Add a short `docs/design/tokens.md` listing every
   token, value, and use.
2. **Primitives** in `apps/web/src/ui/` — the full list in brief §3: `Button`
   (primary/secondary/ghost/danger, sm/md, not pill), `IconButton`, `Panel`
   (inset, optional chamfer header, `title`+`actions` slots), `Card` (distinct
   from Panel, sparingly), `Stat` (label + tabular value + optional signed
   colored `delta` + `confidence` slot), `StatGrid`/`StatRow`, `Table` (dense,
   tabular nums, thin separators, no zebra, sticky-header option),
   `SegmentedControl` (keyboard-nav), `Tabs` (Radix, underline not boxed),
   `Tooltip` (Radix), `Drawer` (Radix Dialog, right side), `Dialog` (Radix),
   `Badge` (semantic, not pill, rarity variants), `ConfidenceBadge`, `Label` +
   `TextInput` + `NumberInput` (tabular), `Kbd`, and data-viz atoms `Sparkline`
   (thin line, no axes), `MiniBar`, `RadialMeter` (sparingly). All: token-only
   styling, `:focus-visible` ring, disabled/hover/selected states, correct ARIA,
   full keyboard support.
   - **`ConfidenceBadge`** — prop `tag: "verified" | "approximation" |
     "not-modeled" | "pending-verification"` (import the type from
     `@cephalon/services` if practical, else re-declare identically). Small,
     with a Radix Tooltip carrying a one-line definition per tag. Colors:
     verified → neutral/positive, approximation → warning, not-modeled → muted,
     pending-verification → info. **Tasks 13–16 consume this; keep the API
     minimal and stable.**
3. **App shell** — `apps/web/src/ui/shell/` + a route group
   `apps/web/src/app/(app)/layout.tsx`:
   - `Sidebar` — persistent left, compact. Nav from `design-language.md`
     (Home / Arsenal[Warframes,Weapons,Companions,Operator] /
     Builds[My Builds,Loadouts,Compare] / Farm[Relics,Resources,Prime Parts,
     Mastery] / Market / Codex / Tools[Damage Calculator,Enemy Simulator,
     Riven Analyzer] / Ask Cephalon). Icon (`lucide-react`) + label, subtle
     group labels, subtle active marker (a chamfered accent bar / inset — not a
     big filled button), collapsible to icons-only. Keyboard navigable.
   - `TopBar` — thin. Left: page context (title/breadcrumb slot). Center/right:
     a search trigger button (`⌘K` / `Ctrl K` `Kbd` hint) that opens the
     palette; placeholders for world-state indicator, notifications, account.
     Minimal height.
   - `AppShell` composing them + a `<main>` region that scrolls independently.
   - **Placeholder routes** for every nav destination — each just renders a
     titled empty `Panel`: "<name> — coming in a later task". Do NOT build real
     pages.
4. **`CommandPalette`** — `cmdk` in a Radix `Dialog`, global **Ctrl+K /
   Cmd+K** bind + Escape close, styled to the system. Groups: "Navigation" (the
   nav destinations, selecting one routes there) and a disabled "Search — coming
   soon". A small `<CommandPaletteProvider>` mounted in the app layout.
5. **`/components` gallery** — route `apps/web/src/app/components/page.tsx`
   (put it OUTSIDE the `(app)` shell or inside, your call). Renders:
   - color swatches, each annotated with its **contrast ratio** vs its intended
     text/bg pair (compute at build/runtime — a tiny WCAG contrast fn is fine);
   - the spacing scale, the type scale (each level with sample text incl. a
     numeric sample in mono/tabular), radii + the chamfer treatment, motion
     (a button per duration/easing that triggers a sample transition);
   - every primitive, every variant, every state shown side by side;
   - `ConfidenceBadge` in all 4 states with tooltips;
   - the data-viz atoms with sample data.

### Must / must-not

- `pnpm --filter web build`, `pnpm --filter web typecheck`, and
  `pnpm --filter web dev` all clean (no console errors on `/` , `/components`,
  and one placeholder route).
- New deps ONLY: `tailwindcss` v4 (+ postcss/vite plugin), the Radix packages
  you actually use, `cmdk`, `lucide-react`. **No** shadcn, MUI, Chakra, a theme
  library, an icon set beyond lucide, or a charting library.
- No hardcoded `#hex` or raw `px` in `src/ui/` components — tokens only
  (`grep -rE '#[0-9a-fA-F]{3,6}' apps/web/src/ui` should hit only a token file).
- `prefers-reduced-motion: reduce` → transitions disabled/instant.
- Every text/surface pair used ≥ 4.5:1 (body) / ≥ 3:1 (large). Fix the token
  values if any fail; show the ratios on `/components`.
- Do not introduce the upstream project's name anywhere.
- Do not build product screens or wire real data.

### Report back

- The final token values (any you changed from the starting set, and why —
  esp. contrast fixes).
- The primitive list with their files.
- `pnpm --filter web build` + `typecheck` output.
- The `grep` result for hardcoded hex in `src/ui/`.
- A note on which `design-language.md` anti-patterns you specifically guarded
  against and how (shape language, borders, card usage, gradients).
- Anything ambiguous or that you think the user should decide.
- Do not commit.
