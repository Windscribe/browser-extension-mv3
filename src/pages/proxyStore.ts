import { applyMiddleware, Store } from '@eduardoac-skimlinks/webext-redux'
import thunkMiddleware from 'redux-thunk'

import { REACT_APP_REDUX_PORT } from 'utils/constants'

const proxyStore = new Store({
  portName: REACT_APP_REDUX_PORT,
})

const middleware = [thunkMiddleware]
const proxyStoreWithMiddleware = applyMiddleware(proxyStore, ...middleware)

export default proxyStoreWithMiddleware
export type ProxyStore = typeof proxyStoreWithMiddleware
