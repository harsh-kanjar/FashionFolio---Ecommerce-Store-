import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const host = "http://localhost:5000";

// Async thunk to fetch cart items
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${host}/api/v1/product/getcartproducts`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Fetch failed: ${errorText}`);
    }

    const data = await response.json();
    return data.cartItems;
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    return rejectWithValue(error.message);
  }
});

// Async thunk to update quantity
export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ cartItemId, newQuantity }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${host}/api/v1/product/updatecartitem/${cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Update failed: ${errorText}`);
    }

    return { cartItemId, newQuantity };
  } catch (error) {
    console.error("Error updating quantity:", error.message);
    return rejectWithValue(error.message);
  }
});

// Async thunk to add a product to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${host}/api/v1/product/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.cartItem;
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    return rejectWithValue(error.message);
  }
});

// Async thunk to remove a product from the cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (cartItemId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${host}/api/v1/product/removefromcart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    return cartItemId;
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    return rejectWithValue(error.message);
  }
});

// Initial state
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

// Create the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { cartItemId, newQuantity } = action.payload;
        const item = state.cartItems.find(item => item._id === cartItemId);
        if (item) {
          item.quantity = newQuantity;
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      });
  },
});

// Export actions and reducer
export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
