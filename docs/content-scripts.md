# Content scripts

The extension ships two kinds of content scripts: **static** ones checked
into the repo, and **generated** ones produced at build time. All of them
are registered dynamically at runtime (not in the manifest) via
`chrome.scripting.registerContentScripts`.

---

## Registration wrapper

All registration / unregistration goes through `src/utils/scriptController.ts`:

```ts
async function registerScript(
  scriptId: string,
  jsFileNames: string[],
  excludeDomains?: string[],
  world: 'MAIN' | 'ISOLATED' = 'MAIN',
) {
  // idempotent: unregister first if already present
  if ((await chrome.scripting.getRegisteredContentScripts({ ids: [scriptId] })).length > 0) {
    await unregisterScript(scriptId)
  }

  await chrome.scripting.registerContentScripts([{
    id: scriptId,
    world,
    runAt: 'document_start',
    persistAcrossSessions: true,
    js: jsFileNames,
    matches: ['<all_urls>'],
    allFrames: true,
    excludeMatches: [
      'https://chrome.google.com/webstore/category/extensions',
      ...(excludeDomains ?? []),
    ],
    matchOriginAsFallback: true,
  }])
}
```

Key knobs:

- `runAt: 'document_start'` — has to run before any page script can read
  `navigator.language`, `Date`, `Intl.DateTimeFormat`, etc.
- `world: 'MAIN'` (default) — scripts run in the page's own JS world so that
  monkey-patches are visible to page code.
- `persistAcrossSessions: true` — survives service-worker restarts, which is
  critical because the SW gets torn down constantly in MV3.
- `excludeMatches` always includes the Chrome Web Store to avoid breaking
  the extension listing page. User allowlist entries are appended at
  runtime.

Companion helpers: `unregisterScript`, `updateScript`, `getScriptForId`,
`toExcludeMatchesURL`, `doesBundleExistInBuild` (verifies that a given
generated bundle is actually in `build/` before registering — see the warps
below for why this matters).

---

## Static content scripts

Checked into `src/pages/contentScripts/` and listed explicitly in
`webpack.config.js`:

| File                                                    | Script ID                              | Purpose                                                   |
| ------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `workerBlock.ts`                                        | `workerBlockScript`                    | Neuters `new Worker(...)` to block worker-based trackers. |
| `webshareNoOp.ts`                                       | `webshareNoOpScript`                   | No-op `navigator.share` replacement for webshare anti-fp. |
| `antiFingerprinting/font.ts`                            | `fontAntiFingerprintingScript`         | Adds noise to `HTMLElement` `offsetWidth` / `offsetHeight`. |
| `antiFingerprinting/canvas.ts`                          | `canvasAntiFingerprintingScript`       | Adds noise to `HTMLCanvasElement.toDataURL`.              |
| `antiFingerprinting/screen.ts`                          | `screenResAntiFingerprintingScript`    | Spoofs `screen.width` / `screen.height`.                  |
| `antiFingerprinting/audio.ts`                           | `audioAntiFingerprintingScript`        | Adds noise to Audio API fingerprint vectors.              |
| `antiFingerprinting/fingerprintjs.ts`                   | `fingerprintjsAntiFingerprintingScript`| Breaks common fingerprintjs detection paths.              |
| `antiFingerprinting/fingerprintMessageListener.ts`      | `fingerprintMessageListenerScript`     | In-page listener for anti-fp messaging.                   |

All IDs are defined as string constants in `src/utils/constants.ts`
(`workerBlockScriptId`, etc.) and re-used everywhere so there's one place to
change them.

---

## Generated content scripts (the "warps")

These are **generated per build** by `scripts/embed*.js`. For each variant
(a user agent / data-center / location), a separate file is written (`.ts`
for split personality, location warp and language warp; `.js` for timezone
warp),
registered as a webpack entry, and bundled out to
`build/<sha>.bundle.js`.

See [`build-system.md`](./build-system.md#generated-content-scripts) for
the generator mechanics. This section covers **what each warp does at
runtime**.

### Split Personality

- Folder: `src/pages/contentScripts/splitPersonality/` (generated, one file
  per UA).
- Template: `scripts/buildUtils/templates/splitPersonalityContentScript.js`.
- Script ID: `splitPersonalityScript`.
- State slice: `src/state/slices/userAgent.ts` — **also regenerated each
  build**. Contains the pool of UAs to spoof.
- Trigger: `ACTIVATE_SPLIT_PERSONALITY` / `TOGGLE_SPLIT_PERSONALITY` alias
  (`src/state/aliases.ts`). On activation, `setRandomSpoofedUserAgent`
  picks a random UA from the pool. In compat mode the pool is limited to the
  same browser family, and the pick is never the currently spoofed UA. That
  UA is hashed (`SHA256(ua)`) and the corresponding bundle is registered.
- Effect: overrides `navigator.userAgent`, `navigator.userAgentData`, and
  related getters on the page's `window.navigator`.

### Location Warp

- Folder: `src/pages/contentScripts/locationWarp/` (generated, one file per
  data-center).
- Template: `scripts/buildUtils/templates/locationWarpContentScript.js`.
- Script ID: `locationWarpScript`.
- Filename: `SHA256(dataCenter.id.toString()) + 'lcw' + '.bundle.js'`.
- Trigger: registered from three places:
  - the Privacy page toggle (`src/views/Privacy/Privacy.tsx`, runs in the
    popup);
  - `src/services/proxyConfig/proxyConfig.ts::connect` after a successful
    connection;
  - `src/pages/background/eventHandlers/registerScripts.ts` on install or
    update.

  In each place, the current data-center's ID is hashed, and if
  `doesBundleExistInBuild(...)` returns true the script is registered; if
  not, `getNearestValidDataCenter` finds a fallback.
- Effect: overrides `navigator.geolocation.getCurrentPosition` /
  `watchPosition` to resolve with the data-center's GPS coordinates
  (stored at generate time from `serverList → groups[].gps`).

### Language Warp

- Folder: `src/pages/contentScripts/languageWarp/` (generated, one file per
  location).
- Template: `scripts/buildUtils/templates/languageWarpContentScript.js`.
- Script ID: `languageWarpScript`.
- Trigger: same `connect` flow as Location Warp, keyed on
  `currentLocation.id`.
- Effect (see `src/pages/content/languageWarp.ts`, which is the pre-warp
  reference implementation, similar to the per-location templates):

  ```ts
  Object.defineProperty(window.navigator, 'language', { value: locale, configurable: true })
  Object.defineProperty(window.navigator, 'languages', { value: [locale], configurable: true })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions
  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = locale
    return res
  }
  ```

### TimeZone Warp

- Folder: `src/pages/contentScripts/timeZoneWarp/` (generated).
- Template: `scripts/buildUtils/templates/timeZoneWarpContentScript.js`.
- Script ID: `timeZoneWarpScript`.
- Trigger: same `connect` flow, keyed on `currentLocation.id`.
- Effect: patches `Date.prototype.getTimezoneOffset`,
  `Intl.DateTimeFormat.prototype.resolvedOptions().timeZone`, etc., to
  report the VPN location's timezone.

---

## Registration flow (tying it together)

```
 user toggles Location Warp (Privacy.tsx, popup)
          │
          ├── dispatch(setLocationWarp(on))   state only; no middleware reacts
          │
          ├── if Autopilot is selected or there is no data center: stop
          │
          ├── on:  bundleName = SHA256(currentDataCenter.id) + 'lcw.bundle.js'
          │        if doesBundleExistInBuild(bundleName):
          │            registerScript(locationWarpScriptId, [bundleName], excludeList)
          │        else:
          │            nearest = getNearestValidDataCenter(...)
          │            registerScript(locationWarpScriptId, [SHA256(nearest)+'lcw.bundle.js'], excludeList)
          │
          └── off: unregisterScript(locationWarpScriptId)

 on every connect (src/services/proxyConfig/proxyConfig.ts::connect)
          │
          ├── unregisterScript(locationWarpScriptId), then the same
          │   bundle lookup + nearest-data-center fallback as above
          │
          └── languageWarpScriptId and timeZoneWarpScriptId: unregister, then
              registerScript directly (no doesBundleExistInBuild /
              getNearestValidDataCenter fallback)

 on install / update (eventHandlers/registerScripts.ts)
          │
          └── re-registers the enabled scripts, including Location Warp
```

On disconnect (`disconnect()` in the same file), all three warp IDs are
unregistered.

---

## Interaction with uBlock Origin Lite

uBOL's `scripting-manager.js` reconciles `chrome.scripting`-registered
scripts against its own desired set and unregisters anything it didn't
install. Windscribe's script IDs are in uBOL's allowlist (introduced in
`e8cf567c`, extended in `511e2fc3`, `f9a90a93` and `889c81a0`) so they
survive.

**When you add a new dynamically-registered script, you must add its ID to
the `windscribeContentScriptIds` list in
`ubo-lite-mirror/chromium/js/scripting-manager.js`**. See
[`ubo-lite-mirror.md`](./ubo-lite-mirror.md) for how to merge that safely.

---

## See also

- [`build-system.md`](./build-system.md) — how the generators work.
- [`proxy-and-pac.md`](./proxy-and-pac.md) — where `connect` fires the
  warp registrations.
- [`ubo-lite-mirror.md`](./ubo-lite-mirror.md): the script-ID
  allowlist.
- [`gotchas.md`](./gotchas.md) — "adding a content script" quick-reference.
