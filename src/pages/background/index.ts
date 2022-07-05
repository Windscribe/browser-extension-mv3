import { wrapStore } from '../../state';
import log from '../../utils/log';

log('v3 manifest extension background page.');

; (async () => {
	wrapStore();
	const all = await chrome.storage.local.get(null);
	log("background all", all);
})();

