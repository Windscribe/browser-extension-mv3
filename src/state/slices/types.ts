import { createSlice, type SliceCaseReducers } from '@reduxjs/toolkit'

export type Create<StateSlice> = (
  initialState?: StateSlice,
) => ReturnType<typeof createSlice<StateSlice, SliceCaseReducers<StateSlice>>>
