import Link from "next/link";
import { FaArrowRight, FaBoxOpen } from "react-icons/fa6";

export default function EmptyCart() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="relative mb-8">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
            <FaBoxOpen className="text-5xl text-gray-300" />
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h2>

        <p className="mb-8 leading-relaxed text-gray-500">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-primary-700 active:scale-[0.98]"
        >
          Start Shopping
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </div>
  );
}
