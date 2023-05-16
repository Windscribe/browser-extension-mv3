const puppeteer = require('puppeteer')
const path = require('path')

const extPath = path.resolve(__dirname, '../../build')

const launchBrowser = async () => {
  await puppeteer.createBrowserFetcher().download(puppeteer.PUPPETEER_REVISIONS.chromium)
  return await puppeteer.launch({
    headless: false,
    devtools: true,
    dumpio: true,
    product: 'chrome',
    slowMo: false,
    args: [
      `--disable-extensions-except=${extPath}`,
      `--load-extension=${extPath}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  })
}

/* 
If you see an 'Error: Node is either not visible or not an HTMLElement',
try to adjust your waitForSelector function with option parameter visible = true
For example
  await popupPage.waitForSelector('[data-testid=Allowlist]', { visible: true })
  await popupPage.click('[data-testid=Allowlist]')

If it doesn't help, try:
  await button.evaluate(b => b.click());
instead of
  await button.click();
*/

const setup = async () => {
  const browser = await launchBrowser()

  // We need to create a random page to run extension's background service worker
  const appUrl = 'http://google.com'
  const appPage = await browser.newPage()
  await appPage.goto(appUrl, { waitUntil: 'load' })

  // extract id to open popup.html
  const targets = await browser.targets()
  const extensionTarget = targets.find(target => target.type() === 'service_worker')
  const partialExtensionUrl = extensionTarget.url() || ''
  const [, , extensionId] = partialExtensionUrl.split('/')

  // Open the Popup in a new tab as a regular webpage
  const popupUrl = `chrome-extension://${extensionId}/popup.html`
  const popupPage = await browser.newPage()
  await popupPage.goto(popupUrl, { waitUntil: 'load' })

  return {
    extensionId,
    browser,
    popupPage,
  }
}

module.exports = { setup }
