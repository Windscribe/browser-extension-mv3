import { fetchServerList, FETCH_SERVER_LIST } from './slices/servers'
import { login, LOGIN } from './slices/session'
import { connectToAutopilot, CONNECT_TO_AUTOPILOT } from './slices/autopilot'
import { fetchBestLocation, FETCH_BEST_LOCATION } from './slices/bestLocation'
import {
  addToWhitelist,
  removeFromWhitelist,
  ADD_TO_WHITELIST,
  REMOVE_FROM_WHITELIST,
  type WhitelistPayload,
} from './slices/whitelist'
import { fetchNotifications, FETCH_NOTIFICATIONS } from './slices/newsfeed'
import { fetchServerCredentials, FETCH_SERVER_CREDENTIALS } from './slices/serverCredentials'
import { fetchUserAgentsList, FETCH_USER_AGENTS_LIST } from './slices/userAgent'
import {
  activateSplitPersonality,
  ACTIVATE_SPLIT_PERSONALITY,
  toggleSplitPersonality,
  TOGGLE_SPLIT_PERSONALITY,
} from './slices/splitPersonalityEnabled'
import { type Credentials } from 'api/types'
import {
  checkUserStash,
  CHECK_USER_STASH,
  saveUserStash,
  SAVE_USER_STASH,
} from './slices/userStashes'
import { chooseIcon, CHOOSE_ICON } from './slices/iconVariant'

type ActionCreator<Payload, AsyncThunkAction> = (originalAction: {
  type: string
  payload: Payload
  _sender: chrome.runtime.MessageSender
}) => AsyncThunkAction

const _login: ActionCreator<Credentials, ReturnType<typeof login>> = ({ payload }) => login(payload)

const _addToWhitelist: ActionCreator<WhitelistPayload, void> = ({ payload }) =>
  addToWhitelist(payload)

const _removeFromWhitelist: ActionCreator<{ domain: string }, void> = ({ payload }) =>
  removeFromWhitelist(payload.domain)

export default {
  [`alias/${LOGIN}`]: _login,
  [`alias/${FETCH_SERVER_LIST}`]: fetchServerList,
  [`alias/${FETCH_SERVER_CREDENTIALS}`]: fetchServerCredentials,
  [`alias/${CONNECT_TO_AUTOPILOT}`]: connectToAutopilot,
  [`alias/${FETCH_BEST_LOCATION}`]: fetchBestLocation,
  [`alias/${ADD_TO_WHITELIST}`]: _addToWhitelist,
  [`alias/${REMOVE_FROM_WHITELIST}`]: _removeFromWhitelist,
  [`alias/${FETCH_NOTIFICATIONS}`]: fetchNotifications,
  [`alias/${SAVE_USER_STASH}`]: saveUserStash,
  [`alias/${CHECK_USER_STASH}`]: checkUserStash,
  [`alias/${FETCH_USER_AGENTS_LIST}`]: fetchUserAgentsList,
  [`alias/${ACTIVATE_SPLIT_PERSONALITY}`]: activateSplitPersonality,
  [`alias/${TOGGLE_SPLIT_PERSONALITY}`]: toggleSplitPersonality,
  [`alias/${CHOOSE_ICON}`]: chooseIcon,
}
