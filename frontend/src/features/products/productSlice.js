// src/features/products/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async: Fetch all products
export const fetchProducts = createAsyncThunk('products/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:5008/api/products');
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message || 'Failed to fetch products');
    return data; // Could be array or {data:[]} - we’ll normalize in slice below
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async: Add a product
export const addProduct = createAsyncThunk('products/add', async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:5008/api/products', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message || 'Failed to add product');
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Async: Delete a product
export const deleteProduct = createAsyncThunk('products/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`http://localhost:5008/api/products/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message);
    return id;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Async: Update a product
export const updateProduct = createAsyncThunk('products/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const res = await fetch(`http://localhost:5008/api/products/${id}`, {
      method: 'PUT',
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Async: Bulk delete products
export const deleteMultipleProducts = createAsyncThunk(
  'products/deleteMultiple',
  async (ids, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5008/api/products/bulk-delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return ids; // Return the deleted IDs
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const normalizePayloadToArray = (payload) => {
  // Always return an array of products
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
};

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = normalizePayloadToArray(action.payload);
        state.status = 'success';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        if (action.payload && action.payload._id) {
          state.list.push(action.payload);
        }
        state.status = 'success';
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to add product';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(product => product._id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteMultipleProducts.fulfilled, (state, action) => {
        state.list = state.list.filter(
          product => !action.payload.includes(product._id)
        );
      });
  },
});

export default productSlice.reducer;
