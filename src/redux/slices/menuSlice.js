import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL_CATEGORIES = 'http://localhost:5000/api/categories';

export const fetchCategories = createAsyncThunk('menu/fetchCategories', async () => {
  const response = await axios.get(API_URL_CATEGORIES);
  return response.data;
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    categories: [],
    category: 'ALL',
    status: 'idle',
    error: null,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = menuSlice.actions;
export default menuSlice.reducer;
