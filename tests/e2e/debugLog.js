const expect = require('chai').expect

const debugLog = async (popupPage, browser) => {
  describe('Debug Log', async () => {
    let debugLogPage

    it('Open debug log form general preferences ', async () => {
      //Go to Preference page
      await popupPage.waitForSelector('[data-testid=home-page]')
      popupPage.click('[data-testid=go-to-preferences]')
      await popupPage.waitForSelector('[data-testid=preferences-page]')

      await popupPage.waitForSelector('[data-testid=General]')
      popupPage.click('[data-testid=General]')

      await popupPage.waitForSelector('[data-testid=general-page]')
      popupPage.click('[data-testid=general-page]')

      await popupPage.waitForSelector('[data-testid=view-debug-log]')
      popupPage.click('[data-testid=view-debug-log]')

      await popupPage.waitForTimeout(500)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [tab1, tab2, tab3, tab4] = await browser.pages()
      debugLogPage = tab4
      const debugPage = await debugLogPage.waitForSelector('[data-testid=debug-page]')
      expect(debugPage).to.not.equal(undefined)
    })

    it('Check if debug log page loads', async () => {
      const debugPageElement = await debugLogPage.waitForSelector('[data-testid=debug-page]')
      expect(debugPageElement).to.not.equal(undefined)
    })

    it('Show user info', async () => {
      await debugLogPage.click('[data-testid=user-info-button]')

      const userInfoPanelElement = await debugLogPage.waitForSelector(
        '[data-testid=user-info-panel]',
      )

      await new Promise(r => setTimeout(r, 500))

      const userInfoPanelStyle = await userInfoPanelElement.evaluate(el =>
        getComputedStyle(el).getPropertyValue('transform'),
      )

      expect(userInfoPanelStyle).to.equal('matrix(1, 0, 0, 1, 0, 0)')
    })

    it('Close debug log and return to extension home page.', async () => {
      debugLogPage.close()

      // Go to Home page
      popupPage.click('[data-testid=go-back-button]')
      await popupPage.waitForSelector('[data-testid=preferences-page]')
      popupPage.click('[data-testid=go-back-button]')

      // Ensure that we are on Home page
      const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
      expect(homePage).to.not.equal(undefined)
    })
  })
}

module.exports = { debugLog }
