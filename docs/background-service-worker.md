# Background service worker

Everything registered on `chrome.*` in the background. The SW is short-lived —
Chrome tears it down when it goes idle and spins it back up on demand — so
all state hydration must be rerun on every wake.

---

## Entry points

**Manifest:**

```json
"background": { "service_worker": "backgroundScripts.js", "type": "module" }
```

**`src/backgroundScripts.js`** (the file pointed at by the manifest, lives at
the build root after copy):

```js
import './background.bundle.js'   // Windscribe's background bundle
import './js/background.js'       // uBlock Origin Lite's background bundle
```

So two background modules run in the same SW context. See
[`ubo-lite-mirror.md`](./ubo-lite-mirror.md) for how we keep uBOL from
stepping on Windscribe's listeners.

**`src/pages/background/main.ts`** is the top of the Windscribe side. It
initialises the Redux store and registers every global listener.

---

## Startup flow (`src/pages/background/main.ts`)

Abbreviated. The snippet below omits these steps from `main.ts`:

- After `chrome.permissions.getAll()`, if
  `state.currentLanguage.currentSelection === 'system'`, it dispatches
  `setCurrentLanguageSelection('system')` to resolve the current system
  language.
- After `setOriginalUserAgent`, if `state.contextMenu` is set, it calls
  `updateContextMenuItem(currentLanguage)`. It then adds a
  `store.subscribe()` callback that calls `updateContextMenuItem` again when
  `state.contextMenu` is on and the language or the `contextMenu` value
  changes.

```ts
const bgStore = initializeWrappedStore().then(async store => {
  pushToDebugLog({ message: 'Bg store was initialized', tag: 'background' })
  const grantedPermissions = await chrome.permissions.getAll()
  store.dispatch(addPermissions(grantedPermissions.permissions ?? []))
  store.dispatch(setIsOnline(navigator.onLine))
  store.dispatch(chooseIcon())

  const sessionAuthHash = store.getState().session.sessionData?.session_auth_hash
  if (sessionAuthHash) store.dispatch(fetchNotifications())

  store.dispatch(initializeUserAgentsList())
  enableOrDisableUblock(store.getState().blocker.blockLists, store)
  store.dispatch(setOriginalUserAgent(navigator.userAgent))
  return store
})
```

Every listener below, except the inline `contextMenus.onClicked` listener,
takes `bgStore: Promise<StoreType>` so it can
`await bgStore` before doing work — this avoids races where an event fires
before the store has finished hydrating from storage.

---

## The listener registry

All Windscribe-owned background service worker listeners are registered in
`src/pages/background/main.ts`. If you add a new global listener, **put it
here**, not anywhere else. `webext-redux`'s `wrapStore` (called from
`initializeWrappedStore` in `src/state/webExtAdapter.ts`) also registers
`runtime.onMessage` and `runtime.onMessageExternal` in the SW. Other
contexts register their own listeners:
`src/services/offscreenActions/offscreenHub.ts` (offscreen
`runtime.onMessage`) and `src/services/detectUblock/index.ts`
(`management.onEnabled` / `onDisabled` inside a React hook).
`src/services/proxyAuth/offscreen/checkIpOffscreen.js` is a legacy file and
is not included in the build.

| API                                              | Handler                                                        | Mode              |
| ------------------------------------------------ | -------------------------------------------------------------- | ----------------- |
| `runtime.onInstalled`                            | `onInstalledHandler`                                           | —                 |
| `runtime.onStartup`                              | `startupHandler`                                               | —                 |
| `proxy.onProxyError`                             | `proxyErrorHandler`                                            | —                 |
| `webRequest.onAuthRequired`                      | `authRequiredHandler`                                          | `asyncBlocking`   |
| `alarms.onAlarm`                                 | `alarmHandler`                                                 | —                 |
| `runtime.onMessage`                              | `messageHandler`                                               | —                 |
| `management.onEnabled` / `onDisabled`            | `ublockStatusChangeHandler`                                    | —                 |
| `permissions.onAdded` / `onRemoved`              | `handlePermissionsAdded` / `handlePermissionsRemoved`          | —                 |
| `commands.onCommand`                             | `handleKeyboardCommand`                                        | —                 |
| `contextMenus.onClicked`                         | inline — opens `debugLog.html` in a tab                        | —                 |

Handler source files live in `src/pages/background/eventHandlers/`, except
`handleKeyboardCommand` (`src/services/shortcuts/keyboardCommandHandler.ts`).

---

## Per-handler detail

### `onInstalledHandler`

Fires on **install** and on **update** (and on Chrome profile import).

- On `INSTALL`, records the install via `recordInstall` API call.
- Runs the V2 → V3 storage migration (`src/migrations/v2ToV3migration.ts`).
- Dynamically-registered content scripts are **unloaded on every extension
  update**, so this handler calls `registerScripts(store, migratedFlag)` to
  re-register them. See
  [Content scripts](./content-scripts.md#registration-wrapper).
- Version-specific hotfix: on `UPDATE`, if the current running version
  (`chrome.runtime.getManifest().version`) is 4.2.2 or 4.3.3, the new
  default lists (`easylist`, `easyprivacy`, `pgl`, `ublock-filters`) are
  turned on, the old `default` list is removed, and all other enabled lists
  are kept.
- Adds the "View Debug Log" context menu if `state.contextMenu` is set.

File: `src/pages/background/eventHandlers/onInstalledHandler.ts`.

### `startupHandler`

Fires when Chrome launches and the extension comes back up.

- Refresh `isOnline` and `chooseIcon`.
- Ensure the offscreen document (`offscreenHub.html`) is open, with reason
  `IFRAME_SCRIPTING`.
- If `connection.autoConnect` is off, disconnect silently and return.
- If there's no session auth hash, surface a connection error.
- Refresh notifications, UA list, original UA.
- Reconcile uBlock state (`enableOrDisableUblock`).
- Reconnect: if a data center is selected and autopilot is off,
  `connect(...)`; otherwise register the `webshareNoOp` content script and
  call `connectToAutopilot(...)`. (`initializeWrappedStore()` in
  `src/state/webExtAdapter.ts` also registers `webshareNoOp`.)

File: `src/pages/background/eventHandlers/startupHandler.ts`.

### `proxyErrorHandler`

Wraps `handleProxyError` in a `lodash.throttle(..., 3000, { leading: true,
trailing: true })` — Chrome fires `onProxyError` dozens of times per second
during a bad connection, and we only want one reconnection attempt per
window.

Short-circuits on: offline, already-handled error, not currently connected,
reconnection already in flight.

File: `src/pages/background/eventHandlers/proxyErrorHandler.ts`.

### `authRequiredHandler`

Registered with `['asyncBlocking']` and `{ urls: ['<all_urls>'] }`. The
`asyncBlocking` mode is what allows the handler to return credentials
asynchronously via its `callback`.

```ts
if (!username || !password || details.statusCode !== 407) {
  callback({})    // decline; let the browser show its own auth prompt
} else {
  callback({
    authCredentials: { username: atob(username), password: atob(password) },
  })
}
```

Guards:

- **Only responds to HTTP 407**. All other auth challenges (HTTP 401 from
  origin servers, etc.) are intentionally declined — we're only here for
  the proxy.
- Credentials are pulled from `state.serverCredentials`, which is populated
  by the `FETCH_SERVER_CREDENTIALS` alias → `/ServerCredentials` API call.
- Stored base64-encoded, decoded at response time with `atob()`.

File: `src/pages/background/eventHandlers/authRequiredHandler.ts`.

### `alarmHandler`

Three alarms are scheduled in `main.ts`:

| Alarm name             | Cadence         | Work                                                    |
| ---------------------- | --------------- | ------------------------------------------------------- |
| `sessionPoller`        | every 5 min     | `store.dispatch(checkSessionStatus())` → refresh session|
| `notificationPoller`   | every 60 min    | `store.dispatch(fetchNotifications())`                  |
| `pruneLog`             | every 2 min     | `clearLogs()`: `trimLogs(THREE_DAYS_IN_MILLISECONDS)` deletes log entries older than three days |

The entry-count cap (`MAX_LOG_ENTRIES`) is enforced separately, in
`pushToDebugLog`.

File: `src/pages/background/eventHandlers/alarmHandler.ts`.

### `messageHandler`

The Windscribe-side `runtime.onMessage` listener. Has two synchronous paths
and one fire-and-forget:

```ts
return (message: any, sender: chrome.runtime.MessageSender): boolean => {
  // 1. Never intercept webext-redux's own messages (types starting with 'chromex.')
  if (message.type?.startsWith('chromex.')) return false

  // 2. fire-and-forget async handling for Windscribe `what` messages
  bgStore.then(async store => {
    if (message.what === 'applyRulesets' && message.from !== 'popup') {
      store.dispatch(setBlockLists(message.enabledRulesets))
    } else if (message.what === 'connectProxy') {
      await connect(store.getState, store.dispatch, message.hosts)
    } else if (message.what === 'disconnectProxy') {
      await disconnect(store.getState, store.dispatch)
    } else if (message.what === 'connectAutopilot') {
      await connectToAutopilot(store.getState, store.dispatch)
    } else if (message.what === 'fingerprintDetected') {
      // only from our own content scripts running in a tab
      if (sender.id !== chrome.runtime.id || !sender.tab) return
      const rawUrl = sender.tab.url ?? ''
      const url = rawUrl.length > 150 ? `${rawUrl.slice(0, 150)}…` : rawUrl
      pushToDebugLog({ message: `Fingerprint.js activity detected at: ${url}`, tag: 'contentScript' })
    } else if (message.what === 'networkChangeEvent') {
      // ...
      store.dispatch(setIsOnline(message.onlineStatus))
      if (message.onlineStatus) {
        setTimeout(() => store.dispatch({ type: `alias/${CHECK_CURRENT_IP}` }),
                   NETWORK_CHANGE_EVENT_DELAY_MS)
      }
    }
  })

  return false  // we don't use sendResponse
}
```

The crucial bit is the **synchronous `return false` for `chromex.*`
messages** — `webext-redux` expects those to not be handled by other
listeners. If you return `true` here (or omit the sync return) you'll deadlock
popup dispatches. This is the mirror image of the uBOL patch in
`32f91368` — both sides are narrowing their listeners.

File: `src/pages/background/eventHandlers/messageHandler.ts`.

### `ublockStatusChangeHandler`

`management.onEnabled` / `onDisabled` fire when any extension is toggled.
We watch for uBO / uBOL (standalone) being enabled because they collide
with our built-in uBOL. For an ID in `UBLOCK_LITE_EXTENSION_IDS`, the handler
sends an offscreen `applyBlockerSettings` message: with `[]` when there is
no session auth hash or the external extension was enabled, and with the
current `state.blocker.blockLists` when it was disabled.

File: `src/pages/background/eventHandlers/ublockStatusChangeHandler.ts`.

### Permissions handlers

`handlePermissionsAdded` / `handlePermissionsRemoved` update
`state.permissions` from the event payload: when it includes
`contentSettings` or `browsingData`, they dispatch `addPermissions` /
`removePermissions`. `handlePermissionsAdded` also closes the matching
permission overlay. For `contentSettings`, it applies or resets the
notification blocker. `chrome.permissions.getAll()` is called only once,
at startup in `main.ts`. The optional permissions are `contentSettings`
and `browsingData`.

File: `src/pages/background/eventHandlers/permissionsHandler.ts`.

### `handleKeyboardCommand`

Responds to the commands declared in the manifest:

| Command            | Default binding   | Effect                          |
| ------------------ | ----------------- | ------------------------------- |
| `toggle-proxy`     | (user-assigned)   | Connect/disconnect.             |
| `open-preferences` | (user-assigned)   | Open the Preferences view.      |
| `open-favourites`  | (user-assigned)   | Open Favourites.                |
| `open-locations`   | (user-assigned)   | Open Locations.                 |

`toggle-proxy` is throttled to `SHORTCUT_COMMAND_THROTTLE_MS` (1s) so mashing
the key doesn't queue duplicate connects. The other commands are not
throttled.

File: `src/services/shortcuts/keyboardCommandHandler.ts`.

### `contextMenus.onClicked`

Inline in `main.ts`:

```ts
chrome.contextMenus.onClicked.addListener(
  () => chrome.tabs.create({ url: 'debugLog.html' })
)
```

Opens the debug log page in a new tab. The menu item itself is added via
`services/contextMenu` during install.

---

## Error handling

`main.ts` wraps listener registration in a `try/catch` and pushes any
synchronous failure into the debug log. Errors inside the async `bgStore`
initialization (`initializeWrappedStore().then(...)`) are not caught by
this block, because the promise has no `.catch`.

---

## Lifecycle gotchas

1. **The SW is unloaded when idle.** Keep handlers stateless — rehydrate
   from the Redux store every time.
2. **Dynamically-registered content scripts survive SW restart** because
   they're registered with `persistAcrossSessions: true`. They do **not**
   survive an extension update, so `onInstalledHandler` re-registers them.
3. **Event listeners must be registered synchronously at top level.**
   Don't register inside an `async` block — Chrome evaluates the SW module
   and then only considers top-level-registered listeners for lifecycle
   events. Putting `addListener` inside an `await` means the event may
   not wake the SW.
4. **`webRequest.onAuthRequired` is `asyncBlocking`.** If you add other
   listeners to the same event, understand that only one handler can
   respond to a given challenge.

---

## See also

- [`state-management.md`](./state-management.md) — how `initializeWrappedStore`
  works.
- [`proxy-and-pac.md`](./proxy-and-pac.md) — the `connect` / `disconnect` /
  `handleProxyError` flow the handlers drive.
- [`offscreen-document.md`](./offscreen-document.md) — what
  `setupOffscreenDocument` does.
- [`ubo-lite-mirror.md`](./ubo-lite-mirror.md) — the mirror-image `onMessage`
  narrowing on uBOL's side.
