const expect = require('chai').expect

const login = async popupPage => {
  describe('Login', async () => {
    it('Go to login page and enter creds', async () => {
      // Go to Login page
      const goLoginButton = await popupPage.$('[data-testid=go-to-login-button]')
      await goLoginButton.click()

      // Ensure that we are on Login page
      await popupPage.waitForSelector('[data-testid=login-page]')
      header = await popupPage.$('[data-testid=header-title]')
      title = await header.evaluate(el => el.textContent)
      expect(title).to.equal('Login')

      // Fill login forms
      await popupPage.type('[data-testid=username-input]', process.env.TEST_USER_NAME)
      await popupPage.type('[data-testid=password-input]', process.env.TEST_USER_PASSWORD)
      popupPage.click('[data-testid=login-button]')

      // Ensure that we are on Home page
      const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
      expect(homePage).to.not.equal(undefined)
    })
  })
}

module.exports = { login }
