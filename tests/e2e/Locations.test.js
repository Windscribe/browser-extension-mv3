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
    console.log('Step 0  PASS ############################################')
    const goLoginButton = await popupPage.$('[data-testid=login-button]')
    await goLoginButton.click()
    console.log('Step 1  PASS ############################################')

    // Ensure that we are on Login page
    await popupPage.waitForSelector('[data-testid=login-page]')
    header = await popupPage.$('[data-testid=header-title]')
    title = await header.evaluate(el => el.textContent)
    expect(title).toEqual('Login')
    console.log('Step 2  PASS ############################################')

    // Fill login forms
    await popupPage.type('[data-testid=username-input]', process.env.TEST_USER_NAME)
    await popupPage.type('[data-testid=password-input]', process.env.TEST_USER_PASSWORD)
    popupPage.click('[data-testid=login-button]')

    // Ensure that we are on Home page and Go to Locations page
    await popupPage.waitForSelector('[data-testid=home-page]')
    popupPage.click('[data-testid=globe-button]')
    console.log('Step 3  PASS ############################################')

    // Ensure that we are on Locations page
    await popupPage.waitForSelector('[data-testid=locations-page]')

    // Ensure we have spinner while locations are being downloading from BE
    await popupPage.waitForSelector('[data-testid=spinner]')
    console.log('Step 4  PASS ############################################')

    // Ensure we have autopilot item
    await popupPage.waitForSelector('[data-testid=autopilot-list-item]')

    // Verify that only Summary section of Accordion is displayed
    let locationsListFirstItem = await popupPage.waitForSelector(
      '[data-testid=locations-list-item-0]',
    )
    let accordionChildrenAmount = await locationsListFirstItem.evaluate(el => el.children.length)
    expect(accordionChildrenAmount).toEqual(1)
    console.log('Step 5  PASS ############################################')

    // Click on Accordion Summary element
    await locationsListFirstItem.click()

    // Verify that both Summary section and Details dropdown are displayed
    accordionChildrenAmount = await locationsListFirstItem.evaluate(el => el.children.length)
    expect(accordionChildrenAmount).toEqual(2)

    console.log('Step 6  PASS ############################################')

    // Choose a location
    let locationsFirstItem = await popupPage.$('[data-testid=accordion-details-list] > li')
    const spans = await locationsFirstItem.$$('span')
    const expectedCity = await spans[0].evaluate(el => el.textContent)
    const expectedNick = await spans[1].evaluate(el => el.textContent)
    await locationsFirstItem.click()

    // Verify that we were redirected on Home page after a location was chosen
    await popupPage.waitForSelector('[data-testid=home-page]')
    console.log('Step 7  PASS ############################################')

    // Verify that location is equal to chosen
    const cityElement = await popupPage.$('[data-testid=city]')
    const city = await cityElement.evaluate(el => el.textContent)
    expect(city).toEqual(expectedCity)
    const nickElement = await popupPage.$('[data-testid=nick]')
    const nick = await nickElement.evaluate(el => el.textContent)
    expect(nick).toEqual(expectedNick)
    console.log('Step 8  PASS ############################################')

    // Verify that svg icon changes after location has been selected
    popupPage.click('[data-testid=globe-button]')
    await popupPage.waitForSelector('[data-testid=locations-page]')
    locationsListFirstItem = await popupPage.waitForSelector('[data-testid=locations-list-item-0]')
    await locationsListFirstItem.click()
    locationsFirstItem = await popupPage.$('[data-testid=accordion-details-list] > li')
    const arrowIcon = await locationsFirstItem.$('[data-testid=arrow-right-icon]')
    const checkmarkIcon = await locationsFirstItem.$('[data-testid=checkmark-icon]')
    expect(checkmarkIcon).toBeTruthy()
    expect(arrowIcon).toBeNull()
    console.log('Step 9  PASS ############################################')
  })

  afterAll(async () => {
    console.log('Step 10  PASS ############################################')

    await browser.close()
  })
})
