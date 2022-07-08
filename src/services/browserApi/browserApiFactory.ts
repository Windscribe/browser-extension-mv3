import chrome, { ChromeApiAdapter } from './chrome';
import safari, { SafariApiAdapter } from './safari';
import edge, { EdgeApiAdapter } from './edge';
import { BROWSER, BrowserName } from '../../utils/constants';
import log from '../../utils/log';

// TODO Describe BrowserApiAdapter interface
type BrowserApiAdapter = ChromeApiAdapter; // | SafariApiAdapter | EdgeApiAdapter;

type BrowserApis = {
	[K in BrowserName]: BrowserApiAdapter;
};

const browserApis: BrowserApis = {
	'Chrome': chrome,
	'Safari': chrome,
	'Edge': chrome
};

const selectedApi = browserApis[BROWSER];

if (!selectedApi) {
	log('Unknown browser name: ', BROWSER, 'error');
}

export default selectedApi;

