import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchProducts = createAsyncThunk('products/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:5008/api/products');
    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || 'Failed to fetch products');
    }

    return data;
  } catch (error) {
    console.error('fetchProducts error:', error);
    return rejectWithValue(error.message);
  }
});

export const addProduct = createAsyncThunk('products/add', async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:5008/api/products', {
      method: 'POST',
      body: formData, 
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || 'Failed to add product');
    }

    return data;
  } catch (err) {
    console.error('addProduct error:', err);
    return rejectWithValue(err.message);
  }
});
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
// export const updateProduct = createAsyncThunk(
//   "products/updateProduct",
//   async ({ id, formData }, thunkAPI) => {
//     try {
//       const response = await axios.put(`/api/products/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );


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
        state.list = action.payload || [];
        state.status = 'success';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(addProduct.pending, (state) => {
        state.status = 'adding';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        if (action.payload) {
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
});
      
  },
});
export const deleteMultipleProducts = createAsyncThunk(
  'products/deleteMultiple',
  async (ids, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5008/api/products/bulk-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });

      const data = await res.json();

      if (!res.ok) return rejectWithValue(data.message);

      return ids; // Return the list of deleted IDs
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);



export default productSlice.reducer;
