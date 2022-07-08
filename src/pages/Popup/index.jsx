import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import Example from './Example';
import { ProxyStore } from '../../state';
import browserApi from '../../services/browserApi';
import { STORAGE_CACHE_VERSION, REACT_APP_REDUX_PORT } from '../../utils/constants';

const proxyStore = new ProxyStore({
	portName: REACT_APP_REDUX_PORT
});

await proxyStore.ready();

// TODO Write types
const update = (changes, areaName) => {
	const newState = changes[STORAGE_CACHE_VERSION].newValue;

	// TODO Review replaceState(newState) method. Consider to use patchState()
	proxyStore.replaceState(newState);
};

browserApi.subscribeOnStorageChange(update);

render(
	<Provider store={proxyStore}>
		<Example />,
	</Provider>,

	// TODO Consider to use
	// const root = ReactDOM.createRoot(document.getElementById('app-container'))
	// instead
	window.document.querySelector('#app-container')
);

// TODO Figure out what is it
if (module.hot) module.hot.accept();
