const { setup } = require('./setup')

describe('Debug Log', () => {
  let browser, debugLogPage, extensionId

  beforeAll(async () => {
    const context = await setup()
    extensionId = context.extensionId
    browser = context.browser

    const debugLogUrl = `chrome-extension://${extensionId}/debugLog.html`

    debugLogPage = await browser.newPage()

    await debugLogPage.goto(debugLogUrl, { waitUntil: 'load' })
  })

  it('Check if debug log page loads', async () => {
    const debugPageElement = await debugLogPage.waitForSelector('[data-testid=debug-page]')
    expect(debugPageElement).toBeTruthy()
  })

  it('Show user info', async () => {
    await debugLogPage.click('[data-testid=user-info-button]')

    const userInfoPanelElement = await debugLogPage.waitForSelector('[data-testid=user-info-panel]')

    await new Promise(r => setTimeout(r, 500))

    const userInfoPanelStyle = await userInfoPanelElement.evaluate(el =>
      getComputedStyle(el).getPropertyValue('transform'),
    )

    expect(userInfoPanelStyle).toEqual('matrix(1, 0, 0, 1, 0, 0)')
  })

  afterAll(async () => {
    await browser.close()
  })
})
