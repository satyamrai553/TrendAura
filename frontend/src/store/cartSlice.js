import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartData: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCart: (state, action) => {
      console.log("✅ fetchCart Action Triggered!", action); // Log full action
      console.log("🚀 Action Payload:", action.payload); // Log payload specifically

      // Ensure cartData exists in payload before updating state
      if (action.payload && Array.isArray(action.payload.cartData)) {
        state.cartData = [...action.payload.cartData];
        console.log("🛒 Updated cartData:", state.cartData);
      } else {
        console.error("❌ Invalid payload received in fetchCart:", action.payload);
      }
    },
  },
});

export const { fetchCart } = cartSlice.actions;
export default cartSlice.reducer;
