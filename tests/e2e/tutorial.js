const expect = require('chai').expect

const tutorial = async popupPage => {
  describe('Tutorial', async () => {
    it('Start tutorial button', async () => {
      // Ensure that we are on Home page
      await popupPage.waitForSelector('[data-testid=home-page]')

      // Skip tutorial
      await popupPage.waitForSelector('[data-testid=start-tutorial-button]')
      await popupPage.click('[data-testid=start-tutorial-button]')

      const tutorialOverlay = await popupPage.waitForSelector('[id=react-joyride-portal]')

      expect(tutorialOverlay).to.not.equal(undefined)
    })

    it('Go through tutorial buttons', async () => {
      for (let i = 0; i < 6; i++) {
        await popupPage.waitForSelector('[data-testid=tutorial-next-button]')
        popupPage.click('[data-testid=tutorial-next-button]')
        await popupPage.waitForTimeout(500)
      }

      // Ensure that we are on Home page
      const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
      expect(homePage).to.not.equal(undefined)
    })
  })
}

module.exports = { tutorial }
