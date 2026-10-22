import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  DEFAULT_LINK_SANITIZER_ENABLED_GROUPS,
  type LinkSanitizerGroupId,
  normalizeParamsList,
} from 'utils/linkSanitizerParams'

export type LinkSanitizerState = {
  enabledGroups: LinkSanitizerGroupId[]
  customParams: string[]
}

const initialState: LinkSanitizerState = {
  enabledGroups: DEFAULT_LINK_SANITIZER_ENABLED_GROUPS,
  customParams: [],
}

export const linkSanitizerSlice = createSlice({
  name: 'linkSanitizer',
  initialState,
  reducers: {
    setLinkSanitizerEnabledGroups(
      state: LinkSanitizerState,
      action: PayloadAction<LinkSanitizerGroupId[]>,
    ) {
      state.enabledGroups = action.payload
    },
    toggleLinkSanitizerGroup(
      state: LinkSanitizerState,
      action: PayloadAction<LinkSanitizerGroupId>,
    ) {
      if (state.enabledGroups.includes(action.payload)) {
        state.enabledGroups = state.enabledGroups.filter(groupId => groupId !== action.payload)
        return
      }

      state.enabledGroups = [...state.enabledGroups, action.payload]
    },
    setLinkSanitizerCustomParams(state: LinkSanitizerState, action: PayloadAction<string[]>) {
      state.customParams = normalizeParamsList(action.payload)
    },
  },
})

export const {
  setLinkSanitizerEnabledGroups,
  toggleLinkSanitizerGroup,
  setLinkSanitizerCustomParams,
} = linkSanitizerSlice.actions
export default linkSanitizerSlice.reducer
