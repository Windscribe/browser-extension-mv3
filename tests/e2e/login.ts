import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import type { ElementHandle, Page } from 'puppeteer'

export const login = async (popupPage: Page): Promise<void> => {
  describe('Login', async () => {
    it('Go to login page and enter creds', async () => {
      const { TEST_USER_NAME, TEST_USER_PASSWORD } = process.env
      if (!TEST_USER_NAME || !TEST_USER_PASSWORD) {
        throw new Error('TEST_USER_NAME and TEST_USER_PASSWORD must be set in .env')
      }

      // Go to Login page
      const goLoginButton = await popupPage.$('[data-testid=go-to-login-button]')
      await goLoginButton!.click()

      // Ensure that we are on Login page
      await popupPage.waitForSelector('[data-testid=login-page]')
      const header = await popupPage.$('[data-testid=header-title]')
      const title = await header!.evaluate(el => el.textContent)
      expect(title).to.equal('Login')

      // Hashed login uses the same account hash for both credential fields.
      const hashTab = await popupPage.$('[data-testid=login-mode-tab-hash]')
      await hashTab!.click()
      await popupPage.waitForSelector('[data-testid=account-hash-input]')

      const hashSourcePath = path.resolve(__dirname, '../../package.json')
      const expectedAccountHash =
        '0x' +
        crypto.createHash('sha256').update(fs.readFileSync(hashSourcePath)).digest('hex').slice(-32)
      const hashFileInput = (await popupPage.$(
        '[data-testid=account-hash-file-input]',
      )) as ElementHandle<HTMLInputElement>
      await hashFileInput.uploadFile(hashSourcePath)
      await popupPage.waitForFunction(
        expected =>
          document.querySelector<HTMLInputElement>('[data-testid=account-hash-input]')!.value ===
          expected,
        {},
        expectedAccountHash,
      )

      const usernameTab = await popupPage.$('[data-testid=login-mode-tab-username]')
      await usernameTab!.click()
      await popupPage.waitForSelector('[data-testid=username-input]')
      expect(await popupPage.$('[data-testid=account-hash-input]')).to.equal(null)

      // Fill login forms
      await popupPage.type('[data-testid=username-input]', TEST_USER_NAME)
      await popupPage.type('[data-testid=password-input]', TEST_USER_PASSWORD)
      popupPage.click('[data-testid=login-button]')

      // Ensure that we are on Home page
      const homePage = await popupPage.waitForSelector('[data-testid=home-page]')
      expect(homePage).to.not.equal(undefined)
    })
  })
}
