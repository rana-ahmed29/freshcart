"use client";

import { useSession } from "next-auth/react";

import OrderSummaryGuest from "@/components/cart/order-summary-guest";
import OrderSummaryUser from "@/components/cart/order-summary-user";
import type { ICartProduct } from "@/types/cart";

export default function OrderSummary({
  products,
}: {
  products: ICartProduct[];
}) {
  const { status } = useSession();

 
  if (status === "loading") {
    return (
      <div
        className="sticky top-24 h-96 animate-pulse rounded-2xl border border-gray-100 bg-white shadow-sm"
        aria-hidden="true"
      />
    );
  }

  if (status === "authenticated") {
    return <OrderSummaryUser products={products} />;
  }

  return <OrderSummaryGuest products={products} />;
}
