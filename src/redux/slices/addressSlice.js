import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAddress } from '../../api/address';

// Thunk untuk mengambil data alamat
export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async () => {
    const response = await getAddress();
    return response.data;
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Reducers lain jika diperlukan
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;
