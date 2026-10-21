"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserCartAction } from "@/actions/cart.actions";

// the parent key: invalidating it reloads the list AND the badge
export const cartKey = ["cart"] as const;

export function useCart() {
  return useQuery({
    queryKey: [...cartKey, "list"],
    queryFn: async () => {
      const cart = await getUserCartAction();
      // the action returns null on any error (e.g. expired token)
      if (!cart) throw new Error("Could not load your cart");
      return cart;
    },
  });
}
