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
- The calculation code and catalog are described in upstream code comments as a
  port of an earlier **Dart** project whose license is **not stated**.
- The upstream clone available to us is a **single squashed commit** — the
  MIT→AGPL change date, the project-rename date, and which lines predate the
  relicense are **not recoverable**. The upstream maintainer is treated as
  **not reachable**; no outreach track is planned.

## Consequences for Cephalon

- **AGPL-3.0 applies to the whole Cephalon service** for as long as any of this
  code runs in it (AGPL §13 network-copyleft): the complete corresponding
  source of the combined work must be offered to users under AGPL-3.0 while the
  project is open-source.
- **A closed-source / commercial pivot is not a clean step** from this base. It
  would require either a commercial grant from every rights holder (maintainer
  + the unidentified Dart-origin author + any post-relicense contributors) —
  not obtainable given the maintainer is unreachable and history is lost — or
  removal/rewrite of the AGPL portions (the clean-room track).
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
