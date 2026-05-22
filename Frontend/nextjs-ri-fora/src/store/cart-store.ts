import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  _id: string;
  title: string;
  price: number;
  qty: number;
  size?: string;
  image?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i._id === item._id);

        if (existing) {
          set({
            items: items.map((i) =>
              i._id === item._id
                ? { ...i, qty: i.qty + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, qty: 1 }] });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i._id !== id) }),

      increaseQty: (id) =>
        set({
          items: get().items.map((i) =>
            i._id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        }),

      decreaseQty: (id) =>
        set({
          items: get().items
            .map((i) =>
              i._id === id ? { ...i, qty: i.qty - 1 } : i
            )
            .filter((i) => i.qty > 0),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);