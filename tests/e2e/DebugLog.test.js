const { setup } = require('./setup')

describe('Debug Log', () => {
  let browser

  beforeAll(async () => {
    const context = await setup()
    extensionId = context.extensionId
    browser = context.browser
  })

  it('Check if debug log page loads', async () => {
    const debugLogUrl = `chrome-extension://${extensionId}/debugLog.html`
    const debugLogPage = await browser.newPage()
    await debugLogPage.goto(debugLogUrl, { waitUntil: 'load' })
    const debugPageElement = await debugLogPage.waitForSelector('[data-testid=debug-page]')
    expect(debugPageElement).toBeTruthy()
  })

  it('Show user info', async () => {
    popupPage.click('[data-testid=user-info-button]')

    const userInfoPanelElement = await popupPage.$('[data-testid=account-username]')

    expect(userInfoPanelElement).to.have.property('transform', 'translateX(0)')
  })

  afterAll(async () => {
    await browser.close()
  })
})
