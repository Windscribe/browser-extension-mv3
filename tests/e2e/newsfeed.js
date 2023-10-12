const expect = require('chai').expect

const newsfeed = async popupPage => {
  describe('Newsfeed', async () => {
    it('Navigates to Newsfeed page and checks that we can click on news and see a message. Verifies that amount of unread news has been updated.', async () => {
      // Ensure that we are on Home page
      await popupPage.waitForSelector('[data-testid=home-page]')
      // Check unread news amount
      let newsfeedBadge = await popupPage.waitForSelector('[data-testid=newsfeed-badge]')
      let unreadNewsAmount = await newsfeedBadge.evaluate(el => el.textContent)
      expect(unreadNewsAmount).to.equal('5')

      // Go to Newsfeed page
      const goToNewsfeedButton = await popupPage.$('[data-testid=go-to-newsfeed-button]')
      await goToNewsfeedButton.click()

      // Opens message on item click
      let newsfeedPage = await popupPage.waitForSelector('[data-testid=newsfeed-page]')
      const newsfeedItem = await newsfeedPage.$('[data-testid*=newsfeed-item]')
      newsfeedItem.click()
      const message = await newsfeedPage.waitForSelector('[data-testid=newsfeed-item-message]')
      expect(message).to.not.equal(undefined)

      // Go to Home page
      popupPage.click('[data-testid=go-back-button]')

      // Verify that an amount of unread news has been decreased
      newsfeedBadge = await popupPage.waitForSelector('[data-testid=newsfeed-badge]')
      unreadNewsAmount = await newsfeedBadge.evaluate(el => el.textContent)
      expect(unreadNewsAmount).to.equal('4')
    })

    it('Verify that we can go to Newsfeed from Preference page.', async () => {
      //Go to Preference page
      await popupPage.waitForSelector('[data-testid=home-page]')
      popupPage.click('[data-testid=go-to-preferences]')
      await popupPage.waitForSelector('[data-testid=preferences-page]')

      // Verify that we can go to Newsfeed from Preference page
      popupPage.click('[data-testid=go-to-newsfeed-button]')
      newsfeedPage = await popupPage.waitForSelector('[data-testid=newsfeed-page]')
      expect(newsfeedPage).to.not.equal(undefined)

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

module.exports = { newsfeed }
