import Image from "next/image";
import { FaBagShopping, FaBox, FaShieldHalved, FaTruck } from "react-icons/fa6";

import DotsSpinner from "@/components/common/dots-spinner";
import { getCartTotals } from "@/lib/cart-totals";
import type { ICartProduct } from "@/types/cart";
import type { PaymentMethod } from "@/types/order";

export default function CheckoutOrderSummary({
  products,
  method,
  isSubmitting,
}: {
  products: ICartProduct[];
  method: PaymentMethod;
  isSubmitting: boolean;
}) {
  const { subtotal, shipping, total, itemsLabel } = getCartTotals(products);
  const isOnline = method === "online";

  return (
    <aside className="sticky top-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* header */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <FaBagShopping />
          Order Summary
        </h2>
        <p className="mt-1 text-sm text-primary-100">{itemsLabel}</p>
      </div>

      <div className="p-5">
        {/* products */}
        <div className="mb-5 max-h-56 space-y-3 overflow-y-auto pr-1">
          {products.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
            >
              <div className="relative h-14 w-14 shrink-0 rounded-lg border border-gray-100 bg-white p-1">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {item.product.title}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {item.count} × {item.price.toLocaleString()} EGP
                </p>
              </div>
              <p className="shrink-0 text-sm font-bold text-gray-900">
                {(item.price * item.count).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-4 border-gray-100" />

        {/* totals */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">{subtotal.toLocaleString()} EGP</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="flex items-center gap-2">
              <FaTruck className="text-gray-400" />
              Shipping
            </span>
            {shipping === 0 ? (
              <span className="font-semibold text-green-600">FREE</span>
            ) : (
              <span className="font-medium">
                {shipping.toLocaleString()} EGP
              </span>
            )}
          </div>
          <hr className="border-gray-100" />
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary-600">
                {total.toLocaleString()}
              </span>
              <span className="ml-1 text-sm text-gray-500">EGP</span>
            </div>
          </div>
        </div>

        {/* place order / proceed to payment */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 py-4 font-bold text-white shadow-lg shadow-primary-600/20 transition-all hover:from-primary-700 hover:to-primary-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <DotsSpinner className="size-5 text-white" />
              {isOnline ? "Redirecting..." : "Placing order..."}
            </>
          ) : isOnline ? (
            <>
              <FaShieldHalved />
              Proceed to Payment
            </>
          ) : (
            <>
              <FaBox />
              Place Order
            </>
          )}
        </button>

        {/* badges */}
        <div className="mt-4 flex items-center justify-center gap-4 border-t border-gray-100 py-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaShieldHalved className="text-green-500" />
            <span>Secure</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaTruck className="text-blue-500" />
            <span>Fast Delivery</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaBox className="text-orange-500" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
