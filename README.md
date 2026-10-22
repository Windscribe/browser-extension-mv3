# Windscribe Browser Extension (Manifest V3)

Chrome/Edge extension that exposes the Windscribe VPN as an HTTPS proxy, plus
privacy tools (split personality, anti-fingerprinting, language / location /
timezone warps) and uBlock Origin Lite as a built-in ad /
tracker blocker.

Current version: see [`package.json`](./package.json) and
[`src/manifest.json`](./src/manifest.json).

---

## Prerequisites

| Tool                 | Version                   | Notes                                                 |
| -------------------- | ------------------------- | ----------------------------------------------------- |
| Node.js              | 22+ (LTS)                 | Older `README` said 14; that is out of date.          |
| Yarn (classic)       | 1.22+                     | `npm` is not used — the lockfile is `yarn.lock`.      |
| Git                  | any recent                | Needed for submodules.                                |
| Chrome / Edge        | 122+                      | `minimum_chrome_version` in the manifest.             |
| Git access           | HTTPS or SSH              | Needed to fetch the `ubo-lite-mirror` submodule.      |
| A Windscribe account | any tier                  | Needed as the **build user** (see `.env` below).      |

---

## First-time setup (zero to running dev build)

```bash
# 1. Clone with submodules
git clone --recurse-submodules https://github.com/Windscribe/browser-extension-mv3.git
cd browser-extension-mv3

# 2. Install deps
yarn install

# 3. Create .env (not tracked; see "Environment" below for the fields)
#    Add BUILD_USER_NAME / BUILD_USER_PASSWORD.

# 4. Build (production bundle)
yarn build
```

If you forgot `--recurse-submodules`, run:

```bash
git submodule update --init --recursive
```

---

## Loading the extension into Chrome / Edge

1. Go to `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the `build/` folder produced by `yarn build`.

You'll see a Windscribe icon in the toolbar. Click it to open the popup.

---

## Environment (`.env`)

The build script logs into the Windscribe API at build time to fetch the server
list (used for the location / language / timezone warps). The user-agent list
(used for split personality) is read from the checked-in `useragents.txt`.
Those fields are required:

```dotenv
REACT_APP_REDUX_PORT=WS_BROWSER_EXTENSION_STORE
BROWSER=Chrome
API_URL=windscribe.com
BACKUP_API_URL=totallyacdn.com
NODE_ENV=production

# Build credentials — any Windscribe account works
BUILD_USER_NAME=
BUILD_USER_PASSWORD=

# Only needed for running e2e tests
TEST_USER_NAME=
TEST_USER_PASSWORD=
```

For staging / QA, swap `API_URL=staging.windscribe.com`. This changes the
API host the built extension calls at runtime (`api.staging.windscribe.com`).
The build-time login and server-list fetch always use production
`api.windscribe.com` (`scripts/buildUtils/api/getBaseApiUrl.js`), so
`BUILD_USER_*` must be a production account. See
[`docs/api.md`](./docs/api.md) for the failover logic.

---

## Common commands

| Command                   | What it does                                                             |
| ------------------------- | ------------------------------------------------------------------------ |
| `yarn build`              | Production build → `build/`. Runs `scripts/build.js` (see below).        |
| `yarn start`              | Dev server with file watching (`scripts/webserver.js`).                  |
| `yarn lint`               | ESLint over `src/`.                                                      |
| `yarn test`               | Mocha + Puppeteer e2e suite (`tests/e2e/tests.ts`).                      |
| `yarn test:local`         | Same. It sets `DOTENV_CONFIG_PATH`, but the suite still reads `.env`.    |
| `yarn typecheck:tests`    | Type-check the e2e tests (`tests/tsconfig.json`). CI runs it.            |
| `yarn prettier`           | Format everything.                                                       |
| `yarn slice`              | Scaffold a new Redux slice and add it to `src/state/store.ts`.           |
| `yarn clear-cache`        | Delete `.ws-build-cache` (build-time session and server list).           |

What `yarn build` actually does:

1. Loads `.env`.
2. Logs into the Windscribe API using `BUILD_USER_*` credentials.
3. Reads `useragents.txt` and fetches the server list (after login).
4. Generates per-server content scripts for location / language / timezone warps
   and per-UA content scripts for split personality, adds them to the in-memory
   webpack `config.entry` object, and writes `src/state/slices/userAgent.ts`
   with `fs.writeFileSync`.
5. Runs webpack.
6. Runs validators that log a `console.error` if a generated script is missing
   from `build/` or embedded wrong. They do not fail the build.

Full walkthrough: [`docs/build-system.md`](./docs/build-system.md).

---

## Project layout (top level)

```
.
├── src/                 # All extension source
│   ├── api/             # API clients, types, failover
│   ├── assets/          # Icons, fonts, images
│   ├── components/      # Shared UI components
│   ├── migrations/      # MV2 → MV3 state migrations
│   ├── pages/           # Entry points: background, popup, debugLog, contentScripts
│   ├── services/        # Cross-cutting services (proxy, offscreen, storage, …)
│   ├── state/           # Redux Toolkit store + 56 slice files (55 wired into the store) + aliases
│   ├── styles/          # Theme-UI theme, global CSS
│   ├── utils/           # Constants, helpers
│   ├── views/           # Popup screens (Login, Home, Locations, …)
│   ├── manifest.json    # Source of truth for the extension manifest
│   └── backgroundScripts.js  # Service-worker entry (loads background + ubo-lite)
├── scripts/             # Build-time scripts (login, getUa, getLocations, embed*…)
├── tests/               # Mocha + Puppeteer e2e
├── ubo-lite-mirror/     # Git submodule — uBlock Origin Lite, with patches (!)
├── webpack.config.js
└── package.json
```

---

## Documentation index

Detailed docs live in [`docs/`](./docs/). Start with the index:
[`docs/README.md`](./docs/README.md).

| Topic                        | File                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| Docs index                   | [`docs/README.md`](./docs/README.md)                                 |
| High-level architecture      | [`docs/architecture.md`](./docs/architecture.md)                     |
| Redux + `webext-redux`       | [`docs/state-management.md`](./docs/state-management.md)             |
| Build system                 | [`docs/build-system.md`](./docs/build-system.md)                     |
| Content scripts              | [`docs/content-scripts.md`](./docs/content-scripts.md)               |
| Background service worker    | [`docs/background-service-worker.md`](./docs/background-service-worker.md) |
| Proxy + PAC script           | [`docs/proxy-and-pac.md`](./docs/proxy-and-pac.md)                   |
| API                          | [`docs/api.md`](./docs/api.md)                                       |
| Offscreen document           | [`docs/offscreen-document.md`](./docs/offscreen-document.md)         |
| **ubo-lite-mirror patches**  | [`docs/ubo-lite-mirror.md`](./docs/ubo-lite-mirror.md)               |
| Testing                      | [`docs/testing.md`](./docs/testing.md)                               |
| Styling (Theme-UI → Mantine) | [`docs/styling.md`](./docs/styling.md)                               |
| Code conventions             | [`docs/conventions.md`](./docs/conventions.md)                       |
| Security                     | [`docs/security.md`](./docs/security.md)                             |
| Gotchas / landmines          | [`docs/gotchas.md`](./docs/gotchas.md)                               |
| Agent instructions           | [`AGENTS.md`](./AGENTS.md)                                           |

---

## Packing for the Chrome Web Store

```bash
NODE_ENV=production yarn build
```

The contents of `build/` are what gets uploaded. See
[`docs/build-system.md`](./docs/build-system.md#packaging) for notes on
versioning and CWS review gotchas.

---

## Resources

- [Chrome Extensions MV3 docs](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [declarativeNetRequest](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/)
- [webext-redux (fork we use)](https://github.com/eduardoacskimlinks/webext-redux)
- Internal: Notion workspace → **Web Team → Extension MV3**
