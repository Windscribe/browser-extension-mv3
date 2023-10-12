import locales from 'utils/locales'
import getTimeWarp from 'utils/getTimeWarp'
import { type StoreType } from 'state/store'
import type { Coords, TimeWarp } from 'utils/types'
import { locationWarp, languageWarp, splitPersonality, timeWarp, workerBlock } from 'pages/content'

const executeScript = async <Data extends string | Coords | TimeWarp | object>(
  tabId: number,
  func: (data: Data) => void,
  data: Data,
) => {
  chrome.scripting.executeScript({
    target: { tabId: tabId, allFrames: true },
    world: 'MAIN',
    injectImmediately: true,
    func: func,
    args: [data],
  })
}

type WebNavDetails = chrome.webNavigation.WebNavigationTransitionCallbackDetails

export function navigationCommittedHandler(bgStore: Promise<StoreType>) {
  return async (details: WebNavDetails): Promise<void> => {
    // We do not inject any scripts in iframes.
    if (details.frameId > 0) return
    // We do not inject any scripts in subsidiary chrome tabs.
    if (details.url?.startsWith('chrome://')) return undefined
    if (details.url?.startsWith('chrome-extension://')) return undefined
    // Execute scripts on extensions catalog page is restricted by Google for security reasons
    if (details.url?.startsWith('https://chrome.google.com/webstore/category/extensions'))
      return undefined

    const store = await bgStore

    const { hostname } = new URL(details.url)
    const allowlistItem = store.getState().allowlist[hostname]

    // We do not inject any spoofing script if this domain is in an allowlist.
    if (allowlistItem?.allowPrivacyFeatures) return

    if (store.getState().workerBlock) {
      executeScript(details.tabId, workerBlock, '')
    }

    if (store.getState().splitPersonalityEnabled && store.getState().userAgent.spoofed) {
      const spoofedUserAgent = store.getState().userAgent.spoofed

      executeScript(details.tabId, splitPersonality, spoofedUserAgent)
    }

    if (store.getState().proxy.status !== 'on') return
    if (store.getState().autopilot.autopilotSelected) return

    if (store.getState().locationWarp) {
      const coords = store.getState().currentDataCenter?.gps?.split(',')

      if (!coords) return

      const locationWarpInfo: Coords = {
        latitude: coords[0],
        longitude: coords[1],
      }

      executeScript(details.tabId, locationWarp, locationWarpInfo)
    }

    if (store.getState().languageWarpEnabled) {
      const currentCountryCode = store.getState().currentLocation.country_code || 'AUTO'
      const spoofedLocaleCode = locales[currentCountryCode].locale || 'en'

      executeScript(details.tabId, languageWarp, spoofedLocaleCode)
    }

    if (store.getState().timeWarpEnabled) {
      const currentLocationTimezone = store.getState().currentLocation.tz
      if (!currentLocationTimezone) return

      const spoofedTime = getTimeWarp(currentLocationTimezone)
      if (!spoofedTime) return

      executeScript(details.tabId, timeWarp, {
        timezone: spoofedTime.desiredTimezone,
        offset: spoofedTime.offset?.toString(),
      })
    }
  }
}
