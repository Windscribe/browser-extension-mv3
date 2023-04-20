const dotenv = require('dotenv')
dotenv.config()

const { setup } = require('./setup')
const { signup } = require('./signup')
const { login } = require('./login')
const { tutorial } = require('./tutorial')
const { newsfeed } = require('./newsfeed')
const { locations } = require('./locations')
const { debugLog } = require('./debugLog')
const { privacyOptions } = require('./privacyOptions')
const { account } = require('./account')
const { logout } = require('./logout')

let popupPage, browser
describe('Tests', () => {
  before(async function () {
    const context = await setup()
    browser = context.browser
    popupPage = context.popupPage
  })
  it('Initialize', async function () {
    signup(popupPage)
    login(popupPage)
    tutorial(popupPage)
    newsfeed(popupPage)
    locations(popupPage)
    debugLog(popupPage, browser)
    privacyOptions(popupPage, browser)
    account(popupPage)
    logout(popupPage)
  })
})

after(async function () {
  await browser.close()
})
