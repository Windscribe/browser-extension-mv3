const { setup } = require('./setup')

describe('Locations', () => {
  let popupPage, browser

  beforeAll(async () => {
    const context = await setup()
    browser = context.browser
    popupPage = context.popupPage
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
    console.log('TEST process.env.TEST_USER_NAME: ', process.env.TEST_USER_NAME)
    console.log('TEST process.env.TEST_USER_NAME: ', process.env.TEST_USER_PASSWORD)
    console.log('TEST process.env.API_URL: ', process.env.API_URL)
    await popupPage.type('[data-testid=username-input]', process.env.TEST_USER_NAME)
    await popupPage.type('[data-testid=password-input]', process.env.TEST_USER_PASSWORD)
    popupPage.click('[data-testid=login-button]')

    // Ensure that we are on Home page and Go to Locations page
    await popupPage.waitForSelector('[data-testid=home-page]')
    popupPage.click('[data-testid=globe-button]')

    // Ensure that we are on Locations page
    await popupPage.waitForSelector('[data-testid=locations-page]')

    // TODO Ensure we have autopilot item
    //await popupPage.waitForSelector('[data-testid=autopilot-list-item]')

    // Verify that only Summary section of Accordion is displayed
    let locationsListSecondItem = await popupPage.waitForSelector(
      '[data-testid=locations-list] > div:nth-child(2)', //Choose second item in a list, because first is could be autopilot
    )
    let accordionChildrenAmount = await locationsListSecondItem.evaluate(el => el.children.length)
    expect(accordionChildrenAmount).toEqual(1)

    // Click on Accordion Summary element
    const summary = await popupPage.waitForSelector(
      '[data-testid=locations-list] > div:nth-child(2) > div',
    )
    await summary.click()

    // Verify that both Summary section and Details dropdown are displayed
    locationsListSecondItem = await popupPage.$(
      '[data-testid=locations-list] > div:nth-child(2)', //Choose second item in a list, because first is could be autopilot
    )
    accordionChildrenAmount = await locationsListSecondItem.evaluate(el => el.children.length)
    expect(accordionChildrenAmount).toEqual(2)

    // Choose a location
    let locationsFirstItem = await popupPage.$('[data-testid=accordion-details-list] > li')
    const spans = await locationsFirstItem.$$('span')
    const expectedCity = await spans[0].evaluate(el => el.textContent)
    const expectedNick = await spans[1].evaluate(el => el.textContent)
    await locationsFirstItem.click()

    // Verify that we were redirected on Home page after a location was chosen
    await popupPage.waitForSelector('[data-testid=home-page]')

    // Verify that location is equal to chosen
    const cityElement = await popupPage.$('[data-testid=city]')
    const city = await cityElement.evaluate(el => el.textContent)
    expect(city).toEqual(expectedCity)
    const nickElement = await popupPage.$('[data-testid=nick]')
    const nick = await nickElement.evaluate(el => el.textContent)
    expect(nick).toEqual(expectedNick)

    // Verify that svg icon changes after location has been selected
    popupPage.click('[data-testid=globe-button]')
    await popupPage.waitForSelector('[data-testid=locations-page]')
    const locationsListSecondItemSummary = await popupPage.waitForSelector(
      // Should be 2 instead of 3.
      // The Problem is that when we open Locations list at first time we haven't have autopilot item yet.
      // It should be fixed
      '[data-testid=locations-list] > div:nth-child(3) > div',
    )
    await locationsListSecondItemSummary.click()
    locationsFirstItem = await popupPage.$('[data-testid=accordion-details-list] > li')
    const arrowIcon = await locationsFirstItem.$('[data-testid=arrow-right-icon]')
    const checkmarkIcon = await locationsFirstItem.$('[data-testid=checkmark-icon]')
    expect(checkmarkIcon).toBeTruthy()
    expect(arrowIcon).toBeNull()
  })

  // afterAll(async () => {
  //   await browser.close()
  // })
})
