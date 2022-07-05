// import { ProxyStore } from '../../state/webExtAdapter';

console.log('%c Content script works!', 'background: #383E49; color: #1ADEAE');
console.log('%c process.env.REACT_APP_REDUX_PORT ', 'background: #383E49; color: #1ADEAE', process.env.REACT_APP_REDUX_PORT);
// try {
// 	const proxyStore = new ProxyStore({
// 		portName: process.env.REACT_APP_REDUX_PORT || 'WS_BROWSER_EXTENSION_STORE',
// 	});
// 	await proxyStore.ready();
// 	console.log('%c proxy', 'background: #383E49; color: #1ADEAE', proxyStore);
// } catch (err) {
// 	console.log('%c err: ', 'background: #c83E49; color: #1ADEAE', err);
// }


// Trying to spoof userAgent
// try {
// 	console.log('%c 1 navigator.userAgent:', 'background: #383E49; color: #1ADEAE', navigator.userAgent);
// 	// navigator.userAgent = 'spoofed!';
// 	console.log('%c 2 navigator.userAgent:', 'background: #383E49; color: #1ADEAE', navigator.userAgent);
// 	navigator.__defineGetter__('userAgent', function() {
// 		return "Netscape";
// 	});
// 	console.log('%c 3 navigator.userAgent:', 'background: #383E49; color: #1ADEAE', navigator.userAgent);


// } catch (err) {
// 	console.log('%c err: ', 'background: #c83E49; color: #1ADEAE', err);

// }
