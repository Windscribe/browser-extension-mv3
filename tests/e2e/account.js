const expect = require('chai').expect

const account = async popupPage => {
  describe('Account Page', async () => {
    it('Check if account page username matches TEST_USER_NAME', async () => {
      popupPage.click('[data-testid=go-to-preferences]')
      await popupPage.waitForSelector('[data-testid=preferences-page]')
      popupPage.click('[data-testid=Account]')
      await popupPage.waitForSelector('[data-testid=account-page]')

      const usernameElement = await popupPage.$('[data-testid=account-username]')
      const username = await usernameElement.evaluate(el => el.textContent)

      expect(username).to.equal(process.env.TEST_USER_NAME)

      popupPage.click('[data-testid=go-back-button]')
      await popupPage.waitForSelector('[data-testid=preferences-page]')
      popupPage.click('[data-testid=go-back-button]')
      const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
      expect(homePage).to.not.equal(undefined)
    })
  })
}

module.exports = { account }
