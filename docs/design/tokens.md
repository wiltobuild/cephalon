# Design tokens

The token source of truth is `apps/web/src/app/globals.css`. Components only consume these custom properties.

Resolved values: surfaces `#0a0b0d`, `#101216`, `#171a1f`, `#1f232a`, `#0c0d10`, `rgba(6,7,9,.72)`; text `#e9eaec`, `#aeb4bb`, `#7e858d`, `#596069`; accent `#46a9b7`, `#57c1d0`, `#46a9b733`, `#04191c`, `#cf9b47`, `#e0ac57`; semantics `#5bb47b`, `#d75c52`, `#d9a441`, `#5b93c4` (with the matching `22` alpha backgrounds, `66` alpha borders, and readable semantic-text derivatives defined in CSS); lines `#24272d`, `#333840`. Spacing is `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px`; radii are `0, 2, 4px`; type is Saira Condensed / Inter / JetBrains Mono with the scale encoded in the `--text-*` shorthand tokens; durations are `120ms`, `180ms`, `240ms`; easing is `cubic-bezier(.2,0,0,1)`.

| Group | Tokens | Intended use |
|---|---|---|
| Surfaces | `--bg`, `--surface-1`, `--surface-2`, `--surface-3`, `--surface-inset`, `--overlay` | Layered dark application surfaces and overlays |
| Text | `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-disabled` | Primary UI/body, supporting UI, metadata only, disabled |
| Accent | `--accent`, `--accent-hover`, `--accent-muted`, `--accent-contrast`, `--accent-2`, `--accent-2-hover` | Restrained selection/actions; rare important moments only |
| Semantics | `--positive`, `--negative`, `--warning`, `--info`, `--rare`, `--legendary`, `--selected` plus `-bg`, `-border`, `-text` | Meaning and confidence only |
| Lines/elevation | `--line`, `--line-strong`, `--border-subtle`, `--shadow-1`, `--shadow-2` | Separators/insets before shadows |
| Spacing | `--space-0`, `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-6`, `--space-8`, `--space-10`, `--space-12`, `--space-16` | Four-pixel based layout rhythm |
| Shape | `--radius-none`, `--radius-sm`, `--radius-md`, `--chamfer` | Restrained corners and deliberately clipped states/panel headers |
| Type | `--font-display`, `--font-body`, `--font-mono`, `--text-display-lg`, `--text-display-md`, `--text-display-sm`, `--text-title`, `--text-label`, `--text-body`, `--text-caption`, `--text-mono` | Condensed headings, readable UI, tabular numbers |
| Motion/z | `--dur-fast`, `--dur-base`, `--dur-slow`, `--ease-standard`, `--z-sidebar`, `--z-header`, `--z-drawer`, `--z-dialog`, `--z-palette`, `--z-tooltip` | Quick non-spring transitions and named layers |

The gallery at `/components` displays resolved starting color values and intended-pair contrast ratios. `--text-secondary` was raised from `#a2a8af` to `#aeb4bb`, and `--text-tertiary` from `#6d737b` to `#7e858d`, to preserve legibility on the darkest surfaces; tertiary remains metadata-only.
