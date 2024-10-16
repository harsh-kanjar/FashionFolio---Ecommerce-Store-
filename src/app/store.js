import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import  authSlice  from '../features/product/authSlice'
import cartSlice from '../features/product/cartSlice'
// Configure the Redux store
export const store = configureStore({
  reducer: {
    product: productReducer, // Assigning the product reducer to the 'product' slice of state
    user: authSlice,
    cart: cartSlice 
  },
});
