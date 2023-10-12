const expect = require('chai').expect

const logout = async popupPage => {
  describe('Logout', async () => {
    it('Logout of account', async () => {
      popupPage.click('[data-testid=go-to-preferences]')
      await popupPage.waitForSelector('[data-testid=preferences-page]')

      popupPage.click('[data-testid=logout-button]')
      const splashPage = await popupPage.waitForSelector('[data-testid=splash-page]')

      expect(splashPage).to.not.equal(undefined)
    })
  })
}

module.exports = { logout }
