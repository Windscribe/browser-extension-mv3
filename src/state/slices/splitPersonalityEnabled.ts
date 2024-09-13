import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { pushToDebugLog } from 'services/debugLog'
import { setRandomSpoofedUserAgent } from './userAgent'
import {
  spoofUserAgentHeader,
  resetSpoofUserAgentHeader,
} from 'services/declarativeNetRequest/updateDynamicRules'
import {
  getScriptForId,
  registerScript,
  unregisterScript,
  updateScript,
} from 'utils/scriptController'
import { splitPersonalityScriptId } from 'utils/constants'
import { SHA256 } from 'crypto-js'
import transformAllowListToExcludeMatches from 'utils/transformAllowListToExcludeMatches'

type SplitPersonalityEnabledState = boolean
const initialState: SplitPersonalityEnabledState = false

export const TOGGLE_SPLIT_PERSONALITY = 'splitPersonalityEnabled/toggle'
export const toggleSplitPersonality = createAsyncThunk(
  TOGGLE_SPLIT_PERSONALITY,
  async (_, { dispatch, getState }) => {
    const isEnabled = getState().splitPersonalityEnabled
    if (isEnabled) {
      await dispatch(deactivateSplitPersonality())
    } else {
      await dispatch(activateSplitPersonality())
    }
  },
)

export const deactivateSplitPersonality = createAsyncThunk(
  'splitPersonalityEnabled/deactivate',
  async (_, { dispatch }) => {
    try {
      await resetSpoofUserAgentHeader()
      dispatch(setSplitPersonalityEnabled(false))
      await unregisterScript(splitPersonalityScriptId)
    } catch (err) {
      const { cause, message } = err as Error
      pushToDebugLog({ level: 'ERROR', message: message, data: JSON.stringify(cause) })
      // TODO show Error message for user on Privacy page?
    }
  },
)

export const ACTIVATE_SPLIT_PERSONALITY = 'splitPersonalityEnabled/activate'
export const activateSplitPersonality = createAsyncThunk(
  ACTIVATE_SPLIT_PERSONALITY,
  async (_, { dispatch, getState }) => {
    try {
      const dontSpoofDomains = Object.entries(getState().allowlist)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, v]) => v.allowPrivacyFeatures)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([k, _]) => k)

      dispatch(setRandomSpoofedUserAgent)
      const spoofedUserAgent = getState().userAgent.spoofed
      await spoofUserAgentHeader(spoofedUserAgent, dontSpoofDomains)
      dispatch(setSplitPersonalityEnabled(true))
      const splitPersonalityScript = await getScriptForId(splitPersonalityScriptId)
      const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(getState().allowlist)

      if (splitPersonalityScript) {
        updateScript({
          id: splitPersonalityScriptId,
          // this will replace the existing js array
          js: [SHA256(spoofedUserAgent).toString() + '.bundle.js'],
          excludeMatches: [
            ...(splitPersonalityScript?.excludeMatches ?? []),
            ...excludeMatchesFromAllowList,
          ],
        })
      } else {
        await registerScript(
          splitPersonalityScriptId,
          [SHA256(spoofedUserAgent).toString() + '.bundle.js'],
          excludeMatchesFromAllowList,
        )
      }
    } catch (err) {
      const { cause, message } = err as Error
      pushToDebugLog({ level: 'ERROR', message: message, data: JSON.stringify(cause) })
      // TODO show Error message for user on Privacy page?
    }
  },
)

export const splitPersonalityEnabledSlice = createSlice({
  name: 'splitPersonalityEnabled',
  initialState,
  reducers: {
    setSplitPersonalityEnabled(
      state: SplitPersonalityEnabledState,
      action: PayloadAction<boolean>,
    ) {
      return action.payload
    },
  },
})

export const { setSplitPersonalityEnabled } = splitPersonalityEnabledSlice.actions
export default splitPersonalityEnabledSlice.reducer
