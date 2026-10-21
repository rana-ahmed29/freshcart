import Link from "next/link";
import { FaArrowRight, FaBoxOpen } from "react-icons/fa6";

export default function EmptyOrders() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
          <FaBoxOpen className="text-3xl text-gray-400" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">No orders yet</h2>
        <p className="mb-6 text-sm text-gray-500">
          When you place an order, you can track it here.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Start Shopping
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </div>
  );
}
