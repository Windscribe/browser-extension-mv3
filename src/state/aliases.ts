import { fetchServerList, FETCH_SERVER_LIST } from './slices/servers'
import {
  login,
  LOGIN,
  logout,
  LOGOUT,
  checkSessionStatus,
  CHECK_SESSION_STATUS,
} from './slices/session'
import { fetchBestLocation, FETCH_BEST_LOCATION } from './slices/bestLocation'
import {
  addToAllowlist,
  removeFromAllowlist,
  ADD_TO_ALLOWLIST,
  REMOVE_FROM_ALLOWLIST,
  type AllowlistPayload,
} from './slices/allowlist'
import { fetchNotifications, FETCH_NOTIFICATIONS } from './slices/newsfeed'
import { fetchServerCredentials, FETCH_SERVER_CREDENTIALS } from './slices/serverCredentials'
import { fetchUserAgentsList, FETCH_USER_AGENTS_LIST } from './slices/userAgent'
import {
  activateSplitPersonality,
  ACTIVATE_SPLIT_PERSONALITY,
  toggleSplitPersonality,
  TOGGLE_SPLIT_PERSONALITY,
} from './slices/splitPersonalityEnabled'
import type { Credentials } from 'api/types'
import {
  checkUserStash,
  CHECK_USER_STASH,
  saveUserStash,
  SAVE_USER_STASH,
} from './slices/userStashes'
import { chooseIcon, CHOOSE_ICON } from './slices/iconVariant'
import { checkCurrentIp, CHECK_CURRENT_IP } from './slices/proxy'

type ActionCreator<Payload, AsyncThunkAction> = (originalAction: {
  type: string
  payload: Payload
  _sender: chrome.runtime.MessageSender
}) => AsyncThunkAction

const _login: ActionCreator<Credentials, ReturnType<typeof login>> = ({ payload }) => login(payload)

const _addToAllowlist: ActionCreator<AllowlistPayload, void> = ({ payload }) =>
  addToAllowlist(payload)

const _removeFromAllowlist: ActionCreator<{ domain: string }, void> = ({ payload }) =>
  removeFromAllowlist(payload.domain)

export default {
  [`alias/${LOGIN}`]: _login,
  [`alias/${LOGOUT}`]: logout,
  [`alias/${FETCH_SERVER_LIST}`]: fetchServerList,
  [`alias/${FETCH_SERVER_CREDENTIALS}`]: fetchServerCredentials,
  [`alias/${FETCH_BEST_LOCATION}`]: fetchBestLocation,
  [`alias/${ADD_TO_ALLOWLIST}`]: _addToAllowlist,
  [`alias/${REMOVE_FROM_ALLOWLIST}`]: _removeFromAllowlist,
  [`alias/${FETCH_NOTIFICATIONS}`]: fetchNotifications,
  [`alias/${SAVE_USER_STASH}`]: saveUserStash,
  [`alias/${CHECK_USER_STASH}`]: checkUserStash,
  [`alias/${FETCH_USER_AGENTS_LIST}`]: fetchUserAgentsList,
  [`alias/${ACTIVATE_SPLIT_PERSONALITY}`]: activateSplitPersonality,
  [`alias/${TOGGLE_SPLIT_PERSONALITY}`]: toggleSplitPersonality,
  [`alias/${CHOOSE_ICON}`]: chooseIcon,
  [`alias/${CHECK_SESSION_STATUS}`]: checkSessionStatus,
  [`alias/${CHECK_CURRENT_IP}`]: checkCurrentIp,
}
