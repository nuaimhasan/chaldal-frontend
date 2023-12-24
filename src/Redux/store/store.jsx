import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import cartSlice from "../cart/cartSlice";
import userSlice from "../user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
