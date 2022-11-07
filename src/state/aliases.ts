import {
  fetchServerList,
  fetchServerCredentials,
  FETCH_SERVER_LIST,
  FETCH_SERVER_CREDENTIALS,
} from './slices/servers'
import { login, LOGIN } from './slices/session'
import { connectToAutopilot, CONNECT_TO_AUTOPILOT } from './slices/autopilot'
import { fetchBestLocation, FETCH_BEST_LOCATION } from './slices/bestLocation'
import { type Credentials } from 'api/types'

type ActionCreator<Payload, AsyncThunkAction> = (originalAction: {
  type: string
  payload: Payload
  _sender: chrome.runtime.MessageSender
}) => AsyncThunkAction

const _login: ActionCreator<Credentials, ReturnType<typeof login>> = ({ payload }) => login(payload)

export default {
  [`alias/${LOGIN}`]: _login,
  [`alias/${FETCH_SERVER_LIST}`]: fetchServerList,
  [`alias/${FETCH_SERVER_CREDENTIALS}`]: fetchServerCredentials,
  [`alias/${CONNECT_TO_AUTOPILOT}`]: connectToAutopilot,
  [`alias/${FETCH_BEST_LOCATION}`]: fetchBestLocation,
}
