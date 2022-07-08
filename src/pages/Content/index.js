console.log('%c Content script works!', 'background: #383E49; color: #1ADEAE');

// Example of how to use proxyStore
/*
try {
	const proxyStore = new ProxyStore({
		portName: process.env.REACT_APP_REDUX_PORT || 'WS_BROWSER_EXTENSION_STORE',
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