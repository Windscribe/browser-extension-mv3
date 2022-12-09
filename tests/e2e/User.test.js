const { setup } = require('./setup')

describe('User', () => {
  let popupPage, browser

  beforeAll(async () => {
    const context = await setup()
    browser = context.browser
    popupPage = context.popupPage
  })

  it('Succesfully logs in', async () => {
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

    // Ensure that we are on Home page and Go to Locations page
    const homePage = await popupPage.waitForSelector('[data-testid=home-page]')

    expect(homePage).toBeTruthy()
  })

  it('Should show countries and cities that match search string', async () => {
    // Ensure that we are on Locations page
    popupPage.click('[data-testid=globe-button]')
    await popupPage.waitForSelector('[data-testid=locations-page]')
    await popupPage.waitForTimeout(3000)

    // Ensure we have 3 location + autopilot
    let locationsList = await popupPage.$('[data-testid=locations-list]')
    let children = await locationsList.evaluate(el => el.children.length)
    expect(children).toEqual(4)

    // Type text to search
    await popupPage.click('[data-testid=location-search-button]')
    await popupPage.type('[data-testid=location-search-input]', 'ca')
    await popupPage.waitForTimeout(500)

    // Ensure we have only 1 location with 'ca' substring included - "Canada  East"
    locationsList = await popupPage.$('[data-testid=locations-list]')
    children = await locationsList.evaluate(el => el.children.length)
    expect(children).toEqual(1)
    let expectedLocation = await locationsList.evaluate(el => el.textContent)
    expect(expectedLocation).toEqual('Canada East')

    // Reset input field value
    await popupPage.focus('[data-testid=location-search-input]')
    await popupPage.keyboard.down('Backspace')
    await popupPage.keyboard.down('Backspace')

    // Type new text to search
    await popupPage.type('[data-testid=location-search-input]', 'on')
    await popupPage.waitForTimeout(500)

    // Ensure we found 3 cities with 'on' substring included
    locationsList = await popupPage.$('[data-testid=locations-list]')
    children = await locationsList.evaluate(el => el.children.length)
    expect(children).toEqual(3)
    const dataCentersList = await locationsList.$$('[data-testid=accordion-details-list]')
    const dataCentersNames = await Promise.all(
      dataCentersList.map(dataCenter => dataCenter.evaluate(el => el.textContent)),
    )
    expect(dataCentersNames.toString()).toEqual(
      'Toronto Skydome,Boston The Wahlberg,Pyongyang Hennessey',
    )

    // Reset input field value
    await popupPage.focus('[data-testid=location-search-input]')
    await popupPage.keyboard.down('Backspace')
    await popupPage.keyboard.down('Backspace')

    // Type new text to search
    await popupPage.type('[data-testid=location-search-input]', 'Terra Incognita')
    await popupPage.waitForTimeout(500)

    // Ensure we show a message if no match was found
    locationsList = await popupPage.$('[data-testid=locations-list]')
    const expectedMessage = await locationsList.evaluate(el => el.textContent)
    expect(expectedMessage).toEqual('No Results :(')

    // Reset input field value
    await popupPage.$eval('[data-testid=location-search-input]', el => (el.value = ''))
    await popupPage.click('[data-testid=locations-list]')
    await popupPage.waitForTimeout(1000)
  })

  it('Should sort countries by alphabet or by geography ', async () => {
    // Ensure that we are on Locations page
    await popupPage.waitForSelector('[data-testid=locations-page]')

    // Ensure that locations with sorted by geography
    let locationsList = await popupPage.$('[data-testid=locations-list]')
    let expectedLocation = await locationsList.evaluate(el => el.textContent)
    expect(expectedLocation).toEqual('AutopilotCanada EastUnited StatesThe Best Korea')

    await popupPage.click('[data-testid=sort-locations-button]')
    await popupPage.waitForTimeout(500)

    // Ensure that locations with sorted by alphabet
    locationsList = await popupPage.$('[data-testid=locations-list]')
    expectedLocation = await locationsList.evaluate(el => el.textContent)
    expect(expectedLocation).toEqual('AutopilotCanada EastThe Best KoreaUnited States')

    await popupPage.click('[data-testid=sort-locations-button]')
    await popupPage.waitForTimeout(500)

    // Ensure that locations with sorted by geography again
    locationsList = await popupPage.$('[data-testid=locations-list]')
    expectedLocation = await locationsList.evaluate(el => el.textContent)
    expect(expectedLocation).toEqual('AutopilotCanada EastUnited StatesThe Best Korea')
    await popupPage.waitForTimeout(1000)
  })

  it('Navigates to Locations page, opens a country/region accordion and selects location', async () => {
    // Ensure that we are on Locations page
    await popupPage.waitForSelector('[data-testid=locations-page]')

    // Ensure we have autopilot item
    await popupPage.waitForSelector('[data-testid=autopilot-list-item]')

    // Verify that only Summary section of Accordion is displayed
    let locationsListFirstItem = await popupPage.waitForSelector(
      '[data-testid=locations-list-item-0]',
    )
    let accordionChildrenAmount = await locationsListFirstItem.evaluate(el => el.children.length)
    expect(accordionChildrenAmount).toEqual(1)

    // Click on Accordion Summary element
    await locationsListFirstItem.click()

    // Verify that both Summary section and Details dropdown are displayed
    accordionChildrenAmount = await locationsListFirstItem.evaluate(el => el.children.length)
    expect(accordionChildrenAmount).toEqual(2)

    // Choose a location
    let locationsFirstItem = await popupPage.$('[data-testid=accordion-details-list] > li')
    let cityElement = await locationsFirstItem.$('[data-testid=data-center-city]')
    let nickElement = await locationsFirstItem.$('[data-testid=data-center-nick]')
    const expectedCity = await cityElement.evaluate(el => el.textContent)
    const expectedNick = await nickElement.evaluate(el => el.textContent)

    await locationsFirstItem.click()

    // Verify that we were redirected on Home page after a location was chosen
    await popupPage.waitForSelector('[data-testid=home-page]')

    // Verify that location is equal to chosen
    cityElement = await popupPage.$('[data-testid=city]')
    const city = await cityElement.evaluate(el => el.textContent)
    expect(city).toEqual(expectedCity)
    nickElement = await popupPage.$('[data-testid=nick]')
    const nick = await nickElement.evaluate(el => el.textContent)
    expect(nick).toEqual(expectedNick)

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
  })

  it('Check if account page username matches TEST_USER_NAME', async () => {
    popupPage.click('[data-testid=go-back-button]')

    await popupPage.waitForSelector('[data-testid=home-page]')
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

  // afterAll(async () => {
  //   await browser.close()
  // })
})
