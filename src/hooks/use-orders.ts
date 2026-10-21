"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserOrdersAction } from "@/actions/order.actions";

export const ordersKey = ["orders"] as const;

export function useOrders() {
  return useQuery({
    queryKey: ordersKey,
    queryFn: async () => {
      const orders = await getUserOrdersAction();
      // null = guest or error: the page decides what to show
      if (orders === null) throw new Error("Could not load your orders");
      return orders;
    },
    retry: false,
  });
}
