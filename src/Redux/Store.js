import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cartSlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
    reducer:{
        cart: cartSlice.reducer,
        auth: authSlice.reducer,
    }
});