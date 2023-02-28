const { setup } = require('./setup')

describe('Newsfeed', () => {
  let popupPage, browser

  beforeAll(async () => {
    const context = await setup()
    browser = context.browser
    popupPage = context.popupPage
  })

  it('Navigates to Newsfeed page and checks that we can click on news and see a message. Verifies that amount of unread news has been updated.', async () => {
    // Wait for all API requests fulfilled and page rerenders
    await page.waitForTimeout(3000)

    // Check unread news amount
    let newsfeedBadge = await popupPage.waitForSelector('[data-testid=newsfeed-badge]')
    let unreadNewsAmount = await newsfeedBadge.evaluate(el => el.textContent)
    expect(unreadNewsAmount).toEqual('5')

    // Go to Newsfeed page
    const goToNewsfeedButton = await popupPage.$('[data-testid=go-to-newsfeed-button]')
    await goToNewsfeedButton.click()

    // Opens message on item click
    let newsfeedPage = await popupPage.waitForSelector('[data-testid=newsfeed-page]')
    const newsfeedItem = await newsfeedPage.$('[data-testid*=newsfeed-item]')
    newsfeedItem.click()
    const message = await newsfeedPage.waitForSelector('[data-testid=newsfeed-item-message]')
    expect(message).toBeDefined()

    // Go to Home page
    popupPage.click('[data-testid=go-back-button]')

    // Verify that an amount of unread news has been decreased
    newsfeedBadge = await popupPage.waitForSelector('[data-testid=newsfeed-badge]')
    unreadNewsAmount = await newsfeedBadge.evaluate(el => el.textContent)
    expect(unreadNewsAmount).toEqual('4')

    //Go to Preference page
    await popupPage.waitForSelector('[data-testid=home-page]')
    popupPage.click('[data-testid=go-to-preferences]')
    await popupPage.waitForSelector('[data-testid=preferences-page]')

    // Verify that we can go to Newsfeed from Preference page
    popupPage.click('[data-testid=go-to-newsfeed-button]')
    newsfeedPage = await popupPage.waitForSelector('[data-testid=newsfeed-page]')
    expect(newsfeedPage).toBeDefined()
  })

  afterAll(async () => {
    await browser.close()
  })
})
