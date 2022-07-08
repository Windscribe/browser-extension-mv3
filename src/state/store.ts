import { configureStore } from '@reduxjs/toolkit';
import exampleReducer, { recreateSlice } from './slices/example';

// TODO Refactor function below
export function reconstructFrom(stateFromStorage: RootState): StoreType {

  const exampleReducer = recreateSlice(stateFromStorage?.example).reducer;

  const reducer = {
    example: exampleReducer,
  };

  const store = configureStore({ reducer });

  return store;
}

// TODO Declare types
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
