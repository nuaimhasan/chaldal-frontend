import { createSlice } from "@reduxjs/toolkit";

const cartValue = {
  carts: [],
};

const loadState = () => {
  const storedState = localStorage.getItem("cartState");

  return storedState ? JSON.parse(storedState) : cartValue;
};

const initialState = loadState();

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.carts = action.payload;

      localStorage.setItem("cartState", JSON.stringify(state));
    },
    addToBuyCart: (state, action) => {
      state.carts.push(action.payload);

      localStorage.setItem("cartState", JSON.stringify(state));
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

      localStorage.setItem("cartState", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.carts = [];

      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const { addToCart, addToBuyCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
