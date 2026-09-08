# Verification — 2026-09-07

Implementation baseline: fa6b37f80f604856d2e2279ee8055e573c8f878f.

## Passed

- Production Next.js build, including TypeScript and route generation.
- Workspace typecheck: engine, services, web.
- Engine: 1,933 tests across 47 files; damage golden outputs unchanged.
- Services: 55 tests across 9 files, including deterministic optimizer, ownership/locks/capacity, compatibility and artwork ambiguity.
- Web: 8 unit tests, including malformed requests and non-finite TTK serialization.
- Chromium: 7 end-to-end tests against the production build: picker dismissal/search independence; mod calculation/remove/undo; simulation horizon; optimization and source-category legality; save/reopen; mobile navigation/results dock; faction undo/redo.
- Engine boundary, ambient catalog checks, formula-gate self-test.
- Manual browser review at desktop and 390px phone width. Real artwork loaded. Browser error log empty. Icon-only actions have accessible names.

One intermediate build overlapped a service pretest that regenerated engine declarations. Rebuilding after declaration generation completed passed. Build dependencies must run before dependent checks, as in CI.

## What this does not establish

These checks verify application behavior and preservation of the inherited model. They do not establish current-game mechanics accuracy or global optimization. Legacy enemy resistance/scaling, special weapon modes, full loadout optimization, accounts, and farming workflows remain outside this release. Search is bounded, deterministic, and labeled best found.

The local production preview uses port 3210. No production deployment, commit, or push was performed.
