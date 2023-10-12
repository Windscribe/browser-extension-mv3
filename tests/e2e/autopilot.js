const expect = require('chai').expect

const autopilot = async popupPage => {
  describe('Autopilot', async () => {
    it('Connect to autopilot', async () => {
      // Ensure that we are on Locations page
      popupPage.click('[data-testid=globe-button]')
      await popupPage.waitForSelector('[data-testid=locations-page]')

      await popupPage.waitForSelector('[data-testid=autopilot-list-item]')
      popupPage.click('[data-testid=autopilot-list-item]')

      // Ensure that we are on Home page
      const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
      expect(homePage).to.not.equal(undefined)

      const city = await popupPage.waitForSelector('[data-testid=city]')

      const cityText = await city.evaluate(el => el.textContent)
      expect(cityText).to.equal('Autopilot')
    })

    it('Check if location dependent privacy options are greyed out', async () => {
      popupPage.click('[data-testid=go-to-preferences]')

      await popupPage.waitForSelector('[data-testid=preferences-page]')
      popupPage.click('[data-testid=Privacy]')
      await popupPage.waitForSelector('[data-testid=privacy-page]')

      const locationWarpToggle = await popupPage.waitForSelector(
        '[data-testid=location-warp-toggle]',
      )
      const locationWarpToggleReadOnly = await (
        await locationWarpToggle.getProperty('readOnly')
      ).jsonValue()

      expect(locationWarpToggleReadOnly).to.equal(true)

      const languageWarpToggle = await popupPage.waitForSelector(
        '[data-testid=language-warp-toggle]',
      )
      const languageWarpToggleReadOnly = await (
        await languageWarpToggle.getProperty('readOnly')
      ).jsonValue()

      expect(languageWarpToggleReadOnly).to.equal(true)

      popupPage.click('[data-testid=go-back-button]')
      await popupPage.waitForSelector('[data-testid=preferences-page]')
      popupPage.click('[data-testid=go-back-button]')

      // Ensure that we are on Home page
      const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
      expect(homePage).to.not.equal(undefined)
    })
  })
}

module.exports = { autopilot }
