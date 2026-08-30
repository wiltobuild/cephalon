# Cephalon — Warframe Companion App

All-in-one Warframe command center: unified info + deterministic build/damage
calculations + player context + inventory/farming/relic/mastery planning +
market data + an AI assistant ("Ask Cephalon"). Built around **VoidForge**
(https://github.com/StepTwo33/VoidForge, AGPLv3) as a calculation/data
**engine** — not a fork-and-reskin.

This project follows the global defaults in `~/.claude/CLAUDE.md`.
Deviations / additions specific to this project:

- **Open-source now, possibly commercial later.** The calculation engine must
  sit behind a clean service boundary with zero UI/React coupling so it can
  be independently re-implemented (clean-room) if the product goes
  closed-source. Preserve all AGPL LICENSE / attribution / notice files from
  VoidForge.
- **The calculation engine is deterministic and authoritative. The AI
  assistant must never compute Warframe math** — it calls deterministic
  engine services and explains the results.
- **Surface calculation confidence** (Verified vs Approximation). Never
  present an approximation as verified.
- **Don't couple external APIs to UI.** UI → application services →
  (calc engine / player context / external data) → AI tools.
- **Extra approval gates (hard stops, recorded in
  `docs/agent/decisions.md`):**
  - Changing any calc formula away from VoidForge's behavior.
  - Bundling bulk Warframe game-data files into the repo.
- **Data is sensitive from day one.** No logging of player identifiers or
  account tokens; plan encryption at rest + least-privilege DB access before
  any account feature ships.
- No git remote yet — no pushes/PRs without the user adding a remote and
  approving.

New tasks: run `/start-task`. Operating docs live in `docs/agent/`
(`project-profile.md`, `workflow.md`, `roles/`, `decisions.md`). See
`docs/tasks/README.md` for the per-task artifact structure.
