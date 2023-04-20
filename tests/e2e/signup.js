const expect = require('chai').expect

const signup = async popupPage => {
  describe('Signup', async () => {
    it('navigate to Signup page and open windscribe website', async () => {
      // Go to Singup page
      const getStartedButton = await popupPage.waitForSelector('[data-testid=get-started-button]')
      await getStartedButton.click()

      // Ensure that we are on Signup page
      let header = await popupPage.waitForSelector('[data-testid=header-title]')
      let title = await header.evaluate(el => el.textContent)
      expect(title).to.equal('Sign up')

      // TODO: fix this:
      // Ensures links to external pages work
      //   const openWindscribeSignupButton = await popupPage.$('[data-testid=windscribe-signup-button]')
      //   const [target] = await Promise.all([
      //     new Promise(resolve => browser.once('targetcreated', resolve)),
      //     openWindscribeSignupButton.click(),
      //   ])
      //   const url = await target.url()
      //   expect(url).to.equal('https://windscribe.com/signup?cpid=ext_chrome&platform=chrome')
      //   await popupPage.bringToFront()

      // Go back
      const goBackButton = await popupPage.$('[data-testid=go-back-button]')
      await goBackButton.click()

      // Ensure that we are on splash page
      const splashPage = await popupPage.waitForSelector('[data-testid=splash-page]')
      expect(splashPage).to.not.equal(undefined)
    })
  })
}

module.exports = { signup }
