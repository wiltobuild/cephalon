# Codex handoff — task 12 fix pass (Radix/cmdk swap + polish)

Deps are now installed (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`,
`@radix-ui/react-tooltip`, `cmdk`, `lucide-react` all resolve). The foundation
from the first pass is committed (`ba66127`); the token layer, fonts, shell
layout, and the `/components` gallery structure are good — **keep them**. Fix
these four things only. Do not restyle the visual system.

Run from repo root:
```
codex.cmd exec --skip-git-repo-check -s workspace-write -C "C:\Users\Wil\Documents\Projects\Cephalon" "<prompt>" < /dev/null
```

## Prompt

Task: fix pass on the Cephalon design-system foundation in `apps/web`. Four
fixes, nothing else. Read `docs/design/design-language.md` and
`docs/tasks/phase-1c-design-system/brief.md` for the bar. Keep the existing
tokens (`apps/web/src/app/globals.css`), the `src/ui/ui.css` visual styling,
and the shell layout. Do NOT commit.

### 1. Swap hand-rolled overlays/disclosure for Radix

In `apps/web/src/ui/index.tsx` (+ `ui.css` as needed), replace the hand-rolled
implementations with Radix primitives, styled with the SAME token-based CSS
classes already there (so they look identical):
- `Tooltip` → `@radix-ui/react-tooltip` (`Provider` mounted once in the app
  layout; `Root`/`Trigger`/`Portal`/`Content`). Keep the `.tooltip__content`
  visual style. Add `sideOffset`, collision handling is automatic.
- `Tabs` → `@radix-ui/react-tabs` (`Root`/`List`/`Trigger`/`Content`), styled
  as the current underline-marker tabs (`.tabs` / `.tab` classes, active =
  `[data-state=active]`). Roving tabindex + arrow keys come from Radix.
- `Dialog` and `Drawer` → `@radix-ui/react-dialog`
  (`Root`/`Trigger`/`Portal`/`Overlay`/`Content`/`Title`/`Close`). `Drawer` =
  the same Dialog with a right-side content class + a slide-in transition
  (respect `prefers-reduced-motion`). Focus trap, scroll lock, Esc, and focus
  restore now come from Radix. Keep `.overlay` / `.dialog` visual styling; add a
  `.drawer` class for the right-anchored variant.
- `SegmentedControl` → make it a real
  `role="radiogroup"` with arrow-key navigation between options and
  `aria-checked` (or use `@radix-ui/react-toggle-group` `type="single"`). Keep
  the `.segmented` / `.segment` styling and the accent underline on the
  selected segment.

### 2. Command palette → cmdk

`apps/web/src/ui/shell/app-shell.tsx` — replace the hand-rolled `CommandPalette`
with `cmdk` (`Command`, `Command.Input`, `Command.List`, `Command.Group`,
`Command.Item`, `Command.Empty`) inside a Radix `Dialog`. Keep the Ctrl+K /
Cmd+K global bind and Escape-to-close. Groups: "Navigation" (the
`flattenedNavigation` items — selecting routes there) and a disabled
"Search — coming soon". Keep the current `.palette*` visual styling; wire
cmdk's `[cmdk-item][data-selected]` to the selected style. Arrow-key list
navigation + type-to-filter now come from cmdk.

### 3. Nav + topbar icons → lucide-react

`apps/web/src/ui/shell/navigation.ts` (or wherever the nav tree lives) — replace
the unicode `mark` glyphs with `lucide-react` icons (import per item, e.g.
`Home`, `Swords`/`Crosshair`, `Boxes`, `Sprout`, `Store`, `BookOpen`,
`Wrench`/`SlidersHorizontal`, `Sparkles`). Render them at a consistent small
size (16px, `stroke-width` ~1.75, `currentColor`). Same for the topbar
placeholder buttons (notifications → `Bell`, account → `CircleUser`, world
state → `Globe` or `Activity`, collapse toggle → `PanelLeftClose` /
`PanelLeftOpen`). The brand mark can stay a glyph or become a small lucide
icon — your call, keep it restrained.

### 4. `/components` gallery vertical-gap bug

`apps/web/src/app/components/page.tsx` (+ its CSS) has large empty vertical
gaps between sections (e.g. between the color-swatch grid and "SCALE", and
elsewhere). Diagnose and fix — likely a swatch panel / grid row with an
oversized `min-height` or a viz element (`Sparkline` SVG / `RadialMeter`) with
an unconstrained height stretching its grid row. Constrain the offending
elements; the gallery should read as tight, continuous sections with normal
`--space-*` rhythm. Every section and primitive must still be present and
visible.

### Verify + report

- `pnpm --filter web build` and `pnpm --filter web typecheck` pass.
- `pnpm --filter web dev` (port 3210): `/`, `/home`, `/components` render with
  no console errors; Ctrl+K opens the cmdk palette; Tab reaches everything with
  a visible focus ring; Esc closes the palette/dialog; arrow keys move within
  `SegmentedControl` / `Tabs` / the palette list.
- `grep -rE '#[0-9a-fA-F]{3,6}' apps/web/src/ui` still only hits a token file.
- Report: the Radix/cmdk component list + files touched; confirmation the
  visual styling is unchanged; the gallery-gap root cause + fix; any Radix
  styling seam that needed a new class.
- Do not commit.
