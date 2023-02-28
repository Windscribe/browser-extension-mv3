const { setup } = require('./setup')

describe('User', () => {
  let popupPage, browser

  beforeAll(async () => {
    const context = await setup()
    browser = context.browser
    popupPage = context.popupPage
  })

  it('Check if account page username matches TEST_USER_NAME', async () => {
    popupPage.click('[data-testid=go-to-preferences]')
    await popupPage.waitForSelector('[data-testid=preferences-page]')
    popupPage.click('[data-testid=Account]')
    await popupPage.waitForSelector('[data-testid=account-page]')

    const usernameElement = await popupPage.$('[data-testid=account-username]')
    const username = await usernameElement.evaluate(el => el.textContent)

    expect(username).toEqual(process.env.TEST_USER_NAME)
  })

  it('Logout', async () => {
    popupPage.click('[data-testid=go-back-button]')

    await popupPage.waitForSelector('[data-testid=preferences-page]')
    popupPage.click('[data-testid=logout-button]')
    const splashPage = await popupPage.waitForSelector('[data-testid=splash-page]')

    expect(splashPage).toBeTruthy()
  })

  afterAll(async () => {
    await browser.close()
  })
})
