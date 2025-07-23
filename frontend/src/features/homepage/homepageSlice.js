import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHomepageData = createAsyncThunk('homepage/fetchData', async () => {
  const res = await fetch('/api/homepage');
  return await res.json();
});

const homepageSlice = createSlice({
  name: 'homepage',
  initialState: {
    banners: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomepageData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomepageData.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.banners;
      })
      .addCase(fetchHomepageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default homepageSlice.reducer;
