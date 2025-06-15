import { create } from "zustand";

type CartItem = {
  product: any;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: any) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product._id === product._id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product._id === product._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product, quantity: 1 }],
      };
    }),
  clearCart: () => set({ items: [] }),
}));
