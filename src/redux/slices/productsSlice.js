import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL_PRODUCTS = 'http://localhost:5000/api/products';

// Async thunk untuk mengambil data makanan dari backend dengan pagination
export const fetchFoodList = createAsyncThunk('products/fetchFoodList', async ({ page = 1, limit = 10 }) => {
  const response = await axios.get(`${API_URL_PRODUCTS}?page=${page}&limit=${limit}`);
  return response.data;
});

const initialState = {
  foodList: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
  limit: 9,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFoodList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.foodList = action.payload.products;
        state.page = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchFoodList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage, setLimit } = productSlice.actions;

export const selectFoodList = (state) => state.products.foodList;
export const selectFoodStatus = (state) => state.products.status;
export const selectFoodError = (state) => state.products.error;
export const selectPage = (state) => state.products.page;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectLimit = (state) => state.products.limit;

export default productSlice.reducer;
