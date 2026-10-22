# Testing

End-to-end tests only (for now). Mocha + Chai as the runner + assertion
library, Puppeteer as the driver.

---

## Stack

| Tool       | Role                                                                   |
| ---------- | ---------------------------------------------------------------------- |
| Mocha      | Test runner (`yarn test`).                                             |
| tsx        | Loads the TypeScript test files for Mocha (`-n import=tsx`).           |
| TypeScript | Type-checks the tests (`yarn typecheck:tests`). tsx does not.          |
| Chai       | `expect().to.equal()` / `expect().to.not.equal()` style.               |
| Puppeteer  | Drives a real Chromium with the extension loaded.                      |
| Xvfb       | Virtual framebuffer in CI so we can run headful.                       |

Jest is a dep (left over from earlier iterations) but is **not** the active
runner — the `yarn test` script calls `mocha` directly.

---

## Layout

```
tests/
├── tsconfig.json           # extends the root config; scopes globals to node + mocha
├── e2e/
│   ├── setup.ts            # Puppeteer launcher + popup opener
│   ├── tests.ts            # top-level describe that runs every scenario
│   ├── signup.ts           # one file per user flow
│   ├── login.ts
│   ├── tutorial.ts
│   ├── newsfeed.ts
│   ├── autopilot.ts
│   ├── locations.ts
│   ├── debugLog.ts
│   ├── privacyOptions.ts
│   ├── allowlist.ts
│   ├── account.ts
│   └── logout.ts
└── responsesMocks/
    └── locationsMock.ts    # large fixture; used when real API traffic is stubbed
```

`tests/tsconfig.json` sets `"types": ["node", "mocha"]`. Without it, the
`@types/jest` package (pulled in by the jest-puppeteer type packages) would
declare its own `describe` / `it` / `expect` globals that clash with Mocha's.
The root `tsconfig.json` doesn't include `tests/e2e`, so the extension build
never sees the test files.

---

## How to run locally

```bash
# 1. Build the extension (the tests load ./build as an unpacked extension)
yarn build

# 2. Run the full suite
yarn test

# Type-check the tests (no browser needed; CI runs this in the eslint job)
yarn typecheck:tests
```

tsx strips types without checking them, so a type error does not stop
`yarn test`. Run `yarn typecheck:tests` before pushing.

`yarn test:local` sets `DOTENV_CONFIG_PATH=./.env.local`, but it does not
load `.env.local`. `tests/e2e/tests.ts` calls `dotenv.config()` with no path,
and only the `dotenv/config` preload reads `DOTENV_CONFIG_PATH`. Both scripts
read `.env`.

### Required env

```dotenv
API_URL=staging.windscribe.com
TEST_USER_NAME=<your_test_user>
TEST_USER_PASSWORD=<your_test_user_password>
BUILD_USER_NAME=...
BUILD_USER_PASSWORD=...
```

You need a **Pro-upgraded test account** on staging. If you don't have one,
sign up at https://www-staging.windscribe.com/signup and ask the QA / web
team to upgrade it.

### A window will open

Puppeteer launches **headful** because Chrome extensions don't load
properly headless. Don't type, click, or switch windows while tests are
running — Puppeteer's interactions go into whatever window has focus.

---

## Setup (`tests/e2e/setup.ts`)

```ts
import path from 'path'
import puppeteer from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

const extPath = path.resolve(__dirname, '../../build')

const launchBrowser = (): Promise<Browser> => puppeteer.launch({
  headless: false,
  devtools: true,
  dumpio:  true,
  browser: 'chrome',
  // EDGE_BINARY switches the CI `test:edge` job to Microsoft Edge
  ...(process.env.EDGE_BINARY ? { executablePath: process.env.EDGE_BINARY } : {}),
  args: [
    `--disable-extensions-except=${extPath}`,
    `--load-extension=${extPath}`,
    '--no-sandbox', '--disable-setuid-sandbox',
  ],
})

export const setup = async (): Promise<SetupContext> => {
  const browser = await launchBrowser()

  // Wake the background SW by loading a real page
  const appPage = await browser.newPage()
  await appPage.goto('http://google.com', { waitUntil: 'load' })

  // Find the extension ID from the service-worker target URL
  const extensionTarget = (await browser.targets())
    .find(t => t.type() === 'service_worker')
  if (!extensionTarget) throw new Error('Extension service worker not found')
  const extensionId = extensionTarget.url().split('/')[2]

  // Open the popup as a regular page so Puppeteer can drive it
  const popupPage = await browser.newPage()
  await popupPage.goto(`chrome-extension://${extensionId}/popup.html`,
                        { waitUntil: 'load' })

  return { extensionId, browser, popupPage }
}
```

Key tricks:

- `--disable-extensions-except=<path>` + `--load-extension=<path>` is the
  only reliable way to load an unpacked extension under Puppeteer.
- Visit a regular URL first to make sure the SW spins up.
- The popup is opened as a **tab**, not as a browser-action popup, so that
  Puppeteer can interact with it for the duration of the test (the real
  popup closes as soon as focus leaves it).

---

## Writing a test scenario

```ts
import { expect } from 'chai'
import type { Page } from 'puppeteer'

export const login = async (popupPage: Page): Promise<void> => {
  describe('Login', async () => {
    it('Go to login page and enter creds', async () => {
      const { TEST_USER_NAME, TEST_USER_PASSWORD } = process.env
      if (!TEST_USER_NAME || !TEST_USER_PASSWORD) {
        throw new Error('TEST_USER_NAME and TEST_USER_PASSWORD must be set in .env')
      }

      const goLoginButton = await popupPage.$('[data-testid=go-to-login-button]')
      await goLoginButton!.click()

      await popupPage.waitForSelector('[data-testid=login-page]')
      const header = await popupPage.$('[data-testid=header-title]')
      const title = await header!.evaluate(el => el.textContent)
      expect(title).to.equal('Login')

      await popupPage.type('[data-testid=username-input]', TEST_USER_NAME)
      await popupPage.type('[data-testid=password-input]', TEST_USER_PASSWORD)
      popupPage.click('[data-testid=login-button]')

      const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
      expect(homePage).to.not.equal(undefined)
    })
  })
}
```

Typing notes:

- `page.$()` and `page.waitForSelector()` return `ElementHandle | null`.
  When the test expects the element to exist, use a non-null assertion
  (`button!.click()`). A missing element then fails the test with a
  TypeError, as it did before the TypeScript conversion.
- Puppeteer infers the element type from the selector. Tag selectors like
  `input[type='checkbox']` give `HTMLInputElement`, but `[data-testid=…]`
  gives a plain `Element`. Cast inside the callback when you need an
  `HTMLElement` / `HTMLInputElement` member: `el => (el as HTMLInputElement).value`.
- Read `process.env` inside `it` / hooks, not at module top level. Imports
  are evaluated before `dotenv.config()` runs in `tests.ts`.

### Selecting components

Use `data-testid` attributes:

```tsx
<Text data-testid="header-title">Login</Text>
```

Then `popupPage.$('[data-testid=header-title]')` in the test. Preferred over
class names or tag selectors because:

- it doesn't break when the UI is restyled,
- Theme-UI (and eventually Mantine) generates auto-class names that aren't stable,
- it makes test-intent obvious in the source component.

### Gotchas in Puppeteer

- `waitForSelector` can fail with `'Node is either not visible or not an
  HTMLElement'` — pass `{ visible: true }`:
  ```js
  await popupPage.waitForSelector('[data-testid=Allowlist]', { visible: true })
  ```
- If `.click()` isn't registering, try `.evaluate(b => b.click())`:
  ```ts
  await button.evaluate(b => (b as HTMLElement).click())
  ```
- Don't declare named functions (`function foo() {}` or `const foo = () => {}`)
  inside a callback passed to `evaluate` / `$eval` / `$$eval` /
  `waitForFunction`. tsx compiles with esbuild's `keepNames`, which wraps
  named functions in a `__name(...)` helper. Puppeteer serializes the
  callback and runs it in the page, where `__name` doesn't exist, so it
  throws `ReferenceError: __name is not defined`. Inline anonymous arrows
  are fine.

---

## Top-level orchestration (`tests.ts`)

```ts
describe('Tests', () => {
  before(async function () {
    const context = await setup()
    browser   = context.browser
    popupPage = context.popupPage
  })

  it('Initialize', async function () {
    signup(popupPage)
    login(popupPage)
    tutorial(popupPage)
    newsfeed(popupPage)
    autopilot(popupPage)
    locations(popupPage)
    debugLog(popupPage, browser)
    privacyOptions(popupPage, browser)
    allowlist(popupPage, browser)
    account(popupPage)
    logout(popupPage)
  })
})

after(async function () { await browser.close() })
```

Everything happens inside one `it('Initialize', ...)` block because each
scenario defines its own `describe` / `it` structure and they run in order
based on their file sequence.

---

## Mocks

`tests/responsesMocks/locationsMock.ts` is a large server-list fixture
(~5.3k lines) that can be injected via `page.setRequestInterception()` when
you want to test locations UI without depending on the live API. It's not
referenced by any scenario by default — the real tests hit staging — but
it's there as a starting point for offline / deterministic runs.

---

## CI pipeline

`.gitlab-ci.yml`:

```yaml
image:
  name: ${DOCKER_REPO}:master    # registry.gitlab.int.windscribe.com/.../extension-mv3

stages: [prepare_environment, install_packages, test, build]

eslint:
  stage: test
  needs: [ install ]
  script:
    - yarn run lint
    - yarn run typecheck:tests

test:
  stage: test
  needs: [ install ]
  dependencies: [ install ]
  script:
    # ... runner / egress-IP diagnostics ...
    - printf "\nNODE_ENV=production"       >> .env
    - printf "\nAPI_URL=windscribe.com"     >> .env
    - printf "\nBACKUP_API_URL=$BACKUP_API_URL" >> .env
    - printf "\nTEST_USER_NAME=$TEST_USER_NAME"         >> .env
    - printf "\nTEST_USER_PASSWORD=$TEST_USER_PASSWORD" >> .env
    - printf "\nBUILD_USER_NAME=$BUILD_USER_NAME"       >> .env
    - printf "\nBUILD_USER_PASSWORD=$BUILD_USER_PASSWORD" >> .env
    - npx puppeteer browsers install chrome
    - yarn run build
    - Xvfb -ac :99 -screen 0 1280x1024x16 > /dev/null 2>&1 &
    - yarn run test
```

`Dockerfile` (used for the CI image) installs `google-chrome-stable`,
`firefox-esr`, `xvfb`, `libgles2-mesa`, `libgconf-2-4`, `ca-certificates`,
and a pinned `geckodriver` on top of `node:22`, so
Puppeteer's headful runs have somewhere to render. `libgconf-2-4` is a
legacy GNOME-config dep that Chrome's apt package still pulls in via
`crbug.com/795759` even though it's been deprecated upstream — without it,
`google-chrome-stable` fails to launch with a missing-shared-library
error in CI. Don't drop it from the Dockerfile when bumping the base
image.

Credentials (`TEST_USER_*`, `BUILD_USER_*`) come from **GitLab CI
variables**, not from the repo.

### `test:edge`

`test:edge` runs the suite against Microsoft Edge. It checks out the
`edge-master` branch, overlays only `tests/e2e/setup.ts` from the commit
under test (`git checkout "$CI_COMMIT_SHA" -- tests/e2e/setup.ts`), and
runs `edge-master`'s own `yarn test` with `EDGE_BINARY` set. So every other
test file, `package.json`, and the lockfile come from `edge-master`, not
from your branch. If you rename `setup.ts`, update that line too, or the
job fails with "pathspec did not match".

---

## Adding a new scenario

1. Create `tests/e2e/<name>.ts` and export a function that takes
   `popupPage: Page` (and `browser: Browser` if you need a second tab) and
   returns `Promise<void>`.
2. Import and call it from `tests/e2e/tests.ts`'s `Initialize` block.
3. Add whatever `data-testid` attributes you need in the React components
   under test.
4. Run `yarn typecheck:tests`, then `yarn test:local`, before pushing.

---

## What's not tested (yet)

- The PAC script — there's no assertion today that the generated PAC actually
  routes traffic correctly. Worth covering via Puppeteer's request
  interception + `chrome.proxy.settings.set` inspection.
- The generated warp content scripts — bundles are validated for existence
  but not for behaviour. A good candidate for a unit-test layer.
- Offscreen-document handlers (migrations).

---

## See also

- [`build-system.md`](./build-system.md) — why `yarn test` depends on
  `yarn build` running first.
- [`background-service-worker.md`](./background-service-worker.md) — the
  lifecycle tests implicitly rely on.
- [`../README.md`](../README.md) — user-facing test instructions.
