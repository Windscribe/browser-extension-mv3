import { configureStore } from '@reduxjs/toolkit';
import exampleReducer, { create } from './slices/example';

export function buildFrom(initialState?: RootState) {
  // TODO  Make it iterate through all slices when we create more of them
  const exampleReducer = create(initialState?.example).reducer;

  const reducer = {
    example: exampleReducer,
  };
  return configureStore({ reducer });
}

const reducer = {
  example: exampleReducer,
};

const store = configureStore({
  reducer: reducer
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
