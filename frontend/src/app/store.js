// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import homepageReducer from '../features/homepage/homepageSlice';
import productReducer from '../features/products/productSlice';
import orderReducer from '../features/orders/orderSlice';
import wishlistReducer from '../features/wish/wishlistSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    homepage: homepageReducer,
    products: productReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
  },
});
