import Link from "next/link";
import {
  FaBagShopping,
  FaLock,
  FaShieldHalved,
  FaTag,
  FaTruck,
} from "react-icons/fa6";

import { getCartTotals } from "@/lib/cart-totals";
import type { ICartProduct } from "@/types/cart";

export default function OrderSummaryUser({
  products,
}: {
  products: ICartProduct[];
}) {
  const {
    subtotal,
    isFreeShipping,
    remaining,
    shipping,
    total,
    progress,
    itemsLabel,
  } = getCartTotals(products);

  return (
    <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* header */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <FaBagShopping />
          Order Summary
        </h2>
        <p className="mt-1 text-sm text-primary-100">
          {itemsLabel} in your cart
        </p>
      </div>

      <div className="space-y-5 p-6">
        {/* shipping banner */}
        {isFreeShipping ? (
          <div className="flex items-center gap-3 rounded-xl bg-linear-to-r from-green-50 to-emerald-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <FaTruck className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-700">Free Shipping!</p>
              <p className="text-sm text-green-600">
                You qualify for free delivery
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-amber-50 p-4">
            <div className="flex items-center gap-3">
              <FaTruck className="text-xl text-orange-500" />
              <p className="text-sm font-medium text-gray-800">
                Add {remaining.toLocaleString()} EGP for free shipping
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-orange-100">
              <div
                className="h-full rounded-full bg-orange-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* totals */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">
              {subtotal.toLocaleString()} EGP
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            {shipping === 0 ? (
              <span className="font-medium text-green-600">FREE</span>
            ) : (
              <span className="font-medium text-gray-900">
                {shipping.toLocaleString()} EGP
              </span>
            )}
          </div>
          <div className="mt-3 border-t border-dashed border-gray-200 pt-3">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">
                  {total.toLocaleString()}
                </span>
                <span className="ml-1 text-sm text-gray-500">EGP</span>
              </div>
            </div>
          </div>
        </div>

        {/* promo */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-gray-600 transition-all hover:border-primary-400 hover:bg-primary-50/50 hover:text-primary-600"
        >
          <FaTag />
          <span className="text-sm font-medium">Apply Promo Code</span>
        </button>

        {/* checkout */}
        <Link
          href="/checkout"
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4 font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:from-primary-700 hover:to-primary-800 active:scale-[0.98]"
        >
          <FaLock />
          <span>Secure Checkout</span>
        </Link>

        {/* badges */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaShieldHalved className="text-green-500" />
            <span>Secure Payment</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaTruck className="text-blue-500" />
            <span>Fast Delivery</span>
          </div>
        </div>

        <Link
          href="/"
          className="block py-2 text-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}