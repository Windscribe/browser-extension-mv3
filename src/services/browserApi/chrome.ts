import { STORAGE_CACHE_VERSION } from '../../utils/constants';

type OnChangedCallBack = Parameters<typeof chrome.storage.onChanged.addListener>[0];

// TODO Review types
const api = {
	subscribeOnStorageChange(cb: OnChangedCallBack) {
		chrome.storage.onChanged.addListener(cb);
	},

	async getStateFromStorage(keys?: string[]): Promise<Record<string, any>> {
		return await chrome.storage.local.get(STORAGE_CACHE_VERSION);
	},

	async clearStateInStorage() {
		return await chrome.storage.local.clear();
	},

	async saveStateInStorage(state: Record<string, any>) {
		return await chrome.storage.local.set({ [STORAGE_CACHE_VERSION]: state });
	}
};

export type ChromeApiAdapter = typeof api;

export default api;