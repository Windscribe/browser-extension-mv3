import {
  setAutopilotAsCurrent,
  fetchServerList,
  FETCH_SERVER_LIST,
  SET_AUTOPILOT_AS_CURRENT,
} from './slices/servers'
import { login, LOGIN, type Credentials } from './slices/session'

type ActionCreator<Payload, AsyncThunkAction> = (originalAction: {
  type: string
  payload: Payload
  _sender: chrome.runtime.MessageSender
}) => AsyncThunkAction

const _login: ActionCreator<Credentials, ReturnType<typeof login>> = ({ payload }) => login(payload)

export default {
  [`alias/${LOGIN}`]: _login,
  [`alias/${FETCH_SERVER_LIST}`]: fetchServerList,
  [`alias/${SET_AUTOPILOT_AS_CURRENT}`]: setAutopilotAsCurrent,
}
