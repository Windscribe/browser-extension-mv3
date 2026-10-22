# API

The extension talks to the Windscribe backend over HTTPS. All API code
lives in `src/api/`.

---

## Layout

```
src/api/
├── endpoints.ts   # 15 endpoint functions — the public surface
├── sendRequest.ts # fetch wrapper with 3-tier failover + workingApi
├── types.ts       # request/response types
└── utils.ts       # buildQueryString, getClientAuthHash, generateTime
```

---

## `sendRequest` — the core fetch wrapper

File: `src/api/sendRequest.ts`.

Every call from `endpoints.ts` goes through `sendRequest`, except
`getUserAgents`, which uses a raw `fetch(url)`. The wrapper:

1. Reads the last known **working API domain** from storage
   (`state.workingApi`).
2. Decides the URL prefix based on `NODE_ENV`:
   - production: `https://api.{domain}/{path}` (or `https://assets.{domain}/...`
     if `useAssets` is true).
   - dev: `https://api-{domain}/{path}` (or `https://assets-{domain}/...`
     if `useAssets` is true). Note the hyphen — different URL shape for
     staging.
3. Issues the fetch with a 3-second `AbortController` timeout.
4. On success, if the working domain changed, dispatches `setWorkingApi(domain)`
   to persist it (see [`workingApi`](#workingapi--why-it-matters) below).
5. On failure, falls through the three tiers.

```ts
const sendRequest = async <DataType>(
  dispatch, method, path, body?, useAssets = false, headers?
): Promise<ApiResponse<DataType>> => {
  const state = await browserApi.getStateFromStorage()
  const workingApi = state[1].workingApi

  const tryFetch = async (domain?: string) => { /* ...fetch+json... */ }

  try {
    return await tryFetch(ENVS.API_URL ?? workingApi)
  } catch {
    try {
      return await tryFetch(ENVS.BACKUP_API_URL)
    } catch {
      try {
        const dohUrl = await fetchDoh()
        return await tryFetch(dohUrl)
      } catch (err: any) {
        return {
          errorMessage:     'API connectivity issues',
          errorDescription: err?.message || '',
          errorCode:        err?.errorCode,
          logStatus:        err?.logStatus,
        }
      }
    }
  }
}
```

### The 3-tier failover

| Tier | Domain                               | Where it comes from                        |
| ---- | ------------------------------------ | ------------------------------------------ |
| 1    | `ENVS.API_URL` (or `state.workingApi`) | `.env` (`API_URL=windscribe.com`)         |
| 2    | `ENVS.BACKUP_API_URL`                | `.env` (`BACKUP_API_URL=totallyacdn.com`). In CI, the `test` job takes it from the `$BACKUP_API_URL` CI variable; `build:extension` hardcodes `totallyacdn.com` |
| 3    | DoH — `https://1.1.1.1/dns-query?name=${ENVS.DOH_URL}` | `ENVS.DOH_URL = 'dynamic-api-host.windscribe.com'` |

If all three fail, every caller receives a uniform error shape:

```ts
{ errorMessage, errorDescription, errorCode, logStatus }
```

### `workingApi` — why it matters

When tier 2 or 3 succeeds, `setWorkingApi(domain)` persists the winning
domain. It does **not** change the order of the tiers: tier 1 is
`tryFetch(ENVS.API_URL ?? workingApi)`, and `ENVS.API_URL` is always set
(`process.env.API_URL || 'staging.windscribe.com'` in
`src/utils/constants.ts`), so every request still tries `ENVS.API_URL`
first. The persisted value is **referenced by the PAC script** — the PAC adds `api.<workingApi>/*` and
`assets.<workingApi>/*` to its bypass allowlist so reconnect-time calls
don't loop through the proxy. It skips them only when `workingApi` is
exactly `'.windscribe.com'` or `'totallyacdn.com'`. Because of the leading
dot, `windscribe.com` itself is also added, which duplicates entries that
are already hardcoded.

See [`proxy-and-pac.md`](./proxy-and-pac.md) for the PAC side.

### Timeouts

Hardcoded at **3 seconds** (`setTimeout(() => controller.abort(), 3000)`).
Applies to every tier. If you're tuning UX around slow connects, this is
the knob.

---

## Client authentication

File: `src/api/utils.ts`.

Unauthenticated requests built with `buildQueryString` sign the URL with a
`client_auth_hash`. Authenticated requests use
`buildAuthenticatedQueryString` in `endpoints.ts` (which calls
`buildQueryString` with `skipClientAuthHash = true`) and send the session
as an `Authorization: Bearer <session_auth_hash>` header instead:

```ts
const getClientAuthHash = (time: string) =>
  md5(`${CLIENT_AUTH_SECRET}${time}`).toString()

const generateTime = () =>
  Math.round(new Date().getTime() / 1000).toString()

const buildQueryString = (endpoint, params?, skipClientAuthHash = false) => {
  const time = generateTime()
  const hash = getClientAuthHash(time)
  let qs = `${endpoint}?platform=chrome&time=${time}`
  if (!skipClientAuthHash) qs += `&client_auth_hash=${hash}`
  // ...append params
  return qs
}
```

`CLIENT_AUTH_SECRET` is a hardcoded MD5-hashed-at-dev-time string in
`src/utils/constants.ts`:

```ts
export const CLIENT_AUTH_SECRET = '952b4412f002315aa50751032fcaab03'
```

Because the secret ships with every extension build, anyone who unzips the
extension has it. **The API treats `client_auth_hash` as a soft client
identifier / replay-mitigator, not a real secret.** See
[`security.md`](./security.md) for context.

---

## Endpoints

All 15 endpoints exported from `src/api/endpoints.ts`. Each, except
`getUserAgents`, takes an `AppDispatch` so it can write `workingApi` on
failover. Most take a `session_auth_hash`, which is sent as an
`Authorization: Bearer` header (not a query parameter).

| Function                    | Method | Path                                      | Notes                                                     |
| --------------------------- | ------ | ----------------------------------------- | --------------------------------------------------------- |
| `getLoginAuthToken`         | POST   | `AuthToken/login`                         | Returns `token` (sent as `secure_token` to `login`) and optional `captcha` data. |
| `login`                     | POST   | `Session`                                 | Accepts username/password, optional 2FA and captcha.      |
| `logout`                    | DELETE | `Session`                                 | `session_type_id: 2` (extension).                         |
| `getSessionStatus`          | GET    | `Session` (Bearer `Authorization` header) | Used by the `sessionPoller` alarm.                        |
| `getBestLocation`           | GET    | `BestLocation`                            | For Autopilot.                                            |
| `getServerList`             | GET    | `serverlist/chrome/{isPro}/{locHash}`     | `useAssets=true`, goes through assets CDN.                |
| `getServerCredentials`      | GET    | `ServerCredentials`                       | Returns base64 proxy username/password.                   |
| `getNotifications`          | GET    | `Notifications`                           | Driven by `notificationPoller` alarm (60 min).            |
| `getWebSession`             | POST   | `WebSession`                              | Temp session for "open windscribe.com logged in" flows.   |
| `sendEmailConfirmation`     | PUT    | `Users` (`resend_confirmation: 1`)        |                                                           |
| `getBlocklists`             | GET    | `ExtBlocklists?version=3`                 |                                                           |
| `getCruiseControlDomains`   | GET    | `CruiseControlDomains`                    | Drives Autopilot per-domain routing.                      |
| `getUserAgents`             | —      | raw `fetch(url)` — not via `sendRequest`  | Exported but not called. The build reads `useragents.txt` in `scripts/getUa.js` instead. |
| `recordInstall`             | POST   | `RecordInstall/ext/chrome`                | Called from `onInstalledHandler` on INSTALL.              |
| `reportAppLog`              | POST   | `Report/applog` (multipart)               | `FormData` body, `skipClientAuthHash=true`, Bearer header. |

### Response shape

All responses are typed as `ApiResponse<T>` (`src/api/types.ts`):

```ts
export interface ApiSuccessResponse<Data = unknown> {
  data: Data
  workingApi?: string
  info?: Info
  metadata?: MetaData
}

export type ApiErrorResponse = {
  errorCode: number
  errorMessage: string
  errorDescription: string
  logStatus: string | null
}

export type ApiResponse<ExpectedData = unknown> = Either<
  ApiErrorResponse,
  ApiSuccessResponse<ExpectedData>
>
```

`Either` (`src/utils/types.ts`) means a response has the fields of exactly
one side: `data` on success, or the error fields on failure. The
`errorCode` is important — `SESSION_ERRORS` in `src/utils/constants.ts`
lists known error codes (e.g. `701` for invalid session, `703` for too many
consecutive login failures, `1337` for `NO_AUTH_HASH`).

---

## How endpoints are called

Usually through a Redux thunk. The exceptions today are
`sendEmailConfirmation` (`components/ConfirmEmail.tsx`), `getWebSession`
(`components/hooks/useWindowOpening.ts`), `reportAppLog`
(`services/debugLog`) and `recordInstall` (`onInstalledHandler.ts`). New
code should go through a thunk. Convention
(see [`conventions.md`](./conventions.md#api-directory)):

```ts
// src/state/slices/session.ts
import { login as loginRequest } from 'api/endpoints'

export const login = createAsyncThunk<Either<SessionData, ApiErrorResponse>, Credentials>(
  LOGIN,
  async ({ username, password, twoFa, secureToken /* ... */ }, { getState, dispatch }) => {
    const response = await loginRequest({ dispatch, username, password, twoFa /* ... */ })

    if (response.errorMessage) return response
    if (response.data && response.data.username) {
      // ...checkIp, checkUserStash, setView('Home')
      return response.data
    }

    throw Error('Unknown response format while trying to login')
  },
)
```

And thunks that must run in the background (e.g. `login`, `fetchServerList`,
`checkCurrentIp`) are dispatched via an **alias** so the work happens in
the SW, not the popup. See
[`state-management.md`](./state-management.md#aliases).

---

## Adding a new endpoint

1. Add the function to `src/api/endpoints.ts`, using `sendRequest`.
2. Add its response type to `src/api/types.ts`.
3. Add the endpoint name to the `Endpoint` union type in the same file.
4. Call it from a thunk (never from a component).
5. If the call must run in the background, add a `createAsyncThunk` in a
   slice and wire up an alias.

---

## DoH details

`fetchDoh()` in `sendRequest.ts`:

```ts
const res = await fetch(
  `https://1.1.1.1/dns-query?name=${ENVS.DOH_URL}&type=TXT`,
  { headers: { Accept: 'application/dns-json' } }
)
const json = await res.json()
const dohUrl = json?.Answer[0]?.data
if (!dohUrl || typeof dohUrl !== 'string') throw Error("Unknown URL's format of DNS over HTTPS")
return dohUrl.slice(1, -1)   // strip surrounding quotes from TXT record
```

Cloudflare's DNS-over-HTTPS endpoint returns a TXT record whose value is the
current "dynamic" API hostname. If Windscribe's primary / backup domains
are blocked in a region, the DoH record gets flipped to an unblocked one,
and tier 3 of the failover picks it up.

---

## See also

- [`state-management.md`](./state-management.md) — thunks and aliases.
- [`proxy-and-pac.md`](./proxy-and-pac.md) — how `workingApi` feeds the PAC.
- [`security.md`](./security.md) — the `CLIENT_AUTH_SECRET` story.
- [`build-system.md`](./build-system.md) — `scripts/login.js` and
  `scripts/getLocations.js` also hit these endpoints at build time.
