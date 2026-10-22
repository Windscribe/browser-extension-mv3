# Proxy and PAC script

The VPN is delivered as an HTTP(S) proxy configured via
`chrome.proxy.settings.set` with a dynamically generated PAC
(Proxy Auto-Config) script. Proxy auth is done through
`webRequest.onAuthRequired`.

---

## The connection surface

Four entry points in `src/services/proxyConfig/proxyConfig.ts`:

| Function                  | When called                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `connect(getState, dispatch, hosts, silent?)` | User selects a specific location, or `startupHandler` reconnects after SW restart. |
| `connectToAutopilot(...)` | User selects "Autopilot" (best-location) mode.                  |
| `disconnect(...)`         | User disconnects, connection fails, or the account ran out of data. |
| `handleProxyError(...)`   | Called by `proxyErrorHandler` to retry / fail over.             |

All four funnel through `chrome.proxy.settings.set` with either a generated
PAC script or `mode: 'direct'`.

---

## The PAC script

`createFindProxyForURLFunction` builds a string like this (simplified):

```js
function FindProxyForURL(url, host) {
  alert('proxy url: ' + url)      // debug — see "Gotchas"
  alert('host: ' + host)

  const userAllowlist = ["*://github.com/*", ...]   // from state.allowlist
  const lanIps = /^(127|10|192\.168|172\.1[6-9]|172\.2\d|172\.3[01])\..../

  const allowlist = [
    '*://api-staging.windscribe.com/*',
    '*://api.windscribe.com/*',
    '*://assets.windscribe.com/*',
    '*://*.staticnetcontent.com/*',
    '*://api.totallyacdn.com/*',
    '*://assets.totallyacdn.com/*',
    'https://windscribe.com/installed/*',
    // plus api.<workingApi>/*, assets.<workingApi>/*  unless workingApi is exactly '.windscribe.com' or 'totallyacdn.com'
  ].concat(userAllowlist)

  const shouldNotProxy = [
    ['http', 'ftp', 'ws'].every(p => !url.startsWith(p)),
    isPlainHostName(host),
    lanIps.test(host),
    allowlist.some(pattern => shExpMatch(url, pattern)),
  ].some(_ => _)

  if (shouldNotProxy) return 'DIRECT'

  // Cruise Control: per-domain routing when Autopilot is on
  if ([...].some(d => shExpMatch(url, d))) return 'HTTPS host_for_domain_A:443'
  if ([...].some(d => shExpMatch(url, d))) return 'HTTPS host_for_domain_B:443'
  // ...

  return 'HTTPS host1:443; HTTPS host2:443; HTTPS host3:443'
}
```

### Key properties

1. **Windscribe's own API always bypasses the proxy.** If we proxied
   `api.windscribe.com` through ourselves we'd have a chicken-and-egg
   problem on reconnects. Same for `assets.*` and the "installed" pages.
2. **Dynamic API fallback is baked in.** `state.workingApi` (set by the
   3-tier failover in `sendRequest`, see [`api.md`](./api.md)) is also
   allowlisted in the PAC, so reconnects don't proxy through a proxy. The
   check skips only the exact values `'.windscribe.com'` and
   `'totallyacdn.com'`. Because of the leading dot, `windscribe.com` itself
   is added too, which duplicates the hardcoded entries.
3. **LAN / loopback / plain hostnames go direct.** Regex covers
   10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8.
4. **`DIRECT` for non-standard schemes.** Only URLs that start with
   `http`, `ftp`, or `ws` are proxied (a `startsWith` prefix check, so
   `https://` and `wss://` are proxied too). Everything else (`chrome-extension://`, `data://`,
   etc.) goes direct — Chrome's PAC engine exposes the full scheme prefix
   on `url`.
5. **Host list is semicolon-separated.** Chrome tries each in order; if
   the first times out it falls back to the next. This is how Windscribe's
   "failover hosts" from the server list get used.
6. **Cruise Control overrides.** When Autopilot is on, specific domains
   route to specific data centers (e.g. Netflix US goes through a US
   exit) before the general host list.

### Allowlist / exclude-matches

Two different allowlists exist at different layers:

- **User allowlist** (`state.allowlist`) — sites the user has excluded from
  the VPN. Embedded in the PAC at build-connect time via
  `reduceAllowlist(state)`, and **also** fed to
  `registerScript(..., excludeMatches)` when registering warps so those
  content scripts don't run on allowlisted sites. `transformAllowListToExcludeMatches`
  in `src/utils/transformAllowListToExcludeMatches.ts` does the translation.

- **Hardcoded allowlist** — Windscribe's own domains plus the current
  `workingApi` domain. Baked into every PAC.

---

## `connect()` in detail

`src/services/proxyConfig/proxyConfig.ts::connect`:

1. **Bail if status is `disconnecting`** or if we're offline.
2. **Check data quota.** If the account is free and has no data left, or
   the session status is `EXPIRED`, push an `addOverlay('noData')` and throw.
3. **Check for competing extensions.** If `chrome.proxy.settings.get(...).levelOfControl`
   is `controlled_by_other_extensions`, push `addOverlay('extensionConflict')`
   and throw. A second VPN extension always wins unless the user picks one.
4. **Validate hosts.** If no hosts were passed (or the list is empty),
   throw.
5. **Assemble config:**

   ```ts
   const config = {
     mode: 'pac_script',
     pacScript: {
       data: createFindProxyForURLFunction(
         hosts, allowlist, proxyPort, cruiseControlList, workingApi
       ),
       mandatory: true,   // no fallback to direct if the PAC fails
     },
   }
   chrome.proxy.settings.set({ value: config, scope: 'regular' })
   ```

6. **Check IP.** If it returns `NO_IP` while online, call
   `handleProxyError`. Otherwise reset reconnection attempts to 0, **set
   status to `on`**, and create a system notification.
7. **Register warps.** After a successful connect, the same function
   calls `unregisterScript` / `registerScript` (from
   `utils/scriptController`) for language /
   location / timezone warps, keyed off the current data-center / location.
   See [`content-scripts.md`](./content-scripts.md).

## `disconnect()` in detail

1. Set status to `disconnecting`.
2. `chrome.proxy.settings.set({ value: { mode: 'direct', rules: {} } })`.
3. Set status to `off` immediately (don't wait for `checkIp`).
4. **Shuffle the current data-center's hosts** so the next connect doesn't
   always hit the same host first.
5. `checkIp()` to confirm we're actually direct again.
6. **Unregister all three warps.**

## `handleProxyError()` — reconnection logic

`RECONNECTION_ATTEMPTS_LIMIT = 2`.

1. **Attempt 1 + 2:** retry the current data center's hosts silently.
2. **Attempt 3** depends on `connection.failover`:
   - `'Auto / Best'` → fall back to Autopilot.
   - `'Same Country'` → pick another data center from
     `currentLocation.groups` (the data centers in the current location),
     **respecting the user's plan** (free users skip `pro: 1` DCs, Pro
     users see all). If no eligible DC remains in that location (e.g. free
     user where every other DC there is Pro), fall through to
     Autopilot **before** smokewall instead of stranding the user.
3. **If still failing:** either activate `smokeWall` (stay "connected" but
   surface an error) or disconnect and show the `somethingWeird` overlay.

Throttling: `proxyErrorHandler` wraps this in `lodash.throttle` with a
3-second window. See
[`background-service-worker.md`](./background-service-worker.md#proxyerrorhandler).

---

## Proxy auth (HTTP 407)

Chrome fires `webRequest.onAuthRequired` whenever a proxy returns 407 (it
also fires for origin-server 401, which we ignore). Handler:
`src/pages/background/eventHandlers/authRequiredHandler.ts`.

- Registered with `{ urls: ['<all_urls>'] }, ['asyncBlocking']` — the
  `asyncBlocking` mode permits the handler to call `callback()`
  asynchronously.
- Only responds when `details.statusCode === 407`. All other challenges get
  an empty `callback({})`, letting Chrome's native prompt take over.
- Credentials come from `state.serverCredentials`. They are stored as
  received from the `ServerCredentials` API (already base64) and decoded
  with `atob()` at response time.
- The request required to populate `serverCredentials` is the
  `FETCH_SERVER_CREDENTIALS` alias. It is dispatched by `registerScripts`
  (on install or update) and by the popup's `useInitialDataFetching` hook
  when a session exists but credentials are missing.

Manifest permissions required for this to work:

```json
"permissions": [
  "webRequest",
  "webRequestAuthProvider"
]
```

`webRequestAuthProvider` is specifically needed in MV3 to use `asyncBlocking`
for auth; without it, `callback({ authCredentials })` is silently dropped.

---

## Debug `alert()`s in the PAC

The generated PAC contains raw `alert(...)` calls:

```js
alert('proxy url: ' + url)
alert('host: ' + host)
// ...
alert('Should not proxy')
alert('<host list>')
return '<host list>'
```

These are debug output. Their output is network-level only: it appears only
in Chrome's network log export (`chrome://net-export`), not in DevTools, and
the user never sees an alert. They are not gated on `NODE_ENV` and ship in
production builds. This is accepted. It is not a security issue.

---

## `checkIp()` — "am I actually proxied?"

After connect / disconnect, `checkIp()` resolves to the current
public IP, or `'---.---.---.---'` (`NO_IP`) if every check failed.

Mechanism (`src/services/proxyAuth/checkIp.ts`):

1. Send a message to the offscreen document: `{ target: 'offscreen', type:
   'fireNoSSLRequest' }`.
2. The offscreen document dispatches to a Web Worker
   (`checkIp.worker.js`) which makes a `fetch('https://nosslscribe.com')`
   probe.
3. Fetch `https://checkip.<domain>` for each domain below, in order, and
   stop at the first response that is an IP address. Each step has its own
   3-second timeout.
   1. `ENVS.API_URL` (`windscribe.com` in production).
   2. `CHECKIP_BACKUP_DOMAIN` (`cdn8088.com`).
   3. The Dynamic API domain from the DoH TXT lookup of `ENVS.DOH_URL`
      (`fetchDoh` in `src/api/doh.ts`). The lookup also has a 3-second
      timeout.
4. Return the IP, or `NO_IP` if all three fail.

The order does not depend on `state.workingApi`. `CHECKIP_BACKUP_DOMAIN`
is for check IP only: the API and assets backup is still
`ENVS.BACKUP_API_URL`.

The check IP hosts are **not** in the PAC allowlist. While connected,
the check must go through the proxy so it returns the proxy's IP.

See [`offscreen-document.md`](./offscreen-document.md) for the offscreen
side.

---

## Proxy port

`state.proxyPort` defaults to 443 (overridable via `PROXY_PORT` env at
build time, see `src/utils/constants.ts::PROXY_PORT`). The port is embedded
in every `HTTPS host:port` entry in the PAC output. Users can change the
port from Preferences.

---

## See also

- [`background-service-worker.md`](./background-service-worker.md) — the
  listeners that call into this module.
- [`content-scripts.md`](./content-scripts.md) — why `connect` also
  registers warps.
- [`api.md`](./api.md) — how `state.workingApi` gets set and why it matters
  for the PAC allowlist.
- [`offscreen-document.md`](./offscreen-document.md) — the `checkIp` path.
