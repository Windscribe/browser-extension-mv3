# Testing

## What we use

[Jest](https://jestjs.io/)

[Puppeteer](https://developers.google.com/web/tools/puppeteer/)

## End-to-end testing

Currently we use only e2e testing.

### Run tests locally

To run e2e tests run the command:

```
$ yarn run test
```

It opens a browser window, runs test scenarios, and closes it automatically. Please, don't interrupt this process by pressing keys or clicking or whatever.

### Setup

An entry point for e2e test is `tests/e2e/setup.js`

To test chrome extensions you need to make sure Puppeteer is launched in headful mode:

```js
browser = await puppeteer.launch({
  headless: false,
  ...
});
```

Also we use the options `--load-extension` and `--disable-extensions-except` to make sure we bootstrap a clean environment where our extension is the only one loaded in the session.

The `startup` function launches browser, creates a tab with `google.com` (any other URL can be used) to launch extension's background service worker, then opens a new tab with Popup. All further tests scenarios run in this tab.

### Create your test scenario

To describe your test scenarios and perform assertions use the whole Jest API as per usual. For example:

```jsx
const { setup } = require('./setup')

describe('Signup', () => {
  let popupPage, browser

  beforeAll(async () => {
    const context = await setup()
    browser = context.browser
    popupPage = context.popupPage
  })

  it('navigate to Signup page and open windscribe website', async () => {
    // Go to Singup page
    const getStartedButton = await popupPage.waitForSelector('[data-testid=get-started-button]')
    await getStartedButton.click()

    // Ensure that we are on Signup page
    let header = await popupPage.waitForSelector('[data-testid=header-title]')
    let title = await header.evaluate(el => el.textContent)
    expect(title).toEqual('Sign up')

	// ... rest of scenario
  })

  afterAll(async () => {
    await browser.close()
  })
})
```

To select a React component that's being used in a test append `data-testid` data attribute to correspondent component:

```jsx
	<Text
        data-testid="header-title"
	/>
```

## Testing stage on CI pipeline

We have the `test` stage on a CI pipeline. It uses the same `yarn run test` command as for local development to launch tests.

We run Puppeteer in headful mode in GitLab CI using Docker executor. This installs Puppeteer on top of a NodeJS container. Docker container uses [Xvfb](https://www.x.org/releases/X11R7.6/doc/man/man1/Xvfb.1.xhtml) to emulate display. Xvfb is an X server that can run on machines with no display hardware and no physical input devices. It emulates a dumb framebuffer using virtual memory.

