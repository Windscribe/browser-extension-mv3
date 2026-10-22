# Gotchas

Landmines in one place. If you only read one doc, read this one.

---

## Build

### The warps are build-time generated

Location / language / timezone warps and split-personality content scripts
are **generated per build** by `scripts/embed*.js`. You cannot:

- hand-add a warp script to `webpack.config.js`'s `entry`,
- edit `src/pages/contentScripts/{locationWarp,languageWarp,timeZoneWarp,
  splitPersonality}/<hash>.ts` by hand — those get wiped on every build,
- edit `src/state/slices/userAgent.ts` by hand — it gets rewritten on every
  build.

Change the **templates** at `scripts/buildUtils/templates/*.js` instead.

See [`build-system.md`](./build-system.md).

### `yarn build` logs into Windscribe

If your `BUILD_USER_NAME` / `BUILD_USER_PASSWORD` in `.env` are wrong,
`scripts/login.js` throws early and no bundle is produced. 2FA must be off
on that account.

### The submodule must exist

`webpack.config.js` imports from `ubo-lite-mirror/chromium/manifest.json`
at config load time. If you forgot `--recurse-submodules`, the build fails
with a confusing `require` error. Fix: `git submodule update --init --recursive`.

### Version must match

`src/manifest.json::version` and `package.json::version` both need to say
the same thing. Nothing enforces this — bump together.

---

## uBlock Origin Lite submodule

### Don't `git submodule update` blindly

The submodule carries Windscribe-specific patches (see the table in
`ubo-lite-mirror.md`). Bumping it risks
losing any of them. Read
[`ubo-lite-mirror.md`](./ubo-lite-mirror.md) — specifically the
**merge-from-upstream checklist** — before you even think about it.

### Adding a content script? Update the uBOL allowlists

Dynamically-registered content scripts that aren't in uBOL's
`windscribeContentScriptIds` allowlist get silently unregistered by uBOL's
reconciler. Add the script ID to the `windscribeContentScriptIds` list in
`ubo-lite-mirror/chromium/js/scripting-manager.js`.

### uBOL's `onMessage` allowlist is manually maintained

Commit `32f91368` narrowed uBOL's `runtime.onMessage` listener to a fixed
`casesToUse` Set of RPC names (52 at `889c81a0`). If upstream adds a new `request.what`
name that you don't add to the Set, the feature silently breaks inside
Windscribe's build. Re-check on every submodule bump.

### Upstream-reformat collisions

`e37c7d12` and `26b150d4` reformatted two scriptlet files wholesale to pass
CWS review. The upstream restructure to `scriptlet/{isolated,main}/`
(brought in by `889c81a0`) removed both files. After each bump, if CWS
flags a scriptlet, take upstream's *content*, then Prettier-reformat it.

### `web_accessible_resources` in our manifest must match uBOL's

The `web_accessible_resources` array in `src/manifest.json` contains
uBOL's resources (`strictblock.html`, `picker-ui.html`,
`unpicker-ui.html`, `zapper-ui.html`, `web_accessible_resources/noop.js`,
every surrogate script, etc.). They ship from the submodule but the
declarations live in our manifest. **If they drift from upstream's
manifest, affected uBOL features silently break** — strict-block pages
fail to render, surrogate scripts fail to inject, picker UI fails to
open.

On every submodule bump, diff
`ubo-lite-mirror/chromium/manifest.json::web_accessible_resources`
against `src/manifest.json::web_accessible_resources` and mirror any
additions / renames / removals. See
[`ubo-lite-mirror.md#web_accessible_resources`](./ubo-lite-mirror.md#web_accessible_resources).

---

## MV3 service worker lifecycle

### The SW dies when idle

Don't hold in-memory state in closures. Always read from the Redux store.
Always re-register things on `onStartup` / `onInstalled`.

### Dynamically-registered content scripts don't survive updates

`chrome.scripting.registerContentScripts` entries are wiped on every
extension update. `onInstalledHandler` re-registers them. If you add a new
script and forget to wire it into `registerScripts`, it'll work on fresh
installs but disappear after the next auto-update.

### Listeners must register synchronously at top level

Registering `chrome.*.addListener` inside an `async` block means the event
can't wake the SW. Do it at the top of `src/pages/background/main.ts`.

### `runtime.onMessage` must return synchronously

Windscribe's `messageHandler` returns `false` **synchronously** for
`chromex.*` messages (webext-redux's). If you accidentally return `true` or
an unresolved Promise, popup dispatches deadlock because webext-redux is
waiting for `sendResponse` that will never come. Same mirror-image patch
is applied on the uBOL side — see `32f91368` (gating) and `f629a91a`
(explicit `return false`).

---

## Proxy / PAC

### PAC script has debug `alert()`s

`src/services/proxyConfig/proxyConfig.ts::createFindProxyForURLFunction`
contains:

```js
alert('proxy url: ' + url)
alert('host: ' + host)
// ...
alert('Should not proxy')
alert('<host list>')
```

PAC `alert()` output is network-level only: it appears only in Chrome's
network log export (`chrome://net-export`), not in DevTools, and the user
never sees an alert. They are not gated on `NODE_ENV` and ship in production builds.
This is accepted. It is not a security issue.

### `webRequest.onAuthRequired` is 407-only

`authRequiredHandler` only responds when `details.statusCode === 407`.
Origin-server 401 challenges fall through to Chrome's native prompt — that's
on purpose. Don't loosen the check.

### `webRequestAuthProvider` permission is required

Without it, `callback({ authCredentials })` in an `asyncBlocking` handler
is silently ignored. Manifest needs both `webRequest` and
`webRequestAuthProvider`.

### PAC allowlist must include Windscribe's domains

If `api.windscribe.com` isn't in the PAC's allowlist, the extension can't
reach its own backend while connected (proxy-through-proxy). Already
hardcoded; don't remove. The current `workingApi` domain also gets added at
connect time (skipped only for the exact values `'.windscribe.com'` and
`'totallyacdn.com'`).

### Workers survive shuffled hosts

`disconnect()` shuffles the current data-center's hosts for IP diversity,
so the same sequence isn't repeated on the next connect. If you're
debugging "why did I get a different IP?" — that's why.

---

## State management

### Dispatch is async from the popup

`webext-redux` round-trips every dispatch through `chrome.runtime` —
always `await`:

```ts
await dispatch(increment())
```

If you don't, race conditions follow.

### Don't import `store` from a component

```ts
// BAD
import store from 'state/store'
store.dispatch(increment())
```

That bypasses the `webext-redux` bridge entirely; state mutations won't
propagate. Use `useDispatch` / `useDispatchAlias` from `src/state/hooks.ts`.

### Aliases, not direct thunks, for cross-context async

If a thunk needs to run in the background but is triggered from the popup,
route it through `src/state/aliases.ts` and `useDispatchAlias`. Thunks
fired directly from the popup run in the popup's context, which dies as
soon as the popup closes.

### State must be structured-clone-able

No functions, no DOM nodes, no class instances with prototype chains. All
state round-trips through `chrome.runtime.sendMessage`, which serialises
via the structured clone algorithm.

### Selectors should be narrow

Broad `useSelector(s => s.session)` triggers re-renders on *any* change
under `session`. Reach for the specific field you need.

---

## Styling — Theme-UI (Mantine is planned)

Direction is Mantine. Once adopted, new components will be in Mantine, old components stay
Theme-UI until someone migrates them.

### Don't mix them in one component

If a component is Theme-UI, keep it Theme-UI until you migrate it
wholesale. Half-migrated components (some `sx` prop, some `style` prop)
are a pain to reason about.

### Theme-UI shorthand → real CSS property (when migrating)

`py`, `px`, `mx`, `my`, `bg`, etc. are Theme-UI inventions. Mantine
doesn't understand them. Spell them out as `paddingTop` +
`paddingBottom`, `backgroundColor`, etc.

### Responsive arrays don't work in Mantine `style`

`pb: ['1.4rem', '1.1rem']` in Theme-UI compiles to a media query at a
breakpoint. Mantine's `style` prop doesn't accept arrays — use a CSS
module with a real `@media` rule.

See [`styling.md`](./styling.md).

---

## Testing

### Tests are headful

Puppeteer launches a real Chromium window. Don't type / click elsewhere
while tests are running — focus steals cause flaky runs.

### Tests require a built extension

Run `yarn build` before `yarn test`. The test harness loads
`./build` as an unpacked extension.

### Use `data-testid`, not classes

Theme-UI and Mantine generate auto-class names that aren't stable. Always
add a `data-testid="…"` to components under test.

### 2FA must be off on test accounts

The build flow and some scenarios can't handle 2FA. Use a Pro-upgraded
staging account with 2FA disabled.

---

## Debugging

### Where to find each context's DevTools

Open `chrome://extensions`, enable **Developer mode**, find the
Windscribe card. Each runtime context that's alive shows up under
**Inspect views** as a clickable link:

- `service worker`: background SW console. This is where `console.log`
  from the SW appears, and where you run `chrome.storage.local.get(...)`
  manually.
- `offscreenHub.html` — offscreen document. Has its own console and
  Application panel; the `checkIp` Web Worker shows up here too.
- Popup: right-click the popup → **Inspect** (the popup has to be open).
- Debug log page: right-click the extension icon → **View Debug Log**,
  then inspect that tab normally.
- Content scripts: open DevTools on any affected page, filter the
  Console dropdown by the extension's origin.

If a context isn't listed under Inspect views, it hasn't woken up yet —
interact with the extension to spin it up (open the popup, connect,
navigate to a proxied page).

### Debug log

Right-click the extension icon → **View Debug Log**. Filterable by tag
and level. Underneath it's a Dexie (IndexedDB) table named `logs`;
accessible from the service worker's DevTools → Application → IndexedDB
if the UI itself is broken.

Prefer `pushToDebugLog(...)` from `services/debugLog` over `console.log`
— logs go in the ring buffer, and the user can export them via
`/Report/applog`.

---

## General

### Don't commit generated files

- `src/pages/contentScripts/splitPersonality/<hash>.ts`
- `src/pages/contentScripts/locationWarp/<hash>.ts`
- `src/pages/contentScripts/languageWarp/<hash>.ts`
- `src/pages/contentScripts/timeZoneWarp/<hash>.js`

All rewritten on every build. Only the `.gitkeep` file in each folder is
tracked (see `.gitignore`).

`src/state/slices/userAgent.ts` is also rewritten on every build, by
`scripts/embedUserAgentsSplitPersonality.js`. Don't hand-edit it. Unlike the
warp files it is tracked by git, so it shows up as changed when the
user-agent list changes.

### `build.zip` shouldn't be committed either

Occasionally `build.zip` shows up in the working tree. It's the packaged
extension, don't commit it.

### `.env` and `.env.local` must stay out of git

Both are in `.gitignore` and hold your personal credentials. Don't
force-add them.

---

## See also

- [`ubo-lite-mirror.md`](./ubo-lite-mirror.md) — the longest section, because
  the submodule is the biggest landmine.
- [`security.md`](./security.md): secrets, `.env`, and security notes.
- [`../AGENTS.md`](../AGENTS.md) — same landmines, summarised for AI agents.
