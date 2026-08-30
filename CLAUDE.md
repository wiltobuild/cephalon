# Cephalon — Warframe Companion App

All-in-one Warframe command center: unified info + deterministic build/damage
calculations + player context + inventory/farming/relic/mastery planning +
market data + an AI assistant ("Ask Cephalon"). Built around an existing
open-source **upstream engine** (AGPL-3.0) used as a calculation/data engine —
not a fork-and-reskin. Provenance and licensing facts: `docs/agent/upstream-engine.md`
(the only internal doc that names it; everywhere else it is "the upstream
engine").

This project follows the global defaults in `~/.claude/CLAUDE.md`.
Deviations / additions specific to this project:

- **AGPL-3.0 applies to the whole service.** Open-source now. A closed-source /
  commercial pivot is not a clean step from this base (lost history,
  unreachable maintainer, unstated Dart-origin license) — it needs a
  licensing-professional review and most likely the clean-room engine track.
  The engine is kept behind a hard `packages/engine` boundary so a rewrite is a
  package swap.
- **Keep the upstream name out of anything user-facing** (product UI,
  marketing, public README, published docs). Keep only the legally required
  `LICENSE` + `NOTICE` in `packages/engine`. Internal docs say "the upstream
  engine".
- **The calculation engine is deterministic and authoritative. The AI
  assistant must never compute Warframe math** — it calls deterministic engine
  services and explains the results.
- **Surface calculation confidence** (Verified / Approximation / Not-modeled).
  "Verified" = deterministic formula, covered by the ported regression suite,
  wiki-cited source — NOT independently confirmed against the live game. Never
  present an approximation as verified.
- **Don't couple external APIs to UI.** UI → application services →
  (calc engine / player context / external data) → AI tools.
- **Extra approval gates (hard stops, recorded in
  `docs/agent/decisions.md`):**
  - Changing any calc formula away from the upstream engine's behavior.
  - Bundling bulk Warframe game-data files into the repo.
- **Data is sensitive from day one.** No logging of player identifiers or
  account tokens; plan encryption at rest + least-privilege DB access before
  any account feature ships.
- No git remote yet — no pushes/PRs without the user adding a remote and
  approving.

New tasks: run `/start-task`. Operating docs live in `docs/agent/`
(`project-profile.md`, `workflow.md`, `upstream-engine.md`, `roles/`,
`decisions.md`). See `docs/tasks/README.md` for the per-task artifact structure.
