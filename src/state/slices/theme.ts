import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ThemeState = {
  value: 'light' | 'dark'
}

export const initialState: ThemeState = {
  value: 'dark',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state: ThemeState, action: PayloadAction<'light' | 'dark'>) {
      state.value = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
