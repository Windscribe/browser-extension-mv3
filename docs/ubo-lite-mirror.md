# `ubo-lite-mirror` — vendored uBlock Origin Lite with Windscribe patches

**Read this before doing anything inside `ubo-lite-mirror/`, including
`git submodule update`.**

---

## What it is

[uBlock Origin Lite](https://github.com/uBlockOrigin/uBOL-home) is a
declarativeNetRequest-based ad/tracker blocker. We vendor it as a submodule:

```
# .gitmodules
[submodule "ubo-lite-mirror"]
    path = ubo-lite-mirror
    url  = git@gitlab.int.windscribe.com:ws/client/client-libs/ubo-lite-mirror.git
```

The submodule points at our own mirror on the internal GitLab, not at the
upstream GitHub repo, so that we can land Windscribe-specific patches without
maintaining a fork on GitHub.

At build time, `webpack.config.js` copies `ubo-lite-mirror/chromium/**` into
`build/` (minus `manifest.json` and `log.txt`), and `src/backgroundScripts.js`
imports `./js/background.js` (i.e. uBOL's background module) alongside the
extension's own `background.bundle.js`.

---

## `web_accessible_resources`

`src/manifest.json`'s `web_accessible_resources` array contains entries
that look like Windscribe's but are actually uBOL's — `strictblock.html`,
`zapper-ui.html`, `picker-ui.html`, `unpicker-ui.html`, and the entire
`web_accessible_resources/*` block (`noop.js`, `googletagservices_gpt.js`,
`amazon_apstag.js`, all the surrogate scripts).

These files ship from the submodule (copied into `build/` by
`CopyWebpackPlugin`) but **must be declared in our `src/manifest.json`
with exactly the paths uBOL expects**. uBOL's runtime uses
`chrome.runtime.getURL(...)` to load them; if the path isn't declared
`web_accessible`, Chrome refuses the request and the affected uBOL
feature silently breaks (strict-block page fails to render, surrogate
scripts fail to inject, picker UI fails to open).

**When you bump the submodule**, compare upstream's
`ubo-lite-mirror/chromium/manifest.json::web_accessible_resources`
against `src/manifest.json::web_accessible_resources` and mirror any
additions / renames / removals. Our copy-webpack step explicitly skips
copying uBOL's manifest (`ignore: ['**/manifest.json']`), so the two
files drift independently and there's no automation catching it.

---

## Why we fork

Upstream uBOL assumes it owns the extension — the browser action icon, the
`runtime.onMessage` channel, `chrome.scripting.registerContentScripts`, etc.
In Windscribe's extension it does not. The patches below keep uBOL's blocking
behaviour while preventing it from stomping on Windscribe-owned surfaces.

---

## The patches, newest first

All commits are on the `wsextension` branch of the mirror. The submodule
is pinned at `889c81a0`.

| SHA        | Title                                                              | Type       | Merge risk |
| ---------- | ------------------------------------------------------------------ | ---------- | ---------- |
| `889c81a0` | update ublock (merge of upstream; current HEAD)                    | Merge      | —          |
| `f629a91a` | explicit `return false` due to new message passing (Chromium v144) | Behavior   | Trivial    |
| `26b150d4` | remove obfuscated `window.atob` call                               | Cosmetic   | Obsolete   |
| `103699dc` | don't change extension icon                                        | Behavior   | Low        |
| `59f9d8eb` | remove console log                                                 | Cosmetic   | Trivial    |
| `f9a90a93` | add `webshareNoOpScript` to Windscribe content-script id list      | Data       | Trivial    |
| `32f91368` | fix message handler interfering with webext-redux                  | Behavior   | **High**   |
| `e37c7d12` | remove supposed obfuscated code to pass CWS review                 | Cosmetic   | Obsolete   |
| `511e2fc3` | leave out anti-fingerprinting scripts in advance                   | Data       | Trivial    |
| `e8cf567c` | don't touch WS scripts                                             | Behavior   | Low        |
| `8c49094f` | use correct attribution (`UBO_LITE_NAME` / `UBO_LITE_VERSION`)     | Behavior   | Low        |
| `ccdbcc0b` | remove options page open instances                                 | Behavior   | Low        |
| `479b36ec` | update ublock to work with the extension                           | Behavior   | Low        |

Two earlier merges of upstream (`38e84f41`, `88c4af24`) are not listed.

### `889c81a0` — update ublock (current HEAD)

Merge of upstream uBOL into `wsextension`. It changed several patched
areas:

- **`chromium/js/background.js`:** upstream's `onMessage(request, sender)`
  now returns a promise. The Windscribe listener was rewritten to match:

  ```js
  runtime.onMessage.addListener((request, sender, callback) => {
      if ( request?.what && casesToUse.has(request.what) ) {
          onMessage(request, sender).then(callback);
          return true;
      }
      return false;
  });
  ```

  `casesToUse` grew from 32 to 52 names.
- **`chromium/js/scripting-manager.js`:** the reconciler is now
  `registerContentScripts`, and `windscribeContentScriptIds` filters the
  `toRemove` list. `fingerprintMessageListenerScript` was added to the list.
- **Scriptlets:** upstream moved scriptlets to
  `chromium/rulesets/scripting/scriptlet/{isolated,main}/`. The two files
  reformatted in `e37c7d12` and `26b150d4` no longer exist.
- **`dnr.setExtensionActionOptions`:** the two calls that `479b36ec`
  commented out in `background.js` are active again. No badge shows,
  because `showBlockedCount` is still `false` in `config.js`.

### `f629a91a` — explicit `return false` (Chromium 144)

File: `chromium/js/background.js`.

Chromium 144 changed `runtime.onMessage` semantics: a listener that returns
`undefined` (implicit fall-through) no longer implicitly releases the port.
This one-liner makes the fall-through explicit in the handler introduced by
`32f91368`:

```diff
-  // otherwise do nothing
+  // Explicitly tell the browser we're not handling this message
+  return false
```

Without this, webext-redux messages could be left waiting for a
`sendResponse` that would never come. The listener was rewritten in
`889c81a0`, and the `return false` is still there.

### `26b150d4` — remove obfuscated `window.atob` call

File: `chromium/rulesets/scripting/scriptlet/ublock-filters.trusted-replace-node-text.js`
(+1162 / -374). **This file no longer exists** (removed by the upstream
scriptlet restructure brought in by `889c81a0`).

Cosmetic reformat. The Chrome Web Store reviewer was flagging a minified
line inside this scriptlet as "obfuscated code"; a Prettier-style pass
broke it up onto multiple lines. **No behavioral change.**

### `103699dc` — don't change extension icon

Files: `chromium/js/action.js`, `chromium/js/config.js`.

Every call that mutates the toolbar icon is commented out, and the
`showBlockedCount` default is flipped to `false`:

```diff
 function disableToolbarIcon(tabId) { ...
-    browser.action.setIcon(details);
+    // browser.action.setIcon(details);
 }
 function enableToolbarIcon(tabId) { ...
-    browser.action.setIcon(details);
+    // browser.action.setIcon(details);
 }
 export function toggleToolbarIcon(tabId) {
     if ( reverseMode ) {
-        enableToolbarIcon(tabId);
+        // enableToolbarIcon(tabId);
     } else {
-        disableToolbarIcon(tabId);
+        // disableToolbarIcon(tabId);
     }
 }
```

```diff
// chromium/js/config.js
-    showBlockedCount: true,
+    showBlockedCount: false,
```

The toolbar icon is Windscribe's; uBOL must not change it, and we don't want
uBOL's block-count badge either.

### `f9a90a93` — add `webshareNoOpScript` to Windscribe script-id list

File: `chromium/js/scripting-manager.js` (1 line).

Adds `webshareNoOpScript` to the allowlist:

```diff
-const windscribeContentScriptIds = ['workerBlockScript', 'splitPersonalityScript', 'locationWarpScript', 'languageWarpScript', 'timeZoneWarpScript',  'fontAntiFingerprintingScript', 'screenResAntiFingerprintingScript', 'canvasAntiFingerprintingScript', 'audioAntiFingerprintingScript', 'fingerprintjsAntiFingerprintingScript']
+const windscribeContentScriptIds = ['workerBlockScript', 'splitPersonalityScript', 'locationWarpScript', 'languageWarpScript', 'timeZoneWarpScript',  'fontAntiFingerprintingScript', 'screenResAntiFingerprintingScript', 'canvasAntiFingerprintingScript', 'audioAntiFingerprintingScript', 'fingerprintjsAntiFingerprintingScript', 'webshareNoOpScript']
```

See also `e8cf567c`, which is where this allowlist pattern was first introduced.

### `32f91368` — fix message handler interfering with webext-redux

File: `chromium/js/background.js` (+544 / -461; **most of that is
reformat**).

The real logic change:

```diff
+// So this handler is filtered to work only with ublocks code
+const casesToUse = new Set([
+  'insertCSS','removeCSS','toggleToolbarIcon','injectCustomFilters',
+  'uninjectCustomFilters','injectCSSProceduralAPI','applyRulesets',
+  'getOptionsPageData','getRulesetDetails','setAutoReload',
+  'setShowBlockedCount','setStrictBlockMode','setDeveloperMode',
+  'popupPanelData','getFilteringMode','gotoURL','setFilteringMode',
+  'setPendingFilteringMode','getDefaultFilteringMode','setDefaultFilteringMode',
+  'getFilteringModeDetails','setFilteringModeDetails','excludeFromStrictBlock',
+  'getMatchedRules','showMatchedRules','getEffectiveDynamicRules',
+  'getEffectiveSessionRules','getEffectiveUserRules','updateUserDnrRules',
+  'addCustomFilter','removeCustomFilter','selectorsFromCustomFilters',
+])

 runtime.onMessage.addListener((request, sender, callback) => {
-    isFullyInitialized.then(( ) => {
-        const r = onMessage(request, sender, callback);
-        if ( r !== true ) { callback(); }
-    });
-    return true;
+  console.log('onMessage - ublock', request, sender, callback)
+
+  if (casesToUse.has(request.what)) {
+    isFullyInitialized.then(() => {
+      const r = onMessage(request, sender, callback)
+      if (r !== true) { callback() }
+    })
+    return true
+  }
+
+  // otherwise do nothing   ← now explicit `return false` after f629a91a
 })
```

Before this patch, uBOL's listener grabbed *every* runtime message,
including dispatched Redux actions from the popup, and then called
`callback()` with `undefined`, which closed the `sendResponse` channel
before `webext-redux`'s own listener could reply. Result: popup was
permanently stuck "loading" because dispatches never resolved.

The fix restricts uBOL's listener to a fixed allowlist of uBOL-internal
RPC names (52 at `889c81a0`); everything else falls through to other listeners.
The diff above is the original form; see `889c81a0` for the current listener.

**Known drift:** upstream uBOL can add new `request.what` names at any
release. When bumping the submodule you must diff upstream's
`background.js` and append any new internal RPC names to `casesToUse`, or
those features silently break inside Windscribe's build. See the merge
checklist below.

**Also**: this patch added a stray `console.log('onMessage - ublock', ...)`
that fired for every runtime message. It was removed in `59f9d8eb`.

### `e37c7d12` — remove supposed obfuscated code to pass CWS review

File: `chromium/rulesets/scripting/scriptlet/default.trusted-replace-node-text.js`
(+976 / -368). **This file no longer exists** (removed by the upstream
scriptlet restructure brought in by `889c81a0`).

Same story as `26b150d4`: wholesale Prettier reformat of the scriptlet so
that no single line looks like minified / obfuscated code to the CWS
reviewer. **No behavioral change.**

### `511e2fc3` — leave out anti-fingerprinting scripts in advance

File: `chromium/js/scripting-manager.js` (1 line).

Adds the five anti-fingerprinting IDs (`fontAntiFingerprintingScript`,
`screenResAntiFingerprintingScript`, `canvasAntiFingerprintingScript`,
`audioAntiFingerprintingScript`, `fingerprintjsAntiFingerprintingScript`)
to `windscribeContentScriptIds`.

### `e8cf567c` — don't touch WS scripts

File: `chromium/js/scripting-manager.js`.

This is where the "don't let uBOL manage Windscribe's content scripts"
pattern starts. At `e8cf567c`, uBOL's `registerInjectables` reconciler
would diff what's registered vs. what it wants to register, and unregister
anything it didn't put there — including our warps. Today the function is
`registerContentScripts`: it unregisters every registered script whose ID
is not in `windscribeContentScriptIds`, then registers its own.

```diff
+// dont mess with windscribe content scripts
+const windscribeContentScriptIds = [
+  'workerBlockScript', 'splitPersonalityScript',
+  'locationWarpScript', 'languageWarpScript', 'timeZoneWarpScript',
+]

 const before = new Map(
-    normalizeRegisteredContentScripts(registered).map(
+    normalizeRegisteredContentScripts(
+        registered.filter(entry => !windscribeContentScriptIds.includes(entry.id))
+    ).map(
         entry => [entry.id, entry]
     )
 );
```

`511e2fc3`, `f9a90a93` and `889c81a0` extend this same list. The diff
above shows the original `before` map; the current code filters `toRemove`
instead.

### `8c49094f` — use correct attribution

File: `chromium/js/dashboard.js`.

uBOL's manifest is not copied into `build/`, so `runtime.getManifest()`
would return Windscribe's name and version. The dashboard shows
`${UBO_LITE_NAME} ${UBO_LITE_VERSION}` instead. `webpack.config.js`
replaces those placeholders when it copies the file.

### `ccdbcc0b` — remove options page open instances

Files: `chromium/js/background.js`, `chromium/js/popup.js` (and the
`firefox/` copies).

Comments out `runtime.openOptionsPage()`, so uBOL never opens its own
options page. The `popup.js` change is still in the tree.

### `479b36ec` — update ublock to work with the extension

The first Windscribe patch. It deletes uBOL's popup, report and
matched-rules pages, comments out the `permissions.remove({ origins:
['<all_urls>'] })` call in `settings.js`, and comments out two
`dnr.setExtensionActionOptions` calls in `background.js`. The
`background.js` part was undone by `889c81a0`.

---

## Known drift

1. **`casesToUse` allowlist is manually maintained.** If upstream uBOL adds a
   new internal RPC name to `background.js`, it will not reach the handler
   inside Windscribe's build until you add it to `casesToUse`.

---

## Merge-from-upstream checklist

When bumping the submodule (`cd ubo-lite-mirror && git fetch upstream && git
merge upstream/main`), do each of the following in order:

1. **Inventory the patches.** Run:
   ```bash
   cd ubo-lite-mirror
   git log --oneline --author='ahmed@windscribe.com' --author='windscribe' | cat
   ```
   Cross-reference with the table at the top of this file. If new Windscribe
   commits have landed since this doc was last updated, add them here.

2. **Resolve `chromium/js/background.js` conflicts.**
   - Confirm the `casesToUse` `Set` still exists and is still gating the
     `runtime.onMessage.addListener` entry point.
   - Diff the `case '…':` labels in upstream's `switch ( request.what )`
     blocks inside `onMessage()` against `casesToUse`. Any new `request.what`
     name upstream that's not already in our Set needs to be added, or the
     feature silently breaks.
   - Confirm the `return false` for the fall-through branch (from `f629a91a`)
     is still present.

3. **Resolve `chromium/js/scripting-manager.js` conflicts.**
   - Re-apply the `windscribeContentScriptIds` list and check that all IDs
     are still in it.

4. **Resolve `chromium/js/action.js` conflicts.**
   - All three icon mutators must remain commented out.

5. **Resolve `chromium/js/config.js` conflicts.**
   - `showBlockedCount` must stay `false`.

6. **Check scriptlets flagged by CWS.**
   - The two files reformatted in `e37c7d12` / `26b150d4` were removed by
     the upstream restructure. Scriptlets now live under
     `chromium/rulesets/scripting/scriptlet/{isolated,main}/`.
   - If CWS flags a scriptlet as obfuscated, take upstream's content, then
     Prettier-reformat the flagged file.

7. **Diff `web_accessible_resources` between upstream and our manifest.**
   ```bash
   diff \
     <(jq .web_accessible_resources ubo-lite-mirror/chromium/manifest.json) \
     <(jq .web_accessible_resources src/manifest.json)
   ```
   Any entry upstream has that our `src/manifest.json` doesn't → add it.
   Any entry we have that upstream removed → remove from ours (unless
   we added it for a Windscribe-owned resource, which we don't today).
   If you skip this step, affected uBOL features (strict-block page,
   picker UI, surrogate scripts) silently fail with CSP-style errors in
   the page console.

8. **Sanity-check the generated `build/`.**
   - `yarn build`
   - Load unpacked, open the popup, attempt a connection.
   - Verify the extension icon does not flip to uBOL's icon at any point.
   - Verify the popup's Redux actions still work (the popup does not get
     stuck loading).

9. **Run e2e.** `yarn test:local`.

10. **Update this doc.** Add any new SHAs to the table, note any new drift
    you discovered.

---

## See also

- [`content-scripts.md`](./content-scripts.md) — why the Windscribe script
  IDs exist and when uBOL would otherwise remove them.
- [`background-service-worker.md`](./background-service-worker.md) — how
  `runtime.onMessage` is registered on the Windscribe side.
- [`gotchas.md`](./gotchas.md) — short summary of this file's landmines.
