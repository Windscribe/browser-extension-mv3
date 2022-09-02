const { setup } = require('./setup')

describe('Locations', () => {
  let popupPage, browser

  beforeAll(async () => {
    const context = await setup()
    browser = context.browser
    popupPage = context.popupPage

    await popupPage.setRequestInterception(true)
    popupPage.on('request', interceptRequestToSession)
  })

  it('Loges in, navigates to Locations page, opens a country/region accordion and selects location', async () => {
    // Go to Login page
    const goLoginButton = await popupPage.$('[data-testid=login-button]')
    await goLoginButton.click()

    // Ensure that we are on Login page
    await popupPage.waitForSelector('[data-testid=login-page]')
    header = await popupPage.$('[data-testid=header-title]')
    title = await header.evaluate(el => el.textContent)
    expect(title).toEqual('Login')

    // Fill login forms
    await popupPage.type('[data-testid=username-input]', 'fakeUser')
    await popupPage.type('[data-testid=password-input]', 'notRealPassword')
    popupPage.click('[data-testid=login-button]')

    // Ensure that we are on Home page and Go to Locations page
    await popupPage.waitForSelector('[data-testid=home-page]')
    popupPage.click('[data-testid=globe-button]')

    // Ensure that we are on Locations page
    await popupPage.waitForSelector('[data-testid=locations-page]')
    const locationsListFirstItem = await popupPage.$('[data-testid=locations-list] > div')

    // Verify that only Summary section of Accordion is displayed
    let accordionChildrenAmount = await locationsListFirstItem.evaluate(el => el.children.length)
    expect(accordionChildrenAmount).toEqual(1)

    // Click on first Accordion item
    await locationsListFirstItem.click()

    // Verify that both Summary section and Details dropdown are displayed
    accordionChildrenAmount = await locationsListFirstItem.evaluate(el => el.children.length)
    expect(accordionChildrenAmount).toEqual(2)

    // Verify that svg icon changes after location has been selected
    const locationsFirstItem = await popupPage.$('[data-testid=accordion-details-list] > li')
    let arrowIcon = await locationsFirstItem.$('[data-testid=arrow-right-icon]')
    let checkmarkIcon = await locationsFirstItem.$('[data-testid=checkmark-icon]')
    expect(arrowIcon).toBeTruthy()
    expect(checkmarkIcon).toBeNull()
    await locationsFirstItem.click()
    arrowIcon = await locationsFirstItem.$('[data-testid=arrow-right-icon]')
    checkmarkIcon = await locationsFirstItem.$('[data-testid=checkmark-icon]')
    expect(checkmarkIcon).toBeTruthy()
    expect(arrowIcon).toBeNull()
  })

  afterAll(async () => {
    await browser.close()
  })
})

const successfulLoginResponseMock = {
  data: {
    session_auth_hash: 'fake_session_auth_hash',
  },
}

function interceptRequestToSession(request) {
  if (request.url().includes('/Session?')) {
    request.respond({
      content: 'application/json',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(successfulLoginResponseMock),
    })
  } else {
    request.continue()
  }
}
