"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BikeModel } from "./data";

interface CartItem {
  productId: number;
  qty: number;
}

interface GarageStore {
  // selected bike for compatibility
  selectedBike: BikeModel | null;
  setSelectedBike: (bike: BikeModel | null) => void;

  // my garage (saved bikes)
  myGarage: BikeModel[];
  addToGarage: (bike: BikeModel) => void;
  removeFromGarage: (key: string) => void;

  // cart
  cart: CartItem[];
  addToCart: (productId: number, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  cartCount: () => number;

  // wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;

  // search
  recentSearches: string[];
  addRecentSearch: (term: string) => void;

  // compare
  compareList: number[];
  toggleCompare: (productId: number) => void;
}

export const useGarageStore = create<GarageStore>()(
  persist(
    (set, get) => ({
      selectedBike: null,
      setSelectedBike: (bike) => set({ selectedBike: bike }),

      myGarage: [],
      addToGarage: (bike) =>
        set((s) => ({
          myGarage: s.myGarage.find((b) => b.key === bike.key)
            ? s.myGarage
            : [...s.myGarage, bike],
          selectedBike: bike,
        })),
      removeFromGarage: (key) =>
        set((s) => ({
          myGarage: s.myGarage.filter((b) => b.key !== key),
          selectedBike: s.selectedBike?.key === key ? null : s.selectedBike,
        })),

      cart: [],
      addToCart: (productId, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((i) => i.productId === productId);
          return {
            cart: existing
              ? s.cart.map((i) => i.productId === productId ? { ...i, qty: i.qty + qty } : i)
              : [...s.cart, { productId, qty }],
          };
        }),
      removeFromCart: (productId) =>
        set((s) => ({ cart: s.cart.filter((i) => i.productId !== productId) })),
      updateQty: (productId, qty) =>
        set((s) => ({
          cart: qty <= 0
            ? s.cart.filter((i) => i.productId !== productId)
            : s.cart.map((i) => i.productId === productId ? { ...i, qty } : i),
        })),
      cartCount: () => get().cart.reduce((sum, i) => sum + i.qty, 0),

      wishlist: [],
      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),

      recentSearches: [],
      addRecentSearch: (term) =>
        set((s) => ({
          recentSearches: [term, ...s.recentSearches.filter((t) => t !== term)].slice(0, 6),
        })),

      compareList: [],
      toggleCompare: (productId) =>
        set((s) => ({
          compareList: s.compareList.includes(productId)
            ? s.compareList.filter((id) => id !== productId)
            : s.compareList.length < 3
            ? [...s.compareList, productId]
            : s.compareList,
        })),
    }),
    { name: "bikers-yard-garage" }
  )
);
