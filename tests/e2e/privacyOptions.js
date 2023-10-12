const expect = require('chai').expect

const privacyOptions = async (popupPage, browser) => {
  describe('Privacy Options', async () => {
    it('Open privacy page and enable privacy options', async () => {
      popupPage.click('[data-testid=go-to-preferences]')

      await popupPage.waitForSelector('[data-testid=preferences-page]')
      popupPage.click('[data-testid=Privacy]')
      await popupPage.waitForSelector('[data-testid=privacy-page]')

      await popupPage.$$eval("input[type='checkbox']", checks => checks.forEach(c => c.click()))
    })

    it('Open test page', async () => {
      const appUrl = 'http://google.com'
      const appPage = await browser.newPage()
      await appPage.goto(appUrl, { waitUntil: 'load' })

      const locale = await appPage.evaluate(() => Intl.DateTimeFormat().resolvedOptions().locale)

      expect(locale === 'en-CA').to.equal(true)

      appPage.close()

      popupPage.click('[data-testid=go-back-button]')
      await popupPage.waitForSelector('[data-testid=preferences-page]')
      popupPage.click('[data-testid=go-back-button]')

      // Ensure that we are on Home page
      const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
      expect(homePage).to.not.equal(undefined)
    })
  })
}

module.exports = { privacyOptions }
