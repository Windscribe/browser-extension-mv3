import { fetchServerList, FETCH_SERVER_LIST } from './slices/servers'
import { login, LOGIN, type Credentials } from './slices/session'
import { connectToBestLocation, CONNECT_TO_BEST_LOCATION } from './slices/bestLocation'

type ActionCreator<Payload, AsyncThunkAction> = (originalAction: {
  type: string
  payload: Payload
  _sender: chrome.runtime.MessageSender
}) => AsyncThunkAction

const _login: ActionCreator<Credentials, ReturnType<typeof login>> = ({ payload }) => login(payload)

export default {
  [`alias/${LOGIN}`]: _login,
  [`alias/${FETCH_SERVER_LIST}`]: fetchServerList,
  [`alias/${CONNECT_TO_BEST_LOCATION}`]: connectToBestLocation,
}
