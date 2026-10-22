# `docs/` — Windscribe MV3 extension documentation

Human-facing documentation. For the agent-facing quick-reference see
[`../AGENTS.md`](../AGENTS.md). For onboarding / first-run see
[`../README.md`](../README.md).

---

## By topic

### Architecture

- [`architecture.md`](./architecture.md) — top-down tour of the four contexts
  (background SW, popup, offscreen, content scripts) and how they talk to each
  other.
- [`background-service-worker.md`](./background-service-worker.md) — all
  listeners registered in `src/pages/background/main.ts`, alarm cadence, and
  the lifecycle gotchas specific to MV3 service workers.
- [`offscreen-document.md`](./offscreen-document.md) — what the offscreen
  document is for, what messages it handles, and the Web Worker it uses for
  `checkIp`.

### State and data flow

- [`state-management.md`](./state-management.md) — Redux Toolkit setup,
  `webext-redux` bridge, aliases, middleware, root reducer, and how to add a
  slice.
- [`api.md`](./api.md) — every API endpoint, the 3-tier failover (primary →
  backup → DoH), client auth hash, and timeouts.

### Building and shipping

- [`build-system.md`](./build-system.md) — what `yarn build` actually does,
  webpack `entry` points, asset copying, manifest handling, and build-time
  code generation.
- [`content-scripts.md`](./content-scripts.md) — static vs generated content
  scripts, the four "warps", and how `chrome.scripting.registerContentScripts`
  is wrapped.
- [`proxy-and-pac.md`](./proxy-and-pac.md) — `chrome.proxy.settings.set`,
  the PAC script template, the allowlist, Cruise Control per-domain routing,
  and the 407 auth flow.

### Third-party / vendored

- [`ubo-lite-mirror.md`](./ubo-lite-mirror.md) — **read before touching the
  submodule.** Lists every Windscribe patch, what it does, why, and how to
  safely merge upstream.

### Quality

- [`testing.md`](./testing.md) — Mocha + Puppeteer e2e setup, how the CI
  container runs headful Chrome under Xvfb, test mocks.
- [`conventions.md`](./conventions.md) — TypeScript, naming, JSX, Redux,
  file-layout rules.
- [`styling.md`](./styling.md) — colour / space / font-size rules, and how
  to write Theme-UI vs Mantine components (we use Theme-UI — direction is
  Mantine, but not yet adopted).
- [`security.md`](./security.md) — the hardcoded client auth secret, the
  `.env` story, and security notes.

### Things that will bite you

- [`gotchas.md`](./gotchas.md) — every landmine in one place.

---

## Conventions for this folder

- Each file opens with a one-line summary and lists file paths in backticks so
  you can jump straight to code.
- Code snippets are kept short; the source of truth is always the code. If a
  doc disagrees with the code, **the code wins** — open a PR fixing the doc.
- Keep images / diagrams under `docs/assets/` if you add any.
