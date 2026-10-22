import dotenv from 'dotenv'
import type { Browser, Page } from 'puppeteer'

import { setup } from './setup'
import { signup } from './signup'
import { login } from './login'
import { tutorial } from './tutorial'
import { newsfeed } from './newsfeed'
import { autopilot } from './autopilot'
import { locations } from './locations'
import { debugLog } from './debugLog'
import { privacyOptions } from './privacyOptions'
import { allowlist } from './allowlist'
import { account } from './account'
import { logout } from './logout'

dotenv.config()

let popupPage: Page, browser: Browser
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
