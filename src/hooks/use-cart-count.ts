

"use client";

import { useQuery } from "@tanstack/react-query";
import { getCartCountAction } from "@/actions/cart.actions";

export const cartCountKey = ["cart", "count"] as const;

export function useCartCount(initialCount?: number) {
  return useQuery({
    queryKey: cartCountKey,
    queryFn: getCartCountAction,
    initialData: initialCount,
  });
}
