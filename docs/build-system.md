# Build system

What `yarn build` does, how webpack is configured, and how content scripts
get generated at build time.

---

## TL;DR

```
yarn build  →  node scripts/build.js  →  webpack(config)  →  build/
```

`scripts/build.js` does four things before handing off to webpack:

1. Logs into the Windscribe API using the build-user credentials.
2. Reads the local user-agent list (`useragents.txt`) and downloads the
   server list.
3. Runs four code-generators that write content-script files under
   `src/pages/contentScripts/{splitPersonality,locationWarp,languageWarp,
   timeZoneWarp}/` and register each file as a webpack entry.
4. Runs webpack. Then runs post-build validators.

Relevant files:

- `scripts/build.js` — the orchestrator.
- `scripts/login.js`, `scripts/getUa.js`, `scripts/getLocations.js` — data
  fetchers.
- `scripts/embedUserAgentsSplitPersonality.js`, `scripts/embedLocationWarp.js`,
  `scripts/embedLanguageWarp.js`, `scripts/embedTimeZoneWarp.js` — generators.
- `scripts/buildUtils/templates/*.js` — source templates that the generators
  interpolate.
- `scripts/buildUtils/outputValidators/*.js` — post-webpack checks. A missing
  or wrong bundle is logged with `console.error`. They do not fail the build.
- `webpack.config.js` — everything else.

---

## `scripts/build.js`

```js
require('dotenv').config()
// ...
;(async () => {
  config.mode = 'production'

  const sessionData = await login()               // scripts/login.js
  const userAgents = getUserAgents()              // scripts/getUa.js (local file)
  const serverListData = await getLocations(sessionData)  // scripts/getLocations.js

  await embedUserAgentsForSplitPersonality(config, userAgents)
  await embedLocationWarp(config, serverListData)
  await embedLanguageWarp(config, serverListData)
  await embedTimeZoneWarp(config, serverListData)

  webpack(config, async function (err, stats) {
    // fail the build if webpack errored
    // ...
    await validateEmbeddedUserAgents(userAgents)
    await validateEmbeddedLocationWarp(serverListData)
    await validateEmbeddedLanguageWarp(serverListData)
    await validateEmbeddedTimeZoneWarp(serverListData)
  })
})()
```

The generators **mutate `config.entry` in place**. That's the whole point —
it's why you can't just list a warp script in `webpack.config.js` yourself.

---

## Login (build-time auth)

`scripts/login.js` uses `BUILD_USER_NAME` / `BUILD_USER_PASSWORD` from `.env`
to:

1. `POST /AuthToken/login` → get a `secure_token`.
2. SHA256-sign that token with a hardcoded `SECRET_KEY_PSY_OP` string (same
   one as `src/utils/constants.ts`).
3. `POST /Session` with `{ username, password, session_type_id: 2,
   secure_token, secure_token_sig }` → get a `session_auth_hash`.

The session response is cached in `.ws-build-cache` (see
`scripts/cacheConfig.js`) with a TTL so repeated `yarn build`s don't hammer
the login endpoint. The server list is cached the same way
(`scripts/getLocations.js`). The TTL is 1 hour. Force a refresh with
`yarn clear-cache`, or set one of these in the environment or `.env`
(`cacheConfig.js` reads both):

- `FORCE_REFRESH=true` skips the cache read.
- `BYPASS_CACHING=true` skips the cache read and write.

2FA is deliberately unsupported at build time — the build-user account must
not have 2FA enabled.

---

## Generated content scripts

Four generators, same shape. Here's
`scripts/embedUserAgentsSplitPersonality.js`:

```js
async function embedUserAgentsForSplitPersonality(config, userAgentsData) {
  const uaList = userAgentsData.split(/\r?\n/).map(ua => ({
    fileName: sha256(ua).toString(),
    content: splitPersonalityContentScriptTemplate(ua),  // template from buildUtils/templates/
    userAgent: ua,
  }))

  const folder = 'src/pages/contentScripts/splitPersonality/'
  // clear old generated files (preserve .gitkeep)
  for (const f of fs.readdirSync(folder)) {
    if (f !== '.gitkeep') fs.rmSync(folder + f)
  }

  for (const ua of uaList) {
    const filePath = folder + ua.fileName + '.ts'
    fs.writeFileSync(filePath, ua.content)
    // register as a webpack entry so it gets bundled into build/<fileName>.bundle.js
    config.entry[ua.fileName] = path.join(__dirname, '..', 'src', 'pages',
      'contentScripts', 'splitPersonality', ua.fileName + '.ts')
  }

  // rewrite src/state/slices/userAgent.ts so the runtime knows which UAs exist
  fs.writeFileSync('src/state/slices/userAgent.ts',
    userAgentSliceTemplate(uaList.map(u => `'${u.userAgent}'`)))

  await exec(`eslint --fix ${folder}`)
  await exec(`eslint --fix src/state/slices/userAgent.ts`)
}
```

Key properties:

- **`fileName` is deterministic** — SHA256 of the UA (split personality),
  of the data-center ID + `lcw` (location warp), or of the location ID +
  `lnw` / `tzw` (language / timezone warp). That's how the runtime knows
  which bundle to inject for a given data center or location: it
  re-computes the hash.
- **Per-variant file**. One content-script bundle per user agent, per
  data-center's GPS, per location's locale, per location's timezone.
- **Webpack `entry` is mutated**. The webpack config is a shared mutable
  object; the generators add entries before webpack runs.
- **`src/state/slices/userAgent.ts` is overwritten**. Do not commit changes
  to this file by hand.
- **The old generated files are deleted first** (everything except
  `.gitkeep`), so stale bundles don't ship.

### The four generators, briefly

| Generator                                | Input                          | Output folder                                        | Hash suffix |
| ---------------------------------------- | ------------------------------ | ---------------------------------------------------- | ----------- |
| `embedUserAgentsSplitPersonality.js`     | `useragents.txt`               | `src/pages/contentScripts/splitPersonality/`         | (none)      |
| `embedLocationWarp.js`                   | server list → per-dc GPS       | `src/pages/contentScripts/locationWarp/`             | `lcw`       |
| `embedLanguageWarp.js`                   | server list → per-loc locale   | `src/pages/contentScripts/languageWarp/`             | `lnw`       |
| `embedTimeZoneWarp.js`                   | server list → per-loc tz       | `src/pages/contentScripts/timeZoneWarp/`             | `tzw`       |

Templates live at `scripts/buildUtils/templates/*.js`. They are plain JS
functions that return a string (the content of the file that will be
written). Timezone warp files are `.js`; the other three are `.ts`.

### Post-webpack validation

`scripts/buildUtils/outputValidators/*` each re-compute the expected filename
set and check that every corresponding `.bundle.js` exists in `build/` and
contains the embedded value. A missing or wrong bundle is logged with
`console.error`. It does not fail the build, so read the build output.

`scripts/build.js` calls `process.exit(1)` only when webpack reports errors,
and that happens before these validators run. `validateEmbeddedLocationWarp.js`
throws if a GPS value is not a finite number. That `throw` is inside the
per-file `try/catch`, so it is logged the same way and does not stop the build.

---

## `webpack.config.js`

### Entry points (static)

```js
entry: {
  popup: 'src/pages/popup/index.tsx',
  background: 'src/pages/background/main.ts',
  debugLog: 'src/pages/debugLog/index.tsx',

  workerBlockContentScript:         'src/pages/contentScripts/workerBlock.ts',
  webshareNoOpContentScript:        'src/pages/contentScripts/webshareNoOp.ts',

  fontAntiFingerprinting:           'src/pages/contentScripts/antiFingerprinting/font.ts',
  canvasAntiFingerprinting:         'src/pages/contentScripts/antiFingerprinting/canvas.ts',
  screenResAntiFingerprinting:      'src/pages/contentScripts/antiFingerprinting/screen.ts',
  audioAntiFingerprinting:          'src/pages/contentScripts/antiFingerprinting/audio.ts',
  fingerprintjsAntiFingerprinting:  'src/pages/contentScripts/antiFingerprinting/fingerprintjs.ts',
  fingerprintMessageListener:       'src/pages/contentScripts/antiFingerprinting/fingerprintMessageListener.ts',

  offscreenHub: 'src/services/offscreenActions/offscreenHub.ts',
}
```

The generated warp entries are appended at runtime in `scripts/build.js`
before webpack is invoked.

### `DefinePlugin` injections

Five constants are embedded into every bundle:

```js
new webpack.DefinePlugin({
  COMMIT_HASH:                    JSON.stringify(require('child_process').execSync('git rev-parse --short HEAD').toString().trim()),
  UBO_LITE_SUBMODULE_COMMIT_HASH: JSON.stringify(require('child_process').execSync('git rev-parse --short HEAD:ubo-lite-mirror').toString().trim()),
  UBO_LITE_VERSION:               JSON.stringify(require('./ubo-lite-mirror/chromium/manifest.json').version),
  UBO_LITE_NAME:                  JSON.stringify(require('./ubo-lite-mirror/chromium/_locales/et/messages.json').extName.message),
  UBLOCK_REMOVE_PARAM_RULE_IDS:   JSON.stringify(collectUblockRemoveParamRuleIds()),
})
```

`COMMIT_HASH` and `UBO_LITE_SUBMODULE_COMMIT_HASH` show up in the debug-log
header.

### Asset copying

`CopyWebpackPlugin` is used multiple times:

1. **`src/manifest.json` → `build/manifest.json`** (JSON pass-through;
   `transform` is basically a no-op today).
2. **`src/services/offscreenActions/checkIp.worker.js` → `build/`**: the
   Web Worker used by the offscreen document. It is copied, not a webpack
   entry, so it stays a plain `.js` file.
3. **`src/assets/img/spinningLogo.gif` → `build/`**.
4. **`src/_locales` → `build/_locales/`**.
5. **`ubo-lite-mirror/chromium/**` → `build/`** (everything except
   `manifest.json` and `log.txt`). `dashboard.js` is transformed to replace
   `UBO_LITE_VERSION` / `UBO_LITE_NAME` string placeholders. Each uBOL
   `_locales/*/messages.json` is merged with our matching
   `src/_locales/*/messages.json` (our keys win). **This is what bundles
   uBlock Origin Lite into our build.**
6. **`src/backgroundScripts.js` → `build/`**: the service-worker entry
   (`manifest.json → background.service_worker`). It imports
   `./background.bundle.js` (us) and `./js/background.js` (uBOL, just
   copied).
7. **`src/pages/content/**` → `build/content/`**: copied as-is. Nothing in
   the manifest or runtime registers these files; the warp generators use
   `scripts/buildUtils/templates/*` instead.
8. **`src/assets/img/*.png` → `build/`**.
9. **`src/assets/fonts` → `build/fonts/`**.

### HTML pages

Three HTML pages generated by `HtmlWebpackPlugin`:

- `popup.html` (chunks: `popup`)
- `debugLog.html` (chunks: `debugLog`)
- `offscreenHub.html` (chunks: `offscreenHub`)

### Circular-dependency guard

`CircularDependencyPlugin` is set with `failOnError: true` scoped to `src/`.
If you introduce a cycle, webpack reports a compilation error and
`scripts/build.js` exits with code 1.

### Production vs dev

```js
if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map'
} else {
  options.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  }
}
```

`scripts/webserver.js` (used by `yarn start`) wraps this in
`webpack-dev-server` for local dev.

### `chromeExtensionBoilerplate.notHotReload`

```js
chromeExtensionBoilerplate: {
  notHotReload: ['background', 'popup'], // TODO check
},
```

Dead code today — `scripts/build.js` deletes the `chromeExtensionBoilerplate`
key before running webpack. It's only referenced by the dev server
(`scripts/webserver.js`).

---

## Manifest handling

- **Source of truth:** `src/manifest.json`.
- **Build output:** `build/manifest.json` — produced by `CopyWebpackPlugin`
  (not by a manifest-specific plugin).
- **Rulesets:** the `declarative_net_request.rule_resources` list in the
  manifest points at `/rulesets/main/*.json` files, which live inside
  `ubo-lite-mirror/chromium/rulesets/main/` and are copied in by the uBOL
  copy step.

If you need to enable a ruleset by default, flip `enabled: false → true` in
`src/manifest.json` — not in the built artifact.

---

## Submodule build-time dependency

`webpack.config.js` imports from the submodule:

```js
const uboLiteVersion = require('./ubo-lite-mirror/chromium/manifest.json').version
const uboLiteName = require('./ubo-lite-mirror/chromium/_locales/et/messages.json').extName.message
```

If the submodule is missing (`git submodule update --init --recursive` never
ran), `yarn build` fails at webpack config load with a cryptic
`require` error. Tip: check `ubo-lite-mirror/chromium/manifest.json` exists.

---

## Packaging

```bash
NODE_ENV=production yarn build
```

The `build/` folder is what you upload to the Chrome Web Store. A couple of
CWS review landmines:

- CWS's "obfuscated code" auto-check has flagged uBOL scriptlets before.
  Commits `e37c7d12` and `26b150d4` reformatted two of them with Prettier.
  Upstream later moved scriptlets to `scriptlet/{isolated,main}/` (brought
  in by `889c81a0`), so those two files no longer exist. If CWS flags a
  scriptlet again, Prettier-reformat the flagged file. See
  [`ubo-lite-mirror.md`](./ubo-lite-mirror.md).
- Version in `src/manifest.json` must match `package.json`. Currently both
  say `4.3.0`. Keep them in sync.

---

## See also

- [`content-scripts.md`](./content-scripts.md) — what the generated warps
  actually do once they're bundled.
- [`ubo-lite-mirror.md`](./ubo-lite-mirror.md) — how the submodule gets into
  `build/` and the list of custom patches.
- [`api.md`](./api.md) — the endpoints `scripts/login.js` and
  `scripts/getLocations.js` call.
