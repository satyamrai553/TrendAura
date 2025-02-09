import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartService,
  getUserCartService,
  deleteProductService,
} from "../services/index.js"; // Adjust path

// Fetch the cart from the backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const data = await getUserCartService();
  return data.products; // Ensure backend returns an updated cart
});

// Add an item to the cart and update Redux state
export const addToCart = createAsyncThunk("cart/addToCart", async (productId, { dispatch }) => {
  await addToCartService(productId);
  dispatch(fetchCart()); // Fetch updated cart after adding
});

// Remove an item from the cart and update Redux state
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, { dispatch }) => {
  await deleteProductService(productId);
  dispatch(fetchCart()); // Fetch updated cart after removing
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartData = action.payload || [];
      });
  },
});

export default cartSlice.reducer;
