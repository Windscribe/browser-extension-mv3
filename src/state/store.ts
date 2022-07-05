import { configureStore } from '@reduxjs/toolkit';
import testReducer from './slices/test';

// TEMP
const reducer = {
  test: testReducer,
};

const store = configureStore({
  reducer: reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
