import { configureStore } from '@reduxjs/toolkit';
import { appInfo } from '../api/appInfo';

import authSlice from '../features/auth/authSlice';
import cartSlice from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    [appInfo.reducerPath]: appInfo.reducer,
    auth: authSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(appInfo.middleware),
});
