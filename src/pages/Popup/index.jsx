import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store as ProxyStore } from '@eduardoac-skimlinks/webext-redux';

import Popup from './Popup';
import './index.css';

const proxyStore = new ProxyStore({
	portName: process.env.REACT_APP_REDUX_PORT || 'WS_BROWSER_EXTENSION_STORE',
});

await proxyStore.ready();

render(
	<Provider store={proxyStore}>
		<Popup store={proxyStore} />,
	</Provider>,

	// TODO Consider to use
	// const root = ReactDOM.createRoot(document.getElementById('app-container'))
	// instead
	window.document.querySelector('#app-container')
);


if (module.hot) module.hot.accept();
