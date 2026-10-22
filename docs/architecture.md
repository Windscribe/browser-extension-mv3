# Architecture

High-level tour of the extension. Each section points at the specific files
that implement the behaviour.

---

## The four contexts

A Manifest V3 extension is not one program — it's a loose collection of
independently-running contexts that share state via message passing. This
extension uses four:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  ┌───────────────────┐  webext-redux   ┌────────────────────────────────┐  │
│  │    Popup (React)  │◀──────sync─────▶│  Background Service Worker     │  │
│  │  src/pages/popup  │                 │  src/pages/background/main.ts  │  │
│  └───────────────────┘                 │  + ubo-lite-mirror/js/back...  │  │
│                                        └──────────┬─────────────────────┘  │
│                                                   │                        │
│                                                   │ chrome.runtime         │
│                                                   │ .sendMessage           │
│                                                   ▼                        │
│                                     ┌─────────────────────────────────┐    │
│                                     │  Offscreen Document             │    │
│                                     │  src/services/offscreenActions/ │    │
│                                     │    offscreenHub.ts              │    │
│                                     │  + Web Worker (checkIp.worker)  │    │
│                                     └─────────────────────────────────┘    │
│                                                                            │
│  ┌───────────────────────────────────────────────────────────────────┐     │
│  │  Content Scripts (per-tab)                                        │     │
│  │  • static:    workerBlock, webshareNoOp,                          │     │
│  │               6x antiFingerprinting/*                             │     │
│  │  • generated: splitPersonality/*, locationWarp/*,                 │     │
│  │               languageWarp/*, timeZoneWarp/*  (one file per UA /  │     │
│  │               datacenter; produced by scripts/embed*.js)          │     │
│  └───────────────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────────┘
```

### 1. Background service worker

Entry: `src/backgroundScripts.js` (the manifest's `background.service_worker`)
imports two bundles:

```js
import './background.bundle.js'        // Windscribe
import './js/background.js'            // uBlock Origin Lite (vendored)
```

The Windscribe side is initialised in `src/pages/background/main.ts`. It:

- calls `initializeWrappedStore()` to bring up the `webext-redux`-wrapped
  Redux store,
- registers every global `chrome.*` listener (installed / startup / alarms /
  onAuthRequired / onMessage / proxy / management / permissions / commands /
  contextMenus),
- hydrates initial state (`setIsOnline`, `chooseIcon`, user agents, permission
  list, fetches notifications if there's a session).

See [`background-service-worker.md`](./background-service-worker.md).

### 2. Popup (React)

Entry: `src/pages/popup/index.tsx`. React 18.2 + Redux Toolkit + Theme-UI
(direction is Mantine; once adopted, new components will be in Mantine, old ones stay Theme-UI
until migrated). `react-dom` is aliased to `@hot-loader/react-dom` 17 in
webpack, and the popup mounts with the legacy `render` API. All screens live
in `src/views/*`. Interaction flow:

1. Component calls `useDispatch()` / `useDispatchAlias()` from
   `src/state/hooks.ts`.
2. `webext-redux` sends plain actions and `alias/*` actions to the
   background store. Thunks dispatched directly in the popup run in the
   popup (the proxy store has `redux-thunk`); use an alias to run a thunk in
   the background.
3. Background processes the action (reducers, middleware, aliased thunks).
4. New state is pushed back to the popup's proxy store; React re-renders.

**Never import `src/state/store.ts` directly from a popup component** — that
would bypass the proxy. See
[`state-management.md`](./state-management.md#keeping-the-popup-in-sync).

### 3. Offscreen document

Entry: `src/services/offscreenActions/offscreenHub.ts`, HTML:
`src/services/offscreenActions/offscreenHub.html`.

MV3 service workers cannot run a DOM and cannot use some older web APIs.
Anything that needs those is proxied through this single offscreen document.
It handles `migrateTheme`, `migrateBlockerSettings`, `applyBlockerSettings`,
`migrateAllowlist`, and `fireNoSSLRequest`, the last of which delegates to
`checkIp.worker.js`.

See [`offscreen-document.md`](./offscreen-document.md).

### 4. Content scripts

Two families:

- **Static** — checked into `src/pages/contentScripts/`:
  `workerBlock.ts`, `webshareNoOp.ts`, and six anti-fingerprinting scripts
  (`antiFingerprinting/{font,canvas,screen,audio,fingerprintjs,
  fingerprintMessageListener}.ts`). Listed in `webpack.config.js`'s `entry`
  object.

- **Generated** — produced at build time by `scripts/embed*.js`, written to
  `src/pages/contentScripts/{splitPersonality,locationWarp,languageWarp,
  timeZoneWarp}/`, and added to the webpack `entry` object dynamically. One
  file per user agent (split personality) or per datacenter/location (warps).

These are registered at runtime with `chrome.scripting.registerContentScripts`
via `src/utils/scriptController.ts`.

See [`content-scripts.md`](./content-scripts.md) and
[`build-system.md`](./build-system.md).

---

## The proxy

The actual VPN is delivered via `chrome.proxy.settings.set` with a
PAC (Proxy Auto-Config) script generated on each connect. The PAC is a
template-literal function in
`src/services/proxyConfig/proxyConfig.ts::createFindProxyForURLFunction`.
It embeds:

- the datacenter hostnames (`HTTPS host1:port; HTTPS host2:port; ...`),
- a hardcoded allowlist of Windscribe's own domains (so API calls bypass the
  proxy),
- the user's allowlist,
- Cruise Control per-domain routing (when Autopilot is on).

Proxy authentication is via HTTP Basic over 407 Proxy Auth Required. The
handler is `src/pages/background/eventHandlers/authRequiredHandler.ts`,
registered with `['asyncBlocking']` against `<all_urls>` and guarded so it
*only* answers 407 responses. Credentials are base64-stored in
`state.serverCredentials` and decoded with `atob()` at response time.

See [`proxy-and-pac.md`](./proxy-and-pac.md).

---

## `declarativeNetRequest` (and uBlock Lite)

Ad / tracker / malware blocking is done via
`declarativeNetRequestWithHostAccess` + uBlock Origin Lite, which is vendored
as the `ubo-lite-mirror` submodule. Its `background.js` runs alongside
Windscribe's in the service worker (see
`src/backgroundScripts.js`), its assets are copied into `build/` by
`webpack.config.js`'s `CopyWebpackPlugin` block, and its ruleset JSON files
are referenced from `src/manifest.json`'s `declarative_net_request`.

uBOL carries a set of Windscribe patches to stop it stomping on Windscribe's
icon, message channel, and content scripts. **If you are about to touch the
submodule, read [`ubo-lite-mirror.md`](./ubo-lite-mirror.md) first.**

---

## Data flow: a click from the popup

Concrete example — user toggles **Location Warp** on.

1. The Location Warp toggle's `onChange` in `src/views/Privacy/Privacy.tsx`
   calls `dispatch(setLocationWarp(isLocationWarpActive))`.
2. `webext-redux` serialises and posts the action to the background, where
   the `locationWarp` reducer (`src/state/slices/locationWarp.ts`) updates
   `state.locationWarp`.
3. In the same `onChange` handler (popup context), `Privacy.tsx` stops here
   if Autopilot is selected or there is no current datacenter id. Otherwise
   it computes the bundle name
   `SHA256(currentDataCenter.id) + getBundleNamePostFix('locationWarpScript') + '.bundle.js'`.
4. If `doesBundleExistInBuild()` finds that bundle, it calls
   `registerScript(locationWarpScriptId, [bundleFileName], excludeMatches)`
   from `src/utils/scriptController.ts`. If not, it uses
   `getNearestValidDataCenter()` to pick a fallback datacenter bundle. When
   the toggle is turned off, it calls `unregisterScript(locationWarpScriptId)`.
5. `registerScript` calls `chrome.scripting.registerContentScripts([...])`
   (world `MAIN`, `document_start`, `persistAcrossSessions: true`) with the
   user's allowlist as `excludeMatches`.
6. Chrome injects that script into new tab loads; the script rewrites
   location / geolocation APIs to report the data-center's coordinates.
7. On each later connect, `connect()` in
   `src/services/proxyConfig/proxyConfig.ts` re-registers the Location Warp
   script for the new datacenter when `state.locationWarp` is on and
   Autopilot is off.
8. The background's new state is pushed back through `webext-redux` to the
   popup proxy store; React re-renders the toggle in its new position.

---

## Build-time data flow

```
 yarn build
     │
     ▼
 dotenv → scripts/build.js
     │
     ├── scripts/login.js            (fetches session_auth_hash)
     ├── scripts/getUa.js            (reads useragents.txt from disk)
     ├── scripts/getLocations.js     (calls serverlist/chrome/{is_premium}/{loc_hash})
     │
     ├── scripts/embedUserAgentsSplitPersonality.js
     │       ├── writes src/pages/contentScripts/splitPersonality/<sha>.ts
     │       ├── appends entries to webpack config.entry
     │       └── rewrites src/state/slices/userAgent.ts
     ├── scripts/embedLocationWarp.js   (same pattern, per datacenter)
     ├── scripts/embedLanguageWarp.js   (same pattern, per location)
     ├── scripts/embedTimeZoneWarp.js   (same pattern, per location)
     │
     ├── webpack(config)   → build/
     │
     └── scripts/buildUtils/outputValidators/*
            (logs a console.error if an embedded script is missing from build/;
             does not fail the build)
```

See [`build-system.md`](./build-system.md) for the full rundown.

---

## Permissions

From `src/manifest.json`:

```
activeTab, contextMenus, declarativeNetRequestWithHostAccess, privacy, proxy,
notifications, scripting, storage, tabs, webRequest, webRequestAuthProvider,
management, alarms, offscreen, unlimitedStorage
```

Each one is used — quick map:

| Permission                                | Used for                                               |
| ----------------------------------------- | ------------------------------------------------------ |
| `activeTab`                               | Declared in the manifest; no direct use in `src/`      |
| `contextMenus`                            | Right-click → View Debug Log                           |
| `declarativeNetRequestWithHostAccess`     | uBlock Lite's block rules                              |
| `privacy`                                 | WebRTC IP policy (`services/privacy/network.ts`), ad privacy (`state/slices/adPrivacyEnabled.ts`) |
| `proxy`                                   | `chrome.proxy.settings.set`                            |
| `notifications`                           | "Connected to …" / "Connection terminated"             |
| `scripting`                               | `chrome.scripting.registerContentScripts` for all dynamic scripts (warps, split personality, anti-fingerprinting, workerBlock, webshareNoOp) |
| `storage`                                 | Persisted Redux state, caches                          |
| `tabs`                                    | Active-tab URL lookup and reload (`services/currentTab`), opening tabs (debug log, links) |
| `webRequest` + `webRequestAuthProvider`   | 407 proxy auth handler                                 |
| `management`                              | Detect competing uBO / uBOL installs (`detectUblock`)  |
| `alarms`                                  | sessionPoller, notificationPoller, pruneLog            |
| `offscreen`                               | Offscreen document for migrations + IP check           |
| `unlimitedStorage`                        | Lifts the `chrome.storage.local` quota for persisted Redux state (`services/browserApi/chrome.ts`) |
| `host_permissions: <all_urls>`            | PAC + content scripts                                  |
| `optional_permissions: contentSettings`   | Notification blocking via `chrome.contentSettings.notifications` (`services/contentSettings/notifications.ts`) |
| `optional_permissions: browsingData`      | Manual current-site data cleanup (`services/siteData/clearCurrentSiteData.ts`) |

---

## See also

- [`state-management.md`](./state-management.md) — Redux details.
- [`background-service-worker.md`](./background-service-worker.md) — every
  listener.
- [`proxy-and-pac.md`](./proxy-and-pac.md) — the PAC template and auth.
- [`content-scripts.md`](./content-scripts.md) — static vs generated.
- [`ubo-lite-mirror.md`](./ubo-lite-mirror.md) — the submodule.
