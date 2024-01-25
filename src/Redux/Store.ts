import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import CartSlice from './Features/CartSlice';
import ProductSlice from './Features/Product/ProductSlice';
import { ApiSlice } from './Api/ApiSlice';
const store = configureStore({
  reducer: {
    cart: CartSlice,
    product: ProductSlice,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
   
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware)
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
