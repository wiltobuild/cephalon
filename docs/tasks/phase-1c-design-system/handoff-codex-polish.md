# Codex handoff — task 12 polish (approved direction; small fixes only)

The design direction is approved. Four small fixes in `apps/web`, no system
restyle. Deps are installed; dev server may need a restart after. Do not commit.

Run from repo root:
```
codex.cmd exec --skip-git-repo-check -s workspace-write -C "C:\Users\Wil\Documents\Projects\Cephalon" "<prompt>" < /dev/null
```

## Prompt

Task: four polish fixes to the Cephalon design-system foundation in `apps/web`.
Keep the tokens, `ui.css` styling, and shell layout. Read
`docs/design/design-language.md` for the bar (compact, premium, dense).

### 1. `/components` gallery — tighten the airy panels

In `apps/web/src/app/components/page.tsx` (+ its scoped CSS):
- The **colour-swatch panels** render ~148px tall for ~40px of content. Drop
  the per-swatch `<Panel>` wrapper (or make it a plain bordered cell): a swatch
  = a ~40px colour block + the hex (mono) + the contrast ratio (caption),
  ~72px total. Keep the grid, tighten `gap` to `--space-3`.
- The **Badges** and **ConfidenceBadge** demos currently stack full-width in
  their grid cell. Put them in a `display:flex; flex-wrap:wrap; gap:var(--space-2)`
  row so badges sit inline at their natural width.
- Sweep the page for any other section with a stretched grid row / oversized
  panel and constrain it. The gallery should read as tight continuous
  sections.

### 2. Distinct nav icons for child items

`apps/web/src/ui/shell/navigation.ts` — child items currently reuse one icon.
Give each a distinct `lucide-react` icon (import per item). Suggested:
- Arsenal → Warframes `PersonStanding`, Weapons `Crosshair`, Companions `Bot`,
  Operator `Drama`
- Builds → My Builds `Bookmark`, Loadouts `LayoutGrid`, Compare `GitCompareArrows`
- Farm → Relics `Gem`, Resources `Boxes`, Prime Parts `Component`, Mastery `Award`
- Tools → Damage Calculator `Calculator`, Enemy Simulator `Target`,
  Riven Analyzer `ScrollText`
Keep them 16px, `stroke-width` ~1.75, `currentColor`. Parents keep their
current icons.

### 3. `LEGENDARY` badge — lighten

`Badge` variant `legendary` currently renders a heavy solid amber fill. Make it
match the other rarity/semantic badges: low-alpha `--legendary` background
(`--warning-bg`-style ~13% alpha), `--accent-2-hover` (or a light gold) text,
`inset 0 0 0 1px` low-alpha border. Subtle, not a bar. Same for `rare` if it
looks heavy.

### 4. cmdk palette rows — tighten

In `app-shell.tsx` / `.palette*` CSS: reduce `Command.Item` vertical padding to
`--space-2` (rows ~28–30px), keep the selected-row style. Palette should feel
like a fast power-tool list, not a spacious menu. Also cap the palette height
(`max-height: min(60dvh, 420px)`) with an internal scroll.

### Verify + report
- `pnpm --filter web build` + `typecheck` pass.
- `pnpm --filter web dev` (restart it): `/components`, `/home`, one placeholder
  route render clean; Ctrl+K palette still works.
- `grep -rE '#[0-9a-fA-F]{3,6}' apps/web/src/ui` still only the token file.
- Report the files touched and confirm no token/primitive API changed.
- Do not commit.
