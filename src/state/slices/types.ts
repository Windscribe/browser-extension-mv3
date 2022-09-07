import { createSlice, type SliceCaseReducers } from '@reduxjs/toolkit'

// todo move somewhere?
export type Create<StateSlice> = (
  initialState?: StateSlice,
) => ReturnType<typeof createSlice<StateSlice, SliceCaseReducers<StateSlice>>>
