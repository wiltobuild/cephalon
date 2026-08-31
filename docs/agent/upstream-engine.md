# Upstream engine — provenance & licensing (canonical internal record)

_This is the **only** internal doc that names the upstream project. Everywhere
else — architecture docs, task docs, code comments, commit messages — call it
"the upstream engine". This file exists because AGPL corresponding-source and
honest-provenance obligations require the facts to be recorded somewhere; it is
also the seed for `packages/engine/NOTICE` when the engine package is created._

Access: keep this file's contents out of anything user-facing (product UI,
marketing, public README, published docs).

## What it is

Cephalon's calculation engine is derived from an existing open-source Warframe
build-calculator project ("the upstream engine"). Cephalon reuses its
calculation code and game-data catalog as an engine and builds a new product
around it.

- Upstream repository: `https://github.com/StepTwo33/VoidForge`
  (the repo was previously named `FrameHub` / "Frame Hub"; the working tree
  still self-identifies as the former name in many strings).
- Pinned revision under investigation / to be vendored:
  `e66896a0fa83b7336baaa5614d9fb7c8a7d61e88`
  ("Merge branch 'dev' into main", 2026-07-25).
- Working clone on disk (gitignored, not committed): `vendor/upstream-engine/`.

## Licensing facts (not legal advice)

- `LICENSE` in the upstream tree = **GNU AGPL-3.0**, "Copyright (c) 2026
  StepTwo33 (Jason) and Frame Hub contributors", with the note "Previous
  versions were under MIT; new contributions and this license change apply
  going forward."
- `package.json` in the upstream tree still declares `"license": "MIT"` — a
  published, machine-readable contradiction with `LICENSE`. SBOM /
  `license-checker` tooling will report the code as MIT until upstream fixes
  this. **Cephalon treats the code as AGPL-3.0.**
- No CLA / copyright-assignment in the upstream `CONTRIBUTING.md`.
- No per-file license headers anywhere in the upstream `src/`.
- The calculation code and catalog are described in upstream code comments
  ("Advanced Build Calculator - ported from Dart …") as a port of an earlier
  **Dart** project whose license is **not stated**. The Dart project is almost
  certainly the same solo author's earlier work (see history below) but that is
  not provable from this repo.

### History (recovered — corrects an earlier assumption)

The `vendor/upstream-engine/` clone is `--depth 1`, which is why the history
first looked unrecoverable. A **full-history reference clone** now lives outside
the monorepo (`../_upstream-engine-reference/`, see `docs/agent/upstream-sync.md`).
It has **438 commits, 2026-02-15 → 2026-07-25**:

- **Single copyright holder.** Every commit is `jasonwelch903@gmail.com` under
  four author aliases (`StepTwo33`, `StepBroPrime`, `StepTwo`, `Jason`). **No
  third-party contributors.** So the missing CLA is moot (one rights holder),
  and there are no post-relicense outside contributions to worry about.
- **MIT → AGPL-3.0 switch: commit `ffd82e9`, 2026-07-16** (LICENSE file only).
  Last MIT-licensed commit: `1878619`, 2026-07-13. README updated for the
  switch in `3d7e48c`.
- **`package.json "license": "MIT"`** was simply never updated in `ffd82e9`;
  confirmed a stale field, **not** a deliberate dual grant. SBOM /
  `license-checker` will still report the code as MIT. **Cephalon treats it as
  AGPL-3.0.**
- **FrameHub → Voidforge rename: commit `1f4e3a3`, 2026-08-01** (after our
  pinned rev).
- **The calculation engine has no MIT-era version in this repo.** `src/lib/calc/`
  was assembled/reorganised after the switch (`5a2a07d`, 2026-07-18 "Move
  calculation modules into src/lib/calc"); our pinned rev `e66896a` (2026-07-25)
  is post-switch. The calc code Cephalon uses has only ever been AGPL here.
- **Part of the catalog does have an MIT-era version.** ~48 `src/data/**` files
  existed at the last MIT commit `1878619` (first data added 2026-02-21). Those
  files *as they were on 2026-07-13* were distributed under MIT; the current
  `src/data/**` has had heavy post-switch work.
- The upstream maintainer's email is visible and was active through late July
  2026. **Per user decision (2026-08-30) no outreach track is planned** — but
  "unreachable" is a project choice here, not a fact.

## Consequences for Cephalon

- **AGPL-3.0 applies to the whole Cephalon service** for as long as any of this
  code runs in it (AGPL §13 network-copyleft): the complete corresponding
  source of the combined work must be offered to users under AGPL-3.0 while the
  project is open-source.
- **A closed-source / commercial pivot is still not a clean step**, but the
  recovered history narrows it: there is **one identifiable copyright holder**
  (no third-party contributors, no CLA needed), so a commercial / dual license
  would be clean to obtain *if the maintainer were engaged* — which the project
  has chosen not to pursue. The residual unknown is the **Dart-origin project's
  license** (probably self, unverified). Absent that, the pivot route is
  removal/rewrite of the AGPL portions (the clean-room track). The calc engine
  has **no MIT-era version** to fall back to; ~48 catalog files do (2026-07-13
  snapshot) but have had heavy post-switch work.
- Therefore the engine is kept behind a hard package boundary (`packages/engine`)
  so a future clean-room re-implementation is a package swap, and the
  golden-baseline corpus (see the architecture doc) is built to double as that
  rewrite's spec + acceptance oracle.
- **A qualified open-source licensing professional must review before any
  commercial or closed-source pivot.** This record documents the risks; it does
  not clear them.

## Attribution that must be preserved while the code is used

- The upstream `LICENSE` (AGPL-3.0), verbatim, at `packages/engine/` and repo
  root.
- A `packages/engine/NOTICE` seeded from this file: upstream repo URL, pinned
  rev, the prior project name, the MIT→AGPL history note, the unstated
  Dart-origin license, and the DE fan-content disclaimer.
- The Digital Extremes fan-project disclaimer (game names, stats, and assets
  are DE's; used under community fan-site convention).
