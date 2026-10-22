# Offscreen document

MV3 service workers are stateless and can't run a DOM. Anything that
requires the DOM, a persistent `Worker`, or networking that the SW can't
handle cleanly is routed through a single offscreen document.

---

## Why offscreen

Examples of things that don't work in an MV3 SW but do work in an offscreen
document:

- `new Worker(...)` — the SW itself isn't a valid worker owner in the way
  older background pages were. Creating a worker with long-lived state from
  the SW is unreliable.
- The `fireNoSSLRequest` probe, an HTTPS `fetch('https://nosslscribe.com')`
  that runs in the `checkIp` Web Worker, so the point above applies.
- `window.addEventListener('online' | 'offline', ...)` — the SW has
  `self.onLine` via `navigator.onLine` but the `online` / `offline` events
  aren't reliably delivered.
- Using old `theme-ui` / DOM APIs during migration work.

---

## The hub document

One document for everything, so we don't hit Chrome's
"only one offscreen document per extension" restriction:

- **HTML:** `src/services/offscreenActions/offscreenHub.html` (produced by
  `HtmlWebpackPlugin` from that source).
- **Script:** `src/services/offscreenActions/offscreenHub.ts`
  (entry `offscreenHub` in `webpack.config.js`).
- **Reason:** registered with `chrome.offscreen.Reason.IFRAME_SCRIPTING` from
  `startupHandler` and from `initializeWrappedStore()` in
  `src/state/webExtAdapter.ts`.

Setup goes through `services/offscreenActions/offscreenController.ts`
(function `setupOffscreenDocument`) which calls
`chrome.offscreen.createDocument(...)` if one doesn't already exist.

---

## Message protocol

The hub listens on `chrome.runtime.onMessage` and filters by
`message.target === 'offscreen'`:

```ts
chrome.runtime.onMessage.addListener(handleMessages)

function handleMessages(message, _sender, sendResponse) {
  if (message.target !== 'offscreen') return false

  switch (message.type) {
    case 'migrateTheme':          /* ... */ break
    case 'migrateBlockerSettings':
    case 'applyBlockerSettings':  /* ... */ break
    case 'migrateAllowlist':      /* ... */ break
    case 'fireNoSSLRequest':      /* ... */ break
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`)
  }
  return true   // keep the channel open for async sendResponse
}
```

### Handlers

| `message.type`          | What it does                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `migrateTheme`          | Reads the MV2 theme from Dexie (`WS_STATE` table), writes it to `localStorage` key `theme-ui-color-mode`, and returns log items. Called during V2→V3 migration. |
| `migrateBlockerSettings` | Takes `data: string[]` of ruleset IDs and calls `sendApplyRulesSetMessageToUblock(rulesets)` which posts to uBOL. |
| `applyBlockerSettings`  | Same as above; used at runtime to tell uBOL which rulesets to enable.                                |
| `migrateAllowlist`      | Takes `data: CombinedAllowlistItem[]` and posts `setFilteringMode` messages to uBOL.                 |
| `fireNoSSLRequest`      | Posts `'nossl_call'` to the `checkIp` Web Worker, which fetches `https://nosslscribe.com`, and relays the response back. |

The `return true` at the bottom of `handleMessages` keeps the port open so
the async `.then(() => sendResponse(...))` bodies can resolve. This matches
the pattern described in the Chromium bug at
[issuetracker.google.com/314359857](https://issuetracker.google.com/issues/314359857?pli=1).

---

## The `checkIp.worker.js` Web Worker

File: `src/services/offscreenActions/checkIp.worker.js` (plain JS, copied
as-is into `build/checkIp.worker.js` by `CopyWebpackPlugin`; it is not a
webpack entry).

Constructed once when the hub loads:

```ts
const worker = new Worker('./checkIp.worker.js')

async function sendMessageToWorker(worker: Worker, message: string) {
  return new Promise((resolve, reject) => {
    function handleMessage(event: MessageEvent<string>) {
      resolve(event.data)
      worker.removeEventListener('message', handleMessage)
    }

    function handleError(error: ErrorEvent) {
      reject(error)
      worker.removeEventListener('error', handleError)
    }

    worker.addEventListener('message', handleMessage)
    worker.addEventListener('error', handleError)

    worker.postMessage(message)
  })
}
```

The worker is kept alive as long as the offscreen document is — which is
effectively the lifetime of the SW's "awake" period. `fireNoSSLRequest`
piggy-backs on the same worker across calls.

See [`proxy-and-pac.md`](./proxy-and-pac.md#checkip--am-i-actually-proxied)
for the full `checkIp` flow.

---

## Online/offline detection

The hub also listens for network changes and forwards them to the SW:

```ts
window.addEventListener('online',  () => onNetworkChange(true))
window.addEventListener('offline', () => onNetworkChange(false))

const onNetworkChange = (onlineStatus: boolean) => {
  chrome.runtime.sendMessage({
    what: 'networkChangeEvent',
    onlineStatus,
  })
}
```

Picked up by `messageHandler` in the background (see
[`background-service-worker.md`](./background-service-worker.md#messagehandler)),
which updates `state.isOnline` and — if we came back online — kicks off
`CHECK_CURRENT_IP` after a short delay (WiFi association race).

---

## When to add a new offscreen handler

Prefer the SW for everything unless you hit one of these:

- You need a DOM (e.g. to `querySelector` into an offscreen iframe).
- You need a long-lived `Worker`.
- You need a network probe run from a Web Worker, like `fireNoSSLRequest`
  (HTTPS `fetch` to `https://nosslscribe.com`).

Otherwise: don't. The offscreen document adds a cross-context message hop
and a fresh surface to keep in sync.

If you do need to extend the hub:

1. Add a new `case` in `handleMessages` in `offscreenHub.ts`.
2. Add the message type to the `MessageTypes` union in `src/api/types.ts`.
3. From the SW, `chrome.runtime.sendMessage({ target: 'offscreen', type: '<your-type>', data })`.
4. If the handler uses a new worker, add the JS file to the
   `CopyWebpackPlugin` patterns so it ends up in `build/`.

---

## See also

- [`background-service-worker.md`](./background-service-worker.md) — where
  `setupOffscreenDocument` is called and how messages round-trip.
- [`proxy-and-pac.md`](./proxy-and-pac.md) — `checkIp` flow.
- [`ubo-lite-mirror.md`](./ubo-lite-mirror.md) — the uBOL message handler
  that `applyBlockerSettings` / `migrateAllowlist` talk to.
