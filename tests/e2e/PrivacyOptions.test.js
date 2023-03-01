const { setup } = require('./setup')

describe('Privacy Options', () => {
  let popupPage, browser

  beforeAll(async () => {
    const context = await setup()
    browser = context.browser
    popupPage = context.popupPage
  })

  it('Connect to Toronto server', async () => {
    popupPage.click('[data-testid=globe-button]')

    await popupPage.waitForSelector('[data-testid=locations-page]')
    popupPage.click('[data-testid=locations-list-item-0]')

    await popupPage.waitForSelector('[data-testid=data-center-nick]')
    popupPage.click('[data-testid=data-center-nick]')

    await popupPage.waitForSelector('[data-testid=locations-page]')

    const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
    expect(homePage).toBeTruthy()
  })

  it('Open privacy page and enable privacy options', async () => {
    popupPage.click('[data-testid=go-to-preferences]')

    await popupPage.waitForSelector('[data-testid=preferences-page]')
    popupPage.click('[data-testid=Privacy]')
    await popupPage.waitForSelector('[data-testid=privacy-page]')

    await popupPage.$$eval("input[type='checkbox']", checks => checks.forEach(c => c.click()))
  })

  it('Open test page', async () => {
    const appUrl = 'http://google.com'
    const appPage = await browser.newPage()
    await appPage.goto(appUrl, { waitUntil: 'load' })

    const locale = await appPage.evaluate(() => Intl.DateTimeFormat().resolvedOptions().locale)

    expect(locale === 'en-CA').toBeTruthy()
  })

  afterAll(async () => {
    await browser.close()
  })
})
