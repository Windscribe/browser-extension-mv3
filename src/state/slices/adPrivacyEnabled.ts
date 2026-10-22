// @ts-nocheck
// Ad privacy features are currently not typed

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AdPrivacyEnabledState = boolean
const initialState: AdPrivacyEnabledState = false

export const adPrivacyEnabledSlice = createSlice({
  name: 'adPrivacyEnabled',
  initialState,
  reducers: {
    setAdPrivacyEnabled(state: AdPrivacyEnabledState, action: PayloadAction<boolean>) {
      if (action.payload) {
        // Ad topics & measurement
        chrome.privacy.websites.topicsEnabled.set({
          value: !action.payload,
        })
        chrome.privacy.websites.adMeasurementEnabled.set({
          value: !action.payload,
        })
        chrome.privacy.websites.fledgeEnabled.set({
          value: !action.payload,
        })

        // Network privacy
        chrome.privacy.network.networkPredictionEnabled.set({
          value: !action.payload,
        })
        chrome.privacy.websites.hyperlinkAuditingEnabled.set({
          value: !action.payload,
        })
        chrome.privacy.services.searchSuggestEnabled.set({
          value: !action.payload,
        })
      } else {
        chrome.privacy.websites.topicsEnabled.clear({})
        chrome.privacy.websites.adMeasurementEnabled.clear({})
        chrome.privacy.websites.fledgeEnabled.clear({})
        chrome.privacy.network.networkPredictionEnabled.clear({})
        chrome.privacy.websites.hyperlinkAuditingEnabled.clear({})
        chrome.privacy.services.searchSuggestEnabled.clear({})
      }
      return action.payload
    },
  },
})

export const { setAdPrivacyEnabled } = adPrivacyEnabledSlice.actions
export default adPrivacyEnabledSlice.reducer
