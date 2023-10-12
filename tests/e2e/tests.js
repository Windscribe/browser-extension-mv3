const dotenv = require('dotenv')
dotenv.config()

const { setup } = require('./setup')
const { signup } = require('./signup')
const { login } = require('./login')
const { tutorial } = require('./tutorial')
const { newsfeed } = require('./newsfeed')
const { autopilot } = require('./autopilot')
const { locations } = require('./locations')
const { debugLog } = require('./debugLog')
const { privacyOptions } = require('./privacyOptions')
const { allowlist } = require('./allowlist')
const { account } = require('./account')
const { logout } = require('./logout')

let popupPage, browser
describe('Tests', () => {
  before(async function () {
    console.log('process.env.API_URL: ', process.env.API_URL)
    console.log('process.env.TEST_USER_NAME: ', process.env.TEST_USER_NAME)
    console.log('process.env.TEST_USER_PASSWORD: ', process.env.TEST_USER_PASSWORD)

    const context = await setup()
    browser = context.browser
    popupPage = context.popupPage
  })
  it('Initialize', async function () {
    signup(popupPage)
    login(popupPage)
    tutorial(popupPage)
    newsfeed(popupPage)
    autopilot(popupPage)
    locations(popupPage)
    debugLog(popupPage, browser)
    privacyOptions(popupPage, browser)
    allowlist(popupPage, browser)
    account(popupPage)
    logout(popupPage)
  })
})

after(async function () {
  await browser.close()
})
