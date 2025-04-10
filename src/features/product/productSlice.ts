import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchProducts = createAsyncThunk('product/fetchAll', async () => {
    const response = await API.get('/products');
    return response.data;
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            });
    },
});

export default productSlice.reducer;
