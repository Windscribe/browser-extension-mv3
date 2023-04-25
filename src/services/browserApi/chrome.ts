import { type RootState } from 'state'
import { STORAGE_CACHE_VERSION } from 'utils/constants'

type OnChangedCallBack = Parameters<typeof chrome.storage.onChanged.addListener>[0]
type OnMessageCallBack = Parameters<typeof chrome.runtime.onMessage.addListener>[0]
type Message = Record<'type', string>

const api = {
  subscribeOnStorageChange(cb: OnChangedCallBack): void {
    chrome.storage.onChanged.addListener(cb)
  },

  async getStateFromStorage(): Promise<Record<string, RootState>> {
    return await chrome.storage.local.get(STORAGE_CACHE_VERSION)
  },

  async clearStateInStorage(): Promise<void> {
    return await chrome.storage.local.clear()
  },

  async saveStateInStorage(state: RootState): Promise<void> {
    return await chrome.storage.local.set({ [STORAGE_CACHE_VERSION]: state })
  },

  runtime: {
    sendMessage(message: Message, cb: (response: Message) => void): void {
      chrome.runtime.sendMessage(message, cb)
    },
    onMessage: {
      addListener(cb: OnMessageCallBack): void {
        chrome.runtime.onMessage.addListener(cb)
      },
    },
    onStartup: {
      addListener(cb: (a?: unknown) => void): void {
        chrome.runtime.onStartup.addListener(cb)
      },
    },
  },
}

export type ChromeApiAdapter = typeof api

export default api
