const expect = require('chai').expect

const locations = async popupPage => {
  describe('Locations', async () => {
    it('Should show countries and cities that match search string', async () => {
      // Ensure that we are on Locations page
      popupPage.click('[data-testid=globe-button]')
      await popupPage.waitForSelector('[data-testid=locations-page]')

      // Ensure we have 3 location + autopilot
      let locationsList = await popupPage.$('[data-testid=locations-list]')
      let children = await locationsList.evaluate(el => el.children.length)
      expect(children).to.equal(4)

      // Type text to search
      await popupPage.click('[data-testid=location-search-button]')
      await popupPage.type('[data-testid=location-search-input]', 'ca')
      await popupPage.waitForTimeout(500)

      // Ensure we have only 1 location with 'ca' substring included - "Canada  East"
      locationsList = await popupPage.$('[data-testid=locations-list]')
      children = await locationsList.evaluate(el => el.children.length)
      expect(children).to.equal(1)
      let expectedLocation = await locationsList.evaluate(el => el.textContent)
      expect(expectedLocation).to.equal('Canada East')

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
      expect(children).to.equal(3)
      const dataCentersList = await locationsList.$$('[data-testid=accordion-details-list]')
      const dataCentersNames = await Promise.all(
        dataCentersList.map(dataCenter => dataCenter.evaluate(el => el.textContent)),
      )
      expect(dataCentersNames.toString()).to.equal(
        'TorontoSkydome,BostonThe Wahlberg,PyongyangHennessey',
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
      expect(expectedMessage).to.equal('No Results :(')

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
      expect(expectedLocation).to.equal('AutopilotCanada EastUnited StatesThe Best Korea')

      await popupPage.click('[data-testid=sort-locations-button]')
      await popupPage.waitForTimeout(500)

      // Ensure that locations with sorted by alphabet
      locationsList = await popupPage.$('[data-testid=locations-list]')
      expectedLocation = await locationsList.evaluate(el => el.textContent)
      expect(expectedLocation).to.equal('AutopilotCanada EastThe Best KoreaUnited States')

      await popupPage.click('[data-testid=sort-locations-button]')
      await popupPage.waitForTimeout(500)

      // Ensure that locations with sorted by geography again
      locationsList = await popupPage.$('[data-testid=locations-list]')
      expectedLocation = await locationsList.evaluate(el => el.textContent)
      expect(expectedLocation).to.equal('AutopilotCanada EastUnited StatesThe Best Korea')
      await popupPage.waitForTimeout(1000)
    })

    it('Should add location to favorite by clicking on heart button ', async () => {
      // Ensure that we are on Locations page
      await popupPage.waitForSelector('[data-testid=locations-page]')

      // Click on Accordion Summary element
      const locationsListFirstItem = await popupPage.waitForSelector(
        '[data-testid=locations-list-item-0]',
      )
      await locationsListFirstItem.click()

      // Choose a location
      const cityElement = await locationsListFirstItem.$('[data-testid=data-center-city]')
      const heartButton = await locationsListFirstItem.$('[data-testid=heart-icon-button]')
      const expectedCity = await cityElement.evaluate(el => el.textContent)
      await heartButton.click()

      // Go to Favorites
      const favoritesTabButton = await popupPage.$('[data-testid="favorites-tab"]')
      await favoritesTabButton.click()
      const cityInFavorite = await popupPage.$('[data-testid=data-center-city]')
      const cityInFavoriteName = await cityInFavorite.evaluate(el => el.textContent)
      expect(cityInFavoriteName).to.equal(expectedCity)

      //Go back to Home page
      await popupPage.waitForTimeout(1000)
      await popupPage.click('[data-testid=locations-tab]')
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
      expect(accordionChildrenAmount).to.equal(1)

      // Click on Accordion Summary element
      await locationsListFirstItem.click()

      // Verify that both Summary section and Details dropdown are displayed
      accordionChildrenAmount = await locationsListFirstItem.evaluate(el => el.children.length)
      expect(accordionChildrenAmount).to.equal(2)

      // Choose a location
      let locationsFirstItem = await popupPage.$('[data-testid=accordion-details-list] > li')
      let cityElement = await locationsFirstItem.$('[data-testid=data-center-city]')
      let nickElement = await locationsFirstItem.$('[data-testid=data-center-nick]')
      const expectedCity = await cityElement.evaluate(el => el.textContent)
      const expectedNick = await nickElement.evaluate(el => el.textContent)

      await cityElement.click()

      // Verify that we were redirected on Home page after a location was chosen
      await popupPage.waitForSelector('[data-testid=home-page]')

      // Verify that location is equal to chosen
      cityElement = await popupPage.$('[data-testid=city]')
      const city = await cityElement.evaluate(el => el.textContent)
      expect(city).to.equal(expectedCity)
      nickElement = await popupPage.$('[data-testid=nick]')
      const nick = await nickElement.evaluate(el => el.textContent)
      expect(nick).to.equal(expectedNick)

      // Verify that svg icon changes after location has been selected
      popupPage.click('[data-testid=globe-button]')
      await popupPage.waitForSelector('[data-testid=locations-page]')
      locationsListFirstItem = await popupPage.waitForSelector(
        '[data-testid=locations-list-item-0]',
      )
      await locationsListFirstItem.click()
      locationsFirstItem = await popupPage.$('[data-testid=accordion-details-list] > li')
      const arrowIcon = await locationsFirstItem.$('[data-testid=arrow-right-icon]')
      const checkmarkIcon = await locationsFirstItem.$('[data-testid=checkmark-icon]')
      expect(!!checkmarkIcon).to.equal(true)
      expect(arrowIcon).to.equal(null)

      //Go back to Home page
      await popupPage.click('[data-testid=go-back-button]')
    })
  })
}

module.exports = { locations }
