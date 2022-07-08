import { initializeWrappedStore } from '../../state';
import log from '../../utils/log';

; (async () => {
	await initializeWrappedStore();
	const storage = await chrome.storage.local.get(null);
	log('bg storage', storage);
})();

