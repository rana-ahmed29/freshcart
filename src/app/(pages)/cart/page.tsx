"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCartShopping, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

import { clearUserCartAction } from "@/actions/cart.actions";
import CartItem from "@/components/cart/cart-item";
import ClearCartDialog from "@/components/cart/clear-cart-dialog";
import EmptyCart from "@/components/cart/empty-cart";
import OrderSummary from "@/components/cart/order-summary";
import PageLoader from "@/components/common/page-loader";
import { cartKey, useCart } from "@/hooks/use-cart";
import { getCartTotals } from "@/lib/cart-totals";

export default function CartPage() {
  const queryClient = useQueryClient();

  // isPending is true only on the FIRST load
  const { data, isPending, isError, refetch } = useCart();
  const products = data?.data?.products ?? [];

  // same numbers as the Order Summary: total units, like "10 items"
  const { itemsLabel } = getCartTotals(products);

  // clear all items: reload ["cart"] (list AND badge)
  const clearMutation = useMutation({
    mutationFn: clearUserCartAction,
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(result.message);
        await queryClient.invalidateQueries({ queryKey: cartKey });
      } else {
        toast.error(result.message);
      }
    },
    onError: () => toast.error("Could not reach the server. Try again."),
  });

  if (isPending) {
    return <PageLoader title="Loading your cart..." subtitle="Just a moment" />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg text-gray-600">We could not load your cart.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">Shopping Cart</span>
          </nav>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary-600 to-primary-700 text-white">
              <FaCartShopping />
            </span>
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            You have{" "}
            <span className="font-semibold text-primary-600">{itemsLabel}</span>{" "}
            in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {products.map((prod) => (
                <CartItem key={prod._id} product={prod} />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <span>←</span>
                Continue Shopping
              </Link>

              <ClearCartDialog onConfirm={() => clearMutation.mutate()}>
                <button
                  type="button"
                  disabled={clearMutation.isPending}
                  className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-500 disabled:opacity-50"
                >
                  <FaTrash className="text-xs transition-transform group-hover:scale-110" />
                  <span>
                    {clearMutation.isPending
                      ? "Clearing..."
                      : "Clear all items"}
                  </span>
                </button>
              </ClearCartDialog>
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
