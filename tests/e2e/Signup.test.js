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

    // Go to Login page
    const goLoginButton = await popupPage.$('[data-testid=header-go-to-button]')
    await goLoginButton.click()

    // Ensure that we are on Login page
    await popupPage.waitForSelector('[data-testid=login-page]')
    header = await popupPage.$('[data-testid=header-title]')
    title = await header.evaluate(el => el.textContent)
    expect(title).toEqual('Login')

    // Go back
    const goBackButton = await popupPage.$('[data-testid=go-back-button]')
    await goBackButton.click()

    // Ensure that we are on Signup page
    await popupPage.waitForSelector('[data-testid=signup-page]')
    header = await popupPage.$('[data-testid=header-title]')
    title = await header.evaluate(el => el.textContent)
    expect(title).toEqual('Sign up')

    // Ensures links to external pages work
    const openWindscribeSignupButton = await popupPage.$('[data-testid=windscribe-signup-button]')
    const [target] = await Promise.all([
      new Promise(resolve => browser.once('targetcreated', resolve)),
      await openWindscribeSignupButton.click(),
    ])
    const url = await target.url()
    expect(url).toEqual('https://windscribe.com/signup?cpid=ext_chrome&platform=chrome')
  })

  afterAll(async () => {
    await browser.close()
  })
})
