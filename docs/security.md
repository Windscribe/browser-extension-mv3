# Security

State of security in this repo — what's here, what isn't, and what to watch.

This doc captures the observable surface. Strix and Shannon audits have
been run; their output lives outside the repo.

---

## Hardcoded client auth secret

Files: `src/utils/constants.ts` (runtime) and
`scripts/buildUtils/api/getEndpoint.js` (build-time copy).

```ts
export const CLIENT_AUTH_SECRET = '952b4412f002315aa50751032fcaab03'
```

Used by `src/api/utils.ts::getClientAuthHash` to sign unauthenticated API
requests (authenticated requests skip `client_auth_hash` and send
`Authorization: Bearer <session_auth_hash>` instead):

```ts
const getClientAuthHash = (time: string) =>
  md5(`${CLIENT_AUTH_SECRET}${time}`).toString()
```

**This secret ships with every extension build** — unzip any production
`build.zip`, open `background.bundle.js`, and you can extract it. The API
treats `client_auth_hash` as a soft replay-mitigation, not a real
authentication factor; **the real auth is `session_auth_hash` on the
user's session**.

Don't rely on `CLIENT_AUTH_SECRET` for anything that actually requires
secrecy. If we ever need per-build or per-install secrets, they can't live
in the bundle.

A separate constant, `SECRET_KEY_PSY_OP`
(`'if_you_copy_this_you_might_die_a_painful_death'`), lives in both
`scripts/login.js` and `src/utils/constants.ts`. It is a different value,
used to sign the `AuthToken/login` secure token (at build time in
`scripts/login.js`, and at runtime by the `login` thunk). It is also
observable from unzipping.

---

## `.env` handling

`.env` is not tracked (it is in `.gitignore`). Create it locally with the
fields listed in the [README](../README.md#environment-env). In CI,
`.gitlab-ci.yml` writes it:

- The `test` job appends `NODE_ENV`, `API_URL`, `BACKUP_API_URL` (from the
  `$BACKUP_API_URL` CI variable), and the `TEST_USER_*` / `BUILD_USER_*`
  credentials.
- `build:extension` appends `NODE_ENV`, `API_URL`, and
  `BACKUP_API_URL=totallyacdn.com`.

`REACT_APP_REDUX_PORT` and `BROWSER` are not written in CI; they fall back
to the defaults in `src/utils/constants.ts`.

Hard rules that still apply:

- **Never** commit a `.env` or `.env.local`. They hold your personal
  build and test credentials.
- Keep real secrets in GitLab CI variables, like `TEST_USER_*` /
  `BUILD_USER_*` already are in `.gitlab-ci.yml`:
  ```yaml
  test:
    script:
      # ... runner diagnostics ...
      - printf "\nNODE_ENV=production" >> ".env"
      - printf "\nAPI_URL=windscribe.com" >> ".env"
      - printf "\nBACKUP_API_URL=$BACKUP_API_URL" >> ".env"
      - printf "\nTEST_USER_NAME=$TEST_USER_NAME" >> ".env"
      - printf "\nTEST_USER_PASSWORD=$TEST_USER_PASSWORD" >> ".env"
      - printf "\nBUILD_USER_NAME=$BUILD_USER_NAME" >> ".env"
      - printf "\nBUILD_USER_PASSWORD=$BUILD_USER_PASSWORD" >> ".env"
  ```

---

## Credential storage at runtime

Server credentials (the proxy's basic-auth username/password) come from
the `/ServerCredentials` API call and are stored in `state.serverCredentials`
**base64-encoded**. Base64 is not encryption — anyone with read access to
`chrome.storage` can decode them.

Decoded at response time in `authRequiredHandler`:

```ts
callback({
  authCredentials: { username: atob(username), password: atob(password) },
})
```

This is fine given the threat model — they're ephemeral per-user proxy
credentials tied to the session, not the user's login password.

The user's login password is **not stored** — it's exchanged at login for
a `session_auth_hash`.

---

## CI scanning

`.gitlab-ci.yml` currently declares four stages
(`prepare_environment`, `install_packages`, `test`, `build`) and the
following jobs:

- `build:image` (stage `prepare_environment`, only runs on `master` when
  `Dockerfile` changes)
- `install` (stage `install_packages`)
- `eslint` (stage `test`)
- `test` (stage `test`, e2e)
- `build:extension` (stage `build`)

SAST, Secret Detection, and Dependency Scanning: resolved internally.

---

## Pre-commit hook

File: `.husky/pre-commit`.

```sh
yarn run lint
```

Only runs ESLint. If we add secret scanning, a minimal addition would be:

```sh
yarn run lint
gitleaks protect --staged --redact
```

…guarded on `gitleaks` being installed locally. Opt-in until the whole team
has the binary.

---

## Permissions minimisation

`src/manifest.json` declares a lot of permissions (see
[`architecture.md`](./architecture.md#permissions)). Each one is actually
used — we verified this while writing the docs. Keep this in mind when
reviewing PRs: adding a new permission is a CWS review slowdown, and
`host_permissions: <all_urls>` is as broad as it gets already.

`contentSettings` and `browsingData` are kept as `optional_permissions`.
Each one is requested only when the user turns on the matching action.

---

## Content scripts and the page's JS world

All warps (language, location, timezone, split personality) and
anti-fingerprinting scripts run with `world: 'MAIN'`, i.e. in the page's
own JS world rather than an isolated extension world. The exception is
`fingerprintMessageListener.bundle.js` (`fingerprintMessageListenerScriptId`),
which is registered with `world: 'ISOLATED'` (in `registerScripts.ts`,
`Privacy.tsx`, and `useInitialDataFetching.ts`). `MAIN` is required for
monkey-patching `navigator.language` / `Intl.DateTimeFormat` /
`HTMLCanvasElement.prototype.toDataURL` etc. — the patches have to be
visible to page code.

Implication: a malicious page that's watching for these patches *can*
detect the extension. This is a known tradeoff for the anti-fingerprinting
features.

Scripts run `at document_start` so a page can't read the unpatched globals
before we get to them.

---

## `eval` / `Function` / `new Function`

None used in `src/`. A `grep` for `eval(` / `new Function(` turns up only
library usage (if anything) — keep it that way; MV3 forbids them in the
SW anyway.

---

## PAC-script surface

`src/services/proxyConfig/proxyConfig.ts` generates a PAC script that is
handed to `chrome.proxy.settings.set`. Two notes:

1. The PAC contains debug `alert()` calls (`alert('proxy url: ' + url)`
   etc.). Their output is network-level only: it appears only in Chrome's
   network log export (`chrome://net-export`), not in DevTools, and the
   user never sees an alert. They ship in production builds. This is
   accepted. It is not a security issue.
2. Windscribe's own API domains are hardcoded in the PAC's allowlist to
   prevent the "proxy-through-proxy" chicken-and-egg on reconnect. This is
   required behaviour, not a leak.

---

## Update procedure for the `ubo-lite-mirror` submodule

The submodule is vendored from our own mirror
(`gitlab.int.windscribe.com/.../ubo-lite-mirror`) rather than upstream
GitHub. This means:

- Any supply-chain compromise of upstream requires manual action on our
  side — we don't pull transparently.
- Our Windscribe patches (see [`ubo-lite-mirror.md`](./ubo-lite-mirror.md))
  are reviewable in one place.

But:

- If the mirror itself is compromised, or if someone lands a patch on the
  mirror without review, we ship it on the next build. The submodule
  pinning plus manual bumps are the only guard.

---

## Outstanding items (tracked)

None open.

- [x] Remove the stray `console.log('onMessage - ublock', ...)` from the
      ubo-lite patch (mirror commit `59f9d8eb`).
- [x] `windscribeContentScriptIds` in
      `ubo-lite-mirror/chromium/js/scripting-manager.js` is a single list.
- [x] Run Strix audit (owner: Ahmed).
- [x] Run Shannon audit (owner: Ahmed).
- [x] SAST / Secret Detection / Dependency Scanning: resolved internally.
- Not needed: gating PAC `alert()`s on `NODE_ENV === 'development'`.

---

## See also

- [`api.md`](./api.md) — where `CLIENT_AUTH_SECRET` is used.
- [`background-service-worker.md`](./background-service-worker.md) —
  `webRequest.onAuthRequired` and `webRequestAuthProvider`.
- [`proxy-and-pac.md`](./proxy-and-pac.md) — the PAC alerts.
- [`ubo-lite-mirror.md`](./ubo-lite-mirror.md) — submodule maintenance.
