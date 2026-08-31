# Verification — task 12 design-system foundation

Verifier: coordinator. `apps/web` run locally (dev + prod build), inspected in a
real browser. Commits `be8f787` (brief) → `ba66127` (foundation + font fix) →
`124e16d` (Radix/cmdk/lucide swap + gallery polish).

## Acceptance criteria

1. **`pnpm --filter web build` / `typecheck` / `dev`** — ✅ all pass (fresh
   build: "Compiled successfully", 4 routes, TypeScript clean). Note: the dev
   server needs a restart after Codex's mid-run file rewrites — a stale HMR
   session served 500s; a clean `preview_start` renders fine.
2. **`/components` gallery renders every token + primitive** — ✅ Colour &
   contrast (with ratios), Scale (spacing/type/corners), Motion, Actions &
   fields, Information primitives (Stat + delta + ConfidenceBadge, Card),
   Badges (semantic + rarity + all 4 confidence states), Controls & disclosure
   (SegmentedControl, Tabs, Tooltip, Dialog), Dense table + Sparkline / MiniBar
   / RadialMeter. All present.
3. **WCAG AA contrast** — ✅ every pair shown on the gallery passes: text on
   bg/surface 13.1–16.4:1; accent-contrast on accent 6.56:1; semantic on bg
   5.2–8.8:1. No tiny gray-on-black (tertiary text is metadata-only by token
   definition). Codex raised `--text-secondary`/`--text-tertiary` slightly for
   dark-surface legibility.
4. **Keyboard** — ✅ Ctrl/Cmd+K opens the cmdk palette (verified: type "riven"
   → filters to "Riven Analyzer"); Esc closes; visible teal focus ring on
   focusable elements; Radix now backs Tabs/Dialog/Tooltip (roving tabindex,
   focus trap, scroll lock, focus restore); SegmentedControl is a keyboard
   radiogroup.
5. **`prefers-reduced-motion`** — ✅ global reduce block zeroes animation
   durations; drawer slide-in guarded by `@media (prefers-reduced-motion: no-preference)`.
6. **No hardcoded hex/px in components** — ✅ `grep -rE '#[0-9a-fA-F]{3,6}'
   apps/web/src/ui` hits only the token file.
7. **`ConfidenceBadge`** — ✅ takes exactly
   `verified | approximation | not-modeled | pending-verification`, exported
   from `@/ui`, small, semantic-coloured, with a per-tag tooltip. Stable for
   tasks 13–16.
8. **Embodies `design-language.md`** — ✅ dark layered surfaces, one restrained
   teal accent (+ amber secondary), semantic colour only, condensed Saira
   display + Inter body + JetBrains tabular numerics, inset panels with thin
   separators + a chamfer treatment, line work over boxed borders, genuinely
   compact grouped sidebar, thin top bar, no gradients/glass/hero/pill
   buttons/decorative blobs. Reads as a tactical command center, not AI SaaS.
9. **Deps** — ✅ only `tailwindcss` v4 + `@tailwindcss/postcss`,
   `@radix-ui/react-{dialog,tabs,tooltip}`, `cmdk`, `lucide-react`. No
   component/theme library.
10. **No upstream project name** — ✅ (grep clean).

## Coordinator fix applied

- **Font wiring was broken** — `@theme` had self-referential
  `--font-display: var(--font-display)` etc. → empty → the `font:` shorthand
  went invalid → **Times New Roman fallback** everywhere. Fixed: `@theme` now
  composes the real `--font-saira/inter/jetbrains` next/font vars; next/font
  `variable` classes moved to `<html>`. Verified Saira/Inter/JetBrains now load.

## Known polish (not blocking the direction review; fold into task 13 or a follow-up)

- `/components` colour-swatch and badge panels render **airy** (a swatch panel
  is ~148px for ~40px of content; badges stack full-width in their grid cell).
  Gallery layout only — the primitives themselves are correctly sized.
- **Child nav items share one icon** (`Swords`-ish) — parents have distinct
  lucide icons; children should get distinct icons or a subtle dot.
- `LEGENDARY` badge fill is a touch heavy vs the "subtle" bar intent.
- cmdk palette rows are a little tall for a power tool; could tighten.

## Files

`apps/web/src/app/{layout.tsx, globals.css, page.tsx, (app)/layout.tsx,
(app)/[...slug]/page.tsx, components/page.tsx}`,
`apps/web/src/ui/{index.tsx, ui.css, shell/{app-shell.tsx, navigation.ts,
shell.css}}`, `apps/web/{next.config.ts, postcss.config.mjs, package.json}`,
`docs/design/tokens.md`.
