import edge, { EdgeApiAdapter } from './edge';
import chrome, { ChromeApiAdapter } from './chrome';
import safari, { SafariApiAdapter } from './safari';
import log from 'utils/log';
import { BROWSER, BrowserName } from 'utils/constants';

type BrowserApiAdapter = ChromeApiAdapter | SafariApiAdapter | EdgeApiAdapter;

type BrowserApis = {
	[K in BrowserName]: BrowserApiAdapter;
};

const browserApis: BrowserApis = {
	'Chrome': chrome,
	'Safari': safari,
	'Edge': edge,
};

const selectedApi = browserApis[BROWSER];

if (!selectedApi) {
	log('Unknown browser name: ', BROWSER, 'error');
}

export default selectedApi;

