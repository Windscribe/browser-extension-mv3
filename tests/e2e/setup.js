const puppeteer = require('puppeteer')
const path = require('path')

const extPath = path.resolve(__dirname, '../../build')

const launchBrowser = async () =>
  await puppeteer.launch({
    headless: false,
    devtools: false,
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
    browser,
    popupPage,
  }
}

module.exports = { setup }
