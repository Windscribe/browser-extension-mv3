const expect = require('chai').expect

const allowlist = async (popupPage, browser) => {
  describe('Allowlist', async () => {
    let appUrl, testPage, userAgentSpoofed, appVersionSpoofed
    before(async function () {
      appUrl = 'http://google.com'
      testPage = await browser.newPage()
    })

    it('Open test page and ensure that serviceWorker functions are spoofed with empty object', async () => {
      await testPage.goto(appUrl, { waitUntil: 'load' })

      const worker = await testPage.evaluate(() => typeof window.Worker)
      const sharedWorker = await testPage.evaluate(() => typeof window.SharedWorker)
      const serviceWorkerConstructor = await testPage.evaluate(
        () => window.navigator.serviceWorker.constructor.name,
      )

      expect(worker).to.equal('object')
      expect(sharedWorker).to.equal('object')
      expect(serviceWorkerConstructor).not.to.equal('ServiceWorkerContainer')
    })

    it('Open test page and save spoofed UserAgent as a local variable', async () => {
      userAgentSpoofed = await testPage.evaluate(() => window.navigator.userAgent)
      appVersionSpoofed = await testPage.evaluate(() => window.navigator.appVersion)
      const userAgentData = await testPage.evaluate(() => window.navigator.userAgentData)

      expect(userAgentData).to.equal(undefined)
    })

    it('Push test page to allowlist', async () => {
      try {
        await popupPage.bringToFront()
        await popupPage.waitForSelector('[data-testid=home-page]')

        // Go to Preferences page
        await popupPage.waitForSelector('[data-testid=go-to-preferences]')
        await popupPage.click('[data-testid=go-to-preferences]')
        await popupPage.waitForSelector('[data-testid=preferences-page]')

        // Go to Allowlist page
        await popupPage.waitForSelector('[data-testid=Allowlist]', { visible: true })
        await popupPage.click('[data-testid=Allowlist]')
        await popupPage.waitForSelector('[data-testid=allowlist-page]')

        // Open popup with allowlist settings
        await popupPage.waitForSelector('[data-testid=add-to-allowlist-button]')
        await popupPage.click('[data-testid=add-to-allowlist-button]')
        await popupPage.waitForSelector('[data-testid=allowlist-settings-popup]')

        // Fill input and Allow Privacy Features for test page
        // There is a bug with Page.type()
        // Details by link https://github.com/puppeteer/puppeteer/issues/1648
        await popupPage.waitForSelector('[data-testid=allowlist-domain-input]')
        await popupPage.click('[data-testid=allowlist-domain-input]', { delay: 200 })
        await popupPage.keyboard.press('Backspace')
        await popupPage.type('[data-testid=allowlist-domain-input]', 'www.google.com', {
          delay: 80,
        })

        await popupPage.waitForTimeout(800)

        await popupPage.waitForSelector('[data-testid=allow-privacy-features-checkbox]')
        popupPage.click('[data-testid=allow-privacy-features-checkbox]')

        await popupPage.waitForSelector('[data-testid=allowlist-popup-submit-button]')
        await popupPage.click('[data-testid=allowlist-popup-submit-button]')

        // Verify domain appeared on allowlist-page
        await popupPage.waitForSelector('[data-testid=allowlist-items-list]')
        await popupPage.waitForTimeout(800)
        const hasTestPage = await popupPage.evaluate(() => {
          return [
            ...document.querySelectorAll("div[data-testid='allowlist-items-list'] > div > span"),
          ].some(element => element.textContent === 'www.google.com')
        })
        expect(hasTestPage).to.equal(true)

        // Return to home page
        await popupPage.waitForSelector('[data-testid=go-back-button]')
        await popupPage.click('[data-testid=go-back-button]')
        await popupPage.waitForSelector('[data-testid=preferences-page]')
        await popupPage.click('[data-testid=go-back-button]')
        const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
        expect(homePage).to.not.equal(undefined)
      } catch (e) {
        console.log('CAN NOT WAIT ANYMORE.', e)
        console.log('CAUSE', e?.cause)
      }
    })

    it('Open test page which is allowlisted now, and ensure that serviceWorker is NOT spoofed', async () => {
      // Refresh test page to apply changes
      testPage.bringToFront()
      await testPage.reload()

      const worker = await testPage.evaluate(() => typeof window.Worker)
      const sharedWorker = await testPage.evaluate(() => typeof window.SharedWorker)
      const serviceWorkerConstructor = await testPage.evaluate(
        () => window.navigator.serviceWorker.constructor.name,
      )

      expect(worker).to.equal('function')
      expect(sharedWorker).to.equal('function')
      expect(serviceWorkerConstructor).to.equal('ServiceWorkerContainer')
    })

    it('Open test page and ensure that UserAgent original value is recovered', async () => {
      const userAgentOriginal = await testPage.evaluate(() => window.navigator.userAgent)
      const appVersionOriginal = await testPage.evaluate(() => window.navigator.appVersion)
      const userAgentData = await testPage.evaluate(() => window.navigator.userAgentData)

      expect(userAgentSpoofed).not.to.equal(userAgentOriginal)
      expect(appVersionSpoofed).not.to.equal(appVersionOriginal)
      expect(userAgentData).not.to.equal(undefined)
    })
    after(async function () {
      testPage.close()
      popupPage.bringToFront()
    })
  })
}

module.exports = { allowlist }
