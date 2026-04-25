import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      const existing = state.items.find(
        (i) => i.id === item.id && i.size === item.size
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; size?: string }>
    ) => {
      state.items = state.items.filter((i) =>
        action.payload.size
          ? !(i.id === action.payload.id && i.size === action.payload.size)
          : i.id !== action.payload.id
      );
    },

    decreaseQty: (
      state,
      action: PayloadAction<{ id: string; size: string }>
    ) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );

      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter(
            (i) =>
              !(i.id === action.payload.id && i.size === action.payload.size)
          );
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;