# Tasks

Each task run through `/start-task` gets its own directory here, named by a
short slug (e.g. `docs/tasks/upstream-engine-investigation/`).

This project's Documentation level is **Standard** (see
`docs/agent/project-profile.md`). Each task directory contains:

- `brief.md` — scope, out-of-scope, acceptance criteria, preflight state
- `investigation.md` — Argus findings (verified facts, inferences, unknowns,
  risks)
- `plan.md` — Athena's phased plan and every decision needing approval
  (skipped only for small, low-risk fixes per the workflow table)
- `review.md` — Themis's independent review of the implementation
- `verification.md` — Apollo's verification report (criterion → evidence)
- `final-report.md` — what changed, what was verified, what remains open

Small, low-risk fixes may skip `investigation.md`/`plan.md`/`review.md` per
the "Small, low-risk fix" row in `docs/agent/workflow.md`.

Two code paths always get the full treatment plus a dated sign-off entry in
`docs/agent/decisions.md`, regardless of task size:

- **Calc-formula changes** — altering a damage/scaling/interaction formula
  away from the upstream engine's behavior.
- **Game-data bundling** — committing bulk Warframe game data into the repo.

See `docs/agent/workflow.md` for the full task-type → workflow mapping and
the approval gates.
