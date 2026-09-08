# Shared visual system

The overview's dark green surfaces, warm gold actions, restrained borders and illustrated headers now extend through the workspace: Arsenal, Warframe/equipment directories, individual guides, weapon and Warframe editors, saved builds, reference pages, sidebar and dialogs.

- `apps/web/src/app/globals.css` owns the shared palette. Semantic status and mod-rarity colors remain independent.
- `apps/web/src/ui/page-masthead.tsx` provides compact contextual artwork headers for directories and supporting pages.
- `apps/web/src/ui/site-polish.css` provides shared workspace presentation, imported by the app shell. Weapon editor styles remain scoped in its CSS module.
- Long guide contents stick in the desktop column and return to normal flow on mobile. Guide prose, active anchors, cards, filters and search fields use the same visual hierarchy.
- Official campaign art and update scheduling remain configured in `content/overview-campaign.ts`; asset sources are recorded in `public/art/updates/README.md`.

Verification: production build/TypeScript; all 24 existing browser tests passed, covering every guide URL, navigation, countdown expiry, saved configurations, mod/arcane/shard editing and game slot placement. Visual review covered desktop Arsenal, directories, Volt's guide, weapon editor, saved builds and reference pages, plus mobile Arsenal and existing mobile editor checks. No calculation formulas changed.
