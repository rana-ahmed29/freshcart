import Link from "next/link";
import { FaUser } from "react-icons/fa6";

import { getCartTotals } from "@/lib/cart-totals";
import type { ICartProduct } from "@/types/cart";

export default function OrderSummaryGuest({
  products,
}: {
  products: ICartProduct[];
}) {
  const { subtotal, itemsLabel } = getCartTotals(products);

  return (
    <div className="sticky top-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* header */}
      <div className="bg-gray-900 p-5">
        <h2 className="text-lg font-bold text-white">Order Summary</h2>
      </div>

      <div className="space-y-4 p-5">
        {/* totals */}
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemsLabel})</span>
          <span className="font-semibold">{subtotal.toLocaleString()} EGP</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-green-600">
            Calculated at checkout
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between text-lg font-bold">
          <span>Estimated Total</span>
          <span className="text-primary-600">
            {subtotal.toLocaleString()} EGP
          </span>
        </div>

        {/* login button: comes back to the cart after sign in */}
        <div className="space-y-3 pt-4">
          <Link
            href="/login?callbackUrl=/cart"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 font-semibold text-white transition-all hover:bg-primary-700"
          >
            <FaUser />
            Login to Checkout
          </Link>

          <p className="text-center text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* benefits */}
        <div className="space-y-2 border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500">
            ✓ Your cart items will be saved
          </p>
          <p className="text-xs text-gray-500">✓ Track your orders easily</p>
          <p className="text-xs text-gray-500">
            ✓ Access exclusive member deals
          </p>
        </div>
      </div>
    </div>
  );
}
