import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const item = action.payload;
      const exists = state.wishlistItems.find(i => i._id === item._id);
      if (!exists) {
        state.wishlistItems.push(item);
      }
    },
    removeFromWishlist(state, action) {
      state.wishlistItems = state.wishlistItems.filter(i => i._id !== action.payload);
    },
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
