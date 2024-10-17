import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const host = "http://localhost:5000";

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk('order/fetchOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${host}/api/v1/product/getallorders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return rejectWithValue(errorResponse.message || 'Failed to fetch orders');
        }

        const result = await response.json();
        console.log(result)
        return result.sort((a, b) => new Date(b.dateOrdered) - new Date(a.dateOrdered));
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${host}/api/v1/product/getallproducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return rejectWithValue(errorResponse.message || 'Failed to fetch products');
        }

        const result = await response.json();
        console.log('result of prod:',result)
        return result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Initial state
const initialState = {
    orderItems: [],
    productItems: [],
    loading: false,
    error: null,
};

// Create the slice
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.productItems = action.payload; // Set product items
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the reducer
export default orderSlice.reducer;