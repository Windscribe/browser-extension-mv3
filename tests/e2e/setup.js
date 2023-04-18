const puppeteer = require('puppeteer')
const path = require('path')

const extPath = path.resolve(__dirname, '../../build')

const launchBrowser = async () =>
  await puppeteer.launch({
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

  // Go to Login page
  const goLoginButton = await popupPage.$('[data-testid=login-button]')
  await goLoginButton.click()

  // Ensure that we are on Login page
  await popupPage.waitForSelector('[data-testid=login-page]')
  header = await popupPage.$('[data-testid=header-title]')
  title = await header.evaluate(el => el.textContent)
  expect(title).toEqual('Login')

  // Fill login forms
  await popupPage.type('[data-testid=username-input]', process.env.TEST_USER_NAME)
  await popupPage.type('[data-testid=password-input]', process.env.TEST_USER_PASSWORD)
  popupPage.click('[data-testid=login-button]')
  await page.waitForTimeout(3000)

  // Skip tutorial
  await popupPage.waitForSelector('[data-testid=skip-tutorial]')
  await popupPage.click('[data-testid=skip-tutorial]')

  // Ensure that we are on Home page
  const homePage = await popupPage.waitForSelector('[data-testid=home-page]')

  expect(homePage).toBeTruthy()

  return {
    extensionId,
    browser,
    popupPage,
  }
}

module.exports = { setup }
