import { expect } from 'chai'
import type { Page } from 'puppeteer'

export const logout = async (popupPage: Page): Promise<void> => {
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
