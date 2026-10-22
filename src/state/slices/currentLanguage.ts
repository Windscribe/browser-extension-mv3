import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  normalizeLocaleCode,
  SupportedLocaleOptions,
  SupportedLocales,
} from 'utils/getLocalisedString'

type CurrentSelection = {
  currentSelection: SupportedLocaleOptions
  currentLanguage: SupportedLocales
}

const initialState: CurrentSelection = {
  // default is system
  currentSelection: 'system' as SupportedLocaleOptions,
  // gets overriden on initializer in main.ts file
  currentLanguage: 'en' as SupportedLocales,
}

const mapSelectionToLanguage = (selection: SupportedLocaleOptions): SupportedLocales => {
  if (selection === 'system') {
    return normalizeLocaleCode(chrome.i18n.getUILanguage())
  }
  return selection
}

export const currentLanguageSlice = createSlice({
  name: 'currentLanguage',
  initialState,
  reducers: {
    setCurrentLanguageSelection: (state, action: PayloadAction<SupportedLocaleOptions>) => {
      state.currentSelection = action.payload
      state.currentLanguage = mapSelectionToLanguage(action.payload)
    },
  },
})

export const { setCurrentLanguageSelection } = currentLanguageSlice.actions
export default currentLanguageSlice.reducer
