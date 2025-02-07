import { configureStore } from '@reduxjs/toolkit';

import metalReducer from './metalSlice';

const store = configureStore({
  reducer: {
    metal: metalReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;