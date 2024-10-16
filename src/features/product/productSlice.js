import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const host = "https://server-1-ftit.onrender.com";
const host = "http://localhost:5000"
const api1 = "/api/v1/product";

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/product/getallproducts`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Internal server error');
    }
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Add to cart thunk
export const addToCartProduct = createAsyncThunk('product/addToCartProduct', async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${host}${api1}/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server responded with:", errorText);
      return rejectWithValue(`Server error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Product added to cart successfully:", data.cartItem);
    return data.cartItem; // Return the added cart item or updated cart data
  } catch (error) {
    console.error("An error occurred while adding the product to the cart:", error);
    return rejectWithValue(error.message);
  }
});

// Remove from cart thunk
export const removeFromCart = createAsyncThunk('product/removeFromCart', async (cartItemId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${host}${api1}/removefromcart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server responded with:", errorText);
      return rejectWithValue(`Server error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Product removed from cart successfully:", data.cartItem);
    return cartItemId; // Return the ID of the removed cart item
  } catch (error) {
    console.error("An error occurred while removing the product from the cart:", error);
    return rejectWithValue(error.message);
  }
});

// Initial state
const initialState = {
  products: [],
  cartItems: [],
  loading: false,
  error: null,
};

// Redux slice
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Error from fetchProducts thunk', action.payload);
      })
      // Handle add to cart
      .addCase(addToCartProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(addToCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload); // Add the new cart item to the cart
      })
      .addCase(addToCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
        console.error('Error from addToCartProduct thunk', action.payload);
      })
      // Handle remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload); // Remove the cart item by ID
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
        console.error('Error from removeFromCart thunk', action.payload);
      });
  },
});

// Export action creators and reducer
export const { resetError } = productSlice.actions;

export default productSlice.reducer;
