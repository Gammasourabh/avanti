import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { product, quantity = 1 } = action.payload;
      const prodId = product.id || product._id; // Always expect id!
      const existing = state.items.find(item => item.product.id === prodId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product: { ...product, id: prodId }, quantity });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    changeQuantity(state, action) {
      const { productId, delta } = action.payload;
      const item = state.items.find(i => i.product.id === productId);
      if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
