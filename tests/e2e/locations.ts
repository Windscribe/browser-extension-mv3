import { expect } from 'chai'
import type { Page } from 'puppeteer'

export const locations = async (popupPage: Page): Promise<void> => {
  describe('Locations', async () => {
    it('Should show countries and cities that match search string', async () => {
      // Ensure that we are on Locations page
      popupPage.click('[data-testid=globe-button]')
      await popupPage.waitForSelector('[data-testid=locations-page]')

      // Ensure we have at least one location + autopilot
      let locationsList = await popupPage.$('[data-testid=locations-list]')
      const unfilteredCount = await locationsList!.evaluate(el => el.children.length)
      expect(unfilteredCount).to.greaterThan(1)

      const searchTerm = 'canada'
      // Type text to search
      await popupPage.click('[data-testid=location-search-button]')
      await popupPage.type('[data-testid=location-search-input]', searchTerm)
      await popupPage.waitForFunction(
        (count, term) => {
          const list = document.querySelector('[data-testid=locations-list]')
          return (
            list !== null &&
            list.children.length < count &&
            (list.textContent ?? '').toLowerCase().includes(term)
          )
        },
        { polling: 100 },
        unfilteredCount,
        searchTerm,
      )

      // Ensure search filtered the list and results contain the search term
      locationsList = await popupPage.$('[data-testid=locations-list]')
      let filteredCount = await locationsList!.evaluate(el => el.children.length)
      expect(filteredCount).to.be.lessThan(unfilteredCount)
      expect(filteredCount).to.be.greaterThan(0)
      const visibleText = await locationsList!.evaluate(el => el.textContent!.toLowerCase())
      expect(visibleText).to.include(searchTerm.toLowerCase())

      // Reset input field value
      await popupPage.focus('[data-testid=location-search-input]')
      for (const _ of searchTerm) {
        await popupPage.keyboard.down('Backspace')
      }

      // Type new text to search
      const citySearchTerm = 'ron'
      await popupPage.type('[data-testid=location-search-input]', citySearchTerm)
      await popupPage.waitForFunction(
        term => {
          const names = [
            ...document.querySelectorAll(
              '[data-testid=locations-list] [data-testid=accordion-details-list]',
            ),
          ].map(el => (el.textContent ?? '').toLowerCase())
          return names.length > 0 && names.every(name => name.includes(term))
        },
        { polling: 100 },
        citySearchTerm,
      )

      // Ensure search filtered the list and datacenter names contain the search term
      locationsList = await popupPage.$('[data-testid=locations-list]')
      filteredCount = await locationsList!.evaluate(el => el.children.length)
      expect(filteredCount).to.be.lessThan(unfilteredCount)
      expect(filteredCount).to.be.greaterThan(0)
      const dataCentersList = await locationsList!.$$('[data-testid=accordion-details-list]')
      const dataCentersNames = await Promise.all(
        dataCentersList.map(dataCenter => dataCenter.evaluate(el => el.textContent!.toLowerCase())),
      )
      const allContainTerm = dataCentersNames.every(name => name.includes(citySearchTerm))
      expect(allContainTerm).to.be.true

      // Reset input field value
      await popupPage.focus('[data-testid=location-search-input]')
      for (const _ of citySearchTerm) {
        await popupPage.keyboard.down('Backspace')
      }

      // Type new text to search
      await popupPage.type('[data-testid=location-search-input]', 'Terra Incognita')
      await popupPage.waitForFunction(
        () =>
          document.querySelector('[data-testid=locations-list]')?.textContent === 'No Results :(',
        { polling: 100 },
      )

      // Ensure we show a message if no match was found
      locationsList = await popupPage.$('[data-testid=locations-list]')
      const expectedMessage = await locationsList!.evaluate(el => el.textContent)
      expect(expectedMessage).to.equal('No Results :(')

      // Reset input field value
      await popupPage.$eval(
        '[data-testid=location-search-input]',
        el => ((el as HTMLInputElement).value = ''),
      )
      await popupPage.click('[data-testid=locations-list]')
      await popupPage.evaluate(() => new Promise(r => setTimeout(r, 1000)))
    })

    it('Should sort countries by alphabet or by geography ', async () => {
      // Ensure that we are on Locations page
      await popupPage.waitForSelector('[data-testid=locations-page]')

      const getLocationNames = async () => {
        const items = await popupPage.$$('[data-testid=location-name]')
        const names = await Promise.all(items.map(item => item.evaluate(el => el.textContent!)))
        return names.filter(name => name !== 'Autopilot')
      }

      // Ensure autopilot is present at the top of the list
      const autopilotItem = await popupPage.$('[data-testid=autopilot-list-item]')
      expect(autopilotItem).to.not.be.null

      // Capture default (geography) order
      const geoOrder = await getLocationNames()
      expect(geoOrder.length).to.be.greaterThan(0)

      await popupPage.click('[data-testid=sort-locations-button]')
      await popupPage.evaluate(() => new Promise(r => setTimeout(r, 500)))

      // Capture alphabetical order and verify it's sorted
      const alphaOrder = await getLocationNames()
      const sortedAlpha = [...alphaOrder].sort((a, b) => a.localeCompare(b))
      expect(alphaOrder).to.deep.equal(sortedAlpha)

      await popupPage.click('[data-testid=sort-locations-button]')
      await popupPage.evaluate(() => new Promise(r => setTimeout(r, 500)))

      // Verify toggling back restores the original geography order
      const geoOrderAgain = await getLocationNames()
      expect(geoOrderAgain).to.deep.equal(geoOrder)
      await popupPage.evaluate(() => new Promise(r => setTimeout(r, 1000)))
    })

    it('Should add location to favorite by clicking on heart button ', async () => {
      // Ensure that we are on Locations page
      await popupPage.waitForSelector('[data-testid=locations-page]')

      // Click on Accordion Summary element
      const locationsListFirstItem = await popupPage.waitForSelector(
        '[data-testid=locations-list-item-0]',
      )
      await locationsListFirstItem!.click()

      // Choose a location
      const cityElement = await locationsListFirstItem!.$('[data-testid=data-center-city]')
      const heartButton = await locationsListFirstItem!.$('[data-testid=heart-icon-button]')
      const expectedCity = await cityElement!.evaluate(el => el.textContent)
      await heartButton!.click()

      // Go to Favorites
      const favoritesTabButton = await popupPage.$('[data-testid="favorites-tab"]')
      await favoritesTabButton!.click()
      await popupPage.evaluate(() => new Promise(r => setTimeout(r, 1000)))
      const cityInFavorite = await popupPage.$('[data-testid=data-center-city]')
      const cityInFavoriteName = await cityInFavorite!.evaluate(el => el.textContent)
      expect(cityInFavoriteName).to.equal(expectedCity)

      //Go back to Home page
      await popupPage.evaluate(() => new Promise(r => setTimeout(r, 1000)))
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
      let accordionChildrenAmount = await locationsListFirstItem!.evaluate(el => el.children.length)
      // details are always visible and hidden via css only
      expect(accordionChildrenAmount).to.equal(1)

      // Click on Accordion Summary element
      await locationsListFirstItem!.click()

      // Verify that both Summary section and Details dropdown are displayed
      accordionChildrenAmount = await locationsListFirstItem!.evaluate(el => el.children.length)
      expect(accordionChildrenAmount).to.equal(1)

      // Choose a location - select first non-upgrade item
      let allListItems = await locationsListFirstItem!.$$(
        '[data-testid=accordion-details-list] > li',
      )
      let locationsFirstItem: typeof allListItems[number] | null = null
      for (const item of allListItems) {
        const textContent = await item.evaluate(el => el.textContent!)
        if (!textContent.includes('UPGRADE')) {
          locationsFirstItem = item
          break
        }
      }

      await locationsFirstItem!.evaluate(el => el.click())

      console.log('locationsFirstItem', await locationsFirstItem!.evaluate(el => el.textContent))

      let cityElement = await locationsFirstItem!.$('[data-testid=data-center-city]')
      let nickElement = await locationsFirstItem!.$('[data-testid=data-center-nick]')
      const expectedCity = await cityElement!.evaluate(el => el.textContent)
      const expectedNick = await nickElement!.evaluate(el => el.textContent)

      await popupPage.evaluate(element => {
        ;(element as HTMLElement).click()
      }, cityElement!)

      // Verify that we were redirected on Home page after a location was chosen
      await popupPage.waitForSelector('[data-testid=home-page]')

      // Verify that location is equal to chosen
      cityElement = await popupPage.$('[data-testid=city]')
      const city = await cityElement!.evaluate(el => el.textContent)
      expect(city).to.equal(expectedCity)
      nickElement = await popupPage.$('[data-testid=nick]')
      const nick = await nickElement!.evaluate(el => el.textContent)
      expect(nick).to.equal(expectedNick)

      // Verify that svg icon changes after location has been selected
      popupPage.click('[data-testid=globe-button]')
      await popupPage.waitForSelector('[data-testid=locations-page]')
      locationsListFirstItem = await popupPage.waitForSelector(
        '[data-testid=locations-list-item-0]',
      )
      await locationsListFirstItem!.click()

      await popupPage.evaluate(element => {
        ;(element as HTMLElement).click()
      }, locationsListFirstItem!)

      allListItems = await locationsListFirstItem!.$$('[data-testid=accordion-details-list] > li')

      for (const item of allListItems) {
        const textContent = await item.evaluate(el => el.textContent!)
        if (!textContent.includes('UPGRADE')) {
          locationsFirstItem = item
          break
        }
      }
      const arrowIcon = await locationsFirstItem!.$('[data-testid=arrow-right-icon]')
      const checkmarkIcon = await locationsFirstItem!.$('[data-testid=checkmark-icon]')
      expect(!!checkmarkIcon).to.equal(true)
      expect(arrowIcon).to.equal(null)

      //Go back to Home page
      await popupPage.click('[data-testid=go-back-button]')
      await popupPage.evaluate(() => new Promise(r => setTimeout(r, 1500)))
    })
  })
}
