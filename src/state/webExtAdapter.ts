// The place to store webext-redux libary logic. 
import { wrapStore, Store } from '@eduardoac-skimlinks/webext-redux';
import { configureStore } from '@reduxjs/toolkit';

// import store from './store';
import testReducer, { recreateSlice } from './slices/test';
import log from '../utils/log';

const reducer = {
	test: testReducer,
};

// export default () => {
// 	wrapStore(store, {
// 		portName: process.env.REACT_APP_REDUX_PORT || 'WS_BROWSER_EXTENSION_STORE',
// 	});
// };

const CACHE_VERSION = '1';

async function loadState(keys?: string[]): Promise<Record<string, any>> {
	const storage = await chrome.storage.local.get(CACHE_VERSION);
	log('adapter loadState() storage', storage);
	return storage;
}

function clearState() {
	return chrome.storage.local.clear();
};

async function saveState(state: Record<string, any>): Promise<void> {
	await chrome.storage.local.set({ [CACHE_VERSION]: state });
}


export default async function initializeExtension() {
	const stateFromStorage = await loadState();
	log('adapter stateFromStorage', stateFromStorage.test);

	// Change reducer?
	const { reducer } = recreateSlice(stateFromStorage.test);
	const store = configureStore({
		reducer: reducer
	});
	wrapStore(store, { portName: process.env.REACT_APP_REDUX_PORT });

	/**
	 * Clear the state information after the store has updated
	 * IMPORTANT: After we store the state for a new cache version
	 * in Chrome.store.local, clearState will remove any older cache versions
	 * preventing us from exceeding its max quota allocation.
	 * (Currently, 5MB - 17/02/2022)
	 *
	 */
	await clearState();
	/*
	 * Keeping a copy of the redux store in [Chrome local storage API](https://developer.chrome.com/docs/extensions/reference/storage/#property-local).
	 * Redux store doesn't persist in memory forever - in Windows environment
	 * it's deleted every time the browser closes (OSX behaves differently).
	 */
	log('adapter store.getState()', store.getState());
	await saveState(store.getState());

	store.subscribe(() => {
		log('adapter store.subscribe', store.getState());
		saveState(store.getState());
	});
}

export { Store as ProxyStore };