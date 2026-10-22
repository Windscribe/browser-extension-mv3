# AGENTS.md — instructions for AI coding agents working on this repo

This file is for AI agents (Cursor, Claude Code, etc.). Humans should start at
[`README.md`](./README.md) instead.

**Read this whole file first, then read whichever documents in `docs/` are
relevant to your task before writing code.** Every section below points at
the specific files you need.

---

## What this repo is

A Chrome / Edge **Manifest V3** extension that provides:

- An HTTPS proxy to the Windscribe VPN network (via `chrome.proxy.settings.set`
  with a generated PAC script).
- Privacy tools (split personality, anti-fingerprinting, language / location /
  timezone warps).
- **uBlock Origin Lite**, vendored as a git submodule (`ubo-lite-mirror/`)
  with Windscribe-specific patches.

Stack: TypeScript + React 18.2 + Redux Toolkit + webpack 5 + Mocha + Puppeteer.
`react-dom` is aliased to `@hot-loader/react-dom` 17 in webpack, and the
popup uses the legacy `render` API from `react-dom`.
Cross-context state sync is done with
[`@eduardoac-skimlinks/webext-redux`](https://github.com/eduardoacskimlinks/webext-redux).

---

## Complete file map

### Top-level files you'll use constantly

| File                                           | Purpose                                                      |
| ---------------------------------------------- | ------------------------------------------------------------ |
| `README.md`                                    | Human onboarding. Prereqs, `.env`, `yarn build`, load unpacked. |
| `AGENTS.md`                                    | This file.                                                   |
| `package.json`                                 | Deps, scripts (`build`, `start`, `test`, `typecheck:tests`, `lint`, `slice`). |
| `webpack.config.js`                            | Every entry point, asset copying, HtmlWebpackPlugin, DefinePlugin. |
| `src/manifest.json`                            | **The** manifest (not `build/manifest.json` — that's generated). |
| `src/backgroundScripts.js`                     | Service-worker entry; imports background bundle + uBOL bundle. |
| `.gitlab-ci.yml`                               | CI pipeline (install / lint / test / build).                 |
| `Dockerfile`                                   | CI image: node:22 + google-chrome-stable + firefox-esr + geckodriver + Xvfb. |
| `.gitmodules`                                  | Declares the `ubo-lite-mirror` submodule.                    |
| `.husky/pre-commit`                            | Runs `yarn lint` before every commit.                        |

### Source directories

| Path                                 | What lives here                                                       |
| ------------------------------------ | --------------------------------------------------------------------- |
| `src/api/`                           | Windscribe API calls: `endpoints.ts`, `sendRequest.ts`, `types.ts`, `utils.ts`. The IP checks and `scriptController.ts` call `fetch` directly. |
| `src/state/`                         | Redux store, 56 slice files (55 wired into the store: `proxyErrorChecking.ts` is fully commented-out historical code, not a real slice), aliases, middleware, typed hooks.             |
| `src/pages/background/`              | Service worker: `main.ts` + `eventHandlers/`.                         |
| `src/pages/popup/`                   | React popup entry.                                                    |
| `src/pages/debugLog/`                | Debug log UI (opened via right-click context menu).                   |
| `src/pages/contentScripts/`          | Static content scripts + generator output folders.                    |
| `src/pages/contentScripts/splitPersonality/` | **Generated** — do not hand-edit.                             |
| `src/pages/contentScripts/locationWarp/`     | **Generated** — do not hand-edit.                             |
| `src/pages/contentScripts/languageWarp/`     | **Generated** — do not hand-edit.                             |
| `src/pages/contentScripts/timeZoneWarp/`     | **Generated** — do not hand-edit.                             |
| `src/services/`                      | Cross-cutting: `proxyConfig/`, `offscreenActions/`, `debugLog/`, etc. |
| `src/views/`                         | Popup screens (Login, Home, Locations, Allowlist, …).                 |
| `src/components/`                    | Shared UI components.                                                 |
| `src/utils/`                         | `constants.ts`, `scriptController.ts`, helpers.                       |
| `src/migrations/`                    | MV2 → MV3 storage migration.                                          |
| `scripts/`                           | Build-time scripts (login, getUa, getLocations, embed*.js, validators). |
| `scripts/buildUtils/templates/`      | Source templates for the warp generators.                             |
| `scripts/buildUtils/outputValidators/` | Post-webpack checks. A missing bundle is logged; it does not fail the build. |
| `tests/e2e/`                         | Mocha + Puppeteer scenarios (TypeScript, loaded via tsx; type-checked by `tests/tsconfig.json`). |
| `tests/responsesMocks/`              | Large fixtures (e.g. `locationsMock.ts`).                             |
| `ubo-lite-mirror/`                   | **Submodule.** uBlock Origin Lite with Windscribe patches.            |

### The full `docs/` folder — what to read when

Read `AGENTS.md` (this file) first. Then pick the doc that matches your task.

| Doc                                                            | Read it when…                                                                                                  |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`docs/README.md`](./docs/README.md)                           | You want the docs index with more context than this table.                                                     |
| [`docs/architecture.md`](./docs/architecture.md)               | You want the big picture — how the 4 contexts (SW / popup / offscreen / content scripts) talk.                 |
| [`docs/state-management.md`](./docs/state-management.md)       | You touch Redux, slices, aliases, middleware, or `webext-redux`.                                               |
| [`docs/background-service-worker.md`](./docs/background-service-worker.md) | You register an event listener, or debug anything about SW lifecycle.                            |
| [`docs/proxy-and-pac.md`](./docs/proxy-and-pac.md)             | You touch `chrome.proxy.settings.set`, the PAC script, Cruise Control, or the 407 auth handler.                |
| [`docs/api.md`](./docs/api.md)                                 | You add or change an API endpoint; you debug API failover / `workingApi`.                                      |
| [`docs/offscreen-document.md`](./docs/offscreen-document.md)   | You send `{ target: 'offscreen' }` messages, or add an offscreen handler.                                      |
| [`docs/content-scripts.md`](./docs/content-scripts.md)         | You add, modify, or debug any content script — static or generated warp.                                       |
| [`docs/build-system.md`](./docs/build-system.md)               | You touch `webpack.config.js` or any file under `scripts/`, or a build fails mysteriously.                     |
| [`docs/ubo-lite-mirror.md`](./docs/ubo-lite-mirror.md)         | **Any** change inside `ubo-lite-mirror/`, or a `git submodule update`. Lists the Windscribe patches.           |
| [`docs/testing.md`](./docs/testing.md)                         | You add an e2e scenario, or CI tests fail.                                                                     |
| [`docs/styling.md`](./docs/styling.md)                         | You write or migrate styling. We use Theme-UI; direction is Mantine (not yet adopted).                          |
| [`docs/conventions.md`](./docs/conventions.md)                 | You need TypeScript / naming / JSX / Redux code-style rules.                                                   |
| [`docs/security.md`](./docs/security.md)                       | Anything involving secrets, auth, CI scanning, or `.env`.                                                      |
| [`docs/gotchas.md`](./docs/gotchas.md)                         | Always skim before big changes. Every known landmine lives here.                                               |

---

## Task → files map (use this to route yourself)

If you're about to do…                         | Read first…                                                    | Likely to edit…
-----------------------------------------------|----------------------------------------------------------------|----------------------------------------
Add / rename a Redux slice                     | `docs/state-management.md`                                     | `src/state/slices/*.ts`, `src/state/store.ts`, maybe `src/state/aliases.ts`
Add a new background event listener            | `docs/background-service-worker.md`                            | `src/pages/background/eventHandlers/*.ts`, `src/pages/background/main.ts`, `src/pages/background/eventHandlers/index.ts`
Add a new API endpoint                         | `docs/api.md`, `docs/conventions.md#api-directory`             | `src/api/endpoints.ts`, `src/api/types.ts`, the slice that calls it
Change the PAC script                          | `docs/proxy-and-pac.md`, `docs/gotchas.md`                     | `src/services/proxyConfig/proxyConfig.ts`
Add a static content script                    | `docs/content-scripts.md`, `docs/ubo-lite-mirror.md`           | `src/pages/contentScripts/<name>.ts`, `webpack.config.js`, `ubo-lite-mirror/chromium/js/scripting-manager.js` (the `windscribeContentScriptIds` list)
Add / change a warp (generated script)         | `docs/content-scripts.md`, `docs/build-system.md`              | `scripts/embed<X>.js`, `scripts/buildUtils/templates/<X>.js`
Change manifest permissions                    | `docs/architecture.md#permissions`, `docs/security.md`         | `src/manifest.json`
Bump `ubo-lite-mirror` submodule               | **`docs/ubo-lite-mirror.md`** (read end-to-end)                | `ubo-lite-mirror/` (inside the submodule repo)
Add an alarm                                   | `docs/background-service-worker.md#alarmhandler`               | `src/pages/background/main.ts` (register), `src/pages/background/eventHandlers/alarmHandler.ts`
Add an offscreen-document message type         | `docs/offscreen-document.md`                                   | `src/services/offscreenActions/offscreenHub.ts`, `src/api/types.ts` (`MessageTypes` union)
Debug "my dispatch doesn't arrive"             | `docs/state-management.md`, `docs/ubo-lite-mirror.md` (`32f91368`) | —
Debug "my content script isn't running"        | `docs/content-scripts.md`, `docs/ubo-lite-mirror.md` (allowlists) | —
Write or update an e2e test                    | `docs/testing.md`                                              | `tests/e2e/<name>.ts`, `tests/e2e/tests.ts`
Change build behavior                          | `docs/build-system.md`                                         | `webpack.config.js`, `scripts/build.js`, relevant `scripts/embed*.js`
Write a new UI component                       | `docs/styling.md`, `docs/conventions.md`                       | `src/components/*` or `src/views/*`

---

## Hard rules (these always apply)

1. **Never touch `ubo-lite-mirror/` casually.** The submodule has
   Windscribe-specific patches that are invisible on the surface. Read
   [`docs/ubo-lite-mirror.md`](./docs/ubo-lite-mirror.md) before you do
   anything inside it, including `git submodule update`.

2. **Source-of-truth manifest is `src/manifest.json`.** `build/manifest.json`
   is generated by webpack on every build.

3. **Warps are build-time generated.** The four warp script folders
   (`splitPersonality`, `locationWarp`, `languageWarp`, `timeZoneWarp` under
   `src/pages/contentScripts/`) are rewritten by `scripts/embed*.js` on every
   build. Do not hand-edit them, and do not commit them. Change the templates
   at `scripts/buildUtils/templates/*.js` instead.
   `src/state/slices/userAgent.ts` is rewritten by
   `scripts/embedUserAgentsSplitPersonality.js`. Don't hand-edit it. It is
   tracked, so a user-agent list change shows up in git. See
   [`docs/content-scripts.md`](./docs/content-scripts.md) and
   [`docs/build-system.md`](./docs/build-system.md).

4. **Never import `src/state/store.ts` from a view / popup component.** Use
   `useDispatch` / `useDispatchAlias` from
   `src/state/hooks.ts`. Direct store access bypasses `webext-redux` and the
   popup stops syncing with the background.

5. **Popup dispatches are async.** `webext-redux` round-trips every action
   through `chrome.runtime` messaging. Always `await dispatch(...)`.

6. **Aliases, not direct thunks, for cross-context async.** If a thunk must
   run in the background but is kicked off from the popup, register it in
   `src/state/aliases.ts` and dispatch with `useDispatchAlias`. See
   [`docs/state-management.md#aliases`](./docs/state-management.md#aliases).

7. **Don't `fetch()` from the service worker for anything offscreen-only or
   worker-backed.** Delegate via
   `chrome.runtime.sendMessage({ target: 'offscreen', type: ... })`. See
   [`docs/offscreen-document.md`](./docs/offscreen-document.md).

8. **`webRequest.onAuthRequired` is `asyncBlocking` and 407-only.** Don't
   broaden it; other auth challenges fall through to Chrome's native prompt.

9. **Register global listeners only in `src/pages/background/main.ts`.** And
   register them **synchronously at top level** — putting
   `chrome.*.addListener` inside an `async` block breaks MV3 event wake-up.

10. **Don't commit generated warp files.** The four warp folders are rewritten
    on every build. Only `.gitkeep` is tracked in each folder.
    `src/state/slices/userAgent.ts` is also rewritten on every build. Don't
    hand-edit it. It is tracked, so it shows up as changed when the user-agent
    list changes.

11. **Don't commit `build.zip` or `.env.local`.** `build.zip` is a packaged
    artifact. `.env.local` is personal staging creds.

12. **Keep each styled component on one framework.** Direction is Mantine
    (not yet adopted) — once it is, old code stays Theme-UI until migrated.
    See [`docs/styling.md`](./docs/styling.md).

---

## How to do common things

### Add a Redux slice

```bash
yarn slice            # scaffolds src/state/slices/<name>.ts and wires it into store.ts
```

Then:
1. Edit the scaffold (reducers, action creators) — see
   [`docs/state-management.md#adding-a-new-slice`](./docs/state-management.md#adding-a-new-slice).
2. Check the edit `yarn slice` made to `src/state/store.ts`. It adds the
   reducer import and the `reducers` map entry, so don't add them again.
3. If the slice has async side effects that must run in the background, add
   a `createAsyncThunk` and wire up an alias in `src/state/aliases.ts`.
4. If the slice's data must be migrated from MV2 storage, add an entry in
   `src/migrations/` and register it with the migration runner.

### Add a static content script

1. Create `src/pages/contentScripts/<name>.ts`.
2. Define a script-ID constant in `src/utils/constants.ts`
   (e.g. `export const fooScriptId = 'fooScript' as const`).
3. Add an entry to `webpack.config.js::entry`.
4. If registered dynamically via `chrome.scripting.registerContentScripts`
   (see `src/utils/scriptController.ts`), **add the script ID to the
   `windscribeContentScriptIds` list in
   `ubo-lite-mirror/chromium/js/scripting-manager.js`**. See
   [`docs/ubo-lite-mirror.md`](./docs/ubo-lite-mirror.md).
5. Register it from the feature toggle in its view (e.g.
   `src/views/Privacy/Privacy.tsx`) and from
   `src/pages/background/eventHandlers/registerScripts.ts`, which runs on
   install and update. `connect()` in
   `src/services/proxyConfig/proxyConfig.ts` re-registers only the warps.

### Add or change a warp (generated content script)

1. Edit the template at `scripts/buildUtils/templates/<X>ContentScript.js`
   — *not* the generated `.ts` files under `src/pages/contentScripts/<X>/`.
2. If you need additional input data (new fields from the server list, for
   example), also edit `scripts/embed<X>.js`.
3. Rebuild: `yarn build`. Verify the new bundles appear in `build/`.
4. Post-build validators at `scripts/buildUtils/outputValidators/*` log a
   `console.error` if a bundle is missing or wrong. They do not fail the
   build, so read the build output.

### Add an API endpoint

1. Add the function to `src/api/endpoints.ts` using `sendRequest`. It
   takes `dispatch` as its first arg so it can update `state.workingApi`
   on failover.
2. Add the response type to `src/api/types.ts`. If it's a new endpoint
   name, add it to the `Endpoint` union.
3. Call it from a slice's `createAsyncThunk`, not directly from a
   component. A few older call sites break this rule. See
   [`docs/conventions.md#api-directory`](./docs/conventions.md#api-directory).
4. If the call must run in the background, wire up an alias.

### Add a background event listener

1. Create `src/pages/background/eventHandlers/<name>.ts` exporting a
   handler factory `(bgStore: Promise<StoreType>) => (...) => ...`.
2. Export it from `src/pages/background/eventHandlers/index.ts`.
3. Register it in `src/pages/background/main.ts` — **synchronously at top
   level** (not inside any `async` block).
4. Always `await bgStore` inside the handler before doing work, so you
   don't race with store hydration.

### Add an alarm

1. Add `chrome.alarms.create('<name>', { periodInMinutes: N })` in
   `src/pages/background/main.ts`.
2. Handle it in
   `src/pages/background/eventHandlers/alarmHandler.ts`'s `if (alarm.name
   === '<name>')` switch.

### Add an offscreen message handler

1. Add a case to `handleMessages` in
   `src/services/offscreenActions/offscreenHub.ts`.
2. Extend the `MessageTypes` union (used by the `Message` interface) in `src/api/types.ts`.
3. From the SW, send with `chrome.runtime.sendMessage({ target:
   'offscreen', type: '<your-type>', data })`.
4. If you add a new Web Worker, add a `CopyWebpackPlugin` pattern in
   `webpack.config.js` to copy the `.js` into `build/`.

### Add a context menu item

1. Extend `src/services/contextMenu/` (it currently only registers the
   debug-log opener).
2. Handle the click in the inline listener in
   `src/pages/background/main.ts` (search for
   `chrome.contextMenus.onClicked`) or refactor into a dedicated handler.

### Add a keyboard shortcut

1. Add the command to `src/manifest.json::commands`.
2. Handle it in `src/services/shortcuts/keyboardCommandHandler.ts`.
3. Only `toggle-proxy` is throttled (`SHORTCUT_COMMAND_THROTTLE_MS` from
   `src/utils/constants.ts`). Add throttling yourself if a new command
   needs it.

### Bump the `ubo-lite-mirror` submodule

**Don't** without reading
[`docs/ubo-lite-mirror.md`](./docs/ubo-lite-mirror.md) end to end.
Specifically follow the *merge-from-upstream checklist* at the bottom of
that file. The Windscribe patches on top of upstream are listed in its
table. The highest-risk one is the `casesToUse` message filter in
`chromium/js/background.js`.

### Write / update an e2e test

1. Add `tests/e2e/<name>.ts` exporting a function that takes
   `popupPage: Page` (and `browser: Browser` if needed).
2. Call it from `tests/e2e/tests.ts` inside the `Initialize` block.
3. Add `data-testid="…"` attributes to any React components you select.
4. Type-check with `yarn typecheck:tests`. Mocha loads the tests through
   tsx, which doesn't type-check.
5. Build first, then run: `yarn build && yarn test:local`.

### Modify the PAC script

File: `src/services/proxyConfig/proxyConfig.ts`, function
`createFindProxyForURLFunction`. Anything added to the in-PAC `allowlist`
array is **bypassed from the proxy entirely**, which is why Windscribe's
own domains are listed. See [`docs/proxy-and-pac.md`](./docs/proxy-and-pac.md)
and [`docs/gotchas.md`](./docs/gotchas.md#proxy--pac).

---

## Things you need to know

### Path aliases — use them

`webpack.config.js::resolve.modules` includes `src/`. Imports work
without any relative prefix:

```ts
import { login } from 'api/endpoints'
import { pushToDebugLog } from 'services/debugLog'
import { useDispatch } from 'state/hooks'
import { CLIENT_AUTH_SECRET } from 'utils/constants'
import { connect } from 'services/proxyConfig'
```

Prefer these over `../../../services/debugLog` paths.

### Use `pushToDebugLog`, not `console.log`

`console.log` goes into the void in the service worker and leaks noise in
content scripts. Use `pushToDebugLog` from `services/debugLog`:

```ts
pushToDebugLog({
  message: 'Human-readable what-happened',
  tag: 'background' | 'popup' | 'debugLog' | 'contentScript' | 'offscreen',
  level: 'INFO' | 'WARN' | 'ERROR',
  data: someObject,   // stored as-is; JSON-stringified only when the log is rendered
})
```

Only gated-on-dev `console.log` is acceptable
(`if (process.env.NODE_ENV === 'development') console.log(...)`). The
one such call today is in
`src/pages/background/eventHandlers/proxyErrorHandler.ts`.

### `DefinePlugin` globals

Injected at build time, usable in any bundle:

```ts
declare const COMMIT_HASH: string                      // short git SHA
declare const UBO_LITE_SUBMODULE_COMMIT_HASH: string   // short submodule SHA
declare const UBO_LITE_VERSION: string                 // from ubo-lite-mirror/chromium/manifest.json
declare const UBO_LITE_NAME: string                    // from ubo-lite-mirror's et locale
declare const UBLOCK_REMOVE_PARAM_RULE_IDS: Record<string, number[]> // uBOL removeparam rule IDs per ruleset (Link Sanitizer)
```

Used in the debug-log header and anywhere the extension needs to
identify its own build or uBOL version.

### `webext-redux` is a **fork**

We use `@eduardoac-skimlinks/webext-redux`, not upstream
`tshaddix/webext-redux`. Upstream GitHub issues and docs can mislead —
some APIs diverge. See
[`docs/state-management.md`](./docs/state-management.md).

### Minimum Chrome version is 122

`src/manifest.json::minimum_chrome_version: "122.0"` and
`MIN_SUPPORTED_CHROME_VERSION = 122` in `src/utils/constants.ts`. Any
Chrome API available from 122 onwards is safe to use without feature
guards.

### API URL shape differs between prod and dev

In `src/api/sendRequest.ts`:

```ts
if (NODE_ENV === 'production') url = useAssets ? `assets.${domain}` : `api.${domain}`   // dot
else                            url = useAssets ? `assets-${domain}` : `api-${domain}`   // hyphen
return fetchWithTimeout(`https://${url}/${path}`, method, body, headers)
```

Same for `assets.` / `assets-`. Production domain examples:
`api.windscribe.com`. `yarn build` always sets `NODE_ENV=production`, so a
staging build (`API_URL=staging.windscribe.com`) calls
`api.staging.windscribe.com`. The hyphen form (`api-staging.windscribe.com`)
is used only when `NODE_ENV` is not `production`. If you ever have to build
a URL by hand, respect this.

### Circular imports fail the build

`CircularDependencyPlugin` in `webpack.config.js` has `failOnError: true`
scoped to `src/`. A cycle is reported as a compilation error, and
`scripts/build.js` exits with code 1 after webpack finishes. Break one side
into a leaf module or invert a dependency.

### Firefox is aspirational; Edge is selected via `BROWSER`

Edge is supported: `BrowserName = 'Chrome' | 'Edge'` and `BROWSER` (from
`process.env.BROWSER`) in `src/utils/constants.ts` select the adapter in
`src/services/browserApi/browserApiFactory.ts`, and
`src/services/browserApi/edge.ts` is a thin Edge adapter. Firefox is
not shipped, but there is partial groundwork: `// TODO: Add browser type …
for firefox` comments, an `IS_FIREFOX` constant in `src/utils/constants.ts`,
a Firefox private-mode overlay, a `'firefox'` value in the `Platform` type,
and firefox-esr plus geckodriver in the CI image. When you touch something
that would diverge per browser, leave an `if (IS_FIREFOX) { … }`
breadcrumb rather than hardcoding Chrome.

### Don't remove `CLIENT_AUTH_SECRET` or `SECRET_KEY_PSY_OP`

Both are in `src/utils/constants.ts`. The build scripts keep their own
copies: `CLIENT_AUTH_SECRET` in `scripts/buildUtils/api/getEndpoint.js`
and `SECRET_KEY_PSY_OP` in `scripts/login.js`. They look
like leaked secrets to a scanner; they aren't — the server expects them
as soft client-identifier hashes. Removing breaks every API call and the
build-time login. See [`docs/security.md`](./docs/security.md).

### Build cache lives in `.ws-build-cache/`

`scripts/login.js` and `scripts/getLocations.js` cache the build-time
session and server list (settings in `scripts/cacheConfig.js`, 1-hour TTL)
so repeated `yarn build`s don't re-login every time. Clear with
`yarn clear-cache` or delete the folder. Not committed.

### `package.json::version` and `src/manifest.json::version` must match

Nothing enforces this. Bump both together or CWS submission gets confused.

### `src/state/slices/userAgent.ts` is a real slice with regenerated *contents*

The file is tracked and imported by `src/state/store.ts` like any other
slice. `scripts/embedUserAgentsSplitPersonality.js` regenerates the whole
file on every build from `scripts/buildUtils/templates/userAgentSlice.js`.
Don't delete the file and don't hand-edit it; edit the template instead.
A user-agent list change shows up in git.

### Reducers run in the background

All Redux state mutations happen in the background service worker, then
the resulting state is pushed to the popup proxy store. A
non-serialisable payload (function, DOM node, class instance with
prototypes) dispatched from the popup will silently drop or corrupt on
the way across.

### `web_accessible_resources` in the manifest must match uBOL's

`strictblock.html`, `zapper-ui.html`, `picker-ui.html`,
`unpicker-ui.html`, and every file under `web_accessible_resources/*`
are uBOL's surrogate-scripts / pickers. They ship from
`ubo-lite-mirror/` but **must be declared in `src/manifest.json`'s
`web_accessible_resources` array with the exact same paths uBOL expects**
— otherwise uBOL's injection breaks and the extension falls over on
certain pages. If you bump the submodule and upstream added / renamed a
web-accessible resource, you must mirror that change in
`src/manifest.json`. See
[`docs/ubo-lite-mirror.md`](./docs/ubo-lite-mirror.md#web_accessible_resources).

### Icon can't be changed by uBOL

We patched `ubo-lite-mirror/chromium/js/action.js` to comment out every
`browser.action.setIcon` call. If you need to change the toolbar icon,
do it in `src/state/slices/iconVariant.ts` / `src/services/browserAction/`
— never in the submodule. See
[`docs/ubo-lite-mirror.md`](./docs/ubo-lite-mirror.md).

---

## Debugging

To inspect any context, open `chrome://extensions`, enable **Developer
mode**, then find the Windscribe extension card. Each runtime context
shows up as a clickable link under **Inspect views**:

| Context                 | Click on…                                             | What you get                             |
| ----------------------- | ----------------------------------------------------- | ---------------------------------------- |
| Background service worker | `service worker`                                    | DevTools for the SW: console, network, Sources. |
| Offscreen document      | `offscreenHub.html`                                   | DevTools for the offscreen hub + its Web Worker. |
| Popup                   | Right-click the popup → **Inspect**                   | DevTools for the popup's React tree.     |
| Debug log page          | Right-click the extension icon → **View Debug Log**, then Inspect | DevTools for the debug log.    |
| Content scripts         | Open DevTools on the affected page, filter by the extension's origin | Content script logs / network. |

In-app debug log is usually enough — right-click the extension icon →
**View Debug Log**. Every `pushToDebugLog` entry shows up there with
tag / level filters. Underneath it's a Dexie (IndexedDB) table; if the
UI breaks, open DevTools on the SW → Application → IndexedDB.

PAC `alert()` output is network-level only: it appears only in Chrome's
network log export (`chrome://net-export`), not in DevTools, and is not a
user-visible alert. They are not gated on `NODE_ENV` and ship in production
builds.

---

## Before you commit

1. Run `yarn lint` — husky's `pre-commit` hook runs this automatically, but
   don't assume.
2. If you touched anything exercised by e2e, run `yarn test:local`.
3. If you touched `webpack.config.js` or anything in `scripts/`, do a clean
   `yarn build` and verify `build/` contains what you expect.
4. If you touched a content-script register path, load the unpacked
   `build/` folder into Chrome and verify the script shows up in the
   extension's registered content scripts (chrome-extension://… dev tools).
5. If you touched `ubo-lite-mirror/`, do not commit without discussing
   with a human. Never `git submodule update` without reading
   [`docs/ubo-lite-mirror.md`](./docs/ubo-lite-mirror.md).
6. Check `git status` — **never** stage any of:
   - `src/pages/contentScripts/{splitPersonality,locationWarp,languageWarp,timeZoneWarp}/<hash>.ts`
   - `build.zip`
   - `.env.local`

---

## Things that silently break if you're careless

- Adding a new dynamically-registered content script without updating the
  `windscribeContentScriptIds` list in `ubo-lite-mirror/chromium/js/scripting-manager.js`.
- Calling `fetch()` from the service worker for something that needs a DOM
  context (use the offscreen document).
- Mixing Theme-UI `sx` with Mantine `style` in one component (once Mantine is adopted).
- Returning `true` from `runtime.onMessage` for messages you're not
  handling — you'll block webext-redux.
- Committing a generated warp file. `src/state/slices/userAgent.ts` is tracked; don't hand-edit it.
- Assuming the extension icon can be changed by uBOL (it can't, we
  deliberately patched it out).
- Registering a `chrome.*.addListener` inside an `async` block (breaks SW
  wake-up).
- Widening `webRequest.onAuthRequired` past 407.

See [`docs/gotchas.md`](./docs/gotchas.md) for the full catalogue.

---

## If this file disagrees with the code

**The code wins.** These docs are maintained by humans on a best-effort
basis. If something is inaccurate, open a follow-up to fix the doc rather
than working around what's written.
