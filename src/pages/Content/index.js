console.log('%c Content script works!', 'background: #383E49; color: #1ADEAE');
// Example of how to use proxyStore

/*
import { REACT_APP_REDUX_PORT } from 'utils/constants';

try {
	const proxyStore = new ProxyStore({
		portName: REACT_APP_REDUX_PORT,
	});
	await proxyStore.ready();
	proxyStore.subscribe(() => {
		// your logic, runs on every store update
	});
} catch (err) {
	log('Error while creating proxy store in a content script: ', err, 'error');
}
*/


// Demo of how to spoof an userAgent
/*
try {
	log('navigator.userAgent before: ', navigator.userAgent);
	navigator.__defineGetter__('userAgent', () => "IamNotChrome");
	log('navigator.userAgent after: ', navigator.userAgent);
} catch (err) {
	log('Error while spoofing userAgent in a content script: ', err, 'error');
}
*/