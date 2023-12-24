import { createSlice } from "@reduxjs/toolkit";

const cartInitialValue = {
  carts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialValue,
  reducers: {
    addToCart: (state, action) => {
      state.carts = action.payload;
    },
    addToBuyCart: (state, action) => {
      state.carts.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const { _id, color, size, quantity } = action.payload;
      state.carts = state.carts.filter(
        (item) =>
          item._id !== _id ||
          item.color !== color ||
          item.size !== size ||
          item.quantity !== quantity
      );
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export const { addToCart, addToBuyCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
